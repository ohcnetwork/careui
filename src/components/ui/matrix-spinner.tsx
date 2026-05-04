/**
 * @name matrix-spinner
 * @description SVG diamond-lattice matrix spinner: 25 diamonds arranged as a 4×4 base grid interleaved with a 3×3 offset grid. Ships 55 named animation presets covering every UI state — loading, success, error, idle, transition — each driven by a frame array with per-dot opacity values. Zero runtime dependencies.
 * @type registry:ui
 */

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Grid geometry ────────────────────────────────────────────────────────────
//
// 25 dots total:
//   Base grid   4×4  → indices  0-15   B[r][c] = r*4+c
//   Offset grid 3×3  → indices 16-24   O[r][c] = 16+r*3+c
//
// Visual layout (B=base, O=offset):
//   B00 B01 B02 B03        row 0
//      O00 O01 O02         row 0.5
//   B10 B11 B12 B13        row 1
//      O10 O11 O12         row 1.5
//   B20 B21 B22 B23        row 2
//      O20 O21 O22         row 2.5
//   B30 B31 B32 B33        row 3
//
// Spatial helpers (dot indices)
//   corners:        [0, 3, 12, 15, 16, 18, 22, 24]
//   edges:          [1,2, 4,8, 7,11, 13,14, 17, 19,21,23]
//   inner base:     [5,6,9,10]
//   centre offset:  [20]  (O[1][1])
//   full ring r=1:  offset row0+1 = [16,17,18, 19,21, 22,23,24]  — used as "ring"
//
// Opacity levels used across all presets
//   HI  = 1.0   bright / active
//   MID = 0.55  secondary / tail
//   DIM = 0.18  resting grid (always visible)
//   OFF = 0.06  near-invisible (used sparingly)

const SIZE   = 4
const GAP    = 9.66
const OFFSET = GAP / 2   // 4.83
const SVG_W  = 37
const SVG_H  = 38
const DOTS   = 25

const HI  = 1.0
const MID = 0.55
const DIM = 0.18
const OFF = 0.06

// ─── Frame builder helpers ────────────────────────────────────────────────────

/** Return a flat 25-element array filled with `val`. */
function fill(val: number): number[] {
  return Array(DOTS).fill(val)
}

/** Clone array and set listed indices to val. */
function set(base: number[], indices: number[], val: number): number[] {
  const a = [...base]
  for (const i of indices) a[i] = val
  return a
}

/** Clone array and set multiple [indices, val] pairs. */
function sets(base: number[], ...patches: [number[], number][]): number[] {
  let a = [...base]
  for (const [idxs, val] of patches) a = set(a, idxs, val)
  return a
}

// Spatial index groups
const BCORNER  = [0, 3, 12, 15]
const OCORNER  = [16, 18, 22, 24]
const CORNERS  = [...BCORNER, ...OCORNER]
const BEDGE    = [1, 2, 4, 8, 7, 11, 13, 14]
const OEDGE    = [17, 19, 21, 23]
const EDGES    = [...BEDGE, ...OEDGE]
const INNER    = [5, 6, 9, 10]           // inner 2×2 base block
const OCENTER  = [20]                    // O[1][1]
const CENTER   = [...INNER, ...OCENTER]

// Column groups (visual left→right — 7 cols)
// base cols: 0,2,4,6  |  offset cols: 1,3,5
// col 0 = B[*][0] = [0,4,8,12]
// col 1 = O[*][0] = [16,19,22]
// col 2 = B[*][1] = [1,5,9,13]
// col 3 = O[*][1] = [17,20,23]
// col 4 = B[*][2] = [2,6,10,14]
// col 5 = O[*][2] = [18,21,24]
// col 6 = B[*][3] = [3,7,11,15]
const VCOLS: number[][] = [
  [0,4,8,12],   // col 0
  [16,19,22],   // col 1
  [1,5,9,13],   // col 2
  [17,20,23],   // col 3
  [2,6,10,14],  // col 4
  [18,21,24],   // col 5
  [3,7,11,15],  // col 6
]

// Row groups (visual top→bottom — 7 rows)
// row 0 = B[0][*] = [0,1,2,3]
// row 1 = O[0][*] = [16,17,18]
// row 2 = B[1][*] = [4,5,6,7]
// row 3 = O[1][*] = [19,20,21]
// row 4 = B[2][*] = [8,9,10,11]
// row 5 = O[2][*] = [22,23,24]
// row 6 = B[3][*] = [12,13,14,15]
const VROWS: number[][] = [
  [0,1,2,3],    // row 0
  [16,17,18],   // row 1
  [4,5,6,7],    // row 2
  [19,20,21],   // row 3
  [8,9,10,11],  // row 4
  [22,23,24],   // row 5
  [12,13,14,15],// row 6
]

// Diagonal groups (top-left → bottom-right, sum = col+row visual index)
// diag d = dots where visualCol + visualRow === d  (d = 0..12)
function buildDiags(): number[][] {
  const d: number[][] = Array.from({ length: 13 }, () => [])
  // base: visual col = col*2, visual row = row*2
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) d[(c*2)+(r*2)].push(r*4+c)
  // offset: visual col = col*2+1, visual row = row*2+1
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) d[(c*2+1)+(r*2+1)].push(16+r*3+c)
  return d
}
const DIAGS = buildDiags()

// Anti-diagonal groups (top-right → bottom-left)
function buildAntiDiags(): number[][] {
  const d: number[][] = Array.from({ length: 13 }, () => [])
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) d[((3-c)*2)+(r*2)].push(r*4+c)
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) d[((2-c)*2+1)+(r*2+1)].push(16+r*3+c)
  return d
}
const ANTIDIAGS = buildAntiDiags()

// Manhattan distance from visual centre (3, 3) for all 25 dots
// base: vcol = col*2, vrow = row*2   → |vcol-3| + |vrow-3|
// offset: vcol = col*2+1, vrow = row*2+1 → |vcol-3| + |vrow-3|
const DIST_FROM_CENTER: number[] = []
for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++)
  DIST_FROM_CENTER.push(Math.abs(c*2-3) + Math.abs(r*2-3))
