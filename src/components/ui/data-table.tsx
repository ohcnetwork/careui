/**
 * @name data-table
 * @description Powerful table and datagrids built using TanStack Table. Supports sorting, filtering, pagination, column visibility, and row selection.
 * @dependencies @tanstack/react-table lucide-react
 * @type registry:ui
 */
"use client";

import * as React from "react";
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type ExpandedState,
  type Row,
  type RowData,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  Check,
  ChevronDown,
  MoreHorizontal,
  Pin,
  PinOff,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    skeleton?: React.ReactNode;
  }
}

// ─── Column-move context (used by DataTableColumnHeader when movableColumns=true) ──

interface DataTableMoveContextValue {
  moveColumn: (id: string, direction: "left" | "right") => void;
  columnOrder: string[];
}

const DataTableMoveContext =
  React.createContext<DataTableMoveContextValue | null>(null);

// ─── Column-pin context (used by DataTableColumnHeader when pinnable=true) ──────

const DataTablePinContext = React.createContext<boolean>(false);

// ─── DataTable ────────────────────────────────────────────────────────────────

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Key of the column to use for the filter input. Defaults to the first string column. */
  filterColumn?: string;
  /** Placeholder for the filter input */
  filterPlaceholder?: string;
  /** Show vertical borders between cells */
  cellBorder?: boolean;
  /** Reduce cell padding for a compact layout */
  dense?: boolean;
  /** Let columns size to their content instead of stretching to full width */
  autoWidth?: boolean;
  /** Render expanded content below a row. Pair with a toggle column that calls row.getToggleExpandedHandler(). */
  renderExpandedRow?: (row: Row<TData>) => React.ReactNode;
  /** Hide the filter/column toolbar. Useful for nested sub-tables. */
  hideToolbar?: boolean;
  /** Allow columns to be reordered by dragging their headers. */
  movableColumns?: boolean;
  /** Enable column pinning via the header dropdown. Renders a horizontally scrollable table with sticky pinned columns. */
  pinnable?: boolean;
  /** Initial column pinning state when pinnable is true. */
  initialPinning?: ColumnPinningState;
  className?: string;
}

