import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Alert, AlertAction, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, AlertTriangleIcon, BellIcon, CheckCircle2Icon, InfoIcon } from "lucide-react";
import { Frame, FramePanel } from "@/components/ui/frame";
import { Separator } from "@/components/ui/separator";

export const alertDoc: ComponentDoc = {
  id: "alert",
  name: "Alert",
  description: "Displays a callout for user attention.",
  installation: {
    cli: "npx shadcn@latest add alert",
    manual: "Copy and paste the alert component source code into your project.",
  },
  usage: `import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

<Alert>
  <InfoIcon />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline">Enable</Button>
  </AlertAction>
</Alert>`,
  preview: {
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon, InfoIcon } from "lucide-react"

export function AlertDemo() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to
          your email address.
        </AlertDescription>
      </Alert>
      <Alert>
        <InfoIcon />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We've added dark mode support. You can enable it in your account
          settings.
        </AlertDescription>
      </Alert>
    </div>
  )
}`,
    component: React.createElement(
      "div",
      { className: "grid w-full max-w-md items-start gap-4" },
      React.createElement(
        Alert,
        {},
        React.createElement(CheckCircle2Icon),
        React.createElement(AlertTitle, {}, "Payment successful"),
        React.createElement(
          AlertDescription,
          {},
          "Your payment of $29.99 has been processed. A receipt has been sent to your email address."
        )
      ),
      React.createElement(
        Alert,
        {},
        React.createElement(InfoIcon),
        React.createElement(AlertTitle, {}, "New feature available"),
        React.createElement(
          AlertDescription,
          {},
          "We've added dark mode support. You can enable it in your account settings."
        )
      )
    ),
  },

  examples: [
    // ── Basic ──────────────────────────────────────────────────────────────
    {
      name: "Basic",
      description: "A basic alert with an icon, title and description.",
      code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"

export function AlertBasic() {
  return (
    <Alert className="max-w-md">
      <CheckCircle2Icon />
      <AlertTitle>Account updated successfully</AlertTitle>
      <AlertDescription>
        Your profile information has been saved. Changes will be reflected
        immediately.
      </AlertDescription>
    </Alert>
  )
}`,
      preview: React.createElement(
        Alert,
        { className: "max-w-md" },
        React.createElement(CheckCircle2Icon),
        React.createElement(AlertTitle, {}, "Account updated successfully"),
        React.createElement(
          AlertDescription,
          {},
          "Your profile information has been saved. Changes will be reflected immediately."
        )
      ),
    },

    // ── Destructive ────────────────────────────────────────────────────────
    {
      name: "Destructive",
      description: 'Use variant="destructive" to create a destructive alert.',
      code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

export function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Please check your payment method
        and try again.
      </AlertDescription>
    </Alert>
  )
}`,
      preview: React.createElement(
        Alert,
        { variant: "destructive", className: "max-w-md" },
        React.createElement(AlertCircleIcon),
        React.createElement(AlertTitle, {}, "Payment failed"),
        React.createElement(
          AlertDescription,
          {},
          "Your payment could not be processed. Please check your payment method and try again."
        )
      ),
    },

    // ── Action ─────────────────────────────────────────────────────────────
    {
      name: "Action",
      description:
        "Use AlertAction to add a button or other action element to the alert.",
      code: `import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function AlertActionExample() {
  return (
    <Alert className="max-w-md">
      <AlertTitle>Dark mode is now available</AlertTitle>
      <AlertDescription>
        Enable it under your profile settings to get started.
      </AlertDescription>
      <AlertAction>
        <Button size="xs" variant="default">
          Enable
        </Button>
      </AlertAction>
    </Alert>
  )
}`,
      preview: React.createElement(
        Alert,
        { className: "max-w-md" },
        React.createElement(AlertTitle, {}, "Dark mode is now available"),
        React.createElement(
          AlertDescription,
          {},
          "Enable it under your profile settings to get started."
        ),
        React.createElement(
          AlertAction,
          {},
          React.createElement(Button, { size: "xs" as never, variant: "default" }, "Enable")
        )
      ),
    },

    // ── Custom Colors ──────────────────────────────────────────────────────
    {
      name: "Custom Colors",
      description:
        "Customize the alert colors by adding custom classes such as bg-amber-50 dark:bg-amber-950 to the Alert component.",
      code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangleIcon } from "lucide-react"

export function AlertColors() {
  return (
    <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
      <AlertTriangleIcon />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription>
        Renew now to avoid service interruption or upgrade to a paid plan to
        continue using the service.
      </AlertDescription>
    </Alert>
  )
}`,
      preview: React.createElement(
        Alert,
        {
          className:
            "max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50",
        },
        React.createElement(AlertTriangleIcon),
        React.createElement(AlertTitle, {}, "Your subscription will expire in 3 days."),
        React.createElement(
          AlertDescription,
          {},
          "Renew now to avoid service interruption or upgrade to a paid plan to continue using the service."
        )
      ),
    },

    // ── Vertical Layout ────────────────────────────────────────────────────
    {
      name: "Vertical Layout",
      description:
        "Default layout with action buttons stacked below the content.",
      code: `import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"

export function AlertVertical() {
  return (
    <Alert className="max-w-md">
      <InfoIcon />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version of the app is available. Update now to get the latest
        features and bug fixes.
      </AlertDescription>
      <AlertAction>
        <Button size="xs" variant="default">Update now</Button>
        <Button size="xs" variant="ghost">Dismiss</Button>
      </AlertAction>
    </Alert>
  )
}`,
      preview: React.createElement(
        Alert,
        { className: "max-w-md" },
        React.createElement(InfoIcon),
        React.createElement(AlertTitle, {}, "Update available"),
        React.createElement(
          AlertDescription,
          {},
          "A new version of the app is available. Update now to get the latest features and bug fixes."
        ),
        React.createElement(
          AlertAction,
          {},
          React.createElement(Button, { size: "xs" as never, variant: "default" }, "Update now"),
          React.createElement(Button, { size: "xs" as never, variant: "ghost" }, "Dismiss")
        )
      ),
    },

    // ── Horizontal Layout ──────────────────────────────────────────────────
    {
      name: "Horizontal Layout",
      description:
        'Use layout="horizontal" to place action buttons inline to the right of the content.',
      code: `import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"

export function AlertHorizontal() {
  return (
    <Alert layout="horizontal" className="max-w-xl">
      <InfoIcon />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version of the app is ready to install.
      </AlertDescription>
      <AlertAction>
        <Button size="xs" variant="ghost">Dismiss</Button>
        <Button size="xs" variant="default">Update now</Button>
      </AlertAction>
    </Alert>
  )
}`,
      preview: React.createElement(
        Alert,
        { layout: "horizontal" as never, className: "max-w-xl" },
        React.createElement(InfoIcon),
        React.createElement(AlertTitle, {}, "Update available"),
        React.createElement(
          AlertDescription,
          {},
          "A new version of the app is ready to install."
        ),
        React.createElement(
          AlertAction,
          {},
          React.createElement(Button, { size: "xs" as never, variant: "ghost" }, "Dismiss"),
          React.createElement(Button, { size: "xs" as never, variant: "default" }, "Update now")

        )
      ),
    },

    // ── In Frame ───────────────────────────────────────────────────────────
    {
      name: "In Frame",
      description:
        "Embed an Alert inside a Frame panel by removing its border and shadow — the Frame provides the visual chrome.",
      code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Frame, FramePanel } from "@/components/ui/frame"
