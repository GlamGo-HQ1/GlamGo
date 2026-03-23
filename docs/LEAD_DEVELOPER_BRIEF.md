# 🏗️ Lead Developer Brief: Overcomer
**Project:** GlamGo (Hackathon Build)
**Role:** Lead Developer (Architecture, Backend, Core Logic)

## Your Mission
While Beloved (Product Engineer) focuses on the premium UI/UX, animations, and front-end polish, **your job is to build the engine.** You are responsible for the data structure, security, user authentication, and the core transaction flow (booking -> finding location -> payment via Interswitch).

**Tech Stack:** Next.js 14 (App Router), Supabase (Postgres Database, Auth, Storage), Interswitch API, Google Maps API.

---

## 🚀 Your Execution Sequence (Order Matters)

You must build these phases in exact order. Do not skip ahead.

### Phase 1: The Foundation (2 hours)
1. **Initialize Project:** Create the Next.js 14 app (`npx create-next-app@latest`).
2. **Setup Supabase:** Install `@supabase/supabase-js`, `@supabase/ssr`. Configure `.env.local` with your Supabase URL and Anon Key.
3. **Core Shell:** Create the basic `layout.tsx`, global CSS, and a skeleton `Navbar` and `Footer`.
4. **Deploy:** Push the empty shell to Vercel immediately to ensure CI/CD and environment variables are working from minute one.

### Phase 2: Database & Global Memory (2 hours)
*You are building the brain in Supabase.*
1. **Tables:** Create `users`, `stylist_profiles`, `hairstyles`, `stylist_styles` (junction), `bookings`, and `reviews`.
2. **Security:** Setup Row Level Security (RLS) policies.
3. **Storage:** Create Supabase Storage buckets for `hairstyle-images` and `portfolio`.
4. **Seed Data:** Inject dummy data (3-5 fake stylists, 20 hairstyles) so building the UI isn't blocked.

### Phase 3: Authentication (2 hours)
1. **Supabase Auth:** Enable Email/Password.
2. **Middleware:** Write Next.js middleware to protect `/dashboard` and `/booking` routes.
3. **Role Logic:** Build the registration flow that distinguishes between a **Client** (just needs a basic profile) and a **Stylist** (needs a portfolio, service area, and specialties setup).

### Phase 4: Data Fetching (Parallel with UI)
*Beloved handles the styling; you handle the data pipes.*
1. **Gallery API:** Write the Server Components or API routes to fetch hairstyles and filter them by category (Braids, Locs, etc.).
2. **Stylist Query:** Write the logic to find "Stylists who do THIS style in THIS area."

### Phase 5: The Booking Engine (3 hours)
1. **Form Logic:** Build the data collection for Date, Time Slot, and Location.
2. **Google Maps Integration:** Implement the Google Maps Places Autocomplete API for the client's address.
3. **Database Write:** Create the pending booking record in the `bookings` table with a generated 4-digit Confirmation Code.

### Phase 6: Interswitch Payment (4 hours)
*This is the core differentiator. It must work perfectly.*
1. **Setup:** Get Interswitch Sandbox API keys.
2. **Initiate:** Write the `POST /api/payment/initiate` route to generate the transaction reference, amount, and hash, then redirect to the Interswitch hosted page.
3. **Verify:** Write the `GET /api/payment/verify` route (the callback). Confirm status with Interswitch, then update the booking in Supabase from `pending` to `paid`.

### Phase 7: Dashboards & Logic (3 hours)
1. **Client View:** Fetch upcoming/past bookings. Display the 4-digit confirmation code. Add a "Service Rendered" button.
2. **Stylist View:** Fetch incoming requests. Add an input field for the Stylist to enter the 4-digit code to start the job.
3. **Review System:** Build the POST route to submit a rating and update the stylist's average score.

---

## 🛑 Golden Rules for Overcomer
1. **No "Coming Soon":** If a button exists, it must work. If it doesn't work, don't build it.
2. **Backend First:** Always prove the data flows (console.log / raw JSON) before Beloved spends hours making it look pretty.
3. **Error Handling:** You must handle failed payments, wrong passwords, and missing stylists gracefully. Don't let the app crash.
4. **Communicate:** If a database query is too complex or an API is failing, tell Beloved immediately so he can adjust the UX to hide the flaw.
