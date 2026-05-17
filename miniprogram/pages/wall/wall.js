// CHG-20260517-01 · 电子留言墙 · 现场咖啡厅 TV 大屏（16:9 横屏）
//
// 实时数据：每 15s 调 cloudfunctions/getWallFeed 拉取 signups 集合中
//   issueId='vol03' + consentWall ≠ false + wallApproved ≠ false 的记录。
// Fallback：云函数失败 / 数据为空 时回退到 seed 数据，保证大屏永远不空。

const D = require('../../data/issues.js');

const FEED_POLL_MS = 15000;

const WALL_INTROS_SEED = [
  { who: '华西皮肤科·研二',   line: '对医美又心动又警惕' },
  { who: '麻醉科·主治',       line: '看够了手术室里的"美丽代价"' },
  { who: '社会学·田野中',     line: '在研究"被看见的脸"' },
  { who: '设计师·成都',       line: '每天画女孩的脸，最近开始画皱纹' },
  { who: '心理咨询师',         line: '陪了很多女孩走进医院又走出来' },
  { who: '医学生·临八',       line: '正在被科研和临床双重塑形' },
  { who: '咖啡因依赖者',       line: '想知道抗衰是不是智商税' },
  { who: '皮肤敏感患者',       line: '光是修复屏障就够我学一辈子' },
  { who: '前媒体人·转行中',   line: '写过太多医美稿，现在不敢写了' },
  { who: '产科医生',           line: '产后修复≠医美，但常被混为一谈' },
  { who: '神经科·博后',       line: '想聊聊"皮肤是另一个大脑"' },
  { who: '哲学系·硕一',       line: '在研究"什么算是变美"' },
  { who: '化妆品研发',         line: '配方里加得越多，敬畏越多' },
  { who: '产品经理·25',       line: '每天被算法推美貌焦虑' },
  { who: '正畸医生',           line: '我的同行们也常被问"做了吗"' },
  { who: '严肃讨论爱好者',     line: '想听一次不带广告的医美课' },
  { who: '皮肤科·进修',       line: '从基层来听一些不一样的声音' },
  { who: '甜品师·陌生的朋友', line: '今晚也是后厨的我' }
];

const WALL_QUESTIONS_SEED = [
  '医美的边界在哪里？什么时候是"医"，什么时候只是"美"？',
  '普通人怎么判断自己是不是真的需要医美？',
  '医美到底在解决问题，还是在制造焦虑？',
  '皮肤科医生自己怎么看抗衰？',
  '心理上的"不接纳自己"，能靠医美解决吗？',
  '当伴侣 / 父母不支持，要不要继续？',
  '审美标准被算法压成一张脸，我们还能选择吗？',
  '医美前最重要的一个问题，应该是什么？',
  '所谓"早 C 晚 A"到底是科学还是营销？',
  '修复屏障和医美抗老，应该先做哪个？',
  '一个皮肤科医生最常劝退别人做的项目是什么？',
  '"轻医美"真的轻吗？',
  '当我们说"自然感"——到底是谁定义的自然？',
  '如果只能给一个建议，你会对 25 岁的人说什么？',
  '如果只能给一个建议，你会对 45 岁的人说什么？'
];

const VISIBLE_INTROS = 5;
const VISIBLE_QS = 4;

function pad2(n) { return String(n).padStart(2, '0'); }

