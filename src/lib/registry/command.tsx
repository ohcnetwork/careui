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
  Bell,
  Calculator,
  Calendar,
  ClipboardPaste,
  Code,
  Copy,
  CreditCard,
  FileText,
  Folder,
  FolderPlus,
  HelpCircle,
  Home,
  Image,
  Inbox,
  LayoutGrid,
  List,
  Plus,
  Scissors,
  Settings,
  Smile,
  Trash,
  User,
  ZoomIn,
  ZoomOut,
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
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

export function CommandDemo() {
  return (
    <Command className="max-w-sm rounded-lg border">
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
    code: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

export function CommandDemo() {
  return (
    <Command className="max-w-sm rounded-lg border">
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
    component: React.createElement(
      Command,
      { className: "max-w-sm rounded-lg border" },
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
      name: "Basic",
      description: "A simple command menu in a dialog.",
      code: `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function CommandBasic() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}`,
      preview: React.createElement(() => {
        const [open, setOpen] = React.useState(false);
        return React.createElement(
          "div",
          { className: "flex flex-col gap-4" },
          React.createElement(
            Button,
            { variant: "outline", onClick: () => setOpen(true), className: "w-fit" },
            "Open Menu"
          ),
          React.createElement(
            CommandDialog,
            { open, onOpenChange: setOpen },
            React.createElement(
              Command,
              {},
              React.createElement(CommandInput, { placeholder: "Type a command or search..." }),
              React.createElement(
                CommandList,
                {},
                React.createElement(CommandEmpty, {}, "No results found."),
                React.createElement(
                  CommandGroup,
                  { heading: "Suggestions" },
                  React.createElement(CommandItem, {}, "Calendar"),
                  React.createElement(CommandItem, {}, "Search Emoji"),
                  React.createElement(CommandItem, {}, "Calculator")
                )
              )
            )
          )
        );
      }),
    },
    {
      name: "Shortcuts",
      description: "Commands with keyboard shortcuts displayed.",
      code: `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { CreditCardIcon, SettingsIcon, UserIcon } from "lucide-react"

export function CommandWithShortcuts() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Settings">
              <CommandItem>
                <UserIcon />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCardIcon />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SettingsIcon />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}`,
      preview: React.createElement(() => {
        const [open, setOpen] = React.useState(false);
        return React.createElement(
          "div",
          { className: "flex flex-col gap-4" },
          React.createElement(
            Button,
            { variant: "outline", onClick: () => setOpen(true), className: "w-fit" },
            "Open Menu"
          ),
          React.createElement(
            CommandDialog,
            { open, onOpenChange: setOpen },
            React.createElement(
              Command,
              {},
              React.createElement(CommandInput, { placeholder: "Type a command or search..." }),
              React.createElement(
                CommandList,
                {},
                React.createElement(CommandEmpty, {}, "No results found."),
                React.createElement(
                  CommandGroup,
                  { heading: "Settings" },
                  React.createElement(CommandItem, {}, React.createElement(User, {}), React.createElement("span", {}, "Profile"), React.createElement(CommandShortcut, {}, "⌘P")),
                  React.createElement(CommandItem, {}, React.createElement(CreditCard, {}), React.createElement("span", {}, "Billing"), React.createElement(CommandShortcut, {}, "⌘B")),
                  React.createElement(CommandItem, {}, React.createElement(Settings, {}), React.createElement("span", {}, "Settings"), React.createElement(CommandShortcut, {}, "⌘S"))
                )
              )
            )
          )
        );
      }),
    },
    {
      name: "Groups",
      description: "A command menu with groups, icons and separators.",
      code: `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
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
import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from "lucide-react"

export function CommandWithGroups() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <CalendarIcon />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <SmileIcon />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <CalculatorIcon />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <UserIcon />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCardIcon />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SettingsIcon />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}`,
      preview: React.createElement(() => {
        const [open, setOpen] = React.useState(false);
        return React.createElement(
          "div",
          { className: "flex flex-col gap-4" },
          React.createElement(
            Button,
            { variant: "outline", onClick: () => setOpen(true), className: "w-fit" },
            "Open Menu"
          ),
          React.createElement(
            CommandDialog,
            { open, onOpenChange: setOpen },
            React.createElement(
              Command,
              {},
              React.createElement(CommandInput, { placeholder: "Type a command or search..." }),
              React.createElement(
                CommandList,
                {},
                React.createElement(CommandEmpty, {}, "No results found."),
                React.createElement(
                  CommandGroup,
                  { heading: "Suggestions" },
                  React.createElement(CommandItem, {}, React.createElement(Calendar, {}), React.createElement("span", {}, "Calendar")),
                  React.createElement(CommandItem, {}, React.createElement(Smile, {}), React.createElement("span", {}, "Search Emoji")),
                  React.createElement(CommandItem, {}, React.createElement(Calculator, {}), React.createElement("span", {}, "Calculator"))
                ),
                React.createElement(CommandSeparator),
                React.createElement(
                  CommandGroup,
                  { heading: "Settings" },
                  React.createElement(CommandItem, {}, React.createElement(User, {}), React.createElement("span", {}, "Profile"), React.createElement(CommandShortcut, {}, "⌘P")),
                  React.createElement(CommandItem, {}, React.createElement(CreditCard, {}), React.createElement("span", {}, "Billing"), React.createElement(CommandShortcut, {}, "⌘B")),
                  React.createElement(CommandItem, {}, React.createElement(Settings, {}), React.createElement("span", {}, "Settings"), React.createElement(CommandShortcut, {}, "⌘S"))
                )
              )
            )
          )
        );
      }),
    },
    {
      name: "Scrollable",
      description: "Scrollable command menu with multiple items.",
      code: `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
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
import {
  BellIcon,
  CalculatorIcon,
  CalendarIcon,
  ClipboardPasteIcon,
  CodeIcon,
  CopyIcon,
  CreditCardIcon,
  FileTextIcon,
  FolderIcon,
  FolderPlusIcon,
  HelpCircleIcon,
  HomeIcon,
  ImageIcon,
  InboxIcon,
  LayoutGridIcon,
  ListIcon,
  PlusIcon,
  ScissorsIcon,
  SettingsIcon,
  TrashIcon,
  UserIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react"

export function CommandManyItems() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem><HomeIcon /><span>Home</span><CommandShortcut>⌘H</CommandShortcut></CommandItem>
              <CommandItem><InboxIcon /><span>Inbox</span><CommandShortcut>⌘I</CommandShortcut></CommandItem>
              <CommandItem><FileTextIcon /><span>Documents</span><CommandShortcut>⌘D</CommandShortcut></CommandItem>
              <CommandItem><FolderIcon /><span>Folders</span><CommandShortcut>⌘F</CommandShortcut></CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem><PlusIcon /><span>New File</span><CommandShortcut>⌘N</CommandShortcut></CommandItem>
              <CommandItem><FolderPlusIcon /><span>New Folder</span><CommandShortcut>⇧⌘N</CommandShortcut></CommandItem>
              <CommandItem><CopyIcon /><span>Copy</span><CommandShortcut>⌘C</CommandShortcut></CommandItem>
              <CommandItem><ScissorsIcon /><span>Cut</span><CommandShortcut>⌘X</CommandShortcut></CommandItem>
              <CommandItem><ClipboardPasteIcon /><span>Paste</span><CommandShortcut>⌘V</CommandShortcut></CommandItem>
              <CommandItem><TrashIcon /><span>Delete</span><CommandShortcut>⌫</CommandShortcut></CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="View">
              <CommandItem><LayoutGridIcon /><span>Grid View</span></CommandItem>
              <CommandItem><ListIcon /><span>List View</span></CommandItem>
              <CommandItem><ZoomInIcon /><span>Zoom In</span><CommandShortcut>⌘+</CommandShortcut></CommandItem>
              <CommandItem><ZoomOutIcon /><span>Zoom Out</span><CommandShortcut>⌘-</CommandShortcut></CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Account">
              <CommandItem><UserIcon /><span>Profile</span><CommandShortcut>⌘P</CommandShortcut></CommandItem>
              <CommandItem><CreditCardIcon /><span>Billing</span><CommandShortcut>⌘B</CommandShortcut></CommandItem>
              <CommandItem><SettingsIcon /><span>Settings</span><CommandShortcut>⌘S</CommandShortcut></CommandItem>
              <CommandItem><BellIcon /><span>Notifications</span></CommandItem>
              <CommandItem><HelpCircleIcon /><span>Help & Support</span></CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Tools">
              <CommandItem><CalculatorIcon /><span>Calculator</span></CommandItem>
              <CommandItem><CalendarIcon /><span>Calendar</span></CommandItem>
              <CommandItem><ImageIcon /><span>Image Editor</span></CommandItem>
              <CommandItem><CodeIcon /><span>Code Editor</span></CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}`,
      preview: React.createElement(() => {
        const [open, setOpen] = React.useState(false);
        return React.createElement(
          "div",
          { className: "flex flex-col gap-4" },
          React.createElement(
            Button,
            { variant: "outline", onClick: () => setOpen(true), className: "w-fit" },
            "Open Menu"
          ),
          React.createElement(
            CommandDialog,
            { open, onOpenChange: setOpen },
            React.createElement(
              Command,
              {},
              React.createElement(CommandInput, { placeholder: "Type a command or search..." }),
              React.createElement(
                CommandList,
                {},
                React.createElement(CommandEmpty, {}, "No results found."),
                React.createElement(
                  CommandGroup,
                  { heading: "Navigation" },
                  React.createElement(CommandItem, {}, React.createElement(Home, {}), React.createElement("span", {}, "Home"), React.createElement(CommandShortcut, {}, "⌘H")),
                  React.createElement(CommandItem, {}, React.createElement(Inbox, {}), React.createElement("span", {}, "Inbox"), React.createElement(CommandShortcut, {}, "⌘I")),
                  React.createElement(CommandItem, {}, React.createElement(FileText, {}), React.createElement("span", {}, "Documents"), React.createElement(CommandShortcut, {}, "⌘D")),
                  React.createElement(CommandItem, {}, React.createElement(Folder, {}), React.createElement("span", {}, "Folders"), React.createElement(CommandShortcut, {}, "⌘F"))
                ),
                React.createElement(CommandSeparator),
                React.createElement(
                  CommandGroup,
                  { heading: "Actions" },
                  React.createElement(CommandItem, {}, React.createElement(Plus, {}), React.createElement("span", {}, "New File"), React.createElement(CommandShortcut, {}, "⌘N")),
                  React.createElement(CommandItem, {}, React.createElement(FolderPlus, {}), React.createElement("span", {}, "New Folder"), React.createElement(CommandShortcut, {}, "⇧⌘N")),
                  React.createElement(CommandItem, {}, React.createElement(Copy, {}), React.createElement("span", {}, "Copy"), React.createElement(CommandShortcut, {}, "⌘C")),
                  React.createElement(CommandItem, {}, React.createElement(Scissors, {}), React.createElement("span", {}, "Cut"), React.createElement(CommandShortcut, {}, "⌘X")),
                  React.createElement(CommandItem, {}, React.createElement(ClipboardPaste, {}), React.createElement("span", {}, "Paste"), React.createElement(CommandShortcut, {}, "⌘V")),
                  React.createElement(CommandItem, {}, React.createElement(Trash, {}), React.createElement("span", {}, "Delete"), React.createElement(CommandShortcut, {}, "⌫"))
                ),
                React.createElement(CommandSeparator),
                React.createElement(
                  CommandGroup,
                  { heading: "View" },
                  React.createElement(CommandItem, {}, React.createElement(LayoutGrid, {}), React.createElement("span", {}, "Grid View")),
                  React.createElement(CommandItem, {}, React.createElement(List, {}), React.createElement("span", {}, "List View")),
                  React.createElement(CommandItem, {}, React.createElement(ZoomIn, {}), React.createElement("span", {}, "Zoom In"), React.createElement(CommandShortcut, {}, "⌘+")),
                  React.createElement(CommandItem, {}, React.createElement(ZoomOut, {}), React.createElement("span", {}, "Zoom Out"), React.createElement(CommandShortcut, {}, "⌘-"))
                ),
                React.createElement(CommandSeparator),
                React.createElement(
                  CommandGroup,
                  { heading: "Account" },
                  React.createElement(CommandItem, {}, React.createElement(User, {}), React.createElement("span", {}, "Profile"), React.createElement(CommandShortcut, {}, "⌘P")),
                  React.createElement(CommandItem, {}, React.createElement(CreditCard, {}), React.createElement("span", {}, "Billing"), React.createElement(CommandShortcut, {}, "⌘B")),
                  React.createElement(CommandItem, {}, React.createElement(Settings, {}), React.createElement("span", {}, "Settings"), React.createElement(CommandShortcut, {}, "⌘S")),
                  React.createElement(CommandItem, {}, React.createElement(Bell, {}), React.createElement("span", {}, "Notifications")),
                  React.createElement(CommandItem, {}, React.createElement(HelpCircle, {}), React.createElement("span", {}, "Help & Support"))
                ),
                React.createElement(CommandSeparator),
                React.createElement(
                  CommandGroup,
                  { heading: "Tools" },
                  React.createElement(CommandItem, {}, React.createElement(Calculator, {}), React.createElement("span", {}, "Calculator")),
                  React.createElement(CommandItem, {}, React.createElement(Calendar, {}), React.createElement("span", {}, "Calendar")),
                  React.createElement(CommandItem, {}, React.createElement(Image, {}), React.createElement("span", {}, "Image Editor")),
                  React.createElement(CommandItem, {}, React.createElement(Code, {}), React.createElement("span", {}, "Code Editor"))
                )
              )
            )
          )
        );
      }),
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
