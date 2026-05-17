// vol02-dirB.jsx — 方向 B · 烛光与赛道（Candlelight & Track）· V3
// HERO 回到海报；烛光作为中段章节插页
// 结尾段落补足，让"走丢的羊"真正落地

function Vol02DirB() {
  return (
    <V2Phone height={3360} bg={V2T.warmBg} color={V2T.warmInk}>
      {/* 顶部状态栏（叠在大图上） */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, color: V2T.paperHi, fontWeight: 500, pointerEvents: 'none',
      }}>
        <div style={{ position: 'absolute', left: 14, fontSize: 18, opacity: 0.85, fontWeight: 300 }}>‹</div>
        往期回顾
        <div style={{ position: 'absolute', right: 14, fontSize: 13, opacity: 0.8 }}>···</div>
      </div>

      {/* ═════ HERO · 海报全幅开场（赛道蓝） ═════ */}
      <div style={{ position: 'relative', height: 560, overflow: 'hidden' }}>
        <img src={A2.poster} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: '50% 35%',
        }} />
        {/* 顶部轻暗角，承接 status bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 90,
          background: 'linear-gradient(180deg, rgba(15,40,85,0.55) 0%, transparent 100%)',
        }} />
        {/* 底部暗角，接到下方暖纸 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 280,
          background: 'linear-gradient(180deg, transparent 0%, rgba(15,40,85,0.4) 35%, rgba(58,36,18,0.92) 100%)',
        }} />

        {/* 顶部 monospace meta */}
        <div style={{
          position: 'absolute', top: 56, left: 22, right: 22,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: V2T.mono, fontSize: 10, color: V2T.goldHi, letterSpacing: 3,
        }}>
          <span>DCT · {V2_COPY.vol} · 回顾</span>
          <span style={{ opacity: 0.85 }}>{V2_COPY.date} · 客厅夜场</span>
        </div>

        {/* 底部 · 大标题 + 副题 */}
        <div style={{
          position: 'absolute', left: 22, right: 22, bottom: 24, color: V2T.paperHi,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 11px', background: V2T.goldHi, color: V2T.warmInk,
            fontFamily: V2T.mono, fontSize: 9.5, letterSpacing: 2, marginBottom: 14,
            borderRadius: 2,
          }}>
            <SixStars size={9} color={V2T.warmInk} gap={2} />
            SIX · STAR · FINISHER
          </div>
          <div style={{
            fontFamily: V2T.serif, fontSize: 27, fontWeight: 900, lineHeight: 1.32, letterSpacing: 1,
            textWrap: 'balance',
          }}>
            白天她在<span style={{ color: V2T.goldHi }}>跑道</span>上，<br/>
            夜晚她在<span style={{ color: V2T.candle }}>客厅</span>里。
          </div>
          <div style={{
            fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 12.5, opacity: 0.88,
            marginTop: 12, lineHeight: 1.65, textWrap: 'pretty',
          }}>{V2_COPY.sub}</div>
        </div>
      </div>

      {/* ═════ 过渡条 · 主讲者 ═════ */}
      <div style={{
        background: '#1a0c06', color: V2T.paperHi, padding: '13px 22px',
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: V2T.mono, fontSize: 10, letterSpacing: 2,
        borderBottom: `1px solid ${V2T.gold}55`,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 18, overflow: 'hidden', flexShrink: 0,
          boxShadow: `inset 0 0 0 1.5px ${V2T.gold}`,
        }}>
          <img src={A2.speaker} alt="" style={{
            width: 92, height: 92, objectFit: 'cover',
            objectPosition: '74% 36%', marginLeft: -28, marginTop: -12,
          }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: V2T.goldHi, fontSize: 9 }}>SPEAKER · 主讲</div>
          <div style={{ color: V2T.paperHi, fontFamily: V2T.serif, fontSize: 13.5, fontWeight: 700, letterSpacing: 1, marginTop: 1 }}>
            高晓蓉 教授 · 西南交通大学
          </div>
        </div>
        <div style={{ color: V2T.goldHi, opacity: 0.7 }}>04.25 · 19:00</div>
      </div>

      {/* ═════ § 1 · 一万公里之外（六大满贯纪事） ═════ */}
      <div style={{ padding: '36px 26px 0', background: V2T.warmBg }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.gold, letterSpacing: 4, marginBottom: 14,
        }}>§ 01 · 一万公里之外</div>

        <div style={{
          fontFamily: V2T.serif, fontSize: 22, fontWeight: 900, color: V2T.navyDk, lineHeight: 1.4, letterSpacing: 0.5,
        }}>
          所谓"六星"——<br/>
          六座<span style={{ color: V2T.gold }}>城市</span>，
          六条<span style={{ color: V2T.gold }}>赛道</span>，
          六次<span style={{ color: V2T.gold }}>出发</span>。
        </div>

        {/* 六颗星 + 城市名 */}
        <div style={{
          marginTop: 22, padding: '20px 4px',
          borderTop: `0.5px solid ${V2T.gold}66`, borderBottom: `0.5px solid ${V2T.gold}66`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {V2_COPY.sixCities.map((c, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <StarGlyph size={18} color={V2T.gold} />
                <span style={{ fontFamily: V2T.serif, fontSize: 10, fontWeight: 700, color: V2T.warmInk, letterSpacing: 0.3 }}>
                  {c}
                </span>
                <span style={{ fontFamily: V2T.mono, fontSize: 7.5, color: V2T.gold, opacity: 0.8, letterSpacing: 1 }}>
                  0{i+1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 数字 · 两组 */}
        <div style={{
          marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
        }}>
          <div>
            <div style={{
              fontFamily: V2T.serif, fontSize: 36, fontWeight: 900, color: V2T.navyDk,
              lineHeight: 0.9, letterSpacing: -0.5,
            }}>10,000<span style={{ fontSize: 14, fontWeight: 500, color: V2T.muted, marginLeft: 4 }}>公里</span></div>
            <div style={{ fontFamily: V2T.mono, fontSize: 10, color: V2T.gold, letterSpacing: 1.5, marginTop: 8 }}>
              累计跑步里程
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: V2T.serif, fontSize: 36, fontWeight: 900, color: V2T.navyDk,
              lineHeight: 0.9, letterSpacing: -0.5,
            }}>1,314<span style={{ fontSize: 14, fontWeight: 500, color: V2T.muted, marginLeft: 4 }}>次</span></div>
            <div style={{ fontFamily: V2T.mono, fontSize: 10, color: V2T.gold, letterSpacing: 1.5, marginTop: 8 }}>
              记录里的跑步次数
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 22, fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 13,
          color: V2T.warmInk, opacity: 0.78, lineHeight: 1.8, textWrap: 'pretty',
        }}>
          那晚真正打动我们的，不是这六颗星——<br/>
          而是她把这六颗星，<u style={{
            textDecorationColor: V2T.gold, textDecorationThickness: 1.5, textUnderlineOffset: 3,
          }}>变成生活的一部分</u>的方式。
        </div>
      </div>

      {/* ═════ § 2 · 章节插页：烛光大图（全幅） ═════ */}
      <div style={{ position: 'relative', height: 380, overflow: 'hidden', marginTop: 34 }}>
        <img src={A2.candle} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: '50% 40%',
        }} />
        {/* 上下双暗角 */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(180deg, rgba(20,8,4,0.5) 0%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 140,
          background: 'linear-gradient(180deg, transparent 0%, rgba(20,8,4,0.85) 100%)',
        }} />
        {/* 上方 chapter marker */}
        <div style={{
          position: 'absolute', top: 18, left: 22, right: 22,
          fontFamily: V2T.mono, fontSize: 10, color: V2T.goldHi, letterSpacing: 4,
        }}>§ 02 · 然而那天晚上</div>
        {/* 下方 title */}
        <div style={{
          position: 'absolute', left: 22, right: 22, bottom: 18, color: V2T.paperHi,
        }}>
          <div style={{
            fontFamily: V2T.serif, fontSize: 22, fontWeight: 800, lineHeight: 1.4, letterSpacing: 1,
          }}>
            她坐进我们小小的客厅，<br/>
            和我们聊起<em style={{
              fontStyle: 'italic', color: V2T.candle,
            }}>"如何安放自己"</em>
          </div>
        </div>
      </div>

      {/* ═════ LEAD · drop cap ═════ */}
      <div style={{ padding: '32px 26px 0', background: V2T.warmBg }}>
        <div style={{ fontSize: 13.5, color: V2T.warmInk, lineHeight: 2, textWrap: 'pretty' }}>
          <span style={{
            float: 'left', fontFamily: V2T.serif, fontSize: 60, fontWeight: 900,
            color: V2T.ember, lineHeight: 0.85, marginRight: 8, marginTop: 6,
          }}>那</span>
          天晚上的客厅里，桌上是烛灯、橙玫瑰、莓果蛋糕；投影上是高老师跑过的<em style={{
            fontStyle: 'normal', color: V2T.navyDk, fontWeight: 600,
            background: `linear-gradient(180deg, transparent 65%, ${V2T.goldSoft}cc 65%, ${V2T.goldSoft}cc 92%, transparent 92%)`,
          }}>六座城市</em>。她讲马拉松，讲读书会，讲英语单词打卡，讲博物馆公益讲解——一件一件，都很认真。
        </div>
      </div>

      {/* ═════ HOOK · 大问题 ═════ */}
      <div style={{ padding: '32px 22px 0', background: V2T.warmBg }}>
        <div style={{
          background: V2T.paperHi,
          border: `1px solid ${V2T.gold}`,
          padding: '26px 22px 22px', position: 'relative',
          boxShadow: `6px 6px 0 ${V2T.skyDeep}`,
        }}>
          <div style={{
            position: 'absolute', top: -10, left: 16,
            padding: '3px 9px', background: V2T.navyDk, color: V2T.goldHi,
            fontFamily: V2T.mono, fontSize: 9.5, letterSpacing: 2,
          }}>那晚的核心提问</div>
          <div style={{
            fontFamily: V2T.serif, fontSize: 19.5, fontWeight: 800, color: V2T.navyDk,
            lineHeight: 1.65, letterSpacing: 0.6, marginTop: 4, textWrap: 'pretty',
          }}>
            一个跑完<span style={{ color: V2T.gold }}>六大满贯</span>的人，<br/>
            为什么坐进我们小小的客厅，<br/>
            聊起<u style={{
              textDecorationColor: V2T.ember, textUnderlineOffset: 5, textDecorationThickness: 2.5,
            }}>"如何安放自己"</u>？
          </div>
        </div>
      </div>

      {/* ═════ § 3 · 四条线索 ═════ */}
      <div style={{ padding: '36px 26px 0', background: V2T.warmBg }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.ember, letterSpacing: 3, marginBottom: 16,
        }}>§ 03 · 我们顺着她，慢慢拆开了几条线索</div>
        {V2_COPY.threads.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 16, paddingBottom: 16, marginBottom: 16,
            borderBottom: i < V2_COPY.threads.length - 1 ? `0.5px dashed ${V2T.gold}66` : 'none',
          }}>
            <div style={{
              fontFamily: V2T.serif, fontSize: 30, fontWeight: 900, color: V2T.gold,
              lineHeight: 0.9, width: 32, flexShrink: 0, letterSpacing: -1, paddingTop: 2,
            }}>0{i+1}</div>
            <div style={{
              fontSize: 13, color: V2T.warmInk,
              fontWeight: i === V2_COPY.threads.length - 1 ? 700 : 400,
              lineHeight: 1.9, textWrap: 'pretty',
            }}>{t}</div>
          </div>
        ))}
      </div>

      {/* ═════ 双图 · bowl + cake ═════ */}
      <div style={{ padding: '14px 22px 0', background: V2T.warmBg }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <img src={A2.bowl} alt="" style={{
            width: '100%', height: 150, objectFit: 'cover', borderRadius: 4,
            boxShadow: '0 6px 14px rgba(58,36,18,0.28)',
          }} />
          <img src={A2.cakeSlice} alt="" style={{
            width: '100%', height: 150, objectFit: 'cover', borderRadius: 4,
            boxShadow: '0 6px 14px rgba(58,36,18,0.28)',
          }} />
        </div>
        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 11, color: V2T.warmInk, opacity: 0.65,
          marginTop: 8, lineHeight: 1.65, textAlign: 'center',
        }}>↑ 莓果碗 + Lotus · 蓝莓黑莓樱桃慕斯 · 那晚的所有甜，都是夜里的颜色</div>
      </div>

      {/* ═════ § 4 · 大金句 q2 · 海报蓝 ═════ */}
      <div style={{ padding: '32px 22px 0', background: V2T.warmBg }}>
        <div style={{
          background: `linear-gradient(135deg, #2a180a 0%, #1a0c06 40%, ${V2T.navyDk} 100%)`,
          padding: '32px 26px 28px', position: 'relative', color: V2T.paperHi,
          borderRadius: 4, overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: 80,
            background: `radial-gradient(circle, ${V2T.candle}66 0%, transparent 70%)`,
          }} />
          <div style={{
            position: 'absolute', left: -20, bottom: -20, width: 110, height: 110, borderRadius: 55,
            background: `radial-gradient(circle, ${V2T.gold}55 0%, transparent 70%)`,
          }} />
          <div style={{
            fontFamily: V2T.serif, fontSize: 70, color: V2T.goldHi, lineHeight: 0.5, opacity: 0.6,
            position: 'relative',
          }}>"</div>
          <div style={{
            fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 17, lineHeight: 1.9,
            textWrap: 'balance', marginTop: 4, position: 'relative', letterSpacing: 0.5,
            whiteSpace: 'pre-line',
          }}>{V2_COPY.q2}</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginTop: 20,
            paddingTop: 14, borderTop: `0.5px solid ${V2T.goldHi}55`, position: 'relative',
          }}>
            <SixStars size={11} color={V2T.goldHi} gap={3} />
            <div style={{ fontFamily: V2T.mono, fontSize: 9.5, color: V2T.goldHi, letterSpacing: 2, flex: 1 }}>
              · VOL.02 · 现场金句
            </div>
          </div>
        </div>
      </div>

      {/* ═════ § 5 · 她坚持的事 · 6 件 ═════ */}
      <div style={{ padding: '40px 26px 0', background: V2T.warmBg }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.gold, letterSpacing: 4, marginBottom: 10,
        }}>§ 04 · 那些"放进日常"的事</div>
        <div style={{ fontFamily: V2T.serif, fontSize: 20, fontWeight: 800, color: V2T.warmInk, lineHeight: 1.45 }}>
          她"坚持"的，远不止跑步
        </div>
        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 12, color: V2T.warmInk, opacity: 0.65,
          marginTop: 6, lineHeight: 1.65,
        }}>—— 单独拿出来每一件都不轻，她把它们放进了很多个普通的一天</div>

        <div style={{
          marginTop: 22, paddingLeft: 16,
          borderLeft: `2px solid ${V2T.gold}`,
        }}>
          {V2_COPY.habits.map((h, i) => (
            <div key={i} style={{
              position: 'relative', paddingBottom: 18,
            }}>
              <div style={{
                position: 'absolute', left: -21, top: 4,
                width: 10, height: 10, borderRadius: 5,
                background: i === 0 ? V2T.gold : V2T.warmBg,
                border: `2px solid ${V2T.gold}`,
              }} />
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 8,
              }}>
                <div style={{ fontFamily: V2T.serif, fontSize: 14.5, fontWeight: 700, color: V2T.warmInk, letterSpacing: 0.5 }}>
                  {h.k}
                </div>
                <div style={{
                  flex: 1, height: 1,
                  background: `repeating-linear-gradient(90deg, ${V2T.gold}66 0, ${V2T.gold}66 2px, transparent 2px, transparent 5px)`,
                }} />
              </div>
              <div style={{ fontSize: 11.5, color: V2T.warmInk, opacity: 0.72, marginTop: 4, lineHeight: 1.65 }}>
                {h.d}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═════ § 6 · 讲者肖像 + 生命材料金句（情感高点）═════ */}
      <div style={{
        margin: '36px 0 0',
        background: `linear-gradient(180deg, ${V2T.warmBg} 0%, #f0e3c8 100%)`,
      }}>
        <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
          <img src={A2.speaker} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: '76% 32%',
            filter: 'saturate(1.05) brightness(0.96)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(58,36,18,0.0) 0%, rgba(58,36,18,0.0) 60%, rgba(58,36,18,0.5) 100%)',
          }} />
          <div style={{
            position: 'absolute', left: 22, right: 22, bottom: 14,
            color: V2T.paperHi,
            fontFamily: V2T.mono, fontSize: 10, letterSpacing: 3,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>FIELD · 04.25 · 21:08</span>
            <span style={{ opacity: 0.85 }}>讲到第 1,314 次跑步时</span>
          </div>
        </div>

        <div style={{ padding: '32px 26px 36px' }}>
          <div style={{
            fontFamily: V2T.mono, fontSize: 10, color: V2T.ember, letterSpacing: 4, marginBottom: 12,
          }}>§ 05 · 她带来的</div>
          <div style={{
            fontFamily: V2T.serif, fontSize: 60, color: V2T.gold, lineHeight: 0.4, height: 20, opacity: 0.8,
          }}>"</div>
          <div style={{
            fontFamily: V2T.serif, fontSize: 19, fontWeight: 700, color: V2T.warmInk,
            lineHeight: 1.8, letterSpacing: 0.6, marginTop: 10, textWrap: 'balance',
          }}>
            她带来的不是标准答案。<br/>
            而是一份非常具体、非常诚实的——<br/>
            <span style={{
              color: V2T.ember,
              background: `linear-gradient(180deg, transparent 60%, ${V2T.goldSoft}cc 60%, ${V2T.goldSoft}cc 92%, transparent 92%)`,
              padding: '0 4px',
            }}>生命材料</span>。
          </div>
          <div style={{
            fontSize: 12.5, color: V2T.warmInk, opacity: 0.75, lineHeight: 1.95,
            marginTop: 18, textWrap: 'pretty',
          }}>
            她身上有一种动人的生命力——那不是被包装出来的"励志感"，而是一种长期生活之后，仍然保有的<strong style={{ color: V2T.ember }}>敏锐、热情和安静</strong>。
          </div>
        </div>
      </div>

      {/* ═════ § 7 · 客厅 · 12 个专业 ═════ */}
      <div style={{ padding: '36px 26px 0', background: V2T.warmBg }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.gold, letterSpacing: 4, marginBottom: 12,
        }}>§ 06 · 一个不大的客厅</div>
        <div style={{ fontFamily: V2T.serif, fontSize: 20, fontWeight: 800, color: V2T.warmInk, lineHeight: 1.5 }}>
          坐下了 <span style={{ color: V2T.navyDk }}>12 个不同专业</span> 的思考
        </div>
        <div style={{
          marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 5,
        }}>
          {V2_COPY.majors.map((m, i) => (
            <div key={i} style={{
              fontSize: 11, color: V2T.warmInk,
              padding: '5px 10px', background: V2T.paperHi,
              border: `0.5px solid ${V2T.gold}88`, borderRadius: 14,
            }}>{m}</div>
          ))}
        </div>
        <div style={{
          fontSize: 12.5, color: V2T.warmInk, opacity: 0.82, lineHeight: 1.95, marginTop: 16, textWrap: 'pretty',
        }}>
          每一次观点的碰撞，都让我们重新相信：<strong>跨学科交流的意义</strong>，不在于大家说同一种语言，而在于不同语言之间，<u style={{
            textDecorationColor: V2T.gold, textDecorationThickness: 1.5, textUnderlineOffset: 3,
          }}>仍然愿意互相翻译、互相靠近</u>。
        </div>
      </div>

      {/* ═════ 现场全景 · audience 大图 ═════ */}
      <div style={{ padding: '24px 22px 0', background: V2T.warmBg }}>
        <img src={A2.audience} alt="" style={{
          width: '100%', height: 220, objectFit: 'cover', borderRadius: 4,
          boxShadow: '0 10px 24px rgba(58,36,18,0.4)',
          filter: 'saturate(1.02) brightness(0.98)',
        }} />
        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 11.5, color: V2T.warmInk, opacity: 0.72,
          marginTop: 10, lineHeight: 1.7, textAlign: 'center', textWrap: 'pretty',
        }}>那些原本悬浮在空中的想象，<br/>好像也因此慢慢有了——可以落脚的重量。</div>
      </div>

      {/* ═════ § 8 · 收尾：感谢 + 走丢的羊 ═════ */}
      <div style={{
        padding: '44px 26px 28px', background: V2T.warmBg, position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <SixStars size={14} color={V2T.gold} gap={7} />
        </div>

        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.ember, letterSpacing: 4,
          textAlign: 'center', marginBottom: 10,
        }}>FROM · YOUR · HOSTS</div>

        <div style={{
          fontFamily: V2T.serif, fontSize: 16, fontWeight: 700, color: V2T.warmInk, lineHeight: 1.7,
          textAlign: 'center', letterSpacing: 0.3, textWrap: 'pretty',
        }}>
          感谢那天晚上，<br/>
          来到 DCT 客厅坐坐的<u style={{
            textDecorationColor: V2T.gold, textDecorationThickness: 2, textUnderlineOffset: 5,
          }}>每一位</u>。
        </div>

        <div style={{
          margin: '28px auto 0', maxWidth: 280, fontSize: 12.5, color: V2T.warmInk, opacity: 0.82,
          lineHeight: 2, textWrap: 'pretty', textAlign: 'center',
        }}>
          现代生活里，我们好像并不缺少想象——<br/>
          真正缺少的，<br/>
          是在想象变成现实的时间里，<strong>忍受焦虑的能力</strong>；<br/>
          是在树欲静而风不止的现实里，<br/>
          一次次学习——<u style={{
            textDecorationColor: V2T.ember, textUnderlineOffset: 4,
          }}>如何安放自己</u>。
        </div>

        {/* 大字 · 走丢的羊 */}
        <div style={{
          marginTop: 36, padding: '28px 22px',
          background: V2T.paperHi,
          border: `1px solid ${V2T.gold}`,
          borderRadius: 4,
          position: 'relative',
          boxShadow: `5px 5px 0 ${V2T.skyDeep}`,
        }}>
          {/* 小羊 SVG */}
          <svg width="44" height="32" viewBox="0 0 44 32" style={{
            position: 'absolute', top: -16, right: 20, background: V2T.warmBg, padding: '2px 6px',
          }}>
            <ellipse cx="20" cy="18" rx="13" ry="9" fill={V2T.paperHi} stroke={V2T.warmInk} strokeWidth="1" />
            <circle cx="32" cy="14" r="5" fill={V2T.warmInk} />
            <circle cx="30.5" cy="13" r="0.8" fill={V2T.paperHi} />
            <line x1="8" y1="22" x2="8" y2="27" stroke={V2T.warmInk} strokeWidth="1" />
            <line x1="14" y1="24" x2="14" y2="28" stroke={V2T.warmInk} strokeWidth="1" />
            <line x1="22" y1="24" x2="22" y2="28" stroke={V2T.warmInk} strokeWidth="1" />
            <line x1="36" y1="11" x2="38" y2="9" stroke={V2T.warmInk} strokeWidth="1" />
          </svg>

          <div style={{
            fontFamily: V2T.serif, fontSize: 23, fontWeight: 900, color: V2T.warmInk, lineHeight: 1.5, letterSpacing: 0.5,
            textAlign: 'center',
          }}>
            DCT 不是给答案，<br/>
            而是 <span style={{
              color: V2T.ember,
              background: `linear-gradient(180deg, transparent 60%, ${V2T.goldSoft}aa 60%, ${V2T.goldSoft}aa 92%, transparent 92%)`,
              padding: '0 6px',
            }}>一起找一只走丢的羊</span>。
          </div>
        </div>

        <div style={{
          fontSize: 12.5, color: V2T.warmInk, opacity: 0.78, lineHeight: 1.95,
          marginTop: 24, textWrap: 'pretty',
        }}>
          {V2_COPY.closingP}
        </div>

        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 11, color: V2T.warmInk, opacity: 0.55,
          marginTop: 24, letterSpacing: 1, textAlign: 'center',
        }}>— D · C · T · 2026 春末</div>
      </div>

      {/* ═════ 下一期 CTA ═════ */}
      <div style={{ padding: '0 22px 30px', background: V2T.warmBg }}>
        <div style={{
          background: `linear-gradient(135deg, #1a0c06 0%, ${V2T.navyDk} 60%, ${V2T.navy} 100%)`,
          padding: '16px 18px', borderRadius: 4,
          color: V2T.paperHi, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: `0 10px 22px rgba(15,40,85,0.4)`,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: 70,
            background: `radial-gradient(circle, ${V2T.candle}66 0%, transparent 70%)`,
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: V2T.mono, fontSize: 9.5, color: V2T.goldHi, letterSpacing: 2 }}>
              {V2_COPY.ctaKicker}
            </div>
            <div style={{ fontFamily: V2T.serif, fontSize: 15.5, fontWeight: 800, marginTop: 4 }}>
              {V2_COPY.ctaTitle}
            </div>
            <div style={{ fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 10.5, opacity: 0.85, marginTop: 3 }}>
              {V2_COPY.ctaDate}
            </div>
          </div>
          <div style={{
            width: 38, height: 38, borderRadius: 19, background: V2T.goldHi, color: V2T.navyDk,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, fontWeight: 700, flexShrink: 0, position: 'relative',
            boxShadow: `0 4px 10px rgba(0,0,0,0.3)`,
          }}>→</div>
        </div>
      </div>
    </V2Phone>
  );
}

Object.assign(window, { Vol02DirB });
