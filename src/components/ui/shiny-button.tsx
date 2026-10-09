/**
 * @name shiny-button
 * @description An animated call-to-action button with a rotating conic-gradient border, a dotted sparkle layer and a soft liquid glow. Themed through CSS variables, and the animation is disabled for users who prefer reduced motion.
 * @dependencies
 * @type registry:ui
 */
import * as React from "react";

import { cn } from "@/lib/utils";

// Styles ship with the component: React 19 hoists a <style href precedence>
// into <head> once and de-duplicates it, so nothing needs adding to the
// consumer's global stylesheet.
const SHINY_BUTTON_CSS = `
@property --shiny-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
@property --shiny-angle-offset { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
@property --shiny-percent { syntax: "<percentage>"; initial-value: 12%; inherits: false; }
@property --shiny-shine { syntax: "<color>"; initial-value: white; inherits: false; }
[data-slot="shiny-button"] {
  --shiny-bg: var(--foreground);
  --shiny-fg: var(--background);
  --shiny-highlight: var(--primary);
  --shiny-highlight-subtle: color-mix(in oklch, var(--primary) 45%, white);
  --shiny-percent: 12%;
  --shiny-duration: 3s;
  --shiny-ease: 800ms cubic-bezier(0.25, 1, 0.5, 1);
  isolation: isolate;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  color: var(--shiny-fg);
  background:
    linear-gradient(var(--shiny-bg), var(--shiny-bg)) padding-box,
    conic-gradient(
      from calc(var(--shiny-angle) - var(--shiny-angle-offset)),
      transparent,
      var(--shiny-highlight) var(--shiny-percent),
      var(--shiny-shine) calc(var(--shiny-percent) * 2),
      var(--shiny-highlight) calc(var(--shiny-percent) * 3),
      transparent calc(var(--shiny-percent) * 4)
    ) border-box;
  box-shadow: 0 0 20px -3px var(--shiny-highlight);
  transition: var(--shiny-ease);
  transition-property: --shiny-angle-offset, --shiny-percent, --shiny-shine;
  animation: shiny-angle linear infinite var(--shiny-duration);
  animation-play-state: paused;
}
[data-slot="shiny-button"]:active { translate: 0 1px; }
[data-slot="shiny-button"]:is(:hover, :focus-visible) {
  --shiny-percent: 20%;
  --shiny-angle-offset: 95deg;
  --shiny-shine: var(--shiny-highlight-subtle);
  animation-play-state: running;
}
[data-slot="shiny-button"]:disabled { opacity: 0.5; box-shadow: none; animation: none; }
[data-slot="shiny-button-glow"] {
  position: absolute; inset: 2px; z-index: 0; pointer-events: none;
  border-radius: inherit; mix-blend-mode: screen; opacity: 0.8;
  filter: blur(9px) saturate(1.4);
  background:
    radial-gradient(38% 60% at 28% 32%, color-mix(in oklch, var(--shiny-highlight) 70%, black), transparent 70%),
    radial-gradient(46% 52% at 72% 62%, var(--shiny-highlight), transparent 72%),
    radial-gradient(42% 56% at 52% 82%, color-mix(in oklch, var(--shiny-highlight) 60%, blue), transparent 72%);
  animation: shiny-liquid 8s ease-in-out infinite;
}
[data-slot="shiny-button-content"] { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 0.5rem; }
@keyframes shiny-angle { to { --shiny-angle: 360deg; } }
@keyframes shiny-liquid {
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1.05); }
  33% { transform: translate(7%, -5%) rotate(45deg) scale(1.15); }
  66% { transform: translate(-6%, 6%) rotate(-35deg) scale(1.08); }
}
@media (prefers-reduced-motion: reduce) {
  [data-slot="shiny-button"], [data-slot="shiny-button-glow"] { animation: none; }
}
:root[data-reduced-motion="true"] [data-slot="shiny-button"],
:root[data-reduced-motion="true"] [data-slot="shiny-button-glow"] { animation: none; }
`;

function ShinyButton({
  className,
  children,
  type = "button",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <>
      <style href="care-ui-shiny-button" precedence="default">
        {SHINY_BUTTON_CSS}
      </style>
      <button
        data-slot="shiny-button"
        type={type}
        className={cn(
          "focus-visible:outline-ring cursor-pointer rounded-full px-5 py-2.5 text-sm leading-tight font-medium outline-offset-4 focus-visible:outline-2 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        <span data-slot="shiny-button-glow" aria-hidden="true" />
        <span data-slot="shiny-button-content">{children}</span>
      </button>
    </>
  );
}

export { ShinyButton };
