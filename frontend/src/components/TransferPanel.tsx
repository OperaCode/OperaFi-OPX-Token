import { useState } from "react";

interface TransferPanelProps {
  isLoading: boolean;
  onTransfer: (to: `0x${string}`, amount: string) => void;
}

export function TransferPanel({ isLoading, onTransfer }: TransferPanelProps) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = () => {
    if (!to || !amount) return;
    onTransfer(to as `0x${string}`, amount);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-[6px]">
        <label className="section-title">Recipient Address</label>
        <input
          className="ui-input"
          type="text"
          placeholder="0x..."
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-[6px]">
        <label className="section-title">Amount (OPX)</label>
        <input
          className="ui-input"
          type="number"
          placeholder="0.0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button className="btn-primary w-full" onClick={handleTransfer} disabled={isLoading || !to || !amount}>
        {isLoading ? "Transferring..." : "Transfer Tokens"}
      </button>
    </div>
  );
}
