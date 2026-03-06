import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/ui/data-table";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";

// ─── Shared data ──────────────────────────────────────────────────────────────

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const payments: Payment[] = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com" },
  { id: "a3b4c5d6", amount: 242, status: "success", email: "alice@company.com" },
  { id: "b7e8f9a0", amount: 67, status: "failed", email: "bob@example.org" },
  { id: "c1d2e3f4", amount: 310, status: "success", email: "carol@work.io" },
  { id: "d5e6f7a8", amount: 89, status: "pending", email: "dave@test.net" },
  { id: "e9f0a1b2", amount: 450, status: "processing", email: "eve@mail.com" },
  { id: "f3a4b5c6", amount: 175, status: "success", email: "frank@example.com" },
  { id: "a7b8c9d0", amount: 222, status: "pending", email: "grace@demo.com" },
  { id: "b1c2d3e4", amount: 399, status: "failed", email: "henry@corp.io" },
  { id: "c5d6e7f8", amount: 55, status: "success", email: "ivy@startup.dev" },
  { id: "d9e0f1a2", amount: 140, status: "processing", email: "jack@biz.com" },
];

const statusVariantMap: Record<Payment["status"], "success" | "info" | "neutral" | "destructive"> = {
  success: "success",
  processing: "info",
  pending: "neutral",
  failed: "destructive",
};

// ─── Full demo columns (with select, sort, actions) ───────────────────────────

const fullColumns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) =>
      React.createElement(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? "indeterminate" : false),
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      React.createElement(Checkbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Email",
      }),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        { variant: statusVariantMap[row.getValue("status") as Payment["status"]] },
        row.getValue("status")
      ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    meta: { className: "text-right" },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return React.createElement(
        "div",
        { className: "font-medium tabular-nums" },
        formatted
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    meta: { className: "w-0" },
    cell: ({ row }) =>
      React.createElement(
        DataTableRowActions,
        {},

        React.createElement(
          DropdownMenuItem,
          {
            onClick: () => navigator.clipboard.writeText(row.original.id),
          },
          "Copy payment ID"
        ),
        React.createElement(DropdownMenuSeparator, {}),
        React.createElement(DropdownMenuItem, {}, "View customer"),
        React.createElement(DropdownMenuItem, {}, "View payment details")
      ),
  },
];

// ─── Basic columns ────────────────────────────────────────────────────────────

const basicColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        { variant: statusVariantMap[row.getValue("status") as Payment["status"]] },
        row.getValue("status")
      ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    meta: { className: "text-right" },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return React.createElement(
        "div",
        { className: "font-medium tabular-nums" },
        formatted
      );
    },
  },
];

// ─── Preview components ───────────────────────────────────────────────────────

const DataTableDemo = () =>
  React.createElement(DataTable as any, {
    columns: fullColumns,
    data: payments,
    filterColumn: "email",
    filterPlaceholder: "Filter emails...",
  });

const DataTableBasicDemo = () =>
  React.createElement(DataTable as any, {
    columns: basicColumns,
    data: payments.slice(0, 5),
  });

// ─── ComponentDoc ─────────────────────────────────────────────────────────────

