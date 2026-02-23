'use client'
import { useState, useEffect, useRef } from 'react'

const TEAL = '#00D4AA'

// ─── Nav (same as landing page) ───
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{ ...s.nav, ...(scrolled ? s.navScrolled : {}) }}>
      <a href="/" style={s.logo}>
        <span style={{ color: TEAL, fontSize: '1.4rem' }}>⬡</span>
        <span style={s.logoText}>Wage<strong>Guard</strong></span>
      </a>
      <div style={s.navLinks}>
        <a href="/#how" style={s.navLink}>How it works</a>
        <a href="/pricing" style={{ ...s.navLink, color: '#fff' }}>Pricing</a>
        <a href="/#features" style={s.navLink}>Features</a>
        <a href="/#faq" style={s.navLink}>FAQ</a>
      </div>
      <div style={s.navActions}>
        <a href="/login" style={s.navSignin}>Sign in</a>
        <a href="/signup" style={s.navCta}>Get protected</a>
      </div>
    </nav>
  )
}

// ─── Toggle ───
function BillingToggle({ billing, setBilling }) {
  return (
    <div style={s.toggleWrap}>
      <span style={{ ...s.toggleLabel, color: billing === 'monthly' ? '#fff' : 'rgba(255,255,255,0.4)' }}>Monthly</span>
      <button onClick={() => setBilling(b => b === 'monthly' ? 'annual' : 'monthly')} style={s.toggleBtn}>
        <div style={{ ...s.toggleThumb, transform: billing === 'annual' ? 'translateX(22px)' : 'translateX(2px)' }} />
      </button>
      <span style={{ ...s.toggleLabel, color: billing === 'annual' ? '#fff' : 'rgba(255,255,255,0.4)' }}>
        Annual <span style={s.saveBadge}>Save 20%</span>
      </span>
    </div>
  )
}

