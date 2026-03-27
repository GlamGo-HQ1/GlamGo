'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BookingCodeInput } from './BookingCodeInput'
import styles from './stylist-dashboard.module.css'

interface DashboardBooking {
  id: string
  appointment_date: string
  time_slot: string
  client_address: string | null
  status: string
  payment_status: string
  amount: number
  confirmation_code: string
  style_name: string
  style_image: string | null
  counterpart_name: string
  counterpart_avatar: string | null
}

function formatDate(dateStr: string): string {
  // Fix date UI logic: Append T12:00:00 to prevent timezone drift
  const safeDate = dateStr.includes('T') ? dateStr : `${dateStr}T12:00:00`
  return new Date(safeDate).toLocaleDateString('en-NG', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatTimeSlot(slot: string): string {
  const map: Record<string, string> = {
    morning: '10:00 AM',
    afternoon: '2:00 PM',
    evening: '5:00 PM',
  }
  return map[slot] ?? slot
}

export function UpcomingBookings({ bookings, stylistId }: { bookings: DashboardBooking[], stylistId: string }) {
  const [verifyingBookingId, setVerifyingBookingId] = useState<string | null>(null)

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Upcoming Appointments</h2>
      </div>

      {bookings.length === 0 ? (
        <div className={styles.emptyState}>
          <svg className={styles.emptyIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <p className={styles.emptyText}>No upcoming appointments yet</p>
          <p className={styles.emptyHint}>When clients book your services, their appointments will appear here.</p>
        </div>
      ) : (
        <div className={styles.appointmentList}>
          {bookings.map((booking) => (
            <div key={booking.id} className={styles.appointmentCard}>
              <div className={styles.clientAvatar}>
                {booking.counterpart_avatar ? (
                  <Image
                    src={booking.counterpart_avatar}
                    alt={booking.counterpart_name}
                    fill
                    sizes="56px"
                    className={styles.clientImg}
                  />
                ) : (
                  <div className={styles.clientPlaceholder}>
                    {booking.counterpart_name.charAt(0)}
                  </div>
                )}
              </div>
              <div className={styles.appointmentInfo}>
                <p className={styles.clientName}>{booking.counterpart_name}</p>
                <p className={styles.appointmentStyle}>{booking.style_name}</p>
                <div className={styles.appointmentMeta}>
                  <span>{formatDate(booking.appointment_date)}</span>
                  <span>{formatTimeSlot(booking.time_slot)}</span>
                </div>
              </div>
              {(() => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                const apptDate = new Date(booking.appointment_date.includes('T') ? booking.appointment_date : `${booking.appointment_date}T12:00:00`)
                apptDate.setHours(0, 0, 0, 0)
                const isToday = apptDate.getTime() === today.getTime()
                return isToday && booking.status === 'confirmed'
              })() ? (
                <button 
                  className={styles.startBtn}
                  onClick={() => setVerifyingBookingId(booking.id)}
                >
                  Start Service
                </button>
              ) : booking.status === 'in_progress' ? (
                <button className={`${styles.startBtn} ${styles.inProgressBtn}`} disabled>In Progress</button>
              ) : (
                <button className={styles.upcomingBtn}>Upcoming</button>
              )}
            </div>
          ))}
        </div>
      )}

      {verifyingBookingId && (
        <BookingCodeInput 
          stylistId={stylistId} 
          onClose={() => setVerifyingBookingId(null)} 
          bookingId={verifyingBookingId}
        />
      )}
    </div>
  )
}
