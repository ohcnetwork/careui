# sidebar

2026-07-16, transformation engine (no golden pair fetched — `sidebar.tsx` is a large, fully custom composition with no Radix-primitive equivalent to diff against; only its generic `Slot`/`asChild` polymorphism needed migrating, using the same `useRender`-based pattern already established and verified in `badge.tsx`/`button.tsx`/`item.tsx`). Verdict: migrated cleanly, with one important design decision — `data-active`/`data-size`/`data-slot`/`data-sidebar` are kept as **literal attributes**, not Base UI's `state` mechanism, because a real consumer CSS selector depends on the exact string value `data-[active=true]`, which `state`-based conversion would have silently broken.

## Changed

- [src/components/ui/sidebar.tsx](../src/components/ui/sidebar.tsx):
  - Import: `import { Slot } from "radix-ui"` → `import { useRender } from "@base-ui/react/use-render"` (no `mergeProps`; see below).
  - Added a local `resolveAsChild` compat shim (same pattern as `alert-dialog.tsx`/`drawer.tsx`/`tooltip.tsx`/`button.tsx`/`collapsible.tsx`).
  - **5 `Slot`-based parts migrated to `useRender`**:
    - `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarMenuAction`: zero real `asChild` usage found anywhere in the repo → converted to clean `render`-only API (no compat shim), matching the policy already applied to `ButtonGroupText`/`badge.tsx`.
    - `SidebarMenuButton`, `SidebarMenuSubButton`: **real usage exists** (`nav-main.tsx`, `nav-projects.tsx`, `nav-secondary.tsx`, `src/lib/registry/sidebar.tsx` — 6 call sites total wrapping `<a href="...">`) → kept the `resolveAsChild` compat shim so `asChild` keeps working.
  - **Design decision — avoided `useRender`'s `state` mechanism for `data-*` attributes on all 5 parts, unlike `badge`/`item`**: initially attempted `state: { ... }` (matching the pattern used for `badge`/`item`), but discovered this would produce `data-active=""` instead of the current `data-active="true"`/`"false"` (React's literal-boolean-to-string stringification for custom `data-*` JSX attributes) for `SidebarMenuButton`/`SidebarMenuSubButton`. Verified this is **not** a safe, no-op change here (unlike `badge`'s equivalent `data-solid` case): `src/lib/registry/sidebar.tsx` (lines ~111, 738) and `src/lib/registry/sidebar-inner-page-01-demo.tsx` (line ~111) use `data-[active=true]:font-medium` — an exact string-value selector — alongside the bare `data-active:` presence variant on the very same elements. Switching to `state`-based conversion would have silently broken the `data-[active=true]:` selectors while leaving `data-active:` working, a partial regression. Kept `data-slot`/`data-sidebar`/`data-size`/`data-active` as literal object keys passed directly in the `props` field to `useRender` (not via a `state` param), exactly preserving prior attribute values.
  - **Follow-on typing fix**: initially tried `mergeProps<"div"|"button"|"a">({...}, props)` to combine the literal attributes with `props`, but TypeScript rejected `data-*` keys in `mergeProps`'s strictly-typed generic parameter (`Object literal may only specify known properties`). Since `props` (the rest spread) never actually contains `className`/`data-*`/`children` keys (all destructured out already), there was no real merge conflict to resolve — replaced `mergeProps(...)` with a plain object spread (`{ "data-slot": ..., className: cn(...), ...props }`, `props` last to preserve the original JSX ordering where `{...props}` came after the explicit attributes and could still override them). Dropped the now-unused `mergeProps` import entirely from this file.
  - `@dependencies` JSDoc tag: `radix-ui` → `@base-ui/react`.
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/sidebar.tsx` → clean, zero matches.
- [public/registry/care-ui/sidebar/sidebar.json](../public/registry/care-ui/sidebar/sidebar.json), [public/registry/care-ui/index.json](../public/registry/care-ui/index.json): regenerated via `pnpm run build:registry`.

## Left alone

- [src/lib/registry/sidebar.tsx](../src/lib/registry/sidebar.tsx): no source changes needed for this migration specifically (the `data-[active=true]`/`data-active` selectors there are precisely why the literal-attribute approach was chosen, not a gap to fix).
- All other plain-div/ul/li/main sidebar parts (`Sidebar`, `SidebarProvider`, `SidebarTrigger`, `SidebarRail`, `SidebarInset`, `SidebarInput`, `SidebarHeader`, `SidebarFooter`, `SidebarSeparator`, `SidebarContent`, `SidebarGroup`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuBadge`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubItem`): never used `Slot`, untouched.
- `<TooltipTrigger asChild>{button}</TooltipTrigger>` inside `SidebarMenuButton`: `tooltip.tsx` already has its own `asChild` compat shim from its own prior migration — no change needed here, this line was already compatible.

## Behavior changes

None. This was a deliberately conservative migration: every `data-*` attribute value is byte-identical to before (literal attributes, not state-derived), and `asChild` continues to work identically for the 2 parts that need it.

## Verify by hand

1. In the app's main sidebar (uses `nav-main.tsx`/`nav-projects.tsx`/`nav-secondary.tsx`), confirm nav links still render, navigate correctly, and show the active-item highlight styling (background, ring, left accent bar) when `isActive` is true.
2. Collapse/expand the sidebar (icon mode) and confirm tooltips still appear on hover for menu buttons when collapsed.
3. In `src/lib/registry/sidebar.tsx`'s demo page, confirm the active nav item example (`data-[active=true]:font-medium` + `data-active:bg-strong-background` combo) still shows both the font-weight change AND the background highlight simultaneously — this is the exact case that would have broken with the `state`-based approach.
4. Confirm `SidebarGroupAction`/`SidebarMenuAction` icon buttons (e.g. an add/more-options button in a group header) still render and respond to clicks correctly.
5. Inspect DOM: confirm `data-active="true"` (not `data-active=""`) appears on an active menu button/sub-button.

## Notes for the user

- Derived remaining-Radix count: **0 files** in `src/components/ui` import from `radix-ui` — see [button-group.md](button-group.md) for the full note on this being the final batch and the pending `components.json` style flip / `radix-ui` dependency removal decision.
