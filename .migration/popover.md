# popover

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: customized wrapper (custom
shadow/dark-mode color, real `Title`/`Description` sub-parts already
present), migrated cleanly; one consumer (`filters.tsx`) needed a real
restructure for its `onOpenAutoFocus` usage. Verified live.

## Changed

- `src/components/ui/popover.tsx` — classified CUSTOMIZED: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/popover.json` and found
  `shadow-xl` (vs golden's `shadow-md`) and a `dark:bg-soft-background`
  addition on `PopoverContent`. Restructured per `overlays.md`'s popover
  section:
  - `Content` → `Portal > Positioner > Popup` (positioning props
    `align`/`alignOffset`/`side`/`sideOffset` moved to Positioner,
    `sideOffset` default unchanged at `4`; `side` gained an explicit
    default `"bottom"` it previously inherited implicitly from Radix).
  - `PopoverTrigger` gained the standard `asChild`→`render` compat shim
    (`resolveAsChild`, matching `dialog.tsx`/`alert-dialog.tsx`) — I
    initially migrated it as a bare passthrough and typecheck immediately
    caught 12 broken `<PopoverTrigger asChild>` call sites across
    `date-picker.tsx`, `filters.tsx` (×3), `lib/registry/button-group.tsx`,
    `lib/registry/data-table.tsx`, `lib/registry/filters.tsx`,
    `lib/registry/input-group.tsx`, and `lib/registry/popover.tsx` (×5);
    added the shim and all of them resolved with no consumer edits needed.
  - `PopoverAnchor` **dropped entirely** — Base UI's Popover has no Anchor
    part (per the hard rule "Popover Anchor... has no equivalent"; its
    replacement is a `Positioner.anchor` prop). Confirmed no consumer
    anywhere imports or renders `PopoverAnchor` (grepped clean), so there
    was nothing to provide an inert passthrough for.
  - `PopoverTitle`/`PopoverDescription` now render REAL Base UI
    `PopoverPrimitive.Title`/`.Description` primitives (auto-wired to the
    popup via `aria-labelledby`/`aria-describedby`) instead of plain
    `<div>`/`<p>` — Radix's Popover never had Title/Description parts at
    all, so this is a new accessibility capability, not a behavior change
    to anything previously working.
  - CSS var rename: `--radix-popover-content-transform-origin` →
    `--transform-origin`.
  - Types: `React.ComponentProps<typeof PopoverPrimitive.X>` →
    `PopoverPrimitive.X.Props` throughout. `@dependencies` JSDoc updated
    `radix-ui` → `@base-ui/react`. Leftover scan:
    `grep -n "radix-ui\|@radix-ui\|IconPlaceholder" src/components/ui/popover.tsx`
    — no matches.
- `src/components/ui/filters.tsx:2609-2661` — the "Saved filters" popover
  (only in the `onSave`-enabled variant) used `onOpenAutoFocus={(e) => {
  e.preventDefault(); (e.currentTarget as HTMLElement).focus(); }}` to keep
  focus on the popup container itself (not an inner input), so its sibling
  `onKeyDown` handler's `document.activeElement`-based Arrow Up/Down list
  navigation would work from a known starting point. Base UI's `Popup` has
  no event-based `onOpenAutoFocus` (moved to `initialFocus`, same
  restructure as `dialog.tsx`/`sheet.tsx`). Since `initialFocus`'s function
  form only receives the interaction type (no element to query), attached
  a new `savedPopoverContentRef` (added next to the file's existing
  `savedListRef`) directly to `PopoverContent` via its now-forwarded `ref`
  prop (added `ref` handling to `PopoverContent`'s own signature — React 19
  allows function components to accept `ref` as a plain prop, no
  `forwardRef` needed), and set `initialFocus={() =>
  savedPopoverContentRef.current ?? undefined}` — reproducing "focus the
  popup container itself" exactly.
- `public/registry/care-ui/popover/popover.json`, `public/registry/care-ui/index.json`
  — pending regeneration (batched at the end of this multi-component run).

No other consumer changes needed: `date-picker.tsx`, `lib/registry/popover.tsx`,
`lib/registry/button-group.tsx`, `lib/registry/data-table.tsx`,
`lib/registry/input-group.tsx` all use `align`/`side`/`sideOffset`/
`className`/`asChild` — all unchanged shapes after the Trigger compat shim.

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- `onOpenChange` gains a second `eventDetails` argument with an expanded
  reason union including hover/focus reasons (`'trigger-hover'`,
  `'trigger-focus'`) — not consumed by any wrapper or consumer logic here.
- `modal` widens to `boolean | 'trap-focus'` (default still `false`) — not
  used explicitly by any consumer.
- `avoidCollisions`/`collisionPadding`/`collisionBoundary`/
  `hideWhenDetached` all move to the Positioner with adjusted defaults
  (`collisionPadding`/`arrowPadding` `0`→`5`) — not used explicitly by any
  consumer here, grepped clean.

## Verify by hand

Verified live via a headless browser (dev server + Playwright) as part of
this run:
1. Docs page: Popover → "Open popover" — opened; confirmed the first input
   ("Width") auto-focused immediately (visible focus ring), matching the
   pre-migration default auto-focus behavior via the new `initialFocus`
   default.
2. No console errors during the interaction.

Not reachable in the default preview during this pass (the "Saved
filters" `onSave`-enabled demo lives deeper in `lib/registry/filters.tsx`
and wasn't visible in the Filters doc page's default preview state) —
recommend manually verifying:
3. Open the "Saved filters" popover (in a Filters instance configured with
   `onSave`): confirm focus lands on the popup container itself (not an
   input), and that Arrow Up/Down still navigates the saved-filter list
   starting from the top/bottom item.
