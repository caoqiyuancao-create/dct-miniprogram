// Print-optimized app shell — each device on its own page, full content height

function PrintDeviceFrame({ children, label, width = 390 }) {
  // Let content determine height; no scroll clipping.
  return (
    <div className="print-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '28px 0 36px' }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
        color: '#55709a', letterSpacing: 3, textTransform: 'uppercase',
      }}>{label}</div>
      <div style={{
        width, borderRadius: 48, position: 'relative',
        background: '#111', padding: 10,
        boxShadow: '0 18px 36px rgba(15,30,60,0.18), 0 0 0 1.5px rgba(0,0,0,0.5)',
      }}>
        <div style={{
          position: 'relative', borderRadius: 40, overflow: 'hidden',
          background: '#fff',
        }}>
          {/* iOS status bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 40 }}>
            <IOSStatusBar />
          </div>
          {/* dynamic island */}
          <div style={{
            position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
            width: 118, height: 34, borderRadius: 22, background: '#000', zIndex: 50,
          }} />
          {/* content — full flow, not scrolled */}
          <div>
            {children}
          </div>
          {/* home indicator at bottom of content */}
          <div style={{
            display: 'flex', justifyContent: 'center', padding: '14px 0 10px',
          }}>
            <div style={{ width: 134, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.25)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrintApp() {
  const go = () => {}; // no-op in print mode

  const devices = [
    { key: 'landing', label: '01 · 着陆 / 主题介绍', Screen: ScreenLanding },
    { key: 'detail',  label: '02 · 活动须知 & 吧规',  Screen: ScreenDetail  },
    { key: 'form',    label: '03 · 报名填表',         Screen: ScreenForm    },
    { key: 'success', label: '04 · 提交成功 · 待审核', Screen: ScreenSuccess },
  ];

  return (
    <div style={{
      background: '#eceef2', fontFamily: '"Noto Sans SC", -apple-system, system-ui',
      minHeight: '100vh',
    }}>
      {/* Cover page */}
      <div className="print-page cover-page">
        <div style={{ padding: '120px 60px 60px' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
            color: '#55709a', letterSpacing: 4, marginBottom: 14,
          }}>DCT · VOL.02 · 报名小程序</div>
          <div className="serif" style={{
            fontSize: 56, fontWeight: 900, color: '#0f2855', letterSpacing: 2, lineHeight: 1.1,
          }}>六星之路<br />扫码报名流程</div>
          <div style={{ fontSize: 14, color: '#55709a', marginTop: 18, lineHeight: 1.7, maxWidth: 520 }}>
            四屏流程：<b>着陆 → 须知 → 填表 → 提交</b>。<br />
            延续第二期海报的蓝天 · 光芒 · 星芒视觉。
          </div>
          <div style={{ marginTop: 80, display: 'flex', gap: 14, alignItems: 'center' }}>
            <img src="assets/logo.png" alt="DCT" style={{ width: 64, height: 64, borderRadius: 32 }} />
            <div>
              <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: '#0f2855' }}>DCT · 家庭学术沙龙</div>
              <div style={{ fontSize: 12, color: '#55709a', marginTop: 4, fontStyle: 'italic' }}>Doctors' Crazy Thinking</div>
            </div>
          </div>
        </div>
      </div>

      {devices.map(({ key, label, Screen }) => (
        <PrintDeviceFrame key={key} label={label}>
          <Screen go={go} />
        </PrintDeviceFrame>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PrintApp />);
