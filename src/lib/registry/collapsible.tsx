import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  ChevronsUpDown,
  ChevronDown,
  ChevronRight,
  FileIcon,
  FolderIcon,
  MaximizeIcon,
  MinimizeIcon,
} from "lucide-react";

// ─── Main demo component ──────────────────────────────────────────────────────

const CollapsibleDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return React.createElement(
    Collapsible,
    {
      open: isOpen,
      onOpenChange: setIsOpen,
      className: "flex w-[350px] flex-col gap-2",
    },
    React.createElement(
      "div",
      { className: "flex items-center justify-between gap-4 px-4" },
      React.createElement(
        "h4",
        { className: "text-sm font-semibold" },
        "Order #4189"
      ),
      React.createElement(
        CollapsibleTrigger,
        { asChild: true },
        React.createElement(
          Button,
          { variant: "ghost", size: "icon", className: "size-8" },
          React.createElement(ChevronsUpDown, {}),
          React.createElement("span", { className: "sr-only" }, "Toggle details")
        )
      )
    ),
    React.createElement(
      "div",
      {
        className:
          "flex items-center justify-between rounded-md border px-4 py-2 text-sm",
      },
      React.createElement(
        "span",
        { className: "text-muted-foreground" },
        "Status"
      ),
      React.createElement("span", { className: "font-medium" }, "Shipped")
    ),
    React.createElement(
      CollapsibleContent,
      { className: "flex flex-col gap-2" },
      React.createElement(
        "div",
        { className: "rounded-md border px-4 py-2 text-sm" },
        React.createElement("p", { className: "font-medium" }, "Shipping address"),
        React.createElement(
          "p",
          { className: "text-muted-foreground" },
          "100 Market St, San Francisco"
        )
      ),
      React.createElement(
        "div",
        { className: "rounded-md border px-4 py-2 text-sm" },
        React.createElement("p", { className: "font-medium" }, "Items"),
        React.createElement(
          "p",
          { className: "text-muted-foreground" },
          "2x Studio Headphones"
        )
      )
    )
  );
};

// ─── Basic example component ──────────────────────────────────────────────────

const CollapsibleBasic = () => {
  return React.createElement(
    Card,
    { className: "mx-auto w-full max-w-sm" },
    React.createElement(
      CardContent,
      {},
      React.createElement(
        Collapsible,
        { className: "rounded-md data-[state=open]:bg-muted" },
        React.createElement(
          CollapsibleTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "ghost", className: "group w-full" },
            "Product details",
            React.createElement(ChevronDown, {
              className:
                "ml-auto group-data-[state=open]:rotate-180 transition-transform",
            })
          )
        ),
        React.createElement(
          CollapsibleContent,
          { className: "flex flex-col items-start gap-2 p-2.5 pt-0 text-sm" },
          React.createElement(
            "div",
            {},
            "This panel can be expanded or collapsed to reveal additional content."
          ),
          React.createElement(Button, { size: "xs" }, "Learn More")
        )
      )
    )
  );
};

// ─── Settings Panel example component ────────────────────────────────────────

