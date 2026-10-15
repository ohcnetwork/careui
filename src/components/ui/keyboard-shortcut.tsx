/**
 * @name keyboard-shortcut
 * @description Renders a key combination (for example Meta + K) as a row of keycaps joined by plus signs, with platform symbols for modifier and arrow keys.
 * @dependencies
 * @registryDependencies kbd
 * @type registry:ui
 */
import * as React from "react";

import { cn } from "@/lib/utils";
import { Kbd } from "@/components/ui/kbd";

const KEY_LABELS: Record<string, { long: string; short: string }> = {
  Meta: { long: "⌘", short: "⌘" },
  Shift: { long: "⇧ Shift", short: "⇧" },
  Alt: { long: "⌥ Alt", short: "⌥" },
  Control: { long: "Ctrl", short: "⌃" },
  ArrowUp: { long: "↑", short: "↑" },
  ArrowDown: { long: "↓", short: "↓" },
  ArrowLeft: { long: "←", short: "←" },
  ArrowRight: { long: "→", short: "→" },
  Escape: { long: "Esc", short: "Esc" },
  " ": { long: "Space", short: "Space" },
};

interface KeyboardShortcutProps extends React.ComponentProps<"span"> {
  /** Keys in order, using `KeyboardEvent.key` names, e.g. ["Meta", "K"]. */
  shortcut: string[];
  /** Use compact symbols for modifiers (⇧ instead of ⇧ Shift). */
  short?: boolean;
}

function KeyboardShortcut({
  shortcut,
  short = false,
  className,
  ...props
}: KeyboardShortcutProps) {
  return (
    <span
      data-slot="keyboard-shortcut"
      aria-label={shortcut.join(" + ")}
      className={cn("inline-flex shrink-0 items-center", className)}
      {...props}
    >
      {shortcut.map((key, index) => (
        <React.Fragment key={`${key}-${index}`}>
          <Kbd aria-hidden="true">
            {KEY_LABELS[key]?.[short ? "short" : "long"] ?? key}
          </Kbd>
          {index < shortcut.length - 1 && (
            <span aria-hidden="true" className="text-muted-foreground px-1">
              +
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}

export { KeyboardShortcut };
