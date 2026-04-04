import { BLOCK_EXPLORER_URL, CONTRACT_ADDRESS } from "../utils/constants";
import { shortenAddress } from "../utils/format";

interface TokenInfoProps {
  name: string;
  symbol: string;
  owner: string;
}

export function TokenInfo({ name, symbol, owner }: TokenInfoProps) {
  const rows = [
    { label: "Token Name", value: name },
    { label: "Symbol", value: symbol },
    {
      label: "Contract",
      value: shortenAddress(CONTRACT_ADDRESS),
      link: `${BLOCK_EXPLORER_URL}/address/${CONTRACT_ADDRESS}`,
      isMono: true,
    },
    {
      label: "Owner",
      value: shortenAddress(owner),
      link: `${BLOCK_EXPLORER_URL}/address/${owner}`,
      isMono: true,
      tag: "OWNER",
    },
  ];

  return (
    <div className="flex flex-col">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between border-b border-bord py-3 text-sm last:border-b-0"
        >
          <span className="text-dim">{row.label}</span>
          <div className="flex items-center gap-2">
            {row.tag && (
              <span className="rounded-full border border-accent-gold/25 bg-accent-gold/10 px-2 py-[2px] text-[10px] font-mono text-accent-gold">
                {row.tag}
              </span>
            )}
            {row.link ? (
              <a
                href={row.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`link-external ${row.isMono ? "font-mono text-xs" : ""}`}
              >
                {row.value} ↗
              </a>
            ) : (
              <span className={row.isMono ? "font-mono text-xs" : ""}>
                {row.value}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
