// ===== Data =====
const POINTS = [
  { num: '01', title: '人生不是单一赛道',   sub: '多重身份的平衡与深耕',  body: '学者的严谨、管理者的务实、公益者的温度、跑者的坚韧——如何在其中探索更完整的自我。' },
  { num: '02', title: '用脚步丈量世界',     sub: '坚持的力量',            body: '从日复一日的训练，到走上世界马拉松大满贯「六星跑者」之路——10000 公里，究竟意味着什么？' },
  { num: '03', title: '笃定前行',           sub: '目标与生活的无限可能',  body: '关于个人年度目标管理，如何让期待落地、让计划发生——她的实践哲学。' }
];

const MENU = [
  { name: '桑葚巴斯克',        tag: '攀枝花桑葚季' },
  { name: '桑葚酸奶杯',        tag: '攀枝花桑葚季' },
  { name: '红酒 · 有醇 / 无醇', tag: '自选' }
];

const FLOW = [
  { t: '18:40', l: '入场 · 自由落座' },
  { t: '19:00', l: '开场 & DCT 介绍' },
  { t: '19:10', l: '主题沙龙 · 高晓蓉教授' },
  { t: '21:00', l: '自由交流' },
  { t: '21:20', l: '总结及下一期预告' }
];

const RULES = [
  { k: '保密',       v: '不传播他人经历与现场内容（除非对方明确同意）' },
  { k: '尊重',       v: '对观点可以尖锐，对人不可以刻薄' },
  { k: '不贴标签',   v: '少用「你就是…」，多用「我感觉 / 我理解…」' },
  { k: '非治疗场合', v: '非治疗性团体，只讨论，不提供医疗建议与诊断' },
  { k: '自由发言',   v: '友好氛围，允许沉默，允许争论' },
  { k: '友好纠错',   v: '欢迎随时友好提问' }
];

const CHIPS = ['对主题感兴趣', '欢迎为心仪的主讲人打赏', '多学科背景优先'];

const STEPS = [
  { state: 'done',   label: '报名已提交',                  sub: '刚刚' },
  { state: 'active', label: 'DCT 主创在审核',              sub: '通常 24 小时内完成' },
  { state: '',       label: '微信通知结果',                sub: '通过后将发送入群二维码 & 具体地址' },
  { state: '',       label: '2026 年 4 月 25 日 · 周六见', sub: '18:40 入场 · 第二期 · 六星之路', last: true }
];

const RAYS = [
  { deg: -62, len: 170, w: 21, op: 0.22 },
  { deg: -55, len: 160, w: 14, op: 0.17 },
  { deg: -48, len: 175, w: 25, op: 0.26 },
  { deg: -40, len: 165, w: 16, op: 0.16 },
  { deg: -33, len: 170, w: 30, op: 0.24 },
  { deg: -25, len: 160, w: 14, op: 0.14 },
  { deg: -18, len: 150, w: 22, op: 0.20 },
  { deg: -10, len: 140, w: 13, op: 0.12 }
];

const STARS_BG = [
  { x: 78, y: 18, s: 18, o: 0.9  },
  { x: 62, y: 44, s: 13, o: 0.75 },
  { x: 86, y: 54, s: 10, o: 0.65 },
  { x: 48, y: 66, s: 16, o: 0.85 },
  { x: 72, y: 78, s: 11, o: 0.7  },
  { x: 34, y: 30, s: 9,  o: 0.55 },
  { x: 92, y: 32, s: 8,  o: 0.5  },
  { x: 22, y: 72, s: 12, o: 0.7  }
];

const CONSTELLATION = [
  { x: 50, y: 50, s: 40, o: 1    },
  { x: 22, y: 28, s: 14, o: 0.75 },
  { x: 78, y: 30, s: 12, o: 0.7  },
  { x: 18, y: 72, s: 10, o: 0.55 },
  { x: 82, y: 70, s: 16, o: 0.85 }
];

// ===== Render helpers =====

function renderRays(container) {
  const html = RAYS.map(r => {
    const op2 = r.op * 0.6;
    return `<div class="ray" style="width:${r.len}%;height:${r.w}px;transform:rotate(${r.deg}deg);background:linear-gradient(90deg,rgba(255,255,255,${r.op}) 0%,rgba(255,255,255,${op2}) 50%,rgba(255,255,255,0) 100%);"></div>`;
  }).join('');
  container.innerHTML = html;
}

