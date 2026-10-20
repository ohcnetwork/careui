import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { StackedGrid } from "@/components/ui/stacked-grid";

const demoItems = Array.from({ length: 7 }, (_, i) =>
  React.createElement(
    "div",
    {
      key: i,
      className: "rounded-lg border bg-card p-4 text-sm",
      style: { height: 60 + ((i * 37) % 70) },
    },
    `Card ${i + 1}`
  )
);

export const stackedGridDoc: ComponentDoc = {
  id: "stacked-grid",
  name: "Stacked Grid",
  description:
    "A masonry-style layout that deals items into balanced columns. The column count follows the width of its container.",
  installation: {
    cli: "npx shadcn@latest add stacked-grid",
    manual:
      "Copy and paste the stacked-grid component source code into your project.",
  },
  usage: `import { StackedGrid } from "@/components/ui/stacked-grid"

<StackedGrid items={cards} />`,
  preview: {
    code: `<StackedGrid items={cards} columnWidth={220} singleColumnBelow={400} />`,
    component: React.createElement(StackedGrid, {
      items: demoItems,
      columnWidth: 220,
      singleColumnBelow: 400,
      className: "w-full",
    }),
  },
  props: [
    {
      name: "items",
      type: "React.ReactNode[]",
      description: "Items to lay out, dealt into columns in order.",
    },
    {
      name: "columnWidth",
      type: "number",
      default: "300",
      description: "Target width of one column, in px.",
    },
    {
      name: "singleColumnBelow",
      type: "number",
      default: "700",
      description: "Container width below which the grid has one column.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
};
