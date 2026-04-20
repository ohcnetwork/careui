import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame";

export const frameDoc: ComponentDoc = {
  id: "frame",
  name: "Frame",
  description:
    "Displays related content in a structured frame with header, content, and footer.",
  installation: {
    cli: "npx shadcn@latest add frame",
    manual: "Copy and paste the frame component source code into your project.",
  },
  usage: `import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"

<Frame>
  <FramePanel>
    <FrameHeader>
      <FrameTitle>Frame Title</FrameTitle>
      <FrameDescription>Frame Description</FrameDescription>
    </FrameHeader>
    <div className="p-5">Frame Content</div>
    <FrameFooter>Frame Footer</FrameFooter>
  </FramePanel>
</Frame>`,
  preview: {
    code: `import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"

export function FrameDemo() {
  return (
    <Frame className="w-full max-w-sm">
      <FrameHeader>
        <FrameTitle>Section header</FrameTitle>
        <FrameDescription>Description for the section</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <h2 className="text-sm font-semibold">Section title</h2>
        <p className="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
      <FrameFooter>
        <p className="text-muted-foreground text-sm">Section footer</p>
      </FrameFooter>
    </Frame>
  )
}`,
    component: React.createElement(
      Frame,
      { className: "w-full max-w-sm" },
      React.createElement(
        FrameHeader,
        null,
        React.createElement(FrameTitle, null, "Section header"),
        React.createElement(
          FrameDescription,
          null,
          "Description for the section"
        )
      ),
      React.createElement(
        FramePanel,
        null,
        React.createElement(
          "h2",
          { className: "text-sm font-semibold" },
          "Section title"
        ),
        React.createElement(
          "p",
          { className: "text-muted-foreground text-sm" },
          "Section description"
        )
      ),
      React.createElement(
        FrameFooter,
        null,
        React.createElement(
          "p",
          { className: "text-muted-foreground text-sm" },
          "Section footer"
        )
      )
    ),
  },
  examples: [
    {
      name: "With Separated Panels",
      description: "Frame with multiple panels separated by the frame's gap.",
      code: `import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"

export function FrameSeparatedPanels() {
  return (
    <Frame className="w-full max-w-lg">
      <FrameHeader>
        <FrameTitle>Section header</FrameTitle>
        <FrameDescription>Description for the section</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <h2 className="text-sm font-semibold">Separated panel</h2>
        <p className="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
      <FramePanel>
        <h2 className="text-sm font-semibold">Separated panel</h2>
        <p className="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
    </Frame>
  )
}`,
      preview: React.createElement(
        Frame,
        { className: "w-full max-w-lg" },
        React.createElement(
          FrameHeader,
          null,
          React.createElement(FrameTitle, null, "Section header"),
          React.createElement(
            FrameDescription,
            null,
            "Description for the section"
          )
        ),
        React.createElement(
          FramePanel,
          null,
          React.createElement(
            "h2",
            { className: "text-sm font-semibold" },
            "Separated panel"
          ),
          React.createElement(
            "p",
            { className: "text-muted-foreground text-sm" },
            "Section description"
          )
        ),
        React.createElement(
          FramePanel,
          null,
          React.createElement(
            "h2",
            { className: "text-sm font-semibold" },
            "Separated panel"
          ),
          React.createElement(
            "p",
            { className: "text-muted-foreground text-sm" },
            "Section description"
          )
        )
      ),
    },
    {
      name: "With Stacked Panels",
      description:
        "Use the stacked prop to remove margins between panels and connect them with shared borders.",
      code: `import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"

export function FrameStackedPanels() {
  return (
    <Frame className="w-full max-w-lg" stacked>
      <FrameHeader>
        <FrameTitle>Section header</FrameTitle>
        <FrameDescription>Description for the section</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <h2 className="text-sm font-semibold">Stacked panel</h2>
        <p className="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
      <FramePanel>
        <h2 className="text-sm font-semibold">Stacked panel</h2>
        <p className="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
    </Frame>
  )
}`,
      preview: React.createElement(
        Frame,
        { stacked: true, className: "w-full max-w-lg" },
        React.createElement(
          FrameHeader,
          null,
          React.createElement(FrameTitle, null, "Section header"),
          React.createElement(
            FrameDescription,
            null,
            "Description for the section"
          )
        ),
        React.createElement(
          FramePanel,
          null,
          React.createElement(
            "h2",
            { className: "text-sm font-semibold" },
            "Stacked panel"
          ),
          React.createElement(
            "p",
            { className: "text-muted-foreground text-sm" },
            "Section description"
          )
        ),
        React.createElement(
          FramePanel,
          null,
          React.createElement(
            "h2",
            { className: "text-sm font-semibold" },
            "Stacked panel"
          ),
          React.createElement(
            "p",
            { className: "text-muted-foreground text-sm" },
            "Section description"
          )
        )
      ),
    },
    {
      name: "With Dense Panels",
      description:
        "Combine the dense prop with stacked to remove panel padding for a tighter layout.",
      code: `import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"

export function FrameDensePanels() {
  return (
    <Frame className="w-full max-w-lg" stacked dense>
      <FrameHeader>
        <FrameTitle>Section header</FrameTitle>
        <FrameDescription>Description for the section</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <h2 className="text-sm font-semibold">Stacked panel</h2>
        <p className="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
      <FramePanel>
        <h2 className="text-sm font-semibold">Stacked panel</h2>
        <p className="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
    </Frame>
  )
}`,
      preview: React.createElement(
        Frame,
        { stacked: true, dense: true, className: "w-full max-w-lg" },
        React.createElement(
          FrameHeader,
          null,
          React.createElement(FrameTitle, null, "Section header"),
          React.createElement(
            FrameDescription,
            null,
            "Description for the section"
          )
        ),
        React.createElement(
          FramePanel,
          null,
          React.createElement(
            "h2",
            { className: "text-sm font-semibold" },
            "Stacked panel"
          ),
          React.createElement(
            "p",
            { className: "text-muted-foreground text-sm" },
            "Section description"
          )
        ),
        React.createElement(
          FramePanel,
          null,
          React.createElement(
            "h2",
            { className: "text-sm font-semibold" },
            "Stacked panel"
          ),
          React.createElement(
            "p",
            { className: "text-muted-foreground text-sm" },
            "Section description"
          )
        )
      ),
    },
    {
      name: "Without Outer Border",
      description:
        "Use the ghost variant to remove the outer frame border and background.",
      code: `import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"

export function FrameGhost() {
  return (
    <Frame className="w-full max-w-lg" variant="ghost">
      <FrameHeader>
        <FrameTitle>No Outer Border</FrameTitle>
        <FrameDescription>
          This frame uses variant="ghost" to remove the outer border.
        </FrameDescription>
      </FrameHeader>
      <FramePanel>
        <p className="text-muted-foreground text-sm">
          The outer container of this frame has no border, only the background
          and panels are visible.
        </p>
      </FramePanel>
    </Frame>
  )
}`,
      preview: React.createElement(
        Frame,
        { variant: "ghost", className: "w-full max-w-lg" },
        React.createElement(
          FrameHeader,
          null,
          React.createElement(FrameTitle, null, "No Outer Border"),
          React.createElement(
            FrameDescription,
            null,
            'This frame uses variant="ghost" to remove the outer border.'
          )
        ),
        React.createElement(
          FramePanel,
          null,
          React.createElement(
            "p",
            { className: "text-muted-foreground text-sm" },
            "The outer container of this frame has no border, only the background and panels are visible."
          )
        )
      ),
    },
    {
      name: "Custom Spacing",
      description:
        "Use the spacing prop to control internal padding and the gap between panels.",
      code: `import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"

export function FrameCustomSpacing() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      <Frame spacing="sm">
        <FrameHeader>
          <FrameTitle>Small spacing</FrameTitle>
          <FrameDescription>Compact padding and gap</FrameDescription>
        </FrameHeader>
        <FramePanel>
          <p className="text-sm text-muted-foreground">
            Small spacing is ideal for high-density toolbars and property panels.
          </p>
        </FramePanel>
      </Frame>
      <Frame spacing="lg">
        <FrameHeader>
          <FrameTitle>Large spacing</FrameTitle>
          <FrameDescription>Generous padding and gap</FrameDescription>
        </FrameHeader>
        <FramePanel>
          <p className="text-sm text-muted-foreground">
            Large spacing works well for marketing pages and feature highlights.
          </p>
        </FramePanel>
      </Frame>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col gap-6 w-full max-w-lg" },
        React.createElement(
          Frame,
          { spacing: "sm" },
          React.createElement(
            FrameHeader,
            null,
            React.createElement(FrameTitle, null, "Small spacing"),
            React.createElement(
              FrameDescription,
              null,
              "Compact padding and gap"
            )
          ),
          React.createElement(
            FramePanel,
            null,
            React.createElement(
              "p",
              { className: "text-sm text-muted-foreground" },
              "Small spacing is ideal for high-density toolbars and property panels."
            )
          )
        ),
        React.createElement(
          Frame,
          { spacing: "lg" },
          React.createElement(
            FrameHeader,
            null,
            React.createElement(FrameTitle, null, "Large spacing"),
            React.createElement(
              FrameDescription,
              null,
              "Generous padding and gap"
            )
          ),
          React.createElement(
            FramePanel,
            null,
            React.createElement(
              "p",
              { className: "text-sm text-muted-foreground" },
              "Large spacing works well for marketing pages and feature highlights."
            )
          )
        )
      ),
    },
    {
      name: "Custom Radius",
      description:
        "Customize the border radius of the frame and panels using the --frame-radius CSS variable.",
      code: `import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"

export function FrameCustomRadius() {
  return (
    <Frame className="w-full max-w-lg [--frame-radius:var(--radius-md)]">
      <FrameHeader>
        <FrameTitle>Media Library</FrameTitle>
        <FrameDescription>Manage your assets and downloads</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <h2 className="text-sm font-semibold">Storage Capacity</h2>
        <p className="text-muted-foreground text-sm">
          Medium radius is a versatile middle ground between sharp and rounded
          aesthetics.
        </p>
      </FramePanel>
    </Frame>
  )
}`,
      preview: React.createElement(
        Frame,
        {
          className: "w-full max-w-lg [--frame-radius:var(--radius-md)]",
        },
        React.createElement(
          FrameHeader,
          null,
          React.createElement(FrameTitle, null, "Media Library"),
          React.createElement(
            FrameDescription,
            null,
            "Manage your assets and downloads"
          )
        ),
        React.createElement(
          FramePanel,
          null,
          React.createElement(
            "h2",
            { className: "text-sm font-semibold" },
            "Storage Capacity"
          ),
          React.createElement(
            "p",
            { className: "text-muted-foreground text-sm" },
            "Medium radius is a versatile middle ground between sharp and rounded aesthetics."
          )
        )
      ),
    },
  ],
};
