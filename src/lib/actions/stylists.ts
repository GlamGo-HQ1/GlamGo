/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { createClient } from '@/lib/supabase/server'

/* ─── Types ─── */

export interface StylistWithUser {
  id: string
  user_id: string
  bio: string | null
  average_rating: number
  total_reviews: number
  service_area: string[] | null
  service_mode: 'salon' | 'mobile' | 'both'
  specialties: string[] | null
  portfolio_images: string[] | null
  is_available: boolean
  full_name: string
  avatar_url: string | null
  city: string | null
  area: string | null
}

export interface StylistForStyle extends StylistWithUser {
  stylist_price: number | null
}

export interface StyleForStylist {
  id: string
  hairstyle_id: string
  stylist_price: number | null
  hairstyle_name: string
  hairstyle_category: string
  hairstyle_images: string[] | null
  hairstyle_duration: number | null
  hairstyle_price_min: number | null
  hairstyle_price_max: number | null
}

export interface ReviewWithClient {
  id: string
  rating: number
  comment: string | null
  created_at: string
  client_name: string
  client_avatar: string | null
}

/* ─── Actions ─── */

/**
 * Fetch stylists who offer a specific hairstyle, with their pricing.
 * Joins stylist_styles → stylist_profiles → users.
 */
export async function getStylistsForStyle(hairstyleId: string): Promise<StylistForStyle[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('stylist_styles')
    .select(`
      stylist_price,
      stylist_profiles!inner (
        id,
        user_id,
        bio,
        average_rating,
        total_reviews,
        service_area,
        service_mode,
        specialties,
        portfolio_images,
        is_available,
        users!inner (
          full_name,
          avatar_url,
          city,
          area
        )
      )
    `)
    .eq('hairstyle_id', hairstyleId)
    .eq('stylist_profiles.is_available', true)

  if (error) {
    console.error('Error fetching stylists for style:', error)
    return []
  }

  // Flatten the nested join into a clean object
  return (data ?? []).map((row: any) => {
    const profile = row.stylist_profiles
    const user = profile.users
    return {
      id: profile.id,
      user_id: profile.user_id,
      bio: profile.bio,
      average_rating: profile.average_rating,
      total_reviews: profile.total_reviews,
      service_area: profile.service_area,
      service_mode: profile.service_mode,
      specialties: profile.specialties,
      portfolio_images: profile.portfolio_images,
      is_available: profile.is_available,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      city: user.city,
      area: user.area,
      stylist_price: row.stylist_price,
    }
  }).sort((a: StylistForStyle, b: StylistForStyle) => b.average_rating - a.average_rating)
}

/**
 * Fetch a single stylist profile by ID, joined with user data.
 */
export async function getStylistById(id: string): Promise<StylistWithUser | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('stylist_profiles')
    .select(`
      id,
      user_id,
      bio,
      average_rating,
      total_reviews,
      service_area,
      service_mode,
      specialties,
      portfolio_images,
      is_available,
      users!inner (
        full_name,
        avatar_url,
        city,
        area
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching stylist:', error)
    return null
  }

  const user = (data as any).users
  return {
    id: data.id,
    user_id: data.user_id,
    bio: data.bio,
    average_rating: data.average_rating,
    total_reviews: data.total_reviews,
    service_area: data.service_area,
    service_mode: data.service_mode,
    specialties: data.specialties,
    portfolio_images: data.portfolio_images,
    is_available: data.is_available,
    full_name: user.full_name,
    avatar_url: user.avatar_url,
    city: user.city,
    area: user.area,
  }
}

/**
 * Fetch styles offered by a specific stylist, with hairstyle details.
 */
export async function getStylesForStylist(stylistId: string): Promise<StyleForStylist[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('stylist_styles')
    .select(`
      id,
      hairstyle_id,
      stylist_price,
      hairstyles!inner (
        name,
        category,
        images,
        duration_hrs,
        price_min,
        price_max
      )
    `)
    .eq('stylist_id', stylistId)

  if (error) {
    console.error('Error fetching styles for stylist:', error)
    return []
  }

  return (data ?? []).map((row: any) => {
    const style = row.hairstyles
    return {
      id: row.id,
      hairstyle_id: row.hairstyle_id,
      stylist_price: row.stylist_price,
      hairstyle_name: style.name,
      hairstyle_category: style.category,
      hairstyle_images: style.images,
      hairstyle_duration: style.duration_hrs,
      hairstyle_price_min: style.price_min,
      hairstyle_price_max: style.price_max,
    }
  })
}

/**
 * Fetch reviews for a stylist, joined with client user data.
 */
export async function getReviewsForStylist(stylistId: string): Promise<ReviewWithClient[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      id,
      rating,
      comment,
      created_at,
      users!reviews_client_id_fkey (
        full_name,
        avatar_url
      )
    `)
    .eq('stylist_id', stylistId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  return (data ?? []).map((row: any) => {
    const client = row.users
    return {
      id: row.id,
      rating: row.rating,
      comment: row.comment,
      created_at: row.created_at,
      client_name: client.full_name,
      client_avatar: client.avatar_url,
    }
  })
}
