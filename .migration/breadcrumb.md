# breadcrumb

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: customized wrapper (project's own
`soft-background`/`soft-foreground` link/page styling), migrated cleanly —
`BreadcrumbLink` moved to the `useRender`+`mergeProps` idiom, matching the
`badge.tsx` precedent already in this repo for non-button polymorphic
components.

## Changed

- `src/components/ui/breadcrumb.tsx` — classified CUSTOMIZED: diffed
  against `https://ui.shadcn.com/r/styles/radix-vega/breadcrumb.json` and
  found `BreadcrumbLink` uses `hover:bg-soft-background hover:text-foreground
  underline` (this project's own link treatment) where the golden uses a
  plain `transition-colors hover:text-foreground`, and `BreadcrumbPage` uses
  `text-soft-foreground` where the golden uses `text-foreground`. This file
  only ever imported `Slot` from `radix-ui` (not a stateful Radix
  primitive) for `BreadcrumbLink`'s `asChild` support — per this skill's
  hard rules ("Reserve `useRender` + `mergeProps` for non-button polymorphic
  components (breadcrumb link, marker)") and the `badge.tsx` precedent
  already in this repo, replaced the `const Comp = asChild ? Slot.Root :
  "a"` idiom with `useRender`/`mergeProps` from `@base-ui/react`, matching
  the fetched `https://ui.shadcn.com/r/styles/base-vega/breadcrumb.json`
  shape: prop type `React.ComponentProps<"a"> & { asChild?: boolean }` →
  `useRender.ComponentProps<"a">`; the hardcoded `data-slot="breadcrumb-link"`
  attribute moved into `useRender`'s `state: { slot: "breadcrumb-link" }`
  (the convention this project's `badge.tsx` already established — `state`
  keys surface as `data-*` attributes). Also kept the project's existing
  concrete `ChevronRightIcon`/`MoreHorizontalIcon` imports from
  `lucide-react` rather than the golden's `IconPlaceholder` (multi-icon-
  library indirection this project doesn't use — per the leftover-scan
  rule). `@dependencies` JSDoc updated `radix-ui` → `@base-ui/react`.
  Leftover scan: `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
  src/components/ui/breadcrumb.tsx` — no matches.
- `src/lib/registry/breadcrumb.tsx:497` — the "Link component" example's
  prose description said "you can use the `asChild` prop on
  `<BreadcrumbLink />`"; updated to "the `render` prop", matching the new
  API. No code sample in that file actually used `asChild` (all pass
  `href`/children directly), so this was the only stale reference.
- `public/registry/care-ui/breadcrumb/breadcrumb.json`,
  `public/registry/care-ui/index.json` — pending regeneration (batched at
  the end of this multi-component run).

No other consumer changes needed: `dynamic-breadcrumb.tsx`,
`blocks/inner-page-01.tsx`, `blocks/inner-page-02.tsx`,
`lib/registry/sidebar*.tsx` all call `<BreadcrumbLink href="...">children</BreadcrumbLink>`
with no `asChild`/`render` usage — the default `<a>` rendering path is
unaffected.

## Left alone

`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbPage`,
`BreadcrumbSeparator`, `BreadcrumbEllipsis` — all plain native-element
components with no Radix/Base UI primitive involvement at all; untouched
except for the `BreadcrumbPage` customization already carried over
unchanged.

## Behavior changes

None expected — `useRender` with no `render` prop passed renders the
`defaultTagName` (`"a"`) exactly like the old default-`<a>` path, and no
consumer in this repo currently uses `render`/previously used `asChild`.

## Verify by hand

1. Any breadcrumb trail (top header `DynamicBreadcrumb`, `inner-page-01`/
   `inner-page-02` blocks, sidebar demo pages): confirm the trail renders,
   the current page shows in the muted "page" style, and non-current links
   show the underline + soft-background hover treatment.
2. Docs page: Breadcrumb → "Link component" example — confirm links still
   navigate (or at least render as anchors) correctly.
