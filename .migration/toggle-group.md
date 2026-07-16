# toggle-group

2026-07-16, three-way merge (`git merge-file`, `radix-vega` golden as
ancestor, `base-vega` golden as target — fetched by URL, progressive mode).
Verdict: customized wrapper, migrated cleanly; one live registry bug caught
and corrected rather than reproduced (see below). Required migrating
`toggle` first (dependency: `toggle-group.tsx` imports `toggleVariants` from
`@/components/ui/toggle`), which is reported separately in
`.migration/toggle.md`.

## Changed

- `src/components/ui/toggle-group.tsx` — classified CUSTOMIZED: diffed
  against `https://ui.shadcn.com/r/styles/radix-vega/toggle-group.json` and
  found a different default `spacing` (`0` vs. golden's `2`), the verbose
  `data-[orientation=vertical]:*` selector instead of the golden's
  `data-vertical:*` shorthand, and (matching `toggle.tsx`) the missing
  `has-data-[icon=...]` icon-aware padding on `ToggleGroupItem`. Ran
  `git merge-file` with the radix-vega golden as ancestor and the fetched
  `https://ui.shadcn.com/r/styles/base-vega/toggle-group.json` as the other
  side; all three customizations survived the merge untouched (verified
  byte-for-byte against the pre-migration file). Three conflicts
  hand-resolved:
  - Import block: `ToggleGroupPrimitive`/`TogglePrimitive` now come from
    `@base-ui/react/toggle-group` / `@base-ui/react/toggle`; kept this
    project's `@/lib/utils` and `@/components/ui/toggle` aliases; kept
    `import * as React from "react"` (still needed here for
    `createContext`/`useContext`/`React.CSSProperties`, unlike `toggle.tsx`).
  - `ToggleGroupPrimitive.Root` → `ToggleGroupPrimitive` (callable
    single-part primitive, no `.Root`).
  - `ToggleGroupPrimitive.Item` → `TogglePrimitive` (Base UI has no
    dedicated Item part: group items ARE `Toggle` primitives, per
    `disclosure.md`'s "`ToggleGroup.Item → Toggle`" mapping — the golden
    pair confirms this, `ToggleGroupItem`'s JSX renders `<TogglePrimitive>`
    directly, not a `.Item` subcomponent).
  - Types: `React.ComponentProps<typeof ToggleGroupPrimitive.Root>` →
    `ToggleGroupPrimitive.Props`; `React.ComponentProps<typeof
    ToggleGroupPrimitive.Item>` → `TogglePrimitive.Props`.
  - `@dependencies` JSDoc tag updated `radix-ui` → `@base-ui/react`.
  - **Corrected, not reproduced**: the fetched base-vega golden's
    `ToggleGroupItem` className still contains `data-[state=on]:bg-muted` —
    this is a bug in the live shadcn registry. Cross-checked against
    installed `@base-ui/react@1.6.0` types
    (`node_modules/@base-ui/react/toggle/ToggleDataAttributes.js:11`,
    `ToggleDataAttributes["pressed"] = "data-pressed"`) and confirmed Base
    UI's `Toggle` never emits a `data-state` attribute at all — only
    `data-pressed` (presence-based) — matching this skill's own
    `class-mapping.md` table (`data-[state=on]: (toggle) → data-pressed:`).
    Reproducing the golden verbatim would have silently broken the pressed
    background highlight (the selector would never match). Used
    `data-pressed:bg-muted` instead. Verified live (see below) — the
    highlight now correctly appears/disappears with press state.
  Leftover scan: `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
  src/components/ui/toggle-group.tsx` — no matches.
- `src/lib/registry/toggle-group.tsx` — only consumer. The demo used the old
  Radix API shape: `<ToggleGroup type="single">`. Base UI's `ToggleGroup` has
  no `type` prop at all (`multiple` boolean, default `false`, replaces it —
  same treatment as the accordion migration's `type`→`collapsible`/`multiple`
  change). Since single mode is already the default, the prop was dropped
  entirely (both in the `code:` template string and the executable
  `React.createElement` preview tree), not renamed to anything.
  Leftover scan: `grep -n "radix-ui\|@radix-ui\|type=\"single\"\|type=\"multiple\""
  src/lib/registry/toggle-group.tsx` — no matches.
- `public/registry/care-ui/toggle-group/toggle-group.json`,
  `public/registry/care-ui/index.json` — regenerated via
  `pnpm run build:registry`.

No other consumers found (`grep -rl` for `@/components/ui/toggle-group`
outside `src/components/ui/` and `src/lib/registry/toggle-group.tsx` and its
own barrel registration returned nothing).

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- `onValueChange` (unused in this repo, grepped clean) is now always an
  array even in single-select mode (`[]` when nothing pressed, `["bold"]`
  when pressed), and gains a second `eventDetails` argument — flagging per
  `disclosure.md`, not applicable today since no consumer wires this up.
- `rovingFocus={false}` has no Base UI equivalent (not used here, grepped
  clean) — roving focus is always on.
- The registry-bug correction above (`data-[state=on]` → `data-pressed`) is
  a deviation from the literal golden-pair fetch, done for correctness; flagged
  here per the "never guess a mapping" rule rather than silently carried
  forward or silently fixed without a note.

## Verify by hand

1. Docs page: Toggle Group → confirm Bold/Italic/Underline render with this
   project's spacing/padding customization intact (not the shadcn default
   look).
2. Click "Bold": confirm it visually presses (muted background appears).
3. Click "Italic": confirm Bold un-presses and Italic presses (single-select
   default, `multiple` defaults to `false` — same as the old `type="single"`).
4. Keyboard: Tab into the group, arrow-key between items, Space/Enter to
   toggle; confirm roving-focus navigation still works.

Verified points 1–3 live: launched the dev server, navigated to the Toggle
Group doc page, screenshotted the initial unpressed state, clicked Bold and
confirmed via DOM inspection (`data-pressed` + computed background color
change) that the press highlight now works, then clicked Italic and
confirmed Bold's `data-pressed` cleared while Italic's was set — single-mode
mutual-exclusivity preserved. No console errors during interaction.
