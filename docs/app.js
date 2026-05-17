// CHG-20260517-01 · H5 端第三期上线
// 与小程序共用 cloudfunctions/submitSignup（issueId='vol03'）+ signups 集合
// 四屏（landing / detail / form / success）+ 新增 wall 屏，靠 hash 路由切换

// ===== 期号常量 =====
const ISSUE_ID = 'vol03';
const ISSUE_NUMBER_CN = '三';

// ===== Data =====
const SPEAKER = {
  name: '皮里士多德',
  title: '博士',
  org: '华西医院 · 皮肤科',
  bio: '45° 的华西皮肤科博士',
  photo: 'assets/speaker-vol03-halfbody.jpg'
};

const POSTER_SRC = 'assets/poster-vol03.jpg';

// CHG-20260517-01 D1：teaserQuestions 升级为 { q, a }[]
const TEASER_QUESTIONS = [
  {
    q: '医学的界限在哪里？',
    a: '医美是医学技术，也有作用机制、适应证与风险边界——它能改变什么？又不能承担什么？'
  },
  {
    q: '"美"由谁定义？',
    a: '滤镜、平台、流量与广告，正在塑造我们对"更好看"的想象——"更美"从来不只是个人选择。'
  },
  {
    q: '当我们想变美时，我们在回应什么？',
    a: '想变美并不浅薄。但在改变之前，也许可以先问：我想实现的，是谁的想象？'
  },
  {
    q: '医美改变的是皮肤，还是自我？',
    a: '当技术越来越普及，问题不只是"能不能做"——还有适不适合做、做到什么程度。'
  }
];

const MENU = [
  { name: '黑松露巴斯克蛋糕', tag: '甜品' },
  { name: '抹茶巴斯克蛋糕',   tag: '甜品' },
  { name: '椰柠冰茶',          tag: '饮品 · 自选' },
  { name: '黑芝麻脆脆拿铁',    tag: '饮品 · 自选' },
  { name: '粉雾岛屿饮品',      tag: '饮品 · 自选' },
  { name: '好喝的抹茶芭乐椰',  tag: '饮品 · 自选' }
];
const MENU_FOOTNOTE = '更多饮品可访问大众点评搜索「陌生的朋友」';

const FLOW = [
  { t: '19:00', l: '入场 · 自由落座 · 留言墙开屏' },
  { t: '19:20', l: '开场 & DCT 介绍' },
  { t: '19:30', l: '主题沙龙 · 皮里士多德博士' },
  { t: '20:40', l: '中场 · 留言墙互动' },
  { t: '20:55', l: '自由交流 / 提问' },
  { t: '21:25', l: '总结及下一期预告' }
];

const RULES = [
  { k: '尊重规则',   v: '所有规则都是为了一个目的——让认真表达发生。读完它们，再开始我们的对话。', highlight: 'head' },
  { k: '保密',       v: '不传播他人经历与现场内容（除非对方明确同意）' },
  { k: '尊重',       v: '对观点可以尖锐，对人不可以刻薄' },
  { k: '不贴标签',   v: '少用「你就是…」，多用「我感觉 / 我理解…」' },
  { k: '非治疗场合', v: '非治疗性团体，只讨论，不提供医疗建议与诊断' },
  { k: '自由发言',   v: '友好氛围，允许沉默，允许争论' },
  { k: '友好纠错',   v: '欢迎随时友好提问' },
  { k: '留言墙匿名', v: '现场 TV 上滚动展示的身份与问题，已做匿名/化名处理；请勿对号入座、勿拍摄他人原文。', highlight: 'wall', tag: 'VOL.03' }
];

const CHIPS = ['对主题感兴趣', '多学科背景优先', '愿意留下一句话身份 + 一个问题', '欢迎为讲者打赏'];

const STEPS = [
  { state: 'done',   label: '报名已提交',                       sub: '刚刚' },
  { state: 'active', label: 'DCT 主创在审核',                   sub: '通常 24 小时内完成' },
  { state: '',       label: '微信通知结果',                     sub: '通过后将发送入群二维码 & 具体地址' },
  { state: '',       label: '2026 年 5 月 23 日 · 周六见',      sub: '19:00 入场 · 第三期 · 医美热时代的冷思考', last: true }
];

