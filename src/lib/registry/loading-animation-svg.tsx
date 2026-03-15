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
    {
      name: "Performance comparison",
      description:
        "Unlike the div-based version, each animation frame is a direct WAAPI mutation — no React state, no reconciliation, no className diffing. Ideal for resource-constrained loading states.",
      items: [
        {
          title: "React re-renders during animation",
          description: "0 (SVG) vs ~12 per wave (div version)",
        },
        {
          title: "Animation driver",
          description: "Web Animations API on SVG <rect> elements — runs off the main thread",
        },
        {
          title: "Color changes",
          description: "setAttribute mutations — no className recalculation",
        },
        {
          title: "Heartbeat",
          description: "WAAPI on <g> element composite layer — compositor only",
        },
      ],
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
