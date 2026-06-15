import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  MatrixSpinner,
  type MatrixSpinnerName,
} from "@/components/ui/matrix-spinner";

const ALL_PRESETS: MatrixSpinnerName[] = [
  "center-expand",
  "center-collapse",
  "edge-in",
  "edge-out",
  "diamond-grow",
  "diamond-shrink",
  "soft-rotate",
  "micro-pulse",
  "focus-dot",
  "crossfade-grid",
  "dot-shift",
  "grid-breathe",
  "center-glow",
  "center-dim",
  "slide-diamond",
  "grid-tilt",
  "soft-wave-diag",
  "density-shift",
  "grid-blink-soft",
  "dot-expand-contract",
  "soft-shimmer",
  "grid-fade-in",
  "grid-fade-out",
  "center-weight",
  "corner-pulse",
  "diamond-sweep",
  "soft-orbit-mini",
  "grid-stagger-soft",
  "center-ring",
  "dot-morph-soft",
  "diamond-shift",
  "soft-zoom-grid",
  "grid-lift",
  "grid-settle",
  "dot-focus-ring",
  "grid-balance",
  "center-bounce-soft",
  "diamond-stretch",
  "dot-glide",
  "grid-reveal",
  "grid-mask-reveal",
  "dot-echo",
  "grid-soft-shift",
  "diamond-focus",
  "grid-expand-soft",
  "grid-contract-soft",
  "center-ping",
  "dot-highlight-pass",
  "grid-float-soft",
  "diamond-pulse-soft",
  "spin-cw",
  "spin-check",
  "spin-fall",
  "heart-pulse",
  "heart-plus",
];

function SpinCheckPreview() {
  const [key, setKey] = React.useState(0);
  return React.createElement(
    "div",
    { className: "flex flex-col items-center gap-4" },
    React.createElement(MatrixSpinner, {
      key,
      name: "spin-check" as MatrixSpinnerName,
      size: "16",
    }),
    React.createElement(
      "button",
      {
        className:
          "text-xs text-muted-foreground underline underline-offset-2 cursor-pointer",
        onClick: () => setKey((k) => k + 1),
      },
      "Replay"
    )
  );
}

function SpinFallPreview() {
  const [key, setKey] = React.useState(0);
  return React.createElement(
    "div",
    { className: "flex flex-col items-center gap-4" },
    React.createElement(MatrixSpinner, {
      key,
      name: "spin-fall" as MatrixSpinnerName,
      size: "16",
    }),
    React.createElement(
      "button",
      {
        className:
          "text-xs text-muted-foreground underline underline-offset-2 cursor-pointer",
        onClick: () => setKey((k) => k + 1),
      },
      "Replay"
    )
  );
}

