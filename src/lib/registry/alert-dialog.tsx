import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  BluetoothIcon,
  CircleFadingPlusIcon,
  Trash2Icon,
} from "lucide-react";

export const alertDialogDoc: ComponentDoc = {
  id: "alert-dialog",
  name: "Alert Dialog",
  description:
    "A modal dialog that interrupts the user with important content and expects a response.",
  installation: {
    cli: "npx shadcn@latest add alert-dialog",
    manual: `Install the following dependencies:

\`\`\`bash
npm install radix-ui
\`\`\`

Copy and paste the following code into your project:
components/ui/alert-dialog.tsx

Update the import paths to match your project setup.`,
  },
  usage: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
  preview: {
    code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    component: React.createElement(
      AlertDialog,
      {},
      React.createElement(
        AlertDialogTrigger,
        { asChild: true },
        React.createElement(Button, { variant: "outline" }, "Show Dialog")
      ),
      React.createElement(
        AlertDialogContent,
        {},
        React.createElement(
          AlertDialogHeader,
          {},
          React.createElement(
            AlertDialogTitle,
            {},
            "Are you absolutely sure?"
          ),
          React.createElement(
            AlertDialogDescription,
            {},
            "This action cannot be undone. This will permanently delete your account from our servers."
          )
        ),
        React.createElement(
          AlertDialogFooter,
          {},
          React.createElement(AlertDialogCancel, {}, "Cancel"),
          React.createElement(AlertDialogAction, {}, "Continue")
        )
      )
    ),
  },
  examples: [
    {
      name: "Basic",
      description:
        "A basic alert dialog with a title, description, and cancel and continue buttons.",
      code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      preview: React.createElement(
        AlertDialog,
        {},
        React.createElement(
          AlertDialogTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Show Dialog")
        ),
        React.createElement(
          AlertDialogContent,
          {},
          React.createElement(
            AlertDialogHeader,
            {},
            React.createElement(
              AlertDialogTitle,
              {},
              "Are you absolutely sure?"
            ),
            React.createElement(
              AlertDialogDescription,
              {},
              "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            )
          ),
          React.createElement(
            AlertDialogFooter,
            {},
            React.createElement(AlertDialogCancel, {}, "Cancel"),
            React.createElement(AlertDialogAction, {}, "Continue")
          )
        )
      ),
    },
    {
      name: "Small",
      description:
        'Use the `size="sm"` prop to make the alert dialog smaller.',
      code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
      <AlertDialogDescription>
        Do you want to allow the USB accessory to connect to this device?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Don't allow</AlertDialogCancel>
      <AlertDialogAction>Allow</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      preview: React.createElement(
        AlertDialog,
        {},
        React.createElement(
          AlertDialogTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Show Dialog")
        ),
        React.createElement(
          AlertDialogContent,
          { size: "sm" },
          React.createElement(
            AlertDialogHeader,
            {},
            React.createElement(
              AlertDialogTitle,
              {},
              "Allow accessory to connect?"
            ),
            React.createElement(
              AlertDialogDescription,
              {},
              "Do you want to allow the USB accessory to connect to this device?"
            )
          ),
          React.createElement(
            AlertDialogFooter,
            {},
            React.createElement(AlertDialogCancel, {}, "Don't allow"),
            React.createElement(AlertDialogAction, {}, "Allow")
          )
        )
      ),
    },
    {
      name: "Media",
      description:
        "Use the `AlertDialogMedia` component to add a media element such as an icon or image to the alert dialog.",
      code: `import { CircleFadingPlusIcon } from "lucide-react"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Share Project</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogMedia>
        <CircleFadingPlusIcon />
      </AlertDialogMedia>
      <AlertDialogTitle>Share this project?</AlertDialogTitle>
      <AlertDialogDescription>
        Anyone with the link will be able to view and edit this project.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Share</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      preview: React.createElement(
        AlertDialog,
        {},
        React.createElement(
          AlertDialogTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Share Project")
        ),
        React.createElement(
          AlertDialogContent,
          {},
          React.createElement(
            AlertDialogHeader,
            {},
            React.createElement(
              AlertDialogMedia,
              {},
              React.createElement(CircleFadingPlusIcon, {})
            ),
            React.createElement(
              AlertDialogTitle,
              {},
              "Share this project?"
            ),
            React.createElement(
              AlertDialogDescription,
              {},
              "Anyone with the link will be able to view and edit this project."
            )
          ),
          React.createElement(
            AlertDialogFooter,
            {},
            React.createElement(AlertDialogCancel, {}, "Cancel"),
            React.createElement(AlertDialogAction, {}, "Share")
          )
        )
      ),
    },
    {
      name: "Small with Media",
      description:
        'Use the `size="sm"` prop to make the alert dialog smaller and the `AlertDialogMedia` component to add a media element such as an icon or image to the alert dialog.',
      code: `import { BluetoothIcon } from "lucide-react"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogMedia>
        <BluetoothIcon />
      </AlertDialogMedia>
      <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
      <AlertDialogDescription>
        Do you want to allow the USB accessory to connect to this device?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Don't allow</AlertDialogCancel>
      <AlertDialogAction>Allow</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      preview: React.createElement(
        AlertDialog,
        {},
        React.createElement(
          AlertDialogTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Show Dialog")
        ),
        React.createElement(
          AlertDialogContent,
          { size: "sm" },
          React.createElement(
            AlertDialogHeader,
            {},
            React.createElement(
              AlertDialogMedia,
              {},
              React.createElement(BluetoothIcon, {})
            ),
            React.createElement(
              AlertDialogTitle,
              {},
              "Allow accessory to connect?"
            ),
            React.createElement(
              AlertDialogDescription,
              {},
              "Do you want to allow the USB accessory to connect to this device?"
            )
          ),
          React.createElement(
            AlertDialogFooter,
            {},
            React.createElement(AlertDialogCancel, {}, "Don't allow"),
            React.createElement(AlertDialogAction, {}, "Allow")
          )
        )
      ),
    },
    {
      name: "Destructive",
      description:
        "Use the `AlertDialogAction` component to add a destructive action button to the alert dialog.",
      code: `import { Trash2Icon } from "lucide-react"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Chat</Button>
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
        <Trash2Icon />
      </AlertDialogMedia>
      <AlertDialogTitle>Delete chat?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete this chat conversation.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      preview: React.createElement(
        AlertDialog,
        {},
        React.createElement(
          AlertDialogTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "destructive" },
            "Delete Chat"
          )
        ),
        React.createElement(
          AlertDialogContent,
          { size: "sm" },
          React.createElement(
            AlertDialogHeader,
            {},
            React.createElement(
              AlertDialogMedia,
              {
                className:
                  "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive",
              },
              React.createElement(Trash2Icon, {})
            ),
            React.createElement(AlertDialogTitle, {}, "Delete chat?"),
            React.createElement(
              AlertDialogDescription,
              {},
              "This will permanently delete this chat conversation."
            )
          ),
          React.createElement(
            AlertDialogFooter,
            {},
            React.createElement(
              AlertDialogCancel,
              { variant: "outline" },
              "Cancel"
            ),
            React.createElement(
              AlertDialogAction,
              { variant: "destructive" },
              "Delete"
            )
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "size",
      type: '"default" | "sm"',
      description:
        'Controls the size of the alert dialog. Apply on `AlertDialogContent`.',
      default: '"default"',
    },
  ],
};
