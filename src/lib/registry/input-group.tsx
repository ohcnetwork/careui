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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Kbd } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";
import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  CreditCardIcon,
  CornerDownLeftIcon,
  EyeOffIcon,
  FileCode2Icon,
  InfoIcon,
  LoaderIcon,
  MailIcon,
  MoreHorizontal,
  RefreshCcwIcon,
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
  InfoIcon,
  MailIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react"

export function InputGroupIcon() {
  return (
    <div className="grid w-full max-w-sm gap-6">
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
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon align="inline-end">
          <StarIcon />
          <InfoIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "grid w-full max-w-sm gap-6" },
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
          React.createElement(InputGroupInput, { placeholder: "Card number" }),
          React.createElement(
            InputGroupAddon,
            { align: "inline-end" },
            React.createElement(StarIcon),
            React.createElement(InfoIcon)
          )
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
  InputGroupTextarea,
} from "@/components/ui/input-group"

export function InputGroupTextExample() {
  return (
    <div className="grid w-full max-w-sm gap-6">
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
      <InputGroup>
        <InputGroupTextarea placeholder="Enter your message" />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-xs text-muted-foreground">
            120 characters left
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "grid w-full max-w-sm gap-6" },
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
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupTextarea, { placeholder: "Enter your message" }),
          React.createElement(
            InputGroupAddon,
            { align: "block-end" },
            React.createElement(
              InputGroupText,
              { className: "text-xs text-muted-foreground" },
              "120 characters left"
            )
          )
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
      code: `"use client"

import * as React from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, CopyIcon, InfoIcon, StarIcon } from "lucide-react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

export function InputGroupButtonExample() {
  const { copyToClipboard, isCopied } = useCopyToClipboard()
  const [isFavorite, setIsFavorite] = React.useState(false)

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="https://x.com/shadcn" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            onClick={() => {
              copyToClipboard("https://x.com/shadcn", "url")
            }}
          >
            {isCopied("url") ? <CheckIcon /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="[--radius:9999px]">
        <Popover>
          <PopoverTrigger asChild>
            <InputGroupAddon>
              <InputGroupButton variant="secondary" size="icon-xs">
                <InfoIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex flex-col gap-1 rounded-xl text-sm"
          >
            <p className="font-medium">Your connection is not secure.</p>
            <p>You should not enter any sensitive information on this site.</p>
          </PopoverContent>
        </Popover>
        <InputGroupAddon className="pl-1.5 text-muted-foreground">
          https://
        </InputGroupAddon>
        <InputGroupInput />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onClick={() => setIsFavorite(!isFavorite)}
            size="icon-xs"
          >
            <StarIcon
              data-favorite={isFavorite}
              className="data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600"
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary"><SearchIcon />Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}`,
      preview: React.createElement(function InputGroupButtonPreview() {
        const [copied, setCopied] = React.useState(false);
        const [isFavorite, setIsFavorite] = React.useState(false);
        return React.createElement(
          "div",
          { className: "grid w-full max-w-sm gap-6" },
          React.createElement(
            InputGroup,
            {},
            React.createElement(InputGroupInput, { placeholder: "https://x.com/shadcn", readOnly: true }),
            React.createElement(
              InputGroupAddon,
              { align: "inline-end" },
              React.createElement(
                InputGroupButton,
                {
                  "aria-label": "Copy",
                  title: "Copy",
                  size: "icon-xs",
                  onClick: () => {
                    navigator.clipboard.writeText("https://x.com/shadcn");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  },
                },
                copied ? React.createElement(CheckIcon) : React.createElement(CopyIcon)
              )
            )
          ),
          React.createElement(
            InputGroup,
            { className: "" },
            React.createElement(
              Popover,
              {},
              React.createElement(
                PopoverTrigger,
                { asChild: true },
                React.createElement(
                  InputGroupAddon,
                  {},
                  React.createElement(InputGroupButton, { variant: "tertiary", size: "icon-xs" },
                    React.createElement(InfoIcon)
                  )
                )
              ),
              React.createElement(
                PopoverContent,
                { align: "start", className: "flex flex-col gap-1 rounded-xl text-sm" },
                React.createElement("p", { className: "font-medium" }, "Your connection is not secure."),
                React.createElement("p", {}, "You should not enter any sensitive information on this site.")
              )
            ),
            React.createElement(
              InputGroupAddon,
              { className: "pl-1.5 text-muted-foreground" },
              "https://"
            ),
            React.createElement(InputGroupInput, {}),
            React.createElement(
              InputGroupAddon,
              { align: "inline-end" },
              React.createElement(
                InputGroupButton,
                { size: "icon-xs", onClick: () => setIsFavorite((f) => !f) },
                React.createElement(StarIcon, {
                  className: isFavorite
                    ? "fill-blue-600 stroke-blue-600"
                    : undefined,
                })
              )
            )
          ),
          React.createElement(
            InputGroup,
            {},
            React.createElement(InputGroupInput, { placeholder: "Type to search..." }),
            React.createElement(
              InputGroupAddon,
              { align: "inline-end" },
              React.createElement(InputGroupButton, { variant: "tertiary", size: "xs" },
                React.createElement(SearchIcon),
                "Search"
              )
            )
          )
        );
      }),
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
              <InputGroupButton
                variant="ghost"
                aria-label="More"
                size="icon-xs"
              >
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
      <InputGroup className="[--radius:1rem]">
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
                Search In... <ChevronDownIcon className="size-3" />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="[--radius:0.95rem]">
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
          { className: "" },
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
                React.createElement(InputGroupButton, { variant: "tertiary", size: "xs", className: "no-underline" },
                  "Search In ",
                  React.createElement(ChevronDownIcon, { className: "size-4.5" })
                )
              ),
              React.createElement(
                DropdownMenuContent,
                { align: "end", className: "" },
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
      name: "Spinner",
      description: "Show loading spinners inside the input group to indicate async activity.",
      code: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { LoaderIcon } from "lucide-react"

export function InputGroupSpinner() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Searching..." />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Processing..." />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Saving changes..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Refreshing data..." />
        <InputGroupAddon>
          <LoaderIcon className="animate-spin" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-muted-foreground">
            Please wait...
          </InputGroupText>
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
          React.createElement(InputGroupInput, { placeholder: "Searching..." }),
          React.createElement(InputGroupAddon, { align: "inline-end" }, React.createElement(Spinner))
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "Processing..." }),
          React.createElement(InputGroupAddon, {}, React.createElement(Spinner))
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "Saving changes..." }),
          React.createElement(
            InputGroupAddon,
            { align: "inline-end" },
            React.createElement(InputGroupText, {}, "Saving..."),
            React.createElement(Spinner)
          )
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { placeholder: "Refreshing data..." }),
          React.createElement(InputGroupAddon, {}, React.createElement(LoaderIcon, { className: "animate-spin" })),
          React.createElement(
            InputGroupAddon,
            { align: "inline-end" },
            React.createElement(
              InputGroupText,
              { className: "text-muted-foreground" },
              "Please wait..."
            )
          )
        )
      ),
    },
    {
      name: "Textarea",
      description: "Use block addons with a textarea for headers, footers, and action toolbars.",
      code: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  CornerDownLeftIcon,
  CopyIcon,
  FileCode2Icon,
  RefreshCcwIcon,
} from "lucide-react"

