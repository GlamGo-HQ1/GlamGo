'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './payment.module.css'

interface PaymentSummaryProps {
  bookingId: string
  styleName: string
  stylistName: string
  appointmentDate: string
  timeSlot: string
  amount: number // in Naira
}

export function PaymentSummary({
  bookingId,
  styleName,
  stylistName,
  appointmentDate,
  timeSlot,
  amount,
}: PaymentSummaryProps) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  const handlePaymentStart = async () => {
    setIsProcessing(true)
    setError('')

    try {
      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to initiate payment')
      }

      const data = await res.json()

      // Dynamically load the Interswitch inline checkout script
      const scriptUrl =
        process.env.NEXT_PUBLIC_INTERSWITCH_ENV === 'LIVE'
          ? 'https://newwebpay.interswitchng.com/inline-scripts/pay.js'
          : 'https://sandbox.interswitchng.com/collections/w/pay'

      const existing = document.getElementById('isw-inline-script')

      if (!existing) {
        const script = document.createElement('script')
        script.id = 'isw-inline-script'
        script.src = scriptUrl
        script.async = true
        document.body.appendChild(script)
        script.onload = () => launchWebpay(data)
        script.onerror = () => {
          setError('Failed to load Interswitch Payment Gateway.')
          setIsProcessing(false)
        }
      } else {
        launchWebpay(data)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not connect to payment gateway. Please try again.'
      console.error(err)
      setError(message)
      setIsProcessing(false)
    }
  }

  const launchWebpay = (data: Record<string, string | number>) => {
    setIsProcessing(false)

    if (typeof (window as unknown as Record<string, unknown>).webpayCheckout !== 'function') {
      setError('Payment gateway failed to initialize. Please refresh and try again.')
      return
    }

    const paymentRequest = {
      merchant_code: process.env.NEXT_PUBLIC_INTERSWITCH_MERCHANT_CODE!,
      pay_item_id: process.env.NEXT_PUBLIC_INTERSWITCH_PAY_ITEM_ID!,
      txn_ref: data.transactionRef,
      amount: data.amountKobo,
      currency: 566, // NGN
      onComplete(response: Record<string, string>) {
        const status = response.resp === '00' ? 'success' : 'failed'
        router.push(
          `/payment/callback?ref=${data.transactionRef}&booking=${bookingId}&status=${status}`
        )
      },
      mode: process.env.NEXT_PUBLIC_INTERSWITCH_ENV || 'TEST',
      customer_email: data.customerEmail,
      customer_name: data.customerName,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as unknown as Record<string, (...args: unknown[]) => void>).webpayCheckout(paymentRequest)
  }

  return (
    <div className={styles.paymentSummaryCard}>
      <h2 className={styles.summaryTitle}>Appointment Summary</h2>

      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Service</span>
          <span className={styles.rowValue}>{styleName}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Stylist</span>
          <span className={styles.rowValue}>{stylistName}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Date &amp; Time</span>
          <span className={styles.rowValue}>
            {new Date(appointmentDate).toLocaleDateString()} • {timeSlot}
          </span>
        </div>
      </div>

      <div className={styles.totalSection}>
        <div className={styles.totalRow}>
          <span>Total Booking Fee</span>
          <span className={styles.totalPrice}>₦{amount.toLocaleString()}</span>
        </div>
      </div>

      {/* Exact-amount transfer warning (required by Interswitch) */}
      <div className={styles.bankTransferWarning}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p>
          <strong>Paying by Bank Transfer?</strong> You must transfer the{' '}
          <em>exact</em> amount shown. If the transfer is over or under by even
          1 kobo, the transaction will automatically fail.
        </p>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      <button
        onClick={handlePaymentStart}
        disabled={isProcessing}
        className={styles.payButton}
      >
        {isProcessing
          ? 'Connecting to Gateway...'
          : `Pay ₦${amount.toLocaleString()} Securely`}
      </button>

      <div className={styles.secureBadge}>
        <span>Secured by</span>
        <div className={styles.interswitchLogo}>Interswitch QuickTeller</div>
      </div>
    </div>
  )
}
