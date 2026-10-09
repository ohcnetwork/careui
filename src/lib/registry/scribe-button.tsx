import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { ScribeButton } from "@/components/ui/scribe-button";

export const scribeButtonDoc: ComponentDoc = {
  id: "scribe-button",
  name: "Scribe Button",
  description:
    "A voice-capture action button that changes icon and style across the recording flow: idle, recording, attaching and review.",
  installation: {
    cli: "npx shadcn@latest add scribe-button",
    manual:
      "Copy and paste the scribe-button component source code into your project.",
  },
  usage: `import { ScribeButton } from "@/components/ui/scribe-button"

<ScribeButton state="idle" label="Scribe" onClick={start} />`,
  preview: {
    code: `<ScribeButton state="idle" label="Scribe" />`,
    component: React.createElement(ScribeButton, {
      state: "idle",
      label: "Scribe",
    }),
  },
  examples: [
    {
      name: "States",
      description: "One button per state.",
      code: `<ScribeButton state="idle" label="Scribe" />
<ScribeButton state="recording" label="Stop recording" />
<ScribeButton state="attaching" label="Process images" />
<ScribeButton state="review" label="Retake recording" />`,
      preview: React.createElement(
        "div",
        { className: "flex flex-wrap items-center gap-3" },
        React.createElement(ScribeButton, { state: "idle", label: "Scribe" }),
        React.createElement(ScribeButton, {
          state: "recording",
          label: "Stop recording",
        }),
        React.createElement(ScribeButton, {
          state: "attaching",
          label: "Process images",
        }),
        React.createElement(ScribeButton, {
          state: "review",
          label: "Retake recording",
        })
      ),
    },
    {
      name: "Disabled",
      description: "Disabled while a request is in flight.",
      code: `<ScribeButton label="Scribe" disabled />`,
      preview: React.createElement(ScribeButton, {
        label: "Scribe",
        disabled: true,
      }),
    },
  ],
  props: [
    {
      name: "state",
      type: '"idle" | "recording" | "attaching" | "review"',
      default: '"idle"',
      description: "Controls the icon and styling.",
    },
    {
      name: "label",
      type: "string",
      description: "Text shown beside the icon.",
    },
    {
      name: "...props",
      type: "React.ComponentProps<'button'>",
      description: 'All native button props. `type` defaults to "button".',
    },
  ],
};
