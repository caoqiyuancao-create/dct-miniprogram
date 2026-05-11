# DCT 小程序 · 设计端现状恢复包（DESIGN-HANDOFF）

> 这份文档专为 **Claude Design 端**准备：如果你（Design）之前的上下文丢失了，从零接手项目时**先读这一份**，再去看 `prototype/` 源码和 `DESIGN-CHANGES.md`。
>
> 与 `DESIGN-CHANGES.md` 的关系：
> - **DESIGN-HANDOFF.md（本文档）** = 快照式现状描述，写"我现在在哪、有什么"，**接手时读**
> - **DESIGN-CHANGES.md** = 流式变更日志，写"接下来要改什么 / 历史改了什么"，**协作时读**
>
> 创建时间：2026-05-12 · 基线：`prototype-v1` (`067e633`) + 后续 commits 直到 `10b1b21`

---

## 1. 项目一句话定位

**DCT（Doctors' Crazy Thinking）** —— 成都 · 三位精神科 PhD 在客厅办的"非典型学术沙龙"。本小程序是它的报名 + 往期回顾入口，第二期着陆页主推**高晓蓉教授**的专场。

**双轨协作模式：**

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

- 你（Design）维护 `prototype/`（React/JSX 原型）
- Claude Code（CC）维护 `miniprogram/`（小程序 WXML/WXSS/JS）
- 两端之间通过 `DESIGN-CHANGES.md` 的"变更单"协调

---

## 2. 当前 UI 全貌（8 页 + 2 组件）

每一项指向"真源文件"——文案、配色、间距以那个文件为准。

### 主入口

| 页面 | 真源文件 | 它现在长什么样 + 它干嘛用 |
|---|---|---|
| **home** | [prototype/src/screen-home.jsx](prototype/src/screen-home.jsx) | 品牌锁屏（DCT logo + 蓝天 PosterSky 背景）+ 3 个圆形入口：**关于 DCT** / **往期回顾** / **本期着陆**。是用户打开小程序的第一屏 |
| **about** | [prototype/src/screen-about.jsx](prototype/src/screen-about.jsx) | 上半部：6 幕动画（WXML keyframes 占位，**后续将被 Lottie 替换**）。下半部：5 个 section 长图文 — **WHY** (DCT 从何而来) / **WHO** (D·C·T 三主创卡，目前用蓝渐变 + 大字 D/C/T 占位，等真实漫画头像) / **WHAT** (DCT 三层含义) / **HOW** (为什么是"客厅里") / **WHO MAY JOIN** (什么样的人会来) |
| **review** | [prototype/src/screen-review.jsx](prototype/src/screen-review.jsx) (ScreenReview) | 往期列表 —— 按时间倒序排列已完结的 DCT 期次卡片，点击进入详情 |
| **review-detail** | [prototype/src/screen-review.jsx](prototype/src/screen-review.jsx) (ScreenReviewDetail) | 单期回顾详情 —— 当期主讲人、活动主题、照片墙、感言 |

### 报名流（本期）

| 页面 | 真源文件 | 它现在长什么样 + 它干嘛用 |
|---|---|---|
| **landing** | [prototype/src/screen-landing.jsx](prototype/src/screen-landing.jsx) | 本期着陆页（vol.02 高晓蓉专场）。结构从上到下：金色滚动进度条（sticky 顶部） → hero portrait（高老师肖像 240rpx） → 倒计时 chip（"距开场还有 N 天"）→ 报名状态横幅（pending/approved/rejected，仅老用户可见）→ 3 张 points 卡（lanes/footprint/compass 图标）→ 季节限定菜单（"不含正餐" chip）→ 主 CTA → 吸底浮动 CTA（scrollTop > 720rpx 显示） |
| **detail** | [prototype/src/screen-detail.jsx](prototype/src/screen-detail.jsx) | 活动须知 + 吧规 9 条 |
| **form** | [prototype/src/screen-form.jsx](prototype/src/screen-form.jsx) | 报名填表（姓名、联系方式、问题、知情同意） |
| **success** | [prototype/src/screen-success.jsx](prototype/src/screen-success.jsx) | 提交成功 —— 八角星 constellation + 报名步骤进度 + **加入手机日历**按钮 + **生成邀请券**（Canvas 海报） |

### 共用组件

| 组件 | 位置 | 说明 |
|---|---|---|
| **PosterSky** | [prototype/src/poster-bg.jsx](prototype/src/poster-bg.jsx) | 蓝天渐变 + 光芒辐射 + 飘星点的纯 CSS 背景。home / landing / success 都用 |
| **dct-origin-story** | `miniprogram/components/dct-origin-story/`<br>`miniprogram/assets/story-panels/panel-01.jpg ~ 08.jpg` | ⚠️ **仅小程序端独立增强，原型端没有对应**。8 幕、36 秒的 DCT 起源故事动画，IntersectionObserver 滚到可见才播放，提供 replay/pause。**目前只在 landing 页用**，不是 about 页的 fallback |

---

## 3. 当前已实装功能清单（F1–F5）

来自 CHG-20260428-04 实装，已 push 到 GitHub：

| 编号 | 功能 | 实装位置 |
|---|---|---|
| F1 | **报名状态记忆** | landing onLoad 自动按 openid 查 `cloudfunctions/registration` → 横幅显示 pending/approved/rejected → CTA 文案切换为"查看我的报名" |
| F2 | **加入手机日历** | success 页 `wx.addPhoneCalendar`，提前 1 天提醒 |
| F3 | **自定义分享** | landing 页 `onShareAppMessage` + `onShareTimeline`（imageUrl 占位，等 cloud:// 上传） |
| F4 | **生成邀请券** | success 页 Canvas 海报 v1（渐变 + 标题 + 8 角星 + 日期；**二维码 TODO**，等 wxacode.getUnlimited） |
| F5 | **hero 倒计时 chip** | landing hero 区，状态：`距开场还有 N 天` / `今晚见` / `已结束` |

