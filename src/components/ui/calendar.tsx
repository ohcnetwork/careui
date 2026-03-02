/**
 * @name calendar
 * @description A calendar component that allows users to select a date or a range of dates.
 * @dependencies react-day-picker date-fns
 * @type registry:ui
 */
import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { isValid, parse } from "date-fns"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "outline",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(10)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent [&_button]:no-underline",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-2 w-full absolute top-0 inset-x-0 justify-end",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant, size: "icon" }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none shadow-sm",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant, size: "icon" }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none shadow-sm",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center  h-(--cell-size) w-full pr-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative h-(--cell-size) flex items-center px-2 rounded-(--cell-radius) focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-(--cell-radius) flex items-center gap-1 text-sm [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-(--cell-radius) flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full rounded-(--cell-radius) h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius) group/day aspect-square select-none",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
            : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-(--cell-radius) bg-muted relative after:bg-muted after:absolute after:inset-y-0 after:w-4 after:right-0 z-0 isolate",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "rounded-r-(--cell-radius) bg-muted relative after:bg-muted after:absolute after:inset-y-0 after:w-4 after:left-0 z-0 isolate",
          defaultClassNames.range_end
        ),
        today: cn(
          "bg-muted text-foreground rounded-(--cell-radius) data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon className={cn("size-4", className)} {...props} />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon-xs"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-foreground relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

// Segment definitions for DD/MM/YYYY (year bounds are dynamic, passed as props)
const DATE_SEG_STATIC = [
  { start: 0, end: 2, maxLen: 2, max: 31, min: 1, label: "day" },
  { start: 3, end: 5, maxLen: 2, max: 12, min: 1, label: "month" },
  { start: 6, end: 10, maxLen: 4, min: 1900, max: 9999, label: "year" },
] as const
type SegIdx = 0 | 1 | 2

function buildDisplay(parts: [string, string, string]) {
  return `${parts[0] || "DD"}/${parts[1] || "MM"}/${parts[2] || "YYYY"}`
}

function partsFromDate(d: Date): [string, string, string] {
  return [
    String(d.getDate()).padStart(2, "0"),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getFullYear()),
  ]
}

function segFromPos(pos: number): SegIdx {
  return pos <= 2 ? 0 : pos <= 5 ? 1 : 2
}

/** Returns the number of days in the given month/year; falls back to 31 if unknown. */
function daysInMonth(mm: string, yyyy: string): number {
  const m = parseInt(mm)
  const y = parseInt(yyyy)
  if (!m || m < 1 || m > 12) return 31
  if (!y || yyyy.length < 4) return new Date(2000, m, 0).getDate()
  return new Date(y, m, 0).getDate()
}

/** Builds the segment config for the current parts, applying dynamic day max and year bounds. */
function getSegs(
  parts: [string, string, string],
  minYear: number,
  maxYear: number
) {
  return [
    { ...DATE_SEG_STATIC[0], max: daysInMonth(parts[1], parts[2]) },
    { ...DATE_SEG_STATIC[1] },
    { ...DATE_SEG_STATIC[2], min: minYear, max: maxYear },
  ] as const
}

