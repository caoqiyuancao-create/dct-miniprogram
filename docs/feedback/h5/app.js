// ============================================================
// DCT 意见反馈 H5 · app.js
// 渲染流：从 DCT_FEEDBACK.dimensions 动态生成所有题目
// 状态流：state 单例 → 提交时 cloudbase callFunction
// 视觉对齐：scheme-a-form.jsx（钢笔批注问卷）
// ============================================================

// ---- DOM 引用 ----
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ---- 全局状态 ----
const FB = window.DCT_FEEDBACK;
const state = {
  stars: 5,
  grades: {},        // { [dimensionId]: 'A+' | 'A' | ... }
  gradeNotes: {},    // { [dimensionId]: '补充文本' }
  longTexts: {},     // { [dimensionId]: '长文回答' }
  recommend: 'yes',
  nickname: ''
};

// ---- 初始化默认评级 ----
FB.dimensions.filter(d => d.kind === 'grade').forEach(d => {
  state.grades[d.id] = 'A+';
});

// ============================================================
// 海报头 + 抬头填充
// ============================================================
function fillPosterAndHead() {
  const issue = FB.currentIssue;

  // 海报背景
  const heroImg = $('#poster-hero-img');
  heroImg.style.backgroundImage = `url(${issue.poster})`;

  // 海报底部叠字
  $('#poster-meta').textContent = `DCT · VOL.0${issue.number} · ${issue.date.replace(/\./g, ' · ')}`;
  $('#poster-title').textContent = `${issue.title} · ${issue.subtitle}`;
  $('#poster-speaker').textContent = `${issue.speaker} · ${issue.location}`;

  // 抬头小字
  $('#head-vol').textContent = `0${issue.number}`;
  $('#head-title').textContent = issue.title;
  $('#stamp-vol').textContent = `vol.0${issue.number}`;

  // 感谢页里的日期
  $('#stamp-date').textContent = issue.date.replace(/\./g, ' · ');
  $('#thanks-vol').textContent = String(issue.number);
  $('#thanks-date').textContent = issue.dateText;
}

// ============================================================
// 题目渲染
// ============================================================
function renderQuestions() {
  const root = $('#questions');
  const parts = [];

  // Q.00 整体满意度（五星）
  parts.push(renderSection('00', '整体感受', '一笔一画，圈出你的星星', renderStars()));

  // Q.01-04 评级题
  const gradeDims = FB.dimensions.filter(d => d.kind === 'grade');
  gradeDims.forEach((d, i) => {
    const num = String(i + 1).padStart(2, '0');
    parts.push(renderSection(num, d.label, d.hint,
      renderGradeRow(d.id) + renderPenLineInput(d.id, d.placeholder, 'gradeNotes')
    ));
  });

  // Q.05-07 长文题
  const longDims = FB.dimensions.filter(d => d.kind === 'longtext');
  longDims.forEach((d, i) => {
    const num = String(i + 5).padStart(2, '0');
    parts.push(renderSection(num, d.label, d.hint,
      renderPenTextarea(d.id, d.placeholder, 'longTexts')
    ));
  });

  // Q.08 推荐三选一
  const recDim = FB.dimensions.find(d => d.id === 'recommend');
  parts.push(renderSection('08', recDim.label, '', renderYesNo(recDim.options)));

  // 署名（无编号）
  parts.push(renderSigning());

  root.innerHTML = parts.join('');

  // 绑定事件（事件委托）
  bindQuestionEvents();
}

function renderSection(num, title, sub, body) {
  const subHtml = sub
    ? `<div class="q-sub">${escapeHtml(sub)}</div>`
    : '';
  return `
    <section class="q">
      <div class="q-head">
        <span class="q-num mono">Q.${num}</span>
        <h3 class="q-title serif">${escapeHtml(title)}</h3>
      </div>
      ${subHtml}
      <div class="q-body">${body}</div>
    </section>
  `;
}

