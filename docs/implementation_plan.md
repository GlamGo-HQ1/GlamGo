# 🏗️ Phase 4 Implementation Plan: Landing Page Build

> **Written by:** Anti-Gravity
> **Date:** 2026-03-24
> **Status:** AWAITING BELOVED'S APPROVAL

This plan outlines the technical execution of the `PHASE_4_LANDING_STRATEGY.md` we just finalized.

---

## 🎯 Selected Hero Strategy

Based on the strategy synthesis, we proceed with **Hero Option B: "The Zoom-Through Reveal" (The Obsidian Assembly Effect)**.

This provides the highest "jaw-drop" factor for the hackathon judges by utilizing scroll-driven parallax and a dramatic scaling mask transition.

## 🛠️ Proposed Changes

### 1. Global Setup & Providers

- **`src/app/layout.tsx`** & **`src/app/globals.css`**
  - Verify Lenis smooth scrolling is active and tuned for "heavy" editorial feel.
  - Apply the global dark luxury color variables (Near-black `#0A0A0F` background, Off-white `#F5F0EB` text).

### 2. The Hero Section (Section 1)

- **`src/components/landing/Hero.tsx`** [MODIFY]
  - Discard the current crossfade implementation.
  - Implement the 3-layer parallax approach:
    1. **Background:** Massive "YOUR HAIR" typography.
    2. **Centerpiece:** A striking portrait (using a placeholder from Unsplash temporarily) that scales up on scroll to consume the viewport.
    3. **Foreground:** Tagline and logo.
  - Use `framer-motion` `useScroll` and `useTransform` to map scroll position to scale and y-axis translation.

### 3. The Story Section (Section 2)

- **`src/components/landing/StoryReveal.tsx`** [NEW]
  - Implement a scroll-scrub text reveal component.
  - Use raw CSS or Framer Motion to transition word opacity from 20% to 100% as the element intersects the center of the viewport.

### 4. The Booking Journey (Section 3)

- **`src/components/landing/BookingFlow.tsx`** [NEW]
  - Implement the GetQuoti-inspired self-drawing SVG path.
  - Build 4 static UI mockup cards representing the steps: Find Stylist → View Gallery → Book Time → Pay Securely.
  - Animate the SVG `stroke-dashoffset` tied to scroll progress.

### 5. The Value Props (The Closer)

- **`src/components/landing/ValueProps.tsx`** [NEW]
  - Build sleek, glassmorphic cards for the 4 core guarantees (See Every Angle, Verified Stylists, Salon or Home, Secure Payments).

### 6. The Gallery Sneak Peek (Section 4)

- **`src/components/landing/GalleryPreview.tsx`** [NEW]
  - Implement the horizontal scrolling row of cards.
  - Apply a subtle 3D rotational transform (Coverflow effect) on hover or scroll proximity to give it the "Fabletics curved reel" feel.

### 6. The Value Props & Waitlist (Section 5 & 6)

- **`src/components/landing/ValueProps.tsx`** [NEW]
  - Build sleek, glassmorphic cards for the 4 core guarantees.
- **`src/components/landing/FooterCTA.tsx`** [NEW]
  - Replace the heavy mobile mockup waitlist with a clean, high-converting "Coming Soon / Early Access" email capture strip.

---

## 🧪 Verification Plan

### Automated / Browser Verification

1. **Scroll Integrity:** Use the browser tool to scroll from top to bottom, verifying that the Hero image successfully scales up until it fully masks the screen without horizontal scrolling or breaking the layout.
2. **Animation Firing:** Verify the Story text changes opacity strictly based on scroll position, not time.
3. **SVG Path:** Verify the booking connecting line draws smoothly from the first step to the last.

### Manual Verification (Beloved's Check)

1. Run `npm run dev` and open `localhost:3000`.
2. Scroll through the page using a trackpad or mouse wheel to feel the weight of the Lenis scroll and observe the parallax layers in the Hero section.
3. Confirm the placeholders and flow accurately represent the dark luxury aesthetic before we lock down the final image assets.
