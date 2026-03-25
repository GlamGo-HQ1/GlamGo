# Interswitch API — Workshop Intel Reference

> **Source:** Enyata × Interswitch Hackathon Workshop (Pre-build session)
> **Logged:** 2026-03-25
> **Purpose:** Quick-reference for Phase 6 (Payment Integration)

---

## 1. Credentials Required (QuickTeller Business)

Register as **"Start-up business"** to bypass KYC for sandbox testing.

| Credential | Where to Get | Purpose |
| --- | --- | --- |
| Merchant Code | QTB Developer Console | Identifies your merchant account |
| Pay Item ID (Payable Code) | QTB Developer Console | Controls payment methods (Card/Transfer) |
| Client ID | QTB Developer Console | API Authentication |
| Client Secret | QTB Developer Console | API Authentication |

---

## 2. Authentication Architecture (Mandatory)

You CANNOT pass raw `Client ID` and `Client Secret` to every endpoint. You must generate a **Bearer Token** first.

*   **OAuth Pattern:** `CLIENT_ID:CLIENT_SECRET` must be concatenated and **Base64 Encoded**.
*   **Token Endpoint:** Pass the encoded string as `Authorization: Basic <base64>` to `/passport/oauth/token` using `grant_type=client_credentials`.
*   **Expiration:** 
    *   API Marketplace Tokens = 1 Hour
    *   Passport Tokens (QuickTeller Business) = 24 Hours
*   *Implementation Note:* We must build a `getInterswitchToken()` utility that caches the token and refreshes it before it expires.

---

## 3. Web Checkout (Our Integration Path)

Two primary methods available:
1.  **Inline (Popup):** Keeps the user on our site dynamically generating the payment modal. (✅ **We are using this** for better UX).
2.  **Redirect:** Navigates away from our site to the Interswitch Gateway.

**Payables Configuration:** 
Interswitch uses "payable codes" to lock down methods. We need to grab a Payable Code that allows **both Card and Transfer**.

> [!WARNING]
> The **"Exact Amount" Validation Rule** applies heavily to Transfers. If the customer transfers 1 kobo more or less than the required amount into the virtual account, the transaction automatically bounces/fails. We MUST show a warning UI to the user before they transfer.

---

## 4. Webhook Security (Crucial for Judges)

Since the actual transfer happens via the customer's bank app outside our control, we rely on Webhooks for status updates.

1.  **Retry Logic:** Interswitch retries webhooks 5 times. Our `/api/payment/webhook` route MUST return `HTTP 200 OK` instantly to acknowledge receipt.
2.  **SHA-512 Security Hash:** Interswitch hashes the webhook payload using SHA-512 and a Secret Key, passing it in a `Signature` header.
    *   *Implementation Note:* We MUST hash the incoming JSON with our Secret Key and compare it to the `Signature` header before updating our Supabase database. If they don't match, we reject with `401 Unauthorized` to prevent fraud.

---

## 5. GlamGo "Escrow" Strategy 

> [!IMPORTANT]
> Interswitch does NOT offer a native escrow API. Our escrow is simulated internally.

**Flow:**
1. Client pays → Real Interswitch inline checkout → Money lands in our QTB merchant account
2. Booking status updated: `pending` → `confirmed`, `payment_status` → `paid`
3. Service completed → Internal DB update: increment stylist `wallet_balance`
4. Declined bookings → Internal wallet credit to client (no real API refund)

**This is fully compliant with hackathon rules.**

---

## 6. Known Sandbox Bugs (As of Workshop)

| Bug | Status |
| --- | --- |
| Test cards unexpectedly requesting OTP | Being fixed by Interswitch team |
| API Marketplace wallet debits failing in UAT | Fix scheduled, troubleshooting session Monday 4 PM |
