// Screen 4 — Event detail + DCT rules
// v3: 数据从 DCT_DATA.getCurrent() 读取；rules 把 "尊重规则" 放第一位 +
//     新增一条本期专属的「留言墙匿名」规则。

function ScreenDetail({ go }) {
  const D = window.DCT_DATA;
  const cur = D.getCurrent();
  const isV3 = cur && cur.id === 'vol03';

  // 当晚流程（v3 时间表与第二期不同：19:00 入场，21:30 结束）
  const flow = isV3 ? [
    ['19:00', '入场 · 自由落座 · 留言墙开始滚动'],
    ['19:15', '开场 & DCT 第三期介绍'],
    ['19:25', `主题沙龙 · ${cur.speaker.name}`],
    ['20:40', '中场 · 甜品时间 · 留言墙再轮一轮'],
    ['21:00', '自由提问 + 主创回应'],
    ['21:25', '总结及下一期预告'],
  ] : [
    ['18:40', '入场 · 自由落座'],
    ['19:00', '开场 & DCT 介绍'],
    ['19:10', `主题沙龙 · ${cur.speaker.name || '主讲人'}`],
    ['21:00', '自由交流'],
    ['21:20', '总结及下一期预告'],
  ];

  // 吧规：尊重规则放第一位 + 新增一条「留言墙匿名」规则
  const baseRules = [
    ['尊重规则',  '上述每一条都不是建议，是底线——这是我们今晚的"共同合约"'],
    ['尊重',     '对观点可以尖锐，对人不可以刻薄'],
    ['保密',     '不传播他人经历与现场内容（除非对方明确同意）'],
    ['不贴标签', '少用「你就是…」，多用「我感觉 / 我理解…」'],
    ['非治疗场合', '非治疗性团体，只讨论，不提供医疗建议与诊断'],
    ['自由发言', '友好氛围，允许沉默，允许争论'],
    ['友好纠错', '欢迎随时友好提问'],
  ];
  // v3 额外加一条留言墙规则
  const wallRule = ['留言墙匿名', '现场 TV 上滚动展示的身份与问题，已做匿名/化名处理；请勿对号入座、勿拍摄他人原文'];
  const rules = isV3 ? [...baseRules, wallRule] : baseRules;

  return (
    <div style={{ background: '#f6f8fc', minHeight: '100%' }}>
      <PosterSky tone="deep" style={{ minHeight: 220 }}>
        <WxHeader title="活动须知" transparent dark />
        <div style={{ padding: '18px 22px 28px' }}>
          <div className="mono" style={{
            fontSize: 11, letterSpacing: 4, color: 'rgba(255,255,255,0.88)', marginBottom: 8,
          }}>DCT · VOL.0{cur.number} · 怎么玩</div>
          <div className="serif" style={{
            fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: 2,
            textShadow: '0 1px 2px rgba(10,30,60,0.3)',
          }}>认真玩，认真想</div>
          {isV3 && (
            <div style={{
              marginTop: 10, fontSize: 12.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6,
            }}>
              本期搬出客厅 · 在「陌生的朋友」咖啡厅 · 与一群"陌生但合得来"的人，一起认真地变美 / 不变美。
            </div>
          )}
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

      {/* event info block — v3 数据驱动 */}
      <div style={{ padding: '22px 22px 0' }}>
        <SectionTitle>时间 · 地点 · 入场</SectionTitle>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '16px 18px',
          border: '0.5px solid #e3e9f3', marginTop: 10,
        }}>
          <DetailRow label="时间" value={cur.dateText} sub={cur.timeDetail} />
          <DetailSep />
          <DetailRow label="地点" value={cur.location} sub={cur.locationNote} />
          <DetailSep />
          <DetailRow label="入场" value={cur.price} sub={cur.priceNote} />
          {isV3 && (
            <>
              <DetailSep />
              <DetailRow label="主讲" value={`${cur.speaker.name} · ${cur.speaker.title || ''}`} sub={`${cur.speaker.bio} · ${cur.speaker.org || ''}`} />
            </>
          )}
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
          border: '0.5px solid #e3e9f3', marginTop: 12, overflow: 'hidden',
        }}>
          {rules.map(([k, v], i) => {
            const isHead = i === 0;          // "尊重规则" - 顶规则
            const isWall = isV3 && i === rules.length - 1; // v3 留言墙规则
            return (
              <div key={i} style={{
                display: 'flex', gap: 14, padding: '14px 18px',
                borderBottom: i === rules.length - 1 ? 'none' : '0.5px solid #eef2f8',
                alignItems: 'flex-start',
                background: isHead
                  ? 'linear-gradient(90deg, rgba(233,185,73,0.10) 0%, rgba(233,185,73,0) 100%)'
                  : isWall
                    ? 'linear-gradient(90deg, rgba(44,92,160,0.07) 0%, rgba(44,92,160,0) 100%)'
                    : 'transparent',
              }}>
                <div className="mono" style={{
                  width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                  background: isHead ? 'linear-gradient(135deg, #e9b949 0%, #c9a24a 100%)' : '#eaf0f9',
                  color: isHead ? '#fff' : '#2c5ca0',
                  fontSize: 11, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isHead ? '0 2px 6px rgba(201,162,74,0.32)' : 'none',
                }}>{isHead ? '★' : i}</div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 600, color: '#0f2855',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    {k}
                    {isHead && (
                      <span className="mono" style={{
                        fontSize: 9, padding: '1px 6px', borderRadius: 3, letterSpacing: 1,
                        background: '#c9a24a', color: '#fff',
                      }}>HEAD</span>
                    )}
                    {isWall && (
                      <span className="mono" style={{
                        fontSize: 9, padding: '1px 6px', borderRadius: 3, letterSpacing: 1,
                        background: 'linear-gradient(135deg, #2c5ca0 0%, #1a3a78 100%)', color: '#fff',
                      }}>VOL.03</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12.5, color: '#55709a', marginTop: 2, lineHeight: 1.6 }}>{v}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* entry criteria */}
      <div style={{ padding: '22px 22px 0' }}>
        <SectionTitle>入场</SectionTitle>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          {(isV3
            ? ['对主题感兴趣', '欢迎为心仪的主讲人打赏', '多学科背景优先', '愿意留下一句话身份 + 一个问题']
            : ['对主题感兴趣', '欢迎为心仪的主讲人打赏', '多学科背景优先']
          ).map(t => (
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
    <div className="mono" style={{
      fontSize: 11, color: '#55709a', letterSpacing: 3, textTransform: 'uppercase',
    }}>{children}</div>
  );
}

function DetailRow({ label, value, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '4px 0' }}>
      <div className="mono" style={{
        fontSize: 11, color: '#8496b3', letterSpacing: 2, width: 34, paddingTop: 3,
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
