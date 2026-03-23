---
name: GlamGo Coding Standards
description: Project-specific coding patterns for GlamGo — extends global skill-coding
---

# SKILL: GLAMGO CODING STANDARDS

**Extends:** Global `skill-coding/SKILL.md`
**Project:** GlamGo — Visual Hair Styling Marketplace
**Stack:** Next.js 14 App Router, TypeScript Strict, Supabase, Interswitch

---

## GLAMGO-SPECIFIC CODING RULES

### TypeScript

- `strict: true` — no `any` types unless explicitly justified
- Use `satisfies` operator for type narrowing where appropriate
- Prefer `interface` for object shapes, `type` for unions/intersections
- All API responses must be typed — no `as any` casts from Supabase

### Next.js 14 Patterns

- **Default to Server Components** — only use `'use client'` when the component genuinely needs interactivity (onClick, useState, useEffect)
- **Server Actions** for form submissions — avoid API routes for simple mutations
- **Dynamic imports** for heavy components (gallery grid, map views, payment forms)
- **Image component** — always use `next/image` with blur placeholders for the gallery
- File naming: `kebab-case.tsx` for pages, `PascalCase.tsx` for components

### Supabase Patterns

- Use `createServerClient` in Server Components, `createBrowserClient` in Client Components
- Row Level Security (RLS) is mandatory — never bypass with service role in client code
- Prefer `.select()` with explicit column lists over `select('*')`
- Handle Supabase errors explicitly:

```typescript
const { data, error } = await supabase.from('hairstyles').select('id, title, images');
if (error) throw new DatabaseError('Failed to fetch hairstyles', { cause: error });
```

### Naira Currency Formatting

- Always use `Intl.NumberFormat` with `'en-NG'` locale and `'NGN'` currency
- Never store formatted currency — store as integer (kobo) in the database
- Utility function:

```typescript
export function formatNaira(amountInKobo: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amountInKobo / 100);
}
```

### Image Handling

- All gallery images must use `next/image` with `sizes` prop for responsive loading
- Support WebP with JPEG fallback
- Always provide `alt` text describing the hairstyle
- Lazy load images below the fold
- Use Supabase Storage for user-uploaded images with a 5MB limit

### Component Patterns

- Atomic structure: atoms → molecules → organisms → templates → pages
- Every interactive component needs: default, hover, active, disabled, loading states
- Use CSS Modules or vanilla CSS — no Tailwind unless explicitly approved
- Mobile-first: start with mobile layout, enhance for tablet/desktop

### Error Handling for GlamGo

- User-facing errors must be in plain English, no tech jargon
- Booking errors: "We couldn't confirm your appointment. Please try again."
- Payment errors: "Payment didn't go through. Your card was not charged."
- Network errors: "You seem to be offline. We'll retry when you're back."
- Log full error details server-side, show friendly messages client-side

### Naming Conventions

- Components: `StyleCard`, `BookingForm`, `StylistProfile`
- Hooks: `useBooking`, `useGallery`, `useStylistSearch`
- Utils: `formatNaira`, `calculateDistance`, `generateTimeSlots`
- Types: `Hairstyle`, `Booking`, `StylistProfile`, `PaymentIntent`
- API routes: `/api/bookings`, `/api/stylists`, `/api/payments`

---

## HACKATHON CONSTRAINTS

- **Speed over perfection** — ship working features, polish later
- **No premature abstraction** — build the specific thing, not the generic framework
- **Copy-paste is fine for 4 days** — extract shared code AFTER the hackathon
- **Console.log is acceptable during dev** — clean before demo
- **Skip unit tests during sprint** — focus on working E2E flows
- **Hardcode where safe** — competition category list, service types, etc.

---

## WHAT THIS SKILL DOES NOT REPLACE

This file adds GlamGo-specific patterns ON TOP of the global coding skill.
The global skill's principles (readability, correctness, maintainability,
error handling, anti-patterns) still apply in full.
