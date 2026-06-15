/**
 * @name drawer
 * @description A drawer component for React, built on top of Vaul.
 * @dependencies vaul lucide-react button
 * @type registry:ui
 */
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerNestedRoot({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.NestedRoot>) {
  return <DrawerPrimitive.NestedRoot data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
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
        "fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  );
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
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          // Animations: vaul injects slideFromBottom/slideToBottom (and the
          // top/left/right equivalents) keyframes keyed off
          // [data-vaul-drawer-direction] + [data-state]. Radix Presence reads
          // the active animation-name from this element and waits for it to
          // finish before unmounting, then sets animation-fill-mode: forwards
          // to prevent any flash. Don't add Tailwind animate-in/out here — it
          // works against vaul's transitions.
          "group/drawer-content bg-popover text-popover-foreground fixed z-50 flex h-auto flex-col text-sm",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[85vh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        {/*
         * IMPORTANT: DrawerContext.Provider lives INSIDE DrawerPrimitive.Content,
         * not between Portal and Content. Putting the Provider between them
         * breaks Radix Presence's `cloneElement(child, { ref })` chain — Context
         * Providers silently drop refs, so Presence never gets a node, its
         * stylesRef stays null, and on close it reads animationName as "none"
         * and unmounts the drawer instantly (no slide-out animation).
         */}
        <DrawerContext.Provider value={{ size }}>
          <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
          {children}
        </DrawerContext.Provider>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
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
      <div
        className={cn(
          "flex flex-row items-start justify-between gap-4",
          ctx && drawerContainerClasses[ctx.size]
        )}
      >
        <div className="flex flex-1 flex-col gap-0.5 md:gap-1.5">
          {children}
        </div>
        {showCloseButton && (
          <DrawerPrimitive.Close asChild>
            <Button
              variant="ghost"
              size="icon"
              className="-mt-1 -mr-1 shrink-0 md:hidden"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerPrimitive.Close>
        )}
      </div>
    </div>
  );
}

function DrawerBody({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = React.useContext(DrawerContext);
  return (
    <div
      data-slot="drawer-body"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4",
        className
      )}
      {...props}
    >
      <div className={cn(ctx && drawerContainerClasses[ctx.size])}>
        {children}
      </div>
    </div>
  );
}

function DrawerFooter({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = React.useContext(DrawerContext);
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "bg-soft-background mt-auto flex flex-col gap-2 border-t p-4",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex flex-row-reverse gap-4",
          ctx && drawerContainerClasses[ctx.size]
        )}
      >
        {children}
      </div>
    </div>
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-medium", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerNestedRoot,
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
};
