import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  PixelSpinner,
  PIXEL_SPINNERS,
  type PixelSpinnerName,
} from "@/components/ui/pixel-spinner";

const ALL_PRESETS = Object.keys(PIXEL_SPINNERS) as PixelSpinnerName[];

export const pixelSpinnerDoc: ComponentDoc = {
  id: "pixel-spinner",
  name: "Pixel Spinner",
  description:
    "Dot-matrix spinner with 19 animation presets rendered as a CSS 8×8 square grid of discrete rounded dots. Zero dependencies — all frames are computed once at module load.",
  installation: {
    cli: "npx shadcn@latest add pixel-spinner",
    manual:
      "Copy and paste the pixel-spinner component source code into your project.",
  },
  usage: `import { PixelSpinner } from "@/components/ui/pixel-spinner"

<PixelSpinner />
<PixelSpinner name="helix" />
<PixelSpinner name="columns" size="lg" />`,
  preview: {
    code: `import { PixelSpinner } from "@/components/ui/pixel-spinner"

export function PixelSpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <PixelSpinner name="braille" />
      <PixelSpinner name="helix" />
      <PixelSpinner name="columns" />
      <PixelSpinner name="scan" />
      <PixelSpinner name="waverows" />
    </div>
  )
}`,
    component: React.createElement(
      "div",
      { className: "flex items-center gap-6" },
      React.createElement(PixelSpinner, { name: "braille" }),
      React.createElement(PixelSpinner, { name: "helix" }),
      React.createElement(PixelSpinner, { name: "columns" }),
      React.createElement(PixelSpinner, { name: "scan" }),
      React.createElement(PixelSpinner, { name: "waverows" }),
    ),
  },
  examples: [
    // ── All presets ───────────────────────────────────────────────────────
    {
      name: "Presets",
      description:
        "All 19 built-in animation presets rendered as discrete dots on an 8×8 square grid.",
      code: `import { PixelSpinner, type PixelSpinnerName } from "@/components/ui/pixel-spinner"

const presets: PixelSpinnerName[] = [
  "braille", "braillewave", "dna",
  "orbit", "breathe", "scan",
  "rain", "scanline", "pulse",
  "sparkle", "cascade", "columns",
  "snake", "helix", "waverows",
  "checkerboard", "fillsweep", "diagswipe",
  "heartpulse",
]

export function PixelSpinnerPresets() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      {presets.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <PixelSpinner name={name} size="md" />
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-wrap items-start gap-6" },
        ...ALL_PRESETS.map(name =>
          React.createElement(
            "div",
            { key: name, className: "flex flex-col items-center gap-2" },
            React.createElement(PixelSpinner, { name, size: "19" }),
            React.createElement(
              "span",
              { className: "text-xs text-muted-foreground" },
              name,
            ),
          ),
        ),
      ),
    },
    // ── Sizes ─────────────────────────────────────────────────────────────
    {
      name: "Size",
      description:
        "Use the size prop to control the total spinner dimension — 14, 19, 24, or 29 px (each gives 2/3/4/5 px integer dots).",
      code: `import { PixelSpinner } from "@/components/ui/pixel-spinner"

export function PixelSpinnerSize() {
  return (
    <div className="flex items-end gap-4">
      <PixelSpinner name="helix" size="14" />
      <PixelSpinner name="helix" size="19" />
      <PixelSpinner name="helix" size="24" />
      <PixelSpinner name="helix" size="29" />
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex items-end gap-4" },
        React.createElement(PixelSpinner, { name: "helix", size: "14" }),
        React.createElement(PixelSpinner, { name: "helix", size: "19" }),
        React.createElement(PixelSpinner, { name: "helix", size: "24" }),
        React.createElement(PixelSpinner, { name: "helix", size: "29" }),
      ),
    },
    // ── Color ─────────────────────────────────────────────────────────────
    {
      name: "Color",
      description:
        "Apply any Tailwind text color via className to tint both the on (█) and off (░) pixels.",
      code: `import { PixelSpinner } from "@/components/ui/pixel-spinner"

export function PixelSpinnerColor() {
  return (
    <div className="flex items-center gap-6">
      <PixelSpinner name="orbit" className="text-primary" />
      <PixelSpinner name="orbit" className="text-destructive" />
      <PixelSpinner name="orbit" className="text-muted-foreground" />
      <PixelSpinner name="orbit" className="text-green-500" />
      <PixelSpinner name="orbit" className="text-amber-500" />
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex items-center gap-6" },
        React.createElement(PixelSpinner, {
          name: "orbit",
          className: "text-primary",
        }),
        React.createElement(PixelSpinner, {
          name: "orbit",
          className: "text-destructive",
        }),
        React.createElement(PixelSpinner, {
          name: "orbit",
          className: "text-muted-foreground",
        }),
        React.createElement(PixelSpinner, {
          name: "orbit",
          className: "text-green-500",
        }),
        React.createElement(PixelSpinner, {
          name: "orbit",
          className: "text-amber-500",
        }),
      ),
    },
    // ── Inline usage ──────────────────────────────────────────────────────
    {
      name: "Inline",
      description: "Pixel spinners can appear inline next to text labels.",
      code: `import { PixelSpinner } from "@/components/ui/pixel-spinner"

export function PixelSpinnerInline() {
  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <PixelSpinner name="columns" /> Processing payment…
      </p>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <PixelSpinner name="breathe" /> Syncing records…
      </p>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <PixelSpinner name="dna" /> Generating report…
      </p>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col gap-3" },
        React.createElement(
          "p",
          {
            className:
              "flex items-center gap-2 text-sm text-muted-foreground",
          },
          React.createElement(PixelSpinner, { name: "columns" }),
          "Processing payment…",
        ),
        React.createElement(
          "p",
          {
            className:
              "flex items-center gap-2 text-sm text-muted-foreground",
          },
          React.createElement(PixelSpinner, { name: "breathe" }),
          "Syncing records…",
        ),
        React.createElement(
          "p",
          {
            className:
              "flex items-center gap-2 text-sm text-muted-foreground",
          },
          React.createElement(PixelSpinner, { name: "dna" }),
          "Generating report…",
        ),
      ),
    },
    // ── Heartpulse ────────────────────────────────────────────────────────
    {
      name: "Heartpulse",
      description:
        "Medical cross smoothly morphs into a heart cell-by-cell via Chebyshev ripple order, holds, then dissolves back.",
      code: `import { PixelSpinner } from "@/components/ui/pixel-spinner"

export function PixelSpinnerHeartpulse() {
  return (
    <div className="flex items-center gap-3">
      <PixelSpinner name="heartpulse" size="24" className="text-destructive" />
      <span className="text-sm text-muted-foreground">Monitoring vitals…</span>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(PixelSpinner, {
          name: "heartpulse",
          size: "24",
          className: "text-destructive",
        }),
        React.createElement(
          "span",
          { className: "text-sm text-muted-foreground" },
          "Monitoring vitals…",
        ),
      ),
    },
  ],
};
