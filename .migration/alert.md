# alert

2026-07-16, no migration needed (classification only, no Radix dependency found). Verdict: nothing to migrate.

## Changed

None. `src/components/ui/alert.tsx` and its docs registry entry
[src/lib/registry/alert.tsx](../src/lib/registry/alert.tsx) were inspected and
left byte-for-byte untouched.

Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/alert.tsx
src/lib/registry/alert.tsx` → clean, zero matches (confirms there was never
anything to remove).

## Left alone

- `src/components/ui/alert.tsx`: the entire component is plain `<div>`s
  (`Alert`, `AlertTitle`, `AlertDescription`, `AlertAction`) composed with
  `class-variance-authority` for variants. It has no dependency on
  `radix-ui`/`@radix-ui/react-*` at all — unlike `alert-dialog`, the plain
  `alert` component was never a Radix primitive wrapper in this shadcn
  registry (shadcn's own `alert.tsx` has always been non-Radix). Per the
  skill's hard rule ("NEVER touch non-radix libraries or their wrappers"),
  and since there is no Base UI equivalent to migrate TO for a component that
  never wrapped a primitive, this file is intentionally left alone.
- `src/lib/registry/alert.tsx`: docs/examples reference only `Alert`,
  `AlertTitle`, `AlertDescription`, `AlertAction`, `Button`, and icons — no
  Radix imports or props affected. Left untouched.

## Behavior changes

None — no code was changed.

## Verify by hand

Not applicable; no code changes were made. If you intended a different
component — e.g. `alert-dialog`, which IS a Radix wrapper and was already
migrated to Base UI in a prior commit (`2615b02`, before this skill was
installed, so no `.migration/alert-dialog.md` report exists for it) — let me
know and I can write that report or make further changes there.

## Notes for the user

- Derived remaining-Radix count: `grep -rl 'from "radix-ui"' src/components/ui`
  returns **32 files** still on Radix (aspect-ratio, avatar, badge,
  breadcrumb, button-group, button, checkbox, collapsible, context-menu,
  dialog, dropdown-menu, hover-card, item, label, menubar, navigation-menu,
  popover, progress, radio-group, scroll-area, select, separator, sheet,
  sidebar, slider, studio-sidebar, switch, tabs, toggle-group, toggle,
  tooltip, tv-display). `accordion`, `alert-dialog`, `combobox`, and `drawer`
  are already on `@base-ui/react`. `alert` was never on Radix, so it doesn't
  count toward either total.
