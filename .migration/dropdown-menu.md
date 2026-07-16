# dropdown-menu

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: customized wrapper (larger
responsive item sizing, custom non-sliding animation curve), migrated
cleanly against the live golden pair; required real consumer fixes for
`onSelect`→`onClick`/`closeOnClick` and a genuine Base UI structural
requirement (`GroupLabel` must live inside a `Group`) that a live-browser
test caught and confirmed fixed across 8 files.

## Changed

- `src/components/ui/dropdown-menu.tsx` — classified CUSTOMIZED: diffed
  against `https://ui.shadcn.com/r/styles/radix-vega/dropdown-menu.json`
  and found larger responsive item sizing (`min-h-11`/`md:min-h-10`,
  `px-2.5`/`md:px-2` vs the golden's flat `px-2`) on `Item`/
  `CheckboxItem`/`RadioItem`/`SubTrigger`, and a custom non-sliding
  animation on `Content` (no `data-[side=...]:slide-in-from-*`, a custom
  `[animation-timing-function:cubic-bezier(0.23,1,0.32,1)]` +
  `data-closed:duration-75` + `zoom-[0.97]` scale, vs. the golden's
  directional-slide + `zoom-95` fade). Rewired per `menus.md`'s dropdown-menu
  section (Radix `DropdownMenu` → Base UI `Menu`):
  - `Content` → `Portal > Positioner > Popup` (`align`/`alignOffset`/
    `side`/`sideOffset` moved to Positioner; `align` default stayed
    `"start"`, matching this project's existing override of Radix's own
    `"center"` default).
  - `DropdownMenuTrigger` gained the standard `asChild`→`render` compat
    shim (`resolveAsChild`, matching `dialog.tsx`/`popover.tsx`) — used in
    21+ files across this repo.
  - Part renames (exported wrapper names unchanged): `Label` →
    `GroupLabel`, `ItemIndicator` → `CheckboxItemIndicator`/
    `RadioItemIndicator` (split per item type), `Sub` → `SubmenuRoot`,
    `SubTrigger` → `SubmenuTrigger`.
  - `DropdownMenuSubContent` now composes the wrapper's own
    `DropdownMenuContent` (not a raw primitive), matching
    `wrapper-shapes.md`'s documented dropdown-menu SubContent shape
    exactly: defaults `align="start" alignOffset={-3} side="right"
    sideOffset={0}`, class list reduced to `min-w-[96px] w-auto rounded-md
    p-1 shadow-lg` (the rest — animation, colors, ring — inherited from
    the composed `DropdownMenuContent`).
  - `SubTrigger` gained `data-popup-open:bg-accent
    data-popup-open:text-accent-foreground` alongside the existing
    `data-open:bg-accent data-open:text-accent-foreground` (per
    `wrapper-shapes.md`'s "SubTrigger open styling" note). Side effect
    worth flagging: the pre-existing `data-open:*` hook in this file was
    ALREADY present before migration but was dead code under Radix — Radix
    never sets a bare `data-open` attribute (only `data-state="open"`),
    and Tailwind v4's `data-open:` variant matches `[data-open]` literally.
    Base UI genuinely sets `data-open`/`data-closed` as presence
    attributes, so this migration incidentally FIXES a latent styling bug
    rather than introducing one.
  - CSS var renames: `--radix-dropdown-menu-content-available-height` →
    `--available-height`, `--radix-dropdown-menu-trigger-width` →
    `--anchor-width`, `--radix-dropdown-menu-content-transform-origin` →
    `--transform-origin`.
  - Confirmed no `cn-*` hooks anywhere in this project (plain-Tailwind) —
    skipped the golden's `cn-menu-target cn-menu-translucent` companion
    classes; kept concrete `CheckIcon`/`ChevronRightIcon` from
    `lucide-react` instead of the golden's `IconPlaceholder`.
  - Types: `React.ComponentProps<typeof DropdownMenuPrimitive.X>` →
    `MenuPrimitive.X.Props` throughout. `@dependencies` JSDoc updated
    `radix-ui` → `@base-ui/react`. Leftover scan:
    `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
    src/components/ui/dropdown-menu.tsx` — no matches.
- **`onSelect` → `onClick` + `closeOnClick` (restructure, not rename) —
  14 call sites in `src/lib/registry/dropdown-menu.tsx`, 1 in
  `src/components/ui/filters.tsx`.** Per `menus.md`'s cross-cutting rule
  ("`onSelect` on items … `event.preventDefault()` keeps menu open →
  `onClick` plus `closeOnClick` to control whether the menu closes"):
  - 4 `DropdownMenuCheckboxItem` occurrences used
    `onSelect={(e) => e.preventDefault()}` purely to keep the menu open.
    Base UI's `CheckboxItem` already defaults `closeOnClick` to `false`
    (per `menus.md`: "Behavior default flips: Radix closes on select
    unless prevented; Base `closeOnClick` defaults to `false` on
    CheckboxItem"), so these calls became pure no-ops — removed entirely
    rather than replaced.
  - 8 plain `DropdownMenuItem` occurrences styled as
    `role="menuitemcheckbox"`/`role="menuitemradio"` (custom
    Checkbox/RadioGroupItem-rendering items, `DropdownMenuCheckboxComponent`
    and `DropdownMenuRadioGroupComponent` demos) used `onSelect={(e) => {
    e.preventDefault(); setX(...); }}`. `Item`'s `closeOnClick` defaults to
    `true` (Radix behavior), so these needed real fixes: renamed to
    `onClick`, dropped the now-inert `preventDefault()` call, added
    `closeOnClick={false}` to replicate "stay open" explicitly.
  - `filters.tsx:1353`'s listbox-style `DropdownMenuItem` conditionally
    called `preventDefault()` only `if (isMultiSelect)` — converted to
    `closeOnClick={!isMultiSelect}` + plain `onClick`.
  - Two more `onSelect` hits in `sidebar.tsx`/`sidebar-01-demo.tsx` and one
    in `filters.tsx`'s `SavedFilterRow` were confirmed NOT related (cmdk's
    `CommandItem` and a hand-rolled custom prop on a plain `<div
    role="option">`, respectively) — left untouched.
- **`GroupLabel` must live inside a `Group` — caught live, not by
  typecheck.** Base UI's `Menu.GroupLabel` throws
  `"Base UI: MenuGroupContext is missing"` at runtime if rendered outside
  a `Menu.Group` (per `menus.md`: "Base GroupLabel must be inside a Group
  … Radix Label could float freely"). TypeScript can't catch this since
  `GroupLabel.Props` doesn't require a parent. Found via headless-browser
  testing (see Verify section) and fixed by wrapping every bare
  `<DropdownMenuLabel>` in a `<DropdownMenuGroup>` across:
  `src/components/blocks/inner-page-01.tsx`,
  `src/components/blocks/sidebar-01.tsx`, `src/components/ui/data-table.tsx`,
  `src/lib/registry/sidebar-01-demo.tsx`, `src/lib/registry/sidebar.tsx`
  (first of two occurrences — the second, later in the same file, was
  already correctly wrapped), and 9 occurrences across
  `src/lib/registry/dropdown-menu.tsx`'s "Modal", "With Checkboxes", "With
  Checkboxes Component", "With RadioGroup Component", and "Radio Items"
  examples (both the executable `React.createElement` trees and their
  matching `code:` display strings). `src/components/nav-user.tsx` already
  wrapped its label correctly — left untouched.
- `public/registry/care-ui/dropdown-menu/dropdown-menu.json`,
  `public/registry/care-ui/index.json` — pending regeneration (batched at
  the end of this multi-component run).

## Left alone

`onSelect` on `CommandItem` (cmdk, `sidebar.tsx`/`sidebar-01-demo.tsx`) and
`SavedFilterRow`'s own `onSelect` prop (`filters.tsx`, a hand-rolled
`<div role="option">` + `<Button onClick>`, unrelated to any Menu
primitive) — confirmed unrelated to this migration, untouched.

## Behavior changes

- `loop` → Root `loopFocus` (default flips Radix `false` → Base UI `true`)
  — not set explicitly by this wrapper or any consumer; menu keyboard
  navigation now loops at the ends where it previously didn't.
- `onCloseAutoFocus` → Popup `finalFocus`, `onEscapeKeyDown`/
  `onPointerDownOutside`/`onFocusOutside`/`onInteractOutside` → Root
  `onOpenChange` reasons — none used anywhere in this repo (grepped
  clean).
- `avoidCollisions`/`collisionBoundary`/`collisionPadding`/`arrowPadding`/
  `hideWhenDetached` all move to Positioner with adjusted defaults
  (`collisionPadding`/`arrowPadding` `0`→`5`) — not used explicitly
  anywhere here.

## Verify by hand

Verified live via a headless browser (dev server + Playwright) as part of
this run — this caught the `GroupLabel`/`Group` runtime error described
above, which typecheck alone would have missed entirely:
1. Opened every dropdown trigger on the docs page (5 total) in sequence:
   zero console errors after the `DropdownMenuGroup` wrapping fix (the
   initial pass, before the fix, threw `MenuGroupContext is missing` on
   the "Modal" example).
2. "With Submenu" example: opened the menu, hovered "Invite users" —
   submenu opened correctly positioned to the right with `Email`/
   `Message`/`More...` items visible.
3. "With Checkboxes" example: opened the menu, clicked "Status Bar" —
   menu stayed open (confirming `CheckboxItem`'s `closeOnClick={false}`
   default), no console errors.
4. Basic menu (My Account / Profile / Billing / Settings / Log out):
   opened and confirmed destructive "Log out" red styling and keyboard
   shortcuts (⇧⌘P, ⌘B) render correctly.

Manual follow-up recommended (not exercised in this pass):
5. "With Checkboxes Component" / "With RadioGroup Component" examples
   (custom `Checkbox`/`RadioGroupItem`-styled items using
   `role="menuitemcheckbox"`/`role="menuitemradio"`): confirm clicking
   toggles state and keeps the menu open (the `closeOnClick={false}` fix).
6. `filters.tsx`'s multi-select field-value listbox: confirm
   single-select mode still closes the menu on click while multi-select
   mode keeps it open (`closeOnClick={!isMultiSelect}`).
7. `data-table.tsx`'s row-actions menu ("Actions" label + View/Edit/Delete):
   confirm the label renders correctly now that it's wrapped in a Group.
