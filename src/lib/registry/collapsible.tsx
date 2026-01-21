import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

export const collapsibleDoc: ComponentDoc = {
  id: "collapsible",
  name: "Collapsible",
  description: "An interactive component which expands/collapses a panel.",
  installation: {
    cli: "npx shadcn@latest add collapsible",
    manual:
      "Copy and paste the collapsible component source code into your project.",
  },
  usage: `"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}`,
  preview: {
    code: `<Collapsible
  open={isOpen}
  onOpenChange={setIsOpen}
  className="flex w-[350px] flex-col gap-2"
>
  <div className="flex items-center justify-between gap-4 px-4">
    <h4 className="text-sm font-semibold">
      @peduarte starred 3 repositories
    </h4>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="icon" className="size-8">
        <ChevronsUpDown />
        <span className="sr-only">Toggle</span>
      </Button>
    </CollapsibleTrigger>
  </div>
  <div className="rounded-md border px-4 py-2 font-mono text-sm">
    @radix-ui/primitives
  </div>
  <CollapsibleContent className="flex flex-col gap-2">
    <div className="rounded-md border px-4 py-2 font-mono text-sm">
      @radix-ui/colors
    </div>
    <div className="rounded-md border px-4 py-2 font-mono text-sm">
      @stitches/react
    </div>
  </CollapsibleContent>
</Collapsible>`,
    component: React.createElement(
      Collapsible,
      { className: "flex w-[350px] flex-col gap-2" },
      React.createElement(
        "div",
        { className: "flex items-center justify-between gap-4 px-4" },
        React.createElement(
          "h4",
          { className: "text-sm font-semibold" },
          "@peduarte starred 3 repositories"
        ),
        React.createElement(
          CollapsibleTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "ghost", size: "icon", className: "size-8" },
            React.createElement(ChevronsUpDown, {}),
            React.createElement("span", { className: "sr-only" }, "Toggle")
          )
        )
      ),
      React.createElement(
        "div",
        { className: "rounded-md border px-4 py-2 font-mono text-sm" },
        "@radix-ui/primitives"
      ),
      React.createElement(
        CollapsibleContent,
        { className: "flex flex-col gap-2" },
        React.createElement(
          "div",
          { className: "rounded-md border px-4 py-2 font-mono text-sm" },
          "@radix-ui/colors"
        ),
        React.createElement(
          "div",
          { className: "rounded-md border px-4 py-2 font-mono text-sm" },
          "@stitches/react"
        )
      )
    ),
  },
};
