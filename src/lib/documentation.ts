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
          code: `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  }
}
