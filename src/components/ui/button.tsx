/**
 * @name button
 * @description Displays a button or a component that looks like a button.
 * @dependencies @radix-ui/react-slot class-variance-authority
 * @type registry:ui
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 px-3 whitespace-nowrap rounded-sm border border-transparent bg-clip-padding text-sm font-semibold tracking-wide outline-0 select-none shrink-0 transition touch-action-manipulation [-webkit-tap-highlight-color:transparent] group/button [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-destructive ",
  {
    variants: {
      variant: {
        default:
          "border-(--color-primary-950)/90 bg-primary text-primary-foreground shadow-md shadow-primary/50 hover:bg-primary/90 not-disabled:inset-shadow-[0_1px_--theme(--color-primary-200/30%)] [:active,[data-pressed]]:bg-primary/80 [:active,[data-pressed]]:inset-shadow-[0_2px_5px_1px_--theme(--color-primary/50%)] [:disabled,:active,[data-pressed]]:shadow-none",
        secondary:
          "border border-(--color-primary-700) bg-background text-(--color-primary-900) shadow-md hover:border-(--color-primary-600) hover:bg-primary/10 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground [:active,[data-pressed]]:bg-primary/8 [:active,[data-pressed]]:inset-shadow-[0_2px_5px_1px_--theme(--color-gray-500/35%)] [:disabled,:active,[data-pressed]]:shadow-none",
        outline:
          "border-border border-gray-400 bg-background shadow-md hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground [:active,[data-pressed]]:bg-muted/80 [:active,[data-pressed]]:inset-shadow-[0_1px_4px_1px_--theme(--color-gray-400/50%)] [:disabled,:active,[data-pressed]]:shadow-none dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        ghost:
          "underline underline-offset-4 hover:bg-muted hover:text-foreground hover:border-(--color-stroke-default) aria-expanded:bg-muted aria-expanded:text-foreground [:active,[data-pressed]]:bg-muted/90 [:active,[data-pressed]]:inset-shadow-[0_1px_4px_1px_--theme(--color-gray-400/40%)] dark:hover:bg-muted/50 dark:[:active,[data-pressed]]:bg-muted/60",
        destructive:
          "border border-destructive/50 bg-red-100/75 text-red-700 shadow-md hover:bg-destructive/20 focus-visible:outline-destructive [:active,[data-pressed]]:bg-destructive/25 [:active,[data-pressed]]:inset-shadow-[0_1px_4px_1px_--theme(--color-red-400/40%)] [:disabled,:active,[data-pressed]]:shadow-none dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:[:active,[data-pressed]]:bg-destructive/35",
        "destructive-solid":
          "border border-red-700 bg-destructive text-(--color-fg-inverse) shadow-md hover:bg-destructive/80 focus-visible:outline-destructive [:active,[data-pressed]]:bg-destructive/70 [:active,[data-pressed]]:inset-shadow-[0_1px_4px_1px_--theme(--color-destructive/90%)] [:disabled,:active,[data-pressed]]:shadow-none dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:[:active,[data-pressed]]:bg-destructive/35",
        link: "text-blue-700 underline underline-offset-4 transition-[color,text-underline-offset] hover:underline-offset-2 hover:text-blue-800 [:active,[data-pressed]]:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 dark:[:active,[data-pressed]]:text-blue-200",
      },
      size: {
        default:
          "h-10 px-3.5 [&_svg:not([class*='size-'])]:size-5 has-data-[icon=inline-start]:pl-3 has-data-[icon=inline-end]:pr-3 in-data-[slot=button-group]:rounded-md",
        xs: "h-8 gap-1 px-2.5 rounded-[min(var(--radius-md),8px)] text-xs [&_svg:not([class*='size-'])]:size-3.5 has-data-[icon=inline-start]:pl-2 has-data-[icon=inline-end]:pr-2 in-data-[slot=button-group]:rounded-md",
        sm: "h-9 gap-1 px-3 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-4 has-data-[icon=inline-start]:pl-2.5 has-data-[icon=inline-end]:pr-2.5 in-data-[slot=button-group]:rounded-md",
        lg: "h-11 gap-1.5 px-4 [&_svg:not([class*='size-'])]:size-5 has-data-[icon=inline-start]:pl-3.5 has-data-[icon=inline-end]:pr-3.5",
        xl: "h-12 gap-2 px-4.5 text-base [&_svg:not([class*='size-'])]:size-6 has-data-[icon=inline-start]:pl-4 has-data-[icon=inline-end]:pr-4",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-5",
        "icon-xs":
          "size-8 rounded-[min(var(--radius-md),8px)] [&_svg:not([class*='size-'])]:size-3.5 in-data-[slot=button-group]:rounded-md",
        "icon-sm":
          "size-9 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-4 in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-11 [&_svg:not([class*='size-'])]:size-5",
        "icon-xl": "size-12 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
