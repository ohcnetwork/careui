import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const HOVER_CARD_SIDES = ["left", "top", "bottom", "right"] as const;

export const hoverCardDoc: ComponentDoc = {
  id: "hover-card",
  name: "Hover Card",
  description: "For sighted users to preview content available behind a link.",
  installation: {
    cli: "npx shadcn@latest add hover-card",
    manual:
      "Copy and paste the hover card component source code into your project.",
  },
  usage: `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"`,
  preview: {
    code: `import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function HoverCardDemo() {
  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="link">Hover Here</Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-64 flex-col gap-0.5">
        <div className="font-semibold">@nextjs</div>
        <div>The React Framework – created and maintained by @vercel.</div>
        <div className="mt-1 text-xs text-muted-foreground">
          Joined December 2021
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`,
    component: React.createElement(
      HoverCard,
      { openDelay: 10, closeDelay: 100 },
      React.createElement(
        HoverCardTrigger,
        { asChild: true },
        React.createElement(Button, { variant: "link" }, "Hover Here")
      ),
      React.createElement(
        HoverCardContent,
        { className: "flex w-64 flex-col gap-0.5" },
        React.createElement("div", { className: "font-semibold" }, "@nextjs"),
        React.createElement(
          "div",
          {},
          "The React Framework – created and maintained by @vercel."
        ),
        React.createElement(
          "div",
          { className: "mt-1 text-xs text-muted-foreground" },
          "Joined December 2021"
        )
      )
    ),
  },
  examples: [
    {
      name: "Sides",
      description:
        "Use the side prop on HoverCardContent to control which side the card appears on.",
      code: `import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const HOVER_CARD_SIDES = ["left", "top", "bottom", "right"] as const

export function HoverCardSides() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {HOVER_CARD_SIDES.map((side) => (
        <HoverCard key={side} openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent side={side}>
            <div className="flex flex-col gap-1">
              <h4 className="font-medium">Hover Card</h4>
              <p>This hover card appears on the {side} side of the trigger.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-wrap justify-center gap-2" },
        ...HOVER_CARD_SIDES.map((side) =>
          React.createElement(
            HoverCard,
            { key: side, openDelay: 100, closeDelay: 100 },
            React.createElement(
              HoverCardTrigger,
              { asChild: true },
              React.createElement(
                Button,
                { variant: "outline", className: "capitalize" },
                side
              )
            ),
            React.createElement(
              HoverCardContent,
              { side },
              React.createElement(
                "div",
                { className: "flex flex-col gap-1" },
                React.createElement(
                  "h4",
                  { className: "font-medium" },
                  "Hover Card"
                ),
                React.createElement(
                  "p",
                  {},
                  `This hover card appears on the ${side} side of the trigger.`
                )
              )
            )
          )
        )
      ),
    },
  ],
};
