# OperaFi 🎭

A full-stack ERC-20 token project built on **Lisk Sepolia** testnet. Includes a Solidity smart contract with a built-in faucet, and a React + TypeScript frontend for interacting with it.

---

## Live Demo

- **Frontend:** https://opera-fi-opx-token.vercel.app/
- **Contract Address & Verification:** [`0x92E143F3C276476B5F5e1054434D8681d5a2B51f`](https://sepolia-blockscout.lisk.com/address/0x92E143F3C276476B5F5e1054434D8681d5a2B51f)
- **Network:** Lisk Sepolia (Chain ID: 4202)

---

## Token Details

| Property | Value |
|---|---|
| Name | Opera Finance |
| Symbol | OPX |
| Decimals | 18 |
| Max Supply | 10,000,000 OPX |
| Initial Supply | 100 OPX (minted to owner) |
| Faucet Amount | 100 OPX per claim |
| Cooldown Period | 24 hours |

---

## Project Features

### Smart Contract
- ERC-20 token with OpenZeppelin base contracts
- Public faucet — anyone can claim 100 OPX every 24 hours
- Owner-only `mint` function for manual minting
- Hard cap on max supply enforced on every mint


### Frontend
- Connect wallet via MetaMask (wagmi v3)
- Live token stats: total supply, remaining supply, your balance
- Faucet panel with countdown timer until next claim
- Transfer tokens to any address
- Owner mint panel (visible only to contract owner)
- Supports Lisk Sepolia network

---

## Tech Stack

| Layer | Technology |
|---|---|
| Smart Contract | Solidity 0.8.20, OpenZeppelin v5 |
| Dev/Test/Deploy | Hardhat, TypeScript |
| Frontend | React, TypeScript, Vite |
| Blockchain Hooks | wagmi v3, viem |
| Styling | CSS (custom) |
| Network | Lisk Sepolia (Chain ID 4202) |

---

## Project Structure

```
operafi/
├── contracts/
│   ├── contracts/
│   │   └── OperaFi.sol          # ERC-20 token contract
│   ├── scripts/
│   │   └── deploy.ts            # Deployment script
│   ├── test/
│   │   └── OperaFi.ts           # Contract tests
│   └── hardhat.config.ts
│
└── frontend/
    └── src/
        ├── abi/
        │   └── OperaFi.ts       # Contract ABI
        ├── components/          # UI components
        ├── hooks/
        │   ├── useContract.ts   # Blockchain reads/writes
        │   └── useCountdown.ts  # Cooldown timer
        ├── pages/
        │   ├── LandingPage.tsx
        │   └── Dashboard.tsx
        └── utils/
            ├── constants.ts
            └── format.ts
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MetaMask browser extension
- Lisk Sepolia ETH for gas 

### 1. Clone the repo

```bash
git clone https://github.com/OperaCode/OperaFi-OPX-Token.git
cd operafi
```

### 2. Set up the contract

```bash
cd contracts
npm install
```

Create a `.env` file:

```env
PRIVATE_KEY=your_wallet_private_key
LISK_SEPOLIA_URL=https://rpc.sepolia-api.lisk.com
```

Compile and test:

```bash
npx hardhat compile
npx hardhat test
```

Deploy:

```bash
npx hardhat run scripts/deploy.ts --network liskSepolia
```

Verify on Blockscout:

```bash
npx hardhat verify --network liskSepolia <DEPLOYED_ADDRESS> "<OWNER_ADDRESS>"
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```env
VITE_CONTRACT_ADDRESS=0x92E143F3C276476B5F5e1054434D8681d5a2B51f
VITE_SEPOLIA_RPC=https://rpc.sepolia-api.lisk.com
```

Run locally:

```bash
npm run dev
```

---


## Network Configuration

Add **Lisk Sepolia** to MetaMask:

| Field | Value |
|---|---|
| Network Name | Lisk Sepolia |
| RPC URL | `https://rpc.sepolia-api.lisk.com` |
| Chain ID | `4202` |
| Currency Symbol | `ETH` |
| Block Explorer | `https://sepolia-blockscout.lisk.com` |

---

## Environment Variables

### contracts/.env

| Variable | Description |
|---|---|
| `PRIVATE_KEY` | Deployer wallet private key |
| `LISK_SEPOLIA_URL` | Lisk Sepolia RPC URL |

### frontend/.env

| Variable | Description |
|---|---|
| `VITE_CONTRACT_ADDRESS` | Deployed contract address |
| `VITE_SEPOLIA_RPC` | Lisk Sepolia RPC URL |

---

## License

MIT