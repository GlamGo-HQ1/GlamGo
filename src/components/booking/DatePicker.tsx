'use client'

import { useState, useMemo } from 'react'
import styles from './booking.module.css'

interface DatePickerProps {
  selectedDate: Date | null
  onSelect: (date: Date) => void
  minDate?: Date
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export function DatePicker({ selectedDate, onSelect, minDate }: DatePickerProps) {
  const effectiveMinDate = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const min = minDate || new Date(today.getTime() + 24 * 60 * 60 * 1000) // Tomorrow
    min.setHours(0, 0, 0, 0)
    return min
  }, [minDate])

  const [viewMonth, setViewMonth] = useState(effectiveMinDate.getMonth())
  const [viewYear, setViewYear] = useState(effectiveMinDate.getFullYear())

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1)
    const lastDay = new Date(viewYear, viewMonth + 1, 0)
    const startPadding = firstDay.getDay()
    const totalDays = lastDay.getDate()

    const days: Array<{ date: Date | null; isCurrentMonth: boolean; isPast: boolean }> = []

    // Previous month padding
    const prevMonthLast = new Date(viewYear, viewMonth, 0).getDate()
    for (let i = startPadding - 1; i >= 0; i--) {
      const date = new Date(viewYear, viewMonth - 1, prevMonthLast - i)
      days.push({ date, isCurrentMonth: false, isPast: true })
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(viewYear, viewMonth, day)
      date.setHours(0, 0, 0, 0)
      const isPast = date < effectiveMinDate
      days.push({ date, isCurrentMonth: true, isPast })
    }

    // Next month padding (fill to 42 cells for 6 rows)
    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(viewYear, viewMonth + 1, i)
      days.push({ date, isCurrentMonth: false, isPast: false })
    }

    return days
  }, [viewMonth, viewYear, effectiveMinDate])

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  return (
    <section className={styles.datePickerCard}>
      {/* Header */}
      <div className={styles.calendarHeader}>
        <h3 className={styles.calendarTitle}>
          {MONTHS[viewMonth]} {viewYear}
        </h3>
        <div className={styles.calendarNav}>
          <button
            type="button"
            onClick={handlePrevMonth}
            className={styles.calendarNavBtn}
            aria-label="Previous month"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className={styles.calendarNavBtn}
            aria-label="Next month"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className={styles.dayLabels}>
        {DAYS.map((day, i) => (
          <span key={i} className={styles.dayLabel}>{day}</span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className={styles.calendarGrid}>
        {calendarDays.map((day, i) => (
          <button
            key={i}
            type="button"
            disabled={!day.isCurrentMonth || day.isPast}
            onClick={() => day.date && !day.isPast && day.isCurrentMonth && onSelect(day.date)}
            className={`
              ${styles.calendarDay}
              ${!day.isCurrentMonth ? styles.calendarDayOtherMonth : ''}
              ${day.isPast && day.isCurrentMonth ? styles.calendarDayPast : ''}
              ${day.date && isSelected(day.date) ? styles.calendarDaySelected : ''}
            `}
          >
            {day.date?.getDate()}
          </button>
        ))}
      </div>
    </section>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
