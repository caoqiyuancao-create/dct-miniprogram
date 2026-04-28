// DCT registration status query — CHG-20260428-03 F1
// Read-only. Called from landing.js onLoad to decide whether to show the
// "已报名" status banner. Never writes; never throws to caller.
//
// event = { action: 'check', issueId: 'vol02' }
// returns:
//   { ok: true, registered: false }
//   { ok: true, registered: true, status: 'pending'|'approved'|'rejected', record: {...minimal fields...} }
//
// Dedup logic in submitSignup is by phone, but we check by openid here because
// landing onLoad has no phone yet. Records submitted from H5 (no openid) are
// invisible to this lookup — that's by design (mini-program-only banner).

const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const COLLECTION = 'signups';

exports.main = async (event = {}, context) => {
  const action = event.action || 'check';
  const issueId = event.issueId || 'vol02';

  if (action !== 'check') {
    return { ok: false, code: 'unsupported_action', msg: 'only action=check is supported' };
  }

  const { OPENID = '' } = cloud.getWXContext() || {};
  if (!OPENID) {
    return { ok: true, registered: false, reason: 'no_openid' };
  }

  try {
    const col = db.collection(COLLECTION);
    // Match by openid. We do NOT yet filter by issueId because the legacy
    // schema has no issueId field — every existing record is implicitly vol02.
    // Once issueId is added (CHG-20260419-10), uncomment the where clause.
    const res = await col
      .where({ openid: OPENID /*, issueId */ })
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    const list = (res && res.data) || [];
    if (list.length === 0) {
      return { ok: true, registered: false, issueId };
    }

    const rec = list[0];
    // Default status = 'pending' until reviewer marks otherwise.
    const status = rec.status || 'pending';

    return {
      ok: true,
      registered: true,
      issueId,
      status,
      record: {
        name: rec.name || '',
        phone: rec.phone ? maskPhone(rec.phone) : '',
        createdAt: rec.createdAt || null,
      },
    };
  } catch (e) {
    // Swallow — landing should still render even if cloud lookup fails.
    return { ok: false, code: 'query_failed', msg: (e && e.message) || String(e) };
  }
};

function maskPhone(p) {
  const s = String(p);
  if (s.length < 7) return s;
  return s.slice(0, 3) + '****' + s.slice(-4);
}
