'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './client-dashboard.module.css'

export function ServiceRenderedButton({ bookingId }: { bookingId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleServiceRendered() {
    if (!confirm('Are you sure you want to confirm service as complete? This will release payment to your stylist.')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/bookings/${bookingId}/complete`, { method: 'PATCH' })
      const data = await res.json()
      if (res.ok && data.success) {
        setDone(true)
        router.push(`/review/${bookingId}`)
      } else {
        alert(data.error || 'Failed to mark service as complete')
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return <span className={styles.completedLabel}>Service Marked Complete ✓</span>
  }

  return (
    <button
      className={styles.serviceRenderedBtn}
      onClick={handleServiceRendered}
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Service Rendered ✓'}
    </button>
  )
}
