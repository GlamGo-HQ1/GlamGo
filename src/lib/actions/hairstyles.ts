'use server'

import { createClient } from '@/lib/supabase/server'
import type { Tables, Enums } from '@/lib/database.types'

export type Hairstyle = Tables<'hairstyles'>
export type HairstyleCategory = Enums<'hairstyle_category'>

/**
 * Fetch hairstyles with optional category and search filters.
 * Results are ordered by trending first, then alphabetically.
 */
export async function getHairstyles(
  category?: HairstyleCategory | null,
  search?: string | null
): Promise<Hairstyle[]> {
  const supabase = createClient()

  let query = supabase
    .from('hairstyles')
    .select('*')
    .order('is_trending', { ascending: false })
    .order('name', { ascending: true })

  if (category) {
    query = query.eq('category', category)
  }

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching hairstyles:', error)
    return []
  }

  return data ?? []
}

/**
 * Fetch a single hairstyle by ID.
 * Returns null if not found.
 */
export async function getHairstyleById(id: string): Promise<Hairstyle | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('hairstyles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching hairstyle:', error)
    return null
  }

  return data
}