for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++)
  DIST_FROM_CENTER.push(Math.abs(c*2+1-3) + Math.abs(r*2+1-3))

// Group dots by their distance from centre (rings 0..6)
const RINGS: number[][] = Array.from({ length: 7 }, () => [])
for (let i = 0; i < DOTS; i++) RINGS[DIST_FROM_CENTER[i]].push(i)

// ─── Preset frame generators ──────────────────────────────────────────────────
// Each function returns readonly number[][] — array of frames.
// Each frame is a flat 25-element array of opacity values (0..1).

// ── center-expand: rings expand outward, 9 frames ──────────────────────────
// Dot 20 (centre) ignites first, then ring 1, ring 2… then all DIM
function genCenterExpand(): number[][] {
  const rest = fill(DIM)
  const f0 = sets(rest, [RINGS[0], HI])
  const f1 = sets(rest, [RINGS[0], MID], [RINGS[1], HI])
  const f2 = sets(rest, [RINGS[0], DIM], [RINGS[1], MID], [RINGS[2], HI])
  const f3 = sets(rest, [RINGS[1], DIM], [RINGS[2], MID], [RINGS[3], HI])
  const f4 = sets(rest, [RINGS[2], DIM], [RINGS[3], MID], [RINGS[4], HI])
  const f5 = sets(rest, [RINGS[3], DIM], [RINGS[4], MID], [RINGS[5], HI])
  const f6 = sets(rest, [RINGS[4], DIM], [RINGS[5], MID], [RINGS[6], HI])
  const f7 = sets(rest, [RINGS[5], DIM], [RINGS[6], MID])
  return [f0, f1, f2, f3, f4, f5, f6, f7, rest]
}

// ── center-collapse: rings collapse inward, 9 frames ───────────────────────
function genCenterCollapse(): number[][] {
  const frames = genCenterExpand()
  return [...frames].reverse()
}

// ── edge-in: columns sweep left→right, 12 frames ───────────────────────────
function genEdgeIn(): number[][] {
  const rest = fill(DIM)
  return Array.from({ length: 12 }, (_, f) => {
    const a = fill(DIM)
    for (let col = 0; col < 7; col++) {
      const progress = (f - col * 1.2)
      const op = progress < 0 ? DIM : progress < 1 ? DIM + (HI - DIM) * progress : progress < 2 ? MID : DIM
      for (const i of VCOLS[col]) a[i] = Math.min(HI, Math.max(OFF, op))
    }
    return a
  }).concat([rest])
}

// ── edge-out: columns sweep right→left, 12 frames ──────────────────────────
function genEdgeOutFixed(): number[][] {
  return Array.from({ length: 12 }, (_, f) => {
    const a = fill(DIM)
    for (let col = 0; col < 7; col++) {
      const rcol = 6 - col
      const progress = (f - col * 1.2)
      const op = progress < 0 ? DIM : progress < 1 ? DIM + (HI - DIM) * progress : progress < 2 ? MID : DIM
      for (const i of VCOLS[rcol]) a[i] = Math.min(HI, Math.max(OFF, op))
    }
    return a
  })
}

// ── diamond-grow: concentric rings ON one by one, 7 frames ─────────────────
function genDiamondGrow(): number[][] {
  const frames: number[][] = []
  for (let r = 0; r <= 6; r++) {
    const a = fill(OFF)
    for (let d = 0; d <= r; d++) for (const i of RINGS[d]) a[i] = d === r ? HI : MID
    frames.push(a)
  }
  return frames
}

// ── diamond-shrink: concentric rings OFF one by one, 7 frames ──────────────
function genDiamondShrink(): number[][] {
  return genDiamondGrow().reverse()
}

// ── soft-rotate: diagonal shimmer rotating clockwise, 8 frames ─────────────
// Each frame highlights one diagonal band, cycling through 8 positions
function genSoftRotate(): number[][] {
  const nDiags = DIAGS.length
  return Array.from({ length: 8 }, (_, f) => {
    const a = fill(DIM)
    const d = Math.floor((f / 8) * nDiags)
    const dprev = (d - 1 + nDiags) % nDiags
    for (const i of DIAGS[d]) a[i] = HI
    for (const i of DIAGS[dprev]) if (a[i] < MID) a[i] = MID
    return a
  })
}

// ── micro-pulse: entire grid pulses ON/DIM, 4 frames ───────────────────────
function genMicroPulse(): number[][] {
  return [fill(HI), fill(MID), fill(DIM), fill(MID)]
}

// ── focus-dot: single centre dot pulses, ripples gently, 6 frames ──────────
function genFocusDot(): number[][] {
  const rest = fill(DIM)
  return [
    sets(rest, [RINGS[0], HI]),
    sets(rest, [RINGS[0], HI], [RINGS[1], MID]),
    sets(rest, [RINGS[0], MID], [RINGS[1], MID*0.7]),
    sets(rest, [RINGS[0], MID*0.7]),
    sets(rest, [RINGS[0], MID*0.4]),
    rest,
  ]
}

// ── crossfade-grid: alternating checkerboard dissolves to inverse, 10 frames
function genCrossfadeGrid(): number[][] {
  const frames: number[][] = []
  for (let f = 0; f < 10; f++) {
    const a = Array.from({ length: DOTS }, (_, i) => {
      const t = f / 9
      // visual parity: base dot parity = (r+c)%2, offset always odd parity
      let parity = 0
      if (i < 16) { const r = Math.floor(i/4), c = i%4; parity = (r+c)%2 }
      else { const ri = i-16, r = Math.floor(ri/3), c = ri%3; parity = (r+c+1)%2 }
      return parity === 0
        ? DIM + (HI - DIM) * (1-t)
        : DIM + (HI - DIM) * t
    })
    frames.push(a)
  }
  return frames
}

