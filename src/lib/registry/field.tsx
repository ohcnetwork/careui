import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Field, FieldLabel, FieldContent, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export const fieldDoc: ComponentDoc = {

    id: 'field',
    name: 'Field',
    description: 'A form field component with label, description, and error message support.',
    installation: {
      cli: 'npx shadcn@latest add field',
      manual: 'Copy and paste the field component source code into your project.'
    },
    usage: `import { Field } from "@/components/ui/field"`,
    preview: {
      code: `<Field>
  <FieldLabel>Email</FieldLabel>
  <FieldContent>
    <Input type="email" />
  </FieldContent>
  <FieldDescription>Enter your email address</FieldDescription>
</Field>`,
      component: React.createElement(Field, {},
        React.createElement(FieldLabel, {}, 'Email'),
        React.createElement(FieldContent, {},
          React.createElement(Input, { type: 'email', placeholder: 'you@example.com' })
        ),
        React.createElement(FieldDescription, {}, 'Enter your email address')
      )
    }
}
