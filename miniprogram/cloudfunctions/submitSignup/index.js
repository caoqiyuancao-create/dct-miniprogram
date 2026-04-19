const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const COLLECTION = 'signups';

// Auto-create the collection if it doesn't exist. Idempotent; swallows "already exists" errors.
async function ensureCollection(name) {
  try {
    await db.createCollection(name);
  } catch (e) {
    const msg = (e && (e.errMsg || e.message)) || '';
    // -501001 / "already exists" are fine — means someone else (or a previous call) made it.
    if (!/already|exist/i.test(msg)) {
      // Other errors we still want to surface.
      throw e;
    }
  }
}

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const now = db.serverDate();

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

  // Use openid as dedupe key — one signup per WeChat user, re-submit overwrites.
  const existing = await col.where({ _openid: OPENID }).limit(1).get();

  if (existing.data && existing.data.length > 0) {
    const id = existing.data[0]._id;
    await col.doc(id).update({
      data: { ...form, updatedAt: now }
    });
    return { ok: true, id, action: 'updated' };
  }

  const res = await col.add({
    data: { ...form, createdAt: now, updatedAt: now }
  });
  return { ok: true, id: res._id, action: 'created' };
};
