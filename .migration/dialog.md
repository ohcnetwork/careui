# dialog

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: heavily customized wrapper
(nested inner-div layout, header-embedded close button, custom auto-focus
logic), migrated by hand against the current live golden pair, following
the `alert-dialog.tsx`/`badge.tsx` precedents already in this repo for
`asChild`→`render` compat and `Overlay`→`Backdrop`/`Content`→`Popup`
internal renames. Verified live in a headless browser (see below).

## Changed

- `src/components/ui/dialog.tsx` — classified CUSTOMIZED: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/dialog.json` and found this
  project wraps `children` in an extra inner `<div>` (the `innerClassName`
  feature, used by `command.tsx`'s `CommandDialog` to shrink cmdk's
  padding), a custom `onOpenAutoFocus` default (auto-focus the first
  input/textarea/select inside the dialog unless the caller overrides it),
  a header-embedded close button (`DialogHeader`'s own `showCloseButton`,
  rather than the golden's close button living directly in `DialogContent`),
  and different color tokens (`bg-foreground/10` + inner `bg-background`
  two-layer look vs. the golden's flat `bg-popover`). Rewired per
  `overlays.md`'s dialog section:
  - `radix-ui` → `@base-ui/react/dialog`.
  - `DialogPrimitive.Overlay` → `DialogPrimitive.Backdrop` (exported name
    stays `DialogOverlay`, matching `alert-dialog.tsx`'s precedent).
  - `DialogPrimitive.Content` → `DialogPrimitive.Popup` (exported name
    stays `DialogContent`).
  - `DialogTrigger`/`DialogClose` both keep an `asChild` compat prop
    (translated to Base UI `render` via the same local `resolveAsChild`
    helper used in `alert-dialog.tsx`/`drawer.tsx`/`tooltip.tsx`/`toggle
    -group.tsx` — this repo has 101+ `asChild` call sites project-wide,
    and `DialogTrigger asChild`/`DialogClose asChild` are used extensively
    across `playground.tsx`, `lib/registry/dialog.tsx`,
    `lib/registry/drawer.tsx`).
  - **`onOpenAutoFocus` → `initialFocus`, restructured (not a rename)**:
    Base UI's `Popup` has no event-based `onOpenAutoFocus`; instead
    `initialFocus?: boolean | RefObject<HTMLElement | null> |
    ((openType) => boolean | HTMLElement | null | void)` (confirmed against
    `node_modules/@base-ui/react/dialog/popup/DialogPopup.d.ts:24` — the
    function form receives ONLY the interaction type, no element/event to
    query). Implemented by attaching a local `contentRef` to the `Popup`
    itself and defaulting `initialFocus` to a function that queries
    `contentRef.current` for the first enabled
    `input`/`textarea`/`select` — reproducing the exact old behavior. The
    prop is still exposed as `initialFocus` on `DialogContent` (not kept as
    `onOpenAutoFocus`) since the shapes are fundamentally incompatible
    (event+preventDefault vs. target-returning function) — per the skill's
    own guidance this is a restructure, not a compat shim. No consumer in
    this repo passes `onOpenAutoFocus` (grepped clean), so the default
    behavior applies everywhere unchanged.
  - Types: `React.ComponentProps<typeof DialogPrimitive.X>` →
    `DialogPrimitive.X.Props` throughout.
  - Close-button composition in `DialogHeader`/`DialogFooter`: now uses
    the wrapper's own `DialogClose` (with its `asChild`/`render` compat)
    via `render={<Button ...>}`, rather than reaching for
    `DialogPrimitive.Close` directly with the old `asChild` idiom.
  `@dependencies` JSDoc updated `radix-ui` → `@base-ui/react`. Leftover
  scan: `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
  src/components/ui/dialog.tsx` — no matches.
- `src/components/ui/command.tsx` (cmdk-based, NOT touched for the
  radix→Base UI migration itself — reconfirmed out of scope per the hard
  rules) — needed one incidental type fix: `CommandDialogProps` inherited
  `React.ComponentProps<typeof Dialog>` wholesale, which after this
  migration means `children` widens to `ReactNode |
  PayloadChildRenderFunction<unknown>` and `onOpenChange` types its
  `eventDetails` param as `Dialog`-specific — but `CommandDialog` also
  passes the same `children`/`onOpenChange` into `<Drawer>` (a sibling,
  separately-typed Base UI family, for the mobile breakpoint), which
  broke. Fixed by overriding those two prop types explicitly:
  `Omit<React.ComponentProps<typeof Dialog>, "children" | "onOpenChange">
  & { ...; children?: React.ReactNode; onOpenChange?: (open: boolean) =>
  void }` — a plain boolean-only `onOpenChange` is assignable to both
  `Dialog`'s and `Drawer`'s (each expects extra `eventDetails` args, and a
  callback accepting fewer parameters is safely assignable to a slot
  expecting more). Runtime behavior unchanged.
- `public/registry/care-ui/dialog/dialog.json`, `public/registry/care-ui/index.json`
  — pending regeneration (batched at the end of this multi-component run).

No other consumer changes needed: `playground.tsx`, `lib/registry/dialog.tsx`,
`lib/registry/drawer.tsx` all use `DialogContent`/`DialogHeader`/
`DialogTitle`/`DialogDescription`/`DialogTrigger asChild`/`DialogClose
asChild` with no other prop overrides (no consumer passes `onOpenAutoFocus`
or a `size` prop).

## Left alone

`src/components/ui/command.tsx` remains built on `cmdk`, not Radix — the
one edit above is a type-compat fix forced by `dialog.tsx`'s API change,
not a migration of `command.tsx` itself. `command.md`'s existing
"no migration performed" verdict stands; noting the incidental type fix
here for completeness since it touched the same file this run would
otherwise leave fully alone.

## Behavior changes

- `onOpenChange` gains a second `eventDetails` argument (unused by any
  direct `Dialog` consumer in this repo).
- `onEscapeKeyDown`/`onPointerDownOutside`/`onInteractOutside` (not used
  by this wrapper or any consumer, grepped clean) would need restructuring
  onto `onOpenChange`'s `eventDetails.reason` + `eventDetails.cancel()` if
  ever added.
- `modal` widens to `boolean | 'trap-focus'` (default still `true`) — not
  used explicitly by any consumer.

## Verify by hand

Verified live via a headless browser (dev server + Playwright) as part of
this run:
1. Docs page: Dialog → "Open Dialog" (the Edit Profile example) — clicked
   the trigger; confirmed the "Name" input auto-focused immediately on
   open (visible focus ring, `document.activeElement` was the `name`
   input) — the custom auto-focus-first-input behavior survived the
   `onOpenAutoFocus` → `initialFocus` restructure intact.
2. Clicked the header's × close button — dialog closed (0 visible dialogs
   after).
3. Reopened, clicked "Cancel" (uses `DialogClose asChild` wrapping a
   `Button`) — dialog closed correctly, confirming the `asChild`→`render`
   compat shim works for the footer close button too.
4. No console errors during any of the above interactions.

Manual follow-up recommended:
5. `command.tsx`'s `CommandDialog` (⌘K palette, if bound) — confirm it
   still opens/closes correctly and the search input still receives focus
   on open (desktop breakpoint only; mobile uses the separately-migrated
   Drawer).
