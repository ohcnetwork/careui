import React from 'react'
import { Button } from '@/components/ui/button'
import { type ComponentDoc } from '@/lib/types'

export const buttonDoc: ComponentDoc = {
  id: 'button',
  name: 'Button',
  description: 'Displays a button or a component that looks like a button.',
  installation: {
    cli: 'npx shadcn@latest add button',
    manual: 'Copy and paste the button component source code into your project.'
  },
  usage: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Click me</Button>
}`,
  preview: {
    code: `<div className="flex gap-2 flex-wrap">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`,
    component: React.createElement('div', { className: 'flex gap-2 flex-wrap' },
      React.createElement(Button, {}, 'Default'),
      React.createElement(Button, { variant: 'secondary' }, 'Secondary'),
      React.createElement(Button, { variant: 'destructive' }, 'Destructive'),
      React.createElement(Button, { variant: 'outline' }, 'Outline'),
      React.createElement(Button, { variant: 'ghost' }, 'Ghost'),
      React.createElement(Button, { variant: 'link' }, 'Link')
    )
  },
  examples: [
    {
      name: 'Sizes',
      description: 'Different button sizes.',
      code: `<div className="flex gap-2 items-center flex-wrap">
  <Button size="sm">Small</Button>
  <Button>Default</Button>
  <Button size="lg">Large</Button>
</div>`,
      preview: React.createElement('div', { className: 'flex gap-2 items-center flex-wrap' },
        React.createElement(Button, { size: 'sm' }, 'Small'),
        React.createElement(Button, {}, 'Default'),
        React.createElement(Button, { size: 'lg' }, 'Large')
      )
    }
  ]
}
