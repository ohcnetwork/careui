import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu'

export const navigationMenuDoc: ComponentDoc = {

    id: 'navigation-menu',
    name: 'Navigation Menu',
    description: 'A collection of links for navigating websites.',
    installation: {
      cli: 'npx shadcn@latest add navigation-menu',
      manual: 'Copy and paste the navigation menu component source code into your project.'
    },
    usage: `import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"`,
    preview: {
      code: `<NavigationMenu>
  <NavigationMenuItem>
    <NavigationMenuLink>Home</NavigationMenuLink>
  </NavigationMenuItem>
  <NavigationMenuItem>
    <NavigationMenuLink>About</NavigationMenuLink>
  </NavigationMenuItem>
</NavigationMenu>`,
      component: React.createElement(NavigationMenu, {},
        React.createElement(NavigationMenuList, {},
          React.createElement(NavigationMenuItem, {},
            React.createElement(NavigationMenuTrigger, {}, 'Getting started'),
            React.createElement(NavigationMenuContent, {},
              React.createElement('ul', { className: 'grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]' },
                React.createElement('li', { className: 'row-span-3' },
                  React.createElement(NavigationMenuLink, { asChild: true },
                    React.createElement('a', { className: 'flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md', href: '/' },
                      React.createElement('div', { className: 'mb-2 mt-4 text-lg font-medium' }, 'Care UI'),
                      React.createElement('p', { className: 'text-sm leading-tight text-muted-foreground' }, 'Beautiful components for modern web applications.')
                    )
                  )
                )
              )
            )
          )
        )
      )
    }
}
