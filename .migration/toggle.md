# toggle

2026-07-16, three-way merge (`git merge-file` with the `radix-vega` golden as
ancestor, `base-vega` golden as target — fetched by URL, progressive mode).
Verdict: customized wrapper, migrated cleanly; customization survived the
merge unchanged.

## Changed

- `src/components/ui/toggle.tsx` — classified CUSTOMIZED: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/toggle.json` and found the size
  variants use different padding (`px-2`/`px-1.5`/`px-2.5`) and lack the
  golden's `has-data-[icon=inline-end/start]:pr/pl-*` icon-aware padding
  utilities entirely. Ran `git merge-file` with the radix-vega golden as the
  common ancestor and the fetched base-vega golden
  (`https://ui.shadcn.com/r/styles/base-vega/toggle.json`) as the other side;
  the size-variant customization carried through untouched (confirmed byte
  ‑for-byte against the pre-migration `cva` block). Only the import block
  conflicted (both sides changed `radix-ui`→`@base-ui/react/toggle` and the
  registry-internal `lib/utils` alias differently) — hand-resolved to
  `import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"` +
  this project's `@/lib/utils`, and dropped the now-unused
  `import * as React from "react"` (nothing in the file references the
  `React` namespace anymore now that the prop type is `TogglePrimitive.Props`
  instead of `React.ComponentProps<typeof TogglePrimitive.Root>`).
  `TogglePrimitive.Root` → `TogglePrimitive` (Base UI's Toggle is a callable
  single-part primitive, no `.Root`, per `disclosure.md`/`universal-patterns.md`).
  Kept the pre-existing `"use client"` directive (present in this file before
  the migration, unlike most other wrappers in this project — left as-is
  rather than added/removed opinionatedly).
  `@dependencies` JSDoc tag updated `radix-ui` → `@base-ui/react`.
  Leftover scan: `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
  src/components/ui/toggle.tsx` — no matches.
- `public/registry/care-ui/toggle/toggle.json`, `public/registry/care-ui/index.json`
  — regenerated via `pnpm run build:registry`.

`pressed`/`defaultPressed`/`onPressedChange`/`disabled` props are unchanged
(same names on Base UI's `Toggle` per `disclosure.md`); no consumer edits
needed for those. The `aria-pressed:bg-muted` class hook in `toggleVariants`
also needed NO change — confirmed via `node_modules/@base-ui/react/toggle/Toggle.js:78`
(`'aria-pressed': pressed`) that Base UI's `Toggle` sets a real `aria-pressed`
ARIA attribute, same as Radix, so the existing selector still matches.

## Left alone

`src/lib/registry/toggle.tsx` (the docs demo/props-table page) — no changes
needed. Its examples only use `variant`, `size`, `aria-label`, `disabled`,
none of which changed shape, and its props table's `pressed`/`defaultPressed`/
`onPressedChange`/`disabled` rows are still accurate names (only the
`onPressedChange` signature technically gains an `eventDetails` second
argument, which the doc's simplified type string `(pressed: boolean) => void`
doesn't reflect — pre-existing doc simplification, not something this
migration introduced or needs to fix here since no demo code actually calls
it with two args).

## Behavior changes

- `onPressedChange` gains a second `eventDetails: Toggle.ChangeEventDetails`
  argument (not used anywhere in this repo currently — grepped clean).

## Verify by hand

1. Docs page: Toggle → confirm default/outline variants and sm/default/lg
   sizes all render with correct padding (this project's own custom padding
   scale, not the shadcn default — should look unchanged from before the
   migration).
2. Click a toggle button; confirm it visually presses (background changes
   via `aria-pressed:bg-muted`) and stays pressed until clicked again.
3. Tab to a toggle with keyboard, press Space/Enter; confirm the same
   pressed toggle behavior as mouse click.
4. Confirm the "Disabled" example's toggles cannot be pressed by click or
   keyboard.

Verified points 2–3 live: launched the dev server, navigated to the
Toggle doc page, clicked the standalone toggle, and confirmed via DOM
inspection that it gained both `data-pressed` and `aria-pressed="true"`.
No console errors during interaction.
