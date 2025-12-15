import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export const aspectRatioDoc: ComponentDoc = {

    id: 'aspect-ratio',
    name: 'Aspect Ratio',
    description: 'Displays content within a desired ratio.',
    installation: {
      cli: 'npx shadcn@latest add aspect-ratio',
      manual: 'Copy and paste the aspect ratio component source code into your project.'
    },
    usage: `import { AspectRatio } from "@/components/ui/aspect-ratio"`,
    preview: {
      code: `<AspectRatio ratio={16 / 9}>
  <img src="/image.jpg" alt="Image" className="rounded-md object-cover" />
</AspectRatio>`,
      component: React.createElement('div', { className: 'w-[450px]' },
        React.createElement(AspectRatio, { ratio: 16 / 9, className: 'bg-muted rounded-md' },
          React.createElement('div', { className: 'flex h-full w-full items-center justify-center' },
            React.createElement('span', { className: 'text-sm text-muted-foreground' }, '16:9 Aspect Ratio')
          )
        )
      )
    }
}
