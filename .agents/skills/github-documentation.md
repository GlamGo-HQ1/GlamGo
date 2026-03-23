---
description: Ensures every GitHub commit, PR, and milestone is documented at a professional level
---

# Skill: Professional GitHub Documentation

## When to Use

When making any commit, creating PRs, writing issues, or updating the README.
This skill ensures our GitHub repo looks like it was managed by a professional
product team — because judges check commit history.

## Commit Message Standard

Follow conventional commits strictly:

```
type(scope): concise description

[optional body — what and why, not how]
[optional footer — references issues]
```

### Types

| Type | When |
| :--- | :--- |
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change that doesn't fix bug or add feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build process, tooling, dependencies |
| `ci` | CI/CD changes |

### Scopes

| Scope | Area |
| :--- | :--- |
| `gallery` | Hairstyle gallery page |
| `booking` | Booking flow |
| `payment` | Interswitch payment |
| `auth` | Authentication |
| `stylist` | Stylist profiles |
| `dashboard` | User dashboards |
| `api` | API routes |
| `db` | Database/schema |
| `ui` | General UI components |
| `config` | Project configuration |

### Examples

```
feat(gallery): add hairstyle card component with hover animation
fix(payment): handle Interswitch timeout error gracefully
docs: add API documentation for booking endpoints
feat(booking): implement date and time slot picker
refactor(auth): extract role-based redirect logic
```

## The "Luxury Documentation" Strategy

GlamGo uses a dual-documentation strategy to balance developer speed with premium presentation:

1. **Standard Markdown (The Engine):** Use this for ALL daily code commits, PRs, and issues. Keeps the team moving fast without design overhead.
2. **Premium Visual Decks/PDFs (The Showroom):** Use tools like Gamma or Arena for high-level strategy (Product Vision, Pitch Decks, Architecture Overviews). Do NOT attach these to daily code commits.

**Rule of Thumb:** If it's code, it's Markdown. If it's business strategy, design, or a milestone presentation for judges, it's a Premium Deck.

## README Structure (The Main Landing Page)

The GitHub README is the entry point for judges. It must look incredible and aggressively push readers to your premium visual decks.

```markdown
# 👑 GlamGo — [Tagline]

[One compelling paragraph about what GlamGo is]

> 💎 **Executive Strategy & Vision**
> *For a deep dive into our business model, cancellation policy, and roadmap, review our official Strategy Documentation:*
> 🔗 **[View the GlamGo Luxury Blueprint (PDF/Arena Link)]**
> 🔗 **[View the Product Decisions Log (PDF/Arena Link)]**

## 📱 Screenshots

[2-4 screenshots of the key screens]

## ✨ Features

- [Feature 1]
- [Feature 2]
- [Feature 3]

## 🛠 Tech Stack

[Table of technologies used]

## 🚀 Getting Started

[Setup instructions]

## 🏗 Architecture

[Brief architecture overview with diagram]

## 👥 Team

[Team members with photos and roles]
```

## Issue Templates

### Bug Report

```markdown
## Bug Description
[Clear description]

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Screenshots
[If applicable]
```

### Feature Request

```markdown
## Feature Description
[What feature]

## User Story
As a [type of user], I want [goal] so that [benefit].

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2

## Priority
[Critical / Important / Nice-to-Have]
```

## PR Description Template

```markdown
## What This PR Does
[Brief description]

## Related Issue
Closes #[issue number]

## Changes Made
- [Change 1]
- [Change 2]

## Screenshots
[Before/After if UI change]

## Testing
- [ ] Tested locally
- [ ] Tested on mobile
- [ ] Edge cases handled
```

## Branch Naming

```
feat/gallery-card-component
fix/payment-timeout-handling
docs/readme-screenshots
refactor/auth-redirect-logic
```

## Quality Check

Before every commit:

- [ ] Commit message follows convention
- [ ] Code compiles without errors
- [ ] No console.log debugging left in code
- [ ] Related issue referenced (if applicable)
