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
  }
});
