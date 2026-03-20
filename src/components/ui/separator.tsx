/**
 * @name separator
 * @description Visually or semantically separates content.
 * @dependencies radix-ui class-variance-authority
 * @type registry:ui
 */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const separatorVariants = cva(
  "shrink-0 data-horizontal:w-full data-vertical:self-stretch",
  {
    variants: {
      variant: {
        solid:
          "bg-border data-horizontal:h-px data-vertical:w-px",
        dashed:
          "border-border border-dashed data-horizontal:h-0 data-horizontal:border-t data-vertical:w-0 data-vertical:border-l",
        inset:
          "border-border border-t data-horizontal:h-0 data-horizontal:w-full data-horizontal:[box-shadow:0_1px_0_0_var(--background)] data-vertical:w-0 data-vertical:border-l data-vertical:[box-shadow:1px_0_0_0_var(--background)]",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
)

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Separator, separatorVariants }
