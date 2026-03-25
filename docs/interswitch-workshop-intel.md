# Interswitch API — Workshop Intel Reference

> **Source:** Enyata × Interswitch Hackathon Workshop (Pre-build session)
> **Logged:** 2026-03-25
> **Purpose:** Quick-reference for Phase 6 (Payment Integration)

---

## Credentials Required (QuickTeller Business)

Register as **"Start-up business"** to bypass KYC for sandbox testing.

| Credential | Where to Get |
| --- | --- |
| Merchant Code | QTB Developer Console |
| Pay Item ID (Payable Code) | QTB Developer Console |
| Client ID | QTB Developer Console |
| Client Secret | QTB Developer Console |

**Token Generation:**
- Endpoint: Passport URL
- Grant type: `client_credentials`
- Content type: `x-www-form-urlencoded`
- Scope: `profile`
- **Tokens expire in 1 hour** — build refresh logic

---

## Web Checkout (Our Integration Path)

Two methods available:

| Method | Behavior | Our Choice |
| --- | --- | --- |
| **Inline** | Popup stays on our site | ✅ Use this — better UX for demo |
| **Redirect** | Navigates to Interswitch gateway page | Fallback option |

---

## Payment Verification

Two mechanisms (implement both for reliability):

1. **Webhooks** — Real-time POST notification on payment status change
2. **Requery Endpoint** — Manual "check transaction status" call as fallback

---

## GlamGo "Escrow" Strategy

> [!IMPORTANT]
> Interswitch does NOT offer an escrow API. Our escrow is simulated internally.

**Flow:**
1. Client pays → Real Interswitch inline checkout → Money lands in our QTB merchant account
2. Booking status updated: `pending` → `confirmed`, `payment_status` → `paid`
3. Service completed → Internal DB update: increment stylist `wallet_balance`
4. Declined bookings → Internal wallet credit to client (no real API refund)

**This is fully compliant with hackathon rules.**

---

## Known Sandbox Bugs (As of Workshop)

| Bug | Status |
| --- | --- |
| Test cards unexpectedly requesting OTP | Being fixed by Interswitch team |
| API Marketplace wallet debits failing in UAT | Fix scheduled, troubleshooting session Monday 4 PM |

---

## Bonus APIs Available (Non-Critical Path)

| API | Potential Use in GlamGo | Priority |
| --- | --- | --- |
| NIN/BVN Identity Verification | "Verified Stylist" trust badge | Nice-to-have (Phase 8) |
| Facial Comparison | Stylist identity match | Skip |
| WhatsApp Messaging | Booking confirmation via WhatsApp | Nice-to-have (Phase 8) |
| VAS (Airtime, Bills, etc.) | Not relevant | Skip |
| Payout API (upcoming) | Transfer wallet funds to bank | Monitor availability |

---

## Judging Criteria (For Demo Prep)

1. **Problem Relevance** — Real pain point for Africans/Nigerians
2. **Technical Execution** — Build works + Interswitch APIs integrated
3. **User Experience** — Intuitive and user-friendly
4. **Innovation** — Changes how things are traditionally done
5. **Completeness** — Ready for Demo Day

> [!CAUTION]
> Demo Day is **in-person and physical**. Disqualification if not attending (virtual exception only for Anambra, Enugu, Imo communities).

---

## Quick Checklist Before Phase 6

- [ ] Register on QuickTeller Business as "Start-up business"
- [ ] Obtain Merchant Code, Pay Item ID, Client ID, Client Secret
- [ ] Add credentials to `.env.local`
- [ ] Test token generation with Passport URL
- [ ] Confirm inline checkout loads in sandbox
