// screens.jsx — 探索稿组件库
// 全部艺术板内容都在这里定义，再到 app.jsx 里编排进 DesignCanvas。
// 设计 token 与现有 prototype 对齐（ink #0f2855 / navy #1a3a78 / gold #c9a24a / warm #fbf6ec）

const T = {
  ink:        '#0f2855',
  navy:       '#1a3a78',
  navySoft:   '#2c5ca0',
  text:       '#2a3d5c',
  textSoft:   '#3d5f94',
  muted:      '#55709a',
  mutedSoft:  '#6b7a91',
  hint:       '#8496b3',
  hintSoft:   '#a0acc0',
  divider:    '#e3e9f3',
  dividerSoft:'#eef2f8',
  bg:         '#f6f8fc',
  card:       '#fff',
  gold:       '#c9a24a',
  goldHi:     '#e9b949',
  goldSoft:   '#b8903a',
  warmBg:     '#fbf6ec',
  warmBg2:    '#f5e8d0',
  warmInk:    '#6b4c1e',
  warmText:   '#8a6a2e',
  serif: '"Noto Serif SC","STSong",serif',
  sans:  '"Noto Sans SC",-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif',
  mono:  '"JetBrains Mono",ui-monospace,monospace',
};

// ────────────────────────────────────────────────────────────────────────────
// 共用小部件
// ────────────────────────────────────────────────────────────────────────────

function PhoneFrame({ children, height = 760, scrollable = false }) {
  return (
    <div style={{
      width: 360, height, background: T.bg, overflow: scrollable ? 'auto' : 'hidden',
      fontFamily: T.sans, color: T.text, position: 'relative',
    }}>{children}</div>
  );
}

function MiniHeader({ title }) {
  return (
    <div style={{
      height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: T.card, borderBottom: `0.5px solid ${T.divider}`,
      fontSize: 15, color: T.ink, fontWeight: 500, position: 'relative',
    }}>
      <div style={{
        position: 'absolute', left: 14, fontSize: 18, color: T.muted, fontWeight: 300,
      }}>‹</div>
      {title}
    </div>
  );
}

function Kicker({ text, color = T.muted, gap = 6 }) {
  return <div style={{
    fontFamily: T.mono, fontSize: 10.5, color, letterSpacing: 4, marginBottom: gap,
  }}>{text}</div>;
}

// ────────────────────────────────────────────────────────────────────────────
// A. 关于 DCT · 3 个方向
// ────────────────────────────────────────────────────────────────────────────

