# alert-dialog

2026-07-16, golden pair via CLI (reconciliation pass — this component was migrated to Base UI in a prior session before this skill was installed; this run re-verifies it against the authoritative `radix-vega`/`base-vega` registry JSON fetched by URL and corrects one deviation). Verdict: one real behavior-affecting fix applied (`AlertDialogAction` no longer auto-closes, matching the canonical Base UI target); everything else already matched or was a legitimate project customization, left intact.

## Changed

- [src/components/ui/alert-dialog.tsx](../src/components/ui/alert-dialog.tsx):
  - Import: switched from the `@base-ui/react` barrel entry to the subpath
    `@base-ui/react/alert-dialog`, matching the canonical golden-pair import
    style and the sibling `accordion.tsx`/`drawer.tsx` files in this repo.
  - `AlertDialog` (Root) type: `React.ComponentProps<typeof AlertDialogPrimitive.Root>`
    → `AlertDialogPrimitive.Root.Props`, matching the idiomatic Base UI type
    usage from `universal-patterns.md` and the golden pair.
  - `AlertDialogOverlay`: added `isolate` to the class list (was previously
    only `fixed inset-0 z-50 ...`). This is present in the `base-vega` golden
    but absent from `radix-vega` — a Base UI-specific stacking-context fix
    introduced by the shadcn team for the Base UI variant, not a stylistic
    choice, so it was adopted. The project's customized `bg-black/50`
    opacity (golden uses `bg-black/10`) was preserved as-is since that
    predates this migration and is an intentional project customization.
  - **`AlertDialogAction`: reverted from `AlertDialogPrimitive.Close`
    (wrapping a `Button`, auto-closing on click) to a plain `Button`
    (`React.ComponentProps<typeof Button>`), matching the canonical
    `base-vega` golden exactly.** This corrects a deviation introduced in the
    prior session, where `Close` was used to silently preserve the old Radix
    auto-close-on-click behavior. Per `overlays.md`'s `alert-dialog` section,
    Base UI has **no `Action` primitive at all** (confirmed against
    `node_modules/@base-ui/react/alert-dialog/index.parts.d.ts`, which
    exports only `Root, Trigger, Portal, Backdrop, Popup, Title, Description,
    Close, Viewport, Handle` — no `Action`), and the officially shipped
    shadcn base-vega example
    (`https://ui.shadcn.com/code/apps/v4/registry/bases/base/examples/alert-dialog-example.tsx`)
    confirms the intended pattern is a plain, non-closing button. See
    "Behavior changes" below — this is a real, user-facing change from the
    previous Radix behavior, not a mechanical no-op.
  - Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/alert-dialog.tsx`
    → clean, zero matches.

## Left alone

- [src/lib/registry/alert-dialog.tsx](../src/lib/registry/alert-dialog.tsx):
  no changes needed. All demo examples pass `variant`/`children`/`onClick`-free
  static content to `AlertDialogAction`, which still type-checks and renders
  identically as a plain `Button` (the prop surface — `variant`, `size`,
  `className`, `children` — is unchanged from the consumer's point of view;
  only the runtime close-on-click side effect is gone). No `onClick`-based
  manual-close pattern was added to the docs examples — this matches shadcn's
  own official example, which also doesn't add one.
- `AlertDialogTrigger`'s `asChild` → `render` compatibility shim
  (`resolveAsChild`) was kept as-is, even though the golden pair's own
  examples were rewritten to use `render` directly everywhere. This mirrors
  the precedent already established by `drawer.tsx` in this repo (which has
  the identical shim), preserving backward compatibility for any downstream
  consumer still using `asChild` rather than forcing a breaking rename.
  Intentional repo-level customization, not a gap.
- `AlertDialogContent`'s `bg-background` (no `text-popover-foreground`) vs.
  the golden's `bg-popover text-popover-foreground`, and `AlertDialogTitle`'s
  missing `cn-font-heading` class: both predate this migration (present
  identically in the original Radix-based file, verified against the
  `radix-vega` golden) — pre-existing project design-token customizations,
  not migration gaps. Left untouched.
- `combobox.tsx` (already on `@base-ui/react`, barrel-style import) was not
  touched or reconciled against this same subpath-vs-barrel inconsistency;
  out of scope for this run since the user asked specifically about
  `alert-dialog`.

## Behavior changes

- **`AlertDialogAction` no longer closes the dialog automatically on
  click.** Previously (both the original Radix implementation and the prior
  session's Base UI port via `Close`), clicking the action button closed the
  dialog as a side effect. Base UI's `AlertDialog` has no `Action` part, so
  the canonical migration target is a plain button with no built-in dismiss
  behavior. Consumers that rely on the dialog closing after a confirm action
  (e.g. "Delete", "Continue", "Allow", "Share" in this component's own docs
  examples) must now close it themselves — e.g. via a controlled `open` /
  `onOpenChange` pair on `AlertDialog`, calling a close handler in `onClick`,
  or composing `AlertDialogPrimitive.Close` manually in app code when
  auto-close is desired. This is flagged, not silently patched, per the
  skill's hard rule and matches shadcn's own official base-vega example
  (which also does not auto-close). **This will visibly change behavior for
  anyone already using this component in a real app** — flagging prominently
  for your review before this ships.

## Verify by hand

1. Open each alert-dialog example in the docs (`/docs/alert-dialog` or
   wherever `alertDialogDoc.examples` renders): Basic, Small, Media, Small +
   Media, Destructive.
2. Click "Cancel"/"Don't allow" — confirm the dialog still closes (uses
   `AlertDialogCancel` → `AlertDialogPrimitive.Close`, unaffected by this
   change).
3. Click "Continue"/"Allow"/"Share"/"Delete" (the `AlertDialogAction`
   buttons) — confirm the dialog now **stays open** (this is the expected,
   flagged behavior change, not a bug).
4. Confirm focus still lands appropriately when the dialog opens (Base UI
   focuses the first tabbable element by default; Radix defaulted focus to
   Cancel — this is a pre-existing, unflagged-by-me-here nuance worth a
   glance but not part of this run's changes).
5. Confirm Escape key still closes the dialog, and the backdrop still
   renders behind the popup with the correct opacity/blur.
6. Run `pnpm build` (or at least `tsc -b` + `pnpm lint`) once more after any
   further edits to confirm no regressions — both were clean as of this
   report.

## Notes for the user

- Derived remaining-Radix count: unchanged from the prior report — 32 files
  in `src/components/ui` still import from `radix-ui`; `accordion`,
  `alert-dialog`, `combobox`, and `drawer` are on `@base-ui/react`.
- This file's changes are NOT yet committed — let me know if you'd like a
  `fix(alert-dialog): ...` commit for this reconciliation, separate from the
  original `refactor(alert-dialog): migrate to Base UI` commit.
