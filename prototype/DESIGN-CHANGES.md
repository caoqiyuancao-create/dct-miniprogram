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

| 原型文件（这里） | 小程序文件（GitHub） | 页面作用 |
|---|---|---|
| `data/issues.js`                     | `miniprogram/data/issues.js`                                 | **期次数据中心**（全局单一数据源） |
| `src/screen-home.jsx`                | `miniprogram/pages/home/home.wxml` + `home.wxss` + `home.js` | 主页（品牌 + 3 入口）**新** |
| `src/screen-about.jsx`               | `miniprogram/pages/about/about.wxml` + `about.wxss` + `about.js` | 关于 DCT（动画 + 长图文）**新** |
| `src/screen-review.jsx` · `ScreenReview`       | `miniprogram/pages/review/review.wxml` + `review.wxss`       | 往期回顾列表 **新** |
| `src/screen-review.jsx` · `ScreenReviewDetail` | `miniprogram/pages/review-detail/review-detail.wxml` + `.wxss` | 单期回顾详情 **新** |
| `src/screen-landing.jsx` | `miniprogram/pages/landing/landing.wxml` + `landing.wxss` | 本期着陆 |
| `src/screen-detail.jsx`  | `miniprogram/pages/detail/detail.wxml` + `detail.wxss`    | 活动须知 & 吧规 |
| `src/screen-form.jsx`    | `miniprogram/pages/form/form.wxml` + `form.wxss`          | 报名填表 |
| `src/screen-success.jsx` | `miniprogram/pages/success/success.wxml` + `success.wxss` | 提交成功 |
| `src/poster-bg.jsx`      | `miniprogram/components/poster-sky/`                      | 蓝天渐变 + 光芒背景 |
| `src/miniprogram-chrome.jsx` | （小程序自带导航栏，不需要实现） | — |

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

### CHG-20260518-06 · OPENING PITCH 段 2/3 文字修剪

**类型**：🎨 纯 UI 改动（文案微调）
**页面**：`pages/landing/landing` OPENING PITCH 区块（v3 分支）
**触发方**：QY 在原型上 inline-edit 删字
**对应原型**：`prototype/src/screen-landing.jsx` 第 300-302 行

**改动**（在 CHG-20260518-05 基础上继续修剪）：

1. **段 2 末尾删句**：删去「每个人的皮肤状态、身体条件与心理预期也都不一样，"能做"与"该做"是两回事。」
   - 段 2 现在收在加粗短句：`...风险边界——它能改变什么，又不能承担什么。`
   - **影响**：Q.02 注脚之前下沉到段 2 的内容被回收。这条 Q.02 注脚不再以正文形式体现——读者要靠现场讲者展开
2. **段 3 删首字**：「但医美也不只是技术」→「医美也不只是技术」
   - 去掉"但"字让段落起始更直接、不再是连接前一段的转折
   - 也合理：上一段已收在加粗短句作 hook，下段独立起更利落

**给 Claude Code 的粘贴说明**：
> 按 prototype/DESIGN-CHANGES.md 的 CHG-20260518-06 修剪 vol03 landing OPENING PITCH 文字：(1) 段 2 末尾去掉关于"能做与该做"的整句；(2) 段 3 开头去掉"但"字。仅文案修剪，结构/加粗 highlight/字号字色全部不动。

---

### CHG-20260518-05 · 四问注脚下沉至 OPENING PITCH 正文

**类型**：🎨 纯 UI 改动（文案重组）
**页面**：`pages/landing/landing` 四问深蓝卡 + OPENING PITCH 区块
**触发方**：QY 在原型 landing 上批注：「把每个小标题下面的补充删掉，把删掉的内容整合进下面板块当中的介绍文字中」
**对应原型**：`prototype/data/issues.js` vol03 `teaserQuestions[]` + `prototype/src/screen-landing.jsx` OPENING PITCH

**改动**：

1. **数据层**（`issues.js` vol03 `teaserQuestions`）：
   - 4 条 `{ q, a }` 的 `a` 字段全部清空为 `''`（保留 schema，方便后续如需再加回）
   - `q` 文案不动

2. **landing 渲染**（`screen-landing.jsx`）：
   - **无 wxml 结构改动**——`{a && <div>{a}</div>}` 已经条件渲染；`a` 为空字符串时整段不渲染、`marginBottom: a ? 8 : 0` 自动收紧到 0
   - 视觉上四问卡变成"四行裸 Q"：`Q.0X 问题` 之间用 0.5px 半透白横线分隔，密度比原来紧凑
   - **OPENING PITCH 段落重写**（v3 分支 only），把 4 条 a 的核心点织入 4 段正文：
     - 段 2 末尾 + 第二行：织入 Q.01 a（医学的作用机制、适应证、风险边界 + 「它能改变什么，又不能承担什么」加粗）+ Q.02 a（「能做」与「该做」是两回事）
     - 段 3 开头：织入 Q.03 a（技术只能改变可量化部分；"变美"感受不是单靠技术的承诺）
     - 段 4 开头：织入 Q.04 a（想变美并不浅薄 / "我想实现的，是谁的想象？"）作为转折钩子
   - 加粗的 highlight 钉子（`color: #0f2855, fontWeight: 500`）有 2 处：「它能改变什么，又不能承担什么」和原有「当我们想要改变自己的脸和身体时，我们真正想改变的是什么？」

**小程序实现要点**：
- **数据**：`miniprogram/data/issues.js` vol03 `teaserQuestions[]` 4 条 `a` 字段同步清空为 `''`
- **WXML**：`landing.wxml` 四问块 `<view class="four-q__a" wx:if="{{item.a}}">` 已有 wx:if，零改动；空字符串自动不渲染
- **WXSS**：`.four-q__row-top` 的 `margin-bottom` 在 `a` 为空时仍占 16rpx——可以视觉验收后再决定是否需要收紧到 0
- **OPENING PITCH 文案**：`landing.wxml` 里 v3 分支的 `<text>` 段落按设计端新版本同步替换（4 个段落，结构 + 加粗 highlight 位置保持原样，只换文字内容）。**注意**全角"双引号"和 `——` 破折号原样保留

