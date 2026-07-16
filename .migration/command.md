# command

2026-07-16, no migration performed — not a Radix component.

## Changed

Nothing. No files were modified.

Leftover scan: `grep -n "radix-ui\|@radix-ui" src/components/ui/command.tsx` returns only line 4, which is a `@dependencies` metadata comment in the JSDoc header (`@dependencies cmdk radix-ui vaul`). There is no `import` from any `@radix-ui/*` or `radix-ui` package anywhere in the file.

## Left alone

`src/components/ui/command.tsx` — built entirely on `cmdk`, not Radix UI. The `cmdk` library is explicitly excluded from migration scope per hard rules ("NEVER touch non-radix libraries or their wrappers: cmdk (command)"). The file also composes `dialog`, `drawer`, and `input-group` but does not itself wrap any Radix primitive.

## Behavior changes

None.

## Verify by hand

No verification needed — file is unchanged.
