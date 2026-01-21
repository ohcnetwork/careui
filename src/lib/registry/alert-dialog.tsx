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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const alertDialogDoc: ComponentDoc = {
  id: "alert-dialog",
  name: "Alert Dialog",
  description:
    "A modal dialog that interrupts the user with important content and expects a response.",
  installation: {
    cli: "npx shadcn@latest add alert-dialog",
    manual:
      "Copy and paste the alert dialog component source code into your project.",
  },
  usage: `import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from "@/components/ui/alert-dialog"`,
  preview: {
    code: `<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
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
        React.createElement(Button, { variant: "outline" }, "Open")
      ),
      React.createElement(
        AlertDialogContent,
        {},
        React.createElement(
          AlertDialogHeader,
          {},
          React.createElement(AlertDialogTitle, {}, "Are you absolutely sure?"),
          React.createElement(
            AlertDialogDescription,
            {},
            "This action cannot be undone. This will permanently delete your data."
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
};
