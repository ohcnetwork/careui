# command

2026-07-16, no migration performed — not a Radix component. One incidental
type-compat fix applied as a forced side effect of the `dialog` migration
(see below); still not a Radix migration.

## Changed

- `src/components/ui/command.tsx` — `CommandDialog`'s prop type inherited
  `React.ComponentProps<typeof Dialog>` wholesale. After `dialog.tsx`
  migrated to `@base-ui/react/dialog` (see `.migration/dialog.md`),
  `Dialog`'s `children` type widened to `ReactNode |
  PayloadChildRenderFunction<unknown>` and its `onOpenChange` typed
  `eventDetails` as Dialog-specific — but `CommandDialog` also passes the
  same `children`/`onOpenChange` into `<Drawer>` (the mobile-breakpoint
  sibling, a separately-typed Base UI family), which no longer
  type-checked. Fixed by overriding just those two prop types:
  `Omit<React.ComponentProps<typeof Dialog>, "children" | "onOpenChange">
  & { ...; children?: React.ReactNode; onOpenChange?: (open: boolean) =>
  void }`. No runtime behavior change — `CommandDialog` always passed plain
  `ReactNode` children and a boolean-only `onOpenChange` handler in
  practice; this only widens/narrows the TYPE annotation to match.

Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/command.tsx`
returns only line 4, the `@dependencies` metadata comment in the JSDoc
header (`@dependencies cmdk radix-ui vaul`). There is no `import` from any
`@radix-ui/*` or `radix-ui` package anywhere in the file.

## Left alone

`src/components/ui/command.tsx`'s actual command-menu implementation —
built entirely on `cmdk`, not Radix UI. The `cmdk` library is explicitly
excluded from migration scope per hard rules ("NEVER touch non-radix
libraries or their wrappers: cmdk (command)"). The file composes `dialog`,
`drawer`, and `input-group`, but does not itself wrap any Radix primitive;
the one edit above is a type-compat patch forced by `dialog.tsx`'s API
change, not a migration of this file.

## Behavior changes

None.

## Verify by hand

`CommandDialog` (⌘K palette, if bound in this app) — confirm it still
opens/closes correctly on both desktop (Dialog) and mobile (Drawer)
breakpoints, since the type fix touches the prop bridge between the two.
