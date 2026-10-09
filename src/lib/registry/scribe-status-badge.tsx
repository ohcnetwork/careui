import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  ScribeStatusBadge,
  type ScribeStatus,
} from "@/components/ui/scribe-status-badge";

const statuses: ScribeStatus[] = [
  "CREATED",
  "READY",
  "GENERATING_TRANSCRIPT",
  "GENERATING_AI_RESPONSE",
  "COMPLETED",
  "REFUSED",
  "FAILED",
];

export const scribeStatusBadgeDoc: ComponentDoc = {
  id: "scribe-status-badge",
  name: "Scribe Status Badge",
  description:
    "A badge for the lifecycle of an AI scribe job, with a matching icon and a pulse while work is in progress.",
  installation: {
    cli: "npx shadcn@latest add scribe-status-badge",
    manual:
      "Copy and paste the scribe-status-badge component source code into your project. It depends on the badge component.",
  },
  usage: `import { ScribeStatusBadge } from "@/components/ui/scribe-status-badge"

<ScribeStatusBadge status="COMPLETED" />`,
  preview: {
    code: `<ScribeStatusBadge status="GENERATING_TRANSCRIPT" />`,
    component: React.createElement(ScribeStatusBadge, {
      status: "GENERATING_TRANSCRIPT",
    }),
  },
  examples: [
    {
      name: "All statuses",
      description: "Every status the scribe can report.",
      code: `{statuses.map((status) => (
  <ScribeStatusBadge key={status} status={status} />
))}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-wrap gap-2" },
        ...statuses.map((status) =>
          React.createElement(ScribeStatusBadge, { key: status, status })
        )
      ),
    },
    {
      name: "Custom label",
      description: "Override the label, for example to translate it.",
      code: `<ScribeStatusBadge status="FAILED" label="Échec" />`,
      preview: React.createElement(ScribeStatusBadge, {
        status: "FAILED",
        label: "Échec",
      }),
    },
  ],
  props: [
    {
      name: "status",
      type: '"CREATED" | "READY" | "GENERATING_TRANSCRIPT" | "GENERATING_AI_RESPONSE" | "COMPLETED" | "REFUSED" | "FAILED"',
      description: "The scribe job status to display.",
    },
    {
      name: "label",
      type: "string",
      description: "Overrides the default label.",
    },
    {
      name: "...props",
      type: "Badge props",
      description: "All Badge props except `variant`.",
    },
  ],
};