// ---- 五星 ----
function renderStars() {
  const labels = { 5: '满分！', 4: '很好', 3: '尚可', 2: '一般', 1: '抱歉' };
  const buttons = [1, 2, 3, 4, 5].map(n => {
    const filled = n <= state.stars;
    return `
      <button type="button" class="star-btn" data-star="${n}" aria-label="${n} 星">
        ${penStarSvg(filled)}
      </button>
    `;
  }).join('');
  return `
    <div class="stars">
      ${buttons}
      <span class="star-label" id="star-label">${labels[state.stars] || ''}</span>
    </div>
  `;
}

function penStarSvg(filled) {
  return `
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 4 L19.5 12 L28 13 L21.5 19 L23 28 L16 23.5 L9 28 L10.5 19 L4 13 L12.5 12 Z"
            fill="${filled ? '#e9b949' : 'none'}"
            stroke="#b8413a" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>
  `;
}

function refreshStars() {
  const labels = { 5: '满分！', 4: '很好', 3: '尚可', 2: '一般', 1: '抱歉' };
  $$('.star-btn').forEach(btn => {
    const n = Number(btn.dataset.star);
    btn.innerHTML = penStarSvg(n <= state.stars);
  });
  const lbl = $('#star-label');
  if (lbl) lbl.textContent = labels[state.stars] || '';
}

// ---- A+ → C 评级 ----
function renderGradeRow(dimId) {
  const current = state.grades[dimId];
  const buttons = FB.grades.map(g => `
    <button type="button" class="grade-btn ${current === g ? 'active' : ''}"
            data-dim="${dimId}" data-grade="${g}" aria-label="${g}">
      ${current === g ? '<span class="ring"></span>' : ''}
      <span>${g}</span>
    </button>
  `).join('');
  return `<div class="grade-row" data-grade-row="${dimId}">${buttons}</div>`;
}

function refreshGradeRow(dimId) {
  const row = document.querySelector(`[data-grade-row="${dimId}"]`);
  if (!row) return;
  row.outerHTML = renderGradeRow(dimId);
}

