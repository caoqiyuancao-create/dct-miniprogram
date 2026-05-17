// vol02-screens.jsx — 第二期回顾 · 3 个方向
// 主题：六星之路 · 我的目标管理与坚持哲学（高晓蓉教授）
// 视觉与第一期完全不同——离开陶土暖色，走向赛道蓝 + 奖牌金 + 一抹烛光暖
// 蓝色为主语，金色为重音，焦糖橙仅在最暖的"客厅"段落点缀

const V2T = {
  // 蓝 · 主色
  sky:      '#dbe9f6',
  skyHi:    '#eaf3fb',
  skyDeep:  '#9dbfe3',
  track:    '#5d8bc6',
  trackDk:  '#3a6aa8',
  navy:     '#1a3a78',
  navyDk:   '#0f2855',
  ink:      '#0e2647',
  inkSoft:  '#2a3d5c',
  muted:    '#55709a',
  hint:     '#7a8caa',
  rule:     '#dbe4f1',
  paper:    '#f6f8fc',
  paperHi:  '#ffffff',

  // 金 · 奖牌
  gold:     '#c9a24a',
  goldHi:   '#e9b949',
  goldSoft: '#f3d97a',

  // 暖 · 烛光（仅 B 用 + 其他点缀）
  ember:    '#d97757',
  candle:   '#e8a85e',
  warmBg:   '#fbf6ec',
  warmInk:  '#5a3a1e',

  // 字体
  serif: '"Noto Serif SC","STSong",serif',
  sans:  '"Noto Sans SC",-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif',
  mono:  '"JetBrains Mono",ui-monospace,monospace',
};

const A2 = {
  poster:    'assets/vol02-poster.jpg',
  cover:     'assets/vol02-cover.jpg',
  speaker:   'assets/vol02-speaker.jpg',
  audience:  'assets/vol02-audience.jpg',
  candle:    'assets/vol02-cake-candle.jpg',
  bowl:      'assets/vol02-bowl.jpg',
  cakeSlice: 'assets/vol02-cake-slice.jpg',
};

const V2_COPY = {
  vol: 'VOL.02',
  date: '2026.04.25',
  // 标题与副题
  bigTitle: '她跑完了六大满贯',
  bigTitle2: '却在我们客厅聊起',
  bigTitleHighlight: '"如何安放自己"',
  sub: '一场关于理想、现实、坚持、疲惫、热爱与放弃的真诚对谈。',
  // 讲者
  speakerName: '高晓蓉',
  speakerRole: '教授 · 西南交通大学光电工程研究所',
  speakerTag: '世界马拉松大满贯 "Six Star Finisher"',
  // 数字
  stats: [
    { num: '10,000', unit: '公里', label: '累计跑步里程' },
    { num: '1,314',  unit: '次',   label: '记录里的跑步次数' },
    { num: '6',      unit: '座',   label: '马拉松大满贯城市' },
    { num: '12',     unit: '个',   label: '客厅里的不同专业' },
  ],
  // 六大满贯
  sixCities: ['东京', '波士顿', '伦敦', '柏林', '芝加哥', '纽约'],
  // 她坚持的事
  habits: [
    { k: '跑步',        d: '日复一日，跑到 10,000 公里 · 第 1,314 次' },
    { k: '读书会',      d: '带领、组织、出席，不缺席' },
    { k: '英语单词打卡', d: '每天一打卡，多年未断' },
    { k: '国际会议追踪', d: '把全球研究节奏装进作息' },
    { k: '博物馆公益讲解', d: '把所学，反复讲给陌生人' },
    { k: '公益',        d: '建图书馆 · 资助学生 · 长期投入' },
  ],
  // 我们顺着她拆开的问题
  threads: [
    '"六星"不是终点，而是一段日常生活的副产物',
    '怎样开始一件事，怎样重复，怎样在做了很多遍之后仍然重新看见它',
    '在不喜欢、甚至厌倦的时候，继续感受事情本身的细节',
    '我们缺的不是想象，是在想象成为现实之前，忍受焦虑的能力',
  ],
  // 核心金句
  q1: '现代生活里，我们好像并不缺少想象。\n或许真正缺少的，是在想象变成现实的时间里，忍受焦虑的能力。',
  q2: '所谓"六星"，是六座城市、六条赛道、六次出发。\n但真正打动我们的，是她怎样把一件事，一点点做成生活的一部分。',
  q3: '她带来的不是标准答案。\n而是一份非常具体、非常诚实的生命材料。',
  // 12 专业
  majors: ['光电', '电气', '医学', '哲学', '文字学', '人类学', '心理', '建筑', '法学', '材料', '历史', '计算机'],
  // 客厅笔记
  livingNote: '一个不大的客厅里，坐下了不同阶段的学生、老师和朋友——也坐下了 12 个不同专业的思考。',
  livingNote2: '跨学科交流的意义，不在于大家说同一种语言，而在于不同语言之间，仍然愿意互相翻译、互相靠近。',
  // 收尾
  closingTitle: 'DCT 不是给答案，',
  closingLine: '而是一起找一只走丢的羊。',
  closingP: '如果你也在某件事上长跑过、犹豫过、不喜欢过，又重新开始过——欢迎来 DCT 客厅坐坐 ～',
  // 下一期 CTA
  ctaKicker: '下一期 · VOL.03 · 报名中',
  ctaTitle: '医美热时代的冷思考',
  ctaDate: '2026.05.23 · 客厅外场 · 88 元 / 位',
};