// ── dot-shift: bright dot slides along snake path (boustrophedon), 14 frames
function genDotShift(): number[][] {
  // snake path through base grid + offset grid interleaved by visual row
  const path: number[] = []
  for (let vr = 0; vr < 7; vr++) {
    const row = [...VROWS[vr]]
    if (vr % 2 === 1) row.reverse()
    path.push(...row)
  }
  const tailLen = 4
  return path.slice(0, 14).map((_, step) => {
    const a = fill(DIM)
    for (let t = 0; t < tailLen; t++) {
      const idx = path[(step - t + path.length) % path.length]
      a[idx] = t === 0 ? HI : t === 1 ? MID : t === 2 ? MID * 0.5 : DIM
    }
    return a
  })
}

// ── grid-breathe: entire grid inhales/exhales slowly, 12 frames ────────────
function genGridBreathe(): number[][] {
  return Array.from({ length: 12 }, (_, f) => {
    const t = Math.sin((f / 12) * Math.PI * 2) * 0.5 + 0.5  // 0→1→0
    const op = DIM + (HI - DIM) * t
    return fill(op)
  })
}

// ── center-glow: center brightens to full, then fades, 5 frames ────────────
function genCenterGlow(): number[][] {
  const rest = fill(DIM)
  return [
    sets(rest, [CENTER, MID]),
    sets(rest, [CENTER, HI], [EDGES, MID]),
    sets(fill(MID), [CENTER, HI]),
    sets(rest, [CENTER, MID], [EDGES, DIM]),
    rest,
  ]
}

// ── center-dim: center dims to OFF then recovers, 5 frames ─────────────────
function genCenterDimFixed(): number[][] {
  const rest = fill(DIM)
  return [
    sets(rest, [CENTER, DIM * 0.5]),
    sets(rest, [CENTER, OFF], [EDGES, DIM * 0.7]),
    sets(fill(DIM * 0.7), [CENTER, OFF]),
    sets(rest, [CENTER, DIM * 0.5]),
    rest,
  ]
}

// ── slide-diamond: bright band sweeps diagonally TL→BR, 11 frames ──────────
function genSlideDiamond(): number[][] {
  return Array.from({ length: 11 }, (_, f) => {
    const a = fill(DIM)
    const d = f - 1
    if (d >= 0 && d < DIAGS.length) for (const i of DIAGS[d]) a[i] = HI
    const dp = d - 1
    if (dp >= 0 && dp < DIAGS.length) for (const i of DIAGS[dp]) a[i] = MID
    return a
  })
}

// ── grid-tilt: diagonal shimmer tilts (diag → anti-diag → diag), 6 frames ──
function genGridTilt(): number[][] {
  const rest = fill(DIM)
  const dMid = Math.floor(DIAGS.length / 2)
  const adMid = Math.floor(ANTIDIAGS.length / 2)
  return [
    sets(rest, [DIAGS[dMid], HI]),
    sets(rest, [DIAGS[dMid], MID], [ANTIDIAGS[adMid], MID]),
    sets(rest, [ANTIDIAGS[adMid], HI]),
    sets(rest, [ANTIDIAGS[adMid], MID], [DIAGS[dMid], MID]),
    sets(rest, [DIAGS[dMid], MID]),
    rest,
  ]
}

// ── soft-wave-diag: diagonal brightness wave scrolls TL→BR, 13 frames ──────
function genSoftWaveDiag(): number[][] {
  const nD = DIAGS.length
  return Array.from({ length: 13 }, (_, f) => {
    const a = fill(DIM)
    for (let d = 0; d < nD; d++) {
      const dist = Math.abs(d - (f % nD))
      const op = dist === 0 ? HI : dist === 1 ? MID : dist === 2 ? DIM + 0.05 : DIM
      for (const i of DIAGS[d]) a[i] = op
    }
    return a
  })
}

// ── density-shift: random-looking density ripple (deterministic), 10 frames
function genDensityShift(): number[][] {
  // pre-computed per-dot phase offsets based on distance + a deterministic jitter
  return Array.from({ length: 10 }, (_, f) => {
    return Array.from({ length: DOTS }, (_, i) => {
      const phase = (DIST_FROM_CENTER[i] * 1.5 + (i * 7) % 3) % 10
      const t = Math.abs(((f - phase + 10) % 10) - 5) / 5   // 0→ bright at phase
      return DIM + (HI - DIM) * (1-t) * (1-t)
    })
  })
}

// ── grid-blink-soft: entire grid softly blinks, 4 frames ───────────────────
function genGridBlinkSoft(): number[][] {
  return [fill(HI), fill(HI * 0.8), fill(DIM), fill(DIM)]
}

// ── dot-expand-contract: centre cluster grows then shrinks, 8 frames ────────
function genDotExpandContract(): number[][] {
  const grow = genDiamondGrow().slice(0, 4)
  const shrink = genDiamondShrink().slice(0, 4)
  return [...grow, ...shrink]
}

// ── soft-shimmer: brightness wave scrolls left→right column by column, 14 fr
function genSoftShimmer(): number[][] {
  return Array.from({ length: 14 }, (_, f) => {
    const a = fill(DIM)
    for (let col = 0; col < 7; col++) {
      const dist = Math.abs(col - (f % 7))
      const op = dist === 0 ? HI : dist === 1 ? MID : DIM
      for (const i of VCOLS[col]) a[i] = op
    }
    return a
  })
}

// ── grid-fade-in: all dots fade from OFF to DIM (entry), 10 frames ──────────
function genGridFadeIn(): number[][] {
  return Array.from({ length: 10 }, (_, f) => {
    const t = f / 9
    return fill(OFF + (DIM - OFF) * t)
  })
}

// ── grid-fade-out: all dots fade from DIM to OFF (exit), 10 frames ──────────
function genGridFadeOut(): number[][] {
  return genGridFadeIn().reverse()
}

// ── center-weight: centre heavy, edges light, then inverts, 6 frames ────────
function genCenterWeight(): number[][] {
  const a = sets(fill(DIM), [CENTER, HI], [EDGES, OFF], [CORNERS, OFF])
  const b = sets(fill(DIM), [CENTER, MID], [EDGES, MID], [CORNERS, DIM])
  const c = fill(DIM)
  const d = sets(fill(DIM), [CENTER, OFF], [EDGES, MID], [CORNERS, HI])
  return [a, b, c, d, b, c]
}