export function InputGroupTextareaExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupTextarea
          placeholder="console.log('Hello, world!');"
          className="min-h-50"
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton size="sm" className="ml-auto" variant="default">
            Run <CornerDownLeftIcon />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-mono font-medium">
            <FileCode2Icon />
            script.js
          </InputGroupText>
          <InputGroupButton className="ml-auto" size="icon-xs">
            <RefreshCcwIcon />
          </InputGroupButton>
          <InputGroupButton variant="ghost" size="icon-xs">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "grid w-full max-w-md gap-4" },
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupTextarea, {
            placeholder: "console.log('Hello, world!');",
            className: "min-h-50",
          }),
          React.createElement(
            InputGroupAddon,
            { align: "block-end", className: "border-t" },
            React.createElement(InputGroupText, {}, "Line 1, Column 1"),
            React.createElement(
              InputGroupButton,
              { size: "sm", className: "ml-auto", variant: "default" },
              "Run ",
              React.createElement(CornerDownLeftIcon)
            )
          ),
          React.createElement(
            InputGroupAddon,
            { align: "block-start", className: "border-b" },
            React.createElement(
              InputGroupText,
              { className: "font-mono font-medium" },
              React.createElement(FileCode2Icon),
              "script.js"
            ),
            React.createElement(
              InputGroupButton,
              { className: "ml-auto", size: "icon-xs" },
              React.createElement(RefreshCcwIcon)
            ),
            React.createElement(
              InputGroupButton,
              { variant: "ghost", size: "icon-xs" },
              React.createElement(CopyIcon)
            )
          )
        )
      ),
    },
    {
      name: "inline-start",
      description: 'Use align="inline-start" to position the addon at the start of the input. This is the default.',
      code: `import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"

export function InputGroupInlineStart() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="inline-start-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput id="inline-start-input" placeholder="Search..." />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the start.</FieldDescription>
    </Field>
  )
}`,
      preview: React.createElement(
        Field,
        { className: "max-w-sm" },
        React.createElement(FieldLabel, { htmlFor: "inline-start-input" }, "Input"),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, { id: "inline-start-input", placeholder: "Search..." }),
          React.createElement(
            InputGroupAddon,
            { align: "inline-start" },
            React.createElement(SearchIcon, { className: "text-muted-foreground" })
          )
        ),
        React.createElement(FieldDescription, {}, "Icon positioned at the start.")
      ),
    },
    {
      name: "inline-end",
      description: 'Use align="inline-end" to position the addon at the end of the input.',
      code: `import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { EyeOffIcon } from "lucide-react"

export function InputGroupInlineEnd() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="inline-end-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="inline-end-input"
          type="password"
          placeholder="Enter password"
        />
        <InputGroupAddon align="inline-end">
          <EyeOffIcon />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the end.</FieldDescription>
    </Field>
  )
}`,
      preview: React.createElement(
        Field,
        { className: "max-w-sm" },
        React.createElement(FieldLabel, { htmlFor: "inline-end-input" }, "Input"),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, {
            id: "inline-end-input",
            type: "password",
            placeholder: "Enter password",
          }),
          React.createElement(
            InputGroupAddon,
            { align: "inline-end" },
            React.createElement(EyeOffIcon)
          )
        ),
        React.createElement(FieldDescription, {}, "Icon positioned at the end.")
      ),
    },
    {
      name: "block-start",
      description: 'Use align="block-start" to position the addon above the input.',
      code: `import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { CopyIcon, FileCode2Icon } from "lucide-react"

export function InputGroupBlockStart() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="block-start-input">Input</FieldLabel>
        <InputGroup className="h-auto">
          <InputGroupInput
            id="block-start-input"
            placeholder="Enter your name"
          />
          <InputGroupAddon align="block-start">
            <InputGroupText>Full Name</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Header positioned above the input.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="block-start-textarea">Textarea</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="block-start-textarea"
            placeholder="console.log('Hello, world!');"
            className="font-mono text-sm"
          />
          <InputGroupAddon align="block-start">
            <FileCode2Icon className="text-muted-foreground" />
            <InputGroupText className="font-mono">script.js</InputGroupText>
            <InputGroupButton size="icon-xs" className="ml-auto">
              <CopyIcon />
              <span className="sr-only">Copy</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Header positioned above the textarea.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}`,
      preview: React.createElement(
        FieldGroup,
        { className: "max-w-sm" },
        React.createElement(
          Field,
          {},
          React.createElement(FieldLabel, { htmlFor: "block-start-input" }, "Input"),
          React.createElement(
            InputGroup,
            { className: "h-auto" },
            React.createElement(InputGroupInput, { id: "block-start-input", placeholder: "Enter your name" }),
            React.createElement(
              InputGroupAddon,
              { align: "block-start" },
              React.createElement(InputGroupText, {}, "Full Name")
            )
          ),
          React.createElement(FieldDescription, {}, "Header positioned above the input.")
        ),
        React.createElement(
          Field,
          {},
          React.createElement(FieldLabel, { htmlFor: "block-start-textarea" }, "Textarea"),
          React.createElement(
            InputGroup,
            {},
            React.createElement(InputGroupTextarea, {
              id: "block-start-textarea",
              placeholder: "console.log('Hello, world!');",
              className: "font-mono text-sm",
            }),
            React.createElement(
              InputGroupAddon,
              { align: "block-start" },
              React.createElement(FileCode2Icon, { className: "text-muted-foreground" }),
              React.createElement(InputGroupText, { className: "font-mono" }, "script.js"),
              React.createElement(
                InputGroupButton,
                { size: "icon-xs", className: "ml-auto" },
                React.createElement(CopyIcon),
                React.createElement("span", { className: "sr-only" }, "Copy")
              )
            )
          ),
          React.createElement(FieldDescription, {}, "Header positioned above the textarea.")
        )
      ),
    },
    {
      name: "block-end",
      description: 'Use align="block-end" to position the addon below the input.',
      code: `import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export function InputGroupBlockEnd() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="block-end-input">Input</FieldLabel>
        <InputGroup className="h-auto">
          <InputGroupInput id="block-end-input" placeholder="Enter amount" />
          <InputGroupAddon align="block-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Footer positioned below the input.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="block-end-textarea">Textarea</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="block-end-textarea"
            placeholder="Write a comment..."
          />
          <InputGroupAddon align="block-end">
            <InputGroupText>0/280</InputGroupText>
            <InputGroupButton variant="default" size="sm" className="ml-auto">
              Post
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Footer positioned below the textarea.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}`,
      preview: React.createElement(
        FieldGroup,
        { className: "max-w-sm" },
        React.createElement(
          Field,
          {},
          React.createElement(FieldLabel, { htmlFor: "block-end-input" }, "Input"),
          React.createElement(
            InputGroup,
            { className: "h-auto" },
            React.createElement(InputGroupInput, { id: "block-end-input", placeholder: "Enter amount" }),
            React.createElement(
              InputGroupAddon,
              { align: "block-end" },
              React.createElement(InputGroupText, {}, "USD")
            )
          ),
          React.createElement(FieldDescription, {}, "Footer positioned below the input.")
        ),
        React.createElement(
          Field,
          {},
          React.createElement(FieldLabel, { htmlFor: "block-end-textarea" }, "Textarea"),
          React.createElement(
            InputGroup,
            {},
            React.createElement(InputGroupTextarea, {
              id: "block-end-textarea",
              placeholder: "Write a comment...",
            }),
            React.createElement(
              InputGroupAddon,
              { align: "block-end" },
              React.createElement(InputGroupText, {}, "0/280"),
              React.createElement(
                InputGroupButton,
                { variant: "default", size: "sm", className: "ml-auto" },
                "Post"
              )
            )
          ),
          React.createElement(FieldDescription, {}, "Footer positioned below the textarea.")
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
