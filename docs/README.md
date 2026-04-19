# DCT 第二期报名 · H5 网页版

和小程序同一套设计、同一个云开发后端（`signups` 集合）。用于小程序审核期间或者给非微信用户用。

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

上线后，用任意一个"文本转二维码"工具把下面这个 URL 生成二维码即可：

```
https://caoqiyuancao-create.github.io/dct-miniprogram/
```

推荐：[cli.im](https://cli.im/) / [草料二维码](https://cli.im/) / 或在浏览器用 [qr-server](https://api.qrserver.com/v1/create-qr-code/?data=https%3A//caoqiyuancao-create.github.io/dct-miniprogram/) 一键生成。

## 文件结构

```
docs/
├── index.html       # 四个屏全在一个页面里，靠 hash 路由切换
├── style.css        # 所有样式（从小程序 WXSS 平移 + vw 适配）
├── app.js           # 路由、表单、CloudBase 调用
├── config.js        # 云开发环境 ID（公开可见，靠 Web 安全域名限制来源）
└── assets/          # 与小程序共用的压缩图
```

## 数据去哪看

提交后的数据进云开发数据库 `signups` 集合，和小程序同一个集合。

云开发控制台 → 数据库 → `signups` → 看每条记录的 `channel` 字段：
- `miniprogram` = 从小程序来的
- `web` = 从这个 H5 来的

去重规则：按 `phone`（手机号）去重，同一个手机号再提交会覆盖上一次的内容。

## 本地预览

直接双击 `index.html` 打开可以看到静态 UI，但表单提交会失败（因为 `file://` 域名不在白名单）。要完整测试要么推到 GitHub Pages，要么本地起个 http server：

```bash
cd docs
python -m http.server 8080
# 然后浏览器打开 http://localhost:8080
# 并把 "localhost" 也加到云开发 Web 安全域名白名单
```
