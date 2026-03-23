# Decisions Log

Record every significant decision made during the project.
This becomes part of the GitHub documentation that proves
professional product thinking.

---

## Template

### Decision: [TITLE]

- **Date:** YYYY-MM-DD
- **Context:** What situation led to this decision?
- **Options Considered:**
  1. Option A — [description]
  2. Option B — [description]
  3. Option C — [description]
- **Decision:** [Which option and why]
- **Consequence:** What does this decision mean for the project?
- **Status:** Accepted / Superseded / Deprecated

---

## Decisions

### Decision: Fresh workspace at C:\Dev\GlamGo

- **Date:** 2026-03-20
- **Context:** Old workspace was in OneDrive, had stale files from a
  previous project plan, and premature design decisions.
- **Options Considered:**
  1. Clean existing workspace in OneDrive
  2. Create new workspace at `C:\Dev\GlamGo` (off OneDrive)
- **Decision:** Option 2 — fresh workspace, clean path, no sync issues
- **Consequence:** All project work happens in `C:\Dev\GlamGo`. Old
  BukkyBrand folder is archived/ignored.
- **Status:** Accepted

### Decision: Design system deferred until research complete

- **Date:** 2026-03-20
- **Context:** Colors, fonts, and visual direction were prematurely
  decided in old workspace before any visual research was done.
- **Decision:** Scrub all premature design decisions. Conduct visual
  research first, then define the design system.
- **Consequence:** Design system file will be empty/placeholder until
  research phase completes.
- **Status:** Accepted
