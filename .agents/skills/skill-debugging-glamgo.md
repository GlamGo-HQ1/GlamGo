---
name: GlamGo Debugging Guide
description: Project-specific debugging patterns for GlamGo — extends global skill-debugging
---

# SKILL: GLAMGO DEBUGGING GUIDE

**Extends:** Global `skill-debugging/SKILL.md`
**Project:** GlamGo — Visual Hair Styling Marketplace
**Stack:** Next.js 14, Supabase, Interswitch

---

## COMMON GLAMGO FAILURE POINTS

### 1. Supabase Auth Issues

**Symptoms:** 401 errors, redirect loops, missing user data
**First checks:**

- Is the Supabase client using the correct env vars? (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- Is the auth middleware configured in `middleware.ts`?
- Is RLS enabled but missing the right policy?
- Is the session being passed correctly between server/client components?

### 2. Image Loading Failures

**Symptoms:** Broken images, 403 from Supabase Storage, slow gallery
**First checks:**

- Is `next.config.js` configured with the Supabase storage domain in `images.remotePatterns`?
- Is the storage bucket public or does it need auth?
- Are image URLs being constructed correctly? (path vs signed URL)
- Is the image too large? (check 5MB limit)

### 3. Interswitch Payment Errors

**Symptoms:** Payment fails, callback not received, duplicate charges
**First checks:**

- Is the transaction reference unique? (UUID per transaction)
- Are you using test credentials in development? (NOT production keys)
- Is the callback URL accessible from the internet? (use ngrok for local dev)
- Is the amount in kobo (multiply NGN by 100)?
- Check Interswitch dashboard for the transaction status

### 4. Server Component vs Client Component Confusion

**Symptoms:** "useState is not a function", hydration mismatch, hooks failing
**First checks:**

- Does the component using hooks have `'use client'` at the top?
- Are you trying to use `useEffect` in a Server Component?
- Is a Server Component being imported into a Client Component incorrectly?
- Check for hydration mismatch: is server-rendered HTML different from client?

### 5. API Route / Server Action Failures

**Symptoms:** 500 errors, CORS issues, missing data
**First checks:**

- Is the route handler exported correctly? (`export async function POST`)
- Are you reading the body correctly? (`await request.json()`)
- Is the Supabase server client created correctly in the route handler?
- Check if RLS policies allow the operation for the authenticated user

### 6. Booking State Conflicts

**Symptoms:** Double bookings, time slot shows available but fails
**First checks:**

- Is the booking check atomic? (use Supabase RPC or transaction)
- Is there a race condition between checking availability and creating booking?
- Are timezone conversions correct? (Nigeria is WAT, UTC+1)

---

## HACKATHON DEBUGGING RULES

1. **15-minute rule:** If you can't find the bug in 15 minutes, step back and re-read the error message completely
2. **Check the simple things first:** env vars, typos, wrong import paths
3. **Console.log is fine** during the hackathon — no shame
4. **Browser DevTools > guessing:** Network tab for API issues, Console for JS errors, Elements for CSS issues
5. **Supabase Dashboard** has query logs — use them
6. **Don't debug in production** — use Vercel preview deployments

---

## WHAT THIS SKILL DOES NOT REPLACE

This file adds GlamGo-specific debugging scenarios ON TOP of the global
debugging skill. The global skill's scientific method (5 Whys, hypothesis
testing, evidence gathering, variable isolation) still apply in full.
