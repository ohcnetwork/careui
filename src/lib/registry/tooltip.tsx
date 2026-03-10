import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { SaveIcon } from "lucide-react";

export const tooltipDoc: ComponentDoc = {
  id: "tooltip",
  name: "Tooltip",
  description:
    "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  installation: {
    cli: "npx shadcn@latest add tooltip",
    manual: `Install the following dependencies:

\`\`\`bash
npm install radix-ui
\`\`\`

Copy and paste the following code into your project:
components/ui/tooltip.tsx

Update the import paths to match your project setup.

Add the TooltipProvider to the root of your app.`,
  },
  usage: `import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>`,
  preview: {
    code: `import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}`,
    component: React.createElement(
      TooltipProvider,
      {} as React.ComponentProps<typeof TooltipProvider>,
      React.createElement(
        Tooltip,
        {},
        React.createElement(
          TooltipTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Hover")
        ),
        React.createElement(
          TooltipContent,
          {},
          React.createElement("p", {}, "Add to library")
        )
      )
    ),
  },
  examples: [
    {
      name: "Side",
      description: "Use the side prop to change the position of the tooltip.",
      code: `import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipSides() {
  return (
    <div className="flex flex-wrap gap-2">
      {(["left", "top", "bottom", "right"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" className="w-fit capitalize">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}`,
      preview: React.createElement(
        TooltipProvider,
        {} as React.ComponentProps<typeof TooltipProvider>,
        React.createElement(
          "div",
          { className: "flex flex-wrap gap-2" },
          ...(["left", "top", "bottom", "right"] as const).map((side) =>
            React.createElement(
              Tooltip,
              { key: side },
              React.createElement(
                TooltipTrigger,
                { asChild: true },
                React.createElement(
                  Button,
                  { variant: "outline", className: "w-fit capitalize" },
                  side
                )
              ),
              React.createElement(
                TooltipContent,
                { side },
                React.createElement("p", {}, "Add to library")
              )
            )
          )
        )
      ),
    },
    {
      name: "With Keyboard Shortcut",
      description: "Show a tooltip with a keyboard shortcut hint.",
      code: `import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SaveIcon } from "lucide-react"

export function TooltipKeyboard() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <SaveIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Save Changes <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}`,
      preview: React.createElement(
        TooltipProvider,
        {} as React.ComponentProps<typeof TooltipProvider>,
        React.createElement(
          Tooltip,
          {},
          React.createElement(
            TooltipTrigger,
            { asChild: true },
            React.createElement(
              Button,
              { variant: "outline", size: "icon-sm" },
              React.createElement(SaveIcon)
            )
          ),
          React.createElement(
            TooltipContent,
            {},
            "Save Changes ",
            React.createElement(Kbd, {}, "S")
          )
        )
      ),
    },
    {
      name: "Disabled Button",
      description:
        "Show a tooltip on a disabled button by wrapping it with a span.",
      code: `import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDisabled() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-block w-fit">
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>This feature is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  )
}`,
      preview: React.createElement(
        TooltipProvider,
        {} as React.ComponentProps<typeof TooltipProvider>,
        React.createElement(
          Tooltip,
          {},
          React.createElement(
            TooltipTrigger,
            { asChild: true },
            React.createElement(
              "span",
              { className: "inline-block w-fit" },
              React.createElement(
                Button,
                { variant: "outline", disabled: true },
                "Disabled"
              )
            )
          ),
          React.createElement(
            TooltipContent,
            {},
            React.createElement("p", {}, "This feature is currently unavailable")
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "side",
      type: '"top" | "right" | "bottom" | "left"',
      description: "The preferred side of the trigger to render against.",
      default: '"top"',
    },
    {
      name: "sideOffset",
      type: "number",
      description: "The distance in pixels from the trigger.",
      default: "0",
    },
    {
      name: "align",
      type: '"start" | "center" | "end"',
      description: "The preferred alignment against the trigger.",
      default: '"center"',
    },
    {
      name: "delayDuration",
      type: "number",
      description:
        "The duration from when the mouse enters the trigger until the tooltip opens.",
      default: "0",
    },
  ],
};
