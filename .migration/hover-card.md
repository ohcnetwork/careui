# hover-card

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: PRISTINE wrapper, renamed +
restructured to Base UI's Preview Card (positioner model); one consumer
demo needed a real prop relocation (`openDelay`/`closeDelay` Root → Trigger
`delay`/`closeDelay`).

## Changed

- `src/components/ui/hover-card.tsx` — classified PRISTINE: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/hover-card.json`, identical
  besides class ordering. Per `universal-patterns.md`'s coverage matrix
  ("HoverCard | Preview Card | RENAMED + positioner model"), replaced
  wholesale with the fetched
  `https://ui.shadcn.com/r/styles/base-vega/hover-card.json` content:
  `radix-ui`'s `HoverCard` → `@base-ui/react/preview-card`'s `PreviewCard`
  (exported wrapper names `HoverCard`/`HoverCardTrigger`/`HoverCardContent`
  unchanged for consumers, matching this project's naming convention over
  the primitive's real name). `Content` restructured to
  `Portal > Positioner > Popup` (`side`/`sideOffset`/`align`/`alignOffset`
  moved to Positioner; note `alignOffset` gets a non-zero default of `4`
  in the golden, kept as shipped). `HoverCardTrigger` gained the standard
  `asChild`→`render` compat shim (`resolveAsChild`, matching
  `dialog.tsx`/`popover.tsx`/`alert-dialog.tsx`) since every consumer uses
  `<HoverCardTrigger asChild>`. CSS var rename:
  `--radix-hover-card-content-transform-origin` → `--transform-origin`.
  Types: `React.ComponentProps<typeof HoverCardPrimitive.X>` →
  `PreviewCardPrimitive.X.Props`. Removed the now-unused
  `import * as React from "react"` from the top-level import (re-added
  since it's needed for the `resolveAsChild` helper's JSX types). Dropped
  the now-unused... (no other removals). `@dependencies` JSDoc updated
  `radix-ui` → `@base-ui/react`. Leftover scan:
  `grep -n "radix-ui\|@radix-ui\|IconPlaceholder" src/components/ui/hover-card.tsx`
  — no matches.
- `src/lib/registry/hover-card.tsx` — the only consumer, both demos passed
  `openDelay`/`closeDelay` directly on `<HoverCard>` (Root). Per
  `consumer-props.md`'s "Popover / HoverCard | openDelay/closeDelay on
  Root | move to TRIGGER as delay/closeDelay" row, this is a real prop
  relocation, not just a rename — confirmed via
  `node_modules/@base-ui/react/preview-card/trigger/PreviewCardTrigger.d.ts:33,38`
  that `delay`/`closeDelay` live on `Trigger`, not `Root`. Updated all 4
  occurrences (2 executable `React.createElement`/JSX preview trees, 2
  matching `code:` display template strings) in both the main demo
  (`openDelay={10} closeDelay={100}` → `<HoverCardTrigger asChild
  delay={10} closeDelay={100}>`) and the "Sides" example
  (`openDelay={100} closeDelay={100}` → same pattern on Trigger).
- `public/registry/care-ui/hover-card/hover-card.json`,
  `public/registry/care-ui/index.json` — pending regeneration (batched at
  the end of this multi-component run).

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- `onOpenChange` gains a second `eventDetails` argument (unused here).
- `openDelay`/`closeDelay` relocating from Root to Trigger means any
  future consumer that copies the OLD `<HoverCard openDelay={...}>`
  pattern from memory/habit will silently no-op (the prop is simply
  unknown on Root, not a type error since Root still accepts arbitrary
  extra props via spread) — flagging as a footgun for future demos, not
  something to guard against here since no such new usage exists yet.

## Verify by hand

1. Docs page: Hover Card → hover the "Hover Here" link; confirm the card
   appears after the ~10ms configured delay and disappears ~100ms after
   the pointer leaves (the delay values should still feel the same as
   before the migration, since they moved location but not value).
2. Docs page: Hover Card → "Sides" example — hover each of the four
   side-labeled buttons; confirm the card opens on the correct side
   (left/top/bottom/right) with the same ~100ms delays.
