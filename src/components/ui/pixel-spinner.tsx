/**
 * @name pixel-spinner
 * @description Dot-matrix spinner with 19 animation presets rendered as a CSS square grid of discrete dots. Zero dependencies — frames computed once at module load.
 * @dependencies class-variance-authority
 * @type registry:ui
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Dot-matrix grid core ─────────────────────────────────────────────────────
//
// All presets use a square N×N boolean grid (default 8×8).
// Each frame is a flat Uint8Array (row-major) of 0/1 values.
// Rendered as a CSS grid of rounded square dots:
//   ON  dot → currentColor  (filled)
//   OFF dot → currentColor at low opacity (dim)

const GRID = 5; // all presets use 5×5

export function makePixelGrid(size = GRID): Uint8Array {
  return new Uint8Array(size * size);
}

/** Set cell (r, c) = 1 in a flat row-major grid of given size. */
function set(g: Uint8Array, r: number, c: number, size = GRID) {
  if (r >= 0 && r < size && c >= 0 && c < size) g[r * size + c] = 1;
}

// ─── Frame generators (evaluated once at module load) ─────────────────────────
// All generators use an 8×8 square grid (GRID=8).
// Each frame is a Uint8Array(64) stored in PIXEL_SPINNERS[name].frames.

// braille: 3-dot arc spinning clockwise around the 8×8 perimeter
function genBraille(): readonly Uint8Array[] {
  const N = GRID;
  const path: [number, number][] = [];
  for (let c = 0; c < N; c++) path.push([0, c]);
  for (let r = 1; r < N; r++) path.push([r, N - 1]);
  for (let c = N - 2; c >= 0; c--) path.push([N - 1, c]);
  for (let r = N - 2; r > 0; r--) path.push([r, 0]);
  const n = path.length;
  return Array.from({ length: n }, (_, i) => {
    const g = makePixelGrid();
    for (let t = 0; t < 3; t++) {
      const [r, c] = path[(i - t + n) % n];
      set(g, r, c);
    }
    return g;
  });
}

// braillewave: diagonal stripe of dots scrolling across 8×8
function genBrailleWave(): readonly Uint8Array[] {
  const N = GRID;
  return Array.from({ length: N }, (_, f) => {
    const g = makePixelGrid();
    for (let r = 0; r < N; r++) set(g, r, (f + r) % N);
    return g;
  });
}

// dna: two interleaved sine waves scrolling left on 8×8
function genDna(): readonly Uint8Array[] {
  const N = GRID;
  return Array.from({ length: 12 }, (_, f) => {
    const g = makePixelGrid();
    for (let c = 0; c < N; c++) {
      const phase = (f - c) * (Math.PI / 3);
      set(g, Math.round(((Math.sin(phase) + 1) / 2) * (N - 1)), c);
      set(g, Math.round(((Math.sin(phase + Math.PI) + 1) / 2) * (N - 1)), c);
    }
    return g;
  });
}

// orbit: two dots spinning 180° apart on 8×8 perimeter
function genOrbit(): readonly Uint8Array[] {
  const N = GRID;
  const path: [number, number][] = [];
  for (let c = 0; c < N; c++) path.push([0, c]);
  for (let r = 1; r < N; r++) path.push([r, N - 1]);
  for (let c = N - 2; c >= 0; c--) path.push([N - 1, c]);
  for (let r = N - 2; r > 0; r--) path.push([r, 0]);
  const n = path.length;
  const half = Math.floor(n / 2);
  return Array.from({ length: n }, (_, i) => {
    const g = makePixelGrid();
    set(g, path[i][0], path[i][1]);
    set(g, path[(i + half) % n][0], path[(i + half) % n][1]);
    return g;
  });
}

