import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Separator } from '@/components/ui/separator'

export const separatorDoc: ComponentDoc = {

    id: 'separator',
    name: 'Separator',
    description: 'Visually or semantically separates content.',
    installation: {
      cli: 'npx shadcn@latest add separator',
      manual: 'Copy and paste the separator component source code into your project.'
    },
    usage: `import { Separator } from "@/components/ui/separator"`,
    preview: {
      code: `<Separator />`,
      component: React.createElement('div', { className: 'w-full space-y-4' },
        React.createElement('div', {}, 'Content above'),
        React.createElement(Separator, {}),
        React.createElement('div', {}, 'Content below')
      )
    }
}
