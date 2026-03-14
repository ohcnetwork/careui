/**
 * @name loading-animation
 * @description A pixel-art Care UI logo loading animation that alternates between a red heart and a green logo shape using radial wave ripple transitions.
 * @dependencies class-variance-authority
 * @type registry:ui
 */
import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Static cell data ─────────────────────────────────────────────────────────

const HEART_PATTERN = [
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
] as const;

const LOGO_PATTERN = [
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
] as const;

const ROWS = 8;
const COLS = 10;
// Wave timing constants (ms)
const WAVE_STEP_MS  = 40;   // delay between each concentric ring on pop-in
const FADE_STEP_MS  = 22;   // delay between each ring on collapse
const HOLD_MS       = 900;  // time to hold pattern after pulse
const PULSE_MS      = 600;  // must match --animate-cell-pulse duration in CSS

type CellData = {
  row: number;
  col: number;
  inHeart: boolean;
  inLogo: boolean;
  isLogoLight: boolean;
  shapeClasses: string;
};

function buildCellData(): CellData[] {
  const HEART_SHAPE: Record<string, string> = {
    "0,2": "rounded-tl-xs", "0,3": "rounded-tr-xs",
    "0,6": "rounded-tl-xs", "0,7": "rounded-tr-xs",
    "2,0": "rounded-tl-xs", "3,0": "rounded-bl-xs",
    "2,9": "rounded-tr-xs", "3,9": "rounded-br-xs",
    "7,4": "rounded-bl-xs", "7,5": "rounded-br-xs",
  };
  const LOGO_SHAPE: Record<string, string> = {
    "0,2": "rounded-tl-xs", "0,3": "rounded-tr-xs",
    "0,6": "rounded-tl-xs", "0,7": "rounded-tr-xs",
    "2,0": "rounded-tl-xs", "3,0": "rounded-bl-xs",
    "2,9": "rounded-tr-xs", "3,9": "rounded-br-xs",
    "7,4": "rounded-bl-xs", "7,5": "rounded-br-xs",
  };
  const LOGO_LIGHT_KEYS = new Set([
    "0,2","1,2","0,3","1,3","0,6","1,6","0,7","1,7",
    "2,0","2,1","3,0","3,1","2,8","2,9","3,8","3,9",
  ]);

  const raw: CellData[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = `${row},${col}`;
      const inHeart = HEART_PATTERN[row][col] === 1;
      const inLogo  = LOGO_PATTERN[row][col] === 1;
      const shapeClasses = (inHeart ? HEART_SHAPE[key] : inLogo ? LOGO_SHAPE[key] : "") ?? "";
      raw.push({ row, col, inHeart, inLogo, isLogoLight: LOGO_LIGHT_KEYS.has(key), shapeClasses });
    }
  }
  raw.sort((a, b) => {
    const d = (r: number, c: number) => Math.sqrt((r - 3.5) ** 2 + (c - 4.5) ** 2);
    return d(a.row, a.col) - d(b.row, b.col);
  });
  return raw;
}

const CELL_DATA = buildCellData();

// O(1) lookup by flat index
const CELL_BY_IDX: CellData[] = Array(ROWS * COLS);
CELL_DATA.forEach((c) => { CELL_BY_IDX[c.row * COLS + c.col] = c; });

// Pop-in groups: center → out
const WAVE_GROUPS: { indices: number[]; delay: number }[] = (() => {
  const map = new Map<number, number[]>();
  CELL_DATA.forEach((c) => {
    const key = Math.round(Math.sqrt((c.row - 3.5) ** 2 + (c.col - 4.5) ** 2) * 2);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(c.row * COLS + c.col);
  });
  return [...map.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, indices], i) => ({ indices, delay: i * WAVE_STEP_MS }));
})();

// Fade-out groups: outer → center
const WAVE_GROUPS_REV: { indices: number[]; delay: number }[] =
  [...WAVE_GROUPS].reverse().map(({ indices }, i) => ({ indices, delay: i * FADE_STEP_MS }));

const POP_IN_DURATION   = (WAVE_GROUPS.length    - 1) * WAVE_STEP_MS;
const FADE_OUT_DURATION = (WAVE_GROUPS_REV.length - 1) * FADE_STEP_MS;

// ─── Component ────────────────────────────────────────────────────────────────

type CellState = "idle" | "heart" | "logo";

/**
 * LoadingAnimation
 *
 * Pixel-art Care UI loading animation. The heart shape pops in from the center
 * on mount, then cycles between the heart (red) and the Care UI logo (green)
 * using a radial wave collapse → expand transition.
 *
 * Requires the following CSS keyframes in your global stylesheet:
 * ```css
 * @keyframes cell-pulse {
 *   0%   { transform: scale(1);   }
 *   38%  { transform: scale(1.1); }
 *   100% { transform: scale(1);   }
 * }
 * ```
 * And the Tailwind v4 utility:
 * ```css
 * --animate-cell-pulse: cell-pulse 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
 * ```
 */
