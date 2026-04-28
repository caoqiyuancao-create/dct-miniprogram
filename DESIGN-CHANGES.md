# DCT 小程序 · 设计变更单（DESIGN-CHANGES）

> 这是**设计稿（这里）→ 实现（Claude Code · 微信小程序）**之间的桥梁。
> 所有 UI 层面的改动都写在这份文档里，功能层面的改动走 GitHub。

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
2. Claude 在这里改原型，**同时**在本文档尾部追加一条变更单
3. 你复制最新的变更单整段 → 粘贴给 Claude Code → 它按单子改 WXML/WXSS

### ⚙️ 功能改动（走 GitHub · 不漏）
**范围：** 新页面、新字段、接口/云函数、数据流、状态管理、跳转逻辑、表单校验
**流程：**
1. 直接告诉 Claude Code 你要什么功能，它实现后 push 到 GitHub
2. 下次在这里设计时，Claude 先 `github_read_file` 拉最新代码，确认当前实现状态
3. 如果功能变动带 UI，再在本文档记一条 UI 变更单

### 🤝 混合改动
先在这里改 UI 原型 → 记到文档 → 同时告诉 Claude Code "（文档 + 功能需求）"，它一次改完 push GitHub。

---

## 📋 变更单写法约定

每一条变更单用 `---` 分隔，包含这些字段：

- **编号**：`CHG-YYYYMMDD-NN`（年月日-序号）
- **页面**：`landing / detail / form / success / components/poster-sky / components/star-4`
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

| 原型文件（这里） | 小程序文件（GitHub） |
|---|---|
| `src/screen-landing.jsx` | `miniprogram/pages/landing/landing.wxml` + `landing.wxss` |
| `src/screen-detail.jsx`  | `miniprogram/pages/detail/detail.wxml` + `detail.wxss` |
| `src/screen-form.jsx`    | `miniprogram/pages/form/form.wxml` + `form.wxss` |
| `src/screen-success.jsx` | `miniprogram/pages/success/success.wxml` + `success.wxss` |
| `src/poster-bg.jsx`      | `miniprogram/components/poster-sky/` |
| `src/miniprogram-chrome.jsx` | （小程序自带导航栏，不需要实现） |

**单位换算（很重要）：**
- 原型里的 `px` → 小程序用 `rpx`
- **换算关系**：`1px（原型，iPhone 14 Pro 宽 390px）≈ 2rpx`
- 字号、间距、圆角、阴影 blur 都要 ×2（Claude Code 已经这么做了，沿用即可）

**颜色系统（已在实现里确立，请优先复用）：**
- 主墨蓝 `#0f2855` · 副墨蓝 `#1a3a78` · 正文蓝 `#2a3d5c` / `#3d5f94`
- 灰蓝辅文 `#55709a` / `#6b7a91` · 分割线 `#e3e9f3` / `#e9eef6`
- 背景天蓝 `#e7f0fa → #c9ddf3 → #9dbfe3`（渐变）
- 金色点缀 `#c9a24a` · 高亮 `#e9b949` · 暖米 `#fbf6ec → #f5e8d0`
- 通用底色 `#f6f8fc` / 卡片白 `#fff`

---

## 📝 变更单

<!-- 最新的变更单放在最上方 -->

---

### CHG-20260428-03 · 小程序启动分析性能修正

**页面**：`project`
**区块**：`miniprogram/project.config.json`
**设计意图**：当前故事动画没有运行时死循环，但开发者工具在 `analyzing codes` 阶段会扫描工程依赖。由于项目根目录同时包含根 `node_modules` 与云函数 `node_modules`，需要先把这些目录从小程序代码分析/打包范围里排除，避免模拟器启动前无响应。
**原样**：
```json
"nodeModules": true,
"packOptions": {
  "ignore": []
}
```
**目标**：
```json
"nodeModules": false,
"packOptions": {
  "ignore": [
    { "type": "folder", "value": "node_modules" },
    { "type": "folder", "value": "cloudfunctions/submitSignup/node_modules" },
    { "type": "folder", "value": "cloudfunctions/submitSignup/miniprogram_npm" },
    { "type": "folder", "value": "cloudfunctions/submitFeedback/node_modules" }
  ]
}
```
**实现说明**：
- 先关闭开发者工具的小程序 npm 扫描开关；当前落地的故事动画是原生 WXML/WXSS/JS 组件，不依赖 `lottie-miniprogram` 运行。
- 保留 `package.json` 里的 `lottie-miniprogram` 依赖，后续真正接入 AE/Lottie JSON 时再打开 npm 构建。
- 在 `packOptions.ignore` 排除根依赖与云函数依赖，降低开发者工具分析代码时的目录规模。
**给 Claude Code 的粘贴说明**：
> 按 DESIGN-CHANGES.md 的 CHG-20260428-03 处理小程序启动卡在 analyzing codes 的问题。优先保证开发者工具不要扫描根 node_modules 和云函数 node_modules；Lottie 依赖先保留但暂不启用 npm 扫描。

