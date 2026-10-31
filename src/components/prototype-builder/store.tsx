/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

import type {
  BuilderState,
  BuilderView,
  DeviceMode,
  PrototypeAction,
  PrototypeElement,
  PrototypePage,
} from "./types";
import { catalogById, makeElementFromCatalog } from "./catalog";
import { createSeedPrototype } from "./sample-data";

const STORAGE_KEY = "care-prototype-builder-doc-v1";

let idCounter = 0;
function uid(prefix = "id"): string {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

function initialState(): BuilderState {
  const doc = loadDoc() ?? createSeedPrototype();
  return {
    ...doc,
    currentPageId: doc.startPageId || doc.pages[0]?.id,
    selectedElementId: null,
    device: "desktop",
    view: "design",
    playing: false,
  };
}

function loadDoc() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.pages) && parsed.pages.length)
      return parsed;
  } catch {
    /* ignore corrupt snapshots */
  }
  return null;
}

function persist(state: BuilderState) {
  if (typeof window === "undefined") return;
  try {
    const { name, pages, variables, startPageId } = state;
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name, pages, variables, startPageId })
    );
  } catch {
    /* storage may be unavailable — prototypes are ephemeral anyway */
  }
}

type Action =
  | { t: "select"; id: string | null }
  | { t: "device"; device: DeviceMode }
  | { t: "view"; view: BuilderView }
  | { t: "play"; on: boolean }
  | { t: "currentPage"; id: string }
  | { t: "addPage"; name?: string }
  | { t: "duplicatePage"; id: string }
  | { t: "renamePage"; id: string; name: string }
  | { t: "deletePage"; id: string }
  | { t: "movePage"; id: string; dir: -1 | 1 }
  | { t: "pageFlowPos"; id: string; x: number; y: number }
  | { t: "setStartPage"; id: string }
  | { t: "addElement"; pageId: string; catalogId: string; index?: number }
  | { t: "updateElement"; id: string; patch: Partial<PrototypeElement> }
  | { t: "updateProps"; id: string; props: Record<string, unknown> }
  | { t: "duplicateElement"; id: string }
  | { t: "deleteElement"; id: string }
  | { t: "moveElement"; id: string; dir: -1 | 1 }
  | { t: "reorderElements"; pageId: string; from: number; to: number }
  | { t: "addAction"; elementId: string; action?: Partial<PrototypeAction> }
  | {
      t: "updateAction";
      elementId: string;
      actionId: string;
      patch: Partial<PrototypeAction>;
    }
  | { t: "deleteAction"; elementId: string; actionId: string }
  | { t: "addVariable"; name: string }
  | { t: "updateVariable"; index: number; name?: string; value?: string }
  | { t: "deleteVariable"; index: number }
  | { t: "renameDoc"; name: string }
  | { t: "load"; doc: import("./types").PrototypeDoc }
  | { t: "reset" }
  | { t: "clear" };

function mapPages(
  state: BuilderState,
  fn: (p: PrototypePage) => PrototypePage
): PrototypePage[] {
  return state.pages.map(fn);
}

function mapElement(
  state: BuilderState,
  elementId: string,
  fn: (e: PrototypeElement) => PrototypeElement
): PrototypePage[] {
  return state.pages.map((p) => ({
    ...p,
    elements: p.elements.map((e) => (e.id === elementId ? fn(e) : e)),
  }));
}

