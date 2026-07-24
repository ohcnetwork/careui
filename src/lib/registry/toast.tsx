import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/toast";

export const toastDoc: ComponentDoc = {
  id: "toast",
  name: "Toast",
  description: "A succinct message that is displayed temporarily.",
  installation: {
    cli: "npx shadcn@latest add toast",
    manual: "Copy and paste the toast component source code into your project.",
  },
  usage: `import { Toaster, toast } from "@/components/ui/toast"

export function App() {
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "success",
            title: "Changes saved",
            description: "Your profile updates were stored successfully.",
          })
        }
      >
        Show toast
      </Button>
      <Toaster />
    </>
  )
}`,
  preview: {
    code: `import { Toaster, toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

export function ToastDemo() {
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "success",
            title: "Changes saved",
            description: "Your profile updates were stored successfully.",
          })
        }
      >
        Show toast
      </Button>
      <Toaster />
    </>
  )
}`,
    component: React.createElement(
      React.Fragment,
      null,
      React.createElement(
        Button,
        {
          variant: "outline",
          onClick: () =>
            toast.add({
              type: "success",
              title: "Changes saved",
              description: "Your profile updates were stored successfully.",
            }),
        },
        "Show toast"
      ),
      React.createElement(Toaster)
    ),
  },
  examples: [
    {
      name: "Toast Types",
      description: "Set the `type` field to match the tone of the message.",
      code: `import { Toaster, toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

export function ToastTypesDemo() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => toast.add({ title: "Default message" })}>Default</Button>
        <Button variant="outline" onClick={() => toast.add({ type: "success", title: "Saved successfully" })}>Success</Button>
        <Button variant="outline" onClick={() => toast.add({ type: "info", title: "Heads up: autosave is on" })}>Info</Button>
        <Button variant="outline" onClick={() => toast.add({ type: "warning", title: "Session expires in 2 minutes" })}>Warning</Button>
        <Button variant="outline" onClick={() => toast.add({ type: "error", title: "Failed to save changes" })}>Error</Button>
      </div>
      <Toaster />
    </>
  )
}`,
      preview: React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          { className: "flex flex-wrap gap-2" },
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () => toast.add({ title: "Default message" }),
            },
            "Default"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () =>
                toast.add({ type: "success", title: "Saved successfully" }),
            },
            "Success"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () =>
                toast.add({ type: "info", title: "Heads up: autosave is on" }),
            },
            "Info"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () =>
                toast.add({
                  type: "warning",
                  title: "Session expires in 2 minutes",
                }),
            },
            "Warning"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () =>
                toast.add({ type: "error", title: "Failed to save changes" }),
            },
            "Error"
          )
        ),
        React.createElement(Toaster)
      ),
    },
    {
      name: "With Action",
      description:
        "Attach a CTA so users can undo or continue directly from the toast.",
      code: `import { Toaster, toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

export function ToastActionDemo() {
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Report generated",
            description: "The weekly admissions report is ready.",
            actionProps: {
              children: "Open",
              onClick: () => console.log("Open report"),
            },
          })
        }
      >
        Show actionable toast
      </Button>
      <Toaster />
    </>
  )
}`,
      preview: React.createElement(
        React.Fragment,
        null,
        React.createElement(
          Button,
          {
            variant: "outline",
            onClick: () =>
                toast.add({
                  title: "Report generated",
                description: "The weekly admissions report is ready.",
                  actionProps: {
                    children: "Open",
                  onClick: () => console.log("Open report"),
                },
              }),
          },
          "Show actionable toast"
        ),
        React.createElement(Toaster)
      ),
    },
  ],
  props: [
    {
      name: "toast",
      type: "ToastManager",
      description:
        "Call `toast.add({ title, description, type })` to enqueue notifications.",
    },
    {
      name: "Toaster",
      type: "React component",
      description: "Renders the viewport and active toast stack for a manager.",
    },
    {
      name: "actionProps",
      type: "React.ComponentPropsWithoutRef<'button'>",
      description:
        "Optional action shown in the toast body for quick follow-up actions.",
    },
  ],
};
