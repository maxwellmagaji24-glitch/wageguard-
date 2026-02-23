'use client'
import { useState, useEffect } from 'react'

const TEAL = '#00D4AA'

const payments = [
  { id: 1, employer: 'Stripe Inc.', amount: 3200, currency: 'USDC', date: 'Jun 1, 2026', status: 'locked', daysLeft: 7 },
  { id: 2, employer: 'Stripe Inc.', amount: 3200, currency: 'USDC', date: 'May 1, 2026', status: 'released', daysLeft: 0 },
  { id: 3, employer: 'Stripe Inc.', amount: 3200, currency: 'USDC', date: 'Apr 1, 2026', status: 'released', daysLeft: 0 },
  { id: 4, employer: 'Stripe Inc.', amount: 3000, currency: 'USDC', date: 'Mar 1, 2026', status: 'released', daysLeft: 0 },
]

const fxHistory = [
  { month: 'Oct', rate: 1520 }, { month: 'Nov', rate: 1580 }, { month: 'Dec', rate: 1490 },
  { month: 'Jan', rate: 1610 }, { month: 'Feb', rate: 1643 }, { month: 'Mar', rate: 1590 },
]

const alerts = [
  { type: 'success', msg: 'April salary of $3,200 released on time', time: '2 days ago' },
  { type: 'info', msg: 'FX optimal window detected — NGN at 3-month high', time: '5 days ago' },
  { type: 'success', msg: 'Contract terms verified by AI', time: '12 days ago' },
]

