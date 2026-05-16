// CHG-20260517-01 · detail 数据驱动 + 吧规重排（HEAD + 留言墙匿名 v3 专属）
const D = require('../../data/issues.js');

const FLOW_V3 = [
  { t: '19:00', l: '入场 · 自由落座 · 留言墙开屏' },
  { t: '19:20', l: '开场 & DCT 介绍' },
  { t: '19:30', l: '主题沙龙 · 皮里士多德博士' },
  { t: '20:40', l: '中场 · 留言墙互动' },
  { t: '20:55', l: '自由交流 / 提问' },
  { t: '21:25', l: '总结及下一期预告' }
];

const FLOW_DEFAULT = [
  { t: '18:40', l: '入场 · 自由落座' },
  { t: '19:00', l: '开场 & DCT 介绍' },
  { t: '19:10', l: '主题沙龙' },
  { t: '21:00', l: '自由交流' },
  { t: '21:20', l: '总结及下一期预告' }
];

// 吧规 · 把"尊重规则"放第一位（HEAD），后续依次列出；vol03 末尾追加"留言墙匿名"
const RULES_BASE = [
  { k: '尊重规则', v: '所有规则都是为了一个目的——让认真表达发生。读完它们，再开始我们的对话。', highlight: 'head' },
  { k: '保密',       v: '不传播他人经历与现场内容（除非对方明确同意）' },
  { k: '尊重',       v: '对观点可以尖锐，对人不可以刻薄' },
  { k: '不贴标签',   v: '少用「你就是…」，多用「我感觉 / 我理解…」' },
  { k: '非治疗场合', v: '非治疗性团体，只讨论，不提供医疗建议与诊断' },
  { k: '自由发言',   v: '友好氛围，允许沉默，允许争论' },
  { k: '友好纠错',   v: '欢迎随时友好提问' }
];

const RULE_WALL = {
  k: '留言墙匿名',
  v: '现场 TV 上滚动展示的身份与问题，已做匿名/化名处理；请勿对号入座、勿拍摄他人原文。',
  highlight: 'wall',
  tag: 'VOL.03'
};

Page({
  data: {
    isV3: false,
    cur: null,
    speakerLine: '',
    flow: [],
    rules: [],
    chips: [],
    dateText: '',
    timeDetail: '',
    location: '',
    locationNote: '',
    price: '',
    priceNote: ''
  },

  onLoad() {
    const cur = D.getCurrent();
    const isV3 = cur.id === 'vol03';
    const flow = isV3 ? FLOW_V3 : FLOW_DEFAULT;
    const rules = isV3 ? [...RULES_BASE, RULE_WALL] : RULES_BASE;
    const chips = isV3
      ? ['对主题感兴趣', '多学科背景优先', '愿意留下一句话身份 + 一个问题', '欢迎为讲者打赏']
      : ['对主题感兴趣', '欢迎为心仪的主讲人打赏', '多学科背景优先'];

    const speakerLine = cur.speaker
      ? `${cur.speaker.name}${cur.speaker.title ? ' · ' + cur.speaker.title : ''}${cur.speaker.org ? ' · ' + cur.speaker.org : ''}`
      : '';

    this.setData({
      isV3,
      cur,
      speakerLine,
      flow,
      rules,
      chips,
      dateText: cur.dateText || '',
      timeDetail: cur.timeDetail || '',
      location: cur.location || '',
      locationNote: cur.locationNote || '',
      price: cur.price || '',
      priceNote: cur.priceNote || ''
    });
  },

  goForm() {
    wx.navigateTo({ url: '/pages/form/form' });
  }
});