const RAYS = [
  { deg: -62, len: 170, w: 21, op: 0.22 }, { deg: -55, len: 160, w: 14, op: 0.17 },
  { deg: -48, len: 175, w: 25, op: 0.26 }, { deg: -40, len: 165, w: 16, op: 0.16 },
  { deg: -33, len: 170, w: 30, op: 0.24 }, { deg: -25, len: 160, w: 14, op: 0.14 },
  { deg: -18, len: 150, w: 22, op: 0.20 }, { deg: -10, len: 140, w: 13, op: 0.12 }
];
const STARS_BG = [
  { x: 78, y: 18, s: 18, o: 0.9 },  { x: 62, y: 44, s: 13, o: 0.75 },
  { x: 86, y: 54, s: 10, o: 0.65 }, { x: 48, y: 66, s: 16, o: 0.85 },
  { x: 72, y: 78, s: 11, o: 0.7 },  { x: 34, y: 30, s: 9,  o: 0.55 },
  { x: 92, y: 32, s: 8,  o: 0.5 },  { x: 22, y: 72, s: 12, o: 0.7 }
];
const CONSTELLATION = [
  { x: 50, y: 50, s: 40, o: 1 },    { x: 22, y: 28, s: 14, o: 0.75 },
  { x: 78, y: 30, s: 12, o: 0.7 },  { x: 18, y: 72, s: 10, o: 0.55 },
  { x: 82, y: 70, s: 16, o: 0.85 }
];

