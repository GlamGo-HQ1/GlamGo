# Antigravity Bridge (Local Router)

Purpose: lightweight local routing layer so agents can consistently use the external Anti-Gravity system without copying it into this repo.

Source of truth:
- `C:\Users\Swift America\.gemini\antigravity\`

Startup reads (always first):
1. `C:\Users\Swift America\.gemini\antigravity\GEMINI.md`
2. `C:\Users\Swift America\.gemini\antigravity\GLOBAL_MEMORY.md`

Folder rule:
- Before using a folder from the external system, read that folder's `README.md` first.

## Task Router

Pick one workflow per task (run sequentially if task spans multiple types):

- Build/implement feature:
  - Workflow: `C:\Users\Swift America\.gemini\antigravity\workflows\workflow-build-feature.md`
  - Skills: `coding/SKILL.md` (primary), `testing/SKILL.md` (secondary), `security/SKILL.md` (secondary if boundary/risk)
  - Contexts: `stack-context.md`, `coding-standards.md`, plus `architecture-context.md` for structural changes

- Debug/fix issue:
  - Workflow: `C:\Users\Swift America\.gemini\antigravity\workflows\workflow-debug-issue.md`
  - Skills: `debugging/SKILL.md` (primary), `review-audit/SKILL.md` (secondary)
  - Contexts: `stack-context.md`, `architecture-context.md`

- Review/audit code:
  - Workflow: `C:\Users\Swift America\.gemini\antigravity\workflows\workflow-review-code.md`
  - Skills: `review-audit/SKILL.md` (primary), `security/SKILL.md` (always secondary)
  - Contexts: `coding-standards.md`, `stack-context.md`, `architecture-context.md`, `domain-rules.md`

- Security audit:
  - Workflow: `C:\Users\Swift America\.gemini\antigravity\workflows\workflow-security-audit.md`
  - Skills: `security/SKILL.md` (primary), `review-audit/SKILL.md` (secondary)
  - Contexts: `security-baselines.md`, `architecture-context.md`, `stack-context.md`

- Architecture planning:
  - Workflow: `C:\Users\Swift America\.gemini\antigravity\workflows\workflow-plan-architecture.md`
  - Skills: `architecture/SKILL.md` (primary), `product-thinking/SKILL.md` (secondary), `database/SKILL.md` (secondary if data-heavy)
  - Contexts: `project-context.md`, `architecture-context.md`, `business-priorities.md`

- API design:
  - Workflow: `C:\Users\Swift America\.gemini\antigravity\workflows\workflow-design-api.md`
  - Skills: `api-design/SKILL.md` (primary), `security/SKILL.md` (secondary), `coding/SKILL.md` (secondary)
  - Contexts: `api-conventions.md`, `stack-context.md`, `security-baselines.md`

- Database/schema/migration work:
  - Workflow: `C:\Users\Swift America\.gemini\antigravity\workflows\workflow-build-feature.md`
  - Skills: `database/SKILL.md` (primary), `security/SKILL.md` (secondary), `review-audit/SKILL.md` (secondary for audits)
  - Contexts: `database-context.md`, `stack-context.md`, `architecture-context.md`

- Performance optimization:
  - Workflow: `C:\Users\Swift America\.gemini\antigravity\workflows\workflow-optimize-performance.md`
  - Skills: `performance/SKILL.md` (primary), `database/SKILL.md` (secondary), `coding/SKILL.md` (secondary)
  - Contexts: `stack-context.md`, `database-context.md`, `infra-context.md`

- Refactor module:
  - Workflow: `C:\Users\Swift America\.gemini\antigravity\workflows\workflow-refactor-module.md`
  - Skills: `refactoring/SKILL.md` (primary), `testing/SKILL.md` (secondary), `coding/SKILL.md` (secondary)
  - Contexts: `coding-standards.md`, `architecture-context.md`, `testing-standards.md`

- Deploy/ship to production:
  - Workflow: `C:\Users\Swift America\.gemini\antigravity\workflows\workflow-ship-to-production.md`
  - Skills: `devops-infra/SKILL.md` (primary), `security/SKILL.md` (secondary), `review-audit/SKILL.md` (secondary)
  - Contexts: `infra-context.md`, `security-baselines.md`, `testing-standards.md`

## Loading Limits

- Skills per task: 1 primary + up to 2 secondary.
- Context files per task: max 4.
- Workflow: exactly 1 at a time.

## Memory Usage

Load on demand when relevant:
- `C:\Users\Swift America\.gemini\antigravity\memory\decisions-log.md`
- `C:\Users\Swift America\.gemini\antigravity\memory\mistakes-to-avoid.md`
- `C:\Users\Swift America\.gemini\antigravity\memory\common-patterns.md`

## Path Canonicalization Rule

Use `C:\Users\Swift America\...` as the canonical root for all local absolute path references.
If files contain a legacy user home path, treat it as stale and replace it with `C:\Users\Swift America\...`.
