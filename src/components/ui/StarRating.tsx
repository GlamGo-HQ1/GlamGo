import React from 'react'

export function StarRating({ rating, count = 0, size = 16 }: { rating: number, count?: number, size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: size }}>
      <span style={{ color: 'var(--warning)' }}>★</span>
      <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>
        {rating.toFixed(1)}
      </span>
      {count > 0 && (
        <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginLeft: '2px' }}>
          ({count})
        </span>
      )}
    </div>
  )
}
