import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { type ComponentDoc } from "@/lib/types";

export const fieldDoc: ComponentDoc = {
  id: "field",
  name: "Field",
  description:
    "Combine labels, controls, and help text to compose accessible form fields and grouped inputs.",
  installation: {
    cli: "npx shadcn@latest add field",
    manual: "Copy and paste the field component source code into your project.",
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
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

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
            <FieldLabel htmlFor="checkout-card-name">Name on Card</FieldLabel>
            <Input id="checkout-card-name" placeholder="Evil Rabbit" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="checkout-card-number">Card Number</FieldLabel>
            <Input id="checkout-card-number" placeholder="1234 5678 9012 3456" required />
            <FieldDescription>Enter your 16-digit card number</FieldDescription>
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="checkout-exp-month">Month</FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="checkout-exp-month"><SelectValue placeholder="MM" /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="02">02</SelectItem>
                    <SelectItem value="03">03</SelectItem>
                    <SelectItem value="04">04</SelectItem>
                    <SelectItem value="05">05</SelectItem>
                    <SelectItem value="06">06</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="08">08</SelectItem>
                    <SelectItem value="09">09</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="checkout-exp-year">Year</FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="checkout-exp-year"><SelectValue placeholder="YYYY" /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                    <SelectItem value="2029">2029</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="checkout-cvv">CVV</FieldLabel>
              <Input id="checkout-cvv" placeholder="123" required />
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
            <Checkbox id="checkout-same-shipping" defaultChecked />
            <FieldLabel htmlFor="checkout-same-shipping" className="font-normal">Same as shipping address</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="checkout-comments">Comments</FieldLabel>
            <Textarea id="checkout-comments" placeholder="Add any additional comments" className="resize-none" />
          </Field>
        </FieldGroup>
      </FieldSet>
      <Field orientation="horizontal">
        <div className="flex gap-4">
          <Button type="submit">Submit</Button>
          <Button variant="outline" type="button">Cancel</Button>
        </div>
      </Field>
    </FieldGroup>
  </form>
</div>`,
    component: React.createElement(
      "div",
      { className: "w-full max-w-md" },
      React.createElement(
        "form",
        {},
        React.createElement(
          FieldGroup,
          {},
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
              React.createElement(
                Field,
                {},
                React.createElement(
                  FieldLabel,
                  { htmlFor: "checkout-card-name" },
                  "Name on Card"
                ),
                React.createElement(Input, {
                  id: "checkout-card-name",
                  placeholder: "Evil Rabbit",
                  required: true,
                })
              ),
              React.createElement(
                Field,
                {},
                React.createElement(
                  FieldLabel,
                  { htmlFor: "checkout-card-number" },
                  "Card Number"
                ),
                React.createElement(Input, {
                  id: "checkout-card-number",
                  placeholder: "1234 5678 9012 3456",
                  required: true,
                }),
                React.createElement(
                  FieldDescription,
                  {},
                  "Enter your 16-digit card number"
                )
              ),
              React.createElement(
                "div",
                { className: "grid grid-cols-3 gap-4" },
                React.createElement(
                  Field,
                  {},
                  React.createElement(
                    FieldLabel,
                    { htmlFor: "checkout-exp-month" },
                    "Month"
                  ),
                  React.createElement(
                    Select,
                    { defaultValue: "" },
                    React.createElement(
                      SelectTrigger,
                      { id: "checkout-exp-month" },
                      React.createElement(SelectValue, { placeholder: "MM" })
                    ),
                    React.createElement(
                      SelectContent,
                      {},
                      React.createElement(
                        SelectGroup,
                        {},
                        ...[
                          "01",
                          "02",
                          "03",
                          "04",
                          "05",
                          "06",
                          "07",
                          "08",
                          "09",
                          "10",
                          "11",
                          "12",
                        ].map((month) =>
                          React.createElement(
                            SelectItem,
                            { key: month, value: month },
                            month
                          )
                        )
                      )
                    )
                  )
                ),
                React.createElement(
                  Field,
                  {},
                  React.createElement(
                    FieldLabel,
                    { htmlFor: "checkout-exp-year" },
                    "Year"
                  ),
                  React.createElement(
                    Select,
                    { defaultValue: "" },
                    React.createElement(
                      SelectTrigger,
                      { id: "checkout-exp-year" },
                      React.createElement(SelectValue, { placeholder: "YYYY" })
                    ),
                    React.createElement(
                      SelectContent,
                      {},
                      React.createElement(
                        SelectGroup,
                        {},
                        ...["2024", "2025", "2026", "2027", "2028", "2029"].map(
                          (year) =>
                            React.createElement(
                              SelectItem,
                              { key: year, value: year },
                              year
                            )
                        )
                      )
                    )
                  )
                ),
                React.createElement(
                  Field,
                  {},
                  React.createElement(
                    FieldLabel,
                    { htmlFor: "checkout-cvv" },
                    "CVV"
                  ),
                  React.createElement(Input, {
                    id: "checkout-cvv",
                    placeholder: "123",
                    required: true,
                  })
                )
              )
            )
          ),
          React.createElement(FieldSeparator, {}),
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
                  id: "checkout-same-shipping",
                  defaultChecked: true,
                }),
                React.createElement(
                  FieldLabel,
                  {
                    htmlFor: "checkout-same-shipping",
                    className: "font-normal",
                  },
                  "Same as shipping address"
                )
              )
            )
          ),
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
                  { htmlFor: "checkout-comments" },
                  "Comments"
                ),
                React.createElement(Textarea, {
                  id: "checkout-comments",
                  placeholder: "Add any additional comments",
                  className: "resize-none",
                })
              )
            )
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
                { variant: "outline", type: "button" },
                "Cancel"
              )
            )
          )
        )
      )
    ),
  },
  examples: [
    {
      name: "Input",
      description:
        "Use Field, FieldLabel, and FieldDescription to compose accessible input fields.",
      code: `<FieldSet className="w-full max-w-xs">
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" type="text" placeholder="Max Leiter" />
      <FieldDescription>
        Choose a unique username for your account.
      </FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <FieldDescription>
        Must be at least 8 characters long.
      </FieldDescription>
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
              { htmlFor: "field-input-username" },
              "Username"
            ),
            React.createElement(Input, {
              id: "field-input-username",
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
              { htmlFor: "field-input-password" },
              "Password"
            ),
            React.createElement(
              FieldDescription,
              {},
              "Must be at least 8 characters long."
            ),
            React.createElement(Input, {
              id: "field-input-password",
              type: "password",
              placeholder: "••••••••",
            })
          )
        )
      ),
    },
    {
      name: "Textarea",
      description: "Compose textarea controls with helper text.",
      code: `<FieldSet className="w-full max-w-xs">
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
      <Textarea
        id="feedback"
        placeholder="Your feedback helps us improve..."
        rows={4}
      />
      <FieldDescription>
        Share your thoughts about our service.
      </FieldDescription>
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
              { htmlFor: "field-textarea-feedback" },
              "Feedback"
            ),
            React.createElement(Textarea, {
              id: "field-textarea-feedback",
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
    {
      name: "Select",
      description:
        "Use Field around Select controls for consistent form layout.",
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
  <FieldDescription>
    Select your department or area of work.
  </FieldDescription>
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
            React.createElement(SelectValue, {
              placeholder: "Choose department",
            })
          ),
          React.createElement(
            SelectContent,
            {},
            React.createElement(
              SelectGroup,
              {},
              React.createElement(
                SelectItem,
                { value: "engineering" },
                "Engineering"
              ),
              React.createElement(SelectItem, { value: "design" }, "Design"),
              React.createElement(
                SelectItem,
                { value: "marketing" },
                "Marketing"
              ),
              React.createElement(SelectItem, { value: "sales" }, "Sales"),
              React.createElement(
                SelectItem,
                { value: "support" },
                "Customer Support"
              ),
              React.createElement(
                SelectItem,
                { value: "hr" },
                "Human Resources"
              ),
              React.createElement(SelectItem, { value: "finance" }, "Finance"),
              React.createElement(
                SelectItem,
                { value: "operations" },
                "Operations"
              )
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
    {
      name: "Slider",
      description:
        "Combine FieldTitle and FieldDescription with slider controls.",
      code: `"use client"

import * as React from "react"

export function FieldSlider() {
  const [value, setValue] = React.useState([200, 800])

  return (
    <Field className="w-full max-w-xs">
      <FieldTitle>Price Range</FieldTitle>
      <FieldDescription>
        Set your budget range ($
        <span className="font-medium tabular-nums">{value[0]}</span> -{" "}
        <span className="font-medium tabular-nums">{value[1]}</span>).
      </FieldDescription>
      <Slider
        value={value}
        onValueChange={(value) => setValue(value as [number, number])}
        max={1000}
        min={0}
        step={10}
        className="mt-2 w-full"
        aria-label="Price Range"
      />
    </Field>
  )
}`,
      preview: React.createElement(
        Field,
        { className: "w-full max-w-xs" },
        React.createElement(FieldTitle, {}, "Price Range"),
        React.createElement(
          FieldDescription,
          {},
          "Set your budget range ($200 - $800)."
        ),
        React.createElement(Slider, {
          defaultValue: [200, 800],
          max: 1000,
          min: 0,
          step: 10,
          className: "mt-2 w-full",
          "aria-label": "Price Range",
        })
      ),
    },
    {
      name: "Fieldset",
      description: "Use FieldSet and FieldLegend to structure related inputs.",
      code: `<FieldSet className="w-full max-w-sm">
  <FieldLegend>Address Information</FieldLegend>
  <FieldDescription>
    We need your address to deliver your order.
  </FieldDescription>
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
              { htmlFor: "field-street" },
              "Street Address"
            ),
            React.createElement(Input, {
              id: "field-street",
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
                { htmlFor: "field-city" },
                "City"
              ),
              React.createElement(Input, {
                id: "field-city",
                type: "text",
                placeholder: "New York",
              })
            ),
            React.createElement(
              Field,
              {},
              React.createElement(
                FieldLabel,
                { htmlFor: "field-zip" },
                "Postal Code"
              ),
              React.createElement(Input, {
                id: "field-zip",
                type: "text",
                placeholder: "90502",
              })
            )
          )
        )
      ),
    },
    {
      name: "Checkbox",
      description:
        "Use FieldContent for multiline checkbox descriptions and grouped checkbox settings.",
      code: `<FieldGroup className="w-full max-w-xs">
  <FieldSet>
    <FieldLegend variant="label">Show these items on the desktop</FieldLegend>
    <FieldDescription>
      Select the items you want to show on the desktop.
    </FieldDescription>
    <FieldGroup className="gap-3">
      <Field orientation="horizontal">
        <Checkbox id="hard-disks" defaultChecked />
        <FieldLabel htmlFor="hard-disks" className="font-normal">
          Hard disks
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="external-disks" />
        <FieldLabel htmlFor="external-disks" className="font-normal">
          External disks
        </FieldLabel>
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
            React.createElement(
              Field,
              { orientation: "horizontal" },
              React.createElement(Checkbox, {
                id: "field-hard-disks",
                defaultChecked: true,
              }),
              React.createElement(
                FieldLabel,
                { htmlFor: "field-hard-disks", className: "font-normal" },
                "Hard disks"
              )
            ),
            React.createElement(
              Field,
              { orientation: "horizontal" },
              React.createElement(Checkbox, { id: "field-external-disks" }),
              React.createElement(
                FieldLabel,
                { htmlFor: "field-external-disks", className: "font-normal" },
                "External disks"
              )
            )
          )
        ),
        React.createElement(FieldSeparator, {}),
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(Checkbox, {
            id: "field-sync-folders",
            defaultChecked: true,
          }),
          React.createElement(
            FieldContent,
            {},
            React.createElement(
              FieldLabel,
              { htmlFor: "field-sync-folders" },
              "Sync Desktop & Documents folders"
            ),
            React.createElement(
              FieldDescription,
              {},
              "Your Desktop & Documents folders are being synced with iCloud Drive."
            )
          )
        )
      ),
    },
    {
      name: "Radio",
      description: "Group radio options inside a FieldSet.",
      code: `<FieldSet className="w-full max-w-xs">
  <FieldLegend variant="label">Subscription Plan</FieldLegend>
  <FieldDescription>
    Yearly and lifetime plans offer significant savings.
  </FieldDescription>
  <RadioGroup defaultValue="monthly">
    <Field orientation="horizontal">
      <RadioGroupItem value="monthly" id="plan-monthly" />
      <FieldLabel htmlFor="plan-monthly" className="font-normal">
        Monthly ($9.99/month)
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem value="yearly" id="plan-yearly" />
      <FieldLabel htmlFor="plan-yearly" className="font-normal">
        Yearly ($99.99/year)
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem value="lifetime" id="plan-lifetime" />
      <FieldLabel htmlFor="plan-lifetime" className="font-normal">
        Lifetime ($299.99)
      </FieldLabel>
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
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(RadioGroupItem, {
              value: "monthly",
              id: "field-plan-monthly",
            }),
            React.createElement(
              FieldLabel,
              { htmlFor: "field-plan-monthly", className: "font-normal" },
              "Monthly ($9.99/month)"
            )
          ),
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(RadioGroupItem, {
              value: "yearly",
              id: "field-plan-yearly",
            }),
            React.createElement(
              FieldLabel,
              { htmlFor: "field-plan-yearly", className: "font-normal" },
              "Yearly ($99.99/year)"
            )
          ),
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(RadioGroupItem, {
              value: "lifetime",
              id: "field-plan-lifetime",
            }),
            React.createElement(
              FieldLabel,
              { htmlFor: "field-plan-lifetime", className: "font-normal" },
              "Lifetime ($299.99)"
            )
          )
        )
      ),
    },
    {
      name: "Switch",
      description: "Use horizontal orientation for switch rows.",
      code: `<Field orientation="horizontal" className="w-fit">
  <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
  <Switch id="2fa" />
</Field>`,
      preview: React.createElement(
        Field,
        { orientation: "horizontal", className: "w-fit" },
        React.createElement(
          FieldLabel,
          { htmlFor: "field-2fa" },
          "Multi-factor authentication"
        ),
        React.createElement(Switch, { id: "field-2fa" })
      ),
    },
    {
      name: "Choice Card",
      description:
        "Wrap Field components inside FieldLabel to create selectable field groups.",
      code: `<FieldGroup className="w-full max-w-xs">
  <FieldSet>
    <FieldLegend variant="label">Compute Environment</FieldLegend>
    <FieldDescription>
      Select the compute environment for your cluster.
    </FieldDescription>
    <RadioGroup defaultValue="kubernetes">
      <FieldLabel htmlFor="kubernetes-r2h">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Kubernetes</FieldTitle>
            <FieldDescription>Run GPU workloads on a K8s cluster.</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="kubernetes" id="kubernetes-r2h" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="vm-z4k">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Virtual Machine</FieldTitle>
            <FieldDescription>Access a cluster to run GPU workloads.</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="vm" id="vm-z4k" />
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
              { htmlFor: "field-kubernetes" },
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
                  id: "field-kubernetes",
                })
              )
            ),
            React.createElement(
              FieldLabel,
              { htmlFor: "field-vm" },
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
                  id: "field-vm",
                })
              )
            )
          )
        )
      ),
    },
    {
      name: "Field Group",
      description:
        "Stack Field components with FieldGroup and divide with FieldSeparator.",
      code: `<FieldGroup className="w-full max-w-xs">
  <FieldSet>
    <FieldLabel>Responses</FieldLabel>
    <FieldDescription>
      Get notified when ChatGPT responds to requests that take time, like research or image generation.
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
    <FieldDescription>
      Get notified when tasks you've created have updates. <a href="#">Manage tasks</a>
    </FieldDescription>
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
            {},
            React.createElement(
              Field,
              { orientation: "horizontal" },
              React.createElement(Checkbox, {
                id: "field-push",
                defaultChecked: true,
                disabled: true,
              }),
              React.createElement(
                FieldLabel,
                { htmlFor: "field-push", className: "font-normal" },
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
            "Get notified when tasks you've created have updates. ",
            React.createElement("a", { href: "#" }, "Manage tasks")
          ),
          React.createElement(
            FieldGroup,
            {},
            React.createElement(
              Field,
              { orientation: "horizontal" },
              React.createElement(Checkbox, { id: "field-push-tasks" }),
              React.createElement(
                FieldLabel,
                { htmlFor: "field-push-tasks", className: "font-normal" },
                "Push notifications"
              )
            ),
            React.createElement(
              Field,
              { orientation: "horizontal" },
              React.createElement(Checkbox, { id: "field-email-tasks" }),
              React.createElement(
                FieldLabel,
                { htmlFor: "field-email-tasks", className: "font-normal" },
                "Email notifications"
              )
            )
          )
        )
      ),
    },
    {
      name: "Anatomy",
      description:
        "Typical structure for a single field with helper and error text.",
      code: `<Field>
  <FieldLabel htmlFor="input-id">Label</FieldLabel>
  {/* Input, Select, Switch, etc. */}
  <FieldDescription>Optional helper text.</FieldDescription>
  <FieldError>Validation message.</FieldError>
</Field>`,
      preview: React.createElement(
        Field,
        {},
        React.createElement(FieldLabel, { htmlFor: "field-anatomy" }, "Label"),
        React.createElement(Input, {
          id: "field-anatomy",
          placeholder: "Input",
        }),
        React.createElement(FieldDescription, {}, "Optional helper text."),
        React.createElement(FieldError, {}, "Validation message.")
      ),
    },
    {
      name: "Form",
      description:
        "Use Field with the Form docs patterns and validation libraries like React Hook Form or TanStack Form.",
      code: `See the Form documentation for building forms with Field and schema validators.`,
      preview: React.createElement(
        "p",
        { className: "text-muted-foreground text-sm" },
        "See Form docs for React Hook Form and TanStack Form integration patterns."
      ),
    },
    {
      name: "RTL",
      description:
        "Field supports RTL layouts by passing dir=rtl to the container.",
      code: `<div dir="rtl" className="w-full max-w-md py-6">
  <FieldGroup>
    <FieldSet>
      <FieldLegend>طريقة الدفع</FieldLegend>
      <FieldDescription>جميع المعاملات آمنة ومشفرة</FieldDescription>
      <Field>
        <FieldLabel htmlFor="rtl-name">الاسم على البطاقة</FieldLabel>
        <Input id="rtl-name" placeholder="Evil Rabbit" />
      </Field>
    </FieldSet>
  </FieldGroup>
</div>`,
      preview: React.createElement(
        "div",
        { dir: "rtl", className: "w-full max-w-md" },
        React.createElement(
          FieldGroup,
          {},
          React.createElement(
            FieldSet,
            {},
            React.createElement(FieldLegend, {}, "طريقة الدفع"),
            React.createElement(
              FieldDescription,
              {},
              "جميع المعاملات آمنة ومشفرة"
            ),
            React.createElement(
              Field,
              {},
              React.createElement(
                FieldLabel,
                { htmlFor: "field-rtl-name" },
                "الاسم على البطاقة"
              ),
              React.createElement(Input, {
                id: "field-rtl-name",
                placeholder: "Evil Rabbit",
              })
            )
          )
        )
      ),
    },
    {
      name: "Responsive Layout",
      description:
        "Use orientation=responsive for automatic container-aware layouts.",
      code: `<div className="w-full max-w-lg">
  <form>
    <FieldSet>
      <FieldLegend>Profile</FieldLegend>
      <FieldDescription>Fill in your profile information.</FieldDescription>
      <FieldGroup>
        <Field orientation="responsive">
          <FieldContent>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <FieldDescription>
              Provide your full name for identification
            </FieldDescription>
          </FieldContent>
          <Input id="name" placeholder="Evil Rabbit" required />
        </Field>
        <Field orientation="responsive">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="outline">Cancel</Button>
        </Field>
      </FieldGroup>
    </FieldSet>
  </form>
</div>`,
      preview: React.createElement(
        "div",
        { className: "w-full max-w-lg" },
        React.createElement(
          "form",
          {},
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
                    { htmlFor: "field-responsive-name" },
                    "Name"
                  ),
                  React.createElement(
                    FieldDescription,
                    {},
                    "Provide your full name for identification"
                  )
                ),
                React.createElement(Input, {
                  id: "field-responsive-name",
                  placeholder: "Evil Rabbit",
                  required: true,
                })
              ),
              React.createElement(
                Field,
                { orientation: "responsive" },
                React.createElement(Button, { type: "submit" }, "Submit"),
                React.createElement(
                  Button,
                  { variant: "outline", type: "button" },
                  "Cancel"
                )
              )
            )
          )
        )
      ),
    },
    {
      name: "Validation and Errors",
      description: "Add data-invalid to Field and aria-invalid to controls.",
      code: `<Field data-invalid>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" aria-invalid />
  <FieldError>Enter a valid email address.</FieldError>
</Field>`,
      preview: React.createElement(
        Field,
        { ["data-invalid"]: true } as unknown as React.ComponentProps<
          typeof Field
        >,
        React.createElement(
          FieldLabel,
          { htmlFor: "field-validation-email" },
          "Email"
        ),
        React.createElement(Input, {
          id: "field-validation-email",
          type: "email",
          ["aria-invalid"]: true,
        }),
        React.createElement(FieldError, {}, "Enter a valid email address.")
      ),
    },
    {
      name: "Accessibility",
      description:
        "Use FieldSet/FieldLegend for semantic groups and keep separators sparse for clear screen-reader flow.",
      code: `- FieldSet + FieldLegend keep related controls grouped.
- Field renders role=group for grouped controls.
- Use FieldSeparator sparingly to preserve reading flow.`,
      preview: React.createElement(
        "ul",
        { className: "text-muted-foreground list-disc space-y-1 pl-5 text-sm" },
        React.createElement(
          "li",
          {},
          "Use FieldSet and FieldLegend to group related controls."
        ),
        React.createElement(
          "li",
          {},
          "Field renders role=group for grouped controls."
        ),
        React.createElement(
          "li",
          {},
          "Use FieldSeparator sparingly for clearer reading flow."
        )
      ),
    },
  ],
  props: [
    {
      name: "FieldSet.className",
      type: "string",
      description: "Container class applied to the semantic fieldset wrapper.",
    },
    {
      name: "FieldLegend.variant",
      type: '"legend" | "label"',
      description: "Legend style variant.",
      default: '"legend"',
    },
    {
      name: "FieldGroup.className",
      type: "string",
      description:
        "Layout wrapper class for stacking and container-query grouping.",
    },
    {
      name: "Field.orientation",
      type: '"vertical" | "horizontal" | "responsive"',
      description: "Orientation for control and label layout.",
      default: '"vertical"',
    },
    {
      name: "Field.data-invalid",
      type: "boolean",
      description: "Marks a field block as invalid for styling.",
    },
    {
      name: "FieldContent.className",
      type: "string",
      description: "Class for grouping label and helper text in a column.",
    },
    {
      name: "FieldLabel.asChild",
      type: "boolean",
      description: "Whether to render label via slot composition.",
      default: "false",
    },
    {
      name: "FieldDescription.className",
      type: "string",
      description: "Class for helper text slot.",
    },
    {
      name: "FieldSeparator.className",
      type: "string",
      description: "Class for the visual separator between grouped sections.",
    },
    {
      name: "FieldError.errors",
      type: "Array<{ message?: string } | undefined>",
      description: "Error list consumed by FieldError.",
    },
  ],
};
