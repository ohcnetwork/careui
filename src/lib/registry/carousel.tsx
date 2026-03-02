import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Helper: build N numbered carousel items
function makeItems(
  count: number,
  itemProps?: Record<string, string>,
  contentClassName = "flex aspect-square items-center justify-center p-6",
  spanClassName = "text-4xl font-semibold"
) {
  return Array.from({ length: count }, (_, i) =>
    React.createElement(
      CarouselItem,
      { key: i, ...itemProps },
      React.createElement(
        "div",
        { className: "p-1" },
        React.createElement(
          Card,
          {},
          React.createElement(
            CardContent,
            { className: contentClassName },
            React.createElement("span", { className: spanClassName }, String(i + 1))
          )
        )
      )
    )
  );
}

export const carouselDoc: ComponentDoc = {
  id: "carousel",
  name: "Carousel",
  description:
    "A carousel with motion and swipe built using Embla.",
  installation: {
    cli: "npx shadcn@latest add carousel",
    manual:
      "Install embla-carousel-react, then copy and paste the carousel component source code into your project.",
  },
  usage: `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  preview: {
    code: `import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`,
    component: React.createElement(
      Carousel,
      { className: "w-full max-w-xs mx-auto" },
      React.createElement(CarouselContent, {}, ...makeItems(5)),
      React.createElement(CarouselPrevious, {}),
      React.createElement(CarouselNext, {})
    ),
  },
  examples: [
    // ── Sizes ──────────────────────────────────────────────────────────────
    {
      name: "Sizes",
      description:
        "To set the size of the items, use the `basis` utility class on the `<CarouselItem />`.",
      code: `import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`,
      preview: React.createElement(
        Carousel,
        { opts: { align: "start" }, className: "w-full max-w-sm" },
        React.createElement(
          CarouselContent,
          {},
          ...makeItems(
            5,
            { className: "basis-1/2 lg:basis-1/3" },
            "flex aspect-square items-center justify-center p-6",
            "text-3xl font-semibold"
          )
        ),
        React.createElement(CarouselPrevious, {}),
        React.createElement(CarouselNext, {})
      ),
    },

    // ── Spacing ────────────────────────────────────────────────────────────
    {
      name: "Spacing",
      description:
        "To set the spacing between items, use `pl-[VALUE]` on `<CarouselItem />` and a negative `-ml-[VALUE]` on `<CarouselContent />`.",
      code: `import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselSpacing() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`,
      preview: React.createElement(
        Carousel,
        { className: "w-full max-w-sm" },
        React.createElement(
          CarouselContent,
          { className: "-ml-1" },
          ...makeItems(
            5,
            { className: "basis-1/2 pl-1 lg:basis-1/3" },
            "flex aspect-square items-center justify-center p-6",
            "text-2xl font-semibold"
          )
        ),
        React.createElement(CarouselPrevious, {}),
        React.createElement(CarouselNext, {})
      ),
    },

    // ── Orientation ────────────────────────────────────────────────────────
    {
      name: "Orientation",
      description:
        "Use the `orientation` prop to set the orientation of the carousel.",
      code: `import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselOrientation() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-67.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 pt-1">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`,
      preview: React.createElement(
        Carousel,
        {
          opts: { align: "start" },
          orientation: "vertical",
          className: "w-full max-w-xs",
        },
        React.createElement(
          CarouselContent,
          { className: "-mt-1 h-67.5" },
          ...makeItems(
            5,
            { className: "basis-1/2 pt-1" },
            "flex items-center justify-center p-6",
            "text-3xl font-semibold"
          )
        ),
        React.createElement(CarouselPrevious, {}),
        React.createElement(CarouselNext, {})
      ),
    },
  ],
};
