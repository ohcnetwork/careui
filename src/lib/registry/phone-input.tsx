import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { PhoneInput, type PhoneInputProps } from "@/components/ui/phone-input";

type PhoneInputPreviewProps = Omit<PhoneInputProps, "onChange">;

function PhoneInputPreview(props: PhoneInputPreviewProps) {
  const [value, setValue] = React.useState(props.value);

  return React.createElement(PhoneInput, {
    ...props,
    value,
    onChange: setValue,
  });
}

export const phoneInputDoc: ComponentDoc = {
  id: "phone-input",
  name: "Phone Input",
  description:
    "An international phone input with country flags, calling codes, and E.164 formatting.",
  installation: {
    cli: "npx shadcn@latest add phone-input",
    manual: "Copy the phone-input component source into your project.",
  },
  usage: `import { useState } from "react"
import { PhoneInput } from "@/components/ui/phone-input"

export function ContactPhoneField() {
  const [phone, setPhone] = useState<string>()

  return (
    <PhoneInput
      id="contact-phone"
      name="phone"
      value={phone}
      onChange={setPhone}
      defaultCountry="IN"
    />
  )
}`,
  preview: {
    code: `<Field className="max-w-sm">
  <FieldLabel htmlFor="phone-input-basic">Phone number</FieldLabel>
  <PhoneInput
    id="phone-input-basic"
    defaultCountry="IN"
    value={phone}
    onChange={setPhone}
  />
</Field>`,
    component: React.createElement(
      Field,
      { className: "max-w-sm" },
      React.createElement(
        FieldLabel,
        { htmlFor: "phone-input-basic" },
        "Phone number"
      ),
      React.createElement(PhoneInputPreview, {
        id: "phone-input-basic",
        defaultCountry: "IN",
        placeholder: "Enter phone number",
      })
    ),
  },
  examples: [
    {
      name: "Sizes",
      description:
        'Use the "sm", "default", and "lg" variants to match the density of nearby fields.',
      code: `<div className="grid w-full max-w-sm gap-4">
  <PhoneInput variant="sm" defaultCountry="IN" value={phone} onChange={setPhone} />
  <PhoneInput variant="default" defaultCountry="IN" value={phone} onChange={setPhone} />
  <PhoneInput variant="lg" defaultCountry="IN" value={phone} onChange={setPhone} />
</div>`,
      preview: React.createElement(
        "div",
        { className: "grid w-full max-w-sm gap-4" },
        React.createElement(PhoneInputPreview, {
          variant: "sm",
          defaultCountry: "IN",
        }),
        React.createElement(PhoneInputPreview, {
          variant: "default",
          defaultCountry: "IN",
        }),
        React.createElement(PhoneInputPreview, {
          variant: "lg",
          defaultCountry: "IN",
        })
      ),
    },
    {
      name: "Disabled",
      description:
        "Disable both the phone field and country selector while preserving the current value.",
      code: `<PhoneInput
  disabled
  defaultCountry="IN"
  value="+919876543210"
  onChange={setPhone}
/>`,
      preview: React.createElement(PhoneInputPreview, {
        className: "max-w-sm",
        disabled: true,
        defaultCountry: "IN",
        value: "+919876543210",
      }),
    },
    {
      name: "Preset value",
      description:
        "Pass an E.164 value to initialize the selected country and formatted number.",
      code: `<PhoneInput
  value="+12133734253"
  onChange={setPhone}
  defaultCountry="IN"
/>`,
      preview: React.createElement(PhoneInputPreview, {
        className: "max-w-sm",
        value: "+12133734253",
        defaultCountry: "IN",
      }),
    },
    {
      name: "Error state",
      description:
        "Set aria-invalid after validation and pair it with FieldError text.",
      code: `<Field data-invalid>
  <FieldLabel htmlFor="phone-input-invalid">Phone number</FieldLabel>
  <PhoneInput
    id="phone-input-invalid"
    aria-invalid="true"
    defaultCountry="IN"
    value={phone}
    onChange={setPhone}
  />
  <FieldError>Enter a valid phone number.</FieldError>
</Field>`,
      preview: React.createElement(
        Field,
        { className: "max-w-sm" },
        React.createElement(
          FieldLabel,
          { htmlFor: "phone-input-invalid" },
          "Phone number"
        ),
        React.createElement(PhoneInputPreview, {
          id: "phone-input-invalid",
          "aria-invalid": true,
          defaultCountry: "IN",
        }),
        React.createElement(FieldError, {}, "Enter a valid phone number.")
      ),
    },
    {
      name: "Default country",
      description:
        "Choose which country is selected before the user enters a number.",
      code: `<PhoneInput
  defaultCountry="GB"
  value={phone}
  onChange={setPhone}
/>`,
      preview: React.createElement(PhoneInputPreview, {
        className: "max-w-sm",
        defaultCountry: "GB",
      }),
    },
    {
      name: "Read-only",
      description:
        "Show the formatted number and country without editable controls.",
      code: `<PhoneInput
  readOnly
  value="+919876543210"
  defaultCountry="IN"
  onChange={setPhone}
/>`,
      preview: React.createElement(PhoneInputPreview, {
        className: "max-w-sm",
        readOnly: true,
        value: "+919876543210",
        defaultCountry: "IN",
      }),
    },
  ],
  props: [
    {
      name: "value",
      type: "string",
      description: "Controlled phone value in E.164 format.",
    },
    {
      name: "onChange",
      type: "(value?: string) => void",
      description:
        "Called with the formatted E.164 value or undefined when empty.",
    },
    {
      name: "defaultCountry",
      type: "Country",
      description: "Country selected before a number is entered.",
      default: '"IN"',
    },
    {
      name: "variant",
      type: '"sm" | "default" | "lg"',
      description: "Height of the input and country selector.",
      default: '"default"',
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disables both the phone input and country selector.",
      default: "false",
    },
    {
      name: "readOnly",
      type: "boolean",
      description:
        "Prevents edits and replaces the country selector with a static prefix.",
      default: "false",
    },
    {
      name: "aria-invalid",
      type: 'boolean | "true" | "false"',
      description: "Marks the input and country selector as invalid.",
    },
    {
      name: "popupClassName",
      type: "string",
      description: "Additional classes for the country dropdown.",
    },
    {
      name: "inputClassName",
      type: "string",
      description: "Additional classes for the telephone input.",
    },
  ],
};
