/**
 * @name animated-character
 * @description Spring-driven animated AI character with state presets, gaze, blinking, talking and head movement
 * @type registry:ui
 */
import * as React from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Animation engine                                                    */
/* Architecture (adapted from the GrokBot prototype):                  */
/*   STATE -> TIMERS/EVENTS -> TARGET VALUES -> SPRINGS -> SVG FRAME   */
/* Every frame is computed absolutely from base geometry: no transform */
/* accumulation, no drift. Runs on requestAnimationFrame with a fixed  */
/* 120 Hz spring timestep and delta clamping, outside the React render */
/* cycle (direct SVG attribute updates).                               */
/* ------------------------------------------------------------------ */
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
const wpick = (pairs: ReadonlyArray<readonly [number, string]>) => {
  let total = 0;
  for (const pair of pairs) total += pair[0];

  let r = Math.random() * total;
  for (const pair of pairs) {
    r -= pair[0];
    if (r <= 0) return pair[1];
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
export type CharacterVariantName = "classic" | "panel" | "dark";
type DirectionName = keyof typeof DIRS;

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

type SequenceStep = {
  do?: () => void;
  wait?: number | [number, number];
};

type Timer = {
  at: number;
  fn: () => void;
};

type BlinkState = {
  active: boolean;
  t: number;
  dur: number;
  hold: number;
  min: number;
  queue: number;
  next: number;
};

type RollState = {
  t0: number;
  dur: number;
  bx: number;
  by: number;
};

type HeadBase = {
  x: number;
  y: number;
  rot: number;
};

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
  enter?: (engine: CharacterEngine) => void;
};

type StatusPayload = {
  state: string | null;
  expr: ExpressionName;
  gazet: string;
  gazep: string;
  vel: string;
  blink: string;
  head: string;
  mouth: string;
};

/* Base geometry of the supplied artwork (viewBox 0 0 119.91 119.91) */
const GEOMETRY = {
  classic: {
    CX: 59.955,
    CY: 61, // head pivot
    RX: 4.6,
    RY: 3.1, // gaze range in SVG units
    ELX: 40.73,
    ELY: 49.09, // eye-left center
    ERX: 79.18,
    ERY: 49.09, // eye-right center
    MBX: 59.95,
    MBY: 82.53, // mouth bar center
    MLX: 40.73,
    MLY: 74.48, // mouth-left corner center
    MRX: 79.18,
    MRY: 74.48, // mouth-right corner center
    EW: 8,
    MBY_TOP: 78.5,
    MBW: 30.4,
    MBH: 8.06,
  },
  panel: {
    CX: 489.0,
    CY: 456.7,
    RX: 47.0,
    RY: 31.5,
    ELX: 294.293,
    ELY: 353.95,
    ERX: 684.012,
    ERY: 353.95,
    MBX: 489.052,
    MBY: 685.286,
    MLX: 294.293,
    MLY: 603.883,
    MRX: 684.012,
    MRY: 603.883,
    EW: 82,
    MBY_TOP: 644.486,
    MBW: 308.127,
    MBH: 81.599,
  },
  dark: {
    CX: 60,
    CY: 61,
    RX: 4.6,
    RY: 3.1,
    ELX: 40.77,
    ELY: 49.13,
    ERX: 79.23,
    ERY: 49.13,
    MBX: 60,
    MBY: 82.58,
    MLX: 40.77,
    MLY: 74.52,
    MRX: 79.23,
    MRY: 74.52,
    EW: 8,
    MBY_TOP: 78.55,
    MBW: 30.4,
    MBH: 8.06,
  },
} as const;

/* Mouth expressions = target values only; springs do the morphing.
   cy > 0 moves corners DOWN (base pose has raised corners = smile). */
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
    eye: 1.28,
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

type WritingStrokeSpec = {
  d: string;
  baseWidth: number;
  baseHeight: number;
  stroke: number;
  segmentRatio: number;
  speedRatio: number;
  easeAmount: number;
  easeHz: number;
};

const WRITING_STROKE: WritingStrokeSpec = {
  d: WRITING_PATH_D,
  baseWidth: 793,
  baseHeight: 294,
  stroke: 44,
  segmentRatio: 0.24,
  speedRatio: 0.64,
  easeAmount: 0.35,
  easeHz: 1.2,
};

function writingStrokeScale(
  geom: (typeof GEOMETRY)[CharacterVariantName],
  spec: WritingStrokeSpec
) {
  const targetWidth = geom.EW * 4.6;
  return targetWidth / spec.baseWidth;
}

function writingStrokeTransform(
  geom: (typeof GEOMETRY)[CharacterVariantName],
  spec: WritingStrokeSpec
) {
  const s = writingStrokeScale(geom, spec);
  const tx = geom.MBX - (spec.baseWidth / 2) * s;
  const ty = geom.MBY - (spec.baseHeight / 2) * s;
  return `translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${s.toFixed(5)})`;
}

/* Each state: base pose + blink cadence + weighted event pool (or scripted loop). */
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
      [2, "headDrift"],
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
    gap: [1.5, 2.8],
    events: [
      [1.9, "gazeShift"],
      [1, "listeningMouthShift"],
      [3, "listeningSideRotateNod"],
      [0.55, "headDrift"],
      [0.6, "doubleBlink"],
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
      [3, "gazeShift"],
      [1, "headDrift"],
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
      [1, "headDrift"],
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
      [1, "sigh"],
      [1, "slowBlink"],
    ],
  },
  surprised: {
    expr: "surprised",
    gaze: [0, -0.08],
    head: { y: -2 },
    eye: 1.3,
    blink: [4, 8],
    micro: { amp: 0.5, speed: 1.1 },
    gap: [2.5, 5],
    events: [
      [2, "gazeShift"],
      [1.2, "surprisedPulse"],
      [1, "doubleBlink"],
    ],
    enter: (e: CharacterEngine) => e.headPulse({ y: -1.6, rot: -1 }, 0.35),
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
      [3, "bounce"],
      [2, "gazeShift"],
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

class CharacterEngine {
  svg: SVGSVGElement;
  head: SVGGraphicsElement;
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
  wG: SVGGraphicsElement | null;
  wP: SVGPathElement | null;
  wLen: number;
  writingT0: number;

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
  debug: boolean;
  microPhase: number;
  microSpeed: number;
  expressionName: ExpressionName;
  stateName: CharacterStateName | null;
  hb: HeadBase;
  _lastStat: number;
  acts: Record<string, () => void>;
  st: CharacterStateConfig;
  gazeBias: [number, number];
  thinkSide?: number;
  _ow?: [number, number];
  _pm: ((e: PointerEvent) => void) | null;
  guides: SVGGElement | null;
  gL: SVGCircleElement | null;
  gR: SVGCircleElement | null;
  gT: SVGGElement | null;
  geom: (typeof GEOMETRY)[CharacterVariantName];
  onChange?: () => void;
  onStatus?: (payload: StatusPayload) => void;
  _raf: (t: number) => void;
  _rafId: number;

  constructor(
    svg: SVGSVGElement,
    opts: { state?: string; variant?: CharacterVariantName } = {}
  ) {
    this.svg = svg;
    const q = (part: string) =>
      svg.querySelector('[data-part="' + part + '"]') as SVGGraphicsElement;
    this.head = q("head");
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
    this.wG = svg.querySelector(
      '[data-part="writing-stroke"]'
    ) as SVGGraphicsElement | null;
    this.wP = svg.querySelector(
      '[data-part="writing-line"]'
    ) as SVGPathElement | null;
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
    this.debug = false;
    this.microPhase = 0;
    this.microSpeed = 1;
    this.expressionName = "neutral";
    this.stateName = null;
    this.hb = { x: 0, y: 0, rot: 0 };
    this._pm = null;
    this.guides = null;
    this.gL = null;
    this.gR = null;
    this.gT = null;
    this.geom = GEOMETRY[opts.variant || "classic"];
    this._lastStat = -1;

    this.acts = this._buildActions();
    /* convenience look methods: lookLeft(), lookUpperRight(), ... */
    const lookMethodMap = this as unknown as Record<string, () => void>;
    for (const d of Object.keys(DIRS) as DirectionName[]) {
      const name =
        "look" +
        d
          .split("-")
          .map((s) => s[0].toUpperCase() + s.slice(1))
          .join("");
      lookMethodMap[name] = () => this.look(d);
    }
    this.gazeBias = [0, 0];
    this.st = STATES.idle;
    this.setState((opts.state || "idle") as CharacterStateName);
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
      const due: Timer[] = [];
      const rest: Timer[] = [];
      for (const tm of this.timers) (tm.at <= this.time ? due : rest).push(tm);
      if (due.length) {
        this.timers = rest;
        for (const tm of due) tm.fn();
      }
    }
    /* eye roll: continuous circular target */
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
    /* talking: procedural mouth-shape picker, varied timing + pauses */
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
    /* blink: independent layer, irregular cadence */
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
    if (!this.st.events || !this.st.gap) {
      return;
    }

    const gap = this.st.gap;
    const events = this.st.events;
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
        const baseOpen = e.open ?? 1;
        const baseWide = e.wide ?? 1;
        const baseMy = e.my ?? 0;
        const baseEye = (this.st?.eye ?? 1) * (e.eye ?? 1);

        if (Math.random() < 0.2) {
          this.after(rand(0.04, 0.12), () => this.startBlink(rand(0.24, 0.32)));
        }

        this.seq("surprisePulse", [
          {
            do: () => {
              // Single subtle wow pulse: mouth and eyes pop slightly with a tiny head cue.
              this.open.set(baseOpen * rand(1.08, 1.16));
              this.wide.set(baseWide * rand(0.91, 0.97));
              this.my.set(baseMy + rand(-0.5, -0.2));
              this.eyeS.set(baseEye * rand(1.03, 1.08));
              this.hy.set(this.hb.y + rand(0.28, 0.52));
              this.hr.set(this.hb.rot + rand(0.25, 0.7));
            },
            wait: [0.16, 0.24],
          },
          {
            do: () => {
              this.open.set(baseOpen);
              this.wide.set(baseWide);
              this.my.set(baseMy);
              this.eyeS.set(baseEye);
              this.hy.set(this.hb.y);
              this.hr.set(this.hb.rot);
            },
            wait: [0.24, 0.36],
          },
        ]);
      },
      longClose: () => this.startBlink(1.0, rand(0.2, 0.5), 0.04),
      swaySlow: () => this.headPulse({ rot: rand(-2.5, 2.5) }, rand(1.5, 2.8)),
      listeningSideRotateNod: () => {
        if (this.stateName !== "listening") return;
        const dir = Math.random() < 0.5 ? -1 : 1;
        const a1 = rand(3.4, 4.5);
        const a2 = a1 * rand(0.68, 0.8);
        const y1 = rand(0.28, 0.4);
        const y2 = y1 * rand(0.7, 0.82);
        this.seq("head", [
          {
            do: () => {
              this.hy.set(this.hb.y);
              this.hx.set(this.hb.x);
              this.hr.set(this.hb.rot + rand(-0.16, 0.16));
              this.yaw.set(0);
            },
            wait: [0.07, 0.11],
          },
          {
            do: () => {
              this.hy.set(this.hb.y);
              this.hx.set(this.hb.x);
              this.hr.set(this.hb.rot + dir * a1);
              this.yaw.set(dir * y1);
            },
            wait: [0.14, 0.2],
          },
          {
            do: () => {
              this.hy.set(this.hb.y);
              this.hx.set(this.hb.x);
              this.hr.set(this.hb.rot + dir * rand(0.12, 0.26));
              this.yaw.set(dir * rand(0.02, 0.07));
            },
            wait: [0.1, 0.15],
          },
          {
            do: () => {
              this.hy.set(this.hb.y);
              this.hx.set(this.hb.x);
              this.hr.set(this.hb.rot - dir * a1);
              this.yaw.set(-dir * y1);
            },
            wait: [0.14, 0.2],
          },
          {
            do: () => {
              this.hy.set(this.hb.y);
              this.hx.set(this.hb.x);
              this.hr.set(this.hb.rot);
              this.yaw.set(0);
            },
            wait: [0.11, 0.16],
          },
          {
            do: () => {
              this.hy.set(this.hb.y);
              this.hx.set(this.hb.x);
              this.hr.set(this.hb.rot + dir * a2);
              this.yaw.set(dir * y2);
            },
            wait: [0.12, 0.18],
          },
          {
            do: () => {
              this.hy.set(this.hb.y);
              this.hx.set(this.hb.x);
              this.hr.set(this.hb.rot - dir * a2);
              this.yaw.set(-dir * y2);
            },
            wait: [0.12, 0.18],
          },
          {
            do: () => {
              this.hy.set(this.hb.y);
              this.hx.set(this.hb.x);
              this.hr.set(this.hb.rot);
              this.yaw.set(0);
            },
            wait: [0.12, 0.18],
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

  /* ---------- scripted state loops (randomized every pass: no GIF feel) ---------- */
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
        {
          do: () =>
            this.headPulse(
              {
                rot: rand(1.5, 3) * (Math.random() < 0.5 ? -1 : 1),
                y: rand(0.5, 1.2),
              },
              rand(0.5, 0.8)
            ),
          wait: [0.7, 1.2],
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
    const wasWriting = this.stateName === "writing";
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
    if (name === "writing" && !wasWriting) this.writingT0 = this.time;
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
    this.notify();
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
    if (notify) this.notify();
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
    if (notify) this.notify();
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
    if (notify) this.notify();
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
        this.gazeTo(nx * 0.7, ny * 0.7);
      };
      window.addEventListener("pointermove", this._pm);
    } else if (!on && this._pm) {
      window.removeEventListener("pointermove", this._pm);
      this._pm = null;
      this.gazeTo(this.gazeBias[0], this.gazeBias[1]);
    }
  }

  /* ---------- debug ---------- */
  setDebug(on: boolean) {
    this.debug = !!on;
    if (on && !this.guides) this.buildGuides();
    if (this.guides) this.guides.style.opacity = on ? "1" : "0";
  }
  buildGuides() {
    const G = this.geom;
    const NS = "http://www.w3.org/2000/svg";
    const g = document.createElementNS(NS, "g");
    g.style.opacity = "0";
    g.style.transition = "opacity .25s";
    g.style.pointerEvents = "none";
    const bounds = document.createElementNS(NS, "rect");
    const eyeHalf = G.EW / 2;
    bounds.setAttribute("x", String(G.ELX - eyeHalf - G.RX));
    bounds.setAttribute("y", String(G.ELY - eyeHalf - G.RY));
    bounds.setAttribute(
      "width",
      String(G.ERX + eyeHalf - (G.ELX - eyeHalf) + 2 * G.RX)
    );
    bounds.setAttribute("height", String(G.EW + 2 * G.RY));
    bounds.setAttribute("fill", "none");
    bounds.setAttribute("stroke-dasharray", "2 2");
    bounds.setAttribute("stroke-width", ".6");
    bounds.style.stroke = "var(--placeholder-foreground, #999)";
    g.appendChild(bounds);
    const dot = () => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", "1.4");
      c.style.fill = "var(--primary, #10b981)";
      g.appendChild(c);
      return c;
    };
    this.gL = dot();
    this.gR = dot();
    const cross = document.createElementNS(NS, "g");
    const cx = (G.ELX + G.ERX) / 2;
    const cy = G.ELY;
    for (const pts of [
      [-2.2, 0, 2.2, 0],
      [0, -2.2, 0, 2.2],
    ]) {
      const l = document.createElementNS(NS, "line");
      l.setAttribute("x1", String(cx + pts[0]));
      l.setAttribute("y1", String(cy + pts[1]));
      l.setAttribute("x2", String(cx + pts[2]));
      l.setAttribute("y2", String(cy + pts[3]));
      l.setAttribute("stroke-width", ".7");
      l.style.stroke = "var(--destructive, #ef4444)";
      cross.appendChild(l);
    }
    g.appendChild(cross);
    this.gT = cross;
    this.head.appendChild(g);
    this.guides = g;
  }

  notify() {
    if (this.onChange) {
      this.onChange();
    }
  }

  /* ---------- renderer: one absolute frame from base geometry ---------- */
  render() {
    const G = this.geom;
    const ph = this.microPhase,
      a = this.mAmp.x;
    const mX = a * 0.55 * (Math.sin(ph * 1.1) + 0.4 * Math.sin(ph * 2.3 + 1.7));
    const mY =
      a * 0.45 * (Math.sin(ph * 0.9 + 0.8) + 0.4 * Math.sin(ph * 2.1 + 0.3));
    const mR = a * 0.7 * Math.sin(ph * 0.65 + 2);
    const yaw = this.yaw.x;
    const hx = this.hx.x + mX;
    let hy = this.hy.x + mY;
    const rot = this.hr.x + mR;
    if (this.talking) hy += (1 - this.open.x) * 0.4;
    this.head.setAttribute(
      "transform",
      `translate(${hx.toFixed(2)} ${hy.toFixed(2)}) rotate(${rot.toFixed(2)} ${G.CX} ${G.CY})`
    );
    this.face.setAttribute(
      "transform",
      `translate(${(yaw * 0.28).toFixed(2)} 0)`
    );

    const rawGx = this.gx.x * G.RX + mX * 0.25;
    const rawGy = this.gy.x * G.RY + mY * 0.2;
    const etx = rawGx + yaw * 5.2;
    const ety = rawGy;
    this.eyesG.setAttribute(
      "transform",
      `translate(${etx.toFixed(2)} ${ety.toFixed(2)})`
    );

    const openV = clamp(this.lid.x, 0.02, 1.15) * this.blinkVal();
    const es = this.eyeS.x;
    const sy = Math.max(0.045, es * openV);
    const bsx = 1 + (es - 1) * 0.55;
    const ay = Math.abs(yaw);
    const sxL = Math.max(0.05, bsx * (1 - ay * 0.12 - Math.max(0, yaw) * 0.3));
    const sxR = Math.max(0.05, bsx * (1 - ay * 0.12 - Math.max(0, -yaw) * 0.3));
    this.eyeL.setAttribute(
      "transform",
      `translate(${G.ELX} ${G.ELY}) scale(${sxL.toFixed(3)} ${sy.toFixed(3)}) translate(${-G.ELX} ${-G.ELY})`
    );
    this.eyeR.setAttribute(
      "transform",
      `translate(${G.ERX} ${G.ERY}) scale(${sxR.toFixed(3)} ${sy.toFixed(3)}) translate(${-G.ERX} ${-G.ERY})`
    );

    const mtx = rawGx * 0.28 + yaw * 3.6 + this.mx.x;
    const mty = this.my.x + rawGy * 0.18;
    this.mouthG.setAttribute(
      "transform",
      `translate(${mtx.toFixed(2)} ${mty.toFixed(2)})`
    );
    const sleepyBlend = clamp(this.sleepyMorph.x, 0, 1);
    const sleepyMouthY = 1 - 0.22 * sleepyBlend;
    const ow = Math.max(0.06, this.open.x) * sleepyMouthY;
    const ww = Math.max(0.2, this.wide.x);
    const barAY = ow > 1 ? G.MBY_TOP : G.MBY; // grow downward from top edge when taller than base
    const csv = Math.max(0, this.cs.x);
    const sleepyCornerY = 1 - 0.38 * sleepyBlend;
    const cornerScaleY = csv * sleepyCornerY;
    const cvis = csv < 0.04 ? "hidden" : "visible";
    const cornerLift = 0;
    const cornerSpread = 0;
    const lty = this.cy.x - this.asym.x + cornerLift;
    const rty = this.cy.x + this.asym.x + cornerLift;
    const cornerBottomY = G.MBY_TOP + 0.01;

    const isWriting = this.stateName === "writing";
    const loadingMix = clamp(this.loadingMix.x, 0, 1);
    const isLoading = loadingMix > 0.001;
    const loadingBlend = loadingMix;
    const isWritingOnly = this.stateName === "writing";
    const phase = (this.time * 2.3) % 3;
    const glow = (index: number) => {
      const d = Math.abs(phase - index);
      const cycDist = Math.min(d, 3 - d);
      return Math.max(0, 1 - cycDist);
    };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const barBaseX = G.MBX - G.MBW / 2;
    const barBaseY = G.MBY_TOP;
    const normalBarX = G.MBX + (barBaseX - G.MBX) * ww;
    const normalBarY = barAY + (barBaseY - barAY) * ow;
    const normalBarW = G.MBW * ww;
    const normalBarH = G.MBH * ow;

    const normalLeftX = G.MLX + (-G.EW / 2) * csv + (-this.cx.x - cornerSpread);
    const normalRightX = G.MRX + (-G.EW / 2) * csv + (this.cx.x + cornerSpread);
    const cornerBaseY = G.MLY - G.EW / 2;
    const cornerYOffset = cornerBaseY - cornerBottomY;
    const normalLeftY = cornerBottomY + cornerYOffset * cornerScaleY + lty;
    const normalRightY = cornerBottomY + cornerYOffset * cornerScaleY + rty;
    const normalCornerW = G.EW * csv;
    const normalCornerH = G.EW * cornerScaleY;

    const loadH = G.MBH;
    const loadGap = G.MBW * 0.05;
    const loadSideW = loadH;
    const loadMidW = loadSideW * 2;
    const loadLayoutW = loadSideW * 2 + loadMidW + loadGap * 2;
    const loadX0 = G.MBX - loadLayoutW / 2;
    const loadY = G.MBY - loadH / 2;

    const loadLeftX = loadX0;
    const loadBarX = loadX0 + loadSideW + loadGap;
    const loadRightX = loadBarX + loadMidW + loadGap;

    const blend = loadingMix;
    const leftX = lerp(normalLeftX, loadLeftX, blend);
    const leftY = lerp(normalLeftY, loadY, blend);
    const leftW = lerp(normalCornerW, loadSideW, blend);
    const leftH = lerp(normalCornerH, loadH, blend);

    const barX = lerp(normalBarX, loadBarX, blend);
    const barY = lerp(normalBarY, loadY, blend);
    const barW = lerp(normalBarW, loadMidW, blend);
    const barH = lerp(normalBarH, loadH, blend);

    const rightX = lerp(normalRightX, loadRightX, blend);
    const rightY = lerp(normalRightY, loadY, blend);
    const rightW = lerp(normalCornerW, loadSideW, blend);
    const rightH = lerp(normalCornerH, loadH, blend);

    this.mL.setAttribute("transform", "none");
    this.bar.setAttribute("transform", "none");
    this.mR.setAttribute("transform", "none");
    this.mL.setAttribute("x", leftX.toFixed(2));
    this.mL.setAttribute("y", leftY.toFixed(2));
    this.mL.setAttribute("width", leftW.toFixed(2));
    this.mL.setAttribute("height", leftH.toFixed(2));
    this.bar.setAttribute("x", barX.toFixed(2));
    this.bar.setAttribute("y", barY.toFixed(2));
    this.bar.setAttribute("width", barW.toFixed(2));
    this.bar.setAttribute("height", barH.toFixed(2));
    this.mR.setAttribute("x", rightX.toFixed(2));
    this.mR.setAttribute("y", rightY.toFixed(2));
    this.mR.setAttribute("width", rightW.toFixed(2));
    this.mR.setAttribute("height", rightH.toFixed(2));

    this.bar.setAttribute("visibility", isWriting ? "hidden" : "visible");
    this.mL.setAttribute(
      "visibility",
      isWriting ? "hidden" : isLoading ? "visible" : cvis
    );
    this.mR.setAttribute(
      "visibility",
      isWriting ? "hidden" : isLoading ? "visible" : cvis
    );
    const base = 0.22;
    const span = 0.78;
    const leftShimmerOpacity = (base + glow(0) * span) * loadingBlend;
    const barShimmerOpacity = (base + glow(1) * span) * loadingBlend;
    const rightShimmerOpacity = (base + glow(2) * span) * loadingBlend;
    const normalOpacity = 1 - loadingBlend;
    this.mL.setAttribute(
      "opacity",
      (normalOpacity + leftShimmerOpacity).toFixed(3)
    );
    this.bar.setAttribute(
      "opacity",
      (normalOpacity + barShimmerOpacity).toFixed(3)
    );
    this.mR.setAttribute(
      "opacity",
      (normalOpacity + rightShimmerOpacity).toFixed(3)
    );
    this.face.setAttribute("visibility", isWritingOnly ? "hidden" : "visible");
    if (this.shell)
      this.shell.setAttribute(
        "visibility",
        isWritingOnly ? "hidden" : "visible"
      );
    this.eyesG.setAttribute("visibility", isWritingOnly ? "hidden" : "visible");
    if (this.nose)
      this.nose.setAttribute(
        "visibility",
        isWritingOnly ? "hidden" : "visible"
      );

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
        const seg = len * spec.segmentRatio;
        const gap = Math.max(1, len - seg);
        const baseSpeed = len * spec.speedRatio;
        const omega = 2 * Math.PI * spec.easeHz;
        const writingT = Math.max(0, this.time - this.writingT0);
        const easedTravel =
          baseSpeed * writingT +
          ((baseSpeed * spec.easeAmount) / omega) * Math.sin(omega * writingT);
        this.wG.setAttribute("transform", writingStrokeTransform(G, spec));
        const cycleOffset = easedTravel % len;
        const offset = -cycleOffset;

        this.wP.setAttribute("d", spec.d);
        this.wP.setAttribute("stroke-width", String(spec.stroke));
        this.wP.setAttribute(
          "stroke-dasharray",
          `${seg.toFixed(2)} ${gap.toFixed(2)}`
        );
        this.wP.setAttribute("stroke-dashoffset", offset.toFixed(2));
        this.wP.setAttribute("stroke-opacity", "0.98");
      }
    }

    if (this.debug && this.guides && this.gT && this.gL && this.gR) {
      this.gT.setAttribute(
        "transform",
        `translate(${(this.gx.t * G.RX).toFixed(2)} ${(this.gy.t * G.RY).toFixed(2)})`
      );
      this.gL.setAttribute("cx", (G.ELX + etx).toFixed(2));
      this.gL.setAttribute("cy", (G.ELY + ety).toFixed(2));
      this.gR.setAttribute("cx", (G.ERX + etx).toFixed(2));
      this.gR.setAttribute("cy", (G.ERY + ety).toFixed(2));
    }
    if (this.onStatus && this.time - this._lastStat > 0.12) {
      this._lastStat = this.time;
      const b = this.bl;
      this.onStatus({
        state: this.stateName,
        expr: this.expressionName,
        gazet: `${this.gx.t.toFixed(2)}, ${this.gy.t.toFixed(2)}`,
        gazep: `${this.gx.x.toFixed(2)}, ${this.gy.x.toFixed(2)}`,
        vel: (Math.abs(this.gx.v) + Math.abs(this.gy.v)).toFixed(2),
        blink: b.active
          ? `blinking ${(this.blinkVal() * 100) | 0}%`
          : `open, next ${(b.next - this.time).toFixed(1)}s`,
        head: `${this.hr.x.toFixed(1)} deg, y ${this.hy.x.toFixed(1)}`,
        mouth: this.talking
          ? `talking, open ${this.open.x.toFixed(2)}`
          : `open ${this.open.x.toFixed(2)}, wide ${this.wide.x.toFixed(2)}`,
      });
    }
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

export const CHARACTER_STATES = [
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

export type CharacterState = (typeof CHARACTER_STATES)[number];

export interface AnimatedCharacterHandle {
  setState: (state: CharacterState) => void;
  look: (dir: string) => void;
  setGazeTarget: (target: { x: number; y: number }) => void;
  blink: () => void;
  doubleBlink: () => void;
  slowBlink: () => void;
  eyeRoll: () => void;
  nod: () => void;
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

export interface AnimatedCharacterProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  /** Behavioral state preset. Transitions blend from the current pose. */
  state?: CharacterState;
  /** When true, the eyes smoothly follow the pointer; when false they return to the state's gaze. */
  mouseTracking?: boolean;
  /** Visual shell variant with the same animation behavior model. */
  variant?: CharacterVariantName;
}

export const AnimatedCharacter = React.forwardRef<
  AnimatedCharacterHandle,
  AnimatedCharacterProps
>(function AnimatedCharacter(
  {
    state = "idle",
    mouseTracking = false,
    variant = "classic",
    className,
    ...props
  },
  ref
) {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const engineRef = React.useRef<CharacterEngine | null>(null);

  React.useEffect(() => {
    if (!svgRef.current) return;
    const engine = new CharacterEngine(svgRef.current, { variant });
    engineRef.current = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [variant]);

  React.useEffect(() => {
    engineRef.current?.setState(state);
  }, [state]);

  React.useEffect(() => {
    engineRef.current?.setMouseTracking(mouseTracking);
  }, [mouseTracking]);

  React.useImperativeHandle(ref, () => {
    return {
      setState: (nextState: CharacterState) =>
        engineRef.current?.setState(nextState),
      look: (dir: string) => engineRef.current?.look(dir),
      setGazeTarget: (target: { x: number; y: number }) =>
        engineRef.current?.setGazeTarget(target),
      blink: () => engineRef.current?.blink(),
      doubleBlink: () => engineRef.current?.doubleBlink(),
      slowBlink: () => engineRef.current?.slowBlink(),
      eyeRoll: () => engineRef.current?.eyeRoll(),
      nod: () => engineRef.current?.nod(),
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
    };
  }, []);

  return (
    <div className={cn("text-foreground", className)} {...props}>
      {/* Original artwork: geometry preserved verbatim; wrapper groups only. */}
      <svg
        ref={svgRef}
        viewBox={variant === "panel" ? "0 0 978 914" : "0 0 120 120"}
        role="img"
        aria-label="Care Filly"
        className={cn(
          "mx-auto block h-auto",
          variant === "panel" ? "w-80 max-w-full" : "w-24"
        )}
      >
        {variant === "panel" ? (
          <>
            <defs>
              <filter
                id="panel-face-inner-shadow"
                x="0"
                y="0"
                width="978"
                height="913.375"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="10" dy="12" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha2"
                />
                <feOffset dx="-6" dy="-8" />
                <feGaussianBlur stdDeviation="8" />
                <feComposite
                  in2="hardAlpha2"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.14 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_innerShadow"
                  result="effect2_innerShadow"
                />
              </filter>
              <radialGradient
                id="panel-eye-left"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(294.293 353.95) rotate(90) scale(41)"
              >
                <stop stopColor="#F1F1F1" />
                <stop offset="1" stopColor="white" />
              </radialGradient>
              <radialGradient
                id="panel-eye-right"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(684.012 353.95) rotate(90) scale(41)"
              >
                <stop stopColor="#F1F1F1" />
                <stop offset="1" stopColor="white" />
              </radialGradient>
              <linearGradient
                id="panel-mouth-left"
                x1="253.293"
                y1="603.883"
                x2="335.293"
                y2="603.883"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="0.475962" stopColor="#F1F1F1" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
              <linearGradient
                id="panel-mouth-right"
                x1="643.012"
                y1="603.883"
                x2="725.012"
                y2="603.883"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="0.475962" stopColor="#F1F1F1" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
              <linearGradient
                id="panel-mouth-bar"
                x1="334.988"
                y1="685.285"
                x2="643.115"
                y2="685.285"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="0.475962" stopColor="#F1F1F1" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>

            <g data-part="head">
              <g data-part="face" filter="url(#panel-face-inner-shadow)">
                <path
                  d="M488.949 0C852.114 0 946.174 93.9496 946.174 456.688C946.174 819.425 852.215 913.375 488.949 913.375C125.684 913.375 31.7256 819.425 31.7256 456.688C31.7256 93.9498 125.785 0 488.949 0Z"
                  fill="black"
                />
                <path
                  d="M905.682 456.687C905.682 798.469 831.184 872.879 489.001 872.879C146.817 872.879 72.2182 798.469 72.2182 456.687C72.2182 114.906 146.817 40.4955 488.9 40.4955C830.982 40.4955 905.581 114.906 905.581 456.687H905.682Z"
                  fill="#2A2A2A"
                />
                <path
                  d="M488.949 0C852.114 0 946.174 93.9496 946.174 456.688C946.174 819.425 852.215 913.375 488.949 913.375C125.684 913.375 31.7256 819.425 31.7256 456.688C31.7256 93.9498 125.785 0 488.949 0Z"
                  fill="white"
                  fillOpacity="0.1"
                />
                <path
                  d="M782.38 91.5126V258.961H586.759V91.5126C586.759 76.1244 599.227 63.5708 614.734 63.5708H754.405C769.811 63.5708 782.38 76.0231 782.38 91.5126ZM950.025 258.961H782.38V454.352H950.025C965.432 454.352 978 441.899 978 426.41V286.903C978 271.515 965.533 258.961 950.025 258.961ZM363.266 63.5708H223.595C208.189 63.5708 195.62 76.0231 195.62 91.5126V258.961H391.241V91.5126C391.241 76.1244 378.774 63.5708 363.266 63.5708ZM0 286.903V426.41C0 441.798 12.467 454.352 27.9747 454.352H195.62V258.961H27.9747C12.5683 258.961 0 271.414 0 286.903Z"
                  fill="#2A2A2A"
                />
                <path
                  d="M586.862 258.969L391.241 258.961L391.242 454.36H586.862V258.969Z"
                  fill="#2A2A2A"
                />
                <path
                  d="M27.9746 259.461H195.12V453.852H27.9746C12.7437 453.852 0.5 441.522 0.5 426.41V286.903C0.500152 271.691 12.8428 259.461 27.9746 259.461ZM950.025 259.461C965.256 259.461 977.5 271.79 977.5 286.903V426.41C977.5 441.621 965.157 453.852 950.025 453.852H782.88V259.461H950.025ZM586.362 259.468V453.86H391.741L391.74 259.461L586.362 259.468ZM614.734 64.0708H754.405C769.537 64.0709 781.88 76.3009 781.88 91.5122V258.461H587.26V91.5122C587.26 76.3997 599.504 64.0708 614.734 64.0708ZM223.595 64.0708H363.266C378.496 64.0708 390.74 76.3997 390.74 91.5122V258.461H196.12V91.5122C196.12 76.3009 208.463 64.0709 223.595 64.0708Z"
                  stroke="white"
                />
                <path
                  data-part="nose"
                  d="M586.862 258.969L391.241 258.961L391.242 454.36H586.862V258.969Z"
                  fill="#2A2A2A"
                />
              </g>

              <g data-part="eyes">
                <rect
                  data-part="eye-left"
                  x="253.293"
                  y="312.95"
                  width="82"
                  height="82"
                  fill="url(#panel-eye-left)"
                  fillOpacity="0.9"
                />
                <rect
                  data-part="eye-right"
                  x="643.012"
                  y="312.95"
                  width="82"
                  height="82"
                  fill="url(#panel-eye-right)"
                  fillOpacity="0.9"
                />
              </g>

              <g data-part="mouth-group">
                <rect
                  data-part="mouth-left"
                  x="253.293"
                  y="562.883"
                  width="82"
                  height="82"
                  fill="url(#panel-mouth-left)"
                  fillOpacity="0.9"
                />
                <rect
                  data-part="mouth-right"
                  x="643.012"
                  y="562.883"
                  width="82"
                  height="82"
                  fill="url(#panel-mouth-right)"
                  fillOpacity="0.9"
                />
                <rect
                  data-part="mouth"
                  x="334.988"
                  y="644.486"
                  width="308.127"
                  height="81.599"
                  fill="url(#panel-mouth-bar)"
                  fillOpacity="0.9"
                />
                <g data-part="writing-stroke" visibility="hidden">
                  <path
                    data-part="writing-line"
                    d={WRITING_STROKE.d}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity="0.95"
                  />
                </g>
              </g>
            </g>
          </>
        ) : variant === "dark" ? (
          <g data-part="head">
            <path
              data-part="shell"
              d="M112.24,42.23v13.78c0,2.4-1.25,4.51-3.14,5.71-.33,36.71-11.58,47.39-49.1,47.39S11.23,98.43,10.9,61.72c-1.89-1.2-3.14-3.31-3.14-5.71v-13.78c0-3.34,2.42-6.12,5.6-6.66,5.6-20.55,21.5-24.68,46.64-24.68s41.04,4.13,46.64,24.68c3.18.54,5.6,3.32,5.6,6.66Z"
              fill="#fff"
            />
            <path
              data-part="face"
              d="M105.49,39.47h-2.03c-3.95-19.03-15.78-24.58-43.46-24.58s-39.51,5.55-43.46,24.58h-2.03c-1.52,0-2.76,1.23-2.76,2.76v13.78c0,1.52,1.23,2.76,2.76,2.76h.39c0,.41-.01.81-.01,1.23,0,35.84,9.28,45.11,45.11,45.11s45.11-9.28,45.11-45.11c0-.42,0-.82-.01-1.23h.39c1.52,0,2.76-1.23,2.76-2.76v-13.78c0-1.52-1.23-2.76-2.76-2.76ZM97.11,60c0,31.56-5.55,37.11-37.11,37.11s-37.11-5.55-37.11-37.11c0-.42,0-.82,0-1.23h8.16v-19.3h-6.48c1.23-5.03,3.26-8.61,6.48-11.12v11.12h19.3v-16.34c2.91-.17,6.11-.24,9.65-.24s6.73.08,9.65.24v16.34h19.3v-11.12c3.22,2.51,5.25,6.08,6.48,11.12h-6.48v19.3h8.16c0,.41,0,.81,0,1.23Z"
              fill="#000"
            />
            <rect
              data-part="nose"
              x="50.35"
              y="39.47"
              width="19.3"
              height="19.3"
              fill="#000"
            />
            <g data-part="eyes">
              <rect
                data-part="eye-left"
                x="36.77"
                y="45.13"
                width="8"
                height="8"
                fill="#000"
              />
              <rect
                data-part="eye-right"
                x="75.23"
                y="45.13"
                width="8"
                height="8"
                fill="#000"
              />
            </g>
            <g data-part="mouth-group">
              <rect
                data-part="mouth-left"
                x="36.74"
                y="70.49"
                width="8.06"
                height="8.06"
                fill="#000"
              />
              <rect
                data-part="mouth-right"
                x="75.2"
                y="70.49"
                width="8.06"
                height="8.06"
                fill="#000"
              />
              <rect
                data-part="mouth"
                x="44.8"
                y="78.55"
                width="30.4"
                height="8.06"
                fill="#000"
              />
              <g data-part="writing-stroke" visibility="hidden">
                <path
                  data-part="writing-line"
                  d={WRITING_STROKE.d}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.95"
                />
              </g>
            </g>
          </g>
        ) : (
          <g data-part="head">
            <path
              data-part="face"
              fill="currentColor"
              d="M105.44,39.42h-2.03c-3.95-19.03-15.78-24.58-43.46-24.58s-39.51,5.55-43.46,24.58h-2.03c-1.52,0-2.76,1.23-2.76,2.76v13.78c0,1.52,1.23,2.76,2.76,2.76h.39c0,.41-.01.81-.01,1.23,0,35.84,9.27,45.11,45.11,45.11s45.11-9.28,45.11-45.11c0-.42,0-.82-.01-1.23h.39c1.52,0,2.76-1.23,2.76-2.76v-13.78c0-1.52-1.23-2.76-2.76-2.76ZM97.06,59.95c0,31.56-5.55,37.11-37.11,37.11s-37.11-5.55-37.11-37.11c0-.42,0-.82,0-1.23h8.16v-19.3h-6.48c1.23-5.03,3.26-8.61,6.48-11.12v11.12h19.3v-16.34c2.91-.17,6.11-.24,9.65-.24s6.74.08,9.65.24v16.34h19.3v-11.12c3.22,2.51,5.25,6.08,6.48,11.12h-6.48v19.3h8.16c0,.41,0,.81,0,1.23Z"
            />
            <rect
              data-part="nose"
              fill="currentColor"
              x="50.3"
              y="39.42"
              width="19.3"
              height="19.3"
            />
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
            <g data-part="mouth-group">
              <rect
                data-part="mouth-left"
                fill="currentColor"
                x="36.7"
                y="70.45"
                width="8.06"
                height="8.06"
              />
              <rect
                data-part="mouth-right"
                fill="currentColor"
                x="75.15"
                y="70.45"
                width="8.06"
                height="8.06"
              />
              <rect
                data-part="mouth"
                fill="currentColor"
                x="44.75"
                y="78.5"
                width="30.4"
                height="8.06"
              />
              <g data-part="writing-stroke" visibility="hidden">
                <path
                  data-part="writing-line"
                  d={WRITING_STROKE.d}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.95"
                />
              </g>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
});
