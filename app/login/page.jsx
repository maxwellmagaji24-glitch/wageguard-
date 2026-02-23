'use client'
import { useState } from 'react'

const TEAL = '#00D4AA'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1500)
  }

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
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .auth-input:focus { border-color: ${TEAL} !important; box-shadow: 0 0 0 3px rgba(0,212,170,0.1) !important; }
        .auth-btn:hover:not(:disabled) { background: #00F0C0 !important; transform: translateY(-1px) !important; box-shadow: 0 8px 30px rgba(0,212,170,0.35) !important; }
        .social-btn:hover { background: rgba(255,255,255,0.07) !important; border-color: rgba(255,255,255,0.15) !important; }
        .toggle-pass:hover { color: ${TEAL} !important; }
        .back-link:hover { color: #fff !important; }
        .signup-link:hover { color: #00F0C0 !important; }
      `}</style>

      {/* Background */}
      <div style={s.bg}>
        <div style={s.orb1} />
        <div style={s.orb2} />
        <div style={s.grid} />
      </div>

      {/* Left panel — branding */}
      <div style={s.leftPanel}>
        <a href="/" style={s.logo}>
          <span style={{ color: TEAL, fontSize: '1.8rem' }}>⬡</span>
          <span style={s.logoText}>Wage<strong>Guard</strong></span>
        </a>

        <div style={s.leftContent}>
          <div style={s.leftBadge}>
            <span style={{ ...s.badgeDot, animation: 'pulse 2s infinite' }} />
            8,300+ workers protected
          </div>
          <h2 style={s.leftTitle}>Your money.<br /><span style={{ color: TEAL }}>Always on time.</span></h2>
          <p style={s.leftDesc}>
            Join thousands of African remote workers who never chase a late payment anymore.
          </p>

          {/* Testimonial card */}
          <div style={s.testimonial}>
            <div style={s.testimonialQuote}>"WageGuard changed everything. I used to spend weeks chasing clients. Now I just work."</div>
            <div style={s.testimonialAuthor}>
              <div style={s.testimonialAvatar}>KA</div>
              <div>
                <div style={s.testimonialName}>Kwame Asante</div>
                <div style={s.testimonialRole}>🇬🇭 Software Engineer · Remote</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={s.leftStats}>
            {[
              { val: '100%', label: 'On-time rate' },
              { val: '$12.4M', label: 'Protected' },
              { val: '6.2%', label: 'FX saved' },
            ].map((st, i) => (
              <div key={i} style={s.leftStat}>
                <div style={s.leftStatVal}>{st.val}</div>
                <div style={s.leftStatLabel}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={s.rightPanel}>
        <div style={s.formWrap}>
          <a href="/" className="back-link" style={s.backLink}>← Back to home</a>

          <div style={{ animation: 'fadeUp 0.5s ease both' }}>
            <h1 style={s.formTitle}>Welcome back</h1>
            <p style={s.formSubtitle}>Sign in to your WageGuard account</p>

            <form onSubmit={handleSubmit} style={s.form}>
              {/* Email */}
              <div style={s.field}>
                <label style={s.label}>Work Email</label>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={s.input}
                />
              </div>

              {/* Password */}
              <div style={s.field}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={s.label}>Password</label>
                  <a href="#" style={s.forgotLink}>Forgot password?</a>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ ...s.input, paddingRight: 48 }}
                  />
                  <button
                    type="button"
                    className="toggle-pass"
                    onClick={() => setShowPass(!showPass)}
                    style={s.eyeBtn}
                  >
                    {showPass ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="auth-btn"
                disabled={loading}
                style={{ ...s.submitBtn, opacity: loading ? 0.8 : 1 }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <span style={s.spinner} /> Signing you in...
                  </span>
                ) : 'Sign in →'}
              </button>

              {/* Divider */}
              <div style={s.divider}>
                <div style={s.dividerLine} />
                <span style={s.dividerText}>or continue with</span>
                <div style={s.dividerLine} />
              </div>

              {/* Social */}
              <div style={s.socialRow}>
                <button type="button" className="social-btn" style={s.socialBtn}>
                  <span>G</span> Google
                </button>
                <button type="button" className="social-btn" style={s.socialBtn}>
                  <span>in</span> LinkedIn
                </button>
              </div>
            </form>

            <p style={s.switchText}>
              Don't have an account?{' '}
              <a href="/signup" className="signup-link" style={s.switchLink}>Create one free →</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  root: { display: 'flex', minHeight: '100vh', background: '#050A0E', fontFamily: "'DM Sans', sans-serif", color: '#fff', position: 'relative', overflow: 'hidden' },

  bg: { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 },
  orb1: { position: 'absolute', top: '-10%', left: '30%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)', borderRadius: '50%' },
  orb2: { position: 'absolute', bottom: '-20%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,100,80,0.1) 0%, transparent 70%)', borderRadius: '50%' },
  grid: { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)' },

  // Left panel
  leftPanel: { flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 56px', position: 'relative', zIndex: 1, borderRight: '1px solid rgba(255,255,255,0.05)' },
  logo: { display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#fff', marginBottom: 'auto' },
  logoText: { fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 600 },
  leftContent: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 60 },
  leftBadge: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.2)', color: TEAL, padding: '6px 14px', borderRadius: 100, fontSize: '0.78rem', fontWeight: 500, marginBottom: 28, width: 'fit-content' },
  badgeDot: { width: 6, height: 6, background: TEAL, borderRadius: '50%', display: 'inline-block' },
  leftTitle: { fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 },
  leftDesc: { fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 380, marginBottom: 36, fontWeight: 300 },

  testimonial: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px', marginBottom: 32 },
  testimonialQuote: { fontSize: '0.92rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 16 },
  testimonialAuthor: { display: 'flex', alignItems: 'center', gap: 12 },
  testimonialAvatar: { width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${TEAL}, #007A60)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700 },
  testimonialName: { fontSize: '0.85rem', fontWeight: 600, marginBottom: 2 },
  testimonialRole: { fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' },

  leftStats: { display: 'flex', gap: 32 },
  leftStat: {},
  leftStatVal: { fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: TEAL, letterSpacing: '-0.02em', marginBottom: 2 },
  leftStatLabel: { fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' },

  // Right panel
  rightPanel: { width: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', position: 'relative', zIndex: 1 },
  formWrap: { width: '100%', maxWidth: 400 },
  backLink: { fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-block', marginBottom: 40, transition: 'color 0.2s' },

  formTitle: { fontFamily: "'Syne', sans-serif", fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 },
  formSubtitle: { fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', marginBottom: 32 },

  form: { display: 'flex', flexDirection: 'column', gap: 20 },
  field: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8, letterSpacing: '0.02em' },
  input: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '13px 16px', color: '#fff', fontSize: '0.92rem', fontFamily: "'DM Sans', sans-serif", outline: 'none', transition: 'all 0.2s', width: '100%' },
  forgotLink: { fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' },
  eyeBtn: { position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', padding: 0 },

  submitBtn: { background: TEAL, color: '#000', border: 'none', borderRadius: 10, padding: '14px', fontSize: '0.95rem', fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 30px rgba(0,212,170,0.25)', marginTop: 4 },
  spinner: { width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTop: '2px solid #000', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' },

  divider: { display: 'flex', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' },
  dividerText: { fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' },

  socialRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  socialBtn: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px', color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },

  switchText: { textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: 28 },
  switchLink: { color: TEAL, textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' },
}