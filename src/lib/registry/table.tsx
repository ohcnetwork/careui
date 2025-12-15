import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

export const tableDoc: ComponentDoc = {

    id: 'table',
    name: 'Table',
    description: 'A responsive table component.',
    installation: {
      cli: 'npx shadcn@latest add table',
      manual: 'Copy and paste the table component source code into your project.'
    },
    usage: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"`,
    preview: {
      code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      component: React.createElement(Table, {},
        React.createElement(TableHeader, {},
          React.createElement(TableRow, {},
            React.createElement(TableHead, {}, "Name"),
            React.createElement(TableHead, {}, "Status")
          )
        ),
        React.createElement(TableBody, {},
          React.createElement(TableRow, {},
            React.createElement(TableCell, {}, "John Doe"),
            React.createElement(TableCell, {}, "Active")
          ),
          React.createElement(TableRow, {},
            React.createElement(TableCell, {}, "Jane Smith"),
            React.createElement(TableCell, {}, "Inactive")
          )
        )
      )
    }
}
