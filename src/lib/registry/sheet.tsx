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

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;
const SHEET_SIZES = ["sm", "md", "lg", "xl", "full"] as const;

const loremParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This action cannot be undone.</SheetDescription>
    </SheetHeader>
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
            className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
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
                  "data-[side=bottom]:h-dvh data-[side=top]:h-dvh md:data-[side=bottom]:max-h-[70vh] md:data-[side=top]:max-h-[70vh]",
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

export function SheetDismissible() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open (dismissible)</Button>
      </SheetTrigger>
      <SheetContent dismissible={true}>
        <SheetHeader>
          <SheetTitle>Dismissible sheet</SheetTitle>
          <SheetDescription>
            Click outside to close this sheet.
          </SheetDescription>
        </SheetHeader>
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
        {},
        React.createElement(
          SheetTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Open (dismissible)")
        ),
        React.createElement(
          SheetContent,
          { dismissible: true } as React.ComponentProps<typeof SheetContent>,
          React.createElement(
            SheetHeader,
            {},
            React.createElement(SheetTitle, {}, "Dismissible sheet"),
            React.createElement(
              SheetDescription,
              {},
              "Click outside to close this sheet."
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
