import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { ShinyButton } from "@/components/ui/shiny-button";
import { MicIcon, SparklesIcon } from "lucide-react";

export const shinyButtonDoc: ComponentDoc = {
  id: "shiny-button",
  name: "Shiny Button",
  description:
    "An animated call-to-action with a rotating gradient border and a soft glow. Colours come from the theme, and the animation stops for users who prefer reduced motion.",
  installation: {
    cli: "npx shadcn@latest add shiny-button",
    manual:
      "Copy and paste the shiny-button component source code into your project. Its styles are bundled with the component.",
  },
  usage: `import { ShinyButton } from "@/components/ui/shiny-button"

<ShinyButton>Ask Scribe</ShinyButton>`,
  preview: {
    code: `<ShinyButton>
  <MicIcon className="size-4" />
  Start Scribe
</ShinyButton>`,
    component: React.createElement(
      ShinyButton,
      null,
      React.createElement(MicIcon, { className: "size-4" }),
      "Start Scribe"
    ),
  },
  examples: [
    {
      name: "Text only",
      description: "A plain label.",
      code: `<ShinyButton>Generate summary</ShinyButton>`,
      preview: React.createElement(ShinyButton, null, "Generate summary"),
    },
    {
      name: "With icon",
      description: "Icons sit inline with the label.",
      code: `<ShinyButton>
  <SparklesIcon className="size-4" />
  Autofill
</ShinyButton>`,
      preview: React.createElement(
        ShinyButton,
        null,
        React.createElement(SparklesIcon, { className: "size-4" }),
        "Autofill"
      ),
    },
    {
      name: "Disabled",
      description: "The animation and glow are removed.",
      code: `<ShinyButton disabled>Unavailable</ShinyButton>`,
      preview: React.createElement(
        ShinyButton,
        { disabled: true },
        "Unavailable"
      ),
    },
  ],
  props: [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
    {
      name: "...props",
      type: "React.ComponentProps<'button'>",
      description: 'All native button props. `type` defaults to "button".',
    },
  ],
};
