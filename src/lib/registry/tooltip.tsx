import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export const tooltipDoc: ComponentDoc = {
  id: "tooltip",
  name: "Tooltip",
  description:
    "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  installation: {
    cli: "npx shadcn@latest add tooltip",
    manual:
      "Copy and paste the tooltip component source code into your project.",
  },
  usage: `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"`,
  preview: {
    code: `<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Tooltip content</TooltipContent>
</Tooltip>`,
    component: React.createElement(
      TooltipProvider as any,
      { delayDuration: 0 },
      React.createElement(
        Tooltip,
        {},
        React.createElement(
          TooltipTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Hover me")
        ),
        React.createElement(
          TooltipContent,
          {},
          React.createElement("p", {}, "Add to library")
        )
      )
    ),
  },
};