function reducer(state: BuilderState, action: Action): BuilderState {
  switch (action.t) {
    case "select":
      return { ...state, selectedElementId: action.id };
    case "device":
      return { ...state, device: action.device };
    case "view":
      return { ...state, view: action.view };
    case "play":
      return { ...state, playing: action.on };
    case "currentPage":
      return { ...state, currentPageId: action.id, selectedElementId: null };

    case "addPage": {
      const last = state.pages[state.pages.length - 1];
      const page: PrototypePage = {
        id: uid("page"),
        name: action.name || `Page ${state.pages.length + 1}`,
        elements: [],
        flowX: (last?.flowX ?? 0) + 300,
        flowY: last?.flowY ?? 120,
      };
      return {
        ...state,
        pages: [...state.pages, page],
        currentPageId: page.id,
        selectedElementId: null,
      };
    }
    case "duplicatePage": {
      const idx = state.pages.findIndex((p) => p.id === action.id);
      if (idx < 0) return state;
      const src = state.pages[idx];
      const copy: PrototypePage = {
        ...src,
        id: uid("page"),
        name: `${src.name} copy`,
        flowX: src.flowX + 40,
        flowY: src.flowY + 40,
        elements: src.elements.map((e) => ({
          ...e,
          id: uid("el"),
          actions: e.actions.map((a) => ({ ...a, id: uid("act") })),
        })),
      };
      const pages = [...state.pages];
      pages.splice(idx + 1, 0, copy);
      return { ...state, pages, currentPageId: copy.id };
    }
    case "renamePage":
      return {
        ...state,
        pages: mapPages(state, (p) =>
          p.id === action.id ? { ...p, name: action.name } : p
        ),
      };
    case "deletePage": {
      if (state.pages.length <= 1) return state;
      const pages = state.pages.filter((p) => p.id !== action.id);
      // Drop navigate targets that pointed at the removed page.
      const cleaned = pages.map((p) => ({
        ...p,
        elements: p.elements.map((e) => ({
          ...e,
          actions: e.actions.map((a) =>
            a.targetPageId === action.id ? { ...a, targetPageId: undefined } : a
          ),
        })),
      }));
      const currentPageId =
        state.currentPageId === action.id ? cleaned[0].id : state.currentPageId;
      const startPageId =
        state.startPageId === action.id ? cleaned[0].id : state.startPageId;
      return {
        ...state,
        pages: cleaned,
        currentPageId,
        startPageId,
        selectedElementId: null,
      };
    }
    case "movePage": {
      const idx = state.pages.findIndex((p) => p.id === action.id);
      const next = idx + action.dir;
      if (idx < 0 || next < 0 || next >= state.pages.length) return state;
      const pages = [...state.pages];
      [pages[idx], pages[next]] = [pages[next], pages[idx]];
      return { ...state, pages };
    }
    case "pageFlowPos":
      return {
        ...state,
        pages: mapPages(state, (p) =>
          p.id === action.id ? { ...p, flowX: action.x, flowY: action.y } : p
        ),
      };
    case "setStartPage":
      return { ...state, startPageId: action.id };

    case "addElement": {
      const el = makeElementFromCatalog(action.catalogId, () => uid("el"));
      if (!el) return state;
      return {
        ...state,
        selectedElementId: el.id,
        pages: mapPages(state, (p) => {
          if (p.id !== action.pageId) return p;
          const elements = [...p.elements];
          const at = action.index ?? elements.length;
          elements.splice(at, 0, el);
          return { ...p, elements };
        }),
      };
    }
    case "updateElement":
      return {
        ...state,
        pages: mapElement(state, action.id, (e) => ({ ...e, ...action.patch })),
      };
    case "updateProps":
      return {
        ...state,
        pages: mapElement(state, action.id, (e) => ({
          ...e,
          props: { ...e.props, ...action.props },
        })),
      };
    case "duplicateElement": {
      const copyId = uid("el");
      return {
        ...state,
        selectedElementId: copyId,
        pages: mapPages(state, (p) => {
          const idx = p.elements.findIndex((e) => e.id === action.id);
          if (idx < 0) return p;
          const src = p.elements[idx];
          const copy: PrototypeElement = {
            ...src,
            id: copyId,
            name: `${src.name} copy`,
            props: { ...src.props },
            actions: src.actions.map((a) => ({ ...a, id: uid("act") })),
          };
          const elements = [...p.elements];
          elements.splice(idx + 1, 0, copy);
          return { ...p, elements };
        }),
      };
    }
    case "deleteElement":
      return {
        ...state,
        selectedElementId:
          state.selectedElementId === action.id
            ? null
            : state.selectedElementId,
        pages: mapPages(state, (p) => ({
          ...p,
          elements: p.elements.filter((e) => e.id !== action.id),
        })),
      };
    case "moveElement": {
      return {
        ...state,
        pages: mapPages(state, (p) => {
          const idx = p.elements.findIndex((e) => e.id === action.id);
          if (idx < 0) return p;
          const next = idx + action.dir;
          if (next < 0 || next >= p.elements.length) return p;
          const elements = [...p.elements];
          [elements[idx], elements[next]] = [elements[next], elements[idx]];
          return { ...p, elements };
        }),
      };
    }
    case "reorderElements":
      return {
        ...state,
        pages: mapPages(state, (p) => {
          if (p.id !== action.pageId) return p;
          const elements = [...p.elements];
          const [moved] = elements.splice(action.from, 1);
          elements.splice(action.to, 0, moved);
          return { ...p, elements };
        }),
      };

    case "addAction": {
      const suggestion =
        catalogById[
          state.pages
            .flatMap((p) => p.elements)
            .find((e) => e.id === action.elementId)?.type ?? ""
        ]?.suggestions?.[0]?.action;
      const newAction: PrototypeAction = {
        id: uid("act"),
        trigger: "click",
        type: "navigate",
        transition: "slide-left",
        duration: 250,
        ...suggestion,
        ...action.action,
      };
      return {
        ...state,
        pages: mapElement(state, action.elementId, (e) => ({
          ...e,
          actions: [...e.actions, newAction],
        })),
      };
    }
    case "updateAction":
      return {
        ...state,
        pages: mapElement(state, action.elementId, (e) => ({
          ...e,
          actions: e.actions.map((a) =>
            a.id === action.actionId ? { ...a, ...action.patch } : a
          ),
        })),
      };
    case "deleteAction":
      return {
        ...state,
        pages: mapElement(state, action.elementId, (e) => ({
          ...e,
          actions: e.actions.filter((a) => a.id !== action.actionId),
        })),
      };

    case "addVariable": {
      if (
        !action.name.trim() ||
        state.variables.some((v) => v.name === action.name)
      )
        return state;
      return {
        ...state,
        variables: [
          ...state.variables,
          { name: action.name.trim(), value: "" },
        ],
      };
    }
    case "updateVariable":
      return {
        ...state,
        variables: state.variables.map((v, i) =>
          i === action.index
            ? { name: action.name ?? v.name, value: action.value ?? v.value }
            : v
        ),
      };
    case "deleteVariable":
      return {
        ...state,
        variables: state.variables.filter((_, i) => i !== action.index),
      };

    case "renameDoc":
      return { ...state, name: action.name };

    case "load": {
      const doc = action.doc;
      return {
        ...state,
        name: doc.name,
        pages: doc.pages,
        variables: doc.variables,
        startPageId: doc.startPageId,
        currentPageId: doc.startPageId || doc.pages[0]?.id,
        selectedElementId: null,
        view: "design",
        playing: false,
      };
    }
    case "reset": {
      const doc = createSeedPrototype();
      return { ...initialState(), ...doc, currentPageId: doc.startPageId };
    }
    case "clear": {
      const page: PrototypePage = {
        id: uid("page"),
        name: "Page 1",
        elements: [],
        flowX: 40,
        flowY: 120,
      };
      return {
        ...state,
        name: "Untitled prototype",
        pages: [page],
        variables: [],
        startPageId: page.id,
        currentPageId: page.id,
        selectedElementId: null,
      };
    }
    default:
      return state;
  }
}

interface StoreValue {
  state: BuilderState;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = React.createContext<StoreValue | null>(null);

export function PrototypeStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(reducer, undefined, initialState);

  React.useEffect(() => {
    persist(state);
  }, [state]);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function usePrototypeStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx)
    throw new Error(
      "usePrototypeStore must be used within PrototypeStoreProvider"
    );
  return ctx;
}

export function useCurrentPage() {
  const { state } = usePrototypeStore();
  return (
    state.pages.find((p) => p.id === state.currentPageId) ?? state.pages[0]
  );
}

export function useSelectedElement() {
  const { state } = usePrototypeStore();
  if (!state.selectedElementId) return null;
  for (const p of state.pages) {
    const el = p.elements.find((e) => e.id === state.selectedElementId);
    if (el) return { page: p, element: el };
  }
  return null;
}
