import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Spinner } from "@/components/ui/spinner";

export const spinnerDoc: ComponentDoc = {
  id: "spinner",
  name: "Spinner",
  description: "A loading spinner component to indicate activity.",
  installation: {
    cli: "npx shadcn@latest add spinner",
    manual:
      "Copy and paste the spinner component source code into your project.",
  },
  usage: `import { Spinner } from "@/components/ui/spinner"`,
  preview: {
    code: `<Spinner />`,
    component: React.createElement(
      "div",
      { className: "flex gap-4 items-center" },
      React.createElement(Spinner, { className: "h-4 w-4" }),
      React.createElement(Spinner, {}),
      React.createElement(Spinner, { className: "h-8 w-8" })
    ),
  },
};
