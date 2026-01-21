import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export const inputGroupDoc: ComponentDoc = {
  id: "input-group",
  name: "Input Group",
  description: "A wrapper for input fields with prefix and suffix elements.",
  installation: {
    cli: "npx shadcn@latest add input-group",
    manual:
      "Copy and paste the input group component source code into your project.",
  },
  usage: `import { InputGroup } from "@/components/ui/input-group"`,
  preview: {
    code: `<InputGroup>
  <InputGroupAddon align="inline-start">$</InputGroupAddon>
  <InputGroupInput type="number" />
  <InputGroupAddon align="inline-end">.00</InputGroupAddon>
</InputGroup>`,
    component: React.createElement(
      InputGroup,
      {},
      React.createElement(InputGroupAddon, { align: "inline-start" }, "$"),
      React.createElement(InputGroupInput, {
        type: "number",
        placeholder: "0",
      }),
      React.createElement(InputGroupAddon, { align: "inline-end" }, ".00")
    ),
  },
};
