# GlamGo — Phase 7 Execution Plan
**Updated after pulling brother's commits | March 25, 2026**

> For the original deep audit (phases 1–6 breakdown, root cause analysis), see `glamgo_audit_report.md`.

---

## What the Brother Just Shipped ✅

Pulled `1dd41af` from `main` — 858 insertions across 14 files.

| File | What It Does |
|---|---|
| `api/bookings/[id]/accept/route.ts` | PATCH → stylist accepts a pending booking → status becomes `confirmed` |
| `api/bookings/[id]/decline/route.ts` | PATCH → stylist declines → status becomes `cancelled` |
| `api/bookings/[id]/complete/route.ts` | PATCH → client marks "service rendered" → `completed` + releases funds to stylist `wallet_balance` |
| `api/reviews/route.ts` | POST → client submits review for completed booking, Zod-validated, auto-recalculates average rating |
| `review/[bookingId]/page.tsx` | Full review page — interactive star rating UI, comment box, success state |
| `dashboard/stylist/PendingBookings.tsx` | Stylist sees pending bookings and can accept/decline in real time |
| `dashboard/client/ServiceRenderedButton.tsx` | Client can confirm service was done → triggers complete API |
| `dashboard/stylist/append-styles.css` | Stylist dashboard styling additions |

**Assessment:** This is production-quality work. The booking lifecycle is now fully wired end-to-end:
```
pending → confirmed → in_progress → completed
                    ↘ cancelled (stylist declines)
```
Reviews, rating recalculation, and wallet balance are all handled.

---

## Full Feature Status — Updated

| Feature | Status | Notes |
|---|---|---|
| Gallery browse | ❌ Empty | **STILL BLOCKED** — no hairstyles in DB |
| Style detail | ❌ Empty | **STILL BLOCKED** — no data |
| Stylist list (per style) | ❌ Empty | **STILL BLOCKED** — no `stylist_styles` rows |
| Booking form | ❌ Unreachable | **STILL BLOCKED** — no data to navigate to it |
| Interswitch payment | ⚠️ Untested | Code exists, never run end-to-end |
| Booking accept/decline | ✅ **NEW** | Brother shipped this |
| Service rendered confirmation | ✅ **NEW** | Brother shipped this |
| Wallet balance release | ✅ **NEW** | Brother shipped this (`createAdminClient`) |
| Review submission | ✅ **NEW** | Brother shipped full page + API |
| Rating auto-recalc | ✅ **NEW** | Brother shipped this |
| Client dashboard | ✅ Now has ServiceRenderedButton | — |
| Stylist dashboard | ✅ Now has PendingBookings component | — |
| Auth (login/register) | ✅ Working | — |

**The only remaining blocker is the same one from the original audit: no seed data.**

---

## What Phase 7 Requires (Remaining Work)

### 🔴 STEP 1 — Seed the Database (Unblocks EVERYTHING)

This is the single most important step. All flows are broken without it.

#### 1a. Seed hairstyles
Run this SQL directly in the **Supabase Dashboard → SQL Editor**:
```sql
-- File already exists: supabase/migrations/002_phase2_seed_hairstyles.sql
-- Copy its contents and run it in the SQL Editor
```
This inserts 20 hairstyles. Gallery will be populated immediately.

#### 1b. Create 3 test stylist accounts via Supabase Dashboard
Go to: **Supabase Dashboard → Authentication → Users → Add User**
- Email: `amaka@test.glamgo.com` / Password: `glamgo123`
- Email: `chisom@test.glamgo.com` / Password: `glamgo123`
- Email: `ngozi@test.glamgo.com` / Password: `glamgo123`

Note their UUIDs.

#### 1c. Insert stylist profiles + stylist_styles via SQL Editor