**给 Claude Code 的粘贴说明**：
> 按 prototype/DESIGN-CHANGES.md 的 CHG-20260518-05 做两件事：(1) `data/issues.js` vol03 `teaserQuestions[]` 4 条 `a` 清空为 `''`；(2) `landing.wxml` v3 OPENING PITCH 4 段文案按设计端新版本替换（参考 prototype/src/screen-landing.jsx 第 297-305 行）。WXSS 不动，wx:if 已兜底空字符串。

---

### CHG-20260518-04 · vol03 landing 四问改写

**类型**：🎨 纯 UI 改动（文案 / 数据层）
**页面**：`pages/landing/landing` 深蓝四问卡
**触发方**：QY 直接在原型 landing 页给出新的四个问题
**对应原型**：`prototype/data/issues.js` vol03 `teaserQuestions[]`

**改动**（按位置 Q.01 → Q.04）：

| # | 原 Q | 新 Q |
|---|---|---|
| 01 | 医学的界限在哪里？ | **医美的本质，是"医"，还是"美"？** |
| 02 | "美"由谁定义？ | **人人都适合医美吗？** |
| 03 | 当我们想变美时，我们在回应什么？ | **医美一定会让人变美吗？** |
| 04 | 医美改变的是皮肤，还是自我？ | **当我们谈论"变美"时，究竟是在追求什么？** |

**注脚 a 同步重写**：
- **Q.01 a**：保留原 a1（医学技术 / 作用机制 / 适应证与风险边界）—— 与新 Q「医还是美」契合
- **Q.02 a**：**新写** —— `每个人的皮肤状态、身体条件、心理预期都不一样——"能做"与"该做"是两回事。`（原 a2 关于"美的定义被滤镜塑造"已与新 Q 无关）
- **Q.03 a**：**新写** —— `技术能改变的，是脸上可量化的部分；但"变美"的感受，从来不是单靠技术兑现的承诺。`（替换原 a3 的"是谁的想象"——已搬到 Q.04 注脚位）
- **Q.04 a**：复用原 a3（想变美并不浅薄 · 是谁的想象）—— 与新 Q「追求什么」语义重合

**小程序实现要点**：
- 仅 `miniprogram/data/issues.js` 的 `vol03.teaserQuestions[]` 数组里 4 条文案替换，schema 不变（`{ q, a }` 对象数组）
- `landing.js` / `landing.wxml` / `landing.wxss` **零改动**——渲染逻辑、Q.0X 编号、左缩进、深蓝卡光晕全部沿用
- 注意 `"` 全角双引号要原样保留（"医"、"美"、"变美"），别被编辑器误转半角

**给 Claude Code 的粘贴说明**：
> 按 prototype/DESIGN-CHANGES.md 的 CHG-20260518-04 改 `miniprogram/data/issues.js` 里 vol03 `teaserQuestions[]` 的 4 条 `{q, a}` 文案，**只动文案**，不动 schema、不动 landing 页 wxml/wxss/js。

---

### CHG-20260518-03 · 原型文案 backfill（咖啡馆 / 主题饮品打样 / 10-15 人 / expectation 120→250）

**类型**：🎨 纯 UI 改动（追同实现端）
**对应实现端**：根 DESIGN-CHANGES `CHG-20260517-02`（2026-05-17 commit `0740dc3`）
**背景**：实现端在 05-17 已把 4 处文案改掉并部署，但**原型还停留在老文案**。这次按 CHG-20260517-02 在文档末尾给的提示统一 backfill，让设计端和真机一致。

**改动列表**：

1. **`prototype/src/screen-about.jsx` HOW 章节**：删掉「咖啡馆」
   - 原：`我们刻意没有选讲堂、咖啡馆、共享空间——而是客厅`
   - 改：`我们刻意没有选讲堂、共享空间——而是客厅`

2. **`prototype/src/screen-about.jsx` WHO MAY JOIN 章节**：「10–15 人」→「精挑细选」
   - 原：`每期 10–15 人，多学科背景优先`
   - 改：`每期都精挑细选，多学科背景优先`

3. **`prototype/src/screen-landing.jsx` Gia 备注小卡**：删掉副行 + 改单行版式
   - 删除：`更多<b>主题饮品</b>正在打样中 · 敬请期待`
   - 保留：`甜品仍由 Gia 制作 ✦`
   - 同时把 `alignItems: 'flex-start'` 改成 `'center'` —— 主行收紧后单行垂直居中更平衡
   - 内部嵌套 `<div>` 主行/副行两层结构铺平成一层（fontWeight 600 直接挂外层）

4. **`prototype/src/screen-form.jsx` expectation 字数上限**：120 → 250
   - `<TextArea maxLen={120}>` → `<TextArea maxLen={250}>`
   - 注：实现端 server `EXPECTATION_MAX = 250` 已部署到云端 `submitSignup`

**未触碰**：
- `prototype/explore/` 下旧探索稿（screens.jsx · vol01-screens.jsx）保留原文案——属于历史草稿，不进生产
- TextArea 组件 `minHeight = 120` 默认值不动（这是 px 高度，不是字数上限）
- 实现端 expectation textarea 高度未变，250 字时滚动条会出现——是否要把原型这里 minHeight 调大可下一版讨论

---

### CHG-20260518-01 · About 页起源动画用 AE 视频替代 6 幕 CSS 占位

**类型**：🎨 UI 改动 · 资源依赖（新增 ~6 MB 视频）
**页面**：`pages/about/about` + `src/screen-about.jsx`
**对应实现**：根 DESIGN-CHANGES `CHG-20260518-01`（H5 端已落地 docs/index.html）
**设计意图**：原 about 页"起源故事"是用 6 段 CSS keyframes 实现的占位动画（sky / three / seedling / brand / living / invite 六幕配字幕），QY 长期不满意。这次用 AE 渲染的视频 `origin-story.mp4` 直接替代，更接近最终视觉。

#### 设计端改动

