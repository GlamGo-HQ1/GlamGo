---
name: GlamGo Architecture Guide
description: Project-specific architecture patterns for GlamGo — extends global skill-architecture
---

# SKILL: GLAMGO ARCHITECTURE GUIDE

**Extends:** Global `skill-architecture/SKILL.md`
**Project:** GlamGo — Visual Hair Styling Marketplace
**Stack:** Next.js 14, Supabase, Interswitch, Vercel

---

## SYSTEM ARCHITECTURE OVERVIEW

```
[Client (Browser)]
       |
  [Next.js 14 App Router (Vercel)]
       |
  +---------+---------+
  |                   |
[Supabase]     [Interswitch API]
  |
+---------+---------+
|         |         |
[Auth]  [Database] [Storage]
        (Postgres)  (Images)
```

### Boundaries

- **Frontend + BFF:** Next.js handles both UI rendering and backend-for-frontend logic via Server Components, Server Actions, and API Routes
- **Data Layer:** Supabase owns all persistent state (users, bookings, stylists, hairstyles)
- **Payments:** Interswitch handles all payment processing — GlamGo never touches card data
- **Hosting:** Vercel for the Next.js app, Supabase cloud for database/auth/storage

### Data Ownership

| Data | Owner | Access Pattern |
| --- | --- | --- |
| User profiles | Supabase Auth + `users` table | RLS per user |
| Stylist profiles | `stylist_profiles` table | Public read, owner write |
| Hairstyles/gallery | `hairstyles` table + Storage | Public read, stylist write |
| Bookings | `bookings` table | Stylist + client read, client create |
| Payments | Interswitch (reference stored locally) | Webhook callback |
| Reviews | `reviews` table | Public read, verified client write |

---

## FILE STRUCTURE

```
glamgo/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, providers)
│   ├── page.tsx                # Landing/hero page
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── explore/
│   │   └── page.tsx            # Gallery/discovery page
│   ├── stylists/
│   │   └── [id]/page.tsx       # Stylist profile
│   ├── booking/
│   │   └── [id]/page.tsx       # Booking flow
│   ├── dashboard/
│   │   ├── page.tsx            # Client dashboard
│   │   └── stylist/page.tsx    # Stylist dashboard
│   └── api/
│       ├── payments/
│       │   ├── initiate/route.ts
│       │   └── callback/route.ts
│       └── webhooks/
│           └── interswitch/route.ts
├── components/
│   ├── ui/                     # Atomic UI components
│   ├── gallery/                # Gallery-specific components
│   ├── booking/                # Booking flow components
│   └── layout/                 # Header, footer, navigation
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client
│   │   └── middleware.ts       # Auth middleware
│   ├── interswitch/
│   │   └── client.ts           # Payment integration
│   └── utils/
│       ├── format.ts           # formatNaira, formatDate, etc.
│       └── validation.ts       # Zod schemas
├── types/
│   └── index.ts                # Shared TypeScript types
└── public/
    └── images/                 # Static assets
```

---

## ARCHITECTURAL DECISIONS FOR HACKATHON

### Decision 1: Monolith, Not Microservices

- Next.js handles everything — no separate backend
- Supabase handles database, auth, and storage — no custom backend
- This is a 4-day hackathon. Simplicity wins.

### Decision 2: Server Components by Default

- Most pages are read-heavy (gallery, profiles) — perfect for server rendering
- Only booking flow and payment need client-side interactivity
- This gives us free SEO and faster initial page loads

### Decision 3: Supabase Over Custom Backend

- Auth, database, storage, and real-time in one service
- Free tier is more than enough for hackathon and demo
- Row Level Security for data access control — no custom middleware needed

### Decision 4: Vercel for Deployment

- Zero-config deployment for Next.js
- Preview deployments for every PR
- Edge functions for performance
- Free tier covers hackathon needs

---

## FAILURE MODES

| Failure | Impact | Mitigation |
| --- | --- | --- |
| Supabase down | App is read-only at best | Show cached data, disable mutations |
| Interswitch timeout | Booking can't complete | Queue booking as "pending", retry payment |
| Image upload fails | Stylist can't add work | Retry with backoff, show clear error |
| Auth token expired | User gets 401 | Auto-refresh token in middleware |

---

## WHAT THIS SKILL DOES NOT REPLACE

This file adds GlamGo-specific architecture ON TOP of the global
architecture skill. The global skill's principles (deep modules,
boring is better, failure modes, 2 AM test) still apply in full.
