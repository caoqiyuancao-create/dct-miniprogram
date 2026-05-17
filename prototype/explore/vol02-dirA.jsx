// vol02-dirA.jsx — 方向 A · 跑者笔记（Track Magazine）
// 调性：呼应海报本身——亚麻纸 + 跑道蓝 + 奖牌金；体育杂志感
// 强类型层级、里程碑式数据、清醒、坚定

function Vol02DirA() {
  return (
    <V2Phone height={2280} bg={V2T.sky} color={V2T.ink}>
      <V2Header />

      {/* HERO · 亚麻纸 + 跑道线 + 大标题 */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, ${V2T.skyHi} 0%, ${V2T.sky} 60%, ${V2T.skyDeep} 100%)`,
        }} />
        <TrackLines height={460} opacity={0.55} color={V2T.trackDk} />
        <PaperNoise opacity={0.06} />

        <div style={{ position: 'relative', padding: '22px 22px 28px' }}>
          {/* 顶部 monospace 信息 */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: V2T.mono, fontSize: 10, color: V2T.trackDk, letterSpacing: 3,
          }}>
            <span>DCT · {V2_COPY.vol} · RECAP</span>
            <span>{V2_COPY.date}</span>
          </div>

          {/* 三件标签 */}
          <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
            {['六星跑者', '高校教授', '一个特殊的客厅'].map((t, i) => (
              <span key={i} style={{
                fontFamily: V2T.mono, fontSize: 10, letterSpacing: 1,
                padding: '4px 9px', background: V2T.paperHi,
                color: V2T.navyDk, border: `0.5px solid ${V2T.skyDeep}`,
                borderRadius: 12,
              }}>{t}</span>
            ))}
          </div>

          {/* 大标题 */}
          <div style={{
            fontFamily: V2T.serif, fontSize: 33, fontWeight: 900, color: V2T.navyDk,
            lineHeight: 1.25, letterSpacing: 1, marginTop: 18, textWrap: 'balance',
          }}>
            她跑完了<br/>
            <span style={{ color: V2T.trackDk }}>六大满贯</span>
            <SixStars size={16} color={V2T.gold} gap={3} />
            <br/>
            却在我们客厅<br/>
            聊起 <span style={{
              fontStyle: 'italic',
              background: `linear-gradient(180deg, transparent 60%, ${V2T.goldSoft}cc 60%, ${V2T.goldSoft}cc 92%, transparent 92%)`,
              padding: '0 4px',
            }}>"如何安放自己"</span>
          </div>

          <div style={{
            fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 13, color: V2T.muted,
            marginTop: 16, lineHeight: 1.7, textWrap: 'pretty',
          }}>{V2_COPY.sub}</div>

          {/* 讲者条 */}
          <div style={{
            marginTop: 22, padding: '14px 14px',
            background: V2T.paperHi,
            border: `0.5px solid ${V2T.rule}`,
            borderRadius: 12,
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: `0 4px 14px ${V2T.skyDeep}55`,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 24, overflow: 'hidden',
              background: V2T.sky, position: 'relative', flexShrink: 0,
              boxShadow: `inset 0 0 0 2px ${V2T.gold}`,
            }}>
              <img src={A2.speaker} alt="" style={{
                position: 'absolute', width: '180%', height: '180%', objectFit: 'cover',
                objectPosition: '74% 36%', left: '-40%', top: '-22%',
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: V2T.mono, fontSize: 9.5, color: V2T.gold, letterSpacing: 2,
              }}>SPEAKER</div>
              <div style={{ fontFamily: V2T.serif, fontSize: 16, fontWeight: 800, color: V2T.navyDk, marginTop: 2 }}>
                {V2_COPY.speakerName} <span style={{ fontSize: 11, color: V2T.muted, fontWeight: 400, marginLeft: 4 }}>教授</span>
              </div>
              <div style={{ fontSize: 10.5, color: V2T.muted, marginTop: 1, lineHeight: 1.4 }}>
                西南交通大学 · 光电工程研究所
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SIX STARS · 六大满贯陈列 */}
      <div style={{ padding: '24px 22px 0', background: V2T.skyHi }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.gold, letterSpacing: 4, marginBottom: 10,
        }}>SIX · STAR · FINISHER</div>
        <div style={{ fontFamily: V2T.serif, fontSize: 19, fontWeight: 800, color: V2T.navyDk, letterSpacing: 0.8, lineHeight: 1.45 }}>
          所谓"六星"——<br/>
          六座城市，六条赛道，六次出发。
        </div>
        <div style={{
          marginTop: 14, padding: '14px 14px',
          background: V2T.paperHi, border: `0.5px solid ${V2T.rule}`, borderRadius: 14,
          boxShadow: `0 2px 10px ${V2T.skyDeep}30`,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {V2_COPY.sixCities.map((c, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
                padding: '8px 4px',
                borderRight: (i+1) % 3 !== 0 ? `0.5px dashed ${V2T.rule}` : 'none',
                borderBottom: i < 3 ? `0.5px dashed ${V2T.rule}` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <StarGlyph size={11} color={V2T.gold} />
                  <span style={{ fontFamily: V2T.mono, fontSize: 9, color: V2T.gold, letterSpacing: 1 }}>
                    0{i+1}
                  </span>
                </div>
                <div style={{ fontFamily: V2T.serif, fontSize: 15, fontWeight: 700, color: V2T.navyDk }}>{c}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS · 四组数字 */}
      <div style={{ padding: '24px 22px 26px', background: V2T.skyHi }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.trackDk, letterSpacing: 4, marginBottom: 10,
        }}>BY THE NUMBERS</div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
        }}>
          {V2_COPY.stats.map((s, i) => (
            <div key={i} style={{
              padding: '14px 14px',
              background: i === 0 ? V2T.navyDk : V2T.paperHi,
              color: i === 0 ? V2T.paperHi : V2T.ink,
              borderRadius: 14,
              border: i === 0 ? 'none' : `0.5px solid ${V2T.rule}`,
              position: 'relative', overflow: 'hidden',
              boxShadow: `0 2px 10px ${V2T.skyDeep}30`,
            }}>
              {i === 0 && <div style={{
                position: 'absolute', top: -8, right: -8, width: 60, height: 60, borderRadius: 30,
                background: `radial-gradient(circle, ${V2T.goldHi}66, transparent 70%)`,
              }} />}
              <div style={{
                fontFamily: V2T.serif, fontSize: 30, fontWeight: 900, letterSpacing: -0.5,
                lineHeight: 1, color: i === 0 ? V2T.goldHi : V2T.navyDk,
                display: 'flex', alignItems: 'baseline', gap: 4,
              }}>
                {s.num}
                <span style={{ fontSize: 12, fontWeight: 500, color: i === 0 ? V2T.skyHi : V2T.muted }}>{s.unit}</span>
              </div>
              <div style={{
                fontSize: 10.5, color: i === 0 ? V2T.skyHi : V2T.muted, marginTop: 6, letterSpacing: 0.5,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 10, fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 11.5,
          color: V2T.muted, lineHeight: 1.7, textWrap: 'pretty',
        }}>
          ※ 数字本身只是入口——真正打动我们的，是数字背后那些<u style={{ textDecorationColor: V2T.gold, textUnderlineOffset: 3 }}>普通的一天</u>。
        </div>
      </div>

      {/* 现场照片 · speaker */}
      <div style={{ padding: '0 22px' }}>
        <div style={{
          position: 'relative', borderRadius: 14, overflow: 'hidden',
          boxShadow: `0 8px 22px ${V2T.navyDk}33`,
        }}>
          <img src={A2.speaker} alt="" style={{
            width: '100%', height: 200, objectFit: 'cover', display: 'block',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, transparent 50%, rgba(15,40,85,0.7) 100%)',
          }} />
          <div style={{
            position: 'absolute', left: 14, bottom: 12, right: 14,
            color: V2T.paperHi,
          }}>
            <div style={{ fontFamily: V2T.mono, fontSize: 9.5, color: V2T.goldHi, letterSpacing: 2 }}>
              FIELD · 2026.04.25
            </div>
            <div style={{ fontFamily: V2T.serif, fontSize: 14, fontWeight: 700, marginTop: 2 }}>
              客厅亮起，赛道接上电视屏幕
            </div>
          </div>
        </div>
      </div>

      {/* 她坚持的事 · 6 件 */}
      <div style={{ padding: '24px 22px 0' }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.gold, letterSpacing: 4, marginBottom: 10,
        }}>SHE KEEPS DOING</div>
        <div style={{ fontFamily: V2T.serif, fontSize: 19, fontWeight: 800, color: V2T.navyDk, lineHeight: 1.5 }}>
          她"坚持"的，远不止跑步
        </div>
        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 12, color: V2T.muted,
          marginTop: 6, lineHeight: 1.7,
        }}>把它们放进日常里，放进很多个普通的一天里。</div>

        <div style={{ marginTop: 14 }}>
          {V2_COPY.habits.map((h, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '12px 0',
              borderBottom: i < V2_COPY.habits.length - 1 ? `0.5px solid ${V2T.rule}` : 'none',
            }}>
              <div style={{
                width: 26, flexShrink: 0,
                fontFamily: V2T.mono, fontSize: 11, color: V2T.gold, letterSpacing: 1, paddingTop: 2,
              }}>0{i+1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: V2T.serif, fontSize: 14, fontWeight: 700, color: V2T.navyDk, letterSpacing: 0.5 }}>
                  {h.k}
                </div>
                <div style={{ fontSize: 11.5, color: V2T.inkSoft, marginTop: 2, lineHeight: 1.6 }}>
                  {h.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 大金句 · 海报蓝渐变 */}
      <div style={{ padding: '24px 22px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${V2T.navyDk} 0%, ${V2T.navy} 50%, ${V2T.trackDk} 100%)`,
          padding: '28px 24px', borderRadius: 18, position: 'relative', overflow: 'hidden',
          color: V2T.paperHi,
        }}>
          <div style={{
            position: 'absolute', right: -20, top: -28, width: 130, height: 130, borderRadius: 65,
            background: `radial-gradient(circle, ${V2T.goldHi}33 0%, transparent 70%)`,
          }} />
          <TrackLines height={300} opacity={0.18} color="#ffffff" />
          <div style={{
            position: 'relative',
            fontFamily: V2T.serif, fontSize: 60, color: V2T.goldHi, lineHeight: 0.3, height: 22, opacity: 0.8,
          }}>"</div>
          <div style={{
            position: 'relative',
            fontFamily: V2T.serif, fontSize: 16.5, fontWeight: 500, lineHeight: 1.85, letterSpacing: 0.5,
            marginTop: 6, textWrap: 'balance', whiteSpace: 'pre-line',
          }}>{V2_COPY.q1}</div>
          <div style={{
            position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 20, paddingTop: 14, borderTop: `0.5px solid ${V2T.goldHi}55`,
          }}>
            <div style={{ fontFamily: V2T.mono, fontSize: 9.5, color: V2T.goldHi, letterSpacing: 2 }}>
              VOL.02 · 现场金句
            </div>
            <SixStars size={10} color={V2T.goldHi} gap={3} />
          </div>
        </div>
      </div>

      {/* 12 个专业 · 学科云 */}
      <div style={{ padding: '24px 22px 0' }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.trackDk, letterSpacing: 4, marginBottom: 10,
        }}>IN THE LIVING ROOM</div>
        <div style={{ fontFamily: V2T.serif, fontSize: 17, fontWeight: 800, color: V2T.navyDk, lineHeight: 1.5 }}>
          一个客厅里 · <span style={{ color: V2T.trackDk }}>12 个专业的思考</span>
        </div>
        <div style={{
          marginTop: 14,
          display: 'flex', flexWrap: 'wrap', gap: 6,
        }}>
          {V2_COPY.majors.map((m, i) => (
            <div key={i} style={{
              fontFamily: V2T.sans, fontSize: 11.5, color: V2T.navyDk,
              padding: '5px 11px', background: V2T.paperHi,
              border: `0.5px solid ${V2T.skyDeep}`,
              borderRadius: 16,
            }}>{m}</div>
          ))}
        </div>
        <div style={{
          fontSize: 12, color: V2T.inkSoft, marginTop: 14, lineHeight: 1.85, textWrap: 'pretty',
        }}>{V2_COPY.livingNote2}</div>
      </div>

      {/* 现场照片 · audience */}
      <div style={{ padding: '20px 22px 0' }}>
        <div style={{
          position: 'relative', borderRadius: 14, overflow: 'hidden',
          boxShadow: `0 8px 22px ${V2T.navyDk}33`,
        }}>
          <img src={A2.audience} alt="" style={{
            width: '100%', height: 200, objectFit: 'cover', display: 'block',
            filter: 'saturate(0.95)',
          }} />
        </div>
        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 11, color: V2T.muted,
          marginTop: 8, lineHeight: 1.6,
        }}>↑ 客厅夜场 · 不同阶段的学生、老师、朋友各一席</div>
      </div>

      {/* 收尾 */}
      <div style={{ padding: '26px 24px 14px' }}>
        <div style={{
          fontFamily: V2T.serif, fontSize: 18, fontWeight: 800, color: V2T.navyDk, lineHeight: 1.55,
        }}>
          {V2_COPY.closingTitle}<br/>
          <span style={{ color: V2T.gold }}>{V2_COPY.closingLine}</span>
        </div>
        <div style={{ fontSize: 12.5, color: V2T.inkSoft, lineHeight: 1.95, marginTop: 12, textWrap: 'pretty' }}>
          {V2_COPY.closingP}
        </div>
      </div>

      {/* 下一期 */}
      <div style={{ padding: '6px 22px 26px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${V2T.ember} 0%, #b8482e 100%)`,
          padding: '14px 16px', borderRadius: 14,
          color: V2T.paperHi, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: `0 6px 18px ${V2T.ember}55`,
        }}>
          <div>
            <div style={{ fontFamily: V2T.mono, fontSize: 9.5, opacity: 0.85, letterSpacing: 2 }}>
              {V2_COPY.ctaKicker}
            </div>
            <div style={{ fontFamily: V2T.serif, fontSize: 15, fontWeight: 800, marginTop: 3 }}>
              {V2_COPY.ctaTitle}
            </div>
            <div style={{ fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 10.5, opacity: 0.88, marginTop: 2 }}>
              {V2_COPY.ctaDate}
            </div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 18, background: V2T.paperHi, color: V2T.ember,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, flexShrink: 0,
          }}>→</div>
        </div>
      </div>
    </V2Phone>
  );
}

Object.assign(window, { Vol02DirA });
