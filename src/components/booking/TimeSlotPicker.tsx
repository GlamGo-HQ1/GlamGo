'use client'

import styles from './booking.module.css'

export type TimeSlot = 'morning' | 'afternoon' | 'evening'

interface TimeSlotPickerProps {
  selectedSlot: TimeSlot | null
  onSelect: (slot: TimeSlot) => void
}

const TIME_SLOTS: Array<{ id: TimeSlot; label: string; time: string; icon: JSX.Element }> = [
  {
    id: 'morning',
    label: 'Morning',
    time: '8am - 12pm',
    icon: <SunriseIcon />
  },
  {
    id: 'afternoon',
    label: 'Afternoon',
    time: '12pm - 5pm',
    icon: <SunIcon />
  },
  {
    id: 'evening',
    label: 'Evening',
    time: '5pm - 9pm',
    icon: <MoonIcon />
  }
]

export function TimeSlotPicker({ selectedSlot, onSelect }: TimeSlotPickerProps) {
  return (
    <section className={styles.timeSlotSection}>
      <h3 className={styles.sectionTitle}>Select Time</h3>
      <div className={styles.timeSlotList}>
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot.id}
            type="button"
            onClick={() => onSelect(slot.id)}
            className={`
              ${styles.timeSlotCard}
              ${selectedSlot === slot.id ? styles.timeSlotSelected : ''}
            `}
            aria-pressed={selectedSlot === slot.id}
          >
            <div className={styles.timeSlotInfo}>
              <span className={styles.timeSlotLabel}>{slot.label}</span>
              <span className={styles.timeSlotTime}>{slot.time}</span>
            </div>
            <span className={styles.timeSlotIcon}>{slot.icon}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function SunriseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v2M12 8a4 4 0 100 8 4 4 0 000-8z" />
      <path d="M4.93 4.93l1.41 1.41M2 12h2M4.93 19.07l1.41-1.41M12 20v2M19.07 19.07l-1.41-1.41M22 12h-2M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm9-9a1 1 0 110 2h-2a1 1 0 110-2h2zM5 12a1 1 0 110 2H3a1 1 0 110-2h2zm14.07-6.07a1 1 0 010 1.41l-1.41 1.42a1 1 0 11-1.42-1.42l1.42-1.41a1 1 0 011.41 0zm-12.73 12.73a1 1 0 010 1.41l-1.41 1.42a1 1 0 11-1.42-1.42l1.42-1.41a1 1 0 011.41 0zm12.73 0a1 1 0 01-1.41 1.41l-1.42-1.41a1 1 0 111.42-1.42l1.41 1.42zM6.34 6.34a1 1 0 01-1.41 1.41L3.51 6.34a1 1 0 111.42-1.42l1.41 1.42z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}
