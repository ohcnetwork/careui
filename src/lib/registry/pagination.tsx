import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination'

export const paginationDoc: ComponentDoc = {

    id: 'pagination',
    name: 'Pagination',
    description: 'Pagination with page navigation, built using the Button component.',
    installation: {
      cli: 'npx shadcn@latest add pagination',
      manual: 'Install lucide-react dependency and copy the pagination component source code into your project.'
    },
    usage: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    preview: {
      code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
      component: React.createElement(Pagination, {},
        React.createElement(PaginationContent, {},
          React.createElement(PaginationItem, {},
            React.createElement(PaginationPrevious, { href: '#' })
          ),
          React.createElement(PaginationItem, {},
            React.createElement(PaginationLink, { href: '#' }, '1')
          ),
          React.createElement(PaginationItem, {},
            React.createElement(PaginationLink, { href: '#', isActive: true }, '2')
          ),
          React.createElement(PaginationItem, {},
            React.createElement(PaginationLink, { href: '#' }, '3')
          ),
          React.createElement(PaginationItem, {},
            React.createElement(PaginationNext, { href: '#' })
          )
        )
      )
    },
    examples: [
      {
        name: 'With Ellipsis',
        description: 'Pagination with ellipsis for large page sets.',
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        5
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
        preview: React.createElement(Pagination, {},
          React.createElement(PaginationContent, {},
            React.createElement(PaginationItem, {},
              React.createElement(PaginationPrevious, { href: '#' })
            ),
            React.createElement(PaginationItem, {},
              React.createElement(PaginationLink, { href: '#' }, '1')
            ),
            React.createElement(PaginationItem, {},
              React.createElement(PaginationEllipsis, {})
            ),
            React.createElement(PaginationItem, {},
              React.createElement(PaginationLink, { href: '#', isActive: true }, '5')
            ),
            React.createElement(PaginationItem, {},
              React.createElement(PaginationEllipsis, {})
            ),
            React.createElement(PaginationItem, {},
              React.createElement(PaginationLink, { href: '#' }, '10')
            ),
            React.createElement(PaginationItem, {},
              React.createElement(PaginationNext, { href: '#' })
            )
          )
        )
      },
      {
        name: 'Minimal',
        description: 'Simple pagination with just previous/next buttons.',
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
        preview: React.createElement(Pagination, {},
          React.createElement(PaginationContent, {},
            React.createElement(PaginationItem, {},
              React.createElement(PaginationPrevious, { href: '#' })
            ),
            React.createElement(PaginationItem, {},
              React.createElement(PaginationNext, { href: '#' })
            )
          )
        )
      }
    ],
    props: [
      {
        name: 'href',
        type: 'string',
        description: 'The URL that the pagination item should navigate to.',
      },
      {
        name: 'isActive',
        type: 'boolean',
        description: 'Whether this page is the currently active page.',
        default: 'false'
      },
      {
        name: 'size',
        type: '"default" | "sm" | "lg" | "icon"',
        description: 'The size of the pagination buttons.',
        default: '"default"'
      }
    ]
}
