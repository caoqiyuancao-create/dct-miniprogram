// CHG-20260428-02 (UI U1/U2/U3/U4/U5/U7) + CHG-20260428-03 (F1/F3/F5)
// landing 页：滚动进度条 / 吸底 CTA / 倒计时 / 报名状态查询 / 自定义分享
//
// 数据层（points / menu / infoRows）静态化在 data 里，避免重复 setData。
// 滚动相关用节流（rAF + 上次值缓存），减少 setData 频次。

const ISSUE_ID = 'vol02';
const EVENT_START_TS = Date.parse('2026-04-25 19:00:00') / 1000;
const STICKY_TRIGGER_RPX = 720;

// rpx → px 换算（onPageScroll 给的 scrollTop 是 px）
function rpxToPx(rpx, winWidth) {
  return (rpx / 750) * winWidth;
}

function computeDaysLeftLabel() {
  const nowSec = Date.now() / 1000;
  const diffSec = EVENT_START_TS - nowSec;
  const days = Math.ceil(diffSec / 86400);
  if (days > 1) return `距开场还有 ${days} 天`;
  if (days === 1) return '距开场还有 1 天';
  if (days === 0) return '今晚见';
  if (days === -1) return '今晚见';
  return '已结束';
}

const REG_BANNER_TEXT = {
  pending:  '✓ 报名已收到 · 24 小时内回复',
  approved: '✓ 报名已通过 · 期待相见',
  rejected: '× 本期已满 · 期待下期',
};

