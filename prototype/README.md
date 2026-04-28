# DCT 小程序 · 设计原型同步包

> 这是设计端（Claude · 在 Anthropic Designs 项目里）维护的 HTML/JSX 原型源码。
> Claude Code 可以**直接读这里的文件**，作为实现微信小程序的视觉参考。

---

## 📂 目录结构

```
prototype/
├── DCT第二期报名.html      # 原型主入口（多 device 并排展示）
├── DESIGN-CHANGES.md       # 变更单（最新需求 / 已合并历史）
├── src/                    # 各屏 React 组件
│   ├── app.jsx             # 多设备外壳
│   ├── screen-home.jsx     # 主页
│   ├── screen-about.jsx    # 关于 DCT
│   ├── screen-review.jsx   # 往期回顾
│   ├── screen-landing.jsx  # 本期着陆
│   ├── screen-detail.jsx   # 活动须知 / 吧规
│   ├── screen-form.jsx     # 报名填表
│   ├── screen-success.jsx  # 提交成功
│   ├── poster-bg.jsx       # 蓝天 + 光芒 + 星点（PosterSky 组件）
│   └── miniprogram-chrome.jsx # 模拟小程序顶部栏
├── components/             # 可复用 React 组件（如 ios-frame.jsx）
├── data/                   # 期次数据（issues.js）
└── assets/                 # 真实图片资产（高老师肖像 / logo / 海报...）
```

---

## 🔄 怎么使用这份原型

### 你（Claude Code）想确认某项 UI 实现细节时

**示例 1 · 找颜色 token：**
```
打开 prototype/src/screen-landing.jsx 顶部
const C = { ink: '#0f2855', ... } 就是真值
```

**示例 2 · 看吸底 CTA 怎么写：**
```
搜 "sticky-cta" 或 "stickyVisible" → 看 React 实现 → 翻译成 WXML/WXSS
```

**示例 3 · 验证间距 / 圆角：**
```
所有数值用 px（按 1px = 2rpx 换算到小程序）
比如原型里 borderRadius: 18 → 小程序 36rpx
```

**示例 4 · 看真实文案：**
```
直接搜文案关键字（如"六星之路"、"客厅里"），所有原型 JSX 都是中文文案的"权威源"
```

### 单位换算约定

| 原型（px） | 小程序（rpx） | 备注 |
|---|---|---|
| `fontSize: 14` | `font-size: 28rpx` | ×2 |
| `padding: 16` | `padding: 32rpx` | ×2 |
| `borderRadius: 12` | `border-radius: 24rpx` | ×2 |
| `boxShadow: 0 8px 22px` | `0 16rpx 44rpx` | ×2（含 blur） |

### 颜色对照（从 `screen-landing.jsx` 里的 `const C = {...}`）

| Token | 值 | 用途 |
|---|---|---|
| `--ink` | `#0f2855` | 标题主墨蓝 |
| `--navy` | `#1a3a78` | 副墨蓝 / CTA 底部 |
| `--navy-soft` | `#2c5ca0` | CTA 顶部 / 链接 |
| `--text` | `#2a3d5c` | 正文 |
| `--text-soft` | `#3d5f94` | 次级正文 |
| `--muted` | `#55709a` | 辅助灰蓝 |
| `--muted-soft` | `#6b7a91` | 更弱辅助 |
| `--divider` | `#e3e9f3` | 分割线 |
| `--bg` | `#f6f8fc` | 通用底色 |
| `--card` | `#fff` | 卡片白 |
| `--gold` | `#c9a24a` | 主金色（六星意象） |
| `--gold-hi` | `#e9b949` | 高亮金 |
| `--warm-bg` → `--warm-bg-2` | `#fbf6ec → #f5e8d0` | 暖米渐变（菜单/暖卡片） |
| `--warm-ink` | `#6b4c1e` | 暖深色文字 |
| `--warm-text` | `#8a6a2e` | 暖辅文 |

---

## 🔁 同步流程

设计端更新原型后，会同步导出新的 `prototype/` 目录给你。**收到后请：**

1. 用新版本**整体替换**仓库里的 `prototype/` 目录（不要保留旧文件）
2. commit message：`[prototype-vN] 同步设计端最新原型 — <简要变化>`
3. 打 tag：`git tag prototype-vN && git push --tags`
4. 不要修改 `prototype/` 里的任何文件——这是只读的设计快照
5. 如果 `prototype/DESIGN-CHANGES.md` 有变化，按变更单优先实现

---

## ❓ 常见问题

**Q：原型用 React + JSX，小程序是 WXML，怎么对照？**
A：把 React JSX 当作伪代码看：
- `<div>` → `<view>`
- `<span>` → `<text>`
- `<img>` → `<image>`
- `style={{...}}` 里的 px → 小程序 wxss 里 ×2 变成 rpx
- `onClick` → `bindtap`
- 状态（useState）/ 事件 → setData / data binding
- 子组件如 `<PosterSky>` → 已经在 `miniprogram/components/` 里实现，直接用对应自定义组件

**Q：原型里有 hover / blur / backdrop-filter，小程序里能用吗？**
A：
- `hover:` → 改用 `hover-class`
- `backdrop-filter: blur()` → iOS 支持，Android 部分支持，建议加 fallback `rgba(255,255,255,0.92)`
- CSS Grid → 小程序支持，可放心用

**Q：原型 + 变更单冲突怎么办？**
A：以**变更单（DESIGN-CHANGES.md）为准**——变更单是结构化指令，原型可能还没来得及更新到位。