// breathe: expanding/contracting filled rectangle on 5×5
// Holds at 1×1 and 5×5 extremes to simulate inhale/exhale pauses.
function genBreathe(): readonly Uint8Array[] {
  const stages: [number, number, number, number][] = [
    [2, 2, 2, 2], // 1×1 center
    [1, 1, 3, 3], // 3×3
    [0, 0, 4, 4], // 5×5 full
  ];
  // hold at each extreme so the breathe pause is perceptible
  const seq = [
    stages[0],
    stages[0], // exhaled — hold
    stages[1], // expanding
    stages[2],
    stages[2], // full inhale — hold
    stages[1], // contracting
    stages[0], // back to exhaled
  ];
  return seq.map(([r1, c1, r2, c2]) => {
    const g = makePixelGrid();
    for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) set(g, r, c);
    return g;
  });
}

// scan: 2-column bright stripe sweeping left→right on 8×8
function genScan(): readonly Uint8Array[] {
  const N = GRID;
  const frames: Uint8Array[] = [];
  for (let pos = -1; pos < N + 1; pos++) {
    const g = makePixelGrid();
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++) if (c === pos || c === pos - 1) set(g, r, c);
    frames.push(g);
  }
  return frames;
}

// rain: staggered raindrops falling down 5×5 columns
function genRain(): readonly Uint8Array[] {
  const N = GRID;
  const period = 7;
  const colOffsets = [0, 3, 1, 4, 2];
  return Array.from({ length: 12 }, (_, f) => {
    const g = makePixelGrid();
    for (let c = 0; c < N; c++) {
      const t = (f + colOffsets[c]) % period;
      if (t < N) {
        set(g, t, c);
        if (t > 0) set(g, t - 1, c);
      }
    }
    return g;
  });
}

// scanline: bright row sweeping top→bottom on 8×8
function genScanLine(): readonly Uint8Array[] {
  const N = GRID;
  const frames: Uint8Array[] = [];
  for (let pos = 0; pos < N; pos++) {
    const g = makePixelGrid();
    for (let c = 0; c < N; c++) {
      set(g, pos, c);
      if (pos > 0 && c % 2 === 0) set(g, pos - 1, c);
    }
    frames.push(g);
  }
  frames.push(makePixelGrid()); // blank
  return frames;
}

// pulse: expanding ring from center on 8×8
function genPulse(): readonly Uint8Array[] {
  const N = GRID;
  const cx = (N - 1) / 2;
  const cy = (N - 1) / 2;
  return [0.5, 1.2, 2.0, 2.8, 3.5].map((rad) => {
    const g = makePixelGrid();
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++) {
        const dist = Math.sqrt((c - cx) ** 2 + (r - cy) ** 2);
        if (Math.abs(dist - rad) < 0.6) set(g, r, c);
      }
    return g;
  });
}

// sparkle: deterministic sparse dots shifting each frame on 5×5
function genSparkle(): readonly Uint8Array[] {
  const patterns: [number, number][][] = [
    [
      [0, 1],
      [1, 3],
      [2, 0],
      [3, 4],
      [4, 2],
    ],
    [
      [0, 3],
      [1, 0],
      [2, 4],
      [3, 2],
      [4, 1],
    ],
    [
      [0, 0],
      [1, 4],
      [2, 2],
      [3, 1],
      [4, 3],
    ],
    [
      [0, 4],
      [1, 2],
      [2, 1],
      [3, 3],
      [4, 0],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 3],
      [3, 0],
      [4, 4],
    ],
    [
      [0, 3],
      [1, 4],
      [2, 0],
      [3, 2],
      [4, 1],
    ],
  ];
  return patterns.map((pts) => {
    const g = makePixelGrid();
    for (const [r, c] of pts) set(g, r, c);
    return g;
  });
}

// cascade: diagonal bright stripe sweeping top-left→bottom-right on 8×8
function genCascade(): readonly Uint8Array[] {
  const N = GRID;
  const frames: Uint8Array[] = [];
  for (let offset = -1; offset < N + N; offset++) {
    const g = makePixelGrid();
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++)
        if (c + r === offset || c + r === offset - 1) set(g, r, c);
    frames.push(g);
  }
  return frames;
}

