# GlamGo — Coding Standards

## Language & Framework

- **TypeScript** strict mode — no `any` types
- **Next.js 14** App Router — Server Components by default
- **React 18** — Server Components, Suspense, streaming
- **CSS Modules** or vanilla CSS — no Tailwind unless explicitly approved

## File Naming

- Pages: `kebab-case` (e.g., `explore/page.tsx`)
- Components: `PascalCase` (e.g., `StyleCard.tsx`)
- Utilities: `camelCase` (e.g., `formatNaira.ts`)
- CSS Modules: `ComponentName.module.css`
- Types: `PascalCase` in `types/index.ts`

## Component Rules

1. Server Components by default — add `'use client'` only when needed
2. One component per file
3. Props interface defined in the same file
4. Export named functions (not default exports)
5. Destructure props in the function signature

## Import Order

1. React/Next.js imports
2. Third-party libraries
3. Internal components
4. Internal utilities/hooks
5. Types
6. Styles

## Git Workflow

- `main` — production branch (protected)
- `dev` — integration branch
- Feature branches: `feat/gallery-grid`, `fix/booking-timezone`
- Conventional commits required
- PR required for merging to `dev`
- Squash merge to keep history clean

## Environment Variables

- Never commit `.env.local`
- Prefix client-side vars with `NEXT_PUBLIC_`
- Document all env vars in `.env.example`

## Error Handling

- Try/catch on all async operations
- User-facing errors in plain English
- Full error details logged server-side only
- Error boundaries on route segments
