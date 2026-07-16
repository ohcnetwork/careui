# avatar

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry JSON by URL). Verdict: clean direct migration — Radix and Base UI's `Avatar` are anatomically and behaviorally identical (confirmed both golden variants are byte-identical except for the import line and type annotations), so this was a pure primitive swap with zero structural changes.

## Changed

- [src/components/ui/avatar.tsx](../src/components/ui/avatar.tsx):
  - Import: `import { Avatar as AvatarPrimitive } from "radix-ui"` →
    `import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"`.
  - Types: `React.ComponentProps<typeof AvatarPrimitive.Root>` →
    `AvatarPrimitive.Root.Props` (and same for `.Image` → `.Image.Props`,
    `.Fallback` → `.Fallback.Props`), matching the idiomatic Base UI type
    usage from `universal-patterns.md`.
  - `@dependencies` JSDoc tag: `class-variance-authority radix-ui` →
    `class-variance-authority @base-ui/react`.
  - No className, structure, or prop changes were needed. Per
    `display-misc.md`'s `avatar` section, the only Radix→Base UI deltas for
    this component are `asChild`→`render` (Root/Image/Fallback) and
    `Fallback`'s `delayMs`→`delay` rename — neither is used anywhere in this
    file's implementation or by any consumer (verified via
    `grep -n "asChild\|delayMs"` across the repo: zero matches on any
    `Avatar`/`AvatarImage`/`AvatarFallback` usage), so there was nothing to
    hand-migrate on the consumer side.
  - This project's customizations (the `size`/`shape` props on `Avatar`, the
    `color` variant system on `AvatarFallback` via `avatarFallbackVariants`,
    the custom `AvatarBadge`/`AvatarGroup`/`AvatarGroupCount` parts with no
    Radix/Base UI equivalent, and the `after:border-strong-border` /
    `dark:after:mix-blend-lighten` ring styling that differs from the
    stock golden's `after:border-border after:mix-blend-darken`) were all
    preserved exactly as-is — this is a CUSTOMIZED wrapper, and only the
    primitive-level plumbing was touched.
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/avatar.tsx`
    → clean, zero matches.
- [public/registry/care-ui/avatar/avatar.json](../public/registry/care-ui/avatar/avatar.json),
  [public/registry/care-ui/index.json](../public/registry/care-ui/index.json):
  regenerated via `pnpm run build:registry` (dependency list now correctly
  reflects `@base-ui/react` instead of `radix-ui`).

## Left alone

- [src/lib/registry/avatar.tsx](../src/lib/registry/avatar.tsx): no changes
  needed — no `code:`/`usage` string or `React.createElement`/JSX preview
  references `asChild`, `delayMs`, or any other prop affected by this
  migration. The installation `manual` text already just said "Copy and
  paste the avatar component source code into your project." with no
  `npm install radix-ui` step to remove (this component's docs never
  surfaced its dependency as an install step, unlike `alert-dialog`/
  `aspect-ratio`).
- This docs file's "Dropdown" example composes `Avatar` with
  `DropdownMenu`/`DropdownMenuTrigger`/etc. from `@/components/ui/
  dropdown-menu`, which is still on Radix. This is a docs-only composition
  (two independent components used together in one example), not a case of
  `avatar.tsx` itself depending on a still-Radix wrapper internally — so it
  doesn't trigger the "stop and migrate dependencies first" rule, and is
  correctly left untouched pending `dropdown-menu`'s own migration.
- 10 consumer files across the app/docs (`src/components/blocks/inner-page-01.tsx`,
  `sidebar-01.tsx`, `src/components/nav-user.tsx`, `playground.tsx`, and
  several `src/lib/registry/*.tsx` demo files) import `Avatar`/`AvatarFallback`/
  `AvatarImage` — all pass only `className`, `size`, `shape`, `color`, `src`,
  `alt`, and plain children, none of which changed shape in this migration,
  so no consumer edits were required.

## Behavior changes

None. This is one of the rare fully "direct" mappings in the coverage
matrix — Base UI's `Avatar` has identical anatomy, prop surface (for the
props this project actually uses), and rendered elements (`Root` → `<span>`,
`Image` → `<img>`, `Fallback` → `<span>`) to Radix's.

## Verify by hand

1. Load any page using avatars with a real image `src` (e.g. the Avatar
   docs page, or `nav-user.tsx` if it renders with a live user photo) and
   confirm the image loads and displays correctly, respecting the
   `size`/`shape` variants (circle/rounded/squircle) and the ring border.
2. Force an image load failure (bad `src` or offline) and confirm
   `AvatarFallback` still appears in its place with the correct `color`
   variant styling and initials/icon content.
3. Check `AvatarGroup` + `AvatarGroupCount` (e.g. in a data-table or sidebar
   demo) — confirm overlapping avatars still render with the correct
   `-space-x-2` overlap and ring separation.
4. Check `AvatarBadge` (status dot) positioning and sizing at each `size`
   variant (`sm`/`default`/`lg`).
5. Run `pnpm build` (or `tsc -b` + `pnpm lint`) once more after any further
   edits — both were clean as of this report.

## Notes for the user

- Derived remaining-Radix count: `grep -rl 'from "radix-ui"' src/components/ui`
  now returns **29 files**: `badge` (`Slot`), `breadcrumb` (`Slot`),
  `button-group` (`Slot`), `button` (`Slot`), `checkbox`, `collapsible`,
  `context-menu`, `dialog`, `dropdown-menu`, `hover-card`, `item` (`Slot`),
  `label`, `menubar`, `navigation-menu`, `popover`, `progress`,
  `radio-group`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`
  (`Slot`), `slider`, `studio-sidebar` (`Slot`), `switch`, `tabs`,
  `toggle-group`, `toggle`, `tooltip`. `accordion`, `alert-dialog`,
  `aspect-ratio`, `avatar`, `combobox`, `drawer`, and `tv-display` are now
  off Radix (`alert` never needed migration).
