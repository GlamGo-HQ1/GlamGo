# GlamGo Product Roadmap: Stylist Liquidity & Capabilities

*This document outlines the Phase 2 mechanisms for rapidly onboarding stylists, validating their skills, and managing their availability. Present this to judges as the post-hackathon growth strategy.*

## 1. Global Catalog "Claiming" (Low-Friction Onboarding)
**The Problem:** Asking a new stylist to upload their own services, write descriptions, and set up a menu from scratch is high-friction and leads to drop-offs.
**The GlamGo Solution:** 
Stylists browse the existing **Global Hairstyle Catalog** (the same one clients see) and simply click **"I can do this"**.
- The style is instantly added to their profile.
- They set their specific price and duration.
- **Notification System:** When GlamGo admins add a new trending hairstyle (e.g., "Tyla Braids") to the global catalog, all stylists receive a push notification: *"15 new styles added to the catalog. Can you do them? Update your profile now."*

## 2. Proof of Work (The Evidence Engine)
**The Problem:** Clients don't trust stock photos. 
**The GlamGo Solution:**
When a stylist claims a global style, they are prompted to upload **"Proof of Work"**.
- **Media:** Short video clips (TikTok/Reel style) of them actively making the hair, or high-definition photos of their actual past clients.
- **Client Trust:** On the client side, when viewing a stylist's profile, the standard catalog image is replaced by (or supplemented with) the stylist's actual video/photo evidence.
- **Algorithmic Boost:** Stylists with verified "Proof of Work" videos are ranked higher in the search results when a client searches for that specific hairstyle.

## 3. Dynamic Availability & Calendar Matrix
**The Problem:** Stylists take holidays, have unpredictable hours, or get fully booked offline.
**The GlamGo Solution:**
A dedicated availability module within the Stylist Dashboard.
- **Standard Hours:** Set default working hours (e.g., Tue-Sat, 9AM-6PM).
- **Time-Off Toggle:** A one-click "Go Offline" toggle for holidays or sick days that instantly removes them from the client booking results.
- **Smart Drafting:** When a client searches for a style + date, the system cross-references the stylist's availability matrix. If they are on holiday, the system automatically drafts/recommends the *next best* available stylist in their tier.

## Technical Feasibility (Why Phase 2?)
While the core database (`stylist_profiles`, `hairstyles`, `stylist_styles`) fully supports the relationships required for these features today, building the multi-step React UI, video processing pipelines (via Supabase Storage & edge functions), and complex calendar math (handling overlapping bookings and timezones) is a multi-week engineering sprint. 

For the MVP/Hackathon, the platform demonstrates the **End-to-End Booking Flow** with pre-seeded data, while this roadmap proves the team's deep understanding of marketplace liquidity mechanics.
