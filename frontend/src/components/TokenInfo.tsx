import { shortenAddress } from '../utils/format'

interface TokenInfoProps {
  name:   string
  symbol: string
  owner:  string
}

export function TokenInfo({ name, symbol, owner }: TokenInfoProps) {
  const rows = [
    { label: 'Name',       value: name,                    mono: false },
    { label: 'Symbol',     value: symbol,                  mono: true  },
    { label: 'Decimals',   value: '18',                    mono: true  },
    { label: 'Max Supply', value: '10,000,000 OPX',        mono: true  },
    { label: 'Faucet',     value: '100 OPX / 24h',         mono: true  },
    { label: 'Owner',      value: shortenAddress(owner),   mono: true  },
  ]

  return (
    <div className="info-table">
      {rows.map(row => (
        <div key={row.label} className="info-row">
          <span className="info-key">{row.label}</span>
          <span className={row.mono ? 'info-val info-val--mono' : 'info-val'}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  )
}