Page({
  data: {
    // ---- 静态展示数据（U7：避免在 setData 里反复构造） ----
    points: [
      {
        num: '01',
        icon: 'lanes',
        title: '人生不是单一赛道',
        sub: '多重身份的平衡与深耕',
        body: '学者的严谨、管理者的务实、公益者的温度、跑者的坚韧——如何在其中探索更完整的自我。'
      },
      {
        num: '02',
        icon: 'footprint',
        title: '用脚步丈量世界',
        sub: '坚持的力量',
        body: '从日复一日的训练，到走上世界马拉松大满贯「六星跑者」之路——10000 公里，究竟意味着什么？'
      },
      {
        num: '03',
        icon: 'compass',
        title: '笃定前行',
        sub: '目标与生活的无限可能',
        body: '关于个人年度目标管理，如何让期待落地、让计划发生——她的实践哲学。'
      }
    ],
    menu: [
      { name: '桑葚巴斯克',        tag: '攀枝花桑葚季' },
      { name: '桑葚酸奶杯',        tag: '攀枝花桑葚季' },
      { name: '红酒 · 有醇 / 无醇', tag: '自选' }
    ],
    infoRows: [
      { label: '时间', value: '2026 年 4 月 25 日（周六）', sub: '18:40 入场  ·  19:00 开始' },
      { label: '地点', value: '武侯区 玉林 DCT 客厅',        sub: '报名通过后微信通知具体地址' },
      { label: '入场', value: '88 元 / 位',                  sub: '含一份甜品 + 一杯酒 · 可打包带走' }
    ],

    // ---- 动态状态 ----
    progress: 0,           // U1 顶部进度条 0-100
    stickyVisible: false,  // U2 吸底 CTA 可见性
    daysLeftLabel: '',     // F5 倒计时文案
    regStatus: '',         // F1 'pending' | 'approved' | 'rejected' | ''
    regBannerText: '',
    ctaText: '报名参加第二期',
    ctaTextShort: '立即报名',
    ctaAriaLabel: '报名参加第二期'
  },

  // 节流缓存（避免 60fps 滚动里反复同步取系统信息）
  _scrollRaf: null,
  _lastProgress: 0,
  _lastSticky: false,
  _stickyTriggerPx: 0,
  _winHeight: 0,
  _totalHeight: 0,
  _heightCheckedAt: 0, // 高度懒重算时间戳

  onLoad() {
    const sys = wx.getSystemInfoSync();
    this._winHeight = sys.windowHeight;
    this._stickyTriggerPx = rpxToPx(STICKY_TRIGGER_RPX, sys.windowWidth);
    this.setData({ daysLeftLabel: computeDaysLeftLabel() });
    this.checkRegistration();
  },

  onShow() {
    // F5：每次回到页面刷新倒计时
    const label = computeDaysLeftLabel();
    if (label !== this.data.daysLeftLabel) {
      this.setData({ daysLeftLabel: label });
    }
  },

  // ---- F1 报名状态查询 ----
  checkRegistration() {
    if (!wx.cloud || !wx.cloud.callFunction) return;
    wx.cloud.callFunction({
      name: 'registration',
      data: { action: 'check', issueId: ISSUE_ID }
    }).then((res) => {
      const r = (res && res.result) || {};
      if (r.ok && r.registered) {
        const status = r.status || 'pending';
        this.setData({
          regStatus: status,
          regBannerText: REG_BANNER_TEXT[status] || REG_BANNER_TEXT.pending,
          ctaText: '查看我的报名',
          ctaTextShort: '查看报名',
          ctaAriaLabel: '查看我的报名'
        });
      }
    }).catch((err) => {
      // 静默失败，不影响首屏
      console.warn('[registration check] failed:', err && err.errMsg);
    });
  },

  // ---- U1 + U2：滚动节流 ----
  onPageScroll(e) {
    if (this._scrollRaf) return;
    const scrollTop = (e && e.scrollTop) || 0;
    this._scrollRaf = setTimeout(() => {
      this._scrollRaf = null;
      this._handleScroll(scrollTop);
    }, 16); // ~60fps
  },

  _handleScroll(scrollTop) {
    // 进度计算：用缓存的 winHeight + 懒重算的 totalHeight
    // （dct-origin-story / lazy-load image 加载完后页面会变高，需重测）
    const now = Date.now();
    if (this._totalHeight === 0 || now - this._heightCheckedAt > 1500) {
      this._heightCheckedAt = now;
      this._measureTotalHeight();
    }

    let progress = 0;
    if (this._totalHeight > this._winHeight) {
      progress = (scrollTop / (this._totalHeight - this._winHeight)) * 100;
      if (progress < 0) progress = 0;
      if (progress > 100) progress = 100;
    }
    const stickyVisible = scrollTop > this._stickyTriggerPx;

    const patch = {};
    if (Math.abs(progress - this._lastProgress) >= 0.5) {
      patch.progress = progress;
      this._lastProgress = progress;
    }
    if (stickyVisible !== this._lastSticky) {
      patch.stickyVisible = stickyVisible;
      this._lastSticky = stickyVisible;
    }
    if (Object.keys(patch).length > 0) this.setData(patch);
  },

  _measureTotalHeight() {
    wx.createSelectorQuery()
      .in(this)
      .select('.page')
      .boundingClientRect((res) => {
        if (res && res.height) this._totalHeight = res.height;
      })
      .exec();
  },

  onReady() {
    // 首次测一下，之后由 _handleScroll 1.5s 节流懒重测
    this._measureTotalHeight();
  },

  // ---- 跳转 ----
  goDetail() { wx.navigateTo({ url: '/pages/detail/detail' }); },
  goForm()   { wx.navigateTo({ url: '/pages/form/form' }); },

  // ---- U7：图片错误兜底（统一） ----
  onImgError(e) {
    console.warn('[img error]', (e && e.currentTarget && e.currentTarget.dataset) || e);
  },

  // ---- CHG-03 F3 · 自定义分享 ----
  onShareAppMessage() {
    return {
      title: 'DCT VOL.02 · 六星之路 — 高晓蓉教授',
      path: '/pages/landing/landing?from=share',
      // imageUrl: 'cloud://xxx/share-vol02.jpg', // 上传到云存储后填入
    };
  },
  onShareTimeline() {
    return {
      title: '六星之路 · 高晓蓉教授分享会',
      query: 'from=timeline',
      // imageUrl: 'cloud://xxx/share-vol02-square.jpg',
    };
  }
});
