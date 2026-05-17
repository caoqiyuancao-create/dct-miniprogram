// vol01-screens.jsx — 第一期回顾 · 4 个方向
// 内容来自 uploads/dct第一期h_5_内容回顾_成人adhd.md
// 视觉延续上一轮的「暖」方向：暖纸 / 陶土 / 焦糖 / 余烬橙
// 蓝色仅作签名 / 印章

const V1T = {
  paper:   '#faf1de',
  paperHi: '#fdf7e8',
  paper2:  '#f3e3c3',
  cream:   '#fbf6ec',
  terra:   '#b85c2f',
  terraDk: '#8c3f1c',
  terraSf: '#cf7e52',
  ember:   '#d97757',
  amber:   '#e4a049',
  gold:    '#c9a24a',
  ink:     '#3a2412',
  inkSoft: '#5a3a1e',
  muted:   '#8a6a3e',
  hint:    '#a88a5f',
  rule:    '#e7d7b3',
  stamp:   '#1a3a78',
  highlight: '#ffe26b',   // 真·荧光笔黄（来自海报）
  highlightSoft: '#ffec92',
  serif: '"Noto Serif SC","STSong",serif',
  sans:  '"Noto Sans SC",-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif',
  mono:  '"JetBrains Mono",ui-monospace,monospace',
};

const ASSETS = {
  poster:      'assets/vol01-poster.jpg',
  hero:        'assets/vol01-hero.jpg',
  speakerDogs: 'assets/vol01-speaker-dogs.jpg',
  dessert:     'assets/vol01-dessert.jpg',
  talk:        'assets/vol01-talk.jpg',
  cocktail:    'assets/vol01-cocktail.jpg',
};

// ────────────────────────────────────────────────────────────────────────
// 通用：手机框
// ────────────────────────────────────────────────────────────────────────
function V1Phone({ children, height = 1700, bg = V1T.paper }) {
  return (
    <div style={{
      width: 360, height, background: bg, overflow: 'hidden',
      fontFamily: V1T.sans, color: V1T.ink, position: 'relative',
    }}>{children}</div>
  );
}