function Sidebar({ active, setActive }) {
  const items = [
    { id: 'dashboard', icon: '⬡', label: 'Dashboard' },
    { id: 'escrow', icon: '🔒', label: 'Escrow' },
    { id: 'payments', icon: '💳', label: 'Payments' },
    { id: 'fx', icon: '📈', label: 'FX Engine' },
    { id: 'contract', icon: '📄', label: 'Contract' },
    { id: 'alerts', icon: '🔔', label: 'Alerts' },
  ]
  return (
    <aside style={s.sidebar}>
      <div style={s.sidebarLogo}>
        <span style={{ color: TEAL, fontSize: '1.4rem' }}>⬡</span>
        <span style={s.logoText}>Wage<strong>Guard</strong></span>
      </div>
      <nav style={s.sidebarNav}>
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{ ...s.navItem, ...(active === item.id ? s.navItemActive : {}) }}
          >
            <span style={s.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
            {active === item.id && <div style={s.navIndicator} />}
          </button>
        ))}
      </nav>
      <div style={s.sidebarBottom}>
        <div style={s.userCard}>
          <div style={s.userAvatar}>AO</div>
          <div>
            <div style={s.userName}>Amara Okafor</div>
            <div style={s.userRole}>🇳🇬 Lagos, Nigeria</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function StatCard({ icon, label, value, sub, delay }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay || 0); return () => clearTimeout(t) }, [])
  return (
    <div style={{ ...s.statCard, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease' }}>
      <div style={s.statIcon}>{icon}</div>
      <div style={s.statLabel}>{label}</div>
      <div style={s.statValue}>{value}</div>
      {sub && <div style={s.statSub}>{sub}</div>}
    </div>
  )
}

function EscrowBar() {
  const [width, setWidth] = useState(0)
  useEffect(() => { setTimeout(() => setWidth(75), 300) }, [])
  return (
    <div style={s.escrowSection}>
      <div style={s.escrowHeader}>
        <div>
          <div style={s.sectionLabel}>ACTIVE ESCROW</div>
          <div style={s.escrowAmount}>$3,200.00 <span style={{ color: TEAL, fontSize: '0.9rem' }}>USDC</span></div>
        </div>
        <div style={s.escrowBadge}>🔒 Locked</div>
      </div>
      <div style={s.escrowMeta}>
        <span style={s.escrowMetaItem}>Employer: <strong>Stripe Inc.</strong></span>
        <span style={s.escrowMetaItem}>Releases: <strong style={{ color: TEAL }}>Jun 1, 2026</strong></span>
        <span style={s.escrowMetaItem}>Days left: <strong>7</strong></span>
      </div>
      <div style={s.progressTrack}>
        <div style={{ ...s.progressFill, width: `${width}%` }} />
      </div>
      <div style={s.progressLabels}>
        <span>May 1 — Deposit confirmed</span>
        <span style={{ color: TEAL }}>Jun 1 — Auto-release</span>
      </div>
    </div>
  )
}

function MiniChart() {
  const max = Math.max(...fxHistory.map(d => d.rate))
  const min = Math.min(...fxHistory.map(d => d.rate))
  const h = 80, w = 300
  const pts = fxHistory.map((d, i) => {
    const x = (i / (fxHistory.length - 1)) * w
    const y = h - ((d.rate - min) / (max - min)) * h
    return `${x},${y}`
  }).join(' ')

  return (
    <div style={s.fxCard}>
      <div style={s.sectionLabel}>FX RATE — USD/NGN</div>
      <div style={s.fxRate}>₦1,643 <span style={{ color: TEAL, fontSize: '0.85rem' }}>+2.1% this week</span></div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 80, marginTop: 12 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={TEAL} stopOpacity="0.4" />
            <stop offset="100%" stopColor={TEAL} stopOpacity="1" />
          </linearGradient>
        </defs>
        <polyline points={pts} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {fxHistory.map((d, i) => {
          const x = (i / (fxHistory.length - 1)) * w
          const y = h - ((d.rate - min) / (max - min)) * h
          return <circle key={i} cx={x} cy={y} r="3.5" fill={TEAL} />
        })}
      </svg>
      <div style={s.fxMonths}>
        {fxHistory.map((d, i) => <span key={i} style={s.fxMonth}>{d.month}</span>)}
      </div>
      <div style={s.fxBadge}>⚡ AI converting at optimal window</div>
    </div>
  )
}

function PaymentHistory() {
  return (
    <div style={s.card}>
      <div style={s.sectionLabel}>PAYMENT HISTORY</div>
      <div style={s.payTable}>
        {payments.map(p => (
          <div key={p.id} style={s.payRow}>
            <div style={s.payIcon}>{p.status === 'locked' ? '🔒' : '✓'}</div>
            <div style={s.payInfo}>
              <div style={s.payEmployer}>{p.employer}</div>
              <div style={s.payDate}>{p.date}</div>
            </div>
            <div style={s.payRight}>
              <div style={s.payAmount}>${p.amount.toLocaleString()}</div>
              <div style={{ ...s.payStatus, color: p.status === 'locked' ? TEAL : '#7CDFB8' }}>
                {p.status === 'locked' ? `In escrow · ${p.daysLeft}d` : 'Released'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Alerts() {
  return (
    <div style={s.card}>
      <div style={s.sectionLabel}>RECENT ALERTS</div>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {alerts.map((a, i) => (
          <div key={i} style={s.alertRow}>
            <div style={{ ...s.alertDot, background: a.type === 'success' ? TEAL : '#4A9EFF' }} />
            <div style={{ flex: 1 }}>
              <div style={s.alertMsg}>{a.msg}</div>
              <div style={s.alertTime}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [active, setActive] = useState('dashboard')

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050A0E; }
        button { cursor: pointer; font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,170,0.25); border-radius: 2px; }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
      `}</style>

      <Sidebar active={active} setActive={setActive} />

      <main style={s.main}>
        <div style={s.topBar}>
          <div>
            <div style={s.pageTitle}>Good morning, Amara 👋</div>
            <div style={s.pageSubtitle}>Your wages are protected. Here's your overview.</div>
          </div>
          <div style={s.topBarRight}>
            <div style={s.liveBadge}><span style={{ animation: 'pulse 2s infinite', display: 'inline-block' }}>●</span> LIVE</div>
            <div style={s.notifBtn}>🔔</div>
          </div>
        </div>

        <div style={s.statsRow}>
          <StatCard icon="🔒" label="In Escrow" value="$3,200" sub="Releases Jun 1" delay={0} />
          <StatCard icon="✓" label="Total Released" value="$9,400" sub="Last 3 months" delay={100} />
          <StatCard icon="📈" label="FX Saved" value="$187" sub="6.2% avg." delay={200} />
          <StatCard icon="⚡" label="On-Time Rate" value="100%" sub="All payments" delay={300} />
        </div>

        <div style={s.grid}>
          <div style={s.colLeft}>
            <EscrowBar />
            <PaymentHistory />
          </div>
          <div style={s.colRight}>
            <MiniChart />
            <Alerts />
            <div style={s.aiCard}>
              <div style={s.sectionLabel}>AI CONTRACT MONITOR</div>
              <div style={s.aiStatus}>
                <div style={s.aiDot} />
                <span>Monitoring active · Contract verified</span>
              </div>
              <div style={s.aiDetails}>
                <div style={s.aiRow}><span>Contract type</span><strong>Monthly retainer</strong></div>
                <div style={s.aiRow}><span>Payment clause</span><strong style={{ color: TEAL }}>✓ Verified</strong></div>
                <div style={s.aiRow}><span>Next check</span><strong>May 28, 2026</strong></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const s = {
  root: { display: 'flex', minHeight: '100vh', background: '#050A0E', fontFamily: "'DM Sans', sans-serif", color: '#fff' },
  sidebar: { width: 220, background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '28px 0', position: 'sticky', top: 0, height: '100vh' },
  sidebarLogo: { display: 'flex', alignItems: 'center', gap: 8, padding: '0 24px', marginBottom: 36 },
  logoText: { fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 600 },
  sidebarNav: { display: 'flex', flexDirection: 'column', gap: 2, flex: 1 },
  navItem: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 24px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', fontWeight: 500, position: 'relative', transition: 'all 0.2s', textAlign: 'left', width: '100%' },
  navItemActive: { color: '#fff', background: 'rgba(0,212,170,0.07)' },
  navIcon: { fontSize: '1rem', width: 20, textAlign: 'center' },
  navIndicator: { position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, background: TEAL, borderRadius: 2 },
  sidebarBottom: { padding: '0 16px', marginTop: 'auto' },
  userCard: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)' },
  userAvatar: { width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${TEAL}, #007A60)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 },
  userName: { fontSize: '0.82rem', fontWeight: 600 },
  userRole: { fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' },

  main: { flex: 1, padding: '32px 36px', overflowY: 'auto' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 },
  pageTitle: { fontFamily: "'Syne', sans-serif", fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 },
  pageSubtitle: { fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)' },
  topBarRight: { display: 'flex', alignItems: 'center', gap: 12 },
  liveBadge: { background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.25)', color: TEAL, padding: '6px 12px', borderRadius: 100, fontSize: '0.72rem', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6 },
  notifBtn: { width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' },

  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 },
  statCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px' },
  statIcon: { fontSize: '1.2rem', marginBottom: 12 },
  statLabel: { fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 },
  statValue: { fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 },
  statSub: { fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' },

  grid: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 },
  colLeft: { display: 'flex', flexDirection: 'column', gap: 20 },
  colRight: { display: 'flex', flexDirection: 'column', gap: 20 },

  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px' },
  sectionLabel: { fontSize: '0.68rem', fontWeight: 700, color: TEAL, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 },

  escrowSection: { background: 'rgba(0,212,170,0.04)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 16, padding: '24px' },
  escrowHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  escrowAmount: { fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 6 },
  escrowBadge: { background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.3)', color: TEAL, padding: '6px 14px', borderRadius: 100, fontSize: '0.78rem', fontWeight: 600 },
  escrowMeta: { display: 'flex', gap: 24, marginBottom: 20, flexWrap: 'wrap' },
  escrowMetaItem: { fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' },
  progressTrack: { height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: '100%', background: `linear-gradient(90deg, ${TEAL}88, ${TEAL})`, borderRadius: 3, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)', boxShadow: `0 0 12px ${TEAL}66` },
  progressLabels: { display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' },

  payTable: { display: 'flex', flexDirection: 'column', gap: 4, marginTop: 16 },
  payRow: { display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', borderRadius: 10 },
  payIcon: { fontSize: '1rem', width: 28, textAlign: 'center' },
  payInfo: { flex: 1 },
  payEmployer: { fontSize: '0.88rem', fontWeight: 500, marginBottom: 2 },
  payDate: { fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' },
  payRight: { textAlign: 'right' },
  payAmount: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 },
  payStatus: { fontSize: '0.72rem' },

  fxCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px' },
  fxRate: { fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 800, marginTop: 6 },
  fxMonths: { display: 'flex', justifyContent: 'space-between', marginTop: 4 },
  fxMonth: { fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)' },
  fxBadge: { background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.2)', color: TEAL, padding: '7px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 500, marginTop: 12 },

  alertRow: { display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  alertDot: { width: 8, height: 8, borderRadius: '50%', marginTop: 4, flexShrink: 0 },
  alertMsg: { fontSize: '0.82rem', marginBottom: 3, lineHeight: 1.4 },
  alertTime: { fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' },

  aiCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px' },
  aiStatus: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, marginBottom: 16, fontSize: '0.82rem', color: TEAL },
  aiDot: { width: 8, height: 8, borderRadius: '50%', background: TEAL, animation: 'pulse 2s ease-in-out infinite' },
  aiDetails: { display: 'flex', flexDirection: 'column', gap: 10 },
  aiRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' },
}