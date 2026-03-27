'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'


/* ─── Types ─── */

export interface GlobalHairstyle {
  id: string
  name: string
  category: string
  images: string[] | null
  price_min: number | null
  price_max: number | null
}

/* ─── Fetch the full global catalog grouped by category ─── */
export async function getGlobalCatalog(): Promise<GlobalHairstyle[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('hairstyles')
    .select('id, name, category, images, price_min, price_max')
    .order('category', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching global catalog:', error)
    return []
  }

  return data ?? []
}

/* ─── Get hairstyle IDs the stylist has already claimed ─── */
export async function getStylistClaimedIds(stylistProfileId: string): Promise<string[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('stylist_styles')
    .select('hairstyle_id')
    .eq('stylist_id', stylistProfileId)

  if (error) {
    console.error('Error fetching claimed styles:', error)
    return []
  }

  return (data ?? []).map((row) => row.hairstyle_id)
}

/* ─── Claim a hairstyle (stylist says "I can do this") ─── */
export async function claimHairstyle(
  stylistProfileId: string,
  hairstyleId: string,
  price: number
): Promise<{ error?: string }> {
  const supabase = createClient()

  const { error } = await supabase
    .from('stylist_styles')
    .upsert(
      {
        stylist_id: stylistProfileId,
        hairstyle_id: hairstyleId,
        stylist_price: price,
      },
      { onConflict: 'stylist_id,hairstyle_id' }
    )

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/stylist/services')
  revalidatePath(`/stylists`)
  return {}
}

/* ─── Remove a claimed hairstyle ─── */
export async function removeClaimedHairstyle(
  stylistProfileId: string,
  hairstyleId: string
): Promise<{ error?: string }> {
  const supabase = createClient()

  const { error } = await supabase
    .from('stylist_styles')
    .delete()
    .eq('stylist_id', stylistProfileId)
    .eq('hairstyle_id', hairstyleId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/stylist/services')
  return {}
}

/* ─── Get stylist profile ID from user ID ─── */
export async function getStylistProfileId(userId: string): Promise<string | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('stylist_profiles')
    .select('id')
    .eq('user_id', userId)
    .single()

  if (error || !data) return null
  return data.id
}


