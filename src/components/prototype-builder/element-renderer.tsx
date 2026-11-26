import * as React from "react";

import { catalogById, type RenderContext } from "./catalog";
import type { PrototypeElement, TriggerType } from "./types";

interface ElementViewProps {
  element: PrototypeElement;
  mode: "editor" | "player";
  getVar: (name: string) => string;
  setVar: (name: string, value: string) => void;
  emit?: (
    element: PrototypeElement,
    trigger: TriggerType,
    payload?: string
  ) => void;
}

/**
 * Renders a prototype element with its real Care component. Shared by the
 * design canvas (editor mode) and the live player.
 */
export function ElementView({
  element,
  mode,
  getVar,
  setVar,
  emit,
}: ElementViewProps) {
  const item = catalogById[element.type];
  if (!item) {
    return (
      <div className="border-destructive/40 text-destructive rounded-md border border-dashed p-3 text-xs">
        Unknown component: {element.type}
      </div>
    );
  }

  const ctx: RenderContext = {
    mode,
    element,
    getVar,
    setVar,
    emit: (trigger, payload) => emit?.(element, trigger, payload),
  };

  return <React.Fragment>{item.render(element.props, ctx)}</React.Fragment>;
}
