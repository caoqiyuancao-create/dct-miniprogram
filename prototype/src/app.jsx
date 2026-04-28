// App shell — now showing 7 screens: Home, About, Review list, Review detail, Landing, Detail, Form, Success

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
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 40 }}>
            <IOSStatusBar />
          </div>
          <div style={{
            position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
            width: 118, height: 34, borderRadius: 22, background: '#000', zIndex: 50,
          }} />
          <div style={{ position: 'absolute', inset: 0, overflow: 'auto' }}>
            {children}
          </div>
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
  const [reviewId, setReviewId] = React.useState('vol01');
  const refs = {
    home:          React.useRef(),
    about:         React.useRef(),
    review:        React.useRef(),
    'review-detail': React.useRef(),
    landing:       React.useRef(),
    detail:        React.useRef(),
    form:          React.useRef(),
    success:       React.useRef(),
  };
  const go = (k) => {
    const el = refs[k]?.current;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  };

  const devices = [
    { key: 'home',          label: '00 · 主页 · 品牌入口',     Screen: ScreenHome,         note: '新' },
    { key: 'about',         label: '01 · 关于 DCT',            Screen: ScreenAbout,        note: '新' },
    { key: 'review',        label: '02 · 往期回顾 · 列表',     Screen: ScreenReview,       note: '新' },
    { key: 'review-detail', label: '03 · 往期详情（第一期占位）', Screen: ScreenReviewDetail, note: '新' },
    { key: 'landing',       label: '04 · 本期着陆 · 主题介绍',  Screen: ScreenLanding                },
    { key: 'detail',        label: '05 · 活动须知 & 吧规',     Screen: ScreenDetail                 },
    { key: 'form',          label: '06 · 报名填表',            Screen: ScreenForm                   },
    { key: 'success',       label: '07 · 提交成功',            Screen: ScreenSuccess                },
  ];

  return (
    <div data-screen-label="Canvas · DCT 小程序（扩展版）" style={{
      minHeight: '100vh', background: '#eceef2', padding: '48px 36px 80px',
      fontFamily: '"Noto Sans SC", -apple-system, system-ui',
    }}>
      <div style={{ maxWidth: 1680, margin: '0 auto 36px' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
          color: '#55709a', letterSpacing: 4, marginBottom: 10,
        }}>DCT · 小程序 · v2 (多期模板)</div>
        <div className="serif" style={{
          fontSize: 34, fontWeight: 900, color: '#0f2855', letterSpacing: 1.5, lineHeight: 1.2,
        }}>主页 · 关于 · 往期 · 本期报名</div>
        <div style={{ fontSize: 13, color: '#55709a', marginTop: 8, lineHeight: 1.6, maxWidth: 720 }}>
          新增 <b>主页 / 关于 DCT / 往期回顾 / 往期详情</b> 四屏。期次数据统一放在
          <code style={{ background: '#fff', padding: '1px 6px', borderRadius: 4, margin: '0 4px' }}>data/issues.js</code>
          ，换期只改这一个文件。可点击卡片互跳。
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 48, justifyContent: 'flex-start',
        flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 20, paddingLeft: 20, paddingRight: 20,
      }}>
        {devices.map(({ key, label, Screen, note }) => (
          <div key={key} ref={refs[key]} data-screen-label={label}>
            <DeviceFrame label={note ? `${label}  ·  NEW` : label}>
              <Screen go={go} reviewId={reviewId} setReviewId={setReviewId} />
            </DeviceFrame>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
