import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const sliderDoc: ComponentDoc = {
  id: "slider",
  name: "Slider",
  description:
    "An input where the user selects a value from within a given range.",
  installation: {
    cli: "npx shadcn@latest add slider",
    manual:
      "Copy and paste the slider component source code into your project.",
  },
  usage: `import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[33]} max={100} step={1} />`,
  preview: {
    code: `import { Slider } from "@/components/ui/slider"

export function SliderDemo() {
  return (
    <Slider
      defaultValue={[75]}
      max={100}
      step={1}
      className="mx-auto w-full max-w-xs"
    />
  )
}`,
    component: React.createElement(Slider, {
      defaultValue: [75],
      max: 100,
      step: 1,
      className: "mx-auto w-full max-w-xs",
    }),
  },
  examples: [
    // ── Range ─────────────────────────────────────────────────────────────
    {
      name: "Range",
      description: "Use an array with two values for a range slider.",
      code: `import { Slider } from "@/components/ui/slider"

export function SliderRange() {
  return (
    <Slider
      defaultValue={[25, 50]}
      max={100}
      step={5}
      className="mx-auto w-full max-w-xs"
    />
  )
}`,
      preview: React.createElement(Slider, {
        defaultValue: [25, 50],
        max: 100,
        step: 5,
        className: "mx-auto w-full max-w-xs",
      }),
    },
    // ── Multiple Thumbs ───────────────────────────────────────────────────
    {
      name: "Multiple Thumbs",
      description: "Use an array with multiple values for multiple thumbs.",
      code: `import { Slider } from "@/components/ui/slider"

export function SliderMultiple() {
  return (
    <Slider
      defaultValue={[10, 20, 70]}
      max={100}
      step={10}
      className="mx-auto w-full max-w-xs"
    />
  )
}`,
      preview: React.createElement(Slider, {
        defaultValue: [10, 20, 70],
        max: 100,
        step: 10,
        className: "mx-auto w-full max-w-xs",
      }),
    },
    // ── Vertical ──────────────────────────────────────────────────────────
    {
      name: "Vertical",
      description: 'Use `orientation="vertical"` for a vertical slider.',
      code: `import { Slider } from "@/components/ui/slider"

export function SliderVertical() {
  return (
    <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-6">
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        orientation="vertical"
        className="h-40"
      />
      <Slider
        defaultValue={[25]}
        max={100}
        step={1}
        orientation="vertical"
        className="h-40"
      />
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        {
          className:
            "mx-auto flex w-full max-w-xs items-center justify-center gap-6",
        },
        React.createElement(Slider, {
          defaultValue: [50],
          max: 100,
          step: 1,
          orientation: "vertical",
          className: "h-40",
        }),
        React.createElement(Slider, {
          defaultValue: [25],
          max: 100,
          step: 1,
          orientation: "vertical",
          className: "h-40",
        })
      ),
    },
    // ── Controlled ────────────────────────────────────────────────────────
    {
      name: "Controlled",
      description: "A controlled slider that displays the current value.",
      code: `import * as React from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function SliderControlled() {
  const [value, setValue] = React.useState([0.3, 0.7])

  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="slider-demo-temperature">Temperature</Label>
        <span className="text-sm text-muted-foreground">
          {value.join(", ")}
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={value}
        onValueChange={setValue}
        min={0}
        max={1}
        step={0.1}
      />
    </div>
  )
}`,
      preview: React.createElement(function SliderControlled() {
        const [value, setValue] = React.useState([0.3, 0.7]);
        return React.createElement(
          "div",
          { className: "mx-auto grid w-full max-w-xs gap-3" },
          React.createElement(
            "div",
            { className: "flex items-center justify-between gap-2" },
            React.createElement(
              Label,
              { htmlFor: "slider-demo-temperature" },
              "Temperature"
            ),
            React.createElement(
              "span",
              { className: "text-muted-foreground text-sm" },
              value.join(", ")
            )
          ),
          React.createElement(Slider, {
            id: "slider-demo-temperature",
            value,
            onValueChange: setValue,
            min: 0,
            max: 1,
            step: 0.1,
          })
        );
      }),
    },
    // ── Disabled ──────────────────────────────────────────────────────────
    {
      name: "Disabled",
      description: "Use the `disabled` prop to disable the slider.",
      code: `import { Slider } from "@/components/ui/slider"

export function SliderDisabled() {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      disabled
      className="mx-auto w-full max-w-xs"
    />
  )
}`,
      preview: React.createElement(Slider, {
        defaultValue: [50],
        max: 100,
        step: 1,
        disabled: true,
        className: "mx-auto w-full max-w-xs",
      }),
    },
  ],
};
