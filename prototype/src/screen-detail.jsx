// Screen 4 — Event detail + DCT rules
function ScreenDetail({ go }) {
  const flow = [
    ['18:40', '入场 · 自由落座'],
    ['19:00', '开场 & DCT 介绍'],
    ['19:10', '主题沙龙 · 高晓蓉教授'],
    ['21:00', '自由交流'],
    ['21:20', '总结及下一期预告'],
  ];
  const rules = [
    ['保密',     '不传播他人经历与现场内容（除非对方明确同意）'],
    ['尊重',     '对观点可以尖锐，对人不可以刻薄'],
    ['不贴标签', '少用「你就是…」，多用「我感觉 / 我理解…」'],
    ['非治疗场合', '非治疗性团体，只讨论，不提供医疗建议与诊断'],
    ['自由发言', '友好氛围，允许沉默，允许争论'],
    ['友好纠错', '欢迎随时友好提问'],
  ];

  return (
    <div style={{ background: '#f6f8fc', minHeight: '100%' }}>
      <PosterSky tone="deep" style={{ minHeight: 220 }}>
        <WxHeader title="活动须知" transparent dark />
        <div style={{ padding: '18px 22px 28px' }}>
          <div style={{
            fontSize: 11, letterSpacing: 4, color: 'rgba(255,255,255,0.88)',
            fontFamily: '"JetBrains Mono", monospace', marginBottom: 8,
          }}>DCT · 怎么玩</div>
          <div className="serif" style={{
            fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: 2,
            textShadow: '0 1px 2px rgba(10,30,60,0.3)',
          }}>认真玩，认真想</div>
        </div>
      </PosterSky>

      {/* flow */}
      <div style={{ padding: '22px 22px 0' }}>
        <SectionTitle>活动流程 · 120 – 150 分钟</SectionTitle>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '8px 0',
          border: '0.5px solid #e3e9f3', marginTop: 10,
        }}>
          {flow.map(([t, l], i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, padding: '12px 18px',
              borderBottom: i === flow.length - 1 ? 'none' : '0.5px solid #eef2f8',
              alignItems: 'center',
            }}>
              <div className="mono" style={{
                fontSize: 13, fontWeight: 500, color: '#2c5ca0',
                width: 46, flexShrink: 0,
              }}>{t}</div>
              <div style={{ fontSize: 14, color: '#0f2855' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* event info block */}
      <div style={{ padding: '22px 22px 0' }}>
        <SectionTitle>时间 · 地点 · 入场</SectionTitle>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '16px 18px',
          border: '0.5px solid #e3e9f3', marginTop: 10,
        }}>
          <DetailRow label="时间" value="2026 年 4 月 25 日（周六）" sub="18:40 入场 · 19:00 开始" />
          <DetailSep />
          <DetailRow label="地点" value="武侯区 玉林 DCT 客厅" sub="报名通过后微信通知具体地址" />
          <DetailSep />
          <DetailRow label="入场" value="88 元 / 位" sub="含一份甜品 + 一杯酒 · 可打包带走" />
        </div>
      </div>

      {/* bar rules */}
      <div style={{ padding: '22px 22px 0' }}>
        <SectionTitle>DCT · 吧规</SectionTitle>
        <div style={{ fontSize: 12.5, color: '#3d5f94', marginTop: 6, fontStyle: 'italic' }}>
          我们认真玩，所以我们也认真设边界。
        </div>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '4px 0',
          border: '0.5px solid #e3e9f3', marginTop: 12,
        }}>
          {rules.map(([k, v], i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, padding: '14px 18px',
              borderBottom: i === rules.length - 1 ? 'none' : '0.5px solid #eef2f8',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                background: '#eaf0f9', color: '#2c5ca0',
                fontSize: 11, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"JetBrains Mono", monospace',
              }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0f2855' }}>{k}</div>
                <div style={{ fontSize: 12.5, color: '#55709a', marginTop: 2, lineHeight: 1.6 }}>{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* entry criteria */}
      <div style={{ padding: '22px 22px 0' }}>
        <SectionTitle>入场</SectionTitle>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          {['对主题感兴趣', '欢迎为心仪的主讲人打赏', '多学科背景优先'].map(t => (
            <div key={t} style={{
              padding: '8px 14px', borderRadius: 16, fontSize: 13,
              background: '#fff', color: '#2c5ca0',
              border: '0.5px solid #c9d4e6',
            }}>{t}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 18px 60px' }}>
        <button
          onClick={() => go('form')}
          style={{
            width: '100%', height: 50, borderRadius: 25,
            background: 'linear-gradient(180deg, #2c5ca0 0%, #1a3a78 100%)',
            color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, letterSpacing: 3,
            fontFamily: '"Noto Sans SC", system-ui',
            boxShadow: '0 8px 22px rgba(26,58,120,0.3)',
          }}>
          我已读完 · 去报名
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: 11, color: '#55709a', letterSpacing: 3,
      fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase',
    }}>{children}</div>
  );
}

function DetailRow({ label, value, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '4px 0' }}>
      <div style={{
        fontSize: 11, color: '#8496b3', letterSpacing: 2,
        fontFamily: '"JetBrains Mono", monospace', width: 34, paddingTop: 3,
      }}>{label}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14.5, color: '#0f2855', fontWeight: 500 }}>{value}</div>
        {sub && <div style={{ fontSize: 11.5, color: '#6b7a91', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function DetailSep() { return <div style={{ height: 0.5, background: '#e9eef6', margin: '10px 0' }} />; }

Object.assign(window, { ScreenDetail });
