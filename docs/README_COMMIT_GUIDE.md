# Oyewole's Commit Guide
This guide contains the exact commit commands to run on your local machine to attribute Oyewole's work properly. 
Ensure you stage the relevant files before running the corresponding commit command.

### Commit 1 — UI/UX Validation
```bash
git add CONTRIBUTIONS.md docs/UI_VALIDATION_NOTES.md
git commit --author="Oyewole Oluwabukola Oghenerukevwe <oyewolebb29@gmail.com>" -m "review(ux): validate UI/UX across all platform pages

- Reviewed landing, gallery, style detail, stylist profiles, booking flow, dashboards, and auth.
- Verified dark luxury editorial consistency."
```

### Commit 2 — Category Taxonomy
```bash
git add CONTRIBUTIONS.md docs/CATEGORY_GUIDE.md
git commit --author="Oyewole Oluwabukola Oghenerukevwe <oyewolebb29@gmail.com>" -m "content(taxonomy): define hairstyle category structure

- Established client-facing category taxonomy to improve browse discoverability and stylist organization.
- Primary categories: Braids, Kids Hairstyles, Locs, Natural Hair Styling, Twists, Weaving, Wigs & Installation.
- Recommended storage path for images: public/images/hairstyles/<category>/"
```

### Commit 3 — Hairstyle Catalog
```bash
git add CONTRIBUTIONS.md docs/HAIRSTYLE_CATALOG.md scripts/seed_hairstyles.js
git commit --author="Oyewole Oluwabukola Oghenerukevwe <oyewolebb29@gmail.com>" -m "content(catalog): curate hairstyle catalog and reference images

- Curated initial hairstyle catalog (24+) across categories with short descriptions and reference images.
- Populated Braids, Weaving, Twists, and Locs.
- Created seed script and manifest for hairstyle database population."
```

### Commit 4 — Booking Form Specifications
```bash
git add CONTRIBUTIONS.md docs/BOOKING_FIELDS.md
git commit --author="Oyewole Oluwabukola Oghenerukevwe <oyewolebb29@gmail.com>" -m "spec(booking): add client hair profile fields for stylist prep

- Added client hair profile suggestions (Condition, Client Length, Style Length).
- Outlined integration roadmap for the booking form UI schema and database updates."
```
