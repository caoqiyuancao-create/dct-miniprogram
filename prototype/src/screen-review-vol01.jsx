// Screen — Vol.01 Review Detail · 客厅夜谈 D 版（最终版）
// 数据驱动：读取 issue.recap 渲染。被 ScreenReviewDetail 在 issue.recap 存在时委托调用。

function Vol01NightDetail({ go, issue }) {
  const r = issue.recap;
  const T = {
    paper:   '#faf1de',
    paperHi: '#fdf7e8',
    cream:   '#fbf6ec',
    terra:   '#b85c2f',
    terraDk: '#8c3f1c',
    ember:   '#d97757',
    amber:   '#e4a049',
    gold:    '#c9a24a',
    ink:     '#3a2412',
    inkSoft: '#5a3a1e',
    muted:   '#8a6a3e',
    rule:    '#e7d7b3',
    paperOnDark: '#faf1de',
    serif: '"Noto Serif SC","STSong",serif',
    sans:  '"Noto Sans SC",-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif',
    mono:  '"JetBrains Mono",ui-monospace,monospace',
  };
  const colorOf = (k) => k === 'amber' ? T.amber : k === 'ember' ? T.ember : T.paperHi;
  const NIGHT = `radial-gradient(120% 50% at 50% 0%, #4a2d18 0%, #2a180a 60%, #1a0e05 100%)`;
  const current = window.DCT_DATA?.getCurrent?.();

  return (
    <div style={{
      background: NIGHT, minHeight: '100%', position: 'relative',
      fontFamily: T.sans, color: T.paperHi,
    }}>
      <WxHeader title={`回顾 · VOL.0${issue.number}`} dark transparent />

      {/* HERO · 全景图（图自带字幕） */}
      <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        <img src={r.leadHero || issue.poster} alt={issue.title} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 90,
          background: 'linear-gradient(180deg, rgba(26,14,5,0.55) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 130,
          background: 'linear-gradient(180deg, transparent 0%, rgba(26,14,5,0.55) 60%, rgba(26,14,5,0.95) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 54, left: 16,
          fontFamily: T.mono, fontSize: 10, color: T.amber, letterSpacing: 3,
        }}>VOL.0{issue.number} · {issue.date}</div>
        {r.attendees && (
          <div style={{
            position: 'absolute', top: 54, right: 16,
            fontFamily: T.mono, fontSize: 9.5, color: T.paperHi, opacity: 0.85, letterSpacing: 2,
          }}>{r.attendees}</div>
        )}
      </div>

      {/* 主标题 */}
      <div style={{ padding: '22px 22px 0' }}>
        <div style={{
          fontFamily: T.serif, fontSize: 28, fontWeight: 900, color: T.paperHi,
          lineHeight: 1.3, letterSpacing: 1, textWrap: 'balance',
        }}>{issue.title}</div>
        {(issue.subtitle || r.sub) && (
          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.paperHi, opacity: 0.78,
            marginTop: 12, lineHeight: 1.7, textWrap: 'pretty',
          }}>
            {issue.subtitle}{issue.subtitle && r.sub ? <br/> : null}{r.sub}
          </div>
        )}
      </div>

      {/* HOOK · 大问题 */}
      {r.hook && (
        <div style={{ padding: '36px 22px 6px' }}>
          <div style={{
            fontFamily: T.mono, fontSize: 9.5, color: T.amber, letterSpacing: 4, marginBottom: 14,
          }}>{r.hook.kicker}</div>
          <div style={{
            fontFamily: T.serif, fontSize: 23, fontWeight: 800, color: T.paperHi,
            lineHeight: 1.6, letterSpacing: 1, textWrap: 'balance',
          }}>
            {r.hook.lines.map((line, i) => (
              <React.Fragment key={i}>
                {line.accent ? (
                  <>
                    {line.text.split(line.accent)[0]}
                    <span style={{ color: colorOf(line.color), fontStyle: 'italic' }}>{line.accent}</span>
                    {line.text.split(line.accent)[1]}
                  </>
                ) : line.text}
                {i < r.hook.lines.length - 1 && <br/>}
              </React.Fragment>
            ))}
          </div>
          <div style={{ width: 50, height: 2, background: T.amber, marginTop: 22, opacity: 0.7 }} />
        </div>
      )}

      {/* 主讲人图 */}
      {r.speakerImg && (
        <div style={{ padding: '24px 22px 6px' }}>
          <div style={{ position: 'relative', border: `1px solid ${T.amber}44`, padding: 4 }}>
            <img src={r.speakerImg} alt="" style={{
              width: '100%', height: 240, objectFit: 'cover', display: 'block', filter: 'brightness(0.92)',
            }} />
            <div style={{
              fontFamily: T.mono, fontSize: 9, color: T.amber, letterSpacing: 2,
              marginTop: 6, paddingLeft: 2,
            }}>↑ 主讲 {issue.speaker?.name} · 一盏台灯 · 两只氛围组</div>
          </div>
        </div>
      )}

      {/* 4 条线索 */}
      {r.threads && r.threads.length > 0 && (
        <div style={{ padding: '26px 22px 0' }}>
          <div style={{
            fontFamily: T.serif, fontSize: 16, fontWeight: 700, color: T.paperHi, lineHeight: 1.6, marginBottom: 4,
          }}>我们没有急着给答案</div>
          {r.threadsIntro && (
            <div style={{
              fontFamily: T.serif, fontStyle: 'italic', fontSize: 12.5, color: T.paperHi, opacity: 0.6,
              marginBottom: 18,
            }}>{r.threadsIntro}</div>
          )}
          {r.threads.map((t, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, padding: '12px 0',
              borderBottom: `0.5px solid ${T.amber}33`,
            }}>
              <div style={{
                fontFamily: T.serif, fontSize: 22, fontWeight: 900, color: T.amber,
                lineHeight: 0.9, width: 24, flexShrink: 0, letterSpacing: -1, paddingTop: 2,
              }}>{(i + 1).toString().padStart(2, '0')}</div>
              <div style={{
                fontSize: 12.5, color: T.paperHi,
                opacity: i === r.threads.length - 1 ? 1 : 0.85,
                fontWeight: i === r.threads.length - 1 ? 600 : 400,
                lineHeight: 1.85, whiteSpace: 'pre-line', textWrap: 'pretty',
              }}>{t}</div>
            </div>
          ))}
        </div>
      )}

      {/* 双图小拼 */}
      {r.sideImgs && r.sideImgs.length > 0 && (
        <div style={{ padding: '22px 22px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {r.sideImgs.map((src, i) => (
            <div key={i} style={{ border: `1px solid ${T.amber}44`, padding: 3 }}>
              <img src={src} alt="" style={{
                width: '100%', height: 100, objectFit: 'cover', display: 'block', filter: 'brightness(0.92)',
              }} />
            </div>
          ))}
          {r.sideCaption && (
            <div style={{
              gridColumn: 'span 2',
              fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.paperHi, opacity: 0.6,
              lineHeight: 1.7, marginTop: 2,
            }}>{r.sideCaption}</div>
          )}
        </div>
      )}

      {/* 大引文 · 金句 */}
      {r.bigQuote && (
        <div style={{ padding: '32px 22px 0' }}>
          <div style={{
            fontFamily: T.serif, fontSize: 80, color: T.amber, opacity: 0.6, lineHeight: 0.3, height: 28,
          }}>"</div>
          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 19, fontWeight: 600, color: T.paperHi,
            lineHeight: 1.8, letterSpacing: 0.5, textWrap: 'balance', marginTop: 8,
          }}>{r.bigQuote}</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginTop: 18,
            paddingTop: 14, borderTop: `0.5px solid ${T.amber}66`,
          }}>
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.amber, letterSpacing: 2, flex: 1 }}>
              VOL.0{issue.number} · 现场回顾
            </div>
            <div style={{
              fontFamily: T.mono, fontSize: 9, color: T.paperHi,
              padding: '3px 9px', border: `0.5px solid ${T.paperHi}55`, borderRadius: 10,
            }}>分享 ↗</div>
          </div>
        </div>
      )}

      {/* 收尾 · 暖纸 */}
      <div style={{
        margin: '36px 0 0',
        background: T.paper, color: T.ink,
        padding: '28px 24px 26px',
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        boxShadow: '0 -8px 24px rgba(0,0,0,0.3)',
      }}>
        <div style={{
          fontFamily: T.mono, fontSize: 9.5, color: T.terra, letterSpacing: 3, marginBottom: 8,
        }}>FROM YOUR HOSTS</div>
        <div style={{
          fontFamily: T.serif, fontSize: 17, fontWeight: 800, color: T.terraDk, lineHeight: 1.55,
          whiteSpace: 'pre-line',
        }}>{r.closing?.title || '欢迎你也来，\n客厅里坐坐 ～'}</div>
        {r.closing?.body && (
          <div style={{ fontSize: 12.5, color: T.inkSoft, lineHeight: 1.85, marginTop: 10, textWrap: 'pretty' }}>
            {r.closing.body}
          </div>
        )}

        {/* 关键词 */}
        {r.keywords && r.keywords.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
            {r.keywords.map((kw, i) => (
              <div key={i} style={{
                fontFamily: T.mono, fontSize: 10, color: T.terra, letterSpacing: 1,
                padding: '4px 9px', background: T.paperHi, border: `0.5px solid ${T.rule}`,
                borderRadius: 10,
              }}>#{kw}</div>
            ))}
          </div>
        )}

        {/* 主 CTA · 报名本期（通用 · 不绑定具体期次） */}
        <div onClick={() => go && go('landing')} style={{
          marginTop: 20,
          background: `linear-gradient(135deg, ${T.ember} 0%, ${T.terra} 60%, ${T.terraDk} 100%)`,
          borderRadius: 14, padding: '18px 20px', position: 'relative', overflow: 'hidden',
          color: T.paperHi, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: `0 6px 18px ${T.terra}55`, cursor: 'pointer',
        }}>
          <div style={{
            position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: 60,
            background: `radial-gradient(circle, ${T.amber}55 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, opacity: 0.85, letterSpacing: 3 }}>
              DCT · 客厅学术沙龙
            </div>
            <div style={{
              fontFamily: T.serif, fontSize: 19, fontWeight: 800, marginTop: 4, letterSpacing: 1,
            }}>报名本期</div>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 22,
            background: T.paperHi, color: T.terraDk,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 700, position: 'relative', flexShrink: 0, marginLeft: 12,
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}>→</div>
        </div>

        {/* 次级 · 返回 */}
        <div onClick={() => go && go('review')} style={{
          marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 14px', border: `0.5px solid ${T.rule}`, borderRadius: 12, cursor: 'pointer',
        }}>
          <div style={{ fontFamily: T.serif, fontSize: 13, fontWeight: 700, color: T.terraDk }}>
            返回往期列表
          </div>
          <div style={{ fontSize: 16, color: T.muted }}>›</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Vol01NightDetail });