import { InfoIcon } from "lucide-react"

export function AlertInFrame() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="overflow-hidden p-0!">
          <Alert className="border-0 shadow-none rounded-none">
            <InfoIcon className="text-destructive" />
            <AlertTitle>System Update</AlertTitle>
            <AlertDescription>
              A new system update is available. Please restart your
              application to apply the changes.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "mx-auto w-full max-w-lg" },
        React.createElement(
          Frame,
          {},
          React.createElement(
            FramePanel,
            { className: "overflow-hidden p-0!" },
            React.createElement(
              Alert,
              { className: "border-0 shadow-none rounded-none" },
              React.createElement(InfoIcon, { className: "text-destructive" }),
              React.createElement(AlertTitle, {}, "System Update"),
              React.createElement(
                AlertDescription,
                {},
                "A new system update is available. Please restart your application to apply the changes."
              )
            )
          )
        )
      ),
    },

    // ── Stacked in Frame ───────────────────────────────────────────────────
    {
      name: "Stacked in Frame",
      description:
        "Stack multiple alerts inside a Frame, separating them with a divider line — each alert removes its border and shadow so the Frame provides the visual chrome.",
      code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Frame, FramePanel } from "@/components/ui/frame"
import { Separator } from "@/components/ui/separator"
import { AlertCircleIcon, CheckCircle2Icon, AlertTriangleIcon } from "lucide-react"

