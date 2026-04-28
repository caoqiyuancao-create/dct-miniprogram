const scenes = [
  { variant: 'sky', caption: '一切从天时地利人和说起', sub: '2026 · 一个客厅 · 三个 PhD' },
  { variant: 'three', caption: '一只狗、一道菜、一次对话', sub: 'Dog · Chef · Therapist' },
  { variant: 'seedling', caption: '在绩效之外', sub: '留一块精神自留地' },
  { variant: 'brand', caption: "Doctors' Crazy Thinking", sub: '认真地胡思乱想' },
  { variant: 'living', caption: '客厅里的家庭学术沙龙', sub: '一期一会 · 不功利的深度交流' },
  { variant: 'invite', caption: '欢迎你也来', sub: '一起建设这块自留地' }
];

Page({
  data: {
    scene: 0,
    playing: true,
    scenes,
    fieldTiles: [1, 2, 3, 4, 5, 6],
    inviteStars: [0, 1, 2, 3, 4],
    creators: [
      {
        letter: 'D',
        word: 'Dog',
        name: '包文欣',
        role: '狗子',
        desc: '重度爱狗人士。把对一只狗的耐心、好奇和温柔，复刻进对每一个人的提问里。'
      },
      {
        letter: 'C',
        word: 'Chef',
        name: '徐佳淇',
        role: '厨子',
        desc: '家宴的策划者。相信好的食物能让人放松地说真话——所以每一期都有限定的甜品与酒。'
      },
      {
        letter: 'T',
        word: 'Therapist',
        name: '曹栖源',
        role: '治疗师',
        desc: '日常工作是聆听与共情。把临床里训练出的「倾听肌肉」，搬进这间客厅。'
      }
    ],
    meanings: [
      { num: '01', en: 'Dog · Chef · Therapist', zh: '三个人的三种身份' },
      { num: '02', en: "Doctors' Crazy Thinking", zh: '一群医生的胡思乱想' },
      { num: '03', en: '认真地胡思乱想', zh: '用科学的态度，聊天马行空的奇思妙想', highlight: true }
    ]
  },

  onLoad() {
    this.play();
  },

  onUnload() {
    this.clearTimer();
  },

  onHide() {
    this.clearTimer();
  },

  onShow() {
    if (this.data.playing) this.play();
  },

  play() {
    this.clearTimer();
    if (!this.data.playing) return;
    this.timer = setInterval(() => {
      const next = this.data.scene + 1;
      if (next >= this.data.scenes.length) {
        this.clearTimer();
        this.setData({ playing: false });
        return;
      }
      this.setData({ scene: next });
    }, 2400);
  },

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  chooseScene(e) {
    const index = Number(e.currentTarget.dataset.index);
    this.clearTimer();
    this.setData({ scene: index, playing: false });
  },

  replay() {
    this.clearTimer();
    this.setData({ scene: 0, playing: true }, () => this.play());
  },

  goHome() {
    wx.navigateBack({ fail: () => wx.reLaunch({ url: '/pages/home/home' }) });
  },

  goLanding() {
    wx.navigateTo({ url: '/pages/landing/landing' });
  }
});
