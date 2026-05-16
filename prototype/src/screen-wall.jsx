// Screen W — 电子留言墙 · 现场咖啡厅 TV 大屏
// 16:9 横屏；左：今晚到场者的一句话身份；右：大家想问讲者的问题。
// 滚动 + 渐入；每条带 timestamp + 昵称/匿名 + tag。
//
// 数据来源：DCT_DATA.getCurrent().wallSeed —— 真实运营时由后台 push，
// 这里用一组示例（来自 md 中的范例 + 与本期主题贴合的扩展）。

const WALL_INTROS = [
  { who: '华西皮肤科·研二',   line: '对医美又心动又警惕' },
  { who: '麻醉科·主治',       line: '看够了手术室里的"美丽代价"' },
  { who: '社会学·田野中',     line: '在研究"被看见的脸"' },
  { who: '设计师·成都',       line: '每天画女孩的脸，最近开始画皱纹' },
  { who: '心理咨询师',         line: '陪了很多女孩走进医院又走出来' },
  { who: '医学生·临八',       line: '正在被科研和临床双重塑形' },
  { who: '咖啡因依赖者',       line: '想知道抗衰是不是智商税' },
  { who: '皮肤敏感患者',       line: '光是修复屏障就够我学一辈子' },
  { who: '前媒体人·转行中',   line: '写过太多医美稿，现在不敢写了' },
  { who: '产科医生',           line: '产后修复≠医美，但常被混为一谈' },
  { who: '神经科·博后',       line: '想聊聊"皮肤是另一个大脑"' },
  { who: '哲学系·硕一',       line: '在研究"什么算是变美"' },
  { who: '化妆品研发',         line: '配方里加得越多，敬畏越多' },
  { who: '产品经理·25',       line: '每天被算法推美貌焦虑' },
  { who: '正畸医生',           line: '我的同行们也常被问"做了吗"' },
  { who: '严肃讨论爱好者',     line: '想听一次不带广告的医美课' },
  { who: '皮肤科·进修',       line: '从基层来听一些不一样的声音' },
  { who: '甜品师·陌生的朋友', line: '今晚也是后厨的我' },
];

const WALL_QUESTIONS = [
  '医美的边界在哪里？什么时候是"医"，什么时候只是"美"？',
  '普通人怎么判断自己是不是真的需要医美？',
  '医美到底在解决问题，还是在制造焦虑？',
  '皮肤科医生自己怎么看抗衰？',
  '心理上的"不接纳自己"，能靠医美解决吗？',
  '当伴侣 / 父母不支持，要不要继续？',
  '审美标准被算法压成一张脸，我们还能选择吗？',
  '医美前最重要的一个问题，应该是什么？',
  '所谓"早 C 晚 A"到底是科学还是营销？',
  '修复屏障和医美抗老，应该先做哪个？',
  '一个皮肤科医生最常劝退别人做的项目是什么？',
  '"轻医美"真的轻吗？',
  '当我们说"自然感"——到底是谁定义的自然？',
  '如果只能给一个建议，你会对 25 岁的人说什么？',
  '如果只能给一个建议，你会对 45 岁的人说什么？',
];

