import React from 'react'

export function PriceTag({ amount, className = '' }: { amount: number, className?: string }) {
  const formatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount)

  return (
    <span className={className} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
      {formatted}
    </span>
  )
}