function V1Header({ title = '往期回顾', light = false }) {
  const fg = light ? V1T.paperHi : V1T.terraDk;
  const bg = light ? 'transparent' : V1T.paperHi;
  const rule = light ? 'rgba(250,241,222,0.18)' : V1T.rule;
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

// 文案常量——忠实复用 .md 里的内容
const V1_COPY = {
  vol: 'VOL.01',
  date: '2026.03.28',
  title: '我们在客厅里聊了成人 ADHD',
  sub: '不是一场普通科普，也不是一次严肃讲座。',
  lead: '那天晚上，我们从成人 ADHD 聊起，一路聊到精神医学、诊断扩张、药物、媒体、市场，以及现代人对"表现更好"的隐秘焦虑。',
  hookKicker: '主讲人曹叔抛出的问题',
  hook: ['成人 ADHD，', '究竟是被医学发现的疾病，', '还是被时代共同塑造出来的诊断？'],
  threadIntro: '我们没有急着给答案。\n而是顺着这个问题，慢慢拆开了几条线索：',
  threads: [
    'ADHD 如何从"儿童多动"逐渐走向"成人注意力问题"；',
    '精神药物如何改变了人们理解痛苦的方式；',
    '媒体、畅销书和社交平台如何让越来越多人在诊断里认出自己；',
    '当"拖延、混乱、无法完成任务"被医学语言重新解释时——\n我们到底是在治疗疾病，还是在回应一个高绩效时代的焦虑。',
  ],
  livingTitle: '那天的客厅里',
  living: '有投影，有讨论，有认真记笔记的人，也有甜点、酒、猫狗和一些突然安静下来的瞬间。',
  mixTitle: 'DCT 最想保留的，是这种奇妙的混合感',
  mix: [
    '一边是很硬核的问题，一边是很松弛的客厅。',
    '一边认真到可以追问 DSM、医学史和社会结构，一边也可以在中场吃一口甜点，继续聊下去。',
  ],
  quote: '当我们把越来越多生活中的挫败交给医学来解释时，我们治愈的是疾病，还是现代社会对"完美表现"的焦虑？',
  closing: [
    '这就是 DCT 第一期。',
    '不是为了给一个标准答案，而是为了把一个看似熟悉的词重新打开。',
    '如果你也喜欢这种——有一点学术、有一点生活、有一点"不太正经"，但真的认真在想问题的夜晚，欢迎来 DCT 坐坐～',
  ],
  speaker: '曹叔（曹栖源） · DCT 首席心理治疗师',
  topic: '主题｜成人 ADHD 与诊断扩张',
  keywords: ['成人 ADHD', '精神医学', '医疗化', '表现焦虑', '现代生活'],
};

// ────────────────────────────────────────────────────────────────────────
// A · 暖客厅长卷（Warm magazine scroll）
//    最稳的方向：暖纸 + 真实照片 + drop cap + 大引文，长卷阅读流
// ────────────────────────────────────────────────────────────────────────
function Vol01WarmScroll() {
  return (
    <V1Phone height={1880}>
      <V1Header />
      {/* HERO */}
      <div style={{
        position: 'relative', height: 280, overflow: 'hidden',
      }}>
        <img src={ASSETS.speakerDogs} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', filter: 'saturate(0.95) contrast(1.02)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, rgba(58,36,18,0.0) 30%, rgba(58,36,18,0.6) 70%, rgba(58,36,18,0.92) 100%)`,
        }} />
        <div style={{
          position: 'absolute', top: 14, left: 16, right: 16,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: V1T.mono, fontSize: 10, color: V1T.paperHi, letterSpacing: 3,
        }}>
          <span>{V1_COPY.vol} · {V1_COPY.date}</span>
          <span style={{ opacity: 0.7 }}>FIELD NOTES</span>
        </div>
        <div style={{
          position: 'absolute', left: 22, right: 22, bottom: 18, color: V1T.paperHi,
        }}>
          <div style={{
            display: 'inline-block', padding: '3px 8px', background: V1T.ember, color: V1T.paperHi,
            fontFamily: V1T.mono, fontSize: 9.5, letterSpacing: 2, marginBottom: 10,
          }}>DCT · 第一期回顾</div>
          <div style={{
            fontFamily: V1T.serif, fontSize: 24, fontWeight: 900, lineHeight: 1.3, letterSpacing: 1,
          }}>我们在客厅里<br/>聊了<u style={{ textDecorationColor: V1T.amber, textUnderlineOffset: 4, textDecorationThickness: 2 }}>成人 ADHD</u></div>
          <div style={{
            fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 12, opacity: 0.88, marginTop: 8,
          }}>{V1_COPY.sub}</div>
        </div>
      </div>

      {/* META 条 */}
      <div style={{
        background: V1T.terraDk, color: V1T.paperHi, padding: '10px 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: V1T.mono, fontSize: 10, letterSpacing: 2,
      }}>
        <span>主讲｜曹叔</span>
        <span style={{ opacity: 0.7 }}>·</span>
        <span>客厅学术沙龙</span>
        <span style={{ opacity: 0.7 }}>·</span>
        <span>10–15 人</span>
      </div>

      {/* LEAD · drop cap */}
      <div style={{ padding: '26px 26px 0' }}>
        <div style={{ fontSize: 13.5, color: V1T.ink, lineHeight: 2, textWrap: 'pretty' }}>
          <span style={{
            float: 'left', fontFamily: V1T.serif, fontSize: 56, fontWeight: 900,
            color: V1T.terra, lineHeight: 0.85, marginRight: 8, marginTop: 6,
          }}>那</span>
          天晚上，我们从成人 ADHD 聊起，一路聊到精神医学、诊断扩张、药物、媒体、市场，以及现代人对<em style={{
            fontStyle: 'normal', color: V1T.terraDk,
            background: `linear-gradient(180deg, transparent 62%, ${V1T.highlight}aa 62%, ${V1T.highlight}aa 90%, transparent 90%)`,
          }}>"表现更好"的隐秘焦虑</em>。
        </div>
      </div>

      {/* HOOK */}
      <div style={{ padding: '32px 22px 6px' }}>
        <div style={{
          background: V1T.paperHi, border: `1px solid ${V1T.terra}`,
          padding: '24px 22px', position: 'relative',
          boxShadow: `5px 5px 0 ${V1T.ember}`,
        }}>
          <div style={{
            fontFamily: V1T.mono, fontSize: 10, color: V1T.terra, letterSpacing: 3, marginBottom: 10,
          }}>{V1_COPY.hookKicker}</div>
          <div style={{ fontFamily: V1T.serif, fontSize: 50, color: V1T.ember, lineHeight: 0.3, height: 16 }}>"</div>
          <div style={{
            fontFamily: V1T.serif, fontSize: 19, fontWeight: 800, color: V1T.terraDk,
            lineHeight: 1.6, letterSpacing: 0.5, marginTop: 6,
          }}>
            {V1_COPY.hook[0]}<br/>
            {V1_COPY.hook[1]}<br/>
            <span style={{
              background: `linear-gradient(180deg, transparent 55%, ${V1T.highlight} 55%, ${V1T.highlight} 92%, transparent 92%)`,
            }}>{V1_COPY.hook[2]}</span>
          </div>
        </div>
      </div>

      {/* 几条线索 · numbered */}
      <div style={{ padding: '26px 26px 0' }}>
        <div style={{
          fontSize: 13, color: V1T.ink, lineHeight: 1.9, marginBottom: 18, whiteSpace: 'pre-line',
        }}>{V1_COPY.threadIntro}</div>
        {V1_COPY.threads.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, paddingBottom: 14, marginBottom: 14,
            borderBottom: i < V1_COPY.threads.length - 1 ? `0.5px dashed ${V1T.rule}` : 'none',
          }}>
            <div style={{
              fontFamily: V1T.serif, fontSize: 28, fontWeight: 900, color: V1T.amber,
              lineHeight: 0.9, width: 30, flexShrink: 0, letterSpacing: -1,
            }}>{(i + 1).toString().padStart(2, '0')}</div>
            <div style={{
              fontSize: 13, color: i === V1_COPY.threads.length - 1 ? V1T.terraDk : V1T.ink,
              fontWeight: i === V1_COPY.threads.length - 1 ? 600 : 400,
              lineHeight: 1.85, whiteSpace: 'pre-line', textWrap: 'pretty',
            }}>{t}</div>
          </div>
        ))}
      </div>

      {/* 三图拼贴 */}
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{
          fontFamily: V1T.mono, fontSize: 10, color: V1T.terra, letterSpacing: 3, marginBottom: 10,
        }}>FROM THE LIVING ROOM</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gridTemplateRows: '120px 120px', gap: 8 }}>
          <img src={ASSETS.talk} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover',
            gridRow: 'span 2', borderRadius: 6,
          }} />
          <img src={ASSETS.dessert} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />
          <img src={ASSETS.cocktail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />
        </div>
        <div style={{
          fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 11, color: V1T.muted,
          marginTop: 8, lineHeight: 1.6,
        }}>↑ 投影·DSM-5 · 抹茶提拉米苏 · 暖灯下的第二只狗 · 现场摄</div>
      </div>

      {/* 客厅 essay */}
      <div style={{ padding: '28px 26px 0' }}>
        <div style={{
          fontFamily: V1T.serif, fontSize: 19, fontWeight: 800, color: V1T.terraDk,
          letterSpacing: 1, lineHeight: 1.5,
        }}>{V1_COPY.mixTitle}</div>
        <div style={{ marginTop: 14, fontSize: 13, color: V1T.ink, lineHeight: 1.95 }}>
          {V1_COPY.mix.map((line, i) => (
            <p key={i} style={{ margin: '0 0 10px', textWrap: 'pretty' }}>{line}</p>
          ))}
        </div>
      </div>

      {/* 大引文 · 金句 */}
      <div style={{ padding: '28px 22px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${V1T.terraDk} 0%, #2a180a 100%)`,
          padding: '30px 26px', position: 'relative', color: V1T.paperHi,
        }}>
          <div style={{
            position: 'absolute', top: 12, left: 18,
            fontFamily: V1T.serif, fontSize: 80, color: V1T.amber, lineHeight: 0.5, opacity: 0.5,
          }}>"</div>
          <div style={{
            fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 17, lineHeight: 1.75,
            textWrap: 'balance', marginTop: 14, position: 'relative',
          }}>{V1_COPY.quote}</div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18,
            paddingTop: 14, borderTop: `0.5px solid ${V1T.amber}55`,
          }}>
            <div style={{ fontFamily: V1T.mono, fontSize: 9.5, color: V1T.amber, letterSpacing: 2 }}>
              — DCT VOL.01 · 现场金句
            </div>
            <div style={{
              fontFamily: V1T.mono, fontSize: 9, color: V1T.paperHi, letterSpacing: 1,
              padding: '4px 9px', border: `0.5px solid ${V1T.paperHi}55`, borderRadius: 12,
            }}>分享 ↗</div>
          </div>
        </div>
      </div>

      {/* 收尾 */}
      <div style={{ padding: '28px 26px 18px' }}>
        {V1_COPY.closing.map((line, i) => (
          <p key={i} style={{
            margin: '0 0 12px', fontSize: 13, color: V1T.ink, lineHeight: 1.95,
            fontWeight: i === 0 ? 700 : 400,
            fontFamily: i === 0 ? V1T.serif : V1T.sans,
            fontSize: i === 0 ? 16 : 13,
            color: i === 0 ? V1T.terraDk : V1T.ink,
          }}>{line}</p>
        ))}
      </div>

      {/* 关键词 + 信息 */}
      <div style={{ padding: '8px 22px 22px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {V1_COPY.keywords.map((kw, i) => (
            <div key={i} style={{
              fontFamily: V1T.mono, fontSize: 10, color: V1T.terra, letterSpacing: 1,
              padding: '4px 9px', background: V1T.paperHi, border: `0.5px solid ${V1T.rule}`,
              borderRadius: 10,
            }}>#{kw}</div>
          ))}
        </div>
      </div>

      {/* 下一期 */}
      <div style={{ padding: '0 22px 30px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${V1T.ember} 0%, ${V1T.terra} 100%)`,
          color: V1T.paperHi, padding: '16px 18px', borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: V1T.mono, fontSize: 10, opacity: 0.85, letterSpacing: 2 }}>NEXT · VOL.02</div>
            <div style={{ fontFamily: V1T.serif, fontSize: 15, fontWeight: 800, marginTop: 3 }}>六星之路 · 报名中</div>
          </div>
          <div style={{ fontSize: 18 }}>→</div>
        </div>
      </div>
    </V1Phone>
  );
}

