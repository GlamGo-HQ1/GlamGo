---
description: GlamGo-specific feature build workflow — adapted for hackathon sprint pace
---

# Workflow: Build Feature (GlamGo Hackathon)

**Extends:** Global `workflow-build-feature.md`
**Context:** 4-day hackathon sprint — speed is critical, quality on critical paths

---

## Step 1: Understand (5 minutes max)

1. State the feature in ONE sentence: "As a [user], I can [action] so that [benefit]"
2. Identify if this is a **demo feature** (must work perfectly) or **supporting feature** (must work adequately)
3. Check if any existing component or page already handles part of this

## Step 2: Check Dependencies (2 minutes)

1. Does this feature need new database tables? → Check `DATABASE_SCHEMA.md`
2. Does this feature need new API routes? → Check `PAGE_STRUCTURE.md`
3. Does this feature need Interswitch? → Load `interswitch-payment.md`
4. Does this feature need auth? → Ensure middleware is configured

## Step 3: Build (The bulk of time)

1. **Database first** — Create/modify Supabase tables and RLS policies
2. **Server logic second** — Server Components, Server Actions, or API routes
3. **UI third** — Build the component, mobile-first
4. **States fourth** — Add loading, error, empty states
5. **Polish last** — Animations, transitions, micro-interactions

### Server Component Pattern

```typescript
// app/explore/page.tsx (Server Component — no 'use client')
import { createServerClient } from '@/lib/supabase/server';

export default async function ExplorePage() {
  const supabase = createServerClient();
  const { data: styles, error } = await supabase
    .from('hairstyles')
    .select('id, title, images, stylist:stylist_profiles(name, avatar)')
    .order('created_at', { ascending: false });

  if (error) return <ErrorState message="Couldn't load styles" />;
  if (!styles.length) return <EmptyState />;

  return <GalleryGrid styles={styles} />;
}
```

### Client Component Pattern

```typescript
// components/booking/BookingForm.tsx
'use client';
import { useState } from 'react';

export function BookingForm({ stylistId, styleId }: Props) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // ... interactive booking logic
}
```

## Step 4: Verify (5 minutes)

1. Does the feature work on mobile? (Resize browser to 375px width)
2. Does the feature handle errors? (Disconnect network, see what happens)
3. Does the feature look premium? (Compare to the design vision)
4. Would you be proud to demo this?

## Step 5: Commit

1. Commit with conventional message: `feat(gallery): add masonry grid with lazy loading`
2. Push to feature branch
3. Create PR if working with brother

---

## HACKATHON SHORTCUTS (Acceptable During Sprint)

- Skip writing tests — manual verification is fine
- Use `console.log` for debugging — clean before demo day
- Hardcode data if the database isn't ready yet
- Use placeholder images from Unsplash while waiting for real content
- Copy-paste similar components — refactor after hackathon