// ─── Plan card ───
function PlanCard({ plan, billing, delay }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t) }, [])

  const price = billing === 'annual' ? plan.priceAnnual : plan.priceMonthly

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...s.planCard,
        ...(plan.featured ? s.planCardFeatured : {}),
        ...(hovered && !plan.featured ? s.planCardHover : {}),
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.2s, background 0.2s, box-shadow 0.2s',
        transitionDelay: `${delay}ms`,
      }}
    >
      {plan.featured && (
        <div style={s.featuredBadge}>⭐ Most Popular</div>
      )}

      <div style={s.planIcon}>{plan.icon}</div>
      <div style={s.planName}>{plan.name}</div>
      <div style={s.planTagline}>{plan.tagline}</div>

      <div style={s.priceRow}>
        {price === 'Free' ? (
          <span style={s.priceMain}>Free</span>
        ) : price === 'Custom' ? (
          <span style={s.priceMain}>Custom</span>
        ) : (
          <>
            <span style={s.priceCurrency}>$</span>
            <span style={s.priceMain}>{price}</span>
            <span style={s.pricePer}>/mo</span>
          </>
        )}
      </div>

      {billing === 'annual' && plan.priceAnnual !== 'Free' && plan.priceAnnual !== 'Custom' && (
        <div style={s.annualNote}>Billed ${plan.priceAnnual * 12}/yr · saves ${(plan.priceMonthly - plan.priceAnnual) * 12}/yr</div>
      )}

      <a
        href={plan.cta.href}
        style={{ ...s.planCta, ...(plan.featured ? s.planCtaFeatured : {}) }}
      >
        {plan.cta.label}
      </a>

      <div style={s.divider} />

      <ul style={s.featureList}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ ...s.featureItem, ...(f.muted ? s.featureItemMuted : {}) }}>
            <span style={{ ...s.featureCheck, color: f.included ? TEAL : 'rgba(255,255,255,0.2)' }}>
              {f.included ? '✓' : '✕'}
            </span>
            <span>{f.text}</span>
            {f.badge && <span style={s.featureBadge}>{f.badge}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Comparison Table ───
function CompareTable() {
  const [open, setOpen] = useState(false)

  const rows = [
    { label: 'Stablecoin Escrow', free: true, pro: true, enterprise: true },
    { label: 'Smart auto-release', free: true, pro: true, enterprise: true },
    { label: 'AI contract monitoring', free: '1 contract', pro: 'Unlimited', enterprise: 'Unlimited' },
    { label: 'Payment delay alerts', free: true, pro: true, enterprise: true },
    { label: 'FX rate tracking', free: 'Basic', pro: 'Advanced', enterprise: 'Advanced' },
    { label: 'AI FX conversion timing', free: false, pro: true, enterprise: true },
    { label: 'Priority FX windows', free: false, pro: true, enterprise: true },
    { label: 'Dispute resolution', free: 'Community', pro: 'Priority', enterprise: 'Dedicated' },
    { label: 'Analytics dashboard', free: false, pro: true, enterprise: true },
    { label: 'API access', free: false, pro: false, enterprise: true },
    { label: 'Custom integrations', free: false, pro: false, enterprise: true },
    { label: 'SLA guarantee', free: false, pro: false, enterprise: true },
    { label: 'Dedicated account manager', free: false, pro: false, enterprise: true },
  ]

  const renderCell = (val) => {
    if (val === true) return <span style={{ color: TEAL, fontSize: '1rem' }}>✓</span>
    if (val === false) return <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>—</span>
    return <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{val}</span>
  }

  return (
    <div style={s.compareWrap}>
      <button onClick={() => setOpen(o => !o)} style={s.compareToggle}>
        {open ? '▲ Hide' : '▼ Show'} full comparison table
      </button>

      {open && (
        <div style={s.compareTable}>
          <div style={s.compareHeader}>
            <div style={s.compareFeatureCol}>Feature</div>
            {['Worker Free', 'Worker Pro', 'Enterprise'].map(h => (
              <div key={h} style={s.compareCol}>{h}</div>
            ))}
          </div>
          {rows.map((row, i) => (
            <div key={i} style={{ ...s.compareRow, background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
              <div style={s.compareFeatureCol}>{row.label}</div>
              <div style={s.compareCol}>{renderCell(row.free)}</div>
              <div style={s.compareCol}>{renderCell(row.pro)}</div>
              <div style={s.compareCol}>{renderCell(row.enterprise)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── FAQ ───
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  const items = [
    { q: 'Is WageGuard really free for workers?', a: 'Yes, completely. Workers never pay anything. Our business model charges employers a small 1.5% platform fee per transaction — the same model used by Stripe, PayPal, and other payment infrastructure. Workers keep 100% of their salary.' },
    { q: 'What is a stablecoin escrow?', a: 'Your employer deposits your salary in USDC — a digital dollar pegged 1:1 to the US dollar. It doesn\'t fluctuate like Bitcoin. The funds sit in a smart contract (a self-executing program on the blockchain) that automatically releases your money on payday. No human can block it.' },
    { q: 'What if my employer refuses to deposit into escrow?', a: 'WageGuard works best when integrated from the start of a contract. We provide a standard addendum you can share with employers. Most employers see it as a trust-building tool — it protects them from disputes too. If an employer refuses, that\'s a red flag worth knowing before you start.' },
    { q: 'Which countries are supported?', a: 'Currently we support Nigeria, Ghana, Kenya, and South Africa with local currency conversion. We\'re expanding to Uganda, Tanzania, Senegal, Rwanda, and Egypt in Q3 2026. Enterprise clients can access any country with USDC support.' },
    { q: 'How does the AI read my contract?', a: 'You upload your work contract (PDF or Word doc). Our AI extracts the payment terms — amount, frequency, due dates, and any conditions. It then programs these into the smart contract escrow. If the contract is unclear or has risky clauses, the AI flags them for your review.' },
    { q: 'What happens during a dispute?', a: 'Funds stay locked in escrow until resolved. Free plan workers get community support. Pro workers get priority human mediation within 48hrs. Enterprise clients get a dedicated account manager. WageGuard earns nothing until disputes resolve — so we\'re incentivized to resolve them fast.' },
  ]

  return (
    <section style={s.faqSection}>
      <div style={s.container}>
        <div style={s.sectionLabel}>FAQ</div>
        <h2 style={s.sectionTitle}>Questions we get asked a lot</h2>
        <div style={s.faqList}>
          {items.map((item, i) => (
            <div key={i} style={{ ...s.faqItem, borderColor: openIdx === i ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.07)' }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={s.faqQ}>
                <span>{item.q}</span>
                <span style={{ ...s.faqChevron, transform: openIdx === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>↓</span>
              </button>
              {openIdx === i && (
                <div style={s.faqA}>{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Employer pricing ───
function EmployerSection() {
  return (
    <section style={s.employerSection}>
      <div style={s.container}>
        <div style={s.employerBox}>
          <div style={s.employerLeft}>
            <div style={s.sectionLabel}>FOR EMPLOYERS</div>
            <h2 style={{ ...s.sectionTitle, marginBottom: 16 }}>Simple, transparent pricing</h2>
            <p style={s.employerDesc}>
              No monthly fees. No setup costs. You only pay when you deposit a salary — and you get a happier, more productive remote team in return.
            </p>
            <div style={s.employerFeatures}>
              {[
                '1.5% per salary deposit — that\'s it',
                'No hidden fees or conversion charges',
                'Works with your existing payroll flow',
                'Reduces disputes and churn significantly',
              ].map((f, i) => (
                <div key={i} style={s.employerFeature}>
                  <span style={{ color: TEAL }}>✓</span> {f}
                </div>
              ))}
            </div>
            <a href="/signup" style={s.employerCta}>Start as employer →</a>
          </div>
          <div style={s.employerRight}>
            <div style={s.calcCard}>
              <div style={s.sectionLabel}>COST CALCULATOR</div>
              <div style={s.calcRow}>
                <span style={s.calcLabel}>Monthly salary</span>
                <span style={s.calcVal}>$3,000</span>
              </div>
              <div style={s.calcRow}>
                <span style={s.calcLabel}>WageGuard fee (1.5%)</span>
                <span style={{ ...s.calcVal, color: 'rgba(255,255,255,0.5)' }}>$45</span>
              </div>
              <div style={s.calcDivider} />
              <div style={s.calcRow}>
                <span style={s.calcLabel}>Worker receives</span>
                <span style={{ ...s.calcVal, color: TEAL }}>$3,000</span>
              </div>
              <div style={s.calcRow}>
                <span style={s.calcLabel}>FX saved for worker</span>
                <span style={{ ...s.calcVal, color: TEAL }}>~$186</span>
              </div>
              <div style={s.calcNote}>
                Your $45 investment saves your worker $186/mo and eliminates payment disputes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Main page ───
export default function Pricing() {
  const [billing, setBilling] = useState('monthly')

  const plans = [
    {
      name: 'Worker Free',
      icon: '🌱',
      tagline: 'Everything you need to get started',
      priceMonthly: 'Free',
      priceAnnual: 'Free',
      featured: false,
      cta: { label: 'Get started free →', href: '/signup' },
      features: [
        { text: 'Stablecoin escrow protection', included: true },
        { text: 'Smart auto-release on payday', included: true },
        { text: 'Payment delay alerts', included: true },
        { text: 'Basic FX rate tracking', included: true },
        { text: '1 active contract monitored', included: true },
        { text: 'Community dispute support', included: true },
        { text: 'AI FX timing optimization', included: false },
        { text: 'Priority FX windows', included: false },
        { text: 'Advanced analytics', included: false },
      ],
    },
    {
      name: 'Worker Pro',
      icon: '⚡',
      tagline: 'Maximize every dollar you earn',
      priceMonthly: 9,
      priceAnnual: 7,
      featured: true,
      cta: { label: 'Start Pro free for 14 days →', href: '/signup?plan=pro' },
      features: [
        { text: 'Everything in Free', included: true },
        { text: 'Unlimited contracts monitored', included: true, badge: 'New' },
        { text: 'AI FX timing optimization', included: true },
        { text: 'Priority conversion windows', included: true },
        { text: 'Advanced earnings analytics', included: true },
        { text: 'Priority dispute resolution (48hr)', included: true },
        { text: 'Contract risk AI analysis', included: true },
        { text: 'Multi-currency support', included: true },
        { text: 'Dedicated account manager', included: false },
      ],
    },
    {
      name: 'Enterprise',
      icon: '🏢',
      tagline: 'For platforms & large teams',
      priceMonthly: 'Custom',
      priceAnnual: 'Custom',
      featured: false,
      cta: { label: 'Talk to sales →', href: 'mailto:sales@wageguard.io' },
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'White-label API access', included: true },
        { text: 'Custom integrations (Deel, Toptal)', included: true },
        { text: 'Bulk payroll processing', included: true },
        { text: 'SLA with uptime guarantee', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Custom FX agreements', included: true },
        { text: 'On-premise option', included: true },
        { text: 'Priority enterprise support', included: true },
      ],
    },
  ]

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050A0E; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,170,0.25); border-radius: 2px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        a { text-decoration: none; }
        .nav-link:hover { color: #fff !important; }
        .plan-cta-default:hover { background: rgba(0,212,170,0.1) !important; border-color: ${TEAL} !important; color: ${TEAL} !important; }
        .plan-cta-featured:hover { background: #00F0C0 !important; transform: translateY(-1px) !important; box-shadow: 0 8px 30px rgba(0,212,170,0.4) !important; }
        .faq-btn:hover { color: #fff !important; }
        .compare-toggle:hover { color: ${TEAL} !important; border-color: rgba(0,212,170,0.3) !important; }
        .employer-cta:hover { background: #00F0C0 !important; transform: translateY(-1px) !important; }
        .nav-cta:hover { background: #00F0C0 !important; transform: translateY(-1px) !important; }
      `}</style>

      {/* BG */}
      <div style={s.bgFixed}>
        <div style={s.orb1} />
        <div style={s.orb2} />
        <div style={s.gridBg} />
      </div>

      <Nav />

      {/* Hero */}
      <section style={s.hero}>
        <div style={s.container}>
          <div style={{ animation: 'fadeUp 0.6s ease both' }}>
            <div style={s.heroBadge}>
              <span style={{ width: 6, height: 6, background: TEAL, borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Simple, honest pricing
            </div>
            <h1 style={s.heroTitle}>
              Free for workers.<br />
              <span style={{ color: TEAL }}>Always.</span>
            </h1>
            <p style={s.heroDesc}>
              Workers never pay. Employers pay a small 1.5% fee per deposit — less than a wire transfer, with 10x the protection.
            </p>
          </div>

          <BillingToggle billing={billing} setBilling={setBilling} />

          {/* Plans */}
          <div style={s.plansGrid}>
            {plans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} billing={billing} delay={i * 100} />
            ))}
          </div>

          <CompareTable />
        </div>
      </section>

      {/* Social proof ticker */}
      <div style={s.ticker}>
        <div style={s.tickerTrack}>
          {[...Array(2)].flatMap(() => [
            '🇳🇬 Amara — $3,200 secured', '🇬🇭 Kwame — $1,850 released', '🇰🇪 Fatima — $4,100 secured',
            '🇿🇦 Sipho — $2,400 released', '🇺🇬 David — $1,600 secured', '🇷🇼 Marie — $2,800 released',
          ]).map((item, i) => (
            <span key={i} style={s.tickerItem}>
              <span style={{ color: TEAL, fontSize: '0.5rem' }}>●</span> {item}
            </span>
          ))}
        </div>
      </div>

      <EmployerSection />

      {/* Trust bar */}
      <section style={s.trustSection}>
        <div style={s.container}>
          <div style={s.trustGrid}>
            {[
              { icon: '🔒', title: 'Non-custodial', desc: 'We never hold your funds. Smart contracts do.' },
              { icon: '🛡', title: 'Audited contracts', desc: 'Smart contracts independently security-audited.' },
              { icon: '⚡', title: '99.9% uptime', desc: 'Blockchain infrastructure. Always available.' },
              { icon: '🌍', title: 'GDPR compliant', desc: 'Your data is yours. Encrypted at rest.' },
            ].map((t, i) => (
              <div key={i} style={s.trustItem}>
                <span style={s.trustIcon}>{t.icon}</span>
                <div style={s.trustTitle}>{t.title}</div>
                <div style={s.trustDesc}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      {/* Final CTA */}
      <section style={s.finalCta}>
        <div style={s.ctaGlow} />
        <div style={s.container}>
          <div style={s.ctaBox}>
            <h2 style={s.ctaTitle}>Start protecting your wages today.<br /><span style={{ color: TEAL }}>It's free.</span></h2>
            <p style={s.ctaDesc}>Join 8,300+ workers who never chase payments anymore.</p>
            <div style={s.ctaBtns}>
              <a href="/signup" style={s.ctaPrimary}>Get protected for free →</a>
              <a href="/login" style={s.ctaSecondary}>Sign in</a>
            </div>
            <p style={s.ctaNote}>No credit card · No crypto wallet · Works with any contract</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.container}>
          <div style={s.footerTop}>
            <a href="/" style={s.logo}>
              <span style={{ color: TEAL, fontSize: '1.3rem' }}>⬡</span>
              <span style={s.logoText}>Wage<strong>Guard</strong></span>
            </a>
            <div style={s.footerLinks}>
              {['Privacy', 'Terms', 'Contact', 'Twitter'].map(l => (
                <a key={l} href="#" style={s.footerLink}>{l}</a>
              ))}
            </div>
          </div>
          <div style={s.footerBottom}>© 2026 WageGuard. Labor infrastructure for the global south.</div>
        </div>
      </footer>
    </div>
  )
}

// ─── Styles ───
const s = {
  root: { minHeight: '100vh', background: '#050A0E', fontFamily: "'DM Sans', sans-serif", color: '#fff', position: 'relative' },
  container: { maxWidth: 1100, margin: '0 auto', padding: '0 24px' },

  bgFixed: { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 },
  orb1: { position: 'absolute', top: '-10%', right: '-5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(0,212,170,0.09) 0%, transparent 70%)', borderRadius: '50%' },
  orb2: { position: 'absolute', bottom: '-15%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,80,60,0.08) 0%, transparent 70%)', borderRadius: '50%' },
  gridBg: { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse at 60% 40%, black 20%, transparent 80%)' },

  // Nav
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', transition: 'all 0.3s' },
  navScrolled: { background: 'rgba(5,10,14,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 48px' },
  logo: { display: 'flex', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none' },
  logoText: { fontFamily: "'Syne', sans-serif", fontSize: '1.2rem', fontWeight: 600 },
  navLinks: { display: 'flex', gap: 32 },
  navLink: { color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' },
  navActions: { display: 'flex', alignItems: 'center', gap: 16 },
  navSignin: { color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', textDecoration: 'none' },
  navCta: { background: TEAL, color: '#000', padding: '9px 20px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 700, fontFamily: "'Syne', sans-serif", textDecoration: 'none', transition: 'all 0.2s' },

  // Hero
  hero: { paddingTop: 140, paddingBottom: 80, position: 'relative', zIndex: 1 },
  heroBadge: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.2)', color: TEAL, padding: '6px 14px', borderRadius: 100, fontSize: '0.78rem', fontWeight: 500, marginBottom: 24 },
  heroTitle: { fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20, textAlign: 'center' },
  heroDesc: { fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 540, margin: '0 auto 48px', textAlign: 'center', fontWeight: 300 },

  // Toggle
  toggleWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 56 },
  toggleLabel: { fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 8 },
  toggleBtn: { width: 48, height: 26, borderRadius: 13, background: TEAL, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' },
  toggleThumb: { width: 20, height: 20, borderRadius: '50%', background: '#000', position: 'absolute', top: 3, transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)' },
  saveBadge: { background: 'rgba(0,212,170,0.15)', color: TEAL, padding: '2px 8px', borderRadius: 100, fontSize: '0.7rem', fontWeight: 600 },

  // Plans
  plansGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 },
  planCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '32px 28px', position: 'relative', display: 'flex', flexDirection: 'column' },
  planCardFeatured: { background: 'rgba(0,212,170,0.05)', border: `1px solid ${TEAL}`, boxShadow: '0 0 60px rgba(0,212,170,0.1)' },
  planCardHover: { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' },
  featuredBadge: { position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: TEAL, color: '#000', padding: '4px 16px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, fontFamily: "'Syne', sans-serif", whiteSpace: 'nowrap' },
  planIcon: { fontSize: '1.8rem', marginBottom: 12 },
  planName: { fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 },
  planTagline: { fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', marginBottom: 24, lineHeight: 1.4 },
  priceRow: { display: 'flex', alignItems: 'flex-end', gap: 2, marginBottom: 6 },
  priceCurrency: { fontFamily: "'Syne', sans-serif", fontSize: '1.2rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6 },
  priceMain: { fontFamily: "'Syne', sans-serif", fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 },
  pricePer: { fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: 6 },
  annualNote: { fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: 16 },
  planCta: { display: 'block', textAlign: 'center', padding: '13px', borderRadius: 10, fontSize: '0.88rem', fontWeight: 700, fontFamily: "'Syne', sans-serif", border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', marginTop: 20, marginBottom: 24, transition: 'all 0.2s' },
  planCtaFeatured: { background: TEAL, color: '#000', border: 'none', boxShadow: '0 0 30px rgba(0,212,170,0.25)' },
  divider: { height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 },
  featureList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 },
  featureItem: { display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.84rem', color: 'rgba(255,255,255,0.75)' },
  featureItemMuted: { color: 'rgba(255,255,255,0.35)' },
  featureCheck: { fontSize: '0.85rem', fontWeight: 700, flexShrink: 0, width: 16 },
  featureBadge: { background: 'rgba(0,212,170,0.15)', color: TEAL, padding: '1px 6px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 600, marginLeft: 4 },

  // Compare
  compareWrap: { marginBottom: 60, textAlign: 'center' },
  compareToggle: { background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)', padding: '10px 20px', borderRadius: 8, fontSize: '0.83rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s', marginBottom: 20 },
  compareTable: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', textAlign: 'left' },
  compareHeader: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,212,170,0.04)' },
  compareRow: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' },
  compareFeatureCol: { fontSize: '0.83rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center' },
  compareCol: { fontSize: '0.83rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  // Ticker
  ticker: { overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 0', background: 'rgba(0,212,170,0.02)', position: 'relative', zIndex: 1 },
  tickerTrack: { display: 'flex', gap: 48, whiteSpace: 'nowrap', animation: 'ticker 25s linear infinite', width: 'max-content' },
  tickerItem: { fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 10, letterSpacing: '0.02em' },

  // Employer section
  employerSection: { padding: '100px 0', position: 'relative', zIndex: 1 },
  employerBox: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' },
  employerLeft: {},
  employerDesc: { fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 28, fontWeight: 300 },
  employerFeatures: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 },
  employerFeature: { fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', display: 'flex', gap: 8 },
  employerCta: { display: 'inline-block', background: TEAL, color: '#000', padding: '13px 24px', borderRadius: 10, fontWeight: 700, fontFamily: "'Syne', sans-serif", fontSize: '0.9rem', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 0 30px rgba(0,212,170,0.2)' },
  employerRight: {},
  calcCard: { background: 'rgba(0,212,170,0.04)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 20, padding: '28px' },
  calcRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' },
  calcLabel: { fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)' },
  calcVal: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem' },
  calcDivider: { height: 1, background: 'rgba(255,255,255,0.08)', margin: '8px 0' },
  calcNote: { marginTop: 16, fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 14 },

  // Trust
  trustSection: { padding: '60px 0', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  trustGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 },
  trustItem: { textAlign: 'center' },
  trustIcon: { fontSize: '1.5rem', display: 'block', marginBottom: 10 },
  trustTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', marginBottom: 6 },
  trustDesc: { fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 },

  // FAQ
  faqSection: { padding: '100px 0', position: 'relative', zIndex: 1 },
  faqList: { display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 },
  faqItem: { border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' },
  faqQ: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', background: 'transparent', border: 'none', color: '#fff', fontSize: '0.92rem', fontWeight: 500, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', textAlign: 'left', gap: 16, transition: 'color 0.2s' },
  faqChevron: { color: TEAL, fontSize: '1rem', flexShrink: 0, transition: 'transform 0.25s' },
  faqA: { padding: '0 22px 20px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 },

  // Final CTA
  finalCta: { padding: '100px 0', position: 'relative', zIndex: 1, overflow: 'hidden' },
  ctaGlow: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 300, background: 'radial-gradient(ellipse, rgba(0,212,170,0.12) 0%, transparent 65%)', pointerEvents: 'none' },
  ctaBox: { textAlign: 'center', position: 'relative', zIndex: 1 },
  ctaTitle: { fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 },
  ctaDesc: { fontSize: '1rem', color: 'rgba(255,255,255,0.5)', marginBottom: 32 },
  ctaBtns: { display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 20 },
  ctaPrimary: { background: TEAL, color: '#000', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontFamily: "'Syne', sans-serif", fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 0 30px rgba(0,212,170,0.25)' },
  ctaSecondary: { color: 'rgba(255,255,255,0.5)', padding: '14px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', textDecoration: 'none', transition: 'all 0.2s' },
  ctaNote: { fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' },

  // Footer
  footer: { borderTop: '1px solid rgba(255,255,255,0.06)', padding: '36px 0', position: 'relative', zIndex: 1 },
  footerTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 20 },
  footerLinks: { display: 'flex', gap: 28 },
  footerLink: { color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' },
  footerBottom: { fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' },

  // Shared
  sectionLabel: { fontSize: '0.68rem', fontWeight: 700, color: TEAL, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 },
  sectionTitle: { fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 40 },
}