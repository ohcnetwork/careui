import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { LoadingAnimation } from "@/components/ui/loading-animation";

export const loadingAnimationDoc: ComponentDoc = {
  id: "loading-animation",
  name: "Loading Animation",
  description:
    "A pixel-art Care UI logo loading animation that alternates between a red heart and a green logo shape using radial wave ripple transitions.",
  installation: {
    cli: "npx shadcn@latest add loading-animation",
    manual:
      "Copy and paste the loading-animation component source code into your project.",
  },
  usage: `import { LoadingAnimation } from "@/components/ui/loading-animation"`,
  preview: {
    code: `<LoadingAnimation />`,
    component: React.createElement(LoadingAnimation),
  },
  examples: [
    {
      name: "Default",
      description:
        "The animation pops in from the center on mount, holds, then cycles between the heart and logo shapes.",
      code: `<LoadingAnimation />`,
      preview: React.createElement(LoadingAnimation),
    },
    {
      name: "Custom size via className",
      description:
        "Wrap in a sized container or pass a className to control placement.",
      code: `<div className="flex h-64 items-center justify-center">
  <LoadingAnimation />
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex h-48 items-center justify-center" },
        React.createElement(LoadingAnimation),
      ),
    },
  ],
  props: [
    {
      name: "className",
      type: "string",
      default: "undefined",
      description: "Additional CSS classes applied to the root wrapper element.",
    },
  ],
};
