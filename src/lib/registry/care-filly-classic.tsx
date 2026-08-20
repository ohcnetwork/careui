import { useEffect, useRef, useState } from "react";

import { type ComponentDoc } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CareFillyClassic,
  CHARACTER_STATES,
  type CareFillyClassicHandle,
  type CareFillyClassicState,
  type CharacterVariantName,
} from "@/components/ui/care-filly-classic";
import {
  CareFilly,
  FILLY_CHARACTER_STATES,
  type CareFillyHandle,
  type CareFillyState,
} from "@/components/ui/care-filly";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const FACE_STATES = CHARACTER_STATES.filter((state) => state !== "writing");
const FILLY_FACE_STATES = FILLY_CHARACTER_STATES.filter((s) => s !== "writing");

const FILLY_INNER_FACE_PATH =
  "M59.96,109.06c-37.53,0-48.78-10.68-49.11-47.4-1.89-1.2-3.14-3.3-3.14-5.7v-13.79c0-3.33,2.43-6.11,5.61-6.65,5.59-20.54,21.5-24.68,46.64-24.68s41.04,4.13,46.63,24.68c3.18.55,5.61,3.32,5.61,6.65v13.79c0,2.39-1.25,4.5-3.14,5.7-.33,36.72-11.58,47.4-49.1,47.4Z";

