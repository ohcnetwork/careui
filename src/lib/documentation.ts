import { type DocumentationPage } from '@/lib/types'

export const documentationPages: Record<string, DocumentationPage> = {
  'get-started': {
    id: 'get-started',
    title: 'Get Started',
    description: 'Learn how to install and set up Care UI in your React project.',
    content: {
      sections: [
        {
          title: 'Installation',
          content: 'Care UI is built on top of Tailwind CSS and Radix UI primitives. You can install components individually using the CLI or copy the source code directly.',
          code: `# Install via CLI (recommended)
npx shadcn@latest init

# Add components
npx shadcn@latest add button input

# Or install from Care UI registry
npx shadcn@latest add button --registry https://careui.vercel.app`
        },
        {
          title: 'Configuration',
          content: 'Make sure your project is configured with Tailwind CSS and the necessary dependencies.',
          code: `// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
        },
        {
          title: 'Usage',
          content: 'Import components and use them in your React application.',
          code: `import { Button } from "@/components/careui/button"
import { Input } from "@/components/careui/input"

export function MyForm() {
  return (
    <div className="space-y-4">
      <Input placeholder="Enter your email" />
      <Button>Get started</Button>
    </div>
  )
}`
        },
        {
          title: 'TypeScript Support',
          content: 'All components are written in TypeScript and include full type definitions.',
          code: `// Components are fully typed
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline"
  size?: "default" | "sm" | "lg"
}`
        }
      ]
    }
  },
  'accessibility': {
    id: 'accessibility',
    title: 'Accessibility',
    description: 'Care UI components are designed with accessibility as a core principle. Learn about the accessibility features and best practices.',
    content: {
      sections: [
        {
          title: 'Design Principles',
          content: 'All Care UI components follow WCAG 2.1 guidelines and are built with accessibility in mind from the ground up.',
        },
        {
          title: 'Keyboard Navigation',
          content: 'All interactive components support full keyboard navigation with proper focus management.',
          code: `// Example: Button component
// - Tab: Focus the button
// - Enter/Space: Activate the button
// - Escape: Remove focus (where applicable)

<Button onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick()
  }
}}>
  Accessible Button
</Button>`
        },
        {
          title: 'ARIA Support',
          content: 'Components include proper ARIA attributes for screen reader compatibility.',
          code: `// Form components with proper labeling
<div className="space-y-4">
  <div>
    <Label htmlFor="email">Email Address</Label>
    <Input
      id="email"
      type="email"
      aria-describedby="email-error"
      aria-invalid={hasError}
    />
    {hasError && (
      <div id="email-error" role="alert">
        Please enter a valid email address
      </div>
    )}
  </div>
</div>`
        },
        {
          title: 'Screen Reader Support',
          content: 'All components work seamlessly with popular screen readers like NVDA, JAWS, and VoiceOver.',
        },
        {
          title: 'Focus Management',
          content: 'Proper focus indicators and focus trapping for modal components.',
          code: `// Dialog components manage focus automatically
<Dialog open={isOpen}>
  <DialogContent>
    <DialogTitle>Settings</DialogTitle>
    <DialogDescription>
      Manage your account settings
    </DialogDescription>
    {/* Focus is trapped within the dialog */}
  </DialogContent>
</Dialog>`
        },
        {
          title: 'Color Contrast',
          content: 'All color combinations meet WCAG AA standards for color contrast ratios (minimum 4.5:1 for normal text).',
        }
      ]
    }
  },
  'contributing': {
    id: 'contributing',
    title: 'Contributing',
    description: 'Learn how to add or modify components in Care UI. Follow this guide to maintain consistency and quality.',
    content: {
      sections: [
        {
          title: 'Adding a New Component',
          content: 'Follow these steps to add a new component to Care UI. This ensures proper integration with the registry and documentation.',
        },
        {
          title: 'Step 1: Create Component File',
          content: 'Create your component in the ui directory with proper JSDoc metadata.',
          code: `// src/components/ui/my-component.tsx
/**
 * @name my-component
 * @description A brief description of what it does
 * @dependencies package-name-if-any
 * @type registry:ui
 */
import { cn } from "@/lib/utils"

export function MyComponent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("base-styles", className)}
      {...props}
    />
  )
}`
        },
        {
          title: 'Step 2: Create Documentation',
          content: 'Add documentation with examples and props in the registry directory.',
          code: `// src/lib/registry/my-component.tsx
