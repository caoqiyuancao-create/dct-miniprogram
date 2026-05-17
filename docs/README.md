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
