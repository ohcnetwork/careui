# CareUI - AI Coding Agent Instructions

## Project Overview

CareUI is a **dual-purpose React component library**:
1. **Live Documentation Site** - Vite-powered SPA showcasing components with interactive previews
2. **shadcn/ui-Compatible Registry** - Auto-generated JSON files for CLI-based component installation

**Critical Architecture**: Components serve TWO masters—they must work as React components AND generate valid shadcn registry JSON through automated scripts.

## Core Workflow: Adding Components

### The JSDoc-Driven System

**ALL component metadata flows from JSDoc comments**. The `generate-registry.ts` script reads these to create registry JSON. Missing or incorrect JSDoc breaks the entire installation pipeline.

**Required JSDoc format** (must be BEFORE imports):
```tsx
/**
 * @name component-name          // kebab-case, must match filename
 * @description What it does      // Used in CLI output and docs
 * @dependencies pkg1 pkg2        // Space-separated npm packages
 * @type registry:ui              // registry:ui, registry:block, or registry:component
 */
import * as React from "react";
```

### Three-File Component Pattern

Every component requires exactly THREE files:

1. **Component Implementation** (`src/components/ui/badge.tsx`)
   - Component logic with JSDoc header
   - Export component and variants
   - Must include `data-slot="component-name"` attribute

2. **Documentation** (`src/lib/registry/badge.tsx`)
   - Export `badgeDoc: ComponentDoc` object
   - Use `React.createElement()` for previews (NOT JSX)
   - Why createElement? Docs are executed in isolation; JSX transform unavailable

3. **Auto-Generated Registry** (`public/registry/care-ui/badge/badge.json`)
   - Created by `npm run build:registry`
   - Contains full source code + metadata for CLI installation
   - Never edit manually

### Registration Process

After creating files 1 & 2, register in `src/lib/registry/index.ts`:
```typescript
const componentLoaders = {
  "badge": () => import("./badge").then((m) => ({ default: m.badgeDoc })),
};
```

Then run `npm run build:registry` to generate registry JSON.

## File Structure & Conventions

```
src/
├── components/
│   └── ui/              # Component implementations (JSDoc required)
├── lib/
│   ├── registry/        # Component documentation (React.createElement)
│   │   ├── index.ts     # Lazy-loading registry
│   │   └── _template.tsx  # Copy this for new components
│   └── types.ts         # ComponentDoc interface
scripts/
└── generate-registry.ts # JSDoc → JSON converter
public/
└── registry/care-ui/    # Generated JSON (git-tracked for deployment)
```

**Naming Conventions**:
- Component files: `kebab-case.tsx` (e.g., `alert-dialog.tsx`)
- Doc exports: `camelCase + Doc` (e.g., `alertDialogDoc`)
- Component IDs: `"kebab-case"` strings in registry

## Key Scripts

```bash
npm run dev                  # Start Vite dev server (localhost:5173)
npm run build:registry       # Generate registry JSON from JSDoc
npm run registry:watch       # Auto-regenerate on file changes
npm run build               # Build for production (includes registry generation via prepublishOnly)
```

**Critical**: Run `build:registry` after ANY change to:
- Component JSDoc metadata
- Component source code (reflected in JSON content)
- New component registration

## Component Patterns

### Using class-variance-authority (CVA)

ALL components use CVA for variants:
```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "md" },
});

function Button({ variant, size, className, ...props }:
  React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>
) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### Data Attributes for Component Identification

Use `data-slot` for main components and `data-icon` for icon positioning:
```tsx
<button data-slot="button">
  <Icon data-icon="inline-start" />
  Text
</button>
```

### Documentation React.createElement Pattern

```tsx
// ❌ WRONG - JSX won't work in docs
preview: {
  component: <Badge variant="outline">Badge</Badge>
}

// ✅ CORRECT - Use React.createElement
preview: {
  component: React.createElement(Badge, { variant: "outline" }, "Badge")
}

// For icons with data attributes
React.createElement(Mail, { ["data-icon"]: "inline-start" } as any)
```

## Dependency Management

### Auto-Detection System

`generate-registry.ts` scans imports and maps them via `CONFIG.dependencyMap`:
```typescript
dependencyMap: {
  '@radix-ui/react-dialog': ['@radix-ui/react-dialog'],
  'class-variance-authority': ['class-variance-authority'],
  'vaul': ['vaul'],
}
```

**To add new dependency mapping**: Update this map in `generate-registry.ts` when adding packages not yet tracked.

## Common Gotchas

1. **JSDoc Missing/Malformed**: Registry JSON won't generate or will have incorrect metadata
2. **Forgot data-slot**: Component works locally but doesn't follow project conventions
3. **JSX in Documentation**: Causes runtime errors; always use `React.createElement()`
4. **Registry Not Updated**: Changes don't appear in CLI; forgot to run `build:registry`
5. **Import Paths**: Always use `@/` aliases (configured in tsconfig.json via `paths`)

## Testing New Components

1. **Local UI**: `npm run dev` → verify component in sidebar
2. **Registry JSON**: Check `public/registry/care-ui/component-name/component-name.json` exists
3. **CLI Install**: Test in separate project:
   ```bash
   npx shadcn@latest add component-name --registry http://localhost:5173
   ```

## Tailwind CSS 4 Specifics

Using Tailwind CSS v4 with CSS variables:
- Custom properties: `--color-primary-950`, `--radius-md`
- New syntax: `border-(--color-primary-700)`, `has-data-[icon=inline-start]:pl-3`
- CSS import: `@import "tailwindcss";` in `src/index.css`

## Important Files to Reference

- **Component Template**: `src/lib/registry/_template.tsx`
- **Type Definitions**: `src/lib/types.ts` → `ComponentDoc` interface
- **Registry Logic**: `src/lib/registry/index.ts` → lazy loading setup
- **Generation Script**: `scripts/generate-registry.ts` → understand JSDoc parsing
- **Example Component**: `src/components/ui/button.tsx` + `src/lib/registry/button.tsx`

## MCP-Powered Component Workflow

When adding components using shadcn MCP tools, follow this sequence:

### 1. Discovery Phase
```typescript
// Search available components
mcp_shadcn_list_items_in_registries({ registries: ["@shadcn"] })

// View specific component details
mcp_shadcn_view_items_in_registries({ items: ["@shadcn/badge"] })

// Find usage examples
mcp_shadcn_get_item_examples_from_registries({
  registries: ["@shadcn"],
  query: "badge-demo"
})
```

### 2. Installation
```bash
pnpm dlx shadcn@latest add badge
```

### 3. Adaptation (CRITICAL)
After installation, immediately:
- Add JSDoc metadata before imports
- Add `data-slot` attribute to component
- Verify component exports

### 4. Documentation
Create `src/lib/registry/badge.tsx` with `React.createElement()` previews

### 5. Registration
Add to `src/lib/registry/index.ts` loader

### 6. Generation
```bash
npm run build:registry
```

### 7. Verification
Test locally (`npm run dev`) and via CLI (`npx shadcn@latest add badge --registry http://localhost:5173`)

## When Making Changes

**Before modifying any component**:
1. Read its JSDoc header (affects registry)
2. Check if it's registered in `src/lib/registry/index.ts`
3. Verify registry JSON exists in `public/registry/care-ui/`

**After adding/modifying components**:
1. Add/update JSDoc in component file
2. Create/update doc file in `src/lib/registry/`
3. Register in `src/lib/registry/index.ts`
4. Run `npm run build:registry`
5. Test with `npm run dev`
6. Verify registry JSON updated

This ensures components work both as UI elements AND as CLI-installable packages.
