/**
 * @name spinner
 * @description A loading spinner component to indicate activity.
 * @dependencies class-variance-authority
 * @type registry:ui
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

const BARS = Array(12).fill(0);

function RadialSpinner({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="status"
      aria-label="Loading"
      data-slot="radial-spinner"
      className={cn("inline-flex size-4", className)}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-full animate-spin [animation-timing-function:steps(12,end)]"
        aria-hidden="true"
      >
        {BARS.map((_, i) => (
          <rect
            key={i}
            x="11"
            y="1"
            width="2"
            height="6"
            rx="1"
            fill="currentColor"
            opacity={(i + 1) / 12}
            transform={`rotate(${i * 30} 12 12)`}
          />
        ))}
      </svg>
      <span className="sr-only">Loading…</span>
    </span>
  );
}

export { Spinner, RadialSpinner };
