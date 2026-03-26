import crypto from 'crypto'

/**
 * Interswitch Payment Gateway Integration
 * Author: Oviks Israel (oyewolebb29@gmail.com)
 * 
 * Note on Credentials:
 * - OAuth flow uses CLIENT_ID and SECRET_KEY
 * - Inline Webpay uses MERCHANT_CODE and PAY_ITEM_ID
 * - 'Data ref' from the dashboard is used for legacy MAC hashing, which is 
 *   bypassed here in favor of the more secure OAuth 2.0 Passport tokens.
 */

// ── Constants ──────────────────────────────────────────────────────────
const INTERSWITCH_ENV = process.env.NEXT_PUBLIC_INTERSWITCH_ENV || 'TEST'
const CLIENT_ID      = process.env.INTERSWITCH_CLIENT_ID!
const SECRET_KEY     = process.env.INTERSWITCH_SECRET_KEY!

const PASSPORT_URL = INTERSWITCH_ENV === 'TEST'
  ? 'https://qa.interswitchng.com/passport/oauth/token'
  : 'https://passport.interswitchng.com/passport/oauth/token'

// ── Token cache (in-memory, per cold-start) ────────────────────────────
let cachedToken: string | null = null
let tokenExpiryTime: number | null = null

export interface InterswitchTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}

/**
 * Gets a valid OAuth Bearer token from Interswitch.
 * Caches the token in memory and refreshes 5 minutes before expiry.
 */
export async function getInterswitchToken(): Promise<string> {
  if (cachedToken && tokenExpiryTime && Date.now() < tokenExpiryTime - 5 * 60 * 1000) {
    return cachedToken
  }

  const encodedAuth = Buffer.from(`${CLIENT_ID}:${SECRET_KEY}`).toString('base64')

  const response = await fetch(PASSPORT_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const text = await response.text()
    console.error('[Interswitch] Token fetch failed:', response.status, text)
    throw new Error(`Interswitch token request failed (${response.status})`)
  }

  const data: InterswitchTokenResponse = await response.json()

  cachedToken = data.access_token
  tokenExpiryTime = Date.now() + data.expires_in * 1000

  console.log(`[Interswitch] New token acquired. Expires in ${data.expires_in}s.`)
  return cachedToken
}

/**
 * Generate a unique, URL-safe transaction reference.
 * Format: GLAMGO-<timestamp>-<random>
 */
export function generateTransactionReference(): string {
  const timestamp = Date.now().toString()
  const random = crypto.randomBytes(3).toString('hex').toUpperCase()
  return `GLAMGO-${timestamp}-${random}`
}

/**
 * Verify the SHA-512 HMAC signature sent by Interswitch in webhook headers.
 *
 * @param rawBody  The raw request body string (NOT parsed JSON).
 * @param signatureHeader  The value of the Signature header from the request.
 * @returns true if the hash matches.
 */
export function verifyWebhookSignature(rawBody: string, signatureHeader: string): boolean {
  try {
    const calculated = crypto
      .createHmac('sha512', SECRET_KEY)
      .update(rawBody, 'utf8')
      .digest('hex')

    // Constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(calculated, 'hex'),
      Buffer.from(signatureHeader.toLowerCase(), 'hex')
    )
  } catch {
    console.error('[Interswitch] Webhook signature verification error')
    return false
  }
}

/**
 * Send a WhatsApp notification using the Interswitch WhatsApp OTP API.
 * 
 * Note: In the Sandbox environment, this may return a 409 "User wallet not found" 
 * error if the API Marketplace wallet is not funded. We catch and log this error
 * to ensure the booking flow is not interrupted during hackathon testing.
 */
export async function sendBookingWhatsApp({
  phone,
  code,
  action,
  service
}: {
  phone: string;
  code: string;
  action: string;
  service: string;
}) {
  try {
    const token = await getInterswitchToken()
    
    // Use the QA endpoint for Sandbox testing
    const url = INTERSWITCH_ENV === 'TEST'
      ? 'https://qa.interswitchng.com/api/v1/whatsapp/auth/send'
      : 'https://api-marketplace-routing.k8.isw.la/marketplace-routing/api/v1/whatsapp/auth/send' // Would be replaced with Production URL

    console.log(`[WhatsApp] Sending notification to ${phone} for action: ${action}...`)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: phone, // e.g. +2348012345678
        code: code,
        action: action,
        service: service,
        channel: 'phone'
      })
    })

    if (!response.ok) {
      const text = await response.text()
      console.warn(`[WhatsApp API Warning] Ignored delivery failure (HTTP ${response.status}):`, text)
      return { success: false, error: text }
    }

    const data = await response.json()
    console.log('[WhatsApp API Success] Message sent successfully:', data)
    return { success: true, data }
    
  } catch (error) {
    console.error('[WhatsApp API Error] Network request failed:', error)
    return { success: false, error: String(error) }
  }
}
