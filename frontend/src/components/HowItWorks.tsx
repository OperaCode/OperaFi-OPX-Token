const steps = [
  {
    number: '01',
    title: 'Connect Wallet',
    description: 'Use MetaMask or any other compatible wallet to connect to the Sepolia Testnet.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    )
  },
  {
    number: '02',
    title: 'Request OPX',
    description: 'Head to the dashboard and click "Claim Tokens" to receive 100 OPX every 24 hours.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    number: '03',
    title: 'Manage Tokens',
    description: 'Transfer tokens to friends, check your balance, or track the total supply in real-time.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    )
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 py-20">
      <div className="app-container">
        <div className="mb-12 text-center">
          <p className="mb-4 font-mono text-[11px] tracking-[3px] text-accent-green/80">GUIDE</p>
          <h2 className="mb-3 font-mono text-3xl text-text md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-dim">
          Getting started with Opera Finance is simple. Follow these three easy steps to begin your journey.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="ui-panel relative p-6 transition-colors duration-200 hover:border-accent-green/45">
              <div className="absolute right-4 top-3 select-none font-mono text-4xl font-bold text-accent-green/10">
                {step.number}
              </div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-accent-green/20 bg-accent-green/10 text-accent-green">
                {step.icon}
              </div>
              <h3 className="mb-2 text-base font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-dim">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
