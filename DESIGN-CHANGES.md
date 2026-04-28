# DCT 小程序 · 设计变更单（DESIGN-CHANGES）

> 这是**设计稿（原型）→ 实现（小程序代码）**之间的桥梁。
> 所有 UI 层面的改动都写在这份文档里，功能层面的改动走 GitHub。

> **2026-04-28 整合说明**：之前仓库里有两份变更单（根 `./DESIGN-CHANGES.md` + 设计端导出的 `prototype/DESIGN-CHANGES.md`），编号撞了。本次统一：
> - **本文档（根）= 活的工作文档**：进行中 + 已合并历史都放这里
> - **`prototype/DESIGN-CHANGES.md` = 设计端只读快照**：随 `prototype-vN` tag 整体替换，不再单独编辑
> - **冲突时以本文档为准**——但本文档在新增条目前应同步参考 `prototype/DESIGN-CHANGES.md` 的最新条目，避免漏吸收设计意图

---

## 🗂 工作流总览

```
┌─────────────────┐   纯 UI 改动   ┌────────────────────┐
│   Claude 设计   │ ────────────→ │  DESIGN-CHANGES.md │
│ (HTML/JSX 原型) │               │   (复制粘贴给 CC)   │
└─────────────────┘               └────────────────────┘
        ↑                                    │
        │ 功能改完拉新代码回读                  ↓
        │                          ┌────────────────────┐
        └──────────────────────────│  Claude Code (小程序)│
                  GitHub           └────────────────────┘
                                   功能改动 → push GitHub
```

### 🎨 纯 UI 改动（走这份文档 · 快）
**范围：** 颜色、字号、间距、圆角、阴影、文案、图标、卡片排版、图片位置、微动效（`hover-class`）
**流程：**
1. 告诉 Claude 你想怎么改（或在 HTML 原型上标注）
2. Claude 在这里改原型，**同时**在本文档"进行中"区追加一条变更单
3. 你复制最新的变更单整段 → 粘贴给 Claude Code → 它按单子改 WXML/WXSS

### ⚙️ 功能改动（走 GitHub · 不漏）
**范围：** 新页面、新字段、接口/云函数、数据流、状态管理、跳转逻辑、表单校验
**流程：**
1. 直接告诉 Claude Code 你要什么功能，它实现后 push 到 GitHub
2. 下次在这里设计时，Claude 先 `git log` 拉最新代码，确认当前实现状态
3. 如果功能变动带 UI，再在本文档记一条 UI 变更单

### 🤝 混合改动
先在这里改 UI 原型 → 记到文档 → 同时告诉 Claude Code "（文档 + 功能需求）"，它一次改完 push GitHub。

---

## 📋 变更单写法约定

每一条变更单用 `---` 分隔，包含这些字段：

- **编号**：`CHG-YYYYMMDD-NN`（年月日-序号；同一天多条按序号递增；**不要复用已存在的编号**）
- **页面**：`home / about / review / review-detail / landing / detail / form / success / components/poster-sky / components/star-4 / components/dct-origin-story`
- **区块**：用 WXML 里实际的 class 名定位（例如 `.hero-portrait-wrap`、`.speaker-card`、`.cta`）
- **原样**：改前的 WXSS / WXML 片段（或描述）
- **目标**：改后的 WXSS / WXML 片段 + 一句设计意图
- **截图**：原型里截图的路径（可选，优先用视觉比对）

**给 Claude Code 的粘贴模板：**
```
按 DESIGN-CHANGES.md 的 [CHG-xxxx] 改一下，只动 UI，别动逻辑。
```

---

## 🧭 小程序 ↔ 原型 文件对照表

