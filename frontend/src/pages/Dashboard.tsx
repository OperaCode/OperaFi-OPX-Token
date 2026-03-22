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
import { formatTokenAmount, shortenAddress } from '../utils/format'
import { BLOCK_EXPLORER_URL } from '../utils/constants'

// ============================================================
// LESSON: Dashboard page
// This is what users see after connecting their wallet.
// It imports useContract() which centralises all blockchain
// reads and writes. Every child component just receives props
// — none of them import wagmi directly. This keeps components
// clean, reusable, and easy to test with mock data.
// ============================================================

type Tab = 'faucet' | 'transfer' | 'mint'

export default function Dashboard() {
  const { disconnect } = useDisconnect()
  const [activeTab, setActiveTab] = useState<Tab>('faucet')

  // ── All blockchain data and actions come from one hook ──
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

  // Is the connected wallet the contract owner?
  const isOwner =
    address && tokenStats
      ? address.toLowerCase() === tokenStats.owner.toLowerCase()
      : false

  const secondsUntilNext = userStats ? Number(userStats.secondsUntilNext) : 0

  const tabs: { id: Tab; label: string }[] = [
    { id: 'faucet',   label: '🚰 Faucet'  },
    { id: 'transfer', label: '↗ Transfer' },
    ...(isOwner ? [{ id: 'mint' as Tab, label: '⚡ Mint' }] : []),
  ]

  return (
    <div className="dashboard">
      <Header
        address={address ?? ''}
        onDisconnect={() => disconnect()}
      />

      <main className="dash-main">

        {/* ── Hero ── */}
        <section className="dash-hero">
          <h1 className="dash-title">
            <span className="accent">OPX</span> Token Dashboard
          </h1>
          <p className="dash-sub">
            Request free tokens every 24 hours · Transfer · Mint (owner only)
          </p>
        </section>

        {/* ── Stat cards ── */}
        <section className="stats-grid">
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

        {/* ── Supply bar ── */}
        {tokenStats && (
          <section className="card">
            <h2 className="card-title">Supply Progress</h2>
            <SupplyBar
              totalSupply={tokenStats.totalSupply}
              maxSupply={tokenStats.maxSupply}
            />
          </section>
        )}

        {/* ── Actions ── */}
        <section className="card">
          {/* Tab bar */}
          <div className="tab-bar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab panels */}
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

          {/* ── Tx feedback ── */}
          {(isLoading || isTxConfirmed) && (
            <div className="tx-feedback">
              {isTxConfirmed ? (
                <span>
                  ✅ Confirmed!{' '}
                  {txHash && (
                    <a
                      href={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tx-link"
                    >
                      View on Etherscan ↗
                    </a>
                  )}
                </span>
              ) : (
                <span>⏳ Transaction pending…</span>
              )}
            </div>
          )}
        </section>

        {/* ── Token info ── */}
        {tokenStats && (
          <section className="card">
            <h2 className="card-title">Token Info</h2>
            <TokenInfo
              name={tokenStats.name}
              symbol={tokenStats.symbol}
              owner={tokenStats.owner}
            />
          </section>
        )}

      </main>

      <footer className="dash-footer">
        Opera Finance · Hardhat + React + wagmi
      </footer>
    </div>
  )
}