function SegmentedDateInput({
  value,
  onChange,
  className,
  fromYear,
  toYear,
}: {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  className?: string
  fromYear?: number
  toYear?: number
}) {
  const currentYear = new Date().getFullYear()
  const minYear = fromYear ?? 1900
  const maxYear = toYear ?? currentYear + 25
  const hintId = React.useId()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const announceRef = React.useRef<HTMLSpanElement>(null)
  const [parts, setParts] = React.useState<[string, string, string]>(
    value && isValid(value) ? partsFromDate(value) : ["", "", ""]
  )
  const [activeSeg, setActiveSeg] = React.useState<SegIdx>(0)
  const pendingRef = React.useRef("")

  // Compute dynamic segment config, accounting for days-in-month
  function segs(p: [string, string, string]) {
    return getSegs(p, minYear, maxYear)
  }

  // After every render, restore the selection range when input is focused.
  React.useLayoutEffect(() => {
    const el = inputRef.current
    if (!el || document.activeElement !== el) return
    const seg = segs(parts)[activeSeg]
    el.setSelectionRange(seg.start, seg.end)
  })

  // Sync from external `value` prop
  React.useEffect(() => {
    setParts(value && isValid(value) ? partsFromDate(value) : ["", "", ""])
  }, [value])

  function announce(msg: string) {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  function moveTo(seg: SegIdx, p: [string, string, string]) {
    pendingRef.current = ""
    setActiveSeg(seg)
    const val = p[seg]
    announce(val ? `${DATE_SEG_STATIC[seg].label}: ${val}` : `Enter ${DATE_SEG_STATIC[seg].label}`)
  }

  function tryEmit(newParts: [string, string, string]) {
    const [dd, mm, yyyy] = newParts
    if (dd && mm && yyyy.length === 4) {
      const d = parse(`${dd}/${mm}/${yyyy}`, "dd/MM/yyyy", new Date())
      if (isValid(d)) { onChange(d); return }
    }
    onChange(undefined)
  }

  function handleClick(e: React.MouseEvent<HTMLInputElement>) {
    const pos = (e.target as HTMLInputElement).selectionStart ?? 0
    moveTo(segFromPos(pos), parts)
  }

  function handleFocus() {
    moveTo(0, parts)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const seg = activeSeg
    const curSegs = segs(parts)
    const { maxLen, min, max } = curSegs[seg]

    if (e.key === "Tab") {
      if (!e.shiftKey && seg < 2) { e.preventDefault(); moveTo((seg + 1) as SegIdx, parts) }
      else if (e.shiftKey && seg > 0) { e.preventDefault(); moveTo((seg - 1) as SegIdx, parts) }
      return
    }

    // Separator keys advance to next segment naturally
    if ((e.key === "/" || e.key === "." || e.key === "-") && seg < 2) {
      e.preventDefault(); moveTo((seg + 1) as SegIdx, parts); return
    }

    if (e.key === "ArrowLeft") { e.preventDefault(); if (seg > 0) moveTo((seg - 1) as SegIdx, parts); return }
    if (e.key === "ArrowRight") { e.preventDefault(); if (seg < 2) moveTo((seg + 1) as SegIdx, parts); return }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault()
      const delta = e.key === "ArrowUp" ? 1 : -1
      const fallback = seg === 2 ? currentYear : min
      const cur = parseInt(parts[seg]) || fallback
      const next = Math.min(max, Math.max(min, cur + delta))
      const newParts = [...parts] as [string, string, string]
      newParts[seg] = String(next).padStart(maxLen, "0")
      // Clamp day if month/year changed and day now exceeds days-in-that-month
      if (seg !== 0 && newParts[0]) {
        const dayMax = segs(newParts)[0].max
        const dayVal = parseInt(newParts[0])
        if (dayVal > dayMax) newParts[0] = String(dayMax).padStart(2, "0")
      }
      setParts(newParts)
      tryEmit(newParts)
      announce(`${DATE_SEG_STATIC[seg].label}: ${newParts[seg]}`)
      return
    }

    // T = today
    if (e.key === "t" || e.key === "T") {
      e.preventDefault()
      const today = new Date()
      const newParts = partsFromDate(today)
      setParts(newParts)
      tryEmit(newParts)
      announce(`Today: ${newParts[0]}/${newParts[1]}/${newParts[2]}`)
      moveTo(0, newParts)
      return
    }

    if (e.key === "Escape") {
      e.preventDefault()
      pendingRef.current = ""
      const newParts: [string, string, string] = ["", "", ""]
      setParts(newParts)
      onChange(undefined)
      announce("Date cleared")
      return
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault()
      pendingRef.current = ""
      const newParts = [...parts] as [string, string, string]
      newParts[seg] = ""
      setParts(newParts)
      onChange(undefined)
      announce(`${DATE_SEG_STATIC[seg].label} cleared`)
      return
    }

    if (/^\d$/.test(e.key)) {
      e.preventDefault()
      const next = pendingRef.current + e.key
      const numVal = parseInt(next)

      // Auto-advance when first digit can't be a valid leading digit
      const autoAdvance =
        next.length === 1 &&
        maxLen === 2 &&
        ((seg === 0 && numVal > 3) || (seg === 1 && numVal > 1))

      if (next.length === maxLen || autoAdvance) {
        const clamped = Math.min(max, Math.max(min, numVal))
        const formatted = String(clamped).padStart(maxLen, "0")
        const newParts = [...parts] as [string, string, string]
        newParts[seg] = formatted
        // Clamp day when month/year is completed
        if (seg !== 0 && newParts[0]) {
          const dayMax = segs(newParts)[0].max
          const dayVal = parseInt(newParts[0])
          if (dayVal > dayMax) newParts[0] = String(dayMax).padStart(2, "0")
        }
        setParts(newParts)
        tryEmit(newParts)
        pendingRef.current = ""
        announce(`${DATE_SEG_STATIC[seg].label}: ${formatted}`)
        if (seg < 2) moveTo((seg + 1) as SegIdx, newParts)
      } else {
        pendingRef.current = next
        const newParts = [...parts] as [string, string, string]
        newParts[seg] = next
        setParts(newParts)
      }
    }
  }

  const isPartiallyFilled = parts.some(Boolean) && parts.some((p) => !p)
  const displayVal = buildDisplay(parts)
  const ariaLabel = value && isValid(value)
    ? `Date: ${displayVal}, active segment: ${DATE_SEG_STATIC[activeSeg].label}`
    : `Enter date, active segment: ${DATE_SEG_STATIC[activeSeg].label}`

  return (
    <div className="relative">
      {/* visually hidden live region for screen reader announcements */}
      <span
        ref={announceRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <Input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={displayVal}
        onChange={() => {}}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onFocus={handleFocus}
        aria-label={ariaLabel}
        aria-invalid={isPartiallyFilled}
        aria-describedby={hintId}
        placeholder="DD/MM/YYYY"
        className={cn("font-mono tracking-wider", className)}
      />
      <span id={hintId} className="sr-only">
        Enter day, month, year. Use arrow keys to change values, Tab to move between segments, T for today, Escape to clear.
      </span>
    </div>
  )
}

function CalendarWithInput({
  selected,
  onSelect,
  fromYear,
  toYear,
  ...props
}: Omit<
  React.ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect"
> & {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}) {
  const [month, setMonth] = React.useState<Date>(selected ?? new Date())

  React.useEffect(() => {
    if (selected && isValid(selected)) setMonth(selected)
  }, [selected])

  return (
    <div data-slot="calendar-with-input" className="flex flex-col gap-2">
      <SegmentedDateInput
        value={selected}
        onChange={(date) => {
          onSelect?.(date)
          if (date && isValid(date)) setMonth(date)
        }}
        fromYear={fromYear}
        toYear={toYear}
      />
      <Calendar
        mode="single"
        selected={selected}
        onSelect={(date) => {
          onSelect?.(date)
          if (date) setMonth(date)
        }}
        month={month}
        onMonthChange={setMonth}
        {...props}
      />
    </div>
  )
}

export { Calendar, CalendarDayButton, CalendarWithInput }
