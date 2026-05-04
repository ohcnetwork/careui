import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { DottedDivider } from "@/components/ui/dotted-divider";

function DottedDividerDemo() {
  return React.createElement(
    "div",
    { className: "flex w-full max-w-sm flex-col gap-6 text-sm" },
    React.createElement(
      "div",
      { className: "flex flex-col gap-1.5" },
      React.createElement("div", { className: "leading-none font-medium" }, "Section Title"),
      React.createElement(
        "div",
        { className: "text-muted-foreground" },
        "A brief description of this section."
      )
    ),
    React.createElement(DottedDivider, {}),
    React.createElement(
      "div",
      { className: "text-muted-foreground" },
      "Content continues below the decorative dotted divider."
    )
  );
}

function DottedDividerColored() {
  return React.createElement(
    "div",
    { className: "flex w-full max-w-sm flex-col gap-6 text-sm" },
    React.createElement(
      "div",
      { className: "flex flex-col gap-1.5" },
      React.createElement("div", { className: "leading-none font-medium" }, "Accent divider"),
      React.createElement(
        "div",
        { className: "text-muted-foreground" },
        "Using a custom color class."
      )
    ),
    React.createElement(DottedDivider, { className: "text-primary" }),
    React.createElement(
      "div",
      { className: "text-muted-foreground" },
      "The dots inherit your custom text color."
    )
  );
}

export const dottedDividerDoc: ComponentDoc = {
  id: "dotted-divider",
  name: "Dotted Divider",
  description: "A decorative divider rendered as a staggered dot-matrix SVG pattern.",
  installation: {
    cli: "npx shadcn@latest add https://careui.ohc.network/registry/care-ui/dotted-divider/dotted-divider.json",
    manual: "Copy the dotted-divider component source code into your project.",
  },
  usage: `import { DottedDivider } from "@/components/ui/dotted-divider"

<DottedDivider />`,
  preview: {
    code: `import { DottedDivider } from "@/components/ui/dotted-divider"

export function DottedDividerDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 text-sm">
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">Section Title</div>
        <div className="text-muted-foreground">
          A brief description of this section.
        </div>
      </div>
      <DottedDivider />
      <div className="text-muted-foreground">
        Content continues below the decorative dotted divider.
      </div>
    </div>
  )
}`,
    component: React.createElement(DottedDividerDemo),
  },
  examples: [
    {
      name: "Custom Color",
      description: "Pass a Tailwind text-color class to tint the dots.",
      code: `import { DottedDivider } from "@/components/ui/dotted-divider"

export function DottedDividerColored() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 text-sm">
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">Accent divider</div>
        <div className="text-muted-foreground">Using a custom color class.</div>
      </div>
      <DottedDivider className="text-primary" />
      <div className="text-muted-foreground">
        The dots inherit your custom text color.
      </div>
    </div>
  )
}`,
      preview: React.createElement(DottedDividerColored),
    },
  ],
  props: [
    {
      name: "className",
      type: "string",
      description: "Extra classes applied to the wrapper div. Use Tailwind text-color utilities to change dot color.",
    },
  ],
};
