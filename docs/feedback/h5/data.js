// data.js — DCT 意见反馈 模板数据中心
// 每期切换：只改 currentIssue 即可；如有特殊问题，往 extraQuestions 里加。
// 直接迁移自设计稿 untitled/project/data/feedback.js（去掉 window.DCT_FEEDBACK 命名以便 vanilla JS 引用）。

window.DCT_FEEDBACK = {
  currentIssue: {
    id: 'vol02',
    number: 2,
    title: '六星之路',
    subtitle: '我的目标管理与坚持哲学',
    date: '2026.04.25',
    dateText: '2026 年 4 月 25 日',
    speaker: '高晓蓉 教授',
    location: '武侯区 玉林 DCT 客厅',
    photo: '../assets/gao-portrait.jpg',
    poster: '../assets/poster.jpg',
    extraQuestions: []
  },

  brand: {
    name: 'DCT',
    fullName: "Doctors' Crazy Thinking",
    tagline: '认真地胡思乱想'
  },

  grades: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'],
  gradeLabels: {
    'A+': '惊艳', 'A': '很好', 'A-': '不错',
    'B+': '尚可', 'B': '一般', 'B-': '略平',
    'C+': '欠佳', 'C': '失望'
  },

  // 评分维度顺序与设计稿完全对齐
  dimensions: [
    {
      id: 'content',
      label: '分享内容',
      hint: '主题深度、嘉宾表达、是否有所启发',
      kind: 'grade',
      placeholder: '哪个观点让你停下来想了想？'
    },
    {
      id: 'venue',
      label: '场地与客厅氛围',
      hint: '空间感、布置、人与人的距离',
      kind: 'grade',
      placeholder: '有没有什么需要改进的地方呢？'
    },
    {
      id: 'food',
      label: '甜品与饮品',
      hint: '味道、份量、与主题的呼应',
      kind: 'grade',
      placeholder: '这次的桑葚巴斯克 / 红酒，可有惊喜？'
    },
    {
      id: 'pace',
      label: '时长与节奏',
      hint: '太赶？太松？刚好？',
      kind: 'grade',
      placeholder: '哪个环节希望更长 / 更短一些？'
    },
    {
      id: 'moment',
      label: '印象最深的一句话或瞬间',
      hint: '哪怕只是一个眼神、一段安静',
      kind: 'longtext',
      placeholder: '我记得那时候……'
    },
    {
      id: 'next',
      label: '下期主题 / 嘉宾推荐',
      hint: '你想在 DCT 客厅里听到谁、聊什么',
      kind: 'longtext',
      placeholder: '我想推荐 ___ 来聊 ___，因为……'
    },
    {
      id: 'suggest',
      label: '改进建议',
      hint: '挑剔一点没关系，DCT 想越长越好',
      kind: 'longtext',
      placeholder: '如果可以重来一次，我希望……'
    },
    {
      id: 'recommend',
      label: '是否愿意推荐朋友来',
      kind: 'yesno',
      options: [
        { value: 'yes', label: '愿意，已经在脑里点名了' },
        { value: 'maybe', label: '看主题，下次说' },
        { value: 'no', label: '暂时不会' }
      ]
    }
  ],

  signing: {
    nicknameLabel: '昵称（选填）',
    nicknamePlaceholder: '不填即匿名'
  }
};
