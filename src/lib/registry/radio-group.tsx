import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const radioGroupDoc: ComponentDoc = {
  id: "radio-group",
  name: "Radio Group",
  description:
    "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
  installation: {
    cli: "npx shadcn@latest add radio-group",
    manual:
      "Copy and paste the radio group component source code into your project.",
  },
  usage: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
  preview: {
    code: `<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2">Option 2</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option3" id="option3" />
    <Label htmlFor="option3">Option 3</Label>
  </div>
</RadioGroup>`,
    component: React.createElement(
      RadioGroup,
      { defaultValue: "option1" },
      React.createElement(
        "div",
        { className: "flex items-center space-x-2" },
        React.createElement(RadioGroupItem, { value: "option1", id: "r1" }),
        React.createElement(Label, { htmlFor: "r1" }, "Default")
      ),
      React.createElement(
        "div",
        { className: "flex items-center space-x-2" },
        React.createElement(RadioGroupItem, { value: "option2", id: "r2" }),
        React.createElement(Label, { htmlFor: "r2" }, "Comfortable")
      ),
      React.createElement(
        "div",
        { className: "flex items-center space-x-2" },
        React.createElement(RadioGroupItem, { value: "option3", id: "r3" }),
        React.createElement(Label, { htmlFor: "r3" }, "Compact")
      )
    ),
  },
};
