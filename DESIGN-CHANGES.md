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

### CHG-20260518-01 · H5 about 页起源动画用视频替代占位 6 幕 — 2026-05-18

**类型**：🎨 UI 改动 · 资源依赖（新增 ~6 MB 视频资源）
**兑现**：`CHG-20260428-09 · about 页 6 幕动画 — AE/Lottie 后期接入` 长期 TODO

**背景**：原 H5 about 页的"起源故事"动画是用纯 CSS @keyframes 实现的占位版本（6 幕：sky / three / seedling / brand / living / invite），QY 长期不满意视觉效果。今天提供的 `master-direct.mp4`（6.1 MB）是 AE 渲染的视频版，可以直接替换。

**完成内容**：

- **新增资源**：`docs/assets/origin-story.mp4`（6.02 MB MP4 · ISO Media Base v1）
- **`docs/index.html`** about screen：删除整个 `<div class="about-stage">` 块（约 60 行 6 个 scene + dots + replay 占位标签），用单个 `<div class="about-video">` 容器包 `<video>` 标签替代
  - autoplay + muted + playsinline + loop + preload="metadata"
  - webkit-playsinline + x5-playsinline（iOS Safari + 微信 X5 内核兼容）
  - 右上角金色「↻ REPLAY」按钮（id=about-video-replay）
- **`docs/app.js`**：
  - 删除 ABOUT_SCENES 常量 + aboutSceneIdx/aboutPlaying/aboutTimer 状态变量
  - 删除 renderAbout 里的 scene caption/dot/replay 6 幕渲染逻辑
  - 删除 applyAboutSceneClass / startAboutAnim / stopAboutTimer / aboutReplay 函数
  - 新增 startAboutVideo() / stopAboutVideo() · 路由进入/离开 about 时控制
  - showScreen 简化为：`if (name === 'about') { renderAbout(); startAboutVideo(); } else stopAboutVideo();`
  - replay 按钮点击 → `video.currentTime = 0; video.play()`
- **`docs/style.css`**：
  - 新增 `.about-video` 容器（16:9 aspect-ratio · max-height: 56vh · 深蓝背景兜底）
  - `.about-video__el`（object-fit: cover）
  - `.about-video__replay` 金色边胶囊按钮（backdrop-blur）
  - 原 `.about-stage / .about-scene / .cloud / .role-orb / .field-tile / .sprout / .big-brand / .scene-caption / .about-dot / .replay` 等 ~150 行 6 幕 CSS **保留**（无 DOM 引用，无副作用，便于回滚或对照）

**移动端浏览器兼容**：
- iOS Safari：playsinline + muted + autoplay 组合可绕过用户手势要求
- Android Chrome：muted + autoplay 同样
- 微信内置浏览器：x5-playsinline + webkit-playsinline 防止全屏抢焦
- 视频 6.1 MB，preload="metadata" 仅加载头部元数据（约 100 KB），用户进 about 页才开始流式播放

**未触碰**：小程序 about 页（仍是 6 幕 CSS keyframes 占位 · 单独迭代）/ vol03 / vol01 / vol02 / 报名 / 云函数 / 留言墙 / 大屏

---

### CHG-20260517-04 · vol02 candle-track 自定义版式落地（兑现 03 推迟项）— 2026-05-17

**类型**：🎨 纯 UI 改动（不动数据 schema、不动报名 / 云函数 / wall）
**对应原型**：`prototype/src/screen-review-vol02.jsx` Vol02CandleDetail（626 行 React）

**背景**：CHG-20260517-03 上线时 vol02 因为复杂度（626 行 + 8 大段 + 多处分段 highlight 拼接）走的通用版兜底。本次专门兑现，把烛光与赛道 B 版完整翻译到 miniprogram WXML/WXSS + docs H5。

**完成内容**：

1. **补齐 vol02.recap 数据**（miniprogram/data/issues.js + docs PAST_ISSUES）：
   - 在 CHG-03 已有 18 子字段基础上，补全 candleChapter / leadCap+leadBody+leadHighlight / hook 七要素 / threadsKicker / sideCaption / habitsKicker+Title+Sub / peakKicker+peakMeta / majorsKicker+TitleLead+TitleHl+TitleTail+Body+BodyHl / audienceCaption / thanksKicker+Title+Hl+Tail / closingEssay+EssayHl / sheepTitle+Intro+Hl+Tail / signature 共 ~32 个字段
   - 数据完整覆盖设计端 `prototype/data/issues.js` vol02 的全部 recap 子字段

