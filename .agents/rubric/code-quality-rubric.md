# GlamGo Code Quality Rubric

Use this rubric to evaluate code quality during and after the hackathon.

## During Hackathon (Minimum Bar)

- [ ] TypeScript strict mode — no `any` types
- [ ] Server Components by default, `'use client'` only when needed
- [ ] Supabase queries use explicit column selection
- [ ] Error handling on all API calls and database queries
- [ ] No hardcoded secrets — all in `.env.local`
- [ ] Conventional commit messages
- [ ] No console.log in committed code (except during active debugging)

## Post-Hackathon (Full Standard)

- [ ] All global coding skill principles applied
- [ ] Functions under 30 lines
- [ ] Components under 150 lines
- [ ] No duplicate code — shared utilities extracted
- [ ] Full TypeScript types for all data models
- [ ] Error boundaries on all route segments
- [ ] Loading.tsx and error.tsx for all route segments
- [ ] Unit tests for business logic
- [ ] Integration tests for Supabase queries
- [ ] Accessibility audit passed
