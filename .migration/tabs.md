# tabs

2026-07-16, three-way merge (`git merge-file`, `radix-vega` golden as
ancestor, `base-vega` golden as target — fetched by URL, progressive mode).
Verdict: customized wrapper (project's own `browser` variant, larger
dimensions, custom colors), migrated cleanly; one deliberately-unpatched
behavior delta flagged per the skill's hard rules — tab activation mode.

## Changed

- `src/components/ui/tabs.tsx` — classified CUSTOMIZED: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/tabs.json` and found this
  project adds a third `browser`-style `TabsList`/`TabsTrigger` variant
  (tab-strip look with border/shadow treatment), larger trigger padding
  (`px-2.5`/`min-h-9` vs golden's `px-2`), `primary-900`/`primary-400`
  active-tab text colors instead of the golden's plain `foreground`, and a
  thicker/rounded active-tab indicator bar (`after:h-1
  after:rounded-t` vs golden's `after:h-0.5`) — none of which exist in the
  plain golden. Ran `git merge-file` with the radix-vega golden as ancestor
  and the fetched `https://ui.shadcn.com/r/styles/base-vega/tabs.json` as
  the other side. Diffed the two goldens directly to confirm the ONLY
  actual Radix→Base delta inside the giant `TabsTrigger` class blob is one
  added hook, `aria-disabled:pointer-events-none aria-disabled:opacity-50`
  (per `class-mapping.md`: "Some triggers gain aria-disabled:* variants
  alongside disabled:* (accordion, tabs)" — note "alongside", not a
  replacement here, unlike accordion) — everything else in that string is
  byte-identical between the two goldens, so the merge tool's large
  conflict hunk was just noise from the customization; hand-resolved by
  keeping the user's full customized class strings and inserting the one
  real addition. Structural renames per `disclosure.md`'s tabs section:
  `TabsPrimitive.Trigger` → `TabsPrimitive.Tab`, `TabsPrimitive.Content` →
  `TabsPrimitive.Panel` (exported names `TabsTrigger`/`TabsContent`
  unchanged for consumers). Types:
  `React.ComponentProps<typeof TabsPrimitive.Root/List/Trigger/Content>` →
  `TabsPrimitive.Root/List/Tab/Panel.Props`. Removed the now-unused
  `import * as React from "react"`. `@dependencies` JSDoc updated
  `radix-ui` → `@base-ui/react`. Leftover scan:
  `grep -n "radix-ui\|@radix-ui\|IconPlaceholder" src/components/ui/tabs.tsx`
  — no matches.
- `public/registry/care-ui/tabs/tabs.json`, `public/registry/care-ui/index.json`
  — pending regeneration (batched at the end of this multi-component run).

No consumer changes needed: `dynamic-main-content.tsx`'s
`<Tabs value={tab} onValueChange={setTab}>` still type-checks (Base UI
widens `value`/`onValueChange` to `Tabs.Tab.Value` = `any`, and string
literal state setters remain assignable); `playground.tsx`,
`blocks/sidebar-01.tsx`, `lib/registry/tabs.tsx`, `lib/registry/sidebar*.tsx`
only use `value`/`defaultValue` on `TabsTrigger`/`TabsContent`, unchanged.

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- **Tab activation mode, FLAGGED not patched** (explicitly named in this
  skill's hard rules as a delta to surface, never silently fix): Radix
  Tabs defaults to `activationMode="automatic"` — arrow-keying to a tab
  trigger immediately activates its panel. Base UI 1.6.0's `Tabs.List`
  defaults `activateOnFocus` to `false` (manual activation — arrow-key
  focus moves between tabs, but the panel only switches on
  Enter/Space/click). This project does not currently set
  `activationMode` anywhere, so it inherited Radix's automatic behavior
  silently; after this migration, keyboard tab-switching requires an
  extra activation keystroke. The base-vega golden pair does NOT set
  `activateOnFocus` either (confirmed by direct inspection), so this
  matches the idiomatic Base UI target — if the old automatic-activation
  feel is wanted back, add `activateOnFocus` to `TabsList`'s underlying
  `TabsPrimitive.List`, which is a product decision, not something this
  migration should decide unilaterally.
- `onValueChange` gains a second `eventDetails` argument (unused
  everywhere in this repo).
- `Content`'s `data-state="active"|"inactive"` polarity inverts to
  `Panel`'s `data-hidden` (presence when hidden) — no class hooks in this
  repo targeted the old attribute directly (only `data-active` on the
  trigger side, which is unchanged), so no visual impact expected.

## Verify by hand

1. Docs page: Tabs → confirm `default`, `line`, and `browser` variants all
   render with their distinct visual treatments intact (colors, active-tab
   indicator, browser-style tab strip border/shadow).
2. Click between tabs in each variant: confirm content switches and the
   active-tab styling (background, indicator bar) follows correctly.
3. Keyboard: Tab into a `TabsList`, arrow-key between triggers — note
   (per the flagged behavior change) that the panel will NOT switch until
   Enter/Space is pressed on the focused tab. Confirm this is acceptable,
   or decide separately whether to opt back into automatic activation.
4. `dynamic-main-content.tsx`'s Preview/Code tabs (used across every
   component doc page): confirm switching between "Preview" and "Code"
   still works via click.
