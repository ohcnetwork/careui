import React from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { type ComponentDoc } from "@/lib/types";
import { ChevronRight, Mail, Plus, Trash2, X } from "lucide-react";

export const buttonDoc: ComponentDoc = {
  id: "button",
  name: "Button",
  description: "Displays a button or a component that looks like a button.",
  installation: {
    cli: "npx shadcn@latest add button",
    manual:
      "Copy and paste the button component source code into your project.",
  },
  usage: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Click me</Button>
}`,
  preview: {
    code: `<div className="flex gap-2 flex-wrap">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="tertiary">Tertiary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="destructive-solid">Destructive Solid</Button>
</div>`,
    component: React.createElement(
      "div",
      { className: "flex gap-8 flex-wrap" },
      React.createElement(Button, {}, "Default"),
      React.createElement(Button, { variant: "secondary" }, "Secondary"),
      React.createElement(Button, { variant: "tertiary" }, "Tertiary"),
      React.createElement(Button, { variant: "outline" }, "Outline"),
      React.createElement(Button, { variant: "ghost" }, "Ghost"),
      React.createElement(Button, { variant: "link" }, "Link"),
      React.createElement(Button, { variant: "destructive" }, "Destructive"),
      React.createElement(
        Button,
        { variant: "destructive-solid" },
        "Destructive Solid"
      )
    ),
  },
  examples: [
    {
      name: "Sizes",
      description: "Different button sizes.",
      code: `<div className="flex gap-2 items-center flex-wrap">
  <Button size="xs">Extra Small</Button>
  <Button size="sm">Small</Button>
  <Button>Default</Button>
  <Button size="lg">Large</Button>
  <Button size="xl">Extra Large</Button>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex gap-2 items-center flex-wrap" },
        React.createElement(Button, { size: "xs" }, "Extra Small"),
        React.createElement(Button, { size: "sm" }, "Small"),
        React.createElement(Button, {}, "Default"),
        React.createElement(Button, { size: "lg" }, "Large"),
        React.createElement(Button, { size: "xl" }, "Extra Large")
      ),
    },
    {
      name: "With Icons",
      description: "Buttons with icons on the left or right side.",
      code: `import { Mail, Plus } from "lucide-react"

<div className="flex gap-2 flex-wrap">
  <Button>
    <Mail data-icon="inline-start" />
    Login with Email
  </Button>
  <Button variant="secondary">
    <Plus data-icon="inline-start" />
    Add Item
  </Button>
  <Button variant="outline">
    Continue
    <ChevronRight data-icon="inline-end" />
  </Button>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex gap-2 flex-wrap" },
        React.createElement(
          Button,
          {},
          React.createElement(Mail, { ["data-icon"]: "inline-start" } as any),
          "Login with Email"
        ),
        React.createElement(
          Button,
          { variant: "secondary" },
          React.createElement(Plus, { ["data-icon"]: "inline-start" } as any),
          "Add Item"
        ),
        React.createElement(
          Button,
          { variant: "outline" },
          "Continue",
          React.createElement(ChevronRight, {
            ["data-icon"]: "inline-end",
          } as any)
        )
      ),
    },
    {
      name: "As Child",
      description:
        "Use the asChild prop on <Button /> to make another component look like a button. Here's an example of a link that looks like a button.",
      code: `import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}`,
      preview: React.createElement(
        Button,
        { asChild: true },
        React.createElement("a", { href: "#" }, "Login")
      ),
    },
    {
      name: "All Variants with Icons",
      description: "All button variants with icons across all sizes.",
      code: `import { Mail } from "lucide-react"

