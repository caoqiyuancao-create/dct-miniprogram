// CHG-20260517-01 · success 页 v3：留言墙预告卡 + v3 文案 + Canvas 邀请券 v3 文案
// 数据驱动（getCurrent）。F2 加入日历 / F4 生成邀请券。

const D = require('../../data/issues.js');

const NUM_CN = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
function numToCN(n) { return NUM_CN[n] || String(n); }

Page({
  data: {
    isV3: false,
    cur: null,
    constellation: [
      { x: 50, y: 50, s: 40, o: 1 },
      { x: 22, y: 28, s: 14, o: 0.75 },
      { x: 78, y: 30, s: 12, o: 0.7 },
      { x: 18, y: 72, s: 10, o: 0.55 },
      { x: 82, y: 70, s: 16, o: 0.85 }
    ],
    steps: [],

    eventTitle: '',
    eventDesc: '',
    eventLocation: '',
    eventStartTs: 0,
    eventEndTs: 0
  },

  onLoad() {
    const cur = D.getCurrent();
    const isV3 = cur.id === 'vol03';
    const numCN = numToCN(cur.number);

    const eventTitle = `DCT VOL.0${cur.number} · ${cur.title}`;
    const eventDesc = `${cur.speaker && cur.speaker.name}${cur.speaker && cur.speaker.title || ''}分享 · ${isV3 ? '陌生的朋友咖啡厅' : 'DCT 客厅'}`;
    const eventLocation = cur.location || '';

    const m = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(cur.date || '');
    const startTs = m ? Date.parse(`${m[1]}-${m[2]}-${m[3]} 19:00:00`) / 1000 : 0;
    const endTs = startTs ? startTs + 9000 : 0; // +2.5h

    const stepSubFirst = isV3
      ? '19:00 入场 · 第三期 · 医美热时代的冷思考'
      : '18:40 入场 · 第二期 · 六星之路';
    const stepLabelLast = `${cur.dateText || ''} · 周${'一二三四五六日'[(new Date(`${m && m[1]}-${m && m[2]}-${m && m[3]}`).getDay() + 6) % 7] || '六'}见`;

    const steps = [
      { state: 'done',   label: '报名已提交',                     sub: '刚刚' },
      { state: 'active', label: `DCT 主创在审核`,                 sub: '通常 24 小时内完成' },
      { state: '',       label: '微信通知结果',                    sub: '通过后将发送入群二维码 & 具体地址' },
      { state: '',       label: stepLabelLast,                    sub: stepSubFirst, last: true }
    ];

    this.setData({
      isV3,
      cur,
      issueNumberCN: numCN,
      steps,
      eventTitle,
      eventDesc,
      eventLocation,
      eventStartTs: startTs,
      eventEndTs: endTs
    });
  },

  backToLanding() {
    wx.reLaunch({ url: '/pages/landing/landing' });
  },

  goWall() {
    wx.navigateTo({ url: '/pages/wall/wall' });
  },

  addToCalendar() {
    if (!wx.addPhoneCalendar) {
      wx.showToast({ title: '当前微信版本不支持', icon: 'none' });
      return;
    }
    wx.addPhoneCalendar({
      title: this.data.eventTitle,
      description: this.data.eventDesc,
      location: this.data.eventLocation,
      startTime: this.data.eventStartTs,
      endTime: this.data.eventEndTs,
      alarm: true,
      alarmOffset: 86400,
      success: () => wx.showToast({ title: '已加入日历', icon: 'success' }),
      fail: (err) => {
        console.warn('[addPhoneCalendar] failed:', err && err.errMsg);
        wx.showToast({ title: '加入日历失败', icon: 'none' });
      }
    });
  },

  generateTicket() {
    const cur = this.data.cur;
    if (!cur) return;
    wx.showLoading({ title: '正在生成…', mask: true });
    const ctx = wx.createCanvasContext('ticketCanvas', this);
    const W = 750;
    const H = 1334;

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,    '#e7f0fa');
    grad.addColorStop(0.5,  '#c9ddf3');
    grad.addColorStop(1,    '#9dbfe3');
    ctx.setFillStyle(grad);
    ctx.fillRect(0, 0, W, H);

    ctx.setFillStyle('#c9a24a');
    ctx.setFontSize(20);
    ctx.setTextAlign('center');
    ctx.fillText(`DCT · VOL.0${cur.number} · ${cur.date}`, W / 2, 120);

    ctx.setFillStyle('#0f2855');
    ctx.setFontSize(76);
    ctx.font = 'bold 76px "Songti SC", serif';
    ctx.fillText(cur.title || '', W / 2, 320);

    ctx.setFontSize(26);
    ctx.font = 'normal 26px "PingFang SC", sans-serif';
    ctx.setFillStyle('#1a3a78');
    ctx.fillText(cur.subtitle || '', W / 2, 380);

    drawStar(ctx, W / 2, 540, 60, '#e9b949');

    ctx.setFontSize(26);
    ctx.setFillStyle('#3d5f94');
    ctx.fillText('诚邀你来到', W / 2, 680);
    ctx.fillText(this.data.isV3 ? '「陌生的朋友」 · 一起冷思考' : '客厅，一起认真地胡思乱想', W / 2, 720);

    ctx.setFontSize(24);
    ctx.setFillStyle('#2a3d5c');
    ctx.fillText(cur.dateText || '', W / 2, 880);
    ctx.fillText(cur.location || '', W / 2, 920);

    ctx.setFontSize(18);
    ctx.setFillStyle('#55709a');
    ctx.fillText('DCT · EST. 2026 · CHENGDU', W / 2, 1240);

    ctx.draw(false, () => {
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

function drawStar(ctx, cx, cy, r, color) {
  ctx.beginPath();
  const pts = [[50,0],[58,42],[100,50],[58,58],[50,100],[42,58],[0,50],[42,42]];
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
