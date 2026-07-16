# slider

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: PRISTINE wrapper, structural swap
(new required `Control` part, `Range` → `Indicator` rename); 4 consumers
needed a widened-type fix for `onValueChange`.

## Changed

- `src/components/ui/slider.tsx` — classified PRISTINE: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/slider.json`, identical besides
  class ordering. Per `form-controls.md`'s slider section ("Part mapping:
  `Root -> Root`, `Track -> Track`, `Range -> Indicator` (renamed), `Thumb ->
  Thumb`, plus a NEW required `Control` part: Base UI anatomy is `Root >
  Control > Track > (Indicator, Thumb)`"), replaced wholesale with the
  fetched `https://ui.shadcn.com/r/styles/base-vega/slider.json` content:
  added the `Control` wrapper (moved the `"relative flex w-full touch-none
  ..."` positioning classes from `Root` onto it, `Root` keeps only
  `"data-horizontal:w-full data-vertical:h-full"`), renamed
  `SliderPrimitive.Range` → `SliderPrimitive.Indicator` (kept
  `data-slot="slider-range"` unchanged, matching the golden — the DOM hook
  name is preserved even though the part renamed), dropped `absolute` from
  the Indicator's class list (Base UI's `SliderIndicator` already sets
  `position: absolute` / `relative` itself via inline style depending on
  orientation — confirmed in
  `node_modules/@base-ui/react/slider/indicator/SliderIndicator.js:22,41`
  — so the Tailwind class was redundant, not a customization to preserve).
  Added `thumbAlignment="edge"` on `Root` (Base UI-only prop with no Radix
  equivalent; the golden sets it explicitly to reproduce Radix's original
  thumb-edge alignment behavior — kept as shipped, not a deviation). Dropped
  the `React.useMemo` around `_values` (the golden computes it plainly per
  render; matches upstream's own simplification, not something this project
  customized). Types: `React.ComponentProps<typeof SliderPrimitive.Root>` →
  `SliderPrimitive.Root.Props`. Removed the now-unused
  `import * as React from "react"`. `@dependencies` JSDoc updated
  `radix-ui` → `@base-ui/react`. Leftover scan:
  `grep -n "radix-ui\|@radix-ui\|IconPlaceholder" src/components/ui/slider.tsx`
  — no matches.
- Four consumers needed a real fix, not just a rename: Base UI widens
  `value`/`defaultValue`/`onValueChange` to `number | number[]` (a bare
  `number` now means a single-thumb slider with no array wrapper needed —
  per `form-controls.md`'s slider table). Every consumer here still passes
  `value`/`defaultValue` as an array (so at runtime the callback always
  receives an array back), but the wrapper's exported type is the general
  union, so `Dispatch<SetStateAction<number[]>>`-typed setters no longer
  satisfied `onValueChange` directly. Fixed by wrapping each handler with
  `(v) => setX(Array.isArray(v) ? v : [v])`:
  - `src/components/playground.tsx:202` (`onValueChange` also derived
    `setProgress(v[0])` from the same callback — updated to read off the
    coerced array).
  - `src/lib/registry/filters.tsx:503` (`(v: number[]) => setRange(v)` →
    coerced).
  - `src/lib/registry/progress.tsx:24` (`onValueChange: setValue` → coerced).
  - `src/lib/registry/slider.tsx:156` and `:186` (both the display `code:`
    template string and the executable `React.createElement` preview for
    the "Controlled" range-slider example — kept both in sync).
- `public/registry/care-ui/slider/slider.json`, `public/registry/care-ui/index.json`
  — pending regeneration (batched at the end of this multi-component run).

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- `onValueCommit` → `onValueCommitted` (renamed) — not used anywhere in this
  repo, grepped clean.
- `inverted` prop dropped entirely, no direct replacement for vertical
  sliders — not used anywhere in this repo, grepped clean.
- `onValueChange` gains a second `eventDetails` argument — unused by any of
  the four fixed consumers above (all still take a single `v` param).

## Verify by hand

1. Docs page: Slider → confirm the basic, disabled, vertical, and range
   ("Controlled", two thumbs `[0.3, 0.7]`) examples all drag correctly and
   show live values.
2. `src/components/playground.tsx` → drag the single-thumb slider, confirm
   both the slider position and the linked `Progress` bar/percentage text
   update together.
3. Any Popover-based range filter in `lib/registry/filters.tsx` → open it,
   drag both thumbs, confirm the range updates correctly.
4. `lib/registry/progress.tsx`'s "Controlled" example → drag the slider,
   confirm the paired `Progress` bar tracks it live.
