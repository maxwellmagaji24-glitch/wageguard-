'use client'
import { useState, useEffect } from 'react'
import styles from './page.module.css'

const Icon = {
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Lock: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Unlock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
    </svg>
  ),
  Bot: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <path d="M12 11V7"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M8 15h.01M16 15h.01"/>
      <path d="M7 11V9a5 5 0 0 1 10 0v2"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  DollarSign: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  Zap: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  Scale: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21"/>
      <path d="M3 6l9-3 9 3"/>
      <path d="M3 6l4 8a4 4 0 0 0 8 0l4-8"/>
    </svg>
  ),
  BarChart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  Check: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  Hexagon: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
    </svg>
  ),
  Globe: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
}


const mockPayments = [
  { name: 'Amara O.', country: 'NG', amount: '$3,200', status: 'secured', time: '2s ago' },
  { name: 'Kwame A.', country: 'GH', amount: '$1,850', status: 'released', time: '14s ago' },
  { name: 'Fatima M.', country: 'KE', amount: '$4,100', status: 'secured', time: '31s ago' },
  { name: 'Chidi E.',  country: 'NG', amount: '$2,700', status: 'released', time: '1m ago' },
]

const stats = [
  { label: 'Total Secured',      value: '$12.4M',  sub: '+18% this month' },
  { label: 'Workers Protected',  value: '8,300+',  sub: 'across 12 countries' },
  { label: 'Avg. FX Saved',      value: '6.2%',    sub: 'per transaction' },
]


function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.navLogo}>
        <span className={styles.logoMark} style={{ color: '#00D4AA', display: 'flex' }}>
          <Icon.Hexagon size={22} />
        </span>
        <span>Wage<strong>Guard</strong></span>
      </div>
      <div className={styles.navLinks}>
        <a href="#how">How it works</a>
        <a href="#features">Features</a>
        <a href="/pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </div>
      <div className={styles.navActions}>
        <a href="/login" className={styles.navSignin}>Sign in</a>
        <a href="/signup" className={styles.navCta}>Get protected</a>
      </div>
    </nav>
  )
}
function CountryFlag({ code }) {
  const colors = { NG: ['#008751', '#fff', '#008751'], GH: ['#006B3F', '#FCD116', '#CE1126'], KE: ['#006600', '#BB0000', '#006600'] }
  const c = colors[code] || ['#555', '#888', '#555']
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 14, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
      <svg width="20" height="14" viewBox="0 0 30 20">
        <rect width="10" height="20" x="0"  fill={c[0]} />
        <rect width="10" height="20" x="10" fill={c[1]} />
        <rect width="10" height="20" x="20" fill={c[2]} />
      </svg>
    </span>
  )
}

function HeroDashboard() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % mockPayments.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className={styles.heroDashboard}>
      <div className={styles.dashGlow} />
      <div className={styles.dashCard}>
        <div className={styles.dashHeader}>
          <span className={styles.dashTitle}>Escrow Balance</span>
          <span className={styles.dashBadge} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00D4AA', display: 'inline-block' }} />
            LIVE
          </span>
        </div>
        <div className={styles.dashAmount}>
          $5,<span>237</span><span className={styles.dashCents}>.00</span>
        </div>
        <div className={styles.dashSub}>USDC · Auto-releases Jun 1, 2026</div>
        <div className={styles.scanLine} />
        <div className={styles.dashDivider} />
        <div className={styles.dashFeed}>
          {mockPayments.map((p, i) => (
            <div key={i} className={`${styles.dashRow} ${i === active ? styles.dashRowActive : ''}`}>
              <CountryFlag code={p.country} />
              <span className={styles.dashName}>{p.name}</span>
              <span className={styles.dashAmt}>{p.amount}</span>
              <span className={`${styles.dashStatus} ${p.status === 'secured' ? styles.statusSecured : styles.statusReleased}`}
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {p.status === 'secured'
                  ? <><Icon.Lock size={12} /> Secured</>
                  : <><Icon.Check size={12} /> Released</>
                }
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Float cards */}
      <div className={styles.floatCard1}>
        <span className={styles.floatIcon} style={{ color: '#00D4AA', display: 'flex' }}><Icon.Zap size={18} /></span>
        <div>
          <div className={styles.floatVal}>0% Late</div>
          <div className={styles.floatLabel}>Payments</div>
        </div>
      </div>
      <div className={styles.floatCard2}>
        <span className={styles.floatIcon} style={{ color: '#00D4AA', display: 'flex' }}><Icon.Shield /></span>
        <div>
          <div className={styles.floatVal}>$12.4M</div>
          <div className={styles.floatLabel}>Protected</div>
        </div>
      </div>
    </div>
  )
}