// columns: 5-bar equalizer with sine-wave heights on 5×5 (1 col per bar)
function genColumns(): readonly Uint8Array[] {
  const N = GRID;
  const phases = [
    0,
    Math.PI * 0.4,
    Math.PI * 0.8,
    Math.PI * 1.2,
    Math.PI * 1.6,
  ];
  return Array.from({ length: 26 }, (_, f) => {
    const g = makePixelGrid();
    for (let col = 0; col < N; col++) {
      const h = Math.max(
        1,
        Math.round(
          ((Math.sin(f * ((2 * Math.PI) / 26) + phases[col]) + 1) / 2) * N
        )
      );
      for (let r = N - h; r < N; r++) set(g, r, col);
    }
    return g;
  });
}

// snake: 8-dot tail traversing 8×8 boustrophedon path
function genSnake(): readonly Uint8Array[] {
  const N = GRID;
  const path: [number, number][] = [];
  for (let r = 0; r < N; r++)
    if (r % 2 === 0) for (let c = 0; c < N; c++) path.push([r, c]);
    else for (let c = N - 1; c >= 0; c--) path.push([r, c]);
  const tailLen = 8;
  return path.map((_, i) => {
    const g = makePixelGrid();
    for (let t = 0; t < tailLen; t++) {
      const [r, c] = path[(i - t + path.length) % path.length];
      set(g, r, c);
    }
    return g;
  });
}

// helix: double sine-wave helix scrolling across 8×8
function genHelix(): readonly Uint8Array[] {
  const N = GRID;
  return Array.from({ length: 16 }, (_, f) => {
    const g = makePixelGrid();
    for (let c = 0; c < N; c++) {
      const phase = (f + c) * (Math.PI / 4);
      set(g, Math.round(((Math.sin(phase) + 1) / 2) * (N - 1)), c);
      set(g, Math.round(((Math.sin(phase + Math.PI) + 1) / 2) * (N - 1)), c);
    }
    return g;
  });
}

// waverows: sine wave of dots traversing rows on 8×8
function genWaveRows(): readonly Uint8Array[] {
  const N = GRID;
  return Array.from({ length: 16 }, (_, f) => {
    const g = makePixelGrid();
    for (let c = 0; c < N; c++) {
      const row = Math.round(
        ((Math.sin((f - c * 0.5) * 0.8) + 1) / 2) * (N - 1)
      );
      set(g, row, c);
      if (row > 0 && (f + c) % 4 === 0) set(g, row - 1, c);
    }
    return g;
  });
}

// checkerboard: alternating checkerboard dots flickering on 8×8
function genCheckerboard(): readonly Uint8Array[] {
  const N = GRID;
  return Array.from({ length: 4 }, (_, f) => {
    const g = makePixelGrid();
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++) if ((r + c + f) % 2 === 0) set(g, r, c);
    return g;
  });
}

// fillsweep: column-by-column fill then clear on 8×8
function genFillSweep(): readonly Uint8Array[] {
  const N = GRID;
  const frames: Uint8Array[] = [];
  for (let i = 0; i <= N; i++) {
    const g = makePixelGrid();
    for (let r = 0; r < N; r++) for (let c = 0; c < i; c++) set(g, r, c);
    frames.push(g);
  }
  const full = makePixelGrid();
  for (let i = 0; i < N * N; i++) full[i] = 1;
  frames.push(full);
  frames.push(makePixelGrid());
  return frames;
}

// diagswipe: diagonal stripe sweeping on 8×8
function genDiagSwipe(): readonly Uint8Array[] {
  const N = GRID;
  return Array.from({ length: 16 }, (_, f) => {
    const g = makePixelGrid();
    const offset = f - 4;
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++) {
        const d = c - r;
        if (d === offset || d === offset + 1) set(g, r, c);
      }
    return g;
  });
}

