# sheet

2026-07-16, transformation engine (no golden pair fetch attempted — this
wrapper is independently and heavily hand-built on top of the Radix Dialog
primitive family, with mobile-viewport handling, shake-on-blocked-dismiss
animation, and scroll-collapsing header/description that have no shadcn
registry equivalent to diff against). Verdict: the most structurally
involved migration in this batch — required moving outside-dismiss
blocking from Content-level event props to a Root-level `onOpenChange`
interception, since Base UI relocated that entire mechanism. Verified live
in a headless browser (see below); all custom behavior confirmed intact.

## Changed

- `src/components/ui/sheet.tsx` — rewired `radix-ui`'s `Dialog` import
  (aliased `SheetPrimitive`) → `@base-ui/react/dialog`, per
  `overlays.md`'s dialog part mapping (`Overlay`→`Backdrop`,
  `Content`→`Popup`, exported names unchanged, matching the
  `dialog.tsx`/`alert-dialog.tsx` precedent already in this repo).
  `SheetTrigger`/`SheetClose` gained the standard `asChild`→`render`
  compat shim (`resolveAsChild`, same as `dialog.tsx`).
  - **Outside-dismiss blocking restructured, not renamed.** The original
    used Content-level `onInteractOutside`/`onPointerDownOutside` handlers
    to block dismissal and trigger a shake animation when `dismissible`
    was `false`. Base UI's `Popup` has neither prop — per `overlays.md`:
    "`onPointerDownOutside`/`onInteractOutside` → moved to Root
    `onOpenChange`; reason `'outside-press'`/`'focus-out'` +
    `eventDetails.cancel()`". The problem: `dismissible` is a
    **Content-level** prop (`<SheetContent dismissible={false}>`), but
    `onOpenChange` is now exclusively a **Root-level** prop set by the
    `<Sheet>` consumer — two different components, and React context only
    flows top-down, so `SheetContent` can't hand its `dismissible` value
    "up" to `Sheet`'s render directly. Solved with an always-latest-ref
    bridge: `Sheet` (Root) creates `dismissibleRef`/`triggerShakeRef`
    (plain `useRef`s, stable identity) and provides them via
    `SheetRootContext`; `SheetContent` writes `dismissibleRef.current =
    dismissible` and `triggerShakeRef.current = triggerShake` on every
    render (the "latest ref" pattern — safe here since these are inert
    values/callbacks, not values driving Reconciliation). `Sheet`'s own
    `handleOpenChange` wraps the consumer's `onOpenChange`: for
    `!open && !dismissibleRef.current && (reason === 'outside-press' ||
    reason === 'focus-out')`, it calls `eventDetails.cancel()` (replacing
    the old `event.preventDefault()`) and fires `triggerShakeRef.current()`
    only for `'outside-press'` (matching the original's behavior, where
    only `onInteractOutside` — not `onPointerDownOutside` — called
    `triggerShake()`); otherwise it forwards to the consumer's
    `onOpenChange` unchanged. Confirmed no consumer anywhere passes
    `onInteractOutside`/`onPointerDownOutside` directly to `SheetContent`
    (grepped clean), so nothing needed forwarding externally — those props
    were dropped from `SheetContent`'s type entirely.
  - **`onOpenAutoFocus` → `initialFocus`, same restructure as
    `dialog.tsx`**: attached a `popupRef` (via the existing
    `viewportRef`-composing callback ref, renamed `setContentRef`) to
    `SheetPrimitive.Popup`, and default `initialFocus` to a function that
    returns `false` on mobile (preserving the original's `if (isMobile)
    { e.preventDefault(); return; }` no-focus behavior) or queries
    `popupRef.current` for the first enabled input otherwise. No consumer
    passes `onOpenAutoFocus`/`initialFocus` explicitly (grepped clean), so
    the default applies everywhere.
  - The mobile-viewport-tracking callback ref (`visualViewport`
    resize/scroll listeners adjusting height/top/bottom/max-height per
    `side`) is unchanged in logic, just composed with the new ref-capturing
    responsibility in `setContentRef`.
  - The code comment explaining why `SheetContext.Provider` must live
    inside `SheetPrimitive.Content` (a Radix Presence + `cloneElement`
    ref-dropping hazard) is UPDATED, not deleted: noted that Base UI's
    Popup uses `data-starting-style`/`data-ending-style` + CSS transitions
    instead of Radix's ref-based exit-animation detection, so the specific
    failure mode this guarded against may no longer apply — but the
    Provider is kept in the same position regardless, since moving it has
    no upside and this isn't the run to relitigate it.
  - Types: `React.ComponentProps<typeof SheetPrimitive.X>` →
    `SheetPrimitive.X.Props` throughout. `@dependencies` JSDoc updated
    `radix-ui` → `@base-ui/react`. Leftover scan:
    `grep -n "radix-ui\|@radix-ui\|IconPlaceholder" src/components/ui/sheet.tsx`
    — no matches.
- `public/registry/care-ui/sheet/sheet.json`, `public/registry/care-ui/index.json`
  — pending regeneration (batched at the end of this multi-component run).

No consumer changes needed: `sidebar.tsx`/`studio-sidebar.tsx` pass
`open`/`onOpenChange`/`dir`/`className`/`style`/`side` (all still valid —
`dir` was never a Radix-specific prop on Content, just a passthrough global
HTML attribute, and Base UI's generic `BaseUIComponentProps<'div', State>`
still allows it); `lib/registry/sheet.tsx`'s dismissible-demo only passes
`dismissible`/`size`, unaffected by the internal restructure.

## Left alone

Nothing unrelated in scope for this component.

## Behavior changes

- None intended — every custom behavior (shake-on-blocked-dismiss,
  auto-focus-first-input with mobile skip, scroll-collapsing header,
  viewport-aware sizing) was deliberately reproduced, not simplified away.
  Flagging the underlying mechanism change (Content-level event props →
  Root-level `onOpenChange` + ref bridge) since it's a genuine
  architecture shift even though the observable behavior is unchanged.
- `onOpenChange`'s `eventDetails` now carries the close reason
  (`'escape-key'`, `'close-press'`, `'trigger-press'`, etc.) — not
  currently consumed by any wrapper logic beyond the outside-press/
  focus-out check, but available if `sidebar.tsx`'s `setOpenMobile` ever
  needs reason-specific handling.

## Verify by hand

Verified live via a headless browser (dev server + Playwright) as part of
this run:
1. Docs page: Sheet → "Open" (default, non-dismissible) — opened; clicked
   outside at (100, 100): sheet stayed open (1 visible), confirming the
   Root-level interception correctly blocks `'outside-press'`. Screenshot
   showed the header close (×) button visibly red-tinted
   (`bg-destructive/20 animate-sheet-shake`), confirming the shake
   animation fires on the blocked attempt.
2. Same sheet, pressed Escape: closed (0 visible) — confirming
   `'escape-key'` is correctly NOT blocked by the dismissible check.
3. Screenshot also confirmed the "Full name" input auto-focused on open
   (visible focus ring) — the `initialFocus` restructure preserved the
   original auto-focus-first-input behavior.
4. Docs page: Sheet → "Open (dismissible)" example — opened; clicked
   outside: sheet closed (0 visible), confirming `dismissible={true}`
   correctly allows outside-press dismissal.
5. No console errors during any of the above interactions.

Manual follow-up recommended (not exercised in this pass):
6. Mobile viewport / on-screen-keyboard resize behavior (`visualViewport`
   listener) — needs a real mobile viewport or on-screen keyboard to
   trigger, not practical to simulate headlessly.
7. `sidebar.tsx`'s mobile sheet (`openMobile`/`setOpenMobile`) on a narrow
   viewport — confirm it still opens/closes via the hamburger trigger.
8. Scroll a tall Sheet body and confirm the header title shrinks
   (`text-lg` → `text-base`) and the description collapses
   (`grid-rows-[1fr]` → `grid-rows-[0fr]`) via the `scrolled` context state.
