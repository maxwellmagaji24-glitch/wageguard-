'use client'
import { useState } from 'react'

const TEAL = '#00D4AA'

const countries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Uganda', 'Tanzania', 'Senegal', 'Rwanda', 'Egypt', 'Ethiopia', 'Other']

export default function Signup() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', country: '', role: '', employer: '' })
  const [showPass, setShowPass] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const next = (e) => {
    e.preventDefault()
    if (step < 3) setStep(s => s + 1)
    else {
      setLoading(true)
      setTimeout(() => { window.location.href = '/dashboard' }, 1800)
    }
  }

  const roles = [
    { id: 'worker', icon: '💻', label: 'Remote Worker', desc: 'I want to protect my wages' },
    { id: 'employer', icon: '🏢', label: 'Employer', desc: 'I want to pay workers fairly' },
  ]

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #0D1F1A inset !important;
          -webkit-text-fill-color: #fff !important;
        }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .auth-input:focus { border-color: ${TEAL} !important; box-shadow: 0 0 0 3px rgba(0,212,170,0.1) !important; outline: none; }
        .auth-select:focus { border-color: ${TEAL} !important; outline: none; }
        .auth-btn:hover:not(:disabled) { background: #00F0C0 !important; transform: translateY(-1px) !important; box-shadow: 0 8px 30px rgba(0,212,170,0.35) !important; }
        .role-card:hover { border-color: rgba(0,212,170,0.4) !important; background: rgba(0,212,170,0.05) !important; }
        .back-link:hover { color: #fff !important; }
        .signin-link:hover { color: #00F0C0 !important; }
        .toggle-pass:hover { color: ${TEAL} !important; }
      `}</style>

      {/* Background */}
      <div style={s.bg}>
        <div style={s.orb1} />
        <div style={s.orb2} />
        <div style={s.grid} />
      </div>

      {/* Top bar */}
      <div style={s.topBar}>
        <a href="/" style={s.logo}>
          <span style={{ color: TEAL, fontSize: '1.6rem' }}>⬡</span>
          <span style={s.logoText}>Wage<strong>Guard</strong></span>
        </a>
        <p style={s.topBarRight}>
          Already have an account?{' '}
          <a href="/login" className="signin-link" style={s.signinLink}>Sign in</a>
        </p>
      </div>

      {/* Center form */}
      <div style={s.center}>
        <div style={s.formBox}>

          {/* Progress steps */}
          <div style={s.steps}>
            {[1, 2, 3].map(n => (
              <div key={n} style={s.stepItem}>
                <div style={{ ...s.stepDot, background: n <= step ? TEAL : 'rgba(255,255,255,0.1)', boxShadow: n === step ? `0 0 12px rgba(0,212,170,0.5)` : 'none' }}>
                  {n < step ? '✓' : n}
                </div>
                {n < 3 && <div style={{ ...s.stepLine, background: n < step ? TEAL : 'rgba(255,255,255,0.1)' }} />}
              </div>
            ))}
          </div>

          <div style={{ animation: 'fadeUp 0.4s ease both' }} key={step}>

            {/* STEP 1 — Role selection */}
            {step === 1 && (
              <form onSubmit={next}>
                <h1 style={s.formTitle}>Join WageGuard</h1>
                <p style={s.formSubtitle}>How will you use WageGuard?</p>
                <div style={s.roleGrid}>
                  {roles.map(r => (
                    <button
                      key={r.id}
                      type="button"
                      className="role-card"
                      onClick={() => set('role', r.id)}
                      style={{ ...s.roleCard, ...(form.role === r.id ? s.roleCardActive : {}) }}
                    >
                      <span style={s.roleIcon}>{r.icon}</span>
                      <div style={s.roleLabel}>{r.label}</div>
                      <div style={s.roleDesc}>{r.desc}</div>
                      {form.role === r.id && <div style={s.roleCheck}>✓</div>}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="auth-btn"
                  disabled={!form.role}
                  style={{ ...s.submitBtn, opacity: form.role ? 1 : 0.5 }}
                >
                  Continue →
                </button>
                <p style={s.switchText}>
                  Already have an account?{' '}
                  <a href="/login" className="signin-link" style={s.switchLink}>Sign in</a>
                </p>
              </form>
            )}

            {/* STEP 2 — Personal info */}
            {step === 2 && (
              <form onSubmit={next}>
                <h1 style={s.formTitle}>Create your account</h1>
                <p style={s.formSubtitle}>Your info stays private. Always.</p>
                <div style={s.fieldGroup}>
                  <div style={s.field}>
                    <label style={s.label}>Full Name</label>
                    <input
                      className="auth-input"
                      type="text"
                      placeholder="Amara Okafor"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      required
                      style={s.input}
                    />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Work Email</label>
                    <input
                      className="auth-input"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      required
                      style={s.input}
                    />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        className="auth-input"
                        type={showPass ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={form.password}
                        onChange={e => set('password', e.target.value)}
                        required
                        minLength={8}
                        style={{ ...s.input, paddingRight: 48 }}
                      />
                      <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)} style={s.eyeBtn}>
                        {showPass ? '🙈' : '👁'}
                      </button>
                    </div>
                    {/* Password strength */}
                    {form.password && (
                      <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} style={{
                            flex: 1, height: 3, borderRadius: 2,
                            background: form.password.length >= i * 2
                              ? i <= 2 ? '#FF6B6B' : i === 3 ? '#FFB347' : TEAL
                              : 'rgba(255,255,255,0.1)',
                            transition: 'background 0.3s'
                          }} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Country</label>
                    <select
                      className="auth-select"
                      value={form.country}
                      onChange={e => set('country', e.target.value)}
                      required
                      style={s.select}
                    >
                      <option value="" disabled>Select your country</option>
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={s.btnRow}>
                  <button type="button" onClick={() => setStep(1)} style={s.backBtn}>← Back</button>
                  <button
                    type="submit"
                    className="auth-btn"
                    disabled={!form.name || !form.email || !form.password || !form.country}
                    style={{ ...s.submitBtn, flex: 1, opacity: (form.name && form.email && form.password && form.country) ? 1 : 0.5 }}
                  >
                    Continue →
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3 — Work details */}
            {step === 3 && (
              <form onSubmit={next}>
                <h1 style={s.formTitle}>Almost there! 🎉</h1>
                <p style={s.formSubtitle}>Tell us about your work setup</p>

                <div style={s.fieldGroup}>
                  <div style={s.field}>
                    <label style={s.label}>Employer / Client Name</label>
                    <input
                      className="auth-input"
                      type="text"
                      placeholder="e.g. Stripe Inc., Freelance"
                      value={form.employer}
                      onChange={e => set('employer', e.target.value)}
                      style={s.input}
                    />
                  </div>

                  {/* Contract upload */}
                  <div style={s.field}>
                    <label style={s.label}>Upload Work Contract <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>(optional)</span></label>
                    <div style={s.uploadBox}>
                      <div style={s.uploadIcon}>📄</div>
                      <div style={s.uploadText}>Drop your contract PDF here</div>
                      <div style={s.uploadSub}>or <span style={{ color: TEAL, cursor: 'pointer' }}>browse files</span></div>
                    </div>
                  </div>

                  {/* Perks */}
                  <div style={s.perksBox}>
                    {[
                      '✓ Free for remote workers, always',
                      '✓ AI reads and protects your contract',
                      '✓ Get paid on time, every time',
                    ].map((p, i) => (
                      <div key={i} style={s.perkItem}>{p}</div>
                    ))}
                  </div>
                </div>

                <div style={s.btnRow}>
                  <button type="button" onClick={() => setStep(2)} style={s.backBtn}>← Back</button>
                  <button
                    type="submit"
                    className="auth-btn"
                    disabled={loading}
                    style={{ ...s.submitBtn, flex: 1, opacity: loading ? 0.8 : 1 }}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <span style={s.spinner} /> Setting up your account...
                      </span>
                    ) : 'Protect my wages 🛡'}
                  </button>
                </div>

                <p style={s.terms}>
                  By signing up you agree to our{' '}
                  <a href="#" style={{ color: TEAL }}>Terms</a> and{' '}
                  <a href="#" style={{ color: TEAL }}>Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  root: { minHeight: '100vh', background: '#050A0E', fontFamily: "'DM Sans', sans-serif", color: '#fff', position: 'relative', overflow: 'hidden' },

  bg: { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 },
  orb1: { position: 'absolute', top: '-15%', right: '-5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(0,212,170,0.09) 0%, transparent 70%)', borderRadius: '50%' },
  orb2: { position: 'absolute', bottom: '-20%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,80,60,0.1) 0%, transparent 70%)', borderRadius: '50%' },
  grid: { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)' },

  topBar: { position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  logo: { display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#fff' },
  logoText: { fontFamily: "'Syne', sans-serif", fontSize: '1.2rem', fontWeight: 600 },
  topBarRight: { fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' },
  signinLink: { color: TEAL, textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' },

  center: { display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 'calc(100vh - 73px)', padding: '48px 24px', position: 'relative', zIndex: 1 },
  formBox: { width: '100%', maxWidth: 500 },

  steps: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  stepItem: { display: 'flex', alignItems: 'center' },
  stepDot: { width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#000', transition: 'all 0.3s', flexShrink: 0 },
  stepLine: { width: 60, height: 2, transition: 'background 0.3s' },

  formTitle: { fontFamily: "'Syne', sans-serif", fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' },
  formSubtitle: { fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', marginBottom: 32, textAlign: 'center' },

  roleGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 },
  roleCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '24px 20px', cursor: 'pointer', transition: 'all 0.2s', position: 'relative', textAlign: 'left', color: '#fff', fontFamily: "'DM Sans', sans-serif" },
  roleCardActive: { background: 'rgba(0,212,170,0.07)', borderColor: TEAL, boxShadow: '0 0 20px rgba(0,212,170,0.1)' },
  roleIcon: { fontSize: '1.8rem', display: 'block', marginBottom: 12 },
  roleLabel: { fontFamily: "'Syne', sans-serif", fontSize: '0.95rem', fontWeight: 700, marginBottom: 6 },
  roleDesc: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 },
  roleCheck: { position: 'absolute', top: 12, right: 12, width: 20, height: 20, borderRadius: '50%', background: TEAL, color: '#000', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' },

  fieldGroup: { display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 24 },
  field: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8, letterSpacing: '0.02em' },
  input: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '13px 16px', color: '#fff', fontSize: '0.92rem', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s', width: '100%' },
  select: { background: '#0D1F1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '13px 16px', color: '#fff', fontSize: '0.92rem', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s', width: '100%', cursor: 'pointer' },
  eyeBtn: { position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', padding: 0 },

  uploadBox: { border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 12, padding: '28px', textAlign: 'center', transition: 'border-color 0.2s', cursor: 'pointer' },
  uploadIcon: { fontSize: '1.8rem', marginBottom: 8 },
  uploadText: { fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4 },
  uploadSub: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' },

  perksBox: { background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.15)', borderRadius: 12, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 },
  perkItem: { fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' },

  btnRow: { display: 'flex', gap: 12, marginBottom: 16 },
  backBtn: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px 20px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', transition: 'all 0.2s' },
  submitBtn: { background: TEAL, color: '#000', border: 'none', borderRadius: 10, padding: '14px', fontSize: '0.95rem', fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 30px rgba(0,212,170,0.2)', display: 'block', width: '100%' },
  spinner: { width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTop: '2px solid #000', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' },

  switchText: { textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: 24 },
  switchLink: { color: TEAL, textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' },
  terms: { textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.5, marginTop: 12 },
}