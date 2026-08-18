/**
 * @name animated-character
 * @description Spring-driven animated AI character with state presets, gaze, blinking, talking and head movement
 * @type registry:ui
 */
import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Animation engine                                                    */
/* Architecture (adapted from the GrokBot prototype):                  */
/*   STATE -> TIMERS/EVENTS -> TARGET VALUES -> SPRINGS -> SVG FRAME   */
/* Every frame is computed absolutely from base geometry: no transform */
/* accumulation, no drift. Runs on requestAnimationFrame with a fixed  */
/* 120 Hz spring timestep and delta clamping, outside the React render */
/* cycle (direct SVG attribute updates).                               */
/* ------------------------------------------------------------------ */
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v)
const rand = (a: number, b: number) => a + Math.random() * (b - a)
const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))
const wpick = (pairs: ReadonlyArray<readonly [number, string]>) => {
  let tot = 0; for (const p of pairs) tot += p[0];
  let r = Math.random() * tot;
  for (const p of pairs) { r -= p[0]; if (r <= 0) return p[1]; }
  return pairs[pairs.length - 1][1];
};

class Spring {
  x: number
  v: number
  t: number
  w: number
  z: number

  constructor(v: number, w: number, z = 1) {
    this.x = v
    this.v = 0
    this.t = v
    this.w = w
    this.z = z
  }