2. **miniprogram/pages/review-detail/** 三件套：
   - `review-detail.js`：加 `candle-track` 分支，预切 6 段动态拼接（cTSection1OutroSplit / cTLeadSplit / cTPeakBodySplit / cTMajorsBodySplit / cTClosingEssay 标记 hasHl/hasStrong）
   - `review-detail.wxml`：candle-track 完整 8 大段 + Hero/Speaker 过渡条/§1 一万公里+城市网格+stats/§2 烛光插页/Lead drop cap/Hook 卡（白底+蓝色硬阴影）/§3 四线索 dashed/双图/§4 大金句深蓝渐变+双光晕/§5 习惯时间轴（金色虚线）/§6 情感高点 speaker 大图 + 生命材料金色 highlight / §7 12 专业 pill grid / 现场全景 / §8 收尾 + 走丢的羊（白底 + 蓝阴影 + 🐑）+ CTA
   - `review-detail.wxss`：~280 行新增 `.candle-track / .ct-*` 样式（蓝/金/烛光三色 token + 六角星 clip-path + drop cap + box-shadow 偏移 + dashed border + linear-gradient highlight）

3. **docs/app.js + docs/style.css** 同步 H5：
   - `renderCandleTrack(issue)` 函数 ~180 行，结构与 WXML 1:1 对应（用 `escapeHtml` + `<br/>` + `<u>` / `<em>` / `<strong>` / `<span>` 翻译 React inline）
   - `style.css` ~210 行新增 .ct-* 样式（px 单位 · 与 H5 480px 宽容器适配）

4. **WXML / React inline 翻译要点**：
   - React 的 `text.split(hl).map(...)` 拼接 → 预处理为 `{ head, hl, tail }` 对象 + WXML wx:if
   - React.Fragment + `<br/>` → `<text class="ct-br"></text>`（display:block; height:0）
   - inline `style={{ ... }}` → 全部抽到 WXSS class
   - SVG sheep icon → 🐑 emoji（小程序原生支持，不用 SVG 也能传达"走丢的羊"意象）
   - SVG SixStars 组件 → 6 个 div + clip-path 六角星

**视觉验收点**：
- 进入 vol02 详情：看到完整 8 大段，**HERO 大金标签 + 6 颗深棕星** + 「白天她在跑道上 / 夜晚她在客厅里」（跑道金 / 客厅烛橙），不是通用版的小卡片
- §1 一万公里：6 城市网格（每个城下面 0X 编号）+ 两个 stats 大数字
- §2 烛光插页：全宽蛋糕烛光照 + "如何安放自己"金色斜体
- Drop cap 「那」字 60px 焦糖色
- Hook 卡：白底 + 蓝色硬阴影 + 蓝标签 + "六大满贯"金色 + "如何安放自己"焦糖下划线
- 习惯时间轴：金色虚线 + 圆点（第一条实心）
- 走丢的羊大字卡：白底 + 蓝阴影 + 🐑 angle 装饰 + 金色高亮

**未触碰**：vol01 night-talk / vol03 / 报名 / 云函数 / 留言墙 / wall-tv.html / about / form / success / detail / landing

---

### CHG-20260517-03 · 往期回顾详情页变体 + 主创改名 + vol01/vol02 recap 数据 — 2026-05-17

**类型**：⚙️ 功能改动 + 🎨 UI 改动（变体调度新机制）
**对应原型**：设计端 handoff `nxDObHID5dI6uRqEssSFeA`（含 5 个 chat transcript 演化）
**对应工作流**：设计端 chat 2 (vol01 客厅夜谈) + chat 5 (vol02 烛光与赛道)

**完成内容**：

1. **prototype/ 整包同步**：sync handoff prototype 到 repo
   - 新增 `prototype/src/screen-review-vol01.jsx`（客厅夜谈 D 版 · 280 行）
   - 新增 `prototype/src/screen-review-vol02.jsx`（烛光与赛道 B 版 · 626 行）
   - 更新 `screen-review.jsx`：按 `issue.recap.variant` 派发
   - 更新 `screen-about.jsx`：主创改名
   - 更新 `app.jsx`：phone canvas 加 vol01 + vol02 review 入口
   - 更新 `data/issues.js`：vol01 + vol02 entries 加 `recap` 结构化字段

2. **新增 12 张资源**到 `prototype/assets/` + `miniprogram/assets/` + `docs/assets/`：
   - vol01-*.jpg × 5（hero, speaker-dogs, talk, dessert, cocktail）
   - vol02-*.jpg × 7（poster, cover, speaker, audience, cake-candle, cake-slice, bowl）

3. **主创改名**（4 处）：
   - 包文欣 → **包包大人**
   - 徐佳淇 → **Gia**
   - 曹栖源 → **曹叔**
   - `DOG` → `"Dog"`（D 卡专属，加引号小写）
   - 文件：`miniprogram/pages/about/about.js` · `docs/app.js` (`ABOUT_CREATORS`)

4. **vol01/vol02 完整 recap 数据**落到生产：
   - `miniprogram/data/issues.js`：vol02 entry 重写（含 `recap.variant='candle-track'` + heroImg/sixCities/stats/threads/habits/peakQuote/majors 等 18 个子字段）；vol01 entry 重写（title 从「回顾整理中」→「我们在客厅里聊了成人 ADHD」+ `recap.variant='night-talk'` + hook/threads/bigQuote/closing/keywords + 5 张 photos + 真实 speaker 曹叔）
   - `docs/app.js`：`PAST_ISSUES` 镜像同步

5. **review-detail 详情页改成 variant 调度**：
   - **miniprogram/pages/review-detail/{js,wxml,wxss}**：按 `issue.recap.variant` 派发
     - `night-talk` → 客厅夜谈 D 版（暗色长卷 + 暖纸收尾 · 完整 hero/title/hook/speaker-img/threads/side-imgs/big-quote/closing 7 段）
     - `candle-track` → 暂用通用版兜底（自定义版式留下一个 PR · 见下方）
     - 默认 → 通用版（含 photos 网格新增）
   - **docs/app.js + docs/style.css**：H5 端同样实现 `renderNightTalk(issue)` + 510 行 night-* WXSS class

**vol02 candle-track 自定义版式（不在本次范围）**：
- 设计端 `prototype/src/screen-review-vol02.jsx` 是 626 行 React，含 7 大段（HERO badge + 两个世界对比 + sixCities + 4 stats + 4 threads + 6 habits + peak quote + 12 majors + 走丢的羊 closing）
- 完整翻译到 WXML/WXSS + 同步到 docs/H5 预估 ~3 小时工作
- **目前的 fallback**：vol02 走通用版渲染（cover + speaker + summary + highlights 金句 + photos 网格 5 张），数据完整呈现，只是视觉不是设计端的 candle-track 自定义版式
- **下一个 PR 推迟实现**：等 vol03 上线稳定后单独迭代

**视觉验收点**：
- vol01 进入详情页：暗色长卷 + 全景照 + 4 条线索（amber 编号）+ 大引文（金色引号 + 81rpx 衬线斜体）+ 暖纸收尾 + 终幕 CTA「报名本期」
- vol02 进入详情页：cover.jpg 全图 + 高晓蓉 + summary + 2 条金句卡 + 5 张照片网格
- review 列表：vol02 cover 是新的 vol02-cover.jpg（不再是 gao-portrait）；vol01 cover 是 vol01-hero.jpg（不再是空占位）
- about 主创卡：包包大人 / Gia / 曹叔 / `"Dog"`（D 卡）

**未触碰**：报名 / 云函数 / 留言墙 / 大屏 wall-tv.html / vol03 任何内容。

---

### CHG-20260517-02 · 第三期文案微调（4 处）— 2026-05-17 · `0740dc3`

**类型**：🎨 纯 UI 改动 + 1 处配置常量（vol03 报名表 expectation 字段上限）
**触发方**：用户在真机预览后给出反馈
**对应原型**：仅文案级，未触发新 prototype tag

**完成内容**：

1. **about 页 HOW 章节**：删掉「咖啡馆」
   - 原：`我们刻意没有选讲堂、咖啡馆、共享空间——而是客厅`
   - 改：`我们刻意没有选讲堂、共享空间——而是客厅`
   - 原因：第三期本来就在咖啡厅办，留着「咖啡馆」逻辑不一致
   - 文件：`docs/index.html` · `miniprogram/pages/about/about.wxml`

2. **landing 页 Gia 备注小卡**：删掉副行
   - 删除：`更多<b>主题饮品</b>正在打样中 · 敬请期待`
   - 保留：`甜品仍由 Gia 制作 ✦`（主行）
   - 原因：本期饮品已确定（陌生的朋友联名菜单 6 条），无需再说"打样中"
   - 文件：`docs/index.html` · `miniprogram/pages/landing/landing.wxml`

3. **报名表「想问皮里士多德什么」字数上限**：120 → **250**
   - 涉及：前端 maxlength + 字数计数 + 服务端校验三处同步
   - 文件：
     - `docs/app.js`：`EXPECTATION_MAX = 250`
     - `docs/index.html`：`maxlength="250"` + char-count 显示 `0 / 250`
     - `miniprogram/pages/form/form.js`：`EXPECTATION_MAX = 250`
     - `miniprogram/cloudfunctions/submitSignup/index.js`：服务端 `EXPECTATION_MAX = 250`
   - **已重新部署 submitSignup 到云端**（ModTime: 2026-05-17 21:43:01）

4. **about 页「什么样的人会来」**：「每期 10–15 人」→「每期都精挑细选」
   - 原：`每期 10–15 人，多学科背景优先，尽量不要让客厅变成同一个领域的回音室`
   - 改：`每期都精挑细选，多学科背景优先，尽量不要让客厅变成同一个领域的回音室`
   - 原因：用户希望强调「小数目高质量」精神，不要被具体人数框死
   - 文件：`docs/index.html` · `miniprogram/pages/about/about.wxml`

**给设计端的提示**：
- 如果设计端 prototype 里还有这些老文案（`咖啡馆` / `主题饮品打样` / `10-15 人`），下一版同步时记得同步修
- expectation 字数上限的 UI（textarea 高度）目前没改，250 字可能要稍微更大的输入框，下次设计可考虑

---

### CHG-20260517-01-D · landing 合并「四问」与「冷思考」 — 2026-05-17

**类型**：🎨 纯 UI 改动 + 数据结构小调整（仅 vol03）
**对应原型**：`prototype-v3` handoff zip · prototype/DESIGN-CHANGES.md 内 CHG-20260517-01 的 D1/D2/D3

**背景**：原"四个抛给讲者的问题"和下方"HE WILL SHARE / '医美热'的'冷思考'"四张点卡内容重合——同一组主题在 vol03 landing 上出现两次。合并成一个深蓝卡片：四个 Q + 每题一句话注脚；下方 points 区在 vol03 完全移除。vol02 保持原样。

**完成内容**：

- **D1**：`miniprogram/data/issues.js` vol03 `teaserQuestions` 从 `string[]` 升级为 `{ q, a }[]`，4 条问题各带一句注脚（注脚内容来自原 points 卡 body）
- **D1.5**：`landing.js` 预处理 teaserQuestions 兼容两种 schema（string 与 `{q,a}`），输出 `{ num, q, a }`
- **D2**：`landing.wxml` 重写 `.four-q` 块：
  - kicker `FOUR QUESTIONS · 当晚我们会聊` → `HE WILL SHARE · 当晚的四个问题`
  - 大字 `当我们谈论变美时，我们在谈论什么？`（两行）→ 单行 `"医美热" 的 "冷思考"`
  - 原大字降级为副题 `当我们谈论变美时，我们在谈论什么？`
  - 每行结构改为 `[Q.0X + 问题] + 答案段`（左缩进 60rpx），与原型一致
- **D2-CSS**：`landing.wxss` `.four-q` 加双侧光晕（右上 260rpx · 0.22 + 左下 220rpx · 0.10）；padding 调整为 `40rpx 40rpx 44rpx`；新增 `.four-q__subtitle / __row-top / __no / __q / __a` 类
- **D3**：`landing.wxml` 把整段 `HE WILL SHARE` 四张 point 卡区块用 `wx:if="{{!isV3}}"` 包住——vol03 不再渲染，vol02 完整保留（含 lanes / footprint / compass 三个图标）

**vol02 回归验证**：
- 切到 `current: 'vol02'` 时：`isV3=false`、`teaserQuestions=[]`，四问深蓝卡 hidden；下方 HE WILL SHARE 三张 point 卡 + 「从真实经历出发，三个侧面」标题正常渲染；opening pitch 落到 v2 文案；其余 hero-subtitle / 留言墙 / Gia 备注 / WHAT IS DCT 文案均按 `!isV3` 走 v2 分支。无回归。

**文件**：`miniprogram/data/issues.js` / `miniprogram/pages/landing/landing.{js,wxml,wxss}`
**未改动**：报名 / 登记 / 云函数 / form / success / detail / wall 全部不动。

---

### CHG-20260517-01 · 第三期 vol03 上线 — 2026-05-17

**类型**：⚙️ 功能改动 + 🎨 UI 改动（混合 · 走 GitHub）
**对应原型 tag**：`prototype-v3`

**完成内容**：

- **data**：`current: 'vol02' → 'vol03'`；vol02 改 `status: 'finished'` + 补 summary/highlights；新增 vol03 完整对象（teaserQuestions×4、points×4 含 `\n\n`、menu×6、menuFootnote、皮里士多德半身像）。`brand.announcements` 整段替换为 v3 文案
- **assets**：复制设计端 `poster-vol03.jpg` + `speaker-vol03-halfbody.jpg` 到 `miniprogram/assets/`
- **landing**：整页重写
  - V3PosterHero（海报本身作 hero，1086:1448 全宽 + 底部 fade + 海报说明）
  - 删掉旧 hero 头像 + dct-origin-story（不再使用）
  - SpeakerHero（深蓝渐变卡 + 半身像 + 左缘 mask + 金条引言）
  - 副标诗化两行 + 金星 bullet
  - Four Questions 深蓝卡 + 金色 `Q.0X` 编号
  - OPENING PITCH：4 段 strong 文案（v3 专属）
  - HE WILL SHARE：4 个 point 卡，`bodyParas` 渲染成两段；新增 syringe/skinheart/tangle/self 4 个 CSS 图标
  - 留言墙预告卡（跳 `pages/wall`，带 NEW 角标）
  - 联名菜单 + Gia 备注小卡（虚线 dashed + 金圆 G 徽章）
  - WHAT IS DCT v3 文案（"本期我们走出客厅……"）
  - CTA 文字按期号自动生成"报名参加第三期"；sticky CTA `VOL.03 · 05.23`
  - `landing.js` 完全数据驱动 `getCurrent()`，`onShareAppMessage` 文案 v3
- **form**：vol03 专属新增 wallNickname / selfIntro (≤40) / expectation (≤120) + 双 consent（吧规 + 上墙）+ 字数计数 + 匿名 callout + 金色 WALL 角标；老期沿用 `why`
- **success**：留言墙预告卡（深蓝渐变 + 金边胶囊按钮 → wall）；timeline 文案 / Canvas 邀请券 / addPhoneCalendar 常量全数据驱动 v3
- **detail**：完全 `getCurrent()` 数据驱动；流程时间表 v3 六条（19:00 入场 → 21:25 总结）；吧规重排——"尊重规则"放第一位带金色 ★ HEAD 徽章 + highlight；末尾"留言墙匿名"带 VOL.03 标签 + 蓝渐变 highlight；入场 chips 加一条"愿意留下一句话身份 + 一个问题"
- **review**：vol02 自动出现在列表（finished 化）；现有 ReviewCard 已有 poster 空占位兜底
- **🆕 pages/wall**：横屏 16:9 TV 留言墙；左：今晚谁来到了 DCT（18 条 seed）；右：大家想问皮里士多德什么（15 条 seed）；时钟 + 大字水印「冷思考」+ LIVE 脉冲 + 金色装饰星。MVP 用 seed，留 `getWallFeed` 云函数 TODO。`wall.json` 配 `pageOrientation: landscape` + `disableScroll`；app.json `pages` 注册新路由 + `resizable: true`
- **cloudfunctions/submitSignup**：入库新字段（wallNickname/selfIntro/expectation/consentWall/consentRules/issueId/wallDisplay）；服务端校验 selfIntro≤40 / expectation≤120 / consentRules；邮件 from header / 正文按 issueId 切换"DCT 第三期报名"，邮件正文带留言墙两题内容供运营审核
- **prototype/**：整包替换为设计端 v3（DCT第三期报名.html + src/screen-wall.jsx + 新 assets/poster-vol03.jpg + speaker-vol03-halfbody.jpg），保留 `DCT第二期报名.html` 作历史

**文件**：
- 新建：`miniprogram/pages/wall/{js,wxml,wxss,json}`、`miniprogram/assets/poster-vol03.jpg`、`miniprogram/assets/speaker-vol03-halfbody.jpg`
- 修改：`miniprogram/data/issues.js`、`miniprogram/app.json`、`miniprogram/pages/{landing,form,success,detail}/*`、`miniprogram/cloudfunctions/submitSignup/index.js`
- 替换：`prototype/**`（整包覆盖）

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
