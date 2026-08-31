import React from "react";
import { Badge } from "@/components/ui/badge";
import { Indicator } from "@/components/ui/indicator";
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
    "A badge for displaying status labels, tags, and notification indicators. Supports semantic and full Tailwind color palettes, a neutral indicator style, four sizes, and dot, icon, and close-button variants.",
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
    code: `<div className="flex items-center gap-2 flex-wrap">
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

    // ── With Indicator ───────────────────────────────────────────────────
    {
      name: "With Indicator",
      description:
        "Pair the Indicator component with a Badge for color-matched status dots.",
      code: `import { Indicator } from "@/components/ui/indicator"

<div className="flex items-center gap-2 flex-wrap">
  <Badge variant="primary"><Indicator tone="primary" variant="filled" size="xs" />Primary</Badge>
  <Badge variant="success"><Indicator tone="success" variant="filled" size="xs" />Success</Badge>
  <Badge variant="warning"><Indicator tone="warning" variant="filled" size="xs" />Warning</Badge>
  <Badge variant="info"><Indicator tone="info" variant="filled" size="xs" />Info</Badge>
  <Badge variant="destructive"><Indicator tone="destructive" variant="filled" size="xs" />Destructive</Badge>
</div>`,
      preview: row(
        React.createElement(
          Badge,
          { variant: "primary" },
          React.createElement(Indicator, {
            tone: "primary",
            variant: "filled",
            size: "xs",
          }),
          "Primary"
        ),
        React.createElement(
          Badge,
          { variant: "success" },
          React.createElement(Indicator, {
            tone: "success",
            variant: "filled",
            size: "xs",
          }),
          "Success"
        ),
        React.createElement(
          Badge,
          { variant: "warning" },
          React.createElement(Indicator, {
            tone: "warning",
            variant: "filled",
            size: "xs",
          }),
          "Warning"
        ),
        React.createElement(
          Badge,
          { variant: "info" },
          React.createElement(Indicator, {
            tone: "info",
            variant: "filled",
            size: "xs",
          }),
          "Info"
        ),
        React.createElement(
          Badge,
          { variant: "destructive" },
          React.createElement(Indicator, {
            tone: "destructive",
            variant: "filled",
            size: "xs",
          }),
          "Destructive"
        )
      ),
    },

    // ── Indicator Style ───────────────────────────────────────────────────
    {
      name: "Indicator Style",
      description:
        "Use the indicator variant with an outlined Indicator for a badge with no border or fill color. Install the Indicator component separately.",
      code: `pnpm dlx shadcn@latest add indicator

import { Indicator } from "@/components/ui/indicator"

<div className="flex items-center gap-2 flex-wrap">
  <Badge variant="indicator"><Indicator tone="primary" variant="outlined" size="sm" />Primary</Badge>
  <Badge variant="indicator"><Indicator tone="success" variant="outlined" size="sm" />Success</Badge>
  <Badge variant="indicator"><Indicator tone="warning" variant="outlined" size="sm" />Warning</Badge>
  <Badge variant="indicator"><Indicator tone="info" variant="outlined" size="sm" />Info</Badge>
  <Badge variant="indicator"><Indicator tone="destructive" variant="outlined" size="sm" />Destructive</Badge>
</div>`,
      preview: row(
        React.createElement(
          Badge,
          { variant: "indicator" },
          React.createElement(Indicator, {
            tone: "primary",
            variant: "outlined",
            size: "sm",
          }),
          "Primary"
        ),
        React.createElement(
          Badge,
          { variant: "indicator" },
          React.createElement(Indicator, {
            tone: "success",
            variant: "outlined",
            size: "sm",
          }),
          "Success"
        ),
        React.createElement(
          Badge,
          { variant: "indicator" },
          React.createElement(Indicator, {
            tone: "warning",
            variant: "outlined",
            size: "sm",
          }),
          "Warning"
        ),
        React.createElement(
          Badge,
          { variant: "indicator" },
          React.createElement(Indicator, {
            tone: "info",
            variant: "outlined",
            size: "sm",
          }),
          "Info"
        ),
        React.createElement(
          Badge,
          { variant: "indicator" },
          React.createElement(Indicator, {
            tone: "destructive",
            variant: "outlined",
            size: "sm",
          }),
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
      code: `import { Indicator } from "@/components/ui/indicator"