// ────────────────────────────────────────────────────────────────────────
// B · 拼贴海报感（Collage Poster）
//    呼应海报本身：荧光笔、剪报字、胶带、便签
//    最有「DCT 调性」的方向，文字略松散，需要被读者「翻看」
// ────────────────────────────────────────────────────────────────────────
function Vol01Collage() {
  // 剪报字母 — 每个字母随机角度、底色
  const CutLetter = ({ ch, tone = V1T.terraDk, bg = V1T.paperHi, rotate = 0, size = 30 }) => (
    <span style={{
      display: 'inline-block', padding: '2px 6px', margin: '0 1px',
      background: bg, color: tone, fontFamily: V1T.serif, fontWeight: 900,
      fontSize: size, lineHeight: 1, letterSpacing: 0,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '1px 2px 0 rgba(58,36,18,0.15)',
      border: `0.5px solid ${V1T.rule}`,
    }}>{ch}</span>
  );

  // 胶带
  const Tape = ({ top, left, right, w = 56, rotate = 0, color = '#ffe26b99' }) => (
    <div style={{
      position: 'absolute', top, left, right,
      width: w, height: 18, background: color,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      pointerEvents: 'none',
    }} />
  );

  // 便签
  const StickyNote = ({ children, color = V1T.highlight, rotate = -2, style }) => (
    <div style={{
      background: color, padding: '12px 14px',
      boxShadow: '2px 3px 8px rgba(0,0,0,0.12)',
      transform: `rotate(${rotate}deg)`,
      fontFamily: V1T.serif, fontSize: 13, color: V1T.ink, lineHeight: 1.6,
      ...style,
    }}>{children}</div>
  );

  // 拍立得
  const Polaroid = ({ src, caption, rotate = 0, w = 140, style }) => (
    <div style={{
      background: V1T.paperHi, padding: '8px 8px 28px', boxShadow: '3px 4px 12px rgba(58,36,18,0.2)',
      transform: `rotate(${rotate}deg)`, width: w, position: 'relative',
      ...style,
    }}>
      <img src={src} alt="" style={{ width: '100%', height: w * 0.95, objectFit: 'cover', display: 'block' }} />
      <div style={{
        position: 'absolute', bottom: 6, left: 0, right: 0, textAlign: 'center',
        fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 10.5, color: V1T.muted,
      }}>{caption}</div>
    </div>
  );

  return (
    <V1Phone height={2080} bg={V1T.paperHi}>
      <V1Header />

      {/* 顶部·剪报标题区 */}
      <div style={{
        position: 'relative', padding: '24px 18px 12px',
        background: `repeating-linear-gradient(45deg, ${V1T.paperHi} 0, ${V1T.paperHi} 18px, ${V1T.paper} 18px, ${V1T.paper} 20px)`,
      }}>
        <div style={{
          fontFamily: V1T.mono, fontSize: 10, color: V1T.terra, letterSpacing: 4, marginBottom: 14,
        }}>DCT · ISSUE №01 · 现场剪报</div>
        {/* 剪报字标题 */}
        <div style={{ marginBottom: 12 }}>
          <CutLetter ch="第" rotate={-3} size={28} />
          <CutLetter ch="一" rotate={2} bg={V1T.highlight} size={28} />
          <CutLetter ch="期" rotate={-1} size={28} />
          <CutLetter ch="回" rotate={2} bg={V1T.ember} tone={V1T.paperHi} size={28} />
          <CutLetter ch="顾" rotate={-2} size={28} />
        </div>
        <div style={{ fontFamily: V1T.serif, fontSize: 18, fontWeight: 800, color: V1T.terraDk, lineHeight: 1.45 }}>
          我们在客厅里聊了
          <span style={{
            background: `linear-gradient(180deg, transparent 50%, ${V1T.highlight} 50%, ${V1T.highlight} 92%, transparent 92%)`,
            padding: '0 2px',
          }}>成人 ADHD</span>
        </div>
        <div style={{
          fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 12.5, color: V1T.muted, marginTop: 8,
        }}>不是一场普通科普，也不是一次严肃讲座。</div>
        {/* 日期戳 */}
        <div style={{
          position: 'absolute', top: 14, right: 16,
          width: 60, height: 60, borderRadius: 30,
          border: `1.5px solid ${V1T.stamp}`, color: V1T.stamp, opacity: 0.55,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: V1T.mono, transform: 'rotate(-10deg)',
        }}>
          <div style={{ fontSize: 7, letterSpacing: 1 }}>DCT · LIVE</div>
          <div style={{ fontSize: 13, fontWeight: 700, marginTop: 1 }}>03·28</div>
          <div style={{ fontSize: 7, letterSpacing: 1 }}>CHENGDU</div>
        </div>
      </div>

      {/* 大照片 · 现场 · 加胶带 */}
      <div style={{ position: 'relative', padding: '8px 18px 22px' }}>
        <Tape top={2} left={28} rotate={-12} color="#ffe26baa" w={72} />
        <Tape top={2} right={36} rotate={8} color="#ffe26baa" w={72} />
        <img src={ASSETS.talk} alt="" style={{
          width: '100%', height: 220, objectFit: 'cover',
          border: `3px solid ${V1T.paperHi}`,
          boxShadow: '4px 5px 12px rgba(58,36,18,0.25)',
          transform: 'rotate(-0.8deg)',
        }} />
        <div style={{
          fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 11, color: V1T.muted,
          textAlign: 'center', marginTop: 6, transform: 'rotate(-0.8deg)',
        }}>↑ 投影是 DSM-5，桌上是几杯特调与一道甜点。</div>
      </div>

      {/* 大问题 · 海报式 */}
      <div style={{ padding: '6px 22px 22px', position: 'relative' }}>
        <div style={{
          fontFamily: V1T.mono, fontSize: 9.5, color: V1T.ember, letterSpacing: 4, marginBottom: 8,
        }}>★ 那晚的核心提问</div>
        <div style={{ fontFamily: V1T.serif, fontSize: 24, fontWeight: 900, color: V1T.terraDk, lineHeight: 1.45, letterSpacing: 1 }}>
          成人 ADHD，<br/>
          究竟是被
          <span style={{
            background: `linear-gradient(180deg, transparent 55%, ${V1T.highlight} 55%, ${V1T.highlight} 95%, transparent 95%)`,
            padding: '0 2px',
          }}>医学发现</span>
          的疾病，<br/>
          还是被
          <span style={{
            background: `linear-gradient(180deg, transparent 55%, ${V1T.ember}66 55%, ${V1T.ember}66 95%, transparent 95%)`,
            padding: '0 2px',
          }}>时代塑造</span>
          出来的诊断？
        </div>
      </div>

      {/* 拼贴：拍立得 + 便签 */}
      <div style={{
        position: 'relative', height: 380, padding: '0 12px', overflow: 'hidden',
      }}>
        <Polaroid src={ASSETS.dessert} caption="抹茶 · 提拉米苏"
          rotate={-5} w={150} style={{ position: 'absolute', top: 8, left: 14 }} />
        <Polaroid src={ASSETS.cocktail} caption="特调·一只酣睡的狗"
          rotate={4} w={140} style={{ position: 'absolute', top: 30, right: 14 }} />
        <Polaroid src={ASSETS.speakerDogs} caption="天才之家·猫狗双全"
          rotate={-2} w={160} style={{ position: 'absolute', bottom: 8, left: 40 }} />

        <StickyNote rotate={6} style={{
          position: 'absolute', top: 14, right: 12,
          width: 130, transform: 'rotate(6deg)',
        }}>
          <div style={{ fontFamily: V1T.mono, fontSize: 9, color: V1T.terra, letterSpacing: 2, marginBottom: 4 }}>客厅记</div>
          有投影 · 有甜点 · 有酒 · 有猫狗 · 有突然安静下来的瞬间。
        </StickyNote>

        <div style={{
          position: 'absolute', bottom: 50, right: 16,
          fontFamily: V1T.serif, fontWeight: 800, fontSize: 13, color: V1T.terra,
          transform: 'rotate(-4deg)', lineHeight: 1.4,
        }}>
          很认真，<br/>但不端着 ✏️
        </div>
      </div>

      {/* 黄色荧光笔正文 */}
      <div style={{ padding: '8px 26px 0' }}>
        <div style={{
          fontFamily: V1T.mono, fontSize: 9.5, color: V1T.terra, letterSpacing: 3, marginBottom: 10,
        }}>—— 我们顺着问题，慢慢拆开了几条线索 ——</div>
        {V1_COPY.threads.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 10, marginBottom: 12,
          }}>
            <div style={{
              fontFamily: V1T.mono, fontSize: 11, color: V1T.ember, fontWeight: 700,
              flexShrink: 0, paddingTop: 3,
            }}>0{i + 1}</div>
            <div style={{ fontSize: 12.5, color: V1T.ink, lineHeight: 1.85, whiteSpace: 'pre-line', textWrap: 'pretty' }}>
              {t}
            </div>
          </div>
        ))}
      </div>

      {/* 大金句·荧光笔便签 */}
      <div style={{ padding: '20px 22px 12px', position: 'relative' }}>
        <div style={{
          background: V1T.highlight, padding: '22px 22px 18px',
          boxShadow: '3px 4px 10px rgba(58,36,18,0.18)', transform: 'rotate(-1.2deg)',
          position: 'relative',
        }}>
          <Tape top={-8} left={'40%'} w={48} color="#ffffffaa" rotate={4} />
          <div style={{
            fontFamily: V1T.mono, fontSize: 9.5, color: V1T.terraDk, letterSpacing: 2,
          }}>编辑划重点</div>
          <div style={{
            fontFamily: V1T.serif, fontSize: 17, fontWeight: 800, color: V1T.terraDk,
            lineHeight: 1.7, marginTop: 8, letterSpacing: 0.5, textWrap: 'pretty',
          }}>{V1_COPY.quote}</div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 14, paddingTop: 10, borderTop: `1px dashed ${V1T.terraDk}55`,
          }}>
            <div style={{ fontFamily: V1T.mono, fontSize: 9.5, color: V1T.terraDk, letterSpacing: 1.5 }}>
              VOL.01 · 现场金句
            </div>
            <div style={{
              fontFamily: V1T.mono, fontSize: 9, color: V1T.terraDk,
              padding: '3px 8px', border: `0.5px solid ${V1T.terraDk}66`, borderRadius: 10,
            }}>分享 ↗</div>
          </div>
        </div>
      </div>

      {/* 收尾 · 手写口吻 */}
      <div style={{ padding: '22px 26px 18px' }}>
        <div style={{ fontFamily: V1T.serif, fontSize: 16, fontWeight: 800, color: V1T.terraDk, lineHeight: 1.5 }}>
          这就是 DCT 第一期。
        </div>
        <div style={{ fontSize: 13, color: V1T.ink, lineHeight: 1.95, marginTop: 10 }}>
          不是为了给一个标准答案，<br/>而是为了把一个看似熟悉的词<u style={{ textDecorationColor: V1T.ember, textUnderlineOffset: 4, textDecorationThickness: 2 }}>重新打开</u>。
        </div>
        <div style={{
          marginTop: 16, padding: '14px 16px', background: V1T.paper,
          border: `1px dashed ${V1T.terra}`,
        }}>
          <div style={{ fontFamily: V1T.serif, fontSize: 13.5, color: V1T.terraDk, lineHeight: 1.85 }}>
            如果你也喜欢这种——<br/>
            有一点学术、有一点生活、<br/>
            有一点"不太正经"，<br/>
            但真的认真在想问题的夜晚，<br/>
            <strong>欢迎来 DCT 坐坐 ～</strong>
          </div>
        </div>
      </div>

      {/* 关键词 · 报纸 footer */}
      <div style={{
        margin: '10px 22px 22px', padding: '12px 0', borderTop: `2px double ${V1T.terraDk}`, borderBottom: `2px double ${V1T.terraDk}`,
      }}>
        <div style={{
          fontFamily: V1T.mono, fontSize: 9.5, color: V1T.terraDk, letterSpacing: 2, lineHeight: 1.8,
          textAlign: 'center',
        }}>
          {V1_COPY.keywords.join('  ·  ')}
        </div>
      </div>
    </V1Phone>
  );
}

