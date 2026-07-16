/**
 * @name aspect-ratio
 * @description Displays content within a desired ratio.
 * @dependencies none
 * @type registry:ui
 */
import { cn } from "@/lib/utils";

function AspectRatio({
  ratio,
  className,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={
        {
          "--ratio": ratio,
        } as React.CSSProperties
      }
      className={cn("relative aspect-(--ratio)", className)}
      {...props}
    />
  );
}

export { AspectRatio };