  step(h: number) {
    const a = -2 * this.z * this.w * this.v - this.w * this.w * (this.x - this.t);
    this.v += a * h; this.x += this.v * h;
  }
  set(t: number) {
    this.t = t
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
  | "confused"

type CharacterStateName =
  | "idle"
  | "listening"
  | "talking"
  | "thinking"
  | "loading"
  | "happy"
  | "sad"
  | "surprised"
  | "confused"
  | "excited"
  | "sleepy"
type DirectionName = keyof typeof DIRS

type ExpressionConfig = {
  open?: number
  wide?: number
  cy?: number
  cx?: number
  cs?: number
  my?: number
  mx?: number
  asym?: number
  eye?: number
  lid?: number
}

type SequenceStep = {
  do?: () => void
  wait?: number | [number, number]
}

type Timer = {
  at: number
  fn: () => void
}

type BlinkState = {
  active: boolean
  t: number
  dur: number
  hold: number
  min: number
  queue: number
  next: number
}

type RollState = {
  t0: number
  dur: number
  bx: number
  by: number
}

type HeadBase = {
  x: number
  y: number
  rot: number
}

type CharacterStateConfig = {
  expr: ExpressionName
  gaze: [number, number]
  blink: [number, number]
  micro: { amp: number; speed: number }
  gap?: [number, number]
  events?: ReadonlyArray<readonly [number, string]>
  head?: Partial<HeadBase>
  lid?: number
  eye?: number
  blinkDur?: number
  talk?: boolean
  loop?: "loadingLoop" | "confusedLoop"
  enter?: (engine: CharacterEngine) => void
}

type StatusPayload = {
  state: string | null
  expr: ExpressionName
  gazet: string
  gazep: string
  vel: string
  blink: string
  head: string
  mouth: string
}

/* Base geometry of the supplied artwork (viewBox 0 0 119.91 119.91) */
const G = {
  CX: 59.955, CY: 61,          // head pivot
  RX: 4.6, RY: 3.1,            // gaze range in SVG units
  ELX: 40.73, ELY: 49.09,      // eye-left center
  ERX: 79.18, ERY: 49.09,      // eye-right center
  MBX: 59.95, MBY: 82.53,      // mouth bar center
  MLX: 40.73, MLY: 74.48,      // mouth-left corner center
  MRX: 79.18, MRY: 74.48       // mouth-right corner center
};

/* Mouth expressions = target values only; springs do the morphing.
   cy > 0 moves corners DOWN (base pose has raised corners = smile). */
const EXPR: Record<ExpressionName, ExpressionConfig> = {
  neutral:    { open: 1,    wide: 1,   cy: 0,   cx: 0,    cs: 1 },
  smallSmile: { open: 1.15, wide: 1,   cy: 0,   cx: 0,    cs: 1 },
  smile:      { open: 1.35, wide: 1,   cy: 0,   cx: 0,    cs: 1 },
  bigSmile:   { open: 1.7,  wide: 1,   cy: 0,   cx: 0,    cs: 1 },
  sad:        { open: 1,    wide: 1,   cy: 16.11, cx: 0,  cs: 1, my: -5.5 },
  worried:    { open: .42,  wide: .66, cy: 4.6, cx: -1,   cs: 0, my: .4 },
  surprised:  { open: 2,    wide: .52, cy: 2.2, cx: -2.2, cs: 0,  my: -3.2, eye: 1.28 },
  thinking:   { open: .45,  wide: .55, cy: 1.5, cx: -1.6, cs: 0,  mx: 2.4, lid: .95 },
  confused:   { open: .6,   wide: .72, cy: 1,   asym: 2.6, cs: 0, mx: 1.6 }
};

const TALK_SHAPES = [
  { o: 1.5, w: .85 }, { o: .5, w: .95 }, { o: 1.25, w: .65 }, { o: 1.9, w: .72 },
  { o: .75, w: 1.02 }, { o: 1.05, w: .9 }, { o: .32, w: .9 }
];

const DIRS = {
  center: [0, 0], left: [-.85, 0], right: [.85, 0], up: [0, -.85], down: [0, .85],
  'upper-left': [-.7, -.7], 'upper-right': [.7, -.7],
  'lower-left': [-.7, .7], 'lower-right': [.7, .7]
};

/* Each state: base pose + blink cadence + weighted event pool (or scripted loop). */
const STATES: Record<CharacterStateName, CharacterStateConfig> = {
  idle: { expr: 'neutral', gaze: [0, 0], blink: [2.2, 6.5], micro: { amp: .5, speed: 1 }, gap: [1.6, 4.2],
    events: [[5, 'gazeShift'], [3, 'glance'], [2, 'headDrift'], [1, 'doubleBlink'], [1, 'microSmile'], [.4, 'eyeRoll']] },
  listening: { expr: 'smallSmile', gaze: [0, .12], head: { rot: -1.2 }, blink: [2, 5.5], micro: { amp: .6, speed: 1 }, gap: [1.5, 2.8],
    events: [[1.9, 'gazeShift'], [1, 'listeningMouthShift'], [3, 'listeningSideRotateNod'], [.55, 'headDrift'], [.6, 'doubleBlink']] },
  talking: { expr: 'neutral', talk: true, gaze: [0, 0], blink: [2.5, 6], micro: { amp: .8, speed: 1.25 }, gap: [1.5, 3.5],
    events: [[3, 'gazeShift'], [1, 'headDrift']] },
  thinking: { expr: 'thinking', gaze: [-.45, -.55], head: { rot: -5, x: -1 }, lid: .95, blink: [3, 7], blinkDur: .55,
    micro: { amp: .4, speed: .7 }, gap: [2.5, 5], events: [[2, 'switchSide'], [1, 'gazeShift'], [1, 'slowBlink']] },
  loading: { expr: 'neutral', gaze: [0, 0], lid: .97, blink: [3, 6], micro: { amp: .45, speed: .9 }, loop: 'loadingLoop' },
  happy: { expr: 'smile', gaze: [0, -.05], head: { y: -1.2 }, blink: [2.5, 6], micro: { amp: .7, speed: 1.2 }, gap: [1.8, 4],
    events: [[2, 'smilePulse'], [2, 'gazeShift'], [1, 'headDrift'], [1, 'doubleBlink']] },
  sad: { expr: 'sad', gaze: [0, .55], head: { rot: 2.5, y: 2.2 }, lid: .8, eye: .97, blink: [3.5, 7.5], blinkDur: .6,
    micro: { amp: .3, speed: .55 }, gap: [3, 6], events: [[2, 'gazeShiftDown'], [1, 'sigh'], [1, 'slowBlink']] },
  surprised: { expr: 'surprised', gaze: [0, -.08], head: { y: -2 }, eye: 1.3, blink: [4, 8], micro: { amp: .5, speed: 1.1 },
    gap: [2.5, 5], events: [[2, 'gazeShift'], [1.2, 'surprisedPulse'], [1, 'doubleBlink']], enter: (e: CharacterEngine) => e.headPulse({ y: -1.6, rot: -1 }, .35) },
  confused: { expr: 'confused', gaze: [0, 0], blink: [2.5, 6], micro: { amp: .5, speed: .9 }, loop: 'confusedLoop' },
  excited: { expr: 'bigSmile', gaze: [0, -.05], head: { y: -.8 }, eye: 1.12, blink: [2, 5], micro: { amp: 1.2, speed: 2.1 },
    gap: [.9, 2.2], events: [[3, 'bounce'], [2, 'gazeShift'], [1, 'doubleBlink']] },
  sleepy: { expr: 'neutral', gaze: [0, .5], head: { rot: 3, y: 1.8 }, lid: .55, eye: .95, blink: [2, 4.5], blinkDur: .9,
    micro: { amp: .5, speed: .45 }, gap: [2.5, 5.5], events: [[2, 'longClose'], [2, 'swaySlow'], [1, 'gazeShiftDown']] }
};

class CharacterEngine {
  svg: SVGSVGElement
  head: SVGGraphicsElement
  face: SVGGraphicsElement
  eyesG: SVGGraphicsElement
  mouthG: SVGGraphicsElement
  eyeL: SVGGraphicsElement
  eyeR: SVGGraphicsElement
  bar: SVGGraphicsElement
  mL: SVGGraphicsElement
  mR: SVGGraphicsElement

  gx: Spring
  gy: Spring
  yaw: Spring
  hx: Spring
  hy: Spring
  hr: Spring
  nodDepth: Spring
  lid: Spring
  eyeS: Spring
  open: Spring
  wide: Spring
  cy: Spring
  cx: Spring
  cs: Spring
  asym: Spring
  mx: Spring
  my: Spring
  mAmp: Spring
  springs: Spring[]

  time: number
  acc: number
  last: number
  timers: Timer[]
  gen: Record<string, number>
  bl: BlinkState
  talking: boolean
  talkNext: number
  roll: RollState | null
  mouse: boolean
  debug: boolean
  microPhase: number
  microSpeed: number
  expressionName: ExpressionName
  stateName: CharacterStateName | null
  hb: HeadBase
  _lastStat: number
  acts: Record<string, () => void>
  st: CharacterStateConfig
  gazeBias: [number, number]
  thinkSide?: number
  _ow?: [number, number]
  _pm: ((e: PointerEvent) => void) | null
  guides: SVGGElement | null
  gL: SVGCircleElement | null
  gR: SVGCircleElement | null
  gT: SVGGElement | null
  onChange?: () => void
  onStatus?: (payload: StatusPayload) => void
  _raf: (t: number) => void
  _rafId: number

  constructor(svg: SVGSVGElement, opts: { state?: string } = {}) {
    this.svg = svg;
    const q = (part: string) => svg.querySelector('[data-part="' + part + '"]') as SVGGraphicsElement;
    this.head = q('head'); this.face = q('face'); this.eyesG = q('eyes'); this.mouthG = q('mouth-group');
    this.eyeL = q('eye-left'); this.eyeR = q('eye-right');
    this.bar = q('mouth'); this.mL = q('mouth-left'); this.mR = q('mouth-right');

    const S = (v: number, w: number, z = 1) => new Spring(v, w, z);
    this.gx = S(0, 11); this.gy = S(0, 11); this.yaw = S(0, 8, .95);
    this.hx = S(0, 6.5); this.hy = S(0, 6.5, .95); this.hr = S(0, 7, .9);
    this.nodDepth = S(0, 13, .84)
    this.lid = S(1, 14); this.eyeS = S(1, 10, .85);
    this.open = S(1, 16, .9); this.wide = S(1, 14, .95);
    this.cy = S(0, 11, .85); this.cx = S(0, 11); this.cs = S(1, 12); this.asym = S(0, 11);
    this.mx = S(0, 9); this.my = S(0, 11); this.mAmp = S(.5, 3);
    this.springs = [this.gx, this.gy, this.yaw, this.hx, this.hy, this.hr, this.nodDepth, this.lid, this.eyeS,
      this.open, this.wide, this.cy, this.cx, this.cs, this.asym, this.mx, this.my, this.mAmp];

    this.time = 0; this.acc = 0; this.last = performance.now();
    this.timers = []; this.gen = {};
    this.bl = { active: false, t: 0, dur: .32, hold: 0, min: .05, queue: 0, next: 2 };
    this.talking = false; this.talkNext = 0;
    this.roll = null; this.mouse = false; this.debug = false;
    this.microPhase = 0; this.microSpeed = 1;
    this.expressionName = 'neutral'; this.stateName = null; this.hb = { x: 0, y: 0, rot: 0 };
    this._pm = null
    this.guides = null
    this.gL = null
    this.gR = null
    this.gT = null
    this._lastStat = -1;

    this.acts = this._buildActions();
    /* convenience look methods: lookLeft(), lookUpperRight(), ... */
    const lookMethodMap = this as unknown as Record<string, () => void>
    for (const d of Object.keys(DIRS) as DirectionName[]) {
      const name = 'look' + d.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
      lookMethodMap[name] = () => this.look(d);
    }
    this.gazeBias = [0, 0]
    this.st = STATES.idle
    this.setState((opts.state || 'idle') as CharacterStateName);
    this._raf = (t: number) => this.frame(t);
    this._rafId = requestAnimationFrame(this._raf);
  }

  /* ---------- clock ---------- */
  frame(now: number) {
    const dt = clamp((now - this.last) / 1000, 0, .1);
    this.last = now; this.acc += dt;
    const h = 1 / 120; let n = 0;
    while (this.acc >= h && n < 24) { this.stepFixed(h); this.acc -= h; n++; }
    this.render();
    this._rafId = requestAnimationFrame(this._raf);
  }

  stepFixed(h: number) {
    this.time += h;
    this.microPhase += h * this.microSpeed;
    if (this.timers.length) {
      const due: Timer[] = []
      const rest: Timer[] = []
      for (const tm of this.timers) (tm.at <= this.time ? due : rest).push(tm);
      if (due.length) { this.timers = rest; for (const tm of due) tm.fn(); }
    }
    /* eye roll: continuous circular target */
    if (this.roll) {
      const p = (this.time - this.roll.t0) / this.roll.dur;
      if (p >= 1) {
        this.gx.set(this.roll.bx); this.gy.set(this.roll.by);
        this.gx.w = 11; this.gy.w = 11; this.roll = null;
      } else {
        const phi = Math.PI * 2 * smooth(p), r = .85 * Math.sin(Math.PI * p);
        this.gx.set(this.roll.bx + r * Math.sin(phi));
        this.gy.set(this.roll.by - r * Math.cos(phi));
      }
    }
    /* talking: procedural mouth-shape picker, varied timing + pauses */
    if (this.talking && this.time >= this.talkNext) {
      if (Math.random() < .13) {
        this.open.set(.22); this.wide.set(.95);
        this.talkNext = this.time + rand(.22, .5);
      } else {
        const s = TALK_SHAPES[(Math.random() * TALK_SHAPES.length) | 0];
        this.open.set(s.o); this.wide.set(s.w);
        this.talkNext = this.time + rand(.07, .19);
      }
    }
    /* blink: independent layer, irregular cadence */
    const b = this.bl;
    if (b.active) {
      b.t += h;
      if (b.t >= b.dur + b.hold) {
        b.active = false; this.scheduleBlink();
        if (b.queue > 0) { b.queue--; this.after(.13, () => this.startBlink(.3)); }
      }
    } else if (this.time >= b.next) {
      this.startBlink(this.st.blinkDur || .32);
    }
    for (const s of this.springs) s.step(h);
  }

  blinkVal() {
    const b = this.bl; if (!b.active) return 1;
    const closeD = b.dur * .42, openD = b.dur * .58;
    let t = b.t;
    if (t < closeD) return 1 - (1 - b.min) * smooth(t / closeD);
    t -= closeD; if (t < b.hold) return b.min;
    t -= b.hold;
    if (t < openD) return b.min + (1 - b.min) * smooth(t / openD);
    return 1;
  }

  /* ---------- scheduling ---------- */
  after(d: number, fn: () => void) {
    this.timers.push({ at: this.time + d, fn })
  }

  cancel(ch: string) {
    this.gen[ch] = (this.gen[ch] || 0) + 1
    if (ch === "head") {
      this.nodDepth.set(0)
    }
  }

  seq(ch: string, steps: SequenceStep[], loop = false) {
    const gen = this.gen[ch] = (this.gen[ch] || 0) + 1;
    const run = (i: number) => {
      if (this.gen[ch] !== gen) return;
      if (i >= steps.length) { if (loop) run(0); return; }
      const st = steps[i];
      if (st.do) st.do();
      const w = Array.isArray(st.wait) ? rand(st.wait[0], st.wait[1]) : (st.wait || 0);
      this.after(w, () => run(i + 1));
    };
    run(0);
  }
  loopEvents() {
    if (!this.st.events || !this.st.gap) {
      return
    }

    const gap = this.st.gap
    const events = this.st.events
    const gen = this.gen.ev = (this.gen.ev || 0) + 1;
    const tick = () => {
      if (gen !== this.gen.ev) return;
      const fn = this.acts[wpick(events)];
      if (fn) fn();
      this.after(rand(gap[0], gap[1]), tick);
    };
    this.after(rand(gap[0] * .5, gap[1] * .7), tick);
  }

  _buildActions(): Record<string, () => void> {
    return {
      gazeShift: () => { if (this.mouse) return; const b = this.gazeBias; this.seq('gaze', [
        { do: () => this.gazeTo(b[0] + rand(-.35, .35), b[1] + rand(-.25, .25)), wait: [.8, 2.2] },
        { do: () => { if (Math.random() < .7) this.gazeTo(b[0], b[1]); } }]); },
      gazeShiftDown: () => { if (this.mouse) return; const b = this.gazeBias; this.seq('gaze', [
        { do: () => this.gazeTo(b[0] + rand(-.25, .25), clamp(b[1] + rand(0, .2), -1, 1)), wait: [1, 2.5] },
        { do: () => this.gazeTo(b[0], b[1]) }]); },
      glance: () => { if (this.mouse) return; const s = Math.random() < .5 ? -1 : 1, b = this.gazeBias;
        this.seq('gaze', [{ do: () => this.gazeTo(.55 * s, b[1]), wait: [.6, 1.4] }, { do: () => this.gazeTo(b[0], b[1]) }]); },
      headDrift: () => this.headPulse({ rot: rand(-3.5, 3.5), x: rand(-1.4, 1.4), y: rand(-.8, .8) }, rand(1, 2.2)),
      nodOnce: () => this.nod(),
      doubleBlink: () => this.doubleBlink(),
      slowBlink: () => this.slowBlink(),
      microSmile: () => { if (this.expressionName !== 'neutral' || this.talking) return;
        this.seq('mouth', [{ do: () => this.setExpression('smallSmile', false), wait: [1.2, 2] },
          { do: () => this.setExpression('neutral', false) }]); },
      smilePulse: () => this.seq('mouth', [{ do: () => this.setExpression('bigSmile', false), wait: [.9, 1.6] },
        { do: () => this.setExpression('smile', false) }]),
      eyeRoll: () => this.eyeRoll(),
      bounce: () => this.seq('head', [{ do: () => this.hy.set(this.hb.y - 2), wait: .16 },
        { do: () => this.hy.set(this.hb.y) }]),
      sigh: () => this.seq('head', [{ do: () => this.hy.set(this.hb.y + 1.4), wait: [1, 1.6] },
        { do: () => this.hy.set(this.hb.y) }]),
      surprisedPulse: () => {
        if (this.stateName !== 'surprised' || this.talking) return
        const e = EXPR.surprised
        const baseOpen = e.open ?? 1
        const baseWide = e.wide ?? 1
        const baseMy = e.my ?? 0
        const baseEye = (this.st?.eye ?? 1) * (e.eye ?? 1)

        if (Math.random() < .2) {
          this.after(rand(.04, .12), () => this.startBlink(rand(.24, .32)))
        }

        this.seq('surprisePulse', [
          {
            do: () => {
              // Single subtle wow pulse: mouth and eyes pop slightly with a tiny head cue.
              this.open.set(baseOpen * rand(1.08, 1.16))
              this.wide.set(baseWide * rand(.91, .97))
              this.my.set(baseMy + rand(-.5, -.2))
              this.eyeS.set(baseEye * rand(1.03, 1.08))
              this.hy.set(this.hb.y + rand(.28, .52))
              this.hr.set(this.hb.rot + rand(.25, .7))
            },
            wait: [0.16, 0.24]
          },
          {
            do: () => {
              this.open.set(baseOpen)
              this.wide.set(baseWide)
              this.my.set(baseMy)
              this.eyeS.set(baseEye)
              this.hy.set(this.hb.y)
              this.hr.set(this.hb.rot)
            },
            wait: [0.24, 0.36]
          }
        ])
      },
      longClose: () => this.startBlink(1.2, rand(.4, .9), .03),
      swaySlow: () => this.headPulse({ rot: rand(-2.5, 2.5) }, rand(1.5, 2.8)),
      listeningSideRotateNod: () => {
        if (this.stateName !== 'listening') return
        const dir = Math.random() < .5 ? -1 : 1
        const a1 = rand(3.4, 4.5)
        const a2 = a1 * rand(.68, .8)
        const y1 = rand(.28, .4)
        const y2 = y1 * rand(.7, .82)
        this.seq('head', [
          {
            do: () => {
              this.hy.set(this.hb.y)
              this.hx.set(this.hb.x)
              this.hr.set(this.hb.rot + rand(-.16, .16))
              this.yaw.set(0)
            },
            wait: [0.07, 0.11]
          },
          {
            do: () => {
              this.hy.set(this.hb.y)
              this.hx.set(this.hb.x)
              this.hr.set(this.hb.rot + dir * a1)
              this.yaw.set(dir * y1)
            },
            wait: [0.14, 0.2]
          },
          {
            do: () => {
              this.hy.set(this.hb.y)
              this.hx.set(this.hb.x)
              this.hr.set(this.hb.rot + dir * rand(.12, .26))
              this.yaw.set(dir * rand(.02, .07))
            },
            wait: [0.1, 0.15]
          },
          {
            do: () => {
              this.hy.set(this.hb.y)
              this.hx.set(this.hb.x)
              this.hr.set(this.hb.rot - dir * a1)
              this.yaw.set(-dir * y1)
            },
            wait: [0.14, 0.2]
          },
          {
            do: () => {
              this.hy.set(this.hb.y)
              this.hx.set(this.hb.x)
              this.hr.set(this.hb.rot)
              this.yaw.set(0)
            },
            wait: [0.11, 0.16]
          },
          {
            do: () => {
              this.hy.set(this.hb.y)
              this.hx.set(this.hb.x)
              this.hr.set(this.hb.rot + dir * a2)
              this.yaw.set(dir * y2)
            },
            wait: [0.12, 0.18]
          },
          {
            do: () => {
              this.hy.set(this.hb.y)
              this.hx.set(this.hb.x)
              this.hr.set(this.hb.rot - dir * a2)
              this.yaw.set(-dir * y2)
            },
            wait: [0.12, 0.18]
          },
          {
            do: () => {
              this.hy.set(this.hb.y)
              this.hx.set(this.hb.x)
              this.hr.set(this.hb.rot)
              this.yaw.set(0)
            },
            wait: [0.12, 0.18]
          }
        ])
      },
      switchSide: () => { this.thinkSide = -(this.thinkSide || 1); const s = this.thinkSide;
        if (!this.mouse) this.gazeTo(.45 * s, this.gazeBias[1]);
        this.hb.rot = 5 * s; this.hr.set(this.hb.rot); }
      ,
      listeningMouthShift: () => {
        if (this.talking) return

        const nextExpr = wpick([
          [5, 'smallSmile'],
          [3, 'neutral'],
          [1, 'worried']
        ]) as ExpressionName

        this.seq('mouth', [
          {
            do: () => {
              this.setExpression(nextExpr, false)
              this.open.set(rand(.94, 1.14))
              this.wide.set(rand(.93, 1.05))
              this.cy.set(rand(-.1, .35))
            },
            wait: [1, 1.9]
          },
          { do: () => this.setExpression('smallSmile', false) }
        ])
      }
    };
  }

  /* ---------- scripted state loops (randomized every pass: no GIF feel) ---------- */
  loadingLoop() {
    this.seq('loop', [
      { do: () => this.gazeTo(-.55 + rand(-.08, .08), rand(-.1, .05)), wait: [.5, .9] },
      { do: () => this.gazeTo(0, 0), wait: [.25, .5] },
      { do: () => this.startBlink(.3), wait: [.35, .6] },
      { do: () => this.gazeTo(.55 + rand(-.08, .08), rand(-.1, .05)), wait: [.5, .9] },
      { do: () => this.gazeTo(0, 0), wait: [.25, .45] },
      { do: () => this.headPulse({ rot: rand(1.5, 3) * (Math.random() < .5 ? -1 : 1), y: rand(.5, 1.2) }, rand(.5, .8)), wait: [.7, 1.2] }
    ], true);
  }
  confusedLoop() {
    this.seq('loop', [
      { do: () => { this.gazeTo(-.6, -.1); this.hb.rot = -5; this.hr.set(-5); this.yaw.set(-.25); }, wait: [.9, 1.5] },
      { do: () => { this.gazeTo(.6, -.1); this.hb.rot = 5; this.hr.set(5); this.yaw.set(.25); }, wait: [.9, 1.5] },
      { do: () => { this.gazeTo(.1, 0); this.hb.rot = rand(-7, 7); this.hr.set(this.hb.rot); this.yaw.set(0);
        if (Math.random() < .5) this.startBlink(.3); }, wait: [.8, 1.4] }
    ], true);
  }

  /* ---------- state manager ---------- */
  setState(name: CharacterStateName) {
    const st = STATES[name]; if (!st) return;
    this.stateName = name; this.st = st;
    this.cancel('ev'); this.cancel('loop'); this.cancel('gaze'); this.cancel('head'); this.cancel('mouth');
    this.roll = null;
    this.hb = { x: st.head?.x || 0, y: st.head?.y || 0, rot: st.head?.rot || 0 };
    this.hx.set(this.hb.x); this.hy.set(this.hb.y); this.hr.set(this.hb.rot); this.yaw.set(0);
    this.gazeBias = st.gaze || [0, 0];
    if (!this.mouse) this.gazeTo(this.gazeBias[0], this.gazeBias[1]);
    this.setExpression(st.expr || 'neutral', false);
    if (st.talk && !this.talking) this.startTalking(false);
    else if (!st.talk && this.talking) this.stopTalking(false);
    this.mAmp.set(st.micro?.amp ?? .5); this.microSpeed = st.micro?.speed ?? 1;
    this.scheduleBlink();
    if (st.enter) st.enter(this);
    if (st.loop === "loadingLoop") this.loadingLoop()
    else if (st.loop === "confusedLoop") this.confusedLoop()
    else if (st.events) this.loopEvents()
    this.notify();
  }

  setExpression(name: ExpressionName, notify = true) {
    const E = EXPR[name]; if (!E) return;
    if (notify) this.cancel('mouth');
    this.expressionName = name;
    this.cy.set(E.cy || 0); this.cx.set(E.cx || 0); this.cs.set(E.cs ?? 1);
    this.asym.set(E.asym || 0); this.mx.set(E.mx || 0); this.my.set(E.my || 0);
    if (this.talking) this.cs.set(0);
    if (!this.talking) { this.open.set(E.open ?? 1); this.wide.set(E.wide ?? 1); }
    this.eyeS.set((this.st?.eye ?? 1) * (E.eye ?? 1));
    this.lid.set((this.st?.lid ?? 1) * (E.lid ?? 1));
    if (notify) this.notify();
  }

  /* ---------- blink ---------- */
  scheduleBlink() { const r = this.st?.blink || [2.5, 6]; this.bl.next = this.time + rand(r[0], r[1]); }
  startBlink(dur = .32, hold = 0, min = .05) {
    const b = this.bl;
    if (b.active) { b.queue++; return; }
    b.active = true; b.t = 0; b.dur = dur; b.hold = hold; b.min = min;
  }
  blink() { this.startBlink(.32); }
  doubleBlink() { this.startBlink(.3); this.bl.queue = Math.max(this.bl.queue, 1); }
  slowBlink() { this.startBlink(.85, .12, .04); }

  /* ---------- gaze ---------- */
  gazeTo(x: number, y: number) {
    this.gx.set(clamp(x, -1, 1))
    this.gy.set(clamp(y, -1, 1))
  }

  look(dir: string) {
    const d = DIRS[dir as DirectionName]
    if (d) {
      this.cancel('gaze')
      this.gazeTo(d[0], d[1])
    }
  }

  setGazeTarget(o: { x: number; y: number }) {
    this.cancel('gaze')
    this.gazeTo(o.x, o.y)
  }
  eyeRoll() {
    this.cancel('gaze');
    this.roll = { t0: this.time, dur: 1.5, bx: this.gx.t, by: this.gy.t };
    this.gx.w = 16; this.gy.w = 16;
  }

  /* ---------- head ---------- */
  headPulse(d: Partial<HeadBase>, hold: number) {
    this.seq('head', [
      { do: () => { if (d.rot != null) this.hr.set(this.hb.rot + d.rot);
        if (d.x != null) this.hx.set(this.hb.x + d.x);
        if (d.y != null) this.hy.set(this.hb.y + d.y); }, wait: hold },
      { do: () => { this.hr.set(this.hb.rot); this.hx.set(this.hb.x); this.hy.set(this.hb.y); } }
    ]);
  }
  nod() { this.seq('head', [{ do: () => this.hy.set(this.hb.y + 3), wait: .18 }, { do: () => this.hy.set(this.hb.y) }]); }
  doubleNod() { this.seq('head', [
    { do: () => this.hy.set(this.hb.y + 3), wait: .18 }, { do: () => this.hy.set(this.hb.y - .4), wait: .2 },
    { do: () => this.hy.set(this.hb.y + 2.6), wait: .18 }, { do: () => this.hy.set(this.hb.y) }]); }
  shakeHead() { this.seq('head', [
    { do: () => { this.yaw.set(-.6); this.hx.set(this.hb.x - 1.5); }, wait: .22 },
    { do: () => { this.yaw.set(.6); this.hx.set(this.hb.x + 1.5); }, wait: .22 },
    { do: () => { this.yaw.set(-.3); this.hx.set(this.hb.x - .8); }, wait: .2 },
    { do: () => { this.yaw.set(0); this.hx.set(this.hb.x); } }]); }
  tiltLeft() { this.headPulse({ rot: -7 }, 1.3); }
  tiltRight() { this.headPulse({ rot: 7 }, 1.3); }

  /* ---------- expressions (convenience) ---------- */
  smile() { this.setExpression('smile'); }
  smallSmile() { this.setExpression('smallSmile'); }
  bigSmile() { this.setExpression('bigSmile'); }
  sad() { this.setExpression('sad'); }
  worried() { this.setExpression('worried'); }
  surprised() { this.setExpression('surprised'); }
  think() { this.setExpression('thinking'); }
  confusedFace() { this.setExpression('confused'); }

  /* ---------- talking ---------- */
  startTalking(notify = true) {
    if (this.talking) return;
    this.talking = true; this.talkNext = this.time;
    this.cs.set(0);
    this._ow = [this.open.w, this.wide.w];
    this.open.w = 24; this.wide.w = 20;
    if (notify) this.notify();
  }
  stopTalking(notify = true) {
    if (!this.talking) return;
    this.talking = false;
    if (this._ow) { this.open.w = this._ow[0]; this.wide.w = this._ow[1]; }
    const E = EXPR[this.expressionName];
    this.open.set(E.open ?? 1); this.wide.set(E.wide ?? 1); this.cs.set(E.cs ?? 1);
    if (notify) this.notify();
  }

  reset() { this.stopTalking(false); this.setState('idle'); }

  /* ---------- pointer tracking ---------- */
  setMouseTracking(on: boolean) {
    this.mouse = !!on;
    if (on && !this._pm) {
      this._pm = (e: PointerEvent) => {
        const r = this.svg.getBoundingClientRect();
        const nx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1, 1);
        const ny = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1, 1);
        this.gazeTo(nx * .7, ny * .7);
      };
      window.addEventListener('pointermove', this._pm);
    } else if (!on && this._pm) {
      window.removeEventListener('pointermove', this._pm);
      this._pm = null;
      this.gazeTo(this.gazeBias[0], this.gazeBias[1]);
    }
  }

