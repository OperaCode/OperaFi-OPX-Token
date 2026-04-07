# OperaFi Frontend

React + TypeScript frontend for interacting with the OperaFi token contract.

## Stack

- React 19
- Vite 8
- TypeScript
- wagmi + viem
- TanStack Query
- Tailwind + custom CSS utilities

## Features

- Wallet connection (injected wallet / MetaMask)
- Landing page with dApp sections and CTAs
- Dashboard for:
  - Token supply stats
  - Faucet claim + cooldown
  - Transfer tokens
  - Owner mint actions
- Transaction feedback with explorer links

## Setup

From this directory (`frontend/`):

```bash
npm install
```

Create `.env`:

```env
VITE_CONTRACT_ADDRESS=0xYourDeployedContract
```

## Run

```bash
# development
npm run dev

# production build
npm run build

# preview production build
npm run preview
```

## Important Config Files

- `src/utils/constants.ts` - chain id, explorer URL, contract constants
- `src/hooks/useContract.ts` - on-chain reads/writes
- `src/abi/OperaFi.ts` - contract ABI
- `postcss.config.js` - Tailwind PostCSS plugin setup

## Network Alignment Note

Before using the UI:

1. Set `VITE_CONTRACT_ADDRESS` to a deployed contract on your target network.
2. Confirm `SUPPORTED_CHAIN_ID` in `src/utils/constants.ts` matches that network.
3. Ensure your wallet is connected to the same chain.