**`prototype/src/screen-about.jsx`**：
- 删除 `scene` / `playing` 两个 useState + `useEffect` 计时器 + `scenes` 字幕数组（不再需要切幕调度）
- 删除 6 个 `<AboutScene variant=... />` 调用 + 顶部 dots 切换器 + 底部 caption 字幕区
- 新增一个 `<video>` 元素：`autoPlay muted playsInline loop preload="metadata"` + `webkit-playsinline` / `x5-playsinline`（iOS Safari + 微信 X5 兼容）
- 容器尺寸：`aspectRatio: 16/9` · `maxHeight: 56vh`，深蓝兜底背景
- 右上 `REPLAY` 按钮：`rgba(11,31,58,0.55)` 玻璃毛背景 + 金色 0.7 透明描边 + `backdrop-blur(6px)` · 点击 `video.currentTime = 0; play()`
- `AboutScene` 组件函数体保留作为回滚参考（未被调用，无副作用）

**视频来源**：原型预览直接走 GitHub raw URL（`https://raw.githubusercontent.com/caoqiyuancao-create/dct-miniprogram/main/docs/assets/origin-story.mp4`）—— 文件太大（6 MB）不放入 prototype/assets。小程序端走相对路径 `assets/animations/origin-story.mp4`（实现端自己 mv 过去）。

#### 小程序实现要点

- **视频路径**：把 `docs/assets/origin-story.mp4` 复制到 `miniprogram/assets/origin-story.mp4`（约 6 MB，注意小程序主包限制 2 MB → 必须走**分包**或**云存储** + `<video src="cloud://...">`）。**推荐云存储**：上传到 `cloud://prod/assets/origin-story.mp4` → 用 `wx.cloud.getTempFileURL` 换 https URL → 放进 `<video>` 的 `src`
- **WXML 替换**：删掉 `<view class="about-stage">` 块（6 个 scene + dots + replay 占位），换成：
  ```xml
  <view class="about-video">
    <video id="about-video"
           class="about-video__el"
           src="{{originVideoUrl}}"
           autoplay
           muted
           loop
           controls="{{false}}"
           show-center-play-btn="{{false}}"
           show-play-btn="{{false}}"
           show-fullscreen-btn="{{false}}"
           object-fit="cover"
           enable-progress-gesture="{{false}}"
           bindplay="onVideoPlay" />
    <view class="about-video__replay" bindtap="onVideoReplay">↻ REPLAY</view>
  </view>
  ```
- **WXSS**（rpx ×2）：`.about-video { aspect-ratio: 16/9; max-height: 1120rpx; background: linear-gradient(180deg, #0b1f3a 0%, #1d3a6b 100%); overflow: hidden; }` · `.about-video__el { width: 100%; height: 100%; }` · `.about-video__replay`：胶囊 + 金色描边 + `backdrop-filter: blur(12rpx)`，绝对定位 right: 24rpx, top: 24rpx
- **JS**：`onLoad` 里 `wx.cloud.getTempFileURL({ fileList: ['cloud://prod/assets/origin-story.mp4'] })` 换出 URL → setData。`onVideoReplay` 里用 `wx.createVideoContext('about-video').seek(0); play()`
- **原 6 幕 CSS keyframes 样式**（`.about-stage / .about-scene / .cloud / .role-orb / .field-tile / ...` 约 200rpx 行）：**保留**在 about.wxss 文件末尾，无 WXML 引用，无副作用，便于对照 / 回滚

**视觉验收点**：
- 进入 about 页：起源故事区块自动播放 AE 视频（无声、循环），高度约屏幕 56vh
- 右上金色「↻ REPLAY」按钮：点击后视频从头播放
- 视频加载未完成时显示深蓝渐变占位，不显示空白
- 微信内打开不会被强制全屏

**给 Claude Code 的粘贴说明**：
> 按 prototype/DESIGN-CHANGES.md 的 CHG-20260518-01 把 about 页 6 幕 CSS 占位动画换成视频版。视频先上传到云存储 `cloud://prod/assets/origin-story.mp4`（约 6 MB · 不要放进主包）；WXML 用 `<video autoplay muted loop>` + 金色 REPLAY 按钮；原 6 幕 CSS 样式保留作回滚参考。**视频源文件**：从 H5 已上线的 `docs/assets/origin-story.mp4` 直接拷贝。

---

### CHG-20260517-01 · Landing 页 · 合并「四个问题」与「冷思考」两个区块

**类型**：🎨 纯 UI 改动 + 数据结构小调整（仅 vol03）
**页面**：`pages/landing/landing.wxml` + `landing.wxss` + `miniprogram/data/issues.js`
**设计意图**：原来"四个抛给讲者的问题"和下面的"HE WILL SHARE / '医美热'的'冷思考'"四张点卡内容重合（都是同一组主题）。合并成一个深蓝卡片：四个问题 + 每题下方一句话注脚。原下方那块独立的 points 卡片区在 vol03 里完全移除。vol02 保持原样。

#### D1 · 数据层 · `data/issues.js` 里 vol03 的 `teaserQuestions` 改为对象数组

**原样**（`miniprogram/data/issues.js`）：
```js
teaserQuestions: [
  '医学的界限在哪里？',
  '"美"由谁定义？',
  '当我们想变美时，我们在回应什么？',
  '医美改变的是皮肤，还是自我？',
],
```

**目标**：
```js
teaserQuestions: [
  { q: '医学的界限在哪里？',
    a: '医美是医学技术，也有作用机制、适应证与风险边界——它能改变什么？又不能承担什么？' },
  { q: '"美"由谁定义？',
    a: '滤镜、平台、流量与广告，正在塑造我们对"更好看"的想象——"更美"从来不只是个人选择。' },
  { q: '当我们想变美时，我们在回应什么？',
    a: '想变美并不浅薄。但在改变之前，也许可以先问：我想实现的，是谁的想象？' },
  { q: '医美改变的是皮肤，还是自我？',
    a: '当技术越来越普及，问题不只是"能不能做"——还有适不适合做、做到什么程度。' },
],
```

> **兼容性**：WXML 渲染时用 `{{item.q}}` 和 `{{item.a}}`。vol02 没有 `teaserQuestions` 字段，整段 wx:if 包住即可。

#### D2 · WXML · 改造原"四问"深蓝卡

**位置**：landing 页 hero + speaker 卡之后、opening pitch 之前那张深蓝渐变卡。

