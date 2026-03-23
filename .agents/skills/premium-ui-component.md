---
description: How to create premium, cinematic UI components that match GlamGo's visual standard
---

# Skill: Premium UI Component Builder

## When to Use

When creating any visual component for GlamGo, especially gallery cards,
profile pages, and booking flows.

## Core Principle

Every UI component must feel **premium** — like a fashion magazine,
not a generic booking app. The visual presentation IS the product.

## Instructions

When building UI components:

1. **Follow the design system** (see `context/DESIGN_SYSTEM.md` when finalized)
2. **Add interaction details:**
   - Hover: smooth scale and shadow transitions (300ms ease-out)
   - Active: subtle press feedback
   - Focus: visible focus ring for accessibility
3. **Always include a loading skeleton** that matches the component shape
4. **Handle all states gracefully:** loading, error, empty, success
5. **Use Next.js `Image` component** for all images (optimization)
6. **Make every component responsive** (mobile-first)
7. **Add subtle animations** (fade in, slide up) using CSS or Framer Motion
8. **Consistent spacing** from the design system scale
9. **Premium typography** — use the defined font pairings, proper weights

## Gallery Card Specific Rules

The gallery card is the HERO component. It must:

- Show the hairstyle image large and beautiful
- Support video loop thumbnails (if feasible)
- Have smooth hover interactions
- Display price range, duration, and category elegantly
- Lazy-load images below the fold

## Quality Check

Before finishing a component, ensure:

- [ ] Looks premium, not generic
- [ ] Hover/active states feel smooth
- [ ] Loading skeleton matches the component shape
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Uses brand colors and typography
- [ ] Animations are subtle, not distracting
- [ ] All states handled (loading, empty, error)
- [ ] Uses semantic HTML
- [ ] Has accessible labels where needed
