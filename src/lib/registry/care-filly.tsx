import { useRef, useState } from "react";

import { type ComponentDoc } from "@/lib/types";
import {
  CareFilly,
  FILLY_CHARACTER_STATES,
  type CareFillyHandle,
  type CareFillyState,
} from "@/components/ui/animated-character-filly";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FACE_STATES = FILLY_CHARACTER_STATES.filter((s) => s !== "writing");

/* Inner face window — the white oval that fills the head interior in the reference SVG */
const FILLY_INNER_FACE_PATH =
  "M59.96,109.06c-37.53,0-48.78-10.68-49.11-47.4-1.89-1.2-3.14-3.3-3.14-5.7v-13.79c0-3.33,2.43-6.11,5.61-6.65,5.59-20.54,21.5-24.68,46.64-24.68s41.04,4.13,46.63,24.68c3.18.55,5.61,3.32,5.61,6.65v13.79c0,2.39-1.25,4.5-3.14,5.7-.33,36.72-11.58,47.4-49.1,47.4Z";

function DarkFillyPlayground() {
  const ref = useRef<CareFillyHandle>(null);
  const [state, setState] = useState<CareFillyState>("idle");

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className="rounded-xl bg-black py-12">
          <div className="relative mx-auto w-fit">
            {/* White inner face — fills face cutout holes with white so features show black-on-white */}
            <svg
              viewBox="0 0 119.91 119.91"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <path fill="white" d={FILLY_INNER_FACE_PATH} />
            </svg>
            {/* Character in black — original reference SVG colors: black shell, black features on white face */}
            <CareFilly
              ref={ref}
              state={state}
              className="relative text-black **:data-[part=wave-left]:text-white **:data-[part=wave-right]:text-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {FACE_STATES.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={state === s ? "default" : "outline"}
              onClick={() => setState(s)}
              className="capitalize"
            >
              {s}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MouseTrackingDemo() {
  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className="bg-muted rounded-xl px-14 py-10">
          <p className="text-muted-foreground mb-4 text-center text-sm">
            Move your mouse over the character
          </p>
          <CareFilly
            state="idle"
            mouseTracking={true}
            className="mx-auto max-w-xs"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function GesturesDemo() {
  const ref = useRef<CareFillyHandle>(null);

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className="bg-muted rounded-xl px-14 py-10">
          <CareFilly ref={ref} state="idle" className="mx-auto max-w-xs" />
        </div>

        <div className="flex justify-center gap-3">
          <Button size="lg" onClick={() => ref.current?.yesNod()}>
            Yes ↓
          </Button>
          <Button size="lg" onClick={() => ref.current?.noShake()}>
            No ↔
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FillyPlayground() {
  const ref = useRef<CareFillyHandle>(null);
  const [state, setState] = useState<CareFillyState>("idle");

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className="bg-muted rounded-xl px-14 py-10">
          <CareFilly ref={ref} state={state} className="mx-auto max-w-xs" />
        </div>

        {/* State preset + gesture buttons in one row */}
        <div className="flex flex-wrap justify-center gap-2">
          {FACE_STATES.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={state === s ? "default" : "outline"}
              onClick={() => setState(s)}
              className="capitalize"
            >
              {s}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export const animatedCharacterFillyDoc: ComponentDoc = {
  id: "animated-character-filly",
  name: "Filly",
  description:
    "Filly is a spring-driven animated AI character using the Filly-New-Series SVG design. Head nodding is expressed as face-plate translation (±9 SVG units horizontal, ±8.5 vertical) that maps directly to the nodding keyframes — so every state animation automatically produces the correct nod motion. All expressions, blink cadences, talking, loading shimmer, writing stroke, and imperative actions are identical to the original Care Filly.",
  installation: {
    cli: "pnpm dlx shadcn@latest add https://careui.ohc.network/registry/care-ui/animated-character-filly/animated-character-filly.json",
    manual: "Copy animated-character-filly.tsx into your components/ui folder.",
  },
  usage: `import { CareFilly } from "@/components/ui/care-filly"

<CareFilly state="idle" />`,
  preview: {
    component: <FillyPlayground />,
    code: `<AnimatedCharacterFilly state="idle" />`,
  },
  examples: [
    {
      name: "Dark background",
      description:
        "White character on a dark background with an offset back-head layer for depth. All states available.",
      preview: <DarkFillyPlayground />,
      code: `<div className="relative">
  {/* Offset back-head for depth */}
  <svg viewBox="0 0 119.91 119.91" className="absolute inset-0 h-full w-full text-white opacity-20"
    style={{ transform: "translate(5px, 6px)" }} aria-hidden>
    <path fill="currentColor" d="M108.2,42.17v13.79..." />
  </svg>
  <AnimatedCharacterFilly state={state} className="relative text-white" />
</div>`,
    },
    {
      name: "Imperative API",
      description:
        "One-shot actions via the ref handle: nod(), doubleNod(), shakeHead(), tiltLeft(), tiltRight(), eyeRoll(), blink(), startTalking(), stopTalking(), setGazeTarget({ x, y }).",
      preview: <CareFilly state="listening" className="mx-auto max-w-48" />,
      code: `const ref = useRef<AnimatedCharacterFillyHandle>(null)

ref.current?.nod()
ref.current?.shakeHead()
ref.current?.startTalking()
ref.current?.setGazeTarget({ x: 0.4, y: -0.2 })`,
    },
    {
      name: "Gestures",
      description:
        "Imperative gesture methods: yesNod() for affirming gestures, noShake() for negation. Ideal for conversational responses.",
      preview: <GesturesDemo />,
      code: `const ref = useRef<AnimatedCharacterFillyHandle>(null)

ref.current?.yesNod()   // Affirming 3-beat nod with smile
ref.current?.noShake()  // Fast left-right shake with blink`,
    },
    {
      name: "Mouse Tracking",
      description:
        "Eyes and head follow the pointer. Idle state with natural blink cadence; no state-specific animations or nods unless triggered manually.",
      preview: <MouseTrackingDemo />,
      code: `<AnimatedCharacterFilly
  state="idle"
  mouseTracking={true}
  className="mx-auto max-w-48"
/>`,
    },
  ],
  props: [
    {
      name: "state",
      type: `"idle" | "listening" | "talking" | "writing" | "thinking" | "loading" | "happy" | "sad" | "surprised" | "confused" | "excited" | "sleepy"`,
      description:
        "Behavioral state preset. Transitions blend continuously from the current pose.",
    },
    {
      name: "mouseTracking",
      type: "boolean",
      description:
        "Eyes follow the pointer when true; return to the state gaze when false.",
    },
  ],
};
