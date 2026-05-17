// Screen 1 — Landing / theme intro · v3
// 设计理念沿用第二期；内容从 DCT_DATA.getCurrent() 读取。
//   v3 新增：在 hero 下加入「四个抛给讲者的问题」区块（来自海报）

const C = {
  ink: '#0f2855',
  navy: '#1a3a78',
  navySoft: '#2c5ca0',
  text: '#2a3d5c',
  textSoft: '#3d5f94',
  muted: '#55709a',
  mutedSoft: '#6b7a91',
  divider: '#e3e9f3',
  bg: '#f6f8fc',
  card: '#fff',
  gold: '#c9a24a',
  goldHi: '#e9b949',
  warmBg: '#fbf6ec',
  warmBg2: '#f5e8d0',
  warmInk: '#6b4c1e',
  warmText: '#8a6a2e',
};

// 三/四个分享侧面用到的图标
function PointIcon({ kind, color = C.gold, size = 22 }) {
  if (kind === 'syringe') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4l6 6" /><path d="M16.5 6.5l1-1" />
      <path d="M9 11l4 4-5 5-3-1-1-3 5-5z" /><path d="M11 13l4-4" />
    </svg>
  );
  if (kind === 'skinheart') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
      <path d="M9 12c1 1 2 1 3 0s2-1 3 0" />
    </svg>
  );
  if (kind === 'tangle') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
      <path d="M4 12c2-4 5-4 6 0s4 4 6 0 4-4 4 0" />
      <path d="M4 16c2-3 4-3 6 0s4 3 6 0 4-3 4 0" />
      <path d="M5 8c1.5-3 4-2 5 0s3 3 5 0" />
    </svg>
  );
  if (kind === 'self') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21V12a4 4 0 0 0-8 0v9" />
      <circle cx="12" cy="7" r="3" />
      <path d="M19 14h2M3 14h2" />
    </svg>
  );
  // legacy v2 icons
  if (kind === 'lanes') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 6h16 M4 12h16 M4 18h16" />
      <circle cx="8" cy="6" r="1.5" fill={color} stroke="none" />
      <circle cx="14" cy="12" r="1.5" fill={color} stroke="none" />
      <circle cx="18" cy="18" r="1.5" fill={color} stroke="none" />
    </svg>
  );
  if (kind === 'footprint') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4c1.5 0 2.5 1.5 2.5 4S10 12 9 12s-2.5-2-2.5-4S7.5 4 9 4z" />
      <circle cx="6" cy="15" r="1" fill={color} stroke="none" />
      <circle cx="8" cy="18" r="1" fill={color} stroke="none" />
      <path d="M15 8c1.2 0 2 1.2 2 3.2s-1.2 2.8-2 2.8-2-1.6-2-2.8S13.8 8 15 8z" />
      <circle cx="17" cy="17" r="1" fill={color} stroke="none" />
      <circle cx="19" cy="20" r="1" fill={color} stroke="none" />
    </svg>
  );
  if (kind === 'compass') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7l2 5-5 2 3-7z" fill={color} fillOpacity="0.18" />
      <circle cx="12" cy="12" r="1" fill={color} stroke="none" />
    </svg>
  );
  return null;
}

// 每期主题 → icon 列表（按 points 顺序）
const POINT_ICONS = {
  vol02: ['lanes', 'footprint', 'compass'],
  vol03: ['syringe', 'skinheart', 'tangle', 'self'],
};

