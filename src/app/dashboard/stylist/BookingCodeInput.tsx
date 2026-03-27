'use client'

import { useState, useRef } from 'react'
import { verifyBookingCode } from '@/lib/actions/dashboard'
import styles from './stylist-dashboard.module.css'

interface BookingCodeInputProps {
  stylistId: string
  bookingId: string
  onClose: () => void
}

export function BookingCodeInput({ stylistId, bookingId, onClose }: BookingCodeInputProps) {
  const [digits, setDigits] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  function handleChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return

    const newDigits = [...digits]
    newDigits[index] = value
    setDigits(newDigits)

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  async function handleVerify() {
    const code = digits.join('')
    if (code.length !== 4) return

    setIsLoading(true)
    setResult(null)

    const res = await verifyBookingCode(code, stylistId, bookingId)

    if (res.success) {
      setResult({ success: true, message: 'Service started — client will confirm completion to release payment.' })
      setDigits(['', '', '', ''])
    } else {
      setResult({ success: false, message: res.error ?? 'Verification failed' })
    }

    setIsLoading(false)
  }

  const isComplete = digits.every(d => d !== '')

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Service Verification</h2>
          <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Close modal">&times;</button>
        </div>
        <p className={styles.modalDesc}>
          Enter the client&apos;s 4-digit security code to finalize the appointment and release funds to your wallet.
        </p>
      <div className={styles.verifyControls}>
        <div className={styles.codeInputs}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              placeholder="•"
              className={styles.codeDigit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
            />
          ))}
        </div>
        <button
          className={styles.verifyBtn}
          onClick={handleVerify}
          disabled={!isComplete || isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify & Release Payment'}
        </button>
      </div>
      {result && (
        <p className={result.success ? styles.successMsg : styles.errorMsg}>
          {result.message}
        </p>
      )}
      </div>
    </div>
  )
}
