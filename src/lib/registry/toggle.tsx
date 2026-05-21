import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Toggle } from "@/components/ui/toggle";
import { BoldIcon, BookmarkIcon, ItalicIcon } from "lucide-react";

export const toggleDoc: ComponentDoc = {
  id: "toggle",
  name: "Toggle",
  description: "A two-state button that can be either on or off.",
  installation: {
    cli: "npx shadcn@latest add toggle",
    manual:
      "Copy and paste the toggle component source code into your project.",
  },
  usage: `import { Toggle } from "@/components/ui/toggle"

<Toggle>Toggle</Toggle>`,
  preview: {
    code: `import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
      <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
      Bookmark
    </Toggle>
  )
}`,
    component: React.createElement(
      Toggle,
      {
        "aria-label": "Toggle bookmark",
        size: "sm",
        variant: "outline",
      },
      React.createElement(BookmarkIcon, {
        className: "group-data-[state=on]/toggle:fill-foreground",
      }),
      "Bookmark"
    ),
  },
  examples: [
    {
      name: "Outline",
      description: 'Use `variant="outline"` for an outline style.',
      code: `import { BoldIcon, ItalicIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleOutline() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="Toggle italic">
        <ItalicIcon />
        Italic
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle bold">
        <BoldIcon />
        Bold
      </Toggle>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-wrap items-center gap-2" },
        React.createElement(
          Toggle,
          { variant: "outline", "aria-label": "Toggle italic" },
          React.createElement(ItalicIcon, {}),
          "Italic"
        ),
        React.createElement(
          Toggle,
          { variant: "outline", "aria-label": "Toggle bold" },
          React.createElement(BoldIcon, {}),
          "Bold"
        )
      ),
    },
    {
      name: "With Text",
      description: "Combine an icon with a text label inside the toggle.",
      code: `import { ItalicIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}`,
      preview: React.createElement(
        Toggle,
        { "aria-label": "Toggle italic" },
        React.createElement(ItalicIcon, {}),
        "Italic"
      ),
    },
    {
      name: "Size",
      description: "Use the `size` prop to change the size of the toggle.",
      code: `import { Toggle } from "@/components/ui/toggle"

export function ToggleSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="Toggle small" size="sm">
        Small
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle default" size="default">
        Default
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle large" size="lg">
        Large
      </Toggle>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-wrap items-center gap-2" },
        React.createElement(
          Toggle,
          { variant: "outline", "aria-label": "Toggle small", size: "sm" },
          "Small"
        ),
        React.createElement(
          Toggle,
          {
            variant: "outline",
            "aria-label": "Toggle default",
            size: "default",
          },
          "Default"
        ),
        React.createElement(
          Toggle,
          { variant: "outline", "aria-label": "Toggle large", size: "lg" },
          "Large"
        )
      ),
    },
    {
      name: "Disabled",
      description: "Use the `disabled` prop to disable the toggle.",
      code: `import { Toggle } from "@/components/ui/toggle"

export function ToggleDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Toggle disabled" disabled>
        Disabled
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle disabled outline" disabled>
        Disabled
      </Toggle>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-wrap items-center gap-2" },
        React.createElement(
          Toggle,
          { "aria-label": "Toggle disabled", disabled: true },
          "Disabled"
        ),
        React.createElement(
          Toggle,
          {
            variant: "outline",
            "aria-label": "Toggle disabled outline",
            disabled: true,
          },
          "Disabled"
        )
      ),
    },
  ],
  props: [
    {
      name: "variant",
      type: '"default" | "outline"',
      description: "Visual style of the toggle.",
      default: '"default"',
    },
    {
      name: "size",
      type: '"default" | "sm" | "lg"',
      description: "Size of the toggle.",
      default: '"default"',
    },
    {
      name: "pressed",
      type: "boolean",
      description: "The controlled pressed state of the toggle.",
    },
    {
      name: "defaultPressed",
      type: "boolean",
      description:
        "The pressed state of the toggle when it is initially rendered.",
      default: "false",
    },
    {
      name: "onPressedChange",
      type: "(pressed: boolean) => void",
      description: "Event handler called when the pressed state changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disables user interaction.",
      default: "false",
    },
  ],
};
