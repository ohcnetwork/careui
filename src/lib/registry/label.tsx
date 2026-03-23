import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
    code: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function LabelDemo() {
  return (
    <div className="flex gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}`,
    component: React.createElement(
      "div",
      { className: "flex gap-2" },
      React.createElement(Checkbox, { id: "terms" }),
      React.createElement(Label, { htmlFor: "terms" }, "Accept terms and conditions")
    ),
  },
  examples: [
    {
      name: "Label in Field",
      description:
        "For form fields, use the Field component which includes built-in label, description, and error handling.",
      code: `import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LabelInField() {
  return (
    <div className="w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input id="name" placeholder="Evil Rabbit" />
        </Field>
      </FieldGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "w-full max-w-sm" },
        React.createElement(
          FieldGroup,
          null,
          React.createElement(
            Field,
            null,
            React.createElement(
              FieldLabel,
              { htmlFor: "label-field-email" },
              "Email address"
            ),
            React.createElement(Input, {
              id: "label-field-email",
              type: "email",
              placeholder: "m@example.com",
            })
          ),
          React.createElement(
            Field,
            null,
            React.createElement(
              FieldLabel,
              { htmlFor: "label-field-name" },
              "Full name"
            ),
            React.createElement(Input, {
              id: "label-field-name",
              placeholder: "Evil Rabbit",
            })
          )
        )
      ),
    },
  ],
};
