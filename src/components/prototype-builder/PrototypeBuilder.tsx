import * as React from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  ChevronLeft,
  Monitor,
  Play,
  Share2,
  Smartphone,
  Sparkles,
  Tablet,
  Workflow,
  LayoutPanelLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigation } from "@/contexts/navigation-context";

import { PagesSidebar } from "./PagesSidebar";
import { ComponentLibrary } from "./ComponentLibrary";
import { Canvas } from "./Canvas";
import { InteractionPanel } from "./InteractionPanel";
import { FlowView } from "./FlowView";
import { PrototypePlayer } from "./PrototypePlayer";
import { catalogById } from "./catalog";
import { PrototypeStoreProvider, usePrototypeStore } from "./store";
import { templates } from "./templates";
import type { DeviceMode } from "./types";

export function PrototypeBuilder() {
  // This route renders instead of DynamicMainContent, so it owns dismissing
  // the pre-React HTML splash screen when opened directly (e.g. via a
  // #prototype-builder deep link on a fresh load).
  React.useEffect(() => {
    window.__removeLoadingScreen?.();
  }, []);

  return (
    <PrototypeStoreProvider>
      <BuilderShell />
    </PrototypeStoreProvider>
  );
}

function BuilderShell() {
  const { state, dispatch } = usePrototypeStore();
  const [dragLabel, setDragLabel] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const onDragStart = (e: DragStartEvent) => {
    const id = String(e.active.id);
    if (id.startsWith("palette:")) {
      setDragLabel(catalogById[id.slice(8)]?.name ?? "Component");
    } else {
      const el = state.pages
        .flatMap((p) => p.elements)
        .find((x) => x.id === id);
      setDragLabel(el?.name ?? null);
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    setDragLabel(null);
    const activeId = String(e.active.id);
    const overId = e.over ? String(e.over.id) : null;
    if (!overId) return;

    const page = state.pages.find((p) => p.id === state.currentPageId);
    if (!page) return;

    if (activeId.startsWith("palette:")) {
      const catalogId = activeId.slice(8);
      const overIndex = page.elements.findIndex((el) => el.id === overId);
      dispatch({
        t: "addElement",
        pageId: page.id,
        catalogId,
        index: overIndex >= 0 ? overIndex : page.elements.length,
      });
      return;
    }

    // Reorder within the canvas.
    if (activeId !== overId) {
      const from = page.elements.findIndex((el) => el.id === activeId);
      const to = page.elements.findIndex((el) => el.id === overId);
      if (from >= 0 && to >= 0)
        dispatch({ t: "reorderElements", pageId: page.id, from, to });
    }
  };

  return (
    <div className="bg-background flex h-svh flex-col overflow-hidden">
      <Toolbar />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex min-h-0 flex-1">
          {/* Pages */}
          <aside className="bg-card w-56 shrink-0 border-r">
            <PagesSidebar />
          </aside>

          {state.view === "design" ? (
            <>
              {/* Component library */}
              <aside className="bg-card w-60 shrink-0 border-r">
                <ComponentLibrary />
              </aside>
              {/* Canvas */}
              <main className="min-w-0 flex-1">
                <Canvas />
              </main>
              {/* Interaction panel */}
              <aside className="bg-card w-80 shrink-0 border-l">
                <InteractionPanel />
              </aside>
            </>
          ) : (
            <main className="min-w-0 flex-1">
              <FlowView />
            </main>
          )}
        </div>

        <DragOverlay dropAnimation={null}>
          {dragLabel ? (
            <div className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm font-medium shadow-lg">
              {dragLabel}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {state.playing && <PrototypePlayer />}
    </div>
  );
}

function Toolbar() {
  const { state, dispatch } = usePrototypeStore();
  const { setActiveComponent } = useNavigation();

  return (
    <header className="bg-card flex h-14 shrink-0 items-center gap-3 border-b px-4">
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        onClick={() => setActiveComponent("get-started")}
      >
        <ChevronLeft className="size-4" /> Library
      </Button>

      <div className="flex items-center gap-2">
        <div className="bg-primary/10 text-primary grid size-7 place-items-center rounded-md">
          <Sparkles className="size-4" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">Prototype Builder</div>
          <div className="text-muted-foreground text-[11px]">{state.name}</div>
        </div>
      </div>

      {/* View switch */}
      <div className="bg-muted ml-4 flex items-center rounded-md p-0.5">
        <SegButton
          active={state.view === "design"}
          onClick={() => dispatch({ t: "view", view: "design" })}
        >
          <LayoutPanelLeft className="size-4" /> Design
        </SegButton>
        <SegButton
          active={state.view === "flow"}
          onClick={() => dispatch({ t: "view", view: "flow" })}
        >
          <Workflow className="size-4" /> Flow
        </SegButton>
      </div>

      {/* Device switch (design view only) */}
      {state.view === "design" && (
        <div className="bg-muted flex items-center rounded-md p-0.5">
          <DeviceSeg
            mode="desktop"
            current={state.device}
            onClick={(m) => dispatch({ t: "device", device: m })}
          >
            <Monitor className="size-4" />
          </DeviceSeg>
          <DeviceSeg
            mode="tablet"
            current={state.device}
            onClick={(m) => dispatch({ t: "device", device: m })}
          >
            <Tablet className="size-4" />
          </DeviceSeg>
          <DeviceSeg
            mode="mobile"
            current={state.device}
            onClick={(m) => dispatch({ t: "device", device: m })}
          >
            <Smartphone className="size-4" />
          </DeviceSeg>
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Sparkles className="size-4" /> Templates
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Start from a workflow</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {templates.map((tpl) => (
              <DropdownMenuItem
                key={tpl.id}
                onClick={() => {
                  dispatch({ t: "load", doc: tpl.build() });
                }}
              >
                <div>
                  <div className="text-sm font-medium">{tpl.name}</div>
                  <div className="text-muted-foreground text-xs">
                    {tpl.description}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => dispatch({ t: "clear" })}>
              <span className="text-sm">Blank prototype</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          disabled
          title="Sharing is disabled in this prototype-only environment"
        >
          <Share2 className="size-4" /> Share
        </Button>

        <Button size="sm" onClick={() => dispatch({ t: "play", on: true })}>
          <Play className="size-4" /> Play
        </Button>
      </div>
    </header>
  );
}

function SegButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded px-2.5 py-1 text-sm font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function DeviceSeg({
  mode,
  current,
  onClick,
  children,
}: {
  mode: DeviceMode;
  current: DeviceMode;
  onClick: (m: DeviceMode) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => onClick(mode)}
      title={mode}
      className={cn(
        "grid size-7 place-items-center rounded transition-colors",
        current === mode
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
