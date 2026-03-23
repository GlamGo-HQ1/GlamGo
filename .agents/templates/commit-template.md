# Commit Message Template

## Format

```
<type>(<scope>): <short description>

<optional body — explain WHY, not WHAT>
```

## Types

- `feat` — New feature
- `fix` — Bug fix
- `style` — CSS/visual changes (no logic change)
- `refactor` — Code restructure (no behavior change)
- `docs` — Documentation only
- `chore` — Build, config, dependency changes
- `test` — Adding or fixing tests

## Scopes (GlamGo-specific)

- `gallery` — Hairstyle gallery/discovery
- `booking` — Booking flow
- `payment` — Interswitch payment integration
- `auth` — Authentication/registration
- `dashboard` — User/stylist dashboards
- `profile` — Stylist profiles
- `ui` — Shared UI components
- `db` — Database schema/queries

## Examples

```
feat(gallery): add masonry grid with lazy loading
feat(booking): implement time slot picker with availability check
fix(payment): handle Interswitch callback timeout
style(ui): update button hover states for premium feel
refactor(auth): extract Supabase client into shared utility
docs(readme): add setup instructions for new developers
chore(deps): update next.js to 14.2.1
```
