import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const popoverDoc: ComponentDoc = {
  id: "popover",
  name: "Popover",
  description: "Displays rich content in a portal, triggered by a button.",
  installation: {
    cli: "npx shadcn@latest add popover",
    manual:
      "Copy and paste the popover component source code into your project.",
  },
  usage: `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"`,
  preview: {
    code: `<Popover>
  <PopoverTrigger>Click me</PopoverTrigger>
  <PopoverContent>Content</PopoverContent>
</Popover>`,
    component: React.createElement(
      Popover,
      {},
      React.createElement(
        PopoverTrigger,
        { asChild: true },
        React.createElement(Button, { variant: "outline" }, "Open Popover")
      ),
      React.createElement(
        PopoverContent,
        {},
        React.createElement(
          "div",
          { className: "grid gap-4" },
          React.createElement(
            "div",
            { className: "space-y-2" },
            React.createElement(
              "h4",
              { className: "font-medium leading-none" },
              "Dimensions"
            ),
            React.createElement(
              "p",
              { className: "text-sm text-muted-foreground" },
              "Set the dimensions for the layer."
            )
          )
        )
      )
    ),
  },
};
