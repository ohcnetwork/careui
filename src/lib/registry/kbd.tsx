import React from "react";
import { CornerDownLeftIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type ComponentDoc } from "@/lib/types";

export const kbdDoc: ComponentDoc = {
  id: "kbd",
  name: "Kbd",
  description: "Used to display textual user input from keyboard.",
  installation: {
    cli: "npx shadcn@latest add kbd",
    manual:
      "Copy and paste the kbd component source code into your project, then update imports to match your setup.",
  },
  usage: `import { Kbd } from "@/components/ui/kbd"

<Kbd>Ctrl</Kbd>`,
  preview: {
    code: `<div className="flex flex-col items-center gap-4">
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>⇧</Kbd>
    <Kbd>⌥</Kbd>
    <Kbd>⌃</Kbd>
  </KbdGroup>
  <KbdGroup>
    <Kbd>Ctrl</Kbd>
    <span>+</span>
    <Kbd>B</Kbd>
  </KbdGroup>
</div>`,
    component: React.createElement(
      "div",
      { className: "flex flex-col items-center gap-4" },
      React.createElement(
        KbdGroup,
        {},
        React.createElement(Kbd, {}, "⌘"),
        React.createElement(Kbd, {}, "⇧"),
        React.createElement(Kbd, {}, "⌥"),
        React.createElement(Kbd, {}, "⌃")
      ),
      React.createElement(
        KbdGroup,
        {},
        React.createElement(Kbd, {}, "Ctrl"),
        React.createElement("span", {}, "+"),
        React.createElement(Kbd, {}, "B")
      )
    ),
  },
  examples: [
    {
      name: "Primary",
      description: "Use the primary variant for high-emphasis keyboard hints.",
      code: `<Kbd variant="primary">⌘</Kbd>`,
      preview: React.createElement(Kbd, { variant: "primary" }, "⌘"),
    },
    {
      name: "Group",
      description:
        "Use the KbdGroup component to group keyboard keys together.",
      code: `<div className="flex flex-col items-center gap-4">
  <p className="text-muted-foreground text-sm">
    Use{" "}
    <KbdGroup>
      <Kbd>Ctrl + B</Kbd>
      <Kbd>Ctrl + K</Kbd>
    </KbdGroup>{" "}
    to open the command palette
  </p>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col items-center gap-4" },
        React.createElement(
          "p",
          { className: "text-muted-foreground text-sm" },
          "Use ",
          React.createElement(
            KbdGroup,
            {},
            React.createElement(Kbd, {}, "Ctrl + B"),
            React.createElement(Kbd, {}, "Ctrl + K")
          ),
          " to open the command palette"
        )
      ),
    },
    {
      name: "Button",
      description:
        "Use the Kbd component inside a Button to display a keyboard key inside a button.",
      code: `import { CornerDownLeftIcon } from "lucide-react"

<Button variant="outline">
  Accept{" "}
  <Kbd data-icon="inline-end" className="translate-x-0.5">
    <CornerDownLeftIcon className="size-3" />
  </Kbd>
</Button>`,
      preview: React.createElement(
        Button,
        { variant: "outline" },
        "Accept ",
        React.createElement(
          Kbd,
          { className: "translate-x-0.5" },
          React.createElement(CornerDownLeftIcon, { className: "size-3" })
        )
      ),
    },
    {
      name: "Default Button",
      description:
        "Use the primary Kbd variant inside a default Button variant.",
      code: `<Button>
  Save{" "}
  <Kbd variant="primary" data-icon="inline-end" className="translate-x-0.5">
    ⌘
  </Kbd>
  <Kbd variant="primary" data-icon="inline-end">S</Kbd>
</Button>`,
      preview: React.createElement(
        Button,
        {},
        "Save ",
        React.createElement(
          Kbd,
          { variant: "primary", className: "translate-x-0.5" },
          "⌘S"
        )
      ),
    },
    {
      name: "Tooltip",
      description:
        "Use Kbd and KbdGroup inside tooltip content to show keyboard shortcuts.",
      code: `<div className="flex flex-wrap gap-4">
  <ButtonGroup>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Save</Button>
      </TooltipTrigger>
      <TooltipContent className="pr-1.5">
        <div className="flex items-center gap-2">
          Save Changes <Kbd>S</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Print</Button>
      </TooltipTrigger>
      <TooltipContent className="pr-1.5">
        <div className="flex items-center gap-2">
          Print Document{" "}
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        </div>
      </TooltipContent>
    </Tooltip>
  </ButtonGroup>
</div>`,
      preview: React.createElement(
        TooltipProvider as React.ComponentType<React.PropsWithChildren>,
        {},
        React.createElement(
        "div",
        { className: "flex flex-wrap gap-4" },
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(
            Tooltip,
            {},
            React.createElement(
              TooltipTrigger,
              { asChild: true },
              React.createElement(Button, { variant: "outline" }, "Save")
            ),
            React.createElement(
              TooltipContent,
              { className: "pr-1.5" },
              React.createElement(
                "div",
                { className: "flex items-center gap-2" },
                "Save Changes ",
                React.createElement(Kbd, {}, "S")
              )
            )
          ),
          React.createElement(
            Tooltip,
            {},
            React.createElement(
              TooltipTrigger,
              { asChild: true },
              React.createElement(Button, { variant: "outline" }, "Print")
            ),
            React.createElement(
              TooltipContent,
              { className: "pr-1.5" },
              React.createElement(
                "div",
                { className: "flex items-center gap-2" },
                "Print Document ",
                React.createElement(
                  KbdGroup,
                  {},
                  React.createElement(Kbd, {}, "Ctrl"),
                  React.createElement(Kbd, {}, "P")
                )
              )
            )
          )
        )
      )
    ),
    },
    {
      name: "Input Group",
      description:
        "Use Kbd inside InputGroupAddon to display a keyboard key in an input group.",
      code: `import { SearchIcon } from "lucide-react"

<div className="flex w-full max-w-xs flex-col gap-6">
  <InputGroup>
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon>
      <SearchIcon />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">
      <Kbd>⌘K</Kbd>
    </InputGroupAddon>
  </InputGroup>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex w-full max-w-xs flex-col gap-6" },
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "Search..." }),
          React.createElement(
            InputGroupAddon,
            {},
            React.createElement(SearchIcon, {})
          ),
          React.createElement(
            InputGroupAddon,
            { align: "inline-end" },
            React.createElement(Kbd, {}, "⌘K")
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "Kbd.className",
      type: "string",
      description: "Additional classes for the keyboard key container.",
      default: '""',
    },
    {
      name: "Kbd.variant",
      type: '"default" | "primary"',
      description: "Visual style variant for the keyboard key.",
      default: '"default"',
    },
    {
      name: "KbdGroup.className",
      type: "string",
      description:
        "Additional classes for the grouped keyboard keys container.",
      default: '""',
    },
  ],
};
