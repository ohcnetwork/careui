# button-group

2026-07-16, golden pair via CLI (fetched `base-vega` registry JSON by URL for the `ButtonGroupText` part). Verdict: clean migration — only one part (`ButtonGroupText`) used `Slot`/`asChild`, and zero consumers anywhere in the repo pass `asChild` to it, so it now cleanly follows the golden's `render`-only API with no compatibility shim needed.

## Changed

- [src/components/ui/button-group.tsx](../src/components/ui/button-group.tsx):
  - Import: `import { Slot } from "radix-ui"` → `import { mergeProps } from "@base-ui/react/merge-props"; import { useRender } from "@base-ui/react/use-render"`.
  - `ButtonGroupText`: `const Comp = asChild ? Slot.Root : "div"` → `useRender({ defaultTagName: "div", render, props: mergeProps<"div">({...}, props), state: { slot: "button-group-text" } })`, matching the golden `base-vega` implementation exactly.
  - **Minor addition, not previously present**: `data-slot="button-group-text"` is now emitted (via `state.slot`), matching the golden and the convention already followed by every other part in this file (`ButtonGroup` has `data-slot="button-group"`, `ButtonGroupSeparator` has `data-slot="button-group-separator"`) — the original `ButtonGroupText` was missing this attribute, which looks like a pre-existing oversight rather than an intentional omission. Purely additive; does not change any existing behavior.
  - `@dependencies` JSDoc tag: `class-variance-authority` → `@base-ui/react class-variance-authority`.
  - `ButtonGroup` (Root, plain div) and `ButtonGroupSeparator` (wraps the already-migrated `Separator`) were untouched — neither ever used `Slot`.
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/button-group.tsx` → clean, zero matches.
- [public/registry/care-ui/button-group/button-group.json](../public/registry/care-ui/button-group/button-group.json), [public/registry/care-ui/index.json](../public/registry/care-ui/index.json): regenerated via `pnpm run build:registry`.

## Left alone

- [src/lib/registry/button-group.tsx](../src/lib/registry/button-group.tsx): no changes needed — no example passes `asChild` to `ButtonGroupText` (confirmed via repo-wide search: zero real usages of `ButtonGroupText` with `asChild` anywhere, only the plain component itself used without polymorphism).
- `ButtonGroup` and `ButtonGroupSeparator`: no Radix dependency to begin with, left untouched.

## Behavior changes

None, aside from the additive `data-slot` attribute noted above (purely new, non-breaking).

## Verify by hand

1. Load the Button Group docs page and confirm the `ButtonGroupText` examples (e.g. an inline label/icon inside a button group) still render with the correct `bg-muted` styling, border, and spacing.
2. Inspect the DOM to confirm `data-slot="button-group-text"` is now present (new, harmless).
3. Confirm keyboard focus behavior and rounding rules across grouped buttons (`ButtonGroup`'s own `orientation` variants) are unaffected — this part wasn't touched.

## Notes for the user

- Derived remaining-Radix count: **0 files** in `src/components/ui` import from `radix-ui` — this was the last batch (`button-group`, `item`, `sidebar`, `studio-sidebar` all migrated in this run; see their individual reports). The project can now flip `components.json`'s `style` from `radix-vega` to `base-vega` and remove the `radix-ui` package dependency, per the skill's progressive-mode end state — not done automatically as part of this report; flagging for an explicit decision given it's a project-wide, less easily reversible change.
