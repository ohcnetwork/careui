import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export const sonnerDoc: ComponentDoc = {

    id: 'sonner',
    name: 'Sonner',
    description: 'An opinionated toast component for React.',
    installation: {
      cli: 'npx shadcn@latest add sonner',
      manual: 'Copy and paste the sonner component source code into your project.'
    },
    usage: `import { toast } from "sonner"`,
    preview: {
      code: `toast("Event has been created")`,
      component: React.createElement(Button, {
        onClick: () => toast('Event has been created')
      }, 'Show Toast')
    }
}
