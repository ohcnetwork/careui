import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandDialog,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

export const commandDoc: ComponentDoc = {
  id: "command",
  name: "Command",
  description: "Fast, composable, unstyled command menu for React.",
  installation: {
    cli: "npx shadcn@latest add command",
    manual:
      "Copy and paste the command component source code into your project.",
  },
  usage: `import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`,
  preview: {
    code: `import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut, Calendar, CreditCard, Settings, Smile, User, Calculator, Command } from "lucide-react"

<Command className="rounded-lg border shadow-md md:min-w-[450px]">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar />
        <span>Calendar</span>
      </CommandItem>
      <CommandItem>
        <Smile />
        <span>Search Emoji</span>
      </CommandItem>
      <CommandItem disabled>
        <Calculator />
        <span>Calculator</span>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <User />
        <span>Profile</span>
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <CreditCard />
        <span>Billing</span>
        <CommandShortcut>⌘B</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Settings />
        <span>Settings</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    component: React.createElement(
      Command,
      { className: "rounded-lg border shadow-md md:min-w-[450px]" },
      React.createElement(CommandInput, {
        placeholder: "Type a command or search...",
      }),
      React.createElement(
        CommandList,
        {},
        React.createElement(CommandEmpty, {}, "No results found."),
        React.createElement(
          CommandGroup,
          { heading: "Suggestions" },
          React.createElement(
            CommandItem,
            {},
            React.createElement(Calendar, {}),
            React.createElement("span", {}, "Calendar")
          ),
          React.createElement(
            CommandItem,
            {},
            React.createElement(Smile, {}),
            React.createElement("span", {}, "Search Emoji")
          ),
          React.createElement(
            CommandItem,
            { disabled: true },
            React.createElement(Calculator, {}),
            React.createElement("span", {}, "Calculator")
          )
        ),
        React.createElement(CommandSeparator),
        React.createElement(
          CommandGroup,
          { heading: "Settings" },
          React.createElement(
            CommandItem,
            {},
            React.createElement(User, {}),
            React.createElement("span", {}, "Profile"),
            React.createElement(CommandShortcut, {}, "⌘P")
          ),
          React.createElement(
            CommandItem,
            {},
            React.createElement(CreditCard, {}),
            React.createElement("span", {}, "Billing"),
            React.createElement(CommandShortcut, {}, "⌘B")
          ),
          React.createElement(
            CommandItem,
            {},
            React.createElement(Settings, {}),
            React.createElement("span", {}, "Settings"),
            React.createElement(CommandShortcut, {}, "⌘S")
          )
        )
      )
    ),
  },
  examples: [
    {
      name: "Dialog",
      description: "A command menu in a dialog format.",
      code: `"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p className="text-muted-foreground text-sm">
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border-0 shadow-none">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}`,
      preview: React.createElement(() => {
        const [open, setOpen] = React.useState(false);

        React.useEffect(() => {
          const down = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "j" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              setOpen((prev) => !prev);
            }
          };
          document.addEventListener("keydown", down);
          return () => document.removeEventListener("keydown", down);
        }, []);

        return React.createElement(
          "div",
          { className: "flex flex-col items-center space-y-4" },
          React.createElement(
            Button,
            {
              variant: "outline",
              onClick: () => setOpen(true),
            },
            "Open Command Dialog"
          ),
          React.createElement(
            "p",
            { className: "text-sm text-muted-foreground" },
            "Press ",
            React.createElement(
              "kbd",
              {
                className:
                  "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none",
              },
              React.createElement("span", { className: "text-xs" }, "⌘"),
              "J"
            ),
            " to open"
          ),
          React.createElement(
            CommandDialog,
            { open: open, onOpenChange: setOpen },
            React.createElement(
              Command,
              { className: "rounded-lg border-0 shadow-none" },
              React.createElement(CommandInput, {
                placeholder: "Type a command or search...",
              }),
              React.createElement(
                CommandList,
                {},
                React.createElement(CommandEmpty, {}, "No results found."),
                React.createElement(
                  CommandGroup,
                  { heading: "Suggestions" },
                  React.createElement(
                    CommandItem,
                    {},
                    React.createElement(Calendar, {}),
                    React.createElement("span", {}, "Calendar")
                  ),
                  React.createElement(
                    CommandItem,
                    {},
                    React.createElement(Smile, {}),
                    React.createElement("span", {}, "Search Emoji")
                  ),
                  React.createElement(
                    CommandItem,
                    {},
                    React.createElement(Calculator, {}),
                    React.createElement("span", {}, "Calculator")
                  )
                ),
                React.createElement(CommandSeparator),
                React.createElement(
                  CommandGroup,
                  { heading: "Settings" },
                  React.createElement(
                    CommandItem,
                    {},
                    React.createElement(User, {}),
                    React.createElement("span", {}, "Profile"),
                    React.createElement(CommandShortcut, {}, "⌘P")
                  ),
                  React.createElement(
                    CommandItem,
                    {},
                    React.createElement(CreditCard, {}),
                    React.createElement("span", {}, "Billing"),
                    React.createElement(CommandShortcut, {}, "⌘B")
                  ),
                  React.createElement(
                    CommandItem,
                    {},
                    React.createElement(Settings, {}),
                    React.createElement("span", {}, "Settings"),
                    React.createElement(CommandShortcut, {}, "⌘S")
                  )
                )
              )
            )
          )
        );
      }),
    },
    {
      name: "With Shortcuts",
      description: "Commands with keyboard shortcuts displayed.",
      code: `import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut, Settings, Command } from "lucide-react"

<Command>
  <CommandInput placeholder="Search commands..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Navigation">
      <CommandItem>
        Dashboard
        <CommandShortcut>⌘D</CommandShortcut>
      </CommandItem>
      <CommandItem>
        Settings
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Actions">
      <CommandItem>
        Create New
        <CommandShortcut>⌘N</CommandShortcut>
      </CommandItem>
      <CommandItem>
        Search
        <CommandShortcut>⌘K</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
      preview: React.createElement(
        Command,
        { className: "rounded-lg border shadow-md max-w-md" },
        React.createElement(CommandInput, {
          placeholder: "Search commands...",
        }),
        React.createElement(
          CommandList,
          {},
          React.createElement(CommandEmpty, {}, "No results found."),
          React.createElement(
            CommandGroup,
            { heading: "Navigation" },
            React.createElement(
              CommandItem,
              {},
              "Dashboard",
              React.createElement(CommandShortcut, {}, "⌘D")
            ),
            React.createElement(
              CommandItem,
              {},
              "Settings",
              React.createElement(CommandShortcut, {}, "⌘S")
            )
          ),
          React.createElement(CommandSeparator),
          React.createElement(
            CommandGroup,
            { heading: "Actions" },
            React.createElement(
              CommandItem,
              {},
              "Create New",
              React.createElement(CommandShortcut, {}, "⌘N")
            ),
            React.createElement(
              CommandItem,
              {},
              "Search",
              React.createElement(CommandShortcut, {}, "⌘K")
            )
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the command.",
    },
    {
      name: "shouldFilter",
      type: "boolean",
      description:
        "Whether the command should filter items based on the search value.",
      default: "true",
    },
    {
      name: "filter",
      type: "(value: string, search: string) => number",
      description: "Custom filter function for command items.",
    },
    {
      name: "value",
      type: "string",
      description: "The selected command value.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Callback fired when the selected command value changes.",
    },
    {
      name: "loop",
      type: "boolean",
      description: "Whether to loop through items when using arrow keys.",
      default: "false",
    },
  ],
};
