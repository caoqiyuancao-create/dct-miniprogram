// Screen — About DCT (创办故事)
// Content faithful to Vol.01 opening PDF · 6-scene animation + long-form essay
// Comic/portrait art lives in <ArtSlot/> placeholders — replace with real images later.

function ScreenAbout({ go }) {
  const [scene, setScene] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const scenes = [
    { caption: '一切从天时地利人和说起', sub: '2026 · 一个客厅 · 三个 PhD' },
    { caption: '一只狗、一道菜、一次对话', sub: 'Dog · Chef · Therapist' },
    { caption: '在绩效之外',           sub: '留一块精神自留地' },
    { caption: 'Doctors\' Crazy Thinking', sub: '认真地胡思乱想' },
    { caption: '客厅里的家庭学术沙龙', sub: '一期一会 · 不功利的深度交流' },
    { caption: '欢迎你也来',           sub: '一起建设这块自留地' },
  ];

  React.useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (scene < scenes.length - 1) setScene(scene + 1);
      else setPlaying(false);
    }, 2400);
    return () => clearTimeout(t);
  }, [scene, playing]);

  const replay = () => { setScene(0); setPlaying(true); };

  return (
    <div style={{ background: '#f6f8fc', minHeight: '100%' }}>
      <WxHeader title="关于 DCT" />

      {/* Animation stage */}
      <div style={{
        position: 'relative', height: 320, overflow: 'hidden',
        background: 'linear-gradient(180deg, #e7f0fa 0%, #c9ddf3 100%)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'conic-gradient(from 210deg at 50% 110%, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.5) 30deg, rgba(255,255,255,0) 60deg, rgba(255,255,255,0.3) 90deg, rgba(255,255,255,0) 120deg, rgba(255,255,255,0.5) 150deg, rgba(255,255,255,0) 180deg)',
          opacity: 0.5,
        }} />
        <AboutScene active={scene === 0} variant="sky" />
        <AboutScene active={scene === 1} variant="three" />
        <AboutScene active={scene === 2} variant="seedling" />
        <AboutScene active={scene === 3} variant="brand" />
        <AboutScene active={scene === 4} variant="living" />
        <AboutScene active={scene === 5} variant="invite" />

        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', color: '#0f2855',
        }}>
          <div className="serif" style={{
            fontSize: 22, fontWeight: 700, letterSpacing: 2,
            textShadow: '0 1px 0 rgba(255,255,255,0.7)',
          }}>{scenes[scene].caption}</div>
          <div style={{ fontSize: 11, color: '#55709a', marginTop: 4, letterSpacing: 1 }}>{scenes[scene].sub}</div>
        </div>

        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 4,
        }}>
          {scenes.map((_, i) => (
            <div key={i} onClick={() => { setScene(i); setPlaying(false); }}
              style={{
                width: i === scene ? 14 : 4, height: 4, borderRadius: 2,
                background: i === scene ? '#1a3a78' : 'rgba(26,58,120,0.3)',
                transition: 'all 0.3s',
              }} />
          ))}
        </div>

        {!playing && (
          <div onClick={replay} style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(255,255,255,0.8)', borderRadius: 12,
            padding: '4px 10px', fontSize: 10, color: '#1a3a78',
            letterSpacing: 1, fontFamily: '"JetBrains Mono", monospace',
          }}>↻ REPLAY</div>
        )}
      </div>

      {/* WHY · DCT 从何而来 */}
      <AboutSection kicker="WHY" title="DCT 从何而来">
        <p>2026 年的春天，三个非典型的精神科 PhD 坐在同一个客厅里——发现彼此都在等待<strong>一种久违的状态</strong>：愿意慢下来，认真聊一些"不那么有用但很重要"的事。</p>
        <p>我们把这种状态称作 <strong>天时地利人和</strong>——天时是这一年都在心里酝酿的某种倦怠与好奇，地利是恰好可以容纳几个人坐下来的客厅，人和是这群愿意暴露自己、也愿意倾听别人的朋友。</p>
        <Quote>「天时地利人和——对知识和真诚深入交流的期待。」</Quote>
      </AboutSection>

      {/* THREE · 三位主创 */}
      <AboutSection kicker="WHO" title="三位主创 · D · C · T">
        <p>沙龙的发起人是三个共同读博、各自带着第二、第三身份的精神科医生：</p>

        <CreatorCard
          letter="D"
          word="Dog"
          name="包文欣"
          role="狗子"
          desc="重度爱狗人士。把对一只狗的耐心、好奇和温柔，复刻进对每一个人的提问里。"
        />
        <CreatorCard
          letter="C"
          word="Chef"
          name="徐佳淇"
          role="厨子"
          desc="家宴的策划者。相信好的食物能让人放松地说真话——所以每一期都有限定的甜品与酒。"
        />
        <CreatorCard
          letter="T"
          word="Therapist"
          name="曹栖源"
          role="治疗师"
          desc={'日常工作是聆听与共情。把临床里训练出的「倾听肌肉」，搬进这间客厅。'}
        />

        <p style={{ fontSize: 12, color: '#55709a', fontStyle: 'italic', marginTop: 4 }}>
          ※ 主创真实形象 / 漫画头像将于后续插入此处。
        </p>
      </AboutSection>

      {/* WHAT · DCT 三层含义 */}
      <AboutSection kicker="WHAT" title="DCT 的三层意思">
        <MeaningRow num="01" en="Dog · Chef · Therapist" zh="三个人的三种身份" />
        <MeaningRow num="02" en="Doctors' Crazy Thinking" zh="一群医生的胡思乱想" />
        <MeaningRow num="03" en="认真地胡思乱想" zh="用科学的态度，聊天马行空的奇思妙想" highlight />
        <p style={{ marginTop: 14 }}>
          它既是个名字，也是种态度——<strong>不必非得"有用"才值得讨论</strong>，但讨论时要保留科学训练给我们的那份认真。
        </p>
      </AboutSection>

      {/* HOW · 客厅里的学术 */}
      <AboutSection kicker="HOW" title="为什么是「客厅里」">
        <p>我们刻意没有选讲堂、咖啡馆、共享空间——而是<strong>客厅</strong>。它在物理上离生活最近，也在心理上离表演最远。</p>
        <p>没有 PPT 也行、不正襟危坐也行、说错话也行。我们希望氛围像朋友间的夜谈：有人讲，有人听，有人随时插话，有人沉默地吃一块甜品。</p>
        <p>每期一位主讲人 · 一个 TA 真心热爱或长期琢磨的话题 · 40 分钟左右分享 · 之后是自由讨论。<strong>欢迎打断、追问、不同意</strong>——只要友善。</p>
      </AboutSection>

      {/* RULES · 谁可以来 */}
      <AboutSection kicker="WHO MAY JOIN" title="什么样的人会来？">
        <p>没有学科限制 · 没有职称门槛 · 不查论文影响因子。</p>
        <p>我们筛选的标准只有两条：</p>
        <ul style={{ paddingLeft: 18, margin: '8px 0 12px', lineHeight: 1.85 }}>
          <li><strong>真的对当期话题感兴趣</strong>——而不是来凑场。</li>
          <li><strong>愿意友善地交换观点</strong>——能讲，也能听；能质疑，也能被质疑。</li>
        </ul>
        <p>每期 10–15 人，多学科背景优先，尽量不要让客厅变成同一个领域的回音室。</p>
      </AboutSection>

      {/* Closing CTA */}
      <div style={{ padding: '8px 22px 40px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #fbf6ec 0%, #f5e8d0 100%)',
          borderRadius: 16, padding: '20px 22px',
          border: '0.5px solid #e8dcc0', textAlign: 'center',
        }}>
          <div className="serif" style={{ fontSize: 17, fontWeight: 700, color: '#6b4c1e', lineHeight: 1.5 }}>
            期待和你一起，<br />建设这块精神自留地。
          </div>
          <div style={{ fontSize: 11, color: '#8a6f3a', marginTop: 6, letterSpacing: 1 }}>
            DCT · EST. 2026 · CHENGDU
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button onClick={() => go('home')} style={{
              flex: 1, height: 42, borderRadius: 21, border: '1px solid #c9a24a',
              background: 'transparent', color: '#6b4c1e', fontSize: 13, fontWeight: 600,
              fontFamily: '"Noto Sans SC", system-ui',
            }}>返回首页</button>
            <button onClick={() => go('landing')} style={{
              flex: 1, height: 42, borderRadius: 21, border: 'none',
              background: '#1a3a78', color: '#fff', fontSize: 13, fontWeight: 600,
              fontFamily: '"Noto Sans SC", system-ui',
            }}>看看本期</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatorCard({ letter, word, name, role, desc }) {
  return (
    <div style={{
      display: 'flex', gap: 14, marginTop: 14, marginBottom: 4,
      background: '#fff', borderRadius: 14, padding: '14px 14px',
      border: '0.5px solid #e3e9f3',
    }}>
      {/* Portrait placeholder */}
      <div style={{
        width: 64, height: 64, borderRadius: 12, flexShrink: 0,
        background: 'linear-gradient(135deg, #e7f0fa 0%, #9dbfe3 100%)',
        position: 'relative', display: 'flex',
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <div className="serif" style={{
          fontSize: 36, fontWeight: 900, color: '#1a3a78', opacity: 0.55, letterSpacing: 0,
        }}>{letter}</div>
        <div style={{
          position: 'absolute', bottom: 4, left: 0, right: 0, textAlign: 'center',
          fontSize: 8, color: '#1a3a78', letterSpacing: 1, opacity: 0.6,
          fontFamily: '"JetBrains Mono", monospace',
        }}>PORTRAIT</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
          <div className="serif" style={{ fontSize: 16, fontWeight: 700, color: '#0f2855' }}>
            {name}
          </div>
          <div className="mono" style={{ fontSize: 10, color: '#55709a', letterSpacing: 1.5 }}>
            {word.toUpperCase()}
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#c9a24a', letterSpacing: 1, marginBottom: 6 }}>
          {role}
        </div>
        <div style={{ fontSize: 12, color: '#3d5f94', lineHeight: 1.6, textWrap: 'pretty' }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

function MeaningRow({ num, en, zh, highlight }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0',
      borderBottom: '0.5px solid #e3e9f3',
    }}>
      <div className="mono" style={{
        fontSize: 11, color: highlight ? '#c9a24a' : '#8496b3', letterSpacing: 1,
        paddingTop: 4, fontWeight: 600,
      }}>{num}</div>
      <div style={{ flex: 1 }}>
        <div className="serif" style={{
          fontSize: highlight ? 17 : 14, fontWeight: highlight ? 800 : 600,
          color: highlight ? '#0f2855' : '#1a3a78', lineHeight: 1.4, letterSpacing: 0.5,
        }}>{en}</div>
        <div style={{
          fontSize: 12, color: highlight ? '#6b4c1e' : '#55709a', marginTop: 3, lineHeight: 1.5,
        }}>{zh}</div>
      </div>
    </div>
  );
}

function AboutSection({ kicker, title, children }) {
  return (
    <div style={{ padding: '28px 22px 0' }}>
      <div className="mono" style={{
        fontSize: 10.5, color: '#55709a', letterSpacing: 4, marginBottom: 6,
      }}>{kicker}</div>
      <div className="serif" style={{
        fontSize: 22, fontWeight: 900, color: '#0f2855', letterSpacing: 1, marginBottom: 14,
      }}>{title}</div>
      <div style={{ fontSize: 13, color: '#2a3d5c', lineHeight: 1.85, textWrap: 'pretty' }}>
        {React.Children.map(children, (c, i) => c && (typeof c.type === 'string' || c.type === 'p' || c.type === 'ul')
          ? React.cloneElement(c, { style: { ...(c.props.style || {}), marginBottom: 12 } })
          : c
        )}
      </div>
    </div>
  );
}

function Quote({ children }) {
  return (
    <div className="serif" style={{
      fontSize: 15, color: '#1a3a78', fontStyle: 'italic',
      borderLeft: '2px solid #c9a24a', padding: '4px 0 4px 14px',
      marginTop: 14, lineHeight: 1.7,
    }}>{children}</div>
  );
}

function AboutScene({ active, variant }) {
  const common = {
    position: 'absolute', inset: 0, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    opacity: active ? 1 : 0,
    transform: active ? 'scale(1)' : 'scale(0.92)',
    transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
    pointerEvents: 'none',
  };
  if (variant === 'sky') {
    return (
      <div style={common}>
        <div style={{ position: 'relative', width: 220, height: 130 }}>
          <div style={{ position: 'absolute', left: 20, top: 30, width: 70, height: 24, borderRadius: 14, background: 'rgba(255,255,255,0.85)' }} />
          <div style={{ position: 'absolute', left: 130, top: 50, width: 56, height: 20, borderRadius: 12, background: 'rgba(255,255,255,0.75)' }} />
          <div style={{ position: 'absolute', left: 70, top: 80, width: 80, height: 22, borderRadius: 14, background: 'rgba(255,255,255,0.65)' }} />
        </div>
      </div>
    );
  }
  if (variant === 'three') {
    return (
      <div style={common}>
        <div style={{ display: 'flex', gap: 22 }}>
          {[
            { label: 'D', word: 'Dog' },
            { label: 'C', word: 'Chef' },
            { label: 'T', word: 'Therapist' },
          ].map((it, i) => (
            <div key={i} style={{
              width: 64, height: 64, borderRadius: 32, background: '#fff',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 14px rgba(15,40,85,0.14)',
              animation: active ? `floatY 2s ease-in-out ${i * 0.3}s infinite alternate` : 'none',
            }}>
              <div className="serif" style={{ fontSize: 26, fontWeight: 900, color: '#1a3a78', lineHeight: 1 }}>{it.label}</div>
              <div className="mono" style={{ fontSize: 8, letterSpacing: 1, color: '#55709a', marginTop: 2 }}>{it.word.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (variant === 'seedling') {
    // 一片精神自留地：方块田 + 中央一颗发光小芽
    return (
      <div style={common}>
        <svg width="220" height="130" viewBox="0 0 220 130">
          <rect x="40" y="60" width="140" height="50" rx="4" fill="rgba(15,40,85,0.06)" stroke="#1a3a78" strokeWidth="0.7" strokeDasharray="2 2"/>
          <line x1="75" y1="60" x2="75" y2="110" stroke="#1a3a78" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4"/>
          <line x1="110" y1="60" x2="110" y2="110" stroke="#1a3a78" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4"/>
          <line x1="145" y1="60" x2="145" y2="110" stroke="#1a3a78" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4"/>
          <path d="M110 80 Q105 65 110 50 Q115 65 110 80 Z" fill="#c9a24a"/>
          <circle cx="110" cy="55" r="14" fill="rgba(233,185,73,0.3)"/>
        </svg>
      </div>
    );
  }
  if (variant === 'brand') {
    return (
      <div style={common}>
        <div style={{ textAlign: 'center' }}>
          <div className="mono" style={{
            fontSize: 11, letterSpacing: 5, color: '#55709a', marginBottom: 8,
          }}>DOCTORS' CRAZY THINKING</div>
          <div className="serif" style={{
            fontSize: 38, fontWeight: 900, color: '#0f2855', letterSpacing: 6,
          }}>认真地胡思乱想</div>
        </div>
      </div>
    );
  }
  if (variant === 'living') {
    return (
      <div style={common}>
        <svg width="220" height="120" viewBox="0 0 220 120">
          <rect x="30" y="40" width="160" height="60" rx="6" fill="#fff" stroke="#1a3a78" strokeWidth="1.5"/>
          <rect x="40" y="70" width="40" height="20" rx="3" fill="#1a3a78" opacity="0.15"/>
          <rect x="90" y="70" width="40" height="20" rx="3" fill="#1a3a78" opacity="0.15"/>
          <rect x="140" y="70" width="40" height="20" rx="3" fill="#1a3a78" opacity="0.15"/>
          <circle cx="60" cy="60" r="5" fill="#c9a24a"/>
          <circle cx="110" cy="60" r="5" fill="#c9a24a"/>
          <circle cx="160" cy="60" r="5" fill="#c9a24a"/>
          <rect x="45" y="20" width="130" height="8" rx="2" fill="#1a3a78" opacity="0.25"/>
        </svg>
      </div>
    );
  }
  if (variant === 'invite') {
    return (
      <div style={common}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: 14, height: 14,
                clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)',
                background: '#c9a24a', opacity: 0.3 + i * 0.15,
              }} />
            ))}
          </div>
          <div className="serif" style={{ fontSize: 34, color: '#0f2855', fontWeight: 900, letterSpacing: 6 }}>
            DCT
          </div>
        </div>
      </div>
    );
  }
  return null;
}

Object.assign(window, { ScreenAbout });
