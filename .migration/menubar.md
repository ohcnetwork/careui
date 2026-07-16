# menubar

2026-07-16, golden pair via CLI (fetched `radix-vega`/`base-vega` registry
JSON by URL, progressive mode). Verdict: PRISTINE wrapper, migrated with
ONE deliberate deviation from the golden's exact shape — kept
self-contained on `@base-ui/react/menu` rather than composing this
project's `dropdown-menu.tsx`, to avoid leaking that file's customized
(larger) sizing into menubar's unrelated, smaller original item sizing.
Verified live in a headless browser — hover-switching between menus,
submenus, and a radio group all confirmed working with no console errors.

## Changed

- `src/components/ui/menubar.tsx` — classified PRISTINE: diffed against
  `https://ui.shadcn.com/r/styles/radix-vega/menubar.json`, identical
  besides class ordering. Per `menus.md`'s menubar section ("Base UI's
  menubar module exports a single `<Menubar>` container. Every menu
  inside it is built from `Menu.*` parts... So the Radix
  `Menubar.Menu/Trigger/Portal/Content/...` parts all map to the `Menu`
  component family from the dropdown-menu section"), rewired onto
  `@base-ui/react/menu` (`MenuPrimitive`) for every shared part, and
  `@base-ui/react/menubar` (`MenubarPrimitive`, single-part callable) for
  the outer `Menubar` container itself.
  - **Deliberate deviation from the fetched
    `https://ui.shadcn.com/r/styles/base-vega/menubar.json`**: the live
    golden composes its `MenubarMenu`/`MenubarTrigger`/`MenubarContent`/
    `MenubarItem`/etc. directly from ITS OWN `dropdown-menu.tsx` exports
    (`MenubarMenu = DropdownMenu`, `MenubarItem = DropdownMenuItem`, …).
    This project's `dropdown-menu.tsx` (migrated earlier this run) is
    CUSTOMIZED with larger responsive item sizing (`min-h-11`/
    `md:min-h-10`). Composing menubar against it verbatim would have
    silently pulled that larger sizing into menubar's items, which
    previously had — and should keep — their own smaller, non-responsive
    `px-2 py-1.5` sizing (menubar and dropdown-menu were always
    independently-styled in this project, pre-migration). Kept
    `menubar.tsx` self-contained on `MenuPrimitive` directly instead,
    preserving the exact pre-migration class strings for `Item`/
    `CheckboxItem`/`RadioItem`/`SubTrigger`/`Content` verbatim — this is a
    structural choice to protect an existing visual boundary between two
    components, not a customization loss.
  - `MenubarContent` restructured to `Portal > Positioner > Popup` (same
    positioner model as `dropdown-menu.tsx`/`context-menu.tsx`), keeping
    this file's own defaults: `align="start" alignOffset={-4} side="bottom"
    sideOffset={8}` (the original wrapper only destructured
    `align`/`alignOffset`/`sideOffset` — added an explicit `side="bottom"`
    default, matching Positioner's own default and the golden's implicit
    behavior).
  - `MenubarSubContent` now composes the file's own `MenubarContent`
    (mirroring `dropdown-menu.tsx`'s SubContent-composes-Content pattern,
    scoped to this file's own self-contained primitives instead of
    reaching into `dropdown-menu.tsx`), with the same
    `align="start" alignOffset={-3} side="right" sideOffset={0}` defaults
    documented in `wrapper-shapes.md` for the dropdown-menu family.
  - Part renames (exported names unchanged): `Label` → `GroupLabel`,
    `ItemIndicator` → `CheckboxItemIndicator`/`RadioItemIndicator`, `Sub`
    → `SubmenuRoot`, `SubTrigger` → `SubmenuTrigger`.
  - `SubTrigger` gained `data-popup-open:bg-accent
    data-popup-open:text-accent-foreground` alongside the existing
    `data-open:*` hooks (same treatment as dropdown-menu/context-menu's
    SubTrigger — the pre-existing `data-open:*` was dead under Radix, now
    functional).
  - CSS var rename: `--radix-menubar-content-transform-origin` →
    `--transform-origin`.
  - Confirmed no `cn-*` hooks in this project — skipped the golden's
    `cn-menu-target cn-menu-translucent` companion classes; kept concrete
    `CheckIcon`/`ChevronRightIcon` from `lucide-react`.
  - Types: `React.ComponentProps<typeof MenubarPrimitive.X>` →
    `MenuPrimitive.X.Props` (or `MenubarPrimitive.Props` for the Root).
    `@dependencies` JSDoc updated `radix-ui` → `@base-ui/react`. Leftover
    scan: `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
    src/components/ui/menubar.tsx` — no matches.
- `public/registry/care-ui/menubar/menubar.json`,
  `public/registry/care-ui/index.json` — pending regeneration (batched at
  the end of this multi-component run).

No consumer changes needed: `src/lib/registry/menubar.tsx` (the only
consumer) never uses `MenubarLabel` (grepped — zero occurrences, so the
`GroupLabel`-must-be-in-`Group` requirement never surfaces here), never
sets `defaultValue`/`value`/`onValueChange`/`loop` on the `<Menubar>` root
(all dropped/renamed per `menus.md`, confirmed unused), and its
`value`/`onValueChange` usages are all on `MenubarRadioGroup` (unrelated,
unchanged prop shape).

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- `Menubar` Root's `defaultValue`/`value`/`onValueChange` (the "which menu
  is currently open" controlled system) is DROPPED ENTIRELY — Base UI's
  `Menubar` has no equivalent; control each `Menu.Root`'s own `open` prop
  individually instead. Not used anywhere in this repo (grepped clean).
- `loop` → `loopFocus` on individual `Menu.Root`s (default flips `false` →
  `true`) — not set explicitly anywhere here.
- `onCloseAutoFocus`/`onEscapeKeyDown`/`onPointerDownOutside`/
  `onFocusOutside`/`onInteractOutside` all move to each `Menu.Root`'s
  `onOpenChange` reasons — none used here.

## Verify by hand

Verified live via a headless browser (dev server + Playwright) as part of
this run:
1. Docs page: Menubar → clicked "File", confirmed menu opened with
   disabled "New Incognito Window", shortcuts (⌘T, ⌘N, ⌘P), and a "Share"
   submenu chevron.
2. Hovered "Edit" while "File" was open — menu switched instantly without
   re-clicking (built-in menubar hover-switching survived the migration
   to composed `Menu.Root`s).
3. Clicked "Profiles" — `MenubarRadioGroup`/`MenubarRadioItem` rendered
   correctly with "Benoit" checked.
4. Reopened "File", hovered "Share" — submenu opened correctly positioned
   to the right with "Email link"/"Messages"/"Notes".
5. No console errors during any of the above interactions.
