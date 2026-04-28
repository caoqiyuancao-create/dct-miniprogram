const D = require('../../data/issues');

Page({
  data: {
    issue: null,
    hasPhotos: false,
    hasHighlights: false
  },

  onLoad(options) {
    const id = options && options.id;
    const issue = D.getById(id) || D.getPastIssues()[0] || null;
    if (!issue) return;
    this.setData({
      issue,
      hasPhotos: !!(issue.photos && issue.photos.length > 0),
      hasHighlights: !!(issue.highlights && issue.highlights.length > 0)
    });
  },

  goBack() {
    wx.navigateBack({ fail: () => wx.navigateTo({ url: '/pages/review/review' }) });
  },

  onImgError(e) {
    console.warn('[review detail image error]', (e && e.currentTarget && e.currentTarget.dataset) || e);
  }
});
