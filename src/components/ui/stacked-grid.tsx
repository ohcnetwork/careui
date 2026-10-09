/**
 * @name stacked-grid
 * @description A masonry-style layout that deals items round-robin into balanced columns. The column count follows the container width.
 * @dependencies
 * @type registry:ui
 */
import * as React from "react";

import { cn } from "@/lib/utils";

interface StackedGridProps extends React.ComponentProps<"div"> {
  items: React.ReactNode[];
  /** Target width of one column, in px. */
  columnWidth?: number;
  /** Below this container width the grid collapses to a single column. */
  singleColumnBelow?: number;
}

function StackedGrid({
  items,
  columnWidth = 300,
  singleColumnBelow = 700,
  className,
  ...props
}: StackedGridProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = React.useState(1);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setColumnCount(
        width > singleColumnBelow
          ? Math.max(1, Math.floor(width / columnWidth))
          : 1
      );
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [columnWidth, singleColumnBelow]);

  const columns = React.useMemo(() => {
    const result: React.ReactNode[][] = Array.from(
      { length: columnCount },
      () => []
    );
    items.forEach((item, index) => result[index % columnCount].push(item));
    return result.filter((column) => column.length > 0);
  }, [items, columnCount]);

  return (
    <div
      ref={containerRef}
      data-slot="stacked-grid"
      className={cn("flex w-full justify-center gap-2", className)}
      {...props}
    >
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          data-slot="stacked-grid-column"
          className={cn(
            "flex flex-col gap-2",
            items.length > columns.length && "flex-1"
          )}
        >
          {column.map((item, itemIndex) => (
            <div key={itemIndex}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export { StackedGrid };
