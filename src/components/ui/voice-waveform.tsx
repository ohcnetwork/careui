/**
 * @name voice-waveform
 * @description An animated equalizer that signals active listening or recording. Runs as a CSS-only loop, or follows live audio when you pass `levels`.
 * @dependencies
 * @type registry:ui
 */
import * as React from "react";

import { cn } from "@/lib/utils";

const VOICE_WAVEFORM_CSS = `
@keyframes voice-waveform-bar {
  0%, 100% { transform: scaleY(0.35); }
  50% { transform: scaleY(1); }
}
[data-slot="voice-waveform-bar"] {
  transform-origin: bottom;
  animation: voice-waveform-bar 0.9s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  [data-slot="voice-waveform-bar"] { animation: none; transform: scaleY(0.7); }
}
:root[data-reduced-motion="true"] [data-slot="voice-waveform-bar"] { animation: none; transform: scaleY(0.7); }
`;

const BAR_HEIGHTS = [10, 16, 22, 14, 24, 12, 20, 16, 10];

interface VoiceWaveformProps extends React.ComponentProps<"div"> {
  /** Number of bars to render. */
  bars?: number;
  /** Optional live levels (0–1), one per bar. When set, bars follow them instead of looping. */
  levels?: number[];
}

function VoiceWaveform({
  bars = 9,
  levels,
  className,
  ...props
}: VoiceWaveformProps) {
  return (
    <div
      data-slot="voice-waveform"
      aria-hidden="true"
      className={cn("text-destructive flex h-6 items-end gap-[3px]", className)}
      {...props}
    >
      <style href="care-ui-voice-waveform" precedence="default">
        {VOICE_WAVEFORM_CSS}
      </style>
      {Array.from({ length: bars }).map((_, i) => {
        const base = BAR_HEIGHTS[i % BAR_HEIGHTS.length];
        const level = levels?.[i];
        return (
          <span
            key={i}
            data-slot="voice-waveform-bar"
            className="w-[3px] rounded-full bg-current"
            style={
              level === undefined
                ? {
                    height: `${base}px`,
                    animationDelay: `${(i % BAR_HEIGHTS.length) * 0.09}s`,
                  }
                : {
                    height: `${Math.max(3, Math.min(1, level) * 24)}px`,
                    animation: "none",
                    transform: "none",
                    transition: "height 80ms linear",
                  }
            }
          />
        );
      })}
    </div>
  );
}

export { VoiceWaveform };
