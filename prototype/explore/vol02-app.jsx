// vol02-app.jsx — 第二期回顾探索 · DesignCanvas 编排

function Vol02App() {
  return (
    <DesignCanvas>
      <DCSection id="vol02-intro" title="DCT · 第二期回顾 · 设计探索"
        subtitle="主题：六星之路 · 高晓蓉教授。视觉脱离第一期的陶土暖，走向赛道蓝 + 奖牌金 + 一抹烛光暖。每张可点右上 ⤢ 进入全屏对比。">
        <DCArtboard id="vol02-readme" label="先读我" width={360} height={520}>
          <div style={{
            padding: '32px 26px', height: '100%', boxSizing: 'border-box',
            background: '#f6f8fc',
            fontFamily: '"Noto Sans SC",sans-serif', color: '#0e2647',
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: '#c9a24a', letterSpacing: 3,
            }}>VOL.02 · 六星之路 · 现场剪报</div>
            <div style={{
              fontFamily: '"Noto Serif SC",serif', fontSize: 21, fontWeight: 900,
              color: '#0f2855', marginTop: 8, lineHeight: 1.4,
            }}>第二期回顾要承担的是<br/>「坚持」与「安放自己」</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.85, marginTop: 14, textWrap: 'pretty' }}>
              主讲嘉宾完全不同——这一期是一位<strong style={{ color: '#1a3a78' }}>跑完世界马拉松大满贯</strong>的高校教授。
              所以视觉也彻底换调：<strong style={{ color: '#c9a24a' }}>赛道蓝 / 亚麻纸 / 奖牌金</strong>，
              一抹烛光暖只在客厅段落出现。
              <br/><br/>
              文案来源：<code style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5 }}>uploads/新建 文本文档.txt</code>，
              照片来源：上传的 4 张小红书原图，已自动切分为单图。
            </div>
            <div style={{
              marginTop: 16, padding: 12, background: '#fff',
              border: '0.5px solid #dbe4f1', fontSize: 11.5, color: '#2a3d5c', lineHeight: 1.7,
              borderRadius: 8,
            }}>
              <strong style={{ color: '#1a3a78' }}>3 个方向 ·</strong>
              <br/><strong>A</strong> 跑者笔记（体育杂志，最贴海报）
              <br/><strong>B</strong> 烛光与赛道（白天赛道 / 夜晚客厅，最叙事）
              <br/><strong>C</strong> 一万公里（数字诗 / 极简编辑，最克制）
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="vol02-directions" title="① 第二期回顾 · 三个方向"
        subtitle="主题、文案、照片完全一致；变化的是叙事姿态。">
        <DCArtboard id="vol02-dirA" label="A · 跑者笔记（最贴海报）" width={360} height={2280}>
          <Vol02DirA />
        </DCArtboard>
        <DCArtboard id="vol02-dirB" label="B · 烛光与赛道（已选定 · V3）" width={360} height={3360}>
          <Vol02DirB />
        </DCArtboard>
        <DCArtboard id="vol02-dirC" label="C · 一万公里（最克制）" width={360} height={2240}>
          <Vol02DirC />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Vol02App />);