  /* ---------- debug ---------- */
  setDebug(on: boolean) {
    this.debug = !!on;
    if (on && !this.guides) this.buildGuides();
    if (this.guides) this.guides.style.opacity = on ? '1' : '0';
  }
  buildGuides() {
    const NS = 'http://www.w3.org/2000/svg';
    const g = document.createElementNS(NS, 'g');
    g.style.opacity = '0'; g.style.transition = 'opacity .25s'; g.style.pointerEvents = 'none';
    const bounds = document.createElementNS(NS, 'rect');
    bounds.setAttribute('x', String(36.73 - G.RX)); bounds.setAttribute('y', String(45.09 - G.RY));
    bounds.setAttribute('width', String((75.18 + 8 - 36.73) + 2 * G.RX)); bounds.setAttribute('height', String(8 + 2 * G.RY));
    bounds.setAttribute('fill', 'none'); bounds.setAttribute('stroke-dasharray', '2 2');
    bounds.setAttribute('stroke-width', '.6'); bounds.style.stroke = 'var(--placeholder-foreground, #999)';
    g.appendChild(bounds);
    const dot = () => { const c = document.createElementNS(NS, 'circle');
      c.setAttribute('r', '1.4'); c.style.fill = 'var(--primary, #10b981)'; g.appendChild(c); return c; };
    this.gL = dot(); this.gR = dot();
    const cross = document.createElementNS(NS, 'g');
    for (const pts of [[-2.2, 0, 2.2, 0], [0, -2.2, 0, 2.2]]) {
      const l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', String(59.955 + pts[0])); l.setAttribute('y1', String(49.09 + pts[1]));
      l.setAttribute('x2', String(59.955 + pts[2])); l.setAttribute('y2', String(49.09 + pts[3]));
      l.setAttribute('stroke-width', '.7'); l.style.stroke = 'var(--destructive, #ef4444)';
      cross.appendChild(l);
    }
    g.appendChild(cross); this.gT = cross;
    this.head.appendChild(g); this.guides = g;
  }

