# checkbox

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: customized wrapper (project's own
`size` variant), migrated cleanly by hand; required a real consumer
restructuring for the `checked="indeterminate"` → separate `indeterminate`
prop API change (not just a rename — 8 call sites in one large demo file).

## Changed

- `src/components/ui/checkbox.tsx` — classified CUSTOMIZED: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/checkbox.json` and found this
  project adds a `size` variant (`default`/`md`) via `cva` on top of the
  golden's fixed `size-4`. Also confirmed the golden uses the shadcn
  multi-icon-library `IconPlaceholder` component while this project already
  uses a concrete `CheckIcon` from `lucide-react` directly — kept the
  project's concrete icon import (not the placeholder), per this skill's
  leftover-scan rule about `IconPlaceholder`. Rewired
  `radix-ui` → `@base-ui/react/checkbox`; `Root`/`Indicator` parts keep the
  same names (confirmed via `form-controls.md`: "Part mapping: Root -> Root,
  Indicator -> Indicator" — unlike toggle-group, Checkbox is NOT
  single-part-callable). Types:
  `React.ComponentProps<typeof CheckboxPrimitive.Root>` →
  `CheckboxPrimitive.Root.Props`. `@dependencies` JSDoc updated
  `radix-ui` → `@base-ui/react`. The `aria-invalid:aria-checked:border-primary`
  class hook needed NO change — confirmed via
  `node_modules/@base-ui/react/checkbox/root/CheckboxRoot.js:253-254`
  (`role: 'checkbox'`, `'aria-checked': computedIndeterminate ? 'mixed' :
  computedChecked`) that Base UI's Checkbox still sets a real `aria-checked`
  attribute, same as Radix. Leftover scan:
  `grep -n "radix-ui\|@radix-ui\|IconPlaceholder" src/components/ui/checkbox.tsx`
  — no matches.
- `src/lib/registry/data-table.tsx` — the big one. 8 call sites (both
  `React.createElement(Checkbox, {...})` and JSX forms, across several
  full data-table demo variants in this ~11,000-line file) used the Radix
  idiom `checked={allSelected || (someSelected ? "indeterminate" : false)}`
  for the "select all rows" header checkbox. Base UI's `Checkbox.Root` has
  `checked: boolean` and a separate `indeterminate: boolean` prop (per
  `form-controls.md`'s "`checked` | `boolean \| 'indeterminate'` → `checked:
  boolean` + `indeterminate: boolean`" row) — `"indeterminate"` is no longer
  a valid `checked` value at all, so this wasn't optional to leave as-is (it
  would no longer type-check and would silently misbehave at runtime).
  Split every occurrence into `checked={table.getIsAllPageRowsSelected()}` +
  `indeterminate={!table.getIsAllPageRowsSelected() &&
  table.getIsSomePageRowsSelected()}` (same visual/behavioral outcome:
  checked only when all rows selected, indeterminate when some-but-not-all,
  plain unchecked otherwise). Two pairs of these 8 sites were byte-identical
  duplicate blocks (verified before using `replace_all`, since the fix is
  identical for identical source). Also updated one `onCheckedChange`
  callback's parameter type, `(checked: boolean | "indeterminate") =>
  handleSelectRow(row.id, checked === true)` → `(checked: boolean) =>
  handleSelectRow(row.id, checked)`, since `onCheckedChange` now always
  passes a plain boolean.
- `src/lib/registry/checkbox.tsx` — docs prop table: `checked` and
  `onCheckedChange` type strings narrowed from `boolean | "indeterminate"`
  to `boolean`; added a new `indeterminate: boolean` row (default `false`).

No other consumers needed changes: `src/components/playground.tsx`'s
`onCheckedChange={(v) => setChecked(!!v)}` and every direct
`<Checkbox checked={...}>` call site in `src/components/ui/filters.tsx`
already passed plain booleans (`true`, `false`, `isSelected`), never the
string `"indeterminate"`.

## Left alone

`src/components/ui/data-table.tsx` (the actual shipped UI component, as
opposed to the docs demo file above) only uses `DropdownMenuCheckboxItem`
for its column-visibility menu, not this `Checkbox` component — no
indeterminate usage there, untouched.

## Behavior changes

- Radix's `Root` renders a `<button>`; Base UI's `Root` renders a `<span>`
  with a hidden `<input type="checkbox">` (per `form-controls.md`'s "Element
  change" note). Styling is class-driven and unaffected, but anything
  targeting the rendered tag name directly (not found in this repo) would
  need updating.
- `onCheckedChange` gains a second `eventDetails` argument (unused
  everywhere in this repo — grepped clean beyond what's listed above).

## Verify by hand

1. Docs page: Checkbox → confirm both `size` variants (`default`/`md`)
   still render at the expected dimensions, and the check icon appears
   only when checked.
2. Docs page: Checkbox → "In Table" example (uses `onCheckedChange`) —
   click a row's checkbox, confirm it toggles and the check icon
   shows/hides correctly.
3. Docs page: Data Table (any of its several variants) → click the header
   "select all" checkbox: confirm it shows the indeterminate dash when some
   (not all) rows are selected, becomes fully checked when all are
   selected, and clears when none are selected.
4. `src/components/playground.tsx`'s Controls section → click the
   playground checkbox, confirm it toggles.
