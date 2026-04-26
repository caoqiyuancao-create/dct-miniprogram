// summary-mock.js — 主创汇总页演示数据
// 直接迁移自设计稿 untitled/project/data/feedback.js 里的 window.DCT_SUMMARY
// cloudfunction 接通后，这份数据会被 fetchSummary() 拉到的真实数据覆盖。

window.DCT_SUMMARY = {
  issueId: 'vol02',
  totalResponses: 18,
  averageStars: 4.6,

  distribution: {
    content: { 'A+': 56, 'A': 33, 'A-': 6,  'B+': 5, 'B': 0, 'B-': 0, 'C+': 0, 'C': 0 },
    venue:   { 'A+': 44, 'A': 39, 'A-': 11, 'B+': 6, 'B': 0, 'B-': 0, 'C+': 0, 'C': 0 },
    food:    { 'A+': 67, 'A': 22, 'A-': 11, 'B+': 0, 'B': 0, 'B-': 0, 'C+': 0, 'C': 0 },
    pace:    { 'A+': 33, 'A': 39, 'A-': 17, 'B+': 11,'B': 0, 'B-': 0, 'C+': 0, 'C': 0 }
  },
  recommend: { yes: 14, maybe: 3, no: 1 },

  openResponses: {
    content: [
      { author: '林同学', grade: 'A+', text: '高老师讲到第六块大满贯奖牌时，停了三秒——那三秒比任何一句话都用力。' },
      { author: '阿原',   grade: 'A',  text: '"在绩效逻辑之外留一块自留地"——这一句我抄在了笔记本扉页。' },
      { author: '匿名',   grade: 'A+', text: '从训练日记到目标管理那一段最受用，原来真的可以"把热爱写进 Excel"。' },
      { author: '小Q',    grade: 'A',  text: '希望可以多讲一些失败和放弃的瞬间，光看到坚持反而觉得离自己远。' },
      { author: '昭昭',   grade: 'A-', text: '前半段铺垫稍长，进入主题后非常精彩。' }
    ],
    venue: [
      { author: '匿名',   grade: 'A',  text: '客厅里没人玩手机，这件事本身就很难得。' },
      { author: '小江',   grade: 'A+', text: '灯光、座位的距离都恰好，像去朋友家做客而不是听课。' },
      { author: '林同学', grade: 'A',  text: '玉林这个位置太好了，散场后还可以一群人去吃宵夜。' },
      { author: '阿原',   grade: 'A-', text: '人多的时候后排听得有点吃力，下次可以考虑话筒。' }
    ],
    food: [
      { author: '小江',   grade: 'A+', text: '桑葚巴斯克和红酒的搭配让我惊到了，原来甜品也能讲故事。' },
      { author: '匿名',   grade: 'A+', text: '攀枝花桑葚季这个细节加分，是认真在做主题搭配。' },
      { author: '昭昭',   grade: 'A',  text: '无醇红酒很贴心，不喝酒的人也被照顾到了。' },
      { author: '小Q',    grade: 'A-', text: '甜品份量略小，可以再多一点点。' }
    ],
    pace: [
      { author: '匿名',   grade: 'A-', text: '前半段稍微赶了一点，问答环节意犹未尽。' },
      { author: '阿原',   grade: 'B+', text: '希望分享后留更多自由聊天时间。' },
      { author: '林同学', grade: 'A',  text: '两小时刚刚好，再长就会累。' },
      { author: '小江',   grade: 'A+', text: '节奏控制得很好，有起伏不沉闷。' }
    ],
    moment: [
      { author: '林同学', text: '高老师讲到第六块大满贯奖牌时，停了三秒——那三秒比任何一句话都用力。' },
      { author: '匿名',   text: '客厅里没人玩手机，这件事本身就很难得。' },
      { author: '阿原',   text: '"在绩效逻辑之外留一块自留地"——这一句我抄在了笔记本扉页。' },
      { author: '昭昭',   text: '听到她说"跑完六大满贯也只是开始"的时候，突然就鼻酸了。' },
      { author: '小江',   text: '甜品端上来的瞬间，全场轻轻"哇"了一声，那个瞬间很可爱。' },
      { author: '小Q',    text: '问答环节有人问"如果失败了怎么办"，老师认真想了十几秒才答。' }
    ],
    next: [
      { author: '林同学', text: '想听一位文科教授聊「写不出来的时候怎么办」。' },
      { author: '匿名',   text: '心理学方向，话题：当代人的「无聊」缺失。' },
      { author: '小江',   text: '一位正在做田野调查的人类学博士。' },
      { author: '阿原',   text: '建筑师聊「为陌生人盖房」。' },
      { author: '昭昭',   text: '想听一位独立纪录片导演讲选题与坚持。' },
      { author: '小Q',    text: '医生聊聊「如何与不确定性共处」。' }
    ],
    suggest: [
      { author: '匿名',   text: '想多留 30 分钟自由交谈。' },
      { author: '阿原',   text: '可以加一个简单的破冰环节，让陌生人之间更容易开口。' },
      { author: '小Q',    text: '可以提前发一份小阅读清单，让大家更有准备。' },
      { author: '昭昭',   text: '希望未来可以做一次"失败专题"。' },
      { author: '林同学', text: '若能录制音频回放就好了，错过会很可惜。' }
    ]
  },

  topWords: [
    { word: '坚持',   count: 11 },
    { word: '客厅',   count: 9  },
    { word: '真诚',   count: 8  },
    { word: '六星',   count: 7  },
    { word: '甜品',   count: 6  },
    { word: '安静',   count: 5  },
    { word: '热爱',   count: 5  },
    { word: '目标',   count: 4  },
    { word: '马拉松', count: 4  },
    { word: '深度',   count: 3  }
  ]
};
