import { useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useEffect, useRef } from 'react'
import { HowItWorks } from '../components/HowItWorks'
import { FAQ } from '../components/FAQ'

export function LandingPage() {
  const { connect, isPending } = useConnect()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 130 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-bg selection:bg-accent-green/30">
      {/* Background layers */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[length:48px_48px] bg-[linear-gradient(rgba(0,229,160,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,160,0.04)_1px,transparent_1px)] animate-grid-pulse" />
      <div className="absolute top-0 left-0 right-0 h-[90px] pointer-events-none bg-gradient-to-b from-transparent via-accent-green/5 to-transparent animate-scanline" />
      
      {/* Ambient glow orbs */}
      <div className="absolute -top-[100px] -right-[80px] w-[340px] h-[340px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(0,229,160,0.08)_0%,transparent_70%)]" />
      <div className="absolute bottom-[60px] -left-[90px] w-[280px] h-[280px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(59,138,255,0.07)_0%,transparent_70%)]" />

      {/* Nav */}
      <nav className="relative z-50 flex items-center justify-between py-5 px-8">
        <div 
          className="flex items-center gap-[10px] font-mono font-bold text-base text-text cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <HexLogo />
          Opera Finance
        </div>
        <div className="hidden md:flex gap-6">
          <button className="bg-none border-none text-dim font-mono text-sm cursor-pointer transition-colors duration-200 hover:text-accent-green" onClick={() => scrollToSection('how-it-works')}>Guide</button>
          <button className="bg-none border-none text-dim font-mono text-sm cursor-pointer transition-colors duration-200 hover:text-accent-green" onClick={() => scrollToSection('faq')}>FAQ</button>
        </div>
        <span className="text-[10px] font-mono py-1 px-3 rounded-[20px] bg-accent-blue/10 border border-accent-blue/25 text-accent-blue">
          Sepolia Testnet
        </span>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-10 pb-16 animate-fade-up">
        <p className="text-[11px] font-mono tracking-[3px] text-accent-green/80 mb-5 uppercase">ERC-20 · AIRDROP</p>

        <h1 className="font-mono text-[clamp(26px,4.5vw,50px)] font-bold leading-[1.15] mb-[18px] text-text">
          The simplest way to
          <span className="text-accent-green"> claim free OPX tokens</span>
        </h1>

        <p className="text-base text-dim max-w-[420px] leading-[1.75] mb-9">
          A live ERC-20 token on Sepolia. Request{' '}
          <strong className="text-text font-bold">100 OPX every 24 hours</strong>, transfer freely,
          or mint as the contract owner.
        </p>

        <button
          className="relative py-4 px-11 text-base font-semibold font-sans bg-accent-green text-bg rounded-[10px] cursor-pointer overflow-hidden transition-all duration-150 hover:scale-105 hover:bg-accent-green2 animate-glow disabled:opacity-45 disabled:cursor-not-allowed disabled:animate-none group"
          onClick={() => connect({ connector: injected() })}
          disabled={isPending}
        >
          <span className="relative z-10">{isPending ? 'Connecting…' : 'Connect Wallet →'}</span>
          <div className="absolute top-[-50%] left-[-60%] w-[40%] h-[200%] bg-white/20 skew-x-[-20deg] transition-all duration-[450ms] group-hover:left-[130%]" />
        </button>

        {/* Stats strip */}
        <div className="flex justify-center gap-11 mt-14 flex-wrap">
          {STATS.map(({ n, label }) => (
            <div key={label} className="text-center">
              <div className="font-mono text-2xl font-bold text-accent-green">{n}</div>
              <div className="text-[11px] text-dim mt-1 tracking-[0.5px] uppercase">{label}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-[600px] mt-12 mx-auto">
          {FEATURES.map((f, i) => (
            <div 
              key={f.title} 
              className="bg-surf/75 border border-bord rounded-[10px] p-5 text-left animate-float backdrop-blur-[4px]" 
              style={{ animationDelay: `${i * 0.7}s` }}
            >
              <div className={`w-[34px] h-[34px] rounded-lg flex items-center justify-center mb-[10px] ${
                f.color === 'green' ? 'bg-accent-green/10 border border-accent-green/20' : 
                f.color === 'blue' ? 'bg-accent-blue/10 border border-accent-blue/20' : 
                'bg-accent-gold/10 border border-accent-gold/20'
              }`}>
                {f.icon}
              </div>
              <p className="text-[13px] font-semibold mb-[5px] text-text">{f.title}</p>
              <p className="text-[11px] text-dim leading-[1.55]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Sections */}
      <HowItWorks />
      <FAQ />

      <footer className="relative z-10 py-16 px-6 border-t border-bord mt-16">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 font-mono font-bold text-lg text-text">
            <HexLogo />
            <span>Opera Finance</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-dim text-sm transition-colors duration-200 hover:text-accent-green no-underline">Twitter</a>
            <a href="#" className="text-dim text-sm transition-colors duration-200 hover:text-accent-green no-underline">GitHub</a>
            <a href="#" className="text-dim text-sm transition-colors duration-200 hover:text-accent-green no-underline">Discord</a>
          </div>
          <p className="text-xs text-dim/60">© 2026 Opera Finance. Built for the community on Sepolia.</p>
        </div>
      </footer>
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

// Data 

const STATS = [
  { n: '10M', label: 'Max Supply' },
  { n: '100', label: 'OPX per claim' },
  { n: '24h', label: 'Cooldown' },
  { n: '18', label: 'Decimals' },
]

const FEATURES = [
  {
    title: 'Daily Faucet',
    desc: '100 OPX every 24 hours per wallet. A per-user countdown shows your exact wait time.',
    color: 'green',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="9" r="6" stroke="#00e5a0" strokeWidth="1.5" />
        <path d="M8 6v3l2 1.5" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Transfer',
    desc: 'Send OPX to any wallet address. Standard ERC-20 transfer, no fees beyond gas.',
    color: 'blue',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="#3b8aff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Owner Mint',
    desc: 'Contract owner can mint any amount up to the 10M max supply cap.',
    color: 'gold',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2l1.5 4.5H14l-3.8 2.7 1.5 4.5L8 11 4.3 13.7l1.5-4.5L2 6.5h4.5z"
          stroke="#f0b429" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
]
