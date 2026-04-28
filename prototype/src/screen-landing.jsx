// Screen 1 — Landing / theme intro
// Hero: poster-derived sky with 六星之路 title, then speaker card, opening pitch,
// three key talking points, event info, seasonal menu, DCT intro, rules link, CTA.
//
// CHG-20260428-02:
//   · 滚动进度条（顶部 1.5px 金色 progress）
//   · 吸底浮动 CTA（hero 滚出后出现）
//   · Hero 肖像缩到 120px、标题独享呼吸
//   · 三个 points 加 SVG 单色 stroke 图标
//   · 季节限定 chip（不含正餐）
//   · 主页颜色 token 化（C 对象）

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

const POINTS = [
  {
    num: '01',
    title: '人生不是单一赛道',
    sub: '多重身份的平衡与深耕',
    body: '学者的严谨、管理者的务实、公益者的温度、跑者的坚韧——如何在其中探索更完整的自我。',
    icon: 'lanes',
  },
  {
    num: '02',
    title: '用脚步丈量世界',
    sub: '坚持的力量',
    body: '从日复一日的训练，到走上世界马拉松大满贯「六星跑者」之路——10000 公里，究竟意味着什么？',
    icon: 'footprint',
  },
  {
    num: '03',
    title: '笃定前行',
    sub: '目标与生活的无限可能',
    body: '关于个人年度目标管理，如何让期待落地、让计划发生——她的实践哲学。',
    icon: 'compass',
  },
];

