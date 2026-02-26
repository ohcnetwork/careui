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
  DropdownMenuPortal,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChevronDown,
  CreditCardIcon,
  EllipsisVertical,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";

export const dropdownMenuDoc: ComponentDoc = {
  id: "dropdown-menu",
  name: "Dropdown Menu",
  description:
    "Displays a menu to the user — such as a set of actions or functions — triggered by a button.",
  installation: {
    cli: "npx shadcn@latest add dropdown-menu",
    manual:
      "Install radix-ui and copy the dropdown menu component source code into your project.",
  },
  usage: `import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  preview: {
    code: `import { ChevronDown } from "lucide-react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm">
      Open Menu
      <ChevronDown className="size-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-44" align="start">
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Billing
        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    component: React.createElement(
      DropdownMenu,
      {},
      React.createElement(
        DropdownMenuTrigger,
        { asChild: true },
        React.createElement(
          Button,
          { variant: "outline", size: "default" },
          "Open Menu",
          React.createElement(ChevronDown, { className: "size-4" })
        )
      ),
      React.createElement(
        DropdownMenuContent,
        { className: "w-44", align: "start" },
        React.createElement(
          DropdownMenuGroup,
          {},
          React.createElement(DropdownMenuLabel, {}, "My Account"),
          React.createElement(
            DropdownMenuItem,
            {},
            "Profile",
            React.createElement(DropdownMenuShortcut, {}, "⇧⌘P")
          ),
          React.createElement(
            DropdownMenuItem,
            {},
            "Billing",
            React.createElement(DropdownMenuShortcut, {}, "⌘B")
          ),
          React.createElement(DropdownMenuItem, {}, "Settings")
        ),
        React.createElement(DropdownMenuSeparator, {}),
        React.createElement(
          DropdownMenuItem,
          { variant: "destructive" },
          "Log out"
        )
      )
    ),
  },
  examples: [
    {
      name: "Basic",
      description: "A basic dropdown menu with groups, labels, and separators.",
      code: `import { ChevronDown } from "lucide-react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      Open
      <ChevronDown className="size-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>GitHub</DropdownMenuItem>
    <DropdownMenuItem>Support</DropdownMenuItem>
    <DropdownMenuItem disabled>API</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      preview: React.createElement(
        DropdownMenu,
        {},
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "outline" },
            "Open",
            React.createElement(ChevronDown, { className: "size-4" })
          )
        ),
        React.createElement(
          DropdownMenuContent,
          {},
          React.createElement(
            DropdownMenuGroup,
            {},
            React.createElement(DropdownMenuLabel, {}, "My Account"),
            React.createElement(DropdownMenuItem, {}, "Profile"),
            React.createElement(DropdownMenuItem, {}, "Billing"),
            React.createElement(DropdownMenuItem, {}, "Settings")
          ),
          React.createElement(DropdownMenuSeparator, {}),
          React.createElement(DropdownMenuItem, {}, "GitHub"),
          React.createElement(DropdownMenuItem, {}, "Support"),
          React.createElement(DropdownMenuItem, { disabled: true }, "API")
        )
      ),
    },
    {
      name: "With Submenu",
      description: "A dropdown menu with nested submenu actions.",
      code: `import { ChevronDown } from "lucide-react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      Open
      <ChevronDown className="size-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Email</DropdownMenuItem>
          <DropdownMenuItem>Message</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>More...</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>`,
      preview: React.createElement(
        DropdownMenu,
        {},
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "outline" },
            "Open",
            React.createElement(ChevronDown, { className: "size-4" })
          )
        ),
        React.createElement(
          DropdownMenuContent,
          {},
          React.createElement(DropdownMenuItem, {}, "Team"),
          React.createElement(
            DropdownMenuSub,
            {},
            React.createElement(DropdownMenuSubTrigger, {}, "Invite users"),
            React.createElement(
              DropdownMenuPortal,
              {},
              React.createElement(
                DropdownMenuSubContent,
                {},
                React.createElement(DropdownMenuItem, {}, "Email"),
                React.createElement(DropdownMenuItem, {}, "Message"),
                React.createElement(DropdownMenuSeparator, {}),
                React.createElement(DropdownMenuItem, {}, "More...")
              )
            )
          )
        )
      ),
    },
    {
      name: "With Checkboxes",
      description: "Selectable checkbox items for visibility toggles.",
      code: `"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

export function DropdownMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          View
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={(checked) => setShowStatusBar(checked === true)}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={(checked) => setShowActivityBar(checked === true)}
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
      preview: React.createElement(
        function DropdownMenuCheckboxesPreview() {
          const [showStatusBar, setShowStatusBar] = React.useState(true);
          const [showActivityBar, setShowActivityBar] = React.useState(false);

          return React.createElement(
            DropdownMenu,
            {},
            React.createElement(
              DropdownMenuTrigger,
              { asChild: true },
              React.createElement(
                Button,
                { variant: "outline" },
                "View",
                React.createElement(ChevronDown, { className: "size-4" })
              )
            ),
            React.createElement(
              DropdownMenuContent,
              {},
              React.createElement(DropdownMenuLabel, {}, "Appearance"),
              React.createElement(DropdownMenuSeparator, {}),
              React.createElement(
                DropdownMenuCheckboxItem,
                {
                  checked: showStatusBar,
                  onCheckedChange: (checked) =>
                    setShowStatusBar(checked === true),
                  onSelect: (event) => event.preventDefault(),
                },
                "Status Bar"
              ),
              React.createElement(
                DropdownMenuCheckboxItem,
                {
                  checked: showActivityBar,
                  onCheckedChange: (checked) =>
                    setShowActivityBar(checked === true),
                  onSelect: (event) => event.preventDefault(),
                },
                "Activity Bar"
              )
            )
          );
        }
      ),
    },
    {
      name: "With Checkboxes Component",
      description:
        "Use actual Checkbox components as dropdown items with matching checkbox label styling.",
      code: `"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
    import { Checkbox } from "@/components/ui/checkbox"

export function DropdownMenuCheckboxComponent() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          View
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          role="menuitemcheckbox"
          aria-checked={showStatusBar}
          onSelect={(event) => {
            event.preventDefault()
            setShowStatusBar((prev) => !prev)
          }}
        >
          <Checkbox
            checked={showStatusBar}
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none bg-background data-checked:bg-primary data-checked:text-primary-foreground! group-focus-visible/dropdown-menu-item:ring-ring/50 group-focus-visible/dropdown-menu-item:ring-[3px]"
          />
          <span>Status Bar</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          role="menuitemcheckbox"
          aria-checked={showActivityBar}
          onSelect={(event) => {
            event.preventDefault()
            setShowActivityBar((prev) => !prev)
          }}
        >
          <Checkbox
            checked={showActivityBar}
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none bg-background data-checked:bg-primary data-checked:text-primary-foreground! group-focus-visible/dropdown-menu-item:ring-ring/50 group-focus-visible/dropdown-menu-item:ring-[3px]"
          />
          <span>Activity Bar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
      preview: React.createElement(
        function DropdownMenuCheckboxComponentPreview() {
          const [showStatusBar, setShowStatusBar] = React.useState(true);
          const [showActivityBar, setShowActivityBar] = React.useState(false);

          return React.createElement(
            DropdownMenu,
            {},
            React.createElement(
              DropdownMenuTrigger,
              { asChild: true },
              React.createElement(
                Button,
                { variant: "outline" },
                "View",
                React.createElement(ChevronDown, { className: "size-4" })
              )
            ),
            React.createElement(
              DropdownMenuContent,
              {},
              React.createElement(DropdownMenuLabel, {}, "Appearance"),
              React.createElement(DropdownMenuSeparator, {}),
              React.createElement(
                DropdownMenuItem,
                {
                  role: "menuitemcheckbox",
                  "aria-checked": showStatusBar,
                  onSelect: (event) => {
                    event.preventDefault();
                    setShowStatusBar((prev) => !prev);
                  },
                },
                React.createElement(Checkbox, {
                  checked: showStatusBar,
                  tabIndex: -1,
                  "aria-hidden": true,
                  className:
                    "pointer-events-none bg-background data-checked:bg-primary data-checked:text-primary-foreground! group-focus-visible/dropdown-menu-item:ring-ring/50 group-focus-visible/dropdown-menu-item:ring-[3px]",
                }),
                React.createElement("span", {}, "Status Bar")
              ),
              React.createElement(
                DropdownMenuItem,
                {
                  role: "menuitemcheckbox",
                  "aria-checked": showActivityBar,
                  onSelect: (event) => {
                    event.preventDefault();
                    setShowActivityBar((prev) => !prev);
                  },
                },
                React.createElement(Checkbox, {
                  checked: showActivityBar,
                  tabIndex: -1,
                  "aria-hidden": true,
                  className:
                    "pointer-events-none bg-background data-checked:bg-primary data-checked:text-primary-foreground! group-focus-visible/dropdown-menu-item:ring-ring/50 group-focus-visible/dropdown-menu-item:ring-[3px]",
                }),
                React.createElement("span", {}, "Activity Bar")
              )
            )
          );
        }
      ),
    },
    {
      name: "With RadioGroup Component",
      description:
        "Use RadioGroup and RadioGroupItem as actual dropdown item controls.",
      code: `"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function DropdownMenuRadioGroupComponent() {
  const [position, setPosition] = React.useState("top")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Position
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <RadioGroup value={position} className="gap-0 w-full">
          <DropdownMenuItem
            role="menuitemradio"
            aria-checked={position === "top"}
            onSelect={(event) => {
              event.preventDefault()
              setPosition("top")
            }}
          >
            <RadioGroupItem
              value="top"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none group-focus-visible/dropdown-menu-item:ring-ring/50 group-focus-visible/dropdown-menu-item:ring-[3px]"
            />
            <span>Top</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            role="menuitemradio"
            aria-checked={position === "bottom"}
            onSelect={(event) => {
              event.preventDefault()
              setPosition("bottom")
            }}
          >
            <RadioGroupItem
              value="bottom"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none group-focus-visible/dropdown-menu-item:ring-ring/50 group-focus-visible/dropdown-menu-item:ring-[3px]"
            />
            <span>Bottom</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            role="menuitemradio"
            aria-checked={position === "right"}
            onSelect={(event) => {
              event.preventDefault()
              setPosition("right")
            }}
          >
            <RadioGroupItem
              value="right"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none group-focus-visible/dropdown-menu-item:ring-ring/50 group-focus-visible/dropdown-menu-item:ring-[3px]"
            />
            <span>Right</span>
          </DropdownMenuItem>
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
      preview: React.createElement(
        function DropdownMenuRadioGroupComponentPreview() {
          const [position, setPosition] = React.useState("top");

          return React.createElement(
            DropdownMenu,
            {},
            React.createElement(
              DropdownMenuTrigger,
              { asChild: true },
              React.createElement(
                Button,
                { variant: "outline" },
                "Position",
                React.createElement(ChevronDown, { className: "size-4" })
              )
            ),
            React.createElement(
              DropdownMenuContent,
              {},
              React.createElement(DropdownMenuLabel, {}, "Panel Position"),
              React.createElement(DropdownMenuSeparator, {}),
              React.createElement(
                RadioGroup,
                { value: position, className: "gap-0 w-full" },
                React.createElement(
                  DropdownMenuItem,
                  {
                    role: "menuitemradio",
                    "aria-checked": position === "top",
                    onSelect: (event) => {
                      event.preventDefault();
                      setPosition("top");
                    },
                  },
                  React.createElement(RadioGroupItem, {
                    value: "top",
                    tabIndex: -1,
                    "aria-hidden": true,
                    className:
                      "pointer-events-none group-focus-visible/dropdown-menu-item:ring-ring/50 group-focus-visible/dropdown-menu-item:ring-[3px]",
                  }),
                  React.createElement("span", {}, "Top")
                ),
                React.createElement(
                  DropdownMenuItem,
                  {
                    role: "menuitemradio",
                    "aria-checked": position === "bottom",
                    onSelect: (event) => {
                      event.preventDefault();
                      setPosition("bottom");
                    },
                  },
                  React.createElement(RadioGroupItem, {
                    value: "bottom",
                    tabIndex: -1,
                    "aria-hidden": true,
                    className:
                      "pointer-events-none group-focus-visible/dropdown-menu-item:ring-ring/50 group-focus-visible/dropdown-menu-item:ring-[3px]",
                  }),
                  React.createElement("span", {}, "Bottom")
                ),
                React.createElement(
                  DropdownMenuItem,
                  {
                    role: "menuitemradio",
                    "aria-checked": position === "right",
                    onSelect: (event) => {
                      event.preventDefault();
                      setPosition("right");
                    },
                  },
                  React.createElement(RadioGroupItem, {
                    value: "right",
                    tabIndex: -1,
                    "aria-hidden": true,
                    className:
                      "pointer-events-none group-focus-visible/dropdown-menu-item:ring-ring/50 group-focus-visible/dropdown-menu-item:ring-[3px]",
                  }),
                  React.createElement("span", {}, "Right")
                )
              )
            )
          );
        }
      ),
    },
    {
      name: "With Radio Items",
      description: "Radio items for a single selected value.",
      code: `"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

export function DropdownMenuTheme() {
  const [theme, setTheme] = React.useState("light")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Theme
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
      preview: React.createElement(
        function DropdownMenuRadioPreview() {
          const [theme, setTheme] = React.useState("light");

          return React.createElement(
            DropdownMenu,
            {},
            React.createElement(
              DropdownMenuTrigger,
              { asChild: true },
              React.createElement(
                Button,
                { variant: "outline" },
                "Theme",
                React.createElement(ChevronDown, { className: "size-4" })
              )
            ),
            React.createElement(
              DropdownMenuContent,
              {},
              React.createElement(DropdownMenuLabel, {}, "Theme"),
              React.createElement(DropdownMenuSeparator, {}),
              React.createElement(
                DropdownMenuRadioGroup,
                { value: theme, onValueChange: setTheme },
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
          );
        }
      ),
    },
    {
      name: "Destructive Action",
      description: "Use the destructive variant for irreversible actions.",
      code: `import { ChevronDown } from "lucide-react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      Actions
      <ChevronDown className="size-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      preview: React.createElement(
        DropdownMenu,
        {},
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "outline" },
            "Actions",
            React.createElement(ChevronDown, { className: "size-4" })
          )
        ),
        React.createElement(
          DropdownMenuContent,
          {},
          React.createElement(DropdownMenuItem, {}, "Edit"),
          React.createElement(DropdownMenuItem, {}, "Duplicate"),
          React.createElement(DropdownMenuSeparator, {}),
          React.createElement(DropdownMenuItem, { variant: "destructive" }, "Delete")
        )
      ),
    },
    {
      name: "Icon-only Trigger",
      description:
        "Use an icon-only trigger with a vertical three-dots menu button.",
      code: `import { EllipsisVertical } from "lucide-react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="icon" aria-label="Open menu">
      <EllipsisVertical className="size-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      preview: React.createElement(
        DropdownMenu,
        {},
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "outline", size: "icon", "aria-label": "Open menu" },
            React.createElement(EllipsisVertical, { className: "size-4" })
          )
        ),
        React.createElement(
          DropdownMenuContent,
          { align: "end" },
          React.createElement(DropdownMenuItem, {}, "Profile"),
          React.createElement(DropdownMenuItem, {}, "Settings"),
          React.createElement(
            DropdownMenuItem,
            { variant: "destructive" },
            "Log out"
          )
        )
      ),
    },
    {
      name: "Complex Menu",
      description:
        "A richer dropdown combining icons, shortcuts, submenu, checkbox items, radio group, and destructive action.",
      code: `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  CreditCardIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "lucide-react"

export function DropdownMenuComplex() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [theme, setTheme] = React.useState("light")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Complex Menu
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SettingsIcon />
              Settings
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>General</DropdownMenuItem>
                <DropdownMenuItem>Security</DropdownMenuItem>
                <DropdownMenuItem>Integrations</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={(checked) => setShowStatusBar(checked === true)}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={(checked) => setShowActivityBar(checked === true)}
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="light">
              <SunIcon />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <MoonIcon />
              Dark
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
      preview: React.createElement(
        function DropdownMenuComplexPreview() {
          const [showStatusBar, setShowStatusBar] = React.useState(true);
          const [showActivityBar, setShowActivityBar] = React.useState(false);
          const [theme, setTheme] = React.useState("light");

          return React.createElement(
            DropdownMenu,
            {},
            React.createElement(
              DropdownMenuTrigger,
              { asChild: true },
              React.createElement(
                Button,
                { variant: "outline" },
                "Complex Menu",
                React.createElement(ChevronDown, { className: "size-4" })
              )
            ),
            React.createElement(
              DropdownMenuContent,
              { className: "w-52", align: "start" },
              React.createElement(
                DropdownMenuGroup,
                {},
                React.createElement(DropdownMenuLabel, {}, "My Account"),
                React.createElement(
                  DropdownMenuItem,
                  {},
                  React.createElement(UserIcon, {}),
                  "Profile",
                  React.createElement(DropdownMenuShortcut, {}, "⇧⌘P")
                ),
                React.createElement(
                  DropdownMenuItem,
                  {},
                  React.createElement(CreditCardIcon, {}),
                  "Billing",
                  React.createElement(DropdownMenuShortcut, {}, "⌘B")
                ),
                React.createElement(
                  DropdownMenuSub,
                  {},
                  React.createElement(
                    DropdownMenuSubTrigger,
                    {},
                    React.createElement(SettingsIcon, {}),
                    "Settings"
                  ),
                  React.createElement(
                    DropdownMenuPortal,
                    {},
                    React.createElement(
                      DropdownMenuSubContent,
                      {},
                      React.createElement(DropdownMenuItem, {}, "General"),
                      React.createElement(DropdownMenuItem, {}, "Security"),
                      React.createElement(DropdownMenuItem, {}, "Integrations")
                    )
                  )
                )
              ),
              React.createElement(DropdownMenuSeparator, {}),
              React.createElement(
                DropdownMenuGroup,
                {},
                React.createElement(DropdownMenuLabel, {}, "View"),
                React.createElement(
                  DropdownMenuCheckboxItem,
                  {
                    checked: showStatusBar,
                    onCheckedChange: (checked) =>
                      setShowStatusBar(checked === true),
                    onSelect: (event) => event.preventDefault(),
                  },
                  "Status Bar"
                ),
                React.createElement(
                  DropdownMenuCheckboxItem,
                  {
                    checked: showActivityBar,
                    onCheckedChange: (checked) =>
                      setShowActivityBar(checked === true),
                    onSelect: (event) => event.preventDefault(),
                  },
                  "Activity Bar"
                )
              ),
              React.createElement(DropdownMenuSeparator, {}),
              React.createElement(
                DropdownMenuGroup,
                {},
                React.createElement(DropdownMenuLabel, {}, "Theme"),
                React.createElement(
                  DropdownMenuRadioGroup,
                  { value: theme, onValueChange: setTheme },
                  React.createElement(
                    DropdownMenuRadioItem,
                    { value: "light" },
                    React.createElement(SunIcon, {}),
                    "Light"
                  ),
                  React.createElement(
                    DropdownMenuRadioItem,
                    { value: "dark" },
                    React.createElement(MoonIcon, {}),
                    "Dark"
                  )
                )
              ),
              React.createElement(DropdownMenuSeparator, {}),
              React.createElement(
                DropdownMenuItem,
                { variant: "destructive" },
                React.createElement(LogOutIcon, {}),
                "Log out",
                React.createElement(DropdownMenuShortcut, {}, "⇧⌘Q")
              )
            )
          );
        }
      ),
    },
    {
      name: "Icon Items",
      description: "Combine icons with labels for faster scanning.",
      code: `import { ChevronDown, CreditCardIcon, SettingsIcon, UserIcon } from "lucide-react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      Open
      <ChevronDown className="size-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <UserIcon />
      Profile
    </DropdownMenuItem>
    <DropdownMenuItem>
      <CreditCardIcon />
      Billing
    </DropdownMenuItem>
    <DropdownMenuItem>
      <SettingsIcon />
      Settings
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      preview: React.createElement(
        DropdownMenu,
        {},
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "outline" },
            "Open",
            React.createElement(ChevronDown, { className: "size-4" })
          )
        ),
        React.createElement(
          DropdownMenuContent,
          {},
          React.createElement(
            DropdownMenuItem,
            {},
            React.createElement(UserIcon, {}),
            "Profile"
          ),
          React.createElement(
            DropdownMenuItem,
            {},
            React.createElement(CreditCardIcon, {}),
            "Billing"
          ),
          React.createElement(
            DropdownMenuItem,
            {},
            React.createElement(SettingsIcon, {}),
            "Settings"
          )
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
      description: "Add inset padding to menu item and sub trigger.",
      default: "false",
    },
    {
      name: "variant",
      type: '"default" | "destructive"',
      description: "Visual style for DropdownMenuItem.",
      default: '"default"',
    },
  ],
};
