// CHG-20260517-03 · 往期回顾详情页 · 按 issue.recap.variant 调度
// vol01 → night-talk（客厅夜谈 D 版 · 暗色长卷）
// vol02 → candle-track（烛光与赛道 B 版 · 待下一个 PR 实现自定义版式）
// 其他  → generic（通用兜底）

const D = require('../../data/issues');

Page({
  data: {
    issue: null,
    variant: 'generic',
    hasPhotos: false,
    hasHighlights: false,
    // night-talk 专用预处理字段
    nightHookLines: [],
    nightThreads: []
  },

  onLoad(options) {
    const id = options && options.id;
    const issue = D.getById(id) || D.getPastIssues()[0] || null;
    if (!issue) return;

    const recap = issue.recap || {};
    let variant = 'generic';
    if (recap.variant === 'night-talk') variant = 'night-talk';
    else if (recap.variant === 'candle-track') variant = 'generic'; // TODO 下一个 PR 实现 candle-track 自定义版式

    // night-talk 专用：预处理 hook lines 与 threads
    let nightHookLines = [];
    let nightThreads = [];
    if (variant === 'night-talk') {
      if (recap.hook && Array.isArray(recap.hook.lines)) {
        nightHookLines = recap.hook.lines.map(line => {
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
      }
      if (Array.isArray(recap.threads)) {
        nightThreads = recap.threads.map((t, i) => ({
          num: String(i + 1).padStart(2, '0'),
          // 把 \n 替换成空白用于 WXML 渲染；保留视觉换行靠 white-space: pre-line
          text: t,
          isLast: i === recap.threads.length - 1
        }));
      }
    }

    this.setData({
      issue,
      variant,
      hasPhotos: !!(issue.photos && issue.photos.length > 0),
      hasHighlights: !!(issue.highlights && issue.highlights.length > 0),
      nightHookLines,
      nightThreads
    });
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
