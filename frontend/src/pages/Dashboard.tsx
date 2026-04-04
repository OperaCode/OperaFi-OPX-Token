import { useState } from 'react'
import { useDisconnect } from 'wagmi'
import { Header }        from '../components/Header'
import { StatCard }      from '../components/StatCard'
import { SupplyBar }     from '../components/SupplyBar'
import { FaucetPanel }   from '../components/FaucetPanel'
import { TransferPanel } from '../components/TransferPanel'
import { MintPanel }     from '../components/MintPanel'
import { TokenInfo }     from '../components/TokenInfo'
import { useContract }   from '../hooks/useContract'
import { formatTokenAmount } from '../utils/format'
import { BLOCK_EXPLORER_URL } from '../utils/constants'

type Tab = 'faucet' | 'transfer' | 'mint'

export default function Dashboard() {
  const { disconnect } = useDisconnect()
  const [activeTab, setActiveTab] = useState<Tab>('faucet')

  const {
    address,
    tokenStats,
    userStats,
    requestToken,
    mint,
    transfer,
    isLoading,
    isTxConfirmed,
    txHash,
  } = useContract()

  const isOwner =
    address && tokenStats
      ? address.toLowerCase() === tokenStats.owner.toLowerCase()
      : false

  const secondsUntilNext = userStats ? Number(userStats.secondsUntilNext) : 0

  const tabs: { id: Tab; label: string }[] = [
    { id: 'faucet', label: 'Faucet' },
    { id: 'transfer', label: 'Transfer' },
    ...(isOwner ? [{ id: 'mint' as Tab, label: 'Mint' }] : []),
  ]

  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Header
        address={address ?? ''}
        onDisconnect={() => disconnect()}
      />

      <main className="app-container flex flex-1 flex-col gap-5 py-8">

        {/* Hero */}
        <section className="animate-fade-up py-1 text-center">
          <h1 className="mb-2 font-mono text-[30px] font-bold text-text">
            <span className="text-accent-green">OPX</span> Token Dashboard
          </h1>
          <p className="text-sm text-dim">
            Request free tokens every 24 hours · Transfer · Mint (owner only)
          </p>
        </section>

        {/* Stat cards */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            label="Total Supply"
            value={tokenStats ? `${formatTokenAmount(tokenStats.totalSupply)} OPX` : '—'}
            sub={tokenStats ? `of ${formatTokenAmount(tokenStats.maxSupply)} max` : undefined}
          />
          <StatCard
            label="Remaining"
            value={tokenStats ? `${formatTokenAmount(tokenStats.remainingSupply)} OPX` : '—'}
          />
          <StatCard
            label="Faucet Amount"
            value="100.00 OPX"
            sub="per 24h request"
          />
          <StatCard
            label="Your Balance"
            value={userStats ? `${formatTokenAmount(userStats.balance)} OPX` : '—'}
          />
        </section>

        {/* Supply progress */}
        {tokenStats && (
          <section className="ui-panel animate-fade-up p-6">
            <h2 className="section-title mb-4">Supply Progress</h2>
            <SupplyBar
              totalSupply={tokenStats.totalSupply}
              maxSupply={tokenStats.maxSupply}
            />
          </section>
        )}

        {/* Actions */}
        <section className="ui-panel animate-fade-up p-6" style={{ animationDelay: '0.1s' }}>
          {/* Tab bar */}
          <div className="mb-5 flex gap-1 overflow-x-auto rounded-lg border border-bord bg-surf2/60 p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-surf text-accent-green shadow-[0_8px_20px_rgba(0,0,0,0.2)]' 
                    : 'text-dim hover:text-text'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panels */}
          {activeTab === 'faucet' && (
            <FaucetPanel
              canRequest={userStats?.canRequest ?? false}
              secondsUntilNext={secondsUntilNext}
              isLoading={isLoading}
              onRequest={requestToken}
            />
          )}
          {activeTab === 'transfer' && (
            <TransferPanel
              isLoading={isLoading}
              onTransfer={transfer}
            />
          )}
          {activeTab === 'mint' && isOwner && (
            <MintPanel
              isLoading={isLoading}
              onMint={mint}
            />
          )}

          {/* Tx feedback */}
          {(isLoading || isTxConfirmed) && (
            <div className="mt-5 rounded-lg border border-accent-green/20 bg-accent-green/5 p-3 px-4 text-sm text-accent-green">
              {isTxConfirmed ? (
                <span>
                  Confirmed!{' '}
                  {txHash && (
                    <a
                      href={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-external"
                    >
                      View on Etherscan
                    </a>
                  )}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-accent-green border-t-transparent" />
                  Transaction pending…
                </span>
              )}
            </div>
          )}
        </section>

        {/* Token info */}
        {tokenStats && (
          <section className="ui-panel animate-fade-up p-6" style={{ animationDelay: '0.2s' }}>
            <h2 className="section-title mb-4">Token Info</h2>
            <TokenInfo
              name={tokenStats.name}
              symbol={tokenStats.symbol}
              owner={tokenStats.owner}
            />
          </section>
        )}

      </main>

      <footer className="border-t border-bord/80 py-5 text-center text-xs text-dim">
        Opera Finance · Hardhat + React + wagmi + TailwindCSS
      </footer>
    </div>
  )
}