function HowItWorks() {
  const steps = [
    { num: '01', title: 'Employer deposits salary',  desc: 'Employer locks monthly salary in USDC into a smart contract escrow. Funds are visible but untouchable.', Icon: Icon.DollarSign },
    { num: '02', title: 'AI monitors the contract',  desc: 'Our AI reads your work contract, tracks milestones, and sets the exact release date for your funds.',    Icon: Icon.Bot },
    { num: '03', title: 'Auto-release on payday',    desc: 'Smart contract auto-releases salary on the agreed date — no chasing, no delays, no excuses.',             Icon: Icon.Unlock },
    { num: '04', title: 'Convert at the best rate',  desc: 'AI tracks FX windows and converts to your local currency at the optimal moment, saving you up to 6%.',    Icon: Icon.TrendingUp },
  ]

  return (
    <section id="how" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>HOW IT WORKS</div>
        <h2 className={styles.sectionTitle}>
          Four steps to<br />
          <span className={styles.tealText}>never waiting again</span>
        </h2>
        <div className={styles.stepsGrid}>
          {steps.map((s, i) => (
            <div key={i} className={styles.stepCard}>
              <div className={styles.stepNum}>{s.num}</div>
              <div className={styles.stepIcon} style={{ color: '#00D4AA', display: 'flex', marginBottom: 14 }}>
                <s.Icon />
              </div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
              {i < steps.length - 1 && (
                <div className={styles.stepArrow} style={{ color: '#00D4AA', display: 'flex', opacity: 0.5 }}>
                  <Icon.ArrowRight />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


function Features() {
  const features = [
    { Icon: Icon.Lock,       title: 'Stablecoin Escrow',   desc: "Salary held in USDC. No FX risk while it sits. Not crypto speculation — it's a safety vault." },
    { Icon: Icon.Bot,        title: 'AI Contract Reader',  desc: 'Upload your contract. Our AI extracts payment terms, deadlines, and flags anything suspicious.' },
    { Icon: Icon.Zap,        title: 'Smart Auto-Release',  desc: 'Blockchain enforces your payday. No human can block, delay, or redirect your money.' },
    { Icon: Icon.BarChart,   title: 'FX Timing Engine',    desc: 'AI watches NGN, GHS, KES rates 24/7. Converts at the peak window to maximize your take-home.' },
    { Icon: Icon.Bell,       title: 'Delay Alerts',        desc: 'Instant notifications if an employer misses the deposit window — before it becomes a crisis.' },
    { Icon: Icon.Scale,      title: 'Dispute Resolution',  desc: 'Built-in mediation layer. Funds held in escrow until disputes are resolved — protecting both sides.' },
  ]

  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>FEATURES</div>
        <h2 className={styles.sectionTitle}>
          Everything you need to<br />
          <span className={styles.tealText}>work without fear</span>
        </h2>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIcon} style={{ color: '#00D4AA', display: 'flex', marginBottom: 16 }}>
                <f.Icon />
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className={styles.statsSection}>
      <div className={styles.statsGlow} />
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statItem}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statSub}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


function Ticker() {
  const items = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Uganda', 'Tanzania', 'Senegal', 'Rwanda', 'Egypt', 'Ethiopia']
  const doubled = [...items, ...items]
  return (
    <div className={styles.ticker}>
      <div className={styles.tickerTrack}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.tickerItem}>
            <span className={styles.tickerDot} style={{ display: 'flex', alignItems: 'center', color: '#00D4AA' }}>
              <Icon.Globe />
            </span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function CTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaGlow} />
      <div className={styles.container}>
        <div className={styles.ctaBox}>
          <div className={styles.sectionLabel}>GET STARTED</div>
          <h2 className={styles.ctaTitle}>
            Your next paycheck<br />
            <span className={styles.tealText}>is already protected.</span>
          </h2>
          <p className={styles.ctaDesc}>Join 8,300+ African remote workers who never chase payments anymore.</p>
          <div className={styles.ctaForm}>
            <input type="email" placeholder="Enter your work email" className={styles.ctaInput} />
            <button className={styles.ctaButton} style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              Get early access <Icon.ArrowRight />
            </button>
          </div>
          <p className={styles.ctaNote}>Free for workers. Employers pay a small platform fee.</p>
        </div>
      </div>
    </section>
  )
}


function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.navLogo}>
            <span className={styles.logoMark} style={{ color: '#00D4AA', display: 'flex' }}>
              <Icon.Hexagon size={20} />
            </span>
            <span>Wage<strong>Guard</strong></span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
            <a href="#">Twitter</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 WageGuard. Labor infrastructure for the global south.</span>
        </div>
      </div>
    </footer>
  )
}


export default function Home() {
  return (
    <main className={styles.main}>
      <Nav />
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroGrid} />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              AI-Powered Wage Protection
            </div>
            <h1 className={styles.heroTitle}>
              Get paid.<br />
              <span className={styles.tealText}>On time.</span><br />
              Every time.
            </h1>
            <p className={styles.heroDesc}>
              WageGuard uses smart contracts and AI to guarantee African remote workers receive their full salary — on the agreed date, at the best exchange rate, no exceptions.
            </p>
            <div className={styles.heroButtons}>
              <a href="/dashboard" className={styles.heroPrimary} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Protect my wages <Icon.ArrowRight />
              </a>
              <a href="#how" className={styles.heroSecondary}>See how it works</a>
            </div>
            <div className={styles.heroSocial}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#00D4AA', display: 'flex' }}><Icon.Check size={13} /></span> Free for workers
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#00D4AA', display: 'flex' }}><Icon.Check size={13} /></span> No crypto knowledge needed
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#00D4AA', display: 'flex' }}><Icon.Check size={13} /></span> Works with any contract
              </span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <HeroDashboard />
          </div>
        </div>
      </section>
      <Ticker />
      <Stats />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}