// ── corner-pulse: four base corners pulse in sequence, 8 frames ─────────────
function genCornerPulse(): number[][] {
  const rest = fill(DIM)
  const corners4 = [0, 3, 15, 12]
  return Array.from({ length: 8 }, (_, f) => {
    const a = [...rest]
    a[corners4[f % 4]] = HI
    a[corners4[(f - 1 + 4) % 4]] = MID
    return a
  })
}

// ── diamond-sweep: diagonal band sweeps TL→BR and returns, 12 frames ────────
function genDiamondSweep(): number[][] {
  const forward = Array.from({ length: 6 }, (_, f) => {
    const a = fill(DIM)
    if (DIAGS[f * 2]) for (const i of DIAGS[f * 2]) a[i] = HI
    if (DIAGS[f * 2 - 2]) for (const i of DIAGS[f * 2 - 2]) a[i] = MID
    return a
  })
  return [...forward, ...forward.slice().reverse()]
}

// ── soft-orbit-mini: 2 dots orbit the centre offset, 6 frames ───────────────
function genSoftOrbitMini(): number[][] {
  const ring1 = RINGS[1] ?? []
  const len = ring1.length
  const rest = fill(DIM)
  return Array.from({ length: 6 }, (_, f) => {
    const a = [...rest]
    a[ring1[f % len]] = HI
    a[ring1[(f + Math.floor(len / 2)) % len]] = HI
    a[ring1[(f - 1 + len) % len]] = MID
    a[ring1[(f + Math.floor(len / 2) - 1 + len) % len]] = MID
    return a
  })
}

// ── grid-stagger-soft: dots turn on staggered by distance, 15 frames ────────
function genGridStaggerSoft(): number[][] {
  const maxDist = 6
  return Array.from({ length: 15 }, (_, f) => {
    return Array.from({ length: DOTS }, (_, i) => {
      const triggerFrame = Math.round((DIST_FROM_CENTER[i] / maxDist) * 10)
      if (f < triggerFrame) return OFF
      if (f === triggerFrame) return HI
      if (f === triggerFrame + 1) return MID
      if (f === triggerFrame + 2) return MID * 0.6
      return DIM
    })
  })
}

// ── center-ring: centre glows then ring expands, 7 frames ───────────────────
function genCenterRing(): number[][] {
  const rest = fill(DIM)
  return [
    sets(rest, [RINGS[0], HI]),
    sets(rest, [RINGS[0], HI], [RINGS[1], MID]),
    sets(rest, [RINGS[0], MID], [RINGS[1], HI], [RINGS[2], MID]),
    sets(rest, [RINGS[1], MID], [RINGS[2], HI], [RINGS[3], MID]),
    sets(rest, [RINGS[2], MID], [RINGS[3], MID]),
    sets(rest, [RINGS[3], DIM*1.5]),
    rest,
  ]
}

// ── dot-morph-soft: base↔offset cross-dissolve, 9 frames ────────────────────
function genDotMorphSoft(): number[][] {
  return Array.from({ length: 9 }, (_, f) => {
    const t = f / 8
    return Array.from({ length: DOTS }, (_, i) =>
      i < 16
        ? DIM + (HI - DIM) * (1 - t)
        : DIM + (HI - DIM) * t
    )
  })
}

// ── diamond-shift: rows shift brightness top→bottom, 10 frames ──────────────
function genDiamondShift(): number[][] {
  return Array.from({ length: 10 }, (_, f) => {
    const a = fill(DIM)
    const row = f % 7
    for (const i of VROWS[row]) a[i] = HI
    const rowPrev = (row - 1 + 7) % 7
    for (const i of VROWS[rowPrev]) a[i] = MID
    return a
  })
}

// ── soft-zoom-grid: grid scales up (outer brightens), 6 frames ──────────────
function genSoftZoomGrid(): number[][] {
  // simulate zoom by making outer ring brightest → pulling back in
  return [
    sets(fill(DIM), [RINGS[0], HI]),
    sets(fill(DIM), [RINGS[1], HI], [RINGS[0], MID]),
    sets(fill(DIM), [RINGS[2], HI], [RINGS[1], MID]),
    sets(fill(DIM), [RINGS[3], HI], [RINGS[2], MID]),
    sets(fill(DIM), [RINGS[4], HI], [RINGS[3], MID]),
    fill(DIM),
  ]
}

// ── grid-lift: outer ring dims, inner brightens (focus pull up), 8 frames ───
function genGridLift(): number[][] {
  const rest = fill(DIM)
  return [
    rest,
    sets(rest, [CORNERS, OFF], [CENTER, MID]),
    sets(rest, [CORNERS, OFF], [EDGES, DIM * 0.7], [CENTER, HI]),
    sets(rest, [CORNERS, OFF], [EDGES, DIM * 0.5], [CENTER, HI]),
    sets(rest, [CORNERS, DIM * 0.7], [CENTER, MID]),
    sets(rest, [CORNERS, DIM], [CENTER, DIM]),
    sets(rest, [CENTER, MID]),
    rest,
  ]
}

// ── grid-settle: ripple shrinks to rest (post-load), 8 frames ───────────────
function genGridSettle(): number[][] {
  return [
    fill(HI),
    sets(fill(MID), [CENTER, HI]),
    sets(fill(DIM * 1.3), [CENTER, MID]),
    sets(fill(DIM * 1.1), [CENTER, MID * 0.8]),
    sets(fill(DIM), [CENTER, DIM * 1.3]),
    sets(fill(DIM), [CENTER, DIM * 1.1]),
    sets(fill(DIM), [CENTER, DIM * 1.05]),
    fill(DIM),
  ]
}

