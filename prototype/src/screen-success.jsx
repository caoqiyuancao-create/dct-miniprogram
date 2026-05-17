// Screen 3 — Success / pending review
// v3 新增：提到自己的留言会在现场电视墙上滚动展示

function ScreenSuccess({ go }) {
  const D = window.DCT_DATA;
  const cur = D.getCurrent();
  const isV3 = cur && cur.id === 'vol03';

  return (
    <div style={{ minHeight: '100%', background: '#f6f8fc' }}>
      <PosterSky tone="light" style={{ minHeight: 320 }}>
        <WxHeader title="已提交" transparent />
        <div style={{
          padding: '12px 22px 0', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{ position: 'relative', width: 150, height: 150, marginTop: 6 }}>
            <Star4 x={50} y={50} s={36} o={1} />
            <Star4 x={22} y={28} s={14} o={0.75} />
            <Star4 x={78} y={30} s={12} o={0.7} />
            <Star4 x={18} y={72} s={10} o={0.55} />
            <Star4 x={82} y={70} s={16} o={0.85} />
          </div>

          <div className="serif" style={{
            fontSize: 28, fontWeight: 900, color: '#0f2855', marginTop: 4, letterSpacing: 3,
          }}>已收到</div>

          <div style={{
            fontSize: 13, color: '#3d5f94', marginTop: 6, textAlign: 'center', lineHeight: 1.7,
            maxWidth: 290,
          }}>
            谢谢你愿意和我们一起<br/>在「医美热」里，留一块冷思考的角落
          </div>
        </div>
      </PosterSky>

      {/* v3: 留言墙预告卡片 */}
      {isV3 && (
        <div style={{ padding: '18px 22px 0' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f2855 0%, #1a3a78 100%)',
            borderRadius: 18, padding: '16px 18px 18px', position: 'relative', overflow: 'hidden',
            color: '#fff',
            boxShadow: '0 12px 28px rgba(15,40,85,0.24)',
          }}>
            {/* 装饰 — 一片小型 wall preview */}
            <div style={{
              position: 'absolute', right: -20, top: -10, opacity: 0.18,
              transform: 'rotate(-6deg)',
            }}>
              <WallStub />
            </div>

            <div className="mono" style={{
              fontSize: 9.5, letterSpacing: 3, color: '#e9b949', marginBottom: 6,
            }}>WALL · 当晚电视上滚动展示</div>
            <div className="serif" style={{
              fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 8,
            }}>你写下的，会被看到。</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>
              你留下的一句话身份和想问的问题，会在入场和中场以匿名形式滚动播放——成为「今晚 30 种身份 + 30 个问题」的一部分。
            </div>
            <div
              onClick={() => go('wall')}
              style={{
                marginTop: 14, padding: '8px 12px', borderRadius: 100,
                border: '0.5px solid rgba(233,185,73,0.5)',
                background: 'rgba(233,185,73,0.12)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 12, fontWeight: 500, color: '#fff3cc',
                cursor: 'pointer',
              }}>
              <span style={{ fontSize: 13 }}>看看现场留言墙长什么样</span>
              <svg width="8" height="12" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="#fff3cc" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>
      )}

      {/* timeline */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '6px 0',
          border: '0.5px solid #e3e9f3',
        }}>
          <Step done label="报名已提交" sub="刚刚" />
          <Step active label="DCT 主创在审核" sub="通常 24 小时内完成" />
          <Step label="微信通知结果" sub="通过后将发送入群二维码 & 咖啡厅入场信息" />
          <Step
            label={isV3 ? '2026 年 5 月 23 日 · 周六见' : '2026 年 4 月 25 日 · 周六见'}
            sub={isV3 ? '19:00 入场 · 第三期 · 医美热时代的冷思考' : '18:40 入场 · 第二期 · 六星之路'}
            last
          />
        </div>
      </div>

      {/* notice */}
      <div style={{ padding: '16px 22px 0' }}>
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

      <div style={{ padding: '20px 18px 60px' }}>
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

function WallStub() {
  return (
    <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
      {[6, 22, 38, 54, 70, 86].map(y => (
        <g key={y}>
          <rect x="6" y={y} width="78" height="9" rx="4.5" fill="#fff" />
          <rect x="92" y={y} width="84" height="9" rx="4.5" fill="#e9b949" />
        </g>
      ))}
    </svg>
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
