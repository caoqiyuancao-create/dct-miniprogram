Page({
  data: {
    form: {
      name:   '',
      wechat: '',
      phone:  '',
      org:    '',
      field:  '',
      why:    ''
    },
    agreed: true,
    submitting: false
  },
  onInput(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ [`form.${key}`]: e.detail.value });
  },
  toggleAgree() {
    this.setData({ agreed: !this.data.agreed });
  },
  validate() {
    const { name, wechat, phone } = this.data.form;
    if (!name.trim())   return '请填写姓名';
    if (!wechat.trim()) return '请填写微信号';
    if (!phone.trim())  return '请填写手机号';
    if (!/^\+?\d{8,15}$/.test(phone.trim())) return '手机号格式不正确';
    if (!this.data.agreed) return '请阅读并同意 DCT · 吧规';
    return null;
  },
  async submit() {
    if (this.data.submitting) return;
    const err = this.validate();
    if (err) {
      wx.showToast({ title: err, icon: 'none' });
      return;
    }
    this.setData({ submitting: true });
    wx.showLoading({ title: '提交中…', mask: true });
    try {
      const res = await wx.cloud.callFunction({
        name: 'submitSignup',
        data: { ...this.data.form }
      });
      wx.hideLoading();
      if (res.result && res.result.ok) {
        wx.redirectTo({ url: '/pages/success/success' });
      } else {
        const msg = (res.result && res.result.msg) || '提交失败，请稍后再试';
        wx.showToast({ title: msg, icon: 'none' });
        this.setData({ submitting: false });
      }
    } catch (e) {
      wx.hideLoading();
      console.error('submitSignup failed', e);
      wx.showToast({ title: '网络异常，请重试', icon: 'none' });
      this.setData({ submitting: false });
    }
  }
});
