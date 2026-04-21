const cloud = require('wx-server-sdk');
const nodemailer = require('nodemailer');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const COLLECTION = 'signups';

// ---- Mail config (set via cloud function env vars) ----
const MAIL_USER = process.env.MAIL_USER || '';
const MAIL_PASS = process.env.MAIL_PASS || '';
const MAIL_TO   = process.env.MAIL_TO   || ''; // comma-separated list

// Auto-create the collection if it doesn't exist. Idempotent.
async function ensureCollection(name) {
  try {
    await db.createCollection(name);
  } catch (e) {
    const msg = (e && (e.errMsg || e.message)) || '';
    if (!/already|exist/i.test(msg)) throw e;
  }
}

// Render a single signup as a plain-text email body section.
function renderSignupLines(form, meta, action) {
  const channel = meta.channel === 'web' ? 'H5 网页' : '微信小程序';
  return [
    action === 'updated'
      ? '一条报名被更新 ✉️（同一手机号重新提交）'
      : '刚有新报名 ✉️',
    '',
    `姓名：${form.name}`,
    `微信：${form.wechat}`,
    `手机：${form.phone}`,
    `单位：${form.org   || '（未填）'}`,
    `专业：${form.field || '（未填）'}`,
    '',
    '为什么想参加：',
    form.why ? form.why : '（未填）',
    '',
    `提交渠道：${channel}`,
  ].join('\n');
}

// Send notification email. Never throws — failures are logged but don't block signup.
async function sendNotifyEmail(form, meta, action, totalCount) {
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

    const tag = action === 'updated' ? 'DCT 报名更新' : 'DCT 新报名';
    const subject = `【${tag}】${form.name} / ${form.org || '—'} / ${form.field || '—'}`;
    const body = renderSignupLines(form, meta, action) +
      (typeof totalCount === 'number' ? `\n\n累计报名：${totalCount} 人（包括本次）` : '');

    await transporter.sendMail({
      from: `"DCT 第二期报名" <${MAIL_USER}>`,
      to: MAIL_TO,
      subject,
      text: body
    });
    console.log('[notify-email] sent to', MAIL_TO);
  } catch (e) {
    console.warn('[notify-email] failed:', (e && e.message) || e);
  }
}

// Admin: send a one-shot summary email of all current non-test signups.
// Trigger: invoke with event._action === 'sendBacklog'. Does not modify the DB.
async function sendBacklogEmail() {
  if (!MAIL_USER || !MAIL_PASS || !MAIL_TO) {
    return { ok: false, msg: 'mail env vars missing' };
  }
  await ensureCollection(COLLECTION);
  const col = db.collection(COLLECTION);
  // Pull all records, sort newest first.
  const all = await col.orderBy('createdAt', 'desc').limit(1000).get();
  const records = (all.data || []).filter(r => {
    const name = String(r.name || '').trim();
    return name && !name.startsWith('测试');
  });

  if (records.length === 0) {
    return { ok: true, count: 0, msg: '没有符合条件的报名' };
  }

  const sections = records.map((r, i) => {
    const channel = r.channel === 'web' ? 'H5 网页' : (r.channel === 'miniprogram' ? '微信小程序' : '早期未标记');
    return [
      `【${i + 1}】`,
      `姓名：${r.name || ''}`,
      `微信：${r.wechat || ''}`,
      `手机：${r.phone || ''}`,
      `单位：${r.org || '（未填）'}`,
      `专业：${r.field || '（未填）'}`,
      `为什么想参加：${r.why ? r.why : '（未填）'}`,
      `提交渠道：${channel}`
    ].join('\n');
  });

  const body = [
    `这是 DCT 第二期**目前为止**的全部真实报名汇总（已排除测试记录）。`,
    `共 ${records.length} 人。`,
    `从下一条新报名开始，你们会各自收到一封独立通知邮件。`,
    '',
    '—————————————',
    '',
    sections.join('\n\n—————————————\n\n')
  ].join('\n');

  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com', port: 465, secure: true,
    auth: { user: MAIL_USER, pass: MAIL_PASS }
  });

  await transporter.sendMail({
    from: `"DCT 第二期报名" <${MAIL_USER}>`,
    to: MAIL_TO,
    subject: `【DCT 历史报名汇总】共 ${records.length} 人`,
    text: body
  });

  return { ok: true, count: records.length };
}

// Called from:
// - WeChat mini program (wx.cloud.callFunction)    → event = raw form, has OPENID in context
// - H5 web (CloudBase Web SDK anonymous)           → event = raw form, OPENID is '' or anon
//
// Dedup key is `phone` (primary) — works for both channels. OPENID is stored
// as reference when available, but doesn't drive dedup anymore.
exports.main = async (event, context) => {
  // Admin backfill channel (no DB write)
  if (event && event._action === 'sendBacklog') {
    try {
      return await sendBacklogEmail();
    } catch (e) {
      return { ok: false, msg: (e && e.message) || String(e) };
    }
  }

  const { OPENID = '', SOURCE = '' } = cloud.getWXContext() || {};

  const form = {
    name:   String(event.name   || '').trim(),
    wechat: String(event.wechat || '').trim(),
    phone:  String(event.phone  || '').trim(),
    org:    String(event.org    || '').trim(),
    field:  String(event.field  || '').trim(),
    why:    String(event.why    || '').trim()
  };

  if (!form.name || !form.wechat || !form.phone) {
    return { ok: false, code: 'missing', msg: '姓名、微信号、手机号都需要填写' };
  }

  await ensureCollection(COLLECTION);
  const col = db.collection(COLLECTION);

  const now = db.serverDate();
  const meta = {
    channel: OPENID ? 'miniprogram' : 'web',
    openid:  OPENID || null,
    source:  SOURCE || null
  };

  // Dedup by phone — same phone re-submits overwrite the prior record.
  const existing = await col.where({ phone: form.phone }).limit(1).get();

  let result;
  let action;
  if (existing.data && existing.data.length > 0) {
    const id = existing.data[0]._id;
    await col.doc(id).update({
      data: { ...form, ...meta, updatedAt: now }
    });
    action = 'updated';
    result = { ok: true, id, action };
  } else {
    const res = await col.add({
      data: { ...form, ...meta, createdAt: now, updatedAt: now }
    });
    action = 'created';
    result = { ok: true, id: res._id, action };
  }

  // Fire-and-forget notification (we await so logs are captured, but we swallow errors inside).
  try {
    const countRes = await col.where({}).count();
    await sendNotifyEmail(form, meta, action, countRes.total);
  } catch (e) {
    console.warn('[notify-email] wrapper failed:', (e && e.message) || e);
  }

  return result;
};
