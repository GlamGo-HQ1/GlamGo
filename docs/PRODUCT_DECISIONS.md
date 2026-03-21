# GlamGo — Open Product Decisions

Decisions that need to be locked by the team BEFORE March 23. Discuss these together, pick one option per decision, and mark it.

---

## Decision 1: Booking Flow

**Question:** What happens after a client picks a stylist and time slot?

| Option | Flow                                                                          | Recommendation                                       |
| ------ | ----------------------------------------------------------------------------- | ---------------------------------------------------- |
| **A**  | Client books → pays → stylist gets notified → accepts/declines                | ⭐ Recommended                                       |
| **B**  | Client books → stylist confirms first → then client pays                      | Risk: stylist sees client info, they go off-platform |
| **C**  | Client books → pays deposit only → stylist confirms → pays rest after service | More complex, better for V2                          |

**Current pick:** Option A — pay before stylist gets client details. Prevents bypass.

**Team decision:** ******\_\_\_******

---

## Decision 2: Who Travels?

**Question:** Does the stylist come to the client, or client goes to stylist?

| Option                      | What It Means                                                     |
| --------------------------- | ----------------------------------------------------------------- |
| **Stylist sets their mode** | Profile shows: "I come to you" / "You come to me" / "Both"        |
| **Client picks at booking** | At booking time, client toggles: "Come to me" or "I'll go to you" |
| **Both**                    | Stylist sets what they offer, client picks from available options |

**Current pick:** Both — stylist sets options in profile, client picks at booking.

**For V1:** Just show a badge on stylist profile (no price difference yet). Price differentiation in V2.

**Team decision:** ******\_\_\_******

---

## Decision 3: GlamGo Commission

**Question:** What percentage does GlamGo take?

| Option | Rate                      | Notes                   |
| ------ | ------------------------- | ----------------------- |
| 10%    | Lower — attracts stylists | Less revenue            |
| 15%    | Standard marketplace rate | Balanced                |
| 20%    | Higher revenue            | May discourage stylists |

**Also consider:** Do we charge the client, the stylist, or split?

- Most marketplaces charge the service provider (stylist)
- Some charge a small "service fee" to the client too

**Team decision:** ******\_\_\_******

---

## Decision 4: Cancellation Policy

**Question:** What happens when someone cancels?

| Scenario                      | Proposed Rule                                                   |
| ----------------------------- | --------------------------------------------------------------- |
| Client cancels > 24hrs before | Full refund to wallet                                           |
| Client cancels < 24hrs before | 50% refund to wallet, 50% to stylist (they blocked a time slot) |
| Client cancels < 2hrs before  | No refund, full payment to stylist                              |
| Stylist cancels anytime       | Full refund to client wallet + stylist gets warning             |
| Stylist no-show               | Full refund + stylist ranking penalty                           |
| Client no-show                | Stylist keeps payment                                           |

**Team decision:** ******\_\_\_******

---

## Decision 5: Confirmation Code or Button?

**Question:** How does the client confirm service was completed?

| Option           | How It Works                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| **Code**         | App shows client a 4-digit code. Stylist enters code after finishing. Proves both parties agree. |
| **Button**       | Client taps "Service Complete" in app. Simpler but easier to abuse.                              |
| **Auto-release** | If nobody complains within 24hrs after appointment time, payment auto-releases.                  |

**Current pick:** Code + auto-release (24hr fallback). Best protection for both.

**Team decision:** ******\_\_\_******

---

## Decision 6: Google Maps API

**Question:** Do we use Google Maps for nearest stylist search?

| Option       | Effort                                  | Impact                                                   |
| ------------ | --------------------------------------- | -------------------------------------------------------- |
| **Yes — V1** | Medium (API key + distance calculation) | Big wow factor for judges                                |
| **No — V2**  | Zero                                    | Stylists just list their area as text ("Lekki", "Ikeja") |

**Note:** Google Maps API has a free tier (200 USD/month credit ≈ 28,000+ requests). Enough for hackathon.

**Team decision:** ******\_\_\_******

---

## Decision 7: Visual Direction

**Question:** What's the visual vibe of GlamGo?

| Option                  | Feels Like                                                  |
| ----------------------- | ----------------------------------------------------------- |
| **Dark luxury**         | Net-a-Porter, high fashion, gold accents on black           |
| **Light editorial**     | Vogue, clean white space, typography-driven                 |
| **Vibrant Afro-modern** | Bold colors, celebrating African beauty, energetic          |
| **Minimal tech**        | Clean lines, lots of white space, feels like a tech product |

**This gets decided after your Dribbble/Behance research session.**

**Team decision:** ******\_\_\_******

---

## How to Use This Document

1. Each team member reads this document
2. Discuss each decision (in person or group call)
3. Write your choice next to "Team decision"
4. Once all 7 are locked, we update the build plan accordingly
5. **Deadline: End of March 22**
