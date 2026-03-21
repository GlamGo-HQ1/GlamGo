# Page Structure (Next.js App Router)

## Routes

```
app/
├── page.tsx                          → Home / Hairstyle Gallery (THE HERO PAGE)
├── layout.tsx                        → Root layout with nav
├── globals.css                       → Global styles
│
├── styles/
│   └── [id]/
│       └── page.tsx                  → Individual Style Detail Page
│
├── stylists/
│   ├── page.tsx                      → Browse All Stylists
│   └── [id]/
│       └── page.tsx                  → Individual Stylist Profile
│
├── booking/
│   ├── [styleId]/
│   │   └── [stylistId]/
│   │       └── page.tsx              → Booking Form (date, time, location)
│   └── confirm/
│       └── page.tsx                  → Booking Confirmation Page
│
├── payment/
│   ├── page.tsx                      → Payment Processing Page
│   └── callback/
│       └── page.tsx                  → Interswitch Payment Callback
│
├── dashboard/
│   ├── page.tsx                      → Client Dashboard (my bookings)
│   └── stylist/
│       └── page.tsx                  → Stylist Dashboard (incoming bookings)
│
├── auth/
│   ├── login/
│   │   └── page.tsx                  → Login Page
│   ├── register/
│   │   └── page.tsx                  → Register Page (choose role)
│   └── callback/
│       └── route.ts                  → Auth callback handler
│
├── review/
│   └── [bookingId]/
│       └── page.tsx                  → Leave Review Page
│
└── api/
    ├── bookings/
    │   └── route.ts                  → Create/manage bookings
    ├── payment/
    │   ├── initiate/
    │   │   └── route.ts              → Initiate Interswitch payment
    │   └── verify/
    │       └── route.ts              → Verify payment callback
    ├── reviews/
    │   └── route.ts                  → Submit reviews
    └── stylists/
        └── route.ts                  → Get stylists (with filters)
```

## Page Details

### Home (Gallery) — `/`

- Premium grid of hairstyle cards
- Category filter bar at top (All, Braids, Cornrows, Locs, etc.)
- Search bar
- Trending section
- Each card: main image, style name, price range, duration
- Clicking a card → `/styles/[id]`

### Style Detail — `/styles/[id]`

- Hero image gallery (multiple angles)
- Style name, description, price range, duration
- "Stylists Who Do This Style" section
- Each stylist card: photo, name, rating, their price, portfolio thumbnail
- Click "Book" → `/booking/[styleId]/[stylistId]`

### Stylist Profile — `/stylists/[id]`

- Profile photo, name, bio, rating
- Specialties tags
- Portfolio grid (all their work)
- Reviews section
- "Book This Stylist" CTA

### Booking — `/booking/[styleId]/[stylistId]`

- Selected style summary
- Selected stylist summary
- Date picker
- Time slot selector
- Location input (address)
- Price display
- "Proceed to Payment" button

### Payment — `/payment`

- Order summary
- Interswitch payment integration
- Redirect to Interswitch → callback → confirmation

### Client Dashboard — `/dashboard`

- Upcoming bookings
- Past bookings
- Quick actions (rebook, review)