  notify() {
    if (this.onChange) {
      this.onChange()
    }
  }

  /* ---------- renderer: one absolute frame from base geometry ---------- */
  render() {
    const ph = this.microPhase, a = this.mAmp.x;
    const mX = a * .55 * (Math.sin(ph * 1.1) + .4 * Math.sin(ph * 2.3 + 1.7));
    const mY = a * .45 * (Math.sin(ph * .9 + .8) + .4 * Math.sin(ph * 2.1 + .3));
    const mR = a * .7 * Math.sin(ph * .65 + 2);
    const yaw = this.yaw.x;
    const nodProgress = this.nodDepth.x
    const nodDown = smooth(clamp(nodProgress, 0, 1))
    const nodUp = smooth(clamp(-nodProgress, 0, .45) / .45)
    const depthScaleX = 1 + nodDown * .012 + nodUp * .004
    const depthScaleY = 1 + nodDown * .078 + nodUp * .01
    const hx = this.hx.x + mX
    let hy = this.hy.x + mY
    const rot = this.hr.x + mR + nodDown * .95 - nodUp * .42
    hy += nodDown * 1.9 - nodUp * .45
    if (this.talking) hy += (1 - this.open.x) * .4;
    this.head.setAttribute('transform',
      `translate(${hx.toFixed(2)} ${hy.toFixed(2)}) rotate(${rot.toFixed(2)} ${G.CX} ${G.CY}) translate(${G.CX} ${G.CY}) scale(${depthScaleX.toFixed(3)} ${depthScaleY.toFixed(3)}) translate(${-G.CX} ${-G.CY})`);
    const faceScaleX = 1 + nodDown * .014 + nodUp * .004
    const faceScaleY = 1 + nodDown * .04 + nodUp * .01
    const faceLiftY = nodDown * 1.05 - nodUp * .22
    const facePitch = nodDown * 1.45 - nodUp * .5
    this.face.setAttribute('transform',
      `translate(${(yaw * .28).toFixed(2)} ${faceLiftY.toFixed(2)}) rotate(${facePitch.toFixed(2)} ${G.CX} ${G.CY}) translate(${G.CX} ${G.CY}) scale(${faceScaleX.toFixed(3)} ${faceScaleY.toFixed(3)}) translate(${-G.CX} ${-G.CY})`)

    const rawGx = this.gx.x * G.RX + mX * .25
    const rawGy = this.gy.x * G.RY + mY * .2
    const etx = rawGx + yaw * 5.2 + nodDown * .22 - nodUp * .12
    const ety = rawGy + nodDown * .62 - nodUp * .2
    this.eyesG.setAttribute('transform', `translate(${etx.toFixed(2)} ${ety.toFixed(2)})`);

    const openV = clamp(this.lid.x, .02, 1.15) * this.blinkVal();
    const es = this.eyeS.x;
    const sy = Math.max(.045, es * openV * (1 + nodDown * .01 + nodUp * .006));
    const bsx = 1 + (es - 1) * .55;
    const ay = Math.abs(yaw);
    const sxL = Math.max(.05, bsx * (1 - ay * .12 - Math.max(0, yaw) * .3));
    const sxR = Math.max(.05, bsx * (1 - ay * .12 - Math.max(0, -yaw) * .3));
    const eyeOffsetY = nodDown * .26 - nodUp * .12
    const eyeOffsetX = nodDown * .16
    this.eyeL.setAttribute('transform',
      `translate(${eyeOffsetX.toFixed(2)} ${eyeOffsetY.toFixed(2)}) translate(${G.ELX} ${G.ELY}) scale(${sxL.toFixed(3)} ${sy.toFixed(3)}) translate(${-G.ELX} ${-G.ELY})`);
    this.eyeR.setAttribute('transform',
      `translate(${(-eyeOffsetX).toFixed(2)} ${eyeOffsetY.toFixed(2)}) translate(${G.ERX} ${G.ERY}) scale(${sxR.toFixed(3)} ${sy.toFixed(3)}) translate(${-G.ERX} ${-G.ERY})`);

    const mtx = rawGx * .28 + yaw * 3.6 + this.mx.x + nodDown * .2 - nodUp * .08
    const mty = this.my.x + rawGy * .18 + nodDown * .74 - nodUp * .22
    this.mouthG.setAttribute('transform', `translate(${mtx.toFixed(2)} ${mty.toFixed(2)})`);
    const sleepyMouthY = this.stateName === 'sleepy' ? .78 : 1
    const ow = Math.max(.06, this.open.x) * (1 + nodDown * .06 + nodUp * .01) * sleepyMouthY
    const ww = Math.max(.2, this.wide.x) * (1 + nodDown * .012 + nodUp * .004)
    const barAY = ow > 1 ? 78.5 : G.MBY; // grow downward from top edge when taller than base
    this.bar.setAttribute('transform',
      `translate(${G.MBX} ${barAY}) scale(${ww.toFixed(3)} ${ow.toFixed(3)}) translate(${-G.MBX} ${-barAY})`);
    const csv = Math.max(0, this.cs.x);
    const sleepyCornerY = this.stateName === 'sleepy' ? .62 : 1
    const cornerScaleY = csv * sleepyCornerY
    const cvis = csv < .04 ? 'hidden' : 'visible';
    this.mL.setAttribute('visibility', cvis); this.mR.setAttribute('visibility', cvis);
    const cornerLift = nodDown * .58 - nodUp * .18
    const cornerSpread = nodDown * .2 - nodUp * .08
    const lty = this.cy.x - this.asym.x + cornerLift
    const rty = this.cy.x + this.asym.x + cornerLift
    const cornerBottomY = 78.51
    this.mL.setAttribute('transform',
      `translate(${(-this.cx.x - cornerSpread).toFixed(2)} ${lty.toFixed(2)}) translate(${G.MLX} ${cornerBottomY}) scale(${csv.toFixed(3)} ${cornerScaleY.toFixed(3)}) translate(${-G.MLX} ${-cornerBottomY})`);
    this.mR.setAttribute('transform',
      `translate(${(this.cx.x + cornerSpread).toFixed(2)} ${rty.toFixed(2)}) translate(${G.MRX} ${cornerBottomY}) scale(${csv.toFixed(3)} ${cornerScaleY.toFixed(3)}) translate(${-G.MRX} ${-cornerBottomY})`);

    if (this.debug && this.guides && this.gT && this.gL && this.gR) {
      this.gT.setAttribute('transform', `translate(${(this.gx.t * G.RX).toFixed(2)} ${(this.gy.t * G.RY).toFixed(2)})`);
      this.gL.setAttribute('cx', (G.ELX + etx).toFixed(2)); this.gL.setAttribute('cy', (G.ELY + ety).toFixed(2));
      this.gR.setAttribute('cx', (G.ERX + etx).toFixed(2)); this.gR.setAttribute('cy', (G.ERY + ety).toFixed(2));
    }
    if (this.onStatus && this.time - this._lastStat > .12) {
      this._lastStat = this.time;
      const b = this.bl;
      this.onStatus({
        state: this.stateName,
        expr: this.expressionName,
        gazet: `${this.gx.t.toFixed(2)}, ${this.gy.t.toFixed(2)}`,
        gazep: `${this.gx.x.toFixed(2)}, ${this.gy.x.toFixed(2)}`,
        vel: (Math.abs(this.gx.v) + Math.abs(this.gy.v)).toFixed(2),
        blink: b.active ? `blinking ${(this.blinkVal() * 100) | 0}%` : `open, next ${(b.next - this.time).toFixed(1)}s`,
        head: `${this.hr.x.toFixed(1)} deg, y ${this.hy.x.toFixed(1)}`,
        mouth: this.talking ? `talking, open ${this.open.x.toFixed(2)}` : `open ${this.open.x.toFixed(2)}, wide ${this.wide.x.toFixed(2)}`
      });
    }
  }

