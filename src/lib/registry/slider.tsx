import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Slider } from "@/components/ui/slider";

export const sliderDoc: ComponentDoc = {
  id: "slider",
  name: "Slider",
  description:
    "An input where the user selects a value from within a given range.",
  installation: {
    cli: "npx shadcn@latest add slider",
    manual:
      "Copy and paste the slider component source code into your project.",
  },
  usage: `import { Slider } from "@/components/ui/slider"`,
  preview: {
    code: `<Slider defaultValue={[50]} max={100} step={1} />`,
    component: React.createElement(
      "div",
      { className: "w-full px-4" },
      React.createElement(Slider, { defaultValue: [50], max: 100, step: 1 })
    ),
  },
};
