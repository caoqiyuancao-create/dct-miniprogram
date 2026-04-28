// Screen 0 — DCT Home
// Big logo + slogan rotator + announcement ticker + 3 primary entries

function ScreenHome({ go }) {
  const D = window.DCT_DATA;
  const cur = D.getCurrent();
  const [slogIdx, setSlogIdx] = React.useState(0);
  const [annIdx, setAnnIdx]   = React.useState(0);

  React.useEffect(() => {
    const t1 = setInterval(() => setSlogIdx(i => (i + 1) % D.brand.slogans.length), 3600);
    const t2 = setInterval(() => setAnnIdx(i => (i + 1) % D.brand.announcements.length), 4800);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const ann = D.brand.announcements[annIdx];

  return (
    <div style={{ background: '#f6f8fc', minHeight: '100%' }}>
      <PosterSky tone="light" style={{ minHeight: 520, paddingBottom: 40 }}>
        <WxHeader title="DCT 家庭学术沙龙" transparent />

        {/* Big logo + branding */}
        <div style={{ padding: '36px 22px 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{
              width: 132, height: 132, borderRadius: 66, overflow: 'hidden',
              background: '#fff', padding: 8,
              boxShadow: '0 20px 40px rgba(15,40,85,0.22), 0 0 0 4px rgba(255,255,255,0.9)',
            }}>
              <img src="assets/logo.png" alt="DCT"
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
            </div>
          </div>
          <div className="mono" style={{
            fontSize: 11, letterSpacing: 6, color: '#1a3a78', opacity: 0.75, marginBottom: 10,
          }}>DOCTORS' CRAZY THINKING</div>
          <div className="serif" style={{
            fontSize: 34, fontWeight: 900, color: '#0f2855', letterSpacing: 4, lineHeight: 1.15,
          }}>认真地胡思乱想</div>

          {/* Slogan rotator */}
          <div style={{
            marginTop: 16, height: 28, position: 'relative', overflow: 'hidden',
          }}>
            {D.brand.slogans.map((s, i) => (
              <div key={i} style={{
                position: 'absolute', inset: 0, fontSize: 12.5, color: '#3d5f94',
                letterSpacing: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: i === slogIdx ? 1 : 0,
                transform: i === slogIdx ? 'translateY(0)' : 'translateY(8px)',
                transition: 'all 0.6s ease',
              }}>
                <StarBullet size={8} color="#c9a24a" />
                <span style={{ margin: '0 10px' }}>{s}</span>
                <StarBullet size={8} color="#c9a24a" />
              </div>
            ))}
          </div>
        </div>

        {/* Announcement ticker */}
        <div style={{ padding: '28px 18px 0' }}>
          <div style={{
            background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(14px)',
            border: '0.5px solid rgba(15,40,85,0.1)', borderRadius: 14,
            padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
            overflow: 'hidden', height: 40,
          }}>
            <div style={{
              fontSize: 9.5, color: '#fff', background: ann.type === 'signup' ? '#c9a24a' : '#2c5ca0',
              padding: '3px 7px', borderRadius: 4, letterSpacing: 1.5, flexShrink: 0,
              fontFamily: '"JetBrains Mono", monospace', fontWeight: 600,
            }}>{ann.type === 'signup' ? 'OPEN' : 'NEWS'}</div>
            <div style={{ flex: 1, minWidth: 0, position: 'relative', height: 18 }}>
              {D.brand.announcements.map((a, i) => (
                <div key={i} style={{
                  position: 'absolute', inset: 0, fontSize: 12.5, color: '#0f2855',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  opacity: i === annIdx ? 1 : 0,
                  transform: i === annIdx ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'all 0.5s ease',
                }}>
                  {a.text}
                  {a.date && <span style={{ color: '#6b7a91', marginLeft: 8, fontSize: 11 }}>{a.date}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PosterSky>

      {/* 3 primary entries */}
      <div style={{ padding: '28px 18px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <HomeEntry
          primary
          onClick={() => go('landing')}
          kicker={`VOL.0${cur.number} · 报名开放中`}
          title="本期报名"
          body={cur.title + ' · ' + cur.subtitle}
          meta={cur.dateText}
        />
        <div style={{ display: 'flex', gap: 12 }}>
          <HomeEntry
            onClick={() => go('about')}
            kicker="ABOUT"
            title="关于 DCT"
            body="创办的故事"
            flex
          />
          <HomeEntry
            onClick={() => go('review')}
            kicker="ARCHIVE"
            title="往期回顾"
            body={`已有 ${D.getPastIssues().length} 期`}
            flex
          />
        </div>
      </div>

      {/* quiet footer */}
      <div style={{ padding: '40px 22px 60px', textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: 3, color: '#8496b3' }}>
          EST.2026 · CHENGDU · IN A LIVING ROOM
        </div>
      </div>
    </div>
  );
}

function HomeEntry({ primary, flex, kicker, title, body, meta, onClick }) {
  return (
    <div onClick={onClick} style={{
      flex: flex ? 1 : 'initial',
      background: primary
        ? 'linear-gradient(135deg, #1a3a78 0%, #2c5ca0 100%)'
        : '#fff',
      color: primary ? '#fff' : '#0f2855',
      borderRadius: 18,
      padding: primary ? '18px 20px' : '16px 16px',
      border: primary ? 'none' : '0.5px solid #e3e9f3',
      boxShadow: primary
        ? '0 10px 24px rgba(26,58,120,0.28)'
        : '0 2px 8px rgba(15,40,85,0.04)',
      position: 'relative', overflow: 'hidden', minHeight: primary ? 0 : 96,
      cursor: 'pointer',
    }}>
      {primary && (
        <div style={{
          position: 'absolute', right: -20, top: -20, width: 100, height: 100,
          borderRadius: 50, background: 'radial-gradient(circle, rgba(233,185,73,0.28) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}
      <div className="mono" style={{
        fontSize: 10, letterSpacing: 2.5, opacity: primary ? 0.85 : 0.6,
        color: primary ? '#e9b949' : '#55709a', marginBottom: 6,
      }}>{kicker}</div>
      <div className="serif" style={{
        fontSize: primary ? 22 : 18, fontWeight: 700, lineHeight: 1.2, letterSpacing: 0.5,
      }}>{title}</div>
      <div style={{
        fontSize: 12, marginTop: 6, lineHeight: 1.5,
        color: primary ? 'rgba(255,255,255,0.82)' : '#55709a',
      }}>{body}</div>
      {meta && (
        <div style={{
          marginTop: 10, fontSize: 11, letterSpacing: 1,
          color: primary ? 'rgba(255,255,255,0.65)' : '#8496b3',
          fontFamily: '"JetBrains Mono", monospace',
        }}>{meta}</div>
      )}
      {primary && (
        <div style={{
          position: 'absolute', right: 18, bottom: 18,
          width: 28, height: 28, borderRadius: 14,
          background: 'rgba(255,255,255,0.15)', border: '0.5px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="7" height="12" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { ScreenHome });
