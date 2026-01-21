import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Switch } from "@/components/ui/switch";

export const switchDoc: ComponentDoc = {
  id: "switch",
  name: "Switch",
  description:
    "A control that allows the user to toggle between checked and not checked.",
  installation: {
    cli: "npx shadcn@latest add switch",
    manual:
      "Copy and paste the switch component source code into your project.",
  },
  usage: `import { Switch } from "@/components/ui/switch"`,
  preview: {
    code: `<Switch />`,
    component: React.createElement(Switch, {}),
  },
};
