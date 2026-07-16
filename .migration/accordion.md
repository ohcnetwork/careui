# accordion

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry JSON by URL, adapted for project conventions — progressive mode, no CLI `--overwrite`). Verdict: migrated cleanly, PRISTINE wrapper (no functional customizations beyond project boilerplate), one behavior-neutral consumer-doc update required for the `type`/`collapsible`/`defaultValue` API change.

## Changed

- [src/components/ui/accordion.tsx](../src/components/ui/accordion.tsx): Rewired from `radix-ui` to `@base-ui/react/accordion`.
  - Import: `import { Accordion as AccordionPrimitive } from "radix-ui"` → `import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"` (removed the now-unused `import * as React from "react"`, since no other API in this file needs the namespace import).
  - Types: `React.ComponentProps<typeof AccordionPrimitive.X>` → `AccordionPrimitive.X.Props` for `Root`, `Item`, `Trigger`.
  - Part rename: `AccordionPrimitive.Content` → `AccordionPrimitive.Panel` (`AccordionContent` implementation only; the exported component name `AccordionContent` is unchanged for consumers).
  - Disabled-state class hook: `disabled:pointer-events-none disabled:opacity-50` → `aria-disabled:pointer-events-none aria-disabled:opacity-50` on the trigger (Base UI accordion trigger surfaces disabled state via `aria-disabled`, not the native `disabled` attribute — per `class-mapping.md` "Disabled-state hooks").
  - CSS var rename: `--radix-accordion-content-height` → `--accordion-panel-height`.
  - Added Base UI-only animation hooks `data-ending-style:h-0 data-starting-style:h-0` on the content wrapper div (these are inert/no-op unless a transition is added; kept to match the vetted base-vega registry output and to leave presence hooks available for future animation work). No pre-existing `animate-accordion-down`/`animate-accordion-up` keyframes were found anywhere in the codebase (see "Left alone" — pre-existing gap, not touched).
  - `data-slot`, class names, structure (`Header > Trigger`, chevron icon swap via `group-aria-expanded/accordion-trigger:*`) all preserved unchanged.
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/accordion.tsx` → clean, zero matches.

- [src/lib/registry/accordion.tsx](../src/lib/registry/accordion.tsx): Updated every demo/example call site (both the display `code:` template strings and the executable `React.createElement`/JSX preview trees) for the Base UI Root API change:
  - `type="single" collapsible defaultValue="x"` → `defaultValue={["x"]}` (Base UI single mode has no `type`/`collapsible` props — single mode is the default, `multiple` defaults to `false`, and single mode is always collapsible; `value`/`defaultValue` are always arrays even in single mode, per `disclosure.md`).
  - `type="multiple" ... defaultValue={[...]}` → `multiple ... defaultValue={[...]}` (defaultValue was already an array here, only `type="multiple"` → `multiple` boolean changed).
  - `type="single" collapsible` (no defaultValue, the "Disabled" example) → props dropped entirely.
  - Updated the "Multiple" example's prose description from `Use type="multiple" to ...` to `` Use the `multiple` prop to ... ``.
  - This was necessary, not optional: Base UI's `AccordionRoot.Props["defaultValue"]` is typed as `Value[] | undefined`, so the old string-literal `defaultValue="item-1"` would no longer type-check, and passing `type`/`collapsible` are unknown props that stop achieving their old effect (single mode was already the default so behavior is preserved by omission).
  - Leftover scan: `grep -n "radix-ui\|@radix-ui\|type=\"single\"\|type=\"multiple\"\|collapsible" src/lib/registry/accordion.tsx` → clean, zero matches.

- [public/registry/care-ui/accordion/accordion.json](../public/registry/care-ui/accordion/accordion.json) and [public/registry/care-ui/index.json](../public/registry/care-ui/index.json): regenerated via `pnpm run build:registry` from the updated source (dependency now lists `@base-ui/react` instead of `radix-ui`, sourced automatically from the `@dependencies` JSDoc tag via `scripts/generate-registry.ts`'s existing `CONFIG.dependencyMap` — no script changes needed since `@base-ui/react` was already mapped from the drawer/combobox migrations).

## Left alone

- `animate-accordion-down` / `animate-accordion-up` utility classes on `AccordionContent`: no `@keyframes` definitions for these exist anywhere in `src/index.css` or `tw-animate-css` — this was already true before the migration (verified against the pre-migration file). Pre-existing gap, unrelated to Base UI vs Radix; left exactly as it was to avoid scope creep. Flagging here since it means the open/close animation is currently a no-op in both the old and new implementation.
- No other files in the project import from `@/components/ui/accordion` besides the docs registry entry (`src/lib/registry/accordion.tsx`) and its registration in `src/lib/registry/index.ts`/`src/ds-index.ts` (barrel re-exports only, no prop usage to update there).
- `components.json` `style: "radix-vega"` left untouched (progressive mode — flip happens once, after the last radix wrapper is migrated; other project wrappers, e.g. dialog/select/tooltip/menus, remain on `radix-ui` and are out of scope for this run).
- `radix-ui` dependency in `package.json` left installed (still used by other, not-yet-migrated wrappers).

## Behavior changes

- Single-mode "always collapsible" semantics are unchanged in effect (Radix's `collapsible` prop, which the project always passed as `true`, matches Base UI single mode's built-in always-collapsible behavior), but this is now implicit rather than an explicit prop — flagging for awareness, not because it needs a fix.
- Disabled item trigger is no longer a real disabled `<button>` (native `disabled` attribute); it now uses `aria-disabled` styling only. Functionally the trigger should still be inert to activation (Base UI handles interaction blocking internally), but assistive tech and `:disabled`-based CSS/tests targeting the previous native attribute will need to target `aria-disabled`/`data-disabled` instead. Verify by hand below.

## Verify by hand

1. Load the Accordion docs page (`/docs/accordion` or wherever `componentDoc` renders) and confirm all five examples (Basic, Multiple, Disabled, Borders, Card) render with the expected item(s) open by default.
2. Click a trigger to expand/collapse; confirm single-mode examples only ever have one item open, and the Multiple example allows several open simultaneously.
3. In the Disabled example, confirm the disabled item's trigger cannot be activated by mouse click or Enter/Space when focused, and that focus-visible ring styling still shows correctly on enabled triggers via keyboard Tab navigation.
4. Confirm the chevron icon swaps (down ↔ up) correctly as each trigger's `aria-expanded` state toggles — inspect the DOM to confirm `aria-expanded` is present on the trigger button.
5. Resize/verify no layout jump: since there's no keyframe animation currently wired (pre-existing gap), panels should show/hide instantly with no animation in both the pre- and post-migration builds — confirm this hasn't regressed to something worse (e.g., visible content flash).

## Notes for the user

- Git tree was not clean at the start of this run (uncommitted `alert-dialog` migration + new untracked skill files already present). Per the skill's preflight, this migration was still carried out on the current branch (`main`) without creating a new branch or committing, since branching/committing repo history wasn't explicitly requested. Let me know if you'd like this accordion migration (and/or the prior alert-dialog one) committed, and whether as one commit or separate commits per component.
- Derived remaining-Radix count: `grep -rl 'from "radix-ui"' src/components/ui` after this run returns **32 files** still importing from `radix-ui`: `aspect-ratio`, `avatar`, `badge` (`Slot`), `breadcrumb` (`Slot`), `button-group` (`Slot`), `button` (`Slot`), `checkbox`, `collapsible`, `context-menu`, `dialog`, `dropdown-menu`, `hover-card`, `item` (`Slot`), `label`, `menubar`, `navigation-menu`, `popover`, `progress`, `radio-group`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar` (`Slot`), `slider`, `studio-sidebar` (`Slot`), `switch`, `tabs`, `toggle-group`, `toggle`, `tooltip`, `tv-display`. `accordion`, `alert-dialog`, `combobox`, and `drawer` are now on `@base-ui/react`.