function AnimatedCharacterPlayground({
  variant = "classic",
  previewClassName,
}: {
  variant?: CharacterVariantName;
  previewClassName?: string;
}) {
  const characterRef = useRef<CareFillyClassicHandle>(null);
  const [state, setState] = useState<CareFillyClassicState>("idle");
  const [mouseTracking, setMouseTracking] = useState(false);
  const trackingId = `character-mouse-tracking-${variant}`;

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardContent className="flex flex-col gap-5 pt-6">
        <div
          className={cn("bg-muted rounded-xl px-14 py-10", previewClassName)}
        >
          <CareFillyClassic
            ref={characterRef}
            state={state}
            mouseTracking={mouseTracking}
            variant={variant}
            className="mx-auto max-w-xs"
          />
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
        <div className="flex items-center justify-center gap-2 border-t pt-4">
          <Switch
            id={trackingId}
            checked={mouseTracking}
            onCheckedChange={setMouseTracking}
          />
          <Label htmlFor={trackingId}>Mouse tracking</Label>
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
        <div className="flex flex-wrap justify-center gap-2">
          {FILLY_FACE_STATES.map((s) => (
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

function FillyGesturesDemo() {
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

function FillyDarkDemo() {
  const ref = useRef<CareFillyHandle>(null);
  const [state, setState] = useState<CareFillyState>("idle");
  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className="rounded-xl bg-black py-12">
          <div className="relative mx-auto w-fit">
            <svg
              viewBox="0 0 119.91 119.91"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <path fill="white" d={FILLY_INNER_FACE_PATH} />
            </svg>
            <CareFilly
              ref={ref}
              state={state}
              className="relative text-black **:data-[part=wave-left]:text-white **:data-[part=wave-right]:text-white"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {FILLY_FACE_STATES.map((s) => (
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

function FillyMouseTrackingDemo() {
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

const ASSISTANT_STEPS: Array<{
  state: CareFillyClassicState;
  label: string;
  shimmer?: boolean;
}> = [
  { state: "listening", label: "Listening…" },
  { state: "thinking", label: "Thinking…", shimmer: true },
  { state: "talking", label: "Here's what I found for you." },
  { state: "loading", label: "Loading results…", shimmer: true },
];

const FILLY_ASSISTANT_STEPS: Array<{
  state: CareFillyState;
  label: string;
  shimmer?: boolean;
}> = [
  { state: "listening", label: "Listening…" },
  { state: "thinking", label: "Thinking…", shimmer: true },
  { state: "talking", label: "Here’s what I found for you." },
  { state: "loading", label: "Loading results…", shimmer: true },
];

function FillyInlineAssistant() {
  const ref = useRef<CareFillyHandle>(null);
  const [step, setStep] = useState(0);
  const current = FILLY_ASSISTANT_STEPS[step];

  useEffect(() => {
    const durations = [2000, 2500, 3000, 2000];
    const id = setTimeout(
      () => setStep((s) => (s + 1) % FILLY_ASSISTANT_STEPS.length),
      durations[step]
    );
    return () => clearTimeout(id);
  }, [step]);

  return (
    <div className="bg-background flex max-w-sm items-center gap-3 px-4 py-3">
      <CareFilly
        ref={ref}
        state={current.state}
        size="32px"
        className="shrink-0"
      />
      <div className="flex h-5 min-w-0 flex-1 items-center overflow-hidden">
        <span
          key={step}
          className={cn(
            "text-foreground text-sm whitespace-nowrap",
            current.shimmer && [
              "from-foreground/20 via-foreground to-foreground/20 bg-linear-to-r bg-size-[200%_100%]",
              "animate-[shimmer_1.4s_linear_infinite] bg-clip-text text-transparent",
            ]
          )}
        >
          {current.label}
        </span>
      </div>
      <style>{`@keyframes shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}`}</style>
    </div>
  );
}

function ClassicInlineAssistant() {
  const ref = useRef<CareFillyClassicHandle>(null);
  const [step, setStep] = useState(0);
  const current = ASSISTANT_STEPS[step];

  useEffect(() => {
    const durations = [2000, 2500, 3000, 2000];
    const id = setTimeout(
      () => setStep((s) => (s + 1) % ASSISTANT_STEPS.length),
      durations[step]
    );
    return () => clearTimeout(id);
  }, [step]);

  return (
    <div className="bg-background flex max-w-sm items-center gap-3 px-4 py-3">
      <CareFillyClassic
        ref={ref}
        state={current.state}
        variant="classic"
        size="32px"
        color="#3b82f6"
        className="shrink-0"
      />
      <div className="flex h-5 min-w-0 flex-1 items-center overflow-hidden">
        <span
          key={step}
          className={cn(
            "text-foreground text-sm whitespace-nowrap",
            current.shimmer && [
              "from-foreground/20 via-foreground to-foreground/20 bg-linear-to-r bg-size-[200%_100%]",
              "animate-[shimmer_1.4s_linear_infinite] bg-clip-text text-transparent",
            ]
          )}
        >
          {current.label}
        </span>
      </div>
      <style>{`@keyframes shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}`}</style>
    </div>
  );
}

export const animatedCharacterDoc: ComponentDoc = {
  id: "animated-character",
  name: "CareFilly",
  description:
    "Care Filly is a spring-driven animated assistant. State presets compose independent gaze, blink, mouth and head layers into one continuously animated SVG frame — transitions blend from the current pose with no snapping or drift.",
  installation: {
    cli: "pnpm dlx shadcn@latest add https://careui.ohc.network/registry/care-ui/animated-character/animated-character.json",
    manual:
      "Copy the Care Filly implementation and ensure it is exported from your local UI index if you keep one.",
  },
  usage: `import { CareFillyClassic } from "@/components/ui/care-filly-classic"

<CareFillyClassic state="idle" />`,

  preview: {
    component: <FillyPlayground />,
    code: `import { CareFilly } from "@/components/ui/care-filly"

<CareFilly state="idle" />`,
  },
  examples: [
    {
      name: "Imperative API",
      description:
        "One-shot actions via the ref handle: blink(), nod(), shakeHead(), eyeRoll(), setGazeTarget({ x, y }), startTalking(), and more.",
      preview: (
        <CareFillyClassic state="listening" className="mx-auto max-w-48" />
      ),
      code: `characterRef.current?.nod()
characterRef.current?.setGazeTarget({ x: 0.4, y: -0.2 })
characterRef.current?.startTalking()`,
    },
    {
      name: "Filly — Layered",
      description:
        "Use when you want depth and expressiveness — the face-plate translates independently of the body, creating a parallax illusion. Best for prominent roles: onboarding flows, empty states, or full-page assistants.",
      preview: <FillyPlayground />,
      code: `import { CareFilly } from "@/components/ui/care-filly"

<CareFilly state={state} />`,
    },
    {
      name: "Filly — Gestures",
      description:
        "yesNod() and noShake() produce human-like affirming and negating gestures.",
      preview: <FillyGesturesDemo />,
      code: `ref.current?.yesNod()   // 3-beat nod with smile
ref.current?.noShake()  // Decaying left-right shake with blinks`,
    },
    {
      name: "Filly — Mouse tracking",
      description:
        "Eyes and head follow the pointer with natural spring physics.",
      preview: <FillyMouseTrackingDemo />,
      code: `<CareFilly state="idle" mouseTracking={true} />`,
    },
    {
      name: "Filly — Dark background",
      description:
        "Original SVG colors: black shell, white face panel, black pixel features on a dark background.",
      preview: <FillyDarkDemo />,
      code: `<CareFilly state={state} className="text-black" />`,
    },
    {
      name: "Filly — Inline assistant",
      description:
        "Same inline AI assistant pattern as Classic but using the layered Filly character. The face-plate depth adds expressiveness even at small sizes.",
      preview: <FillyInlineAssistant />,
      code: `const STEPS = [
  { state: "listening", label: "Listening…" },
  { state: "thinking",  label: "Thinking…",  shimmer: true },
  { state: "talking",   label: "Here’s what I found for you." },
  { state: "loading",   label: "Loading results…", shimmer: true },
]

<div className="flex items-center gap-3">
  <CareFilly state={current.state} size="32px" className="shrink-0" />
  <span className={cn(
    "text-sm text-foreground",
    current.shimmer && "bg-linear-to-r from-foreground/20 via-foreground to-foreground/20 bg-clip-text text-transparent animate-[shimmer_1.4s_linear_infinite] bg-size-[200%_100%]"
  )}>
    {current.label}
  </span>
</div>`,
    },
    {
      name: "Classic",
      heading: "Classic",
      description:
        "Use when you need a lighter footprint — the entire head rotates as one rigid unit. Better suited for inline UI elements, smaller sizes, or contexts where subtle animation is preferred over expressive depth.",
      preview: <AnimatedCharacterPlayground variant="classic" />,
      code: `import { CareFillyClassic } from "@/components/ui/care-filly-classic"

<CareFillyClassic state={state} />`,
    },
    {
      name: "Dark background example",
      description: "Dark variant rendered on a gray-950 background.",
      preview: (
        <AnimatedCharacterPlayground
          variant="dark"
          previewClassName="bg-gray-950"
        />
      ),
      code: `const characterRef = useRef<AnimatedCharacterHandle>(null)
const [state, setState] = useState<CharacterState>("idle")
const [mouseTracking, setMouseTracking] = useState(false)

<AnimatedCharacter
  ref={characterRef}
  variant="dark"
  state={state}
  mouseTracking={mouseTracking}
/>`,
    },
    {
      name: "Classic — Inline assistant",
      description:
        "Compact inline AI assistant pattern: the character cycles through listening → thinking → talking → loading with a shimmer text effect. Drop this pattern into chat interfaces, search bars, or any inline prompt response.",
      preview: <ClassicInlineAssistant />,
      code: `const STEPS = [
  { state: "listening", label: "Listening…" },
  { state: "thinking",  label: "Thinking…",  shimmer: true },
  { state: "talking",   label: "Here's what I found for you." },
  { state: "loading",   label: "Loading results…", shimmer: true },
]

const [step, setStep] = useState(0)
const current = STEPS[step]

useEffect(() => {
  const durations = [2000, 2500, 3000, 2000]
  const id = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), durations[step])
  return () => clearTimeout(id)
}, [step])

<div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3 shadow-sm">
  <AnimatedCharacter state={current.state} variant="classic" size="20px" />
  <span className={cn(
    "text-sm text-foreground",
    current.shimmer && "bg-linear-to-r from-foreground/20 via-foreground to-foreground/20 bg-clip-text text-transparent animate-[shimmer_1.4s_linear_infinite] bg-size-[200%_100%]"
  )}>
    {current.label}
  </span>
</div>`,
    },
  ],
  props: [
    {
      name: "state",
      type: `"idle" | "listening" | "talking" | "writing" | "thinking" | "loading" | "happy" | "sad" | "surprised" | "confused" | "excited" | "sleepy"`,
      description:
        "Behavioral state preset. Transitions blend from the current pose.",
    },
    {
      name: "mouseTracking",
      type: "boolean",
      description:
        "Eyes smoothly follow the pointer when true; return to the state gaze when false.",
    },
    {
      name: "variant",
      type: '"classic" | "panel" | "dark"',
      description:
        "Selects the visual shell while preserving the same animation engine and expression states.",
    },
    {
      name: "size",
      type: "string | number",
      description:
        'CSS width for the character SVG — any valid CSS length (e.g. "20px", "2rem", 48). Overrides the default width. Use this to embed the character at any size without extra wrapper divs.',
    },
    {
      name: "ref",
      type: "AnimatedCharacterHandle",
      description:
        "Imperative API: setState, look, setGazeTarget, blink, nod, shakeHead, eyeRoll, startTalking, stopTalking, reset, ...",
    },
    {
      name: "color",
      type: "string",
      description:
        'CSS color value applied to the character (e.g. "#3b82f6", "oklch(70% 0.2 250)"). The SVG uses currentColor throughout, so this tints the entire character.',
    },
    {
      name: "className",
      type: "string",
      description:
        "Additional CSS classes on the wrapper (sizing, color via text-*).",
    },
  ],
};
