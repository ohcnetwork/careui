import React from "react";
import { Indicator } from "@/components/ui/indicator";
import { type ComponentDoc } from "@/lib/types";

// ─── helpers ────────────────────────────────────────────────────────────────

const row = (...children: React.ReactNode[]) =>
  React.createElement(
    "div",
    { className: "flex items-center gap-3 flex-wrap" },
    ...children
  );

const labeledRow = (label: string, ...children: React.ReactNode[]) =>
  React.createElement(
    "div",
    { className: "flex items-center gap-3" },
    ...children,
    React.createElement(
      "span",
      { className: "text-sm text-muted-foreground" },
      label
    )
  );

const section = (label: string, ...children: React.ReactNode[]) =>
  React.createElement(
    "div",
    { className: "flex flex-col gap-3" },
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

export const indicatorDoc: ComponentDoc = {
  id: "indicator",
  name: "Indicator",
  description:
    "A small filled or outlined dot for status, presence, selection, and notification indicators. Supports semantic and full Tailwind color palettes, two variants, and five sizes.",
  installation: {
    cli: "npx shadcn@latest add indicator",
    manual:
      "Copy and paste the indicator component source code into your project.",
  },
  usage: `import { Indicator } from "@/components/ui/indicator"

export function IndicatorDemo() {
  return (
    <div className="flex items-center gap-3">
      <Indicator tone="primary" />
      <Indicator tone="success" />
      <Indicator tone="warning" />
      <Indicator tone="info" />
      <Indicator tone="destructive" />
    </div>
  )
}`,

  preview: {
    code: `<div className="flex items-center gap-3">
  <Indicator tone="primary" />
  <Indicator tone="success" />
  <Indicator tone="warning" />
  <Indicator tone="info" />
  <Indicator tone="destructive" />
</div>`,
    component: row(
      React.createElement(Indicator, { tone: "primary" }),
      React.createElement(Indicator, { tone: "success" }),
      React.createElement(Indicator, { tone: "warning" }),
      React.createElement(Indicator, { tone: "info" }),
      React.createElement(Indicator, { tone: "destructive" })
    ),
  },

  examples: [
    // ── Sizes ──────────────────────────────────────────────────────────────
    {
      name: "Sizes",
      description:
        "Five sizes: xs (6px), sm (8px), md (10px), lg (12px), xl (16px).",
      code: `<div className="flex items-center gap-3">
  <Indicator size="xs" tone="primary" />
  <Indicator size="sm" tone="primary" />
  <Indicator size="md" tone="primary" />
  <Indicator size="lg" tone="primary" />
  <Indicator size="xl" tone="primary" />
</div>`,
      preview: row(
        React.createElement(Indicator, { size: "xs", tone: "primary" }),
        React.createElement(Indicator, { size: "sm", tone: "primary" }),
        React.createElement(Indicator, { size: "md", tone: "primary" }),
        React.createElement(Indicator, { size: "lg", tone: "primary" }),
        React.createElement(Indicator, { size: "xl", tone: "primary" })
      ),
    },

    // ── Filled Variant ──────────────────────────────────────────────────────
    {
      name: "Filled",
      description:
        "Solid filled variant for bolder status indicators.",
      code: `<div className="flex items-center gap-3">
  <Indicator variant="filled" tone="primary" />
  <Indicator variant="filled" tone="success" />
  <Indicator variant="filled" tone="warning" />
  <Indicator variant="filled" tone="info" />
  <Indicator variant="filled" tone="destructive" />
  <Indicator variant="filled" tone="neutral" />
</div>`,
      preview: row(
        React.createElement(Indicator, {
          variant: "filled",
          tone: "primary",
        }),
        React.createElement(Indicator, {
          variant: "filled",
          tone: "success",
        }),
        React.createElement(Indicator, {
          variant: "filled",
          tone: "warning",
        }),
        React.createElement(Indicator, { variant: "filled", tone: "info" }),
        React.createElement(Indicator, {
          variant: "filled",
          tone: "destructive",
        }),
        React.createElement(Indicator, {
          variant: "filled",
          tone: "neutral",
        })
      ),
    },

    // ── Status List ────────────────────────────────────────────────────────
    {
      name: "Status List",
      description: "Indicators paired with labels, common in dropdown lists.",
      code: `<div className="flex flex-col gap-2">
  <div className="flex items-center gap-2">
    <Indicator tone="success" size="sm" />
    <span className="text-sm">Online</span>
  </div>
  <div className="flex items-center gap-2">
    <Indicator tone="warning" size="sm" />
    <span className="text-sm">Away</span>
  </div>
  <div className="flex items-center gap-2">
    <Indicator tone="neutral" size="sm" />
    <span className="text-sm">Offline</span>
  </div>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col gap-2" },
        labeledRow(
          "Online",
          React.createElement(Indicator, { tone: "success", size: "sm" })
        ),
        labeledRow(
          "Away",
          React.createElement(Indicator, { tone: "warning", size: "sm" })
        ),
        labeledRow(
          "Offline",
          React.createElement(Indicator, { tone: "neutral", size: "sm" })
        )
      ),
    },

    // ── Full Palette ───────────────────────────────────────────────────────
    {
      name: "Full Palette",
      description: "All tones displayed together.",
      code: `<div className="flex flex-col gap-3">
  <div className="flex items-center gap-3 flex-wrap">
    <Indicator tone="primary" />
    <Indicator tone="success" />
    <Indicator tone="warning" />
    <Indicator tone="info" />
    <Indicator tone="destructive" />
  </div>
  <div className="flex items-center gap-3 flex-wrap">
    <Indicator tone="neutral" />
    <Indicator tone="red" />
    <Indicator tone="orange" />
    <Indicator tone="amber" />
    <Indicator tone="yellow" />
    <Indicator tone="lime" />
    <Indicator tone="green" />
    <Indicator tone="teal" />
    <Indicator tone="cyan" />
    <Indicator tone="sky" />
    <Indicator tone="blue" />
    <Indicator tone="indigo" />
    <Indicator tone="violet" />
    <Indicator tone="purple" />
    <Indicator tone="fuchsia" />
    <Indicator tone="pink" />
    <Indicator tone="rose" />
  </div>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col gap-3" },
        section(
          "Semantic",
          row(
            React.createElement(Indicator, { tone: "primary" }),
            React.createElement(Indicator, { tone: "success" }),
            React.createElement(Indicator, { tone: "warning" }),
            React.createElement(Indicator, { tone: "info" }),
            React.createElement(Indicator, { tone: "destructive" })
          )
        ),
        section(
          "Gray",
          row(React.createElement(Indicator, { tone: "neutral" }))
        ),
        section(
          "Warm",
          row(
            React.createElement(Indicator, { tone: "red" }),
            React.createElement(Indicator, { tone: "orange" }),
            React.createElement(Indicator, { tone: "amber" }),
            React.createElement(Indicator, { tone: "yellow" }),
            React.createElement(Indicator, { tone: "lime" })
          )
        ),
        section(
          "Green",
          row(
            React.createElement(Indicator, { tone: "green" }),
            React.createElement(Indicator, { tone: "teal" })
          )
        ),
        section(
          "Blue",
          row(
            React.createElement(Indicator, { tone: "cyan" }),
            React.createElement(Indicator, { tone: "sky" }),
            React.createElement(Indicator, { tone: "blue" }),
            React.createElement(Indicator, { tone: "indigo" })
          )
        ),
        section(
          "Purple & Pink",
          row(
            React.createElement(Indicator, { tone: "violet" }),
            React.createElement(Indicator, { tone: "purple" }),
            React.createElement(Indicator, { tone: "fuchsia" }),
            React.createElement(Indicator, { tone: "pink" }),
            React.createElement(Indicator, { tone: "rose" })
          )
        )
      ),
    },
  ],

  props: [
    {
      name: "variant",
      type: '"filled" | "outlined"',
      default: '"outlined"',
      description: "Visual style — outlined with tinted fill (default) or solid fill.",
    },
    {
      name: "tone",
      type: '"primary" | "success" | "warning" | "info" | "destructive" | "neutral" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"',
      default: '"primary"',
      description: "Color tone — semantic or named Tailwind color.",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Dot diameter: xs=6px, sm=8px, md=10px, lg=12px, xl=16px.",
    },
    {
      name: "className",
      type: "string",
      default: "—",
      description: "Additional Tailwind classes merged via cn().",
    },
  ],
};
