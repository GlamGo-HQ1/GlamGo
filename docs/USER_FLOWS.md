# User Flows

## Flow 1: Client Discovers and Books a Hairstyle

```
[Open App]
    │
    ▼
[See Premium Gallery] ← Grid of beautiful hairstyle cards
    │
    ├── Filter by category (Braids, Locs, etc.)
    ├── Search by name
    │
    ▼
[Tap a Style] → Style Detail Page
    │
    ├── See multiple images
    ├── See description, price range, duration
    │
    ▼
[See Available Stylists] ← "Stylists who do this style"
    │
    ├── Each stylist: photo, rating, their price, portfolio
    │
    ▼
[Tap "Book"] → Booking Page
    │
    ├── Select date
    ├── Select time slot
    ├── Enter address
    ├── See total price
    │
    ▼
[Tap "Proceed to Payment"] → Payment Page
    │
    ├── Order summary
    ├── Redirect to Interswitch
    ├── Enter card details
    │
    ▼
[Payment Complete] → Confirmation Page
    │
    ├── Booking confirmed ✅
    ├── Booking details shown
    ├── "View My Bookings" button
    │
    ▼
[After Service] → Review Page
    │
    ├── Rate 1-5 stars
    ├── Write comment
    ├── Submit review
    │
    ▼
[Done] ← Stylist gets paid, review is public
```

## Flow 2: Stylist Signs Up and Gets Booked

```
[Register as Stylist]
    │
    ├── Enter name, email, phone
    ├── Select role: Stylist
    │
    ▼
[Complete Profile]
    │
    ├── Add bio
    ├── Upload portfolio photos
    ├── Select specialties
    ├── Set service area
    │
    ▼
[Link Styles They Can Do]
    │
    ├── Browse hairstyles in system
    ├── Select ones they can do
    ├── Set their price for each
    ├── Upload their own photos for each style
    │
    ▼
[Wait for Bookings]
    │
    ├── Profile is visible when clients browse styles
    │
    ▼
[Receive Booking Notification]
    │
    ├── See booking details
    ├── Accept or decline
    │
    ▼
[Go to Client Location]
    │
    ├── Make the hair
    ├── Client confirms in app
    │
    ▼
[Get Paid] ← Payment released to stylist account
```

## Flow 3: Authentication

```
[Landing Page]
    │
    ├── "Sign Up" → Register Page
    │     ├── Enter email, password, name
    │     ├── Select role: Client or Stylist
    │     ├── → Redirect to dashboard
    │
    ├── "Log In" → Login Page
    │     ├── Enter email, password
    │     ├── → Redirect to dashboard (based on role)
    │
    └── Browse gallery (no auth needed for browsing)
         └── Auth required only when booking
```
