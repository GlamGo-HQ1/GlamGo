# Skill: API & Backend — GlamGo

Niched-down API and backend patterns for the GlamGo project. Follow these when building any API route or backend logic.

---

## API Route Structure

All API routes live in `app/api/`. Use Next.js 14 Route Handlers.

```
app/api/
├── styles/
│   ├── route.ts              GET (list styles with filters)
│   └── [id]/route.ts         GET (single style)
├── stylists/
│   ├── route.ts              GET (list stylists)
│   └── [id]/route.ts         GET (stylist profile)
├── bookings/
│   ├── route.ts              POST (create booking)
│   └── [id]/
│       ├── accept/route.ts   POST (stylist accepts)
│       └── confirm/route.ts  POST (client confirms with code)
├── payments/
│   └── callback/route.ts     POST (Interswitch webhook)
├── wallet/
│   └── route.ts              GET (balance), POST (deposit)
└── dashboard/
    ├── client/route.ts       GET (client dashboard data)
    └── stylist/route.ts      GET (stylist dashboard data)
```

---

## Route Handler Pattern

Every route handler follows this pattern:

```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// 1. Define schema
const BookingSchema = z.object({
  style_id: z.string().uuid(),
  stylist_id: z.string().uuid(),
  time_slot: z.string().datetime(),
  service_mode: z.enum(['client_travels', 'stylist_travels']),
});

// 2. Handler
export async function POST(request: Request) {
  try {
    // 3. Auth check
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 4. Validate input
    const body = await request.json();
    const parsed = BookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    // 5. Business logic
    const { data, error } = await supabase
      .from('bookings')
      .insert({ ...parsed.data, client_id: session.user.id })
      .select()
      .single();

    if (error) throw error;

    // 6. Return response
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Booking creation failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

---

## Supabase Patterns

### Client Setup (Server-Side)

```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const supabase = createRouteHandlerClient({ cookies });
```

### RLS Policy Examples

```sql
-- Clients can only see their own bookings
CREATE POLICY "clients_own_bookings" ON bookings
  FOR SELECT USING (auth.uid() = client_id);

-- Stylists can see bookings assigned to them
CREATE POLICY "stylists_assigned_bookings" ON bookings
  FOR SELECT USING (auth.uid() = (
    SELECT user_id FROM stylists WHERE id = stylist_id
  ));

-- Anyone can view styles (public gallery)
CREATE POLICY "public_styles" ON styles
  FOR SELECT USING (true);
```

### Role Check

```typescript
// Check if user is a stylist
const { data: stylist } = await supabase
  .from('stylists')
  .select('id')
  .eq('user_id', session.user.id)
  .single();

if (!stylist) {
  return NextResponse.json({ error: 'Not a stylist' }, { status: 403 });
}
```

---

## Wallet Operations

All money stored in **kobo** (₦1 = 100 kobo). Never use floats for money.

```typescript
// Credit wallet
async function creditWallet(userId: string, amountKobo: number, description: string) {
  const supabase = createRouteHandlerClient({ cookies });

  // Update balance
  const { error: walletError } = await supabase.rpc('credit_wallet', {
    p_user_id: userId,
    p_amount: amountKobo,
  });

  // Log transaction
  await supabase.from('transactions').insert({
    user_id: userId,
    type: 'credit',
    amount_kobo: amountKobo,
    description,
  });
}

// Debit wallet (for payments/commission)
async function debitWallet(userId: string, amountKobo: number, description: string) {
  // Same pattern, use 'debit_wallet' RPC
}
```

### Supabase RPC for Atomic Wallet Updates

```sql
CREATE OR REPLACE FUNCTION credit_wallet(p_user_id UUID, p_amount INT)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET wallet_balance_kobo = wallet_balance_kobo + p_amount
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## Confirmation Code Generation

```typescript
function generateConfirmationCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
```

---

## Error Response Format

Always return errors in this format:

```json
{
  "error": "Human-readable error message",
  "code": "BOOKING_NOT_FOUND",
  "details": {}
}
```

---

## Status Enums

```typescript
type BookingStatus =
  | 'pending_payment'    // Created, waiting for payment
  | 'pending_stylist'    // Paid, waiting for stylist to accept
  | 'confirmed'          // Stylist accepted, appointment locked
  | 'completed'          // Service done, code entered
  | 'cancelled_client'   // Client cancelled
  | 'cancelled_stylist'  // Stylist didn't respond / cancelled
  | 'expired';           // 30-min timeout, auto-cancelled

type TransactionType =
  | 'deposit'            // Money in (Interswitch payment)
  | 'payment'            // Booking payment deducted
  | 'refund'             // Cancellation refund to wallet
  | 'payout'             // Stylist receives payment after service
  | 'commission';        // GlamGo's cut
```

---

## Do NOT

- Expose Interswitch secret keys in any client-side code
- Use `service_role` key in client components
- Skip Zod validation on any endpoint
- Use floating point for money calculations
- Hardcode prices — always read from database
- Trust client-side data without server-side verification
