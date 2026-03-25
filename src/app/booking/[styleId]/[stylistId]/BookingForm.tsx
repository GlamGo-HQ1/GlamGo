'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BookingSummary,
  ServiceTypeToggle,
  DatePicker,
  TimeSlotPicker,
  LocationInput,
  PriceSummary,
  type ServiceType,
  type TimeSlot
} from '@/components/booking'
import { createBooking } from '@/lib/actions/bookings'
import styles from './booking-page.module.css'

interface BookingFormProps {
  style: {
    id: string
    name: string
    images: string[] | null
  }
  stylist: {
    id: string
    full_name: string
    avatar_url: string | null
    service_mode: 'salon' | 'mobile' | 'both'
  }
  price: number
}

const BOOKING_FEE = 500

export function BookingForm({ style, stylist, price }: BookingFormProps) {
  const router = useRouter()
  
  // Form state
  const [serviceType, setServiceType] = useState<ServiceType>(
    stylist.service_mode === 'mobile' ? 'home' : 'salon'
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Validation
  const isValid = 
    selectedDate !== null && 
    selectedSlot !== null && 
    (serviceType === 'salon' || location.trim().length > 0)

  const handleProceed = async () => {
    if (!isValid || !selectedDate) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await createBooking({
        stylistId: stylist.id,
        styleId: style.id,
        appointmentDate: selectedDate.toISOString().split('T')[0],
        timeSlot: selectedSlot!,
        serviceType,
        clientAddress: serviceType === 'home' ? location : undefined,
        amount: price + BOOKING_FEE
      })

      if (result.success && result.bookingId) {
        // Navigate to payment page
        router.push(`/payment?bookingId=${result.bookingId}`)
      } else {
        setError(result.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Booking error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Header Section: Booking Summary */}
      <BookingSummary 
        style={style}
        stylist={stylist}
        price={price}
      />

      {/* Service Type Toggle */}
      <ServiceTypeToggle
        value={serviceType}
        onChange={setServiceType}
        stylistServiceMode={stylist.service_mode}
      />

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {/* Booking Form Grid */}
      <div className={styles.formGrid}>
        {/* Left Column: Date Picker */}
        <DatePicker
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />

        {/* Right Column: Time & Location */}
        <div className={styles.rightColumn}>
          <TimeSlotPicker
            selectedSlot={selectedSlot}
            onSelect={setSelectedSlot}
          />

          <LocationInput
            value={location}
            onChange={setLocation}
            serviceType={serviceType}
          />
        </div>
      </div>

      {/* Price Summary & CTA */}
      <PriceSummary
        servicePrice={price}
        bookingFee={BOOKING_FEE}
        onProceed={handleProceed}
        isValid={isValid}
        isLoading={isLoading}
      />
    </>
  )
}
