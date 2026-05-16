// CHG-20260517-01 · 第三期 vol03 整页上线
// landing 页：数据驱动（getCurrent）+ V3PosterHero + SpeakerHero + Four Questions + 留言墙预告
//
// 滚动节流（rAF/16ms 节流 + 上次值缓存）；总高度 1.5s 节流懒重测。

const D = require('../../data/issues.js');

const STICKY_TRIGGER_RPX = 720;

function rpxToPx(rpx, winWidth) {
  return (rpx / 750) * winWidth;
}

function computeDaysLeftLabel(eventStartTs) {
  if (!eventStartTs) return '';
  const nowSec = Date.now() / 1000;
  const diffSec = eventStartTs - nowSec;
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

// 数字 → 中文
const NUM_CN = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
function numToCN(n) { return NUM_CN[n] || String(n); }

// 第三期 OPENING PITCH 文案
const V3_PITCH_TITLE_L1 = '在“变得更好”这件热事上，';
const V3_PITCH_TITLE_L2 = '我们想保留一点“冷思考”。';
const V3_PITCH_PARAGRAPHS = [
  {
    parts: [
      { text: 'DCT 第三期，我们邀请到 ' },
      { text: '皮里士多德', strong: true },
      { text: '——一位在华西临床与实验室之间往返的皮肤科医生，和我们一起重新理解“医美热”。' }
    ]
  },
  {
    parts: [
      { text: '医美当然关乎技术：光、电、注射……每一种手段背后都有真实的医学逻辑、适应证与风险边界。' }
    ]
  },
  {
    parts: [
      { text: '但医美也不只是技术。它同时牵动着审美标准、身体感受、情绪压力、消费选择，以及一个更隐秘的问题：' },
      { text: '当我们想要改变自己的脸和身体时，我们真正想改变的是什么？', strong: true }
    ]
  },
  {
    parts: [
      { text: '这一次，我们不急着赞成，也不急着反对。我们想把“变美”这件事放回更大的语境里：医学如何参与审美，技术如何改变身体经验，而“变得更好”又是如何被想象、被定义、被追求的。' }
    ]
  }
];

// v3 WHAT IS DCT v3 第二段
const V3_DCT_BODY = [
  { text: '本期我们走出客厅，去到「陌生的朋友」咖啡厅。医美看似是一个关于脸和皮肤的话题，但它背后连接着' },
  { text: '医学技术、消费社会、审美秩序和每个人与自己的关系', strong: true },
  { text: '。DCT 想做的，正是在这些看似日常的问题里，保留一点认真追问的空间。' }
];

// 每期主题 → icon kind 列表（按 points 顺序）
const POINT_ICONS = {
  vol02: ['lanes', 'footprint', 'compass'],
  vol03: ['syringe', 'skinheart', 'tangle', 'self']
};

function parseEventStartTs(cur) {
  if (!cur || !cur.date) return 0;
  // cur.date 形如 "2026.05.23"，固定 19:00
  const m = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(cur.date);
  if (!m) return 0;
  return Date.parse(`${m[1]}-${m[2]}-${m[3]} 19:00:00`) / 1000;
}

Page({
  data: {
    isV3: false,
    cur: null,
    issueId: '',
    issueNumberCN: '',
    icons: [],
    pointsWithIcons: [],

    pitchTitleL1: '',
    pitchTitleL2: '',
    pitchParagraphs: [],
    dctBody: [],

    teaserQuestions: [],
    infoRows: [],

    posterSrc: '',
    speakerPhoto: '',
    speakerName: '',
    speakerTitle: '',
    speakerBio: '',
    speakerOrg: '',
    menuFootnote: '',

    posterDateChip: '',
    stickyVolDate: '',
    stickyPrice: '88元/位',
    stickyHint: '含甜品+饮品',

    progress: 0,
    stickyVisible: false,
    daysLeftLabel: '',
    regStatus: '',
    regBannerText: '',
    ctaText: '报名参加第三期',
    ctaTextShort: '立即报名',
    ctaAriaLabel: '报名参加第三期'
  },

  _scrollRaf: null,
  _lastProgress: 0,
  _lastSticky: false,
  _stickyTriggerPx: 0,
  _winHeight: 0,
  _totalHeight: 0,
  _heightCheckedAt: 0,
  _eventStartTs: 0,

  onLoad() {
    const sys = wx.getSystemInfoSync();
    this._winHeight = sys.windowHeight;
    this._stickyTriggerPx = rpxToPx(STICKY_TRIGGER_RPX, sys.windowWidth);

    const cur = D.getCurrent();
    const isV3 = cur.id === 'vol03';
    const icons = POINT_ICONS[cur.id] || [];

    // points 预处理：split body on \n\n 成 paragraphs
    const pointsWithIcons = (cur.points || []).map((p, i) => ({
      num: p.num,
      title: p.title,
      sub: p.sub || '',
      bodyParas: typeof p.body === 'string' ? p.body.split(/\n\n+/) : [p.body || ''],
      icon: icons[i] || ''
    }));

    const infoRows = [
      { label: '时间', value: cur.dateText || '', sub: cur.timeDetail || '' },
      { label: '地点', value: cur.location || '', sub: cur.locationNote || '' },
      { label: '入场', value: cur.price || '', sub: cur.priceNote || '' }
    ];

    this._eventStartTs = parseEventStartTs(cur);

    const numCN = numToCN(cur.number);
    const issueNumberCN = `第${numCN}期`;
    const ctaText = `报名参加${issueNumberCN}`;

    const stickyVolDate = `VOL.0${cur.number} · ${(cur.date || '').replace(/^\d{4}\./, '')}`;
    const posterDateChip = `DCT · VOL.0${cur.number} · ${cur.date || ''}`;

    this.setData({
      isV3,
      cur,
      issueId: cur.id,
      issueNumberCN,
      icons,
      pointsWithIcons,
      pitchTitleL1: isV3 ? V3_PITCH_TITLE_L1 : '在学术里保持严谨，',
      pitchTitleL2: isV3 ? V3_PITCH_TITLE_L2 : '在生活中追求热爱。',
      pitchParagraphs: isV3 ? V3_PITCH_PARAGRAPHS : [],
      dctBody: isV3 ? V3_DCT_BODY : [],
      teaserQuestions: (cur.teaserQuestions || []).map((q, i) => ({
        num: `Q.0${i + 1}`,
        text: q
      })),
      infoRows,
      posterSrc: cur.poster || '',
      speakerPhoto: (cur.speaker && cur.speaker.photo) || '',
      speakerName: (cur.speaker && cur.speaker.name) || '',
      speakerTitle: (cur.speaker && cur.speaker.title) || '',
      speakerBio: (cur.speaker && cur.speaker.bio) || '',
      speakerOrg: (cur.speaker && cur.speaker.org) || '',
      menuFootnote: cur.menuFootnote || '',
      posterDateChip,
      stickyVolDate,
      daysLeftLabel: computeDaysLeftLabel(this._eventStartTs),
      ctaText,
      ctaAriaLabel: ctaText
    });

    this.checkRegistration();
  },

  onShow() {
    const label = computeDaysLeftLabel(this._eventStartTs);
    if (label !== this.data.daysLeftLabel) {
      this.setData({ daysLeftLabel: label });
    }
  },

  checkRegistration() {
    if (!wx.cloud || !wx.cloud.callFunction) return;
    wx.cloud.callFunction({
      name: 'registration',
      data: { action: 'check', issueId: this.data.issueId }
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
      console.warn('[registration check] failed:', err && err.errMsg);
    });
  },

  onPageScroll(e) {
    if (this._scrollRaf) return;
    const scrollTop = (e && e.scrollTop) || 0;
    this._scrollRaf = setTimeout(() => {
      this._scrollRaf = null;
      this._handleScroll(scrollTop);
    }, 16);
  },

  _handleScroll(scrollTop) {
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
    this._measureTotalHeight();
  },

  goDetail() { wx.navigateTo({ url: '/pages/detail/detail' }); },
  goForm()   { wx.navigateTo({ url: '/pages/form/form' }); },
  goWall()   { wx.navigateTo({ url: '/pages/wall/wall' }); },

  onImgError(e) {
    console.warn('[img error]', (e && e.currentTarget && e.currentTarget.dataset) || e);
  },

  onShareAppMessage() {
    const cur = this.data.cur || {};
    return {
      title: `DCT VOL.0${cur.number} · ${cur.title} — ${cur.speaker && cur.speaker.name}${cur.speaker && cur.speaker.title || ''}`,
      path: '/pages/landing/landing?from=share'
    };
  },
  onShareTimeline() {
    const cur = this.data.cur || {};
    return {
      title: `${cur.title} · ${cur.speaker && cur.speaker.name}${cur.speaker && cur.speaker.title || ''}分享会`,
      query: 'from=timeline'
    };
  }
});
