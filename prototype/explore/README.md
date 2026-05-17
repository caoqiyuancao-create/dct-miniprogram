# DCT 设计探索沙盒（`prototype/explore/`）

> 这里是设计端**还没定稿**的 design canvas 探索文件。
> 每个主题一个 HTML + 一套独立的 jsx 命名空间，互不污染。
> 选定方向后，组件搬到 `prototype/src/screen-*.jsx`，数据进 `data/issues.js`，图片 copy 到 `prototype/assets/`。

---

## 📂 当前画板

| 文件 | 主题 | 完成度 | 备注 |
|---|---|---|---|
| `DCT关于&往期-探索.html` | 关于 DCT 整页方向（7 个） · 三主创卡（4 个） · 往期时间轴（3 个） · 往期详情（3 个） · 金句卡（3 个） | ✅ 已选定方向（暖纸 + 陶土 + 焦糖） | 关于页用 A/B/C 偏蓝 + D/E/F/G 偏暖 7 个方向并排比较 |
| `DCT第一期回顾-探索.html` | 第一期 ADHD 回顾 4 个方向 | ✅ **已选定 D · 客厅夜谈**，已整合到主程序 | 见 `prototype/src/screen-review-vol01.jsx` |
| `DCT功能优化方向.html` | 早期功能讨论板（pre-v3） | 📦 归档 | 历史参考，可不动 |

## 📂 各画板的 jsx 命名空间

| 画板 | 组件 jsx | 编排 jsx |
|---|---|---|
| 关于 & 往期 | `screens.jsx` | `app.jsx` |
| 第一期回顾 | `vol01-screens.jsx` | `vol01-app.jsx` |

**所有画板共享：** `design-canvas.jsx`（DesignCanvas / DCSection / DCArtboard）

---

## 🚦 新开一期回顾设计时的开场白模板

> 我要做 DCT 第 N 期回顾的页面设计。先去 `prototype/explore/` 看一下我们之前做第一期回顾时用的 `vol01-screens.jsx` 和 `DCT第一期回顾-探索.html`，沿用同样的「客厅夜谈」D 版式（深暖夜色 + 暖纸收尾）。
>
> 第 N 期素材：
> - 主题：...
> - 主讲：...
> - 现场照片（已附件）：...
> - 回顾长文（已附件）：...
>
> 请先在 `prototype/explore/DCT第N期回顾-探索.html` 里搭一版（数据从 `vol01` 的 `recap` 结构 clone），等我确认后再整合到 `prototype/src/`。

---

## 🎯 整合到主程序的清单

每次设计选定后，按这个顺序落地：

1. **`prototype/data/issues.js`** · 在对应期次 entry 上加 `recap` 字段（结构见 vol01）
2. **`prototype/src/screen-review-vol01.jsx`** 已经数据驱动，**不用改组件**，只要数据填好就自动适配
3. **`prototype/assets/`** · 复制 5 张现场照片（hero / speaker / talk / dessert / cocktail 或自定义命名）
4. **`DESIGN-CHANGES.md`** · 追加一条 CHG 单子，按 CHG-20260517-02 的格式来
