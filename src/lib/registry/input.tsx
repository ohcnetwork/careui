import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { InfoIcon } from "lucide-react";

export const inputDoc: ComponentDoc = {
  id: "input",
  name: "Input",
  description:
    "A text input component for forms and user data entry with built-in styling and accessibility features.",
  installation: {
    cli: "npx shadcn@latest add input",
    manual: "Copy and paste the input component source code into your project.",
  },
  usage: `import { Input } from "@/components/ui/input"

<Input />`,
  preview: {
    code: `<Field>
  <FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>
  <Input id="input-demo-api-key" type="password" placeholder="sk-..." />
  <FieldDescription>
    Your API key is encrypted and stored securely.
  </FieldDescription>
</Field>`,
    component: React.createElement(
      Field,
      {},
      React.createElement(
        FieldLabel,
        { htmlFor: "input-demo-api-key" },
        "API Key"
      ),
      React.createElement(Input, {
        id: "input-demo-api-key",
        type: "password",
        placeholder: "sk-...",
      }),
      React.createElement(
        FieldDescription,
        {},
        "Your API key is encrypted and stored securely."
      )
    ),
  },
  examples: [
    {
      name: "Basic",
      description: "A basic input field.",
      code: `<Input placeholder="Enter text" />`,
      preview: React.createElement(Input, { placeholder: "Enter text" }),
    },
    {
      name: "Field",
      description:
        "Use Field, FieldLabel, and FieldDescription to create an input with a label and description.",
      code: `<Field>
  <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
  <Input
    id="input-field-username"
    type="text"
    placeholder="Enter your username"
  />
  <FieldDescription>
    Choose a unique username for your account.
  </FieldDescription>
</Field>`,
      preview: React.createElement(
        Field,
        {},
        React.createElement(
          FieldLabel,
          { htmlFor: "input-field-username" },
          "Username"
        ),
        React.createElement(Input, {
          id: "input-field-username",
          type: "text",
          placeholder: "Enter your username",
        }),
        React.createElement(
          FieldDescription,
          {},
          "Choose a unique username for your account."
        )
      ),
    },
    {
      name: "Field Group",
      description:
        "Use FieldGroup to show multiple Field blocks and to build forms.",
      code: `<FieldGroup>
  <Field>
    <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
    <Input id="fieldgroup-name" placeholder="Jordan Lee" />
  </Field>
  <Field>
    <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
    <Input
      id="fieldgroup-email"
      type="email"
      placeholder="name@example.com"
    />
    <FieldDescription>
      We'll send updates to this address.
    </FieldDescription>
  </Field>
  <Field orientation="horizontal">
    <Button type="reset" variant="outline">Reset</Button>
    <Button type="submit">Submit</Button>
  </Field>
</FieldGroup>`,
      preview: React.createElement(
        FieldGroup,
        {},
        React.createElement(
          Field,
          {},
          React.createElement(
            FieldLabel,
            { htmlFor: "fieldgroup-name" },
            "Name"
          ),
          React.createElement(Input, {
            id: "fieldgroup-name",
            placeholder: "Jordan Lee",
          })
        ),
        React.createElement(
          Field,
          {},
          React.createElement(
            FieldLabel,
            { htmlFor: "fieldgroup-email" },
            "Email"
          ),
          React.createElement(Input, {
            id: "fieldgroup-email",
            type: "email",
            placeholder: "name@example.com",
          }),
          React.createElement(
            FieldDescription,
            {},
            "We'll send updates to this address."
          )
        ),
        React.createElement(
          Field,
          { orientation: "horizontal" } as any,
          React.createElement(Button, { type: "reset", variant: "outline" }, "Reset"),
          React.createElement(Button, { type: "submit" }, "Submit")
        )
      ),
    },
    {
      name: "Disabled",
      description:
        "Use the disabled prop to disable the input. Add the data-disabled attribute to the Field component to style the disabled state.",
      code: `<Field data-disabled>
  <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
  <Input
    id="input-demo-disabled"
    type="email"
    placeholder="Email"
    disabled
  />
  <FieldDescription>This field is currently disabled.</FieldDescription>
</Field>`,
      preview: React.createElement(
        Field,
        { "data-disabled": "" } as any,
        React.createElement(
          FieldLabel,
          { htmlFor: "input-demo-disabled" },
          "Email"
        ),
        React.createElement(Input, {
          id: "input-demo-disabled",
          type: "email",
          placeholder: "Email",
          disabled: true,
        }),
        React.createElement(
          FieldDescription,
          {},
          "This field is currently disabled."
        )
      ),
    },
    {
      name: "Invalid",
      description:
        "Use the aria-invalid prop to mark the input as invalid. Add the data-invalid attribute to the Field component to style the invalid state.",
      code: `<Field data-invalid>
  <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
  <Input id="input-invalid" placeholder="Error" aria-invalid />
  <FieldDescription>
    This field contains validation errors.
  </FieldDescription>
</Field>`,
      preview: React.createElement(
        Field,
        { "data-invalid": "" } as any,
        React.createElement(
          FieldLabel,
          { htmlFor: "input-invalid" },
          "Invalid Input"
        ),
        React.createElement(Input, {
          id: "input-invalid",
          placeholder: "Error",
          "aria-invalid": true,
        } as any),
        React.createElement(
          FieldDescription,
          {},
          "This field contains validation errors."
        )
      ),
    },
    {
      name: "File",
      description: 'Use the type="file" prop to create a file input.',
      code: `<Field>
  <FieldLabel htmlFor="picture">Picture</FieldLabel>
  <Input id="picture" type="file" />
  <FieldDescription>Select a picture to upload.</FieldDescription>
</Field>`,
      preview: React.createElement(
        Field,
        {},
        React.createElement(FieldLabel, { htmlFor: "picture" }, "Picture"),
        React.createElement(Input, { id: "picture", type: "file" }),
        React.createElement(
          FieldDescription,
          {},
          "Select a picture to upload."
        )
      ),
    },
    {
      name: "Inline",
      description:
        'Use Field with orientation="horizontal" to create an inline input. Pair with Button to create a search input with a button.',
      code: `<Field orientation="horizontal">
  <Input type="search" placeholder="Search..." />
  <Button>Search</Button>
</Field>`,
      preview: React.createElement(
        Field,
        { orientation: "horizontal" } as any,
        React.createElement(Input, {
          type: "search",
          placeholder: "Search...",
        }),
        React.createElement(Button, {}, "Search")
      ),
    },
    {
      name: "Grid",
      description: "Use a grid layout to place multiple inputs side by side.",
      code: `<FieldGroup className="grid max-w-sm grid-cols-2">
  <Field>
    <FieldLabel htmlFor="first-name">First Name</FieldLabel>
    <Input id="first-name" placeholder="Jordan" />
  </Field>
  <Field>
    <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
    <Input id="last-name" placeholder="Lee" />
  </Field>
</FieldGroup>`,
      preview: React.createElement(
        FieldGroup,
        { className: "grid max-w-sm grid-cols-2" },
        React.createElement(
          Field,
          {},
          React.createElement(
            FieldLabel,
            { htmlFor: "first-name" },
            "First Name"
          ),
          React.createElement(Input, { id: "first-name", placeholder: "Jordan" })
        ),
        React.createElement(
          Field,
          {},
          React.createElement(
            FieldLabel,
            { htmlFor: "last-name" },
            "Last Name"
          ),
          React.createElement(Input, { id: "last-name", placeholder: "Lee" })
        )
      ),
    },
    {
      name: "Required",
      description: "Use the required attribute to indicate required inputs.",
      code: `<Field>
  <FieldLabel htmlFor="input-required">
    Required Field <span className="text-destructive">*</span>
  </FieldLabel>
  <Input
    id="input-required"
    placeholder="This field is required"
    required
  />
  <FieldDescription>This field must be filled out.</FieldDescription>
</Field>`,
      preview: React.createElement(
        Field,
        {},
        React.createElement(
          FieldLabel,
          { htmlFor: "input-required" },
          "Required Field ",
          React.createElement(
            "span",
            { className: "text-destructive" },
            "*"
          )
        ),
        React.createElement(Input, {
          id: "input-required",
          placeholder: "This field is required",
          required: true,
        }),
        React.createElement(
          FieldDescription,
          {},
          "This field must be filled out."
        )
      ),
    },
    {
      name: "Badge",
      description:
        "Use Badge in the label to highlight a recommended field.",
      code: `<Field>
  <FieldLabel htmlFor="input-badge">
    Webhook URL{" "}
    <Badge variant="secondary" className="ml-auto">
      Beta
    </Badge>
  </FieldLabel>
  <Input
    id="input-badge"
    type="url"
    placeholder="https://api.example.com/webhook"
  />
</Field>`,
      preview: React.createElement(
        Field,
        {},
        React.createElement(
          FieldLabel,
          { htmlFor: "input-badge" },
          "Webhook URL ",
          React.createElement(
            Badge,
            { variant: "secondary", className: "ml-auto" } as any,
            "Beta"
          )
        ),
        React.createElement(Input, {
          id: "input-badge",
          type: "url",
          placeholder: "https://api.example.com/webhook",
        })
      ),
    },
    {
      name: "Input Group",
      description:
        "To add icons, text, or buttons inside an input, use the InputGroup component. See the Input Group component for more examples.",
      code: `<Field>
  <FieldLabel htmlFor="input-group-url">Website URL</FieldLabel>
  <InputGroup>
    <InputGroupInput id="input-group-url" placeholder="example.com" />
    <InputGroupAddon>
      <InputGroupText>https://</InputGroupText>
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">
      <InfoIcon />
    </InputGroupAddon>
  </InputGroup>
</Field>`,
      preview: React.createElement(
        Field,
        {},
        React.createElement(
          FieldLabel,
          { htmlFor: "input-group-url" },
          "Website URL"
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, {
            id: "input-group-url",
            placeholder: "example.com",
          }),
          React.createElement(
            InputGroupAddon,
            {},
            React.createElement(InputGroupText, {}, "https://")
          ),
          React.createElement(
            InputGroupAddon,
            { align: "inline-end" } as any,
            React.createElement(InfoIcon, {})
          )
        )
      ),
    },
    {
      name: "Button Group",
      description:
        "To add buttons to an input, use the ButtonGroup component. See the Button Group component for more examples.",
      code: `<Field>
  <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
  <ButtonGroup>
    <Input id="input-button-group" placeholder="Type to search..." />
    <Button variant="outline">Search</Button>
  </ButtonGroup>
</Field>`,
      preview: React.createElement(
        Field,
        {},
        React.createElement(
          FieldLabel,
          { htmlFor: "input-button-group" },
          "Search"
        ),
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Input, {
            id: "input-button-group",
            placeholder: "Type to search...",
          }),
          React.createElement(Button, { variant: "outline" }, "Search")
        )
      ),
    },
    {
      name: "Form",
      description:
        "A full form example with multiple inputs, a select, and a button.",
      code: `<form className="w-full max-w-sm">
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="form-name">Name</FieldLabel>
      <Input id="form-name" type="text" placeholder="Evil Rabbit" required />
    </Field>
    <Field>
      <FieldLabel htmlFor="form-email">Email</FieldLabel>
      <Input id="form-email" type="email" placeholder="john@example.com" />
      <FieldDescription>
        We'll never share your email with anyone.
      </FieldDescription>
    </Field>
    <div className="grid grid-cols-2 gap-4">
      <Field>
        <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
        <Input id="form-phone" type="tel" placeholder="+1 (555) 123-4567" />
      </Field>
      <Field>
        <FieldLabel htmlFor="form-country">Country</FieldLabel>
        <Select defaultValue="us">
          <SelectTrigger id="form-country">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
    <Field>
      <FieldLabel htmlFor="form-address">Address</FieldLabel>
      <Input id="form-address" type="text" placeholder="123 Main St" />
    </Field>
    <Field orientation="horizontal">
      <Button type="button" variant="outline">Cancel</Button>
      <Button type="submit">Submit</Button>
    </Field>
  </FieldGroup>
</form>`,
      preview: React.createElement(
        "form",
        { className: "w-full max-w-sm" },
        React.createElement(
          FieldGroup,
          {},
          React.createElement(
            Field,
            {},
            React.createElement(FieldLabel, { htmlFor: "form-name" }, "Name"),
            React.createElement(Input, {
              id: "form-name",
              type: "text",
              placeholder: "Evil Rabbit",
              required: true,
            })
          ),
          React.createElement(
            Field,
            {},
            React.createElement(FieldLabel, { htmlFor: "form-email" }, "Email"),
            React.createElement(Input, {
              id: "form-email",
              type: "email",
              placeholder: "john@example.com",
            }),
            React.createElement(
              FieldDescription,
              {},
              "We'll never share your email with anyone."
            )
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-2 gap-4" },
            React.createElement(
              Field,
              {},
              React.createElement(FieldLabel, { htmlFor: "form-phone" }, "Phone"),
              React.createElement(Input, {
                id: "form-phone",
                type: "tel",
                placeholder: "+1 (555) 123-4567",
              })
            ),
            React.createElement(
              Field,
              {},
              React.createElement(
                FieldLabel,
                { htmlFor: "form-country" },
                "Country"
              ),
              React.createElement(
                Select,
                { defaultValue: "us" },
                React.createElement(
                  SelectTrigger,
                  { id: "form-country" },
                  React.createElement(SelectValue, {})
                ),
                React.createElement(
                  SelectContent,
                  {},
                  React.createElement(SelectItem, { value: "us" }, "United States"),
                  React.createElement(SelectItem, { value: "uk" }, "United Kingdom"),
                  React.createElement(SelectItem, { value: "ca" }, "Canada")
                )
              )
            )
          ),
          React.createElement(
            Field,
            {},
            React.createElement(
              FieldLabel,
              { htmlFor: "form-address" },
              "Address"
            ),
            React.createElement(Input, {
              id: "form-address",
              type: "text",
              placeholder: "123 Main St",
            })
          ),
          React.createElement(
            Field,
            { orientation: "horizontal" } as any,
            React.createElement(
              Button,
              { type: "button", variant: "outline" },
              "Cancel"
            ),
            React.createElement(Button, { type: "submit" }, "Submit")
          )
        )
      ),
    },
    {
      name: "RTL",
      description:
        "Input with RTL (right-to-left) text direction support.",
      code: `<Field dir="rtl">
  <FieldLabel htmlFor="input-rtl-api-key">مفتاح API</FieldLabel>
  <Input
    id="input-rtl-api-key"
    type="password"
    placeholder="sk-..."
    dir="rtl"
  />
  <FieldDescription>
    مفتاح API الخاص بك مشفر ومخزن بأمان.
  </FieldDescription>
</Field>`,
      preview: React.createElement(
        Field,
        { dir: "rtl" } as any,
        React.createElement(
          FieldLabel,
          { htmlFor: "input-rtl-api-key" },
          "مفتاح API"
        ),
        React.createElement(Input, {
          id: "input-rtl-api-key",
          type: "password",
          placeholder: "sk-...",
          dir: "rtl",
        } as any),
        React.createElement(
          FieldDescription,
          {},
          "مفتاح API الخاص بك مشفر ومخزن بأمان."
        )
      ),
    },
  ],
  props: [
    {
      name: "type",
      type: "string",
      description: "The type of input field.",
      default: '"text"',
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text for the input.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the input is disabled.",
      default: "false",
    },
    {
      name: "required",
      type: "boolean",
      description: "Whether the input is required.",
      default: "false",
    },
    {
      name: "aria-invalid",
      type: "boolean",
      description: "Marks the input as invalid for accessibility.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the input.",
    },
  ],
};
