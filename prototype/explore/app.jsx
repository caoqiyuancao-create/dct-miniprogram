// app.jsx — 把 screens.jsx 里的艺术板编排进 DesignCanvas

function App() {
  return (
    <DesignCanvas>
      <DCSection id="intro" title="设计探索 · 关于 DCT & 往期回顾"
        subtitle="按你反馈的优先级排版：「关于」三个方向 → 主创卡占位 → 往期时间轴 → 往期详情 → 金句单图。每张可点击右上 ⤢ 进入全屏对比。">
        <DCArtboard id="readme" label="先读我" width={360} height={460}>
          <div style={{
            padding: '34px 28px', height: '100%', boxSizing: 'border-box',
            background: '#fff', fontFamily: '"Noto Sans SC",sans-serif', color: '#2a3d5c', overflow: 'auto',
          }}>
            <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: '#55709a', letterSpacing: 3 }}>NOTE FROM DESIGN</div>
            <div style={{ fontFamily: '"Noto Serif SC",serif', fontSize: 22, fontWeight: 900, color: '#0f2855', marginTop: 8, lineHeight: 1.35 }}>
              这份探索稿要回答的 3 件事
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.85, marginTop: 14, textWrap: 'pretty' }}>
              <strong style={{ color: '#1a3a78' }}>① 关于 DCT</strong> 的页面定位应该往哪个方向走？
              三个方向：杂志卷首 · 客厅缘起时间轴 · 客厅平面图（空间叙事）。
              <br/><br/>
              <strong style={{ color: '#1a3a78' }}>② 三主创卡</strong> 在真实漫画头像到来之前用哪种占位？
              四种风格：当前基线 · 物件 SVG · 三人剪影 · 渐变字母徽章。
              <br/><br/>
              <strong style={{ color: '#1a3a78' }}>③ 往期回顾</strong> 怎么排版 + 详情怎么沉淀「高质量讨论」？
              三种时间轴 + 三种详情排法 + 三种金句单图分享卡。
            </div>
            <div style={{
              marginTop: 18, padding: 10, background: '#fbf6ec',
              borderRadius: 8, fontSize: 11.5, color: '#6b4c1e', lineHeight: 1.6,
            }}>
              <strong>视觉冒险刻度</strong>：在 token 范围内做几档对比——杂志/时间轴是「守」，平面图、报纸感、金句海报是「放飞」一点。
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="about" title="① 关于 DCT · 整页方向"
        subtitle="三个方向 ≠ 三个排版；它们对应三种叙事姿态。选定一个方向后再做内容调优。">
        <DCArtboard id="about-mag" label="A · 杂志卷首" width={360} height={900}>
          <AboutMagazine />
        </DCArtboard>
        <DCArtboard id="about-timeline" label="B · 客厅缘起时间轴" width={360} height={1000}>
          <AboutTimeline />
        </DCArtboard>
        <DCArtboard id="about-spatial" label="C · 客厅平面图（更放飞）" width={360} height={1020}>
          <AboutSpatial />
        </DCArtboard>
      </DCSection>

      <DCSection id="about-warm" title="①-暖 关于 DCT · 更温暖的方向"
        subtitle="把蓝调让位给暖纸 + 陶土 + 焦糖。蓝色仅作签名／印章使用。家庭学术沙龙的「家」字应该读得出来。">
        <DCArtboard id="about-warm-mag" label="D · 暖纸手札" width={360} height={920}>
          <AboutMagazineWarm />
        </DCArtboard>
        <DCArtboard id="about-warm-fire" label="E · 围炉夜话（最暖）" width={360} height={980}>
          <AboutFireside />
        </DCArtboard>
        <DCArtboard id="about-warm-letter" label="F · 客厅家书（信笺）" width={360} height={960}>
          <AboutLetter />
        </DCArtboard>
        <DCArtboard id="about-warm-cozy" label="G · 客厅织物（拼贴）" width={360} height={1000}>
          <AboutCozy />
        </DCArtboard>
      </DCSection>

      <DCSection id="creator" title="② 三主创卡 · 占位风格对比"
        subtitle="在真实漫画头像补来之前。四种各有性格——基线最稳，物件最有人味，剪影最有「客厅感」，徽章最有品牌资产价值。">
        <DCArtboard id="cc-baseline" label="A · 基线 D/C/T" width={360} height={360}>
          <CreatorBaseline />
        </DCArtboard>
        <DCArtboard id="cc-object" label="B · 客厅物件" width={360} height={360}>
          <CreatorObjectIcon />
        </DCArtboard>
        <DCArtboard id="cc-silhouette" label="C · 三人剪影" width={360} height={360}>
          <CreatorSilhouette />
        </DCArtboard>
        <DCArtboard id="cc-monogram" label="D · 渐变徽章" width={360} height={360}>
          <CreatorMonogram />
        </DCArtboard>
      </DCSection>

      <DCSection id="review-list" title="③ 往期回顾 · 时间轴列表"
        subtitle="你选了「时间轴」布局，这里给三档密度。Classic 平衡 / Numeric 数字优先 / Immersive 大封面沉浸。">
        <DCArtboard id="rl-classic" label="A · 经典时间轴 + 缩略图" width={360} height={680}>
          <ReviewTimelineClassic />
        </DCArtboard>
        <DCArtboard id="rl-numeric" label="B · 大编号 + 极简点" width={360} height={680}>
          <ReviewTimelineNumeric />
        </DCArtboard>
        <DCArtboard id="rl-immersive" label="C · 大封面沉浸" width={360} height={840}>
          <ReviewTimelineImmersive />
        </DCArtboard>
      </DCSection>

      <DCSection id="review-detail" title="④ 往期详情 · 三种沉淀方式"
        subtitle="用 vol.01 内容填充。三档：阅读流（稳）/ 杂志感（中）/ 报纸感（最有性格）。每张金句旁都有「分享 ↗」入口。">
        <DCArtboard id="rd-classic" label="A · 经典阅读流" width={360} height={1480}>
          <ReviewDetailClassic />
        </DCArtboard>
        <DCArtboard id="rd-mag" label="B · 杂志感 · 大引文" width={360} height={1280}>
          <ReviewDetailMagazine />
        </DCArtboard>
        <DCArtboard id="rd-gazette" label="C · 报纸 · DCT Gazette" width={360} height={1400}>
          <ReviewDetailGazette />
        </DCArtboard>
      </DCSection>

      <DCSection id="quote-card" title="⑤ 金句单独成图 · 可分享"
        subtitle="点详情页里金句旁的「↗」生成。Canvas 海报，1:1 朋友圈尺寸。三档：极简 / 客厅蓝 / 海报感。">
        <DCArtboard id="q-minimal" label="A · 极简白底 + 二维码" width={360} height={460}>
          <QuoteMinimal />
        </DCArtboard>
        <DCArtboard id="q-sky" label="B · 客厅蓝 + 光晕" width={360} height={460}>
          <QuoteSky />
        </DCArtboard>
        <DCArtboard id="q-poster" label="C · 玻璃海报 + 当晚照片" width={360} height={460}>
          <QuotePoster />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
