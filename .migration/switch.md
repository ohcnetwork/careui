# switch

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: customized wrapper (project's own
sizing scale and checked/unchecked thumb icons), migrated cleanly by hand —
no structural prop changes for `Root`/`Thumb`, so a straight rewire was
enough (no merge tool needed).

## Changed

- `src/components/ui/switch.tsx` — classified CUSTOMIZED: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/switch.json` and found this
  project uses substantially larger track/thumb dimensions with responsive
  (`md:`) breakpoints, and renders `CheckIcon`/`MinusIcon` inside the thumb
  to show checked/unchecked state — none of which exist in the golden
  (plain thumb, no icons, smaller fixed size). Per `form-controls.md`'s
  switch section, `Root -> Root` and `Thumb -> Thumb` are unchanged part
  names, and `checked`/`onCheckedChange`/`disabled`/`required`/`name`/
  `value` are all unchanged prop names (only `onCheckedChange` gains a
  second `eventDetails` argument) — so this customization needed no merge
  tool, just a straight import rewire: `radix-ui` → `@base-ui/react/switch`,
  type `React.ComponentProps<typeof SwitchPrimitive.Root>` →
  `SwitchPrimitive.Root.Props`. Removed the now-unused
  `import * as React from "react"`. `@dependencies` JSDoc updated
  `radix-ui` → `@base-ui/react`. All custom sizing classes, the `size` prop,
  and both icons preserved verbatim. Leftover scan:
  `grep -n "radix-ui\|@radix-ui\|IconPlaceholder" src/components/ui/switch.tsx`
  — no matches.
- `public/registry/care-ui/switch/switch.json`, `public/registry/care-ui/index.json`
  — pending regeneration (batched at the end of this multi-component run).

No consumer changes needed (`settings-page.tsx`, `playground.tsx`,
`lib/registry/sheet.tsx`, `lib/registry/field.tsx`, `lib/registry/switch.tsx`
all only use `checked`/`onCheckedChange`/`disabled`, unchanged names).

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- Radix's `Root` renders a `<button>`; Base UI's `Root` renders a `<span>`
  with a hidden `<input type="checkbox">` (per `form-controls.md`'s element
  change note) — class-driven styling is unaffected.
- `onCheckedChange` gains a second `eventDetails` argument (unused
  everywhere in this repo — grepped clean).

## Verify by hand

1. `src/components/playground.tsx` Controls section: click the switch,
   confirm it slides and the check/minus icon crossfades correctly for
   both the `default` and any `sm`-sized instances elsewhere.
2. `settings-page.tsx`: toggle any switch-backed setting, confirm visual
   state persists correctly.
3. Tab to a switch with keyboard, press Space; confirm the same toggle
   behavior as a mouse click.
