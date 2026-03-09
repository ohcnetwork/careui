import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Kbd } from "@/components/ui/kbd";
import {
  CheckIcon,
  ChevronDownIcon,
  CreditCardIcon,
  EyeOffIcon,
  MailIcon,
  MoreHorizontal,
  Search,
  SearchIcon,
  StarIcon,
} from "lucide-react";

export const inputGroupDoc: ComponentDoc = {
  id: "input-group",
  name: "Input Group",
  description: "Add addons, buttons, and helper content to inputs.",
  installation: {
    cli: "npx shadcn@latest add input-group",
    manual:
      "Copy and paste the input group component source code into your project.",
  },
  usage: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"`,
  preview: {
    code: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"

export function InputGroupDemo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
}`,
    component: React.createElement(
      InputGroup,
      { className: "max-w-xs" },
      React.createElement(InputGroupInput, { placeholder: "Search..." }),
      React.createElement(InputGroupAddon, {}, React.createElement(Search)),
      React.createElement(InputGroupAddon, { align: "inline-end" }, "12 results")
    ),
  },
  examples: [
    {
      name: "Icon",
      description: "Use icons as addons at the start or end of the input.",
      code: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  CheckIcon,
  CreditCardIcon,
  MailIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react"

export function InputGroupIcon() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput type="email" placeholder="Enter your email" />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <CreditCardIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <CheckIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter password" type="password" />
        <InputGroupAddon align="inline-end">
          <StarIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "grid w-full max-w-sm gap-4" },
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "Search..." }),
          React.createElement(InputGroupAddon, {}, React.createElement(SearchIcon))
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { type: "email", placeholder: "Enter your email" }),
          React.createElement(InputGroupAddon, {}, React.createElement(MailIcon))
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "Card number" }),
          React.createElement(InputGroupAddon, {}, React.createElement(CreditCardIcon)),
          React.createElement(InputGroupAddon, { align: "inline-end" }, React.createElement(CheckIcon))
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "Enter password", type: "password" }),
          React.createElement(InputGroupAddon, { align: "inline-end" }, React.createElement(EyeOffIcon))
        )
      ),
    },
    {
      name: "Text",
      description: "Use text addons for prefixes and suffixes like currency symbols or domains.",
      code: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

export function InputGroupTextExample() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" className="pl-0.5!" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter your username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@company.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "grid w-full max-w-sm gap-4" },
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupAddon, {}, React.createElement(InputGroupText, {}, "$")),
          React.createElement(InputGroupInput, { placeholder: "0.00" }),
          React.createElement(InputGroupAddon, { align: "inline-end" }, React.createElement(InputGroupText, {}, "USD"))
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupAddon, {}, React.createElement(InputGroupText, {}, "https://")),
          React.createElement(InputGroupInput, { placeholder: "example.com", className: "pl-0.5!" }),
          React.createElement(InputGroupAddon, { align: "inline-end" }, React.createElement(InputGroupText, {}, ".com"))
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "Enter your username" }),
          React.createElement(InputGroupAddon, { align: "inline-end" }, React.createElement(InputGroupText, {}, "@company.com"))
        )
      ),
    },
    {
      name: "Kbd",
      description: "Show keyboard shortcut hints inside the input.",
      code: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { SearchIcon } from "lucide-react"

export function InputGroupKbd() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}`,
      preview: React.createElement(
        InputGroup,
        { className: "max-w-sm" },
        React.createElement(InputGroupInput, { placeholder: "Search..." }),
        React.createElement(InputGroupAddon, {}, React.createElement(SearchIcon, { className: "text-muted-foreground" })),
        React.createElement(InputGroupAddon, { align: "inline-end" }, React.createElement(Kbd, {}, "⌘K"))
      ),
    },
    {
      name: "Button",
      description: "Add action buttons inside the input group.",
      code: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export function InputGroupButton() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="https://example.com" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Copy">
            <StarIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "grid w-full max-w-sm gap-4" },
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "Type to search..." }),
          React.createElement(
            InputGroupAddon,
            { align: "inline-end" },
            React.createElement(InputGroupButton, { variant: "secondary" }, "Search")
          )
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "https://example.com", readOnly: true }),
          React.createElement(
            InputGroupAddon,
            { align: "inline-end" },
            React.createElement(InputGroupButton, { size: "icon-xs", "aria-label": "Copy" },
              React.createElement(StarIcon)
            )
          )
        )
      ),
    },
    {
      name: "Dropdown",
      description: "Combine input groups with dropdown menus.",
      code: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ChevronDownIcon, MoreHorizontal } from "lucide-react"

