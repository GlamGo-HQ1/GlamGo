'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Log error for debugging
  console.error('Global error:', error)

  return (
    <html>
      <body style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0A0F',
        color: '#FAFAFA',
        padding: '2rem',
        textAlign: 'center',
        margin: 0,
        fontFamily: 'system-ui, sans-serif',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#C9A96E',
        }}>
          Something went wrong
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '2rem',
        }}>
          A critical error occurred. Please refresh the page.
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: '12px 32px',
            background: '#C9A96E',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  )
}
