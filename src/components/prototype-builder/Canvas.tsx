import * as React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  GripVertical,
  Trash2,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ElementView } from "./element-renderer";
import { DEVICE_WIDTH } from "./constants";
import { usePrototypeStore, useCurrentPage } from "./store";
import type { PrototypeElement } from "./types";

export function Canvas() {
  const { state, dispatch } = usePrototypeStore();
  const page = useCurrentPage();
  const width = DEVICE_WIDTH[state.device];

  const getVar = React.useCallback(
    (name: string) => state.variables.find((v) => v.name === name)?.value ?? "",
    [state.variables]
  );
  const setVar = React.useCallback(
    (name: string, value: string) => {
      const idx = state.variables.findIndex((v) => v.name === name);
      if (idx >= 0) dispatch({ t: "updateVariable", index: idx, value });
      else dispatch({ t: "addVariable", name });
    },
    [dispatch, state.variables]
  );

  const { setNodeRef, isOver } = useDroppable({ id: "canvas-dropzone" });

  return (
    <div
      className="flex h-full flex-col items-center overflow-auto bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] p-8"
      onClick={() => dispatch({ t: "select", id: null })}
    >
      <div
        className="bg-background ring-border relative rounded-xl shadow-sm ring-1 transition-[width]"
        style={{ width: Math.min(width, 1024), maxWidth: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Device chrome */}
        <div className="text-muted-foreground flex items-center gap-1.5 border-b px-4 py-2 text-xs">
          <span className="bg-destructive/60 size-2.5 rounded-full" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 truncate font-medium">{page?.name}</span>
          <span className="ml-auto tabular-nums">{width}px</span>
        </div>

        <div
          ref={setNodeRef}
          className={cn("min-h-[420px] p-5", isOver && "bg-primary/5")}
        >
          {page && page.elements.length > 0 ? (
            <SortableContext
              items={page.elements.map((e) => e.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-4">
                {page.elements.map((el, i) => (
                  <CanvasElement
                    key={el.id}
                    element={el}
                    index={i}
                    count={page.elements.length}
                    selected={state.selectedElementId === el.id}
                    getVar={getVar}
                    setVar={setVar}
                  />
                ))}
              </div>
            </SortableContext>
          ) : (
            <EmptyCanvas />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyCanvas() {
  return (
    <div className="text-muted-foreground grid min-h-[360px] place-items-center rounded-lg border border-dashed text-center">
      <div className="max-w-xs px-6">
        <p className="text-foreground text-sm font-medium">Empty screen</p>
        <p className="mt-1 text-sm">
          Click a component in the library on the left to add it here, or drag
          it onto the canvas.
        </p>
      </div>
    </div>
  );
}

interface CanvasElementProps {
  element: PrototypeElement;
  index: number;
  count: number;
  selected: boolean;
  getVar: (name: string) => string;
  setVar: (name: string, value: string) => void;
}

function CanvasElement({
  element,
  index,
  count,
  selected,
  getVar,
  setVar,
}: CanvasElementProps) {
  const { dispatch } = usePrototypeStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: element.id,
  });

  const hasActions = element.actions.length > 0;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "group relative rounded-lg outline-offset-2 transition-shadow",
        selected
          ? "outline-primary outline outline-2"
          : "hover:outline-border outline outline-1 outline-transparent",
        element.hidden && "opacity-40",
        isDragging && "z-10 opacity-70"
      )}
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ t: "select", id: element.id });
      }}
    >
      {/* Interaction indicator */}
      {hasActions && (
        <span
          className="bg-primary text-primary-foreground absolute -top-2 -right-2 z-10 grid size-5 place-items-center rounded-full shadow"
          title={`${element.actions.length} interaction(s)`}
        >
          <Zap className="size-3" />
        </span>
      )}

      {/* Hover / selected toolbar */}
      <div
        className={cn(
          "bg-background absolute -top-3.5 left-2 z-10 flex items-center gap-0.5 rounded-md border p-0.5 shadow-sm transition-opacity",
          selected
            ? "opacity-100"
            : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-muted-foreground hover:bg-accent flex size-6 cursor-grab items-center justify-center rounded active:cursor-grabbing"
          {...attributes}
          {...listeners}
          title="Drag to reorder"
        >
          <GripVertical className="size-3.5" />
        </button>
        <span className="text-muted-foreground max-w-28 truncate px-1 text-xs font-medium">
          {element.name}
        </span>
        <ToolbarButton
          title="Move up"
          disabled={index === 0}
          onClick={() =>
            dispatch({ t: "moveElement", id: element.id, dir: -1 })
          }
        >
          <ArrowUp className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Move down"
          disabled={index === count - 1}
          onClick={() => dispatch({ t: "moveElement", id: element.id, dir: 1 })}
        >
          <ArrowDown className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Duplicate"
          onClick={() => dispatch({ t: "duplicateElement", id: element.id })}
        >
          <Copy className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Delete"
          onClick={() => dispatch({ t: "deleteElement", id: element.id })}
        >
          <Trash2 className="size-3.5" />
        </ToolbarButton>
      </div>

      <div className="pointer-events-none select-none">
        <ElementView
          element={element}
          mode="editor"
          getVar={getVar}
          setVar={setVar}
        />
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="size-6"
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
