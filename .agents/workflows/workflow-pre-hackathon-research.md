---
description: Structured pre-hackathon research and preparation workflow for GlamGo (March 20-22)
---

# Workflow: Pre-Hackathon Research & Preparation

**Purpose:** Everything that must be researched, decided, and prepared
BEFORE the 4-day build sprint starts on March 23.

**Output:** A fully informed team with visual direction locked, assets
ready, accounts set up, and a clear build plan.

---

## Phase 1: Visual Research & Direction (Priority: CRITICAL)

### Step 1: Platform Research

Browse and screenshot these types of platforms for inspiration:

- **Fashion/Luxury e-commerce** (Net-a-Porter, SSENSE, Farfetch)
- **Visual-first marketplaces** (Behance, Dribbble, Pinterest)
- **Beauty/hair platforms** (competitors: onfleekQ, Beauty Butler)
- **Cinematic web experiences** (Awwwards winners, award-winning sites)
- **Video-based galleries** (sites that use video loops as thumbnails)

Save screenshots and links to `research/references/`.

### Step 2: Gallery Experience Research

Specifically research how to present gallery items as:

- Short video loops (2-5 second clips, like Instagram Reels thumbnails)
- Motion/hover effects on static images
- Parallax and depth effects
- Masonry vs grid vs Pinterest-style layouts

Document what's technically feasible in Next.js in `research/3d-concepts/`.

### Step 3: AI Video Clip Tests

Test generating short video clips of hairstyles using AI tools:

- Google Veo / Runway ML / Pika for short hair video clips
- Test quality, realism, and file size
- Determine if these are good enough for the gallery

Save test results in `research/video-tests/`.

### Step 4: Animation & 3D Concepts

Research what's possible within a 4-day build:

- CSS animations (achievable)
- Framer Motion (achievable)
- Three.js / WebGL (risky for hackathon — assess complexity)
- GSAP scroll animations (achievable)
- Lottie animations (achievable)

Document feasibility in `research/3d-concepts/`.

### Step 5: Moodboard & Direction Lock

Based on all research, create a moodboard:

- Color palette options (2-3 candidates)
- Typography options (2-3 font pairings)
- Visual vibe (luxury? playful? editorial? minimal?)
- Gallery layout preference
- Animation approach

Save to `research/moodboard/`. Get a final direction decision.

**Gate:** Visual direction must be LOCKED before proceeding to Phase 2.

---

## Phase 2: Design System Definition

### Step 6: Define Design System

Based on locked visual direction:

- Brand colors (primary, secondary, accent, neutrals, status)
- Typography (heading font, body font, sizes, weights)
- Spacing scale
- Border radius patterns
- Shadow patterns
- Animation/transition standards
- Component visual patterns (cards, buttons, inputs)

Write to `context/DESIGN_SYSTEM.md`.

### Step 7: Define Coding Standards

Based on design system and tech stack:

- File structure conventions
- Component patterns
- Naming conventions
- Import alias setup
- Tailwind config extensions

Write to `context/CODING_STANDARDS.md`.

---

## Phase 3: Asset Preparation

### Step 8: Hairstyle Content

Coordinate with hairstylist team member:

- [ ] Get 15-20 real hairstyle photos (with permission)
- [ ] Get category names and pricing data
- [ ] Get stylist testimonials for the demo

### Step 9: Seed Data Plan

Prepare the database seed data structure:

- Hairstyle entries (name, category, description, images, prices)
- Fake stylist profiles (for demo purposes)
- Sample reviews

### Step 10: Brand Assets

- [ ] Logo concept (even if rough)
- [ ] App icon concept
- [ ] Placeholder images (for components before real photos arrive)

---

## Phase 4: Technical Preparation

### Step 11: Account Setup

- [ ] Supabase project created (don't create tables — that's "code")
- [ ] Vercel account ready
- [ ] GitHub repository created (empty — just initialized)
- [ ] Interswitch developer account (brother's task)
- [ ] Google Maps API key (if using location features)

### Step 12: Brother's Payment Prep

Ensure brother has completed:

- [ ] Read Interswitch developer docs completely
- [ ] Obtained sandbox credentials
- [ ] Tested a basic payment flow independently
- [ ] Documented exact API calls needed

---

## Phase 5: Sprint Plan Finalization

### Step 13: Day-by-Day Build Plan

Create the detailed 4-day sprint plan with:

- Specific tasks per time block (morning/afternoon/evening)
- Who does what (Beloved vs Brother)
- Dependency order (what blocks what)
- Deploy checkpoints (deploy early, deploy often)
- Cut-line features (what gets dropped if behind schedule)

### Step 14: GitHub Documentation Plan

Set up the structure for professional documentation:

- README template
- Commit message conventions
- Issue template
- PR template
- Project board structure

---

## Quality Gate

Before March 23, all of these must be true:

- [ ] Visual direction is LOCKED (colors, fonts, vibe)
- [ ] Design system document is complete
- [ ] 15+ hairstyle photos are ready
- [ ] Brother has tested Interswitch payment
- [ ] All accounts are set up
- [ ] Day-by-day build plan exists
- [ ] GitHub repo is initialized with docs structure