| 原型文件（设计端） | 小程序文件（实现端） | 页面作用 |
|---|---|---|
| `prototype/data/issues.js`                        | `miniprogram/data/issues.js`                                   | **期次数据中心**（全局单一数据源） |
| `prototype/src/screen-home.jsx`                   | `miniprogram/pages/home/home.{wxml,wxss,js}`                   | 主页（品牌 + 3 入口） |
| `prototype/src/screen-about.jsx`                  | `miniprogram/pages/about/about.{wxml,wxss,js}`                 | 关于 DCT（动画 + 长图文） |
| `prototype/src/screen-review.jsx` · `ScreenReview`        | `miniprogram/pages/review/review.{wxml,wxss,js}`        | 往期回顾列表 |
| `prototype/src/screen-review.jsx` · `ScreenReviewDetail`  | `miniprogram/pages/review-detail/review-detail.{wxml,wxss,js}` | 单期回顾详情 |
| `prototype/src/screen-landing.jsx`                | `miniprogram/pages/landing/landing.{wxml,wxss,js}`             | 本期着陆 |
| `prototype/src/screen-detail.jsx`                 | `miniprogram/pages/detail/detail.{wxml,wxss,js}`               | 活动须知 & 吧规 |
| `prototype/src/screen-form.jsx`                   | `miniprogram/pages/form/form.{wxml,wxss,js}`                   | 报名填表 |
| `prototype/src/screen-success.jsx`                | `miniprogram/pages/success/success.{wxml,wxss,js}`             | 提交成功 |
| `prototype/src/poster-bg.jsx`                     | `miniprogram/components/poster-sky/`                           | 蓝天渐变 + 光芒背景 |
| —（无原型，已实现）                                 | `miniprogram/components/dct-origin-story/`                     | DCT 起源故事动画（8 幕） |
| `prototype/src/miniprogram-chrome.jsx`            | （小程序自带导航栏，不需要实现）                                  | — |

**单位换算（很重要）：**
- 原型里的 `px` → 小程序用 `rpx`
- **换算关系**：`1px（原型，iPhone 14 Pro 宽 390px）≈ 2rpx`
- 字号、间距、圆角、阴影 blur 都要 ×2

**颜色系统（CHG-20260428-02 U6 已写入 `app.wxss` 作为 CSS 变量）：**

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
| `--warm-bg` → `--warm-bg-2` | `#fbf6ec → #f5e8d0` | 暖米渐变（菜单 / 暖卡片） |
| `--warm-ink` | `#6b4c1e` | 暖深色文字 |
| `--warm-text` | `#8a6a2e` | 暖辅文 |

> **U6 收尾 TODO**：landing.wxss 已 var() 化；detail/form/success.wxss 还有 45 处硬编码色票待批量替换（值 1:1 对应，零视觉差，等 landing 真机验证后做）。

---

## 📝 进行中变更单

<!-- 最新的变更单放在最上方 -->

---

### CHG-20260428-09 · about 页 6 幕动画 — AE/Lottie 后期接入

**类型**：⚙️ 功能改动 + 资源依赖
**页面**：`pages/about` / `components/dct-origin-story`（候选复用）
**设计意图**：当前 about 页 6 幕动画是用纯 WXML/WXSS keyframes 实现的占位版本，QY 不满意。**计划**用 AE 制作连续卡通动画 → Bodymovin 导出 Lottie JSON → 小程序用 `lottie-miniprogram` 播放。

**前置依赖（已就绪）：**
- `lottie-miniprogram@^1.0.12` 已加入 `miniprogram/package.json`（来自旧 root 文档 CHG-20260428-01 "Lottie 分层动画接入准备"）
- 微信开发者工具中需"工具 → 构建 npm"生成 `miniprogram_npm/`
- AE 制作时**避免依赖 expression**（小程序端 Lottie 不支持）

**待 QY 提供：**
- AE 项目源文件 + Bodymovin 导出的 `.json`
- 分层素材（背景、人物、气泡、文字、道具）

**实施步骤（素材到位后）：**
1. 把 `.json` 放到 `miniprogram/assets/animations/about-story.json`
2. 在 `pages/about` 的动画区块用 `<canvas type="2d" id="about-anim">` 替换现有 WXML 动画
3. JS 里用 `lottie-miniprogram` 加载 + 播放，提供 replay / pause 控制
4. 保留现有 `dct-origin-story` 组件做 fallback（如 Lottie 加载失败）

**给 Claude Code 的粘贴说明：**
> 按 DESIGN-CHANGES.md 的 CHG-20260428-09 接入 about 页 AE/Lottie 动画。素材路径 `miniprogram/assets/animations/about-story.json`。先在 about 页测试，不要动 landing 上现有 dct-origin-story。

---

### CHG-20260428-08 · about 页文案重构（忠实第一期开场 PDF）

**类型**：🎨 纯 UI 改动（文案 + 结构）
**页面**：`pages/about/about`
**设计意图**：把现有 about 页改成与第一期开场 PDF 同一套叙事——突出"非典型精神科 PhD 三人组"的身份反差、DCT 的三层含义、客厅作为反讲堂的选择。**漫画 / 真实头像后续会补**，先用 PORTRAIT 占位块。

**改动列表：**

