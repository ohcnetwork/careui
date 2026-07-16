/**
 * @name dialog
 * @description A window overlaid on either the primary window or another dialog window.
 * @dependencies @base-ui/react
 * @type registry:ui
 */
import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  asChild,
  render,
  children,
  ...props
}: Omit<DialogPrimitive.Trigger.Props, "render"> & {
  asChild?: boolean;
  render?: RenderProp;
}) {
  const resolved = resolveAsChild(asChild, children, render);
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      render={resolved.render}
      {...props}
    >
      {resolved.children}
    </DialogPrimitive.Trigger>
  );
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  asChild,
  render,
  children,
  ...props
}: Omit<DialogPrimitive.Close.Props, "render"> & {
  asChild?: boolean;
  render?: RenderProp;
}) {
  const resolved = resolveAsChild(asChild, children, render);
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      render={resolved.render}
      {...props}
    >
      {resolved.children}
    </DialogPrimitive.Close>
  );
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 isolate z-50 bg-black/50 duration-100 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  innerClassName,
  children,
  initialFocus,
  ...props
}: DialogPrimitive.Popup.Props & {
  innerClassName?: string;
}) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        ref={contentRef}
        data-slot="dialog-content"
        className={cn(
          "bg-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl p-1.5 shadow-xl duration-100 outline-none sm:max-w-md",
          className
        )}
        initialFocus={
          initialFocus ??
          (() => {
            const input = contentRef.current?.querySelector<HTMLElement>(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            );
            return input ?? undefined;
          })
        }
        {...props}
      >
        <div
          className={cn(
            "bg-background grid gap-4 rounded-lg p-4 text-sm md:px-6 md:py-5",
            innerClassName
          )}
        >
          {children}
        </div>
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-row items-start justify-between gap-4 border-b pb-4",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-0.5">{children}</div>
      {showCloseButton && (
        <DialogClose
          render={
            <Button variant="ghost" size="icon" className="-mt-1 -mr-1 shrink-0">
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          }
        />
      )}
    </div>
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-4 border-t pt-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogClose render={<Button variant="outline">Close</Button>} />
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-soft-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3",
        className
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
