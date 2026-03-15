/**
 * @name loading-animation-svg
 * @description SVG-based pixel-art Care UI loading animation — identical visuals to loading-animation but with zero React re-renders during the animation loop. All transitions run via the Web Animations API directly on SVG elements.
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
const WAVE_SPAN_MS = 300;       // total time from center cell to outermost cell
const HOLD_MS = 650;
const CELL_DURATION_MS = 550;   // per-cell animation — longer than WAVE_SPAN for overlap

// Colors matching the div-based component
const HEART_FILL = "#f43f5e";  // rose-500
const LOGO_LIGHT = "#059669";  // emerald-600
const LOGO_DARK  = "#047857";  // emerald-700

// Corner radius in SVG units (cell = 1×1); matches rounded-xs at display size
const R = 0.30;

type CornerSpec = { tl?: number; tr?: number; bl?: number; br?: number };

// Same outer-corner positions as the div version (shared by both shapes)
const CORNER_MAP: Record<string, CornerSpec> = {
  "0,2": { tl: R }, "0,3": { tr: R },
  "0,6": { tl: R }, "0,7": { tr: R },
  "2,0": { tl: R }, "3,0": { bl: R },
  "2,9": { tr: R }, "3,9": { br: R },
  "7,4": { bl: R }, "7,5": { br: R },
};

// Build an SVG path string for a 1.01×1.01 cell with per-corner rounding
function cellPath(x: number, y: number, c: CornerSpec = {}): string {
  const w = 1.01, h = 1.01;
  const { tl = 0, tr = 0, br = 0, bl = 0 } = c;
  const p: string[] = [];
  p.push(`M ${x + tl},${y}`);
  p.push(`L ${x + w - tr},${y}`);
  if (tr) p.push(`Q ${x + w},${y} ${x + w},${y + tr}`);
  p.push(`L ${x + w},${y + h - br}`);
  if (br) p.push(`Q ${x + w},${y + h} ${x + w - br},${y + h}`);
  p.push(`L ${x + bl},${y + h}`);
  if (bl) p.push(`Q ${x},${y + h} ${x},${y + h - bl}`);
  p.push(`L ${x},${y + tl}`);
  if (tl) p.push(`Q ${x},${y} ${x + tl},${y}`);
  p.push("Z");
  return p.join(" ");
}

type CellData = {
  row: number;
  col: number;
  idx: number;
  inHeart: boolean;
  inLogo: boolean;
  isLogoLight: boolean;
  d: string; // pre-computed SVG path
};

function buildCellData(): CellData[] {
  const LOGO_LIGHT_KEYS = new Set([
    "0,2","1,2","0,3","1,3","0,6","1,6","0,7","1,7",
    "2,0","2,1","3,0","3,1","2,8","2,9","3,8","3,9",
  ]);
  const raw: CellData[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = `${row},${col}`;
      raw.push({
        row, col,
        idx: row * COLS + col,
        inHeart: HEART_PATTERN[row][col] === 1,
        inLogo:  LOGO_PATTERN[row][col] === 1,
        isLogoLight: LOGO_LIGHT_KEYS.has(key),
        d: cellPath(col, row, CORNER_MAP[key]),
      });
    }
  }
  raw.sort((a, b) => {
    const d = (r: number, c: number) => Math.sqrt((r - 3.5) ** 2 + (c - 4.5) ** 2);
    return d(a.row, a.col) - d(b.row, b.col);
  });
  return raw;
}

const CELL_DATA = buildCellData();

const CELL_BY_IDX: CellData[] = Array(ROWS * COLS);
CELL_DATA.forEach((c) => { CELL_BY_IDX[c.idx] = c; });

// Each cell gets its own delay based on exact radial distance → continuous wave,
// not stepped rings. FWD = center→out (heart), REV = out→center (logo).
const CELL_DELAYS_FWD: number[] = Array(ROWS * COLS).fill(0);
const CELL_DELAYS_REV: number[] = Array(ROWS * COLS).fill(0);
(() => {
  let maxDist = 0;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      maxDist = Math.max(maxDist, Math.sqrt((r - 3.5) ** 2 + (c - 4.5) ** 2));
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const dist = Math.sqrt((r - 3.5) ** 2 + (c - 4.5) ** 2);
      const t = Math.round((dist / maxDist) * WAVE_SPAN_MS);
      const idx = r * COLS + c;
      CELL_DELAYS_FWD[idx] = t;
      CELL_DELAYS_REV[idx] = WAVE_SPAN_MS - t;
    }
  }
})();

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * LoadingAnimationSvg
 *
 * SVG alternative to LoadingAnimation with identical visuals.
 *
 * Performance advantage over the div-based version:
 * - 0 React re-renders during the animation loop (vs ~12 per wave)
 * - All opacity/transform transitions run via the Web Animations API directly
 *   on SVG <rect> elements — no React reconciliation on the main thread
 * - Color changes are `setAttribute` mutations, not className diffs
 * - Heartbeat runs on the GPU compositor via WAAPI
 */