// A-1. 杂志 · 客厅手札（serif heavy / drop cap / 引文居中）
function AboutMagazine() {
  return (
    <PhoneFrame height={900}>
      <MiniHeader title="关于 DCT" />
      {/* 卷首 */}
      <div style={{ padding: '40px 30px 24px', textAlign: 'center', background: T.card }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 6, color: T.muted }}>ISSUE №0 · 卷首语</div>
        <div style={{ width: 28, height: 1, background: T.gold, margin: '14px auto' }} />
        <div style={{
          fontFamily: T.serif, fontSize: 28, fontWeight: 900, color: T.ink,
          letterSpacing: 4, lineHeight: 1.35,
        }}>客厅里的<br/>家庭学术沙龙</div>
        <div style={{
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.muted,
          marginTop: 14, letterSpacing: 1,
        }}>—— 写给打算认真胡思乱想的你</div>
      </div>

      {/* drop cap 段落 */}
      <div style={{ padding: '28px 30px 0', background: T.card }}>
        <div style={{ fontSize: 13.5, color: T.text, lineHeight: 1.95, textWrap: 'pretty' }}>
          <span style={{
            float: 'left', fontFamily: T.serif, fontSize: 56, fontWeight: 900,
            color: T.ink, lineHeight: 0.9, marginRight: 8, marginTop: 6,
          }}>春</span>
          天的某个下午，三个非典型的精神科 PhD 坐在同一个客厅里，发现彼此都在等待同一件事——
          <em style={{ color: T.navy, fontStyle: 'normal', borderBottom: `1px solid ${T.gold}` }}>愿意慢下来，认真聊点不那么有用但很重要的事</em>。
          于是我们把每月一次的客厅日午后，叫做 DCT。
        </div>
      </div>

      {/* 引文 */}
      <div style={{
        padding: '32px 40px', textAlign: 'center', background: T.card,
      }}>
        <div style={{ fontFamily: T.serif, fontSize: 64, color: T.gold, lineHeight: 0.3, height: 24 }}>“</div>
        <div style={{
          fontFamily: T.serif, fontSize: 18, color: T.navy, lineHeight: 1.7, fontStyle: 'italic',
          letterSpacing: 0.5,
        }}>不必非得"有用"才值得讨论。<br/>但讨论时要保留科学训练给我们的那份认真。</div>
        <div style={{ width: 28, height: 1, background: T.gold, margin: '14px auto' }} />
      </div>

      {/* meaning rows · 字典体 */}
      <div style={{ padding: '8px 30px 32px', background: T.card }}>
        <Kicker text="DCT · 词条" />
        {[
          ['n.', 'Dog · Chef · Therapist', '三个人的三种身份'],
          ['n.', 'Doctors\' Crazy Thinking', '一群医生的胡思乱想'],
          ['v.', '认真地胡思乱想', '用科学的态度，聊天马行空的奇思妙想', true],
        ].map((row, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, padding: '14px 0',
            borderTop: i === 0 ? `0.5px solid ${T.divider}` : 'none',
            borderBottom: `0.5px solid ${T.divider}`,
          }}>
            <div style={{
              fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.muted,
              width: 28, paddingTop: 3, flexShrink: 0,
            }}>{row[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: T.serif, fontSize: row[3] ? 17 : 14, fontWeight: row[3] ? 900 : 700,
                color: row[3] ? T.ink : T.navy, letterSpacing: 0.5, lineHeight: 1.4,
              }}>{row[1]}</div>
              <div style={{
                fontSize: 12.5, color: row[3] ? T.warmInk : T.muted, marginTop: 4, lineHeight: 1.5,
              }}>{row[2]}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 暖色 closing */}
      <div style={{ padding: 22 }}>
        <div style={{
          background: `linear-gradient(135deg, ${T.warmBg} 0%, ${T.warmBg2} 100%)`,
          borderRadius: 16, padding: '22px 24px', textAlign: 'center',
        }}>
          <div style={{
            fontFamily: T.serif, fontSize: 17, fontWeight: 700, color: T.warmInk, lineHeight: 1.5,
          }}>期待和你一起，<br/>建设这块精神自留地。</div>
          <div style={{
            fontFamily: T.mono, fontSize: 10, color: T.warmText, marginTop: 8, letterSpacing: 2,
          }}>DCT · EST. 2026 · CHENGDU</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// A-2. 时间轴 · 客厅缘起（gold vertical timeline）
function AboutTimeline() {
  const nodes = [
    { tag: '2026·春', title: '一个下午，三张椅子', body: '三个精神科 PhD 在玉林一间公寓里碰头，本来想聊新论文，结果聊到深夜。', icon: 'sofa' },
    { tag: '一周后',  title: '一只狗、一道菜、一次对话', body: '我们意识到，比起会议室，自家的客厅才是最适合「不绕弯子」的地方。', icon: 'three' },
    { tag: '反复几次', title: '在绩效之外', body: '想留一块地，专门长那些功利逻辑里长不出来的东西。', icon: 'seed' },
    { tag: '取名',     title: '认真地胡思乱想', body: 'D、C、T 各取一字——也是 Doctors\' Crazy Thinking。', icon: 'brand' },
    { tag: '至今',     title: '每期一位主讲人 · 一道甜点 · 十几个人', body: '没有 PPT 也行，不正襟危坐也行，说错话也行。', icon: 'living' },
    { tag: '下一站',   title: '你', body: '欢迎你也来——一起建设这块自留地。', icon: 'star' },
  ];
  const Icon = ({ kind }) => {
    const props = { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none', stroke: T.navy, strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
    if (kind === 'sofa')   return <svg {...props}><path d="M3 14v3M19 14v3M3 14a2 2 0 012-2h12a2 2 0 012 2M5 12V8a2 2 0 012-2h8a2 2 0 012 2v4"/></svg>;
    if (kind === 'three')  return <svg {...props}><circle cx="6" cy="11" r="2.5"/><circle cx="11" cy="11" r="2.5"/><circle cx="16" cy="11" r="2.5"/></svg>;
    if (kind === 'seed')   return <svg {...props}><path d="M11 18V9M11 9c-3-2-5-2-5-5 3 0 5 2 5 5zM11 9c3-2 5-2 5-5-3 0-5 2-5 5z"/><path d="M5 18h12"/></svg>;
    if (kind === 'brand')  return <svg {...props}><text x="11" y="15" textAnchor="middle" fontFamily={T.serif} fontWeight="900" fontSize="11" fill={T.navy} stroke="none">DCT</text></svg>;
    if (kind === 'living') return <svg {...props}><rect x="3" y="6" width="16" height="10" rx="1"/><path d="M7 16v2M15 16v2M3 11h16"/></svg>;
    if (kind === 'star')   return <svg {...props} fill={T.gold} stroke="none"><path d="M11 2l2 6 6 1-4.5 4.5L16 20l-5-3-5 3 1.5-6.5L3 9l6-1z"/></svg>;
    return null;
  };
  return (
    <PhoneFrame height={1000}>
      <MiniHeader title="关于 DCT" />
      <div style={{ padding: '24px 26px 6px' }}>
        <Kicker text="DCT · 客厅缘起" />
        <div style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 900, color: T.ink, letterSpacing: 1.5 }}>
          从一个客厅日午后<br/>到一块精神自留地
        </div>
        <div style={{ fontSize: 12.5, color: T.muted, marginTop: 8, lineHeight: 1.7 }}>
          下面是 DCT 怎么长出来的——比官方简介人话一点。
        </div>
      </div>
      {/* timeline */}
      <div style={{ padding: '24px 26px 30px', position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 38, top: 24, bottom: 30, width: 1,
          background: `linear-gradient(180deg, ${T.gold} 0%, ${T.goldHi} 60%, transparent 100%)`,
        }} />
        {nodes.map((n, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', paddingBottom: 22, position: 'relative' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 14, background: T.card,
              border: `1.5px solid ${T.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, position: 'relative', zIndex: 1,
              boxShadow: '0 2px 6px rgba(201,162,74,0.25)',
            }}>
              <Icon kind={n.icon} />
            </div>
            <div style={{ flex: 1, paddingTop: 2 }}>
              <div style={{
                fontFamily: T.mono, fontSize: 10, color: T.gold, letterSpacing: 2, marginBottom: 4,
              }}>{n.tag.toUpperCase()}</div>
              <div style={{
                fontFamily: T.serif, fontSize: 15.5, fontWeight: 800, color: T.ink, letterSpacing: 0.5, lineHeight: 1.4,
              }}>{n.title}</div>
              <div style={{ fontSize: 12.5, color: T.text, marginTop: 5, lineHeight: 1.75 }}>{n.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 22px 30px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${T.warmBg}, ${T.warmBg2})`,
          borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: 13, fontWeight: 700, color: T.warmInk }}>看看本期</div>
            <div style={{ fontSize: 11, color: T.warmText, marginTop: 2 }}>vol.02 · 六星之路</div>
          </div>
          <div style={{ fontSize: 18, color: T.warmInk }}>→</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// A-3. 空间感 · 客厅平面图（floor plan + 物件解说）
function AboutSpatial() {
  return (
    <PhoneFrame height={1020}>
      <MiniHeader title="关于 DCT" />
      <div style={{ padding: '22px 26px 8px' }}>
        <Kicker text="DCT · 一张客厅平面图" />
        <div style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 900, color: T.ink, letterSpacing: 1 }}>
          这里有三个 PhD<br/>和一只狗
        </div>
        <div style={{ fontSize: 12, color: T.muted, marginTop: 8, lineHeight: 1.7 }}>
          点亮任意一处，听听这件物品在 DCT 的位置。
        </div>
      </div>

      {/* floorplan SVG */}
      <div style={{ padding: '14px 22px 6px' }}>
        <div style={{
          background: T.card, borderRadius: 16, padding: 18,
          border: `0.5px solid ${T.divider}`,
        }}>
          <svg viewBox="0 0 280 200" style={{ width: '100%', display: 'block' }}>
            {/* 户型外框 */}
            <rect x="6" y="6" width="268" height="188" rx="4" fill="none" stroke={T.navy} strokeWidth="1.2"/>
            {/* 内墙 */}
            <line x1="6" y1="80" x2="100" y2="80" stroke={T.navy} strokeWidth="0.8" strokeDasharray="3 2"/>
            <line x1="100" y1="6" x2="100" y2="80" stroke={T.navy} strokeWidth="0.8" strokeDasharray="3 2"/>
            <line x1="190" y1="80" x2="274" y2="80" stroke={T.navy} strokeWidth="0.8" strokeDasharray="3 2"/>
            {/* 客厅区 标签 */}
            <text x="140" y="135" textAnchor="middle" fontFamily={T.mono} fontSize="7" fill={T.muted} letterSpacing="2">LIVING ROOM</text>
            {/* 沙发 */}
            <rect x="60" y="105" width="160" height="22" rx="6" fill={T.dividerSoft} stroke={T.navy} strokeWidth="0.8"/>
            {/* 茶几 */}
            <rect x="120" y="138" width="40" height="20" rx="3" fill="none" stroke={T.gold} strokeWidth="1"/>
            {/* 厨房 */}
            <text x="48" y="44" textAnchor="middle" fontFamily={T.mono} fontSize="7" fill={T.muted} letterSpacing="2">KITCHEN</text>
            <rect x="14" y="50" width="80" height="20" rx="2" fill="none" stroke={T.navy} strokeWidth="0.8"/>
            {/* 阳台 */}
            <text x="234" y="44" textAnchor="middle" fontFamily={T.mono} fontSize="7" fill={T.muted} letterSpacing="2">BALCONY</text>
            <rect x="194" y="50" width="76" height="20" rx="2" fill="none" stroke={T.navy} strokeWidth="0.8"/>
            {/* 三个圆点·主创位置 */}
            <g>
              <circle cx="80" cy="116" r="6" fill={T.gold}/>
              <text x="80" y="119" textAnchor="middle" fontFamily={T.serif} fontWeight="900" fontSize="8" fill={T.card}>D</text>
            </g>
            <g>
              <circle cx="140" cy="116" r="6" fill={T.navy}/>
              <text x="140" y="119" textAnchor="middle" fontFamily={T.serif} fontWeight="900" fontSize="8" fill={T.card}>C</text>
            </g>
            <g>
              <circle cx="200" cy="116" r="6" fill={T.gold}/>
              <text x="200" y="119" textAnchor="middle" fontFamily={T.serif} fontWeight="900" fontSize="8" fill={T.card}>T</text>
            </g>
            {/* 狗骨 */}
            <g transform="translate(170,170)">
              <ellipse cx="0" cy="0" rx="6" ry="3" fill={T.muted} opacity="0.6"/>
              <text x="0" y="14" textAnchor="middle" fontFamily={T.mono} fontSize="6" fill={T.muted}>狗</text>
            </g>
            {/* 甜品 */}
            <g transform="translate(50,170)">
              <rect x="-6" y="-3" width="12" height="6" rx="2" fill={T.gold} opacity="0.6"/>
              <text x="0" y="14" textAnchor="middle" fontFamily={T.mono} fontSize="6" fill={T.muted}>甜品</text>
            </g>
            {/* 笔记本 */}
            <g transform="translate(245,160)">
              <rect x="-5" y="-4" width="10" height="8" rx="1" fill="none" stroke={T.navy} strokeWidth="0.8"/>
              <text x="0" y="14" textAnchor="middle" fontFamily={T.mono} fontSize="6" fill={T.muted}>本</text>
            </g>
          </svg>
        </div>
      </div>

      {/* 物件解说卡 */}
      <div style={{ padding: '18px 22px 6px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { dot: T.gold,  letter: 'D', name: '包文欣 · Dog',       desc: '把对一只狗的耐心，复刻进每一个提问里。' },
          { dot: T.navy,  letter: 'C', name: '徐佳淇 · Chef',      desc: '相信好食物能让人放松地说真话。' },
          { dot: T.gold,  letter: 'T', name: '曹栖源 · Therapist', desc: '把临床的「倾听肌肉」搬进客厅。' },
        ].map((p, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, alignItems: 'center',
            background: T.card, borderRadius: 12, padding: '10px 14px',
            border: `0.5px solid ${T.divider}`,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 12, background: p.dot,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.serif, fontWeight: 900, fontSize: 12, color: T.card, flexShrink: 0,
            }}>{p.letter}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.serif, fontSize: 13.5, fontWeight: 700, color: T.ink }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: T.muted, marginTop: 2, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 物件解说·甜品/狗骨/笔记 */}
      <div style={{ padding: '14px 22px 30px' }}>
        <Kicker text="客厅里的物件" gap={10} />
        <div style={{ fontSize: 12, color: T.text, lineHeight: 1.85 }}>
          <strong style={{ color: T.gold }}>· 甜品</strong>　由 C 设计，每期一道限定季节款。<br/>
          <strong style={{ color: T.gold }}>· 笔记</strong>　由 T 记录，但永远写不到一半。<br/>
          <strong style={{ color: T.gold }}>· 狗骨</strong>　由 D 的狗放在角落，没人坐它的位置。
        </div>
      </div>
    </PhoneFrame>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// B. 三主创卡 · 4 种占位风格
// ────────────────────────────────────────────────────────────────────────────

function CreatorBaseline() {
  return <CCard portrait={
    <div style={{
      width: 64, height: 64, borderRadius: 12,
      background: 'linear-gradient(135deg, #e7f0fa 0%, #9dbfe3 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      <div style={{ fontFamily: T.serif, fontSize: 36, fontWeight: 900, color: T.navy, opacity: 0.55 }}>D</div>
      <div style={{
        position: 'absolute', bottom: 4, left: 0, right: 0, textAlign: 'center',
        fontFamily: T.mono, fontSize: 8, color: T.navy, letterSpacing: 1, opacity: 0.6,
      }}>PORTRAIT</div>
    </div>
  } title="基线 · D/C/T 大字" subtitle="当前实装 · 蓝渐变 + 大字母" />;
}

function CreatorObjectIcon() {
  return <CCard portrait={
    <div style={{
      width: 64, height: 64, borderRadius: 12,
      background: T.warmBg, border: `0.5px solid #e8dcc0`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke={T.warmInk} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {/* 狗骨 */}
        <path d="M9 22a3.5 3.5 0 010-5 3 3 0 014-1 3 3 0 014-3 3.5 3.5 0 015 4 3 3 0 011 4 3.5 3.5 0 01-4 0 3 3 0 01-4 3 3 3 0 01-4-2 3.5 3.5 0 01-2 0z"/>
      </svg>
      <div style={{
        position: 'absolute', bottom: 4, left: 0, right: 0, textAlign: 'center',
        fontFamily: T.mono, fontSize: 7.5, color: T.warmInk, letterSpacing: 1.5, opacity: 0.7,
      }}>DOG</div>
    </div>
  } title="客厅物件占位" subtitle="暖米 + 简笔 SVG · 狗骨 / 汤勺 / 笔记本" />;
}

function CreatorSilhouette() {
  return <CCard portrait={
    <div style={{
      width: 64, height: 64, borderRadius: 12, overflow: 'hidden', position: 'relative',
      background: `linear-gradient(180deg, ${T.warmBg} 0%, #e9d9b8 100%)`,
    }}>
      {/* 客厅剪影 */}
      <svg viewBox="0 0 64 64" style={{ position: 'absolute', inset: 0 }}>
        <rect x="0" y="44" width="64" height="20" fill={T.warmInk} opacity="0.85"/>
        {/* 三个剪影 */}
        <circle cx="18" cy="34" r="6" fill={T.warmInk}/>
        <rect x="13" y="38" width="10" height="14" fill={T.warmInk}/>
        <circle cx="32" cy="32" r="6" fill={T.warmInk}/>
        <rect x="27" y="36" width="10" height="16" fill={T.warmInk}/>
        <circle cx="46" cy="34" r="6" fill={T.warmInk}/>
        <rect x="41" y="38" width="10" height="14" fill={T.warmInk}/>
        <circle cx="55" cy="50" r="2" fill={T.gold}/>
      </svg>
      <div style={{
        position: 'absolute', top: 4, left: 4,
        fontFamily: T.serif, fontWeight: 900, fontSize: 11, color: T.card,
      }}>D</div>
    </div>
  } title="三人合影剪影" subtitle="客厅景深 · 三个剪影 + 主角字母角标" />;
}

function CreatorMonogram() {
  return <CCard portrait={
    <div style={{
      width: 64, height: 64, borderRadius: 12, overflow: 'hidden', position: 'relative',
      background: `radial-gradient(circle at 30% 30%, ${T.goldHi} 0%, ${T.gold} 60%, ${T.warmInk} 100%)`,
    }}>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.serif, fontWeight: 900, fontSize: 40, color: T.card,
        textShadow: '0 2px 4px rgba(0,0,0,0.15)',
      }}>D</div>
      {/* 装饰圆弧 */}
      <svg viewBox="0 0 64 64" style={{ position: 'absolute', inset: 0 }}>
        <circle cx="32" cy="32" r="29" fill="none" stroke={T.card} strokeWidth="0.4" opacity="0.5"/>
        <circle cx="32" cy="32" r="24" fill="none" stroke={T.card} strokeWidth="0.4" opacity="0.3" strokeDasharray="2 2"/>
      </svg>
      <div style={{
        position: 'absolute', bottom: 3, left: 0, right: 0, textAlign: 'center',
        fontFamily: T.mono, fontSize: 7, color: T.card, letterSpacing: 1.5, opacity: 0.8,
      }}>DOG · 包文欣</div>
    </div>
  } title="渐变字母徽章" subtitle="升级版基线 · 金色渐变 + 圆环 + 名字" />;
}

function CCard({ portrait, title, subtitle }) {
  return (
    <PhoneFrame height={360} scrollable={false}>
      <div style={{ padding: '24px 22px' }}>
        <Kicker text="WHO · 三位主创" />
        <div style={{
          background: T.card, borderRadius: 14, padding: 14, marginTop: 8,
          border: `0.5px solid ${T.divider}`, display: 'flex', gap: 14,
        }}>
          {portrait}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 700, color: T.ink }}>包文欣</div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: 1.5 }}>DOG</div>
            </div>
            <div style={{ fontSize: 11, color: T.gold, letterSpacing: 1, marginBottom: 6 }}>狗子</div>
            <div style={{ fontSize: 12, color: T.textSoft, lineHeight: 1.6 }}>
              重度爱狗人士。把对一只狗的耐心、好奇和温柔，复刻进对每一个人的提问里。
            </div>
          </div>
        </div>
        <div style={{ marginTop: 18, padding: '12px 14px', background: T.dividerSoft, borderRadius: 10 }}>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.muted, letterSpacing: 2, marginBottom: 4 }}>STYLE</div>
          <div style={{ fontSize: 12.5, color: T.ink, fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 11.5, color: T.muted, marginTop: 3, lineHeight: 1.6 }}>{subtitle}</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// C. 往期回顾 · 时间轴列表（option 3） 3 个变体
