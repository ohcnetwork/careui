import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

// --- Preview: Payment checkout form ---
const fieldPreviewComponent = React.createElement(
  "div",
  { className: "w-full max-w-md" },
  React.createElement(
    "form",
    {},
    React.createElement(
      FieldGroup,
      {},
      // FieldSet: Payment Method
      React.createElement(
        FieldSet,
        {},
        React.createElement(FieldLegend, {}, "Payment Method"),
        React.createElement(
          FieldDescription,
          {},
          "All transactions are secure and encrypted"
        ),
        React.createElement(
          FieldGroup,
          {},
          // Name on Card
          React.createElement(
            Field,
            {},
            React.createElement(
              FieldLabel,
              { htmlFor: "demo-card-name" },
              "Name on Card"
            ),
            React.createElement(Input, {
              id: "demo-card-name",
              placeholder: "Evil Rabbit",
            })
          ),
          // Card Number
          React.createElement(
            Field,
            {},
            React.createElement(
              FieldLabel,
              { htmlFor: "demo-card-number" },
              "Card Number"
            ),
            React.createElement(Input, {
              id: "demo-card-number",
              placeholder: "1234 5678 9012 3456",
            }),
            React.createElement(
              FieldDescription,
              {},
              "Enter your 16-digit card number"
            )
          ),
          // Grid: Month / Year / CVV
          React.createElement(
            "div",
            { className: "grid grid-cols-3 gap-4" },
            // Month
            React.createElement(
              Field,
              {},
              React.createElement(
                FieldLabel,
                { htmlFor: "demo-exp-month" },
                "Month"
              ),
              React.createElement(
                Select,
                { defaultValue: "" },
                React.createElement(
                  SelectTrigger,
                  { id: "demo-exp-month" },
                  React.createElement(SelectValue, { placeholder: "MM" })
                ),
                React.createElement(
                  SelectContent,
                  {},
                  React.createElement(
                    SelectGroup,
                    {},
                    ...[
                      "01","02","03","04","05","06",
                      "07","08","09","10","11","12",
                    ].map((m) =>
                      React.createElement(SelectItem, { key: m, value: m }, m)
                    )
                  )
                )
              )
            ),
            // Year
            React.createElement(
              Field,
              {},
              React.createElement(
                FieldLabel,
                { htmlFor: "demo-exp-year" },
                "Year"
              ),
              React.createElement(
                Select,
                { defaultValue: "" },
                React.createElement(
                  SelectTrigger,
                  { id: "demo-exp-year" },
                  React.createElement(SelectValue, { placeholder: "YYYY" })
                ),
                React.createElement(
                  SelectContent,
                  {},
                  React.createElement(
                    SelectGroup,
                    {},
                    ...[
                      "2024","2025","2026","2027","2028","2029",
                    ].map((y) =>
                      React.createElement(SelectItem, { key: y, value: y }, y)
                    )
                  )
                )
              )
            ),
            // CVV
            React.createElement(
              Field,
              {},
              React.createElement(
                FieldLabel,
                { htmlFor: "demo-cvv" },
                "CVV"
              ),
              React.createElement(Input, {
                id: "demo-cvv",
                placeholder: "123",
              })
            )
          )
        )
      ),
      // Separator
      React.createElement(FieldSeparator, {}),
      // FieldSet: Billing Address
      React.createElement(
        FieldSet,
        {},
        React.createElement(FieldLegend, {}, "Billing Address"),
        React.createElement(
          FieldDescription,
          {},
          "The billing address associated with your payment method"
        ),
        React.createElement(
          FieldGroup,
          {},
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(Checkbox, {
              id: "demo-same-shipping",
              defaultChecked: true,
            }),
            React.createElement(
              FieldLabel,
              { htmlFor: "demo-same-shipping", className: "font-normal" },
              "Same as shipping address"
            )
          )
        )
      ),
      // FieldSet: Comments
      React.createElement(
        FieldSet,
        {},
        React.createElement(
          FieldGroup,
          {},
          React.createElement(
            Field,
            {},
            React.createElement(
              FieldLabel,
              { htmlFor: "demo-comments" },
              "Comments"
            ),
            React.createElement(Textarea, {
              id: "demo-comments",
              placeholder: "Add any additional comments",
              className: "resize-none",
            })
          )
        )
      ),
      // Submit / Cancel
      React.createElement(
        Field,
        { orientation: "horizontal" },
        React.createElement(Button, { type: "submit" }, "Submit"),
        React.createElement(
          Button,
          { variant: "outline", type: "button" },
          "Cancel"
        )
      )
    )
  )
);

