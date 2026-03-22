import { useState } from 'react'

interface MintPanelProps {
  isLoading: boolean
  onMint:    (to: string, amount: string) => void
}

export function MintPanel({ isLoading, onMint }: MintPanelProps) {
  const [to,     setTo    ] = useState('')
  const [amount, setAmount] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!to || !amount) return
    onMint(to, amount)
    setTo('')
    setAmount('')
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <p className="panel-desc">
        Mint tokens to any address.{' '}
        <span className="owner-tag">Owner only</span>
      </p>

      <div className="form-group">
        <label className="form-label">Recipient Address</label>
        <input
          className="form-input form-input--gold"
          type="text"
          placeholder="0x..."
          value={to}
          onChange={e => setTo(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Amount (OPX)</label>
        <input
          className="form-input form-input--gold"
          type="number"
          placeholder="e.g. 1000"
          step="0.01"
          min="0"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn--gold" disabled={isLoading}>
        {isLoading ? 'Confirming…' : 'Mint Tokens'}
      </button>
    </form>
  )
}