export function InputGroupDropdown() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Enter file name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost" aria-label="More" size="icon-xs">
                <MoreHorizontal />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Copy path</DropdownMenuItem>
                <DropdownMenuItem>Open location</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
                Search In... <ChevronDownIcon className="size-3" />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Blog Posts</DropdownMenuItem>
                <DropdownMenuItem>Changelog</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "grid w-full max-w-sm gap-4" },
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "Enter file name" }),
          React.createElement(
            InputGroupAddon,
            { align: "inline-end" },
            React.createElement(
              DropdownMenu,
              {},
              React.createElement(
                DropdownMenuTrigger,
                { asChild: true },
                React.createElement(InputGroupButton, { variant: "ghost", "aria-label": "More", size: "icon-xs" },
                  React.createElement(MoreHorizontal)
                )
              ),
              React.createElement(
                DropdownMenuContent,
                { align: "end" },
                React.createElement(
                  DropdownMenuGroup,
                  {},
                  React.createElement(DropdownMenuItem, {}, "Settings"),
                  React.createElement(DropdownMenuItem, {}, "Copy path"),
                  React.createElement(DropdownMenuItem, {}, "Open location")
                )
              )
            )
          )
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "Enter search query" }),
          React.createElement(
            InputGroupAddon,
            { align: "inline-end" },
            React.createElement(
              DropdownMenu,
              {},
              React.createElement(
                DropdownMenuTrigger,
                { asChild: true },
                React.createElement(InputGroupButton, { variant: "ghost", className: "pr-1.5! text-xs" },
                  "Search In... ",
                  React.createElement(ChevronDownIcon, { className: "size-3" })
                )
              ),
              React.createElement(
                DropdownMenuContent,
                { align: "end" },
                React.createElement(
                  DropdownMenuGroup,
                  {},
                  React.createElement(DropdownMenuItem, {}, "Documentation"),
                  React.createElement(DropdownMenuItem, {}, "Blog Posts"),
                  React.createElement(DropdownMenuItem, {}, "Changelog")
                )
              )
            )
          )
        )
      ),
    },
    {
      name: "Textarea",
      description: "Use block-end addon with a textarea for character counts and submit actions.",
      code: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export function InputGroupTextareaExample() {
  return (
    <InputGroup className="max-w-md">
      <InputGroupTextarea placeholder="Write a comment..." />
      <InputGroupAddon align="block-end">
        <InputGroupText>0/280</InputGroupText>
        <InputGroupButton variant="default" size="sm" className="ml-auto">
          Post
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}`,
      preview: React.createElement(
        InputGroup,
        { className: "max-w-md" },
        React.createElement(InputGroupTextarea, { placeholder: "Write a comment..." }),
        React.createElement(
          InputGroupAddon,
          { align: "block-end" },
          React.createElement(InputGroupText, {}, "0/280"),
          React.createElement(InputGroupButton, { variant: "default", size: "sm", className: "ml-auto" }, "Post")
        )
      ),
    },
  ],
  props: [
    {
      name: "align",
      type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
      description: "Position of the addon relative to the input (InputGroupAddon).",
      default: '"inline-start"',
    },
    {
      name: "size",
      type: '"xs" | "icon-xs" | "sm" | "icon-sm"',
      description: "Size of the button (InputGroupButton).",
      default: '"xs"',
    },
    {
      name: "variant",
      type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      description: "Visual variant of the button (InputGroupButton).",
      default: '"ghost"',
    },
  ],
};