function ScreenLanding({ go }) {
  const D = window.DCT_DATA;
  const cur = D.getCurrent();
  const issueKey = cur.id;
  const isV3 = issueKey === 'vol03';
  const icons = POINT_ICONS[issueKey] || [];

  // 滚动进度
  const scrollerRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [stickyVisible, setStickyVisible] = React.useState(false);
  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const t = max > 0 ? el.scrollTop / max : 0;
      setProgress(Math.max(0, Math.min(1, t)));
      setStickyVisible(el.scrollTop > 360);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={scrollerRef} style={{ background: C.bg, minHeight: '100%', height: '100%', overflowY: 'auto', position: 'relative' }}>
      {/* 顶部金色滚动进度条 */}
      <div style={{ position: 'sticky', top: 0, left: 0, right: 0, height: 1.5, zIndex: 100, background: 'transparent', pointerEvents: 'none' }}>
        <div style={{
          width: `${progress * 100}%`, height: '100%',
          background: `linear-gradient(90deg, ${C.gold} 0%, ${C.goldHi} 100%)`,
          boxShadow: `0 0 6px ${C.goldHi}`, transition: 'width 0.05s linear',
        }} />
      </div>

      {/* HERO · v3 用海报作题图；v2 用原本的标题块 */}
      {isV3 ? (
        <V3PosterHero cur={cur} />
      ) : (
        <PosterSky tone="light" style={{ minHeight: 460, paddingBottom: 28 }}>
          <WxHeader title="DCT 学术沙龙" transparent />

          <div style={{ padding: '14px 22px 0', position: 'relative' }}>
            <div className="mono" style={{
              fontSize: 11, letterSpacing: 4, color: '#1a3a78',
              opacity: 0.85, marginBottom: 12,
            }}>DCT · VOL.0{cur.number} · {cur.date}</div>

            <div className="serif" style={{
              fontSize: 52, fontWeight: 900, lineHeight: 1.02, color: '#0f2855',
              letterSpacing: 2, textShadow: '0 1px 0 rgba(255,255,255,0.6)',
            }}>{cur.title}</div>

            <div style={{
              marginTop: 16, display: 'flex', alignItems: 'flex-start', gap: 8,
              color: '#1a3a78', fontSize: 13, fontWeight: 500,
            }}>
              <div style={{ paddingTop: 4, flexShrink: 0 }}>
                <StarBullet size={10} color="#c9a24a" />
              </div>
              <div style={{ lineHeight: 1.55, textWrap: 'pretty' }}>{cur.subtitle}</div>
            </div>
            {cur.subtitle2 && cur.subtitle2 !== cur.subtitle && (
              <div style={{
                marginTop: 8, color: '#3d5f94', fontSize: 12.5, lineHeight: 1.55,
                paddingLeft: 18, textWrap: 'pretty',
              }}>
                {cur.subtitle2}
              </div>
            )}
          </div>

          {/* v2 speaker card inside hero */}
          <div style={{ padding: '32px 18px 0' }}>
            <div style={{
              background: 'rgba(255,255,255,0.78)',
              backdropFilter: 'blur(18px) saturate(160%)',
              WebkitBackdropFilter: 'blur(18px) saturate(160%)',
              border: '0.5px solid rgba(15,40,85,0.12)',
              borderRadius: 18, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: '0 8px 24px rgba(20,50,100,0.1)',
            }}>
              <SpeakerAvatar speaker={cur.speaker} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>主讲人</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f2855' }}>
                  {cur.speaker.name}
                  {cur.speaker.title && (
                    <span style={{ fontSize: 12, fontWeight: 400, color: '#55709a', marginLeft: 6 }}>
                      {cur.speaker.title}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 11.5, color: '#55709a', marginTop: 4, lineHeight: 1.5 }}>
                  {cur.speaker.bio}{cur.speaker.org && cur.speaker.bio ? ' · ' : ''}{cur.speaker.org}
                </div>
              </div>
            </div>
          </div>
        </PosterSky>
      )}

      {/* v3 专属 · 主讲人半身像卡（移出 hero） */}
      {isV3 && cur.speaker.photo && (
        <div style={{ padding: '20px 18px 0' }}>
          <SpeakerHero speaker={cur.speaker} />
        </div>
      )}

      {/* v3 副标题诗化两行（搬到海报下、主讲人卡上） */}
      {isV3 && (
        <div style={{ padding: '22px 22px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            color: '#1a3a78',
          }}>
            <div style={{ paddingTop: 5, flexShrink: 0 }}>
              <StarBullet size={11} color="#c9a24a" />
            </div>
            <div className="serif" style={{
              fontSize: 16, fontWeight: 600, lineHeight: 1.55,
              color: '#0f2855', textWrap: 'pretty',
            }}>
              {cur.subtitle}
              {cur.subtitle2 && cur.subtitle2 !== cur.subtitle && (
                <>
                  <br/>
                  <span style={{ color: '#3d5f94', fontWeight: 500 }}>{cur.subtitle2}</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* v3: 四个抛给讲者的问题（合并自原 "HE WILL SHARE / 冷思考"）—— 每题一句话注脚 */}
      {isV3 && cur.teaserQuestions && (
        <div style={{ padding: '26px 22px 0' }}>
          <div style={{
            background: 'linear-gradient(180deg, #0f2855 0%, #1a3a78 100%)',
            borderRadius: 18, padding: '20px 20px 22px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', right: -16, top: -16, width: 130, height: 130,
              borderRadius: 65, background: 'radial-gradient(circle, rgba(233,185,73,0.22) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', left: -20, bottom: -28, width: 110, height: 110,
              borderRadius: 55, background: 'radial-gradient(circle, rgba(233,185,73,0.10) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div className="mono" style={{
              fontSize: 10, letterSpacing: 3, color: '#e9b949', marginBottom: 8,
            }}>HE WILL SHARE · 当晚的四个问题</div>
            <div className="serif" style={{
              fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4, lineHeight: 1.3, letterSpacing: 1,
            }}>“医美热” 的 “冷思考”</div>
            <div style={{
              fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 16, lineHeight: 1.55,
            }}>当我们谈论变美时，我们在谈论什么？</div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {cur.teaserQuestions.map((item, i) => {
                const q = typeof item === 'string' ? item : item.q;
                const a = typeof item === 'string' ? '' : item.a;
                return (
                  <div key={i} style={{
                    padding: '14px 0 16px',
                    borderTop: '0.5px solid rgba(255,255,255,0.16)',
                  }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: a ? 8 : 0 }}>
                      <div className="mono" style={{
                        fontSize: 10, color: '#e9b949', fontWeight: 600, letterSpacing: 1, flexShrink: 0,
                      }}>Q.0{i + 1}</div>
                      <div className="serif" style={{
                        flex: 1, fontSize: 15.5, color: '#fff', fontWeight: 600, lineHeight: 1.4, letterSpacing: 0.3,
                      }}>{q}</div>
                    </div>
                    {a && (
                      <div style={{
                        paddingLeft: 30,
                        fontSize: 12.5, color: 'rgba(241,245,251,0.78)', lineHeight: 1.7, textWrap: 'pretty',
                      }}>{a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* OPENING PITCH */}
      <div style={{ padding: '26px 22px 0' }}>
        <div className="serif" style={{
          fontSize: 19, fontWeight: 500, color: '#0f2855', lineHeight: 1.65, letterSpacing: 0.5,
        }}>
          {isV3 ? (
            <>在“变得更好”这件热事上，<br />我们想保留一点“冷思考”。</>
          ) : (
            <>在学术里保持严谨，<br />在生活中追求热爱。</>
          )}
        </div>
        <div style={{
          fontSize: 13, color: '#3d5f94', marginTop: 14, lineHeight: 1.8, textWrap: 'pretty',
        }}>
          {isV3 ? (
            <>
              DCT 第三期，我们邀请到 <span style={{ color: '#0f2855', fontWeight: 500 }}>{cur.speaker.name}</span>——一位在华西临床与实验室之间往返的皮肤科医生，和我们一起重新理解“医美热”。
              <br /><br />
              医美当然关乎技术。光、电、注射......每一种手段背后都有真实的医学逻辑、适应证与风险边界——<span style={{ color: '#0f2855', fontWeight: 500 }}>它能改变什么，又不能承担什么</span>。
              <br /><br />
              医美也不只是技术。技术能改变的，是脸上可量化的部分；而“变美”的感受，从来不是单靠技术兑现的承诺。它同时牵动着审美标准、身体感受、情绪压力、消费选择，以及一个更隐秘的问题：<span style={{ color: '#0f2855', fontWeight: 500 }}>当我们想要改变自己的脸和身体时，我们真正想改变的是什么？</span>
              <br /><br />
              想变美并不浅薄。但在改变之前，也许可以先问：我想实现的，是谁的想象？这一次，我们不急着赞成，也不急着反对——我们想把“变美”这件事放回更大的语境里：医学如何参与审美，技术如何改变身体经验，而“变得更好”又是如何被想象、被定义、被追求的。
            </>
          ) : (
            <>DCT 第二期，我们很荣幸邀请到{cur.speaker.name}教授来到客厅，与我们分享她关于<span style={{ color: '#0f2855', fontWeight: 500 }}>目标、坚持与多重人生角色</span>的思考。</>
          )}
        </div>
      </div>

      {/* SHE/HE WILL SHARE · v2 专属（v3 已合并入上方"四问"） */}
      {!isV3 && (
      <div style={{ padding: '26px 22px 0' }}>
        <div className="mono" style={{
          fontSize: 11, color: '#55709a', letterSpacing: 3, marginBottom: 4,
        }}>HE WILL SHARE</div>
        <div className="serif" style={{ fontSize: 18, color: '#0f2855', fontWeight: 700, marginBottom: 14 }}>
          从真实经历出发，三个侧面
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cur.points.map((p, i) => (
            <div key={p.num} style={{
              background: C.card, borderRadius: 14, padding: '14px 16px',
              border: `0.5px solid ${C.divider}`,
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: 'rgba(201,162,74,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PointIcon kind={icons[i]} color={C.gold} size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
                  <div className="serif" style={{ fontSize: 15, fontWeight: 700, color: C.ink, lineHeight: 1.3 }}>
                    {p.title}
                  </div>
                  <div className="mono" style={{
                    fontSize: 10, color: C.gold, fontWeight: 600, letterSpacing: 1,
                  }}>{p.num}</div>
                </div>
                {p.sub && <div style={{ fontSize: 12, color: C.muted }}>{p.sub}</div>}
                <div style={{ fontSize: 12.5, color: C.textSoft, marginTop: 8, lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                  {p.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* v3: 留言墙预告 */}
      {isV3 && (
        <div style={{ padding: '24px 22px 0' }}>
          <div
            onClick={() => go('wall')}
            style={{
              background: '#fff', borderRadius: 16, padding: '14px 16px',
              border: '0.5px solid #e3e9f3', display: 'flex', gap: 14, alignItems: 'center',
              cursor: 'pointer',
            }}>
            <div style={{
              width: 56, height: 42, borderRadius: 6, flexShrink: 0,
              background: 'linear-gradient(135deg, #0f2855 0%, #1a3a78 100%)',
              padding: 4, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ height: 3, background: '#fff', borderRadius: 2, marginBottom: 3, opacity: 0.8 }} />
              <div style={{ height: 3, background: '#e9b949', borderRadius: 2, marginBottom: 3 }} />
              <div style={{ height: 3, background: '#fff', borderRadius: 2, marginBottom: 3, opacity: 0.6 }} />
              <div style={{ height: 3, background: '#e9b949', borderRadius: 2, opacity: 0.8 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, display: 'flex', alignItems: 'center', gap: 8 }}>
                现场电子留言墙 <span style={{
                  fontSize: 9, padding: '1px 6px', borderRadius: 4,
                  background: '#e9b949', color: '#3d2a08', letterSpacing: 1,
                  fontFamily: '"JetBrains Mono", monospace',
                }}>NEW</span>
              </div>
              <div style={{ fontSize: 11.5, color: C.mutedSoft, marginTop: 3, lineHeight: 1.5 }}>
                咖啡厅 TV 将滚动播放每位到场者的一句话身份与想问的问题
              </div>
            </div>
            <svg width="8" height="14" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="#a0acc0" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
          </div>
        </div>
      )}

      {/* EVENT INFO */}
      <div style={{ padding: '22px 22px 0' }}>
        <div className="mono" style={{
          fontSize: 11, color: '#55709a', letterSpacing: 3, marginBottom: 10,
        }}>WHEN · WHERE · HOW</div>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '16px 18px',
          border: '0.5px solid #e3e9f3',
        }}>
          <InfoRow label="时间" value={cur.dateText} sub={cur.timeDetail} />
          <Sep />
          <InfoRow label="地点" value={cur.location} sub={cur.locationNote} />
          <Sep />
          <InfoRow label="入场" value={cur.price} sub={cur.priceNote} />
        </div>
      </div>

      {/* SEASONAL MENU */}
      <div style={{ padding: '22px 22px 0' }}>
        <div className="mono" style={{
          fontSize: 11, color: '#55709a', letterSpacing: 3, marginBottom: 10,
        }}>{isV3 ? 'DCT MENU · FOR SALON #3' : 'EARLY SUMMER · LIMITED'}</div>
        <div style={{
          background: 'linear-gradient(135deg, #fbf6ec 0%, #f5e8d0 100%)',
          borderRadius: 16, padding: '16px 18px',
          border: '0.5px solid #e8dcc0',
        }}>
          <div className="serif" style={{ fontSize: 17, fontWeight: 700, color: C.warmInk, lineHeight: 1.35 }}>
            {isV3 ? '陌生的朋友 · 联名菜单' : '初夏季节限定'}
          </div>
          <div style={{ fontSize: 12, color: C.warmText, marginTop: 4, fontStyle: 'italic' }}>
            {isV3 ? 'Curated for salon #3, by Strangers' : 'Mulberry season, from Panzhihua'}
          </div>
          <div style={{
            marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 100,
            background: 'rgba(107,76,30,0.08)', border: '0.5px solid rgba(107,76,30,0.18)',
            fontSize: 11.5, color: C.warmInk, letterSpacing: 0.3,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.warmInk} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 5v8a3 3 0 0 0 3 3v5" /><path d="M11 5v5" /><path d="M8 5v5" /><path d="M16 5c-1.5 0-2 1.5-2 4s.5 4 2 4v8" />
            </svg>
            本期不含正餐 · 建议先吃晚饭再来
          </div>
          <div style={{ height: 0.5, background: '#e0d2b0', margin: '14px 0 12px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {cur.menu.map(m => <MenuRow key={m.name} name={m.name} tag={m.tag} />)}
          </div>
          {cur.menuFootnote && (
            <div style={{
              fontSize: 11.5, color: C.warmText, marginTop: 12, lineHeight: 1.55, fontStyle: 'italic',
            }}>{cur.menuFootnote}</div>
          )}

          {/* v3: Gia 制作小卡（CHG-20260517-02 删掉「主题饮品打样」副行——本期饮品已定，无需再说打样中） */}
          {isV3 && (
            <div style={{
              marginTop: 14, padding: '12px 14px',
              borderRadius: 12,
              background: 'rgba(107,76,30,0.06)',
              border: '0.5px dashed rgba(107,76,30,0.28)',
              display: 'flex', gap: 12, alignItems: 'center',
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 13, flexShrink: 0,
                background: 'linear-gradient(135deg, #c9a24a 0%, #e9b949 100%)',
                color: '#fff', fontSize: 12, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Noto Serif SC", serif',
                boxShadow: '0 2px 6px rgba(107,76,30,0.25)',
              }}>G</div>
              <div style={{ flex: 1, fontSize: 12, color: C.warmInk, lineHeight: 1.65, fontWeight: 600 }}>
                甜品仍由 Gia 制作 ✦
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WHAT IS DCT */}
      <div style={{ padding: '26px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <img src="assets/logo.png" alt="DCT" style={{ width: 48, height: 48, borderRadius: 24, flexShrink: 0 }} />
          <div>
            <div className="mono" style={{ fontSize: 10.5, color: '#55709a', letterSpacing: 3 }}>
              WHAT IS DCT ?
            </div>
            <div className="serif" style={{ fontSize: 19, fontWeight: 700, color: '#0f2855', lineHeight: 1.25, marginTop: 2 }}>
              认真地胡思乱想
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12.5, color: '#3d5f94', fontStyle: 'italic', lineHeight: 1.65 }}>
          ——用科学的态度，聊天马行空的奇思妙想
        </div>
        <div style={{ fontSize: 11.5, color: '#6b7a91', marginTop: 6, letterSpacing: 0.3 }}>
          Doctors' Crazy Thinking · Dog, Chef & Therapist
        </div>
        <div style={{
          fontSize: 13, color: '#2a3d5c', marginTop: 14, lineHeight: 1.75, textWrap: 'pretty',
        }}>
          {isV3 ? (
            <>本期我们走出客厅，去到「陌生的朋友」咖啡厅。医美看似是一个关于脸和皮肤的话题，但它背后连接着<span style={{ color: '#0f2855', fontWeight: 500 }}>医学技术、消费社会、审美秩序和每个人与自己的关系</span>。DCT 想做的，正是在这些看似日常的问题里，保留一点认真追问的空间。</>
          ) : (
            <>一个家庭学术沙龙。在绩效逻辑之外，留一块真诚分享、自由交流、严肃思考的精神自留地。<br />在客厅里聊学术，也聊生活；聊目标，也聊热爱。</>
          )}
        </div>
        <div className="serif" style={{
          fontSize: 14, color: '#1a3a78', marginTop: 14, fontWeight: 600, letterSpacing: 0.5,
        }}>
          期待和你一起，建设这块精神自留地。
        </div>
      </div>

      {/* BAR RULES (collapsed hint) */}
      <div style={{ padding: '20px 22px 0' }}>
        <div
          onClick={() => go('detail')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', background: '#fff', borderRadius: 14,
            border: '0.5px solid #e3e9f3',
          }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0f2855' }}>活动须知与 DCT · 吧规</div>
            <div style={{ fontSize: 11.5, color: '#6b7a91', marginTop: 2 }}>报名前建议先读一下</div>
          </div>
          <svg width="8" height="14" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="#a0acc0" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 18px 88px' }}>
        <button
          onClick={() => go('form')}
          style={{
            width: '100%', height: 52, borderRadius: 26,
            background: `linear-gradient(180deg, ${C.navySoft} 0%, ${C.navy} 100%)`,
            color: '#fff', border: 'none',
            fontSize: 16, fontWeight: 600, letterSpacing: 4,
            fontFamily: '"Noto Sans SC", system-ui',
            boxShadow: '0 8px 22px rgba(26,58,120,0.32)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
          <StarBullet size={12} color={C.goldHi} />
          报名参加第{cur.number === 3 ? '三' : '二'}期
          <StarBullet size={12} color={C.goldHi} />
        </button>
        <div style={{
          marginTop: 10, textAlign: 'center', fontSize: 11.5, color: C.mutedSoft,
        }}>我们会根据学科背景与意愿综合筛选，<span style={{ color: C.navySoft }}>24 小时内回复</span></div>
      </div>

      {/* 吸底浮动 CTA */}
      <div style={{
        position: 'sticky', bottom: 0, left: 0, right: 0,
        marginTop: -76, pointerEvents: 'none', zIndex: 80,
      }}>
        <div style={{
          padding: '10px 16px 18px',
          opacity: stickyVisible ? 1 : 0,
          transform: stickyVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: stickyVisible ? 'auto' : 'none',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: `0.5px solid ${C.divider}`,
            borderRadius: 30,
            padding: '8px 8px 8px 18px',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 12px 30px rgba(15,40,85,0.18)',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="mono" style={{ fontSize: 11, color: C.muted, lineHeight: 1.2, letterSpacing: 1 }}>
                VOL.0{cur.number} · {cur.date.replace('2026.', '')}
              </div>
              <div className="serif" style={{ fontSize: 15, color: C.ink, fontWeight: 700, lineHeight: 1.2, marginTop: 2 }}>
                {cur.price.replace(' ', '')}
                <span style={{ fontSize: 11, fontWeight: 400, color: C.muted, marginLeft: 6 }}>含甜品+饮品</span>
              </div>
            </div>
            <button
              onClick={() => go('form')}
              style={{
                height: 44, padding: '0 22px', borderRadius: 22, border: 'none',
                background: `linear-gradient(180deg, ${C.navySoft} 0%, ${C.navy} 100%)`,
                color: '#fff', fontSize: 14, fontWeight: 600, letterSpacing: 2,
                fontFamily: '"Noto Sans SC", system-ui',
                boxShadow: '0 4px 12px rgba(26,58,120,0.36)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
              <StarBullet size={10} color={C.goldHi} />
              立即报名
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function V3PosterHero({ cur }) {
  // 海报作为最顶部题图：full-bleed poster + 顶部 WxHeader 浮于其上 + 底部柔和过渡
  return (
    <div style={{
      position: 'relative',
      background: '#0c1f3d',
      overflow: 'hidden',
    }}>
      {/* 顶部小程序导航条 · 透明 + 深色配色 */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30 }}>
        <WxHeader title="DCT 学术沙龙" transparent dark logo={false} />
      </div>

      {/* 海报本体 */}
      <div style={{
        position: 'relative',
        aspectRatio: '1086 / 1448',
        background: '#0c1f3d',
      }}>
        <img
          src={cur.poster}
          alt={`第${cur.number}期海报 · ${cur.title}`}
          style={{
            width: '100%', height: '100%', display: 'block', objectFit: 'cover',
          }}
        />
        {/* 底部柔和渐隐 · 让下一区块顺接 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(180deg, transparent 0%, #f6f8fc 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* 海报底脚小字 · 长按保存提示 */}
      <div style={{
        padding: '10px 22px 14px',
        background: '#f6f8fc',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12,
      }}>
        <div className="mono" style={{
          fontSize: 10.5, color: '#55709a', letterSpacing: 3,
        }}>DCT · VOL.0{cur.number} · {cur.date}</div>
        <div style={{
          fontSize: 11, color: '#8496b3', letterSpacing: 0.3,
        }}>
          长按海报可保存 / 转发
        </div>
      </div>
    </div>
  );
}

function SpeakerHero({ speaker }) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 18, overflow: 'hidden',
      background: 'linear-gradient(135deg, #0c1f3d 0%, #14305a 55%, #1a3a78 100%)',
      boxShadow: '0 20px 40px rgba(10,25,55,0.32), 0 0 0 0.5px rgba(255,255,255,0.08) inset',
      minHeight: 240,
      display: 'flex',
      isolation: 'isolate',
    }}>
      {/* 装饰 — 漂浮金色星点 */}
      <Star4 x={12} y={14} s={10} o={0.6} />
      <Star4 x={26} y={84} s={7} o={0.4} />

      {/* 左：文字 */}
      <div style={{
        flex: 1, minWidth: 0, padding: '20px 4px 20px 22px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 2,
      }}>
        <div className="mono" style={{
          fontSize: 10, letterSpacing: 3, color: '#e9b949', marginBottom: 8, fontWeight: 500,
        }}>SPEAKER · 主讲人</div>

        <div className="serif" style={{
          fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: 2, lineHeight: 1.1,
        }}>{speaker.name}</div>
        {speaker.title && (
          <div className="mono" style={{
            fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4, letterSpacing: 2,
          }}>{speaker.title}</div>
        )}

        <div style={{
          marginTop: 16, padding: '10px 12px 10px 14px',
          borderLeft: '2px solid #e9b949',
          background: 'linear-gradient(90deg, rgba(233,185,73,0.10) 0%, rgba(233,185,73,0) 100%)',
        }}>
          <div className="serif" style={{
            fontSize: 13.5, color: '#fff', fontWeight: 500, lineHeight: 1.45,
          }}>{speaker.bio}</div>
          {speaker.org && (
            <div style={{
              fontSize: 11, color: 'rgba(255,255,255,0.62)', marginTop: 4, lineHeight: 1.5,
            }}>{speaker.org}</div>
          )}
        </div>
      </div>

      {/* 右：半身像 */}
      <div style={{
        width: 168, flexShrink: 0,
        position: 'relative', alignSelf: 'stretch',
      }}>
        {/* 左侧渐隐：让人像融进深蓝背景 */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(90deg, rgba(12,31,61,0.92) 0%, rgba(12,31,61,0.35) 22%, rgba(12,31,61,0) 50%)',
          pointerEvents: 'none',
        }} />
        <img
          src={speaker.photo}
          alt={speaker.name}
          style={{
            width: '100%', height: '100%', display: 'block', objectFit: 'cover',
            objectPosition: '54% 8%',
          }}
        />
      </div>
    </div>
  );
}

function SpeakerAvatar({ speaker }) {
  // 没有真实头像时用占位 monogram
  if (speaker.avatar) {
    return (
      <div style={{
        width: 56, height: 56, borderRadius: 28, flexShrink: 0,
        overflow: 'hidden', background: '#e4edf7',
        border: '1.5px solid rgba(255,255,255,0.9)',
        boxShadow: '0 2px 8px rgba(15,40,85,0.15)',
      }}>
        <img src={speaker.avatar} alt={speaker.name} style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: '60% 40%', display: 'block',
        }} />
      </div>
    );
  }
  // 占位：渐变 + 大字
  return (
    <div style={{
      width: 56, height: 56, borderRadius: 28, flexShrink: 0,
      background: 'linear-gradient(135deg, #0f2855 0%, #2c5ca0 100%)',
      border: '1.5px solid rgba(255,255,255,0.9)',
      boxShadow: '0 2px 8px rgba(15,40,85,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="serif" style={{
        fontSize: 22, fontWeight: 700, color: '#fff', opacity: 0.92,
      }}>{speaker.name?.[0] || '?'}</div>
      <div style={{
        position: 'absolute', bottom: -1, right: -1,
        background: '#e9b949', color: '#3d2a08',
        padding: '0 4px', fontSize: 8, letterSpacing: 0.5,
        borderTopLeftRadius: 4, fontFamily: '"JetBrains Mono", monospace',
      }}>头像后补</div>
    </div>
  );
}

function MenuRow({ name, tag }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <StarBullet size={9} color="#b8903a" />
      <div className="serif" style={{ fontSize: 14, color: '#5a3f14', fontWeight: 600, flex: 1 }}>{name}</div>
      <div className="mono" style={{ fontSize: 10.5, color: '#8a6a2e', letterSpacing: 1 }}>{tag}</div>
    </div>
  );
}

function InfoRow({ label, value, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '4px 0' }}>
      <div className="mono" style={{ fontSize: 11, color: '#8496b3', letterSpacing: 2, width: 34, paddingTop: 3 }}>{label}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14.5, color: '#0f2855', fontWeight: 500 }}>{value}</div>
        {sub && <div style={{ fontSize: 11.5, color: '#6b7a91', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Sep() { return <div style={{ height: 0.5, background: '#e9eef6', margin: '10px 0' }} />; }

Object.assign(window, { ScreenLanding });
