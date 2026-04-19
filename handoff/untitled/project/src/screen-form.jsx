// Screen 2 — Sign-up form
function ScreenForm({ go }) {
  const [v, setV] = React.useState({
    name: '包文欣', wechat: '', phone: '', org: '', field: '',
    why: '',
  });
  const set = (k) => (e) => setV({ ...v, [k]: e?.target ? e.target.value : e });

  return (
    <div style={{ background: '#f6f8fc', minHeight: '100%' }}>
      <PosterSky tone="soft" style={{ paddingBottom: 20 }}>
        <WxHeader title="报名 · 第二期" transparent />
        <div style={{ padding: '6px 22px 22px' }}>
          <div className="serif" style={{ fontSize: 24, fontWeight: 700, color: '#0f2855' }}>
            告诉我们一点你自己
          </div>
          <div style={{ fontSize: 12.5, color: '#3d5f94', marginTop: 6, lineHeight: 1.6 }}>
            DCT 希望每期都有多学科的思想碰撞，所以请稍微写多一点——这不是面试，是自我介绍。
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
          <Field  label="专业 / 方向"  value={v.field} onChange={set('field')} placeholder="如：神经内科、光电工程" last />
        </FieldGroup>

        <FieldGroup label={<span>为什么想参加本期</span>}>
          <TextArea value={v.why} onChange={set('why')} placeholder="可以聊聊：你对『目标管理 / 坚持哲学 / 长期主义』的思考，或者你与马拉松、与研究生涯的故事……" />
        </FieldGroup>

        {/* DCT consent */}
        <div style={{ padding: '18px 16px 8px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{
            width: 18, height: 18, borderRadius: 9, marginTop: 2, flexShrink: 0,
            background: '#2c5ca0', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ fontSize: 12, color: '#3d5f94', lineHeight: 1.6 }}>
            我已阅读并同意 <span style={{ color: '#2c5ca0', textDecoration: 'underline' }}>DCT · 吧规</span>：保密 · 尊重 · 不贴标签 · 非治疗场合 · 轮流发言 · 友好纠错。
          </div>
        </div>
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

function FieldGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontSize: 11, color: '#55709a', letterSpacing: 2,
        fontFamily: '"JetBrains Mono", monospace',
        padding: '0 6px 8px', textTransform: 'uppercase',
      }}>{label}</div>
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

function PickerRow({ label, value, options, onPick, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', padding: '12px 16px',
      borderBottom: last ? 'none' : '0.5px solid #eef2f8', flexDirection: 'column',
    }}>
      <div style={{ fontSize: 14, color: '#0f2855', fontWeight: 500, marginBottom: 10 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map(o => {
          const active = o === value;
          return (
            <div key={o} onClick={() => onPick(o)} style={{
              padding: '7px 13px', borderRadius: 16, fontSize: 13,
              background: active ? '#2c5ca0' : '#f1f5fb',
              color: active ? '#fff' : '#3d5f94',
              border: active ? '0.5px solid #1a3a78' : '0.5px solid #e3e9f3',
              fontWeight: active ? 600 : 400,
            }}>{o}</div>
          );
        })}
      </div>
    </div>
  );
}

function TextArea({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value} onChange={onChange} placeholder={placeholder}
      style={{
        width: '100%', minHeight: 120, padding: '14px 16px',
        border: 'none', outline: 'none', background: '#fff',
        borderRadius: 16, resize: 'none',
        fontSize: 13.5, lineHeight: 1.7, color: '#0f2855',
        fontFamily: '"Noto Sans SC", system-ui',
      }}
    />
  );
}

Object.assign(window, { ScreenForm });
