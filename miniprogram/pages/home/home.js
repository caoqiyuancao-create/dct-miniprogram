const D = require('../../data/issues');

Page({
  data: {
    brand: D.brand,
    current: D.getCurrent(),
    pastCount: D.getPastIssues().length,
    sloganIndex: 0,
    announcementIndex: 0,
    activeAnnouncement: D.brand.announcements[0]
  },

  onLoad() {
    this.startRotators();
  },

  onUnload() {
    this.clearRotators();
  },

  onHide() {
    this.clearRotators();
  },

  onShow() {
    this.startRotators();
  },

  startRotators() {
    if (this.sloganTimer || this.announcementTimer) return;
    this.sloganTimer = setInterval(() => {
      const next = (this.data.sloganIndex + 1) % this.data.brand.slogans.length;
      this.setData({ sloganIndex: next });
    }, 3600);
    this.announcementTimer = setInterval(() => {
      const next = (this.data.announcementIndex + 1) % this.data.brand.announcements.length;
      this.setData({
        announcementIndex: next,
        activeAnnouncement: this.data.brand.announcements[next]
      });
    }, 4800);
  },

  clearRotators() {
    if (this.sloganTimer) {
      clearInterval(this.sloganTimer);
      this.sloganTimer = null;
    }
    if (this.announcementTimer) {
      clearInterval(this.announcementTimer);
      this.announcementTimer = null;
    }
  },

  goLanding() {
    wx.navigateTo({ url: '/pages/landing/landing' });
  },

  goAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  },

  goReview() {
    wx.navigateTo({ url: '/pages/review/review' });
  },

  onImgError(e) {
    console.warn('[home image error]', (e && e.currentTarget && e.currentTarget.dataset) || e);
  }
});
