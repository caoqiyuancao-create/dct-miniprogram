// CHG-20260517-01 · getWallFeed
// 现场电子留言墙的实时数据源（H5 大屏 + 小程序 wall 页 + 独立 TV HTML 共用）
//
// 数据隔离规则（与小程序 / H5 同期次的提交对齐）：
//   - 只返回 issueId === 'vol03' 的记录（与 vol02 历史数据物理同集合 / 逻辑隔离）
//   - 只返回 consentWall !== false 的记录（用户授权"匿名上墙"）
//   - 默认排除 wallApproved === false 的记录（运营手动标记不上墙的）
//   - 默认排除 wallHidden === true 的记录（运营临时屏蔽）
//
// 返回内容：
//   { ok: true, intros: [{ who, line }], questions: [string], total, updatedAt }
//
// MVP 默认 consentWall=true 即可上墙，无需运营预审。
// 运营如想屏蔽某条不当内容：
//   db.collection('signups').doc(<id>).update({ data: { wallApproved: false } })

const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;
const COLLECTION = 'signups';

const DEFAULT_LIMIT = 200;
const ISSUE_ID = 'vol03';

exports.main = async (event = {}) => {
  const limit = Math.min(Math.max(Number(event.limit) || DEFAULT_LIMIT, 1), 500);

  try {
    // 显式过滤 vol03 + 同意上墙的记录
    // 注意：wallApproved 仅在显式置 false 时才排除（默认未设视为 true）
    const where = {
      issueId: ISSUE_ID,
      consentWall: _.neq(false),
      wallApproved: _.neq(false),
      wallHidden: _.neq(true)
    };

    const res = await db.collection(COLLECTION)
      .where(where)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .field({
        wallNickname: true,
        selfIntro: true,
        expectation: true,
        org: true,
        field: true,
        createdAt: true
      })
      .get();

    const records = (res.data || []).filter(r => r.selfIntro || r.expectation);

    // 拼装 intros：优先 (wallNickname || org+field) + selfIntro
    const intros = records
      .filter(r => r.selfIntro && r.selfIntro.trim())
      .map(r => ({
        who: (r.wallNickname && r.wallNickname.trim())
          || [r.org, r.field].filter(Boolean).join(' · ')
          || '匿名朋友',
        line: r.selfIntro.trim()
      }));

    // 拼装 questions：直接用 expectation
    const questions = records
      .filter(r => r.expectation && r.expectation.trim())
      .map(r => r.expectation.trim());

    return {
      ok: true,
      issueId: ISSUE_ID,
      intros,
      questions,
      total: { intros: intros.length, questions: questions.length },
      updatedAt: Date.now()
    };
  } catch (err) {
    console.error('[getWallFeed] failed:', err && err.message);
    return {
      ok: false,
      msg: (err && err.message) || 'getWallFeed failed',
      intros: [],
      questions: []
    };
  }
};
