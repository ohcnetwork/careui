import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

export const hoverCardDoc: ComponentDoc = {
  id: "hover-card",
  name: "Hover Card",
  description: "For sighted users to preview content available behind a link.",
  installation: {
    cli: "npx shadcn@latest add hover-card",
    manual:
      "Copy and paste the hover card component source code into your project.",
  },
  usage: `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"`,
  preview: {
    code: `<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>Content</HoverCardContent>
</HoverCard>`,
    component: React.createElement(
      HoverCard,
      {},
      React.createElement(
        HoverCardTrigger,
        { asChild: true },
        React.createElement(Button, { variant: "link" }, "Hover me")
      ),
      React.createElement(
        HoverCardContent,
        { className: "w-80" },
        React.createElement(
          "div",
          { className: "flex justify-between space-x-4" },
          React.createElement(
            "div",
            { className: "space-y-1" },
            React.createElement(
              "h4",
              { className: "text-sm font-semibold" },
              "Care UI"
            ),
            React.createElement(
              "p",
              { className: "text-sm text-muted-foreground" },
              "Beautiful components for modern web applications."
            )
          )
        )
      )
    ),
  },
};