1. **6 幕动画 caption 改写**：
   - `从一片蓝天开始` → `一切从天时地利人和说起` / sub: `2026 · 一个客厅 · 三个 PhD`
   - `三个人的夜谈` → `一只狗、一道菜、一次对话` / sub: `Dog · Chef · Therapist`
   - `一个问题` → `在绩效之外` / sub: `留一块精神自留地`（视觉换成「方块田 + 金色小芽」）
   - `于是在客厅` → `Doctors' Crazy Thinking` / sub: `认真地胡思乱想`（视觉换成大字品牌锁屏）
   - `星芒亮起` → `客厅里的家庭学术沙龙`（视觉沿用客厅 SVG）
   - `等你来` → `欢迎你也来` / sub: `一起建设这块自留地`

2. **下方长图文 5 个 section**（替换原 3 个）：
   - **WHY · DCT 从何而来**
   - **WHO · 三位主创 · D · C · T**（3 张主创卡：包文欣/狗子/Dog · 徐佳淇/厨子/Chef · 曹栖源/治疗师/Therapist · 64×64 PORTRAIT 占位 + 卡片下方斜体灰字 `※ 主创真实形象 / 漫画头像将于后续插入此处。`）
   - **WHAT · DCT 的三层意思**（MeaningRow 三行表，03 行金色高亮）
   - **HOW · 为什么是「客厅里」**
   - **WHO MAY JOIN · 什么样的人会来？**

3. **底部 CTA 卡片**：在 `期待和你一起...` 下方新增一行 monospace 字距 1：`DCT · EST. 2026 · CHENGDU`

**小程序实现要点**：
- `CreatorCard` 在 WXML 写成可复用 `template`，数据走 `data` 数组
- `MeaningRow` 用 `wx:for`，`highlight` 字段控制高亮样式
- 头像占位的 PORTRAIT 文字将来换成 `<image src="{{item.avatar}}">`，留好字段

**给 Claude Code 的粘贴说明：**
> 按 DESIGN-CHANGES.md 的 CHG-20260428-08 重写 about 页文案与结构，主创头像继续用占位（蓝渐变 + 大字 D/C/T），等真实漫画头像补来再换。**注意 6 幕动画后续会被 CHG-20260428-09 用 Lottie 替换**——做文案重构时不要花时间优化动画细节。

---

### CHG-20260419-00 · 示例（保留作为模板）

**页面**：`landing`
**区块**：`.cta`（底部报名按钮）
**设计意图**：让按钮更"安静"一点，减少灰度对比。

**原样**（`landing.wxss` 当前）：
```css
.cta {
  background: linear-gradient(180deg, #2c5ca0 0%, #1a3a78 100%);
  box-shadow: 0 16rpx 44rpx rgba(26,58,120,0.32);
}
```

**目标**：
```css
.cta {
  background: linear-gradient(180deg, #3d6fb0 0%, #2c5ca0 100%);
  box-shadow: 0 12rpx 32rpx rgba(26,58,120,0.24);
}
```

**粘贴给 Claude Code：**
> 按 DESIGN-CHANGES.md 的 CHG-20260419-00 改一下，只动 UI，别动逻辑。

---

## ✅ 已合并

> 所有已完成的变更单按时间倒序归档在这里。`commit` 字段为 git 短 hash，方便追溯。
> 编号保留各自原编号方便历史检索（之前两份文档存在编号冲突，已通过本次合并消除）。

---

### CHG-20260428-07 · landing 实现审计后修复 3 处 — 2026-04-28 · `8bf92db`

**修复内容**：
1. perf：`_handleScroll` 不再每帧调 `wx.getSystemInfoSync()`，onLoad 缓存 windowHeight + windowWidth 一次
2. bug：进度条永远到不了 100% — 之前 `_totalHeight` 只 onReady 测一次，dct-origin-story 8 张异步图加载完页面变高就锁死了。现改成滚动时 1.5s 节流懒重测 boundingClientRect
3. visual：`.speaker-wrap` padding-top 80rpx（与原型对齐），有 reg-banner 时收紧到 48rpx 给 banner 留位

**文件**：`miniprogram/pages/landing/landing.{js,wxml,wxss}`

---

### CHG-20260428-06 · 多期架构升级（home / about / review / review-detail + 数据层） — 2026-04-28 · `84164b5`

> 合并自原 root CHG-20260428-04 + prototype CHG-20260419-10（同一件事不同编号）。

**完成内容**：
- 新增 `miniprogram/data/issues.js`（CommonJS 数据中心：current / brand / issues 数组 + getCurrent / getPastIssues / getById）
- 新增 4 个页面：`pages/home`、`pages/about`、`pages/review`、`pages/review-detail`
- 改 `app.json`：把 home 放第一位 + `entryPagePath: "pages/home/home"`
- landing/detail/form/success 不动，只是不再是首页

