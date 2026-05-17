// App shell · v3 · 第三期 报名 + 留言墙 canvas
// 7 个手机屏 + 1 个 TV 大屏（电子留言墙）

function PhoneFrame({ children, label, width = 390, height = 770 }) {
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
          <div style={{ position: 'absolute', inset: 0, overflow: 'auto' }}>{children}</div>
          <div style={{
            position: 'absolute', bottom: 8, left: 0, right: 0, zIndex: 60,
            display: 'flex', justifyContent: 'center', pointerEvents: 'none',
          }}>
            <div style={{ width: 134, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.3)' }} />
          </div>
        </div>
      </div>
      <div className="mono" style={{ fontSize: 12, color: '#55709a', letterSpacing: 3, textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  );
}

function TVFrame({ children, label, width = 1280, height = 720 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div style={{
        width, height, borderRadius: 18, position: 'relative',
        background: '#0a0a0c', padding: 16,
        boxShadow: '0 60px 120px rgba(15,30,60,0.28), 0 0 0 1px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        <div style={{
          position: 'absolute', inset: 16, borderRadius: 6, overflow: 'hidden',
          background: '#050d1d',
        }}>{children}</div>
        {/* TV底座灯 */}
        <div style={{
          position: 'absolute', left: '50%', bottom: 6, transform: 'translateX(-50%)',
          width: 6, height: 6, borderRadius: 3, background: '#e9b949', opacity: 0.7,
          boxShadow: '0 0 6px #e9b949',
        }} />
      </div>
      <div className="mono" style={{ fontSize: 12, color: '#55709a', letterSpacing: 3, textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  );
}

function App() {
  const [reviewId, setReviewId] = React.useState('vol01');
  const refs = {
    home:            React.useRef(),
    about:           React.useRef(),
    review:          React.useRef(),
    'review-vol02':  React.useRef(),
    'review-detail': React.useRef(),
    landing:         React.useRef(),
    detail:          React.useRef(),
    form:            React.useRef(),
    success:         React.useRef(),
    wall:            React.useRef(),
  };
  const go = (k) => {
    const el = refs[k]?.current;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  };

  const devices = [
    { key: 'home',          label: '00 · 主页',                  Screen: ScreenHome,          kind: 'phone' },
    { key: 'about',         label: '01 · 关于 DCT',              Screen: ScreenAbout,         kind: 'phone' },
    { key: 'review',        label: '02 · 往期回顾',              Screen: ScreenReview,        kind: 'phone' },
    { key: 'review-vol02',  label: '02b · 第二期回顾 · 六星之路', Screen: (p) => <ScreenReviewDetail {...p} reviewId="vol02" />, kind: 'phone', highlight: true },
    { key: 'review-detail', label: '02c · 第一期回顾 · ADHD',     Screen: ScreenReviewDetail,  kind: 'phone' },
    { key: 'landing',       label: '03 · 本期着陆 · 第三期',      Screen: ScreenLanding,       kind: 'phone' },
    { key: 'detail',        label: '04 · 活动须知 & 吧规',        Screen: ScreenDetail,        kind: 'phone' },
    { key: 'form',          label: '05 · 报名填表 · 新增两题',    Screen: ScreenForm,          kind: 'phone', highlight: true },
    { key: 'success',       label: '06 · 提交成功 · 含墙预告',    Screen: ScreenSuccess,       kind: 'phone', highlight: true },
    { key: 'wall',          label: '07 · 电子留言墙 · 咖啡厅 TV', Screen: ScreenWall,          kind: 'tv',    highlight: true },
  ];

  return (
    <div data-screen-label="Canvas · DCT 第三期 · 报名 + 现场留言墙" style={{
      minHeight: '100vh', background: '#eceef2', padding: '48px 36px 80px',
      fontFamily: '"Noto Sans SC", -apple-system, system-ui',
    }}>
      <div style={{ maxWidth: 1680, margin: '0 auto 28px' }}>
        <div className="mono" style={{ fontSize: 12, color: '#55709a', letterSpacing: 4, marginBottom: 10 }}>
          DCT · 第三期 · 报名 + 现场 · v3
        </div>
        <div className="serif" style={{
          fontSize: 34, fontWeight: 900, color: '#0f2855', letterSpacing: 1.5, lineHeight: 1.2,
        }}>
          医美热时代的<span style={{ color: '#c9a24a' }}>冷</span>思考 · 报名流程 &amp; 现场留言墙
        </div>
        <div style={{ fontSize: 13, color: '#55709a', marginTop: 10, lineHeight: 1.7, maxWidth: 820 }}>
          沿用第二期的设计系统（蓝金 · 衬线大字 · 海报蓝渐变背景）。本期新增两个东西：
          报名表新增「<b>留言墙</b>」两题（一句话身份 + 想问讲者什么），以及咖啡厅现场 TV 上的
          <b>电子留言墙</b>大屏（左：在场者身份；右：今晚想问的问题，匿名滚动）。
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
          {[
            ['场地','武侯区棕南正街 · 陌生的朋友咖啡厅'],
            ['时间','2026.05.23 · 19:00–21:30'],
            ['主讲','皮里士多德 · 45° 的华西皮肤科博士'],
            ['入场','88 元 / 位 · 含甜品 + 饮品'],
          ].map(([k, v]) => (
            <div key={k} style={{
              padding: '6px 12px', borderRadius: 100, fontSize: 12,
              background: '#fff', border: '0.5px solid #d5dde8', color: '#3d5f94',
            }}>
              <span className="mono" style={{ fontSize: 10, color: '#8496b3', letterSpacing: 1, marginRight: 6 }}>{k}</span>
              {v}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 56, justifyContent: 'flex-start',
        flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 24,
        paddingLeft: 20, paddingRight: 20, alignItems: 'flex-start',
      }}>
        {devices.map(({ key, label, Screen, kind, highlight }) => (
          <div key={key} ref={refs[key]} data-screen-label={label}>
            {kind === 'tv' ? (
              <TVFrame label={highlight ? `${label}  ·  NEW` : label}>
                <Screen go={go} embedded />
              </TVFrame>
            ) : (
              <PhoneFrame label={highlight ? `${label}  ·  NEW` : label}>
                <Screen go={go} reviewId={reviewId} setReviewId={setReviewId} />
              </PhoneFrame>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
