# label

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: PRISTINE wrapper, straight swap for
a native `<label>` — no Base UI counterpart exists for this primitive.

## Changed

- `src/components/ui/label.tsx` — classified PRISTINE: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/label.json`, byte-for-byte
  identical besides the alias path. Per this skill's hard rules ("No Base
  UI counterpart: ... Label -> none; missing: native `<label>`"), replaced
  wholesale with the fetched
  `https://ui.shadcn.com/r/styles/base-vega/label.json` content: dropped
  `LabelPrimitive` (`radix-ui`) entirely, render a plain `<label>` element,
  type changed `React.ComponentProps<typeof LabelPrimitive.Root>` →
  `React.ComponentProps<"label">`. `@dependencies` JSDoc updated (dropped
  `radix-ui`; kept the pre-existing `class-variance-authority` entry as-is —
  it was already inaccurate before this migration, since `label.tsx` never
  imported `cva`; left untouched as an unrelated pre-existing metadata quirk,
  out of scope here). Leftover scan:
  `grep -n "radix-ui\|@radix-ui\|IconPlaceholder" src/components/ui/label.tsx`
  — no matches.
- `public/registry/care-ui/label/label.json`, `public/registry/care-ui/index.json`
  — pending regeneration (batched at the end of this multi-component run).

No consumer changes needed: every usage in this repo only passes
`className`, `htmlFor`, and `children`, all of which are still valid on a
plain `<label>` via `React.ComponentProps<"label">`.

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- Radix's `Label.Root` added JS-based double-click text-selection
  prevention and click-to-focus-associated-control behavior on top of the
  native element. A plain `<label>` still focuses/activates its associated
  control natively via `htmlFor`/wrapping (the primary behavior), but loses
  Radix's extra double-click text-selection guard. Flagging since it's a
  subtle interaction delta, not expected to be user-visible in normal use.

## Verify by hand

1. Any form field with a `<Label htmlFor="...">`: click the label text and
   confirm focus moves to the associated input/checkbox/radio/switch.
2. Double-click a label's text; confirm no unexpected text-selection
   flashes (minor, likely a non-issue in modern browsers regardless).
