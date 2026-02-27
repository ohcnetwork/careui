import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export const popoverDoc: ComponentDoc = {
  id: "popover",
  name: "Popover",
  description: "Displays rich content in a portal, triggered by a button.",
  installation: {
    cli: "npx shadcn@latest add popover",
    manual:
      "Install radix-ui and copy the popover component source code into your project.",
  },
  usage: `import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"`,
  preview: {
    code: `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
    component: React.createElement(
      Popover,
      {},
      React.createElement(
        PopoverTrigger,
        { asChild: true },
        React.createElement(Button, { variant: "outline" }, "Open popover")
      ),
      React.createElement(
        PopoverContent,
        { className: "w-80" },
        React.createElement(
          "div",
          { className: "grid gap-4" },
          React.createElement(
            "div",
            { className: "space-y-2" },
            React.createElement(
              "h4",
              { className: "leading-none font-medium" },
              "Dimensions"
            ),
            React.createElement(
              "p",
              { className: "text-muted-foreground text-sm" },
              "Set the dimensions for the layer."
            )
          ),
          React.createElement(
            "div",
            { className: "grid gap-2" },
            React.createElement(
              "div",
              { className: "grid grid-cols-3 items-center gap-4" },
              React.createElement(Label, { htmlFor: "width" }, "Width"),
              React.createElement(Input, {
                id: "width",
                defaultValue: "100%",
                className: "col-span-2 h-8",
              })
            ),
            React.createElement(
              "div",
              { className: "grid grid-cols-3 items-center gap-4" },
              React.createElement(Label, { htmlFor: "maxWidth" }, "Max. width"),
              React.createElement(Input, {
                id: "maxWidth",
                defaultValue: "300px",
                className: "col-span-2 h-8",
              })
            ),
            React.createElement(
              "div",
              { className: "grid grid-cols-3 items-center gap-4" },
              React.createElement(Label, { htmlFor: "height" }, "Height"),
              React.createElement(Input, {
                id: "height",
                defaultValue: "25px",
                className: "col-span-2 h-8",
              })
            ),
            React.createElement(
              "div",
              { className: "grid grid-cols-3 items-center gap-4" },
              React.createElement(Label, { htmlFor: "maxHeight" }, "Max. height"),
              React.createElement(Input, {
                id: "maxHeight",
                defaultValue: "none",
                className: "col-span-2 h-8",
              })
            )
          )
        )
      )
    ),
  },
  examples: [
    {
      name: "Basic",
      description: "A simple popover with a header, title, and description.",
      code: `import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverBasic() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}`,
      preview: React.createElement(
        Popover,
        {},
        React.createElement(
          PopoverTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Open Popover")
        ),
        React.createElement(
          PopoverContent,
          { align: "start" },
          React.createElement(
            PopoverHeader,
            {},
            React.createElement(PopoverTitle, {}, "Dimensions"),
            React.createElement(
              PopoverDescription,
              {},
              "Set the dimensions for the layer."
            )
          )
        )
      ),
    },
    {
      name: "Align",
      description:
        "Use the align prop on PopoverContent to control the horizontal alignment.",
      code: `import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverAlignments() {
  return (
    <div className="flex gap-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Start
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-40">
          Aligned to start
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Center
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-40">
          Aligned to center
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            End
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-40">
          Aligned to end
        </PopoverContent>
      </Popover>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex gap-6" },
        React.createElement(
          Popover,
          {},
          React.createElement(
            PopoverTrigger,
            { asChild: true },
            React.createElement(
              Button,
              { variant: "outline", size: "sm" },
              "Start"
            )
          ),
          React.createElement(
            PopoverContent,
            { align: "start", className: "w-40" },
            "Aligned to start"
          )
        ),
        React.createElement(
          Popover,
          {},
          React.createElement(
            PopoverTrigger,
            { asChild: true },
            React.createElement(
              Button,
              { variant: "outline", size: "sm" },
              "Center"
            )
          ),
          React.createElement(
            PopoverContent,
            { align: "center", className: "w-40" },
            "Aligned to center"
          )
        ),
        React.createElement(
          Popover,
          {},
          React.createElement(
            PopoverTrigger,
            { asChild: true },
            React.createElement(
              Button,
              { variant: "outline", size: "sm" },
              "End"
            )
          ),
          React.createElement(
            PopoverContent,
            { align: "end", className: "w-40" },
            "Aligned to end"
          )
        )
      ),
    },
    {
      name: "With Form",
      description: "A popover with form fields inside.",
      code: `import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverForm() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <FieldGroup className="gap-4">
          <Field orientation="horizontal">
            <FieldLabel htmlFor="width" className="w-1/2">
              Width
            </FieldLabel>
            <Input id="width" defaultValue="100%" />
          </Field>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="height" className="w-1/2">
              Height
            </FieldLabel>
            <Input id="height" defaultValue="25px" />
          </Field>
        </FieldGroup>
        <div className="bg-popover sticky bottom-0 -mx-4 -mb-4 mt-2 flex items-center justify-end gap-2 border-t px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button size="sm" onClick={() => setOpen(false)}>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
      preview: React.createElement(
        function PopoverFormPreview() {
          const [open, setOpen] = React.useState(false);
          return React.createElement(
            Popover,
            { open, onOpenChange: setOpen },
            React.createElement(
              PopoverTrigger,
              { asChild: true },
              React.createElement(Button, { variant: "outline" }, "Open Popover")
            ),
            React.createElement(
              PopoverContent,
              { className: "w-64", align: "start" },
              React.createElement(
                PopoverHeader,
                {},
                React.createElement(PopoverTitle, {}, "Dimensions"),
                React.createElement(
                  PopoverDescription,
                  {},
                  "Set the dimensions for the layer."
                )
              ),
              React.createElement(
                FieldGroup,
                { className: "gap-4" },
                React.createElement(
                  Field,
                  { orientation: "vertical" },
                  React.createElement(
                    FieldLabel,
                    { htmlFor: "width", className: "w-1/2" },
                    "Width"
                  ),
                  React.createElement(Input, { id: "width", defaultValue: "100%" })
                ),
                React.createElement(
                  Field,
                  { orientation: "vertical" },
                  React.createElement(
                    FieldLabel,
                    { htmlFor: "height", className: "w-1/2" },
                    "Height"
                  ),
                  React.createElement(Input, { id: "height", defaultValue: "25px" })
                )
              ),
              React.createElement(
                "div",
                {
                  className:
                    "bg-popover sticky bottom-0 -mx-4 -mb-4 mt-2 flex items-center justify-end gap-4 border-t px-4 py-3",
                },
                React.createElement(
                  Button,
                  { variant: "ghost", size: "default", onClick: () => setOpen(false) },
                  "Close"
                ),
                React.createElement(Button, { size: "default", onClick: () => setOpen(false) }, "Save")
              )
            )
          );
        },
        {}
      ),
    },
  ],
};
