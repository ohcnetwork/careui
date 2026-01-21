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

export const carouselDoc: ComponentDoc = {
  id: "carousel",
  name: "Carousel",
  description: "A carousel component for cycling through elements.",
  installation: {
    cli: "npx shadcn@latest add carousel",
    manual:
      "Copy and paste the carousel component source code into your project.",
  },
  usage: `import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"`,
  preview: {
    code: `<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
</Carousel>`,
    component: React.createElement(
      Carousel,
      { className: "w-full max-w-xs" },
      React.createElement(
        CarouselContent,
        {},
        React.createElement(
          CarouselItem,
          {},
          React.createElement(
            Card,
            {},
            React.createElement(
              CardContent,
              {
                className: "flex aspect-square items-center justify-center p-6",
              },
              React.createElement(
                "span",
                { className: "text-4xl font-semibold" },
                "1"
              )
            )
          )
        ),
        React.createElement(
          CarouselItem,
          {},
          React.createElement(
            Card,
            {},
            React.createElement(
              CardContent,
              {
                className: "flex aspect-square items-center justify-center p-6",
              },
              React.createElement(
                "span",
                { className: "text-4xl font-semibold" },
                "2"
              )
            )
          )
        ),
        React.createElement(
          CarouselItem,
          {},
          React.createElement(
            Card,
            {},
            React.createElement(
              CardContent,
              {
                className: "flex aspect-square items-center justify-center p-6",
              },
              React.createElement(
                "span",
                { className: "text-4xl font-semibold" },
                "3"
              )
            )
          )
        )
      ),
      React.createElement(CarouselPrevious, {}),
      React.createElement(CarouselNext, {})
    ),
  },
};