function starHtml(s) {
  // Size given in px; match mini program scale (s ≈ design units, doubled for visual)
  const boxPx = s * 2;
  return `<div class="star4" style="left:${s.x || 0}%;top:${s.y || 0}%;opacity:${s.o};width:${boxPx}px;height:${boxPx}px;">
    <div class="star-glow"></div>
    <div class="ray-v"></div>
    <div class="ray-h"></div>
    <div class="core"></div>
  </div>`;
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

function renderPoints() {
  const el = document.getElementById('points');
  if (!el) return;
  el.innerHTML = POINTS.map(p => `
    <div class="point-card">
      <div class="mono point-num">${p.num}</div>
      <div class="point-body">
        <div class="serif point-title">${p.title}</div>
        <div class="point-sub">${p.sub}</div>
        <div class="point-text">${p.body}</div>
      </div>
    </div>
  `).join('');
}

function renderMenu() {
  const el = document.getElementById('menu');
  if (!el) return;
  el.innerHTML = MENU.map(m => `
    <div class="menu-row">
      <span class="star-bullet star-brown"></span>
      <div class="serif menu-name">${m.name}</div>
      <div class="mono menu-tag">${m.tag}</div>
    </div>
  `).join('');
}

function renderFlow() {
  const el = document.getElementById('flow');
  if (!el) return;
  el.innerHTML = FLOW.map(f => `
    <div class="flow-row">
      <div class="mono flow-time">${f.t}</div>
      <div class="flow-label">${f.l}</div>
    </div>
  `).join('');
}

function renderRules() {
  const el = document.getElementById('rules');
  if (!el) return;
  el.innerHTML = RULES.map((r, i) => `
    <div class="rules-row">
      <div class="rule-num">${i + 1}</div>
      <div class="rule-body">
        <div class="rule-k">${r.k}</div>
        <div class="rule-v">${r.v}</div>
      </div>
    </div>
  `).join('');
}

function renderChips() {
  const el = document.getElementById('chips');
  if (!el) return;
  el.innerHTML = CHIPS.map(c => `<div class="chip">${c}</div>`).join('');
}

function renderConstellation() {
  const el = document.getElementById('constellation');
  if (!el) return;
  renderStars(el, CONSTELLATION);
}

function renderTimeline() {
  const el = document.getElementById('timeline');
  if (!el) return;
  el.innerHTML = STEPS.map(s => `
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
  document.querySelectorAll('.sky-stars').forEach(el => renderStars(el, STARS_BG));
}

// ===== Router (hash) =====
const ROUTES = ['landing', 'detail', 'form', 'success'];

function showScreen(name) {
  if (!ROUTES.includes(name)) name = 'landing';
  document.querySelectorAll('.screen').forEach(s => {
    s.hidden = s.dataset.screen !== name;
  });
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
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, ms);
}

// ===== Form =====
function validate(form) {
  if (!form.name)   return '请填写姓名';
  if (!form.wechat) return '请填写微信号';
  if (!form.phone)  return '请填写手机号';
  if (!/^\+?\d{8,15}$/.test(form.phone)) return '手机号格式不正确';
  if (!document.getElementById('agree').checked) return '请阅读并同意 DCT · 吧规';
  return null;
}

function readForm() {
  const f = document.getElementById('signup-form');
  const data = new FormData(f);
  return {
    name:   (data.get('name')   || '').trim(),
    wechat: (data.get('wechat') || '').trim(),
    phone:  (data.get('phone')  || '').trim(),
    org:    (data.get('org')    || '').trim(),
    field:  (data.get('field')  || '').trim(),
    why:    (data.get('why')    || '').trim()
  };
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
      // Try anonymous first; if the env hasn't enabled it, surface the error clearly.
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

async function submitSignup(form) {
  const app = await ensureAuth();
  const res = await app.callFunction({
    name: 'submitSignup',
    data: form
  });
  return res.result || {};
}

// ===== Wire up =====
document.addEventListener('DOMContentLoaded', () => {
  populateBackgrounds();
  renderPoints();
  renderMenu();
  renderFlow();
  renderRules();
  renderChips();
  renderConstellation();
  renderTimeline();

  routeFromHash();
  window.addEventListener('hashchange', routeFromHash);

  const form = document.getElementById('signup-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = readForm();
      const err = validate(data);
      if (err) { showToast(err); return; }

      const btn = document.getElementById('submit-btn');
      btn.disabled = true;
      btn.textContent = '提交中…';
      try {
        const result = await submitSignup(data);
        if (result && result.ok) {
          location.hash = '#/success';
        } else {
          showToast((result && result.msg) || '提交失败，请稍后再试');
          btn.disabled = false;
          btn.textContent = '提交报名';
        }
      } catch (err) {
        console.error(err);
        showToast(err.message || '网络异常，请重试');
        btn.disabled = false;
        btn.textContent = '提交报名';
      }
    });
  }

  // Warm up auth in the background so the first submit is snappy. Ignore errors.
  ensureAuth().catch(() => {});
});
