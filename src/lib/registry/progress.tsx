import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Field, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

function ProgressAnimated() {
  const [value, setValue] = React.useState(13);
  React.useEffect(() => {
    const timer = setTimeout(() => setValue(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return React.createElement(Progress, { value, className: "w-[60%]" });
}

function ProgressControlled() {
  const [value, setValue] = React.useState([50]);
  return React.createElement(
    "div",
    { className: "flex w-full max-w-sm flex-col gap-4" },
    React.createElement(Progress, { value: value[0] }),
    React.createElement(Slider, {
      value,
      onValueChange: setValue,
      min: 0,
      max: 100,
      step: 1,
    })
  );
}

export const progressDoc: ComponentDoc = {
  id: "progress",
  name: "Progress",
  description:
    "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  installation: {
    cli: "npx shadcn@latest add progress",
    manual:
      "Copy and paste the progress component source code into your project.",
  },
  usage: `import { Progress } from "@/components/ui/progress"

<Progress value={33} />`,
  preview: {
    code: `const [progress, setProgress] = React.useState(13)

React.useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500)
  return () => clearTimeout(timer)
}, [])

return <Progress value={progress} className="w-[60%]" />`,
    component: React.createElement(ProgressAnimated),
  },
  examples: [
    {
      name: "Label",
      description: "Use a Field component to add a label to the progress bar.",
      code: `<Field className="w-full max-w-sm">
  <FieldLabel htmlFor="progress-upload">
    <span>Upload progress</span>
    <span className="ml-auto">66%</span>
  </FieldLabel>
  <Progress value={66} id="progress-upload" />
</Field>`,
      preview: React.createElement(
        Field,
        { className: "w-full max-w-sm" },
        React.createElement(
          FieldLabel,
          { htmlFor: "progress-upload" },
          React.createElement("span", {}, "Upload progress"),
          React.createElement("span", { className: "ml-auto" }, "66%")
        ),
        React.createElement(Progress, { value: 66, id: "progress-upload" })
      ),
    },
    {
      name: "Controlled",
      description: "A progress bar that can be controlled by a slider.",
      code: `const [value, setValue] = React.useState([50])

return (
  <div className="flex w-full max-w-sm flex-col gap-4">
    <Progress value={value[0]} />
    <Slider
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
      step={1}
    />
  </div>
)`,
      preview: React.createElement(ProgressControlled),
    },
  ],
};
