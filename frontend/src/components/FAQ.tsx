import { useState } from 'react';

const faqs = [
  {
    question: 'What is OPX token?',
    answer: 'OPX is a standard ERC-20 token deployed on the Sepolia testnet. It is designed for demonstration and testing purposes within the Opera Finance ecosystem.'
  },
  {
    question: 'How often can I claim tokens?',
    answer: 'You can claim 100 OPX every 24 hours. The dashboard features a countdown timer to show you exactly when you can next request tokens.'
  },
  {
    question: 'Is there a maximum supply?',
    answer: 'Yes, the OPX token has a hard cap of 10,000,000 (10M) tokens. Once this limit is reached, no more tokens can be minted or claimed.'
  },
  {
    question: 'Which network should I use?',
    answer: 'Opera Finance is currently live on the Sepolia Testnet. Make sure your wallet is connected to Sepolia to interact with the contract.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 py-20">
      <div className="app-container max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-4 font-mono text-[11px] tracking-[3px] text-accent-green/80">HELP</p>
          <h2 className="font-mono text-3xl text-text md:text-4xl">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="ui-panel overflow-hidden transition-colors duration-200 hover:border-accent-green/45"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-medium"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-accent-green' : 'text-dim'}`}
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 border-t border-bord/60 px-6 py-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-sm leading-relaxed text-dim">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
