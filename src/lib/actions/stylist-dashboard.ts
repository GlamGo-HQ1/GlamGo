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

/* ─── Upload an Evidence Image ─── */
export async function uploadEvidenceImage(
  formData: FormData
): Promise<{ error?: string; url?: string }> {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Not authenticated' }

  const stylistProfileId = await getStylistProfileId(user.id)
  if (!stylistProfileId) return { error: 'No stylist profile found' }

  const file = formData.get('file') as File
  if (!file) return { error: 'No file provided' }

  const fileExt = file.name.split('.').pop() || 'jpg'
  // Use timestamp for uniqueness
  const fileName = `${stylistProfileId}-${Date.now()}.${fileExt}`
  
  const { error: uploadError } = await supabase
    .storage
    .from('portfolios')
    .upload(fileName, file)

  if (uploadError) return { error: `Storage error: ${uploadError.message}` }

  const { data: { publicUrl } } = supabase
    .storage
    .from('portfolios')
    .getPublicUrl(fileName)

  // Append to array in DB
  const { data: profile } = await supabase
    .from('stylist_profiles')
    .select('portfolio_images')
    .eq('id', stylistProfileId)
    .single()

  const existingImages = profile?.portfolio_images || []
  const newImages = [...existingImages, publicUrl]

  const { error: updateError } = await supabase
    .from('stylist_profiles')
    .update({ portfolio_images: newImages })
    .eq('id', stylistProfileId)

  if (updateError) return { error: `DB error: ${updateError.message}` }

  revalidatePath('/dashboard/stylist/services')
  return { url: publicUrl }
}

/* ─── Delete an Evidence Image ─── */
export async function deleteEvidenceImage(imageUrl: string): Promise<{ error?: string }> {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Not authenticated' }

  const stylistProfileId = await getStylistProfileId(user.id)
  if (!stylistProfileId) return { error: 'No stylist profile found' }

  const { data: profile } = await supabase
    .from('stylist_profiles')
    .select('portfolio_images')
    .eq('id', stylistProfileId)
    .single()

  const existingImages = profile?.portfolio_images || []
  const newImages = existingImages.filter((url: string) => url !== imageUrl)

  const { error: updateError } = await supabase
    .from('stylist_profiles')
    .update({ portfolio_images: newImages })
    .eq('id', stylistProfileId)

  if (updateError) return { error: updateError.message }

  // Clean up from bucket
  const pathParts = imageUrl.split('/')
  const fileName = pathParts[pathParts.length - 1]
  
  if (fileName) {
    await supabase.storage.from('portfolios').remove([fileName])
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


