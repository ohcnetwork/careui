/**
 * @name unicode-spinner
 * @description Braille-based Unicode spinner with multiple animation presets. Zero dependencies — frames computed once at module load from the braille dot grid algorithm.
 * @dependencies class-variance-authority
 * @type registry:ui
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Braille grid core ────────────────────────────────────────────────────────
//
// Each braille character is a 2-col × 4-row dot grid.
// Dot bit positions:
//   Row 0 → left: 0x01  right: 0x08
//   Row 1 → left: 0x02  right: 0x10
//   Row 2 → left: 0x04  right: 0x20
//   Row 3 → left: 0x40  right: 0x80
// Base codepoint: U+2800

const DOT = [
  [0x01, 0x08],
  [0x02, 0x10],
  [0x04, 0x20],
  [0x40, 0x80],
] as const;

function makeGrid(rows: number, cols: number): boolean[][] {
  return Array.from({ length: rows }, () => Array<boolean>(cols).fill(false));
}

function gridToBraille(grid: boolean[][]): string {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  let s = "";
  for (let c = 0; c < Math.ceil(cols / 2); c++) {
    let code = 0x2800;
    for (let r = 0; r < 4 && r < rows; r++)
      for (let d = 0; d < 2; d++) if (grid[r]?.[c * 2 + d]) code |= DOT[r][d];
    s += String.fromCodePoint(code);
  }
  return s;
}

// ─── Frame generators (evaluated once at module load) ─────────────────────────

function genBraille() {
  return [
    "⠋",
    "⠙",
    "⠹",
    "⠸",
    "⠼",
    "⠴",
    "⠦",
    "⠧",
    "⠇",
    "⠏",
  ] as readonly string[];
}

function genBrailleWave() {
  return [
    "⠁⠂⠄⡀",
    "⠂⠄⡀⢀",
    "⠄⡀⢀⠠",
    "⡀⢀⠠⠐",
    "⢀⠠⠐⠈",
    "⠠⠐⠈⠁",
    "⠐⠈⠁⠂",
    "⠈⠁⠂⠄",
  ] as readonly string[];
}

function genDna() {
  return [
    "⠋⠉⠙⠚",
    "⠉⠙⠚⠒",
    "⠙⠚⠒⠂",
    "⠚⠒⠂⠂",
    "⠒⠂⠂⠒",
    "⠂⠂⠒⠲",
    "⠂⠒⠲⠴",
    "⠒⠲⠴⠤",
    "⠲⠴⠤⠄",
    "⠴⠤⠄⠋",
    "⠤⠄⠋⠉",
    "⠄⠋⠉⠙",
  ] as readonly string[];
}

function genOrbit(): readonly string[] {
  const H = 4,
    W = 2;
  const path: [number, number][] = [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 0],
    [2, 0],
    [1, 0],
  ];
  return path.map((_, i) => {
    const g = makeGrid(H, W);
    g[path[i][0]][path[i][1]] = true;
    const prev = (i - 1 + path.length) % path.length;
    g[path[prev][0]][path[prev][1]] = true;
    return gridToBraille(g);
  });
}

function genBreathe(): readonly string[] {
  const stages: [number, number][][] = [
    [],
    [[1, 0]],
    [
      [0, 1],
      [2, 0],
    ],
    [
      [0, 0],
      [1, 1],
      [3, 0],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 0],
      [3, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 0],
      [3, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [2, 1],
      [3, 0],
      [3, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
      [3, 0],
      [3, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
      [2, 1],
      [3, 0],
      [3, 1],
    ],
  ];
  const seq = [...stages, ...stages.slice().reverse().slice(1)];
  return seq.map((dots) => {
    const g = makeGrid(4, 2);
    for (const [r, c] of dots) g[r][c] = true;
    return gridToBraille(g);
  });
}

function genScan(): readonly string[] {
  const H = 4,
    W = 8;
  const frames: string[] = [];
  for (let pos = -1; pos < W + 1; pos++) {
    const g = makeGrid(H, W);
    for (let r = 0; r < H; r++)
      for (let c = 0; c < W; c++)
        if (c === pos || c === pos - 1) g[r][c] = true;
    frames.push(gridToBraille(g));
  }
  return frames;
}

function genPulse(): readonly string[] {
  const H = 4,
    W = 6;
  const cx = W / 2 - 0.5,
    cy = H / 2 - 0.5;
  return [0.5, 1.2, 2, 3, 3.5].map((rad) => {
    const g = makeGrid(H, W);
    for (let r = 0; r < H; r++)
      for (let c = 0; c < W; c++)
        if (Math.abs(Math.sqrt((c - cx) ** 2 + (r - cy) ** 2) - rad) < 0.9)
          g[r][c] = true;
    return gridToBraille(g);
  });
}

function genHelix(): readonly string[] {
  const H = 4,
    W = 8;
  return Array.from({ length: 16 }, (_, f) => {
    const g = makeGrid(H, W);
    for (let c = 0; c < W; c++) {
      const phase = (f + c) * (Math.PI / 4);
      g[Math.round(((Math.sin(phase) + 1) / 2) * (H - 1))][c] = true;
      g[Math.round(((Math.sin(phase + Math.PI) + 1) / 2) * (H - 1))][c] = true;
    }
    return gridToBraille(g);
  });
}

function genCascade(): readonly string[] {
  const H = 4,
    W = 8;
  const frames: string[] = [];
  for (let offset = -2; offset < W + H; offset++) {
    const g = makeGrid(H, W);
    for (let r = 0; r < H; r++)
      for (let c = 0; c < W; c++)
        if (c + r === offset || c + r === offset - 1) g[r][c] = true;
    frames.push(gridToBraille(g));
  }
  return frames;
}

function genSnake(): readonly string[] {
  const H = 4,
    W = 4;
  const path: [number, number][] = [];
  for (let r = 0; r < H; r++)
    if (r % 2 === 0) for (let c = 0; c < W; c++) path.push([r, c]);
    else for (let c = W - 1; c >= 0; c--) path.push([r, c]);
  return path.map((_, i) => {
    const g = makeGrid(H, W);
    for (let t = 0; t < 4; t++) {
      const idx = (i - t + path.length) % path.length;
      g[path[idx][0]][path[idx][1]] = true;
    }
    return gridToBraille(g);
  });
}

function genWaveRows(): readonly string[] {
  const H = 4,
    W = 8;
  return Array.from({ length: 16 }, (_, f) => {
    const g = makeGrid(H, W);
    for (let c = 0; c < W; c++) {
      const row = Math.round(
        ((Math.sin((f - c * 0.5) * 0.8) + 1) / 2) * (H - 1)
      );
      g[row][c] = true;
      if (row > 0) g[row - 1][c] = (f + c) % 3 === 0;
    }
    return gridToBraille(g);
  });
}

function genRain(): readonly string[] {
  const H = 4,
    W = 8;
  const period = 6;
  const colOffsets = [0, 2, 4, 1, 3, 5, 2, 4];
  return Array.from({ length: 12 }, (_, f) => {
    const g = makeGrid(H, W);
    for (let c = 0; c < W; c++) {
      const t = (f + colOffsets[c]) % period;
      if (t < H) {
        g[t][c] = true;
        if (t > 0) g[t - 1][c] = true;
      }
    }
    return gridToBraille(g);
  });
}

function genScanLine(): readonly string[] {
  const H = 4,
    W = 8;
  const frames: string[] = [];
  for (let pos = 0; pos < H; pos++) {
    const g = makeGrid(H, W);
    for (let c = 0; c < W; c++) {
      g[pos][c] = true;
      if (pos > 0) g[pos - 1][c] = c % 2 === 0;
    }
    frames.push(gridToBraille(g));
  }
  frames.push(gridToBraille(makeGrid(H, W)));
  frames.push(gridToBraille(makeGrid(H, W)));
  return frames;
}

function genSparkle(): readonly string[] {
  const H = 4,
    W = 8;
  const patterns: [number, number][][] = [
    [
      [0, 1],
      [1, 4],
      [2, 7],
      [3, 2],
    ],
    [
      [0, 5],
      [1, 0],
      [2, 3],
      [3, 6],
    ],
    [
      [0, 3],
      [1, 6],
      [2, 1],
      [3, 4],
    ],
    [
      [0, 7],
      [1, 2],
      [2, 5],
      [3, 0],
    ],
    [
      [0, 0],
      [0, 4],
      [2, 2],
      [2, 6],
    ],
    [
      [1, 1],
      [1, 5],
      [3, 3],
      [3, 7],
    ],
  ];
  return patterns.map((pts) => {
    const g = makeGrid(H, W);
    for (const [r, c] of pts) g[r][c] = true;
    return gridToBraille(g);
  });
}

function genColumns(): readonly string[] {
  const H = 4,
    W = 8;
  const numCols = 4;
  const phases = [0, Math.PI * 0.4, Math.PI * 0.8, Math.PI * 1.3];
  return Array.from({ length: 26 }, (_, f) => {
    const g = makeGrid(H, W);
    for (let col = 0; col < numCols; col++) {
      const h = Math.max(
        1,
        Math.round(
          ((Math.sin(f * ((2 * Math.PI) / 26) + phases[col]) + 1) / 2) * H
        )
      );
      for (let r = H - h; r < H; r++) {
        g[r][col * 2] = true;
        g[r][col * 2 + 1] = true;
      }
    }
    return gridToBraille(g);
  });
}

function genCheckerboard(): readonly string[] {
  const H = 4,
    W = 8;
  return Array.from({ length: 4 }, (_, f) => {
    const g = makeGrid(H, W);
    for (let r = 0; r < H; r++)
      for (let c = 0; c < W; c++) if ((r + c + f) % 2 === 0) g[r][c] = true;
    return gridToBraille(g);
  });
}

function genFillSweep(): readonly string[] {
  const H = 4,
    W = 8;
  const frames: string[] = [];
  for (let i = 0; i <= W; i++) {
    const g = makeGrid(H, W);
    for (let r = 0; r < H; r++) for (let c = 0; c < i; c++) g[r][c] = true;
    frames.push(gridToBraille(g));
  }
  const full = makeGrid(H, W);
  for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) full[r][c] = true;
  frames.push(gridToBraille(full));
  frames.push(gridToBraille(makeGrid(H, W)));
  return frames;
}

function genDiagSwipe(): readonly string[] {
  const H = 4,
    W = 8;
  return Array.from({ length: 16 }, (_, f) => {
    const g = makeGrid(H, W);
    const offset = f - 5;
    for (let r = 0; r < H; r++)
      for (let c = 0; c < W; c++) {
        const d = c - r;
        if (d === offset || d === offset + 1) g[r][c] = true;
      }
    return gridToBraille(g);
  });
}

function genHeartBeat(): readonly string[] {
  const H = 4,
    W = 8;

  const b = (r: number[]) => r.map(Boolean);
  const CROSS = [
    ...b([0, 0, 1, 1, 1, 1, 0, 0]),
    ...b([1, 1, 1, 1, 1, 1, 1, 1]),
    ...b([1, 1, 1, 1, 1, 1, 1, 1]),
    ...b([0, 0, 1, 1, 1, 1, 0, 0]),
  ];
  const MORPH1 = [
    ...b([0, 1, 1, 0, 0, 1, 1, 0]),
    ...b([1, 1, 1, 1, 1, 1, 1, 1]),
    ...b([1, 1, 1, 1, 1, 1, 1, 1]),
    ...b([0, 0, 1, 1, 1, 1, 0, 0]),
  ];
  const MORPH2 = [
    ...b([0, 1, 1, 0, 0, 1, 1, 0]),
    ...b([1, 1, 1, 1, 1, 1, 1, 1]),
    ...b([0, 1, 1, 1, 1, 1, 1, 0]),
    ...b([0, 0, 1, 1, 1, 1, 0, 0]),
  ];
  const HEART = [
    ...b([0, 1, 1, 0, 0, 1, 1, 0]),
    ...b([1, 1, 1, 1, 1, 1, 1, 1]),
    ...b([0, 1, 1, 1, 1, 1, 1, 0]),
    ...b([0, 0, 0, 1, 1, 0, 0, 0]),
  ];
  const SMALL = [
    ...b([0, 0, 1, 0, 0, 1, 0, 0]),
    ...b([0, 1, 1, 1, 1, 1, 1, 0]),
    ...b([0, 0, 1, 1, 1, 1, 0, 0]),
    ...b([0, 0, 0, 1, 1, 0, 0, 0]),
  ];

  // cross (hold) → morph → heart → lub-dub × 2 → morph → cross
  const seq = [
    CROSS,
    CROSS,
    CROSS,
    MORPH1,
    MORPH2,
    HEART,
    SMALL,
    HEART,
    HEART,
    SMALL,
    HEART,
    MORPH2,
    MORPH1,
    CROSS,
  ];
  return seq.map((bits) => {
    const g = makeGrid(H, W);
    for (let r = 0; r < H; r++)
      for (let c = 0; c < W; c++) g[r][c] = bits[r * W + c];
    return gridToBraille(g);
  });
}

// ─── Preset registry ──────────────────────────────────────────────────────────

export const SPINNERS = {
  braille: { frames: genBraille(), interval: 80 },
  braillewave: { frames: genBrailleWave(), interval: 100 },
  dna: { frames: genDna(), interval: 80 },
  orbit: { frames: genOrbit(), interval: 100 },
  breathe: { frames: genBreathe(), interval: 100 },
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
  heartbeat: { frames: genHeartBeat(), interval: 150 },
} as const;

export type SpinnerName = keyof typeof SPINNERS;

// ─── CVA variants ─────────────────────────────────────────────────────────────

export const spinnerVariants = cva(
  "inline-block select-none font-mono leading-none",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
      },
    },
    defaultVariants: { size: "sm" },
  }
);

// ─── Component ────────────────────────────────────────────────────────────────

export interface SpinnerProps
  extends
    React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof spinnerVariants> {
  /** Animation preset. Defaults to "braille". */
  name?: SpinnerName;
}

function Spinner({
  name = "braille",
  size,
  className,
  ...props
}: SpinnerProps) {
  const spinner = SPINNERS[name];
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = setInterval(
      () => setFrame((f) => (f + 1) % spinner.frames.length),
      spinner.interval
    );
    return () => clearInterval(id);
  }, [name, spinner.frames.length, spinner.interval]);

  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      aria-live="polite"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      {spinner.frames[frame]}
      <span className="sr-only">Loading…</span>
    </span>
  );
}

export { Spinner, gridToBraille, makeGrid };
