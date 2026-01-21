import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";

export const checkboxDoc: ComponentDoc = {
  id: "checkbox",
  name: "Checkbox",
  description:
    "A control that allows the user to toggle between checked and not checked.",
  installation: {
    cli: "npx shadcn@latest add checkbox",
    manual:
      "Copy and paste the checkbox component source code into your project.",
  },
  usage: `import { Checkbox } from "@/components/ui/checkbox"

<Checkbox />`,
  preview: {
    code: "<Checkbox />",
    component: React.createElement(Checkbox, {}),
  },
  examples: [
    {
      name: "With Label",
      description: "A checkbox with a label.",
      code: `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex items-center space-x-2" },
        React.createElement(Checkbox, { id: "terms" }),
        React.createElement(
          "label",
          { htmlFor: "terms" },
          "Accept terms and conditions"
        )
      ),
    },
    {
      name: "Disabled",
      description: "A disabled checkbox.",
      code: "<Checkbox disabled />",
      preview: React.createElement(Checkbox, { disabled: true }),
    },
    {
      name: "Checked",
      description: "A checked checkbox.",
      code: "<Checkbox defaultChecked />",
      preview: React.createElement(Checkbox, { defaultChecked: true }),
    },
  ],
  props: [
    {
      name: "checked",
      type: 'boolean | "indeterminate"',
      description: "The controlled checked state of the checkbox.",
    },
    {
      name: "defaultChecked",
      type: "boolean",
      description: "The default checked state when initially rendered.",
    },
    {
      name: "onCheckedChange",
      type: '(checked: boolean | "indeterminate") => void',
      description: "Event handler called when the checked state changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      description:
        "When true, prevents the user from interacting with the checkbox.",
    },
    {
      name: "required",
      type: "boolean",
      description:
        "When true, indicates that the user must check the checkbox before submitting.",
    },
  ],
};
