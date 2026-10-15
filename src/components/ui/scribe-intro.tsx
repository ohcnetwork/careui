/**
 * @name scribe-intro
 * @description A compact first-run nudge card that introduces the scribe with a short message, a primary "try it" action and a dismiss control.
 * @dependencies lucide-react
 * @registryDependencies button
 * @type registry:ui
 */
import * as React from "react";
import { MicIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ScribeIntroProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  tryLabel?: string;
  laterLabel?: string;
  dismissLabel?: string;
  onTry?: () => void;
  onDismiss?: () => void;
}

function ScribeIntro({
  title = "Meet Scribe",
  description = "Just talk — I'll fill symptoms, diagnosis, meds & orders for you.",
  tryLabel = "Try it",
  laterLabel = "Later",
  dismissLabel = "Dismiss",
  onTry,
  onDismiss,
  className,
  ...props
}: ScribeIntroProps) {
  return (
    <div
      data-slot="scribe-intro"
      role="group"
      aria-label={typeof title === "string" ? title : undefined}
      className={cn(
        "bg-card text-card-foreground relative w-70 max-w-[calc(100vw-2.5rem)] rounded-2xl border p-4 shadow-xl",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={onDismiss}
        aria-label={dismissLabel}
        className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring/50 absolute top-2.5 right-2.5 flex size-5 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
      >
        <XIcon className="size-3" />
      </button>
      <h3 className="pr-4 text-sm font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
        {description}
      </p>
      <div className="mt-3.5 flex items-center gap-2">
        <Button className="flex-1 rounded-full" size="sm" onClick={onTry}>
          <MicIcon />
          {tryLabel}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full"
          onClick={onDismiss}
        >
          {laterLabel}
        </Button>
      </div>
    </div>
  );
}

export { ScribeIntro };
