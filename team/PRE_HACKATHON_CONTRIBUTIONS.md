# Pre-Hackathon Team Contributions
> **Phase:** Ideation & Planning (March 2026)
> **Goal:** Documented proof of work and collaboration prior to the coding phase.

---

## 1. Beloved (Product Engineer)
**Focus:** Vision, Product Strategy, Architecture, UI/UX Direction

* **Problem Definition:** Reframed the core problem from "finding hairstyles" to "solving the trust gap" in Nigeria's hair industry.
* **Product Framework:** Developed the complete `GLAMGO_HACKATHON_FRAMEWORK.md` and `GLAMGO_CONCEPT.md`.
* **Flow Design:** Architected the client-stylist interaction model, specifically the escrowed Interswitch payment flow (`USER_FLOWS.md`).
* **Visual Direction:** Designed the concept for the premium AI-enhanced gallery hook, shifting focus from a utility app to a visually-led marketplace.
* **Architecture Planning:** Created the system constraints, component tree, and database schema (`ARCHITECTURE_CONTEXT.md`, `COMPONENT_TREE.md`, `DATABASE_SCHEMA.md`).
* **Team Orchestration:** Set up the GitHub organization, repository structure, team access, and documentation standards. Conducted the 3-hour product alignment meeting to lock decisions.

---

## 2. Bukky (Industry Specialist / Domain Expert)
**Focus:** Market Reality, Salon Workflow Validation, User Psychology

* **Booking Mechanics Validation:** Confirmed that stylists hate bookings due to high no-show rates. Validated that escrow/deposits are the only way to ensure commitment.
* **Consumer Psychology:** Explained the multi-step, weeks-long pre-planning phase women go through before booking a hairstyle (YouTube → Instagram → Pinterest → TikTok evolution).
* **Stylist Operations:** Broke down the complex payment models (Shop Owner vs. Independent vs. Apprentice) to help simplify the commission structure for V1.
* **Policy Input:** Pushed back against the initially drafted 50-100% cancellation penalties, correcting them to a realistic 25-30% market standard.
* **Data Seed Planning:** Committed to providing the 20-30 core hairstyle categories, descriptions, and reference photos for the MVP gallery, plus defining necessary client profile variables (hair texture, scalp sensitivity, etc.).

---

## 3. Brother (Lead Developer)
**Focus:** Technical Feasibility, API Integration Strategy, MVP Scoping

* **Scope Management:** Consistently challenged complex feature bloat (e.g., bot calls, multi-stylist routing logic), ensuring the roadmap remained achievable within a 4-day hackathon sprint.
* **Workflow Clarity:** Advocated for clear, linear flowcharts to directly translate business rules into code architecture.
* **Integration Strategy:** Defined the technical boundaries for what must be built (Interswitch payment path, Google Maps API location filtering) versus what can be mocked or deferred to V2.
* **Implementation Prep:** Reviewed the proposed `DATABASE_SCHEMA.md` and API contracts to ensure backend readiness for the Monday coding kick-off.

---

### Phase Summary
The team successfully transformed a broad idea ("Pinterest for Hair") into a scoped, buildable product ("Trust Marketplace with Escrow"). All core decisions are locked in `PRODUCT_DECISIONS.md`. The GitHub repository is structured and populated with comprehensive documentation, ready for the execution phase.
