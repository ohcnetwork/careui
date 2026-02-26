import React from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type ComponentDoc } from "@/lib/types";

export const radioGroupDoc: ComponentDoc = {
  id: "radio-group",
  name: "Radio Group",
  description:
    "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
  installation: {
    cli: "npx shadcn@latest add radio-group",
    manual:
      "Install radix-ui, copy the radio group component source, and update import paths to match your project setup.",
  },
  usage: `import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="option-one">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`,
  preview: {
    code: `<RadioGroup defaultValue="comfortable" className="w-fit">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>`,
    component: React.createElement(
      RadioGroup,
      { defaultValue: "comfortable", className: "w-fit" },
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(RadioGroupItem, { value: "default", id: "r1" }),
        React.createElement(Label, { htmlFor: "r1" }, "Default")
      ),
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(RadioGroupItem, {
          value: "comfortable",
          id: "r2",
        }),
        React.createElement(Label, { htmlFor: "r2" }, "Comfortable")
      ),
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(RadioGroupItem, { value: "compact", id: "r3" }),
        React.createElement(Label, { htmlFor: "r3" }, "Compact")
      )
    ),
  },
  examples: [
    {
      name: "Description",
      description:
        "Radio group items with a description using the Field component.",
      code: `<RadioGroup defaultValue="comfortable" className="w-fit">
  <Field orientation="horizontal">
    <RadioGroupItem value="default" id="desc-r1" />
    <FieldContent>
      <FieldLabel htmlFor="desc-r1">Default</FieldLabel>
      <FieldDescription>Standard spacing for most use cases.</FieldDescription>
    </FieldContent>
  </Field>
  <Field orientation="horizontal">
    <RadioGroupItem value="comfortable" id="desc-r2" />
    <FieldContent>
      <FieldLabel htmlFor="desc-r2">Comfortable</FieldLabel>
      <FieldDescription>More space between elements.</FieldDescription>
    </FieldContent>
  </Field>
  <Field orientation="horizontal">
    <RadioGroupItem value="compact" id="desc-r3" />
    <FieldContent>
      <FieldLabel htmlFor="desc-r3">Compact</FieldLabel>
      <FieldDescription>Minimal spacing for dense layouts.</FieldDescription>
    </FieldContent>
  </Field>
</RadioGroup>`,
      preview: React.createElement(
        RadioGroup,
        { defaultValue: "comfortable", className: "w-fit" },
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(RadioGroupItem, { value: "default", id: "desc-r1" }),
          React.createElement(
            FieldContent,
            {},
            React.createElement(FieldLabel, { htmlFor: "desc-r1" }, "Default"),
            React.createElement(
              FieldDescription,
              {},
              "Standard spacing for most use cases."
            )
          )
        ),
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(RadioGroupItem, {
            value: "comfortable",
            id: "desc-r2",
          }),
          React.createElement(
            FieldContent,
            {},
            React.createElement(FieldLabel, { htmlFor: "desc-r2" }, "Comfortable"),
            React.createElement(
              FieldDescription,
              {},
              "More space between elements."
            )
          )
        ),
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(RadioGroupItem, { value: "compact", id: "desc-r3" }),
          React.createElement(
            FieldContent,
            {},
            React.createElement(FieldLabel, { htmlFor: "desc-r3" }, "Compact"),
            React.createElement(
              FieldDescription,
              {},
              "Minimal spacing for dense layouts."
            )
          )
        )
      ),
    },
    {
      name: "Choice Card",
      description:
        "Use FieldLabel to wrap the entire Field for a clickable card-style selection.",
      code: `<RadioGroup defaultValue="plus" className="max-w-sm">
  <FieldLabel htmlFor="plus-plan">
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>Plus</FieldTitle>
        <FieldDescription>For individuals and small teams.</FieldDescription>
      </FieldContent>
      <RadioGroupItem value="plus" id="plus-plan" />
    </Field>
  </FieldLabel>
  <FieldLabel htmlFor="pro-plan">
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>Pro</FieldTitle>
        <FieldDescription>For growing businesses.</FieldDescription>
      </FieldContent>
      <RadioGroupItem value="pro" id="pro-plan" />
    </Field>
  </FieldLabel>
  <FieldLabel htmlFor="enterprise-plan">
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>Enterprise</FieldTitle>
        <FieldDescription>For large teams and enterprises.</FieldDescription>
      </FieldContent>
      <RadioGroupItem value="enterprise" id="enterprise-plan" />
    </Field>
  </FieldLabel>
</RadioGroup>`,
      preview: React.createElement(
        RadioGroup,
        { defaultValue: "plus", className: "max-w-sm" },
        React.createElement(
          FieldLabel,
          { htmlFor: "plus-plan" },
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(
              FieldContent,
              {},
              React.createElement(FieldTitle, {}, "Plus"),
              React.createElement(
                FieldDescription,
                {},
                "For individuals and small teams."
              )
            ),
            React.createElement(RadioGroupItem, { value: "plus", id: "plus-plan" })
          )
        ),
        React.createElement(
          FieldLabel,
          { htmlFor: "pro-plan" },
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(
              FieldContent,
              {},
              React.createElement(FieldTitle, {}, "Pro"),
              React.createElement(
                FieldDescription,
                {},
                "For growing businesses."
              )
            ),
            React.createElement(RadioGroupItem, { value: "pro", id: "pro-plan" })
          )
        ),
        React.createElement(
          FieldLabel,
          { htmlFor: "enterprise-plan" },
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(
              FieldContent,
              {},
              React.createElement(FieldTitle, {}, "Enterprise"),
              React.createElement(
                FieldDescription,
                {},
                "For large teams and enterprises."
              )
            ),
            React.createElement(RadioGroupItem, {
              value: "enterprise",
              id: "enterprise-plan",
            })
          )
        )
      ),
    },
    {
      name: "Fieldset",
      description:
        "Use FieldSet and FieldLegend to group radio items with a label and description.",
      code: `<FieldSet className="w-full max-w-xs">
  <FieldLegend variant="label">Subscription Plan</FieldLegend>
  <FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
  <RadioGroup defaultValue="monthly">
    <Field orientation="horizontal">
      <RadioGroupItem value="monthly" id="plan-monthly" />
      <FieldLabel htmlFor="plan-monthly" className="font-normal">Monthly ($9.99/month)</FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem value="yearly" id="plan-yearly" />
      <FieldLabel htmlFor="plan-yearly" className="font-normal">Yearly ($99.99/year)</FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem value="lifetime" id="plan-lifetime" />
      <FieldLabel htmlFor="plan-lifetime" className="font-normal">Lifetime ($299.99)</FieldLabel>
    </Field>
  </RadioGroup>
</FieldSet>`,
      preview: React.createElement(
        FieldSet,
        { className: "w-full max-w-xs" },
        React.createElement(FieldLegend, { variant: "label" }, "Subscription Plan"),
        React.createElement(
          FieldDescription,
          {},
          "Yearly and lifetime plans offer significant savings."
        ),
        React.createElement(
          RadioGroup,
          { defaultValue: "monthly" },
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(RadioGroupItem, {
              value: "monthly",
              id: "plan-monthly",
            }),
            React.createElement(
              FieldLabel,
              { htmlFor: "plan-monthly", className: "font-normal" },
              "Monthly ($9.99/month)"
            )
          ),
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(RadioGroupItem, { value: "yearly", id: "plan-yearly" }),
            React.createElement(
              FieldLabel,
              { htmlFor: "plan-yearly", className: "font-normal" },
              "Yearly ($99.99/year)"
            )
          ),
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(RadioGroupItem, {
              value: "lifetime",
              id: "plan-lifetime",
            }),
            React.createElement(
              FieldLabel,
              { htmlFor: "plan-lifetime", className: "font-normal" },
              "Lifetime ($299.99)"
            )
          )
        )
      ),
    },
    {
      name: "Disabled",
      description:
        "Use the disabled prop on RadioGroupItem to disable individual items.",
      code: `<RadioGroup defaultValue="option2" className="w-fit">
  <Field orientation="horizontal" data-disabled>
    <RadioGroupItem value="option1" id="disabled-1" disabled />
    <FieldLabel htmlFor="disabled-1" className="font-normal">Disabled</FieldLabel>
  </Field>
  <Field orientation="horizontal">
    <RadioGroupItem value="option2" id="disabled-2" />
    <FieldLabel htmlFor="disabled-2" className="font-normal">Option 2</FieldLabel>
  </Field>
  <Field orientation="horizontal">
    <RadioGroupItem value="option3" id="disabled-3" />
    <FieldLabel htmlFor="disabled-3" className="font-normal">Option 3</FieldLabel>
  </Field>
</RadioGroup>`,
      preview: React.createElement(
        RadioGroup,
        { defaultValue: "option2", className: "w-fit" },
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(RadioGroupItem, {
            value: "option1",
            id: "disabled-1",
            disabled: true,
          }),
          React.createElement(
            FieldLabel,
            { htmlFor: "disabled-1", className: "font-normal" },
            "Disabled"
          )
        ),
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(RadioGroupItem, { value: "option2", id: "disabled-2" }),
          React.createElement(
            FieldLabel,
            { htmlFor: "disabled-2", className: "font-normal" },
            "Option 2"
          )
        ),
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(RadioGroupItem, { value: "option3", id: "disabled-3" }),
          React.createElement(
            FieldLabel,
            { htmlFor: "disabled-3", className: "font-normal" },
            "Option 3"
          )
        )
      ),
    },
    {
      name: "Invalid",
      description:
        "Use aria-invalid on RadioGroupItem and data-invalid on Field to show validation errors.",
      code: `<FieldSet className="w-full max-w-xs">
  <FieldLegend variant="label">Notification Preferences</FieldLegend>
  <FieldDescription>Choose how you want to receive notifications.</FieldDescription>
  <RadioGroup defaultValue="email">
    <Field orientation="horizontal" data-invalid>
      <RadioGroupItem value="email" id="invalid-email" aria-invalid />
      <FieldLabel htmlFor="invalid-email" className="font-normal">Email only</FieldLabel>
    </Field>
    <Field orientation="horizontal" data-invalid>
      <RadioGroupItem value="sms" id="invalid-sms" aria-invalid />
      <FieldLabel htmlFor="invalid-sms" className="font-normal">SMS only</FieldLabel>
    </Field>
    <Field orientation="horizontal" data-invalid>
      <RadioGroupItem value="both" id="invalid-both" aria-invalid />
      <FieldLabel htmlFor="invalid-both" className="font-normal">Both Email & SMS</FieldLabel>
    </Field>
  </RadioGroup>
</FieldSet>`,
      preview: React.createElement(
        FieldSet,
        { className: "w-full max-w-xs" },
        React.createElement(
          FieldLegend,
          { variant: "label" },
          "Notification Preferences"
        ),
        React.createElement(
          FieldDescription,
          {},
          "Choose how you want to receive notifications."
        ),
        React.createElement(
          RadioGroup,
          { defaultValue: "email" },
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(RadioGroupItem, {
              value: "email",
              id: "invalid-email",
              "aria-invalid": true,
            }),
            React.createElement(
              FieldLabel,
              { htmlFor: "invalid-email", className: "font-normal" },
              "Email only"
            )
          ),
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(RadioGroupItem, {
              value: "sms",
              id: "invalid-sms",
              "aria-invalid": true,
            }),
            React.createElement(
              FieldLabel,
              { htmlFor: "invalid-sms", className: "font-normal" },
              "SMS only"
            )
          ),
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(RadioGroupItem, {
              value: "both",
              id: "invalid-both",
              "aria-invalid": true,
            }),
            React.createElement(
              FieldLabel,
              { htmlFor: "invalid-both", className: "font-normal" },
              "Both Email & SMS"
            )
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "defaultValue",
      type: "string",
      description: "The value of the item that should be checked when initially rendered.",
    },
    {
      name: "value",
      type: "string",
      description: "The controlled value of the radio group.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Event handler called when the checked value changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      description:
        "When true, prevents the user from interacting with all radio items in the group.",
      default: "false",
    },
    {
      name: "required",
      type: "boolean",
      description:
        "When true, indicates that one radio item in the group must be checked before submitting.",
      default: "false",
    },
  ],
};
