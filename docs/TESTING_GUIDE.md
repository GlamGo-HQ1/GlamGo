# GlamGo — Testing Guide for Judges

> **Live Demo:** [https://glam-go.vercel.app](https://glam-go.vercel.app)

---

## 🧪 Demo Accounts

| Role | Email | Password |
| --- | --- | --- |
| **Client** | `demo.client@glamgo.ng` | `GlamGo2026!` |
| **Stylist** | `stylist.adaeze@glamgo.ng` | `GlamGo2026!` |
| **Stylist** | `stylist.chioma@glamgo.ng` | `GlamGo2026!` |

---

## 💳 Interswitch Sandbox Test Card

Use these details when prompted to pay during the booking flow:

| Field | Value |
| --- | --- |
| **Card Number** | `5061050254756707864` |
| **Expiry Date** | `06/26` |
| **CVV** | `111` |
| **PIN** | `1111` |
| **OTP** | `123456` |

> **Note:** This is Interswitch's sandbox/test environment. No real money is charged. The card details above are provided by Interswitch for testing purposes only.

---

## 🔄 Recommended Test Flow

### As a Client (Full Booking Journey)

1. Visit [https://glam-go.vercel.app](https://glam-go.vercel.app)
2. Log in with `demo.client@glamgo.ng` / `GlamGo2026!`
3. Browse the **Gallery** → Tap any hairstyle (e.g., Fulani Braids)
4. View the style details (multiple angles, pricing, duration)
5. Select an **Available Stylist** (e.g., Adaeze Okonkwo)
6. View the stylist's profile → Tap **Book Session**
7. Fill in the booking form (date, time, notes)
8. Complete payment using the **test card details above**
9. Receive your **4-digit verification code**

### As a Stylist (Accepting & Completing)

1. Log out of the client account
2. Log in with `stylist.adaeze@glamgo.ng` / `GlamGo2026!`
3. Open the **Stylist Dashboard**
4. View pending booking requests
5. **Accept** the booking
6. Enter the client's **4-digit verification code** to start the service
7. Once complete, the client confirms **"Service Rendered"**
8. Escrow funds are released to your account

---

## 📊 What Each Dashboard Shows

### Client Dashboard
- Booking history with status tracking
- Active check-in codes for upcoming appointments
- Quick re-booking from past styles

### Stylist Dashboard
- Revenue analytics and booking statistics
- Pending/active booking management (accept/decline)
- **Service Curation** — claim hairstyles from the global catalog and set custom pricing

---

## 🖥️ Best Viewing Experience

- **Desktop:** Full experience with side-by-side layouts, video gallery, and editorial animations
- **Mobile:** Responsive layout with bottom navigation and touch-optimized galleries
- **Recommended Browser:** Chrome, Edge, or Safari (latest version)
