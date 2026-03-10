/**
 * @name frame
 * @description A visual chrome container that wraps UI panels with a structured border, background, and shadow.
 * @dependencies (none)
 * @type registry:ui
 */
import * as React from "react"

import { cn } from "@/lib/utils"

function Frame({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame"
      className={cn(
        "relative flex flex-col gap-0.75 p-0.75 rounded-xl bg-muted/50 border border-border/50 bg-clip-padding",
        "**:data-[slot=frame-panel]:p-4",
        "**:data-[slot=frame-panel-header]:px-4 **:data-[slot=frame-panel-header]:py-3",
        "**:data-[slot=frame-panel-footer]:px-4 **:data-[slot=frame-panel-footer]:py-3",
        className
      )}
      {...props}
    />
  )
}

function FramePanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame-panel"
      className={cn(
        "relative grow rounded-lg bg-background border bg-clip-padding shadow-xs",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-black/5",
        "dark:bg-clip-border dark:before:shadow-white/5",
        className
      )}
      {...props}
    />
  )
}

export { Frame, FramePanel }
