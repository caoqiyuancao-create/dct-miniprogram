const cloud = require('wx-server-sdk');
const nodemailer = require('nodemailer');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const COLLECTION = 'signups';

// ---- Mail config (set via cloud function env vars) ----
const MAIL_USER = process.env.MAIL_USER || '';
const MAIL_PASS = process.env.MAIL_PASS || '';
const MAIL_TO   = process.env.MAIL_TO   || '';

const SELF_INTRO_MAX = 40;
const EXPECTATION_MAX = 250;

const ISSUE_LABEL = {
  vol01: 'DCT 第一期报名',
  vol02: 'DCT 第二期报名',
  vol03: 'DCT 第三期报名'
};

async function ensureCollection(name) {
  try {
    await db.createCollection(name);
  } catch (e) {
    const msg = (e && (e.errMsg || e.message)) || '';
    if (!/already|exist/i.test(msg)) throw e;
  }
}

function renderSignupLines(form, meta, action) {
  const channel = meta.channel === 'web' ? 'H5 网页' : '微信小程序';
  const isV3 = form.issueId === 'vol03';
  const lines = [
    action === 'updated'
      ? '一条报名被更新 ✉️（同一手机号重新提交）'
      : '刚有新报名 ✉️',
    '',
    `期次：${form.issueId || '（未标记）'}`,
    `姓名：${form.name}`,
    `微信：${form.wechat}`,
    `手机：${form.phone}`,
    `单位：${form.org   || '（未填）'}`,
    `专业：${form.field || '（未填）'}`
  ];
  if (isV3) {
    lines.push(
      '',
      '— 留言墙两题 —',
      `昵称：${form.wallNickname || '（未填）'}`,
      `一句话身份：${form.selfIntro   || '（未填）'}`,
      `想问的问题：${form.expectation || '（未填）'}`,
      `是否同意上墙：${form.consentWall === false ? '否（仅供讲者参考）' : '是'}`
    );
  } else {
    lines.push('', '为什么想参加：', form.why ? form.why : '（未填）');
  }
  lines.push('', `提交渠道：${channel}`);
  return lines.join('\n');
}

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

    const issueLabel = ISSUE_LABEL[form.issueId] || 'DCT 报名';
    const tag = action === 'updated' ? `${issueLabel}更新` : `${issueLabel}`;
    const subject = `【${tag}】${form.name} / ${form.org || '—'} / ${form.field || '—'}`;
    const body = renderSignupLines(form, meta, action) +
      (typeof totalCount === 'number' ? `\n\n累计报名：${totalCount} 人（包括本次）` : '');

    await transporter.sendMail({
      from: `"${issueLabel}" <${MAIL_USER}>`,
      to: MAIL_TO,
      subject,
      text: body
    });
    console.log('[notify-email] sent to', MAIL_TO);
  } catch (e) {
    console.warn('[notify-email] failed:', (e && e.message) || e);
  }
}

async function sendBacklogEmail() {
  if (!MAIL_USER || !MAIL_PASS || !MAIL_TO) {
    return { ok: false, msg: 'mail env vars missing' };
  }
  await ensureCollection(COLLECTION);
  const col = db.collection(COLLECTION);
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
    const block = [
      `【${i + 1}】期次：${r.issueId || '（未标记）'}`,
      `姓名：${r.name || ''}`,
      `微信：${r.wechat || ''}`,
      `手机：${r.phone || ''}`,
      `单位：${r.org || '（未填）'}`,
      `专业：${r.field || '（未填）'}`
    ];
    if (r.issueId === 'vol03') {
      block.push(
        `昵称：${r.wallNickname || '（未填）'}`,
        `一句话身份：${r.selfIntro || '（未填）'}`,
        `想问的问题：${r.expectation || '（未填）'}`,
        `是否上墙：${r.consentWall === false ? '否' : '是'}`
      );
    } else {
      block.push(`为什么想参加：${r.why ? r.why : '（未填）'}`);
    }
    block.push(`提交渠道：${channel}`);
    return block.join('\n');
  });

  const body = [
    `这是 DCT 报名汇总（已排除测试记录）。`,
    `共 ${records.length} 人。`,
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
    from: `"DCT 报名汇总" <${MAIL_USER}>`,
    to: MAIL_TO,
    subject: `【DCT 历史报名汇总】共 ${records.length} 人`,
    text: body
  });

  return { ok: true, count: records.length };
}

exports.main = async (event, context) => {
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
    why:    String(event.why    || '').trim(),
    // v3 新增：留言墙两题
    wallNickname: String(event.wallNickname || '').trim(),
    selfIntro:    String(event.selfIntro    || '').trim(),
    expectation:  String(event.expectation  || '').trim(),
    consentWall:  event.consentWall === undefined ? null : !!event.consentWall,
    consentRules: event.consentRules === undefined ? null : !!event.consentRules,
    issueId:      String(event.issueId || '').trim() || null
  };

  if (!form.name || !form.wechat || !form.phone) {
    return { ok: false, code: 'missing', msg: '姓名、微信号、手机号都需要填写' };
  }

  // v3 额外校验
  if (form.issueId === 'vol03') {
    if (!form.wallNickname) return { ok: false, code: 'missing_wall', msg: '请填写留言墙昵称' };
    if (!form.selfIntro)    return { ok: false, code: 'missing_intro', msg: '请填写一句话身份' };
    if (form.selfIntro.length > SELF_INTRO_MAX) {
      return { ok: false, code: 'too_long', msg: `自我介绍不超过 ${SELF_INTRO_MAX} 字` };
    }
    if (!form.expectation)  return { ok: false, code: 'missing_expect', msg: '请填写想问的问题' };
    if (form.expectation.length > EXPECTATION_MAX) {
      return { ok: false, code: 'too_long', msg: `想问的问题不超过 ${EXPECTATION_MAX} 字` };
    }
    if (form.consentRules === false) {
      return { ok: false, code: 'no_consent', msg: '请阅读并同意 DCT · 吧规' };
    }
  }

  const wallDisplay = form.issueId === 'vol03' && form.consentWall === false ? false : true;

  await ensureCollection(COLLECTION);
  const col = db.collection(COLLECTION);

  const now = db.serverDate();
  const meta = {
    channel: OPENID ? 'miniprogram' : 'web',
    openid:  OPENID || null,
    source:  SOURCE || null,
    wallDisplay
  };

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

  try {
    const countRes = await col.where({}).count();
    await sendNotifyEmail(form, meta, action, countRes.total);
  } catch (e) {
    console.warn('[notify-email] wrapper failed:', (e && e.message) || e);
  }

  return result;
};