// ────────────────────────────────────────────────────────────────────────
// 通用：手机框（背景由各方向决定）
// ────────────────────────────────────────────────────────────────────────
function V2Phone({ children, height = 1900, bg = V2T.paper, color = V2T.ink }) {
  return (
    <div style={{
      width: 360, height, background: bg, color, overflow: 'hidden',
      fontFamily: V2T.sans, position: 'relative',
    }}>{children}</div>
  );
}

function V2Header({ title = '往期回顾', light = false }) {
  const fg = light ? '#ffffff' : V2T.navyDk;
  const bg = light ? 'transparent' : V2T.paperHi;
  const rule = light ? 'rgba(255,255,255,0.18)' : V2T.rule;
  return (
    <div style={{
      height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: bg, borderBottom: `0.5px solid ${rule}`,
      fontSize: 15, color: fg, fontWeight: 500, position: 'relative', zIndex: 5,
    }}>
      <div style={{ position: 'absolute', left: 14, fontSize: 18, color: fg, opacity: 0.7, fontWeight: 300 }}>‹</div>
      {title}
      <div style={{ position: 'absolute', right: 14, fontSize: 13, color: fg, opacity: 0.7 }}>···</div>
    </div>
  );
}

// 小工具 · 六角星 SVG
function StarGlyph({ size = 16, color = V2T.gold, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'inline-block', verticalAlign: 'middle', opacity }}>
      <path d="M12 1 L14 9 L22 9.5 L15.5 14 L18 22 L12 17.3 L6 22 L8.5 14 L2 9.5 L10 9 Z"
        fill={color} stroke="none" />
    </svg>
  );
}

// 小工具 · 6 颗星横排（六大满贯）
function SixStars({ size = 14, color = V2T.gold, gap = 6 }) {
  return (
    <div style={{ display: 'flex', gap, alignItems: 'center' }}>
      {[0,1,2,3,4,5].map(i => <StarGlyph key={i} size={size} color={color} />)}
    </div>
  );
}

// 跑道·背景 SVG（透视消失线）
function TrackLines({ height = 280, opacity = 0.5, color = '#3a6aa8' }) {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height, opacity, pointerEvents: 'none' }}
      viewBox="0 0 360 280" preserveAspectRatio="none"
    >
      {[...Array(10)].map((_, i) => {
        const startY = 280;
        const endX = 60 + i * 30;
        return (
          <line key={i} x1={-40 + i*18} y1={startY} x2={endX} y2={-20}
            stroke={color} strokeWidth={i % 2 === 0 ? 0.9 : 0.6} opacity={0.6 + i*0.04} />
        );
      })}
    </svg>
  );
}

// 纸张噪点 · 用 SVG 滤镜
function PaperNoise({ opacity = 0.08 }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, pointerEvents: 'none', mixBlendMode: 'multiply' }}>
      <filter id="paperN">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" />
        <feColorMatrix values="0 0 0 0 0.15  0 0 0 0 0.15  0 0 0 0 0.3  0 0 0 0.6 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paperN)" />
    </svg>
  );
}

Object.assign(window, { V2T, A2, V2_COPY, V2Phone, V2Header, StarGlyph, SixStars, TrackLines, PaperNoise });
