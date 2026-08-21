/**
 * @name care-filly
 * @description Spring-driven animated Filly character (Filly-New-Series) with face-plate nodding,
 *   blinking, talking, expressions and all state presets.
 * @type registry:ui
 */
import * as React from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Shared utilities                                                    */
/* ------------------------------------------------------------------ */
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
const wpick = (pairs: ReadonlyArray<readonly [number, string]>) => {
  let total = 0;
  for (const p of pairs) total += p[0];
  let r = Math.random() * total;
  for (const p of pairs) {
    r -= p[0];
    if (r <= 0) return p[1];
  }
  return pairs[pairs.length - 1][1];
};

class Spring {
  x: number;
  v: number;
  t: number;
  w: number;
  z: number;
  constructor(v: number, w: number, z = 1) {
    this.x = v;
    this.v = 0;
    this.t = v;
    this.w = w;
    this.z = z;
  }
  step(h: number) {
    const a =
      -2 * this.z * this.w * this.v - this.w * this.w * (this.x - this.t);
    this.v += a * h;
    this.x += this.v * h;
  }
  set(t: number) {
    this.t = t;
  }
}

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type ExpressionName =
  | "neutral"
  | "smallSmile"
  | "smile"
  | "bigSmile"
  | "sad"
  | "worried"
  | "surprised"
  | "thinking"
  | "confused";

type CharacterStateName =
  | "idle"
  | "listening"
  | "talking"
  | "writing"
  | "thinking"
  | "loading"
  | "happy"
  | "sad"
  | "surprised"
  | "confused"
  | "excited"
  | "sleepy";

type ExpressionConfig = {
  open?: number;
  wide?: number;
  cy?: number;
  cx?: number;
  cs?: number;
  my?: number;
  mx?: number;
  asym?: number;
  eye?: number;
  lid?: number;
};

type SequenceStep = { do?: () => void; wait?: number | [number, number] };
type Timer = { at: number; fn: () => void };
type BlinkState = {
  active: boolean;
  t: number;
  dur: number;
  hold: number;
  min: number;
  queue: number;
  next: number;
};
type RollState = { t0: number; dur: number; bx: number; by: number };
type HeadBase = { x: number; y: number; rot: number };
type DirectionName = keyof typeof DIRS;

type CharacterStateConfig = {
  expr: ExpressionName;
  gaze: [number, number];
  blink: [number, number];
  micro: { amp: number; speed: number };
  gap?: [number, number];
  events?: ReadonlyArray<readonly [number, string]>;
  head?: Partial<HeadBase>;
  lid?: number;
  eye?: number;
  blinkDur?: number;
  talk?: boolean;
  loop?: "loadingLoop" | "confusedLoop";
  enter?: (e: FillyEngine) => void;
};

/* ------------------------------------------------------------------ */
/* Filly geometry — derived from Filly-New-Series front-facing SVG     */
/* Eye/mouth centers match classic geometry almost exactly             */
/* ------------------------------------------------------------------ */
const FILLY_GEOM = {
  CX: 59.955,
  CY: 61,
  RX: 4.6,
  RY: 3.1,
  ELX: 40.73,
  ELY: 49.09,
  ERX: 79.18,
  ERY: 49.09,
  MBX: 59.95,
  MBY: 82.5,
  MLX: 40.75,
  MLY: 74.5,
  MRX: 79.15,
  MRY: 74.5,
  EW: 8,
  MBY_TOP: 78.5,
  MBW: 30.4,
  MBH: 8,
} as const;

/*
 * Face-plate translation scale factors.
 * Derived from comparing Filly-New-Series nodding SVG positions to the
 * front-facing baseline:
 *   Pure horizontal max shift = ±9 SVG units (at full left/right nod)
 *   Pure vertical  max shift = ±8.5 SVG units (at full up/down nod)
 *
 * Engine spring ranges:
 *   hr (rotation spring) — tiltLeft/Right peaks at ±7, listenNod ±4.5
 *   yaw                  — shakeHead peaks at ±0.6, listenNod ±0.4
 *   hx                   — headDrift / shake ±1.4
 *   hy                   — nod() peaks at +3, bounce at -2
 */
const FP = {
  HR: 0.71, // hr → face-plate x  (tiltLeft hr=7 → fpTX ≈ 5)
  YAW: 5.0, // yaw → face-plate x
  HX: 0.5, // hx → face-plate x (supplementary)
  HY: 1.33, // hy → face-plate y  (nod depth=3 → fpTY ≈ 4)
  MAX_TX: 5.0, // always ≥6 SVG units from shell edge; no edge-touching
  MAX_TY: 4.0,
} as const;

/* ------------------------------------------------------------------ */
/* Expression / state tables                                          */
/* ------------------------------------------------------------------ */
const EXPR: Record<ExpressionName, ExpressionConfig> = {
  neutral: { open: 1, wide: 1, cy: 0, cx: 0, cs: 1 },
  smallSmile: { open: 1.15, wide: 1, cy: 0, cx: 0, cs: 1 },
  smile: { open: 1.35, wide: 1, cy: 0, cx: 0, cs: 1 },
  bigSmile: { open: 1.7, wide: 1, cy: 0, cx: 0, cs: 1 },
  sad: { open: 1, wide: 1, cy: 16.11, cx: 0, cs: 1, my: -5.5 },
  worried: { open: 0.42, wide: 0.66, cy: 4.6, cx: -1, cs: 0, my: 0.4 },
  surprised: {
    open: 2,
    wide: 0.52,
    cy: 2.2,
    cx: -2.2,
    cs: 0,
    my: -3.2,
    eye: 1.1,
  },
  thinking: {
    open: 0.45,
    wide: 0.55,
    cy: 1.5,
    cx: -1.6,
    cs: 0,
    mx: 2.4,
    lid: 0.95,
  },
  confused: { open: 0.6, wide: 0.72, cy: 1, asym: 2.6, cs: 0, mx: 1.6 },
};

const TALK_SHAPES = [
  { o: 1.5, w: 0.85 },
  { o: 0.5, w: 0.95 },
  { o: 1.25, w: 0.65 },
  { o: 1.9, w: 0.72 },
  { o: 0.75, w: 1.02 },
  { o: 1.05, w: 0.9 },
  { o: 0.32, w: 0.9 },
];

const DIRS = {
  center: [0, 0],
  left: [-0.85, 0],
  right: [0.85, 0],
  up: [0, -0.85],
  down: [0, 0.85],
  "upper-left": [-0.7, -0.7],
  "upper-right": [0.7, -0.7],
  "lower-left": [-0.7, 0.7],
  "lower-right": [0.7, 0.7],
};

const WRITING_PATH_D =
  "M7.73145 285.912C143.731 137.912 134.731 -38.0885 60.7314 22.9118C-21.4532 90.6589 46.7314 241.912 112.731 273.912C178.731 305.912 218.731 155.912 176.731 177.912C134.731 199.912 166.731 299.912 216.731 273.912C266.731 247.912 231.731 141.912 545.731 199.912C796.931 246.312 796.065 181.912 772.731 143.912";

const WRITING_STROKE = {
  d: WRITING_PATH_D,
  baseWidth: 793,
  baseHeight: 294,
  stroke: 44,
  segmentRatio: 0.24,
  speedRatio: 0.64,
  easeAmount: 0.35,
  easeHz: 1.2,
} as const;

function writingStrokeScale(spec: typeof WRITING_STROKE) {
  return (FILLY_GEOM.EW * 4.6) / spec.baseWidth;
}
function writingStrokeTransform(spec: typeof WRITING_STROKE) {
  const s = writingStrokeScale(spec);
  const tx = FILLY_GEOM.MBX - (spec.baseWidth / 2) * s;
  const ty = FILLY_GEOM.MBY - (spec.baseHeight / 2) * s;
  return `translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${s.toFixed(5)})`;
}

