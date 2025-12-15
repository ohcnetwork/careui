import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export const sheetDoc: ComponentDoc = {

    id: 'sheet',
    name: 'Sheet',
    description: 'Extends the Dialog component to display content that complements the main content of the screen.',
    installation: {
      cli: 'npx shadcn@latest add sheet',
      manual: 'Copy and paste the sheet component source code into your project.'
    },
    usage: `import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"`,
    preview: {
      code: `<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>Content</SheetContent>
</Sheet>`,
      component: React.createElement(Sheet, {},
        React.createElement(SheetTrigger, { asChild: true },
          React.createElement(Button, { variant: 'outline' }, 'Open Sheet')
        ),
        React.createElement(SheetContent, {},
          React.createElement(SheetHeader, {},
            React.createElement(SheetTitle, {}, 'Edit profile'),
            React.createElement(SheetDescription, {}, 'Make changes to your profile here. Click save when you\'re done.')
          )
        )
      )
    }
}
