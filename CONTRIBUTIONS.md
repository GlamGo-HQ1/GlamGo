# GlamGo — Contribution Log

> This file tracks key architectural decisions, catches, and contributions made during the Enyata × Interswitch Buildathon 2026 (March 23-26, 2026).

---

## Phase 1: Project Scaffolding

| Date | Contributor | Contribution |
| --- | --- | --- |
| 2026-03-23 | Lead Dev (Overcomer) | Initialized Next.js 14 App Router project with TypeScript, ESLint, and the full Supabase client utility layer (`client.ts`, `server.ts`, `middleware.ts`). |
| 2026-03-23 | Lead Dev (Overcomer) | Implemented the complete GlamGo Design System (dark luxury editorial palette, Playfair Display + DM Sans typography, glassmorphism patterns) into `globals.css`. |
| 2026-03-23 | Lead Dev (Overcomer) | Built all 9 shared UI components: `Button`, `Input`, `Container`, `Avatar`, `PriceTag`, `StarRating`, `CategoryTag`, `LoadingSkeleton`, `Toast`. |
| 2026-03-23 | Lead Dev (Overcomer) | Built `Navbar` and `Footer` layout shells with auth state placeholders and responsive container system. |
| 2026-03-23 | Product Manager | Verified all Phase 1 scaffolding and officially signed off on Phase 1 completion, triggering Phase 2. |

---

## Architecture Audit: Gaps Caught & Patched

> **Date:** 2026-03-23 (Pre-build Technical Audit)
> **Auditor:** Product Manager
> **Status:** All gaps resolved in `implementation_plan.md.resolved`

The following architectural gaps were identified by the Product Manager during the pre-build Technical Audit and patched in the Implementation Plan before any code was written:

| # | Gap Identified | Risk If Missed | Fix Applied |
| --- | --- | --- | --- |
| 1 | `bookings` table missing `client_address` column | Phase 5 Google Maps address data had nowhere to be stored. Would cause a broken booking flow on Day 3. | Added `client_address` field to Phase 2.5 schema. |
| 2 | `stylist_profiles` table missing `service_mode` column | Product Decision 2 ("I come to you / You come to me") was a locked requirement with no database backing. | Added `service_mode` enum (`salon/mobile/both`) to Phase 2.2 schema. |
| 3 | No `wallet_balance` on stylists | The escrow release flow (Phase 7.8) had no column to send simulated funds to. | Added `wallet_balance` field to Phase 2.2 schema. |
| 4 | No Accept/Decline API route for stylists | Stylist dashboard would show incoming booking requests with no way to respond, breaking the demo flow. | Added `PATCH /api/bookings/[id]/accept` and `PATCH /api/bookings/[id]/decline` as Phase 7.5. |
| 5 | Interswitch refund complexity on stylist decline | Reversing a real payment transaction is a multi-day engineering task, not feasible in a hackathon sprint. | Decision: declined bookings trigger a simulated internal wallet credit, not a real API refund. |

---

## Phase 2: Database & Seed Data

| Date | Contributor | Contribution |
| --- | --- | --- |
| 2026-03-23 | Lead Dev (Overcomer) | Created complete Phase 2 database schema (`users`, `stylist_profiles`, `hairstyles`, `bookings`, `reviews`) and enums. |
| 2026-03-23 | Lead Dev (Overcomer) | Implemented Core Row Level Security (RLS) across all tables. |
| 2026-03-23 | Lead Dev (Overcomer) | Seeded database with 16 categorized hairstyles and 3 test stylist profiles (with Auth integration). |
| 2026-03-23 | Lead Dev (Overcomer) | Created `portfolio` and `hairstyle-images` Supabase storage buckets via JS SDK. |
| 2026-03-23 | Product Manager | Audited Phase 2 schema via OpenCode, identifying critical RLS gaps (too broad booking updates, missing review CRUD, loose storage rules). |
| 2026-03-23 | Lead Dev (Overcomer) | Resolved audit gaps: split booking update rules, added review delete/update paths, and restricted storage inserts strictly to registered stylists. |

---

## Phase 3: Authentication

*[To be filled as work is completed]*
