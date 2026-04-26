// ============================================================
// DCT 意见反馈 · 主创汇总（合订本）· admin.js
// 视觉对齐 scheme-a-summary.jsx
// 数据：当前用 window.DCT_SUMMARY（mock）。
//      上线后改 fetchSummary() 走 cloudbase 拉真实数据，覆盖 SUM。
// ============================================================

const $ = (sel) => document.querySelector(sel);

const FB = window.DCT_FEEDBACK;
const SUM = window.DCT_SUMMARY;

// ============================================================
// 抬头填充
// ============================================================
function fillHead() {
  const issue = FB.currentIssue;
  $('#head-vol').textContent = `0${issue.number}`;
  $('#head-title').textContent = issue.title;
  $('#head-total').textContent = String(SUM.totalResponses);
  $('#colophon-date').textContent = issue.dateText;
}

// ============================================================
// 题目区
// ============================================================
function renderSections() {
  const root = $('#qsections');
  const parts = [];

  // Q.00 整体平均星
  parts.push(qBlock('00', '整体感受', '平均星级', `
    <div class="stars-summary">
      <div class="avg">${SUM.averageStars}</div>
      <div>
        <div class="stars-line">★★★★★</div>
        <div class="n-line">n = ${SUM.totalResponses}</div>
      </div>
    </div>
  `));

  // Q.01-04 评级题（分布 + 该题所有补充文本）
  let qIdx = 0;
  const nextNum = () => String(++qIdx).padStart(2, '0');

  FB.dimensions.filter(d => d.kind === 'grade').forEach(d => {
    const dist = SUM.distribution[d.id] || {};
    const items = (SUM.openResponses && SUM.openResponses[d.id]) || [];
    parts.push(qBlock(nextNum(), d.label, d.hint,
      renderDistRow(dist) + renderResponses(items, true)
    ));
  });

  // Q.05-07 长文题
  FB.dimensions.filter(d => d.kind === 'longtext').forEach(d => {
    const items = (SUM.openResponses && SUM.openResponses[d.id]) || [];
    parts.push(qBlock(nextNum(), d.label, d.hint, renderResponses(items, false)));
  });

  // Q.08 推荐
  parts.push(qBlock(nextNum(), '是否愿意推荐朋友来', '', `
    <div class="rec-row">
      <div class="rec-pill rec-yes">
        <div class="label">愿意</div>
        <div class="n">${SUM.recommend.yes}</div>
      </div>
      <div class="rec-pill rec-maybe">
        <div class="label">再看看</div>
        <div class="n">${SUM.recommend.maybe}</div>
      </div>
      <div class="rec-pill rec-no">
        <div class="label">不会</div>
        <div class="n">${SUM.recommend.no}</div>
      </div>
    </div>
  `));

  // 高频词（无编号）
  parts.push(qBlock('—', '反复出现的词', '出现频次决定字号', renderTopWords(SUM.topWords || [])));

  root.innerHTML = parts.join('');
}

function qBlock(num, title, sub, body) {
  const subHtml = sub
    ? `<div class="q-sub">${escapeHtml(sub)}</div>`
    : '';
  return `
    <section class="q">
      <div class="q-head">
        <span class="q-num">Q.${num}</span>
        <h3 class="q-title">${escapeHtml(title)}</h3>
      </div>
      ${subHtml}
      <div>${body}</div>
    </section>
  `;
}

// ---- 分布条：A/B/C 三段 ----
function renderDistRow(dist) {
  const A = (dist['A+'] || 0) + (dist['A'] || 0) + (dist['A-'] || 0);
  const B = (dist['B+'] || 0) + (dist['B'] || 0) + (dist['B-'] || 0);
  const C = (dist['C+'] || 0) + (dist['C'] || 0);
  return `
    <div class="dist-row">
      <div class="dist-meta">A ${A}% · B ${B}% · C ${C}%</div>
      <div class="dist-bar">
        <div class="seg-a" style="width:${A}%"></div>
        <div class="seg-b" style="width:${B}%"></div>
        <div class="seg-c" style="width:${C}%"></div>
      </div>
    </div>
  `;
}

