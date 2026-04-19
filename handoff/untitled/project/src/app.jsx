// App shell — multiple iOS devices side-by-side showing each screen state.

function DeviceFrame({ children, label, width = 390, height = 770 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div style={{
        width, height, borderRadius: 52, position: 'relative',
        background: '#111', padding: 10,
        boxShadow: '0 40px 80px rgba(15,30,60,0.22), 0 0 0 2px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,255,255,0.06)',
      }}>
        <div style={{
          position: 'absolute', inset: 10, borderRadius: 42, overflow: 'hidden',
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
          {/* content scroll */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'auto' }}>
            {children}
          </div>
          {/* home indicator */}
          <div style={{
            position: 'absolute', bottom: 8, left: 0, right: 0, zIndex: 60,
            display: 'flex', justifyContent: 'center', pointerEvents: 'none',
          }}>
            <div style={{ width: 134, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.3)' }} />
          </div>
        </div>
      </div>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
        color: '#55709a', letterSpacing: 3, textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
}

function App() {
  // Four screens presented at once. The "go" prop lets buttons flash a visual jump
  // for a live demo feel — we simply scroll the canvas to the target device.
  const refs = {
    landing: React.useRef(),
    detail:  React.useRef(),
    form:    React.useRef(),
    success: React.useRef(),
  };
  const go = (k) => {
    const el = refs[k]?.current;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  };

  const devices = [
    { key: 'landing', label: '01 · 着陆 / 主题介绍', Screen: ScreenLanding },
    { key: 'detail',  label: '02 · 活动须知 & 吧规',  Screen: ScreenDetail  },
    { key: 'form',    label: '03 · 报名填表',         Screen: ScreenForm    },
    { key: 'success', label: '04 · 提交成功 · 待审核', Screen: ScreenSuccess },
  ];

  return (
    <div data-screen-label="Canvas · DCT 第二期报名" style={{
      minHeight: '100vh', background: '#eceef2', padding: '48px 36px 80px',
      fontFamily: '"Noto Sans SC", -apple-system, system-ui',
    }}>
      {/* Canvas header */}
      <div style={{ maxWidth: 1680, margin: '0 auto 36px' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
          color: '#55709a', letterSpacing: 4, marginBottom: 10,
        }}>DCT · VOL.02 · 报名小程序</div>
        <div className="serif" style={{
          fontSize: 34, fontWeight: 900, color: '#0f2855', letterSpacing: 1.5, lineHeight: 1.2,
        }}>六星之路 · 扫码报名流程</div>
        <div style={{ fontSize: 13, color: '#55709a', marginTop: 8, lineHeight: 1.6, maxWidth: 640 }}>
          四屏流程：<b>着陆 → 须知 → 填表 → 提交</b>。延续第二期海报的蓝天 · 光芒 · 星芒视觉。按钮可点击跳转到对应屏。
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 48, justifyContent: 'center',
        flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 20,
      }}>
        {devices.map(({ key, label, Screen }) => (
          <div key={key} ref={refs[key]} data-screen-label={label}>
            <DeviceFrame label={label}>
              <Screen go={go} />
            </DeviceFrame>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
