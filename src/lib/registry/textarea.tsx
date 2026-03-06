import React from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { type ComponentDoc } from "@/lib/types";

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
  usage: `import { Textarea } from "@/components/ui/textarea"

<Textarea />`,
  preview: {
    code: `<Textarea placeholder="Type your message here." />`,
    component: React.createElement(Textarea, {
      placeholder: "Type your message here.",
    }),
  },
  examples: [
    {
      name: "Field",
      description:
        "Use Field, FieldLabel, and FieldDescription to create a textarea with a label and description.",
      code: `import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function TextareaField() {
  return (
    <Field>
      <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
      <FieldDescription>Enter your message below.</FieldDescription>
      <Textarea id="textarea-message" placeholder="Type your message here." />
    </Field>
  )
}`,
      preview: React.createElement(
        Field,
        {},
        React.createElement(
          FieldLabel,
          { htmlFor: "textarea-field-message" },
          "Message"
        ),
        React.createElement(
          FieldDescription,
          {},
          "Enter your message below."
        ),
        React.createElement(Textarea, {
          id: "textarea-field-message",
          placeholder: "Type your message here.",
        })
      ),
    },
    {
      name: "Disabled",
      description:
        "Use the disabled prop to disable the textarea. To style the disabled state, add the data-disabled attribute to the Field component.",
      code: `import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function TextareaDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
      <Textarea
        id="textarea-disabled"
        placeholder="Type your message here."
        disabled
      />
    </Field>
  )
}`,
      preview: React.createElement(
        Field,
        { ["data-disabled"]: true } as any,
        React.createElement(
          FieldLabel,
          { htmlFor: "textarea-disabled" },
          "Message"
        ),
        React.createElement(Textarea, {
          id: "textarea-disabled",
          placeholder: "Type your message here.",
          disabled: true,
        })
      ),
    },
    {
      name: "Invalid",
      description:
        "Use the aria-invalid prop to mark the textarea as invalid. To style the invalid state, add the data-invalid attribute to the Field component.",
      code: `import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function TextareaInvalid() {
  return (
    <Field data-invalid>
      <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
      <Textarea
        id="textarea-invalid"
        placeholder="Type your message here."
        aria-invalid
      />
      <FieldDescription>Please enter a valid message.</FieldDescription>
    </Field>
  )
}`,
      preview: React.createElement(
        Field,
        { ["data-invalid"]: true } as any,
        React.createElement(
          FieldLabel,
          { htmlFor: "textarea-invalid" },
          "Message"
        ),
        React.createElement(Textarea, {
          id: "textarea-invalid",
          placeholder: "Type your message here.",
          ["aria-invalid"]: true,
        } as any),
        React.createElement(
          FieldDescription,
          {},
          "Please enter a valid message."
        )
      ),
    },
    {
      name: "Button",
      description:
        "Pair with Button to create a textarea with a submit button.",
      code: `import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function TextareaButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "grid w-full gap-2" },
        React.createElement(Textarea, {
          placeholder: "Type your message here.",
        }),
        React.createElement(Button, {}, "Send message")
      ),
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
        placeholder: "Try: Hello,World or Patient reported pain.No fever.",
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
        "When true, automatically inserts a space after punctuation (. , ! ? ; :) when the next character typed is not a space. Useful for prose fields like notes and comments.",
      default: "false",
    },
  ],
};
