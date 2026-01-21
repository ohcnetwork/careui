import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { type ComponentDoc } from "@/lib/types";

export const accordionDoc: ComponentDoc = {
  id: "accordion",
  name: "Accordion",
  description:
    "A vertically stacked set of interactive headings that each reveal a section of content.",
  installation: {
    cli: "npx shadcn@latest add accordion",
    manual:
      "Copy and paste the accordion component source code into your project.",
  },
  usage: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
  preview: {
    code: `<Accordion
  type="single"
  collapsible
  className="w-full"
  defaultValue="item-1"
>
  <AccordionItem value="item-1">
    <AccordionTrigger>Product Information</AccordionTrigger>
    <AccordionContent className="flex flex-col gap-4 text-balance">
      <p>
        Our flagship product combines cutting-edge technology with sleek
        design. Built with premium materials, it offers unparalleled
        performance and reliability.
      </p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Shipping Details</AccordionTrigger>
    <AccordionContent className="flex flex-col gap-4 text-balance">
      <p>
        We offer worldwide shipping through trusted courier partners.
        Standard delivery takes 3-5 business days.
      </p>
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    component: React.createElement(
      Accordion,
      {
        type: "single",
        collapsible: true,
        className: "w-full",
        defaultValue: "item-1",
      },
      React.createElement(
        AccordionItem,
        { value: "item-1" },
        React.createElement(AccordionTrigger, {}, "Product Information"),
        React.createElement(
          AccordionContent,
          { className: "flex flex-col gap-4 text-balance" },
          React.createElement(
            "p",
            {},
            "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability."
          )
        )
      ),
      React.createElement(
        AccordionItem,
        { value: "item-2" },
        React.createElement(AccordionTrigger, {}, "Shipping Details"),
        React.createElement(
          AccordionContent,
          { className: "flex flex-col gap-4 text-balance" },
          React.createElement(
            "p",
            {},
            "We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days."
          )
        )
      )
    ),
  },
};
