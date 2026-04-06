# OperaFi

OperaFi is a full-stack ERC-20 faucet dApp.

- Smart contract: Solidity + Hardhat
- Frontend: React + TypeScript + Vite + wagmi/viem
- Core flow: connect wallet -> claim faucet tokens (24h cooldown) -> transfer -> owner mint

## Highlights

- ERC-20 token with capped supply
- Faucet claim amount fixed to `100` tokens per request
- Cooldown enforced on-chain (`24 hours`)
- Owner-only mint function
- Dashboard for supply, balance, faucet status, transfer, and owner actions

## Contract Parameters (from code)

| Field | Value |
|---|---|
| Token Name | `Opera Finance` |
| Token Symbol | `OFI` |
| Decimals | `18` |
| Max Supply | `10,000,000` |
| Initial Supply | `100` |
| Faucet Amount | `100` |
| Cooldown | `24 hours` |

## Project Structure

```text
OperaFi/
├── contracts/
│   ├── contracts/OperaFi.sol
│   ├── scripts/Deploy.ts
│   ├── test/OperaFiTest.ts
│   ├── hardhat.config.ts
│   └── deployments/
└── frontend/
    ├── src/pages/
    ├── src/components/
    ├── src/hooks/
    ├── src/abi/OperaFi.ts
    └── src/utils/constants.ts
```

## Quick Start

### 1) Install dependencies

```bash
cd contracts && npm install
cd ../frontend && npm install
```

### 2) Run frontend

```bash
cd frontend
npm run dev
```

### 3) Build frontend

```bash
cd frontend
npm run build
```

## Environment Variables

### `contracts/.env`

```env
PRIVATE_KEY=YOUR_PRIVATE_KEY
LISK_SEPOLIA_URL=https://rpc.sepolia-api.lisk.com
```

### `frontend/.env`

```env
VITE_CONTRACT_ADDRESS=0xYourDeployedContract
```

## Contract Development

From `contracts/`:

```bash
# compile
npx hardhat compile

# test
npx hardhat test

# deploy (current config)
npx hardhat run scripts/Deploy.ts --network liskSepolia
```

## Network Notes (Important)

Current repo config is mixed:

- Frontend constants currently target **Ethereum Sepolia** (`chainId 11155111`, Etherscan URL).
- Hardhat config currently defines **Lisk Sepolia** (`chainId 4202`) as active deployment network.

Before deploying/running end-to-end, align both sides to one network:

1. Update `frontend/src/utils/constants.ts` for your target chain.
2. Ensure `contracts/hardhat.config.ts` has that network enabled.
3. Deploy contract on the same chain and set `VITE_CONTRACT_ADDRESS`.

## Live Deployment (as currently documented in repo)

- Frontend: `https://opera-fi-opx-token.vercel.app/`
- Contract address shown in repo docs: `0x92E143F3C276476B5F5e1054434D8681d5a2B51f`

Verify these match your active network before using in production demos.

## Troubleshooting

- Wallet connects but no data loads:
  - Check wallet network matches `SUPPORTED_CHAIN_ID` in frontend constants.
  - Check `VITE_CONTRACT_ADDRESS` points to a contract on that same chain.

- Frontend CSS/Tailwind errors:
  - Ensure dependencies are installed in `frontend/`.
  - Run `npm run build` to catch config errors early.

- Deploy succeeds but UI actions fail:
  - ABI/address mismatch: verify `frontend/src/abi/OperaFi.ts` and deployed contract correspond.

## License

MIT
