import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Spinner,
  SPINNERS,
  type SpinnerName,
} from "@/components/ui/unicode-spinner";

const ALL_PRESETS = Object.keys(SPINNERS) as SpinnerName[];

export const unicodeSpinnerDoc: ComponentDoc = {
  id: "unicode-spinner",
  name: "Unicode Spinner",
  description:
    "Braille-based Unicode spinner with multiple animation presets. Zero dependencies — all frames are computed once at module load using the braille dot grid algorithm.",
  installation: {
    cli: "npx shadcn@latest add unicode-spinner",
    manual:
      "Copy and paste the unicode-spinner component source code into your project.",
  },
  usage: `import { Spinner } from "@/components/ui/unicode-spinner"

<Spinner />
<Spinner name="helix" />
<Spinner name="scan" size="lg" />`,
  preview: {
    code: `import { Spinner } from "@/components/ui/unicode-spinner"

export function UnicodeSpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner name="braille" />
      <Spinner name="helix" />
      <Spinner name="orbit" />
      <Spinner name="scan" />
      <Spinner name="waverows" />
    </div>
  )
}`,
    component: React.createElement(
      "div",
      { className: "flex items-center gap-6" },
      React.createElement(Spinner, { name: "braille" }),
      React.createElement(Spinner, { name: "helix" }),
      React.createElement(Spinner, { name: "orbit" }),
      React.createElement(Spinner, { name: "scan" }),
      React.createElement(Spinner, { name: "waverows" })
    ),
  },
  examples: [
    // ── All presets ───────────────────────────────────────────────────────
    {
      name: "Presets",
      description:
        "All 11 built-in animation presets. Pass the name prop to choose one.",
      code: `import { Spinner, type SpinnerName } from "@/components/ui/unicode-spinner"

const presets: SpinnerName[] = [
  "braille", "braillewave", "dna",
  "orbit", "breathe", "scan",
  "pulse", "helix", "cascade",
  "snake", "waverows",
]

export function UnicodeSpinnerPresets() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {presets.map((name) => (
        <div key={name} className="flex flex-col items-center gap-1.5">
          <Spinner name={name} size="md" />
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-wrap items-center gap-6" },
        ...ALL_PRESETS.map((name) =>
          React.createElement(
            "div",
            { key: name, className: "flex flex-col items-center gap-1.5" },
            React.createElement(Spinner, { name, size: "md" }),
            React.createElement(
              "span",
              { className: "text-xs text-muted-foreground" },
              name
            )
          )
        )
      ),
    },
    // ── Sizes ─────────────────────────────────────────────────────────────
    {
      name: "Size",
      description:
        "Use the size prop to control the font size of the braille character(s).",
      code: `import { Spinner } from "@/components/ui/unicode-spinner"

export function UnicodeSpinnerSize() {
  return (
    <div className="flex items-end gap-6">
      <Spinner name="helix" size="xs" />
      <Spinner name="helix" size="sm" />
      <Spinner name="helix" size="md" />
      <Spinner name="helix" size="lg" />
      <Spinner name="helix" size="xl" />
      <Spinner name="helix" size="2xl" />
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex items-end gap-6" },
        React.createElement(Spinner, { name: "helix", size: "xs" }),
        React.createElement(Spinner, { name: "helix", size: "sm" }),
        React.createElement(Spinner, { name: "helix", size: "md" }),
        React.createElement(Spinner, { name: "helix", size: "lg" }),
        React.createElement(Spinner, { name: "helix", size: "xl" }),
        React.createElement(Spinner, { name: "helix", size: "2xl" })
      ),
    },
    // ── Color ─────────────────────────────────────────────────────────────
    {
      name: "Color",
      description:
        "Apply any Tailwind text color via className to tint the spinner.",
      code: `import { Spinner } from "@/components/ui/unicode-spinner"

export function UnicodeSpinnerColor() {
  return (
    <div className="flex items-center gap-6">
      <Spinner name="braille" className="text-primary" />
      <Spinner name="braille" className="text-destructive" />
      <Spinner name="braille" className="text-muted-foreground" />
      <Spinner name="braille" className="text-green-500" />
      <Spinner name="braille" className="text-amber-500" />
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex items-center gap-6" },
        React.createElement(Spinner, {
          name: "braille",
          className: "text-primary",
        }),
        React.createElement(Spinner, {
          name: "braille",
          className: "text-destructive",
        }),
        React.createElement(Spinner, {
          name: "braille",
          className: "text-muted-foreground",
        }),
        React.createElement(Spinner, {
          name: "braille",
          className: "text-green-500",
        }),
        React.createElement(Spinner, {
          name: "braille",
          className: "text-amber-500",
        })
      ),
    },
    // ── Inline with text ──────────────────────────────────────────────────
    {
      name: "Inline",
      description: "Use inline with text to show a loading label.",
      code: `import { Spinner } from "@/components/ui/unicode-spinner"

export function UnicodeSpinnerInline() {
  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner name="orbit" /> Processing payment…
      </p>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner name="breathe" /> Syncing records…
      </p>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner name="dna" /> Generating report…
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
            className: "flex items-center gap-2 text-sm text-muted-foreground",
          },
          React.createElement(Spinner, { name: "orbit" }),
          "Processing payment…"
        ),
        React.createElement(
          "p",
          {
            className: "flex items-center gap-2 text-sm text-muted-foreground",
          },
          React.createElement(Spinner, { name: "breathe" }),
          "Syncing records…"
        ),
        React.createElement(
          "p",
          {
            className: "flex items-center gap-2 text-sm text-muted-foreground",
          },
          React.createElement(Spinner, { name: "dna" }),
          "Generating report…"
        )
      ),
    },
  ],
};
