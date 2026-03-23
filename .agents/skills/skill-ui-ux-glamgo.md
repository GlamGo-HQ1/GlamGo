---
name: GlamGo UI/UX Standards
description: Project-specific UI/UX patterns for GlamGo — extends global skill-ui-ux
---

# SKILL: GLAMGO UI/UX STANDARDS

**Extends:** Global `skill-ui-ux/SKILL.md`
**Project:** GlamGo — Visual Hair Styling Marketplace
**Design Philosophy:** Fashion magazine, not tech app

---

## THE GLAMGO VISUAL IDENTITY

### Core Principle

GlamGo is a **visual-first** experience. The interface should feel like
flipping through a premium hair styling lookbook — not like using a
booking SaaS tool.

### Design DNA

- **70% imagery, 30% UI** — images are the product, UI is the frame
- **Editorial layout** — asymmetric grids, full-bleed images, generous whitespace
- **Premium feel** — subtle animations, smooth transitions, no jarring UI
- **Dark/neutral backgrounds** — let the hair images pop (no competing colors)
- **Typography hierarchy** — bold headlines, elegant body text, clear CTAs

### Color Philosophy

- Primary palette: To be defined after visual research phase
- Background: Dark neutrals (deep charcoal, warm black) for gallery sections
- Text: High contrast whites/creams on dark, near-blacks on light
- Accent: One vibrant accent color for CTAs and key interactions
- NEVER use harsh primary colors that compete with hair photography

### Typography

- Display font: Premium, fashion-forward (e.g., Playfair Display, Cormorant)
- Body font: Clean, highly readable (e.g., Inter, DM Sans)
- Minimum body size: 16px on mobile, 18px on desktop
- Line height: 1.5 for body, 1.2 for headings

### Animation Standards

- Page transitions: subtle fade or slide (200-300ms)
- Image reveals: fade-in with slight scale (0.95 to 1.0)
- Button hover: subtle glow or depth change
- Loading: skeleton screens matching the gallery grid layout
- Scroll: parallax effects on hero sections (subtle, not nauseating)
- Total animation budget: no animation should exceed 500ms

---

## GLAMGO-SPECIFIC UI STATES

### Gallery View

- **Ideal:** Beautiful masonry/grid of hairstyle images with stylist info overlay on hover
- **Empty:** "Be the first stylist to showcase your work" + upload CTA
- **Loading:** Skeleton grid matching image card dimensions
- **Error:** "We're having trouble loading styles. Pull to refresh."
- **Partial:** Some images loading, others show blur placeholder

### Booking Flow

- **Step indicator** visible at all times (1. Select Style → 2. Pick Time → 3. Confirm → 4. Pay)
- **Price always visible** — never surprise the user with cost
- **Stylist info persistent** — name, photo, rating visible throughout
- **Back navigation** — user can always go back without losing selections

### Payment (Interswitch)

- Show card icons (Verve, Mastercard, Visa) for trust
- "Secured by Interswitch" badge always visible
- Loading state: "Processing your payment..." with spinner
- Success: Celebration animation + booking confirmation
- Failure: "Payment didn't go through" + clear retry button

---

## MOBILE-FIRST BREAKPOINTS

| Breakpoint | Width | Context |
| --- | --- | --- |
| Mobile | 320-767px | Primary experience — most Nigerian users |
| Tablet | 768-1023px | Secondary experience |
| Desktop | 1024px+ | Enhanced gallery grid, more columns |

- **Test on mobile FIRST** — most users are on Android phones
- **Touch targets: minimum 44x44px** — fingers, not cursors
- **Bottom navigation** — primary nav at bottom of screen on mobile
- **Swipeable galleries** — horizontal swipe for style categories

---

## ACCESSIBILITY (GlamGo-Specific)

- All hairstyle images MUST have descriptive alt text: "Box braids with gold accessories, medium length"
- Color contrast ratio: minimum 4.5:1 for text
- Booking flow must be completable with keyboard only
- Price information must not rely on color alone
- Screen reader: announce booking confirmations and payment status

---

## WHAT THIS SKILL DOES NOT REPLACE

This file adds GlamGo-specific visual and interaction patterns ON TOP of
the global UI/UX skill. The global skill's principles (6 UI states,
cognitive load reduction, error prevention, accessibility, heuristics)
still apply in full.
