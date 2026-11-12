/**
 * @name tree-select
 * @description Responsive single or multi select for hierarchical options with search, assigned shortcuts, default selections, and accessible inline expansion. Opens a Popover on wide screens and a keyboard-aware bottom Drawer on phones.
 * @dependencies lucide-react
 * @registryDependencies badge button checkbox drawer field input-group popover radio-group separator switch use-media-query
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
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export interface TreeSelectNode {
  id: string;
  name: string;
  children?: readonly TreeSelectNode[];
}

export type TreeSelectOption = TreeSelectNode;

export type TreeSelectPresentation = "auto" | "popover" | "drawer";

export interface TreeSelectItemLabel {
  /** Lowercase noun for one option, e.g. "department". */
  singular: string;
  /** Lowercase noun for several options, e.g. "departments". */
  plural: string;
}

interface TreeSelectBaseProps {
  tree: readonly TreeSelectNode[];
  /** Nouns used to build the field, panel, and status copy. */
  itemLabel?: TreeSelectItemLabel;
  /** Trigger text. Defaults to "Select {Item}". */
  placeholder?: string;
  /** Shortcuts listed in a "My {items}" group. The group is hidden when omitted. */
  assignedIds?: readonly string[];
  linkedIds?: readonly string[];
  /** Options to preselect next time. Single mode keeps at most one. */
  preferredIds?: readonly string[];
  /** Shows a "Select by default" switch on each selected card. */
  onPreferredIdsChange?: (ids: string[]) => void;
  /** Where the options open. "auto" uses a Popover from 640px and a Drawer below. */
  presentation?: TreeSelectPresentation;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  error?: string;
  className?: string;
}

export type TreeSelectProps = TreeSelectBaseProps &
  (
    | {
        mode: "single";
        value: string | null;
        onChange: (value: string | null) => void;
      }
    | { mode: "multi"; value: string[]; onChange: (value: string[]) => void }
  );

interface TreeEntry {
  node: TreeSelectNode;
  ancestors: TreeSelectNode[];
}

interface TreeRow {
  entry: TreeEntry;
  key: string;
  parentKey: string | null;
  children: TreeRow[];
}

function indexNodes(
  tree: readonly TreeSelectNode[],
  ancestors: TreeSelectNode[] = []
): TreeEntry[] {
  return tree.flatMap((node) => [
    { node, ancestors },
    ...indexNodes(node.children ?? [], [...ancestors, node]),
  ]);
}

function pathText(entry: TreeEntry) {
  return [...entry.ancestors, entry.node].map((node) => node.name).join(" / ");
}