**WXML 结构改动**：
```xml
<view class="four-q" wx:if="{{cur.teaserQuestions}}">
  <view class="four-q__inner">
    <!-- 顶部 kicker + 标题 + 副题 -->
    <view class="four-q__kicker">HE WILL SHARE · 当晚的四个问题</view>
    <view class="four-q__title">"医美热" 的 "冷思考"</view>
    <view class="four-q__subtitle">当我们谈论变美时，我们在谈论什么？</view>

    <!-- 四个 Q + A 行 -->
    <view class="four-q__row" wx:for="{{cur.teaserQuestions}}" wx:key="index">
      <view class="four-q__row-top">
        <text class="four-q__no">Q.0{{index + 1}}</text>
        <text class="four-q__q">{{item.q}}</text>
      </view>
      <view class="four-q__a" wx:if="{{item.a}}">{{item.a}}</view>
    </view>
  </view>
</view>
```

**WXSS 关键值**（rpx 已 ×2）：
```css
.four-q {
  margin: 52rpx 44rpx 0;
}
.four-q__inner {
  position: relative; overflow: hidden;
  background: linear-gradient(180deg, #0f2855 0%, #1a3a78 100%);
  border-radius: 36rpx;
  padding: 40rpx 40rpx 44rpx;
}
.four-q__inner::before { /* 右上金色光晕 */
  content: ''; position: absolute; right: -32rpx; top: -32rpx;
  width: 260rpx; height: 260rpx; border-radius: 50%;
  background: radial-gradient(circle, rgba(233,185,73,0.22) 0%, transparent 70%);
  pointer-events: none;
}
.four-q__inner::after { /* 左下金色光晕 */
  content: ''; position: absolute; left: -40rpx; bottom: -56rpx;
  width: 220rpx; height: 220rpx; border-radius: 50%;
  background: radial-gradient(circle, rgba(233,185,73,0.10) 0%, transparent 70%);
  pointer-events: none;
}
.four-q__kicker {
  font-family: var(--mono); font-size: 20rpx; letter-spacing: 6rpx;
  color: #e9b949; margin-bottom: 16rpx;
}
.four-q__title {
  font-family: var(--serif); font-size: 44rpx; font-weight: 700;
  color: #fff; line-height: 1.3; letter-spacing: 2rpx; margin-bottom: 8rpx;
}
.four-q__subtitle {
  font-size: 24rpx; color: rgba(255,255,255,0.6);
  line-height: 1.55; margin-bottom: 32rpx;
}
.four-q__row {
  padding: 28rpx 0 32rpx;
  border-top: 1rpx solid rgba(255,255,255,0.16);
}
.four-q__row-top {
  display: flex; gap: 24rpx; align-items: baseline; margin-bottom: 16rpx;
}
.four-q__no {
  font-family: var(--mono); font-size: 20rpx; letter-spacing: 2rpx;
  color: #e9b949; font-weight: 600; flex-shrink: 0;
}
.four-q__q {
  flex: 1; font-family: var(--serif); font-size: 31rpx; font-weight: 600;
  color: #fff; line-height: 1.4; letter-spacing: 0.6rpx;
}
.four-q__a {
  padding-left: 60rpx;
  font-size: 25rpx; line-height: 1.7;
  color: rgba(241,245,251,0.78); text-wrap: pretty;
}
```

#### D3 · 删除原下方 "HE WILL SHARE · 医美热的冷思考" 四张 point 卡（仅 vol03）

**位置**：landing 页里"opening pitch"之后那段。
**目标**：用 `wx:if="{{cur.id !== 'vol03'}}"` 把整个 `.points-list` 区块（含 kicker + 标题 + 四张 .point-card）包住，vol03 不渲染。vol02 完全保留。

> 注意：`cur.points` 字段 vol03 还保留着（避免破坏数据 schema），只是 vol03 的 landing 不再消费它。如果之后 vol03 完全不需要，再删数据。

#### 视觉验收点

1. 整页 vol03 landing 应该看到：海报 → speaker → 诗化副题 → **唯一一张"医美热的冷思考"深蓝卡（含四问+四注脚）** → opening pitch → 留言墙 → 时间地点 → 菜单 → ...
2. vol02 landing **不能**出现深蓝四问卡，但下方三张 points 卡照常显示。

**粘贴给 Claude Code：**
> 按 DESIGN-CHANGES.md 的 CHG-20260517-01 改 landing 页（D1 数据 + D2 WXML/WXSS + D3 删 vol03 的旧 points 区），只动 UI 和数据结构，别动报名逻辑。改完前后对比下 vol02 不要回归。

---

### CHG-20260428-03 · 功能升级（报名状态记忆 / 日历 / 分享 / 海报 / 倒计时）

**类型**：⚙️ 功能改动（**这条主要走 GitHub**，但相关 UI 元素的视觉规范放这里）
**页面**：`landing` / `success` / `app.json` / `cloudfunctions/`

**目标**：从"一次性表单"升级为"可保留入口、可分享、可纪念"的小程序。

#### F1 · 报名状态记忆（最重要）

- **存储**：`cloudfunctions/registration` + 云数据库 `signups` 表
- **字段**：`{ openid, issueId, name, wechat, phone, school, major, motivation, status, createdAt }`
  - `status: 'pending' | 'approved' | 'rejected'`
- **流程**：landing 页 onLoad 时 `wx.cloud.callFunction({ name: 'registration', data: { action: 'check', issueId: 'vol02' } })`
  - 已报名 → hero 顶部出现状态横幅（见下方 UI 规格），CTA 文案改为"查看我的报名"
  - 未报名 → 现状不变
- **状态横幅 UI 规格**：
  - 高度 88rpx · 背景 `linear-gradient(90deg, #fbf6ec 0%, #f5e8d0 100%)` · 圆角 16rpx
  - 左侧 32rpx 圆点（`pending`=#c9a24a / `approved`=#3d8b5e / `rejected`=#c25450）
  - 文案：`pending`「✓ 报名已收到 · 24 小时内回复」/ `approved`「✓ 报名已通过 · 期待相见」/ `rejected`「× 本期已满 · 期待下期」
  - 位置：插在 hero 之后、opening pitch 之前

#### F2 · 加入日历提醒（success 页）

