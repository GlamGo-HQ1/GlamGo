# GlamGo — Backend Developer Guide

Welcome to GlamGo. This guide tells you exactly what your role is, what to focus on, and where everything lives.

---

## Your Role

You are the **Backend & Payment Engineer**. Your primary responsibilities:

1. **Interswitch Payment Integration** — The mandatory API integration for the hackathon
2. **Supabase Backend** — Database schema, RLS policies, API routes
3. **Booking Logic** — The server-side flow for booking creation, confirmation, and wallet operations
4. **Auth Configuration** — Supabase Auth setup (client vs stylist roles)

You are NOT responsible for: landing page design, gallery UI, animations, Spline 3D, or CSS styling.

---

## Read These First

Before writing any code, read these files in order:

| # | File | Why |
|---|---|---|
| 1 | `PRODUCT_VISION.md` | Understand the full product — V1 and V2 |
| 2 | `PRODUCT_DECISIONS.md` | See the open decisions that affect your work |
| 3 | `PRE_HACKATHON_PLAN.md` | Your day-by-day schedule |
| 4 | `competition/INTERSWITCH_GUIDE.md` | The payment API you're integrating |
| 5 | `competition/COMPETITION_RULES.md` | Hackathon rules and judging criteria |
| 6 | `context/ARCHITECTURE_CONTEXT.md` | System architecture and data flow |
| 7 | `context/CODING_STANDARDS.md` | How we write code in this project |
| 8 | `.agents/skills/interswitch-payment.md` | Payment integration specifics |
| 9 | `.agents/skills/skill-api-backend-glamgo.md` | Your niched-down API skill |

---

## Tech Stack (Your Domain)

| Layer | Tool | Notes |
|---|---|---|
| **Database** | Supabase (PostgreSQL) | Hosted, real-time subscriptions |
| **Auth** | Supabase Auth | Email + Google OAuth, role-based (client/stylist) |
| **API Routes** | Next.js 14 Route Handlers | `app/api/` directory |
| **Payments** | Interswitch API | Mandatory integration for the competition |
| **ORM** | Supabase JS Client | `@supabase/supabase-js` |
| **Validation** | Zod | All inputs validated server-side |
| **Language** | TypeScript | Strict mode |

---

## Your Day-by-Day (Hackathon)

### Day 1 (March 23) — Foundation

- [ ] Set up Supabase project (if not already done)
- [ ] Create database schema (users, styles, stylists, bookings, transactions, wallets)
- [ ] Set up Row Level Security (RLS) policies
- [ ] Configure Supabase Auth (email + Google, client vs stylist roles)
- [ ] Seed database with test hairstyle data
- [ ] Create basic API route structure in `app/api/`

### Day 2 (March 24) — Gallery Backend + Profiles

- [ ] API: `GET /api/styles` — list styles with filters
- [ ] API: `GET /api/styles/[id]` — single style detail
- [ ] API: `GET /api/stylists` — list stylists with availability
- [ ] API: `GET /api/stylists/[id]` — stylist profile + portfolio
- [ ] Help frontend team connect gallery to real data

### Day 3 (March 25) — Booking + Payment (YOUR BIG DAY)

- [ ] API: `POST /api/bookings` — create booking + trigger Interswitch payment
- [ ] API: `POST /api/payments/callback` — Interswitch webhook handler
- [ ] API: `POST /api/bookings/[id]/accept` — stylist accepts booking
- [ ] API: `POST /api/bookings/[id]/confirm` — client enters confirmation code
- [ ] Wallet logic: deposits, refunds, payouts
- [ ] Auto-cancel logic (30 min timeout for stylist response)
- [ ] Test full payment flow end-to-end in sandbox

### Day 4 (March 26) — Polish + Dashboard APIs

- [ ] API: `GET /api/dashboard/client` — client's bookings, wallet balance
- [ ] API: `GET /api/dashboard/stylist` — incoming requests, earnings, calendar
- [ ] Bug fixes, error handling, edge cases
- [ ] Help with demo prep — ensure payment flow works for live demo

---

## Payment Flow (Your Implementation)

```
1. Frontend calls POST /api/bookings (style_id, stylist_id, time_slot, service_mode)
2. Backend creates booking record (status: "pending_payment")
3. Backend calls Interswitch API to create payment request
4. Backend returns Interswitch redirect URL to frontend
5. Client redirected to Interswitch payment page
6. Client pays → Interswitch calls POST /api/payments/callback
7. Backend verifies payment → updates booking (status: "pending_stylist")
8. Backend credits wallet → sends notification to stylist
9. Stylist calls POST /api/bookings/[id]/accept → booking (status: "confirmed")
10. Both parties get contact info
11. After service: client calls POST /api/bookings/[id]/confirm with 4-digit code
12. Backend deducts GlamGo commission → credits stylist wallet
```

---

## Database Tables You'll Create

```sql
-- Core tables (you build these)
users (id, email, role, full_name, phone, avatar_url, wallet_balance_kobo, created_at)
styles (id, name, category, description, price_kobo, duration_minutes, images, created_at)
stylists (id, user_id, specialties, service_mode, travel_fee_kobo, location_area, bio, rating, review_count)
bookings (id, client_id, stylist_id, style_id, time_slot, service_mode, amount_kobo, status, confirmation_code, created_at)
transactions (id, user_id, type, amount_kobo, reference, description, created_at)
reviews (id, booking_id, client_id, stylist_id, rating, comment, created_at)
```

---

## Key Rules

1. **Never expose Interswitch secret keys** to the frontend — all payment logic is server-side
2. **Validate every input** with Zod before processing
3. **Use RLS** — clients can only see their own bookings, stylists can only see theirs
4. **Wallet amounts in kobo** (₦1 = 100 kobo) — no floating point for money
5. **Environment variables** for all secrets — `.env.local` only
6. **Commit often** — use the format in `.agents/templates/commit-template.md`

---

## Questions? Ask the Team

If you're unsure about a decision, check `PRODUCT_DECISIONS.md` first. If it's not covered there, ask the team before building.
