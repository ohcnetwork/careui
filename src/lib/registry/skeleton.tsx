import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export const skeletonDoc: ComponentDoc = {
  id: "skeleton",
  name: "Skeleton",
  description: "Use to show a placeholder while content is loading.",
  installation: {
    cli: "npx shadcn@latest add skeleton",
    manual:
      "Copy and paste the skeleton component source code into your project.",
  },
  usage: `import { Skeleton } from "@/components/ui/skeleton"`,
  preview: {
    code: `<Skeleton className="w-full h-12" />`,
    component: React.createElement(
      "div",
      { className: "flex flex-col space-y-3 w-full" },
      React.createElement(Skeleton, { className: "h-12 w-full rounded-md" }),
      React.createElement(Skeleton, { className: "h-4 w-3/4" }),
      React.createElement(Skeleton, { className: "h-4 w-1/2" })
    ),
  },
};
