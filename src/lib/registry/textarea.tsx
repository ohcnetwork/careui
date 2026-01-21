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
};
