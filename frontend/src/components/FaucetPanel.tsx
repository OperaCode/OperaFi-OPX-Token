import { CooldownBadge } from "./CooldownBadge";

interface FaucetPanelProps {
  canRequest: boolean;
  secondsUntilNext: number;
  isLoading: boolean;
  onRequest: () => void;
}

export function FaucetPanel({
  canRequest,
  secondsUntilNext,
  isLoading,
  onRequest,
}: FaucetPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm leading-relaxed text-dim">
        Claim 100 OPX tokens every 24 hours. Your wallet must be connected to the Sepolia testnet to receive tokens.
      </p>

      <div className="py-1">
        <CooldownBadge seconds={secondsUntilNext} />
      </div>

      <button className="btn-primary w-full" onClick={onRequest} disabled={!canRequest || isLoading}>
        {isLoading ? "Processing..." : "Claim 100 OPX"}
      </button>
    </div>
  );
}