function ScreenWall({ embedded }) {
  const D = window.DCT_DATA;
  const cur = D.getCurrent();
  const speakerName = cur.speaker.name || '讲者';

  // 时钟
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  // 滚动 — 左右两列各自循环
  const [introIdx, setIntroIdx] = React.useState(0);
  const [qIdx, setQIdx] = React.useState(0);
  React.useEffect(() => {
    const t1 = setInterval(() => setIntroIdx(i => (i + 1) % WALL_INTROS.length), 3000);
    const t2 = setInterval(() => setQIdx(i => (i + 1) % WALL_QUESTIONS.length), 4200);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const visibleIntros = 5;
  const visibleQs = 4;
  const introsToShow = Array.from({ length: visibleIntros }, (_, k) =>
    WALL_INTROS[(introIdx + k) % WALL_INTROS.length]
  );
  const qsToShow = Array.from({ length: visibleQs }, (_, k) =>
    WALL_QUESTIONS[(qIdx + k) % WALL_QUESTIONS.length]
  );

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'radial-gradient(ellipse at top right, #1d3d6b 0%, #0c1f3d 50%, #050d1d 100%)',
      color: '#fff', position: 'relative', overflow: 'hidden',
      fontFamily: '"Noto Sans SC", -apple-system, system-ui',
    }}>
      {/* 装饰 — 漂浮金色星点 */}
      <Star4 x={88} y={12} s={14} o={0.55} />
      <Star4 x={5}  y={20} s={10} o={0.4} />
      <Star4 x={94} y={62} s={9}  o={0.35} />
      <Star4 x={3}  y={88} s={12} o={0.4} />

      {/* 大字水印 */}
      <div className="serif" style={{
        position: 'absolute', right: -10, bottom: -30,
        fontSize: 280, fontWeight: 900, color: 'rgba(255,255,255,0.03)',
        letterSpacing: 8, lineHeight: 1, pointerEvents: 'none',
      }}>冷思考</div>

      {/* HEADER */}
      <div style={{
        padding: '32px 48px 20px', display: 'flex', alignItems: 'center', gap: 24,
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      }}>
        <img src="assets/logo.png" alt="DCT" style={{
          width: 64, height: 64, borderRadius: 32, background: '#fff', padding: 4,
          boxShadow: '0 0 0 2px rgba(255,255,255,0.4)',
        }} />
        <div style={{ flex: 1 }}>
          <div className="mono" style={{
            fontSize: 13, letterSpacing: 4, color: '#e9b949', marginBottom: 4,
          }}>DCT · ACADEMIC SALON · VOL.03</div>
          <div className="serif" style={{
            fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: 2, lineHeight: 1.15,
          }}>
            医美热时代的<span style={{ color: '#e9b949' }}>冷</span>思考
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <div className="mono" style={{
            fontSize: 38, fontWeight: 500, letterSpacing: 4, color: '#fff',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {hh}:{mm}<span style={{ color: '#e9b949' }}>:{ss}</span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: 2 }}>
            2026.05.23 · 陌生的朋友咖啡厅
          </div>
        </div>
      </div>

      {/* TWO COLUMNS */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1px 1fr',
        padding: '24px 40px 28px', gap: 28, height: 'calc(100% - 178px)',
        position: 'relative', zIndex: 2,
      }}>
        {/* LEFT — 在场者 */}
        <WallColumn
          kicker="WHO IS HERE TONIGHT"
          title="今晚，谁来到了 DCT？"
          subtitle={`30 个身份 · 来自不同学科、不同视角`}
          accent="#9ac4ff"
        >
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18,
          }}>
            {introsToShow.map((item, k) => (
              <IntroCard key={`${introIdx}-${k}`} who={item.who} line={item.line} fadeAt={k} />
            ))}
          </div>
        </WallColumn>

        {/* vertical divider */}
        <div style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.18) 70%, transparent 100%)',
        }} />

        {/* RIGHT — 大家想问的 */}
        <WallColumn
          kicker="WHAT WE'RE ASKING TONIGHT"
          title={`大家想问 ${speakerName} 什么？`}
          subtitle="今晚我们真正关心的问题"
          accent="#e9b949"
        >
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 18, marginTop: 18,
          }}>
            {qsToShow.map((q, k) => (
              <QuestionCard key={`${qIdx}-${k}`} q={q} idx={(qIdx + k) % WALL_QUESTIONS.length} fadeAt={k} />
            ))}
          </div>
        </WallColumn>
      </div>

      {/* FOOTER */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 48px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '0.5px solid rgba(255,255,255,0.06)',
      }}>
        <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: 3 }}>
          DCT · DOG, CHEF &amp; THERAPIST · EST.2026 · CHENGDU
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 12, color: 'rgba(255,255,255,0.7)',
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: 4, background: '#5fd97b',
            boxShadow: '0 0 8px #5fd97b',
            animation: 'wallPulse 1.6s ease-in-out infinite',
          }} />
          <span>留言墙实时更新 · 仍可在小程序内继续提交</span>
        </div>
      </div>

      <style>{`
        @keyframes wallPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.8); }
        }
        @keyframes wallEnter {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function WallColumn({ kicker, title, subtitle, children, accent }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div className="mono" style={{
        fontSize: 12, letterSpacing: 4, color: accent, marginBottom: 8, fontWeight: 500,
      }}>{kicker}</div>
      <div className="serif" style={{
        fontSize: 30, fontWeight: 800, color: '#fff', letterSpacing: 1, lineHeight: 1.15,
      }}>{title}</div>
      <div style={{
        fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 6, letterSpacing: 0.5,
      }}>{subtitle}</div>
      {children}
    </div>
  );
}

function IntroCard({ who, line, fadeAt }) {
  const opacity = 1 - (fadeAt * 0.16);
  return (
    <div
      style={{
        animation: 'wallEnter 0.6s ease forwards',
        opacity,
        background: 'rgba(255,255,255,0.04)',
        border: '0.5px solid rgba(255,255,255,0.10)',
        borderRadius: 12, padding: '12px 16px',
        display: 'flex', gap: 14, alignItems: 'center',
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 18, flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(154,196,255,0.2) 0%, rgba(154,196,255,0.05) 100%)',
        border: '0.5px solid rgba(154,196,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, color: '#bfd8ff',
        fontFamily: '"JetBrains Mono", monospace',
      }}>{who.charAt(0)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="mono" style={{
          fontSize: 11.5, color: '#9ac4ff', letterSpacing: 0.8, marginBottom: 3,
        }}>{who}</div>
        <div style={{
          fontSize: 17, color: '#fff', lineHeight: 1.4, fontWeight: 400,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>"{line}"</div>
      </div>
    </div>
  );
}

function QuestionCard({ q, idx, fadeAt }) {
  const opacity = 1 - (fadeAt * 0.18);
  return (
    <div
      style={{
        animation: 'wallEnter 0.65s ease forwards',
        opacity,
        position: 'relative',
        padding: '6px 0 16px 30px',
        borderBottom: '0.5px solid rgba(233,185,73,0.18)',
      }}
    >
      <div className="serif" style={{
        position: 'absolute', left: -2, top: -6, fontSize: 40, color: 'rgba(233,185,73,0.6)',
        lineHeight: 1, fontWeight: 700,
      }}>"</div>
      <div className="mono" style={{
        fontSize: 10.5, color: '#e9b949', letterSpacing: 2, marginBottom: 6, fontWeight: 500,
      }}>Q.{String(idx + 1).padStart(2, '0')}</div>
      <div className="serif" style={{
        fontSize: 19, color: '#fff', lineHeight: 1.45, fontWeight: 400, letterSpacing: 0.3,
        textWrap: 'pretty',
      }}>{q}</div>
    </div>
  );
}

Object.assign(window, { ScreenWall });
