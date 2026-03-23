---
name: GlamGo Testing Strategy
description: Project-specific testing approach for GlamGo — extends global skill-testing
---

# SKILL: GLAMGO TESTING STRATEGY

**Extends:** Global `skill-testing/SKILL.md`
**Project:** GlamGo — Visual Hair Styling Marketplace
**Context:** 4-day hackathon sprint — testing must be surgical

---

## HACKATHON TESTING PHILOSOPHY

During a 4-day hackathon, you cannot test everything. You test what
would be **embarrassing to fail during the demo.**

### The Demo Test

Ask: "If this breaks during the live demo, does our team look bad?"
If YES → it gets tested. If NO → skip it for now.

---

## WHAT MUST BE TESTED (Priority Order)

### P0 — Demo Blockers (Must not fail)

1. **Landing page renders** — no blank screens
2. **Gallery loads hairstyles** — images appear correctly
3. **Booking flow completes** — user can select style → pick time → confirm
4. **Payment processes** — Interswitch integration works end-to-end
5. **Auth works** — user can sign up, log in, log out

### P1 — Important but Not Demo-Breaking

6. Stylist dashboard shows bookings
2. Search/filter returns correct results
3. Reviews display correctly
4. Mobile responsive — no layout breaks

### P2 — Nice to Have

10. Edge cases in booking (double-book prevention)
2. Image upload validation
3. Rate limiting on API routes

---

## TESTING APPROACH FOR HACKATHON

### Manual Testing (Primary Method)

- Walk through each user flow before every deploy
- Test on mobile (or mobile emulator) before demo
- Have a teammate test — fresh eyes catch what you miss

### Browser Testing (If Time Permits)

- Use Playwright or Cypress for the 3 critical flows:
  1. User registration → login
  2. Browse gallery → select style → book appointment
  3. Payment initiation → callback handling

### Type Safety (Always On)

- TypeScript strict mode catches most type errors
- Zod validation on all form inputs and API boundaries
- This is your "free" test layer — never disable it

### Integration Testing (If Time Permits)

- Supabase queries: verify RLS policies work correctly
- Interswitch: verify payment status webhook handling
- Use Supabase local dev (`supabase start`) for testing

---

## WHAT NOT TO TEST DURING HACKATHON

- CSS pixel-perfect matching
- Every possible form validation error
- Performance benchmarks
- Accessibility audits (do basic keyboard nav only)
- Unit tests for simple utility functions
- Mock-heavy tests that test the mock, not the code

---

## POST-HACKATHON TESTING UPGRADE PATH

After the hackathon, expand testing to include:

- Full Playwright E2E suite for all user flows
- Integration tests for Supabase RLS policies
- Unit tests for business logic (pricing, scheduling)
- Accessibility audit (WCAG 2.1 AA)
- Performance testing (Lighthouse, Core Web Vitals)
- Security testing (auth boundaries, input sanitization)

---

## WHAT THIS SKILL DOES NOT REPLACE

This file adds a hackathon-specific testing strategy ON TOP of the global
testing skill. After the hackathon, the global skill's full framework
(Testing Pyramid, AAA pattern, regression testing) should be adopted.