const STATES: Record<CharacterStateName, CharacterStateConfig> = {
  idle: {
    expr: "neutral",
    gaze: [0, 0],
    blink: [2.2, 6.5],
    micro: { amp: 0.5, speed: 1 },
    gap: [1.6, 4.2],
    events: [
      [5, "gazeShift"],
      [3, "glance"],
      [1, "doubleBlink"],
      [1, "microSmile"],
      [0.4, "eyeRoll"],
    ],
  },
  listening: {
    expr: "smallSmile",
    gaze: [0, 0.12],
    head: { rot: -1.2 },
    blink: [2, 5.5],
    micro: { amp: 0.6, speed: 1 },
    gap: [0.9, 1.8],
    events: [
      [1, "gazeShift"],
      [0.5, "listeningMouthShift"],
      [5, "listeningNod"],
      [0.4, "doubleBlink"],
    ],
  },
  talking: {
    expr: "neutral",
    talk: true,
    gaze: [0, 0],
    blink: [2.5, 6],
    micro: { amp: 0.8, speed: 1.25 },
    gap: [1.5, 3.5],
    events: [
      [1, "gazeShift"],
      [1, "talkingRotate"],
    ],
  },
  writing: {
    expr: "neutral",
    gaze: [0, 0],
    head: { rot: 0, y: 0, x: 0 },
    lid: 1,
    eye: 1,
    blink: [9, 12],
    blinkDur: 0.35,
    micro: { amp: 0, speed: 1 },
  },
  thinking: {
    expr: "thinking",
    gaze: [-0.45, -0.55],
    head: { rot: -5, x: -1 },
    lid: 0.95,
    blink: [3, 7],
    blinkDur: 0.55,
    micro: { amp: 0.4, speed: 0.7 },
    gap: [2.5, 5],
    events: [
      [2, "switchSide"],
      [1, "gazeShift"],
      [1, "slowBlink"],
    ],
  },
  loading: {
    expr: "neutral",
    gaze: [0, 0],
    lid: 0.97,
    blink: [3, 6],
    micro: { amp: 0.45, speed: 0.9 },
    loop: "loadingLoop",
  },
  happy: {
    expr: "smile",
    gaze: [0, -0.05],
    head: { y: -1.2 },
    blink: [2.5, 6],
    micro: { amp: 0.7, speed: 1.2 },
    gap: [1.8, 4],
    events: [
      [2, "smilePulse"],
      [2, "gazeShift"],
      [1, "doubleBlink"],
    ],
  },
  sad: {
    expr: "sad",
    gaze: [0, 0.55],
    head: { rot: 2.5, y: 2.2 },
    lid: 0.8,
    eye: 0.97,
    blink: [3.5, 7.5],
    blinkDur: 0.6,
    micro: { amp: 0.3, speed: 0.55 },
    gap: [3, 6],
    events: [
      [2, "gazeShiftDown"],
      [2, "sadSway"],
      [1, "sigh"],
      [1, "slowBlink"],
    ],
  },
  surprised: {
    expr: "surprised",
    gaze: [0, -0.08],
    head: { y: -2 },
    eye: 1.1,
    blink: [4, 8],
    micro: { amp: 0.5, speed: 1.1 },
    gap: [2.5, 5],
    events: [
      [2, "gazeShift"],
      [1, "doubleBlink"],
    ],
    enter: (e: FillyEngine) => {
      e.headPulse({ y: -1.6, rot: -1 }, 0.35);
      e.surprisedLoop();
    },
  },
  confused: {
    expr: "confused",
    gaze: [0, 0],
    blink: [2.5, 6],
    micro: { amp: 0.5, speed: 0.9 },
    loop: "confusedLoop",
  },
  excited: {
    expr: "bigSmile",
    gaze: [0, -0.05],
    head: { y: -0.8 },
    eye: 1.12,
    blink: [2, 5],
    micro: { amp: 1.2, speed: 2.1 },
    gap: [0.9, 2.2],
    events: [
      [2, "gazeShift"],
      [2, "excitedRotate"],
      [1, "doubleBlink"],
    ],
  },
  sleepy: {
    expr: "neutral",
    gaze: [0, 0.5],
    head: { rot: 3, y: 1.8 },
    lid: 0.55,
    eye: 0.95,
    blink: [2, 4.5],
    blinkDur: 0.9,
    micro: { amp: 0.5, speed: 0.45 },
    gap: [2.5, 5.5],
    events: [
      [2, "longClose"],
      [2, "swaySlow"],
      [1, "gazeShiftDown"],
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Filly animation engine                                              */
/* Same state/event/expression/blink/gaze model as CharacterEngine.   */
/* render() uses face-plate translation (not head rotation) to show   */
/* nodding direction, matching the Filly-New-Series SVG keyframes.    */
/* ------------------------------------------------------------------ */
class FillyEngine {
  svg: SVGSVGElement;
  head: SVGGraphicsElement;
  faceplate: SVGGraphicsElement | null;
  face: SVGGraphicsElement;
  eyesG: SVGGraphicsElement;
  mouthG: SVGGraphicsElement;
  eyeL: SVGGraphicsElement;
  eyeR: SVGGraphicsElement;
  bar: SVGGraphicsElement;
  mL: SVGGraphicsElement;
  mR: SVGGraphicsElement;
  nose: SVGGraphicsElement | null;
  shell: SVGGraphicsElement | null;
  maskFace: SVGGraphicsElement | null;
  wG: SVGGraphicsElement | null;
  wP: SVGPathElement | null;
  wLen: number;
  writingT0: number;
  waveL: SVGGraphicsElement | null;
  waveR: SVGGraphicsElement | null;
  waveLPaths: SVGElement[];
  waveRPaths: SVGElement[];

  gx: Spring;
  gy: Spring;
  yaw: Spring;
  hx: Spring;
  hy: Spring;
  hr: Spring;
  lid: Spring;
  eyeS: Spring;
  open: Spring;
  wide: Spring;
  cy: Spring;
  cx: Spring;
  cs: Spring;
  asym: Spring;
  mx: Spring;
  my: Spring;
  mAmp: Spring;
  sleepyMorph: Spring;
  loadingMix: Spring;
  wavePulse: Spring;
  springs: Spring[];

  time: number;
  acc: number;
  last: number;
  timers: Timer[];
  gen: Record<string, number>;
  bl: BlinkState;
  talking: boolean;
  talkNext: number;
  roll: RollState | null;
  mouse: boolean;
  microPhase: number;
  microSpeed: number;
  expressionName: ExpressionName;
  stateName: CharacterStateName | null;
  hb: HeadBase;
  acts: Record<string, () => void>;
  st: CharacterStateConfig;
  gazeBias: [number, number];
  thinkSide?: number;
  _ow?: [number, number];
  _pm: ((e: PointerEvent) => void) | null;
  onChange?: () => void;
  _raf: (t: number) => void;
  _rafId: number;

  constructor(svg: SVGSVGElement, initialState?: string) {
    this.svg = svg;
    const q = (p: string) =>
      svg.querySelector(`[data-part="${p}"]`) as SVGGraphicsElement;
    this.head = q("head");
    this.faceplate = svg.querySelector(
      '[data-part="face-plate"]'
    ) as SVGGraphicsElement | null;
    this.face = q("face");
    this.eyesG = q("eyes");
    this.mouthG = q("mouth-group");
    this.eyeL = q("eye-left");
    this.eyeR = q("eye-right");
    this.bar = q("mouth");
    this.mL = q("mouth-left");
    this.mR = q("mouth-right");
    this.nose = svg.querySelector(
      '[data-part="nose"]'
    ) as SVGGraphicsElement | null;
    this.shell = svg.querySelector(
      '[data-part="shell"]'
    ) as SVGGraphicsElement | null;
    this.maskFace = svg.querySelector(
      '[data-part="mask-face"]'
    ) as SVGGraphicsElement | null;
    this.wG = svg.querySelector(
      '[data-part="writing-stroke"]'
    ) as SVGGraphicsElement | null;
    this.wP = svg.querySelector(
      '[data-part="writing-line"]'
    ) as SVGPathElement | null;
    this.waveL = svg.querySelector(
      '[data-part="wave-left"]'
    ) as SVGGraphicsElement | null;
    this.waveR = svg.querySelector(
      '[data-part="wave-right"]'
    ) as SVGGraphicsElement | null;
    this.waveLPaths = this.waveL
      ? Array.from(this.waveL.querySelectorAll("path"))
      : [];
    this.waveRPaths = this.waveR
      ? Array.from(this.waveR.querySelectorAll("path"))
      : [];
    this.wLen = 0;
    this.writingT0 = 0;
    if (this.wP) {
      this.wP.setAttribute("d", WRITING_STROKE.d);
      try {
        this.wLen = this.wP.getTotalLength();
      } catch {
        this.wLen = 0;
      }
    }

    const S = (v: number, w: number, z = 1) => new Spring(v, w, z);
    this.gx = S(0, 11);
    this.gy = S(0, 11);
    this.yaw = S(0, 8, 0.95);
    this.hx = S(0, 6.5);
    this.hy = S(0, 6.5, 0.95);
    this.hr = S(0, 7, 0.9);
    this.lid = S(1, 14);
    this.eyeS = S(1, 10, 0.85);
    this.open = S(1, 16, 0.9);
    this.wide = S(1, 14, 0.95);
    this.cy = S(0, 11, 0.85);
    this.cx = S(0, 11);
    this.cs = S(1, 12);
    this.asym = S(0, 11);
    this.mx = S(0, 9);
    this.my = S(0, 11);
    this.mAmp = S(0.5, 3);
    this.sleepyMorph = S(0, 10, 0.9);
    this.loadingMix = S(0, 9, 0.9);
    this.wavePulse = S(0, 3.5, 0.7);
    this.springs = [
      this.gx,
      this.gy,
      this.yaw,
      this.hx,
      this.hy,
      this.hr,
      this.lid,
      this.eyeS,
      this.open,
      this.wide,
      this.cy,
      this.cx,
      this.cs,
      this.asym,
      this.mx,
      this.my,
      this.mAmp,
      this.sleepyMorph,
      this.loadingMix,
      this.wavePulse,
    ];

    this.time = 0;
    this.acc = 0;
    this.last = performance.now();
    this.timers = [];
    this.gen = {};
    this.bl = {
      active: false,
      t: 0,
      dur: 0.32,
      hold: 0,
      min: 0.05,
      queue: 0,
      next: 2,
    };
    this.talking = false;
    this.talkNext = 0;
    this.roll = null;
    this.mouse = false;
    this.microPhase = 0;
    this.microSpeed = 1;
    this.expressionName = "neutral";
    this.stateName = null;
    this.hb = { x: 0, y: 0, rot: 0 };
    this._pm = null;
    this.gazeBias = [0, 0];
    this.acts = this._buildActions();
    this.st = STATES.idle;
    this.setState((initialState || "idle") as CharacterStateName);
    this._raf = (t: number) => this.frame(t);
    this._rafId = requestAnimationFrame(this._raf);
  }

  /* ---------- clock ---------- */
  frame(now: number) {
    const dt = clamp((now - this.last) / 1000, 0, 0.1);
    this.last = now;
    this.acc += dt;
    const h = 1 / 120;
    let n = 0;
    while (this.acc >= h && n < 24) {
      this.stepFixed(h);
      this.acc -= h;
      n++;
    }
    this.render();
    this._rafId = requestAnimationFrame(this._raf);
  }

  stepFixed(h: number) {
    this.time += h;
    this.microPhase += h * this.microSpeed;
    if (this.timers.length) {
      const due: Timer[] = [],
        rest: Timer[] = [];
      for (const tm of this.timers) (tm.at <= this.time ? due : rest).push(tm);
      if (due.length) {
        this.timers = rest;
        for (const tm of due) tm.fn();
      }
    }
    if (this.roll) {
      const p = (this.time - this.roll.t0) / this.roll.dur;
      if (p >= 1) {
        this.gx.set(this.roll.bx);
        this.gy.set(this.roll.by);
        this.gx.w = 11;
        this.gy.w = 11;
        this.roll = null;
      } else {
        const phi = Math.PI * 2 * smooth(p),
          r = 0.85 * Math.sin(Math.PI * p);
        this.gx.set(this.roll.bx + r * Math.sin(phi));
        this.gy.set(this.roll.by - r * Math.cos(phi));
      }
    }
    if (this.talking && this.time >= this.talkNext) {
      if (Math.random() < 0.13) {
        this.open.set(0.22);
        this.wide.set(0.95);
        this.talkNext = this.time + rand(0.22, 0.5);
      } else {
        const s = TALK_SHAPES[(Math.random() * TALK_SHAPES.length) | 0];
        this.open.set(s.o);
        this.wide.set(s.w);
        this.talkNext = this.time + rand(0.07, 0.19);
      }
    }
    const b = this.bl;
    if (b.active) {
      b.t += h;
      if (b.t >= b.dur + b.hold) {
        b.active = false;
        this.scheduleBlink();
        if (b.queue > 0) {
          b.queue--;
          this.after(0.13, () => this.startBlink(0.3));
        }
      }
    } else if (this.time >= b.next) {
      this.startBlink(this.st.blinkDur || 0.32);
    }
    for (const s of this.springs) s.step(h);
  }

  blinkVal() {
    const b = this.bl;
    if (!b.active) return 1;
    const closeD = b.dur * 0.42,
      openD = b.dur * 0.58;
    let t = b.t;
    if (t < closeD) return 1 - (1 - b.min) * smooth(t / closeD);
    t -= closeD;
    if (t < b.hold) return b.min;
    t -= b.hold;
    if (t < openD) return b.min + (1 - b.min) * smooth(t / openD);
    return 1;
  }

  /* ---------- scheduling ---------- */
  after(d: number, fn: () => void) {
    this.timers.push({ at: this.time + d, fn });
  }

  cancel(ch: string) {
    this.gen[ch] = (this.gen[ch] || 0) + 1;
  }

  seq(ch: string, steps: SequenceStep[], loop = false) {
    const gen = (this.gen[ch] = (this.gen[ch] || 0) + 1);
    const run = (i: number) => {
      if (this.gen[ch] !== gen) return;
      if (i >= steps.length) {
        if (loop) run(0);
        return;
      }
      const st = steps[i];
      if (st.do) st.do();
      const w = Array.isArray(st.wait)
        ? rand(st.wait[0], st.wait[1])
        : st.wait || 0;
      this.after(w, () => run(i + 1));
    };
    run(0);
  }

  loopEvents() {
    if (!this.st.events || !this.st.gap) return;
    const gap = this.st.gap,
      events = this.st.events;
    const gen = (this.gen.ev = (this.gen.ev || 0) + 1);
    const tick = () => {
      if (gen !== this.gen.ev) return;
      const fn = this.acts[wpick(events)];
      if (fn) fn();
      this.after(rand(gap[0], gap[1]), tick);
    };
    this.after(rand(gap[0] * 0.5, gap[1] * 0.7), tick);
  }

  _buildActions(): Record<string, () => void> {
    return {
      gazeShift: () => {
        if (this.mouse) return;
        const b = this.gazeBias;
        this.seq("gaze", [
          {
            do: () =>
              this.gazeTo(b[0] + rand(-0.35, 0.35), b[1] + rand(-0.25, 0.25)),
            wait: [0.8, 2.2],
          },
          {
            do: () => {
              if (Math.random() < 0.7) this.gazeTo(b[0], b[1]);
            },
          },
        ]);
      },
      gazeShiftDown: () => {
        if (this.mouse) return;
        const b = this.gazeBias;
        this.seq("gaze", [
          {
            do: () =>
              this.gazeTo(
                b[0] + rand(-0.25, 0.25),
                clamp(b[1] + rand(0, 0.2), -1, 1)
              ),
            wait: [1, 2.5],
          },
          { do: () => this.gazeTo(b[0], b[1]) },
        ]);
      },
      glance: () => {
        if (this.mouse) return;
        const s = Math.random() < 0.5 ? -1 : 1,
          b = this.gazeBias;
        this.seq("gaze", [
          { do: () => this.gazeTo(0.55 * s, b[1]), wait: [0.6, 1.4] },
          { do: () => this.gazeTo(b[0], b[1]) },
        ]);
      },
      headDrift: () =>
        this.headPulse(
          { rot: rand(-3.5, 3.5), x: rand(-1.4, 1.4), y: rand(-0.8, 0.8) },
          rand(1, 2.2)
        ),
      nodOnce: () => this.nod(),
      doubleBlink: () => this.doubleBlink(),
      slowBlink: () => this.slowBlink(),
      microSmile: () => {
        if (this.expressionName !== "neutral" || this.talking) return;
        this.seq("mouth", [
          { do: () => this.setExpression("smallSmile", false), wait: [1.2, 2] },
          { do: () => this.setExpression("neutral", false) },
        ]);
      },
      smilePulse: () =>
        this.seq("mouth", [
          { do: () => this.setExpression("bigSmile", false), wait: [0.9, 1.6] },
          { do: () => this.setExpression("smile", false) },
        ]),
      eyeRoll: () => this.eyeRoll(),
      bounce: () =>
        this.seq("head", [
          { do: () => this.hy.set(this.hb.y - 2), wait: 0.16 },
          { do: () => this.hy.set(this.hb.y) },
        ]),
      sigh: () =>
        this.seq("head", [
          { do: () => this.hy.set(this.hb.y + 1.4), wait: [1, 1.6] },
          { do: () => this.hy.set(this.hb.y) },
        ]),
      surprisedPulse: () => {
        if (this.stateName !== "surprised" || this.talking) return;
        const e = EXPR.surprised;
        const baseOpen = e.open ?? 1,
          baseWide = e.wide ?? 1;
        const baseMy = e.my ?? 0,
          baseEye = (this.st?.eye ?? 1) * (e.eye ?? 1);
        if (Math.random() < 0.2)
          this.after(rand(0.04, 0.12), () => this.startBlink(rand(0.24, 0.32)));
        this.seq("surprisePulse", [
          {
            do: () => {
              this.open.set(baseOpen * rand(1.08, 1.16));
              this.wide.set(baseWide * rand(0.91, 0.97));
              this.my.set(baseMy + rand(-0.5, -0.2));
              this.eyeS.set(baseEye * rand(1.03, 1.08));
            },
            wait: [0.16, 0.24],
          },
          {
            do: () => {
              this.open.set(baseOpen);
              this.wide.set(baseWide);
              this.my.set(baseMy);
              this.eyeS.set(baseEye);
            },
            wait: [0.24, 0.36],
          },
        ]);
      },
      longClose: () => this.startBlink(1.0, rand(0.2, 0.5), 0.04),
      swaySlow: () => this.headPulse({ rot: rand(-2.5, 2.5) }, rand(1.5, 2.8)),
      /* Natural up/down listening nod — hy drives face-plate TY directly. */
      talkingRotate: () => {
        if (!this.talking) return;
        const dir = Math.random() < 0.5 ? -1 : 1;
        this.seq("head", [
          {
            do: () => this.hr.set(this.hb.rot + dir * rand(1.2, 2.2)),
            wait: [0.25, 0.55],
          },
          { do: () => this.hr.set(this.hb.rot) },
        ]);
      },
      excitedRotate: () => {
        if (this.stateName !== "excited") return;
        const dir = Math.random() < 0.5 ? -1 : 1;
        this.seq("head", [
          {
            do: () => {
              this.hy.set(this.hb.y - 1.5);
              this.hr.set(this.hb.rot + dir * 2.5);
            },
            wait: 0.12,
          },
          {
            do: () => {
              this.hy.set(this.hb.y);
              this.hr.set(this.hb.rot - dir * 1.2);
            },
            wait: 0.14,
          },
          {
            do: () => {
              this.hy.set(this.hb.y + 0.6);
              this.hr.set(this.hb.rot + dir * 0.8);
            },
            wait: 0.1,
          },
          {
            do: () => {
              this.hy.set(this.hb.y);
              this.hr.set(this.hb.rot);
            },
          },
        ]);
      },
      /* Slow mournful left/right sway for sad state */
      sadSway: () => {
        if (this.stateName !== "sad") return;
        const dir = Math.random() < 0.5 ? -1 : 1;
        const amt = rand(3.5, 5.5);
        this.seq("head", [
          {
            do: () => {
              this.hr.set(this.hb.rot + dir * amt);
              this.yaw.set(dir * 0.09);
            },
            wait: [1.0, 1.6],
          },
          {
            do: () => {
              this.hr.set(this.hb.rot);
              this.yaw.set(0);
            },
            wait: [0.8, 1.2],
          },
          {
            do: () => {
              this.hr.set(this.hb.rot - dir * amt * 0.6);
              this.yaw.set(-dir * 0.05);
            },
            wait: [1.0, 1.5],
          },
          {
            do: () => {
              this.hr.set(this.hb.rot);
              this.yaw.set(0);
            },
          },
        ]);
      },
      /* Slow, deliberate 2-beat listening nod — natural human understanding response */
      listeningNod: () => {
        if (this.stateName !== "listening") return;
        const depth = rand(2.2, 2.8);
        const tilt = rand(-1.5, 1.5);
        const prev = this.expressionName;
        this.seq("head", [
          {
            do: () => {
              this.hy.set(this.hb.y + depth);
              this.hr.set(this.hb.rot + tilt);
              this.setExpression("smile", false);
            },
            wait: [0.28, 0.36],
          },
          { do: () => this.hy.set(this.hb.y - 0.25), wait: [0.18, 0.24] },
          {
            do: () => {
              this.hy.set(this.hb.y + depth * 0.65);
              this.hr.set(this.hb.rot + tilt * 0.5);
            },
            wait: [0.26, 0.32],
          },
          {
            do: () => {
              this.hy.set(this.hb.y);
              this.hr.set(this.hb.rot);
              this.setExpression(prev, false);
            },
          },
        ]);
      },
      switchSide: () => {
        this.thinkSide = -(this.thinkSide || 1);
        const s = this.thinkSide;
        if (!this.mouse) this.gazeTo(0.45 * s, this.gazeBias[1]);
        this.hb.rot = 5 * s;
        this.hr.set(this.hb.rot);
      },
      listeningMouthShift: () => {
        if (this.talking) return;
        const nextExpr = wpick([
          [5, "smallSmile"],
          [3, "neutral"],
          [1, "worried"],
        ]) as ExpressionName;
        this.seq("mouth", [
          {
            do: () => {
              this.setExpression(nextExpr, false);
              this.open.set(rand(0.94, 1.14));
              this.wide.set(rand(0.93, 1.05));
              this.cy.set(rand(-0.1, 0.35));
            },
            wait: [1, 1.9],
          },
          { do: () => this.setExpression("smallSmile", false) },
        ]);
      },
    };
  }

  loadingLoop() {
    this.seq(
      "loop",
      [
        {
          do: () => this.gazeTo(-0.55 + rand(-0.08, 0.08), rand(-0.1, 0.05)),
          wait: [0.5, 0.9],
        },
        { do: () => this.gazeTo(0, 0), wait: [0.25, 0.5] },
        { do: () => this.startBlink(0.3), wait: [0.35, 0.6] },
        {
          do: () => this.gazeTo(0.55 + rand(-0.08, 0.08), rand(-0.1, 0.05)),
          wait: [0.5, 0.9],
        },
        { do: () => this.gazeTo(0, 0), wait: [0.25, 0.45] },
      ],
      true
    );
  }

  surprisedLoop() {
    const expr = EXPR.surprised;
    const baseOpen = expr.open ?? 2;
    const baseWide = expr.wide ?? 0.52;
    const baseMy = expr.my ?? -3.2;
    const baseEye = (this.st?.eye ?? 1) * (expr.eye ?? 1);
    this.seq(
      "loop",
      [
        {
          do: () => {
            this.open.set(baseOpen * rand(1.07, 1.14));
            this.wide.set(baseWide * rand(0.9, 0.97));
            this.my.set(baseMy + rand(-0.5, -0.1));
            this.eyeS.set(baseEye * rand(1.04, 1.08));
          },
          wait: [0.18, 0.26],
        },
        {
          do: () => {
            this.open.set(baseOpen);
            this.wide.set(baseWide);
            this.my.set(baseMy);
            this.eyeS.set(baseEye);
          },
          wait: [1.3, 2.2],
        },
      ],
      true
    );
  }
  confusedLoop() {
    this.seq(
      "loop",
      [
        {
          do: () => {
            this.gazeTo(-0.6, -0.1);
            this.hb.rot = -5;
            this.hr.set(-5);
            this.yaw.set(-0.25);
          },
          wait: [0.9, 1.5],
        },
        {
          do: () => {
            this.gazeTo(0.6, -0.1);
            this.hb.rot = 5;
            this.hr.set(5);
            this.yaw.set(0.25);
          },
          wait: [0.9, 1.5],
        },
        {
          do: () => {
            this.gazeTo(0.1, 0);
            this.hb.rot = rand(-7, 7);
            this.hr.set(this.hb.rot);
            this.yaw.set(0);
            if (Math.random() < 0.5) this.startBlink(0.3);
          },
          wait: [0.8, 1.4],
        },
      ],
      true
    );
  }

  /* ---------- state manager ---------- */
  setState(name: CharacterStateName) {
    const st = STATES[name];
    if (!st) return;
    this.stateName = name;
    this.st = st;
    this.cancel("ev");
    this.cancel("loop");
    this.cancel("gaze");
    this.cancel("head");
    this.cancel("mouth");
    this.cancel("surprisePulse");
    this.timers = [];
    this.bl.queue = 0;
    this.thinkSide = undefined;
    this.roll = null;
    this.hb = {
      x: st.head?.x || 0,
      y: st.head?.y || 0,
      rot: st.head?.rot || 0,
    };
    this.hx.set(this.hb.x);
    this.hy.set(this.hb.y);
    this.hr.set(this.hb.rot);
    this.yaw.set(0);
    this.sleepyMorph.set(name === "sleepy" ? 1 : 0);
    this.loadingMix.set(name === "loading" ? 1 : 0);
    this.wavePulse.set(name === "listening" ? 1 : 0);
    if (name === "writing") this.writingT0 = this.time;
    this.gazeBias = st.gaze || [0, 0];
    if (!this.mouse) this.gazeTo(this.gazeBias[0], this.gazeBias[1]);
    this.setExpression(st.expr || "neutral", false);
    if (st.talk && !this.talking) this.startTalking(false);
    else if (!st.talk && this.talking) this.stopTalking(false);
    this.mAmp.set(st.micro?.amp ?? 0.5);
    this.microSpeed = st.micro?.speed ?? 1;
    this.scheduleBlink();
    if (st.enter) st.enter(this);
    if (st.loop === "loadingLoop") this.loadingLoop();
    else if (st.loop === "confusedLoop") this.confusedLoop();
    else if (st.events) this.loopEvents();
    if (this.onChange) this.onChange();
  }

  setExpression(name: ExpressionName, notify = true) {
    const E = EXPR[name];
    if (!E) return;
    if (notify) this.cancel("mouth");
    this.expressionName = name;
    this.cy.set(E.cy || 0);
    this.cx.set(E.cx || 0);
    this.cs.set(E.cs ?? 1);
    this.asym.set(E.asym || 0);
    this.mx.set(E.mx || 0);
    this.my.set(E.my || 0);
    if (this.talking) this.cs.set(0);
    if (!this.talking) {
      this.open.set(E.open ?? 1);
      this.wide.set(E.wide ?? 1);
    }
    this.eyeS.set((this.st?.eye ?? 1) * (E.eye ?? 1));
    this.lid.set((this.st?.lid ?? 1) * (E.lid ?? 1));
    if (notify && this.onChange) this.onChange();
  }

  /* ---------- blink ---------- */
  scheduleBlink() {
    const r = this.st?.blink || [2.5, 6];
    this.bl.next = this.time + rand(r[0], r[1]);
  }
  startBlink(dur = 0.32, hold = 0, min = 0.05) {
    const b = this.bl;
    if (b.active) {
      b.queue++;
      return;
    }
    b.active = true;
    b.t = 0;
    b.dur = dur;
    b.hold = hold;
    b.min = min;
  }
  blink() {
    this.startBlink(0.32);
  }
  doubleBlink() {
    this.startBlink(0.3);
    this.bl.queue = Math.max(this.bl.queue, 1);
  }
  slowBlink() {
    this.startBlink(0.85, 0.12, 0.04);
  }

  /* ---------- gaze ---------- */
  gazeTo(x: number, y: number) {
    this.gx.set(clamp(x, -1, 1));
    this.gy.set(clamp(y, -1, 1));
  }
  look(dir: string) {
    const d = DIRS[dir as DirectionName];
    if (d) {
      this.cancel("gaze");
      this.gazeTo(d[0], d[1]);
    }
  }
  setGazeTarget(o: { x: number; y: number }) {
    this.cancel("gaze");
    this.gazeTo(o.x, o.y);
  }
  eyeRoll() {
    this.cancel("gaze");
    this.roll = { t0: this.time, dur: 1.5, bx: this.gx.t, by: this.gy.t };
    this.gx.w = 16;
    this.gy.w = 16;
  }

  /* ---------- head ---------- */
  headPulse(d: Partial<HeadBase>, hold: number) {
    this.seq("head", [
      {
        do: () => {
          if (d.rot != null) this.hr.set(this.hb.rot + d.rot);
          if (d.x != null) this.hx.set(this.hb.x + d.x);
          if (d.y != null) this.hy.set(this.hb.y + d.y);
        },
        wait: hold,
      },
      {
        do: () => {
          this.hr.set(this.hb.rot);
          this.hx.set(this.hb.x);
          this.hy.set(this.hb.y);
        },
      },
    ]);
  }
  nod() {
    this.seq("head", [
      { do: () => this.hy.set(this.hb.y + 3), wait: 0.18 },
      { do: () => this.hy.set(this.hb.y) },
    ]);
  }
  doubleNod() {
    this.seq("head", [
      { do: () => this.hy.set(this.hb.y + 3), wait: 0.18 },
      { do: () => this.hy.set(this.hb.y - 0.4), wait: 0.2 },
      { do: () => this.hy.set(this.hb.y + 2.6), wait: 0.18 },
      { do: () => this.hy.set(this.hb.y) },
    ]);
  }
  shakeHead() {
    this.seq("head", [
      {
        do: () => {
          this.yaw.set(-0.6);
          this.hx.set(this.hb.x - 1.5);
        },
        wait: 0.22,
      },
      {
        do: () => {
          this.yaw.set(0.6);
          this.hx.set(this.hb.x + 1.5);
        },
        wait: 0.22,
      },
      {
        do: () => {
          this.yaw.set(-0.3);
          this.hx.set(this.hb.x - 0.8);
        },
        wait: 0.2,
      },
      {
        do: () => {
          this.yaw.set(0);
          this.hx.set(this.hb.x);
        },
      },
    ]);
  }
  tiltLeft() {
    this.headPulse({ rot: -7 }, 1.3);
  }
  tiltRight() {
    this.headPulse({ rot: 7 }, 1.3);
  }
  /* Triple down-nod with spring rebound — human "yes" */
  yesNod() {
    const prev = this.expressionName;
    this.seq("head", [
      {
        do: () => {
          this.hy.set(this.hb.y + 4.0);
          this.setExpression("smile", false);
        },
        wait: 0.22,
      },
      { do: () => this.hy.set(this.hb.y - 0.9), wait: 0.18 },
      { do: () => this.hy.set(this.hb.y + 3.2), wait: 0.2 },
      { do: () => this.hy.set(this.hb.y - 0.6), wait: 0.17 },
      { do: () => this.hy.set(this.hb.y + 2.0), wait: 0.19 },
      {
        do: () => {
          this.hy.set(this.hb.y);
          this.setExpression(prev, false);
        },
      },
    ]);
  }
  /* Fast decaying left-right shake with eye blinks — human "no" */
  noShake() {
    const prev = this.expressionName;
    this.setExpression("worried", false);
    this.startBlink(0.18);
    this.seq("head", [
      {
        do: () => {
          this.hr.set(this.hb.rot - 5.5);
          this.yaw.set(-0.18);
        },
        wait: 0.1,
      },
      {
        do: () => {
          this.hr.set(this.hb.rot + 5.5);
          this.yaw.set(0.18);
        },
        wait: 0.1,
      },
      {
        do: () => {
          this.hr.set(this.hb.rot - 4.5);
          this.yaw.set(-0.14);
          this.startBlink(0.2);
        },
        wait: 0.1,
      },
      {
        do: () => {
          this.hr.set(this.hb.rot + 4.5);
          this.yaw.set(0.14);
        },
        wait: 0.1,
      },
      {
        do: () => {
          this.hr.set(this.hb.rot - 2.5);
          this.yaw.set(-0.08);
        },
        wait: 0.1,
      },
      {
        do: () => {
          this.hr.set(this.hb.rot + 1.5);
          this.yaw.set(0.05);
          this.startBlink(0.18);
        },
        wait: 0.1,
      },
      {
        do: () => {
          this.hr.set(this.hb.rot);
          this.yaw.set(0);
          this.setExpression(prev, false);
        },
      },
    ]);
  }
  nodUp() {
    this.seq("head", [
      { do: () => this.hy.set(this.hb.y - 3), wait: 0.8 },
      { do: () => this.hy.set(this.hb.y) },
    ]);
  }
  // hr ≈ -5.38 → fpTX ≈ +7; hy ≈ ±1.77 → fpTY ≈ ±5 — matches diagonal nodding SVG keyframes
  nodTopLeft() {
    this.headPulse({ rot: -5.38, y: -1.77 }, 0.8);
  }
  nodTopRight() {
    this.headPulse({ rot: 5.38, y: -1.77 }, 0.8);
  }
  nodBottomLeft() {
    this.headPulse({ rot: -5.38, y: 1.77 }, 0.8);
  }
  nodBottomRight() {
    this.headPulse({ rot: 5.38, y: 1.77 }, 0.8);
  }

  /* ---------- expressions (convenience) ---------- */
  smile() {
    this.setExpression("smile");
  }
  smallSmile() {
    this.setExpression("smallSmile");
  }
  bigSmile() {
    this.setExpression("bigSmile");
  }
  sad() {
    this.setExpression("sad");
  }
  worried() {
    this.setExpression("worried");
  }
  surprised() {
    this.setExpression("surprised");
  }
  think() {
    this.setExpression("thinking");
  }
  confusedFace() {
    this.setExpression("confused");
  }

  /* ---------- talking ---------- */
  startTalking(notify = true) {
    if (this.talking) return;
    this.talking = true;
    this.talkNext = this.time;
    this.cs.set(0);
    this._ow = [this.open.w, this.wide.w];
    this.open.w = 24;
    this.wide.w = 20;
    if (notify && this.onChange) this.onChange();
  }
  stopTalking(notify = true) {
    if (!this.talking) return;
    this.talking = false;
    if (this._ow) {
      this.open.w = this._ow[0];
      this.wide.w = this._ow[1];
    }
    const E = EXPR[this.expressionName];
    this.open.set(E.open ?? 1);
    this.wide.set(E.wide ?? 1);
    this.cs.set(E.cs ?? 1);
    if (notify && this.onChange) this.onChange();
  }

  reset() {
    this.stopTalking(false);
    this.setState("idle");
  }

  /* ---------- pointer tracking ---------- */
  setMouseTracking(on: boolean) {
    this.mouse = !!on;
    if (on && !this._pm) {
      this._pm = (e: PointerEvent) => {
        const r = this.svg.getBoundingClientRect();
        const nx = clamp(
          (e.clientX - (r.left + r.width / 2)) / (r.width / 2),
          -1,
          1
        );
        const ny = clamp(
          (e.clientY - (r.top + r.height / 2)) / (r.height / 2),
          -1,
          1
        );
        /* Gaze follows cursor with safety margin to prevent edge compression */
        this.gazeTo(nx * 0.35, ny * 0.35);
        this.hr.set(this.hb.rot - nx * 6.0);
        this.hy.set(this.hb.y + ny * 2.0);
        this.yaw.set(-nx * 0.18);
      };
      window.addEventListener("pointermove", this._pm);
    } else if (!on && this._pm) {
      window.removeEventListener("pointermove", this._pm);
      this._pm = null;
      this.gazeTo(this.gazeBias[0], this.gazeBias[1]);
      this.hr.set(this.hb.rot);
      this.hy.set(this.hb.y);
      this.yaw.set(0);
    }
  }

  /* ---------- renderer                                                     */
  /*                                                                         */
  /* Key difference from CharacterEngine: instead of rotating/translating   */
  /* the head group, we translate the face-plate group to show nodding.     */
  /*                                                                         */
  /* Face-plate TX/TY are derived from hr + yaw + hx / hy springs,         */
  /* scaled to match the Filly-New-Series keyframe nodding positions:        */
  /*   ±9 SVG units horizontal (left/right nod)                             */
  /*   ±8.5 SVG units vertical  (up/down nod)                               */
  /* -------------------------------------------------------------------- */
  render() {
    const G = FILLY_GEOM;
    const ph = this.microPhase,
      a = this.mAmp.x;
    const mX = a * 0.55 * (Math.sin(ph * 1.1) + 0.4 * Math.sin(ph * 2.3 + 1.7));
    const mY =
      a * 0.45 * (Math.sin(ph * 0.9 + 0.8) + 0.4 * Math.sin(ph * 2.1 + 0.3));
    const mR = a * 0.7 * Math.sin(ph * 0.65 + 2);

    /* Face-plate translation — maps spring values to nodding positions.
       Negation on X: hr < 0 (tilt left) → face plate shifts right (+x),
       matching the Filly-New-Series left-nod where inner panel goes right. */
    let fpTY = this.hy.x * FP.HY + mY;
    if (this.talking) fpTY += (1 - this.open.x) * 0.5;
    const fpTX = clamp(
      -(this.hr.x * FP.HR + this.yaw.x * FP.YAW + this.hx.x * FP.HX) +
        mX +
        mR * FP.HR,
      -FP.MAX_TX,
      FP.MAX_TX
    );
    const fpTYc = clamp(fpTY, -FP.MAX_TY, FP.MAX_TY);

    /* Whole-head rotation: hr drives both face-plate translate and a subtle head rotate.
       Mask holes carry the same rotation so the cutout stays aligned with the shell. */
    const headRotDeg = this.hr.x * 0.5 + mR * 0.6;
    this.head.setAttribute(
      "transform",
      `rotate(${headRotDeg.toFixed(2)} ${G.CX} ${G.CY})`
    );
    if (this.shell) {
      this.shell.setAttribute(
        "transform",
        `translate(${(-fpTX * 0.35).toFixed(2)} ${(-fpTYc * 0.28).toFixed(2)})`
      );
    }
    if (this.faceplate) {
      this.faceplate.setAttribute(
        "transform",
        `translate(${fpTX.toFixed(2)} ${fpTYc.toFixed(2)})`
      );
    }
    if (this.maskFace) {
      this.maskFace.setAttribute(
        "transform",
        this.stateName === "writing"
          ? `rotate(0 ${G.CX} ${G.CY})`
          : `rotate(${headRotDeg.toFixed(2)} ${G.CX} ${G.CY}) translate(${fpTX.toFixed(2)} ${fpTYc.toFixed(2)})`
      );
    }
    this.face.setAttribute("transform", "translate(0 0)");

    /* Gaze: eyes lead the nod (above face center, larger arc) */
    const rawGx = this.gx.x * G.RX;
    const rawGy = this.gy.x * G.RY;
    this.eyesG.setAttribute(
      "transform",
      `translate(${(rawGx + fpTX * 0.1).toFixed(2)} ${(rawGy + fpTYc * 0.1).toFixed(2)})`
    );

    /* Eye blink/scale — flat art style: uniform x-scale, no yaw squeeze */
    const openV = clamp(this.lid.x, 0.02, 1.15) * this.blinkVal();
    const es = this.eyeS.x;
    const sy = Math.max(0.045, es * openV);
    const esx = Math.max(0.1, es);
    this.eyeL.setAttribute(
      "transform",
      `translate(${G.ELX} ${G.ELY}) scale(${esx.toFixed(3)} ${sy.toFixed(3)}) translate(${-G.ELX} ${-G.ELY})`
    );
    this.eyeR.setAttribute(
      "transform",
      `translate(${G.ERX} ${G.ERY}) scale(${esx.toFixed(3)} ${sy.toFixed(3)}) translate(${-G.ERX} ${-G.ERY})`
    );

    /* Mouth: chin resists the nod slightly (closer to neck pivot, shorter arc) */
    const mtx = rawGx * 0.28 + this.mx.x;
    const mty = this.my.x + rawGy * 0.18;
    this.mouthG.setAttribute(
      "transform",
      `translate(${(mtx + fpTX * 0.04).toFixed(2)} ${(mty - fpTYc * 0.05).toFixed(2)})`
    );

    const sleepyBlend = clamp(this.sleepyMorph.x, 0, 1);
    const sleepyMouthY = 1 - 0.22 * sleepyBlend;
    const ow = Math.max(0.06, this.open.x) * sleepyMouthY;
    const ww = Math.max(0.2, this.wide.x);
    const barAY = ow > 1 ? G.MBY_TOP : G.MBY;
    const csv = Math.max(0, this.cs.x);
    const sleepyCornerY = 1 - 0.38 * sleepyBlend;
    const cornerScaleY = csv * sleepyCornerY;
    const cvis = csv < 0.04 ? "hidden" : "visible";
    const lty = this.cy.x - this.asym.x;
    const rty = this.cy.x + this.asym.x;
    const cornerBottomY = G.MBY_TOP + 0.01;
    const loadingMix = clamp(this.loadingMix.x, 0, 1);
    const isLoading = loadingMix > 0.001;
    const isWriting = this.stateName === "writing";
    const loadH = G.MBH,
      loadGap = G.MBW * 0.05;
    const loadSideW = loadH,
      loadMidW = loadSideW * 2;
    const loadLayoutW = loadSideW * 2 + loadMidW + loadGap * 2;
    const loadX0 = G.MBX - loadLayoutW / 2,
      loadY = G.MBY - loadH / 2;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const blend = loadingMix;

    const barBaseX = G.MBX - G.MBW / 2;
    const normalBarX = G.MBX + (barBaseX - G.MBX) * ww;
    const normalBarY = barAY + (G.MBY_TOP - barAY) * ow;
    const normalBarW = G.MBW * ww,
      normalBarH = G.MBH * ow;
    const normalLeftX = G.MLX + (-G.EW / 2) * csv + -this.cx.x;
    const normalRightX = G.MRX + (-G.EW / 2) * csv + this.cx.x;
    const normalCornerW = G.EW * csv;
    /* Corner height is fixed at default bar height — only visibility (cs) changes it */
    const normalCornerH = G.MBH * cornerScaleY;
    const normalLeftY = cornerBottomY - normalCornerH + lty;
    const normalRightY = cornerBottomY - normalCornerH + rty;

    this.mL.setAttribute("transform", "none");
    this.bar.setAttribute("transform", "none");
    this.mR.setAttribute("transform", "none");
    this.mL.setAttribute("x", lerp(normalLeftX, loadX0, blend).toFixed(2));
    this.mL.setAttribute("y", lerp(normalLeftY, loadY, blend).toFixed(2));
    this.mL.setAttribute(
      "width",
      lerp(normalCornerW, loadSideW, blend).toFixed(2)
    );
    this.mL.setAttribute(
      "height",
      lerp(normalCornerH, loadH, blend).toFixed(2)
    );
    this.bar.setAttribute(
      "x",
      lerp(normalBarX, loadX0 + loadSideW + loadGap, blend).toFixed(2)
    );
    this.bar.setAttribute("y", lerp(normalBarY, loadY, blend).toFixed(2));
    this.bar.setAttribute(
      "width",
      lerp(normalBarW, loadMidW, blend).toFixed(2)
    );
    this.bar.setAttribute("height", lerp(normalBarH, loadH, blend).toFixed(2));
    this.mR.setAttribute(
      "x",
      lerp(
        normalRightX,
        loadX0 + loadSideW + loadGap + loadMidW + loadGap,
        blend
      ).toFixed(2)
    );
    this.mR.setAttribute("y", lerp(normalRightY, loadY, blend).toFixed(2));
    this.mR.setAttribute(
      "width",
      lerp(normalCornerW, loadSideW, blend).toFixed(2)
    );
    this.mR.setAttribute(
      "height",
      lerp(normalCornerH, loadH, blend).toFixed(2)
    );

    /* Loading shimmer */
    const phase = (this.time * 2.3) % 3;
    const glow = (i: number) => {
      const d = Math.abs(phase - i);
      return Math.max(0, 1 - Math.min(d, 3 - d));
    };
    const base = 0.22,
      span = 0.78;
    this.mL.setAttribute(
      "opacity",
      (1 - blend + (base + glow(0) * span) * blend).toFixed(3)
    );
    this.bar.setAttribute(
      "opacity",
      (1 - blend + (base + glow(1) * span) * blend).toFixed(3)
    );
    this.mR.setAttribute(
      "opacity",
      (1 - blend + (base + glow(2) * span) * blend).toFixed(3)
    );

    this.bar.setAttribute("visibility", isWriting ? "hidden" : "visible");
    this.mL.setAttribute(
      "visibility",
      isWriting ? "hidden" : isLoading ? "visible" : cvis
    );
    this.mR.setAttribute(
      "visibility",
      isWriting ? "hidden" : isLoading ? "visible" : cvis
    );
    this.face.setAttribute("visibility", isWriting ? "hidden" : "visible");
    this.eyesG.setAttribute("visibility", isWriting ? "hidden" : "visible");
    if (this.nose)
      this.nose.setAttribute("visibility", isWriting ? "hidden" : "visible");
    if (this.shell)
      this.shell.setAttribute("visibility", isWriting ? "hidden" : "visible");

    /* Writing stroke animation */
    if (this.wG && this.wP) {
      this.wG.setAttribute("visibility", isWriting ? "visible" : "hidden");
      if (isWriting) {
        const spec = WRITING_STROKE;
        if (this.wP.getAttribute("d") !== spec.d) {
          this.wP.setAttribute("d", spec.d);
          try {
            this.wLen = this.wP.getTotalLength();
          } catch {
            this.wLen = 700;
          }
        }
        const len = this.wLen > 0 ? this.wLen : 700;
        const seg = len * spec.segmentRatio,
          gap = Math.max(1, len - seg);
        const baseSpeed = len * spec.speedRatio;
        const omega = 2 * Math.PI * spec.easeHz;
        const wt = Math.max(0, this.time - this.writingT0);
        const easedTravel =
          baseSpeed * wt +
          ((baseSpeed * spec.easeAmount) / omega) * Math.sin(omega * wt);
        this.wG.setAttribute("transform", writingStrokeTransform(spec));
        this.wP.setAttribute("stroke-width", String(spec.stroke));
        this.wP.setAttribute(
          "stroke-dasharray",
          `${seg.toFixed(2)} ${gap.toFixed(2)}`
        );
        this.wP.setAttribute(
          "stroke-dashoffset",
          (-(easedTravel % len)).toFixed(2)
        );
        this.wP.setAttribute("stroke-opacity", "0.98");
      }
    }

    /* Listening audio wave: inner arc leads ripple outward — 3-arc stagger over 1.3s period */
    const wBase = clamp(this.wavePulse.x, 0, 1);
    const animateWave = (
      el: SVGGraphicsElement,
      paths: SVGElement[],
      tOffset: number
    ) => {
      el.setAttribute("visibility", wBase > 0.02 ? "visible" : "hidden");
      if (wBase <= 0.02) return;
      el.setAttribute("opacity", wBase.toFixed(3));
      const period = 1.3;
      const ph = ((this.time + tOffset) % period) / period;
      // paths[2]=inner leads, paths[1]=middle, paths[0]=outer lags by 20% each
      const pulse = (start: number) => {
        const t = (ph - start + 1) % 1;
        return t < 0.35 ? Math.sin((Math.PI * t) / 0.35) : 0;
      };
      if (paths[0]) paths[0].setAttribute("opacity", pulse(0.4).toFixed(3));
      if (paths[1]) paths[1].setAttribute("opacity", pulse(0.2).toFixed(3));
      if (paths[2]) paths[2].setAttribute("opacity", pulse(0).toFixed(3));
    };
    if (this.waveL) animateWave(this.waveL, this.waveLPaths, 0);
    if (this.waveR) animateWave(this.waveR, this.waveRPaths, 0);
  }

  destroy() {
    cancelAnimationFrame(this._rafId);
    if (this._pm) window.removeEventListener("pointermove", this._pm);
    this.cancel("ev");
    this.cancel("loop");
    this.cancel("gaze");
    this.cancel("head");
    this.cancel("mouth");
    this.cancel("surprisePulse");
    this.timers = [];
  }
}

/* ------------------------------------------------------------------ */
/* React component                                                     */
/* ------------------------------------------------------------------ */

export const FILLY_CHARACTER_STATES = [
  "idle",
  "listening",
  "talking",
  "writing",
  "thinking",
  "loading",
  "happy",
  "sad",
  "surprised",
  "confused",
  "excited",
  "sleepy",
] as const;

export type CareFillyState = (typeof FILLY_CHARACTER_STATES)[number];

export interface CareFillyHandle {
  setState: (state: CareFillyState) => void;
  look: (dir: string) => void;
  setGazeTarget: (target: { x: number; y: number }) => void;
  blink: () => void;
  doubleBlink: () => void;
  slowBlink: () => void;
  eyeRoll: () => void;
  nod: () => void;
  yesNod: () => void;
  noShake: () => void;
  nodUp: () => void;
  nodTopLeft: () => void;
  nodTopRight: () => void;
  nodBottomLeft: () => void;
  nodBottomRight: () => void;
  doubleNod: () => void;
  shakeHead: () => void;
  tiltLeft: () => void;
  tiltRight: () => void;
  setExpression: (name: string) => void;
  startTalking: () => void;
  stopTalking: () => void;
  setMouseTracking: (on: boolean) => void;
  reset: () => void;
}

export interface CareFillyProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  /** Behavioral state preset. */
  state?: CareFillyState;
  /** When true, eyes follow the pointer. */
  mouseTracking?: boolean;
  /** CSS width for the character (e.g. "20px", "2rem"). Overrides the default size. */
  size?: string | number;
  /** CSS color for the character (e.g. "#3b82f6", "oklch(70% 0.2 250)"). Defaults to currentColor. */
  color?: string;
}

export const CareFilly = React.forwardRef<CareFillyHandle, CareFillyProps>(
  function AnimatedCharacterFilly(
    {
      state = "idle",
      mouseTracking = false,
      size,
      color,
      className,
      style,
      ...props
    },
    ref
  ) {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const engineRef = React.useRef<FillyEngine | null>(null);
    const maskId = `filly-mask-${React.useId().replace(/:/g, "")}`;

    React.useEffect(() => {
      if (!svgRef.current) return;
      const engine = new FillyEngine(svgRef.current, state);
      engineRef.current = engine;
      return () => {
        engine.destroy();
        engineRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      engineRef.current?.setState(state);
    }, [state]);
    React.useEffect(() => {
      engineRef.current?.setMouseTracking(mouseTracking);
    }, [mouseTracking]);

    React.useImperativeHandle(
      ref,
      () => ({
        setState: (s: CareFillyState) => engineRef.current?.setState(s),
        look: (dir: string) => engineRef.current?.look(dir),
        setGazeTarget: (t: { x: number; y: number }) =>
          engineRef.current?.setGazeTarget(t),
        blink: () => engineRef.current?.blink(),
        doubleBlink: () => engineRef.current?.doubleBlink(),
        slowBlink: () => engineRef.current?.slowBlink(),
        eyeRoll: () => engineRef.current?.eyeRoll(),
        yesNod: () => engineRef.current?.yesNod(),
        noShake: () => engineRef.current?.noShake(),
        nod: () => engineRef.current?.nod(),
        nodUp: () => engineRef.current?.nodUp(),
        nodTopLeft: () => engineRef.current?.nodTopLeft(),
        nodTopRight: () => engineRef.current?.nodTopRight(),
        nodBottomLeft: () => engineRef.current?.nodBottomLeft(),
        nodBottomRight: () => engineRef.current?.nodBottomRight(),
        doubleNod: () => engineRef.current?.doubleNod(),
        shakeHead: () => engineRef.current?.shakeHead(),
        tiltLeft: () => engineRef.current?.tiltLeft(),
        tiltRight: () => engineRef.current?.tiltRight(),
        setExpression: (name: string) =>
          engineRef.current?.setExpression(name as ExpressionName),
        startTalking: () => engineRef.current?.startTalking(),
        stopTalking: () => engineRef.current?.stopTalking(),
        setMouseTracking: (on: boolean) =>
          engineRef.current?.setMouseTracking(on),
        reset: () => engineRef.current?.reset(),
      }),
      []
    );

    return (
      <div
        className={cn("text-foreground", className)}
        style={color ? { color, ...style } : style}
        {...props}
      >
        {/*
        Filly-New-Series SVG structure.
        - shell:      static outer rounded body (data-part="shell")
        - face-plate: translates as a unit for nodding (data-part="face-plate")
          - face:       inner white cross-panel (data-part="face")
          - nose:       centre nose bridge rectangle
          - eyes:       gaze group
          - mouth-group: expressions / talking / loading / writing
      */}
        <svg
          ref={svgRef}
          viewBox="0 0 119.91 119.91"
          overflow="visible"
          role="img"
          aria-label="Filly"
          className={cn("block h-auto", size == null && "mx-auto w-24")}
          style={
            size != null
              ? {
                  width: typeof size === "number" ? `${size}px` : size,
                  height: "auto",
                }
              : undefined
          }
        >
          <defs>
            {/*
            SVG mask cutout: white = show shell, black = punch hole.
            data-part="mask-face" is translated each frame to match the face-plate
            position so the cutout moves with the nod animation.
          */}
            <mask id={maskId} maskUnits="userSpaceOnUse">
              <rect width="119.91" height="119.91" fill="white" />
              <g data-part="mask-face">
                <path
                  fill="black"
                  d="M88.9,28.31v11.12h6.48c-1.23-5.04-3.26-8.61-6.48-11.12Z"
                />
                <path
                  fill="black"
                  d="M24.53,39.43h6.48v-11.12c-3.22,2.51-5.25,6.08-6.48,11.12Z"
                />
                <path
                  fill="black"
                  d="M97.06,58.72h-8.16v-19.29h-19.3v19.29h-19.3v-19.29h-19.3v19.29h-8.16c0,.42-.01.81-.01,1.24,0,31.56,5.55,37.11,37.12,37.11s37.11-5.55,37.11-37.11c0-.43-.01-.82-.01-1.24Z"
                />
                <path
                  fill="black"
                  d="M69.6,23.09c-2.91-.17-6.1-.24-9.64-.24s-6.74.07-9.65.24v16.34h19.29v-16.34Z"
                />
              </g>
            </mask>
          </defs>

          <g data-part="head">
            {/* Shell with animated cutout — mask holes follow face-plate translate each frame */}
            <path
              data-part="shell"
              fill="currentColor"
              mask={`url(#${maskId})`}
              d="M108.2,42.17v13.79c0,1.52-1.23,2.75-2.76,2.75h-.38c0,.42.01.82.01,1.24,0,35.83-9.28,45.11-45.11,45.11S14.84,95.78,14.84,59.95c0-.42.01-.82.02-1.24h-.39c-1.52,0-2.76-1.23-2.76-2.75v-13.79c0-1.52,1.24-2.75,2.76-2.75h2.03c3.95-19.04,15.78-24.58,43.46-24.58s39.5,5.54,43.45,24.58h2.03c1.53,0,2.76,1.23,2.76,2.75Z"
            />

            {/* Left ear audio wave — left-bowing paths point outward from left ear */}
            <g data-part="wave-left" visibility="hidden">
              <svg
                viewBox="0 0 23.11 23.11"
                width="28"
                height="28"
                x="-9"
                y="34"
                fill="currentColor"
              >
                <path d="M12.03,22.41c-7.27-4.75-7.28-16.96,0-21.71-4.61,6.52-4.62,15.19,0,21.71h0Z" />
                <path d="M14.28,18.79c-2.64-4.58-2.63-9.89,0-14.47-5.27,2.74-5.27,11.73,0,14.47h0Z" />
                <path d="M16.53,15.17c-.66-2.57-.65-4.66,0-7.24-3.3.83-3.29,6.4,0,7.24h0Z" />
              </svg>
            </g>

            {/* Right ear audio wave — right-bowing paths point outward from right ear */}
            <g data-part="wave-right" visibility="hidden">
              <svg
                viewBox="0 0 23.11 23.11"
                width="28"
                height="28"
                x="101"
                y="34"
                fill="currentColor"
              >
                <path d="M11.08,22.41c4.62-6.52,4.61-15.19,0-21.71,7.28,4.75,7.27,16.96,0,21.71h0Z" />
                <path d="M8.83,18.79c5.27-2.74,5.27-11.73,0-14.47,2.63,4.58,2.64,9.89,0,14.47h0Z" />
                <path d="M6.58,15.17c3.29-.83,3.3-6.41,0-7.24.65,2.57.66,4.66,0,7.24h0Z" />
              </svg>
            </g>

            {/* Face plate — translates for nodding; eyes and mouth ride inside it */}
            <g data-part="face-plate">
              {/* Empty group — engine uses this for visibility/transform; cutout is on the mask */}
              <g data-part="face" />

              {/* Eyes — gaze-translated by engine on top of face-plate offset */}
              <g data-part="eyes">
                <rect
                  data-part="eye-left"
                  fill="currentColor"
                  x="36.73"
                  y="45.09"
                  width="8"
                  height="8"
                />
                <rect
                  data-part="eye-right"
                  fill="currentColor"
                  x="75.18"
                  y="45.09"
                  width="8"
                  height="8"
                />
              </g>

              {/* Mouth — expressions, talking, loading shimmer, writing stroke */}
              <g data-part="mouth-group">
                <rect
                  data-part="mouth-left"
                  fill="currentColor"
                  x="36.75"
                  y="70.5"
                  width="8"
                  height="8"
                />
                <rect
                  data-part="mouth-right"
                  fill="currentColor"
                  x="75.15"
                  y="70.5"
                  width="8"
                  height="8"
                />
                <rect
                  data-part="mouth"
                  fill="currentColor"
                  x="44.75"
                  y="78.5"
                  width="30.4"
                  height="8"
                />
                <g data-part="writing-stroke" visibility="hidden">
                  <path
                    data-part="writing-line"
                    d={WRITING_PATH_D}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity="0.95"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }
);