// ---- 钢笔单行输入 ----
function renderPenLineInput(dimId, placeholder, bucket) {
  const val = (state[bucket][dimId] || '').replace(/"/g, '&quot;');
  return `
    <input type="text" class="pen-line-input"
           data-dim="${dimId}" data-bucket="${bucket}"
           placeholder="${escapeHtml(placeholder || '')}"
           value="${val}" />
  `;
}

// ---- 钢笔多行输入 ----
function renderPenTextarea(dimId, placeholder, bucket) {
  const val = state[bucket][dimId] || '';
  return `
    <textarea class="pen-textarea" rows="3"
              data-dim="${dimId}" data-bucket="${bucket}"
              placeholder="${escapeHtml(placeholder || '')}">${escapeHtml(val)}</textarea>
  `;
}

// ---- 推荐三选一 ----
function renderYesNo(options) {
  const rows = options.map(o => `
    <button type="button" class="yesno-row" data-rec="${o.value}">
      <span class="pen-checkbox ${state.recommend === o.value ? 'checked' : ''}"></span>
      <span class="label serif">${escapeHtml(o.label)}</span>
    </button>
  `).join('');
  return `<div class="yesno-list">${rows}</div>`;
}

function refreshYesNo() {
  $$('.yesno-row').forEach(btn => {
    const cb = btn.querySelector('.pen-checkbox');
    if (!cb) return;
    cb.classList.toggle('checked', btn.dataset.rec === state.recommend);
  });
}

// ---- 署名 ----
function renderSigning() {
  const val = (state.nickname || '').replace(/"/g, '&quot;');
  return `
    <section class="q">
      <div class="q-head">
        <span class="q-num mono">Q.&mdash;</span>
        <h3 class="q-title serif">署名</h3>
      </div>
      <div class="q-sub">不填即匿名</div>
      <div class="q-body signing-row">
        <span class="signing-prefix serif">——</span>
        <input type="text" class="pen-line-input" id="nickname"
               placeholder="留个昵称？" value="${val}" />
      </div>
    </section>
  `;
}

// ============================================================
// 事件绑定（委托）
// ============================================================
function bindQuestionEvents() {
  const root = $('#questions');

  // 五星
  root.addEventListener('click', (e) => {
    const star = e.target.closest('.star-btn');
    if (star) {
      state.stars = Number(star.dataset.star);
      refreshStars();
      return;
    }
    const grade = e.target.closest('.grade-btn');
    if (grade) {
      state.grades[grade.dataset.dim] = grade.dataset.grade;
      refreshGradeRow(grade.dataset.dim);
      return;
    }
    const rec = e.target.closest('.yesno-row');
    if (rec) {
      state.recommend = rec.dataset.rec;
      refreshYesNo();
      return;
    }
  });

  // 文本输入
  root.addEventListener('input', (e) => {
    const target = e.target;
    if (target.id === 'nickname') {
      state.nickname = target.value;
      return;
    }
    const dim = target.dataset.dim;
    const bucket = target.dataset.bucket;
    if (dim && bucket && state[bucket]) {
      state[bucket][dim] = target.value;
    }
  });
}

// ============================================================
// Toast
// ============================================================
let toastTimer = null;
function showToast(msg, ms = 2200) {
  const el = $('#toast');
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, ms);
}

// ============================================================
// 屏幕切换
// ============================================================
function showScreen(name) {
  $$('.screen').forEach(s => {
    s.hidden = s.dataset.screen !== name;
  });
  window.scrollTo(0, 0);
}

// ============================================================
// CloudBase 集成（沿用 candidate/docs/app.js 模式）
// ============================================================
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
    const st = await auth.getLoginState();
    if (!st) {
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

async function submitFeedback() {
  const app = await ensureAuth();
  const fnName = (window.__DCT_CONFIG__ && window.__DCT_CONFIG__.fn) || 'submitFeedback';
  const payload = {
    issueId:    FB.currentIssue.id,
    issueNumber: FB.currentIssue.number,
    stars:      state.stars,
    grades:     { ...state.grades },
    gradeNotes: { ...state.gradeNotes },
    longTexts:  { ...state.longTexts },
    recommend:  state.recommend,
    nickname:   (state.nickname || '').trim()
  };
  const res = await app.callFunction({ name: fnName, data: payload });
  return res.result || {};
}

// ============================================================
// 提交流程
// ============================================================
function bindSubmit() {
  const form = $('#feedback-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 轻校验：至少一道开放题或一个非默认评级有内容
    // 不强制——参与者可能就是想给五星就走

    const btn = $('#submit-btn');
    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = '提交中…';

    try {
      const result = await submitFeedback();
      if (result && result.ok) {
        showScreen('thanks');
      } else {
        showToast((result && result.msg) || '提交失败，请稍后再试');
        btn.disabled = false;
        btn.textContent = original;
      }
    } catch (err) {
      console.error('[dct-feedback] submit failed', err);
      showToast(err.message || '网络异常，请重试');
      btn.disabled = false;
      btn.textContent = original;
    }
  });

  // 感谢页 → 再填一次
  $('#reset-link').addEventListener('click', () => {
    // 重置 state
    state.stars = 5;
    state.gradeNotes = {};
    state.longTexts = {};
    state.recommend = 'yes';
    state.nickname = '';
    FB.dimensions.filter(d => d.kind === 'grade').forEach(d => {
      state.grades[d.id] = 'A+';
    });
    renderQuestions();
    $('#submit-btn').disabled = false;
    $('#submit-btn').textContent = '交  卷';
    showScreen('form');
  });
}

// ============================================================
// 工具
// ============================================================
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ============================================================
// 启动
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  fillPosterAndHead();
  renderQuestions();
  bindSubmit();

  // 后台预热匿名登录，让首次提交更快
  ensureAuth().catch(() => {});
});
