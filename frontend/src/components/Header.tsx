import { shortenAddress } from "../utils/format";

interface HeaderProps {
  address: string;
  onDisconnect: () => void;
}

export function Header({ address, onDisconnect }: HeaderProps) {
  return (
    <header className="sticky top-0 z-[100] border-b border-bord/80 bg-bg/85 backdrop-blur-md">
      <div className="app-container flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-[10px] font-mono text-base font-bold text-text">
            <HexLogo />
            Opera Finance
          </div>
          <span className="rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-[3px] text-[10px] font-mono text-accent-blue">
            Sepolia
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-green" />
          <span className="rounded-full border border-accent-green/30 bg-accent-green/10 px-3 py-1 font-mono text-xs text-accent-green">
            {shortenAddress(address)}
          </span>
          <button className="btn-muted py-1.5 text-xs" onClick={onDisconnect}>
            Disconnect
          </button>
        </div>
      </div>
    </header>
  );
}

function HexLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <polygon
        points="16,2 28,9 28,23 16,30 4,23 4,9"
        stroke="#00e5a0"
        strokeWidth="1.5"
        fill="none"
      />
      <polygon
        points="16,8 22,11.5 22,18.5 16,22 10,18.5 10,11.5"
        stroke="#00e5a0"
        strokeWidth="1"
        fill="rgba(0,229,160,.15)"
      />
      <circle cx="16" cy="16" r="3" fill="#00e5a0" />
    </svg>
  );
}
