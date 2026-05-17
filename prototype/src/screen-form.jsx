// Screen 2 — Sign-up form
// v3 新增：
//   · 一句话自我介绍（会上电视墙）
//   · 期待/想问讲者的问题（会上电视墙）
//   · 匿名展示提示

function ScreenForm({ go }) {
  const D = window.DCT_DATA;
  const cur = D.getCurrent();
  const isV3 = cur && cur.id === 'vol03';

  const [v, setV] = React.useState({
    name: '', wechat: '', phone: '', org: '', field: '',
    selfIntro: '', wallNickname: '', expectation: '', why: '',
    consentWall: true, consentRules: false,
  });
  const set = (k) => (e) => setV({ ...v, [k]: e?.target ? e.target.value : e });

  return (
    <div style={{ background: '#f6f8fc', minHeight: '100%' }}>
      <PosterSky tone="soft" style={{ paddingBottom: 20 }}>
        <WxHeader title={`报名 · 第${cur.number === 3 ? '三' : '二'}期`} transparent />
        <div style={{ padding: '6px 22px 22px' }}>
          <div className="serif" style={{ fontSize: 24, fontWeight: 700, color: '#0f2855' }}>
            告诉我们一点你自己
          </div>
          <div style={{ fontSize: 12.5, color: '#3d5f94', marginTop: 6, lineHeight: 1.7 }}>
            DCT 希望每期都有多学科的思想碰撞——这不是面试，是自我介绍。<br/>
            {isV3 && <>本期我们会在咖啡厅 TV 上设一面 <b style={{ color: '#0f2855' }}>DCT 电子留言墙</b>，下方两题的内容可能以匿名形式滚动展示。</>}
          </div>
        </div>
      </PosterSky>

      <div style={{ padding: '18px 16px 0' }}>
        <FieldGroup label="基本信息">
          <Field  label="姓名"    value={v.name}   onChange={set('name')}   placeholder="真实姓名" />
          <Field  label="微信号"  value={v.wechat} onChange={set('wechat')} placeholder="用于通知结果与入群" mono last />
        </FieldGroup>

        <FieldGroup label="联系方式">
          <Field  label="手机号"  value={v.phone}  onChange={set('phone')}  placeholder="+86" mono last />
        </FieldGroup>

        <FieldGroup label="学术背景">
          <Field  label="单位 / 院校" value={v.org}   onChange={set('org')}   placeholder="如：华西医院 / 西南交大" />
          <Field  label="专业 / 方向"  value={v.field} onChange={set('field')} placeholder="如：皮肤科、心理学、社会学" last />
        </FieldGroup>

        {/* === V3 新题块 === */}
        {isV3 && (
          <FieldGroup
            label={<span>留言墙 · 一句话自我介绍 <WallTag /></span>}
            hint={'可以具体，也可以抽象。比如：\n"华西皮肤科打工人" / "正在被科研和临床双重塑形的医学生"\n"对医美很好奇但又有点警惕的普通人"'}
          >
            <Field
              label="昵称"
              value={v.wallNickname}
              onChange={set('wallNickname')}
              placeholder="留言墙上显示这个（默认不显示真名）"
            />
            <TextArea
              value={v.selfIntro}
              onChange={set('selfIntro')}
              placeholder='一句话介绍你自己'
              minHeight={68}
              maxLen={40}
              charCount={v.selfIntro.length}
              last
            />
          </FieldGroup>
        )}

        {isV3 && (
          <FieldGroup
            label={<span>留言墙 · 你最想问讲者什么 <WallTag /></span>}
            hint={'可以是专业问题、个人困惑，也可以是一个观点。比如：\n"医美的边界在哪里？"\n"皮肤科医生自己怎么看抗衰？"\n"医美到底在解决问题，还是在制造焦虑？"'}
          >
            <TextArea
              value={v.expectation}
              onChange={set('expectation')}
              placeholder='对本期主题的期待 / 想抛给皮里士多德的问题'
              minHeight={110}
              maxLen={250}
              charCount={v.expectation.length}
            />
          </FieldGroup>
        )}

        {/* 留 why 给老期；v3 隐藏 */}
        {!isV3 && (
          <FieldGroup label={<span>为什么想参加本期</span>}>
            <TextArea value={v.why} onChange={set('why')} placeholder="可以聊聊你与本期主题的故事……" />
          </FieldGroup>
        )}

        {/* 匿名展示提示 */}
        {isV3 && (
          <div style={{
            margin: '4px 6px 18px', padding: '12px 14px',
            background: 'linear-gradient(180deg, rgba(233,185,73,0.08) 0%, rgba(233,185,73,0.03) 100%)',
            border: '0.5px solid rgba(201,162,74,0.32)', borderRadius: 12,
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <div style={{ flexShrink: 0, marginTop: 1 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a07d22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5" /><circle cx="12" cy="16" r="0.6" fill="#a07d22" />
              </svg>
            </div>
            <div style={{ fontSize: 11.5, color: '#6b5520', lineHeight: 1.65 }}>
              <b style={{ color: '#0f2855' }}>以上两题的内容可能会在活动现场以匿名形式滚动展示。</b><br/>
              留言墙默认<u>不显示真名</u>，只显示昵称 + 身份标签；过长或过私人的内容我们会改写得更适合公开展示，并尽量保留你的本意。
            </div>
          </div>
        )}

        {/* DCT consent */}
        <ConsentRow
          checked={v.consentRules}
          onToggle={() => setV({ ...v, consentRules: !v.consentRules })}
          text={<>我已阅读并同意 <span style={{ color: '#2c5ca0', textDecoration: 'underline' }}>DCT · 吧规</span>：保密 · 尊重 · 不贴标签 · 非治疗场合 · 轮流发言 · 友好纠错。</>}
        />
        {isV3 && (
          <ConsentRow
            checked={v.consentWall}
            onToggle={() => setV({ ...v, consentWall: !v.consentWall })}
            text={<>我同意上述两题以 <b>匿名昵称</b> 形式在现场电子留言墙展示。<span style={{ color: '#8496b3' }}>（取消勾选则只用于讲者参考，不上墙）</span></>}
          />
        )}
      </div>

      {/* submit */}
      <div style={{ padding: '20px 18px 40px' }}>
        <button
          onClick={() => go('success')}
          style={{
            width: '100%', height: 50, borderRadius: 25,
            background: 'linear-gradient(180deg, #2c5ca0 0%, #1a3a78 100%)',
            color: '#fff', border: 'none', fontSize: 16, fontWeight: 600, letterSpacing: 3,
            fontFamily: '"Noto Sans SC", system-ui',
            boxShadow: '0 8px 22px rgba(26,58,120,0.3)',
          }}>
          提交报名
        </button>
        <div style={{ marginTop: 10, textAlign: 'center', fontSize: 11, color: '#8496b3' }}>
          我们会在 24 小时内通过微信回复你
        </div>
      </div>
    </div>
  );
}

function WallTag() {
  return (
    <span style={{
      marginLeft: 8, padding: '2px 7px', borderRadius: 4,
      fontSize: 9.5, fontWeight: 600, letterSpacing: 1,
      background: 'linear-gradient(135deg, #e9b949 0%, #c9a24a 100%)',
      color: '#3d2a08',
      fontFamily: '"JetBrains Mono", monospace',
      verticalAlign: 1,
    }}>WALL</span>
  );
}

function ConsentRow({ checked, onToggle, text }) {
  return (
    <div
      onClick={onToggle}
      style={{ padding: '10px 16px 6px', display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
      <div style={{
        width: 18, height: 18, borderRadius: 9, marginTop: 2, flexShrink: 0,
        background: checked ? '#2c5ca0' : '#fff',
        border: checked ? 'none' : '1px solid #c9d4e6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <div style={{ fontSize: 12, color: '#3d5f94', lineHeight: 1.65 }}>{text}</div>
    </div>
  );
}

function FieldGroup({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontSize: 11, color: '#55709a', letterSpacing: 1.5,
        fontFamily: '"JetBrains Mono", monospace',
        padding: '0 6px 6px', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', flexWrap: 'wrap',
      }}>{label}</div>
      {hint && (
        <div style={{
          padding: '0 8px 8px', fontSize: 11, color: '#8496b3', lineHeight: 1.55,
          whiteSpace: 'pre-line', fontStyle: 'italic',
        }}>{hint}</div>
      )}
      <div style={{
        background: '#fff', borderRadius: 16,
        border: '0.5px solid #e3e9f3', overflow: 'hidden',
      }}>{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, mono, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '0 16px', minHeight: 50,
      borderBottom: last ? 'none' : '0.5px solid #eef2f8',
    }}>
      <div style={{ width: 78, fontSize: 14, color: '#0f2855', fontWeight: 500, flexShrink: 0 }}>{label}</div>
      <input
        value={value} onChange={onChange} placeholder={placeholder}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontSize: 14, color: '#0f2855',
          fontFamily: mono ? '"JetBrains Mono", monospace' : '"Noto Sans SC", system-ui',
        }}
      />
    </div>
  );
}

function TextArea({ value, onChange, placeholder, minHeight = 120, maxLen, charCount, last }) {
  return (
    <div style={{ position: 'relative', borderTop: last ? '0.5px solid #eef2f8' : 'none' }}>
      <textarea
        value={value} onChange={onChange} placeholder={placeholder}
        style={{
          width: '100%', minHeight, padding: '14px 16px 22px',
          border: 'none', outline: 'none', background: '#fff',
          resize: 'none',
          fontSize: 13.5, lineHeight: 1.7, color: '#0f2855',
          fontFamily: '"Noto Sans SC", system-ui',
        }}
      />
      {maxLen && (
        <div style={{
          position: 'absolute', right: 12, bottom: 6,
          fontSize: 10, color: charCount > maxLen ? '#c25c4d' : '#a4b1c8',
          fontFamily: '"JetBrains Mono", monospace',
        }}>{charCount}/{maxLen}</div>
      )}
    </div>
  );
}

Object.assign(window, { ScreenForm });
