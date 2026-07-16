/**
 * @name sheet
 * @description Extends the Dialog component to display content that complements the main content of the screen.
 * @dependencies @base-ui/react class-variance-authority lucide-react
 * @type registry:ui
 */
import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { XIcon } from "lucide-react";

type RenderProp =
  | React.ReactElement
  | ((props: unknown, state: unknown) => React.ReactElement)
  | undefined;

function resolveAsChild(
  asChild: boolean | undefined,
  children: React.ReactNode,
  render: RenderProp
): { render: RenderProp; children: React.ReactNode } {
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      children?: React.ReactNode;
      [key: string]: unknown;
    }>;
    const { children: extractedChildren, ...restProps } = child.props;
    return {
      render: React.createElement(child.type as React.ElementType, restProps),
      children: extractedChildren,
    };
  }
  return { render, children };
}

function isBlockedReason(reason: string) {
  return reason === "outside-press" || reason === "focus-out";
}

const SheetContext = React.createContext<{
  shaking: boolean;
  onShakeEnd: () => void;
  side: "top" | "right" | "bottom" | "left";
  containerClassName: string;
  scrolled: boolean;
  setScrolled: (v: boolean) => void;
} | null>(null);

const SheetRootContext = React.createContext<{
  dismissibleRef: React.RefObject<boolean>;
  triggerShakeRef: React.RefObject<(() => void) | null>;
}>({
  dismissibleRef: { current: true },
  triggerShakeRef: { current: null },
});

function Sheet({
  modal = true,
  onOpenChange,
  ...props
}: SheetPrimitive.Root.Props) {
  const dismissibleRef = React.useRef(true);
  const triggerShakeRef = React.useRef<(() => void) | null>(null);

  const handleOpenChange = React.useCallback(
    (open: boolean, eventDetails: SheetPrimitive.Root.ChangeEventDetails) => {
      if (!open && !dismissibleRef.current && isBlockedReason(eventDetails.reason)) {
        eventDetails.cancel();
        if (modal && eventDetails.reason === "outside-press") {
          triggerShakeRef.current?.();
        }
        return;
      }
      onOpenChange?.(open, eventDetails);
    },
    [modal, onOpenChange]
  );

  return (
    <SheetRootContext.Provider
      value={React.useMemo(
        () => ({ dismissibleRef, triggerShakeRef }),
        []
      )}
    >
      <SheetPrimitive.Root
        data-slot="sheet"
        modal={modal}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </SheetRootContext.Provider>
  );
}

function SheetTrigger({
  asChild,
  render,
  children,
  ...props
}: Omit<SheetPrimitive.Trigger.Props, "render"> & {
  asChild?: boolean;
  render?: RenderProp;
}) {
  const resolved = resolveAsChild(asChild, children, render);
  return (
    <SheetPrimitive.Trigger
      data-slot="sheet-trigger"
      render={resolved.render}
      {...props}
    >
      {resolved.children}
    </SheetPrimitive.Trigger>
  );
}

