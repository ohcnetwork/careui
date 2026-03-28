import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const chartData = [
  { goal: 400 }, { goal: 300 }, { goal: 200 }, { goal: 300 }, { goal: 200 },
  { goal: 278 }, { goal: 189 }, { goal: 239 }, { goal: 300 }, { goal: 200 },
  { goal: 278 }, { goal: 189 }, { goal: 349 },
];

export const drawerDoc: ComponentDoc = {
  id: "drawer",
  name: "Drawer",
  description: "A drawer component for React, built on top of Vaul.",
  installation: {
    cli: "npx shadcn@latest add drawer",
    manual:
      "Install vaul dependency and copy the drawer component source code into your project.",
  },
  usage: `import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <p>Your content goes here.</p>
    </DrawerBody>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
  preview: {
    code: `"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const data = [
  { goal: 400 }, { goal: 300 }, { goal: 200 }, { goal: 300 }, { goal: 200 },
  { goal: 278 }, { goal: 189 }, { goal: 239 }, { goal: 300 }, { goal: 200 },
  { goal: 278 }, { goal: 189 }, { goal: 349 },
]

export function DrawerDemo() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent size="md">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => onClick(-10)}
              disabled={goal <= 200}
            >
              <Minus />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="flex-1 text-center">
              <div className="text-7xl font-bold tracking-tighter">{goal}</div>
              <div className="text-muted-foreground text-[0.70rem] uppercase">
                Calories/day
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => onClick(10)}
              disabled={goal >= 400}
            >
              <Plus />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          <div className="mt-3 h-30">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="goal"
                  style={{ fill: "var(--chart-1)" } as React.CSSProperties}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`,
    component: React.createElement(() => {
      const [goal, setGoal] = React.useState(350);

      function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)));
      }

      return React.createElement(
        Drawer,
        {},
        React.createElement(
          DrawerTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Open Drawer")
        ),
        React.createElement(
          DrawerContent,
          { size: "md" },
          React.createElement(
            DrawerHeader,
            {},
            React.createElement(DrawerTitle, {}, "Move Goal"),
            React.createElement(DrawerDescription, {}, "Set your daily activity goal.")
          ),
          React.createElement(
            DrawerBody,
            {},
            React.createElement(
              "div",
              { className: "flex items-center justify-center space-x-2" },
              React.createElement(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "h-8 w-8 shrink-0 rounded-full",
                  onClick: () => onClick(-10),
                  disabled: goal <= 200,
                },
                React.createElement(Minus, {}),
                React.createElement("span", { className: "sr-only" }, "Decrease")
              ),
              React.createElement(
                "div",
                { className: "flex-1 text-center" },
                React.createElement("div", { className: "text-7xl font-bold tracking-tighter" }, goal),
                React.createElement("div", { className: "text-muted-foreground text-[0.70rem] uppercase" }, "Calories/day")
              ),
              React.createElement(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "h-8 w-8 shrink-0 rounded-full",
                  onClick: () => onClick(10),
                  disabled: goal >= 400,
                },
                React.createElement(Plus, {}),
                React.createElement("span", { className: "sr-only" }, "Increase")
              )
            ),
            React.createElement(
              "div",
              { className: "mt-3 h-30" },
              React.createElement(
                ResponsiveContainer as any,
                { width: "100%", height: "100%" },
                React.createElement(
                  BarChart as any,
                  { data: chartData },
                  React.createElement(Bar as any, {
                    dataKey: "goal",
                    style: { fill: "var(--chart-1)" } as React.CSSProperties,
                  })
                )
              )
            )
          ),
          React.createElement(
            DrawerFooter,
            {},
            React.createElement(Button, {}, "Submit"),
            React.createElement(
              DrawerClose,
              { asChild: true },
              React.createElement(Button, { variant: "outline" }, "Cancel")
            )
          )
        )
      );
    }),
  },
  examples: [
    {
      name: "Scrollable Content",
      description: "Keep actions visible while the content scrolls.",
      code: `import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerScrollableContent() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Scrollable Content</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`,
      preview: React.createElement(() =>
        React.createElement(
          Drawer,
          { direction: "right" },
          React.createElement(
            DrawerTrigger,
            { asChild: true },
            React.createElement(Button, { variant: "outline" }, "Scrollable Content")
          ),
          React.createElement(
            DrawerContent,
            {},
            React.createElement(
              DrawerHeader,
              {},
              React.createElement(DrawerTitle, {}, "Move Goal"),
              React.createElement(DrawerDescription, {}, "Set your daily activity goal.")
            ),
            React.createElement(
              DrawerBody,
              {},
              ...Array.from({ length: 10 }, (_, index) =>
                React.createElement(
                  "p",
                  { key: index, className: "mb-4 leading-normal" },
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                )
              )
            ),
            React.createElement(
              DrawerFooter,
              {},
              React.createElement(Button, {}, "Submit"),
              React.createElement(
                DrawerClose,
                { asChild: true },
                React.createElement(Button, { variant: "outline" }, "Cancel")
              )
            )
          )
        )
      ),
    },
    {
      name: "Sides",
      description:
        "Use the direction prop to set the side of the drawer. Available options are top, right, bottom, and left.",
      code: `import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const DRAWER_SIDES = ["top", "right", "bottom", "left"] as const

