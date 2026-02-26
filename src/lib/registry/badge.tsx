import React from "react";
import { Badge } from "@/components/ui/badge";
import { type ComponentDoc } from "@/lib/types";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Star,
  Zap,
} from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────

const row = (...children: React.ReactNode[]) =>
  React.createElement(
    "div",
    { className: "flex items-center gap-2 flex-wrap" },
    ...children
  );

const section = (label: string, ...children: React.ReactNode[]) =>
  React.createElement(
    "div",
    { className: "flex flex-col gap-2" },
    React.createElement(
      "p",
      {
        className:
          "text-xs text-muted-foreground font-medium uppercase tracking-wide",
      },
      label
    ),
    ...children
  );

// ─── doc ────────────────────────────────────────────────────────────────────

export const badgeDoc: ComponentDoc = {
  id: "badge",
  name: "Badge",
  description:
    "An outlined badge for displaying status labels, tags, and notification indicators. Supports semantic and full Tailwind color palettes, four sizes, and dot, icon, and close-button variants.",
  installation: {
    cli: "npx shadcn@latest add badge",
    manual: "Copy and paste the badge component source code into your project.",
  },
  usage: `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}`,

  preview: {
    code: `import { Info } from "lucide-react"

<div className="flex items-center gap-2 flex-wrap">
  <Badge variant="primary">Primary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="info">Info</Badge>
  <Badge variant="destructive">Destructive</Badge>
</div>`,
    component: row(
      React.createElement(Badge, { variant: "primary" }, "Primary"),
      React.createElement(Badge, { variant: "success" }, "Success"),
      React.createElement(Badge, { variant: "warning" }, "Warning"),
      React.createElement(Badge, { variant: "info" }, "Info"),
      React.createElement(Badge, { variant: "destructive" }, "Destructive")
    ),
  },

  examples: [
    // ── Sizes ──────────────────────────────────────────────────────────────
    {
      name: "Sizes",
      description:
        "Four sizes: xs (16 px), sm (20 px), md (24 px), lg (28 px).",
      code: `<div className="flex items-center gap-2 flex-wrap">
  <Badge size="xs" variant="primary">XSmall</Badge>
  <Badge size="sm" variant="primary">Small</Badge>
  <Badge size="md" variant="primary">Medium</Badge>
  <Badge size="lg" variant="primary">Large</Badge>
</div>`,
      preview: row(
        React.createElement(
          Badge,
          { size: "xs", variant: "primary" },
          "XSmall"
        ),
        React.createElement(Badge, { size: "sm", variant: "primary" }, "Small"),
        React.createElement(
          Badge,
          { size: "md", variant: "primary" },
          "Medium"
        ),
        React.createElement(Badge, { size: "lg", variant: "primary" }, "Large")
      ),
    },

    // ── With Dot ───────────────────────────────────────────────────────────
    {
      name: "With Dot",
      description: "A filled dot that inherits the badge text color.",
      code: `import { Info } from "lucide-react"

<div className="flex items-center gap-2 flex-wrap">
  <Badge variant="primary" dot>Primary</Badge>
  <Badge variant="success" dot>Success</Badge>
  <Badge variant="warning" dot>Warning</Badge>
  <Badge variant="info" dot>Info</Badge>
  <Badge variant="destructive" dot>Destructive</Badge>
</div>`,
      preview: row(
        React.createElement(
          Badge,
          { variant: "primary", dot: true },
          "Primary"
        ),
        React.createElement(
          Badge,
          { variant: "success", dot: true },
          "Success"
        ),
        React.createElement(
          Badge,
          { variant: "warning", dot: true },
          "Warning"
        ),
        React.createElement(Badge, { variant: "info", dot: true }, "Info"),
        React.createElement(
          Badge,
          { variant: "destructive", dot: true },
          "Destructive"
        )
      ),
    },

    // ── With Icon ──────────────────────────────────────────────────────────
    {
      name: "With Icon",
      description:
        'Use data-icon="inline-start" to render the icon on the left and data-icon="inline-end" to render the icon on the right. Padding on the icon side is reduced automatically.',
      code: `import { CheckCircle2, AlertTriangle, Info, XCircle, Star, Zap } from "lucide-react"

{/* Icon on the left — inline-start */}
<div className="flex items-center gap-2 flex-wrap">
  <Badge variant="success">
    <CheckCircle2 data-icon="inline-start" />
    Approved
  </Badge>
  <Badge variant="warning">
    <AlertTriangle data-icon="inline-start" />
    Pending
  </Badge>
  <Badge variant="info">
    <Info data-icon="inline-start" />
    Notice
  </Badge>
  <Badge variant="destructive">
    <XCircle data-icon="inline-start" />
    Failed
  </Badge>
</div>

{/* Icon on the right — inline-end */}
<div className="flex items-center gap-2 flex-wrap">
  <Badge variant="primary">
    Featured
    <Star data-icon="inline-end" />
  </Badge>
  <Badge variant="violet">
    Pro
    <Zap data-icon="inline-end" />
  </Badge>
  <Badge variant="success">
    Verified
    <CheckCircle2 data-icon="inline-end" />
  </Badge>
  <Badge variant="info">
    Info
    <Info data-icon="inline-end" />
  </Badge>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col gap-3" },
        section(
          "inline-start",
          row(
            React.createElement(
              Badge,
              { variant: "success" },
              React.createElement(CheckCircle2, {
                ["data-icon"]: "inline-start",
              } as any),
              "Approved"
            ),
            React.createElement(
              Badge,
              { variant: "warning" },
              React.createElement(AlertTriangle, {
                ["data-icon"]: "inline-start",
              } as any),
              "Pending"
            ),
            React.createElement(
              Badge,
              { variant: "info" },
              React.createElement(Info, {
                ["data-icon"]: "inline-start",
              } as any),
              "Notice"
            ),
            React.createElement(
              Badge,
              { variant: "destructive" },
              React.createElement(XCircle, {
                ["data-icon"]: "inline-start",
              } as any),
              "Failed"
            )
          )
        ),
        section(
          "inline-end",
          row(
            React.createElement(
              Badge,
              { variant: "primary" },
              "Featured",
              React.createElement(Star, { ["data-icon"]: "inline-end" } as any)
            ),
            React.createElement(
              Badge,
              { variant: "violet" },
              "Pro",
              React.createElement(Zap, { ["data-icon"]: "inline-end" } as any)
            ),
            React.createElement(
              Badge,
              { variant: "success" },
              "Verified",
              React.createElement(CheckCircle2, {
                ["data-icon"]: "inline-end",
              } as any)
            ),
            React.createElement(
              Badge,
              { variant: "info" },
              "Info",
              React.createElement(Info, { ["data-icon"]: "inline-end" } as any)
            )
          )
        )
      ),
    },

    // ── Solid ──────────────────────────────────────────────────────────────
    {
      name: "Solid",
      description:
        "Add the solid prop to the five semantic variants for a fully filled background.",
      code: `import { Info } from "lucide-react"

<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2 flex-wrap">
    <Badge variant="primary" solid>Primary</Badge>
    <Badge variant="success" solid>Success</Badge>
    <Badge variant="warning" solid>Warning</Badge>
    <Badge variant="info" solid>Info</Badge>
    <Badge variant="destructive" solid>Destructive</Badge>
  </div>
  <div className="flex items-center gap-2 flex-wrap">
    <Badge variant="primary" solid dot>Primary</Badge>
    <Badge variant="success" solid dot>Success</Badge>
    <Badge variant="warning" solid dot>Warning</Badge>
    <Badge variant="info" solid dot>Info</Badge>
    <Badge variant="destructive" solid dot>Destructive</Badge>
  </div>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col gap-3" },
        section(
          "Solid",
          row(
            React.createElement(
              Badge,
              { variant: "primary", solid: true },
              "Primary"
            ),
            React.createElement(
              Badge,
              { variant: "success", solid: true },
              "Success"
            ),
            React.createElement(
              Badge,
              { variant: "warning", solid: true },
              "Warning"
            ),
            React.createElement(
              Badge,
              { variant: "info", solid: true },
              "Info"
            ),
            React.createElement(
              Badge,
              { variant: "destructive", solid: true },
              "Destructive"
            )
          )
        ),
        section(
          "Solid + Dot",
          row(
            React.createElement(
              Badge,
              { variant: "primary", solid: true, dot: true },
              "Primary"
            ),
            React.createElement(
              Badge,
              { variant: "success", solid: true, dot: true },
              "Success"
            ),
            React.createElement(
              Badge,
              { variant: "warning", solid: true, dot: true },
              "Warning"
            ),
            React.createElement(
              Badge,
              { variant: "info", solid: true, dot: true },
              "Info"
            ),
            React.createElement(
              Badge,
              { variant: "destructive", solid: true, dot: true },
              "Destructive"
            )
          )
        )
      ),
    },

    // ── With Close Button ──────────────────────────────────────────────────
    {
      name: "With Close Button",
      description:
        "Pass an onClose handler to render a dismiss button inside the badge.",
      code: `import { Info } from "lucide-react"

<div className="flex items-center gap-2 flex-wrap">
  <Badge variant="primary" onClose={() => {}}>Primary</Badge>
  <Badge variant="success" onClose={() => {}}>Success</Badge>
  <Badge variant="warning" onClose={() => {}}>Warning</Badge>
  <Badge variant="info" onClose={() => {}}>Info</Badge>
  <Badge variant="destructive" onClose={() => {}}>Destructive</Badge>
</div>`,
      preview: row(
        React.createElement(
          Badge,
          { variant: "primary", onClose: () => {} },
          "Primary"
        ),
        React.createElement(
          Badge,
          { variant: "success", onClose: () => {} },
          "Success"
        ),
        React.createElement(
          Badge,
          { variant: "warning", onClose: () => {} },
          "Warning"
        ),
        React.createElement(
          Badge,
          { variant: "info", onClose: () => {} },
          "Info"
        ),
        React.createElement(
          Badge,
          { variant: "destructive", onClose: () => {} },
          "Destructive"
        )
      ),
    },

    // ── Combined ──────────────────────────────────────────────────────────
    {
      name: "Combined",
      description: "Combine dot, icon, and close across sizes.",
      code: `<div className="flex items-center gap-3 flex-wrap">
  <Badge size="xs" variant="success" dot onClose={() => {}}>XSmall</Badge>
  <Badge size="sm" variant="info" dot onClose={() => {}}>Small</Badge>
  <Badge size="md" variant="warning" dot onClose={() => {}}>Medium</Badge>
  <Badge size="lg" variant="destructive" dot onClose={() => {}}>Large</Badge>
</div>`,
      preview: row(
        React.createElement(
          Badge,
          { size: "xs", variant: "success", dot: true, onClose: () => {} },
          "XSmall"
        ),
        React.createElement(
          Badge,
          { size: "sm", variant: "info", dot: true, onClose: () => {} },
          "Small"
        ),
        React.createElement(
          Badge,
          { size: "md", variant: "warning", dot: true, onClose: () => {} },
          "Medium"
        ),
        React.createElement(
          Badge,
          { size: "lg", variant: "destructive", dot: true, onClose: () => {} },
          "Large"
        )
      ),
    },

    // ── Full Palette ───────────────────────────────────────────────────────
    {
      name: "Full Palette",
      description: "All variants displayed together.",
      code: `import { Info } from "lucide-react"

<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2 flex-wrap">
    <Badge variant="primary">Primary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="destructive">Destructive</Badge>
  </div>
  <div className="flex items-center gap-2 flex-wrap">
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="red">Red</Badge>
    <Badge variant="orange">Orange</Badge>
    <Badge variant="amber">Amber</Badge>
    <Badge variant="yellow">Yellow</Badge>
    <Badge variant="lime">Lime</Badge>
    <Badge variant="green">Green</Badge>
    <Badge variant="teal">Teal</Badge>
    <Badge variant="cyan">Cyan</Badge>
    <Badge variant="sky">Sky</Badge>
    <Badge variant="blue">Blue</Badge>
    <Badge variant="indigo">Indigo</Badge>
    <Badge variant="violet">Violet</Badge>
    <Badge variant="purple">Purple</Badge>
    <Badge variant="fuchsia">Fuchsia</Badge>
    <Badge variant="pink">Pink</Badge>
    <Badge variant="rose">Rose</Badge>
  </div>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col gap-3" },
        section(
          "Semantic",
          row(
            React.createElement(Badge, { variant: "primary" }, "Primary"),
            React.createElement(Badge, { variant: "success" }, "Success"),
            React.createElement(Badge, { variant: "warning" }, "Warning"),
            React.createElement(Badge, { variant: "info" }, "Info"),
            React.createElement(
              Badge,
              { variant: "destructive" },
              "Destructive"
            )
          )
        ),
        section(
          "Gray",
          row(React.createElement(Badge, { variant: "neutral" }, "Neutral"))
        ),
        section(
          "Warm",
          row(
            React.createElement(Badge, { variant: "red" }, "Red"),
            React.createElement(Badge, { variant: "orange" }, "Orange"),
            React.createElement(Badge, { variant: "amber" }, "Amber"),
            React.createElement(Badge, { variant: "yellow" }, "Yellow"),
            React.createElement(Badge, { variant: "lime" }, "Lime")
          )
        ),
        section(
          "Green",
          row(
            React.createElement(Badge, { variant: "green" }, "Green"),
            React.createElement(Badge, { variant: "teal" }, "Teal")
          )
        ),
        section(
          "Blue",
          row(
            React.createElement(Badge, { variant: "cyan" }, "Cyan"),
            React.createElement(Badge, { variant: "sky" }, "Sky"),
            React.createElement(Badge, { variant: "blue" }, "Blue"),
            React.createElement(Badge, { variant: "indigo" }, "Indigo")
          )
        ),
        section(
          "Purple & Pink",
          row(
            React.createElement(Badge, { variant: "violet" }, "Violet"),
            React.createElement(Badge, { variant: "purple" }, "Purple"),
            React.createElement(Badge, { variant: "fuchsia" }, "Fuchsia"),
            React.createElement(Badge, { variant: "pink" }, "Pink"),
            React.createElement(Badge, { variant: "rose" }, "Rose")
          )
        )
      ),
    },
  ],

  props: [
    {
      name: "variant",
      type: '"primary" | "success" | "warning" | "info" | "destructive" | "neutral" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"',
      description: "Color variant of the badge.",
      default: '"primary"',
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg"',
      description:
        "Height of the badge: xs=16 px, sm=20 px, md=24 px, lg=28 px.",
      default: '"md"',
    },
    {
      name: "solid",
      type: "boolean",
      description:
        "When true, renders a fully filled (solid) background instead of the default tinted outline style.",
      default: "false",
    },
    {
      name: "dot",
      type: "boolean",
      description: "When true, renders a small filled dot before the label.",
      default: "false",
    },
    {
      name: "onClose",
      type: "React.MouseEventHandler<HTMLButtonElement>",
      description:
        "When provided, renders a close (×) button inside the badge.",
      default: "undefined",
    },
  ],
};
