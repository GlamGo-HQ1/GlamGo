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