- 成功页新增按钮"加入手机日历"，调用 `wx.addPhoneCalendar`：
  ```js
  wx.addPhoneCalendar({
    title: 'DCT VOL.02 · 六星之路',
    description: '高晓蓉教授分享 · DCT 客厅',
    location: '武侯区 玉林 DCT 客厅',
    startTime: Date.parse('2026-04-25 19:00:00') / 1000,
    endTime: Date.parse('2026-04-25 22:00:00') / 1000,
    alarm: true, alarmOffset: 86400,  // 提前 1 天
  })
  ```
- 按钮样式：`height: 84rpx · 圆角 42rpx · 1rpx solid #c9a24a · 透明底 · 文字 #6b4c1e`
- 位置：在"返回首页 / 看看本期"上方独立成一行

#### F3 · 自定义分享卡

- `landing.js` 加 `onShareAppMessage` 与 `onShareTimeline`：
  ```js
  onShareAppMessage() {
    return {
      title: 'DCT VOL.02 · 六星之路 — 高晓蓉教授',
      path: '/pages/landing/landing?from=share',
      imageUrl: 'cloud://xxx/share-vol02.jpg',  // 5:4 比例，1080×864
    };
  },
  onShareTimeline() {
    return {
      title: '六星之路 · 高晓蓉教授分享会',
      query: 'from=timeline',
      imageUrl: 'cloud://xxx/share-vol02-square.jpg',  // 1:1 1080×1080
    };
  }
  ```
- **分享图设计**：海报蓝天 + 大字"六星之路" + 高老师跑步剪影 + 右下 DCT logo + 日期。两个比例各做一张，传到云存储。

#### F4 · 报名成功生成"邀请券"图（Canvas 海报）

- success 页新增按钮"生成邀请券"，调用 `wx.createCanvasContext` 绘制：
  - 尺寸：750×1334rpx（保存用）
  - 内容：海报蓝天 SVG → 标题"六星之路" → 用户姓名 → "DCT VOL.02 · 2026.04.25" → 客厅地址（已通过则显示） → 二维码（小程序码 + openid 校验）→ 底部 DCT logo
  - 调用 `wx.canvasToTempFilePath` → `wx.saveImageToPhotosAlbum`
- 按钮放在 F2 加入日历按钮下方，金色描边 + 金色文字。

#### F5 · 倒计时（landing 页 hero）

- Hero 顶部 monospace 行 `DCT · VOL.02 · 2026.04.25` 之后追加倒计时 chip：
  - 文案：`距开场还有 N 天`（N≤0 时显示「今晚见」/ N<−1 时显示「已结束」）
  - 样式：内联 chip · 高 36rpx · 圆角 18rpx · 背景 `rgba(201,162,74,0.15)` · 文字 #c9a24a · 12px monospace
  - 计算放 `data.daysLeft`，`onShow` 时刷新

**粘贴给 Claude Code：**
> 按 DESIGN-CHANGES.md 的 CHG-20260428-03 实现 5 个功能（报名状态记忆 F1 / 加入日历 F2 / 分享卡 F3 / 邀请券海报 F4 / 倒计时 F5）。F1 需要新建云函数 `registration`，其他都是页面层。优先级 F1 > F5 > F2 > F3 > F4。

---

### CHG-20260428-02 · Landing 页 UI 升级（滚动进度 / 吸底 CTA / 图标系统 / 颜色 token）

**类型**：🎨 纯 UI 改动
**页面**：`pages/landing/landing.wxml` + `landing.wxss` + `landing.js`

#### U1 · 顶部金色滚动进度条

**位置**：landing 页顶部 sticky · 高度 3rpx · z-index 100
**WXML**：
```xml
<view class="scroll-progress">
  <view class="scroll-progress__fill" style="width: {{progress}}%"></view>
</view>
```
**WXSS**：
```css
.scroll-progress {
  position: sticky; top: 0; left: 0; right: 0;
  height: 3rpx; z-index: 100; pointer-events: none;
}
.scroll-progress__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold) 0%, var(--gold-hi) 100%);
  box-shadow: 0 0 12rpx var(--gold-hi);
  transition: width 0.05s linear;
}
```
**JS**（`landing.js`）：监听 `onPageScroll(e)`，计算 `progress = (e.scrollTop / (totalHeight - winHeight)) * 100`，setData。

#### U2 · 吸底浮动 CTA（高转化关键）

**触发**：`scrollTop > 720rpx`（约 hero 滚出后）出现，淡入 + 上滑 28ms cubic-bezier(0.22, 1, 0.36, 1)
**WXML**：
```xml
<view class="sticky-cta {{stickyVisible ? 'is-visible' : ''}}" catchtap="goForm">
  <view class="sticky-cta__inner">
    <view class="sticky-cta__info">
      <view class="sticky-cta__kicker">VOL.02 · 04.25</view>
      <view class="sticky-cta__price">
        88 <text class="sticky-cta__unit">元/位</text>
        <text class="sticky-cta__hint">含甜品+酒</text>
      </view>
    </view>
    <view class="sticky-cta__btn">
      <star-bullet size="20" color="#e9b949"/>立即报名
    </view>
  </view>
</view>
```
**WXSS 关键值**：
- 容器 `position: fixed; bottom: 36rpx; left: 32rpx; right: 32rpx; z-index: 80`
- 背景 `rgba(255,255,255,0.88)` + `backdrop-filter: blur(40rpx) saturate(180%)`
- 边框 `0.5rpx solid var(--divider)` · 圆角 60rpx
- 阴影 `0 24rpx 60rpx rgba(15,40,85,0.18)`
- 内边距 `16rpx 16rpx 16rpx 36rpx`
- 按钮高 88rpx · 圆角 44rpx · 渐变 `linear-gradient(180deg, #2c5ca0 0%, #1a3a78 100%)`
- 默认 `opacity: 0; transform: translateY(40rpx); pointer-events: none`
- `.is-visible` → `opacity: 1; transform: translateY(0); pointer-events: auto`

#### U3 · Hero 肖像缩到 240rpx（原 276rpx）

