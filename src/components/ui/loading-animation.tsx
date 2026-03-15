/**
 * @name loading-animation
 * @description A pixel-art Care UI logo loading animation that alternates between a red heart and a green logo shape using radial wave ripple transitions.
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
const WAVE_STEP_MS  = 40;   // delay between each concentric ring
const HOLD_MS       = 650;  // time to hold pattern before next transition

type CellData = {
  row: number;
  col: number;
  inHeart: boolean;
  inLogo: boolean;
  isLogoLight: boolean;
  shapeClasses: string;
};

function buildCellData(): CellData[] {
  // Both shapes share the same corner-rounding positions.
  const CORNER_SHAPE: Record<string, string> = {
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
      const shapeClasses = (inHeart || inLogo) ? (CORNER_SHAPE[key] ?? "") : "";
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

// Pop-in groups: center → out (used for both appear and collapse)
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

const POP_IN_DURATION = (WAVE_GROUPS.length - 1) * WAVE_STEP_MS;

// ─── Component ────────────────────────────────────────────────────────────────

type CellState = "idle" | "heart" | "logo";

/**
 * LoadingAnimation
 *
 * Pixel-art Care UI loading animation. The heart shape pops in from the center
 * on mount, then cycles between the heart (red) and the Care UI logo (green)
 * using a radial wave collapse → expand transition.
 */
export function LoadingAnimation({ className }: { className?: string }) {
  const [states, setStates] = React.useState<CellState[]>(() => Array(ROWS * COLS).fill("idle"));
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const mounted = React.useRef(true);
  const beatRef = React.useRef<HTMLDivElement>(null);

  const schedule = React.useCallback((fn: () => void, delay: number) => {
    const id: ReturnType<typeof setTimeout> = setTimeout(() => {
      timers.current = timers.current.filter((t) => t !== id);
      fn();
    }, delay);
    timers.current.push(id);
  }, []);

  const clearAllTimers = React.useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  // Animate center→out: sweeps each ring converting cells to the new pattern.
  // - Cells in next pattern:       appear / crossfade to new color
  // - Cells not in next pattern:   fade to idle
  // Works identically for first-appear (from empty) and transitions.
  const show = React.useCallback(
    (next: "heart" | "logo", onDone?: () => void) => {
      // Fire the lub-dub via Web Animations API — no @keyframes needed,
      // fires reliably on every call regardless of CSS tree-shaking.
      beatRef.current?.animate(
        [
          { transform: "scale(1)"    },
          { transform: "scale(1.06)" }, // lub — center cells arriving
          { transform: "scale(1)"    },
          { transform: "scale(1.03)" }, // dub — outer ring completing
          { transform: "scale(1)"    },
        ],
        { duration: 500, easing: "ease-in-out", fill: "none" },
      );

      const nextProp = (next === "heart" ? "inHeart" : "inLogo") as "inHeart" | "inLogo";
      const groups = next === "logo" ? [...WAVE_GROUPS].reverse() : WAVE_GROUPS;
      groups.forEach(({ indices }, i) => {
        const delay = i * WAVE_STEP_MS;
        schedule(() => {
          if (!mounted.current) return;
          setStates((prev) => {
            const copy = [...prev];
            indices.forEach((idx) => {
              copy[idx] = CELL_BY_IDX[idx][nextProp] ? next : "idle";
            });
            return copy;
          });
        }, delay);
      });
      schedule(() => {
        if (!mounted.current) return;
        onDone?.();
      }, POP_IN_DURATION + HOLD_MS + (next === "logo" ? WAVE_STEP_MS : 0));
    },
    [schedule],
  );

  React.useEffect(() => {
    mounted.current = true;
    show("heart", () => {
      if (!mounted.current) return;
      function cycle() {
        show("logo", () => {
          if (!mounted.current) return;
          show("heart", () => {
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
  }, [show, clearAllTimers]);

  return (
    <div data-slot="loading-animation" className={cn("grid place-items-center gap-3", className)}>
      {/* Outer wrapper owns the heartbeat — scales the whole shape as one GPU layer,
          preventing sub-pixel gaps between individual cells during the animation. */}
      <div ref={beatRef} className="will-change-transform">
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
          return (
            <div
              key={flatIdx}
              className={cn(
                "[transition:opacity_500ms_ease-in-out,transform_500ms_ease-in-out,background-color_500ms_ease-in-out]",
                state === "idle" ? "opacity-0 scale-[0.65]" : "opacity-100 scale-100",
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
      </div>
      <p className="pl-3 text-center text-xs font-medium uppercase tracking-widest text-gray-500">
        loading
        <span className="animate-blink opacity-0">.</span>
        <span className="animate-[blink_1.5s_0.2s_infinite] opacity-0">.</span>
        <span className="animate-[blink_1.5s_0.4s_infinite] opacity-0">.</span>
      </p>
    </div>
  );
}