<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2 flex-wrap">
    <Badge variant="primary" solid>Primary</Badge>
    <Badge variant="success" solid>Success</Badge>
    <Badge variant="warning" solid>Warning</Badge>
    <Badge variant="info" solid>Info</Badge>
    <Badge variant="destructive" solid>Destructive</Badge>
  </div>
  <div className="flex items-center gap-2 flex-wrap">
    <Badge variant="primary" solid><Indicator tone="primary" variant="filled" size="xs" />Primary</Badge>
    <Badge variant="success" solid><Indicator tone="success" variant="filled" size="xs" />Success</Badge>
    <Badge variant="warning" solid><Indicator tone="warning" variant="filled" size="xs" />Warning</Badge>
    <Badge variant="info" solid><Indicator tone="info" variant="filled" size="xs" />Info</Badge>
    <Badge variant="destructive" solid><Indicator tone="destructive" variant="filled" size="xs" />Destructive</Badge>
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
          "Solid + Indicator",
          row(
            React.createElement(
              Badge,
              { variant: "primary", solid: true },
              React.createElement(Indicator, {
                tone: "primary",
                variant: "filled",
                size: "xs",
              }),
              "Primary"
            ),
            React.createElement(
              Badge,
              { variant: "success", solid: true },
              React.createElement(Indicator, {
                tone: "success",
                variant: "filled",
                size: "xs",
              }),
              "Success"
            ),
            React.createElement(
              Badge,
              { variant: "warning", solid: true },
              React.createElement(Indicator, {
                tone: "warning",
                variant: "filled",
                size: "xs",
              }),
              "Warning"
            ),
            React.createElement(
              Badge,
              { variant: "info", solid: true },
              React.createElement(Indicator, {
                tone: "info",
                variant: "filled",
                size: "xs",
              }),
              "Info"
            ),
            React.createElement(
              Badge,
              { variant: "destructive", solid: true },
              React.createElement(Indicator, {
                tone: "destructive",
                variant: "filled",
                size: "xs",
              }),
              "Destructive"
            )
          )
        )
      ),
    },

    // ── Counter ────────────────────────────────────────────────────────────
    {
      name: "Counter",
      description:
        "Use the counter prop to render a pill-shaped numeric indicator. It stays square for single digits and grows for multi-digit numbers with tabular-nums for consistent widths.",
      code: `<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2 flex-wrap">
    <Badge counter size="xs" variant="neutral">1</Badge>
    <Badge counter size="sm" variant="neutral">3</Badge>
    <Badge counter size="md" variant="neutral">7</Badge>
    <Badge counter size="lg" variant="neutral">9</Badge>
  </div>
  <div className="flex items-center gap-2 flex-wrap">
    <Badge counter size="xs" variant="primary">12</Badge>
    <Badge counter size="sm" variant="success">24</Badge>
    <Badge counter size="md" variant="info">99</Badge>
    <Badge counter size="lg" variant="destructive">128</Badge>
  </div>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col gap-3" },
        section(
          "Single digit",
          row(
            React.createElement(
              Badge,
              { counter: true, size: "xs", variant: "neutral" },
              "1"
            ),
            React.createElement(
              Badge,
              { counter: true, size: "sm", variant: "neutral" },
              "3"
            ),
            React.createElement(
              Badge,
              { counter: true, size: "md", variant: "neutral" },
              "7"
            ),
            React.createElement(
              Badge,
              { counter: true, size: "lg", variant: "neutral" },
              "9"
            )
          )
        ),
        section(
          "Multi digit",
          row(
            React.createElement(
              Badge,
              { counter: true, size: "xs", variant: "primary" },
              "12"
            ),
            React.createElement(
              Badge,
              { counter: true, size: "sm", variant: "success" },
              "24"
            ),
            React.createElement(
              Badge,
              { counter: true, size: "md", variant: "info" },
              "99"
            ),
            React.createElement(
              Badge,
              { counter: true, size: "lg", variant: "destructive" },
              "128"
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
      code: `<div className="flex items-center gap-2 flex-wrap">
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
      description: "Combine Indicator, icon, and close across sizes.",
      code: `import { Indicator } from "@/components/ui/indicator"

<div className="flex items-center gap-3 flex-wrap">
  <Badge size="xs" variant="success" onClose={() => {}}><Indicator tone="success" variant="filled" size="xs" />XSmall</Badge>
  <Badge size="sm" variant="info" onClose={() => {}}><Indicator tone="info" variant="filled" size="xs" />Small</Badge>
  <Badge size="md" variant="warning" onClose={() => {}}><Indicator tone="warning" variant="filled" size="xs" />Medium</Badge>
  <Badge size="lg" variant="destructive" onClose={() => {}}><Indicator tone="destructive" variant="filled" size="xs" />Large</Badge>
</div>`,
      preview: row(
        React.createElement(
          Badge,
          { size: "xs", variant: "success", onClose: () => {} },
          React.createElement(Indicator, {
            tone: "success",
            variant: "filled",
            size: "xs",
          }),
          "XSmall"
        ),
        React.createElement(
          Badge,
          { size: "sm", variant: "info", onClose: () => {} },
          React.createElement(Indicator, {
            tone: "info",
            variant: "filled",
            size: "xs",
          }),
          "Small"
        ),
        React.createElement(
          Badge,
          { size: "md", variant: "warning", onClose: () => {} },
          React.createElement(Indicator, {
            tone: "warning",
            variant: "filled",
            size: "xs",
          }),
          "Medium"
        ),
        React.createElement(
          Badge,
          { size: "lg", variant: "destructive", onClose: () => {} },
          React.createElement(Indicator, {
            tone: "destructive",
            variant: "filled",
            size: "xs",
          }),
          "Large"
        )
      ),
    },

    // ── Full Palette ───────────────────────────────────────────────────────
    {
      name: "Full Palette",
      description: "All variants displayed together.",
      code: `<div className="flex flex-col gap-3">
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
      type: '"primary" | "success" | "warning" | "info" | "destructive" | "indicator" | "neutral" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"',
      description:
        "Color variant of the badge. The indicator variant has no border or fill color.",
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
      name: "counter",
      type: "boolean",
      description:
        "When true, renders a pill-shaped counter with tabular-nums. Square at single digit, grows for multi-digit numbers.",
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
