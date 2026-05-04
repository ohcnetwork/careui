import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

// ─── shared data ─────────────────────────────────────────────────────────────

const invoices = [
  { invoice: "INV001", paymentStatus: "Paid",    totalAmount: "$250.00", paymentMethod: "Credit Card"   },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal"        },
  { invoice: "INV003", paymentStatus: "Unpaid",  totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV004", paymentStatus: "Paid",    totalAmount: "$450.00", paymentMethod: "Credit Card"   },
  { invoice: "INV005", paymentStatus: "Paid",    totalAmount: "$550.00", paymentMethod: "PayPal"        },
  { invoice: "INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV007", paymentStatus: "Unpaid",  totalAmount: "$300.00", paymentMethod: "Credit Card"   },
];

// ─── preview component ────────────────────────────────────────────────────────

function TableDemo() {
  return React.createElement(
    Table,
    {},
    React.createElement(TableCaption, {}, "A list of your recent invoices."),
    React.createElement(
      TableHeader,
      {},
      React.createElement(
        TableRow,
        {},
        React.createElement(TableHead, { className: "w-[100px]" }, "Invoice"),
        React.createElement(TableHead, {}, "Status"),
        React.createElement(TableHead, {}, "Method"),
        React.createElement(TableHead, { className: "text-right" }, "Amount")
      )
    ),
    React.createElement(
      TableBody,
      {},
      ...invoices.map((inv) =>
        React.createElement(
          TableRow,
          { key: inv.invoice },
          React.createElement(TableCell, { className: "font-medium" }, inv.invoice),
          React.createElement(TableCell, {}, inv.paymentStatus),
          React.createElement(TableCell, {}, inv.paymentMethod),
          React.createElement(TableCell, { className: "text-right" }, inv.totalAmount)
        )
      )
    ),
    React.createElement(
      TableFooter,
      {},
      React.createElement(
        TableRow,
        {},
        React.createElement(TableCell, { colSpan: 3 }, "Total"),
        React.createElement(TableCell, { className: "text-right" }, "$2,500.00")
      )
    )
  );
}

// ─── Actions example ─────────────────────────────────────────────────────────

const products = [
  { name: "Wireless Mouse",      price: "$29.99"  },
  { name: "Mechanical Keyboard", price: "$129.99" },
  { name: "USB-C Hub",           price: "$49.99"  },
];

function TableActionsDemo() {
  const actionMenu = () =>
    React.createElement(
      DropdownMenu,
      {},
      React.createElement(
        DropdownMenuTrigger,
        { asChild: true },
        React.createElement(
          Button,
          { variant: "ghost", size: "icon", className: "size-8" },
          React.createElement(MoreHorizontal, {}),
          React.createElement("span", { className: "sr-only" }, "Open menu")
        )
      ),
      React.createElement(
        DropdownMenuContent,
        { align: "end" },
        React.createElement(DropdownMenuItem, {}, "Edit"),
        React.createElement(DropdownMenuItem, {}, "Duplicate"),
        React.createElement(DropdownMenuSeparator, {}),
        React.createElement(DropdownMenuItem, { className: "text-destructive" }, "Delete")
      )
    );

  return React.createElement(
    Table,
    {},
    React.createElement(
      TableHeader,
      {},
      React.createElement(
        TableRow,
        {},
        React.createElement(TableHead, {}, "Product"),
        React.createElement(TableHead, {}, "Price"),
        React.createElement(TableHead, { className: "text-right" }, "Actions")
      )
    ),
    React.createElement(
      TableBody,
      {},
      ...products.map((p) =>
        React.createElement(
          TableRow,
          { key: p.name },
          React.createElement(TableCell, { className: "font-medium" }, p.name),
          React.createElement(TableCell, {}, p.price),
          React.createElement(TableCell, { className: "text-right" }, actionMenu())
        )
      )
    )
  );
}

// ─── doc ──────────────────────────────────────────────────────────────────────

export const tableDoc: ComponentDoc = {
  id: "table",
  name: "Table",
  description: "A responsive table component.",
  installation: {
    cli: "npx shadcn@latest add table",
    manual: "Copy and paste the table component source code into your project.",
  },
  usage: `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}`,
  preview: {
    code: `<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-25">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.invoice}>
        <TableCell className="font-medium">{invoice.invoice}</TableCell>
        <TableCell>{invoice.paymentStatus}</TableCell>
        <TableCell>{invoice.paymentMethod}</TableCell>
        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">$2,500.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
    component: React.createElement(TableDemo),
  },
  examples: [
    {
      name: "Footer",
      description: "Use the <TableFooter /> component to add a footer to the table.",
      code: `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  { invoice: "INV001", paymentStatus: "Paid",    totalAmount: "$250.00", paymentMethod: "Credit Card"   },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal"        },
  { invoice: "INV003", paymentStatus: "Unpaid",  totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
]

export function TableFooterExample() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}`,
      preview: React.createElement(TableDemo),
    },
    {
      name: "Actions",
      description: "A table showing actions for each row using a <DropdownMenu /> component.",
      code: `import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableActions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Wireless Mouse</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontal />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`,
      preview: React.createElement(TableActionsDemo),
    },
  ],
};