---

### CHG-20260428-02 · landing 接入 DCT 起源故事动画

**页面**：`landing`
**区块**：`<dct-origin-story />`
**设计意图**：把 PPT 第三页的 8 个漫画分镜做成连续镜头式故事动画：先出现“天时地利人和”开场，再沿 8 个分镜横向推进，配合推拉镜头、扫光、聚焦光、星光和字幕同步，形成接近 AE 时间线的叙事感。
**原样**：
```xml
<!-- HERO -->
<poster-sky>...</poster-sky>

<!-- OPENING PITCH -->
```
**目标**：
```xml
<!-- HERO -->
<poster-sky>...</poster-sky>

<dct-origin-story />

<!-- OPENING PITCH -->
```
**实现说明**：
- 新增 `miniprogram/components/dct-origin-story/` 独立组件。
- 新增 `miniprogram/assets/story-panels/panel-01.jpg` 至 `panel-08.jpg`，由 PPT 第三页两张长漫画图裁切得到。
- 动画当前用原生小程序视图层完成，不依赖 AE JSON；后续如果产出 Lottie JSON，可在同一区块替换为 `lottie-miniprogram` 播放器。
- 组件提供重播和暂停按钮，避免用户无法控制自动播放。
- 组件通过 IntersectionObserver 在滚到可见时才开始播放，避免页面加载时用户还没看到动画就播完。
- 性能修正：镜头位移、聚焦光和进度条改为 WXSS keyframes 驱动，JS 只低频更新字幕和时间，避免高频 `setData` 导致小程序卡顿。

**给 Claude Code 的粘贴说明**：
> 按 DESIGN-CHANGES.md 的 CHG-20260428-02 检查 landing 的 DCT 起源故事动画接入。保留组件独立性，后续 AE/Lottie JSON 到位后可替换内部动画实现。

---

### CHG-20260428-01 · Lottie 分层动画接入准备

**页面**：`landing / components`
**区块**：`PPT 第三页 · 8 幕故事分层动画`
**设计意图**：把 PPT 第三页的 8 个漫画分镜升级为 AE/Lottie 风格的分层故事动画，而不是普通长图滚动或整图淡入。当前先完成小程序端 Lottie 播放能力准备，后续等 AE 导出的 `.json` 和分层素材到位后接入具体动画。
**原样**：
```json
// miniprogram/project.config.json
"nodeModules": false
```
**目标**：
```json
// miniprogram/project.config.json
"nodeModules": true
```
并在 `miniprogram/package.json` 中加入：
```json
"dependencies": {
  "lottie-miniprogram": "^1.0.12"
}
```
**实现说明**：
- 已安装 `lottie-miniprogram`，用于小程序 `<canvas type="2d">` 播放 Lottie 动画。
- 微信开发者工具中还需要执行一次「工具 → 构建 npm」，生成 `miniprogram_npm/` 后才能在小程序运行时引用。
- Lottie 动画 JSON 推荐由 AE 的 LottieFiles/Bodymovin 导出；小程序端不支持 Lottie expression，AE 制作时需要避免依赖 expression。
- 当前漫画 JPG 需要先拆成背景、人物、气泡、文字、道具等图层，才能实现“动画片式”的人物/道具独立运动。
**原型参考**：
- `D:\DCT_program\.codex-analysis\slide3\story_animation_demo.html`：8 幕基础故事版
- `D:\DCT_program\.codex-analysis\slide3\story_animation_cinematic.html`：连续镜头电影版

**给 Claude Code 的粘贴说明**：
> 按 DESIGN-CHANGES.md 的 CHG-20260428-01 接入 Lottie 分层动画能力。先保留现有 landing 页面，不直接替换上线入口；等 AE/Lottie JSON 素材确认后，再新增播放组件并接入。

<!-- （示例 · 你可以参考这个格式。实际改动来时 Claude 会追加新条目） -->

---

### CHG-20260419-00 · 示例（可删）

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
