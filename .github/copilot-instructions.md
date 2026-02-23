# CareUI - AI Coding Agent Instructions

CareUI is a **dual-purpose React component library**: a Vite SPA docs site + a shadcn/ui-compatible registry served from `public/registry/care-ui/`. Components serve TWO masters: they must work as React components AND produce valid registry JSON via `scripts/generate-registry.ts`.

**Package manager**: `pnpm`. Use `pnpm dlx` not `npx` for one-off CLI commands.

---

## Three-File Component Pattern

Every component needs exactly **three files**:

| File | Purpose |
|------|---------|
| `src/components/ui/<name>.tsx` | Component implementation with JSDoc header |
| `src/lib/registry/<name>.tsx` | Docs (`ComponentDoc` export, `React.createElement` only) |
| `public/registry/care-ui/<name>/<name>.json` | **Auto-generated** — never edit manually |

### 1. Component implementation (JSDoc MUST come before imports)

```tsx
/**
 * @name badge
 * @description Displays a small status descriptor.
 * @dependencies class-variance-authority
 * @type registry:ui
 */
import * as React from "react";
// ...
// Must include data-slot on the root element:
<span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
```

### 2. Documentation file — `React.createElement` only (JSX has no transform here)

```tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { type ComponentDoc } from "@/lib/types";

export const badgeDoc: ComponentDoc = {
  id: "badge",
  name: "Badge",
  description: "...",
  installation: { cli: "npx shadcn@latest add badge", manual: "..." },
  usage: `import { Badge } from "@/components/ui/badge"`,
  preview: {
    code: `<Badge>Badge</Badge>`,
    component: React.createElement(Badge, {}, "Badge"),   // NOT JSX
  },
};
```

### 3. Register in `src/lib/registry/index.ts`

```ts
badge: () => import("./badge").then((m) => ({ default: m.badgeDoc })),
```

### 4. Generate registry JSON

```bash
pnpm run build:registry
```

---

## Key Scripts

```bash
pnpm dev                 # Vite dev server → http://localhost:5173
pnpm build:registry      # JSDoc → public/registry/care-ui/**/*.json
pnpm registry:watch      # Auto-regenerate on file changes
pnpm build               # tsc + vite build (registry generated via prepublishOnly)
pnpm lint / pnpm format  # ESLint / Prettier
```

Run `build:registry` after **any** change to component source, JSDoc, or registration.

---

## Conventions & Patterns

### CVA for all variants
```tsx
const badgeVariants = cva("base-classes", {
  variants: { variant: { default: "...", secondary: "..." } },
  defaultVariants: { variant: "default" },
});
// Props: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>
```

### Data attributes
- `data-slot="<component-name>"` on the component root
- `data-icon="inline-start" | "inline-end"` on icons inside buttons
- Tailwind selectors: `has-data-[icon=inline-start]:pl-3`, `in-data-[slot=button-group]:rounded-md`

### Import aliases
Always use `@/` (mapped via `tsconfig.json` paths). Radix primitives import from `radix-ui` barrel: `import { Slot } from "radix-ui"`.

### Tailwind CSS v4
- `@import "tailwindcss";` in `src/index.css`
- Custom properties: `--primary-950`, `--radius`; semantic tokens via CSS vars
- New utility syntax: `border-(--color-primary-700)`, `not-disabled:inset-shadow-2xs`
- Dark mode via `@custom-variant dark (&:is(.dark *))` (class-based)

---

## Dependency Auto-Detection

`scripts/generate-registry.ts` maps imports → npm packages via `CONFIG.dependencyMap`. Add new external packages there when introducing new imports not already tracked.

---

## File References

- Template: `src/lib/registry/_template.tsx`
- Types: `src/lib/types.ts` (`ComponentDoc` interface)
- Registry loader: `src/lib/registry/index.ts`
- Generation script: `scripts/generate-registry.ts`
- Button example: `src/components/ui/button.tsx` + `src/lib/registry/button.tsx`

---

## Common Gotchas

1. JSDoc block must appear **before** any `import` statements or it won't parse
2. Doc files use `React.createElement()` — JSX fails at runtime in that context
3. `preview` in `ComponentDoc` has **two fields**: `{ code: string, component: ReactNode }`
4. Forgot `data-slot`? Component works locally but breaks registry conventions
5. Registry JSON not updated after edits? Run `build:registry`
6. Adding a new external package? Add it to `CONFIG.dependencyMap` in `generate-registry.ts`