**注**：about 页 6 幕动画用 WXML/WXSS keyframes 占位实现，**QY 不满意**，将由 CHG-20260428-09 用 AE/Lottie 替换。文案也需 CHG-20260428-08 重写。

---

### CHG-20260428-05 · 小程序启动分析性能修正（analyzing codes 卡顿） — 2026-04-28 · `84164b5`

> 原 root CHG-20260428-03。

**完成内容**：
- `project.config.json` 把 `nodeModules: true → false`（关闭开发者工具的 npm 扫描）
- `packOptions.ignore` 新增排除 `node_modules` / `cloudfunctions/submitSignup/node_modules` / `cloudfunctions/submitSignup/miniprogram_npm` / `cloudfunctions/submitFeedback/node_modules`
- 保留 `lottie-miniprogram` 依赖在 `package.json`（CHG-20260428-09 会启用）

---

### CHG-20260428-04 · 功能升级 F1-F5（报名状态 / 倒计时 / 日历 / 分享 / 邀请券） — 2026-04-28 · `04bf5e4`

> 原 prototype CHG-20260428-03。

**完成内容**：
- **F1** 报名状态记忆：新增 `cloudfunctions/registration`（read-only by openid）+ landing onLoad 自动查询 + 状态横幅（pending/approved/rejected）+ CTA 文案动态切换"查看我的报名"
- **F5** hero 倒计时 chip：`距开场还有 N 天` / `今晚见` / `已结束`
- **F2** success 页"加入手机日历"按钮（`wx.addPhoneCalendar` 提前 1 天提醒）
- **F3** landing 自定义分享（`onShareAppMessage` + `onShareTimeline`，imageUrl 占位 cloud:// 待上传）
- **F4** success 页"生成邀请券"Canvas 海报（v1 占位：渐变 + 标题 + 8 角星 + 日期；二维码留 TODO 等 wxacode.getUnlimited）

---

### CHG-20260428-03 · landing UI 升级（U1-U7 + 颜色 token） — 2026-04-28 · `04bf5e4`

> 原 prototype CHG-20260428-02。

**完成内容**：
- **U6** 全局颜色 token 写入 `app.wxss`（16 个变量）+ landing.wxss 完整 var() 化
- **U1** 顶部金色滚动进度条（sticky · 3rpx · gold 渐变 + 阴影）
- **U2** 吸底浮动 CTA（fixed · scrollTop > 720rpx 显示 · backdrop-blur）
- **U3** hero portrait 276rpx → 240rpx
- **U4** 三张 points 卡片加 lanes/footprint/compass 图标（CSS 实现，非 SVG）+ 编号移到标题右侧
- **U5** 季节限定菜单加"不含正餐"chip 替换原斜体小字
- **U7** data 数组化（`infoRows`/`points`/`menu`）+ `<image>` lazy-load + binderror + a11y aria-label + `::after` 替代 `<view class="sep">`

**U6 后半 TODO**：detail/form/success.wxss 还有 45 处硬编码色票，等 landing 真机验证后批量替换。

---

### CHG-20260428-02 · landing 接入 DCT 起源故事动画 — 2026-04-15 ~ 04-28 · `a976ee9` / `5d60c0b`

> 原 root CHG-20260428-02。

**完成内容**：
- 新增 `miniprogram/components/dct-origin-story/` 独立组件（8 幕，36 秒）
- 新增 `miniprogram/assets/story-panels/panel-01.jpg` 至 `panel-08.jpg`（PPT 第三页两张漫画图裁切）
- 镜头位移、聚焦光、进度条改用 WXSS keyframes 驱动；JS 只低频更新字幕
- IntersectionObserver 滚到可见才开始播放
- 提供 replay / pause 按钮

**未来去向**：CHG-20260428-09 用 AE/Lottie 接入后，可能从 landing 整体迁移或退役，由 about 页的 Lottie 动画接班。

---

### CHG-20260428-01 · prototype-v1 同步 — 2026-04-28 · `067e633`

**完成内容**：
- 设计端导出的 `prototype/_zip` 解压为 `prototype/` 目录，包含 `src/` 7 个 React 屏 + `data/issues.js` + `assets/` + `DESIGN-CHANGES.md`
- `prototype/` 在仓库内**只读**，每次设计端更新整体替换 + tag `prototype-vN`

---