export const dataTableDoc: ComponentDoc = {
  id: "data-table",
  name: "Data Table",
  description:
    "Powerful table and datagrids built using TanStack Table. Supports sorting, filtering, pagination, column visibility, and row selection.",
  installation: {
    cli: "npx shadcn@latest add table",
    manual:
      "Install @tanstack/react-table, add the Table component, then copy the DataTable component into your project.",
  },
  usage: `import { DataTable } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const columns: ColumnDef<Payment>[] = [
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "amount",
    header: "Amount",
    meta: { className: "text-right" },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)
      return <div className="font-medium tabular-nums">{formatted}</div>
    },
  },
]

export function PaymentsPage() {
  return <DataTable columns={columns} data={payments} filterColumn="email" />
}`,
  preview: {
    code: `"use client"

import * as React from "react"
import {
  type ColumnDef,
} from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/ui/data-table"
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const payments: Payment[] = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com" },
  // ...more rows
]

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariantMap[row.getValue("status")]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    meta: { className: "text-right" },
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(parseFloat(row.getValue("amount")))
      return <div className="font-medium tabular-nums">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    meta: { className: "w-0" },
    cell: ({ row }) => (
      <DataTableRowActions>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(row.original.id)}
        >
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DataTableRowActions>
    ),
  },
]

export function DataTableDemo() {
  return (
    <DataTable
      columns={columns}
      data={payments}
      filterColumn="email"
      filterPlaceholder="Filter emails..."
    />
  )
}`,
    component: React.createElement(DataTableDemo),
  },
  examples: [
    {
      name: "Basic",
      description: "A simple table with status, email, and amount columns.",
      code: `"use client"

import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const statusVariantMap = {
  success: "success",
  processing: "info",
  pending: "neutral",
  failed: "destructive",
} as const

const columns: ColumnDef<Payment>[] = [
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariantMap[row.getValue("status") as Payment["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    meta: { className: "text-right" },
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(parseFloat(row.getValue("amount")))
      return <div className="font-medium tabular-nums">{formatted}</div>
    },
  },
]

export function BasicDataTable() {
  return <DataTable columns={columns} data={payments} />
}`,
      preview: React.createElement(DataTableBasicDemo),
    },
    {
      name: "With Row Actions",
      description:
        "Add a dropdown menu to each row for contextual actions like view, edit, or delete.",
      code: `"use client"

import { Badge } from "@/components/ui/badge"
import { DataTable, DataTableRowActions } from "@/components/ui/data-table"
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { type ColumnDef } from "@tanstack/react-table"

const statusVariantMap = {
  success: "success",
  processing: "info",
  pending: "neutral",
  failed: "destructive",
} as const

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariantMap[row.getValue("status") as Payment["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    meta: { className: "w-0" },
    cell: ({ row }) => (
      <DataTableRowActions>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(row.original.id)}
        >
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DataTableRowActions>
    ),
  },
]`,
      preview: React.createElement(DataTable as any, {
        columns: [
          {
            accessorKey: "email",
            header: "Email",
          },
          {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }: any) =>
              React.createElement(
                Badge,
                { variant: statusVariantMap[row.getValue("status") as Payment["status"]] },
                row.getValue("status")
              ),
          },
          {
            id: "actions",
            enableHiding: false,
            meta: { className: "w-0" },
            cell: ({ row }: any) =>
              React.createElement(
                DataTableRowActions,
                {},
                React.createElement(
                  DropdownMenuItem,
                  {
                    onClick: () =>
                      navigator.clipboard.writeText(row.original.id),
                  },
                  "Copy payment ID"
                ),
                React.createElement(DropdownMenuSeparator, {}),
                React.createElement(DropdownMenuItem, {}, "View customer"),
                React.createElement(
                  DropdownMenuItem,
                  {},
                  "View payment details"
                )
              ),
          },
        ] as ColumnDef<Payment>[],
        data: payments.slice(0, 5),
      }),
    },
    {
      name: "With Sorting",
      description:
        "Use DataTableColumnHeader to make columns sortable by clicking the header.",
      code: `"use client"

import { Badge } from "@/components/ui/badge"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

const statusVariantMap = {
  success: "success",
  processing: "info",
  pending: "neutral",
  failed: "destructive",
} as const

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariantMap[row.getValue("status") as Payment["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    meta: { className: "text-right" },
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(parseFloat(row.getValue("amount")))
      return <div className="font-medium tabular-nums">{formatted}</div>
    },
  },
]

export function SortableDataTable() {
  return (
    <DataTable
      columns={columns}
      data={payments}
      filterColumn="email"
      filterPlaceholder="Filter emails..."
    />
  )
}`,
      preview: React.createElement(DataTable as any, {
        columns: [
          {
            accessorKey: "email",
            header: ({ column }: any) =>
              React.createElement(DataTableColumnHeader, {
                column,
                title: "Email",
              }),
          },
          {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }: any) =>
              React.createElement(
                Badge,
                { variant: statusVariantMap[row.getValue("status") as Payment["status"]] },
                row.getValue("status")
              ),
          },
          {
            accessorKey: "amount",
            header: ({ column }: any) =>
              React.createElement(DataTableColumnHeader, {
                column,
                title: "Amount",
              }),
            meta: { className: "text-right" },
            cell: ({ row }: any) => {
              const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(parseFloat(row.getValue("amount")));
              return React.createElement(
                "div",
                { className: "font-medium tabular-nums" },
                formatted
              );
            },
          },
        ] as ColumnDef<Payment>[],
        data: payments.slice(0, 6),
        filterColumn: "email",
        filterPlaceholder: "Filter emails...",
      }),
    },
  ],
  props: [
    {
      name: "columns",
      type: "ColumnDef<TData, TValue>[]",
      description: "TanStack column definitions for the table.",
    },
    {
      name: "data",
      type: "TData[]",
      description: "The data array to display in the table.",
    },
    {
      name: "filterColumn",
      type: "string",
      description:
        "Key of the column to filter on. Defaults to the first filterable column.",
    },
    {
      name: "filterPlaceholder",
      type: "string",
      description: "Placeholder text for the filter input.",
      default: '"Filter..."',
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the wrapper.",
    },
  ],
};
