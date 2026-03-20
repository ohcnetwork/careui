import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { LoadingAnimationSvg } from "@/components/ui/loading-animation-svg";

export const loadingAnimationSvgDoc: ComponentDoc = {
  id: "loading-animation-svg",
  name: "Loading Animation SVG",
  description:
    "SVG-based pixel-art Care UI loading animation — identical visuals to loading-animation but with zero React re-renders during the animation loop. All transitions run via the Web Animations API directly on SVG elements.",
  installation: {
    cli: "npx shadcn@latest add loading-animation-svg",
    manual:
      "Copy and paste the loading-animation-svg component source code into your project.",
  },
  usage: `import { LoadingAnimationSvg } from "@/components/ui/loading-animation-svg"`,
  preview: {
    code: `<LoadingAnimationSvg />`,
    component: React.createElement(LoadingAnimationSvg),
  },
  examples: [
    {
      name: "Default",
      description:
        "The heart pops in from the center on mount, then cycles between the red heart and green logo shapes with a synced lub-dub heartbeat. Zero React re-renders during the loop.",
      code: `<LoadingAnimationSvg />`,
      preview: React.createElement(LoadingAnimationSvg),
    },

  ],
  props: [
    {
      name: "className",
      type: "string",
      default: "—",
      description: "Additional CSS classes applied to the outer wrapper div.",
    },
  ],
};
