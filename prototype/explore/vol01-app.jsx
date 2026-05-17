// vol01-app.jsx — 第一期回顾探索 · DesignCanvas 编排

function Vol01App() {
  return (
    <DesignCanvas>
      <DCSection id="vol01-intro" title="DCT · 第一期回顾 · 设计探索"
        subtitle="主题：成人 ADHD 与诊断扩张。文案 100% 来自 .md 长文，照片直接用现场图。4 个方向由稳到放——每张可点右上 ⤢ 进入全屏对比。">
        <DCArtboard id="readme" label="先读我" width={360} height={500}>
          <div style={{
            padding: '32px 26px', height: '100%', boxSizing: 'border-box',
            background: '#fff', fontFamily: '"Noto Sans SC",sans-serif', color: '#3a2412',
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: '#b85c2f', letterSpacing: 3,
            }}>VOL.01 · ADHD · 现场剪报</div>
            <div style={{
              fontFamily: '"Noto Serif SC",serif', fontSize: 21, fontWeight: 900,
              color: '#8c3f1c', marginTop: 8, lineHeight: 1.4,
            }}>这一期回顾要承担的是<br/>「气质展示」和「信任建立」</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.85, marginTop: 14, textWrap: 'pretty' }}>
              不复述 PPT，不做讲座大纲——让第一次进入小程序的人，<strong style={{ color: '#b85c2f' }}>快速感受到 DCT 真的办过有深度也有现场感的活动</strong>。
              <br/><br/>
              视觉延续上一轮选定的「暖」方向：暖纸 + 陶土 + 焦糖 + 余烬橙；
              蓝色仅作签名 / 印章。
            </div>
            <div style={{
              marginTop: 16, padding: 10, background: '#fdf7e8',
              border: '0.5px solid #e7d7b3', fontSize: 11.5, color: '#5a3a1e', lineHeight: 1.65,
            }}>
              <strong style={{ color: '#b85c2f' }}>4 个方向 ·</strong>
              <br/>A 暖客厅长卷（最稳，杂志阅读流）<br/>
              B 拼贴海报（呼应海报本身：剪报字 / 荧光笔 / 拍立得 / 便签）<br/>
              C 胶片相册（图为主，每张拍立得配一段 field note）<br/>
              D 客厅夜谈（深暖夜色 / 灯光感 / 引文驱动 · 最具气质）
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="vol01-directions" title="① 第一期回顾 · 四个方向"
        subtitle="文案、照片、主题完全一致；变化的是叙事姿态。">
        <DCArtboard id="vol01-warm" label="A · 暖客厅长卷（最稳）" width={360} height={1880}>
          <Vol01WarmScroll />
        </DCArtboard>
        <DCArtboard id="vol01-collage" label="B · 拼贴海报（最有 DCT 调性）" width={360} height={2080}>
          <Vol01Collage />
        </DCArtboard>
        <DCArtboard id="vol01-album" label="C · 胶片相册（图为主）" width={360} height={1980}>
          <Vol01Album />
        </DCArtboard>
        <DCArtboard id="vol01-night" label="D · 客厅夜谈（已选定）" width={360} height={2240}>
          <Vol01Night />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Vol01App />);
