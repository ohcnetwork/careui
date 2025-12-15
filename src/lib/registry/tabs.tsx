import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export const tabsDoc: ComponentDoc = {

    id: 'tabs',
    name: 'Tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    installation: {
      cli: 'npx shadcn@latest add tabs',
      manual: 'Copy and paste the tabs component source code into your project.'
    },
    usage: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`,
    preview: {
      code: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
      component: React.createElement(Tabs, { defaultValue: 'tab1', className: 'w-full' },
        React.createElement(TabsList, {},
          React.createElement(TabsTrigger, { value: 'tab1' }, 'Account'),
          React.createElement(TabsTrigger, { value: 'tab2' }, 'Password')
        ),
        React.createElement(TabsContent, { value: 'tab1' }, 'Account settings content'),
        React.createElement(TabsContent, { value: 'tab2' }, 'Password settings content')
      )
    }
}
