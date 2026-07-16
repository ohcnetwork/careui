import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// ─── data ─────────────────────────────────────────────────────────────────────

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const works = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

// ─── preview component ────────────────────────────────────────────────────────

const ScrollAreaDemo = () =>
  React.createElement(
    ScrollArea,
    { className: "h-72 w-48 rounded-md border" },
    React.createElement(
      "div",
      { className: "p-4" },
      React.createElement(
        "h4",
        { className: "mb-4 text-sm leading-none font-medium" },
        "Tags"
      ),
      tags.map((tag) =>
        React.createElement(
          React.Fragment,
          { key: tag },
          React.createElement("div", { className: "text-sm" }, tag),
          React.createElement(Separator, { className: "my-2" })
        )
      )
    )
  );

// ─── horizontal example component ────────────────────────────────────────────

const ScrollAreaHorizontalDemo = () =>
  React.createElement(
    ScrollArea,
    { className: "w-96 rounded-md border whitespace-nowrap" },
    React.createElement(
      "div",
      { className: "flex w-max space-x-4 p-4" },
      works.map((artwork) =>
        React.createElement(
          "figure",
          { key: artwork.artist, className: "shrink-0" },
          React.createElement(
            "div",
            { className: "overflow-hidden rounded-md" },
            React.createElement("img", {
              src: artwork.art,
              alt: `Photo by ${artwork.artist}`,
              className: "aspect-[3/4] h-fit w-fit object-cover",
              width: 300,
              height: 400,
            })
          ),
          React.createElement(
            "figcaption",
            { className: "pt-2 text-xs text-muted-foreground" },
            "Photo by ",
            React.createElement(
              "span",
              { className: "font-semibold text-foreground" },
              artwork.artist
            )
          )
        )
      )
    ),
    React.createElement(ScrollBar, { orientation: "horizontal" })
  );

export const scrollAreaDoc: ComponentDoc = {
  id: "scroll-area",
  name: "Scroll Area",
  description:
    "Augments native scroll functionality for custom, cross-browser styling.",
  installation: {
    cli: "npx shadcn@latest add scroll-area",
    manual:
      "Install `@base-ui/react`, then copy the scroll-area component into your project.",
  },
  usage: `import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Your scrollable content here.
</ScrollArea>`,
  preview: {
    code: `import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => \`v1.2.0-beta.\${a.length - i}\`
)

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}`,
    component: React.createElement(ScrollAreaDemo),
  },
  examples: [
    {
      name: "Horizontal",
      description:
        'Use ScrollBar with orientation="horizontal" for horizontal scrolling.',
      code: `import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Artwork {
  artist: string
  art: string
}

const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

export function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src={artwork.art}
                alt={\`Photo by \${artwork.artist}\`}
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by{" "}
              <span className="font-semibold text-foreground">
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}`,
      preview: React.createElement(ScrollAreaHorizontalDemo),
    },
  ],
  props: [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the scroll area root.",
    },
    {
      name: "dir",
      type: '"ltr" | "rtl"',
      description: "Reading direction. Defaults to the document direction.",
    },
    {
      name: "scrollHideDelay",
      type: "number",
      description:
        "Delay in milliseconds before the scrollbar hides after the last pointer interaction. Defaults to 600.",
      default: "600",
    },
    {
      name: "type",
      type: '"auto" | "always" | "scroll" | "hover"',
      description:
        "Describes the nature of scrollbar visibility. `auto` shows when content overflows, `always` always shows, `scroll` shows on scroll, `hover` shows when hovering.",
      default: '"hover"',
    },
  ],
};
