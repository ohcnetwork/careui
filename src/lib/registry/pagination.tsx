import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const paginationDoc: ComponentDoc = {
  id: "pagination",
  name: "Pagination",
  description: "Pagination with page navigation, next and previous links.",
  installation: {
    cli: "npx shadcn@latest add pagination",
    manual:
      "Copy and paste the pagination component source code into your project.",
  },
  usage: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
  preview: {
    code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    component: React.createElement(
      Pagination,
      {},
      React.createElement(
        PaginationContent,
        {},
        React.createElement(
          PaginationItem,
          {},
          React.createElement(PaginationPrevious, { href: "#" })
        ),
        React.createElement(
          PaginationItem,
          {},
          React.createElement(PaginationLink, { href: "#" }, "1")
        ),
        React.createElement(
          PaginationItem,
          {},
          React.createElement(PaginationLink, { href: "#", isActive: true }, "2")
        ),
        React.createElement(
          PaginationItem,
          {},
          React.createElement(PaginationLink, { href: "#" }, "3")
        ),
        React.createElement(
          PaginationItem,
          {},
          React.createElement(PaginationEllipsis, {})
        ),
        React.createElement(
          PaginationItem,
          {},
          React.createElement(PaginationNext, { href: "#" })
        )
      )
    ),
  },
  examples: [
    {
      name: "Simple",
      description: "A simple pagination with only page numbers.",
      code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">5</PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
      preview: React.createElement(
        Pagination,
        {},
        React.createElement(
          PaginationContent,
          {},
          React.createElement(
            PaginationItem,
            {},
            React.createElement(PaginationLink, { href: "#" }, "1")
          ),
          React.createElement(
            PaginationItem,
            {},
            React.createElement(PaginationLink, { href: "#", isActive: true }, "2")
          ),
          React.createElement(
            PaginationItem,
            {},
            React.createElement(PaginationLink, { href: "#" }, "3")
          ),
          React.createElement(
            PaginationItem,
            {},
            React.createElement(PaginationLink, { href: "#" }, "4")
          ),
          React.createElement(
            PaginationItem,
            {},
            React.createElement(PaginationLink, { href: "#" }, "5")
          )
        )
      ),
    },
    {
      name: "Icons Only",
      description:
        "Use just the previous and next buttons without page numbers. This is useful for data tables with a rows per page selector.",
      code: `<div className="flex items-center justify-between gap-4">
  <Field orientation="horizontal" className="w-fit">
    <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
    <Select defaultValue="25">
      <SelectTrigger className="w-20" id="select-rows-per-page">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start">
        <SelectGroup>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </Field>
  <Pagination className="mx-0 w-auto">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="#" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex items-center justify-between gap-4" },
        React.createElement(
          Field,
          { orientation: "horizontal", className: "w-fit" },
          React.createElement(
            FieldLabel,
            { htmlFor: "select-rows-per-page" },
            "Rows per page"
          ),
          React.createElement(
            Select,
            { defaultValue: "25" },
            React.createElement(
              SelectTrigger,
              { className: "w-20", id: "select-rows-per-page" },
              React.createElement(SelectValue, {})
            ),
            React.createElement(
              SelectContent,
              { align: "start" },
              React.createElement(
                SelectGroup,
                {},
                React.createElement(SelectItem, { value: "10" }, "10"),
                React.createElement(SelectItem, { value: "25" }, "25"),
                React.createElement(SelectItem, { value: "50" }, "50"),
                React.createElement(SelectItem, { value: "100" }, "100")
              )
            )
          )
        ),
        React.createElement(
          Pagination,
          { className: "mx-0 w-auto" },
          React.createElement(
            PaginationContent,
            {},
            React.createElement(
              PaginationItem,
              {},
              React.createElement(PaginationPrevious, { href: "#" })
            ),
            React.createElement(
              PaginationItem,
              {},
              React.createElement(PaginationNext, { href: "#" })
            )
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "href",
      type: "string",
      description: "The URL that the pagination item should navigate to.",
    },
    {
      name: "isActive",
      type: "boolean",
      description: "Whether this page is the currently active page.",
      default: "false",
    },
    {
      name: "size",
      type: '"default" | "sm" | "lg" | "icon"',
      description: "The size of the pagination buttons.",
      default: '"default"',
    },
  ],
};
