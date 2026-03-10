import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const aspectRatioDoc: ComponentDoc = {
  id: "aspect-ratio",
  name: "Aspect Ratio",
  description: "Displays content within a desired ratio.",
  installation: {
    cli: "npx shadcn@latest add aspect-ratio",
    manual: `Install the following dependencies:

\`\`\`bash
npm install radix-ui
\`\`\`

Copy and paste the following code into your project:
components/ui/aspect-ratio.tsx

Update the import paths to match your project setup.`,
  },
  usage: `import { AspectRatio } from "@/components/ui/aspect-ratio"

<AspectRatio ratio={16 / 9}>
  <img src="..." alt="Image" className="rounded-md object-cover" />
</AspectRatio>`,
  preview: {
    code: `<div className="w-full max-w-sm">
  <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
    <img
      src="https://avatar.vercel.sh/shadcn1"
      alt="Photo"
      className="w-full h-full rounded-lg object-cover grayscale"
    />
  </AspectRatio>
</div>`,
    component: React.createElement(
      "div",
      { className: "w-full max-w-sm" },
      React.createElement(
        AspectRatio,
        { ratio: 16 / 9, className: "rounded-lg bg-muted" },
        React.createElement("img", {
          src: "https://avatar.vercel.sh/shadcn1",
          alt: "Photo",
          className: "w-full h-full rounded-lg object-cover grayscale",
        })
      )
    ),
  },
  examples: [
    {
      name: "Square",
      description:
        "A square aspect ratio component using the `ratio={1 / 1}` prop. This is useful for displaying images in a square format.",
      code: `<div className="w-full max-w-48">
  <AspectRatio ratio={1 / 1} className="rounded-lg bg-muted">
    <img
      src="https://avatar.vercel.sh/shadcn1"
      alt="Photo"
      className="w-full h-full rounded-lg object-cover grayscale"
    />
  </AspectRatio>
</div>`,
      preview: React.createElement(
        "div",
        { className: "w-full max-w-48" },
        React.createElement(
          AspectRatio,
          { ratio: 1 / 1, className: "rounded-lg bg-muted" },
          React.createElement("img", {
            src: "https://avatar.vercel.sh/shadcn1",
            alt: "Photo",
            className: "w-full h-full rounded-lg object-cover grayscale",
          })
        )
      ),
    },
    {
      name: "Portrait",
      description:
        "A portrait aspect ratio component using the `ratio={9 / 16}` prop. This is useful for displaying images in a portrait format.",
      code: `<div className="w-full max-w-40">
  <AspectRatio ratio={9 / 16} className="rounded-lg bg-muted">
    <img
      src="https://avatar.vercel.sh/shadcn1"
      alt="Photo"
      className="w-full h-full rounded-lg object-cover grayscale"
    />
  </AspectRatio>
</div>`,
      preview: React.createElement(
        "div",
        { className: "w-full max-w-40" },
        React.createElement(
          AspectRatio,
          { ratio: 9 / 16, className: "rounded-lg bg-muted" },
          React.createElement("img", {
            src: "https://avatar.vercel.sh/shadcn1",
            alt: "Photo",
            className: "w-full h-full rounded-lg object-cover grayscale",
          })
        )
      ),
    },
  ],
  props: [
    {
      name: "ratio",
      type: "number",
      description: "The desired aspect ratio (e.g. 16/9, 1/1, 9/16).",
      default: undefined,
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the aspect ratio container.",
      default: undefined,
    },
  ],
};
