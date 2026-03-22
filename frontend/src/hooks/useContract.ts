import { useEffect, useCallback } from "react";
import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { OPERAFI_ABI } from "../abi/OperaFi";
import { CONTRACT_ADDRESS } from "../utils/constants";


export interface TokenStats {
  name:            string;
  symbol:          string;
  totalSupply:     bigint;
  maxSupply:       bigint;
  remainingSupply: bigint;
  faucetAmount:    bigint;
  initialSupply:   bigint;
  noMintPeriod:    bigint;
  owner:           string;
}

export interface UserStats {
  balance:          bigint;
  canRequest:       boolean;
  secondsUntilNext: bigint;
  lastClaimTime:    bigint;
  // faucetStatus returns BOTH canClaim + timeRemaining in one call
  // We use it as a bonus cross-check alongside the individual fields
  faucetStatusCanClaim:      boolean;
  faucetStatusTimeRemaining: bigint;
}

export function useContract() {
  const { address, isConnected } = useAccount();

  const { writeContract, data: txHash, isPending: isWritePending } =
    useWriteContract();
  const { isLoading: isTxConfirming, isSuccess: isTxConfirmed } =
    useWaitForTransactionReceipt({ hash: txHash });

  // ============================================================
  // TOKEN-LEVEL READS
  // These don't need a connected wallet — they read public
  // contract state. We batch them into one multicall.
  //
  // Aligned to your ABI — every functionName below exists
  // in OPERAFI_ABI. Index order matters for parsing below.
  // index 0 → name
  // index 1 → symbol
  // index 2 → totalSupply
  // index 3 → MAX_SUPPLY
  // index 4 → remainingSupply
  // index 5 → FAUCET_AMOUNT
  // index 6 → INITIAL_SUPPLY
  // index 7 → NO_MINT_PERIOD
  // index 8 → owner
  // ============================================================
  const { data: tokenData, refetch: refetchToken } = useReadContracts({
    contracts: [
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "name"            },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "symbol"          },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "totalSupply"     },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "MAX_SUPPLY"      },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "remainingSupply" },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "FAUCET_AMOUNT"   },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "INITIAL_SUPPLY"  },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "NO_MINT_PERIOD"  },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "owner"           },
    ],
  });

  // ============================================================
  // USER-LEVEL READS
  // These require a connected wallet address as argument.
  // `query: { enabled: !!address }` means wagmi will SKIP
  // these calls entirely when no wallet is connected.
  //
  // index 0 → balanceOf(address)
  // index 1 → canRequestTokens(address)
  // index 2 → getUntilNextRequestTime(address)  ← your ABI name
  // index 3 → lastClaimTime(address)            ← your ABI name
  // index 4 → faucetStatus(address)             ← returns {canClaim, timeRemaining}
  // ============================================================
  const { data: userData, refetch: refetchUser } = useReadContracts({
    contracts: address ? [
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "balanceOf",              args: [address] },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "canRequestTokens",       args: [address] },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "getUntilNextRequestTime",args: [address] },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "lastClaimTime",          args: [address] },
      { address: CONTRACT_ADDRESS as `0x${string}`, abi: OPERAFI_ABI, functionName: "faucetStatus",           args: [address] },
    ] : [],
    query: { enabled: !!address },
  });

  // ============================================================
  // PARSE TOKEN DATA
  // We map each index to a named field. If the call failed or
  // hasn't loaded yet, we fall back to a safe default (0n, "—").
  // ============================================================
  const tokenStats: TokenStats | null = tokenData ? {
    name:            (tokenData[0].result as string) ?? "—",
    symbol:          (tokenData[1].result as string) ?? "—",
    totalSupply:     (tokenData[2].result as bigint) ?? 0n,
    maxSupply:       (tokenData[3].result as bigint) ?? 0n,
    remainingSupply: (tokenData[4].result as bigint) ?? 0n,
    faucetAmount:    (tokenData[5].result as bigint) ?? 0n,
    initialSupply:   (tokenData[6].result as bigint) ?? 0n,
    noMintPeriod:    (tokenData[7].result as bigint) ?? 0n,
    owner:           (tokenData[8].result as string) ?? "",
  } : null;

  // ============================================================
  // PARSE USER DATA
  // faucetStatus returns a tuple {canClaim: bool, timeRemaining: uint256}
  // wagmi returns tuples as an object with named keys matching
  // your ABI output names — so we access result.canClaim etc.
  // ============================================================
  const faucetStatusResult = userData?.[4]?.result as
    { canClaim: boolean; timeRemaining: bigint } | undefined;

  const userStats: UserStats | null = userData && userData.length === 5 ? {
    balance:                   (userData[0].result as bigint)  ?? 0n,
    canRequest:                (userData[1].result as boolean) ?? false,
    secondsUntilNext:          (userData[2].result as bigint)  ?? 0n,
    lastClaimTime:             (userData[3].result as bigint)  ?? 0n,
    faucetStatusCanClaim:      faucetStatusResult?.canClaim      ?? false,
    faucetStatusTimeRemaining: faucetStatusResult?.timeRemaining ?? 0n,
  } : null;

  // ── Refetch everything after a tx confirms ────────────────
  useEffect(() => {
    if (isTxConfirmed) {
      refetchToken();
      refetchUser();
    }
  }, [isTxConfirmed]);

  // ============================================================
  // WRITE FUNCTIONS
  // These send transactions. writeContract is fire-and-forget —
  // NOT async. The result comes back via txHash + isTxConfirmed.
  // ============================================================

  const requestToken = useCallback(() => {
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: OPERAFI_ABI,
      functionName: "requestToken",
      // no args — matches your ABI: "inputs": []
    });
  }, [writeContract]);

  const mint = useCallback((to: string, amount: string) => {
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: OPERAFI_ABI,
      functionName: "mint",
      args: [to as `0x${string}`, parseEther(amount)],
      // matches ABI: mint(address to, uint256 amount)
    });
  }, [writeContract]);

  const transfer = useCallback((to: string, amount: string) => {
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: OPERAFI_ABI,
      functionName: "transfer",
      args: [to as `0x${string}`, parseEther(amount)],
      // matches ABI: transfer(address to, uint256 value)
    });
  }, [writeContract]);

  return {
    // Wallet
    address,
    isConnected,
    // Contract data
    tokenStats,
    userStats,
    // Write actions
    requestToken,
    mint,
    transfer,
    // Tx state
    isLoading: isWritePending || isTxConfirming,
    isTxConfirmed,
    txHash,
    // Manual refresh
    refetch: () => { refetchToken(); refetchUser(); },
  };
}