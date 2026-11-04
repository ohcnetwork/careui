import * as React from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Home,
  Monitor,
  RotateCcw,
  Smartphone,
  Tablet,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ElementView } from "./element-renderer";
import { DEVICE_WIDTH } from "./constants";
import { usePrototypeStore } from "./store";
import type {
  ActionCondition,
  DeviceMode,
  PrototypeAction,
  PrototypeElement,
  PrototypePage,
  TransitionType,
  TriggerType,
} from "./types";

const TRANSITION_CLASS: Record<TransitionType, string> = {
  none: "",
  "slide-left": "animate-in slide-in-from-right-10 fade-in",
  "slide-right": "animate-in slide-in-from-left-10 fade-in",
  "slide-up": "animate-in slide-in-from-bottom-10 fade-in",
  fade: "animate-in fade-in",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function evalCondition(
  cond: ActionCondition,
  vars: Record<string, string>
): boolean {
  const v = vars[cond.variable] ?? "";
  switch (cond.op) {
    case "eq":
      return v === (cond.value ?? "");
    case "neq":
      return v !== (cond.value ?? "");
    case "empty":
      return v.trim() === "";
    case "notEmpty":
      return v.trim() !== "";
    default:
      return true;
  }
}

export function PrototypePlayer() {
  const { state, dispatch } = usePrototypeStore();
  const pageMap = React.useMemo(
    () =>
      Object.fromEntries(state.pages.map((p) => [p.id, p])) as Record<
        string,
        PrototypePage
      >,
    [state.pages]
  );

  const [device, setDevice] = React.useState<DeviceMode>(
    state.device === "mobile" ? "mobile" : "desktop"
  );
  const [currentPageId, setCurrentPageId] = React.useState(state.startPageId);
  const [history, setHistory] = React.useState<string[]>([]);
  const [vars, setVars] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(state.variables.map((v) => [v.name, v.value]))
  );
  const [overrides, setOverrides] = React.useState<Record<string, boolean>>({});
  const [transition, setTransition] = React.useState<TransitionType>("fade");
  const [animKey, setAnimKey] = React.useState(0);

  const restart = React.useCallback(() => {
    setCurrentPageId(state.startPageId);
    setHistory([]);
    setVars(Object.fromEntries(state.variables.map((v) => [v.name, v.value])));
    setOverrides({});
    setTransition("fade");
    setAnimKey((k) => k + 1);
  }, [state.startPageId, state.variables]);

  const goBack = React.useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const next = [...h];
      const prev = next.pop()!;
      setTransition("slide-right");
      setCurrentPageId(prev);
      setAnimKey((k) => k + 1);
      return next;
    });
  }, []);

  const navigate = React.useCallback(
    (pageId: string, tr: TransitionType) => {
      setHistory((h) => [...h, currentPageId]);
      setTransition(tr);
      setCurrentPageId(pageId);
      setAnimKey((k) => k + 1);
    },
    [currentPageId]
  );

  const runActions = React.useCallback(
    async (actions: PrototypeAction[], trigger: TriggerType) => {
      for (const action of actions) {
        if (action.trigger !== trigger) continue;
        if (action.condition && !evalCondition(action.condition, vars))
          continue;
        switch (action.type) {
          case "navigate":
            if (action.targetPageId && pageMap[action.targetPageId]) {
              navigate(action.targetPageId, action.transition ?? "none");
            }
            break;
          case "back":
            goBack();
            break;
          case "showComponent":
          case "openModal":
            if (action.targetElementId)
              setOverrides((o) => ({ ...o, [action.targetElementId!]: true }));
            break;
          case "hideComponent":
          case "closeModal":
            if (action.targetElementId)
              setOverrides((o) => ({ ...o, [action.targetElementId!]: false }));
            break;
          case "toggleComponent":
            if (action.targetElementId) {
              const id = action.targetElementId;
              setOverrides((o) => ({ ...o, [id]: !(o[id] ?? false) }));
            }
            break;
          case "showToast":
            toast(action.value || "Done");
            break;
          case "setVariable":
            if (action.variableName)
              setVars((v) => ({
                ...v,
                [action.variableName!]: action.value ?? "",
              }));
            break;
          case "delay":
            await sleep(action.duration ?? 300);
            break;
        }
      }
    },
    [goBack, navigate, pageMap, vars]
  );

  const getVar = React.useCallback((name: string) => vars[name] ?? "", [vars]);
  const setVar = React.useCallback((name: string, value: string) => {
    setVars((v) => ({ ...v, [name]: value }));
  }, []);

  const emit = React.useCallback(
    (element: PrototypeElement, trigger: TriggerType) => {
      void runActions(element.actions, trigger);
    },
    [runActions]
  );

  // Keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch({ t: "play", on: false });
      if (
        (e.key === "Backspace" || (e.altKey && e.key === "ArrowLeft")) &&
        !isTypingTarget(e.target)
      ) {
        e.preventDefault();
        goBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch, goBack]);

  const page = pageMap[currentPageId] ?? state.pages[0];
  const width = DEVICE_WIDTH[device];

  const isVisible = (el: PrototypeElement) => overrides[el.id] ?? !el.hidden;
  const normalElements = page.elements.filter(
    (e) => !e.isModal && isVisible(e)
  );
  const modalElements = page.elements.filter((e) => e.isModal && isVisible(e));

  return (
    <div className="bg-muted/60 fixed inset-0 z-50 flex flex-col backdrop-blur-sm">
      {/* Player chrome */}
      <div className="bg-background flex items-center gap-2 border-b px-4 py-2.5">
        <Button
          variant="ghost"
          size="icon-sm"
          title="Back"
          onClick={goBack}
          disabled={history.length === 0}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          title="Restart from start page"
          onClick={restart}
        >
          <RotateCcw className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          title="Go to start page"
          onClick={() => navigate(state.startPageId, "fade")}
        >
          <Home className="size-4" />
        </Button>
        <div className="ml-1 min-w-0">
          <span className="text-muted-foreground text-xs">Playing · </span>
          <span className="text-sm font-medium">{page?.name}</span>
        </div>

        <div className="bg-muted ml-auto flex items-center rounded-md p-0.5">
          <DeviceButton
            active={device === "desktop"}
            onClick={() => setDevice("desktop")}
            title="Desktop"
          >
            <Monitor className="size-4" />
          </DeviceButton>
          <DeviceButton
            active={device === "tablet"}
            onClick={() => setDevice("tablet")}
            title="Tablet"
          >
            <Tablet className="size-4" />
          </DeviceButton>
          <DeviceButton
            active={device === "mobile"}
            onClick={() => setDevice("mobile")}
            title="Mobile"
          >
            <Smartphone className="size-4" />
          </DeviceButton>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch({ t: "play", on: false })}
        >
          <X className="size-4" /> Exit
        </Button>
      </div>

      {/* Stage */}
      <div className="flex min-h-0 flex-1 items-start justify-center overflow-auto p-6">
        <div
          className="bg-background ring-border relative overflow-hidden rounded-xl shadow-xl ring-1 transition-[width]"
          style={{
            width: Math.min(width, 1100),
            maxWidth: "100%",
            minHeight: 480,
          }}
        >
          <div
            key={animKey}
            className={cn("p-6", TRANSITION_CLASS[transition])}
            style={{ animationDuration: "260ms" }}
          >
            {normalElements.length === 0 ? (
              <div className="text-muted-foreground grid min-h-[380px] place-items-center text-sm">
                This screen is empty.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {normalElements.map((el) => (
                  <PlayerElement
                    key={el.id}
                    element={el}
                    emit={emit}
                    getVar={getVar}
                    setVar={setVar}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Modal overlay layer */}
          {modalElements.length > 0 && (
            <div
              className="absolute inset-0 z-20 grid place-items-center bg-black/40 p-6"
              onClick={() =>
                setOverrides((o) => {
                  const next = { ...o };
                  for (const m of modalElements) next[m.id] = false;
                  return next;
                })
              }
            >
              <div
                className="animate-in zoom-in-95 fade-in w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                {modalElements.map((el) => (
                  <PlayerElement
                    key={el.id}
                    element={el}
                    emit={emit}
                    getVar={getVar}
                    setVar={setVar}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlayerElement({
  element,
  emit,
  getVar,
  setVar,
}: {
  element: PrototypeElement;
  emit: (
    element: PrototypeElement,
    trigger: TriggerType,
    payload?: string
  ) => void;
  getVar: (name: string) => string;
  setVar: (name: string, value: string) => void;
}) {
  const clickable = element.actions.some((a) => a.trigger === "click");
  const hoverable = element.actions.some((a) => a.trigger === "hover");

  return (
    <div
      className={cn(
        clickable && "cursor-pointer transition-transform active:scale-[0.99]"
      )}
      onClick={clickable ? () => emit(element, "click") : undefined}
      onMouseEnter={hoverable ? () => emit(element, "hover") : undefined}
    >
      <ElementView
        element={element}
        mode="player"
        getVar={getVar}
        setVar={setVar}
        emit={emit}
      />
    </div>
  );
}

function DeviceButton({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "grid size-7 place-items-center rounded transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
}