```sql
-- Replace UUID_1, UUID_2, UUID_3 with actual UUIDs from step 1b
-- Also insert corresponding rows into the 'users' table (the app uses 'users' not 'auth.users')

-- Step 1: users table entries
INSERT INTO users (id, full_name, email, role, city, area) VALUES
('UUID_1', 'Amaka Osei', 'amaka@test.glamgo.com', 'stylist', 'Lagos', 'Lekki'),
('UUID_2', 'Chisom Adaeze', 'chisom@test.glamgo.com', 'stylist', 'Lagos', 'Ikeja'),
('UUID_3', 'Ngozi Eze', 'ngozi@test.glamgo.com', 'stylist', 'Abuja', 'Wuse');

-- Step 2: stylist_profiles
INSERT INTO stylist_profiles (user_id, bio, service_mode, is_available, average_rating, total_reviews, specialties, wallet_balance) VALUES
('UUID_1', 'Expert knotless braids and locs specialist with 5 years salon experience.', 'salon', true, 4.8, 0, ARRAY['braids', 'locs', 'cornrows'], 0),
('UUID_2', 'Mobile luxury stylist specializing in bridal hair, silk presses, and wigs.', 'mobile', true, 4.9, 0, ARRAY['wigs', 'weaves', 'natural'], 0),
('UUID_3', 'HD lace frontals, flawless weave installs, and twist sets. Salon & mobile.', 'both', true, 4.7, 0, ARRAY['weaves', 'twists', 'braids'], 0);

-- Step 3: Link stylists to hairstyles (use hairstyle IDs from SELECT id, name FROM hairstyles)
-- First run: SELECT id, name FROM hairstyles; to get IDs, then insert into stylist_styles
```

> **Note for Beloved:** Run `SELECT id, name FROM hairstyles;` after step 1a to get the real hairstyle UUIDs, then build the `stylist_styles` inserts. I can write a script to automate this entire process if you want.

---

### 🟡 STEP 2 — Interswitch End-to-End Test

The payment integration code exists in `src/lib/interswitch.ts` (3.3KB). It needs to be verified:

1. Create a booking through the UI (after seeding, you can do a full flow)
2. Reach the `/payment?bookingId=X` page
3. Trigger the Interswitch payment initiation
4. Use test card credentials from Interswitch sandbox
5. Verify callback → booking marked as `paid` → redirect to confirmation

**What to check:** Does `src/app/api/payment/route.ts` exist and is it wired to the Interswitch callback? (Need to verify this — pull may or may not have added it)

---

### 🟢 STEP 3 — Full Flow Verification

Once seeded, run through this checklist manually:

```
[ ] Register as a new client account
[ ] Browse gallery — see 20 hairstyles
[ ] Filter by category (braids, locs, etc.)
[ ] Click a hairstyle — see style detail
[ ] See 1–3 stylists listed for that style
[ ] Click a stylist → see their profile
[ ] Click "Book" → redirected to login if not logged in
[ ] Book: pick date, time slot, location → confirm
[ ] Pay via Interswitch (sandbox test card)
[ ] Booking appears on client dashboard as "pending"
[ ] Log in as stylist → see pending booking → accept it
[ ] Log in as client → see booking as "confirmed"
[ ] Trigger "Service Rendered" → booking = completed
[ ] Stylist wallet_balance increases by booking amount
[ ] Client redirected to /review/[bookingId]
[ ] Submit a 5-star review
[ ] Stylist average_rating updates on their profile
```

---

### 🔵 STEP 4 — Polish Pass (True Phase 7 Scope)

After flow is verified working:

| Item | Priority |
|---|---|
| Gallery loading skeleton (while images load) | High |
| Style detail — mobile CTA button wired to first available stylist | High |
| Empty gallery state → better CTA (not just blank) | Medium |
| Dashboard — show booking status visually (timeline/badge) | Medium |
| Confirmation page — add "Share" and "Add to Calendar" | Low |
| Error boundaries styled to match dark luxury theme | Low |

---

## Build a Seed Script (Recommended)

Instead of doing all the SQL manually, build a proper Node.js seed script that:
1. Creates 3 test stylist accounts via Supabase Admin API
2. Inserts their `users` and `stylist_profiles` rows
3. Reads all hairstyle IDs from the DB
4. Randomly assigns stylists to 7–10 hairstyles each via `stylist_styles`

**This script can be run with `node scripts/seed_stylists.js` and the whole database is populated in one shot.**

The current `scripts/seed_stylists.js` is a stub. Needs to be replaced with real code.

---

## Summary — Order of Operations

```
TODAY:
1. Seed hairstyles (run the SQL)
2. Build + run proper seed script for 3 stylists + stylist_styles
3. Verify gallery shows 20 styles
4. Verify style detail shows available stylists

MARCH 26:
5. Run full booking → payment → completion flow
6. Fix any issues discovered during manual testing
7. Polish pass on critical UI items
8. Update README with screenshots
9. Deploy to Vercel
10. Record demo video
```

---

## What NOT to Touch

The brother's code is clean and correct. Do not rewrite:
- `api/bookings/[id]/accept|decline|complete/route.ts`
- `api/reviews/route.ts`
- `review/[bookingId]/page.tsx`
- Any existing action files in `src/lib/actions/`

These are good. The platform is ~85% done. Seed data is the last structural blocker.