const CollapsibleSettings = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return React.createElement(
    Card,
    { className: "mx-auto w-full max-w-xs", size: "sm" } as any,
    React.createElement(
      CardHeader,
      {},
      React.createElement(CardTitle, {}, "Radius"),
      React.createElement(
        CardDescription,
        {},
        "Set the corner radius of the element."
      )
    ),
    React.createElement(
      CardContent,
      {},
      React.createElement(
        Collapsible,
        {
          open: isOpen,
          onOpenChange: setIsOpen,
          className: "flex items-start gap-2",
        },
        React.createElement(
          FieldGroup,
          { className: "grid w-full grid-cols-2 gap-2" },
          React.createElement(
            Field,
            {},
            React.createElement(FieldLabel, { className: "sr-only" }, "Radius X"),
            React.createElement(Input, { placeholder: "0", defaultValue: "0" })
          ),
          React.createElement(
            Field,
            {},
            React.createElement(FieldLabel, { className: "sr-only" }, "Radius Y"),
            React.createElement(Input, { placeholder: "0", defaultValue: "0" })
          ),
          React.createElement(
            CollapsibleContent,
            { className: "col-span-full grid grid-cols-2 gap-2" },
            React.createElement(
              Field,
              {},
              React.createElement(
                FieldLabel,
                { className: "sr-only" },
                "Radius X"
              ),
              React.createElement(Input, { placeholder: "0", defaultValue: "0" })
            ),
            React.createElement(
              Field,
              {},
              React.createElement(
                FieldLabel,
                { className: "sr-only" },
                "Radius Y"
              ),
              React.createElement(Input, { placeholder: "0", defaultValue: "0" })
            )
          )
        ),
        React.createElement(
          CollapsibleTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "outline", size: "icon" },
            isOpen
              ? React.createElement(MinimizeIcon, {})
              : React.createElement(MaximizeIcon, {})
          )
        )
      )
    )
  );
};

// ─── File Tree example component ─────────────────────────────────────────────

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] };

const renderFileTreeItem = (fileItem: FileTreeItem): React.ReactNode => {
  if ("items" in fileItem) {
    return React.createElement(
      Collapsible,
      { key: fileItem.name },
      React.createElement(
        CollapsibleTrigger,
        { asChild: true },
        React.createElement(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className:
              "group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground",
          },
          React.createElement(ChevronRight, {
            className:
              "transition-transform group-data-[state=open]:rotate-90",
          }),
          React.createElement(FolderIcon, {}),
          fileItem.name
        )
      ),
      React.createElement(
        CollapsibleContent,
        { className: "mt-1 ml-5" },
        React.createElement(
          "div",
          { className: "flex flex-col gap-1" },
          ...fileItem.items.map((child) => renderFileTreeItem(child))
        )
      )
    );
  }
  return React.createElement(
    Button,
    {
      key: fileItem.name,
      variant: "link",
      size: "sm",
      className: "w-full justify-start gap-2 text-foreground",
    },
    React.createElement(FileIcon, {}),
    React.createElement("span", {}, fileItem.name)
  );
};

const CollapsibleFileTree = () => {
  const fileTree: FileTreeItem[] = [
    {
      name: "components",
      items: [
        {
          name: "ui",
          items: [
            { name: "button.tsx" },
            { name: "card.tsx" },
            { name: "dialog.tsx" },
          ],
        },
        { name: "login-form.tsx" },
      ],
    },
    {
      name: "lib",
      items: [{ name: "utils.ts" }, { name: "api.ts" }],
    },
    { name: "app.tsx" },
    { name: "globals.css" },
    { name: "package.json" },
  ];

  return React.createElement(
    Card,
    { className: "mx-auto w-full max-w-[16rem]", size: "sm" } as any,
    React.createElement(
      CardContent,
      {},
      React.createElement(
        "div",
        { className: "flex flex-col gap-1" },
        ...fileTree.map((item) => renderFileTreeItem(item))
      )
    )
  );
};

// ─── ComponentDoc ─────────────────────────────────────────────────────────────