// heartpulse: cross ↔ heart morphed cell-by-cell, Chebyshev ring order.
//
// Only 6 cells differ between cross and heart. Spread across 3 steps each way
// with ≤4 cells changing per frame — same granularity as cascade. At 80ms
// the 68ms CSS fade overlaps frames, producing a continuous cross-dissolve.
//
// Cross→Heart:
//   Step 1 (d=1 bottom): add (3,1)(3,3)              — lower body fills
//   Step 2 (d=1 top):    add (1,1)(1,3), rm (1,2)    — bumps in, spine out
//   Step 3 (d=2):        rm  (0,2)                   — top arm drops → HEART
//
// Heart→Cross (exact reverse):
//   Step 1 (d=2):        add (0,2)                   — top arm back
//   Step 2 (d=1 top):    add (1,2), rm (1,1)(1,3)    — spine back, bumps out
//   Step 3 (d=1 bottom): rm  (3,1)(3,3)              — lower sides fade → CROSS
function genHeartPulse(): readonly Uint8Array[] {
  const b = (row: number[]) => row;

  const CROSS = [
    ...b([0, 0, 1, 0, 0]),
    ...b([0, 0, 1, 0, 0]),
    ...b([1, 1, 1, 1, 1]),
    ...b([0, 0, 1, 0, 0]),
    ...b([0, 0, 1, 0, 0]),
  ];
  // C1: d=1 bottom in — lower sides (3,1)(3,3) appear
  const C1 = [
    ...b([0, 0, 1, 0, 0]),
    ...b([0, 0, 1, 0, 0]),
    ...b([1, 1, 1, 1, 1]),
    ...b([0, 1, 1, 1, 0]), // ← added
    ...b([0, 0, 1, 0, 0]),
  ];
  // C2: d=1 top — bumps (1,1)(1,3) appear, spine (1,2) fades
  const C2 = [
    ...b([0, 0, 1, 0, 0]),
    ...b([0, 1, 0, 1, 0]), // ← bumps ON, spine OFF
    ...b([1, 1, 1, 1, 1]),
    ...b([0, 1, 1, 1, 0]),
    ...b([0, 0, 1, 0, 0]),
  ];
  // HEART: d=2 — top arm (0,2) drops
  const HEART = [
    ...b([0, 0, 0, 0, 0]), // ← arm gone
    ...b([0, 1, 0, 1, 0]),
    ...b([1, 1, 1, 1, 1]),
    ...b([0, 1, 1, 1, 0]),
    ...b([0, 0, 1, 0, 0]),
  ];
  // H1: d=2 reverse — top arm (0,2) reappears  (= C2 + top arm)
  const H1 = [
    ...b([0, 0, 1, 0, 0]), // ← arm back
    ...b([0, 1, 0, 1, 0]),
    ...b([1, 1, 1, 1, 1]),
    ...b([0, 1, 1, 1, 0]),
    ...b([0, 0, 1, 0, 0]),
  ];
  // H2: d=1 top reverse — spine (1,2) returns, bumps (1,1)(1,3) fade
  const H2 = [
    ...b([0, 0, 1, 0, 0]),
    ...b([0, 0, 1, 0, 0]), // ← spine back, bumps gone
    ...b([1, 1, 1, 1, 1]),
    ...b([0, 1, 1, 1, 0]),
    ...b([0, 0, 1, 0, 0]),
  ];
  // H3 = CROSS: d=1 bottom reverse — lower sides fade

  const seq = [
    CROSS,
    CROSS,
    CROSS, // resting hold
    C1, // lower body fills  (2 cells)
    C2, // bumps in, spine fades  (4 cells)
    HEART, // top arm drops  (1 cell)
    HEART,
    HEART,
    HEART, // hold at heart
    H1, // top arm back  (1 cell)
    H2, // spine returns, bumps fade  (4 cells)
    CROSS, // lower sides fade  (2 cells) → back to cross
    CROSS,
    CROSS, // closing rest
  ];
  return seq.map((bits) => {
    const g = makePixelGrid();
    for (let i = 0; i < GRID * GRID; i++) g[i] = bits[i] as 0 | 1;
    return g;
  });
}

