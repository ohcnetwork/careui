/**
 * @name department-selector
 * @description Responsive department tree with independent live selection, personal departments, and accessible inline expansion.
 * @dependencies lucide-react
 * @registryDependencies badge button checkbox drawer field input-group popover radio-group separator use-media-query
 * @type registry:ui
 */
"use client";

import * as React from "react";
import { ArrowRight, ChevronDown, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export interface DepartmentNode {
  id: string;
  name: string;
  children?: readonly DepartmentNode[];
}

export type DepartmentOption = DepartmentNode;

interface DepartmentSelectorBaseProps {
  tree: readonly DepartmentNode[];
  myDepartmentIds?: readonly string[];
  linkedIds?: readonly string[];
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  error?: string;
  className?: string;
}

export type DepartmentSelectorProps = DepartmentSelectorBaseProps &
  (
    | {
        mode: "single";
        value: string | null;
        onChange: (value: string | null) => void;
      }
    | { mode: "multi"; value: string[]; onChange: (value: string[]) => void }
  );

interface DepartmentEntry {
  node: DepartmentNode;
  ancestors: DepartmentNode[];
}

interface DepartmentRow {
  entry: DepartmentEntry;
  key: string;
  parentKey: string | null;
  children: DepartmentRow[];
}

function indexDepartments(
  tree: readonly DepartmentNode[],
  ancestors: DepartmentNode[] = []
): DepartmentEntry[] {
  return tree.flatMap((node) => [
    { node, ancestors },
    ...indexDepartments(node.children ?? [], [...ancestors, node]),
  ]);
}

function pathText(entry: DepartmentEntry) {
  return [...entry.ancestors, entry.node].map((node) => node.name).join(" / ");
}

function DepartmentPath({ entry }: { entry: DepartmentEntry }) {
  return (
    <span className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-0.5 text-start wrap-anywhere">
      {entry.ancestors.map((node) => (
        <React.Fragment key={node.id}>
          <span className="text-soft-foreground font-normal">{node.name}</span>
          <ArrowRight aria-hidden="true" className="size-3.5 shrink-0" />
        </React.Fragment>
      ))}
      <span className="font-semibold">{entry.node.name}</span>
    </span>
  );
}

function MatchedName({ name, query }: { name: string; query: string }) {
  const start = name.toLocaleLowerCase().indexOf(query);
  if (!query || start < 0) return name;
  return (
    <>
      {name.slice(0, start)}
      <mark className="rounded-xs bg-amber-100 font-semibold text-amber-950">
        {name.slice(start, start + query.length)}
      </mark>
      {name.slice(start + query.length)}
    </>
  );
}

function DepartmentSelector(props: DepartmentSelectorProps) {
  const {
    tree,
    myDepartmentIds = [],
    linkedIds = [],
    id,
    name,
    disabled = false,
    required = false,
    description,
    error,
    className,
  } = props;
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const panelId = `${fieldId}-panel`;
  const desktop = useMediaQuery("(min-width: 640px)");
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());
  const [searchCollapsed, setSearchCollapsed] = React.useState<Set<string>>(
    new Set()
  );
  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  const [invalid, setInvalid] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const rowRefs = React.useRef(new Map<string, HTMLDivElement>());
  const entries = indexDepartments(tree);
  const byId = new Map(entries.map((entry) => [entry.node.id, entry]));
  const selectedIds =
    props.mode === "multi"
      ? props.value
      : props.value === null
        ? []
        : [props.value];
  const selectedSet = new Set(selectedIds);
  const linkedSet = new Set(linkedIds);
  const selectedEntries = selectedIds.map(
    (selectedId) =>
      byId.get(selectedId) ?? {
        node: { id: selectedId, name: selectedId },
        ancestors: [],
      }
  );
  const term = query.trim().toLocaleLowerCase();
  const searching = term.length > 0;
  const matches = entries.filter((entry) =>
    entry.node.name.toLocaleLowerCase().includes(term)
  );
  const included = new Set(
    matches.flatMap((entry) => [
      ...entry.ancestors.map((node) => node.id),
      entry.node.id,
    ])
  );
  const validationError =
    error ||
    (invalid && selectedIds.length === 0 ? "Select a department." : undefined);
  const describedBy =
    [
      description ? `${fieldId}-description` : null,
      validationError ? `${fieldId}-error` : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const buildRows = (
    nodes: readonly DepartmentNode[],
    prefix: string,
    parentKey: string | null = null
  ): DepartmentRow[] =>
    nodes.flatMap((node) => {
      if (searching && !included.has(node.id)) return [];
      const key = `${prefix}:${node.id}`;
      const entry = byId.get(node.id);
      if (!entry) return [];
      return [
        {
          entry,
          key,
          parentKey,
          children: buildRows(node.children ?? [], prefix, key),
        },
      ];
    });
  const personalRows = searching
    ? []
    : Array.from(new Set(myDepartmentIds)).flatMap((departmentId) => {
        const entry = byId.get(departmentId);
        return entry ? buildRows([entry.node], `mine:${departmentId}`) : [];
      });
  const allRows = buildRows(tree, "all");
  const isExpanded = (row: DepartmentRow) =>
    searching ? !searchCollapsed.has(row.key) : expanded.has(row.key);
  const flattenRows = (rows: DepartmentRow[]): DepartmentRow[] =>
    rows.flatMap((row) => [
      row,
      ...(isExpanded(row) ? flattenRows(row.children) : []),
    ]);
  const visibleRows = [...flattenRows(personalRows), ...flattenRows(allRows)];
  const activeRow = visibleRows.find((row) => row.key === activeKey);

  React.useEffect(() => {
    if (activeKey)
      rowRefs.current.get(activeKey)?.scrollIntoView({ block: "nearest" });
  }, [activeKey]);

  React.useEffect(() => {
    if (!open || desktop) return;
    const viewport = window.visualViewport;
    const top = Math.max(16, window.innerHeight * 0.06);
    const resize = () => {
      const height = Math.max(
        0,
        (viewport?.height ?? window.innerHeight) +
          (viewport?.offsetTop ?? 0) -
          top
      );
      drawerRef.current?.style.setProperty(
        "--department-drawer-top",
        `${top}px`
      );
      drawerRef.current?.style.setProperty(
        "--department-drawer-height",
        `${height}px`
      );
    };
    resize();
    viewport?.addEventListener("resize", resize);
    viewport?.addEventListener("scroll", resize);
    window.addEventListener("resize", resize);
    return () => {
      viewport?.removeEventListener("resize", resize);
      viewport?.removeEventListener("scroll", resize);
      window.removeEventListener("resize", resize);
    };
  }, [open, desktop]);

  const changeOpen = (nextOpen: boolean) => {
    if (nextOpen) {
      setQuery("");
      setActiveKey(null);
      setSearchCollapsed(new Set());
      setExpanded(
        new Set(
          selectedEntries.flatMap((entry) =>
            entry.ancestors.map((node) => `all:${node.id}`)
          )
        )
      );
    }
    setOpen(nextOpen);
  };

  const changeQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    setActiveKey(null);
    setSearchCollapsed(new Set());
  };

  const selectDepartment = (departmentId: string) => {
    if (disabled || linkedSet.has(departmentId)) return;
    if (props.mode === "single") {
      props.onChange(departmentId);
      setOpen(false);
    } else {
      if (required && selectedSet.has(departmentId) && selectedIds.length === 1)
        return;
      props.onChange(
        selectedSet.has(departmentId)
          ? props.value.filter((selectedId) => selectedId !== departmentId)
          : [...props.value, departmentId]
      );
    }
    setInvalid(false);
  };

  const toggleExpansion = (row: DepartmentRow) => {
    const update = (current: Set<string>) => {
      const next = new Set(current);
      if (next.has(row.key)) next.delete(row.key);
      else next.add(row.key);
      return next;
    };
    if (searching) setSearchCollapsed(update);
    else setExpanded(update);
    setActiveKey(row.key);
  };

  const navigate = (event: React.KeyboardEvent) => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.nativeEvent.isComposing
    )
      return;
    const index = visibleRows.findIndex((row) => row.key === activeKey);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex =
        index < 0
          ? event.key === "ArrowDown"
            ? 0
            : visibleRows.length - 1
          : Math.max(
              0,
              Math.min(
                visibleRows.length - 1,
                index + (event.key === "ArrowDown" ? 1 : -1)
              )
            );
      setActiveKey(visibleRows[nextIndex]?.key ?? null);
    } else if (activeRow && event.key === "ArrowRight") {
      event.preventDefault();
      if (activeRow.children.length > 0 && !isExpanded(activeRow))
        toggleExpansion(activeRow);
      else if (activeRow.children[0]) setActiveKey(activeRow.children[0].key);
    } else if (activeRow && event.key === "ArrowLeft") {
      event.preventDefault();
      if (activeRow.children.length > 0 && isExpanded(activeRow))
        toggleExpansion(activeRow);
      else if (activeRow.parentKey) setActiveKey(activeRow.parentKey);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeRow) selectDepartment(activeRow.entry.node.id);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const preserveSearchFocus = (event: React.PointerEvent) => {
    if (document.activeElement === searchRef.current) event.preventDefault();
  };

  const renderRows = (rows: DepartmentRow[], depth = 1): React.ReactNode => (
    <ul role="group" className="min-w-0">
      {rows.map((row) => {
        const { node, ancestors } = row.entry;
        const selected = selectedSet.has(node.id);
        const linked = linkedSet.has(node.id);
        const expandedRow = row.children.length > 0 && isExpanded(row);
        const descendantSelections = selectedEntries.filter((entry) =>
          entry.ancestors.some((ancestor) => ancestor.id === node.id)
        ).length;
        const controlId = `${panelId}-${row.key}-control`;
        const contextOnly =
          searching && !node.name.toLocaleLowerCase().includes(term);
        return (
          <li
            key={row.key}
            id={`${panelId}-${row.key}`}
            role="treeitem"
            aria-level={depth}
            aria-expanded={row.children.length > 0 ? expandedRow : undefined}
            aria-selected={props.mode === "single" ? selected : undefined}
            aria-checked={props.mode === "multi" ? selected : undefined}
            aria-disabled={linked || undefined}
            aria-label={node.name}
          >
            <div
              ref={(element) => {
                if (element) rowRefs.current.set(row.key, element);
                else rowRefs.current.delete(row.key);
              }}
              data-slot="department-row"
              data-department-id={node.id}
              data-active={activeKey === row.key || undefined}
              className={cn(
                "hover:bg-muted flex min-h-12 min-w-0 items-center gap-2 rounded-md px-2 text-sm sm:min-h-11",
                props.mode === "single" && selected && "bg-blue-50",
                activeKey === row.key && "bg-muted"
              )}
            >
              <label
                htmlFor={controlId}
                className={cn(
                  "flex min-h-12 min-w-0 flex-1 items-center gap-2 py-2 sm:min-h-11",
                  linked
                    ? "text-soft-foreground cursor-not-allowed"
                    : "cursor-pointer"
                )}
                onPointerDown={preserveSearchFocus}
                onClick={(event) => {
                  if (
                    document.activeElement === searchRef.current &&
                    !(
                      event.target instanceof Element &&
                      event.target.closest(
                        '[data-slot="checkbox"],[data-slot="radio-group-item"]'
                      )
                    )
                  ) {
                    event.preventDefault();
                    selectDepartment(node.id);
                  }
                }}
              >
                {props.mode === "multi" ? (
                  <Checkbox
                    id={controlId}
                    checked={selected}
                    disabled={linked || disabled}
                    aria-label={node.name}
                    onPointerDown={preserveSearchFocus}
                    onCheckedChange={() => selectDepartment(node.id)}
                    onFocus={() => setActiveKey(row.key)}
                  />
                ) : (
                  <RadioGroupItem
                    id={controlId}
                    value={node.id}
                    disabled={linked || disabled}
                    aria-label={node.name}
                    onClick={() => {
                      if (selected) setOpen(false);
                    }}
                    onFocus={() => setActiveKey(row.key)}
                  />
                )}
                <span className="flex min-w-0 flex-1 flex-col gap-0.5 wrap-anywhere">
                  <span
                    className={cn(
                      selected && "font-semibold",
                      (contextOnly || linked) && "text-soft-foreground"
                    )}
                  >
                    <MatchedName name={node.name} query={term} />
                  </span>
                  {row.key.startsWith("mine:") && ancestors.length > 0 && (
                    <span className="text-soft-foreground text-xs">
                      {ancestors.map((ancestor) => ancestor.name).join(" / ")}
                    </span>
                  )}
                </span>
              </label>
              {linked && (
                <Badge
                  variant="amber"
                  size="sm"
                  className="h-auto max-w-22 shrink-0 py-0.5 whitespace-normal"
                >
                  Linked
                </Badge>
              )}
              {!expandedRow && descendantSelections > 0 && (
                <Badge
                  variant="blue"
                  size="sm"
                  className="h-auto max-w-22 shrink-0 py-0.5 whitespace-normal"
                >
                  {descendantSelections} selected
                </Badge>
              )}
              {!!node.children?.length && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 min-w-13 shrink-0 gap-1 px-2 font-normal shadow-none"
                  aria-expanded={expandedRow}
                  aria-controls={`${panelId}-${row.key}-children`}
                  aria-label={
                    expandedRow
                      ? `Hide sub-departments of ${node.name}`
                      : `Show ${node.children.length} sub-departments of ${node.name}`
                  }
                  onPointerDown={preserveSearchFocus}
                  onClick={() => toggleExpansion(row)}
                >
                  {node.children.length}
                  <ChevronDown
                    aria-hidden="true"
                    data-icon="inline-end"
                    className={cn(
                      "transition-transform motion-reduce:transition-none",
                      expandedRow && "rotate-180"
                    )}
                  />
                </Button>
              )}
            </div>
            {expandedRow && (
              <div
                id={`${panelId}-${row.key}-children`}
                className="ms-5 min-w-0 sm:ms-6"
              >
                {renderRows(row.children, depth + 1)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  const groups = (
    <div
      role="tree"
      id={`${panelId}-tree`}
      aria-label="Departments"
      aria-multiselectable={props.mode === "multi" || undefined}
    >
      {!searching && (
        <>
          <div role="group" aria-labelledby={`${panelId}-mine`}>
            <h3
              id={`${panelId}-mine`}
              className="text-soft-foreground px-2 py-2 text-xs font-medium"
            >
              My departments
            </h3>
            {personalRows.length > 0 ? (
              renderRows(personalRows)
            ) : (
              <p className="text-soft-foreground px-2 py-3 text-sm">
                No departments assigned.
              </p>
            )}
          </div>
          <Separator className="my-2" />
        </>
      )}
      <div role="group" aria-labelledby={`${panelId}-all`}>
        <div className="flex min-h-9 items-center justify-between gap-2 px-2">
          <h3
            id={`${panelId}-all`}
            className="text-soft-foreground text-xs font-medium"
          >
            {searching
              ? `${matches.length} ${matches.length === 1 ? "match" : "matches"}`
              : "All departments"}
          </h3>
          {!searching && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="font-normal"
              onClick={() => {
                setExpanded(new Set());
                setActiveKey(null);
              }}
            >
              Collapse all
            </Button>
          )}
        </div>
        {allRows.length > 0 ? (
          renderRows(allRows)
        ) : (
          <div className="flex flex-col items-center gap-3 px-2 py-8 text-center">
            <p className="text-soft-foreground text-sm">
              {searching
                ? `No departments match "${query.trim()}".`
                : "No departments available."}
            </p>
            {searching && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  changeQuery("");
                  searchRef.current?.focus();
                }}
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const panelBody = (
    <>
      <div className="shrink-0 p-2 pb-1">
        <InputGroup className="h-12 sm:h-11">
          <InputGroupAddon>
            <Search aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            ref={searchRef}
            value={query}
            onChange={(event) => changeQuery(event.target.value)}
            onKeyDown={navigate}
            placeholder="Search departments"
            aria-label="Search departments"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="tree"
            aria-controls={`${panelId}-tree`}
            aria-activedescendant={
              activeRow ? `${panelId}-${activeRow.key}` : undefined
            }
            className="placeholder:text-placeholder-foreground text-base sm:text-sm"
          />
          {query && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                variant="ghost"
                size="icon-sm"
                className="size-11"
                aria-label="Clear search"
                onClick={() => {
                  changeQuery("");
                  searchRef.current?.focus();
                }}
              >
                <X aria-hidden="true" />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
        {!searching && (
          <p className="text-soft-foreground px-1 pt-2 pb-1 text-xs leading-5">
            {props.mode === "multi"
              ? "Tick a department to select it."
              : "Choose a department."}{" "}
            The number on the right opens its sub-departments.
          </p>
        )}
      </div>
      <div
        data-slot="department-list"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2 sm:max-h-92.5"
      >
        {props.mode === "single" ? (
          <RadioGroup
            value={props.value ?? ""}
            onValueChange={selectDepartment}
            className="gap-0"
          >
            {groups}
          </RadioGroup>
        ) : (
          groups
        )}
      </div>
    </>
  );

  const clearAll = () => {
    if (props.mode === "multi" && !required) props.onChange([]);
  };
  const footer = desktop ? (
    <div className="border-border flex min-h-14 shrink-0 flex-wrap items-center gap-2 border-t p-2">
      {props.mode === "multi" ? (
        <>
          <span className="text-soft-foreground me-auto text-xs" role="status">
            {selectedIds.length
              ? `${selectedIds.length} selected`
              : "None selected"}
          </span>
          {selectedIds.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={required}
              onClick={clearAll}
            >
              Clear all
            </Button>
          )}
          <Button type="button" size="sm" onClick={() => setOpen(false)}>
            Done
          </Button>
        </>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="ms-auto"
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
      )}
    </div>
  ) : props.mode === "multi" ? (
    <DrawerFooter className="flex-row gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      {selectedIds.length > 0 && (
        <Button
          type="button"
          variant="ghost"
          disabled={required}
          onClick={clearAll}
        >
          Clear all
        </Button>
      )}
      <Button
        type="button"
        className="min-w-0 flex-1"
        onClick={() => setOpen(false)}
      >
        Done ({selectedIds.length})
      </Button>
    </DrawerFooter>
  ) : null;

  const trigger = (
    <Button
      ref={triggerRef}
      id={fieldId}
      type="button"
      variant="outline"
      disabled={disabled}
      aria-describedby={describedBy}
      aria-invalid={!!validationError || undefined}
      className="border-input h-auto min-h-11 w-full min-w-0 justify-between gap-2 py-2 text-start font-normal shadow-none aria-expanded:border-blue-500 aria-expanded:ring-1 aria-expanded:ring-blue-500"
    >
      <span className="min-w-0 flex-1">
        {props.mode === "single" && selectedEntries[0] ? (
          <DepartmentPath entry={selectedEntries[0]} />
        ) : (
          <span className="text-placeholder-foreground">Select Department</span>
        )}
      </span>
      <ChevronDown aria-hidden="true" data-icon="inline-end" />
    </Button>
  );

  return (
    <Field
      data-slot="department-selector"
      data-mode={props.mode}
      data-invalid={!!validationError || undefined}
      className={cn("min-w-0 font-sans text-sm", className)}
    >
      {props.mode === "multi" && selectedEntries.length > 0 && (
        <div className="mb-3 flex flex-col gap-2">
          <span className="text-sm font-bold">Selected department</span>
          <ul aria-label="Selected departments" className="flex flex-col gap-2">
            {selectedEntries.map((entry) => (
              <li
                key={entry.node.id}
                className="flex min-h-11.5 items-center gap-2 rounded-md border border-blue-300 bg-blue-50 ps-3 pe-1 text-base text-blue-950"
              >
                <span className="min-w-0 flex-1">
                  <DepartmentPath entry={entry} />
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-11 shrink-0"
                  aria-label={`Remove ${pathText(entry)}`}
                  disabled={disabled || (required && selectedIds.length === 1)}
                  onClick={() => {
                    props.onChange(
                      props.value.filter(
                        (selectedId) => selectedId !== entry.node.id
                      )
                    );
                    triggerRef.current?.focus();
                  }}
                >
                  <X aria-hidden="true" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <FieldLabel
        htmlFor={fieldId}
        className="text-soft-foreground font-normal"
      >
        {props.mode === "single"
          ? "Department"
          : selectedIds.length > 0
            ? "Select another department"
            : "Select department"}
      </FieldLabel>
      <div className="flex min-w-0 items-center gap-1">
        {desktop ? (
          <Popover open={open} onOpenChange={changeOpen}>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent
              initialFocus={searchRef}
              align="start"
              sideOffset={4}
              className="flex max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-0 flex-col gap-0 overflow-hidden rounded-[10px] p-0 text-sm motion-reduce:animate-none"
            >
              <PopoverTitle className="sr-only">
                {props.mode === "multi"
                  ? "Select departments"
                  : "Select department"}
              </PopoverTitle>
              {panelBody}
              {footer}
            </PopoverContent>
          </Popover>
        ) : (
          <Drawer open={open} onOpenChange={changeOpen} showSwipeHandle>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent
              ref={drawerRef}
              initialFocus={closeRef}
              overlayClassName="bg-black/50 supports-backdrop-filter:backdrop-blur-none"
              className="top-(--department-drawer-top,6dvh) h-(--department-drawer-height,94dvh) w-full max-w-none data-[swipe-axis=y]:[--drawer-content-max-height:100dvh] data-[swipe-direction=down]:bottom-auto data-[swipe-direction=down]:rounded-t-[14px]"
            >
              <DrawerHeader showCloseButton={false} className="p-2 pb-0">
                <div className="flex min-h-11 items-center gap-2 ps-2">
                  <DrawerTitle className="min-w-0 flex-1 text-lg font-semibold">
                    {props.mode === "multi"
                      ? "Select departments"
                      : "Select department"}
                  </DrawerTitle>
                  <Button
                    ref={closeRef}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-11"
                    aria-label="Close department selector"
                    onClick={() => setOpen(false)}
                  >
                    <X aria-hidden="true" />
                  </Button>
                </div>
              </DrawerHeader>
              {panelBody}
              {footer}
            </DrawerContent>
          </Drawer>
        )}
        {props.mode === "single" && props.value !== null && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11 shrink-0"
            aria-label="Clear department"
            disabled={disabled || required}
            onClick={() => {
              props.onChange(null);
              triggerRef.current?.focus();
            }}
          >
            <X aria-hidden="true" />
          </Button>
        )}
      </div>
      <select
        aria-hidden="true"
        tabIndex={-1}
        className="sr-only"
        name={name}
        multiple={props.mode === "multi"}
        value={props.mode === "multi" ? props.value : (props.value ?? "")}
        disabled={disabled}
        required={required}
        onChange={(event) => {
          if (props.mode === "multi")
            props.onChange(
              Array.from(event.target.selectedOptions, (option) => option.value)
            );
          else props.onChange(event.target.value || null);
        }}
        onInvalid={(event) => {
          event.preventDefault();
          setInvalid(true);
          triggerRef.current?.focus();
        }}
      >
        {props.mode === "single" && <option value="">Select Department</option>}
        {entries.map((entry) => (
          <option
            key={entry.node.id}
            value={entry.node.id}
            disabled={linkedSet.has(entry.node.id)}
          >
            {pathText(entry)}
          </option>
        ))}
        {selectedEntries
          .filter((entry) => !byId.has(entry.node.id))
          .map((entry) => (
            <option key={entry.node.id} value={entry.node.id}>
              {entry.node.name}
            </option>
          ))}
      </select>
      <span className="sr-only" role="status" aria-atomic="true">
        {selectedIds.length
          ? `Selected departments: ${selectedEntries.map(pathText).join(", ")}`
          : "No departments selected"}
      </span>
      {description && (
        <FieldDescription id={`${fieldId}-description`}>
          {description}
        </FieldDescription>
      )}
      {validationError && (
        <FieldError id={`${fieldId}-error`}>{validationError}</FieldError>
      )}
    </Field>
  );
}

export { DepartmentSelector };
