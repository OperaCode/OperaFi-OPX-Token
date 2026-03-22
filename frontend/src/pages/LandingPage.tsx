import { useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useEffect, useRef } from 'react'


export function LandingPage() {
  const { connect, isPending } = useConnect()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 130 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.9 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const t = Date.now() / 1000
      stars.forEach(s => {
        const alpha = s.speed * (0.35 + 0.65 * Math.abs(Math.sin(t * 0.45 + s.phase)))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,216,240,${alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="landing">

      {/* Background layers */}
      <canvas ref={canvasRef} className="stars-canvas" />
      <div className="grid-bg" />
      <div className="scanline" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/*  Nav  */}
      <nav className="land-nav">
        <div className="logo">
          <HexLogo />
          Opera Finance
        </div>
        <span className="net-pill">Sepolia Testnet</span>
      </nav>

      {/* Hero */}
      <div className="hero-wrap">
        <p className="eyebrow">ERC-20 · AIRDROP</p>

        <h1 className="hero-title">
          The simplest way to
          <span className="hero-accent"> claim free OPX tokens</span>
        </h1>

        <p className="hero-sub">
          A live ERC-20 token on Sepolia. Request{' '}
          <strong>100 OPX every 24 hours</strong>, transfer freely,
          or mint as the contract owner.
        </p>

        
        <button
          className="connect-btn"
          onClick={() => connect({ connector: injected() })}
          disabled={isPending}
        >
          {isPending ? 'Connecting…' : 'Connect Wallet →'}
        </button>

        {/*  Stats strip */}
        <div className="stats-strip">
          {STATS.map(({ n, label }) => (
            <div key={label} className="strip-stat">
              <div className="strip-num">{n}</div>
              <div className="strip-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="feat-grid">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="feat-card" style={{ animationDelay: `${i * 0.7}s` }}>
              <div className={`feat-icon feat-icon--${f.color}`}>{f.icon}</div>
              <p className="feat-title">{f.title}</p>
              <p className="feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Sub-components 

function HexLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <polygon
        points="16,2 28,9 28,23 16,30 4,23 4,9"
        stroke="#00e5a0" strokeWidth="1.5" fill="none"
      />
      <polygon
        points="16,8 22,11.5 22,18.5 16,22 10,18.5 10,11.5"
        stroke="#00e5a0" strokeWidth="1" fill="rgba(0,229,160,.15)"
      />
      <circle cx="16" cy="16" r="3" fill="#00e5a0" />
    </svg>
  )
}

//  Data 

const STATS = [
  { n: '10M', label: 'Max Supply'   },
  { n: '100', label: 'OPX per claim'},
  { n: '24h', label: 'Cooldown'     },
  { n: '18',  label: 'Decimals'     },
]

const FEATURES = [
  {
    title: 'Daily Faucet',
    desc:  '100 OPX every 24 hours per wallet. A per-user countdown shows your exact wait time.',
    color: 'green',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="9" r="6" stroke="#00e5a0" strokeWidth="1.5"/>
        <path d="M8 6v3l2 1.5" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Transfer',
    desc:  'Send OPX to any wallet address. Standard ERC-20 transfer, no fees beyond gas.',
    color: 'blue',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="#3b8aff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Owner Mint',
    desc:  'Contract owner can mint any amount up to the 10M max supply cap.',
    color: 'gold',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2l1.5 4.5H14l-3.8 2.7 1.5 4.5L8 11 4.3 13.7l1.5-4.5L2 6.5h4.5z"
              stroke="#f0b429" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
]
