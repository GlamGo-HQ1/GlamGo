# 🏗️ Phase 4 Implementation Plan: Landing Page Build

> **Written by:** Anti-Gravity
> **Date:** 2026-03-24
> **Status:** ✅ APPROVED — Building now.

---

## 🎯 Selected Hero Strategy

**B+A Hybrid: "The Zoom-Through Reveal" with Rapid Crossfade.**

Two animation systems layered: scroll controls the zoom-mask (Obsidian effect), a timer controls the portrait crossfade (Apple AirPods effect). The portrait cycles through 5-6 hairstyles at ~600ms while simultaneously scaling up to fill the viewport on scroll.

## 🛠️ Components to Build

### 1. Global Setup & Providers

- **`src/app/layout.tsx`** & **`src/app/globals.css`**
  - Verify Lenis smooth scrolling is active and tuned for "heavy" editorial feel.
  - Apply the global dark luxury color variables (`#0A0A0F` background, `#F5F0EB` text).

### 2. Hero Section (Section 1)

- **`src/components/landing/Hero.tsx`** [MODIFY]
  - Implement the 3-layer parallax approach:
    1. **Background:** Massive "YOUR HAIR" typography at 20vw, muted at 20% opacity.
    2. **Centerpiece:** Portrait that scales up on scroll to consume the viewport, with `AnimatePresence` rapidly crossfading through 5-6 hairstyle images on a 600ms timer.
    3. **Foreground:** Tagline ("Your Way") and GlamGo logo. Two flanking images that drift apart on scroll.
  - Use `framer-motion` `useScroll` + `useTransform` for scroll-linked scale/translate.
  - Use `AnimatePresence` for the timed crossfade layer.

### 3. Story Section (Section 2)

- **`src/components/landing/StoryReveal.tsx`** [NEW]
  - Scroll-scrub text reveal: word-by-word opacity transition from 20% → 100%.

### 4. Booking Journey (Section 3)

- **`src/components/landing/BookingFlow.tsx`** [NEW]
  - Self-drawing gold SVG path (`#C9A96E`) snaking through 4 steps.
  - 4 static UI mockup cards: Browse Styles → Find Stylist → Book Instantly → Pay Securely.
  - SVG `stroke-dashoffset` animated by scroll progress.

### 5. Gallery Sneak Peek (Section 4)

- **`src/components/landing/GalleryPreview.tsx`** [NEW]
  - Horizontal scrolling row of hairstyle cards.
  - 3D Coverflow-like curve on hover/proximity.
  - Ken Burns fallback if no video assets available.

### 6. Value Props (Section 5 — The Closer)

- **`src/components/landing/ValueProps.tsx`** [NEW]
  - 3-4 glassmorphic cards: See Every Angle, Verified Stylists, Salon or Home, Secure Payments.

---

## 🧪 Verification Plan

### Automated / Browser Verification

1. **Scroll Integrity:** Hero image scales up until it fully masks the screen without horizontal overflow.
2. **Crossfade Timing:** Portrait cycles through all styles at consistent ~600ms intervals while zoom is in progress.
3. **Animation Firing:** Story text changes opacity strictly based on scroll position, not time.
4. **SVG Path:** Booking connecting line draws smoothly from first step to last.

### Manual Verification (Beloved's Check)

1. Run `npm run dev` and open `localhost:3000`.
2. Scroll through the page to feel the Lenis scroll weight and observe the parallax layers + crossfade in the Hero.
3. Confirm the placeholders and flow match the dark luxury aesthetic.