export function AlertStackedInFrame() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="overflow-hidden p-0!">
          <Alert className="border-0 shadow-none rounded-none">
            <CheckCircle2Icon />
            <AlertTitle>Deployment successful</AlertTitle>
            <AlertDescription>
              Your changes are live and propagating across all regions.
            </AlertDescription>
          </Alert>
          <Separator />
          <Alert className="border-0 shadow-none rounded-none">
            <AlertTriangleIcon />
            <AlertTitle>Subscription expiring soon</AlertTitle>
            <AlertDescription>
              Your plan renews in 3 days. Update your billing info to avoid interruption.
            </AlertDescription>
          </Alert>
          <Separator />
          <Alert className="border-0 shadow-none rounded-none" variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Payment failed</AlertTitle>
            <AlertDescription>
              Your payment could not be processed. Please check your payment method.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "mx-auto w-full max-w-lg" },
        React.createElement(
          Frame,
          {},
          React.createElement(
            FramePanel,
            { className: "overflow-hidden p-0!" },
            React.createElement(
              Alert,
              { className: "border-0 shadow-none rounded-none" },
              React.createElement(CheckCircle2Icon),
              React.createElement(AlertTitle, {}, "Deployment successful"),
              React.createElement(
                AlertDescription,
                {},
                "Your changes are live and propagating across all regions."
              )
            ),
            React.createElement(Separator),
            React.createElement(
              Alert,
              { className: "border-0 shadow-none rounded-none" },
              React.createElement(AlertTriangleIcon),
              React.createElement(AlertTitle, {}, "Subscription expiring soon"),
              React.createElement(
                AlertDescription,
                {},
                "Your plan renews in 3 days. Update your billing info to avoid interruption."
              )
            ),
            React.createElement(Separator),
            React.createElement(
              Alert,
              { variant: "destructive", className: "border-0 shadow-none rounded-none" },
              React.createElement(AlertCircleIcon),
              React.createElement(AlertTitle, {}, "Payment failed"),
              React.createElement(
                AlertDescription,
                {},
                "Your payment could not be processed. Please check your payment method."
              )
            )
          )
        )
      ),
    },

    // ── Invert in Frame ────────────────────────────────────────────────────
    {
      name: "Invert in Frame",
      description:
        'Use variant="invert" inside a Frame for a high-contrast banner — remove the alert\'s border and shadow so the Frame provides the visual chrome.',
      code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Frame, FramePanel } from "@/components/ui/frame"
import { BellIcon } from "lucide-react"

