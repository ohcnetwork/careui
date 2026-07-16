# aspect-ratio

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry JSON by URL). Verdict: migrated cleanly — Radix has no Base UI counterpart for `AspectRatio`, per the skill's hard rule the target is a plain CSS `aspect-ratio` div, and this run also caught a second, previously-unmigrated consumer (`tv-display.tsx`) that hand-rolled its own use of the Radix primitive.

## Changed

- [src/components/ui/aspect-ratio.tsx](../src/components/ui/aspect-ratio.tsx): replaced `AspectRatioPrimitive.Root` (from `radix-ui`) with a plain `<div>` using the Tailwind v4 arbitrary-property utility `aspect-(--ratio)`, driven by a `--ratio` CSS custom property set via inline `style`. This is the exact canonical `base-vega` golden-pair implementation (fetched from `https://ui.shadcn.com/r/styles/base-vega/aspect-ratio.json`), not a hand-reconstruction — adapted only for this project's `cn` import path (`@/lib/utils` instead of `@/registry/base-vega/lib/utils`).
  - `ratio` changed from an implicit-default (`1/1`, previously baked into Radix's own internals and invisible in this wrapper's prop signature) to an explicit **required** `ratio: number` prop, matching the golden pair. Verified this is a no-op in practice: every consumer in this repo (`src/lib/registry/aspect-ratio.tsx`, 4 call sites) already passes `ratio` explicitly.
  - Added `relative` to the base className (present in the golden; Radix's old two-div padding-bottom hack implicitly created a positioning context, so this preserves parity for any descendant that relies on `position: absolute`).
  - `@dependencies` JSDoc tag: `radix-ui` → `none` (zero runtime dependencies now).
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/aspect-ratio.tsx` → clean, zero matches.
- [src/components/ui/tv-display.tsx](../src/components/ui/tv-display.tsx): this component independently imported `AspectRatioPrimitive` directly from `radix-ui` (not via the local `aspect-ratio.tsx` wrapper) to size its outer TV canvas. Replaced the same way: `<AspectRatioPrimitive.Root ratio={...} data-slot="tv-display-root" data-aspect-ratio={...}>` → a plain `<div>` with `data-slot`/`data-aspect-ratio` preserved, `style={{ "--ratio": TV_ASPECT_RATIOS[aspectRatio] } as React.CSSProperties}`, and `className="relative aspect-(--ratio)"`. No `cn()` needed here since no external `className` is applied to this particular element (it never accepted one). `@dependencies` JSDoc tag: `radix-ui class-variance-authority` → `class-variance-authority`.
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/tv-display.tsx` → clean, zero matches.
- [src/lib/registry/aspect-ratio.tsx](../src/lib/registry/aspect-ratio.tsx): updated the "manual install" docs snippet — dropped the `npm install radix-ui` dependency-install step entirely (matches the `input-group`/`input`/`item`/`skeleton`/`table` pattern for zero-dependency components in this repo, which just say "Copy and paste the ... component source code into your project.").
- [public/registry/care-ui/aspect-ratio/aspect-ratio.json](../public/registry/care-ui/aspect-ratio/aspect-ratio.json), [public/registry/care-ui/tv-display/tv-display.json](../public/registry/care-ui/tv-display/tv-display.json), [public/registry/care-ui/index.json](../public/registry/care-ui/index.json): regenerated via `pnpm run build:registry` (dependency lists now correctly reflect `none` / `class-variance-authority`).

## Left alone

- [src/lib/registry/tv-display.tsx](../src/lib/registry/tv-display.tsx): the installation `manual` text ("Requires the aspect-ratio primitive") was already slightly imprecise before this migration (tv-display.tsx never actually imported the local `aspect-ratio.tsx` component — it always hand-rolled its own Radix usage). Left as-is since fixing the wording is unrelated drift outside this migration's scope, not something this change introduced or regressed.
- [src/components/ui/loading-animation-svg.tsx](../src/components/ui/loading-animation-svg.tsx) and [src/components/ui/loading-animation.tsx](../src/components/ui/loading-animation.tsx): both set an inline `aspectRatio` CSS property directly on plain divs already (not via Radix, not via the `AspectRatio` component) — unrelated to this migration, correctly left untouched.
- No other files in the project import `AspectRatio` or `AspectRatioPrimitive` besides the two migrated above and their own doc/registry entries.

## Behavior changes

None functionally. The visual/layout result of a single div with CSS `aspect-ratio` is equivalent to Radix's older two-div `padding-bottom` percentage hack for all real usages in this repo (every consumer already sizes its children with `w-full h-full`, which works identically against either implementation). The only API-level change is `ratio` becoming a required prop instead of an implicit default — verified as a no-op against all current call sites (see "Changed" above).

## Verify by hand

1. Load the Aspect Ratio docs page and confirm all three examples (default 16:9, Square 1:1, Portrait 9:16) render images at the correct proportions with no layout shift or overflow.
2. Resize the browser window and confirm each `AspectRatio` box continues to maintain its ratio responsively (CSS `aspect-ratio` recomputes on width changes, same as before).
3. Load a TV Display block/demo (e.g. `tv-display-01-demo.tsx`) and confirm the TV canvas still renders at the correct aspect ratio (16/9 default) with the dark background, rounded corners, and content correctly filling the box edge-to-edge.
4. Toggle between different `aspectRatio` presets on `TVDisplay` (16/9, 21/9, 4/3, 9/16) if exposed in any demo, confirming the box resizes correctly for each.
5. Inspect the DOM in devtools: confirm there is now only **one** wrapper div per `AspectRatio`/`TVDisplay` root (previously two, due to Radix's padding-bottom hack) — this is an intentional simplification, not a bug, but worth confirming no styling relied on the removed extra wrapper.

## Notes for the user

- Derived remaining-Radix count: `grep -rl 'from "radix-ui"' src/components/ui` now returns **30 files** (down from 32): `avatar`, `badge` (`Slot`), `breadcrumb` (`Slot`), `button-group` (`Slot`), `button` (`Slot`), `checkbox`, `collapsible`, `context-menu`, `dialog`, `dropdown-menu`, `hover-card`, `item` (`Slot`), `label`, `menubar`, `navigation-menu`, `popover`, `progress`, `radio-group`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar` (`Slot`), `slider`, `studio-sidebar` (`Slot`), `switch`, `tabs`, `toggle-group`, `toggle`, `tooltip`. `accordion`, `alert-dialog`, `aspect-ratio`, `combobox`, `drawer`, and `tv-display` are now off Radix (`alert` was never on Radix and needed no migration either).
