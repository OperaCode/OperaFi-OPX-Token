import { useState } from 'react'

interface TransferPanelProps {
  isLoading:  boolean
  onTransfer: (to: string, amount: string) => void
}

export function TransferPanel({ isLoading, onTransfer }: TransferPanelProps) {
  const [to,     setTo    ] = useState('')
  const [amount, setAmount] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!to || !amount) return
    onTransfer(to, amount)
    setTo('')
    setAmount('')
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <p className="panel-desc">Send OPX tokens to any wallet address.</p>

      <div className="form-group">
        <label className="form-label">Recipient Address</label>
        <input
          className="form-input"
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
          className="form-input"
          type="number"
          placeholder="e.g. 10"
          step="0.01"
          min="0"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn--green" disabled={isLoading}>
        {isLoading ? 'Confirming…' : 'Transfer'}
      </button>
    </form>
  )
}
