// data/issues.js — 期次数据中心
// 换期只改这一个文件：新增一项 + 把 current 指过去即可。

window.DCT_DATA = {
  // 当前正在报名/进行的期号
  current: 'vol02',

  // DCT 整体信息（跨期）
  brand: {
    name: 'DCT',
    fullName: 'Doctors\' Crazy Thinking · Dog, Chef & Therapist',
    slogan: '认真地胡思乱想',
    tagline: '——用科学的态度，聊天马行空的奇思妙想',
    // 主页轮播的 slogan 集
    slogans: [
      '在学术里保持严谨，在生活中追求热爱',
      '认真地胡思乱想',
      '客厅里的家庭学术沙龙',
      '一块精神自留地',
      '用科学的态度，聊天马行空的奇思妙想',
    ],
    // 主页公告条（最近活动快讯）
    announcements: [
      { type: 'signup', text: '第二期 · 六星之路 · 报名开放中', date: '至 2026.04.22' },
      { type: 'info',   text: 'DCT 客厅地址暂定武侯区玉林', date: '' },
    ],
  },

  // 所有期次
  issues: [
    {
      id: 'vol03',
      number: 3,
      status: 'upcoming',           // upcoming | signup | ongoing | finished
      title: '（主题征集中）',
      subtitle: '第三期 · 敬请期待',
      date: '',
      speaker: { name: '', title: '' },
      poster: '',
      summary: '下一期主题与嘉宾正在酝酿中，欢迎通过 DCT 客厅留言推荐你想听的话题。',
    },
    {
      id: 'vol02',
      number: 2,
      status: 'signup',
      title: '六星之路',
      subtitle: '我的目标管理与坚持哲学',
      fullTitle: '六星之路：我的目标管理与坚持哲学',
      subtitle2: '写给学术追梦人的漫谈',
      date: '2026.04.25',
      dateText: '2026 年 4 月 25 日（周六）',
      timeDetail: '18:40 入场 · 19:00 开始',
      location: '武侯区 玉林 DCT 客厅',
      locationNote: '报名通过后微信通知具体地址',
      price: '88 元 / 位',
      priceNote: '含一份甜品 + 一杯酒 · 可打包带走',
      speaker: {
        name: '高晓蓉',
        title: '教授',
        org: '西南交通大学光电工程研究所',
        bio: '马拉松六星跑者 "Six Star Finisher"',
        photo: 'assets/gao-portrait.jpg',
        avatar: 'assets/gao-avatar-poster.png',
      },
      poster: 'assets/poster.png',
      // 三个分享侧面
      points: [
        { num: '01', title: '人生不是单一赛道', sub: '多重身份的平衡与深耕',
          body: '学者的严谨、管理者的务实、公益者的温度、跑者的坚韧——如何在其中探索更完整的自我。' },
        { num: '02', title: '用脚步丈量世界', sub: '坚持的力量',
          body: '从日复一日的训练，到走上世界马拉松大满贯「六星跑者」之路——10000 公里，究竟意味着什么？' },
        { num: '03', title: '笃定前行', sub: '目标与生活的无限可能',
          body: '关于个人年度目标管理，如何让期待落地、让计划发生——她的实践哲学。' },
      ],
      menu: [
        { name: '桑葚巴斯克',        tag: '攀枝花桑葚季' },
        { name: '桑葚酸奶杯',        tag: '攀枝花桑葚季' },
        { name: '红酒 · 有醇 / 无醇', tag: '自选' },
      ],
    },
    {
      id: 'vol01',
      number: 1,
      status: 'finished',
      title: '（回顾整理中）',
      subtitle: '第一期 · 2026.03.28',
      date: '2026.03.28',
      speaker: { name: '包文欣 / 徐佳淇 / 曹栖源', title: '主创' },
      poster: '',  // 待补
      summary: 'DCT 的第一次聚会，三位主创分别以 Dog、Chef、Therapist 三个身份切入，分享了关于知识、真诚与深度交流的期待。回顾文章正在整理中，欢迎期待。',
      highlights: [
        // 占位金句 / 精选观点
        { quote: '在绩效逻辑之外，留一块真诚分享的精神自留地。', author: 'DCT 主创' },
      ],
      photos: [],  // 待补
    },
  ],
};

// 快捷选择器
window.DCT_DATA.getCurrent = function() {
  return this.issues.find(i => i.id === this.current);
};
window.DCT_DATA.getPastIssues = function() {
  // 已结束的期次（不含当前期和未来期）
  return this.issues.filter(i => i.status === 'finished');
};
window.DCT_DATA.getById = function(id) {
  return this.issues.find(i => i.id === id);
};