**`landing.wxss`**：
```css
.hero-portrait-wrap { width: 240rpx; }  /* was 276rpx */
```
让标题"六星之路"享受更多呼吸空间，避免在小屏挤压。

#### U4 · 三个 points 卡片增加 SVG 图标

**WXML**（每张卡左侧加图标容器）：
```xml
<view class="point-card">
  <view class="point-icon">
    <!-- 用 wx:if 渲染三种 inline SVG: lanes / footprint / compass -->
  </view>
  <view class="point-body">...</view>
</view>
```
**WXSS**：
```css
.point-icon {
  width: 72rpx; height: 72rpx; border-radius: 20rpx;
  background: rgba(201,162,74,0.10);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
```
**SVG 尺寸**：40rpx · stroke `#c9a24a` · stroke-width 1.5
**三种图标**（直接照原型 `<PointIcon kind="..." />`）：
- `lanes` — 三条横线 + 三个金点（多重身份赛道）
- `footprint` — 两组脚印（坚持的步伐）
- `compass` — 圆 + 内嵌指针（笃定方向）
**编号 `01/02/03`** 从左侧改到标题右侧 baseline，颜色 #c9a24a，font-mono 10rpx。

#### U5 · 季节限定菜单加"不含正餐" chip

替换原最下方斜体小字的"本期不提供正餐..."。
**位置**：菜单标题"初夏季节限定 / Mulberry season..." 之下、菜品列表 `<separator>` 之上
**WXML**：
```xml
<view class="menu-chip">
  <icon-no-meal/>本期不含正餐 · 建议先吃晚饭再来
</view>
```
**WXSS**：
```css
.menu-chip {
  display: inline-flex; align-items: center; gap: 12rpx;
  padding: 12rpx 24rpx; border-radius: 200rpx;
  background: rgba(107,76,30,0.08);
  border: 1rpx solid rgba(107,76,30,0.18);
  font-size: 23rpx; color: var(--warm-ink);
  margin-top: 24rpx;
}
```
菜品列表底部那行斜体改为只保留：「担心甜品负担也可以打包带走。」

#### U6 · 全局颜色 token（重要 · 影响所有页）

**`app.wxss`** 加入 CSS 变量：
```css
page {
  --ink:        #0f2855;
  --navy:       #1a3a78;
  --navy-soft:  #2c5ca0;
  --text:       #2a3d5c;
  --text-soft:  #3d5f94;
  --muted:      #55709a;
  --muted-soft: #6b7a91;
  --divider:    #e3e9f3;
  --bg:         #f6f8fc;
  --card:       #fff;
  --gold:       #c9a24a;
  --gold-hi:    #e9b949;
  --warm-bg:    #fbf6ec;
  --warm-bg-2:  #f5e8d0;
  --warm-ink:   #6b4c1e;
  --warm-text:  #8a6a2e;
}
```
然后**逐步**把页面 WXSS 里硬编码的色值替换为 `var(--xxx)`，建议先改 landing.wxss，验证无视觉差再推到其他页。

#### U7 · 代码层小优化（一并做）

- `points` / `menuItems` 数组放到 `data: {}` 里，不要在 setData 里反复构造
- `<view class="info-row">` 之间的 0.5rpx 分隔线用 `:not(:last-child)::after` 实现，不再额外渲染 `<separator/>` 节点
- `<image>` 全部加 `lazy-load="true"` + `binderror="onImgError"`（统一兜底逻辑）
- `<button>` 加 `aria-label="报名参加第二期"` 等可访问性属性
- DESIGN-CHANGES.md 已合并的 CHG 移到底部 `## ✅ 已合并` 区，避免文档无限增长

**粘贴给 Claude Code：**
> 按 DESIGN-CHANGES.md 的 CHG-20260428-02 改 landing 页 UI（U1-U7 共 7 项），先做 U6（颜色 token），再做 U1/U2/U3/U4/U5/U7。注意：U2 吸底 CTA 在小程序里**用 `position: fixed` 而不是 sticky**（原型用 sticky 是因为 iframe 里 fixed 表现不一致）。

---

### CHG-20260428-01 · About 页文案重构（忠实第一期开场 PDF）

**页面**：`pages/about/about`
**设计意图**：把原本写得偏抽象的 about 页，重写成与第一期开场 PDF 同一套叙事——突出"非典型精神科 PhD 三人组"的身份反差、DCT 的三层含义、客厅作为反讲堂的选择。**漫画 / 真实头像后续会补**，先用 PORTRAIT 占位块。

**改动列表（替换原型 `src/screen-about.jsx`）**：

1. **6 幕动画 caption 改写**：
   - `从一片蓝天开始` → `一切从天时地利人和说起` / sub: `2026 · 一个客厅 · 三个 PhD`
   - `三个人的夜谈` → `一只狗、一道菜、一次对话` / sub: `Dog · Chef · Therapist`
   - `一个问题` → `在绩效之外` / sub: `留一块精神自留地`（视觉换成「方块田 + 金色小芽」）
   - `于是在客厅` → `Doctors' Crazy Thinking` / sub: `认真地胡思乱想`（视觉换成大字品牌锁屏）
   - `星芒亮起` → `客厅里的家庭学术沙龙`（视觉沿用客厅 SVG）
   - `等你来` → `欢迎你也来` / sub: `一起建设这块自留地`

2. **下方长图文 5 个 section**（替换原 3 个）：
   - **WHY · DCT 从何而来** — 强调"非典型精神科 PhD"+ 天时地利人和的展开 + 原引述
   - **WHO · 三位主创 · D · C · T** — **新增 3 张主创卡片**：
     - 包文欣 / 狗子 / Dog —— 重度爱狗人士
     - 徐佳淇 / 厨子 / Chef —— 家宴策划者，每期甜品+酒
     - 曹栖源 / 治疗师 / Therapist —— 倾听肌肉
     - 卡片格式：左 64×64 PORTRAIT 占位（蓝渐变 + 大写字母 D/C/T + monospace `PORTRAIT` 字样）+ 右侧姓名 / 英文 / 角色 / 一句描述
     - 卡片下方一行斜体灰字：`※ 主创真实形象 / 漫画头像将于后续插入此处。`
   - **WHAT · DCT 的三层意思** — **新增 MeaningRow 三行表**：
     - 01 · Dog · Chef · Therapist · 三个人的三种身份
     - 02 · Doctors' Crazy Thinking · 一群医生的胡思乱想
     - 03 · 认真地胡思乱想 · 用科学的态度，聊天马行空的奇思妙想（高亮金色）
   - **HOW · 为什么是「客厅里」** — 客厅 vs 讲堂的反差 + 流程描述
   - **WHO MAY JOIN · 什么样的人会来？** — 两条筛选标准（兴趣真诚 / 友善交流）+ 多学科背景优先

