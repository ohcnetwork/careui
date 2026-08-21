import { useEffect, useRef, useState } from "react";

import { type ComponentDoc } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CareFillyClassic,
  CHARACTER_STATES,
  type CareFillyClassicHandle,
  type CareFillyClassicState,
  type CareFillyClassicVariant,
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
  variant = "light",
  previewClassName,
}: {
  variant?: CareFillyClassicVariant;
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
        variant="light"
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
  description: (
    <ul className="mt-2 space-y-2 text-sm">
      <li>
        <strong>CareFilly</strong>{" "}(<code>care-filly</code>) — layered face-plate character. The face-plate translates independently, creating a parallax depth illusion on every nod. Use for prominent roles: onboarding, empty states, loading screens, full-page assistants.
      </li>
      <li>
        <strong>CareFillyClassic</strong>{" "}(<code>care-filly-classic</code>) — classic pixel-head character. The entire head rotates as one rigid unit. Use for compact, inline contexts: chat bubbles, search bars, status indicators. Available in <code>light</code> and <code>dark</code> variants.
      </li>
    </ul>
  ),
  installation: {
    cli: "pnpm dlx shadcn@latest add https://careui.ohc.network/registry/care-ui/animated-character/animated-character.json",
    manual:
      "Copy the Care Filly implementation and ensure it is exported from your local UI index if you keep one.",
  },
  usage: `// Layered character — prominent roles (onboarding, empty states, full-page assistants)
import { CareFilly } from "@/components/ui/care-filly"
<CareFilly state="idle" />

// Classic character — inline roles (chat, search, status indicators)
import { CareFillyClassic } from "@/components/ui/care-filly-classic"
<CareFillyClassic state="idle" variant="light" />`,

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
        "CareFilly has no variant prop — dark mode requires a white SVG face-fill overlay so the cutout mask stays visible. Wrap the character in a relative container, place the fill path behind it, then set color to black via the color prop.",
      preview: <FillyDarkDemo />,
      code: `{/* White overlay fills the face cutout so it reads on dark backgrounds */}
<div className="relative mx-auto w-fit">
  <svg viewBox="0 0 119.91 119.91" className="absolute inset-0 h-full w-full" aria-hidden>
    <path fill="white" d="M59.96,109.06c-37.53,0-48.78-10.68-49.11-47.4..." />
  </svg>
  <CareFilly
    ref={ref}
    state={state}
    color="black"
    className="relative"
  />
</div>`,
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
      trailingProps: {
        title: "CareFilly props",
        description: 'import { CareFilly } from "@/components/ui/care-filly"',
        props: [
          { name: "state", type: `"idle" | "listening" | "talking" | "writing" | "thinking" | "loading" | "happy" | "sad" | "surprised" | "confused" | "excited" | "sleepy"`, description: "Behavioral state preset. Transitions blend from the current pose." },
          { name: "mouseTracking", type: "boolean", description: "Eyes smoothly follow the pointer when true; return to the state gaze when false." },
          { name: "size", type: "string | number", description: 'CSS width for the SVG (e.g. "32px", "2rem"). Overrides the default 6rem.' },
          { name: "color", type: "string", description: 'CSS color tinting the entire character via currentColor (e.g. "#3b82f6").' },
          { name: "ref", type: "CareFillyHandle", description: "Imperative API: setState, nod, yesNod, noShake, shakeHead, blink, eyeRoll, startTalking, stopTalking, setGazeTarget, setMouseTracking, reset." },
          { name: "className", type: "string", description: "Additional CSS classes on the wrapper." },
        ],
      },
    },
    {
      name: "Classic",
      heading: "Classic",
      description:
        "Use when you need a lighter footprint — the entire head rotates as one rigid unit. Better suited for inline UI elements, smaller sizes, or contexts where subtle animation is preferred over expressive depth.",
      preview: <AnimatedCharacterPlayground variant="light" />,
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
      code: `const characterRef = useRef<CareFillyClassicHandle>(null)
const [state, setState] = useState<CareFillyClassicState>("idle")
const [mouseTracking, setMouseTracking] = useState(false)

<CareFillyClassic
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
  <CareFillyClassic state={current.state} variant="light" size="20px" />
  <span className={cn(
    "text-sm text-foreground",
    current.shimmer && "bg-linear-to-r from-foreground/20 via-foreground to-foreground/20 bg-clip-text text-transparent animate-[shimmer_1.4s_linear_infinite] bg-size-[200%_100%]"
  )}>
    {current.label}
  </span>
</div>`,
      trailingProps: {
        title: "CareFillyClassic props",
        description: 'import { CareFillyClassic } from "@/components/ui/care-filly-classic"',
        props: [
          { name: "state", type: `"idle" | "listening" | "talking" | "writing" | "thinking" | "loading" | "happy" | "sad" | "surprised" | "confused" | "excited" | "sleepy"`, description: "Behavioral state preset. Transitions blend from the current pose." },
          { name: "mouseTracking", type: "boolean", description: "Eyes smoothly follow the pointer when true; return to the state gaze when false." },
          { name: "variant", type: '"light" | "dark"', description: "Selects the visual shell. light — pixel head on light background; dark — white shell with dark pixel features." },
          { name: "size", type: "string | number", description: 'CSS width for the SVG (e.g. "32px", "2rem"). Overrides the default.' },
          { name: "color", type: "string", description: 'CSS color tinting the entire character via currentColor (e.g. "#3b82f6").' },
          { name: "ref", type: "CareFillyClassicHandle", description: "Imperative API: setState, nod, shakeHead, blink, eyeRoll, startTalking, stopTalking, setGazeTarget, setMouseTracking, reset." },
          { name: "className", type: "string", description: "Additional CSS classes on the wrapper." },
        ],
      },
    },
  ],
};
