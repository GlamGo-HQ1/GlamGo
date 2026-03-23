---
description: GlamGo-specific debugging workflow — fast diagnosis for hackathon pace
---

# Workflow: Debug Issue (GlamGo Hackathon)

**Extends:** Global `workflow-debug-issue.md`
**Context:** During the hackathon, speed of diagnosis matters — use the 15-minute rule

---

## Step 1: Read the Error (30 seconds)

Read the ENTIRE error message. Do not skim. Check:

- Browser console (F12 → Console tab)
- Terminal running `npm run dev`
- Vercel deployment logs (if deployed)
- Supabase dashboard logs

## Step 2: Categorize (30 seconds)

| Error Type | Where to Look |
| --- | --- |
| TypeScript error | Your IDE — fix the type |
| Hydration mismatch | Server vs Client component issue |
| 401 / 403 | Auth/RLS problem — check Supabase |
| 404 | Wrong route or missing page |
| 500 | Server-side crash — check terminal |
| CORS | API route or Supabase config |
| Image not loading | next.config.js remotePatterns |
| Payment failed | Interswitch dashboard + logs |

## Step 3: Fix (Apply the smallest change)

1. Fix the specific issue
2. Verify it works
3. Check you didn't break something else
4. Commit the fix: `fix(booking): handle null stylist in booking form`

## The 15-Minute Rule

If you can't find the root cause in 15 minutes:

1. **Stop and re-read** the error message from scratch
2. **Ask Anti-Gravity** with the full error text
3. **Check Supabase dashboard** for query errors
4. **Google the exact error** — someone has hit this before
5. **If still stuck** — revert to the last working state and try a different approach

## Emergency: Demo is in 1 Hour

If a critical bug appears right before the demo:

1. Can you **hide the broken feature**? (Comment out the nav link)
2. Can you **hardcode the expected result**? (Just for the demo)
3. Can you **use a different flow** to show the same capability?
4. **Do NOT attempt a large refactor** — make the smallest possible fix
