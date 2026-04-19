App({
  onLaunch() {
    try {
      if (!wx.cloud) {
        console.warn('当前基础库版本较低，需 >=2.2.3 才能使用云能力');
        return;
      }
      wx.cloud.init({
        env: 'cloudbase-d0gi12o758d35105a',
        traceUser: true
      });
      console.log('[cloud] init ok');
    } catch (e) {
      console.error('[cloud] init failed:', e);
    }
  },
  globalData: {}
});