export const matrixSpinnerDoc: ComponentDoc = {
  id: "matrix-spinner",
  name: "Matrix Spinner",
  description:
    "SVG diamond-lattice matrix spinner: 25 diamonds arranged as a 4×4 base grid interleaved with a 3×3 offset grid. 50 named animation presets driven by JS frame arrays — no CSS keyframes required.",
  installation: {
    cli: "npx shadcn@latest add matrix-spinner",
    manual:
      "Copy and paste the matrix-spinner component source code into your project.",
  },
  usage: `import { MatrixSpinner } from "@/components/ui/matrix-spinner"

<MatrixSpinner />
<MatrixSpinner name="soft-rotate" size="32" />
<MatrixSpinner name="diamond-sweep" size="48" />`,
  preview: {
    code: `import { MatrixSpinner } from "@/components/ui/matrix-spinner"

export function MatrixSpinnerDemo() {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {([
        "center-expand", "center-collapse", "edge-in", "edge-out",
        "diamond-grow", "diamond-shrink", "soft-rotate", "micro-pulse",
        "focus-dot", "crossfade-grid", "dot-shift", "grid-breathe",
        "center-glow", "center-dim", "slide-diamond", "grid-tilt",
        "soft-wave-diag", "density-shift", "grid-blink-soft", "dot-expand-contract",
        "soft-shimmer", "grid-fade-in", "grid-fade-out", "center-weight",
        "corner-pulse", "diamond-sweep", "soft-orbit-mini", "grid-stagger-soft",
        "center-ring", "dot-morph-soft", "diamond-shift", "soft-zoom-grid",
        "grid-lift", "grid-settle", "dot-focus-ring", "grid-balance",
        "center-bounce-soft", "diamond-stretch", "dot-glide", "grid-reveal",
        "grid-mask-reveal", "dot-echo", "grid-soft-shift", "diamond-focus",
        "grid-expand-soft", "grid-contract-soft", "center-ping",
        "dot-highlight-pass", "grid-float-soft", "diamond-pulse-soft",
      ] as const).map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <MatrixSpinner name={name} size="24" />
          <span className="text-xs text-muted-foreground font-mono">{name}</span>
        </div>
      ))}
    </div>
  )
}`,
    component: React.createElement(
      "div",
      { className: "flex flex-wrap gap-8 justify-center" },
      ...ALL_PRESETS.map((name) =>
        React.createElement(
          "div",
          { key: name, className: "flex flex-col items-center gap-2" },
          React.createElement(MatrixSpinner, { name, size: "24" }),
          React.createElement(
            "span",
            { className: "text-xs text-muted-foreground font-mono" },
            name
          )
        )
      )
    ),
  },
  examples: [
    {
      name: "Sizes",
      description:
        "Six size variants: 12, 16, 20, 24, 32, 48. All scale the SVG proportionally.",
      code: `import { MatrixSpinner } from "@/components/ui/matrix-spinner"

export function MatrixSpinnerSizes() {
  return (
    <div className="flex items-end gap-6">
      {(["12", "16", "20", "24", "32", "48"] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <MatrixSpinner size={s} />
          <span className="text-xs text-muted-foreground">{s}</span>
        </div>
      ))}
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex items-end gap-6" },
        ...(["12", "16", "20", "24", "32", "48"] as const).map((s) =>
          React.createElement(
            "div",
            { key: s, className: "flex flex-col items-center gap-2" },
            React.createElement(MatrixSpinner, { size: s }),
            React.createElement(
              "span",
              { className: "text-xs text-muted-foreground" },
              s
            )
          )
        )
      ),
    },
    {
      name: "Colors",
      description:
        "Inherits currentColor — wrap in any text-color utility to tint the entire grid.",
      code: `import { MatrixSpinner } from "@/components/ui/matrix-spinner"

export function MatrixSpinnerColors() {
  return (
    <div className="flex items-center gap-8">
      <MatrixSpinner className="text-foreground" />
      <MatrixSpinner className="text-primary" />
      <MatrixSpinner className="text-emerald-500" />
      <MatrixSpinner className="text-rose-500" />
      <MatrixSpinner className="text-amber-400" />
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex items-center gap-8" },
        React.createElement(MatrixSpinner, { className: "text-foreground" }),
        React.createElement(MatrixSpinner, { className: "text-primary" }),
        React.createElement(MatrixSpinner, { className: "text-emerald-500" }),
        React.createElement(MatrixSpinner, { className: "text-rose-500" }),
        React.createElement(MatrixSpinner, { className: "text-amber-400" })
      ),
    },
    {
      name: "Spin Check",
      description:
        "spin-check plays exactly once — two clockwise rotations dissolve into a held checkmark. The animation stops on the final frame without looping. Click Replay to restart.",
      code: `import { MatrixSpinner } from "@/components/ui/matrix-spinner"
import { useState } from "react"

export function SpinCheckDemo() {
  const [key, setKey] = useState(0)
  return (
    <div className="flex flex-col items-center gap-4">
      <MatrixSpinner key={key} name="spin-check" size="32" />
      <button
        className="text-xs text-muted-foreground underline underline-offset-2"
        onClick={() => setKey(k => k + 1)}
      >
        Replay
      </button>
    </div>
  )
}`,
      preview: React.createElement(SpinCheckPreview, {}),
    },
    {
      name: "Spin Fall",
      description:
        "spin-fall plays exactly once — two clockwise rotations dissolve directly into a staggered pixel rain. Each column falls at a different time and settles at the bottom. Click Replay to restart.",
      code: `import { MatrixSpinner } from "@/components/ui/matrix-spinner"
import { useState } from "react"

export function SpinFallDemo() {
  const [key, setKey] = useState(0)
  return (
    <div className="flex flex-col items-center gap-4">
      <MatrixSpinner key={key} name="spin-fall" size="12" />
      <button
        className="text-xs text-muted-foreground underline underline-offset-2"
        onClick={() => setKey(k => k + 1)}
      >
        Replay
      </button>
    </div>
  )
}`,
      preview: React.createElement(SpinFallPreview, {}),
    },
  ],
};