function NodePath({ entry }: { entry: TreeEntry }) {
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

const defaultItemLabel: TreeSelectItemLabel = {
  singular: "item",
  plural: "items",
};

function capitalize(text: string) {
  return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}

// The drawer is sized to the visual viewport so its footer stays above the
// on-screen keyboard, which shrinks the visual but not the layout viewport.
const drawerGap = () => Math.max(16, window.innerHeight * 0.06);
const readDrawerTop = () =>
  (window.visualViewport?.offsetTop ?? 0) + drawerGap();
const readDrawerHeight = () =>
  Math.max(
    0,
    (window.visualViewport?.height ?? window.innerHeight) - drawerGap()
  );
const readNothing = () => null;

function TreeSelect(props: TreeSelectProps) {
  const {
    tree,
    itemLabel = defaultItemLabel,
    placeholder,
    assignedIds,
    linkedIds = [],
    preferredIds = [],
    onPreferredIdsChange,
    presentation = "auto",
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
  const { singular, plural } = itemLabel;
  const triggerText =
    placeholder ?? `Select ${singular.split(" ").map(capitalize).join(" ")}`;
  const wide = useMediaQuery("(min-width: 640px)");
  const inPopover =
    presentation === "popover" || (presentation === "auto" && wide);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());
  const [searchCollapsed, setSearchCollapsed] = React.useState<Set<string>>(
    new Set()
  );
  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  const [invalid, setInvalid] = React.useState(false);
  // Freezes the selected cards while the panel is open so the trigger above
  // which they render doesn't shift; cleared once the close animation ends.
  const [cardSnapshot, setCardSnapshot] = React.useState<string[] | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const rowRefs = React.useRef(new Map<string, HTMLDivElement>());
  const entries = indexNodes(tree);
  const byId = new Map(entries.map((entry) => [entry.node.id, entry]));
  const selectedIds =
    props.mode === "multi"
      ? props.value
      : props.value === null
        ? []
        : [props.value];
  const selectedSet = new Set(selectedIds);
  const linkedSet = new Set(linkedIds);
  const preferredSet = new Set(preferredIds);
  const toEntry = (selectedId: string): TreeEntry =>
    byId.get(selectedId) ?? {
      node: { id: selectedId, name: selectedId },
      ancestors: [],
    };
  const selectedEntries = selectedIds.map(toEntry);
  const cardEntries = (cardSnapshot ?? selectedIds).map(toEntry);
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
    (invalid && selectedIds.length === 0
      ? props.mode === "multi"
        ? `Select at least one ${singular}.`
        : `Select one ${singular}.`
      : undefined);
  const describedBy =
    [
      description ? `${fieldId}-description` : null,
      validationError ? `${fieldId}-error` : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const buildRows = (
    nodes: readonly TreeSelectNode[],
    prefix: string,
    parentKey: string | null = null
  ): TreeRow[] =>
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
  const assignedRows =
    searching || !assignedIds
      ? []
      : Array.from(new Set(assignedIds)).flatMap((nodeId) => {
          const entry = byId.get(nodeId);
          return entry
            ? [
                {
                  entry,
                  key: `assigned:${nodeId}`,
                  parentKey: null,
                  children: [],
                },
              ]
            : [];
        });
  const allRows = buildRows(tree, "all");
  const isExpanded = (row: TreeRow) =>
    searching ? !searchCollapsed.has(row.key) : expanded.has(row.key);
  const flattenRows = (rows: TreeRow[]): TreeRow[] =>
    rows.flatMap((row) => [
      row,
      ...(isExpanded(row) ? flattenRows(row.children) : []),
    ]);
  const visibleRows = [...flattenRows(assignedRows), ...flattenRows(allRows)];
  const activeRow = visibleRows.find((row) => row.key === activeKey);

  React.useEffect(() => {
    if (activeKey)
      rowRefs.current.get(activeKey)?.scrollIntoView({ block: "nearest" });
  }, [activeKey]);

  const fitDrawer = open && !inPopover;
  const subscribeViewport = React.useCallback(
    (onChange: () => void) => {
      if (!fitDrawer) return () => {};
      const viewport = window.visualViewport;
      viewport?.addEventListener("resize", onChange);
      viewport?.addEventListener("scroll", onChange);
      window.addEventListener("resize", onChange);
      return () => {
        viewport?.removeEventListener("resize", onChange);
        viewport?.removeEventListener("scroll", onChange);
        window.removeEventListener("resize", onChange);
      };
    },
    [fitDrawer]
  );
  const drawerTop = React.useSyncExternalStore<number | null>(
    subscribeViewport,
    readDrawerTop,
    readNothing
  );
  const drawerHeight = React.useSyncExternalStore<number | null>(
    subscribeViewport,
    readDrawerHeight,
    readNothing
  );

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
      setCardSnapshot(selectedIds);
    }
    setOpen(nextOpen);
  };

  const completeOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setCardSnapshot(null);
  };

  const changeQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    setActiveKey(null);
    setSearchCollapsed(new Set());
  };

  const selectNode = (nodeId: string) => {
    if (disabled || linkedSet.has(nodeId)) return;
    if (props.mode === "single") {
      props.onChange(nodeId);
      setOpen(false);
    } else {
      if (required && selectedSet.has(nodeId) && selectedIds.length === 1)
        return;
      props.onChange(
        selectedSet.has(nodeId)
          ? props.value.filter((selectedId) => selectedId !== nodeId)
          : [...props.value, nodeId]
      );
    }
    setInvalid(false);
  };

  const removeNode = (nodeId: string) => {
    if (props.mode === "single") props.onChange(null);
    else
      props.onChange(props.value.filter((selectedId) => selectedId !== nodeId));
    triggerRef.current?.focus();
  };

  const setPreferred = (nodeId: string, preferred: boolean) => {
    if (!onPreferredIdsChange) return;
    if (!preferred)
      onPreferredIdsChange(
        preferredIds.filter((preferredId) => preferredId !== nodeId)
      );
    else if (props.mode === "single") onPreferredIdsChange([nodeId]);
    else if (!preferredSet.has(nodeId))
      onPreferredIdsChange([...preferredIds, nodeId]);
  };

  const toggleExpansion = (row: TreeRow) => {
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
      if (activeRow) selectNode(activeRow.entry.node.id);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const preserveSearchFocus = (event: React.PointerEvent) => {
    if (document.activeElement === searchRef.current) event.preventDefault();
  };

  const renderRows = (rows: TreeRow[], depth = 1): React.ReactNode => (
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
              data-slot="tree-select-row"
              data-node-id={node.id}
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
                    selectNode(node.id);
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
                    onCheckedChange={() => selectNode(node.id)}
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
                      (contextOnly || linked) && "text-soft-foreground"
                    )}
                  >
                    <MatchedName name={node.name} query={term} />
                  </span>
                  {row.key.startsWith("assigned:") && ancestors.length > 0 && (
                    <span className="text-soft-foreground text-xs">
                      {ancestors.map((ancestor) => ancestor.name).join(" / ")}
                    </span>
                  )}
                </span>
              </label>
              {preferredSet.has(node.id) && (
                <Badge
                  variant="primary"
                  size="sm"
                  className="h-auto max-w-22 shrink-0 py-0.5 whitespace-normal"
                >
                  Default
                </Badge>
              )}
              {linked && (
                <Badge
                  variant="amber"
                  size="sm"
                  className="h-auto max-w-22 shrink-0 py-0.5 whitespace-normal"
                >
                  Linked
                </Badge>
              )}
              {row.children.length > 0 &&
                !expandedRow &&
                descendantSelections > 0 && (
                  <Badge
                    variant="blue"
                    size="sm"
                    className="h-auto max-w-22 shrink-0 py-0.5 whitespace-normal"
                  >
                    {descendantSelections} selected
                  </Badge>
                )}
              {row.children.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 min-w-13 shrink-0 gap-1 px-2 font-normal shadow-none"
                  aria-expanded={expandedRow}
                  aria-controls={`${panelId}-${row.key}-children`}
                  aria-label={
                    expandedRow
                      ? `Hide ${plural} under ${node.name}`
                      : `Show ${row.children.length} ${row.children.length === 1 ? singular : plural} under ${node.name}`
                  }
                  onPointerDown={preserveSearchFocus}
                  onClick={() => toggleExpansion(row)}
                >
                  {row.children.length}
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
      aria-label={capitalize(plural)}
      aria-multiselectable={props.mode === "multi" || undefined}
    >
      {!searching && assignedIds && (
        <>
          <div role="group" aria-labelledby={`${panelId}-assigned`}>
            <h3
              id={`${panelId}-assigned`}
              className="text-soft-foreground px-2 py-2 text-xs font-medium"
            >
              My {plural}
            </h3>
            {assignedRows.length > 0 ? (
              renderRows(assignedRows)
            ) : (
              <p className="text-soft-foreground px-2 py-3 text-sm">
                No {plural} assigned.
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
              : `All ${plural}`}
          </h3>
          {!searching && (
            <Button
              type="button"
              variant="ghost"
              className="font-normal max-md:h-9 max-md:px-3"
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
                ? `No ${plural} match "${query.trim()}".`
                : `No ${plural} available.`}
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
            placeholder={`Search ${plural}`}
            aria-label={`Search ${plural}`}
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
              ? `Tick each ${singular} you want.`
              : `Choose one ${singular}.`}{" "}
            The number on the right shows the {plural} nested under it.
          </p>
        )}
      </div>
      <div
        data-slot="tree-select-list"
        className={cn(
          "min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2",
          inPopover && "max-h-92.5"
        )}
      >
        {props.mode === "single" ? (
          <RadioGroup
            value={props.value ?? ""}
            onValueChange={selectNode}
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
  const clearSelection = () => {
    if (props.mode !== "single" || required) return;
    props.onChange(null);
    setOpen(false);
  };
  const clearSelectionButton =
    props.mode === "single" && props.value !== null ? (
      <Button
        type="button"
        variant="ghost"
        disabled={required}
        onClick={clearSelection}
      >
        Clear selection
      </Button>
    ) : null;
  const footer = inPopover ? (
    <div className="border-border flex min-h-14 shrink-0 flex-wrap items-center gap-3 border-t p-2 ps-3">
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
              disabled={required}
              onClick={clearAll}
            >
              Clear all
            </Button>
          )}
          <Button type="button" onClick={() => setOpen(false)}>
            Done
          </Button>
        </>
      ) : (
        <>
          {clearSelectionButton}
          <Button
            type="button"
            variant="ghost"
            className="ms-auto"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </>
      )}
    </div>
  ) : props.mode === "multi" ? (
    <DrawerFooter className="flex-row justify-between gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
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
      <Button type="button" className="min-w-0" onClick={() => setOpen(false)}>
        Done ({selectedIds.length})
      </Button>
    </DrawerFooter>
  ) : clearSelectionButton ? (
    <DrawerFooter className="flex-row gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      {clearSelectionButton}
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
      className="border-input h-auto min-h-11 w-full min-w-0 justify-between gap-2 py-2 text-start font-normal shadow-none aria-expanded:border-blue-500 aria-expanded:ring-1 aria-expanded:ring-blue-500 md:h-auto md:min-h-10"
    >
      <span className="text-placeholder-foreground min-w-0 flex-1">
        {triggerText}
      </span>
      <ChevronDown aria-hidden="true" data-icon="inline-end" />
    </Button>
  );
  const defaultHintId = `${fieldId}-default-hint`;
  const selectedHeading = `Selected ${props.mode === "multi" ? plural : singular}`;
  const panelTitle = `Select ${props.mode === "multi" ? plural : singular}`;

  return (
    <Field
      data-slot="tree-select"
      data-mode={props.mode}
      data-presentation={inPopover ? "popover" : "drawer"}
      data-invalid={!!validationError || undefined}
      className={cn("min-w-0 font-sans text-sm", className)}
    >
      {cardEntries.length > 0 && (
        <div className="mb-3 flex flex-col gap-2">
          <span className="text-sm font-bold">{selectedHeading}</span>
          <ul aria-label={selectedHeading} className="flex flex-col gap-2">
            {cardEntries.map((entry) => {
              const nodeId = entry.node.id;
              const preferred = preferredSet.has(nodeId);
              const switchId = `${fieldId}-default-${nodeId}`;
              return (
                <li
                  key={nodeId}
                  data-slot="tree-select-card"
                  className="flex flex-col rounded-md border border-blue-300 bg-blue-50 text-blue-950"
                >
                  <div className="flex min-h-11.5 items-center gap-2 py-1 ps-3 pe-1">
                    <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
                      <NodePath entry={entry} />
                      {preferred && (
                        <Badge variant="primary" size="sm">
                          Default
                        </Badge>
                      )}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-11 shrink-0"
                      aria-label={`${props.mode === "single" ? "Clear" : "Remove"} ${pathText(entry)}`}
                      disabled={
                        disabled || (required && selectedIds.length <= 1)
                      }
                      onClick={() => removeNode(nodeId)}
                    >
                      <X aria-hidden="true" />
                    </Button>
                  </div>
                  {onPreferredIdsChange && (
                    <div className="flex items-center gap-2 border-t border-blue-200 ps-3 pe-3">
                      <Switch
                        id={switchId}
                        size="sm"
                        checked={preferred}
                        disabled={disabled}
                        aria-describedby={defaultHintId}
                        onCheckedChange={(checked) =>
                          setPreferred(nodeId, checked)
                        }
                      />
                      <label
                        htmlFor={switchId}
                        className={cn(
                          "flex flex-1 items-center py-2.5 text-sm",
                          disabled ? "cursor-not-allowed" : "cursor-pointer"
                        )}
                      >
                        Select by default
                      </label>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          {onPreferredIdsChange && (
            <p id={defaultHintId} className="text-soft-foreground text-xs">
              {props.mode === "multi"
                ? `Default ${plural} are automatically selected next time.`
                : `The default ${singular} is automatically selected next time.`}
            </p>
          )}
        </div>
      )}
      <FieldLabel
        htmlFor={fieldId}
        className="text-soft-foreground font-normal"
      >
        {cardEntries.length === 0
          ? `Select ${singular}`
          : props.mode === "single"
            ? `Change ${singular}`
            : `Select another ${singular}`}
      </FieldLabel>
      <div className="flex min-w-0 items-center gap-1">
        {inPopover ? (
          <Popover
            open={open}
            onOpenChange={changeOpen}
            onOpenChangeComplete={completeOpenChange}
          >
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent
              initialFocus={searchRef}
              align="start"
              sideOffset={4}
              className="flex max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-0 flex-col gap-0 overflow-hidden rounded-[10px] p-0 text-sm motion-reduce:animate-none"
            >
              <PopoverTitle className="sr-only">{panelTitle}</PopoverTitle>
              {panelBody}
              {footer}
            </PopoverContent>
          </Popover>
        ) : (
          <Drawer
            open={open}
            onOpenChange={changeOpen}
            onOpenChangeComplete={completeOpenChange}
            showSwipeHandle
          >
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent
              initialFocus={closeRef}
              overlayClassName="bg-black/50 supports-backdrop-filter:backdrop-blur-none"
              style={
                {
                  "--tree-select-drawer-top":
                    drawerTop === null ? undefined : `${drawerTop}px`,
                  "--tree-select-drawer-height":
                    drawerHeight === null ? undefined : `${drawerHeight}px`,
                } as React.CSSProperties
              }
              className="top-(--tree-select-drawer-top,6dvh) h-(--tree-select-drawer-height,94dvh) w-full max-w-none transition-[transform,opacity,filter] data-[swipe-axis=y]:[--drawer-content-max-height:100dvh] data-[swipe-direction=down]:bottom-auto data-[swipe-direction=down]:rounded-t-[14px] sm:mx-auto sm:max-w-lg"
            >
              <DrawerHeader showCloseButton={false} className="p-2 pb-0">
                <div className="flex min-h-11 items-center gap-2 ps-2">
                  <DrawerTitle className="min-w-0 flex-1 text-lg font-semibold">
                    {panelTitle}
                  </DrawerTitle>
                  <Button
                    ref={closeRef}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-11"
                    aria-label={`Close ${singular} selector`}
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
      </div>
      <select
        aria-hidden="true"
        tabIndex={-1}
        className="sr-only max-w-px"
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
        {props.mode === "single" && <option value="">{triggerText}</option>}
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
      <span className="sr-only max-w-px" role="status" aria-atomic="true">
        {selectedIds.length
          ? `Selected ${plural}: ${selectedEntries.map(pathText).join(", ")}`
          : `No ${plural} selected`}
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

export { TreeSelect };
