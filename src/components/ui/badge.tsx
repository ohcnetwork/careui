/**
 * @name badge
 * @description A badge component for displaying status labels, tags, and notification indicators with dot, icon, and close button variants across semantic and named Tailwind color scales.
 * @dependencies class-variance-authority lucide-react radix-ui
 * @type registry:ui
 */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-sm border font-medium w-fit whitespace-nowrap shrink-0 overflow-hidden [&>svg]:size-3 [&>svg]:pointer-events-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Semantic
        primary:
          "border-primary/50 dark:border-primary/30 bg-primary/10 text-primary-900 dark:text-primary [a&]:hover:bg-primary/20",
        success:
          "border-green-600 dark:border-green-500/30 bg-green-500/10 text-green-800 dark:text-green-400 [a&]:hover:bg-green-500/20",
        warning:
          "border-orange-400 dark:border-orange-500/30 bg-orange-500/10 text-orange-800 dark:text-orange-400 [a&]:hover:bg-orange-500/20",
        info:
          "border-indigo-500 dark:border-indigo-500/30 bg-indigo-500/10 text-indigo-800 dark:text-indigo-400 [a&]:hover:bg-indigo-500/20",
        destructive:
          "border-red-400 dark:border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 [a&]:hover:bg-red-500/20",
        // Tailwind color scale
        neutral:
          "border-neutral-400/40 bg-neutral-400/10 text-neutral-700 dark:text-neutral-300 [a&]:hover:bg-neutral-400/20",
        red:
          "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400 [a&]:hover:bg-red-500/20",
        orange:
          "border-orange-500/40 bg-orange-500/10 text-orange-700 dark:text-orange-400 [a&]:hover:bg-orange-500/20",
        amber:
          "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400 [a&]:hover:bg-amber-500/20",
        yellow:
          "border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 [a&]:hover:bg-yellow-500/20",
        lime:
          "border-lime-500/40 bg-lime-500/10 text-lime-700 dark:text-lime-500 [a&]:hover:bg-lime-500/20",
        green:
          "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-400 [a&]:hover:bg-green-500/20",
        emerald:
          "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 [a&]:hover:bg-emerald-500/20",
        teal:
          "border-teal-500/40 bg-teal-500/10 text-teal-700 dark:text-teal-400 [a&]:hover:bg-teal-500/20",
        cyan:
          "border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 [a&]:hover:bg-cyan-500/20",
        sky:
          "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-400 [a&]:hover:bg-sky-500/20",
        blue:
          "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-400 [a&]:hover:bg-blue-500/20",
        indigo:
          "border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 [a&]:hover:bg-indigo-500/20",
        violet:
          "border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-400 [a&]:hover:bg-violet-500/20",
        purple:
          "border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-400 [a&]:hover:bg-purple-500/20",
        fuchsia:
          "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400 [a&]:hover:bg-fuchsia-500/20",
        pink:
          "border-pink-500/40 bg-pink-500/10 text-pink-700 dark:text-pink-400 [a&]:hover:bg-pink-500/20",
        rose:
          "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-400 [a&]:hover:bg-rose-500/20",
      },
      size: {
        xs: "h-4 text-[10px] px-1.5 [&>svg]:size-2.5 has-data-[icon=inline-start]:ps-1 has-data-[icon=inline-end]:pe-1",
        sm: "h-5 text-xs px-2 [&>svg]:size-3 has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5",
        md: "h-6 text-xs px-2.5 [&>svg]:size-3 has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2",
        lg: "h-7 text-sm px-3 [&>svg]:size-3.5 has-data-[icon=inline-start]:ps-2.5 has-data-[icon=inline-end]:pe-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>
export type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>["size"]>

// Solid fill classes — only available for semantic variants
const solidClassMap: Partial<Record<BadgeVariant, string>> = {
  primary:     "bg-primary-400 border-primary-600 text-primary-950 [a&]:hover:bg-primary/90",
  success:     "bg-green-400 border-green-600 text-green-950 [a&]:hover:bg-green-500/90",
  warning:     "bg-orange-300 border-orange-600 text-orange-950 [a&]:hover:bg-orange-400/90",
  info:        "bg-indigo-300 border-indigo-500 text-indigo-950 [a&]:hover:bg-blue-500/90",
  destructive: "bg-red-600 border-red-500 text-white [a&]:hover:bg-red-500/90",
}

// Icon size inside the close button
const closeIconSizeMap: Record<BadgeSize, string> = {
  xs: "size-2.5",
  sm: "size-3",
  md: "size-3",
  lg: "size-3.5",
}

function Badge({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  dot = false,
  solid = false,
  onClose,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    dot?: boolean
    /** Solid filled background — only applies to the 5 semantic variants */
    solid?: boolean
    /** Renders a close (×) button; not compatible with asChild */
    onClose?: React.MouseEventHandler<HTMLButtonElement>
  }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-solid={solid || undefined}
      className={cn(
        badgeVariants({ variant, size }),
        solid && variant && solidClassMap[variant],
        onClose && "pe-0",
        className
      )}
      {...props}
    >
      {dot && (
        <span
          data-slot="badge-dot"
          className="size-1.5 rounded-full bg-current shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Remove"
          className="self-stretch aspect-square shrink-0 inline-flex items-center justify-center rounded-r-sm cursor-pointer opacity-60 hover:opacity-100 hover:bg-current/20 outline-none focus-visible:opacity-100 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-indigo-500/80"
        >
          <X className={cn(closeIconSizeMap[size as BadgeSize] ?? "size-3")} />
        </button>
      )}
    </Comp>
  )
}

export { Badge, badgeVariants }
