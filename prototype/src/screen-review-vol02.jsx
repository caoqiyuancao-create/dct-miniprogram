// Screen — Vol.02 Review Detail · 烛光与赛道 B 版（最终版）
// 数据驱动：读取 issue.recap 渲染。被 ScreenReviewDetail 在 issue.recap?.variant === 'candle-track' 时委托调用。

function Vol02CandleDetail({ go, issue }) {
  const r = issue.recap;
  const T = {
    // 蓝 · 海报赛道
    sky:      '#dbe9f6',
    skyHi:    '#eaf3fb',
    skyDeep:  '#9dbfe3',
    track:    '#5d8bc6',
    trackDk:  '#3a6aa8',
    navy:     '#1a3a78',
    navyDk:   '#0f2855',
    // 金 · 奖牌
    gold:     '#c9a24a',
    goldHi:   '#e9b949',
    goldSoft: '#f3d97a',
    // 暖 · 烛光
    ember:    '#d97757',
    candle:   '#e8a85e',
    warmBg:   '#fbf6ec',
    warmInk:  '#5a3a1e',
    warmInkDk:'#3a2412',
    paperHi:  '#ffffff',
    muted:    '#8a6a3e',
    serif: '"Noto Serif SC","STSong",serif',
    sans:  '"Noto Sans SC",-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif',
    mono:  '"JetBrains Mono",ui-monospace,monospace',
  };

  // 六角星 SVG
  const StarG = ({ size = 14, color = T.gold, opacity = 1 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'inline-block', verticalAlign: 'middle', opacity }}>
      <path d="M12 1 L14 9 L22 9.5 L15.5 14 L18 22 L12 17.3 L6 22 L8.5 14 L2 9.5 L10 9 Z" fill={color} />
    </svg>
  );
  const SixStars = ({ size = 14, color = T.gold, gap = 6 }) => (
    <div style={{ display: 'flex', gap, alignItems: 'center' }}>
      {[0,1,2,3,4,5].map(i => <StarG key={i} size={size} color={color} />)}
    </div>
  );

  return (
    <div style={{ background: T.warmBg, minHeight: '100%', position: 'relative', fontFamily: T.sans, color: T.warmInk }}>
      <WxHeader title={`回顾 · VOL.0${issue.number}`} dark transparent />

      {/* ═════ HERO · 海报全幅 ═════ */}
      <div style={{ position: 'relative', height: 560, overflow: 'hidden' }}>
        <img src={r.heroImg || issue.poster} alt={issue.title} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: '50% 35%',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 90,
          background: 'linear-gradient(180deg, rgba(15,40,85,0.55) 0%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 280,
          background: 'linear-gradient(180deg, transparent 0%, rgba(15,40,85,0.4) 35%, rgba(58,36,18,0.92) 100%)',
        }} />

        <div style={{
          position: 'absolute', top: 56, left: 22, right: 22,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: T.mono, fontSize: 10, color: T.goldHi, letterSpacing: 3,
        }}>
          <span>DCT · VOL.0{issue.number} · 回顾</span>
          <span style={{ opacity: 0.85 }}>{issue.date} · {r.attendees || '客厅夜场'}</span>
        </div>

        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 24, color: T.paperHi }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 11px', background: T.goldHi, color: T.warmInkDk,
            fontFamily: T.mono, fontSize: 9.5, letterSpacing: 2, marginBottom: 14, borderRadius: 2,
          }}>
            <SixStars size={9} color={T.warmInkDk} gap={2} />
            {r.heroBadge}
          </div>
          <div style={{
            fontFamily: T.serif, fontSize: 27, fontWeight: 900, lineHeight: 1.32, letterSpacing: 1, textWrap: 'balance',
          }}>
            白天她在<span style={{ color: T.goldHi }}>跑道</span>上，<br/>
            夜晚她在<span style={{ color: T.candle }}>客厅</span>里。
          </div>
          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 12.5, opacity: 0.88,
            marginTop: 12, lineHeight: 1.65, textWrap: 'pretty',
          }}>{r.heroSub}</div>
        </div>
      </div>

      {/* ═════ Speaker 过渡条 ═════ */}
      <div style={{
        background: '#1a0c06', color: T.paperHi, padding: '13px 22px',
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: T.mono, fontSize: 10, letterSpacing: 2,
        borderBottom: `1px solid ${T.gold}55`,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 18, overflow: 'hidden', flexShrink: 0,
          boxShadow: `inset 0 0 0 1.5px ${T.gold}`,
        }}>
          {r.speakerImg && (
            <img src={r.speakerImg} alt="" style={{
              width: 92, height: 92, objectFit: 'cover',
              objectPosition: '74% 36%', marginLeft: -28, marginTop: -12,
            }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: T.goldHi, fontSize: 9 }}>SPEAKER · 主讲</div>
          <div style={{ color: T.paperHi, fontFamily: T.serif, fontSize: 13.5, fontWeight: 700, letterSpacing: 1, marginTop: 1 }}>
            {issue.speaker?.name} {issue.speaker?.title} · {issue.speaker?.org?.replace('光电工程研究所', '').trim() || '西南交通大学'}
          </div>
        </div>
        <div style={{ color: T.goldHi, opacity: 0.7 }}>{issue.date?.slice(5)} · 19:00</div>
      </div>

      {/* ═════ § 1 · 一万公里之外 ═════ */}
      <div style={{ padding: '36px 26px 0', background: T.warmBg }}>
        <div style={{
          fontFamily: T.mono, fontSize: 10, color: T.gold, letterSpacing: 4, marginBottom: 14,
        }}>§ 01 · 一万公里之外</div>

        <div style={{
          fontFamily: T.serif, fontSize: 22, fontWeight: 900, color: T.navyDk, lineHeight: 1.4, letterSpacing: 0.5,
        }}>
          所谓"六星"——<br/>
          六座<span style={{ color: T.gold }}>城市</span>，
          六条<span style={{ color: T.gold }}>赛道</span>，
          六次<span style={{ color: T.gold }}>出发</span>。
        </div>

        <div style={{
          marginTop: 22, padding: '20px 4px',
          borderTop: `0.5px solid ${T.gold}66`, borderBottom: `0.5px solid ${T.gold}66`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {r.sixCities.map((c, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <StarG size={18} color={T.gold} />
                <span style={{ fontFamily: T.serif, fontSize: 10, fontWeight: 700, color: T.warmInk, letterSpacing: 0.3 }}>{c}</span>
                <span style={{ fontFamily: T.mono, fontSize: 7.5, color: T.gold, opacity: 0.8, letterSpacing: 1 }}>0{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
        }}>
          {r.stats.map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily: T.serif, fontSize: 36, fontWeight: 900, color: T.navyDk,
                lineHeight: 0.9, letterSpacing: -0.5,
              }}>{s.num}<span style={{ fontSize: 14, fontWeight: 500, color: T.muted, marginLeft: 4 }}>{s.unit}</span></div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.gold, letterSpacing: 1.5, marginTop: 8 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 22, fontFamily: T.serif, fontStyle: 'italic', fontSize: 13,
          color: T.warmInk, opacity: 0.78, lineHeight: 1.8, textWrap: 'pretty',
        }}>
          {r.section1Outro[0]}<br/>
          {r.section1Outro[1].split('变成生活的一部分').map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && (
                <u style={{ textDecorationColor: T.gold, textDecorationThickness: 1.5, textUnderlineOffset: 3 }}>
                  变成生活的一部分
                </u>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ═════ § 2 · 章节插页：烛光大图 ═════ */}
      <div style={{ position: 'relative', height: 380, overflow: 'hidden', marginTop: 34 }}>
        <img src={r.candleImg} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: '50% 40%',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(180deg, rgba(20,8,4,0.5) 0%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 140,
          background: 'linear-gradient(180deg, transparent 0%, rgba(20,8,4,0.85) 100%)',
        }} />
        <div style={{
          position: 'absolute', top: 18, left: 22, right: 22,
          fontFamily: T.mono, fontSize: 10, color: T.goldHi, letterSpacing: 4,
        }}>{r.candleChapter.marker}</div>
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 18, color: T.paperHi }}>
          <div style={{
            fontFamily: T.serif, fontSize: 22, fontWeight: 800, lineHeight: 1.4, letterSpacing: 1,
          }}>
            {r.candleChapter.lines[0]}<br/>
            {r.candleChapter.lines[1]}<em style={{ fontStyle: 'italic', color: T.candle }}>{r.candleChapter.hl}</em>
          </div>
        </div>
      </div>

      {/* ═════ LEAD · drop cap ═════ */}
      <div style={{ padding: '32px 26px 0', background: T.warmBg }}>
        <div style={{ fontSize: 13.5, color: T.warmInk, lineHeight: 2, textWrap: 'pretty' }}>
          <span style={{
            float: 'left', fontFamily: T.serif, fontSize: 60, fontWeight: 900,
            color: T.ember, lineHeight: 0.85, marginRight: 8, marginTop: 6,
          }}>{r.leadCap}</span>
          {r.leadBody.split(r.leadHighlight).map((p, i, arr) => (
            <React.Fragment key={i}>
              {p}
              {i < arr.length - 1 && (
                <em style={{
                  fontStyle: 'normal', color: T.navyDk, fontWeight: 600,
                  background: `linear-gradient(180deg, transparent 65%, ${T.goldSoft}cc 65%, ${T.goldSoft}cc 92%, transparent 92%)`,
                }}>{r.leadHighlight}</em>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ═════ HOOK ═════ */}
      <div style={{ padding: '32px 22px 0', background: T.warmBg }}>
        <div style={{
          background: T.paperHi, border: `1px solid ${T.gold}`,
          padding: '26px 22px 22px', position: 'relative',
          boxShadow: `6px 6px 0 ${T.skyDeep}`,
        }}>
          <div style={{
            position: 'absolute', top: -10, left: 16,
            padding: '3px 9px', background: T.navyDk, color: T.goldHi,
            fontFamily: T.mono, fontSize: 9.5, letterSpacing: 2,
          }}>{r.hook.kicker}</div>
          <div style={{
            fontFamily: T.serif, fontSize: 19.5, fontWeight: 800, color: T.navyDk,
            lineHeight: 1.65, letterSpacing: 0.6, marginTop: 4, textWrap: 'pretty',
          }}>
            {r.hook.q1}<span style={{ color: T.gold }}>{r.hook.q1Hl}</span>{r.hook.q1Tail}<br/>
            {r.hook.q2}<br/>
            {r.hook.q3}<u style={{
              textDecorationColor: T.ember, textUnderlineOffset: 5, textDecorationThickness: 2.5,
            }}>{r.hook.q3Hl}</u>{r.hook.q3Tail}
          </div>
        </div>
      </div>

      {/* ═════ § 3 · 四条线索 ═════ */}
      <div style={{ padding: '36px 26px 0', background: T.warmBg }}>
        <div style={{
          fontFamily: T.mono, fontSize: 10, color: T.ember, letterSpacing: 3, marginBottom: 16,
        }}>{r.threadsKicker}</div>
        {r.threads.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 16, paddingBottom: 16, marginBottom: 16,
            borderBottom: i < r.threads.length - 1 ? `0.5px dashed ${T.gold}66` : 'none',
          }}>
            <div style={{
              fontFamily: T.serif, fontSize: 30, fontWeight: 900, color: T.gold,
              lineHeight: 0.9, width: 32, flexShrink: 0, letterSpacing: -1, paddingTop: 2,
            }}>0{i+1}</div>
            <div style={{
              fontSize: 13, color: T.warmInk,
              fontWeight: i === r.threads.length - 1 ? 700 : 400,
              lineHeight: 1.9, textWrap: 'pretty',
            }}>{t}</div>
          </div>
        ))}
      </div>

      {/* ═════ 双图 · bowl + cake ═════ */}
      <div style={{ padding: '14px 22px 0', background: T.warmBg }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <img src={r.bowlImg} alt="" style={{
            width: '100%', height: 150, objectFit: 'cover', borderRadius: 4,
            boxShadow: '0 6px 14px rgba(58,36,18,0.28)',
          }} />
          <img src={r.cakeSliceImg} alt="" style={{
            width: '100%', height: 150, objectFit: 'cover', borderRadius: 4,
            boxShadow: '0 6px 14px rgba(58,36,18,0.28)',
          }} />
        </div>
        <div style={{
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 11, color: T.warmInk, opacity: 0.65,
          marginTop: 8, lineHeight: 1.65, textAlign: 'center',
        }}>{r.sideCaption}</div>
      </div>

      {/* ═════ § 4 · 大金句 q2 ═════ */}
      <div style={{ padding: '32px 22px 0', background: T.warmBg }}>
        <div style={{
          background: `linear-gradient(135deg, #2a180a 0%, #1a0c06 40%, ${T.navyDk} 100%)`,
          padding: '32px 26px 28px', position: 'relative', color: T.paperHi,
          borderRadius: 4, overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: 80,
            background: `radial-gradient(circle, ${T.candle}66 0%, transparent 70%)`,
          }} />
          <div style={{
            position: 'absolute', left: -20, bottom: -20, width: 110, height: 110, borderRadius: 55,
            background: `radial-gradient(circle, ${T.gold}55 0%, transparent 70%)`,
          }} />
          <div style={{
            fontFamily: T.serif, fontSize: 70, color: T.goldHi, lineHeight: 0.5, opacity: 0.6, position: 'relative',
          }}>"</div>
          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 17, lineHeight: 1.9,
            textWrap: 'balance', marginTop: 4, position: 'relative', letterSpacing: 0.5,
            whiteSpace: 'pre-line',
          }}>{r.bigQuote}</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginTop: 20,
            paddingTop: 14, borderTop: `0.5px solid ${T.goldHi}55`, position: 'relative',
          }}>
            <SixStars size={11} color={T.goldHi} gap={3} />
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.goldHi, letterSpacing: 2, flex: 1 }}>
              · VOL.0{issue.number} · 现场金句
            </div>
          </div>
        </div>
      </div>

      {/* ═════ § 5 · 她坚持的事 ═════ */}
      <div style={{ padding: '40px 26px 0', background: T.warmBg }}>
        <div style={{
          fontFamily: T.mono, fontSize: 10, color: T.gold, letterSpacing: 4, marginBottom: 10,
        }}>{r.habitsKicker}</div>
        <div style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 800, color: T.warmInk, lineHeight: 1.45 }}>
          {r.habitsTitle}
        </div>
        <div style={{
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.warmInk, opacity: 0.65,
          marginTop: 6, lineHeight: 1.65,
        }}>{r.habitsSub}</div>

        <div style={{
          marginTop: 22, paddingLeft: 16,
          borderLeft: `2px solid ${T.gold}`,
        }}>
          {r.habits.map((h, i) => (
            <div key={i} style={{ position: 'relative', paddingBottom: 18 }}>
              <div style={{
                position: 'absolute', left: -21, top: 4,
                width: 10, height: 10, borderRadius: 5,
                background: i === 0 ? T.gold : T.warmBg,
                border: `2px solid ${T.gold}`,
              }} />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <div style={{ fontFamily: T.serif, fontSize: 14.5, fontWeight: 700, color: T.warmInk, letterSpacing: 0.5 }}>
                  {h.k}
                </div>
                <div style={{
                  flex: 1, height: 1,
                  background: `repeating-linear-gradient(90deg, ${T.gold}66 0, ${T.gold}66 2px, transparent 2px, transparent 5px)`,
                }} />
              </div>
              <div style={{ fontSize: 11.5, color: T.warmInk, opacity: 0.72, marginTop: 4, lineHeight: 1.65 }}>
                {h.d}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═════ § 6 · 情感高点 · 生命材料 ═════ */}
      <div style={{
        margin: '36px 0 0',
        background: `linear-gradient(180deg, ${T.warmBg} 0%, #f0e3c8 100%)`,
      }}>
        <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
          <img src={r.speakerImg} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: '76% 32%', filter: 'saturate(1.05) brightness(0.96)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(58,36,18,0.0) 0%, rgba(58,36,18,0.0) 60%, rgba(58,36,18,0.5) 100%)',
          }} />
          <div style={{
            position: 'absolute', left: 22, right: 22, bottom: 14,
            color: T.paperHi,
            fontFamily: T.mono, fontSize: 10, letterSpacing: 3,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>{r.peakMeta[0]}</span>
            <span style={{ opacity: 0.85 }}>{r.peakMeta[1]}</span>
          </div>
        </div>

        <div style={{ padding: '32px 26px 36px' }}>
          <div style={{
            fontFamily: T.mono, fontSize: 10, color: T.ember, letterSpacing: 4, marginBottom: 12,
          }}>{r.peakKicker}</div>
          <div style={{
            fontFamily: T.serif, fontSize: 60, color: T.gold, lineHeight: 0.4, height: 20, opacity: 0.8,
          }}>"</div>
          <div style={{
            fontFamily: T.serif, fontSize: 19, fontWeight: 700, color: T.warmInk,
            lineHeight: 1.8, letterSpacing: 0.6, marginTop: 10, textWrap: 'balance',
          }}>
            {r.peakQuote[0]}<br/>
            {r.peakQuote[1]}<br/>
            <span style={{
              color: T.ember,
              background: `linear-gradient(180deg, transparent 60%, ${T.goldSoft}cc 60%, ${T.goldSoft}cc 92%, transparent 92%)`,
              padding: '0 4px',
            }}>{r.peakHl}</span>。
          </div>
          <div style={{
            fontSize: 12.5, color: T.warmInk, opacity: 0.75, lineHeight: 1.95,
            marginTop: 18, textWrap: 'pretty',
          }}>
            {r.peakBody.split('敏锐、热情和安静').map((p, i, arr) => (
              <React.Fragment key={i}>
                {p}
                {i < arr.length - 1 && <strong style={{ color: T.ember }}>敏锐、热情和安静</strong>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ═════ § 7 · 12 个专业 ═════ */}
      <div style={{ padding: '36px 26px 0', background: T.warmBg }}>
        <div style={{
          fontFamily: T.mono, fontSize: 10, color: T.gold, letterSpacing: 4, marginBottom: 12,
        }}>{r.majorsKicker}</div>
        <div style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 800, color: T.warmInk, lineHeight: 1.5 }}>
          {r.majorsTitleLead} <span style={{ color: T.navyDk }}>{r.majorsTitleHl}</span> {r.majorsTitleTail}
        </div>
        <div style={{
          marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 5,
        }}>
          {r.majors.map((m, i) => (
            <div key={i} style={{
              fontSize: 11, color: T.warmInk,
              padding: '5px 10px', background: T.paperHi,
              border: `0.5px solid ${T.gold}88`, borderRadius: 14,
            }}>{m}</div>
          ))}
        </div>
        <div style={{
          fontSize: 12.5, color: T.warmInk, opacity: 0.82, lineHeight: 1.95, marginTop: 16, textWrap: 'pretty',
        }}>
          {r.majorsBody.split(r.majorsBodyHl).map((p, i, arr) => (
            <React.Fragment key={i}>
              {p}
              {i < arr.length - 1 && (
                <u style={{ textDecorationColor: T.gold, textDecorationThickness: 1.5, textUnderlineOffset: 3 }}>
                  {r.majorsBodyHl}
                </u>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ═════ 现场全景 ═════ */}
      <div style={{ padding: '24px 22px 0', background: T.warmBg }}>
        <img src={r.audienceImg} alt="" style={{
          width: '100%', height: 220, objectFit: 'cover', borderRadius: 4,
          boxShadow: '0 10px 24px rgba(58,36,18,0.4)',
          filter: 'saturate(1.02) brightness(0.98)',
        }} />
        <div style={{
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 11.5, color: T.warmInk, opacity: 0.72,
          marginTop: 10, lineHeight: 1.7, textAlign: 'center', textWrap: 'pretty',
        }}>{r.audienceCaption[0]}<br/>{r.audienceCaption[1]}</div>
      </div>

      {/* ═════ § 8 · 收尾 ═════ */}
      <div style={{
        padding: '44px 26px 28px', background: T.warmBg, position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <SixStars size={14} color={T.gold} gap={7} />
        </div>

        <div style={{
          fontFamily: T.mono, fontSize: 10, color: T.ember, letterSpacing: 4,
          textAlign: 'center', marginBottom: 10,
        }}>{r.thanksKicker}</div>

        <div style={{
          fontFamily: T.serif, fontSize: 16, fontWeight: 700, color: T.warmInk, lineHeight: 1.7,
          textAlign: 'center', letterSpacing: 0.3, textWrap: 'pretty',
        }}>
          {r.thanksTitle[0]}<br/>
          {r.thanksTitle[1]}<u style={{
            textDecorationColor: T.gold, textDecorationThickness: 2, textUnderlineOffset: 5,
          }}>{r.thanksHl}</u>{r.thanksTail}
        </div>

        <div style={{
          margin: '28px auto 0', maxWidth: 280, fontSize: 12.5, color: T.warmInk, opacity: 0.82,
          lineHeight: 2, textWrap: 'pretty', textAlign: 'center',
        }}>
          {r.closingEssay.map((line, i) => (
            <React.Fragment key={i}>
              {line.includes(r.closingEssayHl) ? line.split(r.closingEssayHl).map((p, j, arr) => (
                <React.Fragment key={j}>
                  {j === 0 && i === r.closingEssay.length - 1 ? p : p}
                  {j < arr.length - 1 && (
                    <u style={{ textDecorationColor: T.ember, textUnderlineOffset: 4 }}>
                      {r.closingEssayHl}
                    </u>
                  )}
                </React.Fragment>
              )) : (
                line.includes('忍受焦虑的能力') ? (
                  <>
                    {line.split('忍受焦虑的能力')[0]}
                    <strong>忍受焦虑的能力</strong>
                    {line.split('忍受焦虑的能力')[1]}
                  </>
                ) : line
              )}
              <br/>
            </React.Fragment>
          ))}
        </div>

        {/* 走丢的羊大字卡 */}
        <div style={{
          marginTop: 36, padding: '28px 22px',
          background: T.paperHi,
          border: `1px solid ${T.gold}`,
          borderRadius: 4,
          position: 'relative',
          boxShadow: `5px 5px 0 ${T.skyDeep}`,
        }}>
          <svg width="44" height="32" viewBox="0 0 44 32" style={{
            position: 'absolute', top: -16, right: 20, background: T.warmBg, padding: '2px 6px',
          }}>
            <ellipse cx="20" cy="18" rx="13" ry="9" fill={T.paperHi} stroke={T.warmInkDk} strokeWidth="1" />
            <circle cx="32" cy="14" r="5" fill={T.warmInkDk} />
            <circle cx="30.5" cy="13" r="0.8" fill={T.paperHi} />
            <line x1="8" y1="22" x2="8" y2="27" stroke={T.warmInkDk} strokeWidth="1" />
            <line x1="14" y1="24" x2="14" y2="28" stroke={T.warmInkDk} strokeWidth="1" />
            <line x1="22" y1="24" x2="22" y2="28" stroke={T.warmInkDk} strokeWidth="1" />
            <line x1="36" y1="11" x2="38" y2="9" stroke={T.warmInkDk} strokeWidth="1" />
          </svg>

          <div style={{
            fontFamily: T.serif, fontSize: 23, fontWeight: 900, color: T.warmInkDk, lineHeight: 1.5, letterSpacing: 0.5,
            textAlign: 'center',
          }}>
            {r.sheepTitle}<br/>
            {r.sheepIntro}<span style={{
              color: T.ember,
              background: `linear-gradient(180deg, transparent 60%, ${T.goldSoft}aa 60%, ${T.goldSoft}aa 92%, transparent 92%)`,
              padding: '0 6px',
            }}>{r.sheepHl}</span>{r.sheepTail}
          </div>
        </div>

        <div style={{
          fontSize: 12.5, color: T.warmInk, opacity: 0.78, lineHeight: 1.95,
          marginTop: 24, textWrap: 'pretty',
        }}>
          {r.closingP}
        </div>

        <div style={{
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 11, color: T.warmInk, opacity: 0.55,
          marginTop: 24, letterSpacing: 1, textAlign: 'center',
        }}>{r.signature}</div>
      </div>

      {/* ═════ 报名本期 CTA（动态指向 current · 通用模板）═════ */}
      {(() => {
        const current = window.DCT_DATA?.getCurrent?.();
        if (!current || current.id === issue.id) return null;
        return (
          <div style={{ padding: '0 22px 30px', background: T.warmBg }}>
            <div
              onClick={() => go && go('landing')}
              style={{
                background: `linear-gradient(135deg, #1a0c06 0%, ${T.navyDk} 60%, ${T.navy} 100%)`,
                padding: '16px 18px', borderRadius: 4,
                color: T.paperHi, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                boxShadow: `0 10px 22px rgba(15,40,85,0.4)`,
                position: 'relative', overflow: 'hidden', cursor: 'pointer',
              }}>
              <div style={{
                position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: 70,
                background: `radial-gradient(circle, ${T.candle}66 0%, transparent 70%)`,
              }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.goldHi, letterSpacing: 2 }}>
                  报名本期 · VOL.0{current.number}
                </div>
                <div style={{ fontFamily: T.serif, fontSize: 15.5, fontWeight: 800, marginTop: 4 }}>
                  {current.title}
                </div>
                <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 10.5, opacity: 0.85, marginTop: 3 }}>
                  {current.date} · {current.location?.split(' ').slice(-1)[0] || ''} · {current.price}
                </div>
              </div>
              <div style={{
                width: 38, height: 38, borderRadius: 19, background: T.goldHi, color: T.navyDk,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17, fontWeight: 700, flexShrink: 0, position: 'relative',
                boxShadow: `0 4px 10px rgba(0,0,0,0.3)`,
              }}>→</div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

Object.assign(window, { Vol02CandleDetail });
