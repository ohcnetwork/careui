import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertTriangleIcon,
  ArchiveIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  AudioLinesIcon,
  BotIcon,
  CalendarPlusIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  CopyIcon,
  ListFilterIcon,
  MailCheckIcon,
  MinusIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  TagIcon,
  Trash2Icon,
  TrashIcon,
  UserRoundXIcon,
  VolumeOffIcon,
} from "lucide-react";

export const buttonGroupDoc: ComponentDoc = {
  id: "button-group",
  name: "Button Group",
  description:
    "A container that groups related buttons together with consistent styling.",
  installation: {
    cli: "npx shadcn@latest add button-group",
    manual: `Install the following dependencies:

\`\`\`bash
npm install radix-ui
\`\`\`

Copy and paste the following code into your project:
components/ui/button-group.tsx

Update the import paths to match your project setup.`,
  },
  usage: `import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>`,
  preview: {
    code: `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArchiveIcon,
  ArrowLeftIcon,
  CalendarPlusIcon,
  ClockIcon,
  ListFilterIcon,
  MailCheckIcon,
  MoreHorizontalIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react"

export function ButtonGroupDemo() {
  const [label, setLabel] = React.useState("personal")

  return (
    <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="outline" size="icon" aria-label="Go Back">
          <ArrowLeftIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Snooze</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="More Options">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <MailCheckIcon />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArchiveIcon />
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ClockIcon />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CalendarPlusIcon />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ListFilterIcon />
                Add to List
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <TagIcon />
                  Label As...
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={label} onValueChange={setLabel}>
                    <DropdownMenuRadioItem value="personal">Personal</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="work">Work</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}`,
    component: React.createElement(() => {
      const [label, setLabel] = React.useState("personal");
      return React.createElement(
        ButtonGroup,
        {},
        React.createElement(
          ButtonGroup,
          { className: "hidden sm:flex" },
          React.createElement(
            Button,
            { variant: "outline", size: "icon", "aria-label": "Go Back" },
            React.createElement(ArrowLeftIcon)
          )
        ),
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { variant: "outline" }, "Archive"),
          React.createElement(Button, { variant: "outline" }, "Report")
        ),
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { variant: "outline" }, "Snooze"),
          React.createElement(
            DropdownMenu,
            {},
            React.createElement(
              DropdownMenuTrigger,
              { asChild: true },
              React.createElement(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  "aria-label": "More Options",
                },
                React.createElement(MoreHorizontalIcon)
              )
            ),
            React.createElement(
              DropdownMenuContent,
              { align: "end", className: "w-40" },
              React.createElement(
                DropdownMenuGroup,
                {},
                React.createElement(
                  DropdownMenuItem,
                  {},
                  React.createElement(MailCheckIcon),
                  "Mark as Read"
                ),
                React.createElement(
                  DropdownMenuItem,
                  {},
                  React.createElement(ArchiveIcon),
                  "Archive"
                )
              ),
              React.createElement(DropdownMenuSeparator),
              React.createElement(
                DropdownMenuGroup,
                {},
                React.createElement(
                  DropdownMenuItem,
                  {},
                  React.createElement(ClockIcon),
                  "Snooze"
                ),
                React.createElement(
                  DropdownMenuItem,
                  {},
                  React.createElement(CalendarPlusIcon),
                  "Add to Calendar"
                ),
                React.createElement(
                  DropdownMenuItem,
                  {},
                  React.createElement(ListFilterIcon),
                  "Add to List"
                ),
                React.createElement(
                  DropdownMenuSub,
                  {},
                  React.createElement(
                    DropdownMenuSubTrigger,
                    {},
                    React.createElement(TagIcon),
                    "Label As..."
                  ),
                  React.createElement(
                    DropdownMenuSubContent,
                    {},
                    React.createElement(
                      DropdownMenuRadioGroup,
                      { value: label, onValueChange: setLabel },
                      React.createElement(
                        DropdownMenuRadioItem,
                        { value: "personal" },
                        "Personal"
                      ),
                      React.createElement(
                        DropdownMenuRadioItem,
                        { value: "work" },
                        "Work"
                      ),
                      React.createElement(
                        DropdownMenuRadioItem,
                        { value: "other" },
                        "Other"
                      )
                    )
                  )
                )
              ),
              React.createElement(DropdownMenuSeparator),
              React.createElement(
                DropdownMenuGroup,
                {},
                React.createElement(
                  DropdownMenuItem,
                  { variant: "destructive" },
                  React.createElement(Trash2Icon),
                  "Trash"
                )
              )
            )
          )
        )
      );
    }),
  },
  examples: [
    {
      name: "Orientation",
      description: "Set the `orientation` prop to change the button group layout.",
      code: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { MinusIcon, PlusIcon } from "lucide-react"

export function ButtonGroupOrientation() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Media controls" className="h-fit">
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}`,
      preview: React.createElement(
        ButtonGroup,
        {
          orientation: "vertical",
          "aria-label": "Media controls",
          className: "h-fit",
        },
        React.createElement(
          Button,
          { variant: "outline", size: "icon" },
          React.createElement(PlusIcon)
        ),
        React.createElement(
          Button,
          { variant: "outline", size: "icon" },
          React.createElement(MinusIcon)
        )
      ),
    },
    {
      name: "Size",
      description:
        "Control the size of buttons using the `size` prop on individual buttons.",
      code: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { PlusIcon } from "lucide-react"

export function ButtonGroupSize() {
  return (
    <div className="flex flex-col items-start gap-8">
      <ButtonGroup>
        <Button variant="outline" size="sm">Small</Button>
        <Button variant="outline" size="sm">Button</Button>
        <Button variant="outline" size="sm">Group</Button>
        <Button variant="outline" size="icon-sm">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Button</Button>
        <Button variant="outline">Group</Button>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">Large</Button>
        <Button variant="outline" size="lg">Button</Button>
        <Button variant="outline" size="lg">Group</Button>
        <Button variant="outline" size="icon-lg">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col items-start gap-8" },
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { variant: "outline", size: "sm" }, "Small"),
          React.createElement(Button, { variant: "outline", size: "sm" }, "Button"),
          React.createElement(Button, { variant: "outline", size: "sm" }, "Group"),
          React.createElement(
            Button,
            { variant: "outline", size: "icon-sm" },
            React.createElement(PlusIcon)
          )
        ),
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { variant: "outline" }, "Default"),
          React.createElement(Button, { variant: "outline" }, "Button"),
          React.createElement(Button, { variant: "outline" }, "Group"),
          React.createElement(
            Button,
            { variant: "outline", size: "icon" },
            React.createElement(PlusIcon)
          )
        ),
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { variant: "outline", size: "lg" }, "Large"),
          React.createElement(Button, { variant: "outline", size: "lg" }, "Button"),
          React.createElement(Button, { variant: "outline", size: "lg" }, "Group"),
          React.createElement(
            Button,
            { variant: "outline", size: "icon-lg" },
            React.createElement(PlusIcon)
          )
        )
      ),
    },
    {
      name: "Nested",
      description:
        "Nest `<ButtonGroup>` components to create button groups with spacing.",
      code: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AudioLinesIcon, PlusIcon } from "lucide-react"

export function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." />
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupAddon align="inline-end">
                <AudioLinesIcon />
              </InputGroupAddon>
            </TooltipTrigger>
            <TooltipContent>Voice Mode</TooltipContent>
          </Tooltip>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(
            Button,
            { variant: "outline", size: "icon" },
            React.createElement(PlusIcon)
          )
        ),
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(
            InputGroup,
            {},
            React.createElement(InputGroupInput, {
              placeholder: "Send a message...",
            }),
            React.createElement(
              TooltipProvider,
              { delayDuration: 0 } as React.ComponentProps<typeof TooltipProvider>,
              React.createElement(
                Tooltip,
                {},
                React.createElement(
                  TooltipTrigger,
                  { asChild: true },
                  React.createElement(
                    InputGroupAddon,
                    { align: "inline-end" },
                    React.createElement(AudioLinesIcon)
                  )
                ),
                React.createElement(TooltipContent, {}, "Voice Mode")
              )
            )
          )
        )
      ),
    },
    {
      name: "Separator",
      description:
        "The `ButtonGroupSeparator` component visually divides buttons within a group.\n\nButtons with variant `outline` do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.",
      code: `import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"

export function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  )
}`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(Button, { variant: "tertiary", size: "sm" }, "Copy"),
        React.createElement(ButtonGroupSeparator),
        React.createElement(Button, { variant: "tertiary", size: "sm" }, "Paste")
      ),
    },
    {
      name: "Split",
      description:
        "Create a split button group by adding two buttons separated by a `ButtonGroupSeparator`.",
      code: `import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { PlusIcon } from "lucide-react"