// ────────────────────────────────────────────────────────────────────────
// C · 胶片相册（Polaroid scrapbook）
//    最以图为主：每段文字配一张拍立得。读起来像翻日记本
// ────────────────────────────────────────────────────────────────────────
function Vol01Album() {
  const Page = ({ img, caption, rotate = 0, side = 'left', children }) => (
    <div style={{
      display: 'flex', gap: 14, alignItems: 'flex-start',
      padding: '20px 22px', position: 'relative',
      flexDirection: side === 'right' ? 'row-reverse' : 'row',
    }}>
      <div style={{ flexShrink: 0, position: 'relative' }}>
        <div style={{
          position: 'absolute', top: -8, left: side === 'right' ? 'auto' : '60%', right: side === 'right' ? '60%' : 'auto',
          width: 36, height: 12, background: `${V1T.highlight}cc`,
          transform: `rotate(${side === 'right' ? 12 : -8}deg)`, zIndex: 2,
        }} />
        <div style={{
          background: V1T.paperHi, padding: '6px 6px 22px',
          boxShadow: '3px 5px 12px rgba(58,36,18,0.2)',
          transform: `rotate(${rotate}deg)`,
          width: 132,
        }}>
          <img src={img} alt="" style={{ width: 120, height: 120, objectFit: 'cover', display: 'block' }} />
          <div style={{
            fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 10, color: V1T.muted,
            textAlign: 'center', marginTop: 6,
          }}>{caption}</div>
        </div>
      </div>
      <div style={{ flex: 1, paddingTop: 4, minWidth: 0 }}>
        {children}
      </div>
    </div>
  );

  return (
    <V1Phone height={1980}>
      <V1Header />

      {/* 封面页 */}
      <div style={{ padding: '28px 26px 16px', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontFamily: V1T.mono, fontSize: 10, color: V1T.terra, letterSpacing: 5 }}>
          DCT · A SCRAPBOOK
        </div>
        <div style={{ width: 30, height: 1, background: V1T.terra, margin: '12px auto' }} />
        <div style={{
          fontFamily: V1T.serif, fontSize: 22, fontWeight: 900, color: V1T.terraDk,
          lineHeight: 1.45, letterSpacing: 1,
        }}>第一期 · 我们在客厅里<br/>聊了成人 ADHD</div>
        <div style={{
          fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 12, color: V1T.muted,
          marginTop: 12, lineHeight: 1.6,
        }}>2026.03.28 · 主讲 曹叔 · 现场 12 人</div>
      </div>

      {/* P1 · 现场 */}
      <Page img={ASSETS.speakerDogs} caption="2026.03.28 · 客厅" rotate={-3} side="left">
        <div style={{ fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 11, color: V1T.terra, letterSpacing: 2 }}>FIELD NOTE №1</div>
        <div style={{ fontFamily: V1T.serif, fontSize: 16, fontWeight: 800, color: V1T.terraDk, marginTop: 4, lineHeight: 1.4 }}>
          客厅亮着<br/>一盏暖灯
        </div>
        <div style={{ fontSize: 12, color: V1T.ink, lineHeight: 1.8, marginTop: 8, textWrap: 'pretty' }}>
          投影上是 ADHD 的临床定义，两只狗围在曹叔脚边——一边是很硬核的问题，一边是很松弛的客厅。
        </div>
      </Page>

      {/* P2 · hook question */}
      <div style={{
        padding: '8px 22px', textAlign: 'center', position: 'relative',
      }}>
        <div style={{
          background: V1T.paperHi, border: `0.5px solid ${V1T.rule}`,
          padding: '22px 22px', position: 'relative',
          boxShadow: '0 2px 8px rgba(58,36,18,0.08)', transform: 'rotate(-0.5deg)',
        }}>
          <div style={{
            position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%) rotate(-4deg)',
            width: 64, height: 16, background: '#ffe26baa',
          }} />
          <div style={{ fontFamily: V1T.mono, fontSize: 9.5, color: V1T.ember, letterSpacing: 3 }}>那晚的核心提问</div>
          <div style={{ fontFamily: V1T.serif, fontSize: 50, color: V1T.amber, lineHeight: 0.3, height: 18, marginTop: 4 }}>"</div>
          <div style={{
            fontFamily: V1T.serif, fontSize: 18, fontWeight: 800, color: V1T.terraDk,
            lineHeight: 1.7, marginTop: 6,
          }}>
            成人 ADHD，<br/>
            究竟是被医学发现的疾病，<br/>
            还是被时代<u style={{ textDecorationColor: V1T.ember, textDecorationThickness: 2, textUnderlineOffset: 4 }}>共同塑造</u>出来的诊断？
          </div>
        </div>
      </div>

      {/* P3 · talk */}
      <Page img={ASSETS.talk} caption="投影·DSM-5" rotate={3} side="right">
        <div style={{ fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 11, color: V1T.terra, letterSpacing: 2 }}>FIELD NOTE №2</div>
        <div style={{ fontFamily: V1T.serif, fontSize: 16, fontWeight: 800, color: V1T.terraDk, marginTop: 4, lineHeight: 1.4 }}>
          从儿童多动<br/>到成人焦虑
        </div>
        <div style={{ fontSize: 12, color: V1T.ink, lineHeight: 1.8, marginTop: 8, textWrap: 'pretty' }}>
          一个诊断如何在医学史、制度和个人经验之间逐渐成形——以及，谁在重新发明"我自己"。
        </div>
      </Page>

      {/* P4 · dessert */}
      <Page img={ASSETS.dessert} caption="抹茶提拉米苏 · ¥66 含一份" rotate={-4} side="left">
        <div style={{ fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 11, color: V1T.terra, letterSpacing: 2 }}>FIELD NOTE №3</div>
        <div style={{ fontFamily: V1T.serif, fontSize: 16, fontWeight: 800, color: V1T.terraDk, marginTop: 4, lineHeight: 1.4 }}>
          中场吃一口<br/>甜点继续聊
        </div>
        <div style={{ fontSize: 12, color: V1T.ink, lineHeight: 1.8, marginTop: 8, textWrap: 'pretty' }}>
          认真到可以追问 DSM、医学史和社会结构，也可以中途停下来——这就是 DCT 想保留的混合感。
        </div>
      </Page>

      {/* P5 · cocktail */}
      <Page img={ASSETS.cocktail} caption="特调 · 一只酣睡的狗" rotate={2.5} side="right">
        <div style={{ fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 11, color: V1T.terra, letterSpacing: 2 }}>FIELD NOTE №4</div>
        <div style={{ fontFamily: V1T.serif, fontSize: 16, fontWeight: 800, color: V1T.terraDk, marginTop: 4, lineHeight: 1.4 }}>
          狗已睡着<br/>讨论还在继续
        </div>
        <div style={{ fontSize: 12, color: V1T.ink, lineHeight: 1.8, marginTop: 8, textWrap: 'pretty' }}>
          有人记笔记，有人盯着杯子里的橙红色，有人在客厅地板上靠着另一只狗。
        </div>
      </Page>

      {/* 金句卡 · 撕纸感 */}
      <div style={{ padding: '8px 22px 14px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${V1T.ember}, ${V1T.terra} 70%, ${V1T.terraDk})`,
          padding: '22px 22px', color: V1T.paperHi, position: 'relative',
          clipPath: 'polygon(0 4%, 8% 0, 24% 6%, 38% 2%, 56% 5%, 74% 1%, 90% 4%, 100% 8%, 99% 96%, 86% 100%, 70% 96%, 50% 100%, 28% 94%, 8% 100%, 0 92%)',
        }}>
          <div style={{ fontFamily: V1T.serif, fontSize: 60, lineHeight: 0.3, height: 16, color: V1T.highlight, opacity: 0.7 }}>"</div>
          <div style={{
            fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 16, lineHeight: 1.75, marginTop: 4, textWrap: 'pretty',
          }}>{V1_COPY.quote}</div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16,
          }}>
            <div style={{ fontFamily: V1T.mono, fontSize: 9.5, opacity: 0.85, letterSpacing: 2 }}>
              VOL.01 · 现场金句
            </div>
            <div style={{ fontFamily: V1T.mono, fontSize: 9, padding: '3px 8px', border: `0.5px solid ${V1T.paperHi}66`, borderRadius: 10 }}>
              分享 ↗
            </div>
          </div>
        </div>
      </div>

      {/* P6 · 收尾 */}
      <div style={{ padding: '14px 26px 26px', textAlign: 'center' }}>
        <div style={{ fontFamily: V1T.serif, fontSize: 18, fontWeight: 800, color: V1T.terraDk, lineHeight: 1.55 }}>
          欢迎你也来，<br/>客厅里坐坐 ～
        </div>
        <div style={{
          display: 'inline-block', marginTop: 14, paddingTop: 8,
          borderTop: `1px solid ${V1T.terra}`, fontFamily: V1T.serif, fontStyle: 'italic',
          fontSize: 12, color: V1T.muted, letterSpacing: 1,
        }}>—— D · C · T 敬上 · 2026 春</div>
      </div>
    </V1Phone>
  );
}