// ===== 留言墙 seed 数据（与小程序 wall.js 同源） =====
const WALL_INTROS = [
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
const WALL_QUESTIONS = [
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
const SELF_INTRO_MAX = 40;
const EXPECTATION_MAX = 120;

// ===== Render helpers =====
function el(id) { return document.getElementById(id); }

function renderRays(container) {
  container.innerHTML = RAYS.map(r => {
    const op2 = r.op * 0.6;
    return `<div class="ray" style="width:${r.len}%;height:${r.w}px;transform:rotate(${r.deg}deg);background:linear-gradient(90deg,rgba(255,255,255,${r.op}) 0%,rgba(255,255,255,${op2}) 50%,rgba(255,255,255,0) 100%);"></div>`;
  }).join('');
}

function renderStars(container, arr) {
  container.innerHTML = arr.map(s => {
    const boxPx = s.s * 2;
    return `<div class="star4" style="left:${s.x}%;top:${s.y}%;opacity:${s.o};width:${boxPx}px;height:${boxPx}px;">
      <div class="star-glow"></div>
      <div class="ray-v"></div>
      <div class="ray-h"></div>
      <div class="core"></div>
    </div>`;
  }).join('');
}

// CHG-20260517-01 D2 · 合并版"四问 + 冷思考"卡
function renderFourQ() {
  const elx = el('four-q-list');
  if (!elx) return;
  elx.innerHTML = TEASER_QUESTIONS.map((item, i) => `
    <div class="four-q__row">
      <div class="four-q__row-top">
        <div class="mono four-q__no">Q.0${i + 1}</div>
        <div class="serif four-q__q">${item.q}</div>
      </div>
      ${item.a ? `<div class="four-q__a">${item.a}</div>` : ''}
    </div>
  `).join('');
}

function renderMenu() {
  const elx = el('menu');
  if (!elx) return;
  elx.innerHTML = MENU.map(m => `
    <div class="menu-row">
      <span class="star-bullet star-brown"></span>
      <div class="serif menu-name">${m.name}</div>
      <div class="mono menu-tag">${m.tag}</div>
    </div>
  `).join('');
}

function renderFlow() {
  const elx = el('flow');
  if (!elx) return;
  elx.innerHTML = FLOW.map(f => `
    <div class="flow-row">
      <div class="mono flow-time">${f.t}</div>
      <div class="flow-label">${f.l}</div>
    </div>
  `).join('');
}

function renderRules() {
  const elx = el('rules');
  if (!elx) return;
  elx.innerHTML = RULES.map((r, i) => {
    const cls = r.highlight === 'head' ? 'rules-row--head'
              : r.highlight === 'wall' ? 'rules-row--wall' : '';
    const numHtml = r.highlight === 'head'
      ? `<div class="rule-star">★</div>`
      : `<div class="rule-num">${i + 1}</div>`;
    const tagHtml = r.highlight === 'head'
      ? `<span class="mono rule-tag rule-tag--head">HEAD</span>`
      : (r.tag ? `<span class="mono rule-tag rule-tag--vol">${r.tag}</span>` : '');
    return `
      <div class="rules-row ${cls}">
        ${numHtml}
        <div class="rule-body">
          <div class="rule-head">
            <div class="rule-k">${r.k}</div>
            ${tagHtml}
          </div>
          <div class="rule-v">${r.v}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderChips() {
  const elx = el('chips');
  if (!elx) return;
  elx.innerHTML = CHIPS.map(c => `<div class="chip">${c}</div>`).join('');
}

function renderConstellation() {
  const elx = el('constellation');
  if (!elx) return;
  renderStars(elx, CONSTELLATION);
}

function renderTimeline() {
  const elx = el('timeline');
  if (!elx) return;
  elx.innerHTML = STEPS.map(s => `
    <div class="step ${s.state ? 'step-' + s.state : ''}">
      <div class="step-rail">
        <div class="dot ${s.state ? 'dot-' + s.state : ''}">
          ${s.state === 'done' ? '<div class="dot-check"></div>' : ''}
        </div>
        ${!s.last ? '<div class="line"></div>' : ''}
      </div>
      <div class="step-body">
        <div class="step-label">${s.label}</div>
        <div class="step-sub">${s.sub}</div>
      </div>
    </div>
  `).join('');
}

function populateBackgrounds() {
  document.querySelectorAll('.sky-rays').forEach(renderRays);
  document.querySelectorAll('.sky-stars').forEach(elx => renderStars(elx, STARS_BG));
}

// ===== Wall（留言墙 · 横屏 TV 预览） =====
const VISIBLE_INTROS = 5;
const VISIBLE_QS = 4;
let wallIntroIdx = 0;
let wallQIdx = 0;
let wallClockTimer = null;
let wallIntroTimer = null;
let wallQTimer = null;

function pad2(n) { return String(n).padStart(2, '0'); }

function renderWallClock() {
  const now = new Date();
  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());
  const c = el('wall-clock');
  if (c) c.innerHTML = `<span>${hh}</span>:<span>${mm}</span><span class="wall-clock-gold">:${ss}</span>`;
}

function renderWallIntros() {
  const elx = el('wall-intros');
  if (!elx) return;
  const arr = [];
  for (let k = 0; k < VISIBLE_INTROS; k++) {
    const item = WALL_INTROS[(wallIntroIdx + k) % WALL_INTROS.length];
    const opacity = 1 - (k * 0.16);
    arr.push(`
      <div class="intro-card" style="opacity:${opacity}">
        <div class="intro-card__avatar">${item.who.charAt(0)}</div>
        <div class="intro-card__body">
          <div class="mono intro-card__who">${item.who}</div>
          <div class="intro-card__line">"${item.line}"</div>
        </div>
      </div>
    `);
  }
  elx.innerHTML = arr.join('');
}

function renderWallQs() {
  const elx = el('wall-qs');
  if (!elx) return;
  const arr = [];
  for (let k = 0; k < VISIBLE_QS; k++) {
    const idx = (wallQIdx + k) % WALL_QUESTIONS.length;
    const opacity = 1 - (k * 0.18);
    arr.push(`
      <div class="q-card" style="opacity:${opacity}">
        <div class="serif q-card__quote">"</div>
        <div class="mono q-card__num">Q.${pad2(idx + 1)}</div>
        <div class="serif q-card__text">${WALL_QUESTIONS[idx]}</div>
      </div>
    `);
  }
  elx.innerHTML = arr.join('');
}

function startWallTimers() {
  stopWallTimers();
  renderWallClock();
  renderWallIntros();
  renderWallQs();
  wallClockTimer = setInterval(renderWallClock, 1000);
  wallIntroTimer = setInterval(() => {
    wallIntroIdx = (wallIntroIdx + 1) % WALL_INTROS.length;
    renderWallIntros();
  }, 3000);
  wallQTimer = setInterval(() => {
    wallQIdx = (wallQIdx + 1) % WALL_QUESTIONS.length;
    renderWallQs();
  }, 4200);
}

function stopWallTimers() {
  if (wallClockTimer) { clearInterval(wallClockTimer); wallClockTimer = null; }
  if (wallIntroTimer) { clearInterval(wallIntroTimer); wallIntroTimer = null; }
  if (wallQTimer)     { clearInterval(wallQTimer);     wallQTimer = null; }
}

// ===== Router (hash) =====
const ROUTES = ['landing', 'detail', 'form', 'success', 'wall'];

function showScreen(name) {
  if (!ROUTES.includes(name)) name = 'landing';
  document.querySelectorAll('.screen').forEach(s => {
    s.hidden = s.dataset.screen !== name;
  });
  // wall timers
  if (name === 'wall') startWallTimers();
  else stopWallTimers();
  window.scrollTo(0, 0);
}

function routeFromHash() {
  const hash = (location.hash || '').replace(/^#\/?/, '');
  const name = hash || 'landing';
  showScreen(name);
}

// ===== Toast =====
let toastTimer = null;
function showToast(msg, ms = 2200) {
  const elx = el('toast');
  elx.textContent = msg;
  elx.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { elx.hidden = true; }, ms);
}

// ===== Form =====
function validate(form, consents) {
  if (!form.name)   return '请填写姓名';
  if (!form.wechat) return '请填写微信号';
  if (!form.phone)  return '请填写手机号';
  if (!/^\+?\d{8,15}$/.test(form.phone)) return '手机号格式不正确';
  // v3 必填
  if (!form.wallNickname) return '请填写留言墙昵称';
  if (!form.selfIntro)    return '请填写一句话身份介绍';
  if (form.selfIntro.length > SELF_INTRO_MAX)  return `自我介绍不超过 ${SELF_INTRO_MAX} 字`;
  if (!form.expectation)  return '请填写你想问的问题';
  if (form.expectation.length > EXPECTATION_MAX) return `想问的问题不超过 ${EXPECTATION_MAX} 字`;
  if (!consents.consentRules) return '请阅读并同意 DCT · 吧规';
  return null;
}

function readForm() {
  const f = el('signup-form');
  const data = new FormData(f);
  return {
    name:         (data.get('name')         || '').trim(),
    wechat:       (data.get('wechat')       || '').trim(),
    phone:        (data.get('phone')        || '').trim(),
    org:          (data.get('org')          || '').trim(),
    field:        (data.get('field')        || '').trim(),
    wallNickname: (data.get('wallNickname') || '').trim(),
    selfIntro:    (data.get('selfIntro')    || '').trim(),
    expectation:  (data.get('expectation')  || '').trim()
  };
}

function readConsents() {
  return {
    consentRules: !!el('agree-rules').checked,
    consentWall:  !!el('agree-wall').checked
  };
}

// 字数计数
function wireCharCount(inputId, counterId, max) {
  const input = el(inputId);
  const counter = el(counterId);
  if (!input || !counter) return;
  const update = () => {
    const len = input.value.length;
    counter.textContent = `${len} / ${max}`;
    counter.classList.toggle('char-count--over', len > max);
  };
  input.addEventListener('input', update);
  update();
}

// ===== CloudBase =====
let cloudApp = null;
let authReady = null;

async function waitForSDK(timeoutMs = 8000) {
  if (typeof cloudbase !== 'undefined') return;
  const start = Date.now();
  while (typeof cloudbase === 'undefined') {
    if (Date.now() - start > timeoutMs) {
      throw new Error('云端 SDK 加载失败，请检查网络后刷新重试');
    }
    await new Promise(r => setTimeout(r, 150));
  }
}

function initCloud() {
  if (cloudApp) return cloudApp;
  const env = (window.__DCT_CONFIG__ && window.__DCT_CONFIG__.env) || '';
  if (!env) throw new Error('CloudBase env not configured');
  if (typeof cloudbase === 'undefined') throw new Error('云端 SDK 加载失败，请检查网络后刷新重试');
  cloudApp = cloudbase.init({ env });
  return cloudApp;
}

async function ensureAuth() {
  if (authReady) return authReady;
  authReady = (async () => {
    await waitForSDK();
    const app = initCloud();
    const auth = app.auth({ persistence: 'local' });
    const state = await auth.getLoginState();
    if (!state) {
      try {
        await auth.signInAnonymously();
      } catch (e) {
        throw new Error('匿名登录未开启：请在云开发控制台 → 登录授权 → 匿名登录 开启');
      }
    }
    return app;
  })();
  return authReady;
}

async function submitSignup(form, consents) {
  const app = await ensureAuth();
  const payload = {
    ...form,
    issueId: ISSUE_ID,
    consentRules: consents.consentRules,
    consentWall: consents.consentWall
  };
  const res = await app.callFunction({ name: 'submitSignup', data: payload });
  return res.result || {};
}

// ===== Wire up =====
document.addEventListener('DOMContentLoaded', () => {
  populateBackgrounds();
  renderFourQ();
  renderMenu();
  renderFlow();
  renderRules();
  renderChips();
  renderConstellation();
  renderTimeline();

  // 字数计数
  wireCharCount('selfIntro', 'selfIntro-count', SELF_INTRO_MAX);
  wireCharCount('expectation', 'expectation-count', EXPECTATION_MAX);

  routeFromHash();
  window.addEventListener('hashchange', routeFromHash);

  const form = el('signup-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = readForm();
      const consents = readConsents();
      const err = validate(data, consents);
      if (err) { showToast(err); return; }

      const btn = el('submit-btn');
      btn.disabled = true;
      btn.textContent = '提交中…';
      try {
        const result = await submitSignup(data, consents);
        if (result && result.ok) {
          location.hash = '#/success';
        } else {
          showToast((result && result.msg) || '提交失败，请稍后再试');
          btn.disabled = false;
          btn.textContent = '提交报名';
        }
      } catch (e2) {
        console.error(e2);
        showToast(e2.message || '网络异常，请重试');
        btn.disabled = false;
        btn.textContent = '提交报名';
      }
    });
  }

  // 预热匿名登录
  ensureAuth().catch(() => {});
});
