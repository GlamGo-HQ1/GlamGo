# GlamGo — Product Decisions ✅ ALL LOCKED

All 7 decisions confirmed. Build can start.

---

## Decision 1: Booking Flow ✅

**Locked: Option A** — Client books → pays → stylist gets notified → accepts/declines.

Payment happens before stylist receives client contact details. Prevents off-platform bypass.

---

## Decision 2: Who Travels? ✅

**Locked: Both** — Stylist sets what they offer in their profile ("I come to you" / "You come to me" / "Both"). Client picks from available options at booking.

**V1 scope:** Display as a badge on stylist profile only. Price differentiation in V2.

---

## Decision 3: GlamGo Commission ✅

**Locked: 15% from stylist + small booking fee from client.**

- GlamGo takes **15%** from each completed booking (deducted from stylist payout)
- Client pays a **small booking fee** (flat amount, to be defined — e.g. ₦200–₦500) on top of service price
- This is standard marketplace rate and gives GlamGo dual revenue streams

---

## Decision 4: Cancellation Policy ✅

**Locked: Proposed rules confirmed.**

| Scenario | Rule |
| --- | --- |
| Client cancels > 24hrs before | Full refund to wallet |
| Client cancels < 24hrs before | 50% to wallet, 50% to stylist |
| Client cancels < 2hrs before | No refund, full payment to stylist |
| Stylist cancels anytime | Full refund to client + stylist warning |
| Stylist no-show | Full refund + stylist ranking penalty |
| Client no-show | Stylist keeps payment |

---

## Decision 5: Completion Confirmation ✅

**Locked: 4-digit code + 24hr auto-release.**

- App shows client a 4-digit code after appointment time
- Stylist enters code to trigger payment release
- If neither party acts within 24hrs, payment auto-releases to stylist
- Documented in `USER_FLOWS.md`

---

## Decision 6: Google Maps API ✅

**Locked: Yes — include in V1.**

- Free tier: $200/month credit (~28,000+ requests) — sufficient for hackathon
- Shows nearest verified stylists on a map
- Big wow factor for judges

---

## Decision 7: Visual Direction ✅

**Locked: Dark Luxury Editorial.**

- Near-black backgrounds, warm gold accent (`#C9A96E`), Playfair Display + DM Sans typography
- Full details: `VISUAL_DIRECTION.md`
- All implementation tokens: `DESIGN_SYSTEM.md`
