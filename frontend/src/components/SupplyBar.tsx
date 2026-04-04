import { formatTokenAmount } from "../utils/format";

interface SupplyBarProps {
  totalSupply: bigint;
  maxSupply: bigint;
}

export function SupplyBar({ totalSupply, maxSupply }: SupplyBarProps) {
  const percent = Number((totalSupply * 100n) / maxSupply);

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between font-mono text-[11px] text-dim">
        <span>{percent}% Minted</span>
        <span>{formatTokenAmount(totalSupply)} / {formatTokenAmount(maxSupply)}</span>
      </div>
      <div className="h-[10px] overflow-hidden rounded-full border border-bord bg-surf2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-blue transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-2 font-mono text-[11px] text-dim">
        Max Supply Cap: {formatTokenAmount(maxSupply)} OPX
      </div>
    </div>
  );
}
