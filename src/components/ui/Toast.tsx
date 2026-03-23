import React from 'react'

export function Toast({ message, type = 'info' }: { message: string, type?: 'info' | 'success' | 'warning' | 'error' }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--space-4)',
        right: 'var(--space-4)',
        padding: 'var(--space-3) var(--space-4)',
        backgroundColor: 'var(--bg-elevated)',
        borderLeft: `4px solid var(--${type})`,
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 50,
        color: 'var(--text-primary)',
        fontSize: '14px'
      }}
    >
      {message}
    </div>
  )
}