// ────────────────────────────────────────────────────────────────────────────

const PAST = [
  { num: 1, date: '2026.03.28', title: '客厅里的第一次', sub: '三主创开场 · Dog · Chef · Therapist', tag: '主创' },
  { num: 2, date: '2026.04.25', title: '六星之路', sub: '高晓蓉 · 我的目标管理与坚持哲学', tag: '本期·报名中' },
];

function ReviewTimelineClassic() {
  return (
    <PhoneFrame height={680}>
      <MiniHeader title="往期回顾" />
      <div style={{ padding: '22px 26px 6px' }}>
        <Kicker text="DCT · ARCHIVE" />
        <div style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 900, color: T.ink, letterSpacing: 1 }}>一期一会</div>
        <div style={{ fontSize: 12, color: T.muted, marginTop: 6 }}>每一期沙龙的主题、主讲人与当日留痕。</div>
      </div>
      <div style={{ padding: '20px 26px 30px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 38, top: 16, bottom: 30, width: 1, background: T.gold }} />
        {PAST.slice().reverse().map((p, i) => (
          <div key={p.num} style={{ display: 'flex', gap: 16, paddingBottom: 22, position: 'relative' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 14, background: T.card, border: `1.5px solid ${T.gold}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              fontFamily: T.mono, fontSize: 11, fontWeight: 700, color: T.gold,
              boxShadow: '0 2px 6px rgba(201,162,74,0.2)',
            }}>{p.num.toString().padStart(2,'0')}</div>
            <div style={{
              flex: 1, background: T.card, borderRadius: 12, padding: 12,
              border: `0.5px solid ${T.divider}`, boxShadow: '0 2px 8px rgba(15,40,85,0.04)',
              display: 'flex', gap: 12,
            }}>
              <div style={{
                width: 64, height: 64, flexShrink: 0, borderRadius: 8, overflow: 'hidden',
                background: `linear-gradient(135deg, ${T.dividerSoft}, ${T.divider})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 26, height: 26,
                  clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)',
                  background: 'rgba(26,58,120,0.4)',
                }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.muted, letterSpacing: 1.5 }}>VOL.0{p.num} · {p.date}</div>
                <div style={{ fontFamily: T.serif, fontSize: 15, fontWeight: 800, color: T.ink, marginTop: 3, lineHeight: 1.3 }}>{p.title}</div>
                <div style={{ fontSize: 11.5, color: T.muted, marginTop: 3, lineHeight: 1.5 }}>{p.sub}</div>
              </div>
            </div>
          </div>
        ))}
        {/* upcoming */}
        <div style={{ display: 'flex', gap: 16, position: 'relative' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 14, background: T.card, border: `1.5px dashed ${T.muted}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            fontFamily: T.mono, fontSize: 11, color: T.muted,
          }}>?</div>
          <div style={{
            flex: 1, padding: 12, border: `0.5px dashed ${T.divider}`, borderRadius: 12, textAlign: 'center',
          }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.hint, letterSpacing: 2 }}>VOL.03 · UPCOMING</div>
            <div style={{ fontFamily: T.serif, fontSize: 13.5, color: T.muted, marginTop: 4, fontWeight: 600 }}>下一期主题酝酿中</div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ReviewTimelineNumeric() {
  return (
    <PhoneFrame height={680}>
      <MiniHeader title="往期回顾" />
      <div style={{ padding: '22px 26px 8px' }}>
        <Kicker text="DCT · ARCHIVE" />
        <div style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 900, color: T.ink, letterSpacing: 1 }}>一期一会</div>
      </div>
      <div style={{ padding: '14px 26px 30px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 62, top: 14, bottom: 30, width: 1, background: `${T.gold}55` }} />
        {PAST.slice().reverse().map(p => (
          <div key={p.num} style={{ display: 'flex', gap: 18, paddingBottom: 26, alignItems: 'flex-start' }}>
            <div style={{ width: 50, textAlign: 'right', flexShrink: 0, paddingTop: 2 }}>
              <div style={{
                fontFamily: T.serif, fontSize: 32, fontWeight: 900, color: T.gold, lineHeight: 0.9, letterSpacing: -1,
              }}>{p.num.toString().padStart(2,'0')}</div>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.muted, letterSpacing: 1.5, marginTop: 6 }}>{p.date.slice(5)}</div>
            </div>
            <div style={{
              width: 9, height: 9, borderRadius: 5, background: T.gold, marginTop: 8,
              boxShadow: `0 0 0 3px ${T.card}, 0 0 0 4px ${T.gold}33`, flexShrink: 0,
            }} />
            <div style={{ flex: 1, minWidth: 0, paddingTop: 0 }}>
              <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 800, color: T.ink, lineHeight: 1.3 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: T.textSoft, marginTop: 4, lineHeight: 1.6 }}>{p.sub}</div>
              <div style={{ display: 'inline-block', marginTop: 8,
                fontFamily: T.mono, fontSize: 9.5, color: T.muted, letterSpacing: 1.5,
                padding: '3px 8px', border: `0.5px solid ${T.divider}`, borderRadius: 10,
              }}>{p.tag}</div>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
          <div style={{ width: 50, textAlign: 'right', paddingTop: 2 }}>
            <div style={{ fontFamily: T.serif, fontSize: 32, fontWeight: 900, color: T.muted, opacity: 0.4, lineHeight: 0.9 }}>03</div>
          </div>
          <div style={{
            width: 9, height: 9, borderRadius: 5, background: T.card, border: `1.5px dashed ${T.muted}`, marginTop: 8, flexShrink: 0,
          }} />
          <div style={{ flex: 1, fontFamily: T.serif, fontSize: 14, fontWeight: 600, color: T.muted, paddingTop: 4 }}>
            下一期主题酝酿中…
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ReviewTimelineImmersive() {
  return (
    <PhoneFrame height={840}>
      <MiniHeader title="往期回顾" />
      <div style={{ padding: '22px 26px 8px' }}>
        <Kicker text="DCT · ARCHIVE" />
        <div style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 900, color: T.ink, letterSpacing: 1 }}>一期一会 · 留痕</div>
      </div>
      <div style={{ padding: '16px 22px 30px' }}>
        {PAST.slice().reverse().map((p, i) => (
          <div key={p.num} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 7, height: 7, borderRadius: 4, background: T.gold,
                boxShadow: `0 0 0 3px ${T.card}, 0 0 0 4px ${T.gold}33`,
              }} />
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.gold, letterSpacing: 2 }}>VOL.0{p.num} · {p.date}</div>
              <div style={{ flex: 1, height: 1, background: `${T.gold}33` }} />
            </div>
            {/* 大封面占位 */}
            <div style={{
              borderRadius: 14, overflow: 'hidden', position: 'relative',
              height: 180,
              background: i === 0
                ? `linear-gradient(135deg, ${T.navy} 0%, ${T.ink} 100%)`
                : `linear-gradient(135deg, ${T.warmBg} 0%, ${T.warmBg2} 100%)`,
            }}>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 50, height: 50,
                  clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)',
                  background: i === 0 ? 'rgba(233,185,73,0.6)' : 'rgba(107,76,30,0.4)',
                }} />
              </div>
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0, padding: '40px 18px 14px',
                background: i === 0
                  ? 'linear-gradient(180deg, transparent, rgba(15,40,85,0.95))'
                  : 'linear-gradient(180deg, transparent, rgba(107,76,30,0.85))',
                color: T.card,
              }}>
                <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 900, lineHeight: 1.2 }}>{p.title}</div>
                <div style={{ fontSize: 11.5, opacity: 0.85, marginTop: 4 }}>{p.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// D. 往期详情 · 3 个变体（用 vol.01 内容）
// ────────────────────────────────────────────────────────────────────────────

const V1 = {
  num: 1, date: '2026.03.28', title: '客厅里的第一次',
  sub: '三主创共同开场 · Dog · Chef · Therapist',
  speaker: '包文欣 / 徐佳淇 / 曹栖源 · DCT 三主创',
  recap: '这一晚，三个非典型的精神科 PhD 第一次把客厅打开。从「为什么是客厅」聊到「不必非得有用」，从甜品的火候聊到心理咨询师怎么收住自己的好奇心。讨论持续到午夜，狗子在沙发底下睡着了。',
  highlights: [
    { q: '在绩效逻辑之外，留一块真诚分享的精神自留地。', a: '曹栖源' },
    { q: '客厅没有讲台，所以谁也别端着。', a: '包文欣' },
    { q: '一道好甜品，能让一个不爱说话的人开口。', a: '徐佳淇' },
  ],
  voices: [
    { who: '听众 A · 神经科学博士',  text: '本来以为是另一个学术分享，但更像一次朋友聚会。我下次还来。' },
    { who: '听众 B · 编辑',          text: '难得听到三个 PhD 不打太极。' },
  ],
  photos: 4,
};

// D-1. 经典阅读流（hero → speaker → recap → 金句 → 照片 → 感言 → 下期）
function ReviewDetailClassic() {
  return (
    <PhoneFrame height={1480}>
      <MiniHeader title={`回顾 · VOL.0${V1.num}`} />
      {/* HERO */}
      <div style={{
        height: 220, position: 'relative',
        background: `linear-gradient(135deg, ${T.navy} 0%, ${T.ink} 100%)`,
      }}>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 70, height: 70,
            clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)',
            background: 'rgba(233,185,73,0.6)',
          }} />
        </div>
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, padding: '50px 22px 18px',
          background: 'linear-gradient(180deg, transparent, rgba(15,40,85,0.9))',
          color: T.card,
        }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, opacity: 0.85, letterSpacing: 3 }}>VOL.0{V1.num} · {V1.date}</div>
          <div style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 900, marginTop: 4, lineHeight: 1.2 }}>{V1.title}</div>
          <div style={{ fontSize: 11.5, opacity: 0.85, marginTop: 4 }}>{V1.sub}</div>
        </div>
      </div>

      {/* SPEAKER */}
      <Block kicker="SPEAKER" title="主讲人">
        <div style={{ fontSize: 13, color: T.text, lineHeight: 1.7 }}>{V1.speaker}</div>
      </Block>

      {/* RECAP */}
      <Block kicker="RECAP" title="当日留痕">
        <div style={{ fontSize: 13, color: T.text, lineHeight: 1.85, textWrap: 'pretty' }}>{V1.recap}</div>
      </Block>

      {/* 金句墙 */}
      <Block kicker="HIGHLIGHTS" title="几句金句">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {V1.highlights.map((h, i) => (
            <div key={i} style={{
              background: 'linear-gradient(180deg, rgba(233,185,73,0.10), rgba(233,185,73,0.02))',
              borderLeft: `2px solid ${T.gold}`, padding: '12px 14px',
              borderRadius: '0 12px 12px 0',
              display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-end',
            }}>
              <div>
                <div style={{ fontFamily: T.serif, fontSize: 14, color: T.navy, lineHeight: 1.7, fontStyle: 'italic' }}>
                  「{h.q}」
                </div>
                <div style={{ fontSize: 11, color: T.mutedSoft, marginTop: 6, letterSpacing: 1 }}>— {h.a}</div>
              </div>
              <div style={{
                fontFamily: T.mono, fontSize: 9, color: T.goldSoft, letterSpacing: 1.5,
                padding: '3px 6px', border: `0.5px solid ${T.gold}66`, borderRadius: 8, flexShrink: 0,
              }}>分享 ↗</div>
            </div>
          ))}
        </div>
      </Block>

      {/* 照片墙 */}
      <Block kicker="PHOTOS" title="当日照片">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {Array.from({ length: V1.photos }).map((_, i) => (
            <div key={i} style={{
              aspectRatio: '1/1', borderRadius: 6,
              background: `linear-gradient(${135 + i*30}deg, ${T.dividerSoft}, ${T.divider})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.mono, fontSize: 9, color: T.muted, letterSpacing: 1,
            }}>P{i + 1}</div>
          ))}
        </div>
      </Block>

      {/* VOICES */}
      <Block kicker="VOICES" title="他们说">
        {V1.voices.map((v, i) => (
          <div key={i} style={{
            background: T.card, borderRadius: 12, padding: '12px 14px', marginBottom: 8,
            border: `0.5px solid ${T.divider}`,
          }}>
            <div style={{ fontSize: 12.5, color: T.text, lineHeight: 1.7 }}>{v.text}</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, marginTop: 6, letterSpacing: 1 }}>— {v.who}</div>
          </div>
        ))}
      </Block>

      {/* 下一期 */}
      <div style={{ padding: '24px 22px 30px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${T.warmBg}, ${T.warmBg2})`,
          borderRadius: 14, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.warmText, letterSpacing: 2 }}>NEXT · VOL.02</div>
            <div style={{ fontFamily: T.serif, fontSize: 15, fontWeight: 800, color: T.warmInk, marginTop: 3 }}>六星之路</div>
          </div>
          <div style={{ fontSize: 18, color: T.warmInk }}>→</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Block({ kicker, title, children }) {
  return (
    <div style={{ padding: '22px 22px 0' }}>
      <Kicker text={kicker} />
      <div style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 700, color: T.ink, marginTop: 2, marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}

// D-2. 杂志感（封面 + 引文穿插）
function ReviewDetailMagazine() {
  return (
    <PhoneFrame height={1280}>
      <MiniHeader title={`回顾 · VOL.0${V1.num}`} />
      {/* 封面 · 大引文 */}
      <div style={{
        background: T.card, padding: '36px 28px 30px', textAlign: 'center',
        borderBottom: `0.5px solid ${T.divider}`,
      }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: 5 }}>VOL.01 · {V1.date}</div>
        <div style={{ width: 30, height: 1, background: T.gold, margin: '14px auto' }} />
        <div style={{
          fontFamily: T.serif, fontSize: 28, fontWeight: 900, color: T.ink, lineHeight: 1.3, letterSpacing: 1,
        }}>{V1.title}</div>
        <div style={{
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 12.5, color: T.muted, marginTop: 12,
        }}>{V1.sub}</div>
      </div>

      {/* 大照片占位 */}
      <div style={{
        height: 200, background: `linear-gradient(135deg, ${T.dividerSoft}, ${T.divider})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 60, height: 60,
          clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)',
          background: 'rgba(26,58,120,0.35)',
        }} />
      </div>

      {/* 双栏 · 主文 + 边栏金句 */}
      <div style={{ padding: '28px 26px', display: 'grid', gridTemplateColumns: '1fr 80px', gap: 16, background: T.card }}>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.gold, letterSpacing: 3, marginBottom: 6 }}>RECAP</div>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.95, textWrap: 'pretty' }}>
            <span style={{
              float: 'left', fontFamily: T.serif, fontSize: 48, fontWeight: 900, color: T.navy, lineHeight: 0.9, marginRight: 6, marginTop: 4,
            }}>这</span>
            一晚，三个非典型的精神科 PhD 第一次把客厅打开。从「为什么是客厅」聊到「不必非得有用」，从甜品的火候聊到心理咨询师怎么收住自己的好奇心。
          </div>
        </div>
        <div style={{ paddingTop: 16 }}>
          <div style={{ width: 1, height: 28, background: T.gold, marginBottom: 8 }} />
          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.muted, lineHeight: 1.5,
          }}>「客厅没有讲台，所以谁也别端着。」</div>
        </div>
      </div>

      {/* 大引文 break */}
      <div style={{
        background: `linear-gradient(135deg, ${T.navy}, ${T.ink})`,
        padding: '36px 30px', textAlign: 'center', color: T.card,
      }}>
        <div style={{ fontFamily: T.serif, fontSize: 56, lineHeight: 0.3, height: 24, color: T.gold }}>“</div>
        <div style={{
          fontFamily: T.serif, fontSize: 19, fontWeight: 700, lineHeight: 1.6, fontStyle: 'italic', letterSpacing: 0.5,
        }}>在绩效逻辑之外，<br/>留一块真诚分享的<br/>精神自留地。</div>
        <div style={{
          fontFamily: T.mono, fontSize: 10, marginTop: 16, letterSpacing: 2, opacity: 0.8,
        }}>— 曹栖源</div>
      </div>

      {/* 三句金句横排 */}
      <div style={{ padding: '24px 22px', background: T.card }}>
        <Kicker text="HIGHLIGHTS" gap={10} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
          {V1.highlights.slice(0, 2).map((h, i) => (
            <div key={i} style={{
              borderTop: `0.5px solid ${T.divider}`, paddingTop: 10,
            }}>
              <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.navy, lineHeight: 1.6 }}>{h.q}</div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, marginTop: 4, letterSpacing: 1.5 }}>— {h.a} · 分享 ↗</div>
            </div>
          ))}
        </div>
      </div>

      {/* 感言 */}
      <Block kicker="VOICES" title="听众说">
        {V1.voices.map((v, i) => (
          <div key={i} style={{
            fontSize: 12.5, color: T.text, lineHeight: 1.7, marginBottom: 12,
            paddingLeft: 12, borderLeft: `2px solid ${T.divider}`,
          }}>
            "{v.text}"
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, marginTop: 4, letterSpacing: 1 }}>— {v.who}</div>
          </div>
        ))}
      </Block>
      <div style={{ height: 30 }} />
    </PhoneFrame>
  );
}

// D-3. 报纸感（serif heavy / 分栏感 / 大照片+小图穿插）
function ReviewDetailGazette() {
  return (
    <PhoneFrame height={1400}>
      <MiniHeader title={`回顾 · VOL.0${V1.num}`} />
      {/* 报纸头版 */}
      <div style={{
        background: '#fbf8f0', padding: '28px 22px 16px',
        borderBottom: `2px double ${T.warmInk}`,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          fontFamily: T.mono, fontSize: 9.5, color: T.warmText, letterSpacing: 2, marginBottom: 12,
        }}>
          <span>THE DCT GAZETTE</span>
          <span>VOL.01 · {V1.date}</span>
        </div>
        <div style={{
          fontFamily: T.serif, fontSize: 30, fontWeight: 900, color: T.warmInk,
          lineHeight: 1.15, letterSpacing: 0.5, textWrap: 'balance',
        }}>三个非典型 PhD，<br/>把客厅当成了讲堂</div>
        <div style={{
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.warmText, marginTop: 8, lineHeight: 1.5,
        }}>—— 这一晚，他们决定不再把"严谨"和"放松"对立起来。</div>
      </div>

      {/* 大照片+图说 */}
      <div style={{ padding: 14, background: '#fbf8f0' }}>
        <div style={{
          height: 180, borderRadius: 4,
          background: `linear-gradient(135deg, #d8c79e, #a88a4f)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.6)', fontFamily: T.mono, fontSize: 10, letterSpacing: 2,
        }}>PHOTO · 客厅合影</div>
        <div style={{
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 10.5, color: T.warmText,
          marginTop: 6, lineHeight: 1.5,
        }}>↑ 当晚十二点 · 沙发上还坐着五个人 / 摄：T</div>
      </div>

      {/* 双栏正文 */}
      <div style={{
        padding: '18px 22px 24px', background: '#fbf8f0',
        columns: 2, columnGap: 18, columnRule: `0.5px solid ${T.warmText}33`,
        fontSize: 12, lineHeight: 1.85, color: T.warmInk, textWrap: 'pretty',
      }}>
        <span style={{
          float: 'left', fontFamily: T.serif, fontSize: 44, fontWeight: 900,
          lineHeight: 0.85, marginRight: 5, marginTop: 4, color: T.gold,
        }}>「</span>
        客厅没有讲台，所以谁也别端着——这是 DCT 第一晚被反复提起的一句话。三位主创把"严谨"和"放松"重新拼到一起，发现并没有想象中那么割裂。
        <br/><br/>
        他们坚持，每一期一个主讲人，一份限定甜品，十几个人围坐在一起。「不必有用」是开场白，「能讲也能听」是规则。
      </div>

      {/* 金句小卡 */}
      <div style={{ padding: '22px 22px', background: T.card }}>
        <div style={{
          fontFamily: T.mono, fontSize: 10, color: T.warmInk, letterSpacing: 3, marginBottom: 10,
          borderTop: `1px solid ${T.warmInk}`, paddingTop: 10,
        }}>编辑挑选 · 三句金句 · 可单独分享</div>
        {V1.highlights.map((h, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, padding: '10px 0',
            borderBottom: i < V1.highlights.length - 1 ? `0.5px solid ${T.divider}` : 'none',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 11, background: T.warmInk, color: T.card,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.serif, fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.serif, fontSize: 13.5, color: T.warmInk, lineHeight: 1.6, fontStyle: 'italic' }}>{h.q}</div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.warmText, marginTop: 4, letterSpacing: 1 }}>— {h.a}</div>
            </div>
            <div style={{
              fontFamily: T.mono, fontSize: 9, color: T.warmText, letterSpacing: 1,
              padding: '3px 7px', border: `0.5px solid ${T.warmText}66`, borderRadius: 8, alignSelf: 'center', flexShrink: 0,
            }}>↗</div>
          </div>
        ))}
      </div>

      {/* 感言条 */}
      <div style={{ padding: '20px 22px 30px' }}>
        <Kicker text="READERS WROTE IN" gap={10} />
        {V1.voices.map((v, i) => (
          <div key={i} style={{
            fontFamily: T.serif, fontSize: 12.5, color: T.text, lineHeight: 1.7, padding: '8px 0',
            borderTop: `0.5px solid ${T.divider}`, fontStyle: 'italic',
          }}>
            "{v.text}"
            <div style={{ fontFamily: T.sans, fontStyle: 'normal', fontSize: 10.5, color: T.muted, marginTop: 4 }}>— {v.who}</div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// E. 金句卡 · 单独成图（可分享 / Canvas 海报）
// ────────────────────────────────────────────────────────────────────────────

const QUOTE = { q: '在绩效逻辑之外，留一块真诚分享的精神自留地。', a: '曹栖源', meta: 'DCT · VOL.01 · 2026.03.28' };

function QuoteMinimal() {
  return (
    <div style={{
      width: 360, height: 460, background: T.card, position: 'relative',
      padding: '50px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      fontFamily: T.sans,
    }}>
      <div>
        <div style={{ width: 36, height: 1, background: T.gold }} />
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: 3, marginTop: 10 }}>{QUOTE.meta}</div>
      </div>
      <div>
        <div style={{ fontFamily: T.serif, fontSize: 50, color: T.gold, lineHeight: 0.4, height: 20 }}>“</div>
        <div style={{
          fontFamily: T.serif, fontSize: 22, fontWeight: 800, color: T.ink,
          lineHeight: 1.55, letterSpacing: 0.5, textWrap: 'balance',
        }}>{QUOTE.q}</div>
        <div style={{
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.muted, marginTop: 18,
        }}>— {QUOTE.a}</div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div>
          <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 900, color: T.ink, letterSpacing: 4 }}>DCT</div>
          <div style={{ fontFamily: T.mono, fontSize: 9, color: T.muted, letterSpacing: 2, marginTop: 2 }}>认真地胡思乱想</div>
        </div>
        <div style={{
          width: 46, height: 46, border: `1px solid ${T.divider}`,
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(5, 1fr)',
        }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{ background: Math.random() > 0.45 ? T.ink : 'transparent' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function QuoteSky() {
  return (
    <div style={{
      width: 360, height: 460, position: 'relative', overflow: 'hidden',
      background: `linear-gradient(160deg, #e7f0fa 0%, #9dbfe3 60%, ${T.navy} 100%)`,
      padding: '40px 32px', color: T.card, fontFamily: T.sans,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* 光晕 */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: 100,
        background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
      }} />
      <div style={{ position: 'relative' }}>
        <div style={{
          fontFamily: T.mono, fontSize: 10, color: 'rgba(255,255,255,0.85)', letterSpacing: 3,
        }}>{QUOTE.meta}</div>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ fontFamily: T.serif, fontSize: 70, lineHeight: 0.4, height: 24, color: T.goldHi, opacity: 0.9 }}>“</div>
        <div style={{
          fontFamily: T.serif, fontSize: 23, fontWeight: 800, lineHeight: 1.55, letterSpacing: 0.5, textWrap: 'balance',
          textShadow: '0 2px 12px rgba(15,40,85,0.3)',
        }}>{QUOTE.q}</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginTop: 18,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 14, background: `linear-gradient(135deg, ${T.goldHi}, ${T.gold})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.serif, fontWeight: 900, fontSize: 14, color: T.card,
          }}>T</div>
          <div style={{ fontFamily: T.serif, fontSize: 14, fontStyle: 'italic' }}>— {QUOTE.a}</div>
        </div>
      </div>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 900, letterSpacing: 5 }}>DCT</div>
          <div style={{ fontFamily: T.mono, fontSize: 9, opacity: 0.8, letterSpacing: 2, marginTop: 3 }}>客厅里的家庭学术沙龙</div>
        </div>
        {/* 八角星装饰 */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 10 + i * 3, height: 10 + i * 3,
              clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)',
              background: T.goldHi, opacity: 0.5 + i * 0.2,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function QuotePoster() {
  return (
    <div style={{
      width: 360, height: 460, position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${T.warmInk} 0%, #3a2914 100%)`,
      fontFamily: T.sans,
    }}>
      {/* 背景照片占位 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 70% 30%, rgba(233,185,73,0.3) 0%, transparent 55%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.mono, fontSize: 10, color: 'rgba(255,255,255,0.12)', letterSpacing: 3,
      }}>PHOTO · 当晚客厅</div>

      {/* 玻璃面板 */}
      <div style={{
        position: 'absolute', left: 24, right: 24, top: 70, bottom: 24,
        background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(20px)',
        border: '0.5px solid rgba(255,255,255,0.25)', borderRadius: 12,
        padding: '26px 24px', color: T.card,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontFamily: T.mono, fontSize: 9.5, color: T.goldHi, letterSpacing: 3,
          }}>{QUOTE.meta}</div>
          <div style={{ width: 24, height: 1, background: T.goldHi, marginTop: 10 }} />
        </div>
        <div>
          <div style={{ fontFamily: T.serif, fontSize: 50, lineHeight: 0.4, height: 20, color: T.goldHi }}>“</div>
          <div style={{
            fontFamily: T.serif, fontSize: 20, fontWeight: 700, lineHeight: 1.55, textWrap: 'balance',
          }}>{QUOTE.q}</div>
          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 12.5, marginTop: 14, color: 'rgba(255,255,255,0.85)',
          }}>— {QUOTE.a}</div>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          borderTop: '0.5px solid rgba(255,255,255,0.2)', paddingTop: 10,
        }}>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 900, letterSpacing: 4 }}>DCT</div>
            <div style={{ fontFamily: T.mono, fontSize: 8.5, opacity: 0.7, letterSpacing: 1.5, marginTop: 2 }}>扫码看完整回顾</div>
          </div>
          <div style={{
            width: 40, height: 40, background: T.card, padding: 3,
          }}>
            <div style={{
              width: '100%', height: '100%',
              display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(5, 1fr)',
            }}>
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} style={{ background: Math.random() > 0.5 ? T.warmInk : 'transparent' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// A-warm. 关于 DCT · 更温暖的方向 · 家庭学术沙龙
// 设计意图：把蓝调让位给暖纸 + 陶土 + 焦糖；蓝色只留作签名色 / 印章色
// ────────────────────────────────────────────────────────────────────────────

const W = {
  paper:    '#faf1de',   // 暖纸主底
  paperHi:  '#fdf7e8',   // 暖纸高光
  paper2:   '#f3e3c3',   // 暖纸阴影
  cream:    '#fbf6ec',   // 奶油
  terra:    '#b85c2f',   // 陶土主色（替代原 navy）
  terraDk:  '#8c3f1c',   // 深陶土（标题）
  terraSf:  '#cf7e52',   // 浅陶土（强调）
  ember:    '#d97757',   // 余烬橙（点睛）
  ink:      '#3a2412',   // 焦糖墨（正文）
  inkSoft:  '#5a3a1e',   // 焦糖正文
  muted:    '#8a6a3e',   // 暖灰
  hint:     '#a88a5f',   // 更弱
  gold:     '#c9a24a',   // 保留金色
  rule:     '#e7d7b3',   // 暖分割
  stamp:    '#1a3a78',   // 蓝色仅作印章 / 签名
};

// D · 暖纸手札（杂志变体的暖色重做）
function AboutMagazineWarm() {
  return (
    <PhoneFrame height={920}>
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: W.paperHi, borderBottom: `0.5px solid ${W.rule}`,
        fontSize: 15, color: W.terraDk, fontWeight: 500, position: 'relative',
        fontFamily: T.sans,
      }}>
        <div style={{ position: 'absolute', left: 14, fontSize: 18, color: W.muted, fontWeight: 300 }}>‹</div>
        关于 DCT
      </div>
      <div style={{ background: W.paper, minHeight: 880, position: 'relative' }}>
        {/* 纸纹噪点 */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle at 20% 30%, ${W.paper2} 0.5px, transparent 1px),
                            radial-gradient(circle at 70% 60%, ${W.paper2} 0.5px, transparent 1px),
                            radial-gradient(circle at 40% 80%, ${W.paper2} 0.5px, transparent 1px)`,
          backgroundSize: '40px 40px, 60px 60px, 50px 50px',
        }} />
        {/* 卷首 */}
        <div style={{ padding: '36px 30px 22px', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 6, color: W.terra }}>ISSUE №0 · 卷首语</div>
          <div style={{
            width: 28, height: 1, background: W.terra, margin: '14px auto',
            boxShadow: `8px 0 0 ${W.ember}, -8px 0 0 ${W.gold}`,
          }} />
          <div style={{
            fontFamily: T.serif, fontSize: 28, fontWeight: 900, color: W.terraDk,
            letterSpacing: 4, lineHeight: 1.35,
          }}>客厅里的<br/>家庭学术沙龙</div>
          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: W.muted,
            marginTop: 14, letterSpacing: 1,
          }}>—— 写给打算认真胡思乱想的你</div>
          {/* 蓝色印章 */}
          <div style={{
            position: 'absolute', top: 36, right: 22,
            width: 56, height: 56, borderRadius: 28,
            border: `1.5px solid ${W.stamp}`, color: W.stamp,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.serif, transform: 'rotate(-8deg)', opacity: 0.55,
          }}>
            <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: 2 }}>DCT</div>
            <div style={{ fontFamily: T.mono, fontSize: 6.5, letterSpacing: 1, marginTop: 1 }}>EST·2026</div>
          </div>
        </div>

        {/* drop cap 段落 */}
        <div style={{ padding: '20px 30px 0', position: 'relative' }}>
          <div style={{ fontSize: 13.5, color: W.ink, lineHeight: 2, textWrap: 'pretty' }}>
            <span style={{
              float: 'left', fontFamily: T.serif, fontSize: 60, fontWeight: 900,
              color: W.terra, lineHeight: 0.85, marginRight: 8, marginTop: 4,
            }}>春</span>
            天的某个下午，三个非典型的精神科 PhD 坐在同一个客厅里——发现彼此都在等待<em style={{
              color: W.terraDk, fontStyle: 'normal',
              background: `linear-gradient(180deg, transparent 60%, ${W.ember}33 60%)`,
            }}>愿意慢下来，认真聊点不那么有用但很重要的事</em>。
            于是我们把每月一次的客厅日午后，叫做 DCT。
          </div>
        </div>

        {/* 引文 · 暖色 */}
        <div style={{ padding: '30px 34px 22px', textAlign: 'center', position: 'relative' }}>
          <div style={{
            fontFamily: T.serif, fontSize: 64, color: W.ember, lineHeight: 0.3, height: 22,
          }}>"</div>
          <div style={{
            fontFamily: T.serif, fontSize: 18, color: W.terraDk, lineHeight: 1.75,
            fontStyle: 'italic', letterSpacing: 0.5,
          }}>不必非得"有用"才值得讨论。<br/>但讨论时要保留<br/>科学训练给我们的那份认真。</div>
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 14,
          }}>
            <div style={{ width: 14, height: 1, background: W.terra }} />
            <div style={{ fontFamily: T.mono, fontSize: 9, color: W.muted, letterSpacing: 2 }}>FROM THE LIVING ROOM</div>
            <div style={{ width: 14, height: 1, background: W.terra }} />
          </div>
        </div>

        {/* 词条·暖色字典 */}
        <div style={{ padding: '6px 30px 28px' }}>
          <div style={{
            fontFamily: T.mono, fontSize: 10.5, color: W.terra, letterSpacing: 4, marginBottom: 10,
          }}>DCT · 词条</div>
          {[
            ['n.', 'Dog · Chef · Therapist', '三个人的三种身份'],
            ['n.', 'Doctors\' Crazy Thinking', '一群医生的胡思乱想'],
            ['v.', '认真地胡思乱想', '用科学的态度，聊天马行空的奇思妙想', true],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, padding: '14px 0',
              borderTop: i === 0 ? `0.5px dashed ${W.rule}` : 'none',
              borderBottom: `0.5px dashed ${W.rule}`,
            }}>
              <div style={{
                fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: W.muted,
                width: 28, paddingTop: 3, flexShrink: 0,
              }}>{row[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: T.serif, fontSize: row[3] ? 17 : 14, fontWeight: row[3] ? 900 : 700,
                  color: row[3] ? W.terraDk : W.terra, letterSpacing: 0.5, lineHeight: 1.4,
                }}>{row[1]}</div>
                <div style={{
                  fontSize: 12.5, color: W.inkSoft, marginTop: 4, lineHeight: 1.5,
                  ...(row[3] ? { background: `linear-gradient(180deg, transparent 55%, ${W.ember}22 55%)`, display: 'inline' } : {}),
                }}>{row[2]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 暖 closing */}
        <div style={{ padding: '8px 22px 30px' }}>
          <div style={{
            background: W.paperHi, borderRadius: 0, padding: '22px 24px', textAlign: 'center',
            border: `1px solid ${W.terra}`, position: 'relative',
            boxShadow: `4px 4px 0 ${W.ember}`,
          }}>
            <div style={{
              fontFamily: T.serif, fontSize: 17, fontWeight: 700, color: W.terraDk, lineHeight: 1.6,
            }}>期待和你一起，<br/>建设这块精神自留地。</div>
            <div style={{
              fontFamily: T.mono, fontSize: 10, color: W.terra, marginTop: 10, letterSpacing: 2,
            }}>DCT · EST. 2026 · CHENGDU</div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// E · 围炉夜话（深暖背景 / 一桌一茶 / 灯光感）
function AboutFireside() {
  return (
    <div style={{
      width: 360, height: 980, position: 'relative', overflow: 'hidden',
      background: `radial-gradient(120% 60% at 50% 0%, #3d2615 0%, #2a180a 50%, #1c100644 100%),
                   linear-gradient(180deg, #2a180a 0%, #3d2615 50%, ${W.paper} 75%)`,
      fontFamily: T.sans, color: W.paper,
    }}>
      <div style={{
        height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, color: W.paperHi, fontWeight: 500, position: 'relative',
        borderBottom: `0.5px solid rgba(250,241,222,0.15)`,
      }}>
        <div style={{ position: 'absolute', left: 14, fontSize: 18, color: W.paperHi, opacity: 0.7 }}>‹</div>
        关于 DCT
      </div>

      {/* 上半区：夜话场景 */}
      <div style={{ padding: '30px 26px 20px', textAlign: 'center', position: 'relative' }}>
        {/* 灯光光晕 */}
        <div style={{
          position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
          width: 280, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${W.ember}44 0%, ${W.gold}22 40%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 6, color: W.gold }}>DCT · 围炉夜话</div>
          <div style={{ width: 30, height: 1, background: W.gold, margin: '12px auto' }} />
          <div style={{
            fontFamily: T.serif, fontSize: 26, fontWeight: 900, color: W.paperHi,
            letterSpacing: 3, lineHeight: 1.4,
          }}>客厅里的<br/>家庭学术沙龙</div>
          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 12.5, color: W.paper, opacity: 0.75,
            marginTop: 12, letterSpacing: 1,
          }}>三个 PhD · 一只狗 · 一盏灯</div>

          {/* 桌面 SVG */}
          <svg viewBox="0 0 280 140" style={{ width: '100%', marginTop: 18, display: 'block' }}>
            {/* 桌面 */}
            <ellipse cx="140" cy="110" rx="120" ry="18" fill={W.gold} opacity="0.18"/>
            <ellipse cx="140" cy="105" rx="118" ry="14" fill={W.gold} opacity="0.35"/>
            {/* 中央吊灯光 */}
            <ellipse cx="140" cy="88" rx="38" ry="6" fill={W.ember} opacity="0.4"/>
            {/* 三杯热饮 */}
            <g>
              <rect x="58" y="86" width="14" height="14" rx="2" fill={W.paperHi}/>
              <path d="M62 84 Q63 80 65 84 Q67 80 69 84" stroke={W.paper} strokeWidth="1" fill="none" opacity="0.8"/>
            </g>
            <g>
              <rect x="133" y="82" width="14" height="16" rx="2" fill={W.paperHi}/>
              <path d="M137 80 Q138 76 140 80 Q142 76 144 80" stroke={W.paper} strokeWidth="1" fill="none" opacity="0.8"/>
            </g>
            <g>
              <rect x="208" y="86" width="14" height="14" rx="2" fill={W.paperHi}/>
              <path d="M212 84 Q213 80 215 84 Q217 80 219 84" stroke={W.paper} strokeWidth="1" fill="none" opacity="0.8"/>
            </g>
            {/* 一块甜点 */}
            <rect x="96" y="92" width="20" height="8" rx="1.5" fill={W.ember} opacity="0.8"/>
            <circle cx="106" cy="91" r="1.5" fill={W.paperHi}/>
            {/* 笔记本 */}
            <rect x="166" y="92" width="22" height="8" rx="1" fill={W.terra} opacity="0.7"/>
            <line x1="170" y1="96" x2="184" y2="96" stroke={W.paperHi} strokeWidth="0.5" opacity="0.6"/>
            {/* 三个剪影 */}
            <g opacity="0.85">
              <circle cx="65" cy="55" r="9" fill="#1a0a02"/>
              <path d="M55 78 Q55 64 65 64 Q75 64 75 78 Z" fill="#1a0a02"/>
            </g>
            <g opacity="0.95">
              <circle cx="140" cy="50" r="10" fill="#0d0501"/>
              <path d="M128 76 Q128 60 140 60 Q152 60 152 76 Z" fill="#0d0501"/>
            </g>
            <g opacity="0.85">
              <circle cx="215" cy="55" r="9" fill="#1a0a02"/>
              <path d="M205 78 Q205 64 215 64 Q225 64 225 78 Z" fill="#1a0a02"/>
            </g>
            {/* 狗 */}
            <g opacity="0.7" transform="translate(244,100)">
              <ellipse cx="0" cy="0" rx="8" ry="4" fill="#0d0501"/>
              <circle cx="-6" cy="-2" r="3" fill="#0d0501"/>
            </g>
          </svg>

          {/* 邀请语 */}
          <div style={{
            marginTop: 10, fontFamily: T.serif, fontSize: 14, color: W.paperHi, lineHeight: 1.85,
          }}>「不必非得有用，<br/>但要认真。」</div>
        </div>
      </div>

      {/* 下半区：暖纸 · 三主创 + 词条 */}
      <div style={{
        background: W.paper, borderTopLeftRadius: 20, borderTopRightRadius: 20,
        marginTop: 8, padding: '26px 26px 30px', color: W.ink,
        boxShadow: '0 -10px 30px rgba(0,0,0,0.25)',
      }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: W.terra, letterSpacing: 4, textAlign: 'center' }}>
          WHO · 围炉的三个人
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }}>
          {[
            { letter: 'D', word: 'Dog',       name: '包文欣', role: '狗子',   color: W.ember },
            { letter: 'C', word: 'Chef',      name: '徐佳淇', role: '厨子',   color: W.terra },
            { letter: 'T', word: 'Therapist', name: '曹栖源', role: '治疗师', color: W.gold  },
          ].map((p, i) => (
            <div key={i} style={{
              background: W.paperHi, borderRadius: 10, padding: '14px 8px 10px', textAlign: 'center',
              border: `0.5px solid ${W.rule}`,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 18, margin: '0 auto',
                background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: T.serif, fontSize: 18, fontWeight: 900, color: W.paperHi,
              }}>{p.letter}</div>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: W.muted, letterSpacing: 1.5, marginTop: 6 }}>
                {p.word.toUpperCase()}
              </div>
              <div style={{ fontFamily: T.serif, fontSize: 13, fontWeight: 700, color: W.terraDk, marginTop: 4 }}>
                {p.name}
              </div>
              <div style={{ fontSize: 10.5, color: W.muted, marginTop: 2 }}>{p.role}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, padding: '14px 14px', background: W.cream, borderRadius: 10, border: `0.5px dashed ${W.terraSf}` }}>
          <div style={{ fontSize: 12.5, color: W.ink, lineHeight: 1.9, textWrap: 'pretty' }}>
            DCT 三层意思——<strong style={{ color: W.terra }}>D</strong>og · <strong style={{ color: W.terra }}>C</strong>hef · <strong style={{ color: W.terra }}>T</strong>herapist；
            <strong style={{ color: W.terra }}>D</strong>octors' <strong style={{ color: W.terra }}>C</strong>razy <strong style={{ color: W.terra }}>T</strong>hinking；
            还有一句中文：<em style={{
              fontStyle: 'normal', color: W.terraDk, fontWeight: 700,
              background: `linear-gradient(180deg, transparent 60%, ${W.ember}44 60%)`,
            }}>认真地胡思乱想</em>。
          </div>
        </div>

        <div style={{
          marginTop: 18, padding: '12px 16px',
          background: `linear-gradient(135deg, ${W.terra}, ${W.terraDk})`,
          borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          color: W.paperHi,
        }}>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 9.5, opacity: 0.85, letterSpacing: 2 }}>NEXT</div>
            <div style={{ fontFamily: T.serif, fontSize: 14, fontWeight: 700, marginTop: 2 }}>看看本期 · 六星之路</div>
          </div>
          <div style={{ fontSize: 18 }}>→</div>
        </div>
      </div>
    </div>
  );
}

