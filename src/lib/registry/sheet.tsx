import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;
const SHEET_SIZES = ["sm", "md", "lg", "xl", "full"] as const;

const loremParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const longFormSheetPreview = React.createElement(
    Sheet,
    null,
    React.createElement(
      SheetTrigger,
      { asChild: true },
      React.createElement(Button, { variant: "outline" }, "Open Registration Form")
    ),
    React.createElement(
      SheetContent,
      { size: "md" },
      React.createElement(
        SheetHeader,
        null,
        React.createElement(SheetTitle, null, "Patient Registration"),
        React.createElement(SheetDescription, null, "Fill in the details below. All fields marked with * are required.")
      ),
      React.createElement(
        SheetBody,
        null,
        React.createElement(
          FieldGroup,
          null,
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-firstname" }, "First name *"),
            React.createElement(Input, { id: "lf-firstname", placeholder: "John" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-lastname" }, "Last name *"),
            React.createElement(Input, { id: "lf-lastname", placeholder: "Doe" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-dob" }, "Date of birth *"),
            React.createElement(Input, { id: "lf-dob", type: "date" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-email" }, "Email address *"),
            React.createElement(Input, { id: "lf-email", type: "email", placeholder: "john@example.com" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-phone" }, "Phone number"),
            React.createElement(Input, { id: "lf-phone", type: "tel", placeholder: "+1 (555) 000-0000" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-age" }, "Age"),
            React.createElement(Input, { id: "lf-age", type: "number", placeholder: "30", min: "0", max: "120" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-address" }, "Street address"),
            React.createElement(Input, { id: "lf-address", placeholder: "123 Main St" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-city" }, "City"),
            React.createElement(Input, { id: "lf-city", placeholder: "San Francisco" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-zip" }, "ZIP / Postal code"),
            React.createElement(Input, { id: "lf-zip", placeholder: "94103" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-ec-name" }, "Emergency contact name"),
            React.createElement(Input, { id: "lf-ec-name", placeholder: "Jane Doe" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-ec-phone" }, "Emergency contact phone"),
            React.createElement(Input, { id: "lf-ec-phone", type: "tel", placeholder: "+1 (555) 000-0001" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-website" }, "Personal website"),
            React.createElement(Input, { id: "lf-website", type: "url", placeholder: "https://example.com" })
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-allergies" }, "Known allergies"),
            React.createElement(Textarea, { id: "lf-allergies", placeholder: "List any known allergies…", rows: 3 }),
            React.createElement(FieldDescription, null, "Separate multiple entries with commas.")
          ),
          React.createElement(Field, null,
            React.createElement(FieldLabel, { htmlFor: "lf-meds" }, "Current medications"),
            React.createElement(Textarea, { id: "lf-meds", placeholder: "List any current medications…", rows: 3 })
          ),
          React.createElement("div", { className: "flex items-center gap-3 py-1" },
            React.createElement(Checkbox, { id: "lf-newsletter" }),
            React.createElement("label", { htmlFor: "lf-newsletter", className: "text-sm cursor-pointer" }, "Subscribe to health tips newsletter")
          ),
          React.createElement("div", { className: "flex items-center gap-3 py-1" },
            React.createElement(Checkbox, { id: "lf-terms" }),
            React.createElement("label", { htmlFor: "lf-terms", className: "text-sm cursor-pointer" }, "I agree to the terms and conditions *")
          ),
          React.createElement("div", { className: "flex items-center justify-between py-1" },
            React.createElement("label", { htmlFor: "lf-sms", className: "text-sm cursor-pointer" }, "Enable SMS appointment reminders"),
            React.createElement(Switch, { id: "lf-sms" })
          )
        )
      ),
      React.createElement(
        SheetFooter,
        null,
        React.createElement(Button, { type: "submit" }, "Submit registration"),
        React.createElement(
          SheetClose,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Cancel")
        )
      )
    )
  );

export const sheetDoc: ComponentDoc = {
  id: "sheet",
  name: "Sheet",
  description:
    "Extends the Dialog component to display content that complements the main content of the screen.",
  installation: {
    cli: "npx shadcn@latest add sheet",
    manual: "Install radix-ui and copy the sheet component source code.",
  },
  usage: `import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Always wrap scrollable content in <SheetBody>.
// SheetContent uses overflow:hidden + flex-col so that the header and footer
// stay pinned even when the mobile keyboard is open. SheetBody is the only
// element that scrolls.
<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This action cannot be undone.</SheetDescription>
    </SheetHeader>
    <SheetBody>
      {/* your form / content goes here */}
    </SheetBody>
    <SheetFooter>
      <SheetClose asChild>
        <Button>Close</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
  preview: {
    code: `import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent size="md">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="sheet-demo-name">Full name</FieldLabel>
              <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <FieldLabel htmlFor="sheet-demo-username">Username</FieldLabel>
              <Input id="sheet-demo-username" defaultValue="@peduarte" />
              <FieldDescription>This is your public display name.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="sheet-demo-email">Email</FieldLabel>
              <Input id="sheet-demo-email" type="email" defaultValue="pedro@example.com" />
              <FieldDescription>Used for notifications and account recovery.</FieldDescription>
            </Field>
          </FieldGroup>
        </SheetBody>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}`,
    component: React.createElement(
      Sheet,
      {},
      React.createElement(
        SheetTrigger,
        { asChild: true },
        React.createElement(Button, { variant: "outline" }, "Open")
      ),
      React.createElement(
        SheetContent,
        { size: "md" },
        React.createElement(
          SheetHeader,
          {},
          React.createElement(SheetTitle, {}, "Edit profile"),
          React.createElement(
            SheetDescription,
            {},
            "Make changes to your profile here. Click save when you're done."
          )
        ),
        React.createElement(
          SheetBody,
          {},
          React.createElement(
            FieldGroup,
            {},
            React.createElement(
              Field,
              {},
              React.createElement(FieldLabel, { htmlFor: "sheet-demo-name" }, "Full name"),
              React.createElement(Input, { id: "sheet-demo-name", defaultValue: "Pedro Duarte" })
            ),
            React.createElement(
              Field,
              {},
              React.createElement(FieldLabel, { htmlFor: "sheet-demo-username" }, "Username"),
              React.createElement(Input, { id: "sheet-demo-username", defaultValue: "@peduarte" }),
              React.createElement(FieldDescription, {}, "This is your public display name.")
            ),
            React.createElement(
              Field,
              {},
              React.createElement(FieldLabel, { htmlFor: "sheet-demo-email" }, "Email"),
              React.createElement(Input, { id: "sheet-demo-email", type: "email", defaultValue: "pedro@example.com" }),
              React.createElement(FieldDescription, {}, "Used for notifications and account recovery.")
            )
          )
        ),
        React.createElement(
          SheetFooter,
          {},
          React.createElement(Button, { type: "submit" }, "Save changes"),
          React.createElement(
            SheetClose,
            { asChild: true },
            React.createElement(Button, { variant: "outline" }, "Close")
          )
        )
      )
    ),
  },
  examples: [
    // ── Side ──────────────────────────────────────────────────────────────
    {
      name: "Side",
      description:
        "Use the `side` prop on `SheetContent` to set the edge of the screen where the sheet appears. Values are `top`, `right`, `bottom`, or `left`.",
      code: `import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

export function SheetSide() {
  return (
    <div className="flex flex-wrap gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </SheetTrigger>
          <SheetContent
            side={side}
            className="data-[side=bottom]:h-dvh data-[side=top]:h-dvh md:data-[side=bottom]:h-[70dvh] md:data-[side=top]:h-[70dvh]"
          >
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <p key={index} className="mb-2 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              ))}
            </SheetBody>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-wrap gap-2" },
        ...SHEET_SIDES.map((side) =>
          React.createElement(
            Sheet,
            { key: side },
            React.createElement(
              SheetTrigger,
              { asChild: true },
              React.createElement(
                Button,
                { variant: "outline", className: "capitalize" },
                side
              )
            ),
            React.createElement(
              SheetContent,
              {
                side,
                className:
                  "data-[side=bottom]:h-dvh data-[side=top]:h-dvh md:data-[side=bottom]:h-[70dvh] md:data-[side=top]:h-[70dvh]",
              },
              React.createElement(
                SheetHeader,
                {},
                React.createElement(SheetTitle, {}, "Edit profile"),
                React.createElement(
                  SheetDescription,
                  {},
                  "Make changes to your profile here. Click save when you're done."
                )
              ),
              React.createElement(
                SheetBody,
                null,
                React.createElement(
                  FieldGroup,
                  null,
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-firstname" }, "First name *"),
                    React.createElement(Input, { id: "lf-firstname", placeholder: "John" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-lastname" }, "Last name *"),
                    React.createElement(Input, { id: "lf-lastname", placeholder: "Doe" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-dob" }, "Date of birth *"),
                    React.createElement(Input, { id: "lf-dob", type: "date" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-email" }, "Email address *"),
                    React.createElement(Input, { id: "lf-email", type: "email", placeholder: "john@example.com" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-phone" }, "Phone number"),
                    React.createElement(Input, { id: "lf-phone", type: "tel", placeholder: "+1 (555) 000-0000" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-age" }, "Age"),
                    React.createElement(Input, { id: "lf-age", type: "number", placeholder: "30", min: "0", max: "120" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-address" }, "Street address"),
                    React.createElement(Input, { id: "lf-address", placeholder: "123 Main St" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-city" }, "City"),
                    React.createElement(Input, { id: "lf-city", placeholder: "San Francisco" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-zip" }, "ZIP / Postal code"),
                    React.createElement(Input, { id: "lf-zip", placeholder: "94103" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-ec-name" }, "Emergency contact name"),
                    React.createElement(Input, { id: "lf-ec-name", placeholder: "Jane Doe" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-ec-phone" }, "Emergency contact phone"),
                    React.createElement(Input, { id: "lf-ec-phone", type: "tel", placeholder: "+1 (555) 000-0001" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-website" }, "Personal website"),
                    React.createElement(Input, { id: "lf-website", type: "url", placeholder: "https://example.com" })
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-allergies" }, "Known allergies"),
                    React.createElement(Textarea, { id: "lf-allergies", placeholder: "List any known allergies…", rows: 3 }),
                    React.createElement(FieldDescription, null, "Separate multiple entries with commas.")
                  ),
                  React.createElement(Field, null,
                    React.createElement(FieldLabel, { htmlFor: "lf-meds" }, "Current medications"),
                    React.createElement(Textarea, { id: "lf-meds", placeholder: "List any current medications…", rows: 3 })
                  ),
                  React.createElement("div", { className: "flex items-center gap-3 py-1" },
                    React.createElement(Checkbox, { id: "lf-newsletter" }),
                    React.createElement("label", { htmlFor: "lf-newsletter", className: "text-sm cursor-pointer" }, "Subscribe to health tips newsletter")
                  ),
                  React.createElement("div", { className: "flex items-center gap-3 py-1" },
                    React.createElement(Checkbox, { id: "lf-terms" }),
                    React.createElement("label", { htmlFor: "lf-terms", className: "text-sm cursor-pointer" }, "I agree to the terms and conditions *")
                  ),
                  React.createElement("div", { className: "flex items-center justify-between py-1" },
                    React.createElement("label", { htmlFor: "lf-sms", className: "text-sm cursor-pointer" }, "Enable SMS appointment reminders"),
                    React.createElement(Switch, { id: "lf-sms" })
                  )
                )
              ),
              React.createElement(
                SheetFooter,
                {},
                React.createElement(Button, { type: "submit" }, "Save changes"),
                React.createElement(
                  SheetClose,
                  { asChild: true },
                  React.createElement(Button, { variant: "outline" }, "Cancel")
                )
              )
            )
          )
        )
      ),
    },

    // ── Sizes ─────────────────────────────────────────────────────────────
    {
      name: "Sizes",
      description:
        "Use the `size` prop on `SheetContent` to control the width on desktop. Available sizes: `sm` (384px), `md` (512px), `lg` (672px), `xl` (896px), `full`, `screen`.",
      code: `import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const SHEET_SIZES = ["sm", "md", "lg", "xl", "full"] as const

export function SheetSizes() {
  return (
    <div className="flex flex-wrap gap-2">
      {SHEET_SIZES.map((size) => (
        <Sheet key={size}>
          <SheetTrigger asChild>
            <Button variant="outline" className="uppercase">
              {size}
            </Button>
          </SheetTrigger>
          <SheetContent size={size}>
            <SheetHeader>
              <SheetTitle>Sheet — {size.toUpperCase()}</SheetTitle>
              <SheetDescription>
                This sheet uses <code>size=&quot;{size}&quot;</code>.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-wrap gap-2" },
        ...SHEET_SIZES.map((size) =>
          React.createElement(
            Sheet,
            { key: size },
            React.createElement(
              SheetTrigger,
              { asChild: true },
              React.createElement(
                Button,
                { variant: "outline", className: "uppercase" },
                size
              )
            ),
            React.createElement(
              SheetContent,
              { size },
              React.createElement(
                SheetHeader,
                {},
                React.createElement(SheetTitle, {}, `Sheet — ${size.toUpperCase()}`),
                React.createElement(
                  SheetDescription,
                  {},
                  `This sheet uses size="${size}".`
                )
              ),
              React.createElement(
                SheetBody,
                {},
                ...Array.from({ length: 10 }, (_, i) =>
                  React.createElement(
                    "p",
                    { key: i, className: "mb-2 leading-relaxed" },
                    loremParagraph
                  )
                )
              ),
              React.createElement(
                SheetFooter,
                {},
                React.createElement(Button, { type: "submit" }, "Save changes"),
                React.createElement(
                  SheetClose,
                  { asChild: true },
                  React.createElement(Button, { variant: "outline" }, "Cancel")
                )
              )
            )
          )
        )
      ),
    },
    // ── Dismissible ───────────────────────────────────────────────────────
    {
      name: "Dismissible",
      description:
        "Set `dismissible={true}` on `SheetContent` to allow closing the sheet by clicking outside. By default sheets are non-dismissible and can only be closed via the close button or the Escape key.",
      code: `import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function SheetDismissible() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open (dismissible)</Button>
      </SheetTrigger>
      <SheetContent dismissible={true} size="md">
        <SheetHeader>
          <SheetTitle>Patient Registration</SheetTitle>
          <SheetDescription>
            Click outside to close. All fields marked with * are required.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="dis-firstname">First name *</FieldLabel>
              <Input id="dis-firstname" placeholder="John" />
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-lastname">Last name *</FieldLabel>
              <Input id="dis-lastname" placeholder="Doe" />
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-dob">Date of birth *</FieldLabel>
              <Input id="dis-dob" type="date" />
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-email">Email address *</FieldLabel>
              <Input id="dis-email" type="email" placeholder="john@example.com" />
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-phone">Phone number</FieldLabel>
              <Input id="dis-phone" type="tel" placeholder="+1 (555) 000-0000" />
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-age">Age</FieldLabel>
              <Input id="dis-age" type="number" placeholder="30" min="0" max="120" />
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-address">Street address</FieldLabel>
              <Input id="dis-address" placeholder="123 Main St" />
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-city">City</FieldLabel>
              <Input id="dis-city" placeholder="San Francisco" />
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-zip">ZIP / Postal code</FieldLabel>
              <Input id="dis-zip" placeholder="94103" />
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-ec-name">Emergency contact name</FieldLabel>
              <Input id="dis-ec-name" placeholder="Jane Doe" />
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-ec-phone">Emergency contact phone</FieldLabel>
              <Input id="dis-ec-phone" type="tel" placeholder="+1 (555) 000-0001" />
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-allergies">Known allergies</FieldLabel>
              <Textarea id="dis-allergies" placeholder="List any known allergies\u2026" rows={3} />
              <FieldDescription>Separate multiple entries with commas.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="dis-meds">Current medications</FieldLabel>
              <Textarea id="dis-meds" placeholder="List any current medications\u2026" rows={3} />
            </Field>
            <div className="flex items-center gap-3 py-1">
              <Checkbox id="dis-terms" />
              <label htmlFor="dis-terms" className="text-sm cursor-pointer">
                I agree to the terms and conditions *
              </label>
            </div>
            <div className="flex items-center justify-between py-1">
              <label htmlFor="dis-sms" className="text-sm cursor-pointer">
                Enable SMS appointment reminders
              </label>
              <Switch id="dis-sms" />
            </div>
          </FieldGroup>
        </SheetBody>
        <SheetFooter>
          <Button type="submit">Submit registration</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}`,
      preview: React.createElement(
        Sheet,
        {},
        React.createElement(
          SheetTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Open (dismissible)")
        ),
        React.createElement(
          SheetContent,
          { dismissible: true, size: "md" } as React.ComponentProps<typeof SheetContent>,
          React.createElement(
            SheetHeader,
            {},
            React.createElement(SheetTitle, {}, "Patient Registration"),
            React.createElement(SheetDescription, {}, "Click outside to close. All fields marked with * are required.")
          ),
          React.createElement(
            SheetBody,
            {},
            React.createElement(
              FieldGroup,
              {},
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-firstname" }, "First name *"),
                React.createElement(Input, { id: "dis-firstname", placeholder: "John" })
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-lastname" }, "Last name *"),
                React.createElement(Input, { id: "dis-lastname", placeholder: "Doe" })
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-dob" }, "Date of birth *"),
                React.createElement(Input, { id: "dis-dob", type: "date" })
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-email" }, "Email address *"),
                React.createElement(Input, { id: "dis-email", type: "email", placeholder: "john@example.com" })
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-phone" }, "Phone number"),
                React.createElement(Input, { id: "dis-phone", type: "tel", placeholder: "+1 (555) 000-0000" })
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-age" }, "Age"),
                React.createElement(Input, { id: "dis-age", type: "number", placeholder: "30", min: "0", max: "120" })
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-address" }, "Street address"),
                React.createElement(Input, { id: "dis-address", placeholder: "123 Main St" })
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-city" }, "City"),
                React.createElement(Input, { id: "dis-city", placeholder: "San Francisco" })
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-zip" }, "ZIP / Postal code"),
                React.createElement(Input, { id: "dis-zip", placeholder: "94103" })
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-ec-name" }, "Emergency contact name"),
                React.createElement(Input, { id: "dis-ec-name", placeholder: "Jane Doe" })
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-ec-phone" }, "Emergency contact phone"),
                React.createElement(Input, { id: "dis-ec-phone", type: "tel", placeholder: "+1 (555) 000-0001" })
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-allergies" }, "Known allergies"),
                React.createElement(Textarea, { id: "dis-allergies", placeholder: "List any known allergies\u2026", rows: 3 }),
                React.createElement(FieldDescription, {}, "Separate multiple entries with commas.")
              ),
              React.createElement(Field, {},
                React.createElement(FieldLabel, { htmlFor: "dis-meds" }, "Current medications"),
                React.createElement(Textarea, { id: "dis-meds", placeholder: "List any current medications\u2026", rows: 3 })
              ),
              React.createElement("div", { className: "flex items-center gap-3 py-1" },
                React.createElement(Checkbox, { id: "dis-terms" }),
                React.createElement("label", { htmlFor: "dis-terms", className: "text-sm cursor-pointer" }, "I agree to the terms and conditions *")
              ),
              React.createElement("div", { className: "flex items-center justify-between py-1" },
                React.createElement("label", { htmlFor: "dis-sms", className: "text-sm cursor-pointer" }, "Enable SMS appointment reminders"),
                React.createElement(Switch, { id: "dis-sms" })
              ),
              React.createElement("div", { className: "flex flex-row-reverse py-4 border-t bg-background gap-4 items-end" },
                React.createElement(Button, { type: "submit" }, "Submit registration"),
                React.createElement(SheetClose, { asChild: true }, React.createElement(Button, { variant: "outline" }, "Cancel"))
              )
            )
          ),
        )
      ),
    },

    // ── Long Form ─────────────────────────────────────────────────────────
    {
      name: "Long Form",
      description:
        "A sheet with a long scrollable form containing 16 fields of varied types — text, email, tel, number, date, url, textarea, checkbox, and switch. The header and footer remain pinned while only `SheetBody` scrolls, including when the mobile keyboard is open.",
      code: `import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function LongFormSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Registration Form</Button>
      </SheetTrigger>
      <SheetContent size="md">
        <SheetHeader>
          <SheetTitle>Patient Registration</SheetTitle>
          <SheetDescription>
            Fill in the details below. All fields marked with * are required.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="lf-firstname">First name *</FieldLabel>
              <Input id="lf-firstname" placeholder="John" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-lastname">Last name *</FieldLabel>
              <Input id="lf-lastname" placeholder="Doe" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-dob">Date of birth *</FieldLabel>
              <Input id="lf-dob" type="date" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-email">Email address *</FieldLabel>
              <Input id="lf-email" type="email" placeholder="john@example.com" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-phone">Phone number</FieldLabel>
              <Input id="lf-phone" type="tel" placeholder="+1 (555) 000-0000" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-age">Age</FieldLabel>
              <Input id="lf-age" type="number" placeholder="30" min="0" max="120" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-address">Street address</FieldLabel>
              <Input id="lf-address" placeholder="123 Main St" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-city">City</FieldLabel>
              <Input id="lf-city" placeholder="San Francisco" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-zip">ZIP / Postal code</FieldLabel>
              <Input id="lf-zip" placeholder="94103" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-ec-name">Emergency contact name</FieldLabel>
              <Input id="lf-ec-name" placeholder="Jane Doe" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-ec-phone">Emergency contact phone</FieldLabel>
              <Input id="lf-ec-phone" type="tel" placeholder="+1 (555) 000-0001" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-website">Personal website</FieldLabel>
              <Input id="lf-website" type="url" placeholder="https://example.com" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-allergies">Known allergies</FieldLabel>
              <Textarea id="lf-allergies" placeholder="List any known allergies…" rows={3} />
              <FieldDescription>Separate multiple entries with commas.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="lf-meds">Current medications</FieldLabel>
              <Textarea id="lf-meds" placeholder="List any current medications…" rows={3} />
            </Field>
            <div className="flex items-center gap-3 py-1">
              <Checkbox id="lf-newsletter" />
              <label htmlFor="lf-newsletter" className="text-sm cursor-pointer">
                Subscribe to health tips newsletter
              </label>
            </div>
            <div className="flex items-center gap-3 py-1">
              <Checkbox id="lf-terms" />
              <label htmlFor="lf-terms" className="text-sm cursor-pointer">
                I agree to the terms and conditions *
              </label>
            </div>
            <div className="flex items-center justify-between py-1">
              <label htmlFor="lf-sms" className="text-sm cursor-pointer">
                Enable SMS appointment reminders
              </label>
              <Switch id="lf-sms" />
            </div>
          </FieldGroup>
        </SheetBody>
        <SheetFooter>
          <Button type="submit">Submit registration</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}`,
      preview: longFormSheetPreview,
    },

    // ── Non-modal ─────────────────────────────────────────────────────────
    {
      name: "Non-modal",
      description:
        "Set `modal={false}` on `Sheet` and `overlay={false}` on `SheetContent` to keep the page behind fully interactive — users can scroll, click, and type outside the sheet while it's open.",
      code: `import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetNonModal() {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="outline">Open non-modal sheet</Button>
      </SheetTrigger>
      <SheetContent overlay={false} size="md">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            The page behind remains scrollable and clickable while this panel is open.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Try interacting with the rest of the page — links, buttons, and
            scrollable areas all remain accessible because{" "}
            <code>modal=&#123;false&#125;</code> disables focus trapping and
            pointer-event blocking.
          </p>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}`,
      preview: React.createElement(
        Sheet,
        { modal: false } as React.ComponentProps<typeof Sheet>,
        React.createElement(
          SheetTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Open non-modal sheet")
        ),
        React.createElement(
          SheetContent,
          { dismissible: true, overlay: false, size: "md" } as React.ComponentProps<typeof SheetContent>,
          React.createElement(
            SheetHeader,
            {},
            React.createElement(SheetTitle, {}, "Filters"),
            React.createElement(
              SheetDescription,
              {},
              "The page behind remains scrollable and clickable while this panel is open."
            )
          ),
          React.createElement(
            SheetBody,
            {},
            React.createElement(
              "p",
              { className: "text-muted-foreground text-sm leading-relaxed" },
              "Try interacting with the rest of the page — links, buttons, and scrollable areas all remain accessible because ",
              React.createElement("code", {}, "modal={false}"),
              " disables focus trapping and pointer-event blocking."
            )
          ),
          React.createElement(
            SheetFooter,
            {},
            React.createElement(
              SheetClose,
              { asChild: true },
              React.createElement(Button, { variant: "outline" }, "Close")
            )
          )
        )
      ),
    },
  ],
};
