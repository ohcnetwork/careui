import React from "react";
import { Badge } from "@/components/ui/badge";
import { type ComponentDoc } from "@/lib/types";

export const badgeDoc: ComponentDoc = {
  id: "badge",
  name: "Badge",
  description:
    "A badge component for displaying small bits of information like status, labels, or notifications.",
  installation: {
    cli: "npx shadcn@latest add badge",
    manual: "Copy and paste the badge component source code into your project.",
  },
  usage: `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`,
  preview: {
    code: `<div className="flex items-center gap-2 flex-wrap">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`,
    component: React.createElement(
      "div",
      { className: "flex items-center gap-2 flex-wrap" },
      React.createElement(Badge, {}, "Default"),
      React.createElement(Badge, { variant: "secondary" }, "Secondary"),
      React.createElement(Badge, { variant: "destructive" }, "Destructive"),
      React.createElement(Badge, { variant: "outline" }, "Outline")
    ),
  },
  examples: [
    {
      name: "Status Examples",
      description: "Real-world status badge examples.",
      code: `<div className="flex items-center gap-2 flex-wrap">
  <Badge>New</Badge>
  <Badge variant="secondary">In Progress</Badge>
  <Badge variant="destructive">Error</Badge>
  <Badge variant="outline">Pending</Badge>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex items-center gap-2 flex-wrap" },
        React.createElement(Badge, {}, "New"),
        React.createElement(Badge, { variant: "secondary" }, "In Progress"),
        React.createElement(Badge, { variant: "destructive" }, "Error"),
        React.createElement(Badge, { variant: "outline" }, "Pending")
      ),
    },
  ],
  props: [
    {
      name: "variant",
      type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
      description: "The variant of the badge.",
      default: '"default"',
    },
    {
      name: "asChild",
      type: "boolean",
      description:
        "Change the default rendered element for the one passed as a child.",
      default: "false",
    },
  ],
};
