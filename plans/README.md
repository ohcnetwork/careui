# Plans Index — CareUI Quick Audit (2025-07-14)

**Baseline Commit**: `8c23b59`
**Audit Level**: Quick (correctness, security, tests)
**Date**: 2025-07-14

---

## Overview

Three high-confidence findings from quick audit. Execution order is **critical**:

1. **Plan 001** (build blocker) must execute first — it unblocks both 002 and 003.
2. **Plan 002** (test suite) depends on 001; infrastructure for all future testing.
3. **Plan 003** (lint config) is independent; can run anytime but best after 001.

---

## Findings Summary Table

| # | Plan | Category | Impact | Effort | Risk | Evidence | Status |
|---|------|----------|--------|--------|------|----------|--------|
| **001** | Fix Drawer Type Errors Blocking Build | Correctness | 🔴 **BLOCKER** — `pnpm build` fails, cannot deploy | S | Low | `command.tsx:82` (`repositionInputs` unsupported), `drawer.tsx:466` (typo: `"bottom"` → `"down"`) | ⏳ TODO |
| **002** | Establish Test Suite Infrastructure | Tests | 🟠 HIGH — Zero tests, no regression detection, drawer upgrade at risk | L | Medium | No test files, no vitest/jest, no `test` script | ⏳ TODO |
| **003** | Fix ESLint Config to Exclude Generated Assets | Tooling | 🟡 MEDIUM — ESLint output unreadable, CI noise | S | Low | `ds-bundle/` produces 10+ false errors; not in `globalIgnores` | ⏳ TODO |

---

## Execution Order & Dependencies

```
001 (Build Blocker)
  ├─→ enables: 002, 003
  └─→ MUST complete first

002 (Test Suite)
  ├─ depends on: 001 (build must pass)
  └─ independent of: 003

003 (ESLint Config)
  ├─ depends on: None (independent)
  └─ nice-to-have: run after 001 to verify lint output is clean
```

**Recommended execution**:
1. Execute **001** first (15–20 min)
2. Verify `pnpm build` passes
3. Execute **003** in parallel with 002 (ESLint fix is 10 min, independent)
4. Execute **002** after 001 (1–3 hours for full setup + initial tests)

---

## Plan Details

### Plan 001: Fix Drawer Type Errors Blocking Build

- **Effort**: S (15–20 min)
- **Risk**: Low
- **Files**: `src/components/ui/command.tsx`, `src/lib/registry/drawer.tsx`
- **Changes**: Remove 1 unsupported prop, fix 1 typo
- **Verification**: `pnpm build` exit code 0
- **Read**: [001-fix-drawer-build-blocker.md](./001-fix-drawer-build-blocker.md)

**Why first**: Blocks all other work. No build = cannot test, cannot lint, cannot deploy.

---

### Plan 002: Establish Test Suite Infrastructure

- **Effort**: L (1–3 hours: framework setup 1h, 2x test files 1–2h)
- **Risk**: Medium (foundational choice)
- **Dependencies**: Plan 001 (build must pass first)
- **Adds**: vitest, @testing-library/react, jsdom
- **Creates**: vitest.config.ts, vitest.setup.ts, button.test.tsx, drawer.test.tsx
- **Verification**: `pnpm test` runs 10+ tests, all pass
- **Read**: [002-establish-test-suite.md](./002-establish-test-suite.md)

**Why important**: Drawer upgrade + 53 interlinked components + zero tests = high regression risk. Tests pay for themselves after 3rd refactor.

---

### Plan 003: Fix ESLint Configuration to Exclude Generated Assets

- **Effort**: S (10 min)
- **Risk**: Low
- **Files**: `eslint.config.js`
- **Changes**: Add `ds-bundle/**` to `globalIgnores`
- **Verification**: `pnpm lint` output no longer shows ds-bundle errors
- **Read**: [003-fix-eslint-config.md](./003-fix-eslint-config.md)

**Why independent**: Config-only change; nice cleanup but doesn't block other work.

---

## Status Tracking

Update this table as you execute each plan:

| Plan | Status | Executor | Started | Completed | Notes |
|------|--------|----------|---------|-----------|-------|
| 001 | ⏳ TODO | — | — | — | Run first |
| 002 | ⏳ TODO | — | — | — | Depends on 001 |
| 003 | ⏳ TODO | — | — | — | Independent; nice-to-do after 001 |

---

## How to Execute Plans

Each plan file (`001-*.md`, `002-*.md`, `003-*.md`) is **fully self-contained**. An executor unfamiliar with this codebase can:

1. Read the plan
2. Follow steps in order
3. Run verification commands
4. Confirm done criteria are met

**Executor template** (copy-paste this workflow for each plan):

```bash
# 1. Read the plan
cat plans/001-fix-drawer-build-blocker.md

# 2. Follow each step in "Changes Required" section
# (Editor: make the changes described)

# 3. Run verification commands (exact commands in "Verification" section)
pnpm build 2>&1 | grep -E "error TS|exit" && echo "FAILED" || echo "SUCCESS"

# 4. Verify all done criteria are met
# (Cross-check against "Done Criteria" section)
```

---

## Rollback / Revert

If any plan produces unexpected results:

```bash
# Revert to baseline commit (all changes since 8c23b59 are lost)
git reset --hard 8c23b59

# Then re-execute the plan more carefully, or escalate for review
```

---

## Questions / Escalations

If during execution you encounter:

- **Ambiguous step**: Re-read the plan's "Escape Hatches" section; if still unclear, escalate.
- **Unexpected error**: Check the plan's "Scope & Boundaries" section to confirm you haven't gone out of scope.
- **Build/test failure**: Run the exact verification commands from the plan; most failures are caught there with detailed error messages.

---

## Next Steps (After Plans Complete)

Once all three plans are complete:

1. **Create a PR** with the changes and link this plans index
2. **Run full CI** to confirm no regressions in the build, lint, and test pipeline
3. **Decide on next audit focus**: Features (plan `next`), Performance (plan `quick perf`), or another category

---

## Considered & Rejected

(None at this time; all findings warrant fixing.)

---

## Context & Decisions

This audit was scoped to **quick level** (highest-churn code, correctness + security + tests only). Findings deferred to future audits:

- **Performance**: No hotspots identified; bundle size noted in PRODUCTION_READINESS.md (non-critical)
- **Architecture / Refactoring**: Registry generation, build scripts all reasonable; no urgent tech debt
- **DX & Docs**: Component docs are comprehensive; no major gaps
- **Dependencies**: Modern versions; no critical CVEs (usual periodic review applies)
- **Direction / Features**: Out of scope for `quick` audit; see `plan next` for product direction
