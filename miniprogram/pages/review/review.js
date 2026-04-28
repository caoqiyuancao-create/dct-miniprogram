const D = require('../../data/issues');

Page({
  data: {
    pastIssues: [],
    upcoming: null
  },

  onLoad() {
    const upcoming = D.issues.find(item => item.status === 'upcoming') || null;
    this.setData({
      pastIssues: D.getPastIssues(),
      upcoming
    });
  },

  openIssue(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/review-detail/review-detail?id=${id}` });
  },

  onImgError(e) {
    console.warn('[review image error]', (e && e.currentTarget && e.currentTarget.dataset) || e);
  }
});
