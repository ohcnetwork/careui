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
 * Marquee container that reveals its child horizontally only when the content
 * overflows. Cycle: hold at start → scroll until the end of the text is
 * flush-right → hold at end → fade out → snap back to start → fade in.
 * Single copy (no looping seam): the text always reads in natural order and
 * the reset is hidden by the fade.
 */
function MarqueeText({
  children,
  className,
  /** Pixels per second the text scrolls when active. */
  speed = 60,
  /** Seconds to hold at the start of each cycle (beginning of name visible). */
  startPause = 1.5,
  /** Seconds to hold at the end of the scroll (end of name visible). */
  endPause = 1.5,
  /** Seconds for the fade-out / fade-in transition that hides the reset. */
  fadeDuration = 0.6,
}: {
  children: React.ReactNode
  className?: string
  speed?: number
  startPause?: number
  endPause?: number
  fadeDuration?: number
}) {
  const containerRef = React.useRef<HTMLSpanElement>(null)
  const copyRef = React.useRef<HTMLSpanElement>(null)
  const [copyWidth, setCopyWidth] = React.useState(0)
  const [containerWidth, setContainerWidth] = React.useState(0)
  const reactId = React.useId()
  const animationName = `tv-marquee-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`

  React.useEffect(() => {
    const container = containerRef.current
    const copy = copyRef.current
    if (!container || !copy) return

    const measure = () => {
      setCopyWidth(copy.scrollWidth)
      setContainerWidth(container.clientWidth)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    ro.observe(copy)
    return () => ro.disconnect()
  }, [children])

  const overflowDistance = Math.max(0, copyWidth - containerWidth)
  const isAnimating = overflowDistance > 1
  const scrollSeconds = isAnimating ? overflowDistance / speed : 0
  // Fade transition is split into two equal halves: fade-out at the end
  // position, then fade-in at the start position. The transform snaps back
  // between them while opacity is 0, so the rewind is invisible.
  const halfFade = fadeDuration / 2
  const totalSeconds =
    scrollSeconds + startPause + endPause + fadeDuration

  const pct = (s: number) =>
    isAnimating ? (s / totalSeconds) * 100 : 0

  const startStop = pct(startPause)
  const scrollStop = pct(startPause + scrollSeconds)
  const fadeOutStart = pct(startPause + scrollSeconds + endPause)
  const fadeOutEnd = pct(startPause + scrollSeconds + endPause + halfFade)
  // Tiny epsilon after fadeOutEnd to snap transform back to 0 while opacity
  // is still 0, then fade in the rest of the way to 100.
  const snapStop = Math.min(fadeOutEnd + 0.01, 99.99)

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
              "--marquee-distance": `${overflowDistance}px`,
              "--marquee-duration": `${totalSeconds}s`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <span
        ref={copyRef}
        className={cn("inline-block will-change-[transform,opacity]")}
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
          0% { transform: translateX(0); opacity: 1; }
          ${startStop}% { transform: translateX(0); opacity: 1; }
          ${scrollStop}% { transform: translateX(calc(var(--marquee-distance) * -1)); opacity: 1; }
          ${fadeOutStart}% { transform: translateX(calc(var(--marquee-distance) * -1)); opacity: 1; }
          ${fadeOutEnd}% { transform: translateX(calc(var(--marquee-distance) * -1)); opacity: 0; }
          ${snapStop}% { transform: translateX(0); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
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
    "grid-rows-[auto_1fr] grid-cols-[minmax(0,1fr)_auto_auto]",
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
      <TVDisplayFallbackStyles />
    </AspectRatioPrimitive.Root>
  )
}

function TVDisplayFallbackStyles() {
  return (
    <style
      href="tv-display-fallbacks"
      precedence="tv-display-base"
    >{`
      [data-slot="tv-display"] {
        /* Explicit, widely-supported colors. Override the inherited
           --foreground so text-foreground utilities resolve to plain
           white instead of an oklch() value the engine may not parse. */
        color: #ffffff;
        --foreground: #ffffff;
        --tv-radius: 1rem;
        font-family:
          "Inter",
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          Roboto,
          "Helvetica Neue",
          Arial,
          "Noto Sans",
          "Noto Sans Malayalam",
          "Noto Sans Devanagari",
          "Noto Color Emoji",
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        background-color: #1a2540;
      }

      /* Avoid color-mix() (Tailwind alpha modifiers) blowing up on old
         engines: provide rgba fallbacks for the common alpha steps. */
      @supports not (color: color-mix(in srgb, white, black)) {
        [data-slot="tv-display"] .text-foreground\\/80,
        [data-slot="tv-display"] [class*="text-foreground/80"] {
          color: rgba(255, 255, 255, 0.8);
        }
        [data-slot="tv-display"] .text-foreground\\/75,
        [data-slot="tv-display"] [class*="text-foreground/75"] {
          color: rgba(255, 255, 255, 0.75);
        }
        [data-slot="tv-display"] .text-foreground\\/70,
        [data-slot="tv-display"] [class*="text-foreground/70"] {
          color: rgba(255, 255, 255, 0.7);
        }
        [data-slot="tv-display"] .border-foreground\\/50,
        [data-slot="tv-display"] [class*="border-foreground/50"] {
          border-color: rgba(255, 255, 255, 0.5);
        }
      }

      /* Container-query fallback. cqw is undefined on older WebKit / Blink;
         clamp() with an invalid unit drops the whole declaration, so we
         replace it via @supports negation. vw is supported since IE9 and
         visually equivalent for fullscreen TV signage. */
      @supports not (container-type: inline-size) {
        [data-slot="tv-display-doctor"] > span:first-child {
          font-size: clamp(1.25rem, 2.2vw + 0.5rem, 3.25rem);
        }
        [data-slot="tv-display-doctor"] > span:nth-child(2) {
          font-size: clamp(0.875rem, 1.4vw + 0.25rem, 1.875rem);
        }
        [data-slot="tv-display-header"] {
          font-size: clamp(0.75rem, 0.6vw + 0.5rem, 1.375rem);
        }
        [data-slot="tv-display-room"] > div {
          height: clamp(3rem, 6vw + 0.75rem, 8rem);
          min-width: clamp(3rem, 6vw + 0.75rem, 8rem);
          padding-left: clamp(0.5rem, 1.2vw, 1.25rem);
          padding-right: clamp(0.5rem, 1.2vw, 1.25rem);
          font-size: clamp(1.5rem, 3.2vw + 0.5rem, 5rem);
        }
        [data-slot="tv-display-token"] > span:first-child {
          font-size: clamp(1.75rem, 3.4vw + 0.5rem, 5rem);
        }
        [data-slot="tv-display-token"] > div {
          font-size: clamp(0.875rem, 1.4vw + 0.25rem, 1.875rem);
        }
      }

      /* Last-resort fallback for engines that don't even understand clamp()
         (very old Tizen / WebOS): pin to mid-range rem values. */
      @supports not (font-size: clamp(1rem, 1vw, 2rem)) {
        [data-slot="tv-display-doctor"] > span:first-child { font-size: 2rem; }
        [data-slot="tv-display-doctor"] > span:nth-child(2) { font-size: 1.125rem; }
        [data-slot="tv-display-header"] { font-size: 1rem; }
        [data-slot="tv-display-room"] > div {
          height: 4.5rem;
          min-width: 4.5rem;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          font-size: 2rem;
        }
        [data-slot="tv-display-token"] > span:first-child { font-size: 2.75rem; }
        [data-slot="tv-display-token"] > div { font-size: 1.125rem; }
      }

      /* Subgrid fallback. Without subgrid the children can't inherit the
         parent's column tracks, so we replicate the default 3-column layout
         here. Custom layouts opt in via [data-layout="..."] on the root. */
      @supports not (grid-template-columns: subgrid) {
        [data-slot="tv-display-header"],
        [data-slot="tv-display-body"],
        [data-slot="tv-display-row"] {
          grid-template-columns: minmax(0, 1fr) auto auto;
        }
        [data-layout="pharmacy"] [data-slot="tv-display-header"],
        [data-layout="pharmacy"] [data-slot="tv-display-body"],
        [data-layout="pharmacy"] [data-slot="tv-display-row"] {
          grid-template-columns: auto auto;
        }
      }

      /* Respect reduced motion / disable GPU-heavy effects on low-end TVs. */
      @media (prefers-reduced-motion: reduce) {
        [data-slot="tv-display"] *,
        [data-slot="tv-display"] *::before,
        [data-slot="tv-display"] *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
        }
        [data-slot="tv-display-marquee"][data-overflow="true"] > span:first-child {
          transform: none !important;
          opacity: 1 !important;
        }
      }
    `}</style>
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
        // `items-stretch` lets the inner box fill the room-column track,
        // and since that track is auto-sized to the widest box across all
        // rows, every box ends up matching the widest one.
        "flex flex-col items-stretch justify-center self-center gap-0.5",
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
          "flex w-full items-center justify-center self-start",
          "h-[clamp(3rem,6cqw+0.75rem,8rem)] min-w-[clamp(3rem,6cqw+0.75rem,8rem)]",
          "px-[clamp(0.5rem,1.2cqw,1.25rem)]",
          "border-2 border-foreground/50 text-foreground",
          "text-[clamp(1.5rem,3.2cqw+0.5rem,5rem)] font-bold leading-none tabular-nums whitespace-nowrap"
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
  /**
   * Optional key that, when changed, restarts the upcoming-tokens marquee
   * from the beginning. Pass the same value you use to drive the `current`
   * token rotation so the next-strip pauses (held at start) while the new
   * current token animates in, then begins scrolling — never overlapping
   * the rotation transition.
   */
  nextRestartKey?: string | number
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
  nextRestartKey,
  ...props
}: TVDisplayTokenProps) {
  // Limit to the first 2 upcoming tokens — beyond that the line gets noisy
  // and is hard to read at signage distance.
  const visibleNext = next?.slice(0, 2)
  return (
    <div
      data-slot="tv-display-token"
      className={cn("flex min-w-0 flex-col justify-center gap-0.5", className)}
      {...props}
    >
      <span className="truncate text-[clamp(2.25rem,4.6cqw+0.5rem,6.5rem)] font-extrabold leading-none tabular-nums text-[#ffd23f]">
        {current}
      </span>
      {visibleNext && visibleNext.length > 0 ? (
        <div className="flex min-w-0 items-baseline gap-2 text-[clamp(0.875rem,1.4cqw+0.25rem,1.875rem)] font-semibold uppercase text-foreground/75">
          <span className="shrink-0 font-medium text-foreground/80">{nextLabel}</span>
          {/* Remount on `nextRestartKey` change so the marquee restarts from
              its initial hold whenever the current token rotates. */}
          <MarqueeText
            key={nextRestartKey ?? "static"}
            className="min-w-0 flex-1"
          >
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
