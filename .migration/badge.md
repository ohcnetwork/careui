# badge

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry JSON by URL). Verdict: migrated cleanly — this is the first `Slot`/`asChild` component migrated in this project; replaced with Base UI's `useRender` + `mergeProps` utilities exactly as the golden pair does, extended to preserve all of this project's custom features (dot, solid, counter, onClose, semantic/named color variants) that the plain shadcn golden doesn't have.

## Changed

- [src/components/ui/badge.tsx](../src/components/ui/badge.tsx):
  - Import: `import { Slot } from "radix-ui"` → `import { mergeProps } from "@base-ui/react/merge-props"; import { useRender } from "@base-ui/react/use-render"`. Verified both subpaths exist in the installed `@base-ui/react@1.6.0` (`node_modules/@base-ui/react/{merge-props,use-render}/index.d.ts`) before using them, per the skill's "check the `.d.ts` files, never guess" rule — the initial glob search for files literally named `*use-render*` came up empty (the exports live inside directories named `use-render/`/`merge-props/` with an `index.d.ts`), so this was re-verified via the package's `exports` map before proceeding.
  - `asChild` (boolean) → `render` (via `useRender.ComponentProps<"span">`, which already includes the `render` prop — no separate type field needed). Zero consumers in this repo pass `asChild` to `Badge` (verified via repo-wide search), so no compatibility shim was needed and no consumer code required updates — this is a clean rename with no observed call sites to migrate.
  - The manual `const Comp = asChild ? Slot.Root : "span"` + JSX element pattern was replaced with `return useRender({ defaultTagName: "span", render, state: {...}, props: mergeProps<"span">({...}, props) })`, matching the structure of the golden `base-vega` `badge.tsx` exactly.
  - `data-slot="badge"` and `data-variant={variant}` (previously explicit JSX attributes) are now produced automatically by `useRender`'s `state: { slot: "badge", variant }` — confirmed byte-for-byte equivalent output by reading `getStateAttributesProps.mjs`: a string state value renders as `data-key="value"`, exactly matching the old explicit attributes.
  - `data-solid={solid || undefined}` → `state: { solid: solid || undefined }`. **Minor, harmless attribute-value difference**: previously rendered as `data-solid="true"` (React stringifies a literal boolean `true` passed to a custom `data-*` attribute); now renders as `data-solid=""` (Base UI's state-to-attribute conversion uses the empty-string presence-attribute convention for `true`, same as `data-open`, `data-checked`, etc. elsewhere in Base UI). Verified this repo has no CSS selector or consumer code depending on the specific string value of `data-solid` (only a presence check like `[data-solid]` would ever be used, which still matches either way) — see "Behavior changes" below, flagged for completeness even though it's a non-issue in practice.
  - `dot`, `children`, and the `onClose` close-button are now composed into a single `children:` value passed inside the `mergeProps` call (rather than being JSX children of the rendered element directly) — required because `useRender`'s `props` object is the mechanism for supplying `children` when using this pattern. Rendered output is identical.
  - The `onClose`-incompatibility doc comment was updated from "not compatible with asChild" to "not compatible with a custom `render` element" (same pre-existing limitation, renamed to match the new prop name — this restriction was never enforced in code before and still isn't; documentation-only).
  - `@dependencies` JSDoc tag: `class-variance-authority lucide-react radix-ui` → `class-variance-authority lucide-react @base-ui/react`.
  - `badgeVariants` CVA definition (all color/size/solid/counter variants and compound variants) is byte-for-byte unchanged — this project's variant system is entirely custom (the shadcn golden's `badgeVariants` is a completely different, much simpler set: `default`/`secondary`/`destructive`/`outline`/`ghost`/`link`), so no golden content was copied for the styling itself, only the polymorphism mechanism.
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/badge.tsx` → clean, zero matches.
- [public/registry/care-ui/badge/badge.json](../public/registry/care-ui/badge/badge.json), [public/registry/care-ui/index.json](../public/registry/care-ui/index.json): regenerated via `pnpm run build:registry` (dependency list now correctly reflects `@base-ui/react` instead of `radix-ui`).

## Left alone

- [src/lib/registry/badge.tsx](../src/lib/registry/badge.tsx): no changes
  needed. No example or preview passes `asChild` to `Badge`, and the
  installation `manual` text never mentioned an `npm install radix-ui` step
  to remove (matches the "Copy and paste the badge component source code
  into your project." pattern, same as `accordion`/`avatar`).
- 8 consumer files (`src/components/error-pages/index.tsx`, `playground.tsx`,
  `src/components/ui/filters.tsx`, and several `src/lib/registry/*.tsx` demo
  files including the 13 call sites inside `data-table.tsx`) import `Badge` —
  all pass only `variant`, `size`, `className`, `dot`, `solid`, `counter`,
  `onClose`, and plain children, none of which changed shape. No consumer
  edits were required.
- `button.tsx`, `button-group.tsx`, `breadcrumb.tsx`, `item.tsx`,
  `sidebar.tsx`, `studio-sidebar.tsx` still use the Radix `Slot`/`asChild`
  pattern independently — untouched, out of scope for this run (each is its
  own migration; `badge` doesn't import from or depend on any of them).

## Behavior changes

- `data-solid` renders as `data-solid=""` instead of `data-solid="true"` when
  `solid` is true (see "Changed" above for the technical reason). Flagged,
  not silently patched with a custom `stateAttributesMapping` override,
  because no code in this repo depends on the specific string value — only
  presence-based `[data-solid]` selectors would ever be meaningful, and
  those still match. If a downstream consumer's CSS specifically selects
  `[data-solid="true"]` (unlikely, but possible outside this repo), it would
  need updating to `[data-solid]` or `[data-solid=""]`.

## Verify by hand

1. Load the Badge docs page and confirm every example (all color variants,
   solid/outline, sizes, dot indicator, counter pill, closable badge with
   the × button) renders identically to before.
2. Click the close (×) button on a closable badge example and confirm
   `onClose` still fires correctly.
3. Inspect a solid-variant badge in devtools and confirm `data-solid` is
   present on the element (value may now read `data-solid=""` instead of
   `data-solid="true"` — expected, not a bug).
4. Check a page using many badges together (e.g. the `data-table.tsx` demos
   in the docs, `filters.tsx`) to confirm no visual regressions across the
   various color/size combinations.
5. If you use `render` (the renamed `asChild`) anywhere downstream outside
   this repo, confirm passing `render={<a href="...">...</a>}` still merges
   the badge's classes/attributes onto the custom element correctly (no
   consumer in this repo currently exercises this path, so it's untested
   here beyond typechecking).

## Notes for the user

- Derived remaining-Radix count: `grep -rl 'from "radix-ui"' src/components/ui`
  now returns **28 files**: `breadcrumb` (`Slot`), `button-group` (`Slot`),
  `button` (`Slot`), `checkbox`, `collapsible`, `context-menu`, `dialog`,
  `dropdown-menu`, `hover-card`, `item` (`Slot`), `label`, `menubar`,
  `navigation-menu`, `popover`, `progress`, `radio-group`, `scroll-area`,
  `select`, `separator`, `sheet`, `sidebar` (`Slot`), `slider`,
  `studio-sidebar` (`Slot`), `switch`, `tabs`, `toggle-group`, `toggle`,
  `tooltip`. `accordion`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`,
  `combobox`, `drawer`, and `tv-display` are now off Radix (`alert` never
  needed migration).
