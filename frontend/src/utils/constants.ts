// You'll replace CONTRACT_ADDRESS after deploying.
// Everything else stays the same.
export const CONTRACT_ADDRESS   = '0x0000000000000000000000000000000000000000'
export const SUPPORTED_CHAIN_ID = 11155111   // Sepolia testnet (use 31337 for local)
export const BLOCK_EXPLORER_URL = 'https://sepolia.etherscan.io'

// Mirrored from the contract — used in the UI without needing a contract call
export const MAX_SUPPLY     = 10_000_000
export const FAUCET_AMOUNT  = 100
export const COOLDOWN_HOURS = 24