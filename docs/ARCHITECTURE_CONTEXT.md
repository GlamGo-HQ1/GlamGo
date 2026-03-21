# GlamGo — Architecture Context

## System Overview

GlamGo is a Next.js 14 monolith deployed on Vercel, backed by Supabase
for database/auth/storage and Interswitch for payments.

## Key Decisions

1. **Monolith over microservices** — 4-day hackathon, simplicity wins
2. **Server Components by default** — gallery/profile pages are read-heavy
3. **Supabase over custom backend** — auth + DB + storage in one service
4. **Vercel deployment** — zero-config for Next.js
5. **CSS Modules over Tailwind** — full control for premium visual design

## Data Flow

```
User Action → Next.js Server Component/Action → Supabase Client → PostgreSQL
                                               → Supabase Storage (images)
                                               → Interswitch API (payments)
```

## Security Model

- Supabase Auth handles all authentication
- Row Level Security (RLS) on all tables
- Service role key NEVER exposed to client
- Interswitch handles PCI compliance for payments
- Input validation with Zod on all boundaries

## Performance Strategy

- Server Components for zero client-side JS on read pages
- Image optimization via `next/image`
- Lazy loading for below-the-fold content
- Supabase connection pooling via Supavisor
- Vercel Edge for static content
