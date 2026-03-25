'use client'

import { useEffect, useState, Suspense, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import styles from './callback.module.css'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying')
  const [message, setMessage] = useState('Verifying your payment with the gateway...')

  const txnRef = searchParams.get('ref')
  const bookingId = searchParams.get('booking')
  const callbackStatus = searchParams.get('status')

  // Memoize the client so it doesn't trigger re-renders
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    let cancelled = false

    async function verifyPayment() {
      if (!txnRef || !bookingId) {
        setStatus('failed')
        setMessage('Invalid transaction details.')
        return
      }

      if (callbackStatus === 'failed') {
        setStatus('failed')
        setMessage('Payment was unsuccessful or cancelled.')
        return
      }

      try {
        const { data: booking, error: dbError } = await supabase
          .from('bookings')
          .select('amount')
          .eq('id', bookingId)
          .single()

        if (dbError || !booking) throw new Error('Booking not found.')

        const amountKobo = Math.round(booking.amount * 100)

        // Server-side verify + persist (DB update handled by the verify API now)
        const res = await fetch(`/api/payment/verify?ref=${txnRef}&amount=${amountKobo}&bookingId=${bookingId}`)
        const data = await res.json()

        if (cancelled) return

        if (data.status === 'success') {
          setStatus('success')
          setMessage('Payment verified successfully! Redirecting to confirmation...')

          setTimeout(() => {
            router.push(`/booking/confirm/${bookingId}`)
          }, 2000)
        } else {
          setStatus('failed')
          setMessage(data.message || 'Payment verification failed.')
        }
      } catch (err: unknown) {
        if (!cancelled) {
          console.error(err)
          setStatus('failed')
          setMessage(err instanceof Error ? err.message : 'An error occurred during verification.')
        }
      }
    }

    verifyPayment()

    return () => { cancelled = true }
  }, [txnRef, bookingId, callbackStatus, router, supabase])

  return (
    <div className={styles.callbackContainer}>
      <div className={styles.statusBox}>
        {status === 'verifying' && (
          <div className={styles.verifying}>
            <div className={styles.spinner} />
            <h2>Processing Payment</h2>
            <p>{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className={styles.success}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h2>Payment Successful!</h2>
            <p>{message}</p>
          </div>
        )}

        {status === 'failed' && (
          <div className={styles.failed}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff4444" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <h2>Payment Failed</h2>
            <p>{message}</p>
            <button
              className={styles.retryButton}
              onClick={() => router.push(`/payment?bookingId=${bookingId}`)}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PaymentCallbackPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
      <Suspense fallback={<div style={{ color: '#fff' }}>Loading verification...</div>}>
        <CallbackContent />
      </Suspense>
    </main>
  )
}
