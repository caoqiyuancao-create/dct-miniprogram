// Screen 3 — Success / pending review
function ScreenSuccess({ go }) {
  return (
    <div style={{ minHeight: '100%', background: '#f6f8fc' }}>
      <PosterSky tone="light" style={{ minHeight: 360 }}>
        <WxHeader title="已提交" transparent />
        <div style={{
          padding: '20px 22px 0', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          {/* constellation of stars */}
          <div style={{ position: 'relative', width: 160, height: 160, marginTop: 10 }}>
            <Star4 x={50} y={50} s={40} o={1} />
            <Star4 x={22} y={28} s={14} o={0.75} />
            <Star4 x={78} y={30} s={12} o={0.7} />
            <Star4 x={18} y={72} s={10} o={0.55} />
            <Star4 x={82} y={70} s={16} o={0.85} />
          </div>

          <div className="serif" style={{
            fontSize: 30, fontWeight: 900, color: '#0f2855', marginTop: 8,
            letterSpacing: 3,
          }}>已收到</div>

          <div style={{
            fontSize: 13, color: '#3d5f94', marginTop: 8, textAlign: 'center', lineHeight: 1.7,
            maxWidth: 280,
          }}>
            谢谢你愿意和我们一起<br/>在绩效逻辑之外，聊点真的东西
          </div>
        </div>
      </PosterSky>

      {/* timeline */}
      <div style={{ padding: '22px 22px 0' }}>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '6px 0',
          border: '0.5px solid #e3e9f3',
        }}>
          <Step done label="报名已提交" sub="刚刚" />
          <Step active label="DCT 主创在审核" sub="通常 24 小时内完成" />
          <Step label="微信通知结果" sub="通过后将发送入群二维码 & 具体地址" />
          <Step label="2026 年 4 月 25 日 · 周六见" sub="18:40 入场 · 第二期 · 六星之路" last />
        </div>
      </div>

      {/* notice */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{
          background: 'rgba(233,185,73,0.1)', borderRadius: 14, padding: '14px 16px',
          border: '0.5px solid rgba(201,162,74,0.3)',
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <StarBullet size={12} color="#c9a24a" />
          <div style={{ fontSize: 12.5, color: '#6b5520', lineHeight: 1.65 }}>
            DCT 会综合学科背景与交流意愿筛选本期参与者。若本期暂未入选，我们会优先邀请你参加下一期同类主题。
          </div>
        </div>
      </div>

      {/* back to landing */}
      <div style={{ padding: '24px 18px 60px' }}>
        <button
          onClick={() => go('landing')}
          style={{
            width: '100%', height: 48, borderRadius: 24,
            background: '#fff', color: '#1a3a78',
            border: '0.5px solid #c9d4e6', fontSize: 15, fontWeight: 500,
            fontFamily: '"Noto Sans SC", system-ui',
          }}>
          回到主题介绍
        </button>
      </div>
    </div>
  );
}

function Step({ done, active, label, sub, last }) {
  const color = done ? '#2c5ca0' : active ? '#e9b949' : '#c9d4e6';
  return (
    <div style={{ display: 'flex', gap: 14, padding: '14px 18px', position: 'relative' }}>
      <div style={{ width: 22, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 14, height: 14, borderRadius: 7, background: color,
          boxShadow: active ? '0 0 0 4px rgba(233,185,73,0.22)' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {done && <svg width="8" height="6" viewBox="0 0 8 6"><path d="M1 3l2 2 4-4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>}
        </div>
        {!last && <div style={{ width: 1, flex: 1, background: '#e3e9f3', marginTop: 4, minHeight: 12 }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: last ? 0 : 4 }}>
        <div style={{
          fontSize: 14, fontWeight: active || done ? 600 : 500,
          color: active ? '#8a6715' : done ? '#0f2855' : '#6b7a91',
        }}>{label}</div>
        <div style={{ fontSize: 11.5, color: '#8496b3', marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenSuccess });
