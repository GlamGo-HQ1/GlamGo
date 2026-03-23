# Component Template

Use this structure when creating new GlamGo components.

## Server Component (Default)

```typescript
// components/gallery/StyleCard.tsx
import Image from 'next/image';
import { formatNaira } from '@/lib/utils/format';
import type { Hairstyle } from '@/types';
import styles from './StyleCard.module.css';

interface StyleCardProps {
  style: Hairstyle;
}

export function StyleCard({ style }: StyleCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={style.images[0]}
          alt={style.title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{style.title}</h3>
        <p className={styles.price}>{formatNaira(style.priceInKobo)}</p>
      </div>
    </article>
  );
}
```

## Client Component (When Interactivity Needed)

```typescript
// components/booking/TimeSlotPicker.tsx
'use client';

import { useState } from 'react';
import styles from './TimeSlotPicker.module.css';

interface TimeSlotPickerProps {
  availableSlots: string[];
  onSelect: (slot: string) => void;
}

export function TimeSlotPicker({ availableSlots, onSelect }: TimeSlotPickerProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (slot: string) => {
    setSelected(slot);
    onSelect(slot);
  };

  return (
    <div className={styles.grid}>
      {availableSlots.map(slot => (
        <button
          key={slot}
          className={`${styles.slot} ${selected === slot ? styles.active : ''}`}
          onClick={() => handleSelect(slot)}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}
```

## CSS Module Pattern

```css
/* components/gallery/StyleCard.module.css */
.card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.imageWrapper {
  position: relative;
  aspect-ratio: 3/4;
}

.image {
  object-fit: cover;
}

.info {
  padding: 1rem;
}

.title {
  font-family: var(--font-display);
  font-size: 1.125rem;
  margin: 0;
}

.price {
  color: var(--color-accent);
  font-weight: 600;
  margin: 0.25rem 0 0;
}
```