<div className="space-y-4">
  {/* Extra Small */}
  <div className="space-y-2">
    <p className="text-xs font-medium text-muted-foreground">Extra Small (xs)</p>
    <div className="flex gap-2 flex-wrap">
      <Button size="xs">
        <Mail data-icon="inline-start" />
        Default
      </Button>
      <Button size="xs" variant="secondary">
        <Mail data-icon="inline-start" />
        Secondary
      </Button>
      <Button size="xs" variant="tertiary">
        <Mail data-icon="inline-start" />
        Tertiary
      </Button>
      <Button size="xs" variant="outline">
        <Mail data-icon="inline-start" />
        Outline
      </Button>
      <Button size="xs" variant="ghost">
        <Mail data-icon="inline-start" />
        Ghost
      </Button>
      <Button size="xs" variant="destructive">
        <Mail data-icon="inline-start" />
        Destructive
      </Button>
    </div>
  </div>

  {/* Small */}
  <div className="space-y-2">
    <p className="text-xs font-medium text-muted-foreground">Small (sm)</p>
    <div className="flex gap-2 flex-wrap">
      <Button size="sm">
        <Mail data-icon="inline-start" />
        Default
      </Button>
      <Button size="sm" variant="secondary">
        <Mail data-icon="inline-start" />
        Secondary
      </Button>
      <Button size="sm" variant="tertiary">
        <Mail data-icon="inline-start" />
        Tertiary
      </Button>
      <Button size="sm" variant="outline">
        <Mail data-icon="inline-start" />
        Outline
      </Button>
      <Button size="sm" variant="ghost">
        <Mail data-icon="inline-start" />
        Ghost
      </Button>
      <Button size="sm" variant="destructive">
        <Mail data-icon="inline-start" />
        Destructive
      </Button>
    </div>
  </div>

  {/* Default */}
  <div className="space-y-2">
    <p className="text-xs font-medium text-muted-foreground">Default</p>
    <div className="flex gap-2 flex-wrap">
      <Button>
        <Mail data-icon="inline-start" />
        Default
      </Button>
      <Button variant="secondary">
        <Mail data-icon="inline-start" />
        Secondary
      </Button>
      <Button variant="tertiary">
        <Mail data-icon="inline-start" />
        Tertiary
      </Button>
      <Button variant="outline">
        <Mail data-icon="inline-start" />
        Outline
      </Button>
      <Button variant="ghost">
        <Mail data-icon="inline-start" />
        Ghost
      </Button>
      <Button variant="destructive">
        <Mail data-icon="inline-start" />
        Destructive
      </Button>
    </div>
  </div>

  {/* Large */}
  <div className="space-y-2">
    <p className="text-xs font-medium text-muted-foreground">Large (lg)</p>
    <div className="flex gap-2 flex-wrap">
      <Button size="lg">
        <Mail data-icon="inline-start" />
        Default
      </Button>
      <Button size="lg" variant="secondary">
        <Mail data-icon="inline-start" />
        Secondary
      </Button>
      <Button size="lg" variant="tertiary">
        <Mail data-icon="inline-start" />
        Tertiary
      </Button>
      <Button size="lg" variant="outline">
        <Mail data-icon="inline-start" />
        Outline
      </Button>
      <Button size="lg" variant="ghost">
        <Mail data-icon="inline-start" />
        Ghost
      </Button>
      <Button size="lg" variant="destructive">
        <Mail data-icon="inline-start" />
        Destructive
      </Button>
    </div>
  </div>

  {/* Extra Large */}
  <div className="space-y-2">
    <p className="text-xs font-medium text-muted-foreground">Extra Large (xl)</p>
    <div className="flex gap-2 flex-wrap">
      <Button size="xl">
        <Mail data-icon="inline-start" />
        Default
      </Button>
      <Button size="xl" variant="secondary">
        <Mail data-icon="inline-start" />
        Secondary
      </Button>
      <Button size="xl" variant="tertiary">
        <Mail data-icon="inline-start" />
        Tertiary
      </Button>
      <Button size="xl" variant="outline">
        <Mail data-icon="inline-start" />
        Outline
      </Button>
      <Button size="xl" variant="ghost">
        <Mail data-icon="inline-start" />
        Ghost
      </Button>
      <Button size="xl" variant="destructive">
        <Mail data-icon="inline-start" />
        Destructive
      </Button>
    </div>
  </div>
