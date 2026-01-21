import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Toggle } from "@/components/ui/toggle";
import { BookmarkIcon } from "lucide-react";

export const toggleDoc: ComponentDoc = {
  id: "toggle",
  name: "Toggle",
  description: "A two-state button that can be either on or off.",
  installation: {
    cli: "npx shadcn@latest add toggle",
    manual:
      "Copy and paste the toggle component source code into your project.",
  },
  usage: `import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  )
}`,
  preview: {
    code: `<Toggle
  aria-label="Toggle bookmark"
  size="sm"
  variant="outline"
  className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
>
  <BookmarkIcon />
  Bookmark
</Toggle>`,
    component: React.createElement(
      Toggle,
      {
        "aria-label": "Toggle bookmark",
        size: "sm",
        variant: "outline",
        className:
          "data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500",
      },
      React.createElement(BookmarkIcon, {}),
      "Bookmark"
    ),
  },
};