// ── dot-focus-ring: ring of dots around centre lights up, 9 frames ───────────
function genDotFocusRing(): number[][] {
  const ring1 = RINGS[1] ?? []
  const ring2 = RINGS[2] ?? []
  const rest = fill(DIM)
  return [
    rest,
    sets(rest, [ring1, MID * 0.5]),
    sets(rest, [ring1, MID]),
    sets(rest, [ring1, HI]),
    sets(rest, [ring1, HI], [ring2, MID * 0.5]),
    sets(rest, [ring1, MID], [ring2, MID]),
    sets(rest, [ring1, DIM * 1.3], [ring2, DIM * 1.1]),
    sets(rest, [ring1, DIM * 1.1]),
    rest,
  ]
}

// ── grid-balance: seesaw — left half bright, then right, 10 frames ──────────
function genGridBalance(): number[][] {
  const leftCols = [VCOLS[0], VCOLS[1], VCOLS[2]].flat()
  const rightCols = [VCOLS[4], VCOLS[5], VCOLS[6]].flat()
  const midCol = VCOLS[3]
  return Array.from({ length: 10 }, (_, f) => {
    const t = Math.sin((f / 10) * Math.PI * 2) // -1 to 1
    const leftOp = DIM + (HI - DIM) * Math.max(0, t)
    const rightOp = DIM + (HI - DIM) * Math.max(0, -t)
    return Array.from({ length: DOTS }, (_, i) => {
      if (leftCols.includes(i)) return leftOp
      if (rightCols.includes(i)) return rightOp
      if (midCol.includes(i)) return DIM
      return DIM
    })
  })
}

// ── center-bounce-soft: centre dot bounces (HI→MID→HI→DIM), 5 frames ──────
function genCenterBounceSoft(): number[][] {
  const rest = fill(DIM)
  return [
    sets(rest, [RINGS[0], HI]),
    sets(rest, [RINGS[0], MID * 0.8]),
    sets(rest, [RINGS[0], HI]),
    sets(rest, [RINGS[0], MID * 0.5]),
    rest,
  ]
}

// ── diamond-stretch: rows stretch top and bottom, 8 frames ──────────────────
function genDiamondStretch(): number[][] {
  const top = [VROWS[0], VROWS[1]].flat()
  const bot = [VROWS[5], VROWS[6]].flat()
  const mid = [VROWS[2], VROWS[3], VROWS[4]].flat()
  const rest = fill(DIM)
  return [
    rest,
    sets(rest, [top, MID], [bot, MID]),
    sets(rest, [top, HI], [bot, HI], [mid, DIM * 0.7]),
    sets(rest, [top, HI], [bot, HI], [mid, OFF]),
    sets(rest, [top, MID], [bot, MID]),
    sets(rest, [top, DIM], [bot, DIM]),
    sets(rest, [mid, MID]),
    rest,
  ]
}

// ── dot-glide: bright dot glides left→right along middle rows, 14 frames ────
function genDotGlide(): number[][] {
  const path = [...VROWS[2], ...VROWS[3].slice().reverse(), ...VROWS[4]]
  const tailLen = 3
  return Array.from({ length: 14 }, (_, f) => {
    const a = fill(DIM)
    for (let t = 0; t < tailLen; t++) {
      const idx = path[(f - t + path.length) % path.length]
      a[idx] = t === 0 ? HI : t === 1 ? MID : DIM * 1.3
    }
    return a
  })
}

// ── grid-reveal: dots turn on in outward rings, 11 frames ───────────────────
function genGridReveal(): number[][] {
  return Array.from({ length: 11 }, (_, f) => {
    return Array.from({ length: DOTS }, (_, i) => {
      const trigger = DIST_FROM_CENTER[i]
      if (f > trigger + 2) return DIM
      if (f > trigger + 1) return MID * 0.5
      if (f > trigger) return MID
      if (f === trigger) return HI
      return OFF
    })
  })
}

// ── grid-mask-reveal: rows reveal top→bottom, 12 frames ─────────────────────
function genGridMaskReveal(): number[][] {
  return Array.from({ length: 12 }, (_, f) => {
    return Array.from({ length: DOTS }, (_, i) => {
      const row = i < 16 ? Math.floor(i / 4) * 2 : (Math.floor((i - 16) / 3)) * 2 + 1
      if (row <= f * (6.5 / 11)) return DIM
      if (row <= f * (6.5 / 11) + 1) return HI
      return OFF
    })
  })
}

// ── dot-echo: centre pulses, echo ripples outward and fades, 7 frames ────────
function genDotEcho(): number[][] {
  return genCenterRing()
}

// ── grid-soft-shift: staggered column phase shift, 15 frames ─────────────────
function genGridSoftShift(): number[][] {
  return Array.from({ length: 15 }, (_, f) => {
    const a = fill(DIM)
    for (let col = 0; col < 7; col++) {
      const phase = (f + col * 2) % 7
      const op = phase === 0 ? HI : phase === 1 ? MID : phase === 6 ? MID * 0.6 : DIM
      for (const i of VCOLS[col]) a[i] = op
    }
    return a
  })
}

// ── diamond-focus: outer dims, centre cluster fully bright, 6 frames ─────────
function genDiamondFocus(): number[][] {
  const rest = fill(DIM)
  return [
    rest,
    sets(rest, [CORNERS, OFF], [CENTER, MID]),
    sets(fill(OFF), [CENTER, HI]),
    sets(fill(OFF), [CENTER, HI], [RINGS[1], MID * 0.4]),
    sets(fill(DIM * 0.5), [CENTER, MID]),
    rest,
  ]
}

// ── grid-expand-soft: grid expands (all go bright) and settles, 8 frames ────
function genGridExpandSoft(): number[][] {
  return [
    fill(OFF),
    fill(OFF * 2),
    sets(fill(DIM * 0.5), [CENTER, MID]),
    sets(fill(DIM), [CENTER, HI]),
    sets(fill(DIM * 1.1), [CENTER, HI], [EDGES, MID]),
    sets(fill(DIM), [CENTER, MID]),
    fill(DIM * 1.05),
    fill(DIM),
  ]
}

// ── grid-contract-soft: grid contracts (all go dim) and fades, 8 frames ─────
function genGridContractSoft(): number[][] {
  return genGridExpandSoft().reverse()
}

