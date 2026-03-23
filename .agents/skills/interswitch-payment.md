---
description: How to build Interswitch payment integration for GlamGo
---

# Skill: Interswitch Payment Integration

## When to Use

When implementing any payment-related functionality.

## Reference

Always check `competition/INTERSWITCH_GUIDE.md` for the latest
API details and credentials.

## Payment Flow

```
Client clicks "Pay"
    → Backend creates payment request (POST to Interswitch)
    → Client redirected to Interswitch payment page
    → Client enters card details (on Interswitch's secure page)
    → Interswitch redirects to our callback URL
    → Backend verifies payment (GET transaction status)
    → If success → booking confirmed
    → If failure → show error, allow retry
```

## Implementation Rules

1. **NEVER** expose Interswitch Client Secret on the frontend
2. All API calls to Interswitch go through our Next.js API routes
3. Store transaction references in the bookings table
4. Handle ALL edge cases: timeout, failed, cancelled, duplicate payment
5. Always verify payment server-side before confirming booking
6. Use environment variables for all credentials
7. Test with sandbox credentials first

## API Routes

| Route | Purpose |
| :--- | :--- |
| `POST /api/payment/initiate` | Create payment request, get redirect URL |
| `GET /api/payment/verify` | Verify transaction after callback |

## Error Handling

- Network timeout → show retry button
- Payment declined → show clear message, allow retry
- Duplicate payment → detect and prevent double-charging
- Callback failure → poll for status on confirmation page

## Testing

- Use Interswitch sandbox environment
- Use test card numbers from Interswitch docs
- Test success, failure, and cancellation flows
- Test with slow network (simulate timeout)