  destroy() {
    cancelAnimationFrame(this._rafId);
    if (this._pm) window.removeEventListener('pointermove', this._pm);
    this.cancel('ev'); this.cancel('loop'); this.cancel('gaze'); this.cancel('head'); this.cancel('mouth');
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
  "thinking",
  "loading",
  "happy",
  "sad",
  "surprised",
  "confused",
  "excited",
  "sleepy",
] as const

export type CharacterState = (typeof CHARACTER_STATES)[number]

export interface AnimatedCharacterHandle {
  setState: (state: CharacterState) => void
  look: (dir: string) => void
  setGazeTarget: (target: { x: number; y: number }) => void
  blink: () => void
  doubleBlink: () => void
  slowBlink: () => void
  eyeRoll: () => void
  nod: () => void
  doubleNod: () => void
  shakeHead: () => void
  tiltLeft: () => void
  tiltRight: () => void
  setExpression: (name: string) => void
  startTalking: () => void
  stopTalking: () => void
  setMouseTracking: (on: boolean) => void
  reset: () => void
}

export interface AnimatedCharacterProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** Behavioral state preset. Transitions blend from the current pose. */
  state?: CharacterState
  /** When true, the eyes smoothly follow the pointer; when false they return to the state's gaze. */
  mouseTracking?: boolean
}