export const collapsibleDoc: ComponentDoc = {
  id: "collapsible",
  name: "Collapsible",
  description: "An interactive component which expands/collapses a panel.",
  installation: {
    cli: "npx shadcn@latest add collapsible",
    manual:
      "Install radix-ui, then copy and paste the collapsible component source code into your project.",
  },
  usage: `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </CollapsibleContent>
</Collapsible>`,
  preview: {
    code: `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">Order #4189</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle details</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
        <span className="text-muted-foreground">Status</span>
        <span className="font-medium">Shipped</span>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 text-sm">
          <p className="font-medium">Shipping address</p>
          <p className="text-muted-foreground">100 Market St, San Francisco</p>
        </div>
        <div className="rounded-md border px-4 py-2 text-sm">
          <p className="font-medium">Items</p>
          <p className="text-muted-foreground">2x Studio Headphones</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}`,
    component: React.createElement(CollapsibleDemo),
  },
  examples: [
    {
      name: "Basic",
      description: "A simple collapsible with a toggle trigger.",
      code: `import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

export function CollapsibleBasic() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent>
        <Collapsible className="rounded-md data-[state=open]:bg-muted">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="group w-full">
              Product details
              <ChevronDown className="ml-auto group-data-[state=open]:rotate-180 transition-transform" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
            <div>
              This panel can be expanded or collapsed to reveal additional
              content.
            </div>
            <Button size="xs">Learn More</Button>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}`,
      preview: React.createElement(CollapsibleBasic),
    },
    {
      name: "Settings Panel",
      description: "Use a trigger button to reveal additional settings.",
      code: `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { MaximizeIcon, MinimizeIcon } from "lucide-react"

export function CollapsibleSettings() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Card className="mx-auto w-full max-w-xs" size="sm">
      <CardHeader>
        <CardTitle>Radius</CardTitle>
        <CardDescription>Set the corner radius of the element.</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="flex items-start gap-2"
        >
          <FieldGroup className="grid w-full grid-cols-2 gap-2">
            <Field>
              <FieldLabel className="sr-only">Radius X</FieldLabel>
              <Input placeholder="0" defaultValue={0} />
            </Field>
            <Field>
              <FieldLabel className="sr-only">Radius Y</FieldLabel>
              <Input placeholder="0" defaultValue={0} />
            </Field>
            <CollapsibleContent className="col-span-full grid grid-cols-2 gap-2">
              <Field>
                <FieldLabel className="sr-only">Radius X</FieldLabel>
                <Input placeholder="0" defaultValue={0} />
              </Field>
              <Field>
                <FieldLabel className="sr-only">Radius Y</FieldLabel>
                <Input placeholder="0" defaultValue={0} />
              </Field>
            </CollapsibleContent>
          </FieldGroup>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="icon">
              {isOpen ? <MinimizeIcon /> : <MaximizeIcon />}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </CardContent>
    </Card>
  )
}`,
      preview: React.createElement(CollapsibleSettings),
    },
    {
      name: "File Tree",
      description: "Use nested collapsibles to build a file tree.",
      code: `import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronRight, FileIcon, FolderIcon } from "lucide-react"

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] }

export function CollapsibleFileTree() {
  const fileTree: FileTreeItem[] = [
    {
      name: "components",
      items: [
        {
          name: "ui",
          items: [
            { name: "button.tsx" },
            { name: "card.tsx" },
            { name: "dialog.tsx" },
          ],
        },
        { name: "login-form.tsx" },
      ],
    },
    {
      name: "lib",
      items: [{ name: "utils.ts" }, { name: "api.ts" }],
    },
    { name: "app.tsx" },
    { name: "globals.css" },
    { name: "package.json" },
  ]

  const renderItem = (fileItem: FileTreeItem) => {
    if ("items" in fileItem) {
      return (
        <Collapsible key={fileItem.name}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="transition-transform group-data-[state=open]:rotate-90" />
              <FolderIcon />
              {fileItem.name}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-1 ml-5">
            <div className="flex flex-col gap-1">
              {fileItem.items.map((child) => renderItem(child))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }
    return (
      <Button
        key={fileItem.name}
        variant="link"
        size="sm"
        className="w-full justify-start gap-2 text-foreground"
      >
        <FileIcon />
        <span>{fileItem.name}</span>
      </Button>
    )
  }

  return (
    <Card className="mx-auto w-full max-w-[16rem]" size="sm">
      <CardContent>
        <div className="flex flex-col gap-1">
          {fileTree.map((item) => renderItem(item))}
        </div>
      </CardContent>
    </Card>
  )
}`,
      preview: React.createElement(CollapsibleFileTree),
    },
  ],
};
