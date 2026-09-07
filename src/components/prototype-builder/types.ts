// Data model for the Prototype Builder.
//
// Everything here lives only in memory (with an optional sessionStorage
// snapshot for convenience). There is no backend, no database and no
// persistence of "application" state — variables and player state are
// transient and reset whenever the prototype is replayed.

export type DeviceMode = "desktop" | "tablet" | "mobile";

export type BuilderView = "design" | "flow";

/** Triggers a component can expose. */
export type TriggerType = "click" | "change" | "submit" | "hover";

/** Everything an interaction can do inside the prototype. */
export type ActionType =
  | "navigate"
  | "back"
  | "openModal"
  | "closeModal"
  | "showComponent"
  | "hideComponent"
  | "toggleComponent"
  | "showToast"
  | "setVariable"
  | "delay";

export type TransitionType =
  | "none"
  | "slide-left"
  | "slide-right"
  | "fade"
  | "slide-up";

export type ConditionOp = "eq" | "neq" | "empty" | "notEmpty";

export interface ActionCondition {
  variable: string;
  op: ConditionOp;
  value?: string;
}

/**
 * A single step in an interaction. Actions run top-to-bottom when their
 * trigger fires, so a list of actions is effectively a "custom sequence".
 */
export interface PrototypeAction {
  id: string;
  trigger: TriggerType;
  type: ActionType;
  /** navigate → destination page id */
  targetPageId?: string;
  /** show/hide/toggle/openModal/closeModal → target element id */
  targetElementId?: string;
  /** showToast → message, setVariable → value */
  value?: string;
  /** setVariable → variable name */
  variableName?: string;
  transition?: TransitionType;
  /** ms — used by navigate transitions and `delay` */
  duration?: number;
  /** Optional guard. When present the action only runs if it evaluates true. */
  condition?: ActionCondition;
}

export interface PrototypeElement {
  id: string;
  /** Catalog item id (see catalog.tsx). */
  type: string;
  /** Author-facing label shown in layers / flow. */
  name: string;
  props: Record<string, unknown>;
  /** Initial visibility — show/hide actions flip this at runtime. */
  hidden?: boolean;
  /** True when this element only renders inside a modal overlay. */
  isModal?: boolean;
  actions: PrototypeAction[];
}

export interface PrototypePage {
  id: string;
  name: string;
  /** Optional flow grouping label (e.g. "Registration"). */
  group?: string;
  elements: PrototypeElement[];
  /** Position in the flow view canvas. */
  flowX: number;
  flowY: number;
}

export interface PrototypeVariable {
  name: string;
  value: string;
}

export interface PrototypeDoc {
  name: string;
  pages: PrototypePage[];
  variables: PrototypeVariable[];
  /** Entry page for the player. */
  startPageId: string;
}

export interface BuilderState extends PrototypeDoc {
  currentPageId: string;
  selectedElementId: string | null;
  device: DeviceMode;
  view: BuilderView;
  /** When set, the full-screen prototype player is open. */
  playing: boolean;
}
