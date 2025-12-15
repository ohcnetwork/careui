import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'

export const buttonGroupDoc: ComponentDoc = {
  id: 'button-group',
  name: 'Button Group',
  description: 'A set of related buttons grouped together.',
  installation: {
    cli: 'npx shadcn@latest add button-group',
    manual: 'Copy and paste the button group component source code into your project.'
  },
  usage: `import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  )
}`,
  preview: {
    code: `<ButtonGroup>
  <Button>Left</Button>
  <Button>Middle</Button>
  <Button>Right</Button>
</ButtonGroup>`,
    component: React.createElement(ButtonGroup, {},
      React.createElement(Button, {}, 'Left'),
      React.createElement(Button, {}, 'Middle'),
      React.createElement(Button, {}, 'Right')
    )
  },
  examples: [
    {
      name: 'With Variants',
      description: 'Button group with different button variants.',
      code: `<ButtonGroup>
  <Button variant="outline">Cancel</Button>
  <Button>Submit</Button>
</ButtonGroup>`,
      preview: React.createElement(ButtonGroup, {},
        React.createElement(Button, { variant: 'outline' }, 'Cancel'),
        React.createElement(Button, {}, 'Submit')
      )
    }
  ]
}
