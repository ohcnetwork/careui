# separator

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: customized wrapper (project's own
`variant` system layered on top of the shadcn default), migrated cleanly by
hand — the customization is additive so no merge tool was needed.

## Changed

- `src/components/ui/separator.tsx` — classified CUSTOMIZED: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/separator.json` and found this
  project adds an entire `variant` prop (`solid`/`dashed`/`inset`/`dotted`)
  via `cva`, on top of the plain single-style golden. Rewired the primitive
  import (`radix-ui` → `@base-ui/react/separator`), swapped
  `SeparatorPrimitive.Root` → `SeparatorPrimitive` (Base UI's Separator is a
  callable single-part primitive, confirmed against
  `node_modules/@base-ui/react/separator/Separator.d.ts`), and dropped the
  `decorative` prop entirely — Base UI's `SeparatorProps` has no such prop
  (confirmed in the same `.d.ts`; matches `consumer-props.md`'s
  "Separator | decorative | dropped | remove" row). Types:
  `React.ComponentProps<typeof SeparatorPrimitive.Root>` →
  `SeparatorPrimitive.Props`. Removed the now-unused
  `import * as React from "react"`. `@dependencies` JSDoc updated
  `radix-ui` → `@base-ui/react`. The `variant`/`orientation` customization
  and its `cva` config are untouched. Leftover scan:
  `grep -n "radix-ui\|@radix-ui\|IconPlaceholder" src/components/ui/separator.tsx`
  — no matches.
- `src/lib/registry/separator.tsx` — removed the `decorative` row from the
  docs prop table (the only reference to it anywhere in the repo; grepped
  the whole project for `decorative` usage on `Separator` and found none —
  no consumer ever passed it explicitly).
- `public/registry/care-ui/separator/separator.json`,
  `public/registry/care-ui/index.json` — pending regeneration (batched at
  the end of this multi-component run).

No other consumers (`button-group.tsx`, `item.tsx`, `field.tsx`,
`sidebar.tsx`, `studio-sidebar.tsx` — all still on Radix for their own
primitives, but they only pass `orientation` to `Separator`, which is
unchanged) needed edits.

## Left alone

`src/components/ui/dotted-divider.tsx` — a different, hand-rolled
decorative divider component (SVG dot-matrix pattern), unrelated to this
Separator despite the similar "dotted" naming; not a Radix wrapper at all.

## Behavior changes

- `decorative` is gone. No consumer passed it explicitly (all relied on the
  default `true`), and Base UI's Separator renders with `role="separator"`
  by default in a way that doesn't require the prop — flagging only because
  it's a removed prop, not because any behavior is expected to visibly
  change.

## Verify by hand

1. Any page using dividers between sidebar sections or content blocks:
   confirm horizontal and vertical separators still render at the same
   thickness/style for each `variant` (`solid`, `dashed`, `inset`, `dotted`).
2. Confirm no separator is announced as a focusable/interactive element to
   assistive tech (Base UI's default rendering should still be inert).
