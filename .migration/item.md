# item

2026-07-16, golden pair via CLI (fetched `base-vega` registry JSON by URL). Verdict: migrated cleanly, with a preserved `asChild` compatibility shim on `Item` since — unlike the golden, which dropped it — this repo has 4 real consumers relying on it to render items as links.

## Changed

- [src/components/ui/item.tsx](../src/components/ui/item.tsx):
  - Import: `import { Slot } from "radix-ui"` → `import { mergeProps } from "@base-ui/react/merge-props"; import { useRender } from "@base-ui/react/use-render"`.
  - `Item`: `const Comp = asChild ? Slot.Root : "div"` → `useRender` + `mergeProps`, matching the golden's mechanism, **extended with a local `resolveAsChild` compat shim** (matching the established per-file pattern already used in `alert-dialog.tsx`/`drawer.tsx`/`tooltip.tsx`/`button.tsx`/`collapsible.tsx`) so `asChild` keeps working — the golden's own `Item` dropped `asChild` entirely (render-only), but 4 real usages in this repo's docs (`src/lib/registry/item.tsx`, lines with `<Item asChild><a href="#">...`) depend on it to render an item as a clickable link with the item's full internal structure (`ItemMedia`/`ItemContent`/`ItemActions`) as the anchor's children.
  - `data-slot="item"`, `data-variant={variant}`, `data-size={size}` are now produced via `state: { slot: "item", variant, size }` passed to `useRender` — verified this produces identical output to the previous literal attributes for these specific fields, since `variant`/`size` are **string** values (not booleans), and `getStateAttributesProps`'s conversion only differs from a literal attribute for **boolean** `true` values (empty-string presence vs. literal `"true"`) — strings pass through unchanged either way (`data-variant="default"` in both cases). Confirmed no boolean-valued `data-*` attribute was affected on `Item`.
  - `@dependencies` JSDoc tag: `none` → `@base-ui/react`.
  - `ItemGroup`, `ItemSeparator`, `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, and other plain-div parts were untouched — none used `Slot`.
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/item.tsx` → clean, zero matches.
- [public/registry/care-ui/item/item.json](../public/registry/care-ui/item/item.json), [public/registry/care-ui/index.json](../public/registry/care-ui/index.json): regenerated via `pnpm run build:registry`.

## Left alone

- [src/lib/registry/item.tsx](../src/lib/registry/item.tsx): no changes needed — all 4 `<Item asChild><a href="#">...</a></Item>` usages continue to work unchanged through the compat shim; verified via typecheck and the shim's identical structure to the already-proven pattern in other migrated files.
- All other `Item*` sub-parts (Group/Separator/Media/Content/Title/Description/Actions/Header/Footer): plain divs, never used `Slot`, left untouched.

## Behavior changes

None. The `asChild` compat shim preserves exact prior behavior; `variant`/`size` data attributes are byte-identical to before.

## Verify by hand

1. Load the Item docs page and confirm every example renders correctly (basic list items, the "Link" example wrapping an `<a>`, items inside a dropdown-menu-content context using the `xs` size variant).
2. Click the link-style `Item` examples (`ItemLink`) and confirm navigation works and the full item layout (media/content/actions) renders correctly inside the anchor.
3. Inspect DOM: confirm `data-slot="item"`, `data-variant`, `data-size` are all present with the expected string values.
4. Confirm focus-visible ring styling still applies correctly on both plain (`div`) and link (`a`, via `asChild`) items.

## Notes for the user

- Derived remaining-Radix count: **0 files** in `src/components/ui` import from `radix-ui` — see [button-group.md](button-group.md) for the full note on this being the final batch and the pending `components.json` style flip / `radix-ui` dependency removal decision.
