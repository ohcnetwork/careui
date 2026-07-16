# select

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: customized wrapper (larger
trigger/item dimensions and responsive breakpoints), migrated by hand
against the current live golden pair — the most structurally-restructured
form control in this batch (positioner model, dropped `position` prop,
several part renames).

## Changed

- `src/components/ui/select.tsx` — classified CUSTOMIZED: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/select.json` and found larger
  `SelectTrigger` dimensions (`h-12`/`h-10` + `md:h-10`/`md:h-9` responsive,
  `pr-2.5 pl-3` + `md:pr-2 md:pl-2.5`, `data-placeholder:text-placeholder-foreground`
  — a project-specific token) and larger `SelectItem` padding (`py-2.5
  pr-8 pl-2.5` + `md:py-1.5 md:pl-2`) versus the golden's flat, smaller
  sizing. Also confirmed the golden uses `IconPlaceholder`; kept this
  project's concrete `ChevronDownIcon`/`CheckIcon`/`ChevronUpIcon` imports
  from `lucide-react` instead (per the leftover-scan rule), and confirmed
  no `cn-*` class hooks exist anywhere in this project's `ui/` directory
  (grepped clean) — skipped the golden's `cn-menu-target cn-menu-translucent`
  companion classes per `wrapper-shapes.md`'s "skip for plain-Tailwind
  projects" guidance. Structural changes adopted verbatim from the fetched
  `https://ui.shadcn.com/r/styles/base-vega/select.json` (per
  `form-controls.md`'s select part mapping and `wrapper-shapes.md`'s
  Select-specific notes):
  - `Select` is now a **bare re-export** (`const Select = SelectPrimitive.Root`,
    no wrapper function, no `data-slot` on Root) — `SelectPrimitive.Root.Props`
    is generic (`<Value, Multiple>`) and a wrapper function breaks the usual
    `ComponentProps` pattern; confirmed no consumer or CSS targets
    `[data-slot="select"]` (grepped clean), so dropping it is safe.
  - `SelectValue` gained an explicit `className="flex flex-1 text-left"`
    default (previously bare passthrough) — a genuine new requirement in
    Base UI's anatomy, not a customization loss.
  - `Content` restructured to `Portal > Positioner > Popup` (from a flat
    `Portal > Content`): the `position="item-aligned"|"popper"` prop is
    DROPPED ENTIRELY, replaced by `alignItemWithTrigger` (default `true`,
    picked from `Positioner.Props`) plus explicit `side`/`sideOffset`
    (default `4`)/`align`/`alignOffset` props on the Positioner. Confirmed
    no consumer anywhere passes `position` (grepped clean).
  - `Viewport` → `List`, now classless (positioning moved onto `Popup` via
    `w-(--anchor-width)` instead of the old Viewport's
    `data-[position=popper]:*` classes).
  - CSS vars renamed: `--radix-select-content-available-height` →
    `--available-height`, `--radix-select-content-transform-origin` →
    `--transform-origin`, plus new `w-(--anchor-width)` (from the trigger's
    measured width).
  - `Icon`'s `asChild` + wrapped child → `render={<Icon />}` prop (no
    wrapper element).
  - `ItemIndicator`'s wrapping wrapper `<span>` is now the indicator's OWN
    `render` target (`<ItemIndicator render={<span className="..." />}>`)
    instead of a separate always-present parent `<span>` with the
    indicator nested inside — matches the golden exactly; net effect is a
    cleaner DOM (no empty span when unchecked) rather than a behavior
    change.
  - `ItemText` now comes BEFORE `ItemIndicator` in render order (was
    after, in the old radix version) and gained an explicit className —
    matches golden and `wrapper-shapes.md`'s Select anatomy note.
  - `ScrollUpButton`/`ScrollDownButton` → `ScrollUpArrow`/`ScrollDownArrow`
    (renamed), gained `top-0 w-full` / `bottom-0 w-full` classes (per
    `wrapper-shapes.md`: "Scroll arrows get `top-0 w-full` / `bottom-0
    w-full`").
  - `Label` → `GroupLabel` (Base UI's own `Select.Label` is a NEW part
    that labels the Trigger, not groups — a naming collision the registry
    resolves by using `GroupLabel` for the old grouping-label behavior;
    per `form-controls.md`'s part mapping).
  - Types: `React.ComponentProps<typeof SelectPrimitive.X>` →
    `SelectPrimitive.X.Props` throughout (except
    `ScrollUpArrow`/`ScrollDownArrow`, where the live base-vega golden
    itself still uses `React.ComponentProps<typeof
    SelectPrimitive.ScrollUpArrow>` — kept `import * as React from "react"`
    for this reason, matching the golden verbatim rather than "fixing" an
    inconsistency that isn't mine to fix).
  `@dependencies` JSDoc updated `radix-ui` → `@base-ui/react`. Leftover
  scan: `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
  src/components/ui/select.tsx` — no matches.
- `src/lib/registry/button-group.tsx:996-1000` — one demo call site,
  `React.createElement(Select, { value: currency, onValueChange: setCurrency
  }, ...)`. Base UI's bare-re-export `Select` has no explicit generic
  applied here, so `onValueChange`'s `value` parameter types as `unknown`
  rather than `string`; a raw `Dispatch<SetStateAction<string>>` no longer
  satisfied it. Fixed with `onValueChange: (value) => setCurrency(value as
  string)` (runtime behavior unchanged — this demo only ever passes
  string currency codes as `value` on its `SelectItem`s).
- `public/registry/care-ui/select/select.json`, `public/registry/care-ui/index.json`
  — pending regeneration (batched at the end of this multi-component run).

No other consumers needed changes: `playground.tsx`, `lib/registry/pagination.tsx`,
`lib/registry/field.tsx`, `lib/registry/dialog.tsx`, `lib/registry/input.tsx`,
`lib/registry/select.tsx` all use `defaultValue`/`value` with JSX-form
`onValueChange` (contextually typed, no explicit annotation needed) or no
`onValueChange` at all — all still type-check.

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- `position="item-aligned"` (the old default, aligning the open list so
  the selected item lines up with the trigger) is now expressed via
  `alignItemWithTrigger={true}` (also the new default) — same visual
  intent, different prop. `position="popper"` (detached dropdown-style
  positioning) has no direct equivalent prop name; achieved by passing
  `alignItemWithTrigger={false}` instead. Not used by any consumer here.
- `onValueChange`/`onOpenChange` gain a second `eventDetails` argument
  (unused everywhere in this repo).
- The bare `Select` re-export means TypeScript can no longer infer the
  select's value type from `React.ComponentProps<typeof
  SelectPrimitive.Root>` the way it used to — untyped `onValueChange`
  callbacks see `unknown` for `value` and need a cast/guard if consuming
  it as a specific type (see the `button-group.tsx` fix above). This is
  the tradeoff for supporting Base UI's generic `<Value, Multiple>` select
  API.

## Verify by hand

1. Docs page: Select → open the dropdown, confirm items render, hover/
   keyboard-navigate between them, and selecting one closes the dropdown
   and updates the trigger's displayed value.
2. Confirm the dropdown list aligns so the currently-selected item sits
   over the trigger when reopened (the `alignItemWithTrigger` default
   behavior, replacing the old `position="item-aligned"`).
3. Scroll a long option list (if any demo has one): confirm the up/down
   scroll arrow buttons appear at the edges and scroll correctly.
4. `lib/registry/button-group.tsx`'s currency selector: change the
   currency, confirm the trigger updates and the value round-trips
   correctly through the fixed `onValueChange` cast.
5. `lib/registry/field.tsx`'s Select-in-a-Field examples: confirm label
   association and validation styling still work.
