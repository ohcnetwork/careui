import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'

export const breadcrumbDoc: ComponentDoc = {
  id: 'breadcrumb',
  name: 'Breadcrumb',
  description: 'Displays the path to the current resource using a hierarchy of links.',
  installation: {
    cli: 'npx shadcn@latest add breadcrumb',
    manual: 'Copy and paste the breadcrumb component source code into your project.'
  },
  usage: `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
  preview: {
    code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    component: React.createElement(Breadcrumb, {},
      React.createElement(BreadcrumbList, {},
        React.createElement(BreadcrumbItem, {},
          React.createElement(BreadcrumbLink, { href: '/' }, 'Home')
        ),
        React.createElement(BreadcrumbSeparator, {}),
        React.createElement(BreadcrumbItem, {},
          React.createElement(BreadcrumbLink, { href: '/components' }, 'Components')
        ),
        React.createElement(BreadcrumbSeparator, {}),
        React.createElement(BreadcrumbItem, {},
          React.createElement(BreadcrumbPage, {}, 'Breadcrumb')
        )
      )
    )
  }
}
