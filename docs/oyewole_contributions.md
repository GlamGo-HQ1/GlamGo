# Oyewole Oluwabukola Oghenerukevwe — Contribution Package

This document collects everything needed to create the commits for
Oyewole (email: `oyewolebb29@gmail.com`). Use this as the authoritative
content and commit message source. You can copy the commit blocks
directly into `git commit --author="Oyewole ..." -m "..."` when
you make the commits from your laptop.

---

## Identity (for commits)

- Name: Oyewole Oluwabukola Oghenerukevwe
- Email: oyewolebb29@gmail.com
- Role (canonical in repo): Industry Advisor & Content Lead

---

## Overview

Oyewole contributed product and content work that should be credited
explicitly in the repository. Her contributions fall into four clear
areas which map to four recommend commits:

1. UI/UX Validation — reviewed and validated the visual design and
   consistency across the entire platform. (landing, gallery, styles,
   stylist profiles, booking flow, dashboards, auth)
2. Category Taxonomy — defined the client-facing category structure
   used for navigation and stylist organization.
3. Hairstyle Catalog — curated the hairstyle list (names, short
   descriptions, and reference images) for immediate seeding.
4. Booking Form Specifications — defined the client hair profile
   fields (hair condition, hair length, desired style length) that
   stylists need to see before accepting jobs.

Each item below contains the exact commit title, a suggested commit
message body, and supporting content to include in `CONTRIBUTIONS.md`
and any related docs.

---

## Commit 1 — UI/UX Validation

- Commit header (one-liner):

  `review(ux): validate UI/UX across all platform pages`

- Commit body (suggested):

  - Conducted comprehensive UI/UX validation across the platform: landing,
    gallery, style detail, stylist profile, booking flow, client & stylist
    dashboards, and authentication screens.
  - Verified consistency with the "dark luxury editorial" design direction
    (colors, typography, glassmorphism patterns, image treatments).
  - Logged visual observations and small fixes (CSS utility suggestions,
    image fallbacks) in the design handover notes.

- Files to update (recommended): `CONTRIBUTIONS.md` (add validation entry),
  optionally `docs/UI_VALIDATION_NOTES.md` with the observation list.

---

## Commit 2 — Category Taxonomy

- Commit header:

  `content(taxonomy): define hairstyle category structure`

- Commit body (suggested):

  - Established client-facing category taxonomy to improve browse
    discoverability and stylist organization.
  - Primary categories (client-friendly):
    - Braids
    - Kids Hairstyles
    - Locs (Dreads & Faux Locs)
    - Natural Hair Styling
    - Twists
    - Weaving (Cornrows & Stitch Styles)
    - Wigs & Installation
  - Recommended storage path for images: `public/images/hairstyles/<category>/`

- Files to update: `CONTRIBUTIONS.md` (taxonomy entry), optionally
  `docs/CATEGORY_GUIDE.md` with folder structure and usage notes.

---

## Commit 3 — Hairstyle Catalog

- Commit header:

  `content(catalog): curate hairstyle catalog and reference images`

- Commit body (suggested):

  - Curated initial hairstyle catalog (24+) across categories with short
    descriptions and reference images (images provided by Oyewole, pending
    integration).
  - Populated catalog (grouped):
    - Braids (6): Knotless braids, Lemonade braids, Fulani braids, Doll
      braids, Layered Doll Braids, Tyla braids
    - Weaving / Cornrows & Stitch styles (9): Patewo, Bald braids, Classic
      Shukwu, Shukwu with base, Celyn braids, Zig zag braids, Stitch braids,
      Alicia Keys with beads, Alicia Keys without beads
    - Twists (6): Passion Twist, Micro passion twist, Twist with braiding
      extension, Jumbo Marley Twist, Kinky Twist, Twist with Bantu knots
    - Locs (3): Soft locs, Boho locs, Butterfly locs
    - Wigs & Installations: (TBD, images to follow)
    - Natural Hair Styling: (TBD)
    - Kids Hairstyles: (TBD)
  - Note: images are stored by product convention under
    `public/images/hairstyles/<category>/` and will be integrated by a
    seed/import script. Seed snippet example (for reference):

    ```sql
    INSERT INTO hairstyles (name, category, description, images, price_min, price_max, duration_hrs, is_trending)
    VALUES ('Knotless braids', 'braids', 'Lightweight knotless braids with natural movement.',
      ARRAY['/images/hairstyles/braids/knotless-1.jpg','/images/hairstyles/braids/knotless-side.jpg'], 25000, 45000, 4.5, true);
    ```

- Files to update: `CONTRIBUTIONS.md` (catalog entry), optionally
  `docs/HAIRSTYLE_CATALOG.md` with a CSV-style table for future import.

---

## Commit 4 — Booking Form Specifications (Client Hair Profile)

- Commit header:

  `spec(booking): add client hair profile fields for stylist prep`

- Commit body (suggested):

  - Added client hair profile suggestions for the booking flow so stylists
    can prepare before accepting appointments.
  - Fields and options:
    - State / Condition of Client Hair
      - Natural (unrelaxed)
      - Relaxed
      - Transitioning (undergrowth)
    - Length of Client Hair
      - Short
      - Medium
      - Long
    - Length of Chosen Hairstyle
      - Shoulder length
      - Bra length
      - Waist length
      - Knee length
  - Recommendation: add these fields to the booking form schema and to the
    booking confirmation email so stylists have them at glance in the
    dashboard and calendar exports.

- Files to update: `CONTRIBUTIONS.md` (spec entry), `docs/BOOKING_FIELDS.md` 
  (implementation notes), and server action/schema: `src/lib/actions/bookings.ts`
  (schema update + validation) when ready to implement.

---

## Suggested commit commands (copy/paste)

Use these locally to apply commits under Oyewole's name. Replace the
files list with the actual files you staged for each commit.

Example (Commit 1):

```bash
git add CONTRIBUTIONS.md docs/UI_VALIDATION_NOTES.md
git commit --author="Oyewole Oluwabukola Oghenerukevwe <oyewolebb29@gmail.com>" -m "review(ux): validate UI/UX across all platform pages

- Reviewed landing, gallery, style detail, stylist profiles, booking flow,
  dashboards, and auth. Verified dark luxury editorial consistency." 
```

Repeat for each commit, changing the `-m` message and staged files.

---

## Implementation notes & recommendations

- Store contributor images under `public/images/hairstyles/<category>/` as
  JPG/WEBP with descriptive filenames (e.g. `knotless-1.jpg`, `knotless-side.jpg`).
- Create `scripts/seed_hairstyles.js` (or SQL migration) that reads a CSV/JSON
  manifest and inserts rows into the `hairstyles` table. Include image URLs
  pointing to the `public/images` path for local dev and to storage URLs for
  production.
- Update the booking server action (`src/lib/actions/bookings.ts`) to accept
  and validate the new client hair profile fields; store values on the
  `bookings` table as `client_hair_condition`, `client_hair_length`, and
  `desired_style_length` (or a single JSON `client_hair_profile` column).
- Add a short `docs/README_COMMIT_GUIDE.md` that lists these commits and the
  exact git commands for team members who will apply the commits from their
  machines.

---

## Final note

This file is intended to be the single-source draft for Oyewole's commits.
You told me you will commit from another machine — this file gives you all
the commit messages, bodies, and context so you can paste and run the
commands locally. If you want, I can also: create the seed CSV/JSON, prepare
the SQL snippet for direct import, or create the `docs/*` helper files.

File path: `docs/oyewole_contributions.md`
