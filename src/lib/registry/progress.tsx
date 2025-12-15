import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Progress } from '@/components/ui/progress'

export const progressDoc: ComponentDoc = {

    id: 'progress',
    name: 'Progress',
    description: 'Displays an indicator showing the completion progress of a task.',
    installation: {
      cli: 'npx shadcn@latest add progress',
      manual: 'Copy and paste the progress component source code into your project.'
    },
    usage: `import { Progress } from "@/components/ui/progress"`,
    preview: {
      code: `<Progress value={33} />`,
      component: React.createElement(Progress, { value: 33 })
    }
}
