// vol02-dirC.jsx — 方向 C · 一万公里（Big Numbers · Editorial）
// 调性：极简编辑设计——把数字当作诗排版
// 几乎没有装饰，纯类型 + 大量留白 + 一点点跑道线 + 6 颗金星

function Vol02DirC() {
  // 数字诗 · 大字
  const BigNum = ({ num, unit, label, accent = false }) => (
    <div style={{
      padding: '22px 0 18px',
      borderBottom: `0.5px solid ${V2T.rule}`,
      display: 'flex', alignItems: 'baseline', gap: 14,
    }}>
      <div style={{
        fontFamily: V2T.serif, fontSize: 64, fontWeight: 900, letterSpacing: -2,
        lineHeight: 0.9, color: accent ? V2T.gold : V2T.navyDk,
        flexShrink: 0, minWidth: 110, textAlign: 'right',
      }}>{num}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: V2T.serif, fontSize: 14, color: V2T.navyDk, fontWeight: 600,
        }}>{unit}</div>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.muted, marginTop: 6,
          letterSpacing: 1.5,
        }}>{label}</div>
      </div>
    </div>
  );

  return (
    <V2Phone height={2240} bg={V2T.paperHi} color={V2T.ink}>
      <V2Header />

      {/* 简洁标题区 */}
      <div style={{ padding: '36px 28px 24px', position: 'relative' }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.gold, letterSpacing: 5,
        }}>DCT · VOL.02 · 回顾</div>
        <div style={{
          width: 24, height: 1, background: V2T.gold, margin: '14px 0',
        }} />
        <div style={{
          fontFamily: V2T.serif, fontSize: 30, fontWeight: 900, color: V2T.navyDk,
          lineHeight: 1.3, letterSpacing: 1, textWrap: 'balance',
        }}>
          一份关于<br/>
          "坚持"的<span style={{ color: V2T.gold }}>原始数据</span>
        </div>
        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 13, color: V2T.muted,
          marginTop: 14, lineHeight: 1.7, textWrap: 'pretty',
        }}>
          高晓蓉教授 · 西南交通大学 · 马拉松六星跑者<br/>
          —— 2026 年 4 月 25 日，于 DCT 客厅
        </div>
      </div>

      {/* 6 颗大星 · 六大满贯 */}
      <div style={{ padding: '0 28px 22px' }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.muted, letterSpacing: 3, marginBottom: 14,
        }}>SIX · STAR · FINISHER</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          {V2_COPY.sixCities.map((c, i) => (
            <div key={i} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}>
              <StarGlyph size={22} color={V2T.gold} />
              <div style={{
                fontFamily: V2T.serif, fontSize: 9.5, fontWeight: 700, color: V2T.navyDk,
                letterSpacing: 0.5, writingMode: 'horizontal-tb',
              }}>{c}</div>
            </div>
          ))}
        </div>
        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 11.5, color: V2T.muted, marginTop: 6, lineHeight: 1.6,
        }}>东京 · 波士顿 · 伦敦 · 柏林 · 芝加哥 · 纽约</div>
      </div>

      {/* 数字诗 · 主体 */}
      <div style={{
        margin: '0 22px', padding: '8px 18px 8px',
        background: V2T.skyHi, borderRadius: 16,
      }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.trackDk, letterSpacing: 4,
          paddingTop: 18, paddingBottom: 4,
        }}>BY THE NUMBERS</div>
        <BigNum num="10,000" unit="公里" label="累计跑步里程 · 一段日常的副产物" accent />
        <BigNum num="1,314" unit="次" label="记录里的跑步次数" />
        <BigNum num="6" unit="座城市 / 六条赛道" label="WMM · 东京·波士顿·伦敦·柏林·芝加哥·纽约" />
        <BigNum num="12" unit="个专业" label="那晚客厅里的不同声音" />
        <div style={{ height: 4 }} />
      </div>

      {/* 一段引文 · 极简白底 */}
      <div style={{ padding: '36px 30px 0', textAlign: 'center' }}>
        <div style={{
          fontFamily: V2T.serif, fontSize: 56, color: V2T.gold, lineHeight: 0.4, height: 18,
        }}>"</div>
        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 18, fontWeight: 600, color: V2T.navyDk,
          lineHeight: 1.85, marginTop: 14, textWrap: 'balance',
        }}>{V2_COPY.q3.split('\n')[0]}<br/>
          <span style={{ color: V2T.gold }}>{V2_COPY.q3.split('\n')[1]}</span>
        </div>
        <div style={{
          width: 40, height: 1, background: V2T.muted, margin: '22px auto 0',
        }} />
        <div style={{
          fontFamily: V2T.mono, fontSize: 9.5, color: V2T.muted, letterSpacing: 2, marginTop: 8,
        }}>VOL.02 · 编辑笔记</div>
      </div>

      {/* 一张大照片 · 海报或讲者 */}
      <div style={{ padding: '32px 22px 0' }}>
        <div style={{
          position: 'relative', borderRadius: 4, overflow: 'hidden',
          aspectRatio: '3/4', maxHeight: 420,
        }}>
          <img src={A2.poster} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: '50% 30%',
          }} />
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 8,
          fontFamily: V2T.mono, fontSize: 9.5, color: V2T.muted, letterSpacing: 1.5,
        }}>
          <span>FIG. 01 — POSTER · DCT VOL.02</span>
          <span>P. 02</span>
        </div>
      </div>

      {/* 6 件日常 · 极简列表 */}
      <div style={{ padding: '36px 28px 0' }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.gold, letterSpacing: 4, marginBottom: 12,
        }}>SHE KEEPS DOING</div>
        <div style={{
          fontFamily: V2T.serif, fontSize: 19, fontWeight: 800, color: V2T.navyDk,
          lineHeight: 1.5, marginBottom: 18,
        }}>她不止跑了 10,000 公里</div>

        {V2_COPY.habits.map((h, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '32px 1fr',
            padding: '13px 0', borderTop: i === 0 ? `1px solid ${V2T.navyDk}` : 'none',
            borderBottom: `0.5px solid ${V2T.rule}`,
            alignItems: 'center', gap: 14,
          }}>
            <div style={{
              fontFamily: V2T.mono, fontSize: 12, color: V2T.gold,
              letterSpacing: 1, fontWeight: 600,
            }}>0{i+1}</div>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10,
            }}>
              <div style={{ fontFamily: V2T.serif, fontSize: 14.5, fontWeight: 700, color: V2T.navyDk }}>
                {h.k}
              </div>
              <div style={{
                fontSize: 10, color: V2T.muted, textAlign: 'right', lineHeight: 1.5,
                flex: 1, minWidth: 0, paddingLeft: 8,
              }}>{h.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 大段引文 · 海报蓝 */}
      <div style={{ padding: '36px 22px 0' }}>
        <div style={{
          background: V2T.navyDk, color: V2T.paperHi,
          padding: '32px 26px', position: 'relative', overflow: 'hidden',
          borderRadius: 4,
        }}>
          <TrackLines height={300} opacity={0.15} color="#ffffff" />
          <div style={{
            position: 'relative',
            fontFamily: V2T.mono, fontSize: 10, color: V2T.goldHi, letterSpacing: 4,
          }}>EPIGRAPH</div>
          <div style={{
            position: 'relative',
            fontFamily: V2T.serif, fontSize: 19, fontWeight: 500, lineHeight: 1.85,
            marginTop: 14, letterSpacing: 0.5, whiteSpace: 'pre-line', textWrap: 'balance',
          }}>{V2_COPY.q1}</div>
          <div style={{
            position: 'relative',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22,
            paddingTop: 14, borderTop: `0.5px solid ${V2T.goldHi}44`,
          }}>
            <div style={{ fontFamily: V2T.mono, fontSize: 9.5, color: V2T.goldHi, letterSpacing: 2 }}>
              · VOL.02 · 编辑划重点
            </div>
            <SixStars size={10} color={V2T.goldHi} gap={3} />
          </div>
        </div>
      </div>

      {/* 12 个专业 · 极简 */}
      <div style={{ padding: '36px 28px 0' }}>
        <div style={{
          fontFamily: V2T.mono, fontSize: 10, color: V2T.gold, letterSpacing: 4, marginBottom: 14,
        }}>12 · MAJORS · IN · ONE · ROOM</div>
        <div style={{
          fontFamily: V2T.serif, fontSize: 16, fontWeight: 600, color: V2T.navyDk,
          lineHeight: 2, textWrap: 'pretty',
        }}>
          {V2_COPY.majors.map((m, i) => (
            <span key={i} style={{
              display: 'inline-block', marginRight: 14,
              borderBottom: `0.5px solid ${V2T.gold}`,
            }}>{m}</span>
          ))}
        </div>
        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 12, color: V2T.muted,
          marginTop: 18, lineHeight: 1.85, textWrap: 'pretty',
        }}>{V2_COPY.livingNote2}</div>
      </div>

      {/* 一张暖色照片 · 收尾前的呼吸 */}
      <div style={{
        margin: '32px 22px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6,
      }}>
        <img src={A2.candle} alt="" style={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: '50% 50%' }} />
        <img src={A2.audience} alt="" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
        <div style={{
          gridColumn: 'span 2',
          fontFamily: V2T.mono, fontSize: 9.5, color: V2T.muted, letterSpacing: 1.5,
          display: 'flex', justifyContent: 'space-between', marginTop: 2,
        }}>
          <span>FIG. 02 — 烛光 · 莓果蛋糕</span>
          <span>FIG. 03 — 客厅 · 12 人</span>
        </div>
      </div>

      {/* 收尾 */}
      <div style={{ padding: '38px 28px 18px' }}>
        <div style={{
          fontFamily: V2T.serif, fontSize: 21, fontWeight: 800, color: V2T.navyDk, lineHeight: 1.5, letterSpacing: 0.5,
        }}>
          {V2_COPY.closingTitle}<br/>
          <span style={{ color: V2T.gold, fontStyle: 'italic' }}>{V2_COPY.closingLine}</span>
        </div>
        <div style={{ fontSize: 12.5, color: V2T.inkSoft, lineHeight: 1.95, marginTop: 14, textWrap: 'pretty' }}>
          {V2_COPY.closingP}
        </div>
      </div>

      {/* 下一期 · 描边版本（极简） */}
      <div style={{ padding: '4px 22px 28px' }}>
        <div style={{
          padding: '14px 16px',
          border: `1px solid ${V2T.navyDk}`,
          borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: V2T.mono, fontSize: 9.5, color: V2T.gold, letterSpacing: 2 }}>
              {V2_COPY.ctaKicker}
            </div>
            <div style={{ fontFamily: V2T.serif, fontSize: 15, fontWeight: 800, marginTop: 3, color: V2T.navyDk }}>
              {V2_COPY.ctaTitle}
            </div>
            <div style={{ fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 10.5, color: V2T.muted, marginTop: 2 }}>
              {V2_COPY.ctaDate}
            </div>
          </div>
          <div style={{
            fontFamily: V2T.serif, fontSize: 20, color: V2T.navyDk,
          }}>→</div>
        </div>
      </div>
    </V2Phone>
  );
}

Object.assign(window, { Vol02DirC });
