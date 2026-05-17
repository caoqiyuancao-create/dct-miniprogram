// ============================================================
// submitFeedback — DCT 意见反馈 后端
// 参考 submitSignup 的模式：upsert + 邮件通知 + 自动建集合
//
// 调用入口：
//   - 默认（无 _action）= 写一条反馈
//   - _action='getSummary' = 主创合订本：拉该期所有反馈聚合返回
//
// 集合：feedback
// 去重键：(issueId, openid) — 同一参与者重复提交会覆盖上一次
// 匿名登录的 openid 也能用作幂等键（cloudbase 给同一 anonymous user 稳定 openid）
// ============================================================

const cloud = require('wx-server-sdk');
const nodemailer = require('nodemailer');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;
const COLLECTION = 'feedback';

const MAIL_USER = process.env.MAIL_USER || '';
const MAIL_PASS = process.env.MAIL_PASS || '';
const MAIL_TO   = process.env.MAIL_TO   || '';

// ---- 评级维度（与 H5 端 data.js 对齐，后端独立保留一份避免依赖） ----
const GRADE_DIMS = [
  { id: 'content', label: '分享内容' },
  { id: 'venue',   label: '场地与客厅氛围' },
  { id: 'food',    label: '甜品与饮品' },
  { id: 'pace',    label: '时长与节奏' }
];
const LONG_DIMS = [
  { id: 'moment',  label: '印象最深的一句话或瞬间' },
  { id: 'next',    label: '下期主题 / 嘉宾推荐' },
  { id: 'suggest', label: '改进建议' }
];
const ALL_GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];

// ---- helpers ----
async function ensureCollection(name) {
  try {
    await db.createCollection(name);
  } catch (e) {
    const msg = (e && (e.errMsg || e.message)) || '';
    if (!/already|exist/i.test(msg)) throw e;
  }
}

function pickStringMap(input, keys) {
  const out = {};
  if (!input || typeof input !== 'object') return out;
  for (const k of keys) {
    const v = input[k];
    if (v == null) continue;
    out[k] = String(v).trim();
  }
  return out;
}

function pickGradeMap(input) {
  const out = {};
  if (!input || typeof input !== 'object') return out;
  for (const k of GRADE_DIMS.map(d => d.id)) {
    const v = input[k];
    if (typeof v === 'string' && ALL_GRADES.includes(v)) out[k] = v;
  }
  return out;
}

function clampStars(n) {
  const x = Number(n);
  if (!Number.isFinite(x)) return 5;
  return Math.max(1, Math.min(5, Math.round(x)));
}

// ---- 邮件通知 ----
function renderFeedbackLines(doc) {
  const channel = doc.channel === 'h5' ? 'H5 网页' : (doc.channel === 'miniprogram' ? '微信小程序' : '未知');
  const lines = [
    doc._action_tag === 'updated'
      ? '一条反馈被更新 ✉️（同一参与者重新提交）'
      : '刚有新反馈 ✉️',
    '',
    `期号：第 ${doc.issueNumber || '?'} 期 · ${doc.issueId || ''}`,
    `署名：${doc.nickname || '（匿名）'}`,
    `整体星级：${'★'.repeat(doc.stars || 0)}${'☆'.repeat(5 - (doc.stars || 0))}（${doc.stars || 0}/5）`,
    ''
  ];

  GRADE_DIMS.forEach(d => {
    const g = (doc.grades || {})[d.id] || '—';
    const note = (doc.gradeNotes || {})[d.id] || '';
    lines.push(`【${d.label}】${g}${note ? '  ｜  ' + note : ''}`);
  });

  lines.push('');

  LONG_DIMS.forEach(d => {
    const t = (doc.longTexts || {})[d.id] || '';
    if (t) {
      lines.push(`【${d.label}】`);
      lines.push(t);
      lines.push('');
    }
  });

  const recMap = { yes: '愿意推荐', maybe: '看主题再说', no: '暂时不会' };
  lines.push(`是否愿意推荐朋友：${recMap[doc.recommend] || '—'}`);
  lines.push('');
  lines.push(`提交渠道：${channel}`);
  return lines.join('\n');
}

async function sendNotifyEmail(doc) {
  if (!MAIL_USER || !MAIL_PASS || !MAIL_TO) {
    console.warn('[notify-email] skipped: missing MAIL_USER/MAIL_PASS/MAIL_TO');
    return;
  }
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: { user: MAIL_USER, pass: MAIL_PASS }
    });

    const tag = doc._action_tag === 'updated' ? 'DCT 反馈更新' : 'DCT 新反馈';
    const subject = `【${tag}】第 ${doc.issueNumber || '?'} 期 / ${doc.nickname || '匿名'} / ${doc.stars || 0}★`;

    await transporter.sendMail({
      from: `"DCT 意见反馈" <${MAIL_USER}>`,
      to: MAIL_TO,
      subject,
      text: renderFeedbackLines(doc)
    });
    console.log('[notify-email] sent to', MAIL_TO);
  } catch (e) {
    console.warn('[notify-email] failed:', (e && e.message) || e);
  }
}

