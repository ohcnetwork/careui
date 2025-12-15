import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Kbd } from '@/components/ui/kbd'

export const kbdDoc: ComponentDoc = {

    id: 'kbd',
    name: 'Kbd',
    description: 'Displays keyboard input or keyboard shortcuts.',
    installation: {
      cli: 'npx shadcn@latest add kbd',
      manual: 'Copy and paste the kbd component source code into your project.'
    },
    usage: `import { Kbd } from "@/components/ui/kbd"`,
    preview: {
      code: `<Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>`,
      component: React.createElement('div', { className: 'flex items-center gap-1' },
        React.createElement(Kbd, {}, 'Ctrl'),
        React.createElement('span', {}, '+'),
        React.createElement(Kbd, {}, 'C')
      )
    }
}