export function AlertInvertInFrame() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="overflow-hidden p-0!">
          <Alert variant="invert" className="border-0 shadow-none rounded-none">
            <BellIcon />
            <AlertTitle>New message received</AlertTitle>
            <AlertDescription>
              You have an unread message from your team.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "mx-auto w-full max-w-lg" },
        React.createElement(
          Frame,
          {},
          React.createElement(
            FramePanel,
            { className: "overflow-hidden p-0!" },
            React.createElement(
              Alert,
              { variant: "invert" as never, className: "border-0 shadow-none rounded-none" },
              React.createElement(BellIcon),
              React.createElement(AlertTitle, {}, "New message received"),
              React.createElement(
                AlertDescription,
                {},
                "You have an unread message from your team."
              )
            )
          )
        )
      ),
    },

    // ── Info ───────────────────────────────────────────────────────────────
    {
      name: "Info",
      description: 'Use variant="info" for informational messages and notices.',
      code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function AlertInfo() {
  return (
    <Alert variant="info" className="max-w-md">
      <InfoIcon />
      <AlertTitle>Scheduled maintenance</AlertTitle>
      <AlertDescription>
        The service will be unavailable on Sunday from 2–4 AM UTC.
      </AlertDescription>
    </Alert>
  )
}`,
      preview: React.createElement(
        Alert,
        { variant: "info" as never, className: "max-w-md" },
        React.createElement(InfoIcon),
        React.createElement(AlertTitle, {}, "Scheduled maintenance"),
        React.createElement(
          AlertDescription,
          {},
          "The service will be unavailable on Sunday from 2\u20134 AM UTC."
        )
      ),
    },

    // ── Success ────────────────────────────────────────────────────────────
    {
      name: "Success",
      description: 'Use variant="success" to confirm a successful action.',
      code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"

export function AlertSuccess() {
  return (
    <Alert variant="success" className="max-w-md">
      <CheckCircle2Icon />
      <AlertTitle>Deployment successful</AlertTitle>
      <AlertDescription>
        Your changes are live. It may take a few minutes to propagate.
      </AlertDescription>
    </Alert>
  )
}`,
      preview: React.createElement(
        Alert,
        { variant: "success" as never, className: "max-w-md" },
        React.createElement(CheckCircle2Icon),
        React.createElement(AlertTitle, {}, "Deployment successful"),
        React.createElement(
          AlertDescription,
          {},
          "Your changes are live. It may take a few minutes to propagate."
        )
      ),
    },

    // ── Warning ────────────────────────────────────────────────────────────
    {
      name: "Warning",
      description: 'Use variant="warning" to highlight a potential issue or risk.',
      code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangleIcon } from "lucide-react"

export function AlertWarning() {
  return (
    <Alert variant="warning" className="max-w-md">
      <AlertTriangleIcon />
      <AlertTitle>Subscription expiring soon</AlertTitle>
      <AlertDescription>
        Your plan renews in 3 days. Update your billing info to avoid
        interruption.
      </AlertDescription>
    </Alert>
  )
}`,
      preview: React.createElement(
        Alert,
        { variant: "warning" as never, className: "max-w-md" },
        React.createElement(AlertTriangleIcon),
        React.createElement(AlertTitle, {}, "Subscription expiring soon"),
        React.createElement(
          AlertDescription,
          {},
          "Your plan renews in 3 days. Update your billing info to avoid interruption."
        )
      ),
    },

    // ── Invert ─────────────────────────────────────────────────────────────
    {
      name: "Invert",
      description:
        'Use variant="invert" for a high-contrast alert with an inverted foreground/background.',
      code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BellIcon } from "lucide-react"

export function AlertInvert() {
  return (
    <Alert variant="invert" className="max-w-md">
      <BellIcon />
      <AlertTitle>New message received</AlertTitle>
      <AlertDescription>
        You have an unread message from your team.
      </AlertDescription>
    </Alert>
  )
}`,
      preview: React.createElement(
        Alert,
        { variant: "invert" as never, className: "max-w-md" },
        React.createElement(BellIcon),
        React.createElement(AlertTitle, {}, "New message received"),
        React.createElement(
          AlertDescription,
          {},
          "You have an unread message from your team."
        )
      ),
    },
  ],
};
