/**
 * @name scribe-status-badge
 * @description A badge for the lifecycle of an AI scribe job (created, transcribing, generating, completed, refused, failed) with a matching icon and a pulse while work is in progress.
 * @dependencies lucide-react
 * @registryDependencies badge
 * @type registry:ui
 */
import * as React from "react";
import {
  BanIcon,
  CheckIcon,
  ClockIcon,
  MicIcon,
  XIcon,
  ZapIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge, type BadgeVariant } from "@/components/ui/badge";

type ScribeStatus =
  | "CREATED"
  | "READY"
  | "GENERATING_TRANSCRIPT"
  | "GENERATING_AI_RESPONSE"
  | "COMPLETED"
  | "REFUSED"
  | "FAILED";

const STATUS_CONFIG: Record<
  ScribeStatus,
  {
    variant: BadgeVariant;
    icon: React.ElementType;
    label: string;
    busy?: boolean;
  }
> = {
  CREATED: { variant: "neutral", icon: ClockIcon, label: "Created" },
  READY: { variant: "info", icon: CheckIcon, label: "Ready" },
  GENERATING_TRANSCRIPT: {
    variant: "primary",
    icon: MicIcon,
    label: "Transcribing",
    busy: true,
  },
  GENERATING_AI_RESPONSE: {
    variant: "primary",
    icon: ZapIcon,
    label: "Generating",
    busy: true,
  },
  COMPLETED: { variant: "success", icon: CheckIcon, label: "Completed" },
  REFUSED: { variant: "warning", icon: BanIcon, label: "Refused" },
  FAILED: { variant: "destructive", icon: XIcon, label: "Failed" },
};

interface ScribeStatusBadgeProps extends Omit<
  React.ComponentProps<typeof Badge>,
  "variant" | "children"
> {
  status: ScribeStatus;
  /** Override the default label. */
  label?: string;
}

function ScribeStatusBadge({
  status,
  label,
  className,
  ...props
}: ScribeStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  return (
    <Badge
      data-status={status}
      variant={config.variant}
      className={cn(className)}
      {...props}
    >
      <Icon
        aria-hidden="true"
        className={cn(config.busy && "motion-safe:animate-pulse")}
      />
      {label ?? config.label}
    </Badge>
  );
}

export { ScribeStatusBadge, type ScribeStatus };
