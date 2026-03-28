/**
 * @name drawer
 * @description A drawer component for React, built on top of Vaul.
 * @dependencies vaul lucide-react button
 * @type registry:ui
 */
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      scrollLockTimeout={0}
      autoFocus
      {...props}
    />
  );
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

const drawerContainerClasses = {
  md: "mx-auto w-full max-w-lg",
  lg: "mx-auto w-full max-w-2xl",
  full: "",
} as const;

type DrawerSize = keyof typeof drawerContainerClasses;

const DrawerContext = React.createContext<{ size: DrawerSize } | null>(null);

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        // `![animation-name:none]` forces Radix Presence to see animationName==="none"
        // and unmount the overlay immediately when the drawer closes (rather than waiting
        // for the 500ms vaul fadeOut animation). This is critical: RemoveScrollSideCar
        // only removes its non-passive document wheel/touchmove listeners on unmount,
        // so keeping the overlay alive for 500ms was blocking page scroll after close.
        "fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs [animation-name:none]! data-closed:pointer-events-none!",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  size = "full",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
  size?: DrawerSize;
}) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerContext.Provider value={{ size }}>
        <DrawerPrimitive.Content
          data-slot="drawer-content"
          className={cn(
            "group/drawer-content fixed z-50 flex h-auto flex-col bg-popover text-sm text-popover-foreground data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:h-dvh data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t md:data-[vaul-drawer-direction=bottom]:h-auto md:data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-full data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:h-dvh data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b md:data-[vaul-drawer-direction=top]:h-auto md:data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=left]:md:max-w-sm data-[vaul-drawer-direction=right]:md:max-w-sm",
            className
          )}
          {...props}
        >
          <div className="mx-auto mt-4 hidden h-1.5 w-25 shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
          {children}
        </DrawerPrimitive.Content>
      </DrawerContext.Provider>
    </DrawerPortal>
  )
}

function DrawerHeader({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<"div"> & { showCloseButton?: boolean }) {
  const ctx = React.useContext(DrawerContext);
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-left group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:text-left",
        className
      )}
      {...props}
    >
      <div className={cn("flex flex-row items-start justify-between gap-4", ctx && drawerContainerClasses[ctx.size])}>
        <div className="flex flex-col gap-0.5 md:gap-1.5 flex-1">
          {children}
        </div>
        {showCloseButton && (
          <DrawerPrimitive.Close asChild>
            <Button variant="ghost" size="icon" className="-mt-1 -mr-1 shrink-0 md:hidden">
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerPrimitive.Close>
        )}
      </div>
    </div>
  )
}

function DrawerBody({ className, children, ...props }: React.ComponentProps<"div">) {
  const ctx = React.useContext(DrawerContext);
  return (
    <div
      data-slot="drawer-body"
      className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4", className)}
      {...props}
    >
      <div className={cn(ctx && drawerContainerClasses[ctx.size])}>{children}</div>
    </div>
  )
}

function DrawerFooter({ className, children, ...props }: React.ComponentProps<"div">) {
  const ctx = React.useContext(DrawerContext);
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4 border-t bg-soft-background", className)}
      {...props}
    >
      <div className={cn("flex flex-row-reverse gap-4", ctx && drawerContainerClasses[ctx.size])}>{children}</div>
    </div>
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