import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { MyComponent } from '@/components/ui/my-component'

export const myComponentDoc: ComponentDoc = {
  id: 'my-component',
  name: 'MyComponent',
  description: 'Description of your component',
  preview: {
    component: <MyComponent>Preview</MyComponent>,
    code: \`<MyComponent>Example</MyComponent>\`
  },
  examples: [
    {
      name: 'Basic Usage',
      description: 'Simple example',
      preview: <MyComponent />,
      code: \`<MyComponent />\`
    }
  ],
  props: [
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes'
    }
  ]
}`
        },
        {
          title: 'Step 3: Export from Registry',
          content: 'Add your component to the registry index file.',
          code: `// src/lib/registry/index.ts
export { myComponentDoc } from './my-component'

// Add to componentLoaders
const componentLoaders = {
  // ... existing components
  'my-component': () => import('./my-component').then(m => m.myComponentDoc),
}`
        },
        {
          title: 'Step 4: Generate Registry Files',
          content: 'Run the generation script to create JSON files for the shadcn registry.',
          code: `# Generate registry JSON files
npx tsx scripts/generate-registry.ts

# Copy to public directory
cp -r registry/care-ui public/registry/`
        },
        {
          title: 'Step 5: Test Locally',
          content: 'Start the development server and verify your component appears correctly.',
          code: `# Start dev server
pnpm dev

# Visit http://localhost:5173
# Navigate to your component in the sidebar
# Verify preview, code, examples, and props`
        },
        {
          title: 'Modifying Existing Components',
          content: 'When updating components, follow these steps to keep everything in sync.',
        },
        {
          title: 'Update Workflow',
          content: 'Edit the component, update docs if needed, then regenerate the registry.',
          code: `# 1. Edit component source
# src/components/ui/button.tsx

# 2. Update documentation (if needed)
# src/lib/registry/button.tsx

# 3. Regenerate registry
npx tsx scripts/generate-registry.ts && \\
cp -r registry/care-ui public/registry/

# 4. Test changes
pnpm dev

# 5. Commit and deploy
git add . && \\
git commit -m "Update button component" && \\
git push`
        },
        {
          title: 'Quick Reference',
          content: 'One-liner command for quick updates after modifying components.',
          code: `# Complete update workflow
npx tsx scripts/generate-registry.ts && \\
cp -r registry/care-ui public/registry/ && \\
git add . && \\
git commit -m "Update components" && \\
git push`
        },
        {
          title: 'Files You\'ll Touch',
          content: 'Always edit: Component source (src/components/ui/), Documentation (src/lib/registry/). Never manually edit: Generated JSON files in registry/ or public/registry/.',
        },
        {
          title: 'Best Practices',
          content: 'Follow these guidelines for maintaining component quality and consistency.',
          code: `// ✅ DO: Use semantic HTML
<button type="button" {...props}>Click me</button>

// ✅ DO: Include proper TypeScript types
interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline'
}

// ✅ DO: Support className merging
className={cn("base-classes", className)}

// ✅ DO: Add accessibility attributes
<button aria-label="Close" aria-pressed={isPressed}>

// ❌ DON'T: Hardcode styles without className support
<div style={{ color: 'red' }}>Bad</div>

// ❌ DON'T: Forget to export from registry index
// Always add to src/lib/registry/index.ts`
        }
      ]
    }
  }
}