// ── center-ping: centre bright burst, then fades ring by ring, 5 frames ──────
function genCenterPing(): number[][] {
  return [
    fill(HI),
    sets(fill(DIM), [RINGS[0], HI], [RINGS[1], MID]),
    sets(fill(DIM), [RINGS[0], MID], [RINGS[1], DIM * 1.3]),
    sets(fill(DIM), [RINGS[0], DIM * 1.2]),
    fill(DIM),
  ]
}

// ── dot-highlight-pass: bright row scans top→bottom, 13 frames ───────────────
function genDotHighlightPass(): number[][] {
  return Array.from({ length: 13 }, (_, f) => {
    const a = fill(DIM)
    const row = f % 7
    for (const i of VROWS[row]) a[i] = HI
    if (f >= 1) for (const i of VROWS[(row - 1 + 7) % 7]) a[i] = MID
    return a
  })
}

// ── grid-float-soft: gentle vertical oscillation staggered by column, 10 fr ──
function genGridFloatSoft(): number[][] {
  return Array.from({ length: 10 }, (_, f) => {
    return Array.from({ length: DOTS }, (_, i) => {
      const col = i < 16 ? (i % 4) * 2 : ((i - 16) % 3) * 2 + 1
      const t = Math.sin(((f + col) / 10) * Math.PI * 2) * 0.5 + 0.5
      return DIM + (MID - DIM) * t
    })
  })
}

// ── diamond-pulse-soft: gentle ring pulse, slower and softer, 6 frames ───────
function genDiamondPulseSoft(): number[][] {
  const rest = fill(DIM)
  return [
    rest,
    sets(rest, [RINGS[0], MID * 0.7]),
    sets(rest, [RINGS[0], MID], [RINGS[1], MID * 0.5]),
    sets(rest, [RINGS[1], MID * 0.7], [RINGS[2], MID * 0.4]),
    sets(rest, [RINGS[2], MID * 0.5]),
    rest,
  ]
}

// ── heart-plus: morphs between medical cross ✚ and heart ♥, loops, 11 frames
// Medical plus uses the two inner base columns (vcol 2,4) as vertical arm
// and the two inner base rows (vrow 2,4) + offset row 3 as horizontal arm.
// Heart shoulders (16,18) are the only dots not shared with the plus —
// keeping the shared body (waist + lower V) bright makes the morph seamless.
function genHeartPlus(): number[][] {
  const plus      = [1, 2, 17, 4, 5, 6, 7, 19, 20, 21, 8, 9, 10, 11, 23, 13, 14]
  const heart     = [16, 18, 4, 5, 6, 7, 19, 20, 21, 9, 10, 23]
  const plusOnly  = plus.filter(i => !heart.includes(i))   // [1,2,17,8,11,13,14]
  const heartOnly = heart.filter(i => !plus.includes(i))   // [16,18]
  const shared    = plus.filter(i => heart.includes(i))    // [4,5,6,7,19,20,21,9,10,23]
  const rest = fill(DIM)
  return [
    // ── medical plus pulse ──
    sets(rest, [plus, HI]),
    sets(rest, [plus, MID]),
    sets(rest, [plus, HI]),
    // ── cross-dissolve plus → heart ──
    sets(rest, [shared, HI],  [plusOnly, MID],  [heartOnly, MID]),
    sets(rest, [shared, HI],  [plusOnly, OFF],  [heartOnly, HI]),
    // ── heart lub-dub ──
    sets(rest, [heart, MID]),
    sets(rest, [heart, HI]),
    sets(rest, [heart, MID]),
    sets(rest, [heart, HI]),
    // ── cross-dissolve heart → plus ──
    sets(rest, [shared, HI],  [heartOnly, MID], [plusOnly, MID]),
    sets(rest, [shared, HI],  [heartOnly, OFF], [plusOnly, HI]),
  ]
}

// ── heart-pulse: lub-dub double beat over a heart-shaped dot subset, 7 frames
// Heart shape:
//   (1,1)=16,(5,1)=18 — outer shoulders
//   (0,2)=4,(2,2)=5,(4,2)=6,(6,2)=7 — wide body
//   (1,3)=19,(5,3)=21 — lower sides
//   (2,4)=9,(4,4)=10 — narrowing
//   (3,5)=23 — point
function genHeartPulse(): number[][] {
  const heart = [16, 18, 4, 5, 6, 7, 19, 20, 21, 9, 10, 23]
  const rest = fill(DIM)
  return [
    rest,
    sets(rest, [heart, MID]),           // pre-beat swell
    sets(rest, [heart, HI]),            // lub — first beat
    sets(rest, [heart, MID]),           // dip between beats
    sets(rest, [heart, HI]),            // dub — second beat
    sets(rest, [heart, DIM * 1.4]),     // decay
    rest,
  ]
}

// ── spin-cw: classic spinner — bright dot + tail orbits inner ring CW, 8 frames
// Clockwise path through RINGS[2]: top·top-right·right·bottom-right·bottom·bottom-left·left·top-left
// Indices (vcol,vrow): 17(3,1)→6(4,2)→21(5,3)→10(4,4)→23(3,5)→9(2,4)→19(1,3)→5(2,2)
function genSpinCw(): number[][] {
  const ring = [17, 6, 21, 10, 23, 9, 19, 5]
  const n = ring.length
  return Array.from({ length: n }, (_, f) => {
    const a = fill(DIM)
    a[ring[f]]                    = HI
    a[ring[(f - 1 + n) % n]]      = MID
    a[ring[(f - 2 + n) % n]]      = MID * 0.45
    return a
  })
}

