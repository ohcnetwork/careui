import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

export const drawerDoc: ComponentDoc = {

    id: 'drawer',
    name: 'Drawer',
    description: 'A drawer component for React, built on top of Vaul.',
    installation: {
      cli: 'npx shadcn@latest add drawer',
      manual: 'Install vaul dependency and copy the drawer component source code into your project.'
    },
    usage: `"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
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
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
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
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
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
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}`,
    preview: {
      code: `"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
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
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
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
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
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
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}`,
      component: React.createElement(() => {
        const [goal, setGoal] = React.useState(350)

        const data = [
          { goal: 400 },
          { goal: 300 },
          { goal: 200 },
          { goal: 300 },
          { goal: 200 },
          { goal: 278 },
          { goal: 189 },
          { goal: 239 },
          { goal: 300 },
          { goal: 200 },
          { goal: 278 },
          { goal: 189 },
          { goal: 349 },
        ]

        function onClick(adjustment: number) {
          setGoal(Math.max(200, Math.min(400, goal + adjustment)))
        }

        return React.createElement(Drawer, {},
          React.createElement(DrawerTrigger, { asChild: true },
            React.createElement(Button, { variant: 'outline' }, 'Open Drawer')
          ),
          React.createElement(DrawerContent, {},
            React.createElement('div', { className: 'mx-auto w-full max-w-sm' },
              React.createElement(DrawerHeader, {},
                React.createElement(DrawerTitle, {}, 'Move Goal'),
                React.createElement(DrawerDescription, {}, 'Set your daily activity goal.')
              ),
              React.createElement('div', { className: 'p-4 pb-0' },
                React.createElement('div', { className: 'flex items-center justify-center space-x-2' },
                  React.createElement(Button, {
                    variant: 'outline',
                    size: 'icon',
                    className: 'h-8 w-8 shrink-0 rounded-full',
                    onClick: () => onClick(-10),
                    disabled: goal <= 200
                  },
                    React.createElement(Minus, {}),
                    React.createElement('span', { className: 'sr-only' }, 'Decrease')
                  ),
                  React.createElement('div', { className: 'flex-1 text-center' },
                    React.createElement('div', { className: 'text-7xl font-bold tracking-tighter' }, goal),
                    React.createElement('div', { className: 'text-muted-foreground text-[0.70rem] uppercase' }, 'Calories/day')
                  ),
                  React.createElement(Button, {
                    variant: 'outline',
                    size: 'icon',
                    className: 'h-8 w-8 shrink-0 rounded-full',
                    onClick: () => onClick(10),
                    disabled: goal >= 400
                  },
                    React.createElement(Plus, {}),
                    React.createElement('span', { className: 'sr-only' }, 'Increase')
                  )
                ),
                React.createElement('div', { className: 'mt-3 h-[120px]' },
                  React.createElement(ResponsiveContainer, { width: '100%', height: '100%' },
                    React.createElement(BarChart, { data: data },
                      React.createElement(Bar, {
                        dataKey: 'goal',
                        style: {
                          fill: 'hsl(var(--foreground))',
                          opacity: 0.9,
                        } as React.CSSProperties
                      })
                    )
                  )
                )
              ),
              React.createElement(DrawerFooter, {},
                React.createElement(Button, {}, 'Submit'),
                React.createElement(DrawerClose, { asChild: true },
                  React.createElement(Button, { variant: 'outline' }, 'Cancel')
                )
              )
            )
          )
        )
      })
    },
    examples: [
      {
        name: 'Responsive Dialog',
        description: 'A responsive component that shows a dialog on desktop and a drawer on mobile.',
        code: `"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
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
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
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
      <Button type="submit">Save changes</Button>
    </form>
  )
}`,
        preview: React.createElement(() => {
          const [open, setOpen] = React.useState(false)
          const isDesktop = useMediaQuery("(min-width: 768px)")

          const ProfileFormComponent = ({ className }: { className?: string }) => (
            React.createElement('form', { className: cn('grid items-start gap-6', className) },
              React.createElement('div', { className: 'grid gap-3' },
                React.createElement(Label, { htmlFor: 'email' }, 'Email'),
                React.createElement(Input, { type: 'email', id: 'email', defaultValue: 'shadcn@example.com' })
              ),
              React.createElement('div', { className: 'grid gap-3' },
                React.createElement(Label, { htmlFor: 'username' }, 'Username'),
                React.createElement(Input, { id: 'username', defaultValue: '@shadcn' })
              ),
              React.createElement(Button, { type: 'submit' }, 'Save changes')
            )
          )

          if (isDesktop) {
            return React.createElement(Dialog, { open: open, onOpenChange: setOpen },
              React.createElement(DialogTrigger, { asChild: true },
                React.createElement(Button, { variant: 'outline' }, 'Edit Profile')
              ),
              React.createElement(DialogContent, { className: 'sm:max-w-[425px]' },
                React.createElement(DialogHeader, {},
                  React.createElement(DialogTitle, {}, 'Edit profile'),
                  React.createElement(DialogDescription, {}, 'Make changes to your profile here. Click save when you\'re done.')
                ),
                React.createElement(ProfileFormComponent, {})
              )
            )
          }

          return React.createElement(Drawer, { open: open, onOpenChange: setOpen },
            React.createElement(DrawerTrigger, { asChild: true },
              React.createElement(Button, { variant: 'outline' }, 'Edit Profile')
            ),
            React.createElement(DrawerContent, {},
              React.createElement('div', { className: 'mx-auto w-full max-w-sm' },
                React.createElement(DrawerHeader, { className: 'text-left' },
                  React.createElement(DrawerTitle, {}, 'Edit profile'),
                  React.createElement(DrawerDescription, {}, 'Make changes to your profile here. Click save when you\'re done.')
                ),
                React.createElement(ProfileFormComponent, { className: 'px-4' }),
                React.createElement(DrawerFooter, { className: 'pt-2' },
                  React.createElement(DrawerClose, { asChild: true },
                    React.createElement(Button, { variant: 'outline' }, 'Cancel')
                  )
                )
              )
            )
          )
        })
      }
    ],
    props: [
      {
        name: 'direction',
        type: '"top" | "right" | "bottom" | "left"',
        description: 'The direction from which the drawer slides.',
        default: '"bottom"'
      },
      {
        name: 'open',
        type: 'boolean',
        description: 'Whether the drawer is open.',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Callback function called when the open state changes.',
      },
      {
        name: 'modal',
        type: 'boolean',
        description: 'Whether the drawer should be modal.',
        default: 'true'
      }
    ]
}
