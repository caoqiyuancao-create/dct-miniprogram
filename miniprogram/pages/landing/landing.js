Page({
  data: {
    points: [
      {
        num: '01',
        title: '人生不是单一赛道',
        sub: '多重身份的平衡与深耕',
        body: '学者的严谨、管理者的务实、公益者的温度、跑者的坚韧——如何在其中探索更完整的自我。'
      },
      {
        num: '02',
        title: '用脚步丈量世界',
        sub: '坚持的力量',
        body: '从日复一日的训练，到走上世界马拉松大满贯「六星跑者」之路——10000 公里，究竟意味着什么？'
      },
      {
        num: '03',
        title: '笃定前行',
        sub: '目标与生活的无限可能',
        body: '关于个人年度目标管理，如何让期待落地、让计划发生——她的实践哲学。'
      }
    ],
    menu: [
      { name: '桑葚巴斯克',        tag: '攀枝花桑葚季' },
      { name: '桑葚酸奶杯',        tag: '攀枝花桑葚季' },
      { name: '红酒 · 有醇 / 无醇', tag: '自选' }
    ]
  },
  goDetail() {
    wx.navigateTo({ url: '/pages/detail/detail' });
  },
  goForm() {
    wx.navigateTo({ url: '/pages/form/form' });
  }
});