3. **底部 CTA 卡片**：在 `期待和你一起...` 下方新增一行 monospace 字距 1：
   `DCT · EST. 2026 · CHENGDU`

**小程序实现要点**：
- `CreatorCard` 在 WXML 写成可复用 `template`，数据走 `data` 数组
- `MeaningRow` 用 `wx:for`，`highlight` 字段控制高亮样式
- 头像占位的 PORTRAIT 文字将来换成 `<image src="{{item.avatar}}">`，留好字段

**粘贴给 Claude Code：**
> 按 DESIGN-CHANGES.md 的 CHG-20260428-01 重写 about 页文案与结构，主创头像继续用占位（蓝渐变 + 大字 D/C/T），等真实漫画头像补来再换。

---

### CHG-20260419-10 · 🏗 架构升级：小程序从单期报名扩展为多期模板

**影响范围**：整体结构（新增 4 页 · 新增数据层 · 改 app.json tabBar / 首页）
**设计意图**：把小程序从"第二期报名"升级为"DCT 官方小程序"——加入主页（品牌入口）、关于 DCT、往期回顾列表、往期详情。所有期次信息走数据驱动，换期只改一个文件。

#### ① 新增数据层 `miniprogram/data/issues.js`

把原型里的 `data/issues.js` 全量搬过去。结构如下：

```js
// miniprogram/data/issues.js
module.exports = {
  current: 'vol02',             // 当前期号
  brand: {
    slogans: [...],             // 主页轮播的 5 条 slogan
    announcements: [...],       // 公告条（最近活动快讯）
  },
  issues: [                     // 所有期次，倒序
    { id: 'vol03', status: 'upcoming', ... },   // 下一期预告（占位）
    { id: 'vol02', status: 'signup',   ... },   // 当前期（完整信息）
    { id: 'vol01', status: 'finished', ... },   // 已结束（回顾中占位）
  ],
  getCurrent() { /* 返回当前期 */ },
  getPastIssues() { /* 返回 status=finished 的期 */ },
  getById(id) { /* 按 id 查 */ },
};
```

**换期流程**（重点！）：
1. 在 `issues[]` 开头 `unshift` 一条新期次（完整字段）
2. 把上一期的 `status` 从 `'signup'` 改成 `'finished'`（回顾整理好后）
3. 把顶层 `current` 指向新期 id
4. **完**。所有页面自动取新数据，不用改任何 WXML/WXSS。

**字段完整清单**见原型文件（每个字段都有注释）。

---

#### ② 新增 `pages/home` · 主页（App 的起始页）

**修改 `app.json` 的 `pages` 数组**：把 `pages/home/home` 放第一位。

```json
{
  "pages": [
    "pages/home/home",
    "pages/about/about",
    "pages/review/review",
    "pages/review-detail/review-detail",
    "pages/landing/landing",
    "pages/detail/detail",
    "pages/form/form",
    "pages/success/success"
  ]
}
```

**`home.wxml` 布局**（自上而下）：
1. **天空背景区**（340rpx 高，浅蓝渐变 + 径向光芒）
   - 顶部小程序导航栏透明
   - 中央 **264rpx 圆形大 Logo**（白底 + 16rpx 内边距 + 多层阴影 + 4rpx 白环）
   - Logo 下方小字 `DOCTORS' CRAZY THINKING`（字距 12rpx）
   - 大标题 **"认真地胡思乱想"**（宋体 · 68rpx · 字重 900 · 字距 8rpx）
   - **Slogan 轮播**（高 56rpx · 每 3.6s 切换 · 淡入 + 上移 16rpx · 中文两侧带 ⭐️ 金色小星）
   - **公告条**（80rpx 高 · 白底半透明 · 左侧 `OPEN`/`NEWS` 金/蓝标签 · 右侧文字轮播 · 每 4.8s 切换）

2. **3 个入口按钮区**（padding 36rpx）
   - 顶部主按钮 `本期报名`（全宽，渐变蓝 `#1a3a78 → #2c5ca0`，高 ≈130rpx）
     - 右上角径向光晕（金色 70% 透明度）
     - 左上 kicker：`VOL.02 · 报名开放中`
     - 大标题：`本期报名`（宋体 44rpx）
     - 副文：`六星之路 · 我的目标管理与坚持哲学`
     - 底部日期 monospace：`2026 年 4 月 25 日（周六）`
     - 右下小圆箭头
   - 下方两个并排副按钮（`flex: 1`，白底），分别：
     - `关于 DCT` / `创办的故事` · 点击跳 `about`
     - `往期回顾` / `已有 1 期`  · 点击跳 `review`

3. **页脚** `EST.2026 · CHENGDU · IN A LIVING ROOM`（字距 6rpx，灰蓝）

**动画细节**：
- Slogan 与公告的文字切换都是 `opacity 0→1 + translateY 8→0 · 0.6s cubic-bezier(0.22,1,0.36,1)`
- Logo 不动，保持稳定

---

#### ③ 新增 `pages/about` · 关于 DCT（分段动画 + 长图文）

**顶部动画区**（640rpx 高，天蓝渐变背景 + 锥形光芒）：

6 幕 · 每幕 2.4s · 自动播放 · 播完停在第 6 幕 · 顶部有进度圆点（点击可跳幕）· 播完后右上显示 `↻ REPLAY`。

