# collapsible

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry JSON by URL, plus the official base-vega example file). Verdict: migrated cleanly, with real consumer-side data-attribute renames that required reading the actual installed Base UI source to get right — the fetched official example turned out to still reference the old selector in one spot, which does not match the verified runtime behavior.

## Changed

- [src/components/ui/collapsible.tsx](../src/components/ui/collapsible.tsx):
  - Import: `radix-ui` → `@base-ui/react/collapsible`.
  - Part rename: `CollapsiblePrimitive.CollapsibleTrigger` → `.Trigger`, `CollapsiblePrimitive.CollapsibleContent` → `.Panel` (Radix namespaces these sub-parts with a `Collapsible` prefix; Base UI uses plain `Trigger`/`Panel`).
  - Added a local `resolveAsChild` compat shim (matching the established per-file pattern in `alert-dialog.tsx`/`drawer.tsx`/`tooltip.tsx`/`button.tsx`) to **both** `Collapsible` (Root) and `CollapsibleTrigger` — this project has real consumers using `asChild` on the Root itself (`<Collapsible asChild defaultOpen={...}><SidebarMenuItem>`, in `nav-main.tsx` and `sidebar.tsx`), not just the Trigger, so both parts needed the shim. Confirmed no shared-lib extraction here either, per the portability constraint already documented in repo memory.
  - `@dependencies` JSDoc tag: `radix-ui` → `@base-ui/react`.
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/collapsible.tsx` → clean, zero matches.

- **Consumer data-attribute fixes** — this is the part that needed real verification, not a mechanical rename. Read the actual installed `@base-ui/react@1.6.0` Collapsible source (`CollapsibleRoot.mjs`, `CollapsibleTrigger.mjs`, `collapsibleOpenStateMapping.mjs`) to confirm the true attribute names, since the reference doc I'd been using and even the *official shadcn base-vega example* turned out to disagree with each other on this exact point:
  - **`CollapsibleRoot`** emits `data-open` / `data-closed` on **its own rendered element** (confirmed via `stateAttributesMapping: collapsibleStateAttributesMapping` passed to `useRenderElement` inside `CollapsibleRoot.mjs`).
  - **`CollapsibleTrigger`** emits **only** `data-panel-open` (presence, when open; nothing when closed) on its own rendered element — confirmed via `CollapsibleTriggerDataAttributes.panelOpen = "data-panel-open"` and `triggerOpenStateMapping` in the actual source.
  - Fixed 3 real consumer call sites accordingly:
    - [src/components/nav-main.tsx:49](../src/components/nav-main.tsx): `<SidebarMenuAction className="data-[state=open]:rotate-90">` (direct `asChild` target of `CollapsibleTrigger`) → `data-panel-open:rotate-90`.
    - [src/lib/registry/collapsible.tsx](../src/lib/registry/collapsible.tsx) (6 occurrences: 2 `React.createElement` preview + `code:` string pairs for the "Basic" and "File Tree" demos): `data-[state=open]:bg-muted` on the Collapsible **Root** itself → `data-open:bg-muted`; `group-data-[state=open]:rotate-180`/`:rotate-90` on chevrons nested inside a `Button` that is the `CollapsibleTrigger`'s `asChild` target → `group-data-panel-open:rotate-180`/`:rotate-90`.
    - [src/lib/registry/sidebar.tsx:1622](../src/lib/registry/sidebar.tsx): `group-data-[state=open]/collapsible:rotate-90` — the named group `group/collapsible` is declared on the **Collapsible Root** (`className="group/collapsible"` on `<Collapsible asChild ...>`, which merges onto `SidebarMenuItem`), so this uses the Root's attribute → `group-data-open/collapsible:rotate-90` (NOT `data-panel-open`, since this group refers to the Root, not the Trigger).

## Left alone

- **The official shadcn `base-vega` collapsible example** (`https://ui.shadcn.com/code/apps/v4/registry/bases/base/examples/collapsible-example.tsx`) still literally uses `group-data-[state=open]:rotate-90` for its file-tree chevron. This appears to be an **upstream documentation bug** — it does not match the verified runtime behavior of the installed `CollapsibleTrigger` (which only ever emits `data-panel-open`, never `data-state`). I trusted the actual `.mjs` source over the example per the skill's "never guess, check the `.d.ts`/source" rule, and used `data-panel-open` throughout this project instead of copying the example's stale selector.
- [src/components/ui/sidebar.tsx](../src/components/ui/sidebar.tsx)'s own `group-data-[collapsible=icon]:*` classes: unrelated naming coincidence — this is the **Sidebar's own** `collapsible?: "offcanvas" | "icon" | "none"` string prop and `data-collapsible` attribute, nothing to do with the `Collapsible` component from `collapsible.tsx`. Correctly left untouched.
- **Discovered but out-of-scope pre-existing gap, flagged for separate follow-up**: [src/lib/registry/sidebar.tsx](../src/lib/registry/sidebar.tsx) lines 221, 1538, 1731 use `data-[state=open]:bg-sidebar-accent` / `data-[state=open]:text-sidebar-accent-foreground` on `SidebarMenuButton`, which is the `asChild` target of a **`DropdownMenuTrigger`** — not `Collapsible` at all. Since `dropdown-menu.tsx` was already migrated to Base UI in an earlier session (per the menus mapping conventions, its Trigger's open-state attribute is `data-popup-open`, not `data-state=open`), these 3 selectors look like they were missed during that earlier migration and are likely dead CSS right now. **Not fixed here** — out of scope for `collapsible`, and `dropdown-menu.tsx`'s own migration report should be the place to track/fix this, not this one. Flagging prominently since it's a real, currently-broken visual behavior (the "menu open" highlight on the sidebar user card).

## Behavior changes

None functionally for `collapsible` itself — every consumer-facing rotation/highlight behavior is preserved exactly, just re-pointed at the correct (verified) Base UI attribute names. The only thing worth calling out is that this required source-level verification rather than trusting either the reference doc or the official example at face value.

## Verify by hand

1. Load the Collapsible docs page: "Basic" example — click to expand, confirm the trigger button's chevron rotates 180° and the `Collapsible` root itself gets a `bg-muted` highlight while open.
2. "File Tree" example — click through nested folders, confirm each chevron rotates 90° correctly per-row (each row's own `CollapsibleTrigger`, independent state).
3. In the app sidebar (`nav-main.tsx`), expand/collapse a nav item with sub-items — confirm the trailing chevron rotates and the `SidebarMenuAction`/`SidebarMenuButton` styling responds correctly.
4. In `sidebar.tsx`'s docs demo (`NavMain`-equivalent), confirm the same rotation behavior on the `group/collapsible`-scoped chevron.
5. Inspect DOM in devtools while expanded: confirm `data-open` is present on the Collapsible root's rendered element, and `data-panel-open` is present on the trigger's rendered element (not `data-state`).
6. Separately (not part of this migration, just worth a quick look since it was flagged above): check whether the sidebar user-card dropdown's `data-[state=open]:bg-sidebar-accent` highlight is currently working or dead — if dead, it needs a follow-up fix scoped to `dropdown-menu`, not `collapsible`.

## Notes for the user

- Derived remaining-Radix count: `grep -rl 'from "radix-ui"' src/components/ui`
  now returns **4 files**: `button-group` (`Slot`), `item` (`Slot`), `sidebar`
  (`Slot`), `studio-sidebar` (`Slot`). All four use only the plain
  `Slot`/`asChild` pattern already solved by `badge`/`button` — no
  Positioner-model or exotic anatomy work needed for any of them.
- **Flagging again for visibility**: the `sidebar.tsx` docs demo has 3 likely-dead
  `data-[state=open]` selectors tied to an already-migrated `dropdown-menu.tsx`
  (see "Left alone" above) — worth a quick follow-up pass, separate from this
  component.
