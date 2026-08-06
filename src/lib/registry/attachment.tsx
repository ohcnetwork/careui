import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import {
  CheckIcon,
  ClockIcon,
  CopyIcon,
  FileCodeIcon,
  FileSearchIcon,
  FileTextIcon,
  FileWarningIcon,
  RefreshCwIcon,
  TableIcon,
  XIcon,
} from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────

const col = (className: string, ...children: React.ReactNode[]) =>
  React.createElement("div", { className }, ...children);

const images = [
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
    alt: "Workspace",
  },
  {
    name: "desk-reference.jpg",
    meta: "JPG · 1.1 MB",
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
    alt: "Desk",
  },
  {
    name: "office-reference.jpg",
    meta: "JPG · 940 KB",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
    alt: "Office",
  },
];

// ─── doc ────────────────────────────────────────────────────────────────────

export const attachmentDoc: ComponentDoc = {
  id: "attachment",
  name: "Attachment",
  description:
    "Displays a file or image attachment with media, metadata, upload state, and actions. Use in chat composers, message threads, and upload lists.",
  installation: {
    cli: "npx shadcn@latest add attachment",
    manual:
      "Install the button component, then copy the attachment component source into your project.",
  },
  usage: `import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { FileTextIcon, XIcon } from "lucide-react"

export function AttachmentDemo() {
  return (
    <Attachment>
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove sales-dashboard.pdf">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  )
}`,

  preview: {
    code: `<div className="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
  <AttachmentGroup>
    {images.map((image) => (
      <Attachment key={image.name} orientation="vertical">
        <AttachmentMedia variant="image">
          <img src={image.src} alt={image.alt} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{image.name}</AttachmentTitle>
          <AttachmentDescription>{image.meta}</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    ))}
  </AttachmentGroup>
  <Attachment state="uploading" className="w-full">
    <AttachmentMedia><Spinner /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
      <AttachmentDescription>Uploading · 64%</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Cancel upload"><XIcon /></AttachmentAction>
    </AttachmentActions>
  </Attachment>
  <Attachment className="w-full">
    <AttachmentMedia><FileCodeIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
      <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Remove message-renderer.tsx"><XIcon /></AttachmentAction>
    </AttachmentActions>
  </Attachment>
</div>`,
    component: col(
      "mx-auto flex w-full max-w-sm flex-col gap-3 py-12",
      React.createElement(
        AttachmentGroup,
        null,
        ...images.map((image) =>
          React.createElement(
            Attachment,
            { key: image.name, orientation: "vertical" },
            React.createElement(
              AttachmentMedia,
              { variant: "image" },
              React.createElement("img", { src: image.src, alt: image.alt })
            ),
            React.createElement(
              AttachmentContent,
              null,
              React.createElement(AttachmentTitle, null, image.name),
              React.createElement(AttachmentDescription, null, image.meta)
            )
          )
        )
      ),
      React.createElement(
        Attachment,
        { state: "uploading", className: "w-full" },
        React.createElement(
          AttachmentMedia,
          null,
          React.createElement(Spinner)
        ),
        React.createElement(
          AttachmentContent,
          null,
          React.createElement(AttachmentTitle, null, "sales-dashboard.pdf"),
          React.createElement(AttachmentDescription, null, "Uploading · 64%")
        ),
        React.createElement(
          AttachmentActions,
          null,
          React.createElement(
            AttachmentAction,
            { "aria-label": "Cancel upload" },
            React.createElement(XIcon)
          )
        )
      ),
      React.createElement(
        Attachment,
        { className: "w-full" },
        React.createElement(
          AttachmentMedia,
          null,
          React.createElement(FileCodeIcon)
        ),
        React.createElement(
          AttachmentContent,
          null,
          React.createElement(AttachmentTitle, null, "message-renderer.tsx"),
          React.createElement(AttachmentDescription, null, "TypeScript · 12 KB")
        ),
        React.createElement(
          AttachmentActions,
          null,
          React.createElement(
            AttachmentAction,
            { "aria-label": "Remove message-renderer.tsx" },
            React.createElement(XIcon)
          )
        )
      )
    ),
  },

  examples: [
    // ── Image ──────────────────────────────────────────────────────────────
    {
      name: "Image",
      description:
        'Set `variant="image"` on `AttachmentMedia` and render an `<img>` inside it. Use `orientation="vertical"` to stack media above content. Add `AttachmentTrigger` to make the card open a link.',
      code: `<AttachmentGroup className="w-full">
  {images.map((image) => (
    <Attachment key={image.name} orientation="vertical">
      <AttachmentMedia variant="image">
        <img src={image.src} alt={image.alt} />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{image.name}</AttachmentTitle>
        <AttachmentDescription>{image.meta}</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label={\`Remove \${image.name}\`}>
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
      <AttachmentTrigger
        render={
          <a href={image.src} target="_blank" rel="noreferrer" aria-label={\`Open \${image.name}\`} />
        }
      />
    </Attachment>
  ))}
</AttachmentGroup>`,
      preview: React.createElement(
        AttachmentGroup,
        { className: "w-full max-w-sm" },
        ...images.map((image) =>
          React.createElement(
            Attachment,
            { key: image.name, orientation: "vertical" },
            React.createElement(
              AttachmentMedia,
              { variant: "image" },
              React.createElement("img", { src: image.src, alt: image.alt })
            ),
            React.createElement(
              AttachmentContent,
              null,
              React.createElement(AttachmentTitle, null, image.name),
              React.createElement(AttachmentDescription, null, image.meta)
            ),
            React.createElement(
              AttachmentActions,
              null,
              React.createElement(
                AttachmentAction,
                { "aria-label": `Remove ${image.name}` },
                React.createElement(XIcon)
              )
            ),
            React.createElement(AttachmentTrigger, {
              render: React.createElement("a", {
                href: image.src,
                target: "_blank",
                rel: "noreferrer",
                "aria-label": `Open ${image.name}`,
              }),
            })
          )
        )
      ),
    },

    // ── States ─────────────────────────────────────────────────────────────
    {
      name: "States",
      description:
        "Set `state` to reflect the upload lifecycle. `uploading` and `processing` shimmer the title; `error` switches to a destructive treatment.",
      code: `<div className="mx-auto flex w-full max-w-sm flex-col gap-2 py-12">
  <Attachment state="idle" className="w-full">
    <AttachmentMedia><ClockIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>selected-file.pdf</AttachmentTitle>
      <AttachmentDescription>Ready to upload</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Remove selected-file.pdf"><XIcon /></AttachmentAction>
    </AttachmentActions>
  </Attachment>
  <Attachment state="uploading" className="w-full">
    <AttachmentMedia><Spinner /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>design-system.zip</AttachmentTitle>
      <AttachmentDescription>Uploading · 64%</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Cancel upload"><XIcon /></AttachmentAction>
    </AttachmentActions>
  </Attachment>
  <Attachment state="processing" className="w-full">
    <AttachmentMedia><FileTextIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>market-research.pdf</AttachmentTitle>
      <AttachmentDescription>Processing document</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Remove market-research.pdf"><XIcon /></AttachmentAction>
    </AttachmentActions>
  </Attachment>
  <Attachment state="error" className="w-full">
    <AttachmentMedia><FileWarningIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
      <AttachmentDescription>Upload failed. Try again.</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Retry upload"><RefreshCwIcon /></AttachmentAction>
      <AttachmentAction aria-label="Remove financial-model.xlsx"><XIcon /></AttachmentAction>
    </AttachmentActions>
  </Attachment>
  <Attachment state="done" className="w-full">
    <AttachmentMedia><CheckIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>uploaded-report.pdf</AttachmentTitle>
      <AttachmentDescription>Uploaded · 1.8 MB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Remove uploaded-report.pdf"><XIcon /></AttachmentAction>
    </AttachmentActions>
  </Attachment>
</div>`,
      preview: col(
        "mx-auto flex w-full max-w-sm flex-col gap-2 py-12",
        React.createElement(
          Attachment,
          { state: "idle", className: "w-full" },
          React.createElement(
            AttachmentMedia,
            null,
            React.createElement(ClockIcon)
          ),
          React.createElement(
            AttachmentContent,
            null,
            React.createElement(AttachmentTitle, null, "selected-file.pdf"),
            React.createElement(AttachmentDescription, null, "Ready to upload")
          ),
          React.createElement(
            AttachmentActions,
            null,
            React.createElement(
              AttachmentAction,
              { "aria-label": "Remove selected-file.pdf" },
              React.createElement(XIcon)
            )
          )
        ),
        React.createElement(
          Attachment,
          { state: "uploading", className: "w-full" },
          React.createElement(
            AttachmentMedia,
            null,
            React.createElement(Spinner)
          ),
          React.createElement(
            AttachmentContent,
            null,
            React.createElement(AttachmentTitle, null, "design-system.zip"),
            React.createElement(AttachmentDescription, null, "Uploading · 64%")
          ),
          React.createElement(
            AttachmentActions,
            null,
            React.createElement(
              AttachmentAction,
              { "aria-label": "Cancel upload" },
              React.createElement(XIcon)
            )
          )
        ),
        React.createElement(
          Attachment,
          { state: "processing", className: "w-full" },
          React.createElement(
            AttachmentMedia,
            null,
            React.createElement(FileTextIcon)
          ),
          React.createElement(
            AttachmentContent,
            null,
            React.createElement(AttachmentTitle, null, "market-research.pdf"),
            React.createElement(
              AttachmentDescription,
              null,
              "Processing document"
            )
          ),
          React.createElement(
            AttachmentActions,
            null,
            React.createElement(
              AttachmentAction,
              { "aria-label": "Remove market-research.pdf" },
              React.createElement(XIcon)
            )
          )
        ),
        React.createElement(
          Attachment,
          { state: "error", className: "w-full" },
          React.createElement(
            AttachmentMedia,
            null,
            React.createElement(FileWarningIcon)
          ),
          React.createElement(
            AttachmentContent,
            null,
            React.createElement(AttachmentTitle, null, "financial-model.xlsx"),
            React.createElement(
              AttachmentDescription,
              null,
              "Upload failed. Try again."
            )
          ),
          React.createElement(
            AttachmentActions,
            null,
            React.createElement(
              AttachmentAction,
              { "aria-label": "Retry upload" },
              React.createElement(RefreshCwIcon)
            ),
            React.createElement(
              AttachmentAction,
              { "aria-label": "Remove financial-model.xlsx" },
              React.createElement(XIcon)
            )
          )
        ),
        React.createElement(
          Attachment,
          { state: "done", className: "w-full" },
          React.createElement(
            AttachmentMedia,
            null,
            React.createElement(CheckIcon)
          ),
          React.createElement(
            AttachmentContent,
            null,
            React.createElement(AttachmentTitle, null, "uploaded-report.pdf"),
            React.createElement(
              AttachmentDescription,
              null,
              "Uploaded · 1.8 MB"
            )
          ),
          React.createElement(
            AttachmentActions,
            null,
            React.createElement(
              AttachmentAction,
              { "aria-label": "Remove uploaded-report.pdf" },
              React.createElement(XIcon)
            )
          )
        )
      ),
    },

    // ── Sizes ──────────────────────────────────────────────────────────────
    {
      name: "Sizes",
      description: "Three sizes: `default`, `sm`, and `xs`.",
      code: `<div className="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
  <Attachment size="default" className="w-full">
    <AttachmentMedia><FileTextIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>Default attachment</AttachmentTitle>
      <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
    </AttachmentContent>
  </Attachment>
  <Attachment size="sm" className="w-full">
    <AttachmentMedia><FileTextIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>Small attachment</AttachmentTitle>
      <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
    </AttachmentContent>
  </Attachment>
  <Attachment size="xs" className="w-full">
    <AttachmentMedia><FileTextIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>Extra small attachment</AttachmentTitle>
    </AttachmentContent>
  </Attachment>
</div>`,
      preview: col(
        "mx-auto flex w-full max-w-sm flex-col gap-3 py-12",
        React.createElement(
          Attachment,
          { size: "default", className: "w-full" },
          React.createElement(
            AttachmentMedia,
            null,
            React.createElement(FileTextIcon)
          ),
          React.createElement(
            AttachmentContent,
            null,
            React.createElement(AttachmentTitle, null, "Default attachment"),
            React.createElement(AttachmentDescription, null, "PDF · 2.4 MB")
          )
        ),
        React.createElement(
          Attachment,
          { size: "sm", className: "w-full" },
          React.createElement(
            AttachmentMedia,
            null,
            React.createElement(FileTextIcon)
          ),
          React.createElement(
            AttachmentContent,
            null,
            React.createElement(AttachmentTitle, null, "Small attachment"),
            React.createElement(AttachmentDescription, null, "PDF · 2.4 MB")
          )
        ),
        React.createElement(
          Attachment,
          { size: "xs", className: "w-full" },
          React.createElement(
            AttachmentMedia,
            null,
            React.createElement(FileTextIcon)
          ),
          React.createElement(
            AttachmentContent,
            null,
            React.createElement(AttachmentTitle, null, "Extra small attachment")
          )
        )
      ),
    },

    // ── Group ──────────────────────────────────────────────────────────────
    {
      name: "Group",
      description:
        "Wrap attachments in `AttachmentGroup` for a horizontally scrollable, snapping row with an edge fade. Mix file icons and image thumbnails.",
      code: `<AttachmentGroup className="w-full">
  <Attachment className="w-64">
    <AttachmentMedia><FileTextIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>briefing-notes.pdf</AttachmentTitle>
      <AttachmentDescription>PDF · 1.4 MB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Remove briefing-notes.pdf"><XIcon /></AttachmentAction>
    </AttachmentActions>
  </Attachment>
  <Attachment className="w-64">
    <AttachmentMedia variant="image">
      <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80" alt="workspace" />
    </AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>workspace.png</AttachmentTitle>
      <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Remove workspace.png"><XIcon /></AttachmentAction>
    </AttachmentActions>
  </Attachment>
  <Attachment className="w-64">
    <AttachmentMedia><TableIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>customers.csv</AttachmentTitle>
      <AttachmentDescription>CSV · 18 KB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Remove customers.csv"><XIcon /></AttachmentAction>
    </AttachmentActions>
  </Attachment>
  <Attachment className="w-64">
    <AttachmentMedia><FileCodeIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>renderer.tsx</AttachmentTitle>
      <AttachmentDescription>TSX · 12 KB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Remove renderer.tsx"><XIcon /></AttachmentAction>
    </AttachmentActions>
  </Attachment>
</AttachmentGroup>`,
      preview: React.createElement(
        AttachmentGroup,
        { className: "w-full max-w-sm" },
        ...(
          [
            {
              icon: FileTextIcon as React.ComponentType,
              name: "briefing-notes.pdf",
              meta: "PDF · 1.4 MB",
            },
            {
              src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
              name: "workspace.png",
              meta: "PNG · 820 KB",
            },
            {
              icon: TableIcon as React.ComponentType,
              name: "customers.csv",
              meta: "CSV · 18 KB",
            },
            {
              icon: FileCodeIcon as React.ComponentType,
              name: "renderer.tsx",
              meta: "TSX · 12 KB",
            },
          ] as Array<{
            icon?: React.ComponentType;
            src?: string;
            name: string;
            meta: string;
          }>
        ).map(({ icon: Icon, src, name, meta }) =>
          React.createElement(
            Attachment,
            { key: name, className: "w-64" },
            src
              ? React.createElement(
                  AttachmentMedia,
                  { variant: "image" },
                  React.createElement("img", { src, alt: name })
                )
              : React.createElement(
                  AttachmentMedia,
                  null,
                  Icon ? React.createElement(Icon) : null
                ),
            React.createElement(
              AttachmentContent,
              null,
              React.createElement(AttachmentTitle, null, name),
              React.createElement(AttachmentDescription, null, meta)
            ),
            React.createElement(
              AttachmentActions,
              null,
              React.createElement(
                AttachmentAction,
                { "aria-label": `Remove ${name}` },
                React.createElement(XIcon)
              )
            )
          )
        )
      ),
    },

    // ── Trigger ────────────────────────────────────────────────────────────
    {
      name: "Trigger",
      description:
        "Add an `AttachmentTrigger` to make the whole card open a link or dialog. It fills the card behind the actions so they stay independently clickable.",
      code: `<Dialog>
  <Attachment className="w-full">
    <AttachmentMedia><FileSearchIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>research-summary.pdf</AttachmentTitle>
      <AttachmentDescription>Open preview dialog</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Copy link"><CopyIcon /></AttachmentAction>
      <AttachmentAction aria-label="Remove research-summary.pdf"><XIcon /></AttachmentAction>
    </AttachmentActions>
    <DialogTrigger
      render={<AttachmentTrigger aria-label="Preview research-summary.pdf" />}
    />
  </Attachment>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>research-summary.pdf</DialogTitle>
      <DialogDescription>
        The trigger fills the card and opens the dialog, while actions stay independently clickable.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
      preview: React.createElement(
        Dialog,
        null,
        React.createElement(
          Attachment,
          { className: "w-full max-w-sm" },
          React.createElement(
            AttachmentMedia,
            null,
            React.createElement(FileSearchIcon)
          ),
          React.createElement(
            AttachmentContent,
            null,
            React.createElement(AttachmentTitle, null, "research-summary.pdf"),
            React.createElement(
              AttachmentDescription,
              null,
              "Open preview dialog"
            )
          ),
          React.createElement(
            AttachmentActions,
            null,
            React.createElement(
              AttachmentAction,
              { "aria-label": "Copy link" },
              React.createElement(CopyIcon)
            ),
            React.createElement(
              AttachmentAction,
              { "aria-label": "Remove research-summary.pdf" },
              React.createElement(XIcon)
            )
          ),
          React.createElement(DialogTrigger, {
            render: React.createElement(AttachmentTrigger, {
              "aria-label": "Preview research-summary.pdf",
            }),
          })
        ),
        React.createElement(
          DialogContent,
          { className: "sm:max-w-md" },
          React.createElement(
            DialogHeader,
            null,
            React.createElement(DialogTitle, null, "research-summary.pdf"),
            React.createElement(
              DialogDescription,
              null,
              "The trigger fills the card and opens the dialog, while actions stay independently clickable."
            )
          )
        )
      ),
    },
  ],

  props: [
    {
      name: "state",
      type: '"idle" | "uploading" | "processing" | "error" | "done"',
      default: '"done"',
      description:
        "The upload state on Attachment. Drives styling and the shimmer on the title.",
    },
    {
      name: "size",
      type: '"default" | "sm" | "xs"',
      default: '"default"',
      description: "The attachment size. Apply on Attachment.",
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description:
        "Lay the media beside or above the content. Apply on Attachment.",
    },
    {
      name: "variant",
      type: '"icon" | "image"',
      default: '"icon"',
      description:
        "Whether AttachmentMedia holds an icon or an <img>. Apply on AttachmentMedia.",
    },
    {
      name: "AttachmentAction size",
      type: 'Button["size"]',
      default: '"icon-xs"',
      description: "The button size for AttachmentAction.",
    },
    {
      name: "AttachmentTrigger render",
      type: "ReactElement | function",
      default: "-",
      description:
        "Render AttachmentTrigger as a different element, such as a link or DialogTrigger.",
    },
  ],
};