// ---- 该题所有作答 ----
function renderResponses(items, showGrade) {
  if (!items || !items.length) {
    return `<div class="responses"><div class="empty">暂无作答</div></div>`;
  }
  const rows = items.map(r => `
    <div class="resp">
      <div class="text">${escapeHtml(r.text || '')}</div>
      <div class="meta">
        <span class="author">—— ${escapeHtml(r.author || '匿名')}</span>
        ${showGrade && r.grade ? `<span class="grade-tag">${escapeHtml(r.grade)}</span>` : ''}
      </div>
    </div>
  `).join('');
  return `<div class="responses">${rows}</div>`;
}

// ---- 高频词 ----
function renderTopWords(words) {
  if (!words.length) return '<div class="responses"><div class="empty">暂无词云</div></div>';
  const spans = words.map(w => {
    const sz = 12 + Math.min(w.count, 11);
    const op = Math.min(0.5 + w.count * 0.04, 1);
    return `<span class="w" style="font-size:${sz}px;opacity:${op}">${escapeHtml(w.word)}</span>`;
  }).join('');
  return `<div class="topwords">${spans}</div>`;
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
// 启动：先用 mock 把骨架渲染出来，再异步覆盖真实数据
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  fillHead();
  renderSections();

  // 异步拉真实数据，拿到就覆盖 SUM 重渲染
  fetchSummary().then(real => {
    if (!real) return;
    // 真实数据没有 topWords（cloudfunction 没算），保留 mock 的当占位
    if (!real.topWords) real.topWords = SUM.topWords;
    Object.assign(SUM, real);
    fillHead();
    renderSections();
    const banner = $('#mode-banner');
    banner.classList.add('live');
    banner.textContent = `LIVE · 第 ${FB.currentIssue.number} 期共 ${SUM.totalResponses} 份真实反馈`;
  }).catch(err => {
    console.warn('[dct-admin] fetchSummary failed, fallback to mock:', err);
    const banner = $('#mode-banner');
    banner.textContent = 'DEMO · cloudbase 未就绪，当前是 mock 数据';
  });
});

// ============================================================
// 从 cloudfunction 拉真实汇总
// 需要 cloudbase Web SDK 已加载（admin.html 里是用 mock，没加 SDK）
// 这里动态加载 SDK，不污染主依赖
// ============================================================
async function loadCloudbaseSDK() {
  if (typeof cloudbase !== 'undefined') return;
  const urls = [
    'https://static.cloudbase.net/cloudbase-js-sdk/2.19.3/cloudbase.full.js',
    'https://cdn.jsdelivr.net/npm/@cloudbase/js-sdk@2.19.3/dist/cloudbase.full.js',
    'https://unpkg.com/@cloudbase/js-sdk@2.19.3/dist/cloudbase.full.js'
  ];
  for (const url of urls) {
    try {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = url;
        s.async = false;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
      if (typeof cloudbase !== 'undefined') return;
    } catch (e) {
      console.warn('[dct-admin] cdn failed:', url);
    }
  }
  throw new Error('cloudbase SDK 加载失败');
}

async function fetchSummary() {
  await loadCloudbaseSDK();
  const env = 'cloudbase-d0gi12o758d35105a';
  const app = cloudbase.init({ env });
  const auth = app.auth({ persistence: 'local' });
  if (!await auth.getLoginState()) {
    try { await auth.signInAnonymously(); }
    catch (e) { throw new Error('匿名登录未开启，去云开发控制台开一下'); }
  }
  const res = await app.callFunction({
    name: 'submitFeedback',
    data: { _action: 'getSummary', issueId: FB.currentIssue.id }
  });
  return (res.result && res.result.summary) || null;
}
