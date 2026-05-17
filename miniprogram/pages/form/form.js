// CHG-20260517-01 · 报名表新增留言墙两题 + 双 consent + 字数计数
const D = require('../../data/issues.js');

const SELF_INTRO_MAX = 40;
const EXPECTATION_MAX = 120;

Page({
  data: {
    isV3: false,
    issueId: '',
    form: {
      name:   '',
      wechat: '',
      phone:  '',
      org:    '',
      field:  '',
      why:    '',
      wallNickname: '',
      selfIntro:    '',
      expectation:  ''
    },
    selfIntroCount: 0,
    expectationCount: 0,
    selfIntroMax: SELF_INTRO_MAX,
    expectationMax: EXPECTATION_MAX,
    consentRules: false,
    consentWall: true,
    submitting: false
  },

  onLoad() {
    const cur = D.getCurrent();
    this.setData({
      isV3: cur.id === 'vol03',
      issueId: cur.id
    });
  },

  onInput(e) {
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    const patch = { [`form.${key}`]: value };
    if (key === 'selfIntro') patch.selfIntroCount = value.length;
    if (key === 'expectation') patch.expectationCount = value.length;
    this.setData(patch);
  },

  toggleRules() {
    this.setData({ consentRules: !this.data.consentRules });
  },
  toggleWall() {
    this.setData({ consentWall: !this.data.consentWall });
  },

  // 兼容旧 toggleAgree
  toggleAgree() { this.toggleRules(); },

  validate() {
    const { name, wechat, phone, wallNickname, selfIntro, expectation } = this.data.form;
    if (!name.trim())   return '请填写姓名';
    if (!wechat.trim()) return '请填写微信号';
    if (!phone.trim())  return '请填写手机号';
    if (!/^\+?\d{8,15}$/.test(phone.trim())) return '手机号格式不正确';
    if (this.data.isV3) {
      if (!wallNickname.trim()) return '请填写留言墙昵称';
      if (!selfIntro.trim())    return '请填写一句话身份介绍';
      if (selfIntro.length > SELF_INTRO_MAX)  return `自我介绍不超过 ${SELF_INTRO_MAX} 字`;
      if (!expectation.trim())  return '请填写你想问的问题';
      if (expectation.length > EXPECTATION_MAX) return `想问的问题不超过 ${EXPECTATION_MAX} 字`;
    }
    if (!this.data.consentRules) return '请阅读并同意 DCT · 吧规';
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
      const payload = {
        ...this.data.form,
        issueId: this.data.issueId,
        consentRules: this.data.consentRules,
        consentWall: this.data.consentWall
      };
      const res = await wx.cloud.callFunction({
        name: 'submitSignup',
        data: payload
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
