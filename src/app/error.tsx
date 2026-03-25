'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0A0A0F',
      color: '#FAFAFA',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '2.5rem',
        marginBottom: '1rem',
        color: '#C9A96E',
      }}>
        Something went wrong
      </h1>
      <p style={{
        color: 'rgba(255,255,255,0.6)',
        marginBottom: '2rem',
        maxWidth: '400px',
      }}>
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '12px 32px',
          background: 'linear-gradient(135deg, #C9A96E, #A68B5B)',
          color: '#1a1a1a',
          border: 'none',
          borderRadius: '4px',
          fontWeight: '600',
          cursor: 'pointer',
          fontSize: '14px',
          letterSpacing: '0.05em',
        }}
      >
        Try Again
      </button>
    </div>
  )
}
