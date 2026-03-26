import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getInterswitchToken } from '@/lib/interswitch'

/**
 * Interswitch Requery endpoint
 * Verifies transaction status directly with the Interswitch Gateway,
 * then persists the result to our database (server-side, not client-side).
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const transactionRef = searchParams.get('ref')
    const amountKobo = searchParams.get('amount')
    const bookingId = searchParams.get('bookingId')

    if (!transactionRef || !amountKobo) {
      return NextResponse.json({ error: 'Missing ref or amount' }, { status: 400 })
    }

    const merchantCode = process.env.NEXT_PUBLIC_INTERSWITCH_MERCHANT_CODE!

    // 1. Get auth token
    const token = await getInterswitchToken()

    // 2. Call Interswitch WebPay Requery API (collections endpoint)
    const baseUrl = process.env.NEXT_PUBLIC_INTERSWITCH_ENV === 'LIVE'
      ? 'https://webpay.interswitchng.com'
      : 'https://qa.interswitchng.com'

    const url = `${baseUrl}/collections/api/v1/gettransaction.json?merchantcode=${merchantCode}&transactionreference=${transactionRef}&amount=${amountKobo}`

    console.log('[Requery] Calling:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('[Requery] Failed:', response.status, text)
      // Try to parse JSON error from Interswitch for more detail
      let errorMessage = `Interswitch requery failed (HTTP ${response.status})`
      try {
        const errJson = JSON.parse(text)
        errorMessage = errJson.message || errJson.error?.message || errJson.ResponseDescription || errorMessage
      } catch {
        if (text) errorMessage = text
      }
      return NextResponse.json({ status: 'failed', code: response.status, message: errorMessage }, { status: 200 })
    }

    const data = await response.json()
    console.log('[Requery] Transaction Data:', data)

    if (data.ResponseCode === '00' || data.ResponseCode === '0') {
      // 3. Persist booking state server-side (not left to client)
      if (bookingId) {
        const supabase = createAdminClient()
        const { error } = await supabase
          .from('bookings')
          .update({ payment_status: 'paid', status: 'confirmed' })
          .eq('id', bookingId)
          .eq('payment_status', 'unpaid')

        if (error) {
          console.error('[Requery] DB update failed:', error)
        }
      }

      return NextResponse.json({
        status: 'success',
        amount: data.Amount,
        message: data.ResponseDescription,
      })
    } else {
      return NextResponse.json({
        status: 'failed',
        code: data.ResponseCode,
        message: data.ResponseDescription,
      })
    }
  } catch (error) {
    console.error('[Requery] Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
