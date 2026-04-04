import { useState } from "react";

interface MintPanelProps {
  isLoading: boolean;
  onMint: (to: `0x${string}`, amount: string) => void;
}

export function MintPanel({ isLoading, onMint }: MintPanelProps) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleMint = () => {
    if (!to || !amount) return;
    onMint(to as `0x${string}`, amount);
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm leading-relaxed text-dim">
        Contract Owner Only: Mint new OPX tokens to any recipient address. Total supply cannot exceed the 10M cap.
      </p>

      <div className="flex flex-col gap-[6px]">
        <label className="section-title">Recipient Address</label>
        <input
          className="ui-input focus:border-accent-gold"
          type="text"
          placeholder="0x..."
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-[6px]">
        <label className="section-title">Mint Amount (OPX)</label>
        <input
          className="ui-input focus:border-accent-gold"
          type="number"
          placeholder="0.0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button
        className="w-full rounded-lg bg-accent-gold px-6 py-3 text-sm font-semibold text-bg transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
        onClick={handleMint}
        disabled={isLoading || !to || !amount}
      >
        {isLoading ? "Minting..." : "Mint Tokens"}
      </button>
    </div>
  );
}
