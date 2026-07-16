# studio-sidebar

2026-07-16, transformation engine (no golden pair — internal, non-published composition; same `useRender` pattern as `sidebar.tsx`, its structurally-identical sibling). Verdict: migrated cleanly and more simply than `sidebar.tsx` — zero `asChild` usage anywhere for any of its 5 `Slot`-based parts, so `asChild` was dropped entirely in favor of a clean `render`-only API.

## Changed

- [src/components/ui/studio-sidebar.tsx](../src/components/ui/studio-sidebar.tsx):
  - Import: `import { Slot } from "radix-ui"` → `import { useRender } from "@base-ui/react/use-render"`.
  - **5 `Slot`-based parts migrated to `useRender`, `render`-only (no `asChild` compat shim)**: `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarMenuButton`, `SidebarMenuAction`, `SidebarMenuSubButton`. Verified via repo-wide search that this component is used only by `src/App.tsx`, `src/components/app-sidebar.tsx`, and `src/components/search-form.tsx`, and none of them pass `asChild` to any of these 5 parts — unlike `sidebar.tsx`, no compatibility shim was needed at all.
  - Same `data-*`-as-literal-attribute design decision as `sidebar.tsx` (not via `useRender`'s `state` param): `data-slot`, `data-sidebar`, `data-size`, `data-active` are all passed as literal keys in the `props` object, exactly preserving their prior string values (e.g. `data-active="true"`/`"false"`, not an empty-string presence attribute). No `mergeProps` needed here either, for the same reason as `sidebar.tsx` (no actual conflicting keys between the literal attributes and the rest-spread `props`).
  - `@dependencies` JSDoc tag: `radix-ui` → `@base-ui/react`.
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/studio-sidebar.tsx` → clean, zero matches.
- [public/registry/care-ui/studio-sidebar/studio-sidebar.json](../public/registry/care-ui/studio-sidebar/studio-sidebar.json), [public/registry/care-ui/index.json](../public/registry/care-ui/index.json): regenerated via `pnpm run build:registry` — this component has no docs registry entry (`src/lib/registry/studio-sidebar.tsx` doesn't exist), but its `.tsx` source is still scanned and published by `scripts/generate-registry.ts`.

## Left alone

- This component has no docs/example file in `src/lib/registry/` — nothing to update there.
- `SidebarProvider` in this file does **not** wrap children in `TooltipProvider` (unlike `sidebar.tsx`'s equivalent) — this is a pre-existing difference between the two files, not something introduced or affected by this migration.
- All other plain-element parts (`Sidebar`, `SidebarTrigger`, `SidebarRail`, `SidebarInset`, `SidebarInput`, `SidebarHeader`, `SidebarFooter`, `SidebarSeparator`, `SidebarContent`, `SidebarGroup`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuBadge`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubItem`): never used `Slot`, untouched.

## Behavior changes

None — no consumer used `asChild` on any part, and all `data-*` attribute values are preserved exactly as literal props.

## Verify by hand

1. Load the app pages that use `AppSidebar`/`SearchForm` (via `src/App.tsx`) and confirm the studio sidebar renders, collapses/expands, and nav items still respond to clicks with correct active-state styling.
2. Confirm tooltips on collapsed menu buttons still appear on hover (this file does use `Tooltip`/`TooltipTrigger`/`TooltipContent`, just doesn't wrap the whole provider tree in `TooltipProvider` the way `sidebar.tsx` does).
3. Inspect DOM: confirm `data-active`, `data-size`, `data-slot`, `data-sidebar` attributes are all present with their expected literal string values.

## Notes for the user

- Derived remaining-Radix count: **0 files** in `src/components/ui` import from `radix-ui`. This completes the progressive migration — every active registry component (68 files) is now on `@base-ui/react`. Per the skill's end-of-progressive-migration step, the project can now:
  1. Flip `components.json`'s `"style"` from `"radix-vega"` to `"base-vega"`.
  2. Remove the `radix-ui` package from `package.json` dependencies.
  This was **not** done automatically as part of this report — it's a project-wide, less-easily-reversible change (affects what `npx shadcn add <component>` fetches going forward, and drops a dependency entirely), so it's flagged here for an explicit decision rather than bundled into this component's migration.
  Note: `src/components/careui/button.tsx` and `src/components/careui/menubar.tsx` (flagged back in the `button` migration report) remain on Radix — confirmed still orphaned/unused, not part of the active registry, so they don't block the `radix-ui` dependency removal decision above.
