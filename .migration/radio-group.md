# radio-group

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: PRISTINE wrapper, straight swap.

## Changed

- `src/components/ui/radio-group.tsx` — classified PRISTINE: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/radio-group.json`, identical
  besides Tailwind class ordering. Replaced wholesale with the fetched
  `https://ui.shadcn.com/r/styles/base-vega/radio-group.json` content:
  Radix ships one `RadioGroup` namespace (`Root`/`Item`/`Indicator`); Base
  UI splits it into a standalone callable `RadioGroup` (no sub-parts) and a
  separate `Radio` primitive (`Radio.Root`/`Radio.Indicator`), per
  `form-controls.md`'s "`RadioGroup.Root -> RadioGroup`, `RadioGroup.Item ->
  Radio.Root`, `RadioGroup.Indicator -> Radio.Indicator`" mapping.
  `RadioGroupItem` now renders `<RadioPrimitive.Root>` internally (exported
  name unchanged for consumers). Types:
  `React.ComponentProps<typeof RadioGroupPrimitive.Root>` →
  `RadioGroupPrimitive.Props`; `React.ComponentProps<typeof
  RadioGroupPrimitive.Item>` → `RadioPrimitive.Root.Props`. Dropped the
  now-unused `import * as React from "react"`. `@dependencies` JSDoc
  updated `radix-ui` → `@base-ui/react`. Leftover scan:
  `grep -n "radix-ui\|@radix-ui\|IconPlaceholder" src/components/ui/radio-group.tsx`
  — no matches.
- `public/registry/care-ui/radio-group/radio-group.json`,
  `public/registry/care-ui/index.json` — pending regeneration (batched at
  the end of this multi-component run).

No consumer changes needed (`lib/registry/field.tsx`, `lib/registry/radio-group.tsx`,
`lib/registry/dropdown-menu.tsx` only use `value`/`onValueChange`/`children`,
none of which changed shape; `orientation` — the one prop Base UI drops per
`disclosure.md` — is not used anywhere in this repo, grepped clean).

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- `orientation` prop has no Base UI equivalent (arrow-key navigation now
  handles both axes automatically); not used anywhere in this repo.
- `onValueChange` gains a second `eventDetails` argument (unused here).
- Radix's `Item` renders a `<button>`; Base UI's `Radio.Root` renders a
  `<span>` plus hidden `<input type="radio">` — class-driven styling
  unaffected.

## Verify by hand

1. Docs page: Radio Group → confirm each radio option renders correctly
   and selecting one deselects the others.
2. Keyboard: Tab into the group, arrow-key between options, confirm
   selection follows focus (native radio-group behavior).
3. `lib/registry/field.tsx`'s radio-group-in-a-field example: confirm label
   association and disabled-state styling still work.
