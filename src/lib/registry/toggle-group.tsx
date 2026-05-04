import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export const toggleGroupDoc: ComponentDoc = {
  id: "toggle-group",
  name: "Toggle Group",
  description: "A set of two-state buttons that can be toggled on or off.",
  installation: {
    cli: "npx shadcn@latest add toggle-group",
    manual:
      "Copy and paste the toggle group component source code into your project.",
  },
  usage: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`,
  preview: {
    code: `import { Bold, Italic, Underline } from "lucide-react"

<ToggleGroup type="single">
  <ToggleGroupItem value="bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`,
    component: React.createElement(
      ToggleGroup,
      { type: "single" },
      React.createElement(
        ToggleGroupItem,
        { value: "bold" },
        React.createElement(Bold, { className: "h-4 w-4" })
      ),
      React.createElement(
        ToggleGroupItem,
        { value: "italic" },
        React.createElement(Italic, { className: "h-4 w-4" })
      ),
      React.createElement(
        ToggleGroupItem,
        { value: "underline" },
        React.createElement(Underline, { className: "h-4 w-4" })
      )
    ),
  },
};
