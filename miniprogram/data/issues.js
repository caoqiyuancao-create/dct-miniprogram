const data = {
  current: 'vol03',

  brand: {
    name: 'DCT',
    fullName: "Doctors' Crazy Thinking · Dog, Chef & Therapist",
    slogan: '认真地胡思乱想',
    tagline: '——用科学的态度，聊天马行空的奇思妙想',
    slogans: [
      '在学术里保持严谨，在生活中追求热爱',
      '认真地胡思乱想',
      '客厅里的家庭学术沙龙',
      '一块精神自留地',
      '用科学的态度，聊天马行空的奇思妙想'
    ],
    announcements: [
      { type: 'signup', text: '第三期 · 医美热时代的冷思考 · 报名开放中', date: '至 2026.05.20' },
      { type: 'info', text: '本期搬到武侯区棕南正街「陌生的朋友」咖啡厅', date: '' }
    ]
  },

  issues: [
    {
      id: 'vol03',
      number: 3,
      status: 'signup',
      title: '医美热时代的冷思考',
      subtitle: '当“变得更美”成为一种时代命题，它究竟意味着什么？',
      fullTitle: '医美热时代的冷思考',
      subtitle2: '“变得更好”，究竟是谁的命题？',
      date: '2026.05.23',
      dateText: '2026 年 5 月 23 日（周六）',
      timeDetail: '19:00 入场 · 21:30 结束',
      location: '武侯区棕南正街 "陌生的朋友" 咖啡厅',
      locationNote: '本期搬出客厅 · 与「陌生的朋友」共办的公共场 ',
      price: '88 元 / 位',
      priceNote: '含一份甜品 + 一杯饮品 · 可打包带走',
      speaker: {
        name: '皮里士多德',
        title: '博士',
        org: '华西医院 · 皮肤科',
        bio: '45° 的华西皮肤科博士',
        photo: '/assets/speaker-vol03-halfbody.jpg',
        avatar: '/assets/speaker-vol03-halfbody.jpg'
      },
      poster: '/assets/poster-vol03.jpg',
      points: [
        {
          num: '01',
          title: '医学的界限是什么',
          sub: '',
          body: '医美是医学技术，也有作用机制、适应证与风险边界。\n\n它能改变什么？又不能承担什么？'
        },
        {
          num: '02',
          title: '能做，该做？',
          sub: '',
          body: '当技术越来越普及，问题不只是“能不能做”。\n\n还有：适不适合做？做到什么程度？'
        },
        {
          num: '03',
          title: '谁在定义更好',
          sub: '',
          body: '滤镜、平台、流量与广告，正在塑造我们对“更好看”的想象。\n\n“更美”从来不只是个人选择。'
        },
        {
          num: '04',
          title: '改变之前，先问为什么',
          sub: '',
          body: '想变美并不浅薄。\n\n但在改变之前，也许可以先问：我想实现什么样的想象？'
        }
      ],
      // CHG-20260518-04/05：四问改写 + 注脚 a 清空（核心点已下沉至下方 OPENING PITCH 正文）
      teaserQuestions: [
        { q: '医美的本质，是“医”，还是“美”？', a: '' },
        { q: '人人都适合医美吗？',             a: '' },
        { q: '医美一定会让人变美吗？',         a: '' },
        { q: '当我们谈论“变美”时，究竟是在追求什么？', a: '' }
      ],
      menu: [
        { name: '黑松露巴斯克蛋糕', tag: '甜品' },
        { name: '抹茶巴斯克蛋糕', tag: '甜品' },
        { name: '椰柠冰茶', tag: '饮品 · 自选' },
        { name: '黑芝麻脆脆拿铁', tag: '饮品 · 自选' },
        { name: '粉雾岛屿饮品', tag: '饮品 · 自选' },
        { name: '好喝的抹茶芭乐椰', tag: '饮品 · 自选' }
      ],
      menuFootnote: '更多饮品可访问大众点评搜索「陌生的朋友」'
    },
    {
      id: 'vol02',
      number: 2,
      status: 'finished',
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
        photo: '/assets/gao-portrait.jpg',
        avatar: '/assets/gao-avatar-poster.png'
      },
      poster: '/assets/vol02-cover.jpg',
      points: [
        { num: '01', title: '人生不是单一赛道', sub: '多重身份的平衡与深耕',
          body: '学者的严谨、管理者的务实、公益者的温度、跑者的坚韧——如何在其中探索更完整的自我。' },
        { num: '02', title: '用脚步丈量世界', sub: '坚持的力量',
          body: '从日复一日的训练，到走上世界马拉松大满贯「六星跑者」之路——10000 公里，究竟意味着什么？' },
        { num: '03', title: '笃定前行', sub: '目标与生活的无限可能',
          body: '关于个人年度目标管理，如何让期待落地、让计划发生——她的实践哲学。' }
      ],
      menu: [
        { name: '桑葚巴斯克', tag: '攀枝花桑葚季' },
        { name: '桑葚酸奶杯', tag: '攀枝花桑葚季' },
        { name: '红酒 · 有醇 / 无醇', tag: '自选' }
      ],
      summary: '第二期我们请到了西南交大光电工程研究所的高晓蓉教授——一位马拉松「六星跑者」。她讲马拉松、读书会、英语单词打卡、博物馆公益讲解——一件一件都很认真，把每一件放进了无数个普通的一天。',
      photos: [
        '/assets/vol02-speaker.jpg',
        '/assets/vol02-cake-candle.jpg',
        '/assets/vol02-audience.jpg',
        '/assets/vol02-bowl.jpg',
        '/assets/vol02-cake-slice.jpg'
      ],
      // recap · 烛光与赛道 B 版结构化字段（详情页变体 candle-track）
      recap: {
        variant: 'candle-track',
        topic: '六星之路 · 我的目标管理与坚持哲学',
        attendees: '客厅 · 12 人',
        heroImg:      '/assets/poster.png',
        candleImg:    '/assets/vol02-cake-candle.jpg',
        speakerImg:   '/assets/vol02-speaker.jpg',
        audienceImg:  '/assets/vol02-audience.jpg',
        bowlImg:      '/assets/vol02-bowl.jpg',
        cakeSliceImg: '/assets/vol02-cake-slice.jpg',
        heroBadge: 'SIX · STAR · FINISHER',
        heroTitle: ['白天她在跑道上，', '夜晚她在客厅里。'],
        heroSub: '一场关于理想、现实、坚持、疲惫、热爱与放弃的真诚对谈。',
        // § 1
        sixCities: ['东京', '波士顿', '伦敦', '柏林', '芝加哥', '纽约'],
        stats: [
          { num: '10,000', unit: '公里', label: '累计跑步里程' },
          { num: '1,314',  unit: '次',   label: '记录里的跑步次数' }
        ],
        section1Outro: ['那晚真正打动我们的，不是这六颗星——', '而是她把这六颗星，变成生活的一部分的方式。'],
        // § 2 candle chapter divider
        candleChapter: {
          marker: '§ 02 · 然而那天晚上',
          lines: ['她坐进我们小小的客厅，', '和我们聊起'],
          hl: '"如何安放自己"'
        },
        // Lead
        leadCap: '那',
        leadBody: '天晚上的客厅里，桌上是烛灯、橙玫瑰、莓果蛋糕；投影上是高老师跑过的六座城市。她讲马拉松，讲读书会，讲英语单词打卡，讲博物馆公益讲解——一件一件，都很认真。',
        leadHighlight: '六座城市',
        // Hook
        hook: {
          kicker: '那晚的核心提问',
          q1: '一个跑完',
          q1Hl: '六大满贯',
          q1Tail: '的人，',
          q2: '为什么坐进我们小小的客厅，',
          q3: '聊起',
          q3Hl: '"如何安放自己"',
          q3Tail: '？'
        },
        // § 3 threads
        threadsKicker: '§ 03 · 我们顺着她，慢慢拆开了几条线索',
        threads: [
          '"六星"不是终点，而是一段日常生活的副产物',
          '怎样开始一件事，怎样重复，怎样在做了很多遍之后仍然重新看见它',
          '在不喜欢、甚至厌倦的时候，继续感受事情本身的细节',
          '我们缺的不是想象，是在想象成为现实之前，忍受焦虑的能力'
        ],
        sideCaption: '↑ 莓果碗 + Lotus · 蓝莓黑莓樱桃慕斯 · 那晚的所有甜，都是夜里的颜色',
        // § 4 big quote
        bigQuote: '所谓"六星"，是六座城市、六条赛道、六次出发。\n但真正打动我们的，是她怎样把一件事，一点点做成生活的一部分。',
        // § 5 habits
        habitsKicker: '§ 04 · 那些"放进日常"的事',
        habitsTitle: '她"坚持"的，远不止跑步',
        habitsSub: '—— 单独拿出来每一件都不轻，她把它们放进了很多个普通的一天',
        habits: [
          { k: '跑步',           d: '日复一日，跑到 10,000 公里 · 第 1,314 次' },
          { k: '读书会',         d: '带领、组织、出席，不缺席' },
          { k: '英语单词打卡',   d: '每天一打卡，多年未断' },
          { k: '国际会议追踪',   d: '把全球研究节奏装进作息' },
          { k: '博物馆公益讲解', d: '把所学，反复讲给陌生人' },
          { k: '公益',           d: '建图书馆 · 资助学生 · 长期投入' }
        ],
        // § 6 emotional peak
        peakKicker: '§ 05 · 她带来的',
        peakMeta: ['FIELD · 04.25 · 21:08', '讲到第 1,314 次跑步时'],
        peakQuote: ['她带来的不是标准答案。', '而是一份非常具体、非常诚实的——'],
        peakHl: '生命材料',
        peakBody: '她身上有一种动人的生命力——那不是被包装出来的"励志感"，而是一种长期生活之后，仍然保有的敏锐、热情和安静。',
        // § 7 12 majors
        majorsKicker: '§ 06 · 一个不大的客厅',
        majorsTitleLead: '坐下了',
        majorsTitleHl: '12 个不同专业',
        majorsTitleTail: '的思考',
        majors: ['光电', '电气', '医学', '哲学', '文字学', '人类学', '心理', '建筑', '法学', '材料', '历史', '计算机'],
        majorsBody: '每一次观点的碰撞，都让我们重新相信：跨学科交流的意义，不在于大家说同一种语言，而在于不同语言之间，仍然愿意互相翻译、互相靠近。',
        majorsBodyHl: '仍然愿意互相翻译、互相靠近',
        // Audience caption
        audienceCaption: ['那些原本悬浮在空中的想象，', '好像也因此慢慢有了——可以落脚的重量。'],
        // § 8 Closing
        thanksKicker: 'FROM · YOUR · HOSTS',
        thanksTitle: ['感谢那天晚上，', '来到 DCT 客厅坐坐的'],
        thanksHl: '每一位',
        thanksTail: '。',
        closingEssay: [
          '现代生活里，我们好像并不缺少想象——',
          '真正缺少的，',
          '是在想象变成现实的时间里，忍受焦虑的能力；',
          '是在树欲静而风不止的现实里，',
          '一次次学习——如何安放自己。'
        ],
        closingEssayHl: '如何安放自己',
        sheepTitle: 'DCT 不是给答案，',
        sheepIntro: '而是 ',
        sheepHl: '一起找一只走丢的羊',
        sheepTail: '。',
        closingP: '如果你也在某件事上长跑过、犹豫过、不喜欢过，又重新开始过——欢迎来 DCT 客厅坐坐 ～',
        signature: '— D · C · T · 2026 春末'
      },
      highlights: [
        { quote: '所谓"六星"，是六座城市、六条赛道、六次出发。但真正打动我们的，是她怎样把一件事，一点点做成生活的一部分。', author: 'DCT 第二期 · 现场金句' },
        { quote: '她带来的不是标准答案。而是一份非常具体、非常诚实的——生命材料。', author: 'DCT 第二期 · 编辑笔记' }
      ]
    },
    {
      id: 'vol01',
      number: 1,
      status: 'finished',
      title: '我们在客厅里聊了成人 ADHD',
      subtitle: '不是一场普通科普，也不是一次严肃讲座',
      date: '2026.03.28',
      speaker: { name: '曹叔', title: 'DCT 首席心理治疗师' },
      poster: '/assets/vol01-hero.jpg',
      photos: [
        '/assets/vol01-hero.jpg',
        '/assets/vol01-speaker-dogs.jpg',
        '/assets/vol01-talk.jpg',
        '/assets/vol01-dessert.jpg',
        '/assets/vol01-cocktail.jpg'
      ],
      // recap · 客厅夜谈 D 版结构化字段（详情页变体 night-talk）
      recap: {
        variant: 'night-talk',
        topic: '成人 ADHD 与诊断扩张',
        attendees: '客厅 · 15 人',
        sub: '那天晚上的客厅里，灯亮着，狗在脚边，我们相遇',
        leadHero: '/assets/vol01-hero.jpg',
        speakerImg: '/assets/vol01-speaker-dogs.jpg',
        sideImgs: ['/assets/vol01-dessert.jpg', '/assets/vol01-cocktail.jpg'],
        sideCaption: '也有甜点、酒、猫狗——和一些突然安静下来的瞬间。',
        hook: {
          kicker: '我们的问题',
          lines: [
            { text: '成人 ADHD，' },
            { text: '究竟是被医学发现的疾病，', accent: '被医学发现', color: 'amber' },
            { text: '还是被时代塑造出来的诊断？', accent: '被时代塑造', color: 'ember' }
          ]
        },
        threadsIntro: '我们顺着这个问题，慢慢拆开了几条线索 ——',
        threads: [
          'ADHD 如何从"儿童多动"逐渐走向"成人注意力问题"；',
          '精神、精神医学和药理学如何与人们理解痛苦的方式相互纠缠；',
          '媒体、畅销书和社交平台如何让越来越多人在诊断里认出自己；',
          '当"拖延、混乱、无法完成任务"被医学语言重新解释时——\n我们到底是在治疗疾病，还是在回应一个高绩效时代的焦虑。'
        ],
        bigQuote: '当我们把越来越多生活中的挫败交给医学来解释时，我们治愈的是疾病，还是现代社会对"完美表现"的焦虑？',
        closing: {
          title: '欢迎你也来，\n客厅里坐坐 ～',
          body: '有一点学术，有一点生活，有一点"不太正经"——但真的认真在想问题。'
        },
        keywords: ['成人 ADHD', '精神医学', '医疗化', '表现焦虑', '现代生活']
      },
      summary: '第一期 DCT 在玉林一间客厅里聊了「成人 ADHD」——主讲人曹叔抛出的问题是：成人 ADHD 究竟是被医学发现的疾病，还是被时代塑造出来的诊断？我们没有急着给答案，而是顺着这个问题拆开了精神医学史、诊断扩张、药物、媒体与高绩效焦虑等几条线索。',
      highlights: [
        { quote: '当我们把越来越多生活中的挫败交给医学来解释时，我们治愈的是疾病，还是现代社会对"完美表现"的焦虑？', author: 'DCT 第一期 · 现场金句' }
      ]
    }
  ]
};

data.getCurrent = function getCurrent() {
  return this.issues.find(item => item.id === this.current);
};

data.getPastIssues = function getPastIssues() {
  return this.issues.filter(item => item.status === 'finished');
};

data.getById = function getById(id) {
  return this.issues.find(item => item.id === id);
};

module.exports = data;
