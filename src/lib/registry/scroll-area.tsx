import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const scrollAreaDoc: ComponentDoc = {
  id: "scroll-area",
  name: "Scroll Area",
  description:
    "Augments native scroll functionality for custom, cross-browser styling.",
  installation: {
    cli: "npx shadcn@latest add scroll-area",
    manual:
      "Copy and paste the scroll area component source code into your project.",
  },
  usage: `import { ScrollArea } from "@/components/ui/scroll-area"`,
  preview: {
    code: `<ScrollArea className="h-72">
  <div>Content...</div>
</ScrollArea>`,
    component: React.createElement(
      ScrollArea,
      { className: "h-72 w-48 rounded-md border" },
      React.createElement(
        "div",
        { className: "p-4" },
        React.createElement(
          "h4",
          { className: "mb-4 text-sm font-medium leading-none" },
          "Tags"
        ),
        ["v1.0.0", "v1.1.0", "v1.2.0", "v2.0.0", "v2.1.0"].map((tag, i) =>
          React.createElement(
            "div",
            { key: tag },
            React.createElement("div", { className: "text-sm" }, tag),
            i < 4 && React.createElement(Separator, { className: "my-2" })
          )
        )
      )
    ),
  },
};