export function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  )
}`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(Button, { variant: "secondary" }, "Button"),
        React.createElement(
          Button,
          { size: "icon", variant: "secondary" },
          React.createElement(PlusIcon)
        )
      ),
    },
    {
      name: "Input",
      description: "Wrap an `Input` component with buttons.",
      code: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(Input, { placeholder: "Search..." }),
        React.createElement(
          Button,
          { className: "shadow-sm border-strong-border", variant: "outline", "aria-label": "Search" },
          React.createElement(SearchIcon)
        )
      ),
    },
    {
      name: "Input Group",
      description: "Wrap an `InputGroup` component to create complex input layouts.",
      code: `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AudioLinesIcon, PlusIcon } from "lucide-react"

export function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = React.useState(false)

  return (
    <ButtonGroup className="[--radius:9999rem]">
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput
            placeholder={voiceEnabled ? "Record and send audio..." : "Send a message..."}
            disabled={voiceEnabled}
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  size="icon-xs"
                  data-active={voiceEnabled}
                  className="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                  aria-pressed={voiceEnabled}
                >
                  <AudioLinesIcon />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}`,
      preview: React.createElement(() => {
        const [voiceEnabled, setVoiceEnabled] = React.useState(false);
        return React.createElement(
          ButtonGroup,
          { className: "[--radius:9999rem]" },
          React.createElement(
            ButtonGroup,
            {},
            React.createElement(
              Button,
              { variant: "outline", size: "icon" },
              React.createElement(PlusIcon)
            )
          ),
          React.createElement(
            ButtonGroup,
            {},
            React.createElement(
              InputGroup,
              {},
              React.createElement(InputGroupInput, {
                placeholder: voiceEnabled
                  ? "Record and send audio..."
                  : "Send a message...",
                disabled: voiceEnabled,
              }),
              React.createElement(
                InputGroupAddon,
                { align: "inline-end" },
                React.createElement(
                  TooltipProvider,
                  { delayDuration: 0 } as React.ComponentProps<typeof TooltipProvider>,
                  React.createElement(
                    Tooltip,
                    {},
                    React.createElement(
                      TooltipTrigger,
                      { asChild: true },
                      React.createElement(
                        InputGroupButton,
                        {
                          onClick: () => setVoiceEnabled(!voiceEnabled),
                          size: "icon-xs",
                          ...({
                            "data-active": voiceEnabled,
                          } as Record<string, unknown>),
                          className:
                            "data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100",
                          "aria-pressed": voiceEnabled,
                        },
                        React.createElement(AudioLinesIcon)
                      )
                    ),
                    React.createElement(TooltipContent, {}, "Voice Mode")
                  )
                )
              )
            )
          )
        );
      }),
    },
    {
      name: "Dropdown Menu",
      description: "Create a split button group with a `DropdownMenu` component.",
      code: `"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertTriangleIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ShareIcon,
  TrashIcon,
  UserRoundXIcon,
  VolumeOffIcon,
} from "lucide-react"

