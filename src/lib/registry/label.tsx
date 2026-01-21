import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Label } from "@/components/ui/label";

export const labelDoc: ComponentDoc = {
  id: "label",
  name: "Label",
  description: "Renders an accessible label associated with controls.",
  installation: {
    cli: "npx shadcn@latest add label",
    manual: "Copy and paste the label component source code into your project.",
  },
  usage: `import { Label } from "@/components/ui/label"`,
  preview: {
    code: `<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />`,
    component: React.createElement(Label, {}, "Email"),
  },
};
