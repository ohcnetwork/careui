/**
 * @name sheet
 * @description Extends the Dialog component to display content that complements the main content of the screen.
 * @dependencies radix-ui class-variance-authority lucide-react
 * @type registry:ui
 */
import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { XIcon } from "lucide-react";

const SheetContext = React.createContext<{
  shaking: boolean;
  onShakeEnd: () => void;
  side: "top" | "right" | "bottom" | "left";
  containerClassName: string;
} | null>(null);

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/10 duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  );
}

const sheetSizeClasses = {
  sm: "data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
  md: "data-[side=left]:sm:max-w-lg data-[side=right]:sm:max-w-lg",
  lg: "data-[side=left]:sm:max-w-2xl data-[side=right]:sm:max-w-2xl",
  xl: "data-[side=left]:sm:max-w-4xl data-[side=right]:sm:max-w-4xl",
  full: "data-[side=left]:max-w-none data-[side=right]:max-w-none",
  screen: "data-[side=left]:w-screen data-[side=left]:h-screen data-[side=right]:w-screen data-[side=right]:h-screen",
} as const;

type SheetSize = keyof typeof sheetSizeClasses;

function SheetContent({
  className,
  children,
  side = "right",
  size = "sm",
  dismissible = false,
  containerClassName,
  onOpenAutoFocus,
  onInteractOutside,
  onPointerDownOutside,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
  size?: SheetSize;
  dismissible?: boolean;
  containerClassName?: string;
}) {
  const isMobile = useIsMobile();
  const [shaking, setShaking] = React.useState(false);
  const resolvedContainerClassName =
    containerClassName ??
    (side === "top" || side === "bottom" ? "mx-auto w-full max-w-3xl px-4" : "px-4");

  function triggerShake() {
    setShaking(false);
    requestAnimationFrame(() => setShaking(true));
  }
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetContext.Provider value={{ shaking, onShakeEnd: () => setShaking(false), side, containerClassName: resolvedContainerClassName }}>
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "bg-background overflow-y-auto data-open:animate-in data-closed:animate-out data-[side=right]:data-closed:slide-out-to-right-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=top]:data-closed:slide-out-to-top-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:fade-out-0 data-open:fade-in-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=bottom]:data-open:slide-in-from-bottom-10 fixed z-50 flex flex-col bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-full data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-full data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b",
          sheetSizeClasses[size],
          className
        )}
        onOpenAutoFocus={(e) => {
          if (onOpenAutoFocus) {
            onOpenAutoFocus(e);
            return;
          }
          if (isMobile) {
            e.preventDefault();
            return;
          }
          const input = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(
            'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
          );
          if (input) {
            e.preventDefault();
            input.focus();
          }
        }}
        onInteractOutside={(e) => {
          if (!dismissible) {
            e.preventDefault();
            triggerShake();
          }
          onInteractOutside?.(e);
        }}
        onPointerDownOutside={(e) => {
          if (!dismissible) e.preventDefault();
          onPointerDownOutside?.(e);
        }}
        data-shaking={shaking || undefined}
        onAnimationEnd={() => setShaking(false)}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
      </SheetContext.Provider>
    </SheetPortal>
  );
}

function SheetHeader({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  const ctx = React.useContext(SheetContext);
  const inner = (
    <div className={cn("flex flex-row items-start justify-between gap-4", ctx?.containerClassName)}>
      <div className="flex flex-col gap-1">{children}</div>
      {showCloseButton && (
        <SheetPrimitive.Close data-slot="sheet-close" asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("-mt-1 -mr-1 shrink-0", ctx?.shaking && "bg-destructive/20 animate-sheet-shake")}
            onAnimationEnd={ctx?.onShakeEnd}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Button>
        </SheetPrimitive.Close>
      )}
    </div>
  );
  return (
    <div
      data-slot="sheet-header"
      className={cn("border-b py-3 sticky top-0", className)}
      {...props}
    >
      {inner}
    </div>
  );
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  const ctx = React.useContext(SheetContext);
  return (
    <div
      data-slot="sheet-body"
      className={cn("flex-1 py-4 overflow-y-auto", className)}
    >
      <div className={cn(ctx?.containerClassName)} {...props} />
    </div>
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  const ctx = React.useContext(SheetContext);
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto p-4 border-t bg-soft-background", className)}
    >
      <div className={cn("flex flex-row-reverse gap-2", ctx?.containerClassName)} {...props} />
    </div>
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground text-lg font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
