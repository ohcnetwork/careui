import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ArrowUpIcon } from "lucide-react";

export const spinnerDoc: ComponentDoc = {
  id: "spinner",
  name: "Spinner",
  description: "An indicator that can be used to show a loading state.",
  installation: {
    cli: "npx shadcn@latest add spinner",
    manual:
      "Copy and paste the spinner component source code into your project.",
  },
  usage: `import { Spinner } from "@/components/ui/spinner"`,
  preview: {
    code: `import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>
    </div>
  )
}`,
    component: React.createElement(
      "div",
      { className: "flex w-full max-w-xs flex-col gap-4 [--radius:1rem]" },
      React.createElement(
        Item,
        { variant: "muted" } as any,
        React.createElement(ItemMedia, {}, React.createElement(Spinner, {})),
        React.createElement(
          ItemContent,
          {},
          React.createElement(
            ItemTitle,
            { className: "line-clamp-1" },
            "Processing payment..."
          )
        ),
        React.createElement(
          ItemContent,
          { className: "flex-none justify-end" },
          React.createElement(
            "span",
            { className: "text-sm tabular-nums" },
            "$100.00"
          )
        )
      )
    ),
  },
  examples: [
    {
      name: "Size",
      description: "Use the size-* utility class to change the size of the spinner.",
      code: `import { Spinner } from "@/components/ui/spinner"

export function SpinnerSize() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex items-center gap-6" },
        React.createElement(Spinner, { className: "size-3" }),
        React.createElement(Spinner, { className: "size-4" }),
        React.createElement(Spinner, { className: "size-6" }),
        React.createElement(Spinner, { className: "size-8" })
      ),
    },
    {
      name: "Button",
      description:
        'Add a spinner to a button to indicate a loading state. Place the <Spinner /> before the label with data-icon="inline-start" for a start position, or after the label with data-icon="inline-end" for an end position.',
      code: `import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Processing
      </Button>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col items-center gap-4" },
        React.createElement(
          Button,
          { disabled: true, size: "sm" },
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Loading..."
        ),
        React.createElement(
          Button,
          { variant: "outline", disabled: true, size: "sm" },
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Please wait"
        ),
        React.createElement(
          Button,
          { variant: "secondary", disabled: true, size: "sm" },
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Processing"
        )
      ),
    },
    {
      name: "Badge",
      description:
        'Add a spinner to a badge to indicate a loading state. Place the <Spinner /> before the label with data-icon="inline-start" for a start position, or after the label with data-icon="inline-end" for an end position.',
      code: `import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerBadge() {
  return (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Processing
      </Badge>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex items-center gap-4 [--radius:1.2rem]" },
        React.createElement(
          Badge,
          {},
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Syncing"
        ),
        React.createElement(
          Badge,
          { variant: "secondary" } as any,
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Updating"
        ),
        React.createElement(
          Badge,
          { variant: "outline" } as any,
          React.createElement(Spinner, { ["data-icon"]: "inline-start" } as any),
          "Processing"
        )
      ),
    },
    {
      name: "Input Group",
      description: "Add a spinner to an input group to indicate a loading or validation state.",
      code: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { ArrowUpIcon } from "lucide-react"

export function SpinnerInputGroup() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Send a message..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Send a message..." disabled />
        <InputGroupAddon align="block-end">
          <Spinner /> Validating...
          <InputGroupButton className="ml-auto" variant="default">
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex w-full max-w-md flex-col gap-4" },
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupInput, {
            placeholder: "Send a message...",
            disabled: true,
          }),
          React.createElement(
            InputGroupAddon,
            { align: "inline-end" } as any,
            React.createElement(Spinner, {})
          )
        ),
        React.createElement(
          InputGroup,
          {},
          React.createElement(InputGroupTextarea, {
            placeholder: "Send a message...",
            disabled: true,
          }),
          React.createElement(
            InputGroupAddon,
            { align: "block-end" } as any,
            React.createElement(Spinner, {}),
            " Validating...",
            React.createElement(
              InputGroupButton,
              { className: "ml-auto", variant: "default" } as any,
              React.createElement(ArrowUpIcon, {}),
              React.createElement("span", { className: "sr-only" }, "Send")
            )
          )
        )
      ),
    },
    {
      name: "Empty",
      description: "Use a spinner in an empty state to indicate a loading or processing state.",
      code: `import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerEmpty() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  )
}`,
      preview: React.createElement(
        Empty,
        { className: "w-full" },
        React.createElement(
          EmptyHeader,
          {},
          React.createElement(
            EmptyMedia,
            { variant: "icon" } as any,
            React.createElement(Spinner, {})
          ),
          React.createElement(EmptyTitle, {}, "Processing your request"),
          React.createElement(
            EmptyDescription,
            {},
            "Please wait while we process your request. Do not refresh the page."
          )
        ),
        React.createElement(
          EmptyContent,
          {},
          React.createElement(
            Button,
            { variant: "outline", size: "sm" },
            "Cancel"
          )
        )
      ),
    },
  ],
};