export function LoadingAnimation({ className }: { className?: string }) {
  const [states, setStates] = React.useState<CellState[]>(() => Array(ROWS * COLS).fill("idle"));
  const [pulseSet, setPulseSet] = React.useState<ReadonlySet<number>>(new Set());
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const mounted = React.useRef(true);

  const schedule = React.useCallback((fn: () => void, delay: number) => {
    timers.current.push(setTimeout(fn, delay));
  }, []);

  const clearAllTimers = React.useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const triggerPulse = React.useCallback(
    (pattern: "heart" | "logo", onDone?: () => void) => {
      const prop = (pattern === "heart" ? "inHeart" : "inLogo") as "inHeart" | "inLogo";
      setPulseSet(new Set(CELL_DATA.filter((c) => c[prop]).map((c) => c.row * COLS + c.col)));
      schedule(() => {
        if (!mounted.current) return;
        setPulseSet(new Set());
        onDone?.();
      }, PULSE_MS);
    },
    [schedule],
  );

  // Pop next pattern in from center → out (first appear)
  const popIn = React.useCallback(
    (next: "heart" | "logo", onDone?: () => void) => {
      const nextProp = (next === "heart" ? "inHeart" : "inLogo") as "inHeart" | "inLogo";
      WAVE_GROUPS.forEach(({ indices, delay }) => {
        schedule(() => {
          if (!mounted.current) return;
          setStates((prev) => {
            const copy = [...prev];
            indices.forEach((idx) => { copy[idx] = CELL_BY_IDX[idx][nextProp] ? next : "idle"; });
            return copy;
          });
        }, delay);
      });
      schedule(() => {
        if (!mounted.current) return;
        triggerPulse(next, () => { schedule(() => onDone?.(), HOLD_MS); });
      }, POP_IN_DURATION + 60);
    },
    [schedule, triggerPulse],
  );

  // Full transition: collapse outer → center, then pop next center → out
  const transition = React.useCallback(
    (next: "heart" | "logo", onDone?: () => void) => {
      const nextProp = (next === "heart" ? "inHeart" : "inLogo") as "inHeart" | "inLogo";

      WAVE_GROUPS_REV.forEach(({ indices, delay }) => {
        schedule(() => {
          if (!mounted.current) return;
          setStates((prev) => {
            const copy = [...prev];
            indices.forEach((idx) => { copy[idx] = "idle"; });
            return copy;
          });
        }, delay);
      });

      const startPop = FADE_OUT_DURATION + 260;
      WAVE_GROUPS.forEach(({ indices, delay }) => {
        schedule(() => {
          if (!mounted.current) return;
          setStates((prev) => {
            const copy = [...prev];
            indices.forEach((idx) => { copy[idx] = CELL_BY_IDX[idx][nextProp] ? next : "idle"; });
            return copy;
          });
        }, startPop + delay);
      });

      schedule(() => {
        if (!mounted.current) return;
        triggerPulse(next, () => { schedule(() => onDone?.(), HOLD_MS); });
      }, startPop + POP_IN_DURATION + 60);
    },
    [schedule, triggerPulse],
  );

  React.useEffect(() => {
    mounted.current = true;
    popIn("heart", () => {
      if (!mounted.current) return;
      function cycle() {
        transition("logo", () => {
          if (!mounted.current) return;
          transition("heart", () => {
            if (!mounted.current) return;
            cycle();
          });
        });
      }
      cycle();
    });
    return () => {
      mounted.current = false;
      clearAllTimers();
    };
  }, [popIn, transition, clearAllTimers]);

  return (
    <div data-slot="loading-animation" className={cn("grid place-items-center gap-3", className)}>
      <div
        className="grid w-16"
        style={{
          aspectRatio: "5/4",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gap: 0,
        }}
      >
        {Array.from({ length: ROWS * COLS }, (_, flatIdx) => {
          const cell = CELL_BY_IDX[flatIdx];
          const state = states[flatIdx];
          const isPulsing = pulseSet.has(flatIdx);
          return (
            <div
              key={flatIdx}
              className={cn(
                isPulsing
                  ? "animate-cell-pulse [transition:opacity_250ms_ease-out,background-color_350ms_ease-in-out]"
                  : "[transition:opacity_250ms_ease-out,transform_250ms_ease-out,background-color_350ms_ease-in-out]",
                state === "idle" ? "opacity-0 scale-[0.6]" : "opacity-100 scale-100",
                state === "heart" ? "bg-rose-500"
                  : state === "logo"
                    ? cell.isLogoLight ? "bg-emerald-600" : "bg-emerald-700"
                    : "",
                cell.shapeClasses,
              )}
            />
          );
        })}
      </div>
      <p className="pl-6 text-center text-xs font-medium uppercase tracking-widest text-gray-500">
        loading
        <span className="animate-blink opacity-0">.</span>
        <span className="animate-[blink_1.5s_0.2s_infinite] opacity-0">.</span>
        <span className="animate-[blink_1.5s_0.4s_infinite] opacity-0">.</span>
      </p>
    </div>
  );
}