function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder = "Filter...",
  cellBorder = false,
  dense = false,
  autoWidth = false,
  renderExpandedRow,
  hideToolbar = false,
  movableColumns = false,
  pinnable = false,
  initialPinning,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns.map((c) => (c as any).id ?? String((c as any).accessorKey))
  );

  const moveColumn = React.useCallback(
    (id: string, direction: "left" | "right") => {
      setColumnOrder((prev) => {
        const order = prev.length
          ? [...prev]
          : table.getAllLeafColumns().map((c) => c.id);
        const idx = order.indexOf(id);
        if (direction === "left" && idx > 0) {
          const next = [...order];
          [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
          return next;
        }
        if (direction === "right" && idx < order.length - 1) {
          const next = [...order];
          [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
          return next;
        }
        return order;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    getRowCanExpand: renderExpandedRow ? () => true : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    ...(movableColumns && { onColumnOrderChange: setColumnOrder }),
    ...(pinnable &&
      initialPinning && {
        initialState: { columnPinning: initialPinning },
      }),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
      ...(movableColumns && { columnOrder }),
    },
  });

  // Determine filter column: use the provided prop, or the first filterable column
  const activeFilterColumn =
    filterColumn ?? table.getAllColumns().find((c) => c.getCanFilter())?.id;

  const moveCtxValue = React.useMemo(
    () => (movableColumns ? { moveColumn, columnOrder } : null),
    [movableColumns, moveColumn, columnOrder]
  );

  const pinCellStyle = (col: Column<TData, unknown>) => {
    if (!pinnable) return undefined;
    const pinned = col.getIsPinned();
    if (!pinned) return undefined;
    return {
      width: col.getSize(),
      minWidth: col.getSize(),
      maxWidth: col.getSize(),
      position: "sticky" as const,
      left: pinned === "left" ? col.getStart("left") : undefined,
      right: pinned === "right" ? col.getAfter("right") : undefined,
      zIndex: 1,
      boxShadow:
        pinned === "left"
          ? "inset -1px 0 0 0 var(--border)"
          : "inset 1px 0 0 0 var(--border)",
    };
  };

  const pinTableMinWidth = pinnable
    ? table.getAllLeafColumns().reduce((sum, col) => sum + col.getSize(), 0)
    : undefined;

  const tableContent = (
    <DataTableMoveContext.Provider value={moveCtxValue}>
      <div data-slot="data-table" className={cn("w-full", className)}>
        {/* Toolbar */}
        {!hideToolbar && (
          <div className="flex items-center gap-2 py-4">
            {activeFilterColumn && (
              <Input
                placeholder={filterPlaceholder}
                value={
                  (table
                    .getColumn(activeFilterColumn)
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn(activeFilterColumn)
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            )}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Table */}
        <div
          className={cn(
            "rounded-md border",
            pinnable ? "overflow-x-auto" : "overflow-hidden",
            "[&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1",
            "[&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3",
            cellBorder &&
              "[&_td:not(:last-child)]:border-r [&_th:not(:last-child)]:border-r",
            pinnable &&
              !cellBorder &&
              "[&_td:not(:last-child):not([data-pinned])]:border-r [&_th:not(:last-child):not([data-pinned])]:border-r",
            dense && "[&_td]:py-1.5 [&_th]:h-8 [&_th]:py-0",
            autoWidth && "w-fit [&_table]:w-auto"
          )}
        >
          <Table
            style={
              pinTableMinWidth ? { minWidth: pinTableMinWidth } : undefined
            }
          >
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={pinCellStyle(header.column)}
                      data-pinned={
                        pinnable && header.column.getIsPinned()
                          ? header.column.getIsPinned()
                          : undefined
                      }
                      className={cn(
                        header.column.columnDef.meta?.className,
                        pinnable &&
                          header.column.getIsPinned() &&
                          "bg-soft-background"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={pinCellStyle(cell.column)}
                          data-pinned={
                            pinnable && cell.column.getIsPinned()
                              ? cell.column.getIsPinned()
                              : undefined
                          }
                          className={cn(
                            cell.column.columnDef.meta?.className,
                            pinnable &&
                              cell.column.getIsPinned() &&
                              "bg-background"
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && renderExpandedRow && (
                      <TableRow className="hover:bg-transparent">
                        <TableCell
                          colSpan={row.getVisibleCells().length}
                          className="p-0"
                        >
                          {renderExpandedRow(row)}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {table
              .getFooterGroups()
              .some((fg) =>
                fg.headers.some((h) => h.column.columnDef.footer)
              ) && (
              <TableFooter>
                {table.getFooterGroups().map((footerGroup) => (
                  <TableRow key={footerGroup.id}>
                    {footerGroup.headers.map((footer) => (
                      <TableCell
                        key={footer.id}
                        colSpan={footer.colSpan}
                        className={cn(footer.column.columnDef.meta?.className)}
                      >
                        {footer.isPlaceholder
                          ? null
                          : flexRender(
                              footer.column.columnDef.footer,
                              footer.getContext()
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableFooter>
            )}
          </Table>
        </div>

        {/* Footer */}
        {table.getPageCount() > 1 && (
          <div className="flex items-center justify-between py-4">
            <p className="text-muted-foreground text-sm">
              {(() => {
                const { pageIndex, pageSize } = table.getState().pagination;
                const total = table.getFilteredRowModel().rows.length;
                const start = total === 0 ? 0 : pageIndex * pageSize + 1;
                const end = Math.min((pageIndex + 1) * pageSize, total);
                return `${start} - ${end} of ${total}`;
              })()}
            </p>
            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      table.previousPage();
                    }}
                    aria-disabled={!table.getCanPreviousPage()}
                    className={
                      !table.getCanPreviousPage()
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  />
                </PaginationItem>
                {Array.from({ length: table.getPageCount() }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={i === table.getState().pagination.pageIndex}
                      onClick={(e) => {
                        e.preventDefault();
                        table.setPageIndex(i);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      table.nextPage();
                    }}
                    aria-disabled={!table.getCanNextPage()}
                    className={
                      !table.getCanNextPage()
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </DataTableMoveContext.Provider>
  );

  return pinnable ? (
    <DataTablePinContext.Provider value={true}>
      {tableContent}
    </DataTablePinContext.Provider>
  ) : (
    tableContent
  );
}

// ─── DataTableColumnHeader ────────────────────────────────────────────────────

function DataTableColumnHeader<TValue>({
  column,
  title,
  icon,
  className,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: import("@tanstack/react-table").Column<any, TValue>;
  title: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  const moveCtx = React.useContext(DataTableMoveContext);
  const pinCtx = React.useContext(DataTablePinContext);
  const canSort = column.getCanSort();
  const sorted = column.getIsSorted();

  if (moveCtx) {
    const { moveColumn, columnOrder } = moveCtx;
    const idx = columnOrder.indexOf(column.id);
    const isFirst = idx <= 0;
    const isLast = idx >= columnOrder.length - 1;
    const SortIcon =
      sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ArrowUpDown;
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className={cn(className)}>
            {icon && (
              <span className="text-muted-foreground shrink-0 [&_svg]:size-3.5">
                {icon}
              </span>
            )}
            {title}
            <SortIcon className="ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {canSort && (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUp className="text-muted-foreground size-3.5" />
                Asc
                {sorted === "asc" && <Check className="ml-auto size-3.5" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDown className="text-muted-foreground size-3.5" />
                Desc
                {sorted === "desc" && <Check className="ml-auto size-3.5" />}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            onClick={() => moveColumn(column.id, "left")}
            disabled={isFirst}
          >
            <ArrowLeft className="text-muted-foreground size-3.5" />
            Move to Left
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => moveColumn(column.id, "right")}
            disabled={isLast}
          >
            <ArrowRight className="text-muted-foreground size-3.5" />
            Move to Right
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (pinCtx) {
    const isPinned = column.getIsPinned();
    const SortIcon =
      sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ArrowUpDown;
    const TrailingIcon = isPinned ? (
      <Pin className="text-primary ml-2 size-3" />
    ) : canSort ? (
      <SortIcon className="ml-2" />
    ) : null;
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className={cn(className)}>
            {icon && (
              <span className="text-muted-foreground shrink-0 [&_svg]:size-3.5">
                {icon}
              </span>
            )}
            {title}
            {TrailingIcon}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {canSort && (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUp className="text-muted-foreground size-3.5" />
                Asc
                {sorted === "asc" && <Check className="ml-auto size-3.5" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDown className="text-muted-foreground size-3.5" />
                Desc
                {sorted === "desc" && <Check className="ml-auto size-3.5" />}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            onClick={() => column.pin("left")}
            disabled={isPinned === "left"}
          >
            <Pin className="text-muted-foreground size-3.5" />
            Pin to Left
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.pin("right")}
            disabled={isPinned === "right"}
          >
            <Pin className="text-muted-foreground size-3.5 -scale-x-100" />
            Pin to Right
          </DropdownMenuItem>
          {isPinned && (
            <DropdownMenuItem onClick={() => column.pin(false)}>
              <PinOff className="text-muted-foreground size-3.5" />
              Unpin
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (!canSort) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        {icon && (
          <span className="text-muted-foreground shrink-0 [&_svg]:size-3.5">
            {icon}
          </span>
        )}
        {title}
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(className)}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {icon && (
        <span className="text-muted-foreground shrink-0 [&_svg]:size-3.5">
          {icon}
        </span>
      )}
      {title}
      <ArrowUpDown className="ml-2" />
    </Button>
  );
}

// ─── DataTableRowActions ──────────────────────────────────────────────────────

interface DataTableRowActionsProps {
  children?: React.ReactNode;
}

function DataTableRowActions({ children }: DataTableRowActionsProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-10 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {children ?? (
          <>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTablePinContext,
  DataTableRowActions,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Checkbox,
};
export type { DataTableProps };