</div>`,
      preview: React.createElement(
        "div",
        { className: "space-y-4" },
        // Extra Small
        React.createElement(
          "div",
          { className: "space-y-2" },
          React.createElement(
            "p",
            { className: "text-xs font-medium text-muted-foreground" },
            "Extra Small (xs)"
          ),
          React.createElement(
            "div",
            { className: "flex gap-2 flex-wrap" },
            React.createElement(
              Button,
              { size: "xs" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Default"
            ),
            React.createElement(
              Button,
              { size: "xs", variant: "secondary" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Secondary"
            ),
            React.createElement(
              Button,
              { size: "xs", variant: "tertiary" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Tertiary"
            ),
            React.createElement(
              Button,
              { size: "xs", variant: "outline" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Outline"
            ),
            React.createElement(
              Button,
              { size: "xs", variant: "ghost" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Ghost"
            ),
            React.createElement(
              Button,
              { size: "xs", variant: "destructive" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Destructive"
            )
          )
        ),
        // Small
        React.createElement(
          "div",
          { className: "space-y-2" },
          React.createElement(
            "p",
            { className: "text-xs font-medium text-muted-foreground" },
            "Small (sm)"
          ),
          React.createElement(
            "div",
            { className: "flex gap-2 flex-wrap" },
            React.createElement(
              Button,
              { size: "sm" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Default"
            ),
            React.createElement(
              Button,
              { size: "sm", variant: "secondary" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Secondary"
            ),
            React.createElement(
              Button,
              { size: "sm", variant: "tertiary" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Tertiary"
            ),
            React.createElement(
              Button,
              { size: "sm", variant: "outline" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Outline"
            ),
            React.createElement(
              Button,
              { size: "sm", variant: "ghost" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Ghost"
            ),
            React.createElement(
              Button,
              { size: "sm", variant: "destructive" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Destructive"
            )
          )
        ),
        // Default
        React.createElement(
          "div",
          { className: "space-y-2" },
          React.createElement(
            "p",
            { className: "text-xs font-medium text-muted-foreground" },
            "Default"
          ),
          React.createElement(
            "div",
            { className: "flex gap-2 flex-wrap" },
            React.createElement(
              Button,
              {},
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Default"
            ),
            React.createElement(
              Button,
              { variant: "secondary" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Secondary"
            ),
            React.createElement(
              Button,
              { variant: "tertiary" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Tertiary"
            ),
            React.createElement(
              Button,
              { variant: "outline" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Outline"
            ),
            React.createElement(
              Button,
              { variant: "ghost" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Ghost"
            ),
            React.createElement(
              Button,
              { variant: "destructive" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Destructive"
            )
          )
        ),
        // Large
        React.createElement(
          "div",
          { className: "space-y-2" },
          React.createElement(
            "p",
            { className: "text-xs font-medium text-muted-foreground" },
            "Large (lg)"
          ),
          React.createElement(
            "div",
            { className: "flex gap-2 flex-wrap" },
            React.createElement(
              Button,
              { size: "lg" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Default"
            ),
            React.createElement(
              Button,
              { size: "lg", variant: "secondary" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Secondary"
            ),
            React.createElement(
              Button,
              { size: "lg", variant: "tertiary" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Tertiary"
            ),
            React.createElement(
              Button,
              { size: "lg", variant: "outline" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Outline"
            ),
            React.createElement(
              Button,
              { size: "lg", variant: "ghost" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Ghost"
            ),
            React.createElement(
              Button,
              { size: "lg", variant: "destructive" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Destructive"
            )
          )
        ),
        // Extra Large
        React.createElement(
          "div",
          { className: "space-y-2" },
          React.createElement(
            "p",
            { className: "text-xs font-medium text-muted-foreground" },
            "Extra Large (xl)"
          ),
          React.createElement(
            "div",
            { className: "flex gap-2 flex-wrap" },
            React.createElement(
              Button,
              { size: "xl" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Default"
            ),
            React.createElement(
              Button,
              { size: "xl", variant: "secondary" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Secondary"
            ),
            React.createElement(
              Button,
              { size: "xl", variant: "tertiary" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Tertiary"
            ),
            React.createElement(
              Button,
              { size: "xl", variant: "outline" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Outline"
            ),
            React.createElement(
              Button,
              { size: "xl", variant: "ghost" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Ghost"
            ),
            React.createElement(
              Button,
              { size: "xl", variant: "destructive" },
              React.createElement(Mail, {
                ["data-icon"]: "inline-start",
              } as any),
              "Destructive"
            )
          )
        )
      ),
    },
    {
      name: "Spinner",
      description:
        'Render a <Spinner /> component inside the button to show a loading state. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the spinner for the correct spacing.',
      code: `import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function ButtonSpinner() {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Default
      </Button>
      <Button variant="secondary" disabled>
        <Spinner data-icon="inline-start" />
        Secondary
      </Button>
      <Button variant="tertiary" disabled>
        <Spinner data-icon="inline-start" />
        Tertiary
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        Outline
      </Button>
      <Button variant="ghost" disabled>
        <Spinner data-icon="inline-start" />
        Ghost
      </Button>
      <Button variant="destructive" disabled>
        <Spinner data-icon="inline-start" />
        Destructive
      </Button>
      <Button variant="destructive-solid" disabled>
        <Spinner data-icon="inline-start" />
        Destructive Solid
      </Button>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex gap-2 flex-wrap" },
        React.createElement(
          Button,
          { disabled: true },
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Default"
        ),
        React.createElement(
          Button,
          { variant: "secondary", disabled: true },
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Secondary"
        ),
        React.createElement(
          Button,
          { variant: "tertiary", disabled: true },
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Tertiary"
        ),
        React.createElement(
          Button,
          { variant: "outline", disabled: true },
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Outline"
        ),
        React.createElement(
          Button,
          { variant: "ghost", disabled: true },
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Ghost"
        ),
        React.createElement(
          Button,
          { variant: "destructive", disabled: true },
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Destructive"
        ),
        React.createElement(
          Button,
          { variant: "destructive-solid", disabled: true },
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Destructive Solid"
        )
      ),
    },
    {
      name: "Icon Only",
      description:
        "Icon-only buttons in different sizes and variants. Always include aria-label for accessibility.",
      code: `import { Trash2 } from "lucide-react"

<div className="flex gap-4 items-center flex-wrap">
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs text-muted-foreground">xs / outline</span>
    <Button size="icon-xs" variant="outline" aria-label="Delete">
      <Trash2 />
    </Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs text-muted-foreground">sm / secondary</span>
    <Button size="icon-sm" variant="secondary" aria-label="Delete">
      <Trash2 />
    </Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs text-muted-foreground">default / default</span>
    <Button size="icon" aria-label="Delete">
      <Trash2 />
    </Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs text-muted-foreground">lg / destructive</span>
    <Button size="icon-lg" variant="destructive" aria-label="Delete">
      <Trash2 />
    </Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs text-muted-foreground">xl / ghost</span>
    <Button size="icon-xl" variant="ghost" aria-label="Delete">
      <Trash2 />
    </Button>
  </div>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex gap-4 items-center flex-wrap" },
        React.createElement(
          "div",
          { className: "flex flex-col items-center gap-2" },
          React.createElement(
            "span",
            { className: "text-xs text-muted-foreground" },
            "xs / outline"
          ),
          React.createElement(
            Button,
            { size: "icon-xs", variant: "outline", "aria-label": "Delete" },
            React.createElement(Trash2)
          )
        ),
        React.createElement(
          "div",
          { className: "flex flex-col items-center gap-2" },
          React.createElement(
            "span",
            { className: "text-xs text-muted-foreground" },
            "sm / secondary"
          ),
          React.createElement(
            Button,
            { size: "icon-sm", variant: "secondary", "aria-label": "Delete" },
            React.createElement(Trash2)
          )
        ),
        React.createElement(
          "div",
          { className: "flex flex-col items-center gap-2" },
          React.createElement(
            "span",
            { className: "text-xs text-muted-foreground" },
            "default / default"
          ),
          React.createElement(
            Button,
            { size: "icon", "aria-label": "Delete" },
            React.createElement(Trash2)
          )
        ),
        React.createElement(
          "div",
          { className: "flex flex-col items-center gap-2" },
          React.createElement(
            "span",
            { className: "text-xs text-muted-foreground" },
            "lg / destructive"
          ),
          React.createElement(
            Button,
            { size: "icon-lg", variant: "destructive", "aria-label": "Delete" },
            React.createElement(Trash2)
          )
        ),
        React.createElement(
          "div",
          { className: "flex flex-col items-center gap-2" },
          React.createElement(
            "span",
            { className: "text-xs text-muted-foreground" },
            "xl / ghost"
          ),
          React.createElement(
            Button,
            { size: "icon-xl", variant: "ghost", "aria-label": "Delete" },
            React.createElement(Trash2)
          )
        )
      ),
    },
    {
      name: "Icon Only - Close",
      description:
        "Close button variations in different sizes and variants. Always include aria-label for accessibility.",
      code: `import { X } from "lucide-react"

<div className="flex gap-4 items-center flex-wrap">
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs text-muted-foreground">xs / default</span>
    <Button size="icon-xs" aria-label="Close">
      <X />
    </Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs text-muted-foreground">sm / secondary</span>
    <Button size="icon-sm" variant="secondary" aria-label="Close">
      <X />
    </Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs text-muted-foreground">default / outline</span>
    <Button size="icon" variant="outline" aria-label="Close">
      <X />
    </Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs text-muted-foreground">lg / ghost</span>
    <Button size="icon-lg" variant="ghost" aria-label="Close">
      <X />
    </Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs text-muted-foreground">xl / destructive</span>
    <Button size="icon-xl" variant="destructive" aria-label="Close">
      <X />
    </Button>
  </div>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex gap-4 items-center flex-wrap" },
        React.createElement(
          "div",
          { className: "flex flex-col items-center gap-2" },
          React.createElement(
            "span",
            { className: "text-xs text-muted-foreground" },
            "xs / default"
          ),
          React.createElement(
            Button,
            { size: "icon-xs", "aria-label": "Close" },
            React.createElement(X)
          )
        ),
        React.createElement(
          "div",
          { className: "flex flex-col items-center gap-2" },
          React.createElement(
            "span",
            { className: "text-xs text-muted-foreground" },
            "sm / secondary"
          ),
          React.createElement(
            Button,
            { size: "icon-sm", variant: "secondary", "aria-label": "Close" },
            React.createElement(X)
          )
        ),
        React.createElement(
          "div",
          { className: "flex flex-col items-center gap-2" },
          React.createElement(
            "span",
            { className: "text-xs text-muted-foreground" },
            "default / outline"
          ),
          React.createElement(
            Button,
            { size: "icon", variant: "outline", "aria-label": "Close" },
            React.createElement(X)
          )
        ),
        React.createElement(
          "div",
          { className: "flex flex-col items-center gap-2" },
          React.createElement(
            "span",
            { className: "text-xs text-muted-foreground" },
            "lg / ghost"
          ),
          React.createElement(
            Button,
            { size: "icon-lg", variant: "ghost", "aria-label": "Close" },
            React.createElement(X)
          )
        ),
        React.createElement(
          "div",
          { className: "flex flex-col items-center gap-2" },
          React.createElement(
            "span",
            { className: "text-xs text-muted-foreground" },
            "xl / destructive"
          ),
          React.createElement(
            Button,
            { size: "icon-xl", variant: "destructive", "aria-label": "Close" },
            React.createElement(X)
          )
        )
      ),
    },
  ],
};