export function LoadingAnimationSvg({ className }: { className?: string }) {
  const beatRef  = React.useRef<SVGGElement>(null);
  const rectRefs = React.useRef<(Element | null)[]>(Array(ROWS * COLS).fill(null));
  const timers      = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const mounted     = React.useRef(true);
  const isFirstShow = React.useRef(true);

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

  const show = React.useCallback(
    (next: "heart" | "logo", onDone?: () => void) => {
      // Heartbeat — compositor-only, no layout/paint
      beatRef.current?.animate(
        [
          { transform: "scale(1)"    },
          { transform: "scale(1.10)" },
          { transform: "scale(1)"    },
          { transform: "scale(1.05)" },
          { transform: "scale(1)"    },
        ],
        { duration: 500, easing: "ease-in-out", fill: "none" },
      );

      // On the very first show there is no previous pattern — all cells start invisible.
      const first = isFirstShow.current;
      if (first) isFirstShow.current = false;

      const nextProp = next === "heart" ? "inHeart" : "inLogo";
      const prevProp = next === "heart" ? "inLogo"  : "inHeart";
      const delays   = next === "logo"  ? CELL_DELAYS_REV : CELL_DELAYS_FWD;

      // Schedule each cell individually — unique delay per cell based on
      // exact radial distance gives a continuous fluid wave, not stepped rings.
      CELL_BY_IDX.forEach((cell) => {
        if (!cell) return;
        const inNext = cell[nextProp as "inHeart" | "inLogo"];
        const inPrev = !first && cell[prevProp as "inHeart" | "inLogo"];
        if (!inNext && !inPrev) return; // not involved — skip entirely

        schedule(() => {
          if (!mounted.current) return;
          const el = rectRefs.current[cell.idx];
          if (!el) return;

          el.getAnimations().forEach((a) => {
            try { a.commitStyles(); } catch { /* SVG elements may not support commitStyles */ }
            a.cancel();
          });

          const nextFill = next === "heart" ? HEART_FILL : (cell.isLogoLight ? LOGO_LIGHT : LOGO_DARK);
          const prevFill = next === "heart" ? (cell.isLogoLight ? LOGO_LIGHT : LOGO_DARK) : HEART_FILL;

          if (inNext && inPrev) {
            // Shared cell: color sweeps through — scale dips slightly so
            // the color swap happens while least visible, then springs back.
            el.animate(
              [
                { fill: prevFill, transform: "scale(1)",    opacity: "1", offset: 0    },
                { fill: nextFill, transform: "scale(0.92)", opacity: "1", offset: 0.35 },
                { fill: nextFill, transform: "scale(1)",    opacity: "1", offset: 1    },
              ],
              { duration: CELL_DURATION_MS, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" },
            );
          } else if (inNext) {
            // New cell: spring pop-in with slight overshoot
            el.animate(
              [
                { fill: nextFill, transform: "scale(0.65)", opacity: "0" },
                { fill: nextFill, transform: "scale(1)",    opacity: "1" },
              ],
              { duration: CELL_DURATION_MS, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "forwards" },
            );
          } else {
            // Leaving cell: snap away cleanly
            el.animate(
              [
                { fill: prevFill, transform: "scale(1)",    opacity: "1" },
                { fill: prevFill, transform: "scale(0.65)", opacity: "0" },
              ],
              { duration: CELL_DURATION_MS * 0.8, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" },
            );
          }
        }, delays[cell.idx]);
      });

      schedule(() => {
        if (!mounted.current) return;
        onDone?.();
      }, WAVE_SPAN_MS + HOLD_MS);
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
    <div data-slot="loading-animation-svg" className={cn("grid place-items-center gap-3", className)}>
      <svg
        viewBox={`0 0 ${COLS} ${ROWS}`}
        className="w-16"
        style={{ aspectRatio: `${COLS}/${ROWS}` }}
        aria-hidden="true"
      >
        {/* beatRef <g> owns the heartbeat — all rects composite as one GPU layer */}
        <g ref={beatRef} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          {Array.from({ length: ROWS * COLS }, (_, idx) => {
            const cell = CELL_BY_IDX[idx];
            return (
              <path
                key={idx}
                ref={(el) => { rectRefs.current[idx] = el; }}
                d={cell.d}
                fill="transparent"
                opacity={0}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            );
          })}
        </g>
      </svg>
      <p className="pl-3 text-center text-xs font-medium uppercase tracking-widest text-gray-500">
        loading
        <span className="animate-blink opacity-0">.</span>
        <span className="animate-[blink_1.5s_0.2s_infinite] opacity-0">.</span>
        <span className="animate-[blink_1.5s_0.4s_infinite] opacity-0">.</span>
      </p>
    </div>
  );
}
