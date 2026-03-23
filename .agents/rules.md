# GlamGo — Workspace AI Rules

## Identity

You are helping build **GlamGo** — a premium visual-first marketplace
for hair styling in Nigeria. This is a hackathon project (Enyata x
Interswitch Buildathon, March 23-26, 2026) that must ship as a
working, deployed MVP.

## Project North Star

The VISUAL GALLERY is the product. Not a directory. Not a list.
A cinematic, fashion-magazine-quality experience for discovering
hairstyles and booking verified stylists. If the gallery does not
make someone stop and stare, we have failed.

---

## Context Files (Always Reference)

| File | Purpose |
| :--- | :--- |
| `context/PROJECT_CONTEXT.md` | What we are building and why |
| `context/DATABASE_SCHEMA.md` | Data structures (Supabase/PostgreSQL) |
| `context/USER_FLOWS.md` | Complete user journeys |
| `context/COMPONENT_TREE.md` | Component architecture |
| `context/PAGE_STRUCTURE.md` | All routes and page details |
| `context/TEAM_ROLES.md` | Who does what |
| `competition/COMPETITION_RULES.md` | Hackathon constraints |
| `competition/INTERSWITCH_GUIDE.md` | Payment integration |

---

## Design System Status: PENDING

Colors, fonts, and visual direction are **NOT finalized.** Do NOT
make design assumptions. If visual decisions are needed, flag them
and wait for direction. The design system will be created after
the visual research phase is complete.

---

## Code Standards

1. TypeScript strict — no `any` types
2. Next.js 14 App Router — server components by default
3. `use client` only when interactivity requires it
4. Every component gets its own file
5. Proper error handling: loading, error, empty states on everything
6. Next.js `Image` component for all images
7. Mobile-first responsive design
8. Conventional commits: `type(scope): description`

## Priority Order (When in Doubt)

1. Gallery page — THE wow moment
2. Booking flow — must work end-to-end
3. Payment integration — must work with Interswitch
4. Everything else

---

## Competition Constraints

- **ALL code** written March 23-26 only
- Pre-hackathon: planning, research, wireframes, docs ONLY
- Must integrate Interswitch payment APIs
- Must be deployed and live (not a mockup)
- GitHub commit history proves authenticity
- 2-4 person team required

## The 80% Rule

When project is 80%+ complete: **FINISHING MODE.** No new features.
No scope creep. Ship what works.