function PointIcon({ kind, color = C.gold, size = 22 }) {
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

function ScreenLanding({ go }) {
  // ① 滚动进度（占当前 viewport 内可见范围 0-1）
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
      // 滚出 hero（≈440px）后出现吸底 CTA
      setStickyVisible(el.scrollTop > 360);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  const points = POINTS;

  return (
    <div ref={scrollerRef} style={{ background: C.bg, minHeight: '100%', height: '100%', overflowY: 'auto', position: 'relative' }}>
      {/* ① 顶部金色滚动进度条 */}
      <div style={{
        position: 'sticky', top: 0, left: 0, right: 0, height: 1.5, zIndex: 100,
        background: 'transparent', pointerEvents: 'none',
      }}>
        <div style={{
          width: `${progress * 100}%`, height: '100%',
          background: `linear-gradient(90deg, ${C.gold} 0%, ${C.goldHi} 100%)`,
          boxShadow: `0 0 6px ${C.goldHi}`,
          transition: 'width 0.05s linear',
        }} />
      </div>

      {/* HERO */}
      <PosterSky tone="light" style={{ minHeight: 440, paddingBottom: 28 }}>
        <WxHeader title="DCT 学术沙龙" transparent />

        <div style={{ padding: '14px 22px 0', position: 'relative', display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 11, letterSpacing: 4, color: '#1a3a78',
              fontFamily: '"JetBrains Mono", monospace', opacity: 0.85, marginBottom: 10,
            }}>DCT · VOL.02 · 2026.04.25</div>

            <div className="serif" style={{
              fontSize: 52, fontWeight: 900, lineHeight: 1.02, color: '#0f2855',
              letterSpacing: 2, textShadow: '0 1px 0 rgba(255,255,255,0.6)',
            }}>
              六星<br />之路
            </div>

            <div style={{
              marginTop: 14, display: 'flex', alignItems: 'center', gap: 8,
              color: '#1a3a78', fontSize: 13, fontWeight: 500,
            }}>
              <StarBullet size={10} color="#c9a24a" />
              <span>目标管理与坚持哲学</span>
            </div>
            <div style={{
              marginTop: 6, color: '#3d5f94', fontSize: 11.5, letterSpacing: 0.3,
            }}>——写给学术追梦人的漫谈</div>
          </div>

          <div style={{ width: 138, flexShrink: 0, marginTop: -4, marginRight: -10 }}>
            <div style={{
              position: 'relative', borderRadius: 18, overflow: 'hidden',
              boxShadow: '0 10px 24px rgba(15,40,85,0.22), 0 0 0 3px rgba(255,255,255,0.9)',
              aspectRatio: '7 / 10',
            }}>
              <img src="assets/gao-portrait.jpg" alt="高晓蓉教授" style={{
                width: '100%', height: '100%', display: 'block', objectFit: 'cover',
                objectPosition: '50% 20%',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(231,240,250,0) 55%, rgba(15,40,85,0.18) 100%)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        </div>

        {/* speaker card floating at bottom of hero */}
        <div style={{ padding: '40px 18px 0' }}>
          <div style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(18px) saturate(160%)',
            WebkitBackdropFilter: 'blur(18px) saturate(160%)',
            border: '0.5px solid rgba(15,40,85,0.12)',
            borderRadius: 18, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 8px 24px rgba(20,50,100,0.1)',
          }}>
            <div style={{
              width: 54, height: 54, borderRadius: 27, flexShrink: 0,
              overflow: 'hidden', background: '#e4edf7',
              border: '1.5px solid rgba(255,255,255,0.9)',
              boxShadow: '0 2px 8px rgba(15,40,85,0.15)',
            }}>
              <img src="assets/gao-avatar-poster.png" alt="高晓蓉教授" style={{
                width: '100%', height: '100%', objectFit: 'cover',
                objectPosition: '60% 40%', display: 'block',
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#0f2855' }}>
                高晓蓉 <span style={{ fontSize: 12, fontWeight: 400, color: '#55709a' }}>教授</span>
              </div>
              <div style={{ fontSize: 11.5, color: '#55709a', marginTop: 3, lineHeight: 1.45 }}>
                西南交通大学光电工程研究所<br />
                马拉松六星跑者 “Six Star Finisher”
              </div>
            </div>
          </div>
        </div>
      </PosterSky>

      {/* OPENING PITCH — poetic intro */}
      <div style={{ padding: '26px 22px 0' }}>
        <div className="serif" style={{
          fontSize: 19, fontWeight: 500, color: '#0f2855', lineHeight: 1.65, letterSpacing: 0.5,
        }}>
          在学术里保持严谨，<br />
          在生活中追求热爱。
        </div>
        <div style={{
          fontSize: 13, color: '#3d5f94', marginTop: 14, lineHeight: 1.8, textWrap: 'pretty',
        }}>
          DCT 第二期，我们很荣幸邀请到高晓蓉教授来到客厅，与我们分享她关于<span style={{ color: '#0f2855', fontWeight: 500 }}>目标、坚持与多重人生角色</span>的思考。
        </div>
      </div>

      {/* THREE POINTS — what she will share */}
      <div style={{ padding: '26px 22px 0' }}>
        <div style={{
          fontSize: 11, color: '#55709a', letterSpacing: 3,
          fontFamily: '"JetBrains Mono", monospace', marginBottom: 4,
        }}>SHE WILL SHARE</div>
        <div className="serif" style={{ fontSize: 18, color: '#0f2855', fontWeight: 700, marginBottom: 14 }}>
          从真实经历出发，三个侧面
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {points.map(p => (
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
                <PointIcon kind={p.icon} color={C.gold} size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2,
                }}>
                  <div className="serif" style={{ fontSize: 15, fontWeight: 700, color: C.ink, lineHeight: 1.3 }}>
                    {p.title}
                  </div>
                  <div className="mono" style={{
                    fontSize: 10, color: C.gold, fontWeight: 600, letterSpacing: 1,
                  }}>{p.num}</div>
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>{p.sub}</div>
                <div style={{ fontSize: 12.5, color: C.textSoft, marginTop: 8, lineHeight: 1.65 }}>
                  {p.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CLOSING LINE */}
      <div style={{ padding: '22px 22px 0' }}>
        <div style={{
          background: 'linear-gradient(180deg, rgba(233,185,73,0.08) 0%, rgba(233,185,73,0.02) 100%)',
          borderLeft: '2px solid #c9a24a',
          padding: '14px 16px', borderRadius: '0 12px 12px 0',
        }}>
          <div style={{ fontSize: 13, color: '#2a3d5c', lineHeight: 1.75, textWrap: 'pretty' }}>
            这不仅是一场成功经验分享，更是<span className="serif" style={{ color: '#0f2855', fontWeight: 600 }}>一封写给所有学术追梦人的信</span>——关于如何在生活里，持续相信、持续行动，持续成为自己想成为的人。
          </div>
        </div>
      </div>

      {/* EVENT INFO */}
      <div style={{ padding: '22px 22px 0' }}>
        <div style={{
          fontSize: 11, color: '#55709a', letterSpacing: 3,
          fontFamily: '"JetBrains Mono", monospace', marginBottom: 10,
        }}>WHEN · WHERE · HOW</div>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '16px 18px',
          border: '0.5px solid #e3e9f3',
        }}>
          <InfoRow label="时间" value="2026 年 4 月 25 日（周六）" sub="18:40 入场  ·  19:00 开始" />
          <Sep />
          <InfoRow label="地点" value="武侯区 玉林 DCT 客厅" sub="报名通过后微信通知具体地址" />
          <Sep />
          <InfoRow label="入场" value="88 元 / 位" sub="含一份甜品 + 一杯酒 · 可打包带走" />
        </div>
      </div>

      {/* SEASONAL MENU */}
      <div style={{ padding: '22px 22px 0' }}>
        <div style={{
          fontSize: 11, color: '#55709a', letterSpacing: 3,
          fontFamily: '"JetBrains Mono", monospace', marginBottom: 10,
        }}>EARLY SUMMER · LIMITED</div>
        <div style={{
          background: 'linear-gradient(135deg, #fbf6ec 0%, #f5e8d0 100%)',
          borderRadius: 16, padding: '16px 18px',
          border: '0.5px solid #e8dcc0',
        }}>
          <div className="serif" style={{ fontSize: 17, fontWeight: 700, color: C.warmInk, lineHeight: 1.35 }}>
            初夏季节限定
          </div>
          <div style={{ fontSize: 12, color: C.warmText, marginTop: 4, fontStyle: 'italic' }}>
            Mulberry season, from Panzhihua
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
            <MenuRow name="桑葚巴斯克" tag="攀枝花桑葚季" />
            <MenuRow name="桑葚酸奶杯" tag="攀枝花桑葚季" />
            <MenuRow name="红酒 · 有醇 / 无醇" tag="自选" />
          </div>
          <div style={{
            fontSize: 11.5, color: C.warmText, marginTop: 12, lineHeight: 1.55, fontStyle: 'italic',
          }}>
            担心甜品负担也可以打包带走。
          </div>
        </div>
      </div>

      {/* WHAT IS DCT */}
      <div style={{ padding: '26px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <img src="assets/logo.png" alt="DCT" style={{ width: 48, height: 48, borderRadius: 24, flexShrink: 0 }} />
          <div>
            <div style={{
              fontSize: 10.5, color: '#55709a', letterSpacing: 3,
              fontFamily: '"JetBrains Mono", monospace',
            }}>WHAT IS DCT ?</div>
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
          一个家庭学术沙龙。在绩效逻辑之外，留一块真诚分享、自由交流、严肃思考的精神自留地。<br />
          在客厅里聊学术，也聊生活；聊目标，也聊热爱。
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
          报名参加第二期
          <StarBullet size={12} color={C.goldHi} />
        </button>
        <div style={{
          marginTop: 10, textAlign: 'center', fontSize: 11.5, color: C.mutedSoft,
        }}>我们会根据学科背景与意愿综合筛选，<span style={{ color: C.navySoft }}>24 小时内回复</span></div>
      </div>

      {/* ② 吸底浮动 CTA — 滚出 hero 后出现 */}
      <div style={{
        position: 'sticky', bottom: 0, left: 0, right: 0,
        marginTop: -76,
        pointerEvents: 'none', zIndex: 80,
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
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.2, letterSpacing: 1 }}>VOL.02 · 04.25</div>
              <div className="serif" style={{ fontSize: 15, color: C.ink, fontWeight: 700, lineHeight: 1.2, marginTop: 2 }}>
                88 <span style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>元/位</span>
                <span style={{ fontSize: 11, fontWeight: 400, color: C.muted, marginLeft: 6 }}>含甜品+酒</span>
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

function MenuRow({ name, tag }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <StarBullet size={9} color="#b8903a" />
      <div className="serif" style={{ fontSize: 14.5, color: '#5a3f14', fontWeight: 600, flex: 1 }}>{name}</div>
      <div style={{
        fontSize: 10.5, color: '#8a6a2e', letterSpacing: 1,
        fontFamily: '"JetBrains Mono", monospace',
      }}>{tag}</div>
    </div>
  );
}

function InfoRow({ label, value, sub }) {
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

function Sep() { return <div style={{ height: 0.5, background: '#e9eef6', margin: '10px 0' }} />; }

Object.assign(window, { ScreenLanding });
