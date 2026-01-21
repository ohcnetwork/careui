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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const dialogDoc: ComponentDoc = {
  id: "dialog",
  name: "Dialog",
  description:
    "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
  installation: {
    cli: "npx shadcn@latest add dialog",
    manual:
      "Install @radix-ui/react-dialog and copy the dialog component source code.",
  },
  usage: `import { Button } from "@/components/ui/button"
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

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
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
  preview: {
    code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
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
    component: React.createElement(
      Dialog,
      {},
      React.createElement(
        DialogTrigger,
        { asChild: true },
        React.createElement(Button, { variant: "outline" }, "Open Dialog")
      ),
      React.createElement(
        DialogContent,
        {},
        React.createElement(
          DialogHeader,
          {},
          React.createElement(DialogTitle, {}, "Are you absolutely sure?"),
          React.createElement(
            DialogDescription,
            {},
            "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
          )
        )
      )
    ),
  },
  examples: [
    {
      name: "Edit Profile Dialog",
      description: "A form dialog for editing user profile information.",
      code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Pedro Duarte" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@peduarte" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      preview: React.createElement(
        Dialog,
        {},
        React.createElement(
          DialogTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Edit Profile")
        ),
        React.createElement(
          DialogContent,
          { className: "sm:max-w-[425px]" },
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
            "div",
            { className: "grid gap-4" },
            React.createElement(
              "div",
              { className: "grid gap-3" },
              React.createElement(Label, { htmlFor: "name" }, "Name"),
              React.createElement(Input, {
                id: "name",
                defaultValue: "Pedro Duarte",
              })
            ),
            React.createElement(
              "div",
              { className: "grid gap-3" },
              React.createElement(Label, { htmlFor: "username" }, "Username"),
              React.createElement(Input, {
                id: "username",
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
      ),
    },
    {
      name: "Share Link Dialog",
      description: "A dialog for sharing links with custom close button.",
      code: `<Dialog>
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
        <Button type="button" variant="secondary">
          Close
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
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
              React.createElement(
                Button,
                { type: "button", variant: "secondary" },
                "Close"
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