export const AnimatedCharacter = React.forwardRef<
  AnimatedCharacterHandle,
  AnimatedCharacterProps
>(function AnimatedCharacter(
  { state = "idle", mouseTracking = false, className, ...props },
  ref
) {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const engineRef = React.useRef<CharacterEngine | null>(null)

  React.useEffect(() => {
    if (!svgRef.current) return
    const engine = new CharacterEngine(svgRef.current)
    engineRef.current = engine
    return () => {
      engine.destroy()
      engineRef.current = null
    }
  }, [])

  React.useEffect(() => {
    engineRef.current?.setState(state)
  }, [state])

  React.useEffect(() => {
    engineRef.current?.setMouseTracking(mouseTracking)
  }, [mouseTracking])

  React.useImperativeHandle(ref, () => {
    return {
      setState: (nextState: CharacterState) => engineRef.current?.setState(nextState),
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
      setMouseTracking: (on: boolean) => engineRef.current?.setMouseTracking(on),
      reset: () => engineRef.current?.reset(),
    }
  }, [])

  return (
    <div className={cn("text-foreground", className)} {...props}>
      {/* Original artwork: geometry preserved verbatim; wrapper groups only. */}
      <svg
        ref={svgRef}
        viewBox="0 0 119.91 119.91"
        role="img"
        aria-label="Animated character"
        className="block h-auto w-24 mx-auto"
      >
        <g data-part="head">
          <path
            data-part="face"
            fill="currentColor"
            d="M105.44,39.42h-2.03c-3.95-19.03-15.78-24.58-43.46-24.58s-39.51,5.55-43.46,24.58h-2.03c-1.52,0-2.76,1.23-2.76,2.76v13.78c0,1.52,1.23,2.76,2.76,2.76h.39c0,.41-.01.81-.01,1.23,0,35.84,9.27,45.11,45.11,45.11s45.11-9.28,45.11-45.11c0-.42,0-.82-.01-1.23h.39c1.52,0,2.76-1.23,2.76-2.76v-13.78c0-1.52-1.23-2.76-2.76-2.76ZM97.06,59.95c0,31.56-5.55,37.11-37.11,37.11s-37.11-5.55-37.11-37.11c0-.42,0-.82,0-1.23h8.16v-19.3h-6.48c1.23-5.03,3.26-8.61,6.48-11.12v11.12h19.3v-16.34c2.91-.17,6.11-.24,9.65-.24s6.74.08,9.65.24v16.34h19.3v-11.12c3.22,2.51,5.25,6.08,6.48,11.12h-6.48v19.3h8.16c0,.41,0,.81,0,1.23Z"
          />
          <rect data-part="nose" fill="currentColor" x="50.3" y="39.42" width="19.3" height="19.3" />
          <g data-part="eyes">
            <rect data-part="eye-left" fill="currentColor" x="36.73" y="45.09" width="8" height="8" />
            <rect data-part="eye-right" fill="currentColor" x="75.18" y="45.09" width="8" height="8" />
          </g>
          <g data-part="mouth-group">
            <rect data-part="mouth-left" fill="currentColor" x="36.7" y="70.45" width="8.06" height="8.06" />
            <rect data-part="mouth-right" fill="currentColor" x="75.15" y="70.45" width="8.06" height="8.06" />
            <rect data-part="mouth" fill="currentColor" x="44.75" y="78.5" width="30.4" height="8.06" />
          </g>
        </g>
      </svg>
    </div>
  )
})
