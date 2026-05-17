// CHG-20260517-03/04 · 往期回顾详情页 · 按 issue.recap.variant 调度
// vol01 → night-talk（客厅夜谈 D 版 · 暗色长卷）
// vol02 → candle-track（烛光与赛道 B 版 · 蓝/金/烛光交织 8 段长卷）
// 其他  → generic（通用兜底）

const D = require('../../data/issues');

// 工具：把 text 里 highlight 子串切成 [head, accent, tail] 数组
function splitAccent(text, highlight) {
  if (!text || !highlight) return { hasAccent: false, plainText: text || '' };
  const idx = text.indexOf(highlight);
  if (idx < 0) return { hasAccent: false, plainText: text };
  return {
    hasAccent: true,
    head: text.slice(0, idx),
    accent: highlight,
    tail: text.slice(idx + highlight.length)
  };
}

Page({
  data: {
    issue: null,
    variant: 'generic',
    hasPhotos: false,
    hasHighlights: false,
    // night-talk 专用预处理字段
    nightHookLines: [],
    nightThreads: [],
    // candle-track 专用预处理字段
    cT: null,
    cTThreads: [],
    cTHabits: [],
    cTClosingEssay: [],
    cTSpeakerLine: '',
    cTDateChip: '',
    cTHeroDateAttendees: '',
    cTSection1OutroSplit: null,
    cTLeadSplit: null,
    cTPeakBodySplit: null,
    cTMajorsBodySplit: null
  },

  onLoad(options) {
    const id = options && options.id;
    const issue = D.getById(id) || D.getPastIssues()[0] || null;
    if (!issue) return;

    const recap = issue.recap || {};
    let variant = 'generic';
    if (recap.variant === 'night-talk') variant = 'night-talk';
    else if (recap.variant === 'candle-track') variant = 'candle-track';

    const patch = {
      issue,
      variant,
      hasPhotos: !!(issue.photos && issue.photos.length > 0),
      hasHighlights: !!(issue.highlights && issue.highlights.length > 0)
    };

    // night-talk 预处理
    if (variant === 'night-talk') {
      const lines = (recap.hook && Array.isArray(recap.hook.lines)) ? recap.hook.lines : [];
      patch.nightHookLines = lines.map(line => {
        if (!line.accent) return { plainText: line.text, hasAccent: false };
        const parts = line.text.split(line.accent);
        return {
          hasAccent: true,
          head: parts[0] || '',
          accent: line.accent,
          tail: parts[1] || '',
          colorClass: line.color === 'amber' ? 'night-hook__accent--amber'
                    : line.color === 'ember' ? 'night-hook__accent--ember'
                    : ''
        };
      });
      patch.nightThreads = (recap.threads || []).map((t, i, a) => ({
        num: String(i + 1).padStart(2, '0'),
        text: t,
        isLast: i === a.length - 1
      }));
    }

    // candle-track 预处理
    if (variant === 'candle-track') {
      patch.cT = recap;
      patch.cTThreads = (recap.threads || []).map((t, i, a) => ({
        num: '0' + (i + 1),
        text: t,
        isLast: i === a.length - 1
      }));
      patch.cTHabits = (recap.habits || []).map((h, i) => ({
        k: h.k, d: h.d, first: i === 0
      }));
      patch.cTClosingEssay = (recap.closingEssay || []).map(line => {
        // 标记是否含 closingEssayHl 或"忍受焦虑的能力"
        const hlEssay = recap.closingEssayHl;
        if (hlEssay && line.indexOf(hlEssay) >= 0) {
          const p = line.split(hlEssay);
          return { hasHl: true, head: p[0] || '', hl: hlEssay, tail: p[1] || '' };
        }
        const tough = '忍受焦虑的能力';
        if (line.indexOf(tough) >= 0) {
          const p = line.split(tough);
          return { hasStrong: true, head: p[0] || '', strong: tough, tail: p[1] || '' };
        }
        return { plain: line };
      });
      // speaker 一行
      const sp = issue.speaker || {};
      const org = (sp.org || '西南交通大学').replace('光电工程研究所', '').trim();
      patch.cTSpeakerLine = `${sp.name || ''} ${sp.title || ''} · ${org}`;
      patch.cTDateChip = (issue.date || '').slice(5) + ' · 19:00'; // "04.25 · 19:00"
      patch.cTHeroDateAttendees = (issue.date || '') + ' · ' + (recap.attendees || '客厅夜场');

      // section1Outro [2nd line] split by "变成生活的一部分"
      const outro2 = (recap.section1Outro && recap.section1Outro[1]) || '';
      const o2hl = '变成生活的一部分';
      if (outro2.indexOf(o2hl) >= 0) {
        const p = outro2.split(o2hl);
        patch.cTSection1OutroSplit = { head: p[0] || '', hl: o2hl, tail: p[1] || '' };
      } else {
        patch.cTSection1OutroSplit = { head: outro2, hl: '', tail: '' };
      }

      // leadBody split by leadHighlight
      patch.cTLeadSplit = splitAccent(recap.leadBody, recap.leadHighlight);

      // peakBody split by "敏锐、热情和安静"
      patch.cTPeakBodySplit = splitAccent(recap.peakBody, '敏锐、热情和安静');

      // majorsBody split by majorsBodyHl
      patch.cTMajorsBodySplit = splitAccent(recap.majorsBody, recap.majorsBodyHl);
    }

    this.setData(patch);
  },

  goBack() {
    wx.navigateBack({ fail: () => wx.navigateTo({ url: '/pages/review/review' }) });
  },

  goLanding() {
    wx.navigateTo({ url: '/pages/landing/landing' });
  },

  goReviewList() {
    wx.navigateBack({ fail: () => wx.redirectTo({ url: '/pages/review/review' }) });
  },

  onImgError(e) {
    console.warn('[review detail image error]', (e && e.currentTarget && e.currentTarget.dataset) || e);
  }
});
