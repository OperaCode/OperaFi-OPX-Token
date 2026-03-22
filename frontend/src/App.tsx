import { useAccount } from 'wagmi'
import { LandingPage } from './pages/LandingPage'
import Dashboard       from './pages/Dashboard'

// ============================================================
// LESSON: App.tsx — the router
//
// This is intentionally tiny. It has ONE job: decide which
// page to show based on whether a wallet is connected.
//
// useAccount() from wagmi gives us:
//   isConnected — true if a wallet is connected
//   address     — the connected wallet address (or undefined)
//
// When the user clicks "Connect Wallet" on the landing page,
// wagmi updates isConnected to true, React re-renders, and
// the Dashboard appears — no react-router needed for this.
// ============================================================

export default function App() {
  const { isConnected } = useAccount()
  return isConnected ? <Dashboard /> : <LandingPage />
}
