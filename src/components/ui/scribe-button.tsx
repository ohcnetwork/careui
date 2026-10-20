/**
 * @name scribe-button
 * @description A floating voice-capture action button that reflects the recording flow: idle, recording, attaching and review. The icon sits in a chip beside a label.
 * @dependencies lucide-react class-variance-authority
 * @type registry:ui
 */
import * as React from "react";
import { cva } from "class-variance-authority";
import { ImageIcon, MicIcon, MicOffIcon, RotateCcwIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ScribeButtonState = "idle" | "recording" | "attaching" | "review";

const scribeButtonVariants = cva(
  "group inline-flex cursor-pointer items-center rounded-full text-sm font-semibold transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      state: {
        idle: "bg-primary text-primary-foreground hover:bg-primary/90",
        recording:
          "border border-destructive/40 bg-destructive/10 text-foreground hover:bg-destructive/20",
        attaching: "border bg-muted text-foreground hover:bg-muted/70",
        review: "border bg-muted text-foreground hover:bg-muted/70",
      },
    },
    defaultVariants: { state: "idle" },
  }
);

const STATE_ICONS: Record<ScribeButtonState, React.ElementType> = {
  idle: MicIcon,
  recording: MicOffIcon,
  attaching: ImageIcon,
  review: RotateCcwIcon,
};

interface ScribeButtonProps extends Omit<
  React.ComponentProps<"button">,
  "children"
> {
  state?: ScribeButtonState;
  /** Text shown beside the icon. */
  label: string;
}

function ScribeButton({
  state = "idle",
  label,
  className,
  type = "button",
  ...props
}: ScribeButtonProps) {
  const Icon = STATE_ICONS[state];
  return (
    <button
      data-slot="scribe-button"
      data-state={state}
      type={type}
      title={label}
      className={cn(scribeButtonVariants({ state }), className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex aspect-square items-center justify-center rounded-full p-3.5",
          state === "idle" ? "bg-black/15" : "bg-foreground/10"
        )}
      >
        <Icon className="size-4" />
      </span>
      <span className="pr-5 pl-2">{label}</span>
    </button>
  );
}

export { ScribeButton, type ScribeButtonState };
