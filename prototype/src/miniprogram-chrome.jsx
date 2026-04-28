// WeChat-miniprogram top chrome: capsule button (••• | ○) + page title
// Sits below the iOS status bar.

function WxCapsule({ dark = false }) {
  const ink = dark ? 'rgba(255,255,255,0.92)' : '#1c1c1c';
  const line = dark ? 'rgba(255,255,255,0.24)' : 'rgba(0,0,0,0.08)';
  const bg   = dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.88)';
  return (
    <div style={{
      height: 32, width: 87, borderRadius: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      background: bg, border: `0.5px solid ${line}`,
      backdropFilter: 'blur(16px) saturate(160%)',
      WebkitBackdropFilter: 'blur(16px) saturate(160%)',
      boxShadow: dark ? 'none' : '0 1px 2px rgba(15,30,60,0.05)',
    }}>
      {/* ••• */}
      <svg width="18" height="4" viewBox="0 0 18 4">
        <circle cx="2"  cy="2" r="1.6" fill={ink}/>
        <circle cx="9"  cy="2" r="1.6" fill={ink}/>
        <circle cx="16" cy="2" r="1.6" fill={ink}/>
      </svg>
      <div style={{ width: 0.5, height: 16, background: line }} />
      {/* ○ close */}
      <svg width="14" height="14" viewBox="0 0 14 14">
        <circle cx="7" cy="7" r="5.5" fill="none" stroke={ink} strokeWidth="1.2"/>
      </svg>
    </div>
  );
}

function WxHeader({ title, dark = false, transparent = false, logo = true }) {
  const ink = dark ? '#fff' : '#111';
  return (
    <div style={{
      position: 'relative', zIndex: 30,
      paddingTop: 54, paddingBottom: 8,
      background: transparent ? 'transparent' : (dark ? '#0c1d3a' : 'rgba(255,255,255,0.85)'),
      backdropFilter: transparent ? 'none' : 'blur(14px) saturate(160%)',
      WebkitBackdropFilter: transparent ? 'none' : 'blur(14px) saturate(160%)',
      borderBottom: transparent ? 'none' : `0.5px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
    }}>
      <div style={{
        minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', padding: '0 16px', gap: 10,
      }}>
        {logo && (
          <img src="assets/logo.png" alt="DCT" style={{
            width: 40, height: 40, borderRadius: 20,
            background: '#fff', boxShadow: dark
              ? '0 2px 6px rgba(0,0,0,0.25), 0 0 0 1.5px rgba(255,255,255,0.9)'
              : '0 2px 6px rgba(15,40,85,0.15), 0 0 0 1.5px rgba(255,255,255,0.95)',
          }} />
        )}
        <div style={{
          fontSize: 17, fontWeight: 600, color: ink,
          fontFamily: '"Noto Sans SC", -apple-system, system-ui',
          letterSpacing: 0.5,
        }}>{title}</div>
        <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
          <WxCapsule dark={dark} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WxCapsule, WxHeader });
