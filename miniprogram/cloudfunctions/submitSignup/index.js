const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const COLLECTION = 'signups';

// Auto-create the collection if it doesn't exist. Idempotent.
async function ensureCollection(name) {
  try {
    await db.createCollection(name);
  } catch (e) {
    const msg = (e && (e.errMsg || e.message)) || '';
    if (!/already|exist/i.test(msg)) throw e;
  }
}

// Called from:
// - WeChat mini program (wx.cloud.callFunction)    → event = raw form, has OPENID in context
// - H5 web (CloudBase Web SDK anonymous)           → event = raw form, OPENID is '' or anon
//
// Dedup key is `phone` (primary) — works for both channels. OPENID is stored
// as reference when available, but doesn't drive dedup anymore.
exports.main = async (event, context) => {
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

  if (existing.data && existing.data.length > 0) {
    const id = existing.data[0]._id;
    await col.doc(id).update({
      data: { ...form, ...meta, updatedAt: now }
    });
    return { ok: true, id, action: 'updated' };
  }

  const res = await col.add({
    data: { ...form, ...meta, createdAt: now, updatedAt: now }
  });
  return { ok: true, id: res._id, action: 'created' };
};
