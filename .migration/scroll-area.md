# scroll-area

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: PRISTINE wrapper, direct 1:1 swap
with two part renames.

## Changed

- `src/components/ui/scroll-area.tsx` — classified PRISTINE: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/scroll-area.json`, identical
  besides class ordering. Per `universal-patterns.md`'s coverage matrix
  ("ScrollArea | Scroll Area | direct (Scrollbar/Thumb renames)"), replaced
  wholesale with the fetched
  `https://ui.shadcn.com/r/styles/base-vega/scroll-area.json` content:
  `ScrollAreaPrimitive.ScrollAreaScrollbar` → `ScrollAreaPrimitive.Scrollbar`,
  `ScrollAreaPrimitive.ScrollAreaThumb` → `ScrollAreaPrimitive.Thumb`
  (`Root`/`Viewport`/`Corner` unchanged). Types:
  `React.ComponentProps<typeof ScrollAreaPrimitive.Root>` →
  `ScrollAreaPrimitive.Root.Props`; same for `Scrollbar`. Removed the
  now-unused `import * as React from "react"`. `@dependencies` JSDoc
  updated `radix-ui` → `@base-ui/react`. Leftover scan:
  `grep -n "radix-ui\|@radix-ui\|IconPlaceholder" src/components/ui/scroll-area.tsx`
  — no matches.
- `public/registry/care-ui/scroll-area/scroll-area.json`,
  `public/registry/care-ui/index.json` — pending regeneration (batched at
  the end of this multi-component run).

No consumer changes needed (`filters.tsx`, `lib/registry/scroll-area.tsx`,
`lib/registry/data-table.tsx` all only use `<ScrollArea className>` and the
exported `ScrollBar`, both unchanged; the dropped `type="always"|"scroll"`
prop per `consumer-props.md` is not used anywhere in this repo, grepped
clean).

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- `type` prop (Radix's `"always"|"scroll"|"auto"|"hover"` scrollbar-visibility
  control) has no Base UI equivalent — not used anywhere in this repo.

## Verify by hand

1. Docs page: Scroll Area → confirm vertical scrolling works and the custom
   scrollbar thumb renders/drags correctly.
2. Any horizontal-scrolling ScrollArea instance (if present in Data Table
   demos) → confirm the horizontal scrollbar variant also renders and
   drags correctly.
