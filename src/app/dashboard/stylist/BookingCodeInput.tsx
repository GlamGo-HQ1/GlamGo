'use client'

import { useState, useRef } from 'react'
import { verifyBookingCode } from '@/lib/actions/dashboard'
import styles from './stylist-dashboard.module.css'

interface BookingCodeInputProps {
  stylistId: string
}

export function BookingCodeInput({ stylistId }: BookingCodeInputProps) {
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

    const res = await verifyBookingCode(code, stylistId)

    if (res.success) {
      setResult({ success: true, message: 'Payment released successfully!' })
      setDigits(['', '', '', ''])
    } else {
      setResult({ success: false, message: res.error ?? 'Verification failed' })
    }

    setIsLoading(false)
  }

  const isComplete = digits.every(d => d !== '')

  return (
    <section className={styles.verifySection}>
      <div className={styles.verifyInfo}>
        <h2 className={styles.verifyHeading}>Service Verification</h2>
        <p className={styles.verifyDescription}>
          Enter the client&apos;s 4-digit security code to finalize the appointment and release funds to your wallet.
        </p>
      </div>
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
    </section>
  )
}
