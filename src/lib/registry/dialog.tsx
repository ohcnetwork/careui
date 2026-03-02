import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const loremParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

export const dialogDoc: ComponentDoc = {
  id: "dialog",
  name: "Dialog",
  description:
    "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
  installation: {
    cli: "npx shadcn@latest add dialog",
    manual: "Install radix-ui and copy the dialog component source code.",
  },
  usage: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
  preview: {
    code: `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}`,
    component: React.createElement(
      Dialog,
      {},
      React.createElement(
        "form",
        {},
        React.createElement(
          DialogTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Open Dialog")
        ),
        React.createElement(
          DialogContent,
          { className: "sm:max-w-sm" },
          React.createElement(
            DialogHeader,
            {},
            React.createElement(DialogTitle, {}, "Edit profile"),
            React.createElement(
              DialogDescription,
              {},
              "Make changes to your profile here. Click save when you're done."
            )
          ),
          React.createElement(
            FieldGroup,
            {},
            React.createElement(
              Field,
              {},
              React.createElement(Label, { htmlFor: "name-1" }, "Name"),
              React.createElement(Input, {
                id: "name-1",
                name: "name",
                defaultValue: "Pedro Duarte",
              })
            ),
            React.createElement(
              Field,
              {},
              React.createElement(Label, { htmlFor: "username-1" }, "Username"),
              React.createElement(Input, {
                id: "username-1",
                name: "username",
                defaultValue: "@peduarte",
              })
            )
          ),
          React.createElement(
            DialogFooter,
            {},
            React.createElement(
              DialogClose,
              { asChild: true },
              React.createElement(Button, { variant: "outline" }, "Cancel")
            ),
            React.createElement(Button, { type: "submit" }, "Save changes")
          )
        )
      )
    ),
  },
  examples: [
    // ── Custom Close Button ────────────────────────────────────────────────
    {
      name: "Custom Close Button",
      description: "Replace the default close control with your own button.",
      code: `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
      preview: React.createElement(
        Dialog,
        {},
        React.createElement(
          DialogTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Share")
        ),
        React.createElement(
          DialogContent,
          { className: "sm:max-w-md" },
          React.createElement(
            DialogHeader,
            {},
            React.createElement(DialogTitle, {}, "Share link"),
            React.createElement(
              DialogDescription,
              {},
              "Anyone who has this link will be able to view this."
            )
          ),
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement(
              "div",
              { className: "grid flex-1 gap-2" },
              React.createElement(
                Label,
                { htmlFor: "link", className: "sr-only" },
                "Link"
              ),
              React.createElement(Input, {
                id: "link",
                defaultValue: "https://ui.shadcn.com/docs/installation",
                readOnly: true,
              })
            )
          ),
          React.createElement(
            DialogFooter,
            { className: "sm:justify-start" },
            React.createElement(
              DialogClose,
              { asChild: true },
              React.createElement(Button, { type: "button" }, "Close")
            )
          )
        )
      ),
    },

    // ── No Close Button ────────────────────────────────────────────────────
    {
      name: "No Close Button",
      description: "Use `showCloseButton={false}` to hide the close button.",
      code: `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogNoCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">No Close Button</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn&apos;t have a close button in the top-right
            corner.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}`,
      preview: React.createElement(
        Dialog,
        {},
        React.createElement(
          DialogTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "outline" },
            "No Close Button"
          )
        ),
        React.createElement(
          DialogContent,
          { showCloseButton: false },
          React.createElement(
            DialogHeader,
            {},
            React.createElement(DialogTitle, {}, "No Close Button"),
            React.createElement(
              DialogDescription,
              {},
              "This dialog doesn't have a close button in the top-right corner."
            )
          )
        )
      ),
    },

    // ── Sticky Footer ──────────────────────────────────────────────────────
    {
      name: "Sticky Footer",
      description: "Keep actions visible while the content scrolls.",
      code: `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogStickyFooter() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sticky Footer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            This dialog has a sticky footer that stays visible while the content
            scrolls.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
      preview: React.createElement(
        Dialog,
        {},
        React.createElement(
          DialogTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Sticky Footer")
        ),
        React.createElement(
          DialogContent,
          {},
          React.createElement(
            DialogHeader,
            {},
            React.createElement(DialogTitle, {}, "Sticky Footer"),
            React.createElement(
              DialogDescription,
              {},
              "This dialog has a sticky footer that stays visible while the content scrolls."
            )
          ),
          React.createElement(
            "div",
            {
              className:
                "-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4",
            },
            ...Array.from({ length: 10 }, (_, i) =>
              React.createElement(
                "p",
                { key: i, className: "mb-4 leading-normal" },
                loremParagraph
              )
            )
          ),
          React.createElement(
            DialogFooter,
            {},
            React.createElement(
              DialogClose,
              { asChild: true },
              React.createElement(Button, { variant: "outline" }, "Close")
            )
          )
        )
      ),
    },

    // ── Scrollable Content ─────────────────────────────────────────────────
    {
      name: "Scrollable Content",
      description: "Long content can scroll while the header stays in view.",
      code: `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogScrollableContent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Scrollable Content</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>
            This is a dialog with scrollable content.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}`,
      preview: React.createElement(
        Dialog,
        {},
        React.createElement(
          DialogTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "outline" },
            "Scrollable Content"
          )
        ),
        React.createElement(
          DialogContent,
          {},
          React.createElement(
            DialogHeader,
            {},
            React.createElement(DialogTitle, {}, "Scrollable Content"),
            React.createElement(
              DialogDescription,
              {},
              "This is a dialog with scrollable content."
            )
          ),
          React.createElement(
            "div",
            {
              className:
                "-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4",
            },
            ...Array.from({ length: 10 }, (_, i) =>
              React.createElement(
                "p",
                { key: i, className: "mb-4 leading-normal" },
                loremParagraph
              )
            )
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "open",
      type: "boolean",
      description: "The controlled open state of the dialog.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Event handler called when the open state changes.",
    },
    {
      name: "modal",
      type: "boolean",
      description: "The modality of the dialog.",
      default: "true",
    },
  ],
};