function SheetClose({
  asChild,
  render,
  children,
  ...props
}: Omit<SheetPrimitive.Close.Props, "render"> & {
  asChild?: boolean;
  render?: RenderProp;
}) {
  const resolved = resolveAsChild(asChild, children, render);
  return (
    <SheetPrimitive.Close
      data-slot="sheet-close"
      render={resolved.render}
      {...props}
    >
      {resolved.children}
    </SheetPrimitive.Close>
  );
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
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
  screen:
    "data-[side=left]:w-screen data-[side=left]:h-screen data-[side=right]:w-screen data-[side=right]:h-screen",
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
  initialFocus,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  size?: SheetSize;
  dismissible?: boolean;
  overlay?: boolean;
  containerClassName?: string;
}) {
  const isMobile = useIsMobile();
  const { dismissibleRef, triggerShakeRef } = React.useContext(SheetRootContext);
  const [shaking, setShaking] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement | null>(null);

  const onShakeEnd = React.useCallback(() => setShaking(false), []);
  const triggerShake = React.useCallback(() => {
    setShaking(false);
    requestAnimationFrame(() => setShaking(true));
  }, []);

  // Always-latest refs: Root's onOpenChange fires later, asynchronously, in
  // response to user interaction — by then this effect has already run.
  React.useEffect(() => {
    dismissibleRef.current = dismissible;
    triggerShakeRef.current = triggerShake;
  }, [dismissibleRef, dismissible, triggerShakeRef, triggerShake]);

  const viewportRef = React.useCallback(
    (el: HTMLDivElement | null) => {
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
            const keyboardHeight =
              window.innerHeight - vv.offsetTop - vv.height;
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
    },
    [side]
  );

  const setContentRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      popupRef.current = el;
      return viewportRef(el);
    },
    [viewportRef]
  );

  const resolvedContainerClassName =
    containerClassName ??
    (side === "top" || side === "bottom"
      ? "mx-auto w-full max-w-2xl px-4"
      : "px-4");

  const contextValue = React.useMemo(
    () => ({
      shaking,
      onShakeEnd,
      side,
      containerClassName: resolvedContainerClassName,
      scrolled,
      setScrolled,
    }),
    [shaking, onShakeEnd, side, resolvedContainerClassName, scrolled]
  );

  return (
    <SheetPortal>
      {overlay && <SheetOverlay />}
      <SheetPrimitive.Popup
        ref={setContentRef}
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "bg-background data-open:animate-in data-closed:animate-out data-[side=right]:data-closed:slide-out-to-right-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=top]:data-closed:slide-out-to-top-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:fade-out-0 data-open:fade-in-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=bottom]:data-open:slide-in-from-bottom-10 fixed z-50 flex flex-col overflow-hidden bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-dvh data-[side=left]:w-full data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-dvh data-[side=right]:w-full data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b",
          sheetSizeClasses[size],
          className
        )}
        initialFocus={
          initialFocus ??
          (() => {
            if (isMobile) return false;
            const input = popupRef.current?.querySelector<HTMLElement>(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            );
            return input ?? undefined;
          })
        }
        data-shaking={shaking || undefined}
        onAnimationEnd={onShakeEnd}
        {...props}
      >
        {/*
         * SheetContext.Provider lives INSIDE SheetPrimitive.Popup (not
         * between SheetPortal and SheetPrimitive.Popup). This mirrored a
         * hard Radix Presence requirement (cloneElement(child, { ref })
         * on its direct child; a Context Provider there silently dropped
         * the ref, breaking exit-animation detection). Base UI's Popup
         * uses data-starting-style/data-ending-style + CSS transitions
         * instead of that ref-based mechanism, so this specific failure
         * mode no longer applies — kept in the same position anyway since
         * it costs nothing and there's no reason to relitigate it.
         */}
        <SheetContext.Provider value={contextValue}>
          {children}
        </SheetContext.Provider>
      </SheetPrimitive.Popup>
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
    <div
      className={cn(
        "flex flex-row items-start justify-between gap-4",
        ctx?.containerClassName
      )}
    >
      <div className="flex flex-col self-center-safe">{children}</div>
      {showCloseButton && (
        <SheetClose
          render={
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "-mt-1 -mr-1 shrink-0",
                ctx?.shaking &&
                  "bg-destructive/20 animate-sheet-shake will-change-transform"
              )}
              onAnimationEnd={ctx?.onShakeEnd}
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          }
        />
      )}
    </div>
  );
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "bg-background shrink-0 border-b transition-all duration-200",
        (ctx?.side === "top" || ctx?.side === "bottom") && "md:pr-4",
        ctx?.scrolled ? "items-center py-1.5" : "py-2 md:py-3",
        className
      )}
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
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain py-4 [scrollbar-gutter:stable]",
        className
      )}
      onScroll={(e) =>
        ctx?.setScrolled((e.currentTarget as HTMLElement).scrollTop > 0)
      }
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
      className={cn("bg-soft-background shrink-0 border-t py-4", className)}
    >
      <div
        className={cn("flex flex-row-reverse gap-4", ctx?.containerClassName)}
        {...props}
      />
    </div>
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
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
}: SheetPrimitive.Description.Props) {
  const ctx = React.useContext(SheetContext);
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
        ctx?.scrolled
          ? "grid-rows-[0fr] opacity-0"
          : "grid-rows-[1fr] opacity-100"
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
