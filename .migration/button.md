# button

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry JSON by URL). Verdict: migrated to the REAL `@base-ui/react/button` primitive per the skill's explicit hard rule, extended with a backward-compatible `asChild` shim (matching this repo's established `drawer.tsx`/`alert-dialog.tsx` precedent) since dozens of real consumers across the app and docs depend on `asChild` — full project typecheck stayed clean with zero consumer edits required.

## Changed

- [src/components/ui/button.tsx](../src/components/ui/button.tsx):
  - Import: `import { Slot } from "radix-ui"` → `import { Button as ButtonPrimitive } from "@base-ui/react/button"`. Per the skill's hard rule ("`button.tsx` migrates to the REAL `@base-ui/react/button` primitive, never a hand-rolled `useRender` wrapper"), this renders through Base UI's actual `Button` component (confirmed via `node_modules/@base-ui/react/button/Button.d.ts`), not a raw `useRender`/`mergeProps` call like `badge.tsx` used (Badge has no dedicated Base UI primitive to reuse; Button does).
  - `asChild` (boolean) → kept as a **compatibility prop**, translated internally to Base UI's `render` via the same `resolveAsChild` helper pattern already established in `drawer.tsx`/`alert-dialog.tsx`. This was a deliberate deviation from the byte-identical golden pair (which only supports `render`, matching upstream's fully-updated example set) because **101 matches across 28 files** in this repo pass `asChild` directly to `Button` or to a `Trigger` wrapping a `<Button>` child — hand-migrating every call site was out of scope for a single-component "migrate button" request, and this repo already has a precedent for solving this exact problem with a shim rather than a mass rename.
  - **`nativeButton` auto-inference (new, not in the golden pair):** Base UI's real `Button` primitive performs a **dev-mode consistency check** (`node_modules/@base-ui/react/internals/use-button/useButton.mjs`) that logs a console error if `nativeButton` (default `true`) doesn't match whether the actually-rendered element is a `<button>`. Verified real consumers in this repo use `asChild` to wrap plain `<a>` tags (`brands-page.tsx`, `error-pages/invalid-browser.tsx`, `src/lib/registry/empty.tsx`) — without any adjustment, these would all start logging a dev-mode warning after migration. Added an `isNonButtonTag` heuristic to `resolveAsChild`: when the resolved child is a plain string DOM tag other than `"button"` (e.g. `<a>`, `<div>`), `nativeButton` is automatically set to `false`; otherwise (native `<button>`, or a component like `DropdownMenuTrigger` which itself renders a real `<button>`, as used in `src/lib/registry/data-table.tsx`), it defaults to `true` — matching the previous, correct DOM output in every case. Consumers can still pass an explicit `nativeButton` prop to override the heuristic.
  - `data-slot="button"`, `data-variant={variant}`, `data-size={size}`: **kept as explicit JSX attributes** (passed straight through via `...props` on the real `ButtonPrimitive`, same mechanism as before — not a Base UI `state`-to-`data-*` conversion, since the real `Button` primitive doesn't expose one to wrapper consumers the way a raw `useRender` call does). This is a deliberate deviation from the golden `base-vega` `button.tsx`, which drops `data-variant`/`data-size` entirely. Verified via repo-wide search that no CSS selector currently depends on these two attributes, but preserved them anyway since they're a documented part of this component's existing public contract and dropping them would be an unflagged, silent API removal for any downstream consumer of the published registry package.
  - `@dependencies` JSDoc tag: `radix-ui class-variance-authority` → `@base-ui/react class-variance-authority`.
  - `buttonVariants` CVA definition (all variant/size classes) is byte-for-byte unchanged — entirely custom to this project (the shadcn golden's variant set is completely different: `default`/`outline`/`secondary`/`ghost`/`destructive`/`link` vs. this project's `default`/`secondary`/`tertiary`/`outline`/`ghost`/`link`/`destructive`/`destructive-solid`).
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/button.tsx` → clean, zero matches.
- [public/registry/care-ui/button/button.json](../public/registry/care-ui/button/button.json), [public/registry/care-ui/index.json](../public/registry/care-ui/index.json): regenerated via `pnpm run build:registry` (dependency list now correctly reflects `@base-ui/react`).

## Left alone

- **Full project typecheck (`tsc -b`) passed clean with zero consumer edits** — no file outside `button.tsx` was touched. This was verified deliberately given Button's huge blast radius (28 files use `asChild` alone, plus many more using plain props).
- [src/lib/registry/button.tsx](../src/lib/registry/button.tsx): no changes needed. The "As Child" example (`<Button asChild><a href="#">Login</a></Button>`) continues to work unchanged and no longer produces a dev console warning thanks to the `nativeButton` heuristic above.
- [src/components/careui/button.tsx](../src/components/careui/button.tsx) and [src/components/careui/menubar.tsx](../src/components/careui/menubar.tsx): a separate, apparently **orphaned/unused duplicate** of the button component (still on `radix-ui`'s `Slot`). Verified via repo-wide search that nothing imports from `@/components/careui/button` or `./careui/button` anywhere — it isn't wired into `ds-index.ts`, the registry generator, or any app code. Left untouched as unrelated drift/dead code, out of scope for this migration (not the registry component this task targets). Flagging its existence in case it should be deleted or is meant for something not yet connected.
- `button-group.tsx`, `breadcrumb.tsx`, `item.tsx`, `sidebar.tsx`, `studio-sidebar.tsx` still use the Radix `Slot`/`asChild` pattern independently for their own polymorphic parts — untouched, each is its own future migration; none of them are imported by `button.tsx` itself.
- Many consumers compose `<XTrigger asChild><Button>...</Button></XTrigger>` (Button as the child of another component's Radix `asChild`, e.g. `DialogTrigger`, `DropdownMenuTrigger`, `TooltipTrigger`, `HoverCardTrigger`) — this is the OTHER component's `asChild` mechanism, not Button's own, and is unaffected by this migration; those wrapper components (`dialog.tsx`, `dropdown-menu.tsx`, `tooltip.tsx`, `hover-card.tsx`) remain on Radix pending their own migrations.

## Behavior changes

- **`data-solid`-style attribute-value note does not apply here** (unlike `badge`) since `data-variant`/`data-size` were kept as literal string attributes exactly as before — no change in the rendered output for these.
- **New (and desirable) dev-mode safety net**: Base UI's real `Button` primitive will log a console error in development if a consumer explicitly passes `nativeButton={true}` (or omits it) while rendering a non-button element via `render`/`asChild` (e.g. a `<div>`), or `nativeButton={false}` while genuinely rendering a `<button>`. This is new behavior that didn't exist under Radix's `Slot`. The automatic heuristic covers the common `<a>` case transparently; if you introduce a NEW `asChild`/`render` usage with something other than a plain DOM tag string or a component that itself renders a `<button>`, double-check whether `nativeButton` needs to be set explicitly.
- `focusableWhenDisabled` (new Base UI-only prop, default `false`) is now available on `Button` via the real primitive but wasn't exposed/used before — not surfaced in this project's public API docs; available to any consumer who imports it directly via the type, but not documented. Flagging as a new capability, not a behavior change per se (default `false` matches the old, simpler disabled-button behavior where a real `disabled` attribute made it fully non-focusable).

## Verify by hand

1. Load the Button docs page and confirm every variant/size renders identically, focus rings and `active:` press states still work (`[:active,[data-pressed]]:` styling depends on Base UI applying `data-pressed` correctly — spot-check a press-and-hold interaction).
2. Confirm the "As Child" example (link styled as a button) renders and navigates correctly, and check the browser devtools console for the absence of the Base UI `nativeButton` mismatch warning.
3. Click through a few real `asChild` usages in the app: `brands-page.tsx` (download link buttons), `error-pages/invalid-browser.tsx` (Download Chrome link), `src/lib/registry/empty.tsx` ("Learn More" link) — confirm no console warnings and correct link behavior (href navigation, `download` attribute still works).
4. Check `data-table.tsx`'s `CrudActionsCell` (`<Button asChild><DropdownMenuTrigger>...</DropdownMenuTrigger></Button>`) — confirm the dropdown still opens correctly on click and the button still looks correct (icon size, ghost variant).
5. Tab through a page with multiple buttons and confirm keyboard focus order, `focus-visible` outline styling, and Enter/Space activation all work identically to before.
6. Confirm disabled buttons (`disabled` attribute) still show `opacity-50` and block pointer/keyboard interaction.

## Notes for the user

- Derived remaining-Radix count: `grep -rl 'from "radix-ui"' src/components/ui`
  now returns **27 files**: `breadcrumb` (`Slot`), `button-group` (`Slot`),
  `checkbox`, `collapsible`, `context-menu`, `dialog`, `dropdown-menu`,
  `hover-card`, `item` (`Slot`), `label`, `menubar`, `navigation-menu`,
  `popover`, `progress`, `radio-group`, `scroll-area`, `select`,
  `separator`, `sheet`, `sidebar` (`Slot`), `slider`, `studio-sidebar`
  (`Slot`), `switch`, `tabs`, `toggle-group`, `toggle`, `tooltip`.
  `accordion`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `button`,
  `combobox`, `drawer`, and `tv-display` are now off Radix (`alert` never
  needed migration). Note: `src/components/careui/button.tsx` and
  `menubar.tsx` also still import `radix-ui`, but per "Left alone" above are
  unused/orphaned files outside the registry, not counted as part of the
  active component set.
