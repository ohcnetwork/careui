import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Spinner } from "@/components/ui/spinner";
import {
  FileTextIcon,
  GitBranchIcon,
  SearchIcon,
  BookOpenCheck,
} from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────

const col = (className: string, ...children: React.ReactNode[]) =>
  React.createElement("div", { className }, ...children);

// ─── doc ────────────────────────────────────────────────────────────────────

export const markerDoc: ComponentDoc = {
  id: "marker",
  name: "Marker",
  description:
    "Displays an inline status, system note, bordered row, or labeled separator in a conversation.",
  installation: {
    cli: "npx shadcn@latest add marker",
    manual:
      "Copy and paste the marker component source code into your project.",
  },
  usage: `import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { CheckIcon } from "lucide-react"

export function MarkerDemo() {
  return (
    <Marker>
      <MarkerIcon>
        <CheckIcon />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
  )
}`,

  preview: {
    code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Marker>
    <MarkerIcon>
      <GitBranchIcon />
    </MarkerIcon>
    <MarkerContent>Switched to a new branch</MarkerContent>
  </Marker>
  <Marker role="status">
    <MarkerIcon>
      <Spinner />
    </MarkerIcon>
    <MarkerContent className="shimmer">Thinking...</MarkerContent>
  </Marker>
  <Marker variant="separator">
    <MarkerContent>Conversation compacted</MarkerContent>
  </Marker>
  <Marker>
    <MarkerIcon>
      <SearchIcon />
    </MarkerIcon>
    <MarkerContent>Explored 4 files</MarkerContent>
  </Marker>
</div>`,
    component: col(
      "flex w-full max-w-sm flex-col gap-8 py-12",
      React.createElement(
        Marker,
        null,
        React.createElement(
          MarkerIcon,
          null,
          React.createElement(GitBranchIcon)
        ),
        React.createElement(MarkerContent, null, "Switched to a new branch")
      ),
      React.createElement(
        Marker,
        { role: "status" },
        React.createElement(MarkerIcon, null, React.createElement(Spinner)),
        React.createElement(
          MarkerContent,
          { className: "shimmer" },
          "Thinking..."
        )
      ),
      React.createElement(
        Marker,
        { variant: "separator" },
        React.createElement(MarkerContent, null, "Conversation compacted")
      ),
      React.createElement(
        Marker,
        null,
        React.createElement(MarkerIcon, null, React.createElement(SearchIcon)),
        React.createElement(MarkerContent, null, "Explored 4 files")
      )
    ),
  },

  examples: [
    // ── Variants ───────────────────────────────────────────────────────────
    {
      name: "Variants",
      description:
        "Three variants: `default` (inline note), `separator` (centered label with divider lines), and `border` (row with a bottom border).",
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Marker>
    <MarkerContent>A default marker for inline notes.</MarkerContent>
  </Marker>
  <Marker variant="separator">
    <MarkerContent>A separator marker</MarkerContent>
  </Marker>
  <Marker variant="border">
    <MarkerContent>A border marker for row boundaries.</MarkerContent>
  </Marker>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Marker,
          null,
          React.createElement(
            MarkerContent,
            null,
            "A default marker for inline notes."
          )
        ),
        React.createElement(
          Marker,
          { variant: "separator" },
          React.createElement(MarkerContent, null, "A separator marker")
        ),
        React.createElement(
          Marker,
          { variant: "border" },
          React.createElement(
            MarkerContent,
            null,
            "A border marker for row boundaries."
          )
        )
      ),
    },

    // ── With Icon ──────────────────────────────────────────────────────────
    {
      name: "With Icon",
      description:
        "Use `MarkerIcon` to render a decorative icon alongside the content. Use `flex-col` to stack the icon above.",
      code: `<div className="flex w-full max-w-sm flex-col gap-12 py-12">
  <Marker>
    <MarkerIcon>
      <GitBranchIcon />
    </MarkerIcon>
    <MarkerContent>Switched to a new branch</MarkerContent>
  </Marker>
  <Marker variant="separator">
    <MarkerIcon>
      <SearchIcon />
    </MarkerIcon>
    <MarkerContent>Explored 4 files</MarkerContent>
  </Marker>
  <Marker className="flex-col">
    <MarkerIcon>
      <BookOpenCheck />
    </MarkerIcon>
    <MarkerContent>Syncing completed</MarkerContent>
  </Marker>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-12 py-12",
        React.createElement(
          Marker,
          null,
          React.createElement(
            MarkerIcon,
            null,
            React.createElement(GitBranchIcon)
          ),
          React.createElement(MarkerContent, null, "Switched to a new branch")
        ),
        React.createElement(
          Marker,
          { variant: "separator" },
          React.createElement(
            MarkerIcon,
            null,
            React.createElement(SearchIcon)
          ),
          React.createElement(MarkerContent, null, "Explored 4 files")
        ),
        React.createElement(
          Marker,
          { className: "flex-col" },
          React.createElement(
            MarkerIcon,
            null,
            React.createElement(BookOpenCheck)
          ),
          React.createElement(MarkerContent, null, "Syncing completed")
        )
      ),
    },

    // ── Status ─────────────────────────────────────────────────────────────
    {
      name: "Status",
      description:
        'Set `role="status"` and include a `Spinner` for in-progress markers so updates are announced by assistive tech.',
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Marker role="status">
    <MarkerIcon>
      <Spinner />
    </MarkerIcon>
    <MarkerContent>Compacting conversation</MarkerContent>
  </Marker>
  <Marker variant="separator" role="status">
    <MarkerIcon>
      <Spinner />
    </MarkerIcon>
    <MarkerContent>Running tests</MarkerContent>
  </Marker>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Marker,
          { role: "status" },
          React.createElement(MarkerIcon, null, React.createElement(Spinner)),
          React.createElement(MarkerContent, null, "Compacting conversation")
        ),
        React.createElement(
          Marker,
          { variant: "separator", role: "status" },
          React.createElement(MarkerIcon, null, React.createElement(Spinner)),
          React.createElement(MarkerContent, null, "Running tests")
        )
      ),
    },

    // ── Shimmer ────────────────────────────────────────────────────────────
    {
      name: "Shimmer",
      description:
        "Add the `shimmer` utility class to `MarkerContent` for an animated streaming-text effect.",
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Marker role="status">
    <MarkerContent className="shimmer">Thinking...</MarkerContent>
  </Marker>
  <Marker variant="separator" role="status">
    <MarkerContent className="shimmer">Reading 4 files</MarkerContent>
  </Marker>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Marker,
          { role: "status" },
          React.createElement(
            MarkerContent,
            { className: "shimmer" },
            "Thinking..."
          )
        ),
        React.createElement(
          Marker,
          { variant: "separator", role: "status" },
          React.createElement(
            MarkerContent,
            { className: "shimmer" },
            "Reading 4 files"
          )
        )
      ),
    },

    // ── Separator ──────────────────────────────────────────────────────────
    {
      name: "Separator",
      description:
        "Use the `separator` variant for labeled dividers such as dates or section breaks in a conversation.",
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Marker variant="separator">
    <MarkerContent>Today</MarkerContent>
  </Marker>
  <Marker variant="separator">
    <MarkerContent>Worked for 42s</MarkerContent>
  </Marker>
  <Marker variant="separator">
    <MarkerContent>Conversation compacted</MarkerContent>
  </Marker>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Marker,
          { variant: "separator" },
          React.createElement(MarkerContent, null, "Today")
        ),
        React.createElement(
          Marker,
          { variant: "separator" },
          React.createElement(MarkerContent, null, "Worked for 42s")
        ),
        React.createElement(
          Marker,
          { variant: "separator" },
          React.createElement(MarkerContent, null, "Conversation compacted")
        )
      ),
    },

    // ── Border ─────────────────────────────────────────────────────────────
    {
      name: "Border",
      description:
        "Use the `border` variant for status rows that should separate from the next row with a bottom border.",
      code: `<div className="flex w-full max-w-sm flex-col gap-3 py-12">
  <Marker variant="border">
    <MarkerIcon>
      <GitBranchIcon />
    </MarkerIcon>
    <MarkerContent>Switched to release-candidate</MarkerContent>
  </Marker>
  <Marker variant="border">
    <MarkerIcon>
      <SearchIcon />
    </MarkerIcon>
    <MarkerContent>Reviewed 8 related files</MarkerContent>
  </Marker>
  <Marker variant="border">
    <MarkerIcon>
      <FileTextIcon />
    </MarkerIcon>
    <MarkerContent>Opened implementation notes</MarkerContent>
  </Marker>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-3 py-12",
        React.createElement(
          Marker,
          { variant: "border" },
          React.createElement(
            MarkerIcon,
            null,
            React.createElement(GitBranchIcon)
          ),
          React.createElement(
            MarkerContent,
            null,
            "Switched to release-candidate"
          )
        ),
        React.createElement(
          Marker,
          { variant: "border" },
          React.createElement(
            MarkerIcon,
            null,
            React.createElement(SearchIcon)
          ),
          React.createElement(MarkerContent, null, "Reviewed 8 related files")
        ),
        React.createElement(
          Marker,
          { variant: "border" },
          React.createElement(
            MarkerIcon,
            null,
            React.createElement(FileTextIcon)
          ),
          React.createElement(
            MarkerContent,
            null,
            "Opened implementation notes"
          )
        )
      ),
    },

    // ── Links and Buttons ──────────────────────────────────────────────────
    {
      name: "Links and Buttons",
      description:
        "Turn a marker into a link or button with the `render` prop on `Marker`. The accessible name comes from the marker text.",
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Marker render={<a href="#links-and-buttons" />}>
    <MarkerIcon>
      <GitBranchIcon />
    </MarkerIcon>
    <MarkerContent>View the pull request</MarkerContent>
  </Marker>
  <Marker
    render={
      <button
        type="button"
        className="transition-colors hover:text-foreground"
      />
    }
  >
    <MarkerIcon>
      <SearchIcon />
    </MarkerIcon>
    <MarkerContent>Revert this change</MarkerContent>
  </Marker>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Marker,
          {
            render: React.createElement("a", {
              href: "#links-and-buttons",
            }),
          },
          React.createElement(
            MarkerIcon,
            null,
            React.createElement(GitBranchIcon)
          ),
          React.createElement(MarkerContent, null, "View the pull request")
        ),
        React.createElement(
          Marker,
          {
            render: React.createElement("button", {
              type: "button",
              className: "transition-colors hover:text-foreground",
            }),
          },
          React.createElement(
            MarkerIcon,
            null,
            React.createElement(SearchIcon)
          ),
          React.createElement(MarkerContent, null, "Revert this change")
        )
      ),
    },
  ],

  props: [
    {
      name: "variant",
      type: '"default" | "border" | "separator"',
      default: '"default"',
      description: "The marker layout. Apply on Marker.",
    },
    {
      name: "render",
      type: "ReactElement | function",
      default: "-",
      description:
        "Render Marker as a different element, such as a link or button.",
    },
  ],
};
