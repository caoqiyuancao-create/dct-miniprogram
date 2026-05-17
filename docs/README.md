# DCT 第三期报名 · H5 网页版

和小程序同一套设计、同一个云开发后端（`signups` 集合）。在小程序审核期间用 H5 形式 + 扫码报名。

部署后地址：`https://caoqiyuancao-create.github.io/dct-miniprogram/`

## 首次启用需要做的 3 件事

### 1. 在云开发控制台开启"匿名登录"

- 微信开发者工具 → 左上角云朵图标 → 云开发控制台
- 左侧菜单 → **登录授权**（或"身份验证" / "用户管理"）
- 找到 **匿名登录** → 开启

### 2. 把 GitHub Pages 域名加到"Web 安全域名"白名单

- 云开发控制台 → 左侧 **设置** → **安全配置**（或"安全来源"）
- Web 安全域名 → 添加：`caoqiyuancao-create.github.io`
- 保存

### 3. 开启 GitHub Pages

- 浏览器打开 https://github.com/caoqiyuancao-create/dct-miniprogram/settings/pages
- **Source**：选 `Deploy from a branch`
- **Branch**：`main` / `/docs`
- Save
- 1-2 分钟后站点上线

## 生成二维码

上线后，把下面 URL 生成二维码（推荐 [cli.im](https://cli.im/) / [草料二维码](https://cli.im/)）：

```
https://caoqiyuancao-create.github.io/dct-miniprogram/
```

## 第三期（vol03）新增功能

- 留言墙两题：报名表新增 `wallNickname` + `selfIntro`（≤40 字） + `expectation`（≤120 字）
- 双 consent：吧规 + 上墙（默认勾选，可取消）
- 现场电子留言墙预览（横屏 TV 模拟）：`#/wall` 路由
- 提交字段都标记 `issueId='vol03'`，云函数自动按期次落库
- 自动校验：长度限制 + 留言墙必填 + 吧规必选

## 文件结构

```
docs/
├── index.html       # 五个屏（landing/detail/form/success/wall），靠 hash 路由切换
├── style.css        # 所有样式（从小程序 WXSS 平移 + vw 适配 + v3 新样式 append）
├── app.js           # 路由、表单、CloudBase 调用、留言墙循环
├── config.js        # 云开发环境 ID（公开可见，靠 Web 安全域名限制来源）
└── assets/          # 图片资源（含 poster-vol03.jpg + speaker-vol03-halfbody.jpg）
```

## 数据去哪看

提交后的数据进云开发数据库 `signups` 集合，和小程序同一个集合。

云开发控制台 → 数据库 → `signups` → 看每条记录：

| 字段 | 含义 |
|---|---|
| `channel` | `miniprogram` / `web`（H5 走 web） |
| `issueId` | `vol03`（第三期） |
| `wallNickname` | 留言墙昵称 |
| `selfIntro` | 一句话身份介绍 |
| `expectation` | 想问皮里士多德的问题 |
| `consentWall` | 是否同意上墙（true / false） |
| `consentRules` | 是否同意吧规 |
| `wallDisplay` | 服务端最终判定是否上墙（=`consentWall` && vol03） |

去重规则：按 `phone`（手机号）去重，同一个手机号再提交会覆盖上一次的内容。

## 本地预览

直接双击 `index.html` 打不开（CloudBase 不允许 `file://` 域）。要本地预览要么推到 GitHub Pages，要么本地起 HTTP server：

```bash
cd docs
python -m http.server 8080
# 浏览器打开 http://localhost:8080
# 把 "localhost" 也加到云开发 Web 安全域名白名单才能提交
```

## 现场留言墙

如果当晚活动在咖啡厅 TV 上播放留言墙：

- 用任意浏览器打开 `https://caoqiyuancao-create.github.io/dct-miniprogram/#/wall`
- 横屏（桌面 ≥ 720px 自动切两栏 grid 布局；手机竖屏会变成上下两栏的滚动版）
- 左侧：18 条到场者身份循环（3s 一次）
- 右侧：15 个问题循环（4.2s 一次）
- 当前是 seed 静态数据；下一期会接 `getWallFeed` 云函数实时从 `signups` 拉运营审核过的内容

## CHG-20260517-01 关键改动

- **D1**：`teaserQuestions` 升级为 `{q, a}[]`，4 题各带一句注脚
- **D2**：合并"四问深蓝卡 + 冷思考点卡"为单一深蓝卡：kicker `HE WILL SHARE · 当晚的四个问题` + 单行大标题 `"医美热" 的 "冷思考"` + 副题 + Q+A 列表
- **D3**：删除原下方的 4 张 point 卡（避免与四问重复）
- 加 `pages/wall/` 留言墙预览 + 报名表两题 + 双 consent + 留言墙预告卡

---

# 🖥 现场大屏（咖啡厅 TV 投影）

活动当晚把咖啡厅 TV / 投影仪连到任意浏览器，全屏访问：

```
https://caoqiyuancao-create.github.io/dct-miniprogram/wall-tv.html
```

或者本地预览：`http://127.0.0.1:8766/wall-tv.html`

## 它和 H5 里的 #/wall 有什么区别

| 维度 | `#/wall`（在 H5 里） | `wall-tv.html`（独立投影） |
|---|---|---|
| 用途 | 给报名者预览大屏长什么样 | 活动当晚 TV / 投影专用 |
| 文件 | 在 `index.html` 内的一个 section | 独立 HTML 文件 |
| 布局 | 自适应（手机竖屏堆叠 / 桌面横屏 grid） | 写死 1920×1080（16:9 横版） |
| 导航 | 有"← 返回" | 无（投影上鼠标都隐藏） |
| 字号 | 偏小（嵌在 480px 容器里） | 大字号（适合 5m 外看） |
| 数据 | 实时拉 getWallFeed，15s 轮询 + seed fallback | 实时拉 getWallFeed，15s 轮询 + seed fallback + 错误显示 + 30 分钟自动 reload |
| 全屏 | 浏览器手动 F11 | 按 F 键切换全屏 |
| 刷新 | 浏览器手动 F5 | 按 R 键手动刷新 + 自动 30 分钟 reload |

## 大屏操作快捷键

| 键 | 动作 |
|---|---|
| `F` | 切换全屏 |
| `R` | 立即刷新留言（不等下一次 15s 轮询） |
| `ESC` | 退出全屏 |

## 大屏底部状态指示灯

- **绿色脉冲 + "实时同步中"** = 已连上 getWallFeed 且至少有 3 条真实报名
- **金色脉冲 + "示例预览"** = 后端连通但还没有 ≥3 条真实留言，临时用 seed 数据兜底（保证大屏不空）
- **金色脉冲 + 红色错误浮层** = 连续 3 次调云函数失败，可能是网络或权限问题

---

# 🗄 数据架构 · 与第二期的隔离

**单集合 `signups` + `issueId` 字段过滤**（不创建独立的 `signups_vol03` 集合）。

## 为什么是单集合？

- 历史 13 条第二期数据继续在 `signups` 里躺着（没有 `issueId` 字段）
- 新写入的第三期数据带 `issueId='vol03'`
- 所有读取（getWallFeed / submitSignup 去重 / adminOps 等）都强制 `where issueId='vol03'`
- vol02 老数据**永远不会**被 vol03 的查询带出来——隔离从 query 层就生效

## 如果想物理归档老数据

历史 13 条记录没有 `issueId` 字段。后续如想给它们打 `issueId='vol02'` 标签，在云开发控制台数据库里：

```js
// 在浏览器 console 跑一次性脚本
db.collection('signups').where({ issueId: _.exists(false) }).update({
  data: { issueId: 'vol02' }
})
```

不打也无所谓，反正它们永远不会被 vol03 的查询命中。

---

# ⚙️ 云函数部署（需要手动一次）

仓库里有两个云函数：

| 函数 | 路径 | 说明 |
|---|---|---|
| `submitSignup` | `miniprogram/cloudfunctions/submitSignup/` | **已升级**：支持 v3 字段写入（wallNickname/selfIntro/expectation/consentWall/consentRules/issueId）+ 校验 + 邮件按期切换 |
| `getWallFeed`  | `miniprogram/cloudfunctions/getWallFeed/`  | **🆕 新增**：留言墙数据源 · only vol03 + consentWall ≠ false + wallApproved ≠ false |

## 部署步骤（微信开发者工具）

1. 开发者工具打开 `miniprogram/`
2. 右键 `cloudfunctions/submitSignup` → **上传并部署：云端安装依赖** → 覆盖线上
3. 右键 `cloudfunctions/getWallFeed` → **上传并部署：云端安装依赖** → 首次创建

部署后：
- 小程序 + H5 + 大屏 三端的 wall 页都会自动调到新函数
- 报名表新两题（留言墙昵称 + 一句话身份 + 想问的问题）开始正式落库

## 验证部署成功

云函数 → submitSignup → 测试 → 模板用：
```json
{
  "name": "测试 vol03",
  "wechat": "test",
  "phone": "13800001111",
  "wallNickname": "测试昵称",
  "selfIntro": "一句话身份测试",
  "expectation": "测试问题",
  "consentRules": true,
  "consentWall": true,
  "issueId": "vol03"
}
```

返回 `{ ok: true, action: 'created' }` → 部署成功，数据库会多一条 issueId='vol03' 记录。

云函数 → getWallFeed → 测试 → 模板：`{ "limit": 200 }`。返回应包含 `intros` 和 `questions` 数组（如果你已经测试过 submitSignup，里面会有 1 条）。

---

# 🛡 留言墙运营 · 屏蔽不当内容

默认所有 `consentWall=true` 的留言都自动上墙。如果发现某条不合适，运营在云开发数据库手动屏蔽：

```js
// 在云开发控制台 → 数据库 → signups → 找到那条记录，编辑
{ wallApproved: false }
```

或在浏览器 console：

```js
db.collection('signups').doc('记录ID').update({
  data: { wallApproved: false }
})
```

被标记 `wallApproved: false` 的记录会**立即从大屏消失**（下一次 15s 轮询生效）。

---

# 📋 上线 Checklist

- [ ] 云开发控制台 → **登录授权** → 匿名登录 开启
- [ ] 云开发控制台 → **安全配置** → Web 安全域名 加 `caoqiyuancao-create.github.io`（如果改自定义域名再加上）
- [ ] 微信开发者工具 → 部署 `submitSignup` + `getWallFeed`
- [ ] GitHub Pages → Settings → Pages → `main` 分支 `/docs` 目录
- [ ] 上线后访问主入口验证：`https://caoqiyuancao-create.github.io/dct-miniprogram/`
- [ ] 主入口 `#/` 进 home → 点"本期报名" → 报名表 → 提交 → success
- [ ] 检查云开发数据库 `signups` 集合，确认新记录带 `issueId='vol03'` + 留言墙字段
- [ ] 访问 `wall-tv.html` 验证大屏布局 + 底部状态指示灯切到绿色
- [ ] 二维码：把主入口 URL 用任意工具生成（草料 / cli.im）
