# navigation-menu

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: PRISTINE wrapper, migrated with
the largest structural rewrite in this batch — the entire
Viewport-below-the-list model is replaced by an anchored `Portal >
Positioner > Popup > Viewport` model, and the `viewport` boolean toggle
prop is gone entirely. Verified live in a headless browser: menu open,
animated content-swap between two triggers, and chevron rotation all
confirmed working with no console errors.

## Changed

- `src/components/ui/navigation-menu.tsx` — classified PRISTINE: diffed
  against `https://ui.shadcn.com/r/styles/radix-vega/navigation-menu.json`,
  identical besides class ordering (the project's file already contained
  the same `data-open:`/`data-popup-open:` class hooks as the RADIX
  golden itself — confirmed this is an upstream shadcn registry quirk,
  not project drift: those hooks are dead code under Radix on both sides,
  since Radix only ever sets `data-state="open"`, never a bare
  `data-open` attribute, and this project has no custom Tailwind variant
  redefining `data-open:` — see the same pattern already noted in the
  dropdown-menu/context-menu/menubar reports). Replaced wholesale with the
  fetched `https://ui.shadcn.com/r/styles/base-vega/navigation-menu.json`
  content per `menus.md`'s navigation-menu section:
  - **`viewport` boolean prop DROPPED, `NavigationMenuViewport` REPLACED
    by `NavigationMenuPositioner`.** Radix's model conditionally rendered
    either an inline `NavigationMenuContent` (viewport=false) or a shared
    `Viewport` div below the list (viewport=true, the default). Base UI's
    anchored-positioning model always renders one shared popup via
    `Portal > Positioner > Popup > Viewport`, mounted unconditionally
    inside `NavigationMenu` (Root) — matches `menus.md`: "Radix's
    'Viewport rendered below the list' model is replaced by this anchored
    Positioner model (our wrappers removed the `viewport` boolean prop
    accordingly)." Confirmed no consumer anywhere passes `viewport` or
    imports `NavigationMenuViewport` (grepped clean), so this is a clean
    removal with no consumer impact.
  - `NavigationMenu` (Root) gained an `align` prop (default `"start"`,
    picked from `Positioner.Props`), forwarded to the new
    `NavigationMenuPositioner` it now always renders as a sibling to
    `children`.
  - `NavigationMenuIndicator` now wraps `NavigationMenuPrimitive.Icon`
    instead of `.Indicator` — per `menus.md`: "Different role: Radix
    Indicator tracked the active trigger below the List; Base `Icon` is a
    chevron inside the Trigger... There is no Base part that tracks the
    active trigger along the list." The wrapper's own implementation
    (the small rotated-square arrow div) is preserved byte-for-byte; only
    the underlying primitive part changed. Not used by the one consumer in
    this repo (grepped clean), so no observed behavior change.
  - `NavigationMenuLink` gained the standard `asChild`→`render` compat
    shim (`resolveAsChild`, matching every other menu-family migration
    this run) — used by the one consumer's `ListItem` helper
    (`<NavigationMenuLink asChild><a href={href}>...</a></NavigationMenuLink>`).
  - CSS var renames: `--radix-navigation-menu-viewport-width/height` →
    `--popup-width`/`--popup-height` (now on Popup, not a standalone
    Viewport); new Positioner-only vars `--positioner-width/height`,
    `--available-width`, `--transform-origin`.
  - Types: `React.ComponentProps<typeof NavigationMenuPrimitive.X>` →
    `NavigationMenuPrimitive.X.Props` throughout. `@dependencies` JSDoc
    updated `radix-ui` → `@base-ui/react`. Leftover scan:
    `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
    src/components/ui/navigation-menu.tsx` — no matches.
- `public/registry/care-ui/navigation-menu/navigation-menu.json`,
  `public/registry/care-ui/index.json` — pending regeneration (batched at
  the end of this multi-component run).

No consumer changes needed: `src/lib/registry/navigation-menu.tsx` (the
only consumer) uses `NavigationMenu`/`NavigationMenuList`/
`NavigationMenuItem`/`NavigationMenuTrigger`/`NavigationMenuContent`/
`NavigationMenuLink asChild`/`navigationMenuTriggerStyle()` — all
unchanged shapes after the `asChild` fix, none of the removed
`viewport`/`NavigationMenuViewport`/`NavigationMenuIndicator` surfaces.

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- `viewport={false}` mode (inline dropdown instead of shared positioned
  popup) has no direct equivalent — the anchored Positioner model is now
  the only mode. Not used anywhere in this repo.
- `onValueChange`'s `value` widens from `string` to `Value | null` (any
  type), and gains a second `eventDetails` argument with an expanded
  reason union including `'trigger-hover'`/`'link-press'` — not consumed
  by this wrapper or its one consumer.
- `NavigationMenuIndicator`'s underlying primitive changed role (tracks a
  different concept per Base UI's docs) — purely theoretical here since
  it's unused; flagging per the skill's "behavior deltas are flagged, not
  patched" rule.

## Verify by hand

Verified live via a headless browser (dev server + Playwright) as part of
this run:
1. Docs page: Navigation Menu → clicked "Getting started" — panel opened
   anchored below the trigger with "Introduction"/"Installation"/
   "Typography" list items, chevron rotated 180°, trigger showed the
   `data-popup-open` pressed background.
2. Clicked "Components" while "Getting started" was still highlighted —
   content swapped to the two-column "Components" grid (Alert Dialog /
   Hover Card / Progress / Scroll-area / Tabs / Tooltip), confirming the
   animated content-swap between two different triggers' content survived
   the Viewport → Positioner restructuring.
3. No console errors during either interaction.