export function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="pl-2!">
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <VolumeOffIcon />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckIcon />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertTriangleIcon />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserRoundXIcon />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShareIcon />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <TrashIcon />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(Button, { variant: "outline" }, "Follow"),
        React.createElement(
          DropdownMenu,
          {},
          React.createElement(
            DropdownMenuTrigger,
            { asChild: true },
            React.createElement(
              Button,
              { variant: "outline", className: "pl-2!" },
              React.createElement(ChevronDownIcon)
            )
          ),
          React.createElement(
            DropdownMenuContent,
            { align: "end", className: "w-44" },
            React.createElement(
              DropdownMenuGroup,
              {},
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(VolumeOffIcon),
                "Mute Conversation"
              ),
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(CheckIcon),
                "Mark as Read"
              ),
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(AlertTriangleIcon),
                "Report Conversation"
              ),
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(UserRoundXIcon),
                "Block User"
              ),
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(ShareIcon),
                "Share Conversation"
              ),
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(CopyIcon),
                "Copy Conversation"
              )
            ),
            React.createElement(DropdownMenuSeparator),
            React.createElement(
              DropdownMenuGroup,
              {},
              React.createElement(
                DropdownMenuItem,
                { variant: "destructive" },
                React.createElement(TrashIcon),
                "Delete Conversation"
              )
            )
          )
        )
      ),
    },
    {
      name: "Select",
      description: "Pair with a `Select` component.",
      code: `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { ArrowRightIcon } from "lucide-react"

const CURRENCIES = [
  { value: "$", label: "US Dollar" },
  { value: "€", label: "Euro" },
  { value: "£", label: "British Pound" },
]

export function ButtonGroupSelect() {
  const [currency, setCurrency] = React.useState("$")

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="font-mono">{currency}</SelectTrigger>
          <SelectContent className="min-w-24">
            <SelectGroup>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.value}{" "}
                  <span className="text-muted-foreground">{c.label}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="10.00" pattern="[0-9]*" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}`,
      preview: React.createElement(() => {
        const [currency, setCurrency] = React.useState("$");
        const currencies = [
          { value: "$", label: "US Dollar" },
          { value: "€", label: "Euro" },
          { value: "£", label: "British Pound" },
        ];
        return React.createElement(
          ButtonGroup,
          {},
          React.createElement(
            ButtonGroup,
            {},
            React.createElement(
              Select,
              { value: currency, onValueChange: setCurrency },
              React.createElement(
                SelectTrigger,
                { className: "font-mono" },
                currency
              ),
              React.createElement(
                SelectContent,
                { className: "min-w-24" },
                React.createElement(
                  SelectGroup,
                  {},
                  ...currencies.map((c) =>
                    React.createElement(
                      SelectItem,
                      { key: c.value, value: c.value },
                      c.value,
                      " ",
                      React.createElement(
                        "span",
                        { className: "text-muted-foreground" },
                        c.label
                      )
                    )
                  )
                )
              )
            ),
            React.createElement(Input, {
              placeholder: "10.00",
              pattern: "[0-9]*",
            })
          ),
          React.createElement(
            ButtonGroup,
            {},
            React.createElement(
              Button,
              { "aria-label": "Send", size: "icon", variant: "outline" },
              React.createElement(ArrowRightIcon)
            )
          )
        );
      }),
    },
    {
      name: "Popover",
      description: "Use with a `Popover` component.",
      code: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { BotIcon, ChevronDownIcon } from "lucide-react"

export function ButtonGroupPopover() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <BotIcon /> Copilot
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open Popover">
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="rounded-xl text-sm">
          <PopoverHeader>
            <PopoverTitle>Start a new task with Copilot</PopoverTitle>
            <PopoverDescription>
              Describe your task in natural language.
            </PopoverDescription>
          </PopoverHeader>
          <Field>
            <FieldLabel htmlFor="task" className="sr-only">
              Task Description
            </FieldLabel>
            <Textarea id="task" placeholder="I need to..." className="resize-none" />
            <FieldDescription>
              Copilot will open a pull request for review.
            </FieldDescription>
          </Field>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(
          Button,
          { variant: "outline" },
          React.createElement(BotIcon),
          " Copilot"
        ),
        React.createElement(
          Popover,
          {},
          React.createElement(
            PopoverTrigger,
            { asChild: true },
            React.createElement(
              Button,
              {
                variant: "outline",
                size: "icon",
                "aria-label": "Open Popover",
              },
              React.createElement(ChevronDownIcon)
            )
          ),
          React.createElement(
            PopoverContent,
            { align: "end", className: "rounded-xl text-sm" },
            React.createElement(
              PopoverHeader,
              {},
              React.createElement(
                PopoverTitle,
                {},
                "Start a new task with Copilot"
              ),
              React.createElement(
                PopoverDescription,
                {},
                "Describe your task in natural language."
              )
            ),
            React.createElement(
              Field,
              {},
              React.createElement(FieldLabel, {
                htmlFor: "task",
                className: "sr-only",
              }),
              React.createElement(Textarea, {
                id: "task",
                placeholder: "I need to...",
                className: "resize-none",
              }),
              React.createElement(
                FieldDescription,
                {},
                "Copilot will open a pull request for review."
              )
            )
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      description: "The orientation of the button group.",
      default: '"horizontal"',
    },
  ],
};
