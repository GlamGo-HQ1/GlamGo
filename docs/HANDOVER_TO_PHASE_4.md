# 🚀 GlamGo — Phase 4 Handover Session

> **Written by:** Anti-Gravity (Current Session)
> **For:** Anti-Gravity (New Session)
> **Date:** 2026-03-24
> **Priority:** READ THIS FULLY BEFORE TOUCHING ANY CODE

---

## YOUR FIRST 3 COMMANDS IN THE NEW WINDOW

1. Read `docs/DESIGN_REFERENCES.md` — this is the primary creative brief for Phase 4 UI.
2. Read `docs/VISUAL_DIRECTION.md` — this is the absolute design law (colors, fonts, mood, tone).
3. Read `docs/DESIGN_SYSTEM.md` — this contains the design tokens already built into the codebase.

---

## PROJECT STATUS

| Phase | Name | Status |
|-------|------|--------|
| Phase 1 | Next.js Scaffolding | ✅ COMPLETE |
| Phase 2 | Database & Global Memory | ✅ COMPLETE |
| Phase 3 | Auth & Profiles | ✅ COMPLETE |
| **Phase 4** | **Landing Page Build** | 🔴 NOT STARTED — YOUR JOB |

---

## THE CODEBASE — WHERE THINGS LIVE

- **Next.js 14 App Router** at `src/app/`
- **Supabase client** at `src/lib/supabase/` (client.ts, server.ts, admin.ts, middleware.ts)
- **Database types** at `src/lib/database.types.ts` (freshly generated from live DB — do not regenerate unless the DB schema changes)
- **UI components** at `src/components/` (auth/, layout/, ui/)
- **Design tokens** at `src/app/globals.css` (CSS variables for every color, spacing, radius, shadow)
- **Auth actions** at `src/app/auth/actions.ts`
- **Auth pages** at `src/app/auth/login/` and `src/app/auth/register/`

---

## ENVIRONMENT — IMPORTANT

- **Node.js:** v24.12.0
- **TypeScript:** 6.0.2 (workspace — `.vscode/settings.json` configured)
- **tsconfig.json:** has `verbatimModuleSyntax: true`, `forceConsistentCasingInFileNames: true`
- **`.env.local`:** Populated with the correct Supabase URL, Anon Key, and Service Role Key
- **Supabase Project ID:** `efgpqdmqinvpdkldvkcg`
- **Dev server:** `npm run dev` (runs on `localhost:3000`)

---

## THE CRITICAL DESIGN CONTEXT

### Visual Direction (DO NOT DEVIATE)

The app is **Dark Luxury Editorial** — think high-end fashion magazine meets luxury car configurator.

- **Background:** `#0A0A0F` (near-black)
- **Accent:** `#C9A96E` (warm gold)
- **Secondary Accent:** `#B76E79` (rose gold)
- **Fonts:** `Playfair Display` (display/headings) + `DM Sans` (body) — already wired into `layout.tsx`
- **Glass panels:** `rgba(255,255,255,0.05)` bg + `rgba(255,255,255,0.10)` border + `backdrop-filter: blur(12px)`

### The Story/Narrative (THE SOUL OF THE LANDING PAGE)

GlamGo is not just about hair. It is about the **emotional transformation** of a woman deciding who she wants to be — for a special event, a new phase in her life, a regular Tuesday. The landing page must feel **intensely empathetic and client-centric**.

---

## PHASE 4 BUILD OBJECTIVES — SECTION BY SECTION

### Section 1: Hero (The Style Switcher)
**Inspired by:** Apple AirPods Max color-switching animation
- A full-screen hero with a seamless sequence of high-quality portraits crossfading:
  Natural → Silk Press → Locs → Braids → Short Cuts
- Key message: *"Whatever your style is, we have it"*
- Headline is a bold Playfair Display serif over the dark background
- CTA button: *"Explore All Styles"* → routes to Gallery page

### Section 2: Scroll-Scrub Text Reveal (The Story)
**Reference:** https://nikolaradeski.com/
- Words of our core narrative animate in/bold as the user scrolls, one by one
- The text starts out muted/faded. As the user scrolls, words turn full-white and bold
- Implemented via scroll position tracking + CSS class toggling or GSAP ScrollTrigger

### Section 3: The 360° Feature Video Section
**Inspired by:** Apple AirPods Pro rotating on scroll
- A section BELOW the hero where a single hairstyle video plays/scrubs as you scroll
- Tied to mouse scroll wheel position (scroll-jacking must be gentle — not aggressive)
- This is SEPARATE from the hero switcher

### Section 4: The Curved Reel Carousel
**Inspired by:** Fabletics video reel
**Reference:** `fabletics_video_reel.png` in design references
- A horizontal scroll of looping short video/gif cards (hair in motion — turning, swishing)
- Cards have 3D coverflow/curve behavior on hover — they pop up and arc along a curve
- Not just flat horizontal scroll — interactive, alive

### Section 5: App Preview (Mobile Waitlist)
**Inspired by:** Fresha "Download App" section
**Reference:** `download_fresha_app.png` in design references
- Left: "Coming Soon to Mobile" headline + QR code or Early Access CTA
- Right: 2-3 overlapping phone frames with subtle floating animation
- Phone screens show silent looping videos of the booking flow

### Section 6: Feature Cards
- 3-4 cards highlighting the core value props:
  - "See Every Angle" (the gallery differentiator)
  - "Verified Stylists" (trust/safety)
  - "Salon or Home" (service mode flexibility)
  - "Secure Payments via Interswitch" (escrow differentiator)

---

## PENDING ITEMS FOR BELOVED TO PROVIDE

These were NOT completed in the previous session. The new session must ask Beloved for them:

1. **Reference websites to scrape for design inspiration** — Beloved mentioned specific websites he wanted to share but did not have time to paste them before the window closed. Ask him: *"Do you have those reference URLs you wanted to share before we got started?"*
2. **Actual photo/video assets** — We have no real hair content yet. The build will use placeholder images from Supabase seed data or royalty-free sources. Confirm with Beloved if he's sourcing real content.
3. **Copywriting** — We have the narrative direction but no final headline/body copy written. The session should draft it and ask Beloved to approve before building.

---

## WHAT OVERCOMER (THE LEAD DEVELOPER) NEEDS TO DO IN PARALLEL

Overcomer builds the **data pipes** while Beloved builds the **UI**. 

For Phase 4 to show real data, Overcomer must build:
- `GET /app/gallery/page.tsx` — Server Component that fetches hairstyles from Supabase by category
- `GET /app/gallery/[id]/page.tsx` — Detail page for a single hairstyle + nearby stylists query

The landing page itself (Hero, Scroll animations, Feature Cards) is **100% Beloved's domain** — it requires no live data, only placeholder content.

---

## HOW TO START THE NEW SESSION

Your exact opening message to Anti-Gravity in the new window should be:

> *"Read HANDOVER_TO_PHASE_4.md in the docs folder and confirm you understand the full Phase 4 plan. Then confirm the dev server is running and we are ready to start building the Hero section."*

---

## ONE MORE THING

The `src/app/page.tsx` file currently shows the **default Next.js starter template** (the blue Next.js logo, example links). This is the file that becomes the Landing Page in Phase 4. Beloved needs to **completely replace it** with the new landing page build.

> [!IMPORTANT]
> Phase 4 is the most visible thing any judge will see. This is the section that wins or loses the hackathon. The aesthetic bar is not "good" — it is "jaw-dropping." Hold that standard on every component you build.
