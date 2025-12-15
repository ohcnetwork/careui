import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Input } from '@/components/ui/input'

export const inputDoc: ComponentDoc = {

    id: 'input',
    name: 'Input',
    description: 'Displays a form input field or a component that looks like an input field.',
    installation: {
      cli: 'npx shadcn@latest add input',
      manual: 'Copy and paste the input component source code into your project.'
    },
    usage: `import { Input } from "@/components/ui/input"

<Input type="email" placeholder="Email" />`,
    preview: {
      code: '<Input type="text" placeholder="Enter your name" />',
      component: React.createElement(Input, { type: 'text', placeholder: 'Enter your name' })
    },
    examples: [
      {
        name: 'Email',
        description: 'An email input field.',
        code: '<Input type="email" placeholder="Email" />',
        preview: React.createElement(Input, { type: 'email', placeholder: 'Email' })
      },
      {
        name: 'Password',
        description: 'A password input field.',
        code: '<Input type="password" placeholder="Password" />',
        preview: React.createElement(Input, { type: 'password', placeholder: 'Password' })
      },
      {
        name: 'Disabled',
        description: 'A disabled input field.',
        code: '<Input placeholder="Disabled" disabled />',
        preview: React.createElement(Input, { placeholder: 'Disabled', disabled: true })
      }
    ],
    props: [
      {
        name: 'type',
        type: 'string',
        description: 'The type of input field.',
        default: '"text"'
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text for the input.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Whether the input is disabled.',
        default: 'false'
      }
    ]
}
