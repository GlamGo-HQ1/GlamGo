import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getHairstyleById } from '@/lib/actions/hairstyles'
import { getStylistById } from '@/lib/actions/stylists'
import { getStylistPriceForStyle } from '@/lib/actions/bookings'
import { createClient } from '@/lib/supabase/server'
import { BookingForm } from './BookingForm'
import styles from './booking-page.module.css'

interface BookingPageProps {
  params: Promise<{
    styleId: string
    stylistId: string
  }>
}

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { styleId } = await params
  const style = await getHairstyleById(styleId)
  
  return {
    title: style ? `Book ${style.name} | GlamGo` : 'Book Appointment | GlamGo',
    description: style 
      ? `Book your ${style.name} appointment with a verified GlamGo stylist` 
      : 'Book your hair appointment with GlamGo'
  }
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { styleId, stylistId } = await params

  // Check authentication
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    // Redirect to login with return URL
    redirect(`/auth/login?returnTo=/booking/${styleId}/${stylistId}`)
  }

  // Fetch style and stylist data in parallel
  const [style, stylist, stylistPrice] = await Promise.all([
    getHairstyleById(styleId),
    getStylistById(stylistId),
    getStylistPriceForStyle(stylistId, styleId)
  ])

  if (!style || !stylist) {
    notFound()
  }

  // Determine the price to charge
  const price = stylistPrice ?? style.price_min ?? 0

  return (
    <main className={styles.bookingPage}>
      <div className={styles.container}>
        <BookingForm 
          style={{
            id: style.id,
            name: style.name,
            images: style.images
          }}
          stylist={{
            id: stylist.id,
            full_name: stylist.full_name,
            avatar_url: stylist.avatar_url,
            service_mode: stylist.service_mode
          }}
          price={price}
        />
      </div>
    </main>
  )
}
