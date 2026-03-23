# GlamGo — Hackathon Framework (FINAL)

> **Status:** LOCKED — This is what we are building. No changes unless all 3 of us agree.
> **Date:** March 21, 2026
> **From:** Product Lead
> **To:** All Team Members

---

## Why This Document Exists

We had a very long meeting (almost 3 hours) where we discussed a LOT. From how ladies choose hairstyles to how stylists get paid, from booking flows to cancellation penalties, from automated bot calls to escrow wallets. It was a good meeting — Bukky gave us real industry knowledge that shaped our understanding.

But after reviewing everything, we realised something important: **we were asking the wrong questions.** We were trying to solve business-at-scale problems instead of focusing on what actually matters for this hackathon.

This document is the result of going back, questioning our questions, and coming to a much cleaner, simpler understanding of what GlamGo needs to be.

---

## The Question We Were Asking (Wrong)

> *"Why would someone who already has a stylist pay through GlamGo?"*

This question led us into rabbit holes — automated calls to remind stylists, cancellation penalty percentages, wallet systems, and justice for both sides. These are real business problems, but they are not hackathon problems.

## The Question We Should Be Asking (Right)

> *"What problem exists in the hair industry where payment is NATURALLY part of the solution?"*

When we asked it this way, the answer became obvious.

---

## The Problem We Are Solving

**There is zero trust infrastructure in Nigeria's hair industry.**

Think about it:

- When you try a **new stylist**, you don't know if they can actually deliver what you saw on TikTok. You're gambling your money and your time.
- When a stylist **saves a time slot for you**, she doesn't know if you'll actually show up. She could lose a whole afternoon waiting for you while turning away other customers.
- When you sit in the chair, the stylist can say *"your hair is harder than I thought, pay more."* You have no protection against price changes.
- Stylists get **burned by no-shows** all the time. Bukky told us this clearly — they hate bookings because people don't keep to time and nobody gets penalised.

Both sides take risks every single transaction. Nobody trusts anybody fully.

## Our Solution

**GlamGo is a visual hair marketplace with built-in payment protection powered by Interswitch.**

Here's what that means in simple terms:

1. **For clients:** You see beautiful hairstyles in our gallery. You find a stylist near you who can do that style. You see their price UPFRONT — locked, no surprises. You pay through the app. Your money is HELD (escrow) until the service is done. If the stylist delivers, she gets paid. Simple.

2. **For stylists:** When a client books through GlamGo, they've already paid. That means they're serious. No more wasted time slots. No more "I'll come tomorrow" and then disappearing. The money is already there.

**The gallery pulls people in. The payment protects them. One without the other is incomplete.**

---

## Why Interswitch Is NOT an Add-On

This is important — please read this carefully.

Interswitch payment is not something we bolted on because the hackathon requires it. Payment is the **core mechanism** that makes the whole thing work:

| Without GlamGo | With GlamGo |
| --- | --- |
| You don't know the real price until you sit down | Price is locked when you book |
| Stylist doesn't know if you'll show up | You already paid — you're committed |
| Trying a new stylist = gambling | Escrow holds your money until you're happy |
| Client no-shows, stylist loses a time slot | Built-in booking commitment |

If we remove payment, GlamGo is just Pinterest for hair. That's a mood board, not a product.

---

## What We Are Building (The Scope)

### YES — We Build These

| Feature | What It Does |
| --- | --- |
| **Hair Gallery** | Beautiful grid of hairstyles with categories/filters. Photos will be AI-enhanced by Product Lead before upload |
| **Stylist Profiles** | Name, portfolio (past work), base price, star rating, service mode badge, available time slots |
| **Service Mode Badge** | Shows whether stylist does "Come to me," "I come to you," or "Both" |
| **Nearby Stylist Search** | Google Maps API shows stylists near the client who can do the selected style |
| **Booking Flow** | Client picks style → picks stylist → selects available time slot → pays |
| **Interswitch Payment** | Client pays, money goes to escrow. Released to stylist after service is confirmed |
| **Confirmation Code** | After booking, a code appears in client's app. Client shows it to stylist when they meet. Stylist enters the code = "work started" |
| **Service Rendered** | After the hair is done, client taps "Service Rendered" → money is released to stylist from escrow |
| **Post-Service Rating** | After confirming service, client gives 1-5 stars and a short comment |
| **Client Hair Profile** | Basic info during signup: hair type, length, texture — so stylists know what to expect |

