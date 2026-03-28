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
  scrolled: boolean;
  setScrolled: (v: boolean) => void;
} | null>(null);

function Sheet({ modal = true, ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" modal={modal} {...props} />;
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
  overlay = true,
  containerClassName,
  onOpenAutoFocus,
  onInteractOutside,
  onPointerDownOutside,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
  size?: SheetSize;
  dismissible?: boolean;
  overlay?: boolean;
  containerClassName?: string;
}) {
  const isMobile = useIsMobile();
  const [shaking, setShaking] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const contentRef = React.useCallback((el: HTMLDivElement | null) => {
    const vv = window.visualViewport;
    if (!el || !vv) return;
    let rafId: number;
    const update = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (side === "left" || side === "right") {
          el.style.height = `${vv.height}px`;
          el.style.top = `${vv.offsetTop}px`;
        } else if (side === "bottom") {
          const keyboardHeight = window.innerHeight - vv.offsetTop - vv.height;
          el.style.bottom = `${keyboardHeight}px`;
        } else if (side === "top") {
          el.style.maxHeight = `${vv.height}px`;
        }
      });
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      cancelAnimationFrame(rafId);
    };
  }, [side]);

  const resolvedContainerClassName =
    containerClassName ??
    (side === "top" || side === "bottom" ? "mx-auto w-full max-w-2xl px-4" : "px-4");

  const onShakeEnd = React.useCallback(() => setShaking(false), []);
  const triggerShake = React.useCallback(() => {
    setShaking(false);
    requestAnimationFrame(() => setShaking(true));
  }, []);

  const contextValue = React.useMemo(
    () => ({ shaking, onShakeEnd, side, containerClassName: resolvedContainerClassName, scrolled, setScrolled }),
    [shaking, onShakeEnd, side, resolvedContainerClassName, scrolled]
  );

  return (
    <SheetPortal>
      {overlay && <SheetOverlay />}
      <SheetContext.Provider value={contextValue}>
        <SheetPrimitive.Content
          ref={contentRef}
          data-slot="sheet-content"
          data-side={side}
          className={cn(
            "bg-background overflow-hidden data-open:animate-in data-closed:animate-out data-[side=right]:data-closed:slide-out-to-right-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=top]:data-closed:slide-out-to-top-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:fade-out-0 data-open:fade-in-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=bottom]:data-open:slide-in-from-bottom-10 fixed z-50 flex flex-col bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-dvh data-[side=left]:w-full data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-dvh data-[side=right]:w-full data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b",
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
          onAnimationEnd={onShakeEnd}
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
      <div className="flex flex-col self-center-safe">{children}</div>
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
      className={cn("border-b bg-background shrink-0 transition-all duration-200", (ctx?.side === "top" || ctx?.side === "bottom") && "md:pr-4", ctx?.scrolled ? "items-center py-1.5" : "py-2 md:py-3", className)}
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
      className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain py-4 [scrollbar-gutter:stable]", className)}
      onScroll={(e) => ctx?.setScrolled((e.currentTarget as HTMLElement).scrollTop > 0)}
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
      className={cn("py-4 border-t bg-soft-background shrink-0", className)}
    >
      <div className={cn("flex flex-row-reverse gap-4", ctx?.containerClassName)} {...props} />
    </div>
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  const ctx = React.useContext(SheetContext);
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "text-foreground font-semibold transition-[font-size] duration-200 ease-in-out",
        ctx?.scrolled ? "text-base" : "text-lg",
        className
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  const ctx = React.useContext(SheetContext);
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
        ctx?.scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
      )}
    >
      <div className="overflow-hidden">
        <SheetPrimitive.Description
          data-slot="sheet-description"
          className={cn("text-muted-foreground text-sm", className)}
          {...props}
        />
      </div>
    </div>
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
