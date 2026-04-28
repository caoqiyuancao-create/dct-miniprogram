// CHG-20260428-03 F2 (加入日历) + F4 (邀请券 Canvas 海报)
//
// F4 注：当前实现是 v1 占位 ——
// 完整设计稿要求：海报蓝天 SVG → "六星之路"标题 → 用户姓名 → 日期 → 地址 → 二维码 → DCT logo。
// v1 先用纯 Canvas API 画出文字 + 渐变底色 + DCT 字样 + 日期，验证保存到相册流程通。
// 二维码（小程序码）需后端 wxacode.getUnlimited 配合，留 TODO，等 F1 / F3 数据完整再做。

const EVENT_TITLE = 'DCT VOL.02 · 六星之路';
const EVENT_DESC = '高晓蓉教授分享 · DCT 客厅';
const EVENT_LOCATION = '武侯区 玉林 DCT 客厅';
const EVENT_START = Date.parse('2026-04-25 19:00:00') / 1000;
const EVENT_END   = Date.parse('2026-04-25 22:00:00') / 1000;

Page({
  data: {
    constellation: [
      { x: 50, y: 50, s: 40, o: 1    },
      { x: 22, y: 28, s: 14, o: 0.75 },
      { x: 78, y: 30, s: 12, o: 0.7  },
      { x: 18, y: 72, s: 10, o: 0.55 },
      { x: 82, y: 70, s: 16, o: 0.85 }
    ],
    steps: [
      { state: 'done',   label: '报名已提交',                     sub: '刚刚' },
      { state: 'active', label: 'DCT 主创在审核',                 sub: '通常 24 小时内完成' },
      { state: '',       label: '微信通知结果',                    sub: '通过后将发送入群二维码 & 具体地址' },
      { state: '',       label: '2026 年 4 月 25 日 · 周六见',    sub: '18:40 入场 · 第二期 · 六星之路', last: true }
    ]
  },

  backToLanding() {
    wx.reLaunch({ url: '/pages/landing/landing' });
  },

  // ---- F2 加入日历 ----
  addToCalendar() {
    if (!wx.addPhoneCalendar) {
      wx.showToast({ title: '当前微信版本不支持', icon: 'none' });
      return;
    }
    wx.addPhoneCalendar({
      title: EVENT_TITLE,
      description: EVENT_DESC,
      location: EVENT_LOCATION,
      startTime: EVENT_START,
      endTime: EVENT_END,
      alarm: true,
      alarmOffset: 86400, // 提前 1 天
      success: () => wx.showToast({ title: '已加入日历', icon: 'success' }),
      fail: (err) => {
        console.warn('[addPhoneCalendar] failed:', err && err.errMsg);
        wx.showToast({ title: '加入日历失败', icon: 'none' });
      }
    });
  },

  // ---- F4 生成邀请券 Canvas 海报 ----
  generateTicket() {
    wx.showLoading({ title: '正在生成…', mask: true });
    const ctx = wx.createCanvasContext('ticketCanvas', this);
    const W = 750;
    const H = 1334;

    // 背景渐变（海报蓝天）
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,    '#e7f0fa');
    grad.addColorStop(0.5,  '#c9ddf3');
    grad.addColorStop(1,    '#9dbfe3');
    ctx.setFillStyle(grad);
    ctx.fillRect(0, 0, W, H);

    // 顶部金色 monospace
    ctx.setFillStyle('#c9a24a');
    ctx.setFontSize(20);
    ctx.setTextAlign('center');
    ctx.fillText('DCT · VOL.02 · 2026.04.25', W / 2, 120);

    // 主标题（宋体）
    ctx.setFillStyle('#0f2855');
    ctx.setFontSize(86);
    ctx.font = 'bold 86px "Songti SC", serif';
    ctx.fillText('六星之路', W / 2, 320);

    // 副标题
    ctx.setFontSize(28);
    ctx.font = 'normal 28px "PingFang SC", sans-serif';
    ctx.setFillStyle('#1a3a78');
    ctx.fillText('目标管理与坚持哲学', W / 2, 380);

    // 8 角金星装饰
    drawStar(ctx, W / 2, 540, 60, '#e9b949');

    // 邀请词
    ctx.setFontSize(26);
    ctx.setFillStyle('#3d5f94');
    ctx.fillText('诚邀你来到客厅', W / 2, 680);
    ctx.fillText('一起认真地胡思乱想', W / 2, 720);

    // 日期 / 地点
    ctx.setFontSize(24);
    ctx.setFillStyle('#2a3d5c');
    ctx.fillText('2026 年 4 月 25 日（周六）19:00', W / 2, 880);
    ctx.fillText('武侯区 · 玉林 · DCT 客厅', W / 2, 920);

    // 底部 monospace
    ctx.setFontSize(18);
    ctx.setFillStyle('#55709a');
    ctx.fillText('DCT · EST. 2026 · CHENGDU · IN A LIVING ROOM', W / 2, 1240);

    ctx.draw(false, () => {
      // 转图片 + 保存到相册
      wx.canvasToTempFilePath({
        canvasId: 'ticketCanvas',
        x: 0, y: 0, width: W, height: H,
        destWidth: W * 2, destHeight: H * 2,
        success: (res) => {
          wx.hideLoading();
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => wx.showToast({ title: '已保存到相册', icon: 'success' }),
            fail: (err) => {
              if (err && err.errMsg && err.errMsg.indexOf('auth deny') >= 0) {
                wx.showModal({
                  title: '需要相册权限',
                  content: '保存邀请券需要相册权限，去设置里开启？',
                  confirmText: '去设置',
                  success: (r) => { if (r.confirm) wx.openSetting(); }
                });
              } else {
                wx.showToast({ title: '保存失败', icon: 'none' });
              }
            }
          });
        },
        fail: () => { wx.hideLoading(); wx.showToast({ title: '生成失败', icon: 'none' }); }
      }, this);
    });
  }
});

// 8 角星填充（CHG-02 风格 polygon）
function drawStar(ctx, cx, cy, r, color) {
  ctx.beginPath();
  const pts = [
    [50,  0], [58, 42], [100, 50], [58, 58],
    [50, 100], [42, 58], [0,  50], [42, 42]
  ];
  pts.forEach(([px, py], i) => {
    const x = cx + (px - 50) * r / 50;
    const y = cy + (py - 50) * r / 50;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.setFillStyle(color);
  ctx.fill();
}
