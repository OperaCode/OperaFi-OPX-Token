import { supplyPercent, formatTokenAmount } from '../utils/format'

interface SupplyBarProps {
  totalSupply: bigint
  maxSupply:   bigint
}

export function SupplyBar({ totalSupply, maxSupply }: SupplyBarProps) {
  const pct = supplyPercent(totalSupply, maxSupply)

  return (
    <div className="supply-bar">
      <div className="supply-bar__meta">
        <span>Minted: {formatTokenAmount(totalSupply)} OPX</span>
        <span>{pct.toFixed(2)}%</span>
      </div>
      <div className="supply-bar__track">
        <div className="supply-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <p className="supply-bar__max">Max supply: {formatTokenAmount(maxSupply)} OPX</p>
    </div>
  )
}
