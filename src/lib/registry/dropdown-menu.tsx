import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const dropdownMenuDoc: ComponentDoc = {
  id: "dropdown-menu",
  name: "Dropdown Menu",
  description:
    "A dropdown menu displays a list of options that can be selected.",
  installation: {
    cli: "npx shadcn@latest add dropdown-menu",
    manual:
      "Install @radix-ui/react-dropdown-menu dependency and copy the dropdown menu component source code into your project.",
  },
  usage: `"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  preview: {
    code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    component: React.createElement(
      DropdownMenu,
      {},
      React.createElement(
        DropdownMenuTrigger,
        { asChild: true },
        React.createElement(Button, { variant: "outline" }, "Open Menu")
      ),
      React.createElement(
        DropdownMenuContent,
        {},
        React.createElement(DropdownMenuItem, {}, "Profile"),
        React.createElement(DropdownMenuItem, {}, "Settings"),
        React.createElement(DropdownMenuItem, {}, "Logout")
      )
    ),
  },
  examples: [
    {
      name: "With Groups and Labels",
      description: "A dropdown menu organized with groups and labels.",
      code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      preview: React.createElement(
        DropdownMenu,
        {},
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Account")
        ),
        React.createElement(
          DropdownMenuContent,
          {},
          React.createElement(DropdownMenuLabel, {}, "My Account"),
          React.createElement(DropdownMenuSeparator, {}),
          React.createElement(
            DropdownMenuGroup,
            {},
            React.createElement(DropdownMenuItem, {}, "Profile"),
            React.createElement(DropdownMenuItem, {}, "Billing"),
            React.createElement(DropdownMenuItem, {}, "Settings")
          ),
          React.createElement(DropdownMenuSeparator, {}),
          React.createElement(
            DropdownMenuGroup,
            {},
            React.createElement(DropdownMenuItem, {}, "Team"),
            React.createElement(DropdownMenuItem, {}, "Subscription")
          ),
          React.createElement(DropdownMenuSeparator, {}),
          React.createElement(DropdownMenuItem, {}, "Log out")
        )
      ),
    },
    {
      name: "With Checkboxes",
      description: "A dropdown menu with selectable checkbox items.",
      code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">View Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>View</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked>
      Status Bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>
      Activity Bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>
      Panel
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      preview: React.createElement(
        DropdownMenu,
        {},
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "View Options")
        ),
        React.createElement(
          DropdownMenuContent,
          {},
          React.createElement(DropdownMenuLabel, {}, "View"),
          React.createElement(DropdownMenuSeparator, {}),
          React.createElement(
            DropdownMenuCheckboxItem,
            { checked: true },
            "Status Bar"
          ),
          React.createElement(DropdownMenuCheckboxItem, {}, "Activity Bar"),
          React.createElement(
            DropdownMenuCheckboxItem,
            { checked: true },
            "Panel"
          )
        )
      ),
    },
    {
      name: "With Radio Items",
      description:
        "A dropdown menu with radio button items for single selection.",
      code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Theme</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Theme</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value="light">
      <DropdownMenuRadioItem value="light">
        Light
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">
        Dark
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">
        System
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`,
      preview: React.createElement(
        DropdownMenu,
        {},
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Theme")
        ),
        React.createElement(
          DropdownMenuContent,
          {},
          React.createElement(DropdownMenuLabel, {}, "Theme"),
          React.createElement(DropdownMenuSeparator, {}),
          React.createElement(
            DropdownMenuRadioGroup,
            { value: "light" },
            React.createElement(
              DropdownMenuRadioItem,
              { value: "light" },
              "Light"
            ),
            React.createElement(
              DropdownMenuRadioItem,
              { value: "dark" },
              "Dark"
            ),
            React.createElement(
              DropdownMenuRadioItem,
              { value: "system" },
              "System"
            )
          )
        )
      ),
    },
    {
      name: "With Destructive Action",
      description: "A dropdown menu with a destructive action item.",
      code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      preview: React.createElement(
        DropdownMenu,
        {},
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Actions")
        ),
        React.createElement(
          DropdownMenuContent,
          {},
          React.createElement(DropdownMenuItem, {}, "Edit"),
          React.createElement(DropdownMenuItem, {}, "Duplicate"),
          React.createElement(DropdownMenuSeparator, {}),
          React.createElement(
            DropdownMenuItem,
            { className: "text-destructive" },
            "Delete"
          )
        )
      ),
    },
    {
      name: "With Submenu",
      description: "A dropdown menu with nested submenu items.",
      code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">More Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>New Tab</DropdownMenuItem>
    <DropdownMenuItem>New Window</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Email</DropdownMenuItem>
        <DropdownMenuItem>Copy Link</DropdownMenuItem>
        <DropdownMenuItem>Social Media</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Print</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      preview: React.createElement(
        DropdownMenu,
        {},
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "More Options")
        ),
        React.createElement(
          DropdownMenuContent,
          {},
          React.createElement(DropdownMenuItem, {}, "New Tab"),
          React.createElement(DropdownMenuItem, {}, "New Window"),
          React.createElement(
            DropdownMenuSub,
            {},
            React.createElement(DropdownMenuSubTrigger, {}, "Share"),
            React.createElement(
              DropdownMenuSubContent,
              {},
              React.createElement(DropdownMenuItem, {}, "Email"),
              React.createElement(DropdownMenuItem, {}, "Copy Link"),
              React.createElement(DropdownMenuItem, {}, "Social Media")
            )
          ),
          React.createElement(DropdownMenuSeparator, {}),
          React.createElement(DropdownMenuItem, {}, "Print")
        )
      ),
    },
  ],
  props: [
    {
      name: "open",
      type: "boolean",
      description: "The controlled open state of the dropdown menu.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description:
        "Event handler called when the open state of the dropdown menu changes.",
    },
    {
      name: "modal",
      type: "boolean",
      description: "The modality of the dropdown menu.",
      default: "true",
    },
    {
      name: "inset",
      type: "boolean",
      description: "Add inset padding to the menu item.",
      default: "false",
    },
  ],
};
