import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const sonnerDoc: ComponentDoc = {
  id: "sonner",
  name: "Sonner",
  description: "An opinionated toast component for React.",
  installation: {
    cli: "npx shadcn@latest add sonner",
    manual:
      "Copy and paste the sonner component source code into your project.",
  },
  usage: `import { toast } from "sonner"

toast("Event has been created.")`,
  preview: {
    code: `"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          position: "top-center",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}`,
    component: React.createElement(
      Button,
      {
        variant: "outline",
        onClick: () =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            position: "top-center",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          }),
      },
      "Show Toast"
    ),
  },
  examples: [
    {
      name: "Types",
      description: "All available toast types: default, success, info, warning, error, and promise.",
      code: `"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Event has been created", { position: "top-center" })}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Event has been created", { position: "top-center" })}>
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("Be at the area 10 minutes before the event time", { position: "top-center" })}
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("Event start time cannot be earlier than 8am", { position: "top-center" })}
      >
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Event has not been created", { position: "top-center" })}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.promise(
            () => new Promise((resolve) => setTimeout(() => resolve({ name: "Event" }), 2000)),
            {
              loading: "Loading...",
              success: (data) => \`\${(data as { name: string }).name} has been created\`,
              error: "Error",
              position: "top-center",
            }
          )
        }}
      >
        Promise
      </Button>
    </div>
  )
}`,
      preview: React.createElement(() =>
        React.createElement(
          "div",
          { className: "flex flex-wrap gap-2" },
          React.createElement(
            Button,
            { variant: "outline", onClick: () => toast("Event has been created", { position: "top-center" }) },
            "Default"
          ),
          React.createElement(
            Button,
            { variant: "outline", onClick: () => toast.success("Event has been created", { position: "top-center" }) },
            "Success"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () => toast.info("Be at the area 10 minutes before the event time", { position: "top-center" }),
            },
            "Info"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () => toast.warning("Event start time cannot be earlier than 8am", { position: "top-center" }),
            },
            "Warning"
          ),
          React.createElement(
            Button,
            { variant: "outline", onClick: () => toast.error("Event has not been created", { position: "top-center" }) },
            "Error"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () => {
                toast.promise(
                  () =>
                    new Promise((resolve) =>
                      setTimeout(() => resolve({ name: "Event" }), 2000)
                    ),
                  {
                    loading: "Loading...",
                    success: (data) =>
                      `${(data as { name: string }).name} has been created`,
                    error: "Error",
                    position: "top-center",
                  }
                );
              },
            },
            "Promise"
          )
        )
      ),
    },
    {
      name: "Description",
      description: "Add a description to provide more context to the toast.",
      code: `"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerDescription() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Monday, January 3rd at 6:00pm",
          position: "top-center",
        })
      }
    >
      Show Toast
    </Button>
  )
}`,
      preview: React.createElement(
        Button,
        {
          variant: "outline",
          onClick: () =>
            toast("Event has been created", {
              description: "Monday, January 3rd at 6:00pm",
              position: "top-center",
            }),
        },
        "Show Toast"
      ),
    },
    {
      name: "Position",
      description: "Use the position option to change the position of the toast.",
      code: `"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerPosition() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast("Event has been created", { position: "top-left" })}>
        Top Left
      </Button>
      <Button variant="outline" onClick={() => toast("Event has been created", { position: "top-center" })}>
        Top Center
      </Button>
      <Button variant="outline" onClick={() => toast("Event has been created", { position: "top-right" })}>
        Top Right
      </Button>
      <Button variant="outline" onClick={() => toast("Event has been created", { position: "bottom-left" })}>
        Bottom Left
      </Button>
      <Button variant="outline" onClick={() => toast("Event has been created", { position: "bottom-center" })}>
        Bottom Center
      </Button>
      <Button variant="outline" onClick={() => toast("Event has been created", { position: "bottom-right" })}>
        Bottom Right
      </Button>
    </div>
  )
}`,
      preview: React.createElement(() =>
        React.createElement(
          "div",
          { className: "flex flex-wrap justify-center gap-2" },
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () => toast("Event has been created", { position: "top-left" }),
            },
            "Top Left"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () => toast("Event has been created", { position: "top-center" }),
            },
            "Top Center"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () => toast("Event has been created", { position: "top-right" }),
            },
            "Top Right"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () => toast("Event has been created", { position: "bottom-left" }),
            },
            "Bottom Left"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () => toast("Event has been created", { position: "bottom-center" }),
            },
            "Bottom Center"
          ),
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () => toast("Event has been created", { position: "bottom-right" }),
            },
            "Bottom Right"
          )
        )
      ),
    },
  ],
};
