# Service Curation Dashboard Audit

This document outlines the 12 confirmed issues regarding the Service Curation dashboard functionality, overall platform integration, and final hackathon presentation requirements. These issues stem from the fact that the dashboard currently relies on pre-hackathon mocked UI components and has not yet been fully connected to the backend database mechanisms.

We will tackle these one by one after all issues are confirmed.

---

### 1. Upload Gallery Button is Unresponsive
* **The Problem:** Clicking the "Upload" area does not open the computer's native file browser.
* **Context / Root Cause:** The upload button is currently a visual UI shell. It lacks the functional `<input type="file">` HTML tag and the corresponding onChange React event handlers necessary to capture files from the user's hard drive and upload them to the Supabase Storage bucket.

### 2. Missing "Delete" Functionality for Evidence Pictures
* **The Problem:** There is no way for a stylist to delete or remove the four evidence pictures currently shown on the dashboard.
* **Context / Root Cause:** The current images are hardcoded or static placeholders. To fix this, we need to overlay a "Trash/Delete" icon pattern on the images and map it to a database function that removes the photo reference from the `stylist_profiles` or `services` table.

### 3. Service Curation Actions Are Not Saving to the Database
* **The Problem:** Any actions taken (e.g., "Add a hairstyle" or filling out the curation form) are lost when logging out or switching devices.
* **Context / Root Cause:** The form is currently maintaining data in local React State in the browser's memory. It is missing the submission handlers that fire an `INSERT` or `UPDATE` request to the Supabase backend to permanently commit the data.

### 4. "Preview Profile" Button Redirects Incorrectly
* **The Problem:** Tapping "Preview Profile" at the bottom of the curation page redirects the user back to the general "Find Your Stylist" directory instead of their personal profile.
* **Context / Root Cause:** The button's `href` link is hardcoded to `/stylists/` instead of dynamically routing the stylist to their specific profile page (e.g., `/stylists/[stylist-id]`).

### 5. Search Bar Navigation & Missing Stylists
* **The Problem:** 
  1. The global Search Bar redirects the user to the main `/gallery`, making it impossible to search locally within the Stylist Curation page.
  2. Newly registered stylist accounts do not appear on the "Find Your Stylist" page.
* **Context / Root Cause:** 
  1. The global Navbar search is hardwired to the main gallery. We need a contextual or isolated search function inside the dashboard.
  2. The "Find Your Stylist" page is either using hardcoded mock data, or the newly registered stylist lacks a specific database flag (like `is_approved = true` or an uploaded avatar) required by the `SELECT` query to be fetched and displayed publicly.

### 6. Empty Portfolio on Client-Facing Stylist Profile
* **The Problem:** Even though a stylist (like Choma) has evidence pictures showing in their personal dashboard, when a client views their public Stylist Profile, the portfolio/gallery section is completely empty.
* **Context / Root Cause:** The client-facing `StylistProfile` or `GalleryPreview` component is either not fetching from the `stylist_profiles.portfolio_images` column correctly, or the data seeded in the database dashboard isn't structured in the format the component expects to render it. The data exists in the dashboard but the bridge to the public display is broken.

### 7. Missing 7-Day Advanced Booking Rule
* **The Problem:** Clients can currently book appointments for the immediate set of upcoming days. There needs to be a mandatory 7-day "cool-off" window where stylists cannot be booked for today or the next 6 days, giving them time to structure their calendar without surprise emergency bookings.
* **Context / Root Cause:** The date-picker component (likely in the `BookingFlow` or `Calendar` component) currently allows selecting dates from `Date.now()`. We need to implement a rule that disables all dates `Date.now() + 7 days`. This directly correlates with the cancellation policy, which will just be documented as a 7-day notice period.

### 8. Missing Geolocation/Proximity Simulation in UI
* **The Problem:** The core philosophy of GlamGo is matching clients with the *closest* available stylist. We intentionally skipped the Google Maps API integration to save time, but the frontend UI does not simulate this proximity feature.
* **Context / Root Cause:** The Stylist Cards need hardcoded or randomly generated proximity mock data (e.g., "3.2 km away - Victoria Island") to simulate the geolocation match. We also need to clearly state in the `README.md` or Architecture docs *why* the actual Maps API was skipped for the MVP (focused strictly on core booking/payment logic for this specific hackathon scope).

### 9. Missing "View Password" Toggle on Authentication Pages
* **The Problem:** Users typing their password on Login or Register cannot see what they are typing.
* **Context / Root Cause:** The password input fields lack the "Eye" icon and the corresponding React state toggle (`type="password"` to `type="text"`) that allows visibility.

### 10. Missing "Reason for Declination" on Stylist Dashboard
* **The Problem:** When a stylist rejects an incoming booking request, they are not prompted to provide a reason to the client.
* **Context / Root Cause:** The "Decline" button currently just fires a state change. It needs to pop up a small modal with a text input (e.g., "Fully booked", "Out of town") so the client receives context for the rejection.

### 11. Confusing "Start Service" Button & Verification Flow
* **The Problem:** On the Stylist Dashboard, upcoming appointments display a "Start Service" button that does nothing when clicked. Furthermore, it appears on appointments that are scheduled for days in the future (e.g., March 28th), which shouldn't happen until the actual day of the appointment.
* **Context / Root Cause:** The UI flow for how a stylist actually enters the client's 4-digit verification code to release funds is poorly mapped. The button doesn't trigger the verification modal, and the date logic isn't conditionally hiding the button for future dates.

### 12. End-to-End Database Integration Barrier (The Live Demo Requirement)
* **The Problem:** The app cannot currently support a fluid, live demo where you create a brand new Stylist -> add services -> log out -> log in as a new Client -> find that exact stylist -> book them -> log back in as the Stylist -> and see the notification. 
* **Context / Root Cause:** Most of the current UI relies on hardcoded mockup data rather than dynamic Supabase fetches. A newly registered stylist is inserted into the `auth.users` system, but the public directory page is not actively pulling from `stylist_profiles`, and the booking form is not writing to an `appointments` table that the Stylist Dashboard listens to. Bridging this gap requires replacing front-end mock arrays with actual Supabase `select()` and `insert()` calls.
