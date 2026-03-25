'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './stylist-dashboard.module.css'

interface PendingBooking {
  id: string
  appointment_date: string
  time_slot: string
  client_address: string | null
  amount: number
  style_name: string
  style_image: string | null
  counterpart_name: string
  counterpart_avatar: string | null
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function formatTimeSlot(slot: string): string {
  const map: Record<string, string> = { morning: '10:00 AM', afternoon: '2:00 PM', evening: '5:00 PM' }
  return map[slot] ?? slot
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
}

export function PendingBookings({ bookings }: { bookings: PendingBooking[] }) {
  const router = useRouter()
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const visibleBookings = bookings.filter(b => !dismissed.has(b.id))

  async function handleAction(bookingId: string, action: 'accept' | 'decline') {
    setProcessingId(bookingId)
    try {
      const res = await fetch(`/api/bookings/${bookingId}/${action}`, { method: 'PATCH' })
      if (res.ok) {
        setDismissed(prev => new Set(Array.from(prev).concat(bookingId)))
        router.refresh()
      } else {
        const err = await res.json()
        alert(err.error || `Failed to ${action} booking`)
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setProcessingId(null)
    }
  }

  if (visibleBookings.length === 0) return null

  return (
    <div className={styles.pendingSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>New Requests</h2>
        <span className={styles.pendingBadge}>{visibleBookings.length}</span>
      </div>
      <div className={styles.appointmentList}>
        {visibleBookings.map((booking) => (
          <div key={booking.id} className={styles.pendingCard}>
            <div className={styles.clientAvatar}>
              {booking.counterpart_avatar ? (
                <Image src={booking.counterpart_avatar} alt={booking.counterpart_name} fill sizes="56px" className={styles.clientImg} />
              ) : (
                <div className={styles.clientPlaceholder}>{booking.counterpart_name.charAt(0)}</div>
              )}
            </div>
            <div className={styles.appointmentInfo}>
              <p className={styles.clientName}>{booking.counterpart_name}</p>
              <p className={styles.appointmentStyle}>{booking.style_name}</p>
              <div className={styles.appointmentMeta}>
                <span>{formatDate(booking.appointment_date)}</span>
                <span>{formatTimeSlot(booking.time_slot)}</span>
                <span className={styles.pendingAmount}>{formatPrice(booking.amount)}</span>
              </div>
            </div>
            <div className={styles.pendingActions}>
              <button
                className={styles.acceptBtn}
                onClick={() => handleAction(booking.id, 'accept')}
                disabled={processingId === booking.id}
              >
                {processingId === booking.id ? '...' : 'Accept'}
              </button>
              <button
                className={styles.declineBtn}
                onClick={() => handleAction(booking.id, 'decline')}
                disabled={processingId === booking.id}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
