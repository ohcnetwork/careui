# Component Registry

This directory contains individual documentation files for each UI component. Each component has its own file for better maintainability and organization.

The docs app uses lazy loading from `src/lib/registry/index.ts` and generated JSON files are published to `public/registry/care-ui/`.

## Structure

```text
src/lib/registry/
├── index.ts              # Main lazy loader registry
├── accordion.tsx         # Accordion component documentation
├── badge.tsx             # Badge component documentation
├── button.tsx            # Button component documentation
└── ...                   # Other component files
```

## Creating a New Component Registry File

Each component registry file should follow this pattern:

```tsx
import React from 'react'
import { YourComponent } from '@/components/ui/your-component'
import { type ComponentDoc } from '@/lib/types'

export const yourComponentDoc: ComponentDoc = {
  id: 'your-component',
  name: 'Your Component',
  description: 'A brief description of what the component does.',
  installation: {
    cli: 'npx shadcn@latest add your-component',
    manual: 'Copy and paste the component source code into your project.'
  },
  usage: `import { YourComponent } from "@/components/ui/your-component"`,
  examples: [
    {
      name: 'Default',
      description: 'The default variant.',
      code: `<YourComponent>Content</YourComponent>`,
      preview: React.createElement(YourComponent, {}, 'Content')
    }
  ],
  props: [
    {
      name: 'variant',
      type: 'string',
      description: 'The variant of the component.',
      default: '"default"'
    }
  ]
}
```

## Adding a New Component

1. **Create the component file**

   ```bash
   # Create a new file in src/lib/registry/
   touch src/lib/registry/your-component.tsx
   ```

2. **Write the documentation**

   - Follow the pattern shown above
   - Include real component imports
   - Create working preview examples
   - Document all props

3. **Register in index.ts**

   ```ts
   // In src/lib/registry/index.ts
   const componentLoaders = {
     // ... existing components
     'your-component': () =>
       import('./your-component').then((m) => ({ default: m.yourComponentDoc })),
   }
   ```

4. **Regenerate published registry files**

   - Run `pnpm run build:registry`

5. **Test the component**

   - Run `pnpm dev`
   - Navigate to your component in the UI
   - Verify examples render correctly

## Benefits of This Structure

✅ **Maintainability**: Each component in its own file
✅ **Readability**: Easy to find and edit component docs
✅ **Scalability**: Add new components without touching existing ones
✅ **Collaboration**: Reduced merge conflicts
✅ **Organization**: Clear structure and naming conventions

## Migration Guide

To migrate a component from the old `component-registry.ts`:

1. Find the component object in the old file
2. Create a new file in this directory
3. Export the documentation as `{componentName}Doc`
4. Add lazy loader entry in `index.ts`
5. Remove from the old file once verified

## File Naming Convention

- Use kebab-case for filenames: `alert-dialog.tsx`
- Use camelCase for exports: `alertDialogDoc`
- Match the component ID exactly

## Example Components

See these files for reference:

- `accordion.tsx` - Simple component with examples
- `badge.tsx` - Component with variants and props
- `button.tsx` - Component with multiple examples