// ============================================================
// 主创汇总（_action=getSummary）
// 输入：{ issueId }
// 输出：{ ok, summary: { totalResponses, averageStars, distribution, recommend, openResponses } }
// ============================================================
async function buildSummary(issueId) {
  await ensureCollection(COLLECTION);
  const col = db.collection(COLLECTION);
  const where = issueId ? { issueId } : {};
  const all = await col.where(where).orderBy('createdAt', 'desc').limit(1000).get();
  const records = all.data || [];

  const total = records.length;
  const sumStars = records.reduce((acc, r) => acc + (Number(r.stars) || 0), 0);
  const avg = total > 0 ? +(sumStars / total).toFixed(2) : 0;

  // 评级分布（百分比）
  const dist = {};
  GRADE_DIMS.forEach(d => {
    const counts = Object.fromEntries(ALL_GRADES.map(g => [g, 0]));
    let n = 0;
    records.forEach(r => {
      const g = (r.grades || {})[d.id];
      if (g && counts.hasOwnProperty(g)) { counts[g]++; n++; }
    });
    if (n === 0) {
      dist[d.id] = counts;
    } else {
      const pct = {};
      ALL_GRADES.forEach(g => { pct[g] = Math.round(counts[g] * 100 / n); });
      dist[d.id] = pct;
    }
  });

  // 推荐
  const rec = { yes: 0, maybe: 0, no: 0 };
  records.forEach(r => {
    if (rec.hasOwnProperty(r.recommend)) rec[r.recommend]++;
  });

  // 开放回答
  const openResponses = {};
  GRADE_DIMS.forEach(d => {
    openResponses[d.id] = records
      .filter(r => (r.gradeNotes || {})[d.id])
      .map(r => ({
        author: r.nickname || '匿名',
        grade:  (r.grades || {})[d.id] || '',
        text:   (r.gradeNotes || {})[d.id]
      }));
  });
  LONG_DIMS.forEach(d => {
    openResponses[d.id] = records
      .filter(r => (r.longTexts || {})[d.id])
      .map(r => ({
        author: r.nickname || '匿名',
        text:   (r.longTexts || {})[d.id]
      }));
  });

  return {
    issueId: issueId || '',
    totalResponses: total,
    averageStars: avg,
    distribution: dist,
    recommend: rec,
    openResponses
  };
}

// ============================================================
// 主入口
// ============================================================
exports.main = async (event, context) => {
  // ---- 主创汇总 ----
  if (event && event._action === 'getSummary') {
    try {
      const summary = await buildSummary(event.issueId || '');
      return { ok: true, summary };
    } catch (e) {
      return { ok: false, msg: (e && e.message) || String(e) };
    }
  }

  const { OPENID = '', SOURCE = '' } = cloud.getWXContext() || {};

  const issueId = String(event.issueId || '').trim();
  if (!issueId) {
    return { ok: false, code: 'missing_issue', msg: '期号丢失，请刷新重试' };
  }

  const stars = clampStars(event.stars);
  const grades = pickGradeMap(event.grades);
  const gradeNotes = pickStringMap(event.gradeNotes, GRADE_DIMS.map(d => d.id));
  const longTexts = pickStringMap(event.longTexts, LONG_DIMS.map(d => d.id));
  const recommend = ['yes', 'maybe', 'no'].includes(event.recommend) ? event.recommend : 'yes';
  const nickname = String(event.nickname || '').trim().slice(0, 32);
  const issueNumber = Number(event.issueNumber) || null;

  await ensureCollection(COLLECTION);
  const col = db.collection(COLLECTION);

  const now = db.serverDate();
  const meta = {
    channel: OPENID ? (SOURCE && SOURCE.includes('mp-weixin') ? 'miniprogram' : 'h5') : 'h5',
    openid:  OPENID || null,
    source:  SOURCE || null
  };

  // dedup: (issueId, openid)。openid 缺失时不夫去重，每次 add 一条新记录。
  let existing = { data: [] };
  if (OPENID) {
    existing = await col.where({ issueId, openid: OPENID }).limit(1).get();
  }

  const formData = {
    issueId, issueNumber,
    stars, grades, gradeNotes, longTexts, recommend, nickname
  };

  let result;
  let action;
  if (existing.data && existing.data.length > 0) {
    const id = existing.data[0]._id;
    await col.doc(id).update({
      data: { ...formData, ...meta, updatedAt: now }
    });
    action = 'updated';
    result = { ok: true, id, action };
  } else {
    const res = await col.add({
      data: { ...formData, ...meta, createdAt: now, updatedAt: now }
    });
    action = 'created';
    result = { ok: true, id: res._id, action };
  }

  // 邮件通知（fire-and-forget）
  try {
    await sendNotifyEmail({ ...formData, ...meta, _action_tag: action });
  } catch (e) {
    console.warn('[notify-email] wrapper failed:', (e && e.message) || e);
  }

  return result;
};
