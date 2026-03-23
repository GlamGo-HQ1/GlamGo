---
description: Step-by-step workflow for integrating Interswitch payment API into GlamGo
---

# Workflow: Interswitch Payment Integration

Follow these steps in order. Don't skip ahead.

---

## Step 1: Get Sandbox Credentials

- [ ] Sign up at [Interswitch Developer Portal](https://sandbox.interswitchng.com)
- [ ] Create a new application
- [ ] Note your: `Client ID`, `Client Secret`, `Terminal ID`
- [ ] Add to `.env.local`:

```env
INTERSWITCH_CLIENT_ID=your_client_id
INTERSWITCH_CLIENT_SECRET=your_client_secret
INTERSWITCH_TERMINAL_ID=your_terminal_id
INTERSWITCH_BASE_URL=https://sandbox.interswitchng.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 2: Install Dependencies

```bash
npm install crypto-js axios
```

---

## Step 3: Create Payment Utility

Create `lib/interswitch.ts`:

```typescript
import crypto from 'crypto';

interface PaymentRequest {
  amount_kobo: number;
  booking_id: string;
  customer_email: string;
  customer_name: string;
}

export function createPaymentUrl(payment: PaymentRequest): string {
  const reference = `GLAMGO-${payment.booking_id}-${Date.now()}`;
  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/callback`;

  // Build Interswitch payment page URL
  // Refer to Interswitch docs for exact parameters
  const params = new URLSearchParams({
    merchant_code: process.env.INTERSWITCH_TERMINAL_ID!,
    pay_item_id: 'Default_Payable_MX12345',  // From your Interswitch dashboard
    txn_ref: reference,
    amount: payment.amount_kobo.toString(),
    currency: '566',  // NGN
    site_redirect_url: redirectUrl,
    cust_name: payment.customer_name,
    cust_email: payment.customer_email,
  });

  return `${process.env.INTERSWITCH_BASE_URL}/collections/w/pay?${params}`;
}

export function verifyPaymentHash(reference: string, amount: string): string {
  const hashString = `${process.env.INTERSWITCH_CLIENT_SECRET}${reference}${amount}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
}
```

---

## Step 4: Create Booking + Payment API Route

In `app/api/bookings/route.ts`:

```typescript
// 1. Validate booking request
// 2. Create booking record (status: 'pending_payment')
// 3. Generate Interswitch payment URL
// 4. Return payment URL to frontend
```

---

## Step 5: Create Payment Callback Handler

In `app/api/payments/callback/route.ts`:

```typescript
// 1. Receive callback from Interswitch
// 2. Verify the payment hash
// 3. Call Interswitch API to confirm transaction status
// 4. If success: update booking (status: 'pending_stylist'), credit wallet
// 5. If failed: update booking (status: 'cancelled'), show error
// 6. Redirect client to booking status page
```

---

## Step 6: Test the Full Flow

1. Create a test booking via the API
2. Follow the payment URL to Interswitch sandbox
3. Use test card: `5060990580000217191` (Interswitch test card)
4. Verify callback received and booking status updated
5. Check wallet balance updated correctly

---

## Step 7: Add Webhook Verification

Always verify the payment server-side. Never trust the client redirect alone:

```typescript
// After redirect, call Interswitch API to verify
const verifyResponse = await axios.get(
  `${INTERSWITCH_BASE_URL}/api/v2/purchases/${reference}`,
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  }
);

if (verifyResponse.data.ResponseCode === '00') {
  // Payment successful
}
```

---

## Checklist

- [ ] Sandbox credentials obtained
- [ ] `.env.local` configured
- [ ] Payment utility created
- [ ] Booking API creates payment URL
- [ ] Callback handler verifies and processes payment
- [ ] Wallet credited on successful payment
- [ ] Full flow tested with sandbox card
- [ ] Error handling for failed payments
- [ ] Refund to wallet flow works (for cancellations)
