import * as React from "react";
import { Flag, LayoutGrid, Maximize2, Minus, Pencil, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { catalogById } from "./catalog";
import { usePrototypeStore } from "./store";
import type { PrototypePage } from "./types";

const NODE_W = 224;
const NODE_H = 148;

interface Edge {
  from: string;
  to: string;
  count: number;
}

export function FlowView() {
  const { state, dispatch } = usePrototypeStore();
  const [zoom, setZoom] = React.useState(0.9);
  const [pan, setPan] = React.useState({ x: 40, y: 20 });
  const dragRef = React.useRef<{
    mode: "pan" | "node";
    id?: string;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
  } | null>(null);

  // Derive edges from navigate actions.
  const edges = React.useMemo<Edge[]>(() => {
    const map = new Map<string, Edge>();
    for (const page of state.pages) {
      for (const el of page.elements) {
        for (const a of el.actions) {
          if (
            a.type === "navigate" &&
            a.targetPageId &&
            a.targetPageId !== page.id
          ) {
            const key = `${page.id}->${a.targetPageId}`;
            const existing = map.get(key);
            if (existing) existing.count += 1;
            else map.set(key, { from: page.id, to: a.targetPageId, count: 1 });
          }
        }
      }
    }
    return Array.from(map.values());
  }, [state.pages]);

  const pageById = React.useMemo(
    () =>
      Object.fromEntries(state.pages.map((p) => [p.id, p])) as Record<
        string,
        PrototypePage
      >,
    [state.pages]
  );

  const onPointerDown = (
    e: React.PointerEvent,
    mode: "pan" | "node",
    id?: string
  ) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    const page = id ? pageById[id] : null;
    dragRef.current = {
      mode,
      id,
      sx: e.clientX,
      sy: e.clientY,
      ox: page ? page.flowX : pan.x,
      oy: page ? page.flowY : pan.y,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = (e.clientX - d.sx) / zoom;
    const dy = (e.clientY - d.sy) / zoom;
    if (d.mode === "node" && d.id) {
      dispatch({
        t: "pageFlowPos",
        id: d.id,
        x: Math.round(d.ox + dx),
        y: Math.round(d.oy + dy),
      });
    } else {
      setPan({ x: d.ox + (e.clientX - d.sx), y: d.oy + (e.clientY - d.sy) });
    }
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const autoArrange = () => {
    state.pages.forEach((p, i) => {
      dispatch({
        t: "pageFlowPos",
        id: p.id,
        x: 40 + i * 300,
        y: 160 + (i % 2) * 60,
      });
    });
    setPan({ x: 40, y: 20 });
    setZoom(0.8);
  };

  return (
    <div className="bg-muted/30 relative h-full overflow-hidden">
      {/* Controls */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={autoArrange}
          className="bg-background"
        >
          <LayoutGrid className="size-4" /> Auto arrange
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => dispatch({ t: "addPage" })}
          className="bg-background"
        >
          <Plus className="size-4" /> Add page
        </Button>
      </div>
      <div className="bg-background absolute top-3 right-3 z-10 flex items-center gap-1 rounded-md border p-0.5 shadow-sm">
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => setZoom((z) => Math.max(0.3, z - 0.1))}
        >
          <Minus className="size-4" />
        </Button>
        <span className="w-10 text-center text-xs tabular-nums">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => setZoom((z) => Math.min(1.6, z + 0.1))}
        >
          <Plus className="size-4" />
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => {
            setZoom(0.9);
            setPan({ x: 40, y: 20 });
          }}
        >
          <Maximize2 className="size-4" />
        </Button>
      </div>

      {/* Pannable stage */}
      <div
        className="h-full w-full cursor-grab touch-none bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:20px_20px] active:cursor-grabbing"
        onPointerDown={(e) => onPointerDown(e, "pan")}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className="relative origin-top-left"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {/* Edges */}
          <svg
            className="pointer-events-none absolute overflow-visible"
            style={{ width: 1, height: 1 }}
          >
            <defs>
              <marker
                id="flow-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L8,3 L0,6 Z" className="fill-primary/70" />
              </marker>
            </defs>
            {edges.map((edge) => {
              const from = pageById[edge.from];
              const to = pageById[edge.to];
              if (!from || !to) return null;
              const x1 = from.flowX + NODE_W;
              const y1 = from.flowY + NODE_H / 2;
              const x2 = to.flowX;
              const y2 = to.flowY + NODE_H / 2;
              const midX = (x1 + x2) / 2;
              return (
                <path
                  key={`${edge.from}-${edge.to}`}
                  d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                  className="stroke-primary/60"
                  strokeWidth={2}
                  fill="none"
                  markerEnd="url(#flow-arrow)"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {state.pages.map((page) => (
            <FlowNode
              key={page.id}
              page={page}
              active={state.currentPageId === page.id}
              isStart={state.startPageId === page.id}
              onPointerDownHeader={(e) => onPointerDown(e, "node", page.id)}
              onOpen={() => {
                dispatch({ t: "currentPage", id: page.id });
                dispatch({ t: "view", view: "design" });
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-muted-foreground pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs">
        Drag nodes to arrange · drag background to pan · connections follow
        “Navigate” interactions
      </div>
    </div>
  );
}

function FlowNode({
  page,
  active,
  isStart,
  onPointerDownHeader,
  onOpen,
}: {
  page: PrototypePage;
  active: boolean;
  isStart: boolean;
  onPointerDownHeader: (e: React.PointerEvent) => void;
  onOpen: () => void;
}) {
  return (
    <div
      className={cn(
        "bg-card absolute rounded-lg border shadow-sm transition-shadow",
        active ? "border-primary ring-primary ring-1" : "hover:shadow-md"
      )}
      style={{
        left: page.flowX,
        top: page.flowY,
        width: NODE_W,
        height: NODE_H,
      }}
    >
      <div
        className="flex cursor-grab items-center gap-1.5 border-b px-2.5 py-2 active:cursor-grabbing"
        onPointerDown={onPointerDownHeader}
      >
        {isStart && <Flag className="text-primary size-3 shrink-0" />}
        <span className="truncate text-sm font-medium">{page.name}</span>
        <button
          className="text-muted-foreground hover:text-foreground ml-auto shrink-0"
          title="Open page"
          onClick={onOpen}
        >
          <Pencil className="size-3.5" />
        </button>
      </div>
      <div className="p-2.5">
        {page.group && (
          <Badge variant="neutral" className="mb-1.5 text-[10px]">
            {page.group}
          </Badge>
        )}
        <div className="space-y-1">
          {page.elements.slice(0, 3).map((el) => {
            const Icon = catalogById[el.type]?.icon;
            return (
              <div
                key={el.id}
                className="text-muted-foreground flex items-center gap-1.5 text-[11px]"
              >
                {Icon && <Icon className="size-3 shrink-0" />}
                <span className="truncate">{el.name}</span>
              </div>
            );
          })}
          {page.elements.length === 0 && (
            <span className="text-muted-foreground text-[11px] italic">
              Empty
            </span>
          )}
          {page.elements.length > 3 && (
            <span className="text-muted-foreground text-[11px]">
              +{page.elements.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