// ─── Preset registry ──────────────────────────────────────────────────────────

export const PIXEL_SPINNERS = {
  braille: { frames: genBraille(), interval: 80 },
  braillewave: { frames: genBrailleWave(), interval: 100 },
  dna: { frames: genDna(), interval: 80 },
  orbit: { frames: genOrbit(), interval: 100 },
  breathe: { frames: genBreathe(), interval: 160 },
  scan: { frames: genScan(), interval: 70 },
  rain: { frames: genRain(), interval: 100 },
  scanline: { frames: genScanLine(), interval: 120 },
  pulse: { frames: genPulse(), interval: 180 },
  sparkle: { frames: genSparkle(), interval: 150 },
  cascade: { frames: genCascade(), interval: 60 },
  columns: { frames: genColumns(), interval: 60 },
  snake: { frames: genSnake(), interval: 80 },
  helix: { frames: genHelix(), interval: 80 },
  waverows: { frames: genWaveRows(), interval: 90 },
  checkerboard: { frames: genCheckerboard(), interval: 250 },
  fillsweep: { frames: genFillSweep(), interval: 100 },
  diagswipe: { frames: genDiagSwipe(), interval: 60 },
  heartpulse: { frames: genHeartPulse(), interval: 80 },
} as const;

export type PixelSpinnerName = keyof typeof PIXEL_SPINNERS;

export const pixelSpinnerVariants = cva("inline-grid select-none", {
  variants: {
    size: {
      "14": "[--size:14px]",
      "19": "[--size:19px]",
      "24": "[--size:24px]",
      "29": "[--size:29px]",
    },
  },
  defaultVariants: { size: "19" },
});

// ─── Component ────────────────────────────────────────────────────────────────

export interface PixelSpinnerProps
  extends
    Omit<React.ComponentPropsWithoutRef<"span">, "children">,
    VariantProps<typeof pixelSpinnerVariants> {
  /** Animation preset. Defaults to "braille". */
  name?: PixelSpinnerName;
}

function PixelSpinner({
  name = "braille",
  size,
  className,
  style,
  ...props
}: PixelSpinnerProps) {
  const spinner = PIXEL_SPINNERS[name];
  // Transition duration is 85 % of the frame interval so each dot is still
  // cross-fading when the next frame fires — frames overlap instead of snap.
  const transitionMs = Math.round(spinner.interval * 0.85);
  const containerRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const dots = Array.from(
      container.querySelectorAll<HTMLElement>("[data-dot]")
    );
    let frame = 0;
    const id = setInterval(() => {
      frame = (frame + 1) % spinner.frames.length;
      const bits = spinner.frames[frame];
      for (let i = 0; i < dots.length; i++) {
        dots[i].style.opacity = bits[i] ? "1" : "0.18";
      }
    }, spinner.interval);
    return () => clearInterval(id);
  }, [name, spinner]);

  const bits = spinner.frames[0];

  return (
    <span
      ref={containerRef}
      data-slot="pixel-spinner"
      role="status"
      aria-label="Loading"
      aria-live="polite"
      className={cn(pixelSpinnerVariants({ size }), className)}
      style={{
        display: "inline-grid",
        width: "var(--size, 16px)",
        height: "var(--size, 16px)",
        gridTemplateColumns: `repeat(${GRID}, 1fr)`,
        gridTemplateRows: `repeat(${GRID}, 1fr)`,
        gap: "1px",
        ...style,
      }}
      {...props}
    >
      {Array.from({ length: GRID * GRID }, (_, i) => (
        <span
          key={i}
          data-dot
          className="rounded-sm bg-current"
          style={{
            opacity: bits[i] ? 1 : 0.18,
            transition: `opacity ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      ))}
      <span className="sr-only">Loading…</span>
    </span>
  );
}

export { PixelSpinner };