// ── spin-check: spins CW ×1.5, morphs to checkmark, holds — 16 frames ────────
// Spin ring: [17,6,21,10,23,9,19,5] (inner ring)
// Checkmark:  short left leg 8(0,4)→22(1,5)→13(2,6)
//             long right leg 13(2,6)→23(3,5)→10(4,4)→21(5,3)→7(6,2)
// Dots 10,21,23 are shared — they anchor the smooth morph from spin to check.
function genSpinCheck(): number[][] {
  const ring  = [17, 6, 21, 10, 23, 9, 19, 5]
  const check = [8, 22, 13, 23, 10, 21, 7]
  const n = ring.length
  const rest = fill(DIM)
  const frames: number[][] = []

  // Phase 1: 1.5 rotations — 12 frames
  for (let f = 0; f < 12; f++) {
    const a = fill(DIM)
    a[ring[f % n]]           = HI
    a[ring[(f - 1 + n) % n]] = MID
    a[ring[(f - 2 + n) % n]] = MID * 0.45
    frames.push(a)
  }

  // Phase 2: morph spin → checkmark — 4 frames
  frames.push(sets(rest, [check, MID * 0.5]))
  frames.push(sets(rest, [check, MID]))
  frames.push(sets(rest, [check, MID * 1.4]))
  frames.push(sets(rest, [check, HI]))

  return frames
}

// ── spin-fall: spins CW ×1.5, directly falls — pixels rain randomly to bottom and settle — 29 frames
// Phase 1 (12 frames): 1.5 CW orbits
// Phase 2 (7 frames):  random rain — each of the 7 visual columns falls at a different
//                      pseudo-random frame; each column gets a 3-frame comet trail
//                      (upper spark → mid head → bottom settle). Background OFF.
// Phase 3 (10 frames): hold — 7 bottom dots bright, everything else dark
//
// VCOLS layout (col → [top…bottom]):
//   col 0: [0,4,8,12]    col 1: [16,19,22]   col 2: [1,5,9,13]
//   col 3: [17,20,23]    col 4: [2,6,10,14]  col 5: [18,21,24]   col 6: [3,7,11,15]
// fallFrames[col]: frame the bottom dot settles (0..6, all distinct → looks random)
function genSpinFall(): number[][] {
  const ring = [17, 6, 21, 10, 23, 9, 19, 5]
  const n = ring.length
  const frames: number[][] = []

  // Phase 1: 1.5 CW rotations — 12 frames
  for (let f = 0; f < 12; f++) {
    const a = fill(DIM)
    a[ring[f % n]]           = HI
    a[ring[(f - 1 + n) % n]] = MID
    a[ring[(f - 2 + n) % n]] = MID * 0.45
    frames.push(a)
  }

  // Phase 2: random rain — 7 frames directly after spin
  // Each column lands at a different frame; comet shows 2 frames before landing.
  const fallFrames = [3, 0, 5, 2, 6, 1, 4]   // landing frame per column

  for (let f = 0; f < 7; f++) {
    const a = fill(OFF)
    for (let col = 0; col < 7; col++) {
      const landing = fallFrames[col]
      const colDots = VCOLS[col]
      const bottom = colDots[colDots.length - 1]
      const mid    = colDots[colDots.length - 2]
      const upper  = colDots[colDots.length - 3] ?? -1

      if (f > landing) {
        a[bottom] = HI                          // settled
      } else if (f === landing) {
        a[bottom] = HI                          // just landed
        a[mid]    = MID * 0.4                   // impact flash
      } else if (f === landing - 1) {
        a[mid]    = HI                          // comet head at mid
        if (upper >= 0) a[upper] = MID * 0.5   // comet tail
      } else if (f === landing - 2 && upper >= 0) {
        a[upper]  = MID * 0.7                   // faint spark near top
      }
    }
    frames.push(a)
  }

  // Phase 3: hold — all 7 column bottom dots bright — 10 frames
  const allBottoms = VCOLS.map(col => col[col.length - 1])
  const held = fill(OFF)
  for (const b of allBottoms) held[b] = HI
  for (let i = 0; i < 10; i++) frames.push([...held])

  return frames
}

// ─── Preset registry ──────────────────────────────────────────────────────────

type Preset = { frames: readonly number[][], interval: number, loop?: boolean }

export const MATRIX_SPINNERS: Record<string, Preset> = {
  "center-expand":       { frames: genCenterExpand(),       interval: 120 },
  "center-collapse":     { frames: genCenterCollapse(),     interval: 120 },
  "edge-in":             { frames: genEdgeIn(),             interval: 80  },
  "edge-out":            { frames: genEdgeOutFixed(),       interval: 80  },
  "diamond-grow":        { frames: genDiamondGrow(),        interval: 140 },
  "diamond-shrink":      { frames: genDiamondShrink(),      interval: 140 },
  "soft-rotate":         { frames: genSoftRotate(),         interval: 160 },
  "micro-pulse":         { frames: genMicroPulse(),         interval: 220 },
  "focus-dot":           { frames: genFocusDot(),           interval: 150 },
  "crossfade-grid":      { frames: genCrossfadeGrid(),      interval: 100 },
  "dot-shift":           { frames: genDotShift(),           interval: 70  },
  "grid-breathe":        { frames: genGridBreathe(),        interval: 140 },
  "center-glow":         { frames: genCenterGlow(),         interval: 200 },
  "center-dim":          { frames: genCenterDimFixed(),     interval: 200 },
  "slide-diamond":       { frames: genSlideDiamond(),       interval: 90  },
  "grid-tilt":           { frames: genGridTilt(),           interval: 180 },
  "soft-wave-diag":      { frames: genSoftWaveDiag(),       interval: 80  },
  "density-shift":       { frames: genDensityShift(),       interval: 120 },
  "grid-blink-soft":     { frames: genGridBlinkSoft(),      interval: 260 },
  "dot-expand-contract": { frames: genDotExpandContract(),  interval: 150 },
  "soft-shimmer":        { frames: genSoftShimmer(),        interval: 70  },
  "grid-fade-in":        { frames: genGridFadeIn(),         interval: 100 },
  "grid-fade-out":       { frames: genGridFadeOut(),        interval: 100 },
  "center-weight":       { frames: genCenterWeight(),       interval: 160 },
  "corner-pulse":        { frames: genCornerPulse(),        interval: 120 },
  "diamond-sweep":       { frames: genDiamondSweep(),       interval: 80  },
  "soft-orbit-mini":     { frames: genSoftOrbitMini(),      interval: 160 },
  "grid-stagger-soft":   { frames: genGridStaggerSoft(),    interval: 60  },
  "center-ring":         { frames: genCenterRing(),         interval: 140 },
  "dot-morph-soft":      { frames: genDotMorphSoft(),       interval: 130 },
  "diamond-shift":       { frames: genDiamondShift(),       interval: 100 },
  "soft-zoom-grid":      { frames: genSoftZoomGrid(),       interval: 180 },
  "grid-lift":           { frames: genGridLift(),           interval: 120 },
  "grid-settle":         { frames: genGridSettle(),         interval: 120 },
  "dot-focus-ring":      { frames: genDotFocusRing(),       interval: 110 },
  "grid-balance":        { frames: genGridBalance(),        interval: 140 },
  "center-bounce-soft":  { frames: genCenterBounceSoft(),   interval: 200 },
  "diamond-stretch":     { frames: genDiamondStretch(),     interval: 140 },
  "dot-glide":           { frames: genDotGlide(),           interval: 70  },
  "grid-reveal":         { frames: genGridReveal(),         interval: 90  },
  "grid-mask-reveal":    { frames: genGridMaskReveal(),     interval: 80  },
  "dot-echo":            { frames: genDotEcho(),            interval: 160 },
  "grid-soft-shift":     { frames: genGridSoftShift(),      interval: 60  },
  "diamond-focus":       { frames: genDiamondFocus(),       interval: 150 },
  "grid-expand-soft":    { frames: genGridExpandSoft(),     interval: 140 },
  "grid-contract-soft":  { frames: genGridContractSoft(),   interval: 140 },
  "center-ping":         { frames: genCenterPing(),         interval: 220 },
  "dot-highlight-pass":  { frames: genDotHighlightPass(),   interval: 80  },
  "grid-float-soft":     { frames: genGridFloatSoft(),      interval: 150 },
  "diamond-pulse-soft":  { frames: genDiamondPulseSoft(),   interval: 180 },
  "spin-cw":             { frames: genSpinCw(),              interval: 11  },
  "spin-check":          { frames: genSpinCheck(),           interval: 30,  loop: false },
  "spin-fall":           { frames: genSpinFall(),            interval: 30,  loop: false },
  "heart-pulse":         { frames: genHeartPulse(),          interval: 150 },
  "heart-plus":          { frames: genHeartPlus(),           interval: 140 },
}

