import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

function SeparatorDemo() {
  return React.createElement(
    "div",
    { className: "flex max-w-sm flex-col gap-6 text-sm" },
    React.createElement(
      "div",
      { className: "flex flex-col gap-3" },
      React.createElement(
        "p",
        { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground" },
        "Solid"
      ),
      React.createElement(
        "div",
        { className: "flex flex-col gap-4" },
        React.createElement(
          "div",
          { className: "flex flex-col gap-1.5" },
          React.createElement("div", { className: "leading-none font-medium" }, "shadcn/ui"),
          React.createElement(
            "div",
            { className: "text-muted-foreground" },
            "The Foundation for your Design System"
          )
        ),
        React.createElement(Separator, {}),
        React.createElement(
          "div",
          { className: "text-muted-foreground" },
          "A set of beautifully designed components."
        )
      )
    ),
    React.createElement(
      "div",
      { className: "flex flex-col gap-3" },
      React.createElement(
        "p",
        { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground" },
        "Dashed"
      ),
      React.createElement(
        "div",
        { className: "flex flex-col gap-4" },
        React.createElement(
          "div",
          { className: "flex flex-col gap-1.5" },
          React.createElement("div", { className: "leading-none font-medium" }, "shadcn/ui"),
          React.createElement(
            "div",
            { className: "text-muted-foreground" },
            "The Foundation for your Design System"
          )
        ),
        React.createElement(Separator, { variant: "dashed" }),
        React.createElement(
          "div",
          { className: "text-muted-foreground" },
          "A set of beautifully designed components."
        )
      )
    ),
    React.createElement(
      "div",
      { className: "flex flex-col gap-3" },
      React.createElement(
        "p",
        { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground" },
        "Inset"
      ),
      React.createElement(
        "div",
        { className: "flex flex-col gap-4 rounded-lg bg-muted/50 p-4" },
        React.createElement(
          "div",
          { className: "flex flex-col gap-1.5" },
          React.createElement("div", { className: "leading-none font-medium" }, "shadcn/ui"),
          React.createElement(
            "div",
            { className: "text-muted-foreground" },
            "The Foundation for your Design System"
          )
        ),
        React.createElement(Separator, { variant: "inset" }),
        React.createElement(
          "div",
          { className: "text-muted-foreground" },
          "A set of beautifully designed components."
        )
      )
    )
  );
}

function SeparatorDashed() {
  return React.createElement(
    "div",
    { className: "flex max-w-sm flex-col gap-4 text-sm" },
    React.createElement(
      "div",
      { className: "flex flex-col gap-1.5" },
      React.createElement("div", { className: "leading-none font-medium" }, "shadcn/ui"),
      React.createElement(
        "div",
        { className: "text-muted-foreground" },
        "The Foundation for your Design System"
      )
    ),
    React.createElement(Separator, { variant: "dashed" }),
    React.createElement(
      "div",
      { className: "text-muted-foreground" },
      "A set of beautifully designed components that you can customize, extend, and build on."
    )
  );
}

function SeparatorVertical() {
  return React.createElement(
    "div",
    { className: "flex h-5 items-center gap-4 text-sm" },
    React.createElement("div", {}, "Blog"),
    React.createElement(Separator, { orientation: "vertical" }),
    React.createElement("div", {}, "Docs"),
    React.createElement(Separator, { orientation: "vertical" }),
    React.createElement("div", {}, "Source")
  );
}

function SeparatorMenu() {
  return React.createElement(
    "div",
    { className: "flex items-center gap-2 text-sm md:gap-4" },
    React.createElement(
      "div",
      { className: "flex flex-col gap-1" },
      React.createElement("span", { className: "font-medium" }, "Settings"),
      React.createElement(
        "span",
        { className: "text-xs text-muted-foreground" },
        "Manage preferences"
      )
    ),
    React.createElement(Separator, { orientation: "vertical" }),
    React.createElement(
      "div",
      { className: "flex flex-col gap-1" },
      React.createElement("span", { className: "font-medium" }, "Account"),
      React.createElement(
        "span",
        { className: "text-xs text-muted-foreground" },
        "Profile & security"
      )
    ),
    React.createElement(Separator, { orientation: "vertical", className: "hidden md:block" }),
    React.createElement(
      "div",
      { className: "hidden flex-col gap-1 md:flex" },
      React.createElement("span", { className: "font-medium" }, "Help"),
      React.createElement(
        "span",
        { className: "text-xs text-muted-foreground" },
        "Support & docs"
      )
    )
  );
}

function SeparatorList() {
  return React.createElement(
    "div",
    { className: "flex w-full max-w-sm flex-col gap-2 text-sm" },
    React.createElement(
      "dl",
      { className: "flex items-center justify-between" },
      React.createElement("dt", {}, "Item 1"),
      React.createElement("dd", { className: "text-muted-foreground" }, "Value 1")
    ),
    React.createElement(Separator, {}),
    React.createElement(
      "dl",
      { className: "flex items-center justify-between" },
      React.createElement("dt", {}, "Item 2"),
      React.createElement("dd", { className: "text-muted-foreground" }, "Value 2")
    ),
    React.createElement(Separator, {}),
    React.createElement(
      "dl",
      { className: "flex items-center justify-between" },
      React.createElement("dt", {}, "Item 3"),
      React.createElement("dd", { className: "text-muted-foreground" }, "Value 3")
    )
  );
}

function SeparatorInset() {
  return React.createElement(
    "div",
    { className: "flex max-w-sm flex-col gap-4 text-sm rounded-lg bg-muted/50 p-4" },
    React.createElement(
      "div",
      { className: "flex flex-col gap-1.5" },
      React.createElement("div", { className: "leading-none font-medium" }, "shadcn/ui"),
      React.createElement(
        "div",
        { className: "text-muted-foreground" },
        "The Foundation for your Design System"
      )
    ),
    React.createElement(Separator, { variant: "inset" }),
    React.createElement(
      "div",
      { className: "text-muted-foreground" },
      "A set of beautifully designed components that you can customize, extend, and build on."
    )
  );
}

export const separatorDoc: ComponentDoc = {
  id: "separator",
  name: "Separator",
  description: "Visually or semantically separates content.",
  installation: {
    cli: "npx shadcn@latest add separator",
    manual: "Install radix-ui and copy the separator component source code into your project.",
  },
  usage: `import { Separator } from "@/components/ui/separator"

<Separator />`,
  preview: {
    code: `import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-6 text-sm">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Solid
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="leading-none font-medium">shadcn/ui</div>
            <div className="text-muted-foreground">
              The Foundation for your Design System
            </div>
          </div>
          <Separator />
          <div className="text-muted-foreground">
            A set of beautifully designed components.
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Dashed
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="leading-none font-medium">shadcn/ui</div>
            <div className="text-muted-foreground">
              The Foundation for your Design System
            </div>
          </div>
          <Separator variant="dashed" />
          <div className="text-muted-foreground">
            A set of beautifully designed components.
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Inset
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="leading-none font-medium">shadcn/ui</div>
            <div className="text-muted-foreground">
              The Foundation for your Design System
            </div>
          </div>
          <Separator variant="inset" />
          <div className="text-muted-foreground">
            A set of beautifully designed components.
          </div>
        </div>
      </div>
    </div>
  )
}`,
    component: React.createElement(SeparatorDemo),
  },
  examples: [
    {
      name: "Dashed",
      description: 'Use variant="dashed" for a dashed separator.',
      code: `import { Separator } from "@/components/ui/separator"

export function SeparatorDashed() {
  return (
    <div className="flex max-w-sm flex-col gap-4 text-sm">
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">shadcn/ui</div>
        <div className="text-muted-foreground">
          The Foundation for your Design System
        </div>
      </div>
      <Separator variant="dashed" />
      <div className="text-muted-foreground">
        A set of beautifully designed components that you can customize, extend,
        and build on.
      </div>
    </div>
  )
}`,
      preview: React.createElement(SeparatorDashed),
    },
    {
      name: "Inset",
      description: 'Use variant="inset" for a sunken inset separator — dark top border with a 1px light highlight below.',
      code: `import { Separator } from "@/components/ui/separator"

export function SeparatorInset() {
  return (
    <div className="flex max-w-sm flex-col gap-4 text-sm rounded-lg bg-muted/50 p-4">
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">shadcn/ui</div>
        <div className="text-muted-foreground">
          The Foundation for your Design System
        </div>
      </div>
      <Separator variant="inset" />
      <div className="text-muted-foreground">
        A set of beautifully designed components that you can customize, extend,
        and build on.
      </div>
    </div>
  )
}`,
      preview: React.createElement(SeparatorInset),
    },
    {
      name: "Vertical",
      description: "Use orientation=\"vertical\" for a vertical separator.",
      code: `import { Separator } from "@/components/ui/separator"

export function SeparatorVertical() {
  return (
    <div className="flex h-5 items-center gap-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  )
}`,
      preview: React.createElement(SeparatorVertical),
    },
    {
      name: "Menu",
      description: "Vertical separators between menu items with descriptions.",
      code: `import { Separator } from "@/components/ui/separator"

export function SeparatorMenu() {
  return (
    <div className="flex items-center gap-2 text-sm md:gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-medium">Settings</span>
        <span className="text-xs text-muted-foreground">
          Manage preferences
        </span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-1">
        <span className="font-medium">Account</span>
        <span className="text-xs text-muted-foreground">
          Profile & security
        </span>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />
      <div className="hidden flex-col gap-1 md:flex">
        <span className="font-medium">Help</span>
        <span className="text-xs text-muted-foreground">Support & docs</span>
      </div>
    </div>
  )
}`,
      preview: React.createElement(SeparatorMenu),
    },
    {
      name: "List",
      description: "Horizontal separators between list items.",
      code: `import { Separator } from "@/components/ui/separator"

export function SeparatorList() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
      <dl className="flex items-center justify-between">
        <dt>Item 1</dt>
        <dd className="text-muted-foreground">Value 1</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Item 2</dt>
        <dd className="text-muted-foreground">Value 2</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Item 3</dt>
        <dd className="text-muted-foreground">Value 3</dd>
      </dl>
    </div>
  )
}`,
      preview: React.createElement(SeparatorList),
    },
  ],
  props: [
    {
      name: "variant",
      type: '"solid" | "dashed" | "inset"',
      description: "The visual style of the separator.",
      default: '"solid"',
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      description: "The orientation of the separator.",
      default: '"horizontal"',
    },
    {
      name: "decorative",
      type: "boolean",
      description:
        "When true, signifies that it is purely visual, carries no semantic meaning, and ensures it is not present in the accessibility tree.",
      default: "true",
    },
  ],
};