// ────────────────────────────────────────────────────────────────────────
// D · 客厅夜谈（Cinematic dark warm）
//    深暖夜色 / 灯光感 / 引文驱动 / 照片更少更大 / 最具气质
// ────────────────────────────────────────────────────────────────────────
function Vol01Night() {
  const NIGHT_BG = `radial-gradient(120% 50% at 50% 0%, #4a2d18 0%, #2a180a 60%, #1a0e05 100%)`;
  return (
    <div style={{
      width: 360, height: 2240, background: NIGHT_BG, overflow: 'hidden',
      fontFamily: V1T.sans, color: V1T.paperHi, position: 'relative',
    }}>
      <V1Header light />

      {/* HERO · 现场全景图（图自带字幕：DCT第一期回顾 / 真正的畅所欲言 / 氛围组） */}
      <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        <img src={ASSETS.hero} alt="DCT 第一期现场" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
        }} />
        {/* 顶部·非常轻的暗角 */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 60,
          background: 'linear-gradient(180deg, rgba(26,14,5,0.45) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        {/* 底部·更强的暗角，承接下方的暗色文字区 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(180deg, transparent 0%, rgba(26,14,5,0.5) 60%, rgba(26,14,5,0.95) 100%)',
          pointerEvents: 'none',
        }} />
        {/* 左上 kicker */}
        <div style={{
          position: 'absolute', top: 14, left: 16,
          fontFamily: V1T.mono, fontSize: 10, color: V1T.amber, letterSpacing: 3,
        }}>VOL.01 · 2026.03.28</div>
        {/* 右上 meta */}
        <div style={{
          position: 'absolute', top: 14, right: 16,
          fontFamily: V1T.mono, fontSize: 9.5, color: V1T.paperHi, opacity: 0.85, letterSpacing: 2,
        }}>客厅 · 12 人</div>
      </div>

      {/* 主标题 · 紧贴 hero 下方 */}
      <div style={{ padding: '22px 22px 0', position: 'relative' }}>
        <div style={{
          fontFamily: V1T.serif, fontSize: 28, fontWeight: 900, color: V1T.paperHi,
          lineHeight: 1.3, letterSpacing: 1, textWrap: 'balance',
        }}>
          我们在客厅里<br/>
          聊了<span style={{ color: V1T.amber }}>成人 ADHD</span>
        </div>
        <div style={{
          fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 13, color: V1T.paperHi, opacity: 0.75,
          marginTop: 12, lineHeight: 1.7, textWrap: 'pretty',
        }}>
          不是一场普通科普，也不是一次严肃讲座。<br/>
          那天晚上的客厅里，灯亮着，狗在脚边，问题被打开。
        </div>
      </div>

      {/* HOOK · 大问题（占满视野） */}
      <div style={{ padding: '36px 22px 6px', position: 'relative' }}>
        <div style={{
          fontFamily: V1T.mono, fontSize: 9.5, color: V1T.amber, letterSpacing: 4, marginBottom: 14,
        }}>那晚的核心提问</div>
        <div style={{
          fontFamily: V1T.serif, fontSize: 23, fontWeight: 800, color: V1T.paperHi,
          lineHeight: 1.6, letterSpacing: 1, textWrap: 'balance',
        }}>
          成人 ADHD，<br/>
          究竟是<span style={{ color: V1T.amber, fontStyle: 'italic' }}>被医学发现</span>的疾病，<br/>
          还是<span style={{ color: V1T.ember, fontStyle: 'italic' }}>被时代塑造</span>出来的诊断？
        </div>
        <div style={{
          width: 50, height: 2, background: V1T.amber, marginTop: 22, opacity: 0.7,
        }} />
      </div>

      {/* 主图 · 现场（曹叔 + 两只狗的暖光特写） */}
      <div style={{ padding: '24px 22px 6px' }}>
        <div style={{
          position: 'relative', border: `1px solid ${V1T.amber}44`, padding: 4,
        }}>
          <img src={ASSETS.speakerDogs} alt="" style={{
            width: '100%', height: 240, objectFit: 'cover', display: 'block', filter: 'brightness(0.92)',
          }} />
          <div style={{
            fontFamily: V1T.mono, fontSize: 9, color: V1T.amber, letterSpacing: 2,
            marginTop: 6, paddingLeft: 2,
          }}>↑ 主讲 曹叔 · 一盏台灯 · 两只氛围组</div>
        </div>
      </div>

      {/* 四条线索 · 暗色卡片 */}
      <div style={{ padding: '26px 22px 0' }}>
        <div style={{
          fontFamily: V1T.serif, fontSize: 16, fontWeight: 700, color: V1T.paperHi, lineHeight: 1.6,
          marginBottom: 4,
        }}>我们没有急着给答案</div>
        <div style={{
          fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 12.5, color: V1T.paperHi, opacity: 0.6,
          marginBottom: 18,
        }}>而是顺着这个问题，慢慢拆开了几条线索 ——</div>
        {V1_COPY.threads.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, padding: '12px 0',
            borderBottom: `0.5px solid ${V1T.amber}33`,
          }}>
            <div style={{
              fontFamily: V1T.serif, fontSize: 22, fontWeight: 900, color: V1T.amber,
              lineHeight: 0.9, width: 24, flexShrink: 0, letterSpacing: -1, paddingTop: 2,
            }}>{(i + 1).toString().padStart(2, '0')}</div>
            <div style={{
              fontSize: 12.5, color: V1T.paperHi, opacity: i === V1_COPY.threads.length - 1 ? 1 : 0.85,
              fontWeight: i === V1_COPY.threads.length - 1 ? 600 : 400,
              lineHeight: 1.85, whiteSpace: 'pre-line', textWrap: 'pretty',
            }}>{t}</div>
          </div>
        ))}
      </div>

      {/* 双图小拼 */}
      <div style={{ padding: '22px 22px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ border: `1px solid ${V1T.amber}44`, padding: 3 }}>
          <img src={ASSETS.dessert} alt="" style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block', filter: 'brightness(0.92)' }} />
        </div>
        <div style={{ border: `1px solid ${V1T.amber}44`, padding: 3 }}>
          <img src={ASSETS.cocktail} alt="" style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block', filter: 'brightness(0.92)' }} />
        </div>
        <div style={{
          gridColumn: 'span 2',
          fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 12, color: V1T.paperHi, opacity: 0.6,
          lineHeight: 1.7, marginTop: 2,
        }}>
          也有甜点、酒、猫狗——和一些突然安静下来的瞬间。
        </div>
      </div>

      {/* 大引文 */}
      <div style={{ padding: '32px 22px 0' }}>
        <div style={{
          fontFamily: V1T.serif, fontSize: 80, color: V1T.amber, opacity: 0.6, lineHeight: 0.3, height: 28,
        }}>"</div>
        <div style={{
          fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 19, fontWeight: 600, color: V1T.paperHi,
          lineHeight: 1.8, letterSpacing: 0.5, textWrap: 'balance', marginTop: 8,
        }}>{V1_COPY.quote}</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginTop: 18,
          paddingTop: 14, borderTop: `0.5px solid ${V1T.amber}66`,
        }}>
          <div style={{ fontFamily: V1T.mono, fontSize: 9.5, color: V1T.amber, letterSpacing: 2, flex: 1 }}>
            VOL.01 · 现场金句
          </div>
          <div style={{
            fontFamily: V1T.mono, fontSize: 9, color: V1T.paperHi,
            padding: '3px 9px', border: `0.5px solid ${V1T.paperHi}55`, borderRadius: 10,
          }}>分享 ↗</div>
        </div>
      </div>

      {/* 收尾 · 切换到暖纸 */}
      <div style={{
        margin: '36px 0 0',
        background: V1T.paper, color: V1T.ink,
        padding: '28px 26px',
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        boxShadow: '0 -8px 24px rgba(0,0,0,0.3)',
      }}>
        <div style={{
          fontFamily: V1T.mono, fontSize: 9.5, color: V1T.terra, letterSpacing: 3, marginBottom: 8,
        }}>FROM YOUR HOSTS</div>
        <div style={{ fontFamily: V1T.serif, fontSize: 17, fontWeight: 800, color: V1T.terraDk, lineHeight: 1.55 }}>
          欢迎你也来，<br/>客厅里坐坐 ～
        </div>
        <div style={{ fontSize: 12.5, color: V1T.inkSoft, lineHeight: 1.85, marginTop: 10, textWrap: 'pretty' }}>
          有一点学术，有一点生活，有一点"不太正经"——但真的认真在想问题。
        </div>
        {/* 主 CTA · 报名本期 */}
        <div style={{
          marginTop: 18,
          background: `linear-gradient(135deg, ${V1T.ember} 0%, ${V1T.terra} 60%, ${V1T.terraDk} 100%)`,
          borderRadius: 14, padding: '16px 18px', position: 'relative', overflow: 'hidden',
          color: V1T.paperHi, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: `0 6px 18px ${V1T.terra}55`,
        }}>
          {/* 光晕 */}
          <div style={{
            position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50,
            background: `radial-gradient(circle, ${V1T.amber}66 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: V1T.mono, fontSize: 10, opacity: 0.85, letterSpacing: 3 }}>
              本期 · VOL.03 · 报名中
            </div>
            <div style={{ fontFamily: V1T.serif, fontSize: 16, fontWeight: 800, marginTop: 4, letterSpacing: 0.5 }}>
              医美热时代的冷思考
            </div>
            <div style={{ fontFamily: V1T.serif, fontStyle: 'italic', fontSize: 11, opacity: 0.88, marginTop: 3 }}>
              2026.05.23 · 客厅外场 · 88 元 / 位
            </div>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 22,
            background: V1T.paperHi, color: V1T.terraDk,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 700, position: 'relative', flexShrink: 0,
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}>→</div>
        </div>

        {/* 次级 · 返回往期 */}
        <div style={{
          marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 14px', border: `0.5px solid ${V1T.rule}`, borderRadius: 12,
        }}>
          <div>
            <div style={{ fontFamily: V1T.mono, fontSize: 9.5, color: V1T.muted, letterSpacing: 2 }}>NEXT · VOL.02</div>
            <div style={{ fontFamily: V1T.serif, fontSize: 13, fontWeight: 700, color: V1T.terraDk, marginTop: 2 }}>
              六星之路 · 已结束
            </div>
          </div>
          <div style={{ fontSize: 16, color: V1T.muted }}>→</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Vol01WarmScroll,
  Vol01Collage,
  Vol01Album,
  Vol01Night,
});
