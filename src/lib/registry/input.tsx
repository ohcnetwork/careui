import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ComponentDoc } from "@/lib/types";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "vertical" | "horizontal";
}) {
  return React.createElement("div", {
    className: cn(
      "flex w-full gap-1 max-w-sm",
      orientation === "horizontal" ? "items-center" : "flex-col",
      className
    ),
    ...props,
  });
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return React.createElement("div", {
    className: cn("flex w-full flex-col gap-4 max-w-sm", className),
    ...props,
  });
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return React.createElement("label", {
    className: cn("text-sm font-medium max-w-sm", className),
    ...props,
  });
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return React.createElement("p", {
    className: cn("text-muted-foreground text-sm", className),
    ...props,
  });
}

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
      description: "Use FieldGroup to show multiple Field blocks and forms.",
      code: `<FieldGroup>
  <Field>
    <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
    <Input id="fieldgroup-name" placeholder="Jordan Lee" />
  </Field>
  <Field>
    <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
    <Input id="fieldgroup-email" type="email" placeholder="name@example.com" />
    <FieldDescription>We'll send updates to this address.</FieldDescription>
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
          { orientation: "horizontal" },
          React.createElement(
            Button,
            { type: "reset", variant: "outline" },
            "Reset"
          ),
          React.createElement(Button, { type: "submit" }, "Submit")
        )
      ),
    },
    {
      name: "Disabled",
      description: "An input in disabled state.",
      code: `<Field data-disabled>
  <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
  <Input id="input-demo-disabled" type="email" placeholder="Email" disabled />
  <FieldDescription>This field is currently disabled.</FieldDescription>
</Field>`,
      preview: React.createElement(
        Field,
        { ["data-disabled"]: true } as any,
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
        "Use aria-invalid to mark the input as invalid and data-invalid on Field for styling.",
      code: `<Field data-invalid>
  <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
  <Input id="input-invalid" placeholder="Error" aria-invalid />
  <FieldDescription>This field contains validation errors.</FieldDescription>
</Field>`,
      preview: React.createElement(
        Field,
        { ["data-invalid"]: true } as any,
        React.createElement(
          FieldLabel,
          { htmlFor: "input-invalid" },
          "Invalid Input"
        ),
        React.createElement(Input, {
          id: "input-invalid",
          placeholder: "Error",
          ["aria-invalid"]: true,
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
      description: 'Use type="file" to create a file input.',
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
        React.createElement(FieldDescription, {}, "Select a picture to upload.")
      ),
    },
    {
      name: "Inline",
      description:
        "Use horizontal Field orientation and pair with Button for a search row.",
      code: `<Field orientation="horizontal">
  <Input type="search" placeholder="Search..." />
  <Button>Search</Button>
</Field>`,
      preview: React.createElement(
        Field,
        { orientation: "horizontal" },
        React.createElement(Input, {
          type: "search",
          placeholder: "Search...",
        }),
        React.createElement(Button, {}, "Search")
      ),
    },
    {
      name: "Grid",
      description: "Place multiple inputs side by side with a grid layout.",
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
          React.createElement(Input, {
            id: "first-name",
            placeholder: "Jordan",
          })
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
      description: "Use required to indicate mandatory inputs.",
      code: `<Field>
  <FieldLabel htmlFor="input-required">
    Required Field <span className="text-destructive">*</span>
  </FieldLabel>
  <Input id="input-required" placeholder="This field is required" required />
  <FieldDescription>This field must be filled out.</FieldDescription>
</Field>`,
      preview: React.createElement(
        Field,
        {},
        React.createElement(
          FieldLabel,
          { htmlFor: "input-required" },
          "Required Field ",
          React.createElement("span", { className: "text-destructive" }, "*")
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
      description: "Use Badge in the label to highlight a recommended field.",
      code: `<Field>
  <FieldLabel htmlFor="input-badge">
    Webhook URL
    <Badge variant="secondary" className="ml-auto">Beta</Badge>
  </FieldLabel>
  <Input id="input-badge" type="url" placeholder="https://api.example.com/webhook" />
</Field>`,
      preview: React.createElement(
        Field,
        {},
        React.createElement(
          FieldLabel,
          { htmlFor: "input-badge", className: "flex items-center gap-2" },
          "Webhook URL",
          React.createElement(
            Badge,
            { variant: "neutral", className: "ml-auto" },
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
      description: "Use InputGroup to place text or icons inside an input.",
      code: `import { InputGroupAddon, InputGroupInput, InputGroupText } from "lucide-react"

<Field>
  <FieldLabel htmlFor="input-group-url">Website URL</FieldLabel>
  <InputGroup>
    <InputGroupInput id="input-group-url" placeholder="example.com" />
    <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
    <InputGroupAddon align="inline-end"><InfoIcon /></InputGroupAddon>
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
            { align: "inline-end" },
            React.createElement(InfoIcon, {})
          )
        )
      ),
    },
    {
      name: "Button Group",
      description: "Use ButtonGroup to append an action button to an input.",
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
      description: "A full form example with inputs, a select, and actions.",
      code: `import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "lucide-react"

<form className="w-full max-w-sm">
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="form-name">Name</FieldLabel>
      <Input id="form-name" type="text" placeholder="Evil Rabbit" required />
    </Field>
    <Field>
      <FieldLabel htmlFor="form-email">Email</FieldLabel>
      <Input id="form-email" type="email" placeholder="john@example.com" />
      <FieldDescription>We'll never share your email with anyone.</FieldDescription>
    </Field>
    <div className="grid grid-cols-2 gap-4">
      <Field>
        <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
        <Input id="form-phone" type="tel" placeholder="+1 (555) 123-4567" />
      </Field>
      <Field>
        <FieldLabel htmlFor="form-country">Country</FieldLabel>
        <Select defaultValue="us">
          <SelectTrigger id="form-country"><SelectValue /></SelectTrigger>
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
      <div className="flex gap-4">
        <Button type="submit">Submit</Button>
        <Button type="button" variant="outline">Cancel</Button>
      </div>
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
              React.createElement(
                FieldLabel,
                { htmlFor: "form-phone" },
                "Phone"
              ),
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
                  React.createElement(
                    SelectItem,
                    { value: "us" },
                    "United States"
                  ),
                  React.createElement(
                    SelectItem,
                    { value: "uk" },
                    "United Kingdom"
                  ),
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
            { orientation: "horizontal" },
            React.createElement(
              "div",
              { className: "flex w-full flex-row-reverse gap-4" },
              React.createElement(Button, { type: "submit" }, "Submit"),
              React.createElement(
                Button,
                { type: "button", variant: "outline" },
                "Cancel"
              )
            )
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "type",
      type: "string",
      description: "The HTML input type.",
      default: '"text"',
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text when the input is empty.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disables user interaction.",
      default: "false",
    },
    {
      name: "aria-invalid",
      type: "boolean",
      description: "Marks the input as invalid for accessibility.",
      default: "false",
    },
    {
      name: "required",
      type: "boolean",
      description: "Marks the field as required.",
      default: "false",
    },
  ],
};