export type MatrixSpinnerName = keyof typeof MATRIX_SPINNERS

// ─── Size variants ────────────────────────────────────────────────────────────

const SIZES = {
  "12": 12,
  "16": 16,
  "20": 20,
  "24": 24,
  "32": 32,
  "48": 48,
} as const

// ─── Component ────────────────────────────────────────────────────────────────

export interface MatrixSpinnerProps
  extends Omit<React.ComponentPropsWithoutRef<"span">, "children"> {
  /** Animation preset name. Defaults to "center-expand". */
  name?: MatrixSpinnerName
  /** Size of the spinner in px. Defaults to "24". */
  size?: keyof typeof SIZES
}

function MatrixSpinner({
  name = "center-expand",
  size = "24",
  className,
  style,
  ...props
}: MatrixSpinnerProps) {
  const preset = MATRIX_SPINNERS[name]
  const svgRef = React.useRef<SVGSVGElement>(null)
  const transitionMs = Math.round(preset.interval * 0.8)

  React.useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const mql = typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null
    if (mql?.matches) return
    const rects = Array.from(svg.querySelectorAll<SVGRectElement>("[data-dot]"))
    let frame = 0
    if (preset.loop === false) {
      const id = setInterval(() => {
        frame++
        if (frame >= preset.frames.length) { clearInterval(id); return }
        const opacities = preset.frames[frame]
        for (let i = 0; i < rects.length; i++) rects[i].style.opacity = String(opacities[i])
      }, preset.interval)
      return () => clearInterval(id)
    }
    const id = setInterval(() => {
      frame = (frame + 1) % preset.frames.length
      const opacities = preset.frames[frame]
      for (let i = 0; i < rects.length; i++) rects[i].style.opacity = String(opacities[i])
    }, preset.interval)
    return () => clearInterval(id)
  }, [name, preset])

  const opacities = preset.frames[0]
  const px = SIZES[size]
  const ph = Math.round(px * (SVG_H / SVG_W))

  return (
    <span
      data-slot="matrix-spinner"
      role="status"
      aria-label="Loading"
      className={cn("inline-block select-none", className)}
      style={{ width: px, height: ph, ...style }}
      {...props}
    >
      <svg
        ref={svgRef}
        width={SVG_W}
        height={SVG_H}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        {/* Base 4×4 grid */}
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 4 }, (_, col) => {
            const idx = row * 4 + col
            const x = col * GAP + 2
            const y = row * GAP + 2
            return (
              <rect
                key={`b-${idx}`}
                data-dot
                x={x}
                y={y}
                width={SIZE}
                height={SIZE}
                transform={`rotate(-45 ${x + SIZE / 2} ${y + SIZE / 2})`}
                fill="currentColor"
                style={{
                  opacity: opacities[idx],
                  transition: `opacity ${transitionMs}ms cubic-bezier(0.23, 1, 0.32, 1)`,
                }}
              />
            )
          })
        )}

        {/* Offset 3×3 grid */}
        {Array.from({ length: 3 }, (_, row) =>
          Array.from({ length: 3 }, (_, col) => {
            const idx = 16 + row * 3 + col
            const x = col * GAP + OFFSET + 2
            const y = row * GAP + OFFSET + 2
            return (
              <rect
                key={`o-${idx}`}
                data-dot
                x={x}
                y={y}
                width={SIZE}
                height={SIZE}
                transform={`rotate(-45 ${x + SIZE / 2} ${y + SIZE / 2})`}
                fill="currentColor"
                style={{
                  opacity: opacities[idx],
                  transition: `opacity ${transitionMs}ms cubic-bezier(0.23, 1, 0.32, 1)`,
                }}
              />
            )
          })
        )}
      </svg>
      <span className="sr-only">Loading…</span>
    </span>
  )
}

export { MatrixSpinner }
