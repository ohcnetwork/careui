# tooltip

2026-07-16, golden pair via CLI (fetched by URL, progressive mode — project
style is still `radix-vega`), migrated in place. Verdict: clean 1:1
positioner-model swap; two call sites needed a prop rename.

## Changed

- `src/components/ui/tooltip.tsx` — classified PRISTINE (diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/tooltip.json`: identical
  besides Tailwind class ordering). Replaced wholesale with the fetched
  `https://ui.shadcn.com/r/styles/base-vega/tooltip.json` content, adapted
  to this project's `@/lib/utils` alias and its no-`"use client"`
  convention (project has `rsc: false`, matching every other migrated
  wrapper). `TooltipPrimitive.Content` restructured to
  `Portal > Positioner > Popup` per the universal positioner-model
  pattern; `side`/`sideOffset`/`align`/`alignOffset` moved from Popup to
  Positioner. `TooltipTrigger` keeps an `asChild` compat prop (translated
  to Base UI `render` via a local `resolveAsChild` helper), matching the
  established precedent in `alert-dialog.tsx`/`drawer.tsx` — this repo has
  101+ `asChild` call sites project-wide and out-of-scope to hand-migrate
  for a single-component request. `TooltipProvider`'s `delayDuration` was
  NOT given a compat shim (unlike `asChild`): per `consumer-props.md` this
  prop is a straight rename to `delay`, so call sites were updated instead
  (see below) rather than carrying two names forward.
  Leftover scan: `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
  src/components/ui/tooltip.tsx` — no matches.
- `src/components/ui/sidebar.tsx:135` — `TooltipProvider delayDuration={0}`
  → `TooltipProvider delay={0}`.
- `src/components/ui/filters.tsx:2664` — `TooltipProvider
  delayDuration={300}` → `TooltipProvider delay={300}`.
- `src/lib/registry/button-group.tsx:543`, `:748` — two
  `React.createElement(TooltipProvider, { delayDuration: 0 } as
  React.ComponentProps<typeof TooltipProvider>, ...)` call sites →
  `{ delay: 0 }`.
- `src/lib/registry/tooltip.tsx:271` — docs prop table entry renamed
  `delayDuration` → `delay` (description/default unchanged, `0`).
- `public/registry/care-ui/tooltip/tooltip.json`,
  `public/registry/care-ui/index.json`,
  `public/registry/care-ui/filters/filters.json`,
  `public/registry/care-ui/sidebar/sidebar.json` — regenerated via
  `pnpm run build:registry` to reflect the new `@base-ui/react` dependency
  and updated prop usage.

All other consumers (`dynamic-main-content.tsx`, `blocks/inner-page-01.tsx`,
`blocks/inner-page-02.tsx`, `ui/studio-sidebar.tsx`,
`lib/registry/sidebar*.tsx`, `lib/registry/kbd.tsx`) only use
`Tooltip`/`TooltipTrigger asChild`/`TooltipContent side=...`/
`TooltipProvider` with no args — all covered by the `asChild` compat shim
and unchanged Positioner-forwarded `side` prop; no edits needed.

## Left alone

No unrelated files. `TooltipContent`'s `React.ComponentProps<typeof
TooltipContent>` type re-used in `sidebar.tsx:511` and
`studio-sidebar.tsx:505` (for the `tooltip` prop shape) continues to
resolve correctly against the new signature; left untouched.

## Behavior changes

- `TooltipContent`'s default `sideOffset` moved from `0` to `4` (and
  `side`/`align`/`alignOffset` are now explicit defaulted props: `"top"`,
  `"center"`, `0`). This is the base-vega registry's own default, not a
  project customization being discarded — the previous `sideOffset = 0`
  in the radix-vega wrapper was itself just the un-customized shadcn
  default, confirmed identical against the radix-vega golden pair. Net
  effect: tooltips now render with a 4px gap from their trigger instead of
  touching it. Flagging since it's a visible spacing change; not patched
  back to match old behavior since the target is the idiomatic base-vega
  registry shape.
- `TooltipProvider`'s `delayDuration` prop is gone (renamed to `delay`);
  `skipDelayDuration` and `disableHoverableContent` have no Base UI
  Provider equivalent (project doesn't use either — grepped clean).
- `onOpenChange`, `onEscapeKeyDown`, `onPointerDownOutside` signature/prop
  changes per `overlays.md` are not exercised anywhere in this repo
  (grepped clean) — no functional impact today, but future consumers
  adding these will need the new Base UI shapes.

## Verify by hand

- Hover each of the four `dynamic-main-content.tsx` "Copy Code" buttons —
  tooltip should appear near-instantly (Provider default `delay=0`) with a
  small visible gap above the trigger (new `sideOffset=4` default).
- In the sidebar (`ui/sidebar.tsx`, collapsed rail state), hover a nav
  item — tooltip should appear immediately (`delay={0}` explicit) to the
  side, arrow pointing correctly with no rotation glitch.
- In `filters.tsx`, hover a filter row's rename/delete icon buttons —
  tooltip appears above with `delay={300}` feel preserved (~300ms hover
  delay before it shows).
- Keyboard: Tab to a `TooltipTrigger` — tooltip should open on focus and
  close on blur/Escape (focus-triggered path, same as before).
- Check the arrow renders without a stray offset/rotation regression on
  `top`/`right`/`bottom`/`left` sides (see `lib/registry/tooltip.tsx`'s
  `TooltipSides` demo, all four sides).