| 幕 | 画面 | 标题 | 副标题 |
|---|---|---|---|
| 1 | 三朵白云漂浮（纯 CSS 圆角矩形） | 从一片蓝天开始 | DCT · 客厅里的一块精神自留地 |
| 2 | 三个圆形头像 🐕 🍳 💬（依次悬浮，`floatY` 关键帧） | 三个人的夜谈 | 狗子 · 厨子 · 治疗师 |
| 3 | 超大「？」（宋体 144rpx 金蓝） | 一个问题 | 学术是否只能在论文里？ |
| 4 | SVG 画的客厅（沙发 + 靠枕 + 壁灯） | 于是在客厅 | 把严肃思考请回生活 |
| 5 | 8 角星形（金色，`starPulse` 关键帧缩放 + 发光） | 星芒亮起 | 一期一会 · 认真地胡思乱想 |
| 6 | 5 颗金色小星 + 大字 "DCT" | 等你来 | 建设这块精神自留地 |

**动画实现方式建议**（小程序里）：
- 用 `setInterval` + `setData({ scene: N })` 控制当前幕
- 每幕用独立 view，`opacity` + `transform: scale` 切换，CSS `transition: all 0.9s cubic-bezier(0.22,1,0.36,1)`
- `floatY` / `starPulse` 关键帧放在 `app.wxss`

**动画下方 · 长图文 3 段**（每段 kicker + 大标题 + 多段正文 + 可选引述）：

1. **WHY · DCT 从何而来** — 2 段正文 + 1 段金色左竖线引述：
   `「天时地利人和，对知识和真诚深入交流的期待。」`

2. **HOW · 为什么在客厅里** — 3 段正文（氛围 / 地点选择 / 流程）

3. **WHAT · DCT 到底是什么** — 1 段宋体大标题 `Doctors' Crazy Thinking` + 一行斜体灰蓝说明 + 2 段正文

**底部**金色米色卡片收尾：
- 大字 `期待和你一起，建设这块精神自留地。`
- 下方两个按钮：`返回首页`（描边）+ `看看本期`（实心蓝）

**图文排版规则**：
- kicker: monospace · 字距 8rpx · `#55709a`
- 大标题: 宋体 · 字重 900 · 44rpx · `#0f2855`
- 正文: 26rpx · `#2a3d5c` · 行高 1.85 · 段间距 24rpx

---

#### ④ 新增 `pages/review` · 往期回顾列表（杂志封面风）

**顶部**：
- kicker `DCT · ARCHIVE`
- 大标题 `一期一会`（宋体 60rpx · 字重 900）
- 副文 `每一期沙龙的主题、主讲人与当日留痕。`

**列表区**：垂直滚动 · 每张卡片 = 一期。`wx:for="{{pastIssues}}"`。

**ReviewCard 结构**（360rpx 高封面 + 下方文字块）：
1. **封面区**（高 360rpx · 圆角 36rpx · overflow hidden）
   - 如果 `issue.poster` 存在 → 用海报图 `image mode="aspectFill"`，88% 不透明度
   - 否则（如第一期）→ 天蓝渐变占位 + 中央白色半透明 8 角星 + 灰字 `封面整理中`
   - 左上白底徽章 `VOL.0X`（monospace，圆角 12rpx）
   - 右上深蓝半透明徽章 `YYYY.MM.DD`（仅当 date 存在时）

2. **文字块**（padding 32rpx 36rpx 36rpx）
   - 主标题（宋体 44rpx · 字重 900）
   - 副标题（灰蓝 25rpx）
   - 间隔 24rpx · `主创 / 姓名`（monospace · 字距 1rpx）
   - 间隔 20rpx · summary（最多 2 行，WebkitLineClamp：2）
   - 间隔 28rpx · 底部 `READ MORE` / `PREVIEW` + 右箭头

**列表底部**：虚线描边卡片「下一期主题酝酿中 · 敬请期待」

**点击跳转**：`wx:tap` → `wx.navigateTo({url: '/pages/review-detail/review-detail?id=' + id })`

---

#### ⑤ 新增 `pages/review-detail` · 单期回顾详情

**顶部 Cover**（480rpx 高）：
- 背景：海报图全屏 `background-size: cover`，没有则天蓝占位 + 大号白色半透明 8 角星
- 底部叠加深蓝渐变 + 白字：kicker `VOL.0X · 日期`、大标题（宋体 56rpx 白色）、副标题

**Speaker 卡**（若有）：白底 14rpx 圆角 · kicker `SPEAKER` · 姓名 + 职称（宋体） + 单位（灰蓝）

**Recap 区**：kicker `RECAP` · 大标题 `当日留痕` · 正文 `issue.summary`（26rpx 行高 1.85）

**Highlights 区**（若有）：kicker `HIGHLIGHTS` · 大标题 `几句金句` · 每条金句 → 金色左竖线引述块（同 about 页样式），底部 `— 作者`

**Photos 区**（占位）：如果 `photos=[]` → 显示虚线卡片「当日照片整理中」；有照片后改成九宫格

**底部**：描边返回按钮 `返回往期列表`

---

#### ⑥ 修改 `app.json` 配置

- 改启动页：`"entryPagePath": "pages/home/home"`
- 可选：配置 `"window.navigationBarTitleText"` 每页独立
- 如果现在用了 tabBar，建议**移除**（这个结构走单入口 + 页面跳转，更干净）

#### ⑦ 修改原本的 `landing` 页入口

原本 landing 是首页，现在用户进来先看 home。landing 改从 home 的"本期报名"按钮进入。**landing 页本身 WXML/WXSS 不用改**。

#### 粘贴给 Claude Code：

> 按 DESIGN-CHANGES.md 的 CHG-20260419-10 改一下。这是一次大改：
> 1. 新增 `miniprogram/data/issues.js`（把原型 `data/issues.js` 照搬，改成 `module.exports`）
> 2. 新增 4 个页面：`pages/home`、`pages/about`、`pages/review`、`pages/review-detail`
> 3. 每个页面的 WXML / WXSS / JS 都按变更单描述实现，视觉细节参考原型 `src/screen-home.jsx`、`screen-about.jsx`、`screen-review.jsx`
> 4. 改 `app.json` 把 `pages/home/home` 放第一位并设为 `entryPagePath`
> 5. 原本 4 页（landing/detail/form/success）不动，只是不再是首页
> 6. 单位继续用 rpx（原型 1px ≈ 2rpx），颜色变量沿用文档顶部的颜色系统

---

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
