import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronDownIcon, InfoIcon } from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────

const col = (className: string, ...children: React.ReactNode[]) =>
  React.createElement("div", { className }, ...children);

// ─── doc ────────────────────────────────────────────────────────────────────

export const bubbleDoc: ComponentDoc = {
  id: "bubble",
  name: "Bubble",
  description:
    "Displays conversational content in a message bubble. Supports variants, alignment, grouping, reactions, and collapsible content.",
  installation: {
    cli: "npx shadcn@latest add bubble",
    manual:
      "Copy and paste the bubble component source code into your project.",
  },
  usage: `import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble"

export function BubbleDemo() {
  return (
    <Bubble>
      <BubbleContent>
        I checked the registry output and removed the stale route.
      </BubbleContent>
      <BubbleReactions>
        <span>👍</span>
      </BubbleReactions>
    </Bubble>
  )
}`,

  preview: {
    code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Bubble align="end">
    <BubbleContent>Hey there! what&apos;s up?</BubbleContent>
  </Bubble>
  <BubbleGroup>
    <Bubble variant="muted">
      <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
    </Bubble>
    <Bubble variant="muted">
      <BubbleContent>
        I can group messages, switch sides, and keep the whole thread easy to scan.
      </BubbleContent>
      <BubbleReactions role="img" aria-label="Reaction: thumbs up">
        <span>👍</span>
      </BubbleReactions>
    </Bubble>
  </BubbleGroup>
  <Bubble align="end">
    <BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
  </Bubble>
  <Bubble variant="muted">
    <BubbleContent>
      Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.
    </BubbleContent>
    <BubbleReactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
      <span>👍</span>
      <span>🔥</span>
      <span>👀</span>
      <span>+2</span>
    </BubbleReactions>
  </Bubble>
</div>`,
    component: col(
      "flex w-full max-w-sm flex-col gap-8 py-12",
      React.createElement(
        Bubble,
        { align: "end" },
        React.createElement(BubbleContent, null, "Hey there! what's up?")
      ),
      React.createElement(
        BubbleGroup,
        null,
        React.createElement(
          Bubble,
          { variant: "muted" },
          React.createElement(
            BubbleContent,
            null,
            "Hey! Want to see chat bubbles?"
          )
        ),
        React.createElement(
          Bubble,
          { variant: "muted" },
          React.createElement(
            BubbleContent,
            null,
            "I can group messages, switch sides, and keep the whole thread easy to scan."
          ),
          React.createElement(
            BubbleReactions,
            { role: "img", "aria-label": "Reaction: thumbs up" },
            React.createElement("span", null, "👍")
          )
        )
      ),
      React.createElement(
        Bubble,
        { align: "end" },
        React.createElement(
          BubbleContent,
          null,
          "Sure. Hit me with your best demo."
        )
      ),
      React.createElement(
        Bubble,
        { variant: "muted" },
        React.createElement(
          BubbleContent,
          null,
          "Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand."
        ),
        React.createElement(
          BubbleReactions,
          {
            role: "img",
            "aria-label": "Reactions: thumbs up, fire, eyes, and 2 more",
          },
          React.createElement("span", null, "👍"),
          React.createElement("span", null, "🔥"),
          React.createElement("span", null, "👀"),
          React.createElement("span", null, "+2")
        )
      )
    ),
  },

  examples: [
    // ── Variants ───────────────────────────────────────────────────────────
    {
      name: "Variants",
      description:
        "Seven visual variants: default (primary), secondary, muted, tinted, outline, ghost, and destructive.",
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Bubble>
    <BubbleContent>This is the default primary bubble.</BubbleContent>
  </Bubble>
  <Bubble variant="secondary" align="end">
    <BubbleContent>This is the secondary variant.</BubbleContent>
  </Bubble>
  <Bubble variant="muted">
    <BubbleContent>
      This one is muted. It uses a lower emphasis color for the chat bubble.
    </BubbleContent>
    <BubbleReactions role="img" aria-label="Reaction: thumbs up">
      <span>👍</span>
    </BubbleReactions>
  </Bubble>
  <Bubble variant="tinted" align="end">
    <BubbleContent>
      This one is tinted. The tint is a softer color derived from the primary color.
    </BubbleContent>
  </Bubble>
  <Bubble variant="outline">
    <BubbleContent>We can also use an outlined variant.</BubbleContent>
  </Bubble>
  <Bubble variant="destructive" align="end">
    <BubbleContent>Or a destructive variant with a reaction.</BubbleContent>
    <BubbleReactions role="img" aria-label="Reaction: fire">
      <span>🔥</span>
    </BubbleReactions>
  </Bubble>
  <Bubble variant="ghost">
    <BubbleContent>
      Ghost bubbles work for assistant text and content that should not be framed.
      They are full width and can take the full width of the container.
    </BubbleContent>
  </Bubble>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Bubble,
          null,
          React.createElement(
            BubbleContent,
            null,
            "This is the default primary bubble."
          )
        ),
        React.createElement(
          Bubble,
          { variant: "secondary", align: "end" },
          React.createElement(
            BubbleContent,
            null,
            "This is the secondary variant."
          )
        ),
        React.createElement(
          Bubble,
          { variant: "muted" },
          React.createElement(
            BubbleContent,
            null,
            "This one is muted. It uses a lower emphasis color for the chat bubble."
          ),
          React.createElement(
            BubbleReactions,
            { role: "img", "aria-label": "Reaction: thumbs up" },
            React.createElement("span", null, "👍")
          )
        ),
        React.createElement(
          Bubble,
          { variant: "tinted", align: "end" },
          React.createElement(
            BubbleContent,
            null,
            "This one is tinted. The tint is a softer color derived from the primary color."
          )
        ),
        React.createElement(
          Bubble,
          { variant: "outline" },
          React.createElement(
            BubbleContent,
            null,
            "We can also use an outlined variant."
          )
        ),
        React.createElement(
          Bubble,
          { variant: "destructive", align: "end" },
          React.createElement(
            BubbleContent,
            null,
            "Or a destructive variant with a reaction."
          ),
          React.createElement(
            BubbleReactions,
            { role: "img", "aria-label": "Reaction: fire" },
            React.createElement("span", null, "🔥")
          )
        ),
        React.createElement(
          Bubble,
          { variant: "ghost" },
          React.createElement(
            BubbleContent,
            null,
            "Ghost bubbles work for assistant text and content that should not be framed. They are full width and can take the full width of the container."
          )
        )
      ),
    },

    // ── Alignment ──────────────────────────────────────────────────────────
    {
      name: "Alignment",
      description:
        "Use `align` on `Bubble` to align the bubble to the start or end of the conversation.",
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Bubble variant="muted">
    <BubbleContent>
      This bubble is aligned to the start. This is the default alignment.
    </BubbleContent>
  </Bubble>
  <Bubble align="end">
    <BubbleContent>
      This bubble is aligned to the end. Use this for user messages.
    </BubbleContent>
  </Bubble>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Bubble,
          { variant: "muted" },
          React.createElement(
            BubbleContent,
            null,
            "This bubble is aligned to the start. This is the default alignment."
          )
        ),
        React.createElement(
          Bubble,
          { align: "end" },
          React.createElement(
            BubbleContent,
            null,
            "This bubble is aligned to the end. Use this for user messages."
          )
        )
      ),
    },

    // ── Group ──────────────────────────────────────────────────────────────
    {
      name: "Group",
      description:
        "Use `BubbleGroup` to group consecutive bubbles from the same sender. Set `align` on each `Bubble`, not on `BubbleGroup`.",
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Bubble variant="muted">
    <BubbleContent>Can you tell me what&apos;s the issue?</BubbleContent>
  </Bubble>
  <BubbleGroup>
    <Bubble align="end">
      <BubbleContent>You tell me!</BubbleContent>
    </Bubble>
    <Bubble align="end">
      <BubbleContent>It worked yesterday. You broke it!</BubbleContent>
    </Bubble>
    <Bubble align="end">
      <BubbleContent>Find the bug and fix it.</BubbleContent>
      <BubbleReactions aria-label="Reactions: eyes" align="start">
        <span>👀</span>
      </BubbleReactions>
    </Bubble>
  </BubbleGroup>
  <Bubble variant="muted">
    <BubbleContent>
      Want me to diff yesterday&apos;s you against today&apos;s you?
    </BubbleContent>
  </Bubble>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Bubble,
          { variant: "muted" },
          React.createElement(
            BubbleContent,
            null,
            "Can you tell me what's the issue?"
          )
        ),
        React.createElement(
          BubbleGroup,
          null,
          React.createElement(
            Bubble,
            { align: "end" },
            React.createElement(BubbleContent, null, "You tell me!")
          ),
          React.createElement(
            Bubble,
            { align: "end" },
            React.createElement(
              BubbleContent,
              null,
              "It worked yesterday. You broke it!"
            )
          ),
          React.createElement(
            Bubble,
            { align: "end" },
            React.createElement(
              BubbleContent,
              null,
              "Find the bug and fix it."
            ),
            React.createElement(
              BubbleReactions,
              { "aria-label": "Reactions: eyes", align: "start" },
              React.createElement("span", null, "👀")
            )
          )
        ),
        React.createElement(
          Bubble,
          { variant: "muted" },
          React.createElement(
            BubbleContent,
            null,
            "Want me to diff yesterday's you against today's you?"
          )
        )
      ),
    },

    // ── Reactions ──────────────────────────────────────────────────────────
    {
      name: "Reactions",
      description:
        "Use `BubbleReactions` for emoji reactions or quick action buttons. Use `side` and `align` to position the row. Reactions overlap the bubble edge, so use extra gap between rows.",
      code: `<div className="flex w-full max-w-sm flex-col gap-12 py-12">
  <Bubble variant="muted" align="end">
    <BubbleContent>I don&apos;t need tests, I know my code works.</BubbleContent>
    <BubbleReactions align="start" role="img" aria-label="Reactions: thumbs up, surprised">
      <span>👍</span>
      <span>😮</span>
    </BubbleReactions>
  </Bubble>
  <Bubble variant="muted">
    <BubbleContent>
      Bold. Fine I&apos;ll add some tests. I&apos;ll let you know when they&apos;re done.
    </BubbleContent>
    <BubbleReactions role="img" aria-label="Reactions: eyes, rocket, and 2 more">
      <span>👀</span>
      <span>🚀</span>
      <span>+2</span>
    </BubbleReactions>
  </Bubble>
  <Bubble variant="default" align="end">
    <BubbleContent>Tests passed on the first try. All 142 of them. Looking good!</BubbleContent>
    <BubbleReactions side="top" align="start" role="img" aria-label="Reactions: party popper, clapping hands">
      <span>🎉</span>
      <span>👏</span>
    </BubbleReactions>
  </Bubble>
  <Bubble variant="destructive">
    <BubbleContent>Are you sure I can run this command?</BubbleContent>
    <BubbleReactions>
      <Button variant="ghost" size="xs">Yes, run it</Button>
    </BubbleReactions>
  </Bubble>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-12 py-12",
        React.createElement(
          Bubble,
          { variant: "muted", align: "end" },
          React.createElement(
            BubbleContent,
            null,
            "I don't need tests, I know my code works."
          ),
          React.createElement(
            BubbleReactions,
            {
              align: "start",
              role: "img",
              "aria-label": "Reactions: thumbs up, surprised",
            },
            React.createElement("span", null, "👍"),
            React.createElement("span", null, "😮")
          )
        ),
        React.createElement(
          Bubble,
          { variant: "muted" },
          React.createElement(
            BubbleContent,
            null,
            "Bold. Fine I'll add some tests. I'll let you know when they're done."
          ),
          React.createElement(
            BubbleReactions,
            {
              role: "img",
              "aria-label": "Reactions: eyes, rocket, and 2 more",
            },
            React.createElement("span", null, "👀"),
            React.createElement("span", null, "🚀"),
            React.createElement("span", null, "+2")
          )
        ),
        React.createElement(
          Bubble,
          { variant: "default", align: "end" },
          React.createElement(
            BubbleContent,
            null,
            "Tests passed on the first try. All 142 of them. Looking good!"
          ),
          React.createElement(
            BubbleReactions,
            {
              side: "top",
              align: "start",
              role: "img",
              "aria-label": "Reactions: party popper, clapping hands",
            },
            React.createElement("span", null, "🎉"),
            React.createElement("span", null, "👏")
          )
        ),
        React.createElement(
          Bubble,
          { variant: "destructive" },
          React.createElement(
            BubbleContent,
            null,
            "Are you sure I can run this command?"
          ),
          React.createElement(
            BubbleReactions,
            null,
            React.createElement(
              Button,
              { variant: "ghost", size: "xs" },
              "Yes, run it"
            )
          )
        )
      ),
    },

    // ── Show More / Collapsible ────────────────────────────────────────────
    {
      name: "Show More / Collapsible",
      description:
        "Compose long bubble content with `Collapsible` to allow show more / show less. The `CollapsibleTrigger` sits inside `BubbleContent` so the bubble expands in place.",
      code: `"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"

const text = \`The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.\`

const previewLength = 120

export function BubbleCollapsible() {
  const [open, setOpen] = React.useState(false)
  const isLong = text.length > previewLength
  const preview = text.slice(0, previewLength) + "..."

  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <Bubble variant="muted" align="end">
        <BubbleContent className="whitespace-pre-line">
          <Collapsible open={open} onOpenChange={setOpen}>
            <div>{open || !isLong ? text : preview}</div>
            {isLong ? (
              <CollapsibleTrigger
                render={
                  <Button variant="link" className="gap-1 p-0 text-muted-foreground" />
                }
              >
                {open ? "Show less" : "Show more"}
                <ChevronDownIcon
                  data-icon="inline-end"
                  className="group-data-panel-open/button:rotate-180"
                />
              </CollapsibleTrigger>
            ) : null}
          </Collapsible>
        </BubbleContent>
      </Bubble>
    </div>
  )
}`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Bubble,
          { variant: "muted" },
          React.createElement(BubbleContent, null, "How can I help you today?")
        ),
        React.createElement(
          Bubble,
          { variant: "muted", align: "end" },
          React.createElement(
            BubbleContent,
            { className: "whitespace-pre-line" },
            React.createElement(
              Collapsible,
              null,
              React.createElement(
                "div",
                null,
                "The accessibility review found two focus states that were visually too subtle in dark mode.\n\nI checked the dialog, menu, and drawer paths because each one renders focusable controls..."
              ),
              React.createElement(
                CollapsibleTrigger,
                {
                  render: React.createElement(Button, {
                    variant: "link",
                    className: "gap-1 p-0 text-muted-foreground",
                  }),
                },
                "Show more",
                React.createElement(ChevronDownIcon, {
                  className: "size-4",
                })
              )
            )
          )
        )
      ),
    },

    // ── Tooltip ────────────────────────────────────────────────────────────
    {
      name: "Tooltip",
      description:
        "Wrap a bubble in a `Tooltip` to reveal metadata on hover, such as when a message was read.",
      code: `import { CheckIcon } from "lucide-react"

import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function BubbleTooltipDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 py-12">
      <Bubble variant="secondary">
        <BubbleContent>Did you remove the stale route?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Yes, removed it from the registry.</BubbleContent>
        <BubbleReactions>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon-xs" />}>
              <CheckIcon />
            </TooltipTrigger>
            <TooltipContent>Read on Jan 5, 2026 at 4:32 PM</TooltipContent>
          </Tooltip>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-4 py-12",
        React.createElement(
          Bubble,
          { variant: "secondary" },
          React.createElement(
            BubbleContent,
            null,
            "Did you remove the stale route?"
          )
        ),
        React.createElement(
          Bubble,
          { align: "end" },
          React.createElement(
            BubbleContent,
            null,
            "Yes, removed it from the registry."
          ),
          React.createElement(
            BubbleReactions,
            null,
            React.createElement(
              Tooltip,
              null,
              React.createElement(
                TooltipTrigger,
                {
                  render: React.createElement(Button, {
                    variant: "ghost",
                    size: "icon-xs",
                  }),
                },
                React.createElement(CheckIcon)
              ),
              React.createElement(
                TooltipContent,
                null,
                "Read on Jan 5, 2026 at 4:32 PM"
              )
            )
          )
        )
      ),
    },

    // ── Popover ────────────────────────────────────────────────────────────
    {
      name: "Popover",
      description:
        "Pair a bubble with a `Popover` to surface more information on demand, such as the full error message for a failed action.",
      code: `import { InfoIcon } from "lucide-react"

import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export function BubblePopoverDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 py-12">
      <Bubble align="end">
        <BubbleContent>Run the build script.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Failed to run the command.</BubbleContent>
        <BubbleReactions>
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Show error details"
                  className="aria-expanded:text-destructive"
                />
              }
            >
              <InfoIcon />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle className="text-sm">
                  Command failed with exit code 1
                </PopoverTitle>
                <PopoverDescription className="text-sm">
                  ENOENT: no such file or directory, open pnpm-lock.yaml
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-4 py-12",
        React.createElement(
          Bubble,
          { align: "end" },
          React.createElement(BubbleContent, null, "Run the build script.")
        ),
        React.createElement(
          Bubble,
          { variant: "destructive" },
          React.createElement(
            BubbleContent,
            null,
            "Failed to run the command."
          ),
          React.createElement(
            BubbleReactions,
            null,
            React.createElement(
              Popover,
              null,
              React.createElement(
                PopoverTrigger,
                {
                  render: React.createElement(Button, {
                    variant: "ghost",
                    size: "icon-xs",
                    "aria-label": "Show error details",
                    className: "aria-expanded:text-destructive",
                  }),
                },
                React.createElement(InfoIcon)
              ),
              React.createElement(
                PopoverContent,
                null,
                React.createElement(
                  PopoverHeader,
                  null,
                  React.createElement(
                    PopoverTitle,
                    { className: "text-sm" },
                    "Command failed with exit code 1"
                  ),
                  React.createElement(
                    PopoverDescription,
                    { className: "text-sm" },
                    "ENOENT: no such file or directory, open pnpm-lock.yaml"
                  )
                )
              )
            )
          )
        )
      ),
    },

    // ── Links and Buttons ──────────────────────────────────────────────────
    {
      name: "Links and Buttons",
      description:
        "Turn a bubble into a link or button with the `render` prop on `BubbleContent`. The content gets a visible focus ring and its accessible name from the bubble text.",
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Bubble variant="muted">
    <BubbleContent>How can I help you today?</BubbleContent>
  </Bubble>
  <BubbleGroup>
    <Bubble variant="tinted" align="end">
      <BubbleContent render={<button type="button" />}>
        I forgot my password
      </BubbleContent>
    </Bubble>
    <Bubble variant="tinted" align="end">
      <BubbleContent render={<button type="button" />}>
        I need help with my subscription
      </BubbleContent>
    </Bubble>
    <Bubble variant="tinted" align="end">
      <BubbleContent render={<button type="button" />}>
        Something else. Talk to a human.
      </BubbleContent>
    </Bubble>
  </BubbleGroup>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Bubble,
          { variant: "muted" },
          React.createElement(BubbleContent, null, "How can I help you today?")
        ),
        React.createElement(
          BubbleGroup,
          null,
          React.createElement(
            Bubble,
            { variant: "tinted", align: "end" },
            React.createElement(
              BubbleContent,
              { render: React.createElement("button", { type: "button" }) },
              "I forgot my password"
            )
          ),
          React.createElement(
            Bubble,
            { variant: "tinted", align: "end" },
            React.createElement(
              BubbleContent,
              { render: React.createElement("button", { type: "button" }) },
              "I need help with my subscription"
            )
          ),
          React.createElement(
            Bubble,
            { variant: "tinted", align: "end" },
            React.createElement(
              BubbleContent,
              { render: React.createElement("button", { type: "button" }) },
              "Something else. Talk to a human."
            )
          )
        )
      ),
    },
  ],

  props: [
    {
      name: "variant",
      type: '"default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive"',
      default: '"default"',
      description: "The visual treatment of the bubble. Apply on Bubble.",
    },
    {
      name: "align",
      type: '"start" | "end"',
      default: '"start"',
      description:
        "The inline alignment of the bubble. Apply on Bubble. Use `end` for the current user's messages.",
    },
    {
      name: "BubbleContent render",
      type: "ReactElement | function",
      default: "-",
      description:
        "Render BubbleContent as a different element, such as a <button> or <a>. Gets a focus ring automatically.",
    },
    {
      name: "BubbleReactions side",
      type: '"top" | "bottom"',
      default: '"bottom"',
      description:
        "The side of the bubble to anchor the reactions. Apply on BubbleReactions.",
    },
    {
      name: "BubbleReactions align",
      type: '"start" | "end"',
      default: '"end"',
      description:
        "The inline alignment of the reaction row. Apply on BubbleReactions.",
    },
  ],
};
