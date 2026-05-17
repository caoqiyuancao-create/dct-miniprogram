// Print-optimized app shell — each device on its own page, full content height
// v3: 封面更新为第三期；新增 wall 横屏页

function PrintDeviceFrame({ children, label, width = 390 }) {
  // Let content determine height; no scroll clipping.
  return (
    <div className="print-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '28px 0 36px' }}>
      <div className="mono" style={{
        fontSize: 11, color: '#55709a', letterSpacing: 3, textTransform: 'uppercase',
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

function PrintWallFrame({ label }) {
  // Landscape TV preview — fixed 16:9 aspect on its own page.
  return (
    <div className="print-page print-page-landscape" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 14, padding: '24px 24px 36px',
    }}>
      <div className="mono" style={{
        fontSize: 11, color: '#55709a', letterSpacing: 3, textTransform: 'uppercase',
      }}>{label}</div>
      <div style={{
        width: '100%', maxWidth: 1280, aspectRatio: '16 / 9',
        borderRadius: 14, overflow: 'hidden',
        background: '#050d1d',
        boxShadow: '0 20px 48px rgba(15,30,60,0.22), 0 0 0 1.5px rgba(0,0,0,0.5)',
      }}>
        <ScreenWall embedded />
      </div>
    </div>
  );
}

function PrintApp() {
  const D = window.DCT_DATA;
  const cur = D.getCurrent();
  const go = () => {}; // no-op in print mode

  const devices = [
    { key: 'landing', label: '01 · 着陆 / 主题介绍',  Screen: ScreenLanding },
    { key: 'detail',  label: '02 · 活动须知 & 吧规',  Screen: ScreenDetail  },
    { key: 'form',    label: '03 · 报名填表 · 含留言墙两题', Screen: ScreenForm    },
    { key: 'success', label: '04 · 提交成功 · 含留言墙预告', Screen: ScreenSuccess },
  ];

  return (
    <div style={{
      background: '#eceef2', fontFamily: '"Noto Sans SC", -apple-system, system-ui',
      minHeight: '100vh',
    }}>
      {/* Cover page */}
      <div className="print-page cover-page">
        <div style={{ padding: '120px 60px 60px' }}>
          <div className="mono" style={{
            fontSize: 12, color: '#55709a', letterSpacing: 4, marginBottom: 14,
          }}>DCT · VOL.0{cur.number} · 报名小程序 · 设计稿</div>
          <div className="serif" style={{
            fontSize: 56, fontWeight: 900, color: '#0f2855', letterSpacing: 2, lineHeight: 1.08,
          }}>
            <span style={{ color: '#c9a24a' }}>医美热</span>时代的<br />
            <span style={{ borderBottom: '5px solid #1a3a78', paddingBottom: 4, display: 'inline-block' }}>冷思考</span>
          </div>
          <div className="serif" style={{
            fontSize: 17, color: '#1a3a78', marginTop: 24, lineHeight: 1.6, maxWidth: 520, fontWeight: 500,
          }}>
            {cur.subtitle}
          </div>
          <div style={{ fontSize: 13.5, color: '#55709a', marginTop: 18, lineHeight: 1.8, maxWidth: 520 }}>
            <b>4 屏报名流程</b>：着陆 → 须知 → 填表 → 提交。<br />
            <b>+ 1 屏现场大屏</b>：电子留言墙（咖啡厅 TV，横屏）。<br />
            本期沿用第二期蓝金 · 衬线大字 · 星芒视觉系统。
          </div>

          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              ['主讲', `${cur.speaker.name} · ${cur.speaker.title} · ${cur.speaker.org}`],
              ['时间', cur.dateText + ' · ' + cur.timeDetail],
              ['地点', cur.location],
              ['入场', cur.price + ' · ' + cur.priceNote],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 14, fontSize: 13, color: '#2a3d5c' }}>
                <div className="mono" style={{
                  width: 40, color: '#8496b3', letterSpacing: 2, fontSize: 11, paddingTop: 2,
                }}>{k}</div>
                <div>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 70, display: 'flex', gap: 14, alignItems: 'center' }}>
            <img src="assets/logo.png" alt="DCT" style={{ width: 64, height: 64, borderRadius: 32 }} />
            <div>
              <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: '#0f2855' }}>DCT · 家庭学术沙龙</div>
              <div className="mono" style={{ fontSize: 11, color: '#55709a', marginTop: 4, letterSpacing: 2 }}>
                DOCTORS' CRAZY THINKING · EST.2026 · CHENGDU
              </div>
            </div>
          </div>
        </div>
      </div>

      {devices.map(({ key, label, Screen }) => (
        <PrintDeviceFrame key={key} label={label}>
          <Screen go={go} />
        </PrintDeviceFrame>
      ))}

      {/* TV / Wall — landscape page at the end */}
      <PrintWallFrame label="05 · 电子留言墙 · 咖啡厅 TV · 16:9" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PrintApp />);