// F · 客厅家书（手写信笺感 · 邮票/邮戳 / 横线信纸）
function AboutLetter() {
  return (
    <PhoneFrame height={960}>
      <div style={{
        height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: W.cream, borderBottom: `0.5px solid ${W.rule}`,
        fontSize: 15, color: W.terraDk, fontWeight: 500, position: 'relative',
        fontFamily: T.sans,
      }}>
        <div style={{ position: 'absolute', left: 14, fontSize: 18, color: W.muted, fontWeight: 300 }}>‹</div>
        关于 DCT
      </div>

      <div style={{
        background: W.paper, minHeight: 916, position: 'relative',
        backgroundImage: `repeating-linear-gradient(180deg, transparent 0px, transparent 27px, ${W.rule}66 27px, ${W.rule}66 28px)`,
        backgroundPosition: '0 60px',
      }}>
        {/* 邮票 + 邮戳 */}
        <div style={{
          padding: '22px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: W.muted, letterSpacing: 2 }}>FROM</div>
            <div style={{ fontFamily: T.serif, fontSize: 13, fontWeight: 700, color: W.terraDk, marginTop: 3 }}>
              玉林某客厅
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 9, color: W.hint, marginTop: 1 }}>CHENGDU · 2026</div>
          </div>
          {/* 邮票 */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 64, height: 78, padding: 5,
              background: W.paperHi,
              border: `1px dashed ${W.terra}`,
              boxShadow: `1px 1px 0 ${W.rule}`,
              position: 'relative',
            }}>
              <div style={{
                width: '100%', height: '100%',
                background: `linear-gradient(135deg, ${W.ember} 0%, ${W.terra} 60%, ${W.terraDk} 100%)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                color: W.paperHi,
              }}>
                <div style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 900, letterSpacing: 2 }}>DCT</div>
                <div style={{ fontFamily: T.mono, fontSize: 6, letterSpacing: 1, marginTop: 4, opacity: 0.85 }}>EST · 2026</div>
                <div style={{ fontSize: 10, marginTop: 2 }}>¥ 真诚</div>
              </div>
            </div>
            {/* 邮戳 */}
            <div style={{
              position: 'absolute', bottom: -8, left: -22,
              width: 50, height: 50, borderRadius: 25,
              border: `1.5px solid ${W.stamp}`, color: W.stamp,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.mono, opacity: 0.4, transform: 'rotate(-12deg)',
              background: 'transparent',
            }}>
              <div style={{ fontSize: 6.5, letterSpacing: 1 }}>MAILED</div>
              <div style={{ fontSize: 9, fontWeight: 700, marginTop: 1 }}>03·28</div>
              <div style={{ fontSize: 6.5, letterSpacing: 1 }}>2026</div>
            </div>
          </div>
        </div>

        {/* 称呼 */}
        <div style={{ padding: '24px 26px 0', position: 'relative' }}>
          <div style={{
            fontFamily: T.serif, fontSize: 18, fontWeight: 700, color: W.terraDk, letterSpacing: 1,
          }}>亲爱的朋友：</div>
        </div>

        {/* 信件正文 */}
        <div style={{
          padding: '12px 26px 0', fontSize: 13, color: W.ink, lineHeight: '28px',
          fontFamily: T.serif, textWrap: 'pretty', letterSpacing: 0.3,
        }}>
          <p style={{ margin: '0 0 16px' }}>
            <span style={{ marginLeft: 26 }}>2026 年的某个春日下午，我们三个——一个 D（Dog 狗子）、一个 C（Chef 厨子）、一个 T（Therapist 治疗师）——坐在同一个客厅里，意外发现彼此都在等待同一件事：</span>
          </p>
          <p style={{
            margin: '0 0 16px',
            background: `linear-gradient(180deg, transparent 80%, ${W.ember}33 80%)`,
            display: 'inline-block', padding: '0 4px',
          }}>
            愿意慢下来，认真聊一些不那么有用、但很重要的事。
          </p>
          <p style={{ margin: '0 0 16px' }}>
            <span style={{ marginLeft: 26 }}>于是我们把每月一次的客厅日午后，叫做 <strong style={{ color: W.terra }}>DCT</strong>——</span>
          </p>
          <p style={{ margin: '0 0 16px' }}>
            <span style={{ marginLeft: 26 }}>它是三个人的身份缩写，也是 <em style={{ fontStyle: 'italic', color: W.terraDk }}>Doctors' Crazy Thinking</em>，
            还是一句很正经的玩笑：<strong style={{ color: W.terraDk }}>认真地胡思乱想</strong>。</span>
          </p>
          <p style={{ margin: '0 0 16px' }}>
            <span style={{ marginLeft: 26 }}>客厅没有讲台，所以谁也别端着。每期一位主讲人，一道当季甜品，十几个人围坐着——能讲，也能听；能错，也能改主意。</span>
          </p>
          <p style={{ margin: '0 0 20px' }}>
            <span style={{ marginLeft: 26 }}>这封信寄给你，是想说——</span>
          </p>
        </div>

        {/* 结尾 · 落款 */}
        <div style={{ padding: '0 26px 16px', textAlign: 'right' }}>
          <div style={{
            fontFamily: T.serif, fontSize: 17, fontWeight: 800, color: W.terraDk,
            lineHeight: 1.6, textAlign: 'right',
          }}>欢迎你也来，<br/>一起建设这块自留地。</div>
          <div style={{
            display: 'inline-block', marginTop: 14, paddingTop: 8,
            borderTop: `1px solid ${W.terra}`, minWidth: 110, textAlign: 'right',
          }}>
            <div style={{
              fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: W.terra, letterSpacing: 1,
            }}>—— D · C · T 敬上</div>
            <div style={{ fontFamily: T.mono, fontSize: 9, color: W.muted, marginTop: 4, letterSpacing: 1.5 }}>
              2026 · 春 · 于客厅
            </div>
          </div>
        </div>

        {/* 附言·P.S. */}
        <div style={{ padding: '0 26px 26px' }}>
          <div style={{
            background: W.paperHi, border: `0.5px dashed ${W.terra}`, padding: '12px 14px',
            borderRadius: 4,
          }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: W.terra, letterSpacing: 2 }}>P.S.</div>
            <div style={{
              fontFamily: T.serif, fontSize: 12.5, color: W.inkSoft, lineHeight: 1.75, marginTop: 4,
            }}>
              筛选只有两条：① 真的对话题感兴趣；② 愿意友善地交换观点。每期 10–15 人，跨领域优先。
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// G · 客厅织物（hero 拼贴 / 织物 + 物件平铺，最暖最家常）
function AboutCozy() {
  const Tile = ({ children, bg, span = 1, rotate = 0 }) => (
    <div style={{
      gridColumn: `span ${span}`, background: bg, borderRadius: 10,
      padding: 12, transform: `rotate(${rotate}deg)`,
      boxShadow: '0 2px 6px rgba(58,36,18,0.08)',
      minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>{children}</div>
  );
  return (
    <PhoneFrame height={1000}>
      <div style={{
        height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: W.cream, borderBottom: `0.5px solid ${W.rule}`,
        fontSize: 15, color: W.terraDk, fontWeight: 500, position: 'relative',
        fontFamily: T.sans,
      }}>
        <div style={{ position: 'absolute', left: 14, fontSize: 18, color: W.muted, fontWeight: 300 }}>‹</div>
        关于 DCT
      </div>

      <div style={{
        background: W.paper, minHeight: 956,
        backgroundImage: `repeating-linear-gradient(45deg, ${W.paper2}33 0px, ${W.paper2}33 1px, transparent 1px, transparent 8px)`,
      }}>
        {/* Hero · 织物 */}
        <div style={{
          padding: '26px 22px 16px',
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${W.ember} 0%, ${W.terra} 60%, ${W.terraDk} 100%)`,
            borderRadius: 16, padding: '24px 22px', color: W.paperHi, position: 'relative',
            overflow: 'hidden',
          }}>
            {/* 织物纹理 */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none',
              backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 3px, ${W.paperHi} 3px, ${W.paperHi} 4px),
                                repeating-linear-gradient(0deg, transparent 0, transparent 3px, ${W.paperHi} 3px, ${W.paperHi} 4px)`,
            }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, opacity: 0.85, letterSpacing: 5 }}>
                A FAMILY SALON
              </div>
              <div style={{
                fontFamily: T.serif, fontSize: 28, fontWeight: 900, marginTop: 10, lineHeight: 1.3, letterSpacing: 2,
              }}>客厅里的<br/>家庭学术沙龙</div>
              <div style={{
                fontFamily: T.serif, fontStyle: 'italic', fontSize: 12.5, marginTop: 10, opacity: 0.9,
              }}>每月一次 · 一位主讲 · 一道甜品 · 十几个人</div>
            </div>
          </div>
        </div>

        {/* 物件拼贴 */}
        <div style={{ padding: '8px 22px 16px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10,
          }}>
            <Tile bg={W.paperHi} span={4}>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: W.terra, letterSpacing: 2 }}>WHY</div>
              <div style={{ fontFamily: T.serif, fontSize: 15, fontWeight: 800, color: W.terraDk, marginTop: 4, lineHeight: 1.4 }}>
                给"不那么有用<br/>但很重要"的事<br/>留一块地。
              </div>
            </Tile>
            <Tile bg={W.ember} span={2}>
              <svg viewBox="0 0 60 60" width="100%">
                {/* 一道甜品 */}
                <ellipse cx="30" cy="42" rx="22" ry="4" fill={W.paperHi} opacity="0.4"/>
                <path d="M12 36 L48 36 L44 22 Q30 16 16 22 Z" fill={W.paperHi}/>
                <circle cx="30" cy="20" r="3" fill={W.terraDk}/>
                <path d="M28 12 Q30 8 32 12" stroke={W.paperHi} strokeWidth="1.5" fill="none"/>
              </svg>
              <div style={{ fontFamily: T.mono, fontSize: 8.5, color: W.paperHi, letterSpacing: 1.5, textAlign: 'center', marginTop: 4 }}>
                季节甜品
              </div>
            </Tile>

            <Tile bg={W.gold} span={2}>
              <svg viewBox="0 0 60 60" width="100%">
                {/* 沙发 */}
                <path d="M8 38 Q8 28 18 28 L42 28 Q52 28 52 38 L52 46 L48 46 L48 40 L12 40 L12 46 L8 46 Z" fill={W.paperHi}/>
                <line x1="30" y1="28" x2="30" y2="40" stroke={W.terraDk} strokeWidth="1" opacity="0.4"/>
              </svg>
              <div style={{ fontFamily: T.mono, fontSize: 8.5, color: W.terraDk, letterSpacing: 1.5, textAlign: 'center', marginTop: 4 }}>
                一张沙发
              </div>
            </Tile>
            <Tile bg={W.paperHi} span={4}>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: W.terra, letterSpacing: 2 }}>HOW</div>
              <div style={{ fontFamily: T.serif, fontSize: 14, fontWeight: 700, color: W.terraDk, marginTop: 4, lineHeight: 1.5 }}>
                客厅没有讲台——<br/>谁也别端着。
              </div>
            </Tile>

            <Tile bg={W.paperHi} span={6}>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: W.terra, letterSpacing: 2 }}>WHO · D · C · T</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                {[
                  { letter: 'D', word: 'Dog',       name: '包文欣', tone: W.ember },
                  { letter: 'C', word: 'Chef',      name: '徐佳淇', tone: W.terra },
                  { letter: 'T', word: 'Therapist', name: '曹栖源', tone: W.gold  },
                ].map((p, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: `linear-gradient(135deg, ${p.tone}, ${p.tone}aa)`,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: T.serif, fontSize: 20, fontWeight: 900, color: W.paperHi,
                    }}>{p.letter}</div>
                    <div style={{ fontFamily: T.mono, fontSize: 8, color: W.muted, letterSpacing: 1.2, marginTop: 4 }}>
                      {p.word.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: T.serif, fontSize: 12, fontWeight: 700, color: W.terraDk, marginTop: 1 }}>
                      {p.name}
                    </div>
                  </div>
                ))}
              </div>
            </Tile>

            <Tile bg={W.terraDk} span={3}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: W.gold, letterSpacing: 2 }}>WHAT</div>
              <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: W.paperHi, marginTop: 4, lineHeight: 1.5 }}>
                认真地<br/>胡思乱想。
              </div>
            </Tile>
            <Tile bg={W.paperHi} span={3}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: W.terra, letterSpacing: 2 }}>WHEN</div>
              <div style={{ fontFamily: T.serif, fontSize: 13, fontWeight: 700, color: W.terraDk, marginTop: 4, lineHeight: 1.5 }}>
                每月一次 ·<br/>客厅日午后。
              </div>
            </Tile>
          </div>
        </div>

        {/* 底部邀请 */}
        <div style={{ padding: '8px 22px 30px' }}>
          <div style={{
            background: W.paperHi, border: `1px solid ${W.terra}`, borderRadius: 12,
            padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontFamily: T.serif, fontSize: 14, fontWeight: 800, color: W.terraDk }}>
                欢迎你也来。
              </div>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: W.muted, letterSpacing: 1.5, marginTop: 3 }}>
                DCT · EST. 2026 · CHENGDU
              </div>
            </div>
            <div style={{
              width: 38, height: 38, borderRadius: 19, background: W.terra,
              color: W.paperHi, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>→</div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

Object.assign(window, {
  AboutMagazine, AboutTimeline, AboutSpatial,
  AboutMagazineWarm, AboutFireside, AboutLetter, AboutCozy,
  CreatorBaseline, CreatorObjectIcon, CreatorSilhouette, CreatorMonogram,
  ReviewTimelineClassic, ReviewTimelineNumeric, ReviewTimelineImmersive,
  ReviewDetailClassic, ReviewDetailMagazine, ReviewDetailGazette,
  QuoteMinimal, QuoteSky, QuotePoster,
});
