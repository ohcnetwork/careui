import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Frame, FramePanel } from "@/components/ui/frame";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, AlertTriangleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react";

export const frameDoc: ComponentDoc = {
  id: "frame",
  name: "Frame",
  description:
    "A visual chrome container that wraps UI panels with a structured border, background, and shadow.",
  installation: {
    cli: "npx shadcn@latest add frame",
    manual: "Copy and paste the frame component source code into your project.",
  },
  usage: `import { Frame, FramePanel } from "@/components/ui/frame"

<Frame>
  <FramePanel>
    Content goes here
  </FramePanel>
</Frame>`,
  preview: {
    code: `import { Frame, FramePanel } from "@/components/ui/frame"

export function FrameDemo() {
  return (
    <Frame className="w-full max-w-sm">
      <FramePanel className="p-4">
        <p className="text-sm text-muted-foreground">Panel content goes here.</p>
      </FramePanel>
    </Frame>
  )
}`,
    component: React.createElement(
      Frame,
      { className: "w-full max-w-sm" },
      React.createElement(
        FramePanel,
        { className: "p-4" },
        React.createElement(
          "p",
          { className: "text-sm text-muted-foreground" },
          "Panel content goes here."
        )
      )
    ),
  },
  examples: [
    // ── Stacked Alerts ────────────────────────────────────────────────────
    {
      name: "Stacked Alerts",
      description:
        "Multiple Alert panels stacked inside a Frame. Each panel removes its own border and rounded corners so the Frame provides the outer chrome.",
      code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Frame, FramePanel } from "@/components/ui/frame"
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
} from "lucide-react"

export function FrameStackedAlerts() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="overflow-hidden p-0!">
          <Alert variant="info" className="rounded-none border-0 shadow-none">
            <InfoIcon />
            <AlertTitle>Scheduled maintenance</AlertTitle>
            <AlertDescription>
              The service will be unavailable on Sunday from 2\u20134\u00a0AM UTC.
            </AlertDescription>
          </Alert>
        </FramePanel>
        <FramePanel className="overflow-hidden p-0!">
          <Alert variant="success" className="rounded-none border-0 shadow-none">
            <CheckCircle2Icon />
            <AlertTitle>Deployment successful</AlertTitle>
            <AlertDescription>
              Your changes are live. It may take a few minutes to propagate.
            </AlertDescription>
          </Alert>
        </FramePanel>
        <FramePanel className="overflow-hidden p-0!">
          <Alert variant="warning" className="rounded-none border-0 shadow-none">
            <AlertTriangleIcon />
            <AlertTitle>Subscription expiring soon</AlertTitle>
            <AlertDescription>
              Your plan renews in 3 days. Update your billing info to avoid
              interruption.
            </AlertDescription>
          </Alert>
        </FramePanel>
        <FramePanel className="overflow-hidden p-0!">
          <Alert variant="destructive" className="rounded-none border-0 shadow-none">
            <AlertCircleIcon />
            <AlertTitle>Payment failed</AlertTitle>
            <AlertDescription>
              We could not charge your card. Please update your payment method.
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
              { variant: "info" as never, className: "rounded-none border-0 shadow-none" },
              React.createElement(InfoIcon),
              React.createElement(AlertTitle, {}, "Scheduled maintenance"),
              React.createElement(
                AlertDescription,
                {},
                "The service will be unavailable on Sunday from 2\u20134\u00a0AM UTC."
              )
            )
          ),
          React.createElement(
            FramePanel,
            { className: "overflow-hidden p-0!" },
            React.createElement(
              Alert,
              { variant: "success" as never, className: "rounded-none border-0 shadow-none" },
              React.createElement(CheckCircle2Icon),
              React.createElement(AlertTitle, {}, "Deployment successful"),
              React.createElement(
                AlertDescription,
                {},
                "Your changes are live. It may take a few minutes to propagate."
              )
            )
          ),
          React.createElement(
            FramePanel,
            { className: "overflow-hidden p-0!" },
            React.createElement(
              Alert,
              { variant: "warning" as never, className: "rounded-none border-0 shadow-none" },
              React.createElement(AlertTriangleIcon),
              React.createElement(AlertTitle, {}, "Subscription expiring soon"),
              React.createElement(
                AlertDescription,
                {},
                "Your plan renews in 3 days. Update your billing info to avoid interruption."
              )
            )
          ),
          React.createElement(
            FramePanel,
            { className: "overflow-hidden p-0!" },
            React.createElement(
              Alert,
              { variant: "destructive", className: "rounded-none border-0 shadow-none" },
              React.createElement(AlertCircleIcon),
              React.createElement(AlertTitle, {}, "Payment failed"),
              React.createElement(
                AlertDescription,
                {},
                "We could not charge your card. Please update your payment method."
              )
            )
          )
        )
      ),
    },
  ],
};