---

## 4. 设计系统状态

### 颜色 token（在 `miniprogram/app.wxss` 定义为 CSS 变量）

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

**扩展 token**（2026-05-12 CHG-20260512-01 新增，覆盖原"孤立色"）：

| Token | 值 | 用途 |
|---|---|---|
| `--text-hint` | `#8496b3` | 表单提示文字 / 标签 |
| `--text-hint-soft` | `#a0acc0` | 输入框 placeholder |
| `--success` | `#3d8b5e` | 成功状态（横幅 / 图标） |
| `--danger` | `#c25450` | 拒绝状态 |
| `--warm-ink-soft` | `#6b5520` | 暖色 notice 文字 |
| `--warm-gold-soft` | `#b8903a` | 暖色辅助金 |
| `--divider-soft` | `#eef2f8` | 极细分割线（field / row 之间） |
| `--chip-border` | `#c9d4e6` | chip / 次级按钮描边 |

### 单位换算

| 原型（px） | 小程序（rpx） | 说明 |
|---|---|---|
| `fontSize: 14` | `font-size: 28rpx` | ×2 |
| `padding: 16` | `padding: 32rpx` | ×2 |
| `borderRadius: 12` | `border-radius: 24rpx` | ×2 |
| `boxShadow: 0 8px 22px` | `0 16rpx 44rpx` | ×2（含 blur） |

> iPhone 14 Pro 宽 390px = 750rpx，所以 1px ≈ 2rpx。

---

## 5. 下一步要做什么

### 🟢 立即可做（不阻塞）

- **CHG-20260428-09 · about 页 AE/Lottie 动画**
  - 在 AE 里制作 6 幕连续卡通动画（对应 about 页"一切从天时地利人和说起 / 一只狗一道菜一次对话 / 在绩效之外 / Doctors' Crazy Thinking / 客厅里的家庭学术沙龙 / 欢迎你也来"6 个 caption）
  - **关键约束**：避免使用 AE expression（小程序端 lottie-miniprogram 不支持）
  - 用 Bodymovin 导出 `.json`，文件名约定 `about-story.json`
  - 同时提供分层 PNG 素材（背景 / 人物 / 气泡 / 文字 / 道具）
  - 详细规格见 [DESIGN-CHANGES.md](DESIGN-CHANGES.md) 第 117–139 行
  - 交付时直接更新 prototype/，CC 端会按 `miniprogram/assets/animations/about-story.json` 路径接入

### 🟡 等本轮 CC 完成后再同步

- 阶段 B（U6 颜色收尾 + token 扩展）会扩 8 个新 token 并清理 53+ 处硬编码色票
- 完成后 prototype 端可以选择性同步颜色定义到 `screen-landing.jsx` 顶部的 `const C = {...}`
- **非阻塞** —— prototype 现在用 px 值就好，不强制同步

### 🔴 阻塞中（等 QY 提供）

- **真实漫画头像**：about 页三主创卡（包文欣/狗子/Dog · 徐佳淇/厨子/Chef · 曹栖源/治疗师/Therapist）目前是 PORTRAIT 占位（蓝渐变 + 大字 D/C/T）。等 QY 给真实漫画头像后，把占位替换为 `<img src="..." />`，CC 端字段 `avatar` 已预留
- **landing 分享卡片**：CHG-20260428-04 F3 中 `onShareAppMessage` 的 `imageUrl` 还是占位 cloud://，等真实分享封面图

---

## 6. 绝对要避免的坑（接手即看）

1. **不要复用历史编号** —— 新建变更单用 `CHG-2026MMDD-NN`，先查 [DESIGN-CHANGES.md](DESIGN-CHANGES.md) "进行中 + 已合并"两个区，避免与 `04-19-00`、`04-28-01~09`、`05-12-01` 等已存在的编号冲突
2. **6 幕动画不要继续优化 keyframes** —— 当前 about.wxml 那 6 个 `.about-scene` 是临时占位，后续会整段被 Lottie 替换。设计精力应该花在 AE 源文件上，不是 WXML
3. **`dct-origin-story` 不要同步到原型** —— 它是小程序专属（用了 IntersectionObserver + WXSS keyframes），原型端无对应也无需对应
4. **CHG-20260428-08 已完成** —— 不要再"重写 about 文案"，它已在 commit `84164b5` 合并。文案以 `prototype/src/screen-about.jsx` 当前内容为权威
5. **改 prototype/ 时不要动 miniprogram/** —— 反过来也一样。两端的同步靠变更单，不靠直接互相覆盖
6. **`prototype/DESIGN-CHANGES.md`** 是只读快照，**不要单独编辑它** —— 编辑根目录的 [DESIGN-CHANGES.md](DESIGN-CHANGES.md)，它才是活的工作文档

---

## 7. 关键文件速查表

| 想找什么 | 去哪里 |
|---|---|
| 当前 UI 全貌、功能现状（**就是这里**） | `DESIGN-HANDOFF.md` |
| 接下来要做什么 / 历史改了什么 | `DESIGN-CHANGES.md` |
| 颜色真值 | `prototype/src/screen-landing.jsx` 顶部 `const C = {...}` |
| 期次数据（vol.01 / vol.02 …） | `prototype/data/issues.js` |
| 单位换算约定 / React→WXML 对照 | `prototype/README.md` |
| 真实图片资产 | `prototype/assets/` |
| 第一期开场 PDF（about 文案权威来源） | `handoff/untitled/project/uploads/DCT_第一期开场介绍(1).pdf` |
