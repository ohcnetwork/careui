# progress

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: PRISTINE wrapper, restructured
into new sub-parts; fully backward compatible for existing consumers.

## Changed

- `src/components/ui/progress.tsx` — classified PRISTINE: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/progress.json`, identical
  besides class ordering. Per `universal-patterns.md`'s coverage matrix
  ("Progress -> Progress | restructured (new Track/Label/Value parts, no
  manual transform)"), replaced wholesale with the fetched
  `https://ui.shadcn.com/r/styles/base-vega/progress.json` content:
  - New sub-components exported alongside `Progress`: `ProgressTrack`,
    `ProgressLabel`, `ProgressValue` (all confirmed present in
    `node_modules/@base-ui/react/progress/{track,label,value}`).
    `ProgressIndicator` is also now separately exported (was inlined in the
    old `Progress` body).
  - `Progress` itself keeps the same simple call shape for existing
    consumers: it still accepts `value`/`className`/`...props` and
    internally renders `{children}` followed by
    `<ProgressTrack><ProgressIndicator /></ProgressTrack>` — so
    `<Progress value={50} className="..." />` with no children behaves
    identically to before. `children` is a genuinely new, optional
    capability (for composing `ProgressLabel`/`ProgressValue`), not a
    breaking requirement.
  - The manual `style={{ transform: `translateX(-${100 - (value || 0)}%)`
    }}` calculation on the old `Indicator` is GONE — Base UI's
    `Progress.Indicator` computes its own width internally from
    `value`/`min`/`max` via the `Root` context, no manual transform math
    needed (matches the coverage-matrix note verbatim).
  - Types: `React.ComponentProps<typeof ProgressPrimitive.Root>` →
    `ProgressPrimitive.Root.Props` (and the equivalent `.Props` type per
    new part). Removed the now-unused `import * as React from "react"`.
    `@dependencies` JSDoc updated `radix-ui` → `@base-ui/react`. Leftover
    scan: `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
    src/components/ui/progress.tsx` — no matches.
- `public/registry/care-ui/progress/progress.json`,
  `public/registry/care-ui/index.json` — pending regeneration (batched at
  the end of this multi-component run).

No consumer changes needed: both `src/components/playground.tsx` and
`src/lib/registry/progress.tsx` only call `<Progress value={...}
className="..." />` with no children — covered by the backward-compatible
default rendering described above.

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- None expected for existing usage — the visual output (a filled bar at
  `value`%) is unchanged, just computed internally by Base UI instead of a
  manual inline `transform`.
- New capability, not a behavior change: `ProgressLabel`/`ProgressValue`
  are available for consumers who want to compose a labeled progress bar
  (e.g. `<Progress value={50}><ProgressLabel>Uploading</ProgressLabel>
  <ProgressValue /></Progress>`), not used anywhere in this repo yet.

## Verify by hand

1. Docs page: Progress → confirm the animated example (13% → 66% after
   500ms) still fills smoothly.
2. Docs page: Progress → "Controlled" example (paired with the Slider) —
   drag the slider, confirm the progress bar width tracks it live with no
   jump or lag.
3. `src/components/playground.tsx` → confirm the static progress bar
   renders at the correct fill percentage.
