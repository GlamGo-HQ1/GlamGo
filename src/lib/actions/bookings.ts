'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface CreateBookingInput {
  stylistId: string
  styleId: string
  appointmentDate: string // ISO date string (YYYY-MM-DD)
  timeSlot: 'morning' | 'afternoon' | 'evening'
  serviceType: 'salon' | 'home'
  clientAddress?: string
  amount: number
}

export interface CreateBookingResult {
  success: boolean
  bookingId?: string
  confirmationCode?: string
  error?: string
}

/**
 * Generate a 4-digit confirmation code
 */
function generateConfirmationCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

/**
 * Create a new booking record.
 * Requires authenticated user.
 */
export async function createBooking(input: CreateBookingInput): Promise<CreateBookingResult> {
  const supabase = createClient()

  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return { success: false, error: 'You must be logged in to book an appointment' }
  }

  // Validate required fields
  if (!input.stylistId || !input.styleId || !input.appointmentDate || !input.timeSlot) {
    return { success: false, error: 'Missing required booking information' }
  }

  // For home service, require address
  if (input.serviceType === 'home' && !input.clientAddress?.trim()) {
    return { success: false, error: 'Address is required for home service' }
  }

  // Validate date is in the future
  const appointmentDate = new Date(input.appointmentDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (appointmentDate <= today) {
    return { success: false, error: 'Appointment date must be in the future' }
  }

  const confirmationCode = generateConfirmationCode()

  // Create the booking
  const { data: booking, error: insertError } = await supabase
    .from('bookings')
    .insert({
      client_id: user.id,
      stylist_id: input.stylistId,
      style_id: input.styleId,
      appointment_date: input.appointmentDate,
      time_slot: input.timeSlot,
      client_address: input.serviceType === 'home' ? input.clientAddress : null,
      status: 'pending',
      payment_status: 'unpaid',
      amount: input.amount,
      confirmation_code: confirmationCode,
      notes: input.serviceType === 'home' ? 'Home service requested' : 'Salon visit'
    })
    .select('id, confirmation_code')
    .single()

  if (insertError) {
    console.error('Error creating booking:', insertError)
    return { success: false, error: 'Failed to create booking. Please try again.' }
  }

  // Revalidate relevant pages
  revalidatePath('/dashboard')

  return {
    success: true,
    bookingId: booking.id,
    confirmationCode: booking.confirmation_code
  }
}

/**
 * Get a booking by ID (for confirmation page)
 */
export async function getBookingById(bookingId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      client_id,
      appointment_date,
      time_slot,
      client_address,
      status,
      payment_status,
      amount,
      confirmation_code,
      created_at,
      hairstyles!inner (
        id,
        name,
        images
      ),
      stylist_profiles!inner (
        id,
        users!inner (
          full_name,
          avatar_url
        )
      )
    `)
    .eq('id', bookingId)
    .single()

  if (error) {
    console.error('Error fetching booking:', error)
    return null
  }

  return data
}

/**
 * Get stylist price for a specific style
 */
export async function getStylistPriceForStyle(stylistId: string, styleId: string): Promise<number | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('stylist_styles')
    .select('stylist_price')
    .eq('stylist_id', stylistId)
    .eq('hairstyle_id', styleId)
    .single()

  if (error) {
    console.error('Error fetching stylist price:', error)
    return null
  }

  return data?.stylist_price ?? null
}
