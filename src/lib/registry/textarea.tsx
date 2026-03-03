import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";

export const textareaDoc: ComponentDoc = {
  id: "textarea",
  name: "Textarea",
  description:
    "Displays a form textarea or a component that looks like a textarea.",
  installation: {
    cli: "npx shadcn@latest add textarea",
    manual:
      "Copy and paste the textarea component source code into your project.",
  },
  usage: `import { Textarea } from "@/components/ui/textarea"`,
  preview: {
    code: `<Textarea placeholder="Type your message here." />`,
    component: React.createElement(Textarea, {
      placeholder: "Type your message here.",
    }),
  },
  examples: [
    {
      name: "Disabled",
      description: "A textarea in disabled state.",
      code: `<Textarea placeholder="Disabled textarea" disabled />`,
      preview: React.createElement(Textarea, {
        placeholder: "Disabled textarea",
        disabled: true,
      }),
    },
    {
      name: "Auto Space",
      description:
        "Use autoSpace to automatically insert a space after punctuation (. , ! ? ; :) when the user types without one. Useful for prose fields like notes, comments, and descriptions.",
      code: `<Textarea
  autoSpace
  placeholder="Try: Hello,World or Patient reported pain.No fever."
  rows={4}
/>`,
      preview: React.createElement(Textarea, {
        autoSpace: true,
        placeholder:
          "Try: Hello,World or Patient reported pain.No fever.",
        rows: 4,
      } as any),
    },
  ],
  props: [
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text when the textarea is empty.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disables user interaction.",
      default: "false",
    },
    {
      name: "rows",
      type: "number",
      description: "Number of visible text lines.",
    },
    {
      name: "aria-invalid",
      type: "boolean",
      description: "Marks the textarea as invalid for accessibility.",
      default: "false",
    },
    {
      name: "autoSpace",
      type: "boolean",
      description:
        "When true, automatically inserts a space after punctuation (. , ! ? ; :) when the next character typed is not a space.",
      default: "false",
    },
  ],
};
