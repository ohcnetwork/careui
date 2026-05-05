/**
 * @name tv-display
 * @description Composable digital signage layout for TVs (queue boards, room rosters) with built-in aspect ratios.
 * @dependencies radix-ui class-variance-authority
 * @type registry:ui
 */
import * as React from "react"
import { AspectRatio as AspectRatioPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Marquee container that scrolls its child horizontally only when the content
 * overflows. Cycle: pause at the start with the full text visible so the
 * reader can begin reading, scroll once to the end, hold briefly so the eye
 * can catch the tail, then snap back to the start and pause again before
 * looping. The dominant resting state shows the full text — the cropped
 * end-frame is intentionally brief so the marquee never feels stuck.
 */
function MarqueeText({
  children,
  className,
  /** Pixels per second the text scrolls when active. */
  speed = 50,
  /** Seconds to hold the full text visible at the start of each cycle. */
  startPause = 2,
  /** Brief hold at the end before snapping back. Keep small. */
  endPause = 0.4,
}: {
  children: React.ReactNode
  className?: string
  speed?: number
  startPause?: number
  endPause?: number
}) {
  const containerRef = React.useRef<HTMLSpanElement>(null)
  const innerRef = React.useRef<HTMLSpanElement>(null)
  const [overflow, setOverflow] = React.useState(0)
  const reactId = React.useId()
  const animationName = `tv-marquee-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`

  React.useEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current
    if (!container || !inner) return

    const measure = () => {
      const diff = inner.scrollWidth - container.clientWidth
      setOverflow(diff > 1 ? diff : 0)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    ro.observe(inner)
    return () => ro.disconnect()
  }, [children])

  const isAnimating = overflow > 0
  const scrollSeconds = isAnimating ? overflow / speed : 0
  const totalSeconds = scrollSeconds + startPause + endPause
  // Keyframe stops as percentages of the total duration.
  const t1 = (startPause / totalSeconds) * 100 // start of scroll
  const t2 = ((startPause + scrollSeconds) / totalSeconds) * 100 // end of scroll

  return (
    <span
      ref={containerRef}
      data-slot="tv-display-marquee"
      data-overflow={isAnimating ? "true" : "false"}
      className={cn(
        "relative block min-w-0 overflow-hidden whitespace-nowrap",
        className
      )}
      style={
        isAnimating
          ? ({
              "--marquee-overflow": `${overflow}px`,
              "--marquee-duration": `${totalSeconds}s`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <span
        ref={innerRef}
        className={cn("inline-block will-change-transform")}
        style={
          isAnimating
            ? {
                animation: `${animationName} var(--marquee-duration) linear infinite`,
              }
            : undefined
        }
      >
        {children}
      </span>
      {isAnimating ? (
        <style href={animationName} precedence="tv-display">{`@keyframes ${animationName} {
          0% { transform: translateX(0); }
          ${t1}% { transform: translateX(0); }
          ${t2}% { transform: translateX(calc(var(--marquee-overflow) * -1)); }
          100% { transform: translateX(calc(var(--marquee-overflow) * -1)); }
        }`}</style>
      ) : null}
    </span>
  )
}

/**
 * Aspect ratio presets covering the most common TV / signage canvases:
 * - 16/9  → standard HD TV
 * - 21/9  → ultrawide signage
 * - 4/3   → legacy displays
 * - 9/16  → portrait signage
 */
const TV_ASPECT_RATIOS = {
  "16/9": 16 / 9,
  "21/9": 21 / 9,
  "4/3": 4 / 3,
  "9/16": 9 / 16,
} as const

type TVAspectRatio = keyof typeof TV_ASPECT_RATIOS

const tvDisplayVariants = cva(
  [
    // Force a dark surface so text-foreground resolves to white inside the TV
    // canvas regardless of the surrounding theme.
    "dark relative isolate grid h-full w-full overflow-hidden @container",
    // Root is a 2-row grid (header / body) and defines the shared column
    // tracks. Header and body both opt-in via `subgrid` so the columns line
    // up perfectly across the whole display. On narrow canvases (portrait /
    // small kiosks) the tracks collapse to a single column and rows reflow
    // into a stacked layout below.
    "grid-rows-[auto_1fr] grid-cols-[minmax(0,1fr)_auto_minmax(min(22cqw,18rem),auto)]",
    "@max-md:grid-cols-[minmax(0,1fr)]",
    "bg-[#1a2540] text-foreground",
    "rounded-(--tv-radius) [--tv-radius:var(--radius-xl)]",
    "font-sans",
  ],
  {
    variants: {
      density: {
        default:
          "[--tv-row-px:--spacing(6)] [--tv-header-py:--spacing(3)] [--tv-header-px:--spacing(6)]",
        compact:
          "[--tv-row-px:--spacing(5)] [--tv-header-py:--spacing(2)] [--tv-header-px:--spacing(5)]",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
)

type TVDisplayProps = React.ComponentProps<"div"> &
  VariantProps<typeof tvDisplayVariants> & {
    /** TV aspect ratio. Defaults to 16/9. */
    aspectRatio?: TVAspectRatio
  }

function TVDisplay({
  className,
  density,
  aspectRatio = "16/9",
  children,
  ...props
}: TVDisplayProps) {
  return (
    <AspectRatioPrimitive.Root
      ratio={TV_ASPECT_RATIOS[aspectRatio]}
      data-slot="tv-display-root"
      data-aspect-ratio={aspectRatio}
    >
      <div
        data-slot="tv-display"
        data-density={density ?? "default"}
        className={cn(tvDisplayVariants({ density }), className)}
        {...props}
      >
        {children}
      </div>
    </AspectRatioPrimitive.Root>
  )
}

/**
 * Header and body inherit the column tracks defined on `TVDisplay` via
 * `grid-cols-subgrid`. This guarantees that the header cells align with the
 * row cells (doctor / room / token) regardless of intrinsic content widths.
 */

function TVDisplayHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tv-display-header"
      className={cn(
        "col-span-full grid grid-cols-subgrid items-center gap-x-8",
        // Header labels are redundant once rows stack vertically, so hide
        // the strip in narrow containers.
        "@max-md:hidden",
        "bg-[#e8ff6b] text-[#1a2540]",
        "px-(--tv-header-px) py-(--tv-header-py)",
        "text-[clamp(0.75rem,0.6cqw+0.5rem,1.375rem)] font-bold uppercase",
        className
      )}
      {...props}
    />
  )
}

function TVDisplayBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tv-display-body"
      className={cn(
        // Body spans all root columns and re-shares those tracks with its
        // children rows via `subgrid` for true content-driven widths.
        "col-span-full grid min-h-0 auto-rows-fr grid-cols-subgrid",
        className
      )}
      {...props}
    />
  )
}

function TVDisplayRow({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tv-display-row"
      className={cn(
        "col-span-full grid min-h-0 grid-cols-subgrid items-center gap-x-8",
        "@max-md:items-end @max-md:grid-cols-[auto_minmax(0,1fr)] @max-md:grid-rows-[auto_1fr] @max-md:gap-x-4 @max-md:gap-y-[1cqh] @max-md:py-[2.5cqh]",
        "px-(--tv-row-px)",
        "even:bg-[#22335a]",
        className
      )}
      {...props}
    />
  )
}

function TVDisplayDoctor({
  name,
  specialty,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  name: React.ReactNode
  specialty?: React.ReactNode
}) {
  return (
    <div
      data-slot="tv-display-doctor"
      className={cn(
        "flex min-w-0 flex-col justify-center",
        // Span both columns on narrow layouts so the name gets the full row.
        "@max-md:col-span-2",
        className
      )}
      {...props}
    >
      <span className="min-w-0 text-[clamp(1.25rem,2.2cqw+0.5rem,3.25rem)] font-bold leading-tight text-foreground">
        <MarqueeText>{name}</MarqueeText>
      </span>
      {specialty ? (
        <span className="truncate text-[clamp(0.875rem,1.4cqw+0.25rem,1.875rem)] font-medium text-foreground/80">
          {specialty}
        </span>
      ) : null}
    </div>
  )
}

function TVDisplayRoom({
  className,
  children,
  label = "Room",
  ...props
}: React.ComponentProps<"div"> & {
  /** Label rendered above the room number on narrow (portrait) layouts.
   *  Hidden on wide layouts where the column header already covers it. */
  label?: React.ReactNode
}) {
  return (
    <div
      data-slot="tv-display-room"
      className={cn(
        "flex flex-col items-start justify-center self-center gap-0.5",
        className
      )}
      {...props}
    >
      {label ? (
        <span
          aria-hidden
          className="hidden text-[clamp(0.875rem,1.5cqw+0.25rem,1.5rem)] font-semibold uppercase tracking-wide text-foreground/70 @max-md:block"
        >
          {label}
        </span>
      ) : null}
      <div
        className={cn(
          "flex aspect-square items-center justify-center",
          "h-[clamp(3rem,6cqw+0.75rem,8rem)]",
          "border-2 border-foreground/50 text-foreground",
          "text-[clamp(1.75rem,3.8cqw+0.5rem,5.5rem)] font-bold leading-none tabular-nums"
        )}
      >
        {children}
      </div>
    </div>
  )
}

type TVDisplayTokenProps = React.ComponentProps<"div"> & {
  /** Token currently being served (e.g. "OP-025"). */
  current: React.ReactNode
  /** Upcoming tokens shown after the current one. */
  next?: React.ReactNode[]
  /** Label shown before the upcoming tokens. Override for localization. */
  nextLabel?: React.ReactNode
}

/**
 * Token cell — shows the token currently being served (large, accent-colored)
 * and a marquee strip of upcoming tokens. The marquee scrolls only when the
 * upcoming list overflows; the `nextLabel` stays static for readability.
 */
function TVDisplayToken({
  className,
  current,
  next,
  nextLabel = "Next:",
  ...props
}: TVDisplayTokenProps) {
  // Limit to the first 3 upcoming tokens — beyond that the line gets noisy
  // and is hard to read at signage distance.
  const visibleNext = next?.slice(0, 3)
  return (
    <div
      data-slot="tv-display-token"
      className={cn("flex min-w-0 flex-col justify-center gap-0.5", className)}
      {...props}
    >
      <span className="truncate text-[clamp(1.75rem,3.4cqw+0.5rem,5rem)] font-extrabold leading-none tabular-nums text-[#ffd23f]">
        {current}
      </span>
      {visibleNext && visibleNext.length > 0 ? (
        <div className="flex min-w-0 items-baseline gap-2 text-[clamp(0.875rem,1.4cqw+0.25rem,1.875rem)] font-semibold uppercase text-foreground/75">
          <span className="shrink-0 font-medium text-foreground/80">{nextLabel}</span>
          <MarqueeText className="min-w-0 flex-1">
            {visibleNext.map((token, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 ? (
                  <span aria-hidden className="mx-2 text-foreground">
                    ·
                  </span>
                ) : null}
                <span className="font-bold text-foreground tabular-nums tracking-wide">
                  {token}
                </span>
              </React.Fragment>
            ))}
          </MarqueeText>
        </div>
      ) : null}
    </div>
  )
}

export {
  TVDisplay,
  TVDisplayHeader,
  TVDisplayBody,
  TVDisplayRow,
  TVDisplayDoctor,
  TVDisplayRoom,
  TVDisplayToken,
}
export type { TVDisplayProps, TVAspectRatio }
