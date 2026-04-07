# OperaFi Contracts

Solidity smart contracts for the OperaFi ERC-20 faucet dApp.

## Stack

- Solidity `0.8.x`
- Hardhat
- OpenZeppelin Contracts
- TypeScript tooling

## Main Contract

- Path: `contracts/contracts/OperaFi.sol`
- Contract: `OperaFi`

### Core Behavior

- ERC-20 token (`Opera Finance`, symbol `OFI`)
- Fixed max supply cap (`10,000,000` tokens)
- Faucet claims (`100` tokens per request)
- Claim cooldown per wallet (`24 hours`)
- Owner-only `mint(address,uint256)`

## Setup

From this directory (`contracts/`):

```bash
npm install
```

Create `.env`:

```env
PRIVATE_KEY=YOUR_PRIVATE_KEY
LISK_SEPOLIA_URL=https://rpc.sepolia-api.lisk.com
```

## Common Commands

```bash
# compile
npx hardhat compile

# test
npx hardhat test

# deploy (current hardhat config network)
npx hardhat run scripts/Deploy.ts --network liskSepolia
```

## Network Configuration Note

Current `hardhat.config.ts` is set to deploy on `liskSepolia` (`chainId 4202`).
If your frontend is targeting Ethereum Sepolia (`11155111`), align both before testing end-to-end.

## Files

- `contracts/contracts/OperaFi.sol` - token and faucet logic
- `contracts/scripts/Deploy.ts` - deployment script
- `contracts/test/OperaFiTest.ts` - contract tests
- `contracts/hardhat.config.ts` - network/tooling config
