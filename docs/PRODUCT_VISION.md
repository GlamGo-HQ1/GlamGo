# GlamGo — Product Vision

The full product vision organized by what we build for the hackathon (V1) and what comes after (V2). Share this with your team so everyone sees the depth of thinking.

---

## Core Concept

**GlamGo** is a premium visual-first marketplace connecting clients who want beautiful hairstyles with verified stylists who can deliver. The visual gallery IS the product — not a directory, not a listing site.

---

## V1 — Hackathon Build (March 23-26)

What we ship in 4 days. Simple, working, impressive.

### Landing Page

- 3D Spline hero (desktop), static fallback (mobile)
- Problem statement, how it works (3 steps), gallery preview
- Stylist CTA, social proof, signup

### Authentication

- Client signup/login (email or Google)
- Stylist signup (email → profile setup: name, specialties, portfolio, availability)
- Role-based routing after login

### Gallery (THE CORE)

- Visual masonry grid of hairstyles
- Filters: category, price range, hair type
- Style detail page: images, price, duration, similar styles
- Link to stylists who can do this style

### Stylist Profiles

- Photo, name, rating, portfolio
- Specialties + general location area (NOT exact address)
- Availability calendar (time slots)
- **Service mode badge:** "Mobile" (comes to you) / "Salon" (you come to them) / "Both"

### Booking Flow (V1 — Simple)

1. Client picks style → sees available stylists
2. Client picks stylist + time slot → taps "Book"
3. Client pays full amount via Interswitch → money goes to GlamGo
4. Stylist gets notification → accepts or declines (30 min window)
5. If declined → refund to client's GlamGo wallet
6. If accepted → both see contact info + in-app chat
7. Service happens → client enters confirmation code → stylist gets paid (minus GlamGo %)

### Payment (V1)

- Interswitch integration for deposits
- GlamGo wallet (simple balance field — deposits, payments, refunds)
- Stylist sets their own price per hairstyle (flat rate, includes everything)
- GlamGo takes X% cut on each transaction
- Confirmation code system to release payment

### Post-Payment

- Progress tracker: Booked → Stylist Confirmed → Appointment Day → Complete
- Push notifications at each step
- "Stylist didn't show" button → wallet refund
- Rate & review after service

### Dashboards

- **Client:** Upcoming bookings, history, saved styles, wallet balance
- **Stylist:** Incoming requests, calendar, earnings, portfolio management, wallet

---

## V2 — Post-Hackathon Roadmap

Everything below is the **bigger vision**. These features make GlamGo a real business, not just a hackathon demo.

### 🗺️ Location & Proximity (Google Maps API)

- **Nearest stylist search:** Client sees stylists ranked by distance
- **Map view:** Browse stylists on an interactive map
- **Distance-based pricing:** Transportation cost calculated automatically based on distance between client and stylist
- **Privacy:** Stylists set a "service radius" — not their exact home address

### 🏠 Service Location Model

- **Stylist comes to you:** Client's address needed, transport fee added to price
- **Client goes to stylist:** Stylist's salon/shop location shown, no transport fee
- **Both available:** Client picks which option, price adjusts automatically
- **Per-stylist setting:** Each stylist configures their service mode in their profile
- **Dynamic pricing:** Same hairstyle, different price based on who travels:
  - Client goes to stylist = base price only
  - Stylist comes to client = base price + calculated transport fee
  - Transport fee could be: flat rate set by stylist, OR distance-calculated via Google Maps

### 💳 Advanced Payment Features

- **Subscription tiers:**
  - Free: basic access, standard commission
  - Premium Client (₦X/month): discounted booking fees, priority matching
  - Premium Stylist (₦X/month): lower commission %, featured placement, analytics
- **Promotional pricing:** "Book this week, 0% transport fee" campaigns
- **Split payments:** Pay part now, part after service
- **Tipping:** Client can tip stylist through the app after service

### 🔔 Smart Matching & Notifications

- **Broadcast booking:** "I need braids tomorrow" → goes to all nearby stylists → first to accept wins (Uber model)
- **Smart recommendations:** AI suggests stylists based on past bookings, style preferences, location
- **Recurring bookings:** "Every 3 weeks, same stylist, same style"
- **Waitlist:** If favorite stylist is booked, join waitlist for cancellation alerts

### 📸 Gallery Enhancements

- **Video thumbnails:** 2-3 second clips showing hair movement (AI-generated or real)
- **Multiple angles:** Swipe to see front/back/side views
- **Skin tone preview:** Toggle to see how a style looks on different complexions
- **AR try-on:** Point camera at yourself, see hairstyle overlaid (very aspirational)
- **Stylist video portfolio:** Short clips of stylists working

### 📊 Analytics & Business Tools (For Stylists)

- Earnings dashboard with charts
- Busiest days/times analysis
- Client retention rate
- Most requested styles
- Revenue projections

### 🛡️ Trust & Safety

- **ID verification** for stylists
- **Background checks**
- **Insurance integration** (if stylist damages client's hair)
- **Dispute resolution** system
- **Escrow with hold period** instead of instant release

### 🤝 Anti-Bypass Measures (Platform Protection)

- No contact info visible until payment is made
- In-app chat as primary communication
- Review/rating system only for on-platform transactions
- Stylist ranking algorithm rewards platform activity
- Loyalty rewards for repeat on-platform bookings
- Volume discounts only available through GlamGo

---

## Feature Priority Matrix

| Feature                                | User Impact   | Build Effort | Priority |
| -------------------------------------- | ------------- | ------------ | -------- |
| Gallery with filters                   | 🔥 Critical   | Medium       | V1       |
| Booking + Payment                      | 🔥 Critical   | Medium       | V1       |
| Stylist profiles                       | 🔥 Critical   | Low          | V1       |
| Confirmation code                      | High          | Low          | V1       |
| Service mode badge (mobile/salon/both) | High          | Low          | V1       |
| GlamGo wallet                          | High          | Medium       | V1       |
| Google Maps nearest stylist            | High          | Medium       | V2 early |
| Distance-based transport pricing       | Medium        | High         | V2       |
| Video thumbnails                       | High          | Medium       | V2 early |
| Subscriptions                          | Medium        | High         | V2       |
| Skin tone preview                      | 🔥 Wow factor | Very High    | V2 late  |
| AR try-on                              | 🔥 Wow factor | Extreme      | V3+      |
| Smart matching / broadcast             | Medium        | High         | V2       |
| Analytics dashboard                    | Medium        | Medium       | V2       |
