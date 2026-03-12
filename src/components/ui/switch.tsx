/**
 * @name switch
 * @description A control that allows the user to toggle between checked and not checked.
 * @dependencies radix-ui
 * @type registry:ui
 */
import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none hit-area-x-3 hit-area-y-2.5 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[31px] data-[size=default]:w-[53px] data-[size=sm]:h-6 data-[size=sm]:w-[40px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none relative flex items-center justify-center shadow-md rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-[28px] group-data-[size=sm]/switch:size-5 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-5px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
      >
        <CheckIcon className="absolute text-primary-900 transition-opacity duration-100 group-data-[size=default]/switch:size-3.5 group-data-[size=sm]/switch:size-3 group-data-checked/switch:opacity-100 group-data-unchecked/switch:opacity-0 dark:text-primary-400" />
        <MinusIcon className="absolute text-soft-foreground transition-opacity duration-100 group-data-[size=default]/switch:size-3.5 group-data-[size=sm]/switch:size-3 group-data-checked/switch:opacity-0 group-data-unchecked/switch:opacity-100 dark:text-neutral-500" />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
