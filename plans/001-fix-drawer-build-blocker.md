# Plan 001: Fix Drawer Type Errors Blocking Build

**Baseline Commit**: 8c23b59
**Category**: Correctness / Build
**Effort**: S (15–20 min)
**Risk**: Low — safe, mechanical fixes to unsupported prop usage and example typo
**Confidence**: HIGH

---

## Summary

Two TypeScript errors in drawer-related code prevent `pnpm build` from completing:

1. `src/components/ui/command.tsx` line 82 passes `repositionInputs={false}` to the `<Drawer>` component, but `repositionInputs` is not a supported prop in `@base-ui/react`'s Drawer (this was a vaul-era prop).
2. `src/lib/registry/drawer.tsx` line 466 has a documentation example checking `side === "bottom"` when the type of `side` is `"up" | "right" | "down" | "left"` — should be `side === "down"`.

Both are simple to fix. No behavior change; just removing invalid prop and correcting a typo.

---

## Why This Matters

- **Build blocker**: `tsc` exits with code 2; deployment cannot proceed.
- **Cascades**: Once build works, you can run tests, lint, and verify the drawer upgrade hasn't regressed other components.
- **Unblocks**: Plans 002 and 003 depend on a passing build.

---

## Changes Required

### Change 1: Remove `repositionInputs` from Drawer in command.tsx

**File**: `src/components/ui/command.tsx`
**Line**: 82
**Current**:
```tsx
return (
  <Drawer open={open} onOpenChange={onOpenChange} repositionInputs={false}>
    <DrawerContent
```

**New**:
```tsx
return (
  <Drawer open={open} onOpenChange={onOpenChange}>
    <DrawerContent
```

**Rationale**: `@base-ui/react` Drawer does not accept `repositionInputs`. The prop is not used — it's safe to remove.

---

### Change 2: Fix typo in drawer.tsx example code

**File**: `src/lib/registry/drawer.tsx`
**Line**: 466 (in the example code string for "Sides" example)
**Current**:
```tsx
swipeDirection={
  side === "bottom"
    ? undefined
    : (side as "up" | "right" | "left")
},
```

**New**:
```tsx
swipeDirection={
  side === "down"
    ? undefined
    : (side as "up" | "right" | "left")
},
```

**Rationale**: The `DRAWER_SIDES` array is `["up", "right", "down", "left"]`. When `side === "down"` (the default), pass `undefined` (which maps to default direction). Otherwise pass the mapped direction.

---

## Verification

### Before
```bash
cd /Users/vinutv/code/careui
pnpm build
# Output: error TS2322 on command.tsx:82
#         error TS2367 on drawer.tsx:466
# Exit: 2
```

### After
```bash
cd /Users/vinutv/code/careui
pnpm build
# Expected output: Build completes successfully
#   src/components/ui/command.tsx(82,53) error gone
#   src/lib/registry/drawer.tsx(466,19) error gone
# Exit: 0
```

**Verification commands:**
```bash
pnpm build 2>&1 | grep -E "error TS|exit" && echo "FAILED" || echo "SUCCESS"
```

Should output `SUCCESS` with exit code 0.

---

## Done Criteria

- ✅ `repositionInputs` prop removed from `<Drawer>` in `src/components/ui/command.tsx` line 82
- ✅ Example code in `src/lib/registry/drawer.tsx` line 466 uses `side === "down"` (not `"bottom"`)
- ✅ `pnpm build` completes with exit code 0
- ✅ No new TypeScript errors introduced

---

## Scope & Boundaries

**In scope:**
- Remove the single invalid prop from command.tsx
- Fix the single typo in the drawer.tsx example code string

**Out of scope:**
- Do NOT modify drawer component implementation
- Do NOT change the Drawer API or props
- Do NOT refactor command component logic
- Do NOT update tests (done in Plan 002)

---

## Maintenance Notes

If the drawer API changes in `@base-ui/react` in future upgrades:
- Check `src/components/ui/command.tsx` for any deprecated props
- Verify all drawer usage across all components (command.tsx uses it as a custom input drawer)
- Update example code strings in `src/lib/registry/drawer.tsx` if the default direction or behavior changes

---

## Escape Hatches

None — this is a straightforward removal of an unsupported prop and a typo fix. If any unexpected errors emerge during the fix:
- Check that no other code depends on `repositionInputs` (it won't, since it's not a real Base UI prop)
- Verify the drawer example code still makes sense with the corrected direction values