### NO — We Are NOT Building These

| Removed Feature | Why |
| --- | --- |
| Automated bot/phone calls to stylists | Not needed. This is a booking service — stylists check requests at their own pace, not in real-time |
| Cancellation penalty logic | We mention it in the pitch deck. We don't code percentages or refund rules |
| Complex per-style pricing | Stylist sets a base price range. No price-per-style-per-hair-type matrix |
| Stylist earnings dashboard | V2 feature. Not needed for demo |
| Multiple payment methods / wallet top-up | One payment path through Interswitch. Keep it clean |
| Multi-stylist request (code) | The UI is designed to look like you can select multiple stylists, but the code handles single-stylist booking. In the demo, we say "supports multi-request" — it's a V2 feature |
| Preference matching (soft hand, etc.) | Real concern, but not solvable by tech in 4 days. Not our problem to solve right now |

---

## The Demo Flow (What Judges Will See)

This is the flow we will demo from start to finish:

```
1. Open GlamGo → See the beautiful hair gallery
2. Browse / filter hairstyles → Tap one you like
3. See the hairstyle details (multiple angles, description)
4. See nearby stylists who can do this style (Google Maps)
5. Tap a stylist → See their profile, portfolio, price, rating, availability
6. Pick a time slot → Tap "Book & Pay"
7. Interswitch payment screen → Pay
8. Booking confirmed → Confirmation code appears
9. (Day of appointment) Client shows code to stylist → Stylist enters it → "Work started"
10. Hair is done → Client taps "Service Rendered"
11. Money released to stylist → Client rates the service ⭐
```

That's 11 steps. That's the whole demo. Clean, complete, impressive.

---

## The Compromise You Should Know About

**Multi-stylist request:** In a real-world scenario, a client might want to send a booking request to 2-3 stylists and take whoever accepts first. This prevents being "held hostage" waiting for one stylist to respond.

For the hackathon:

- The **UI design** will show that you can select multiple stylists (checkboxes)
- The **code** handles single-stylist booking (you pick one, she accepts or declines)
- If the stylist **declines**, client goes back to the stylist list and picks another
- In the **pitch**, we say: *"The system supports multi-request — first to accept gets the booking"*

This is standard for startups — you show what it will do, you demo what it can do today.

---

## Platform Economics (For the Pitch Deck)

When judges ask "how does GlamGo make money?":

- **Small service fee** from the client per booking (like ₦200-500)
- **15% commission** from the stylist's earnings per transaction
- Both sides contribute. Neither side carries the full cost.

We don't need to build commission-deduction logic. We just need this slide in the pitch.

---

## Key Decisions Summary

| # | Decision | What We Chose |
| --- | --- | --- |
| 1 | Booking Flow | Client books → pays → stylist gets notified → accepts/declines. Payment before contact reveal |
| 2 | Who Travels | Stylist sets their mode (badge). Client picks based on preference |
| 3 | Commission | Split: service fee + 15% from stylist |
| 4 | Cancellation | Mention in pitch only. Don't build the logic |
| 5 | Confirmation | Code for mutual presence + "Service Rendered" button for payout |
| 6 | Google Maps | Yes for V1. Free tier is enough |
| 7 | Visual Direction | Still open — Product Lead researching today and will decide |

---

## What This Means For Each Team Member

### Product Lead (Beloved)

- Lock Decision 7 (visual direction) — TODAY
- AI-enhance the gallery photos using Bukky's hairstyle categories
- Design the UI screens for the demo flow
- Write the pitch deck content

### Backend Developer (Brother)

- Build the booking flow: request → accept/decline → escrow → payout
- Integrate Interswitch API for payments
- Integrate Google Maps API for nearest-stylist search
- Set up the database: users, stylists, styles, bookings
- Build starts: **Monday night**

### Industry Specialist (Bukky)

- Provide the hairstyle names, categories, and descriptions
- Source 20-30 quality hairstyle photos for the gallery seed data
- Validate that the booking flow makes sense from a real salon perspective
- Review the final product before submission

---

## Final Word

We're not building a perfect business. We're building a solution to a real problem and showing it works. The gallery is the hook. The payment is the mechanism. The escrow is the innovation.

Let's stop overthinking and start building.

**— Team GlamGo**