export function DrawerWithSides() {
  return (
    <div className="flex flex-wrap gap-2">
      {DRAWER_SIDES.map((side) => (
        <Drawer
          key={side}
          direction={
            side === "bottom" ? undefined : (side as "top" | "right" | "left")
          }
        >
          <DrawerTrigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <p key={index} className="mb-4 leading-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              ))}
            </DrawerBody>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}`,
      preview: React.createElement(() => {
        const DRAWER_SIDES = ["top", "right", "bottom", "left"] as const;
        return React.createElement(
          "div",
          { className: "flex flex-wrap gap-2" },
          ...DRAWER_SIDES.map((side) =>
            React.createElement(
              Drawer,
              {
                key: side,
                direction:
                  side === "bottom"
                    ? undefined
                    : (side as "top" | "right" | "left"),
              },
              React.createElement(
                DrawerTrigger,
                { asChild: true },
                React.createElement(
                  Button,
                  { variant: "outline", className: "capitalize" },
                  side
                )
              ),
              React.createElement(
                DrawerContent,
                {},
                React.createElement(
                  DrawerHeader,
                  {},
                  React.createElement(DrawerTitle, {}, "Move Goal"),
                  React.createElement(DrawerDescription, {}, "Set your daily activity goal.")
                ),
                React.createElement(
                  DrawerBody,
                  {},
                  ...Array.from({ length: 10 }, (_, index) =>
                    React.createElement(
                      "p",
                      { key: index, className: "mb-4 leading-normal" },
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    )
                  )
                ),
                React.createElement(
                  DrawerFooter,
                  {},
                  React.createElement(Button, {}, "Submit"),
                  React.createElement(
                    DrawerClose,
                    { asChild: true },
                    React.createElement(Button, { variant: "outline" }, "Cancel")
                  )
                )
              )
            )
          )
        );
      }),
    },
    {
      name: "Size Variants",
      description:
        "Use the size prop on DrawerContent to constrain the inner content width for bottom and top drawers. Available sizes: md (max-w-lg), lg (max-w-2xl), and full (default).",
      code: `import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerBody,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const SIZES = ["md", "lg", "full"] as const

export function DrawerSizes() {
  return (
    <div className="flex flex-wrap gap-2">
      {SIZES.map((size) => (
        <Drawer key={size}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="capitalize">
              {size}
            </Button>
          </DrawerTrigger>
          <DrawerContent size={size}>
            <DrawerHeader>
              <DrawerTitle>Size: {size}</DrawerTitle>
              <DrawerDescription>This drawer uses size="{size}".</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-muted-foreground text-sm">
                The header, body, and footer content are constrained to the
                selected size. Resize the window to see the effect at different
                breakpoints.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}`,
      preview: React.createElement(() => {
        const SIZES = ["md", "lg", "full"] as const;
        return React.createElement(
          "div",
          { className: "flex flex-wrap gap-2" },
          ...SIZES.map((size) =>
            React.createElement(
              Drawer,
              { key: size },
              React.createElement(
                DrawerTrigger,
                { asChild: true },
                React.createElement(
                  Button,
                  { variant: "outline", className: "capitalize" },
                  size
                )
              ),
              React.createElement(
                DrawerContent,
                { size },
                React.createElement(
                  DrawerHeader,
                  {},
                  React.createElement(DrawerTitle, {}, `Size: ${size}`),
                  React.createElement(
                    DrawerDescription,
                    {},
                    `This drawer uses size="${size}".`
                  )
                ),
                React.createElement(
                  DrawerBody,
                  {},
                  React.createElement(
                    "p",
                    { className: "text-muted-foreground text-sm" },
                    "The header, body, and footer content are constrained to the selected size. Resize the window to see the effect at different breakpoints."
                  )
                ),
                React.createElement(
                  DrawerFooter,
                  {},
                  React.createElement(Button, {}, "Submit"),
                  React.createElement(
                    DrawerClose,
                    { asChild: true },
                    React.createElement(Button, { variant: "outline" }, "Cancel")
                  )
                )
              )
            )
          )
        );
      }),
    },
    {
      name: "Responsive Dialog",
      description:
        "You can combine the Dialog and Drawer components to create a responsive dialog. This renders a Dialog component on desktop and a Drawer on mobile.",
      code: `"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <ProfileForm />
        </DrawerBody>
        <DrawerFooter>
          <Button type="submit">Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
    </form>
  )
}`,
      preview: React.createElement(() => {
        const [open, setOpen] = React.useState(false);
        const isDesktop = useMediaQuery("(min-width: 768px)");

        const ProfileFormComponent = ({ className }: { className?: string }) =>
          React.createElement(
            "form",
            { className: cn("grid items-start gap-6", className) },
            React.createElement(
              "div",
              { className: "grid gap-3" },
              React.createElement(Label, { htmlFor: "email" }, "Email"),
              React.createElement(Input, {
                type: "email",
                id: "email",
                defaultValue: "shadcn@example.com",
              })
            ),
            React.createElement(
              "div",
              { className: "grid gap-3" },
              React.createElement(Label, { htmlFor: "username" }, "Username"),
              React.createElement(Input, {
                id: "username",
                defaultValue: "@shadcn",
              })
            ),
          );

        if (isDesktop) {
          return React.createElement(
            Dialog,
            { open: open, onOpenChange: setOpen },
            React.createElement(
              DialogTrigger,
              { asChild: true },
              React.createElement(
                Button,
                { variant: "outline" },
                "Edit Profile"
              )
            ),
            React.createElement(
              DialogContent,
              { className: "sm:max-w-[425px]" },
              React.createElement(
                DialogHeader,
                {},
                React.createElement(DialogTitle, {}, "Edit profile"),
                React.createElement(
                  DialogDescription,
                  {},
                  "Make changes to your profile here. Click save when you're done."
                )
              ),
              React.createElement(ProfileFormComponent, {}),
              React.createElement(
                DialogFooter,
                {},
                React.createElement(Button, { variant: "outline", onClick: () => setOpen(false) }, "Cancel"),
                React.createElement(Button, { type: "submit" }, "Save changes")
              )
            )
          );
        }

        return React.createElement(
          Drawer,
          { open: open, onOpenChange: setOpen },
          React.createElement(
            DrawerTrigger,
            { asChild: true },
            React.createElement(Button, { variant: "outline" }, "Edit Profile")
          ),
          React.createElement(
            DrawerContent,
            {},
            React.createElement(
              DrawerHeader,
              {},
              React.createElement(DrawerTitle, {}, "Edit profile"),
              React.createElement(
                DrawerDescription,
                {},
                "Make changes to your profile here. Click save when you're done."
              )
            ),
            React.createElement(
              DrawerBody,
              {},
              React.createElement(ProfileFormComponent, {})
            ),
            React.createElement(
              DrawerFooter,
              {},
              React.createElement(Button, { type: "submit" }, "Save changes"),
              React.createElement(
                DrawerClose,
                { asChild: true },
                React.createElement(Button, { variant: "outline" }, "Cancel")
              )
            )
          )
        );
      }),
    },
  ],
  props: [
    {
      name: "direction",
      type: '"top" | "right" | "bottom" | "left"',
      description: "The direction from which the drawer slides.",
      default: '"bottom"',
    },
    {
      name: "open",
      type: "boolean",
      description: "Whether the drawer is open.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Callback function called when the open state changes.",
    },
    {
      name: "modal",
      type: "boolean",
      description: "Whether the drawer should be modal.",
      default: "true",
    },
  ],
};
