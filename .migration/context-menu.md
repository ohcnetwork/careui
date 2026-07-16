# context-menu

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: PRISTINE wrapper, migrated
cleanly against the live golden pair. Verified live in a headless browser
— right-click menu, submenu, checkbox/radio items, and destructive styling
all confirmed working with no console errors.

## Changed

- `src/components/ui/context-menu.tsx` — classified PRISTINE: diffed
  against `https://ui.shadcn.com/r/styles/radix-vega/context-menu.json`,
  identical besides class ordering. Replaced wholesale with the fetched
  `https://ui.shadcn.com/r/styles/base-vega/context-menu.json` content per
  `menus.md`'s context-menu section (shares the Menu part set with
  dropdown-menu):
  - `Content` → `Portal > Positioner > Popup`. Unlike dropdown-menu,
    Radix's `ContextMenu.Content` has no `side`/`sideOffset`/`align` props
    at all (pointer-anchored) — this project's ORIGINAL wrapper already
    declared a `side?: "top"|"right"|"bottom"|"left"` prop in its type,
    but since Radix's Content ignored it, it was silently dead (spread
    onto the DOM as a meaningless attribute). Base UI's Positioner
    genuinely accepts `side`/`sideOffset`/`align`/`alignOffset`, so this
    migration makes the previously-decorative prop functional — confirmed
    no consumer passes `side` explicitly (grepped clean), so this is a
    dormant-bug-fix with no observed behavior change today. Adopted the
    golden's defaults verbatim: `align="start" alignOffset={4} side="right"
    sideOffset={0}`.
  - Part renames (exported names unchanged): `Label` → `GroupLabel`,
    `ItemIndicator` → `CheckboxItemIndicator`/`RadioItemIndicator`, `Sub` →
    `SubmenuRoot`, `SubTrigger` → `SubmenuTrigger`.
  - `ContextMenuSubContent` is a TRUE minimal compose of the wrapper's own
    `ContextMenuContent` (per `wrapper-shapes.md`: "context-menu is a true
    minimal compose, unlike dropdown-menu's SubContent which duplicates
    the full content class list") — just `side="right"` (redundant with
    Content's own default, kept for clarity) plus `shadow-lg` added to
    the class list; everything else (colors, animation, ring, sizing)
    inherited from the composed `ContextMenuContent`.
  - `SubTrigger` gained `data-popup-open:bg-accent
    data-popup-open:text-accent-foreground` alongside the existing
    `data-open:*` hooks (same treatment as dropdown-menu's SubTrigger —
    the pre-existing `data-open:*` was dead under Radix, now functional
    under Base UI).
  - CSS var renames: `--radix-context-menu-content-available-height` →
    `--available-height`, `--radix-context-menu-content-transform-origin`
    → `--transform-origin`.
  - Confirmed no `cn-*` hooks in this project — skipped the golden's
    `cn-menu-target cn-menu-translucent` companion classes; kept concrete
    `ChevronRightIcon`/`CheckIcon` from `lucide-react` instead of
    `IconPlaceholder`.
  - Confirmed the two hard Base UI drops for context-menu don't affect
    this repo: `ContextMenu.Root` has no `modal` prop (grepped, unused
    here) and `ContextMenu.Trigger` has no `disabled` prop (grepped,
    unused here) — per `menus.md`'s "gaps/caveats" list of the three hard
    drops with no workaround.
  - Types: `React.ComponentProps<typeof ContextMenuPrimitive.X>` →
    `ContextMenuPrimitive.X.Props` throughout. `@dependencies` JSDoc
    updated `radix-ui` → `@base-ui/react`. Leftover scan:
    `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
    src/components/ui/context-menu.tsx` — no matches.
- `public/registry/care-ui/context-menu/context-menu.json`,
  `public/registry/care-ui/index.json` — pending regeneration (batched at
  the end of this multi-component run).

No consumer changes needed: `src/lib/registry/context-menu.tsx` (the only
consumer) already wraps every `ContextMenuLabel` inside a
`ContextMenuGroup` consistently — the same `GroupLabel`-must-be-in-`Group`
requirement that broke 8 files in the dropdown-menu migration didn't
surface here at all. No `onSelect`/`textValue`/`asChild` usage found
anywhere in this file (grepped clean).

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- `loop` → Root `loopFocus` (default flips `false` → `true`) — not set
  explicitly anywhere in this repo.
- `onCloseAutoFocus`/`onEscapeKeyDown`/`onPointerDownOutside`/
  `onFocusOutside`/`onInteractOutside` all move to Root `onOpenChange`
  reasons — none used here.
- `avoidCollisions`/`collisionBoundary`/`collisionPadding`/`arrowPadding`
  move to Positioner with adjusted defaults (`0`→`5`) — not used here.

## Verify by hand

Verified live via a headless browser (dev server + Playwright) as part of
this run:
1. Docs page: Context Menu → right-clicked the "Right click here" target
   box — menu opened anchored to the pointer position (not the trigger
   element), confirming pointer-anchored positioning survived the
   Positioner restructure. Disabled "Forward" item, checked "Show
   Bookmarks"/"Pedro Duarte" (checkbox + radio indicators) all rendered
   correctly, "People" group label rendered inside its Group.
2. Hovered "More Tools" — submenu opened correctly positioned to the
   right, with destructive red "Delete" styling intact.
3. No console errors during either interaction.

Manual follow-up recommended (not exercised in this pass):
4. Click a `ContextMenuCheckboxItem` (e.g. "Show Full URLs") and confirm
   the menu stays open (same `closeOnClick=false` CheckboxItem default
   verified for dropdown-menu) and the check indicator toggles.