Page({
  data: {
    cur: null,
    speakerName: '讲者',
    hh: '00', mm: '00', ss: '00',
    dateLabel: '',
    introsToShow: [],
    qsToShow: [],
    qsTotal: 0,
    isLive: false  // 是否拿到了云函数实时数据
  },

  _clockTimer: null,
  _introTimer: null,
  _qTimer: null,
  _feedTimer: null,
  _introIdx: 0,
  _qIdx: 0,
  _intros: WALL_INTROS_SEED,
  _questions: WALL_QUESTIONS_SEED,

  onLoad() {
    const cur = D.getCurrent();
    const speakerName = (cur && cur.speaker && cur.speaker.name) || '讲者';

    this.setData({
      cur,
      speakerName,
      dateLabel: cur && cur.date ? `${cur.date} · 陌生的朋友咖啡厅` : '',
      qsTotal: this._questions.length
    });

    this._tick();
    this._renderColumns();

    this._clockTimer = setInterval(() => this._tick(), 1000);
    this._introTimer = setInterval(() => {
      this._introIdx = (this._introIdx + 1) % this._intros.length;
      this._renderColumns({ introOnly: true });
    }, 3000);
    this._qTimer = setInterval(() => {
      this._qIdx = (this._qIdx + 1) % this._questions.length;
      this._renderColumns({ qOnly: true });
    }, 4200);

    // 首次立刻拉一次，之后每 15s 轮询
    this._fetchFeed();
    this._feedTimer = setInterval(() => this._fetchFeed(), 15000);
  },

  onUnload() {
    if (this._clockTimer) clearInterval(this._clockTimer);
    if (this._introTimer) clearInterval(this._introTimer);
    if (this._qTimer) clearInterval(this._qTimer);
    if (this._feedTimer) clearInterval(this._feedTimer);
  },

  onHide() {
    // 后台时停止 timer，避免功耗
    if (this._clockTimer) { clearInterval(this._clockTimer); this._clockTimer = null; }
    if (this._feedTimer)  { clearInterval(this._feedTimer);  this._feedTimer = null; }
  },

  onShow() {
    if (!this._clockTimer) {
      this._tick();
      this._clockTimer = setInterval(() => this._tick(), 1000);
    }
    if (!this._feedTimer) {
      this._fetchFeed();
      this._feedTimer = setInterval(() => this._fetchFeed(), 15000);
    }
  },

  _tick() {
    const now = new Date();
    this.setData({
      hh: pad2(now.getHours()),
      mm: pad2(now.getMinutes()),
      ss: pad2(now.getSeconds())
    });
  },

  _fetchFeed() {
    if (!wx.cloud || !wx.cloud.callFunction) return;
    wx.cloud.callFunction({ name: 'getWallFeed', data: { limit: 200 } })
      .then(res => {
        const r = (res && res.result) || {};
        if (!r.ok) return;
        const newIntros = Array.isArray(r.intros) ? r.intros : [];
        const newQs = Array.isArray(r.questions) ? r.questions : [];
        // 至少要有 3 条 intro 才用 live；否则回退 seed（避免大屏太空）
        if (newIntros.length >= 3) {
          this._intros = newIntros;
        }
        if (newQs.length >= 3) {
          this._questions = newQs;
        }
        this.setData({
          isLive: newIntros.length >= 3 || newQs.length >= 3,
          qsTotal: this._questions.length
        });
      })
      .catch(err => {
        console.warn('[getWallFeed] failed:', err && err.errMsg);
      });
  },

  _renderColumns(opts) {
    opts = opts || {};
    const patch = {};
    const intros = this._intros;
    const questions = this._questions;
    if (!opts.qOnly) {
      const introsToShow = [];
      for (let k = 0; k < VISIBLE_INTROS; k++) {
        const item = intros[(this._introIdx + k) % intros.length];
        introsToShow.push({
          who: item.who,
          initial: (item.who && item.who.charAt(0)) || '·',
          line: item.line,
          opacity: 1 - (k * 0.16)
        });
      }
      patch.introsToShow = introsToShow;
    }
    if (!opts.introOnly) {
      const qsToShow = [];
      for (let k = 0; k < VISIBLE_QS; k++) {
        const idx = (this._qIdx + k) % questions.length;
        qsToShow.push({
          num: `Q.${pad2(idx + 1)}`,
          text: questions[idx],
          opacity: 1 - (k * 0.18)
        });
      }
      patch.qsToShow = qsToShow;
    }
    this.setData(patch);
  }
});
