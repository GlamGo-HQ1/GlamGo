import React from 'react'

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      <div 
        className={className} 
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-sm)',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }} 
      />
    </>
  )
}
