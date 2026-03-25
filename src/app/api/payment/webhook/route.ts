import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyWebhookSignature } from '@/lib/interswitch'

/**
 * Interswitch Webhook Handler
 * - MUST return 200 instantly (Interswitch retries up to 5 times otherwise)
 * - MUST verify SHA-512 HMAC signature before trusting the payload
 * - Uses admin client to bypass RLS (webhooks have no user session)
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    const payload = JSON.parse(rawBody)

    // Retrieve the security signature header
    const signature =
      req.headers.get('signature') ||
      req.headers.get('mac') ||
      req.headers.get('x-pay-token')

    if (!signature) {
      console.error('[Webhook] Missing Signature header')
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
    }

    // SHA-512 verification
    if (!verifyWebhookSignature(rawBody, signature)) {
      console.error('[Webhook] Invalid SHA-512 signature — rejecting.')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Payload is trusted from this point.
    console.log('[Webhook] Valid payload:', payload.txnRef)

    const isSuccess =
      payload.responseCode === '00' ||
      payload.resp === '00'

    if (isSuccess) {
      // Use admin client — webhooks have no user session, so RLS would block anon client
      const supabase = createAdminClient()
      const txnRef = payload.txnRef || payload.transactionRef

      if (txnRef) {
        const { error } = await supabase
          .from('bookings')
          .update({ payment_status: 'paid', status: 'confirmed' })
          .eq('notes', txnRef)
          .eq('payment_status', 'unpaid')

        if (error) {
          console.error('[Webhook] DB update failed:', error)
        }
      }
    }

    // Always return 200 to stop retries
    return NextResponse.json({ status: 'received' }, { status: 200 })
  } catch (err) {
    console.error('[Webhook] Processing error:', err)
    // Still return 200 so Interswitch doesn't keep retrying a crash
    return NextResponse.json({ status: 'received' }, { status: 200 })
  }
}
