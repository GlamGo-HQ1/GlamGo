/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)

  const category = searchParams.get('category')
  const area = searchParams.get('area')
  const available = searchParams.get('available')
  const sort = searchParams.get('sort') ?? 'rating'

  let query = supabase
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

  // Filter by availability
  if (available === 'true') {
    query = query.eq('is_available', true)
  }

  // Sort
  if (sort === 'rating') {
    query = query.order('average_rating', { ascending: false })
  } else if (sort === 'reviews') {
    query = query.order('total_reviews', { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stylists' },
      { status: 500 }
    )
  }

  // Flatten results
  const stylists = (data ?? []).map((row: any) => {
    const user = row.users
    return {
      id: row.id,
      user_id: row.user_id,
      bio: row.bio,
      average_rating: row.average_rating,
      total_reviews: row.total_reviews,
      service_area: row.service_area,
      service_mode: row.service_mode,
      specialties: row.specialties,
      portfolio_images: row.portfolio_images,
      is_available: row.is_available,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      city: user.city,
      area: user.area,
    }
  }).filter((stylist: any) => {
    // Filter by area if provided
    if (area && stylist.service_area) {
      return stylist.service_area.some((a: string) =>
        a.toLowerCase().includes(area.toLowerCase())
      )
    }
    return true
  }).filter((stylist: any) => {
    // Filter by category (specialty) if provided
    if (category && stylist.specialties) {
      return stylist.specialties.some((s: string) =>
        s.toLowerCase().includes(category.toLowerCase())
      )
    }
    return true
  })

  return NextResponse.json(stylists)
}
