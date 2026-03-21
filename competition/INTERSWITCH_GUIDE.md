# Interswitch Integration Guide

## Overview

We use Interswitch's payment API for secure payment processing.
This is a **CRITICAL** competition requirement — the integration must
work perfectly.

## Integration Flow

1. Client clicks "Pay" on booking confirmation
2. Our backend creates a payment request to Interswitch
3. Client is redirected to Interswitch payment page
4. Client enters card details on Interswitch's secure page
5. After payment, Interswitch redirects back to our callback URL
6. Our backend verifies the payment
7. If successful → booking confirmed, stylist notified
8. If failed → show error, allow retry

## API Details

<!-- Fill this in during research — read Interswitch developer docs -->
<!-- https://developer.interswitchgroup.com/ -->

### Sandbox/Test Credentials

- Client ID: [to be obtained]
- Client Secret: [to be obtained]
- Base URL (Sandbox): [to be obtained]
- Test Card Numbers: [to be obtained from docs]

### Key Endpoints

1. **Generate Access Token** — POST to auth endpoint
2. **Initiate Payment** — POST with payment details
3. **Payment Page** — Redirect user to Interswitch hosted page
4. **Verify Transaction** — GET to verify payment status

### Our Implementation

- API route: `app/api/payment/initiate/route.ts`
- Callback route: `app/api/payment/verify/route.ts`
- Frontend payment page: `app/payment/page.tsx`
- Callback page: `app/payment/callback/page.tsx`

## Brother's Responsibility

- [ ] Create Interswitch developer account
- [ ] Obtain sandbox credentials
- [ ] Test basic payment flow independently
- [ ] Document the exact API calls needed
- [ ] Have a working test payment before Day 1

## Important Notes

- NEVER expose Client Secret on frontend
- All Interswitch API calls go through our backend (API routes)
- Store transaction references in our bookings table
- Handle all edge cases: timeout, failed, cancelled, duplicate