export const fieldDoc: ComponentDoc = {
  id: "field",
  name: "Field",
  description:
    "Combine labels, controls, and help text to compose accessible form fields and grouped inputs.",
  installation: {
    cli: "npx shadcn@latest add field",
    manual:
      "Copy and paste the field component source code into your project.",
  },
  usage: `import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"

<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>This appears on invoices and emails.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Full name</FieldLabel>
      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" autoComplete="off" aria-invalid />
      <FieldError>Choose another username.</FieldError>
    </Field>
    <Field orientation="horizontal">
      <Switch id="newsletter" />
      <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>`,
  preview: {
    code: `<div className="w-full max-w-md">
  <form>
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Payment Method</FieldLegend>
        <FieldDescription>All transactions are secure and encrypted</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="card-name">Name on Card</FieldLabel>
            <Input id="card-name" placeholder="Evil Rabbit" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="card-number">Card Number</FieldLabel>
            <Input id="card-number" placeholder="1234 5678 9012 3456" required />
            <FieldDescription>Enter your 16-digit card number</FieldDescription>
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="exp-month">Month</FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="exp-month"><SelectValue placeholder="MM" /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="01">01</SelectItem>
                    {/* ... */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="exp-year">Year</FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="exp-year"><SelectValue placeholder="YYYY" /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="2025">2025</SelectItem>
                    {/* ... */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="cvv">CVV</FieldLabel>
              <Input id="cvv" placeholder="123" required />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend>Billing Address</FieldLegend>
        <FieldDescription>The billing address associated with your payment method</FieldDescription>
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox id="same-shipping" defaultChecked />
            <FieldLabel htmlFor="same-shipping" className="font-normal">Same as shipping address</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="comments">Comments</FieldLabel>
            <Textarea id="comments" placeholder="Add any additional comments" className="resize-none" />
          </Field>
        </FieldGroup>
      </FieldSet>
      <Field orientation="horizontal">
        <Button type="submit">Submit</Button>
        <Button variant="outline" type="button">Cancel</Button>
      </Field>
    </FieldGroup>
  </form>
</div>`,
    component: fieldPreviewComponent,
  },
  examples: [
    // --- Input ---
    {
      name: "Input",
      description:
        "Use Field, FieldLabel, and FieldDescription to compose an accessible input field.",
      code: `<FieldSet className="w-full max-w-xs">
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" type="text" placeholder="Max Leiter" />
      <FieldDescription>Choose a unique username for your account.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <FieldDescription>Must be at least 8 characters long.</FieldDescription>
      <Input id="password" type="password" placeholder="••••••••" />
    </Field>
  </FieldGroup>
</FieldSet>`,
      preview: React.createElement(
        FieldSet,
        { className: "w-full max-w-xs" },
        React.createElement(
          FieldGroup,
          {},
          React.createElement(
            Field,
            {},
            React.createElement(
              FieldLabel,
              { htmlFor: "ex-username" },
              "Username"
            ),
            React.createElement(Input, {
              id: "ex-username",
              type: "text",
              placeholder: "Max Leiter",
            }),
            React.createElement(
              FieldDescription,
              {},
              "Choose a unique username for your account."
            )
          ),
          React.createElement(
            Field,
            {},
            React.createElement(
              FieldLabel,
              { htmlFor: "ex-password" },
              "Password"
            ),
            React.createElement(
              FieldDescription,
              {},
              "Must be at least 8 characters long."
            ),
            React.createElement(Input, {
              id: "ex-password",
              type: "password",
              placeholder: "••••••••",
            })
          )
        )
      ),
    },
    // --- Textarea ---
    {
      name: "Textarea",
      description: "A field wrapping a Textarea control.",
      code: `<FieldSet className="w-full max-w-xs">
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
      <Textarea
        id="feedback"
        placeholder="Your feedback helps us improve..."
        rows={4}
      />
      <FieldDescription>Share your thoughts about our service.</FieldDescription>
    </Field>
  </FieldGroup>
</FieldSet>`,
      preview: React.createElement(
        FieldSet,
        { className: "w-full max-w-xs" },
        React.createElement(
          FieldGroup,
          {},
          React.createElement(
            Field,
            {},
            React.createElement(
              FieldLabel,
              { htmlFor: "ex-feedback" },
              "Feedback"
            ),
            React.createElement(Textarea, {
              id: "ex-feedback",
              placeholder: "Your feedback helps us improve...",
              rows: 4,
            }),
            React.createElement(
              FieldDescription,
              {},
              "Share your thoughts about our service."
            )
          )
        )
      ),
    },
    // --- Select ---
    {
      name: "Select",
      description: "A field wrapping a Select control.",
      code: `<Field className="w-full max-w-xs">
  <FieldLabel>Department</FieldLabel>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Choose department" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="engineering">Engineering</SelectItem>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="marketing">Marketing</SelectItem>
        <SelectItem value="sales">Sales</SelectItem>
        <SelectItem value="support">Customer Support</SelectItem>
        <SelectItem value="hr">Human Resources</SelectItem>
        <SelectItem value="finance">Finance</SelectItem>
        <SelectItem value="operations">Operations</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  <FieldDescription>Select your department or area of work.</FieldDescription>
</Field>`,
      preview: React.createElement(
        Field,
        { className: "w-full max-w-xs" },
        React.createElement(FieldLabel, {}, "Department"),
        React.createElement(
          Select,
          {},
          React.createElement(
            SelectTrigger,
            {},
            React.createElement(SelectValue, { placeholder: "Choose department" })
          ),
          React.createElement(
            SelectContent,
            {},
            React.createElement(
              SelectGroup,
              {},
              React.createElement(SelectItem, { value: "engineering" }, "Engineering"),
              React.createElement(SelectItem, { value: "design" }, "Design"),
              React.createElement(SelectItem, { value: "marketing" }, "Marketing"),
              React.createElement(SelectItem, { value: "sales" }, "Sales"),
              React.createElement(SelectItem, { value: "support" }, "Customer Support"),
              React.createElement(SelectItem, { value: "hr" }, "Human Resources"),
              React.createElement(SelectItem, { value: "finance" }, "Finance"),
              React.createElement(SelectItem, { value: "operations" }, "Operations")
            )
          )
        ),
        React.createElement(
          FieldDescription,
          {},
          "Select your department or area of work."
        )
      ),
    },
    // --- Fieldset ---
    {
      name: "Fieldset",
      description: "Group related fields with FieldSet and FieldLegend.",
      code: `<FieldSet className="w-full max-w-sm">
  <FieldLegend>Address Information</FieldLegend>
  <FieldDescription>We need your address to deliver your order.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="street">Street Address</FieldLabel>
      <Input id="street" type="text" placeholder="123 Main St" />
    </Field>
    <div className="grid grid-cols-2 gap-4">
      <Field>
        <FieldLabel htmlFor="city">City</FieldLabel>
        <Input id="city" type="text" placeholder="New York" />
      </Field>
      <Field>
        <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
        <Input id="zip" type="text" placeholder="90502" />
      </Field>
    </div>
  </FieldGroup>
</FieldSet>`,
      preview: React.createElement(
        FieldSet,
        { className: "w-full max-w-sm" },
        React.createElement(FieldLegend, {}, "Address Information"),
        React.createElement(
          FieldDescription,
          {},
          "We need your address to deliver your order."
        ),
        React.createElement(
          FieldGroup,
          {},
          React.createElement(
            Field,
            {},
            React.createElement(
              FieldLabel,
              { htmlFor: "ex-street" },
              "Street Address"
            ),
            React.createElement(Input, {
              id: "ex-street",
              type: "text",
              placeholder: "123 Main St",
            })
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-2 gap-4" },
            React.createElement(
              Field,
              {},
              React.createElement(
                FieldLabel,
                { htmlFor: "ex-city" },
                "City"
              ),
              React.createElement(Input, {
                id: "ex-city",
                type: "text",
                placeholder: "New York",
              })
            ),
            React.createElement(
              Field,
              {},
              React.createElement(
                FieldLabel,
                { htmlFor: "ex-zip" },
                "Postal Code"
              ),
              React.createElement(Input, {
                id: "ex-zip",
                type: "text",
                placeholder: "90502",
              })
            )
          )
        )
      ),
    },
    // --- Checkbox ---
    {
      name: "Checkbox",
      description:
        "Horizontal Field orientation for checkbox controls with FieldContent for descriptions.",
      code: `<FieldGroup className="w-full max-w-xs">
  <FieldSet>
    <FieldLegend variant="label">Show these items on the desktop</FieldLegend>
    <FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
    <FieldGroup className="gap-3">
      <Field orientation="horizontal">
        <Checkbox id="hard-disks" />
        <FieldLabel htmlFor="hard-disks" className="font-normal">Hard disks</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="external-disks" />
        <FieldLabel htmlFor="external-disks" className="font-normal">External disks</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="cds-dvds" />
        <FieldLabel htmlFor="cds-dvds" className="font-normal">CDs, DVDs, and iPods</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="connected-servers" />
        <FieldLabel htmlFor="connected-servers" className="font-normal">Connected servers</FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
  <FieldSeparator />
  <Field orientation="horizontal">
    <Checkbox id="sync-folders" defaultChecked />
    <FieldContent>
      <FieldLabel htmlFor="sync-folders">Sync Desktop & Documents folders</FieldLabel>
      <FieldDescription>
        Your Desktop & Documents folders are being synced with iCloud Drive.
      </FieldDescription>
    </FieldContent>
  </Field>
</FieldGroup>`,
      preview: React.createElement(
        FieldGroup,
        { className: "w-full max-w-xs" },
        React.createElement(
          FieldSet,
          {},
          React.createElement(
            FieldLegend,
            { variant: "label" },
            "Show these items on the desktop"
          ),
          React.createElement(
            FieldDescription,
            {},
            "Select the items you want to show on the desktop."
          ),
          React.createElement(
            FieldGroup,
            { className: "gap-3" },
            ...[
              { id: "ex-hard-disks", label: "Hard disks" },
              { id: "ex-external-disks", label: "External disks" },
              { id: "ex-cds-dvds", label: "CDs, DVDs, and iPods" },
              { id: "ex-connected-servers", label: "Connected servers" },
            ].map(({ id, label }) =>
              React.createElement(
                Field,
                { key: id, orientation: "horizontal" },
                React.createElement(Checkbox, { id }),
                React.createElement(
                  FieldLabel,
                  { htmlFor: id, className: "font-normal" },
                  label
                )
              )
            )
          )
        ),
        React.createElement(FieldSeparator, {}),
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(Checkbox, {
            id: "ex-sync-folders",
            defaultChecked: true,
          }),
          React.createElement(
            FieldContent,
            {},
            React.createElement(
              FieldLabel,
              { htmlFor: "ex-sync-folders" },
              "Sync Desktop & Documents folders"
            ),
            React.createElement(
              FieldDescription,
              {},
              "Your Desktop & Documents folders are being synced with iCloud Drive. You can access them from other devices."
            )
          )
        )
      ),
    },
    // --- Radio ---
    {
      name: "Radio",
      description: "A group of radio buttons inside a FieldSet.",
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
        React.createElement(
          FieldLegend,
          { variant: "label" },
          "Subscription Plan"
        ),
        React.createElement(
          FieldDescription,
          {},
          "Yearly and lifetime plans offer significant savings."
        ),
        React.createElement(
          RadioGroup,
          { defaultValue: "monthly" },
          ...[
            { value: "monthly", id: "ex-plan-monthly", label: "Monthly ($9.99/month)" },
            { value: "yearly", id: "ex-plan-yearly", label: "Yearly ($99.99/year)" },
            { value: "lifetime", id: "ex-plan-lifetime", label: "Lifetime ($299.99)" },
          ].map(({ value, id, label }) =>
            React.createElement(
              Field,
              { key: value, orientation: "horizontal" },
              React.createElement(RadioGroupItem, { value, id }),
              React.createElement(
                FieldLabel,
                { htmlFor: id, className: "font-normal" },
                label
              )
            )
          )
        )
      ),
    },
    // --- Switch ---
    {
      name: "Switch",
      description: "A horizontal field with a Switch control.",
      code: `<Field orientation="horizontal" className="w-fit">
  <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
  <Switch id="2fa" />
</Field>`,
      preview: React.createElement(
        Field,
        { orientation: "horizontal", className: "w-fit" },
        React.createElement(
          FieldLabel,
          { htmlFor: "ex-2fa" },
          "Multi-factor authentication"
        ),
        React.createElement(Switch, { id: "ex-2fa" })
      ),
    },
    // --- Choice Card ---
    {
      name: "Choice Card",
      description:
        "Wrap Field components inside FieldLabel to create selectable card groups. Works with RadioItem, Checkbox, and Switch.",
      code: `<FieldGroup className="w-full max-w-xs">
  <FieldSet>
    <FieldLegend variant="label">Compute Environment</FieldLegend>
    <FieldDescription>Select the compute environment for your cluster.</FieldDescription>
    <RadioGroup defaultValue="kubernetes">
      <FieldLabel htmlFor="kubernetes">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Kubernetes</FieldTitle>
            <FieldDescription>Run GPU workloads on a K8s cluster.</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="kubernetes" id="kubernetes" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="vm">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Virtual Machine</FieldTitle>
            <FieldDescription>Access a cluster to run GPU workloads.</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="vm" id="vm" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  </FieldSet>
</FieldGroup>`,
      preview: React.createElement(
        FieldGroup,
        { className: "w-full max-w-xs" },
        React.createElement(
          FieldSet,
          {},
          React.createElement(
            FieldLegend,
            { variant: "label" },
            "Compute Environment"
          ),
          React.createElement(
            FieldDescription,
            {},
            "Select the compute environment for your cluster."
          ),
          React.createElement(
            RadioGroup,
            { defaultValue: "kubernetes" },
            React.createElement(
              FieldLabel,
              { htmlFor: "ex-kubernetes" },
              React.createElement(
                Field,
                { orientation: "horizontal" },
                React.createElement(
                  FieldContent,
                  {},
                  React.createElement(FieldTitle, {}, "Kubernetes"),
                  React.createElement(
                    FieldDescription,
                    {},
                    "Run GPU workloads on a K8s cluster."
                  )
                ),
                React.createElement(RadioGroupItem, {
                  value: "kubernetes",
                  id: "ex-kubernetes",
                })
              )
            ),
            React.createElement(
              FieldLabel,
              { htmlFor: "ex-vm" },
              React.createElement(
                Field,
                { orientation: "horizontal" },
                React.createElement(
                  FieldContent,
                  {},
                  React.createElement(FieldTitle, {}, "Virtual Machine"),
                  React.createElement(
                    FieldDescription,
                    {},
                    "Access a cluster to run GPU workloads."
                  )
                ),
                React.createElement(RadioGroupItem, {
                  value: "vm",
                  id: "ex-vm",
                })
              )
            )
          )
        )
      ),
    },
    // --- Field Group ---
    {
      name: "Field Group",
      description:
        "Stack Field components with FieldGroup. Add FieldSeparator to divide sections.",
      code: `<FieldGroup className="w-full max-w-xs">
  <FieldSet>
    <FieldLabel>Responses</FieldLabel>
    <FieldDescription>
      Get notified when ChatGPT responds to requests that take time.
    </FieldDescription>
    <FieldGroup data-slot="checkbox-group">
      <Field orientation="horizontal">
        <Checkbox id="push" defaultChecked disabled />
        <FieldLabel htmlFor="push" className="font-normal">Push notifications</FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
  <FieldSeparator />
  <FieldSet>
    <FieldLabel>Tasks</FieldLabel>
    <FieldDescription>Get notified when tasks you've created have updates.</FieldDescription>
    <FieldGroup data-slot="checkbox-group">
      <Field orientation="horizontal">
        <Checkbox id="push-tasks" />
        <FieldLabel htmlFor="push-tasks" className="font-normal">Push notifications</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="email-tasks" />
        <FieldLabel htmlFor="email-tasks" className="font-normal">Email notifications</FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
</FieldGroup>`,
      preview: React.createElement(
        FieldGroup,
        { className: "w-full max-w-xs" },
        React.createElement(
          FieldSet,
          {},
          React.createElement(FieldLabel, {}, "Responses"),
          React.createElement(
            FieldDescription,
            {},
            "Get notified when ChatGPT responds to requests that take time, like research or image generation."
          ),
          React.createElement(
            FieldGroup,
            { "data-slot": "checkbox-group" } as React.ComponentProps<"div">,
            React.createElement(
              Field,
              { orientation: "horizontal" },
              React.createElement(Checkbox, {
                id: "ex-push",
                defaultChecked: true,
                disabled: true,
              }),
              React.createElement(
                FieldLabel,
                { htmlFor: "ex-push", className: "font-normal" },
                "Push notifications"
              )
            )
          )
        ),
        React.createElement(FieldSeparator, {}),
        React.createElement(
          FieldSet,
          {},
          React.createElement(FieldLabel, {}, "Tasks"),
          React.createElement(
            FieldDescription,
            {},
            "Get notified when tasks you've created have updates."
          ),
          React.createElement(
            FieldGroup,
            { "data-slot": "checkbox-group" } as React.ComponentProps<"div">,
            React.createElement(
              Field,
              { orientation: "horizontal" },
              React.createElement(Checkbox, { id: "ex-push-tasks" }),
              React.createElement(
                FieldLabel,
                { htmlFor: "ex-push-tasks", className: "font-normal" },
                "Push notifications"
              )
            ),
            React.createElement(
              Field,
              { orientation: "horizontal" },
              React.createElement(Checkbox, { id: "ex-email-tasks" }),
              React.createElement(
                FieldLabel,
                { htmlFor: "ex-email-tasks", className: "font-normal" },
                "Email notifications"
              )
            )
          )
        )
      ),
    },
    // --- Validation ---
    {
      name: "Validation",
      description:
        "Add data-invalid to Field and aria-invalid on the control. Render FieldError for the message.",
      code: `<Field data-invalid className="w-full max-w-xs">
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" aria-invalid />
  <FieldError>Enter a valid email address.</FieldError>
</Field>`,
      preview: React.createElement(
        Field,
        { "data-invalid": true, className: "w-full max-w-xs" } as React.ComponentProps<"div">,

        React.createElement(FieldLabel, { htmlFor: "ex-email-invalid" }, "Email"),
        React.createElement(Input, {
          id: "ex-email-invalid",
          type: "email",
          "aria-invalid": true,
          defaultValue: "not-an-email",
        }),
        React.createElement(FieldError, {}, "Enter a valid email address.")
      ),
    },
    // --- Responsive Layout ---
    {
      name: "Responsive Layout",
      description:
        'Set orientation="responsive" for automatic column layouts inside container-aware parents.',
      code: `<div className="w-full max-w-lg">
  <FieldSet>
    <FieldLegend>Profile</FieldLegend>
    <FieldDescription>Fill in your profile information.</FieldDescription>
    <FieldGroup>
      <Field orientation="responsive">
        <FieldContent>
          <FieldLabel htmlFor="r-name">Name</FieldLabel>
          <FieldDescription>Provide your full name for identification</FieldDescription>
        </FieldContent>
        <Input id="r-name" placeholder="Evil Rabbit" required />
      </Field>
      <Field orientation="responsive">
        <Button type="submit">Submit</Button>
        <Button type="button" variant="outline">Cancel</Button>
      </Field>
    </FieldGroup>
  </FieldSet>
</div>`,
      preview: React.createElement(
        "div",
        { className: "w-full max-w-lg" },
        React.createElement(
          FieldSet,
          {},
          React.createElement(FieldLegend, {}, "Profile"),
          React.createElement(
            FieldDescription,
            {},
            "Fill in your profile information."
          ),
          React.createElement(
            FieldGroup,
            {},
            React.createElement(
              Field,
              { orientation: "responsive" },
              React.createElement(
                FieldContent,
                {},
                React.createElement(
                  FieldLabel,
                  { htmlFor: "ex-r-name" },
                  "Name"
                ),
                React.createElement(
                  FieldDescription,
                  {},
                  "Provide your full name for identification"
                )
              ),
              React.createElement(Input, {
                id: "ex-r-name",
                placeholder: "Evil Rabbit",
              })
            ),
            React.createElement(
              Field,
              { orientation: "responsive" },
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
};
