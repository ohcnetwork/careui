import { useEffect, useRef, useState } from "react"

import { type ComponentDoc } from "@/lib/types"
import { cn } from "@/lib/utils"
import {
  AnimatedCharacter,
  CHARACTER_STATES,
  type AnimatedCharacterHandle,
  type CharacterState,
  type CharacterVariantName,
} from "@/components/ui/animated-character"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const FACE_STATES = CHARACTER_STATES.filter((state) => state !== "writing")

function AnimatedCharacterPlayground({
  variant = "classic",
  initialState = "idle",
  previewClassName,
}: {
  variant?: CharacterVariantName
  initialState?: CharacterState
  previewClassName?: string
}) {
  const characterRef = useRef<AnimatedCharacterHandle>(null)
  const [state, setState] = useState<CharacterState>(initialState)
  const [mouseTracking, setMouseTracking] = useState(false)
  const trackingId = `character-mouse-tracking-${variant}`

  useEffect(() => {
    setState(initialState)
  }, [initialState])

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className={cn("bg-muted rounded-xl px-14 py-10", previewClassName)}>
          <AnimatedCharacter
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
  )
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
  usage: `import { AnimatedCharacter } from "@/components/ui/animated-character"

<AnimatedCharacter state="idle" />`,
  preview: {
    component: <AnimatedCharacterPlayground variant="classic" />,
    code: `<AnimatedCharacter state="idle" />`,
  },
  examples: [
    {
      name: "State playground",
      description:
        "Face-driven states with a mouse-tracking toggle. Writing is shown as a dedicated standalone state example below.",
      preview: <AnimatedCharacterPlayground variant="classic" />,
      code: `const characterRef = useRef<AnimatedCharacterHandle>(null)
const [state, setState] = useState<CharacterState>("idle")
const [mouseTracking, setMouseTracking] = useState(false)

<AnimatedCharacter
  ref={characterRef}
  variant="classic"
  state={state}
  mouseTracking={mouseTracking}
/>`,
    },
    {
      name: "Dark background example",
      description:
        "Dark variant rendered on a gray-950 background, initialized to loading so the shimmer is immediately visible.",
      preview: (
        <AnimatedCharacterPlayground
          variant="dark"
          initialState="loading"
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
      name: "Imperative API",
      description:
        "One-shot actions via the ref handle: blink(), nod(), shakeHead(), eyeRoll(), setGazeTarget({ x, y }), startTalking(), and more.",
      preview: <AnimatedCharacter state="listening" className="mx-auto max-w-48" />,
      code: `characterRef.current?.nod()
characterRef.current?.setGazeTarget({ x: 0.4, y: -0.2 })
characterRef.current?.startTalking()`,
    },
  ],
  props: [
    {
      name: "state",
      type: `"idle" | "listening" | "talking" | "writing" | "thinking" | "loading" | "happy" | "sad" | "surprised" | "confused" | "excited" | "sleepy"`,
      description: "Behavioral state preset. Transitions blend from the current pose.",
    },
    {
      name: "mouseTracking",
      type: "boolean",
      description: "Eyes smoothly follow the pointer when true; return to the state gaze when false.",
    },
    {
      name: "variant",
      type: '"classic" | "panel" | "dark"',
      description: "Selects the visual shell while preserving the same animation engine and expression states.",
    },
    {
      name: "ref",
      type: "AnimatedCharacterHandle",
      description: "Imperative API: setState, look, setGazeTarget, blink, nod, shakeHead, eyeRoll, startTalking, stopTalking, reset, ...",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes on the wrapper (sizing, color via text-*).",
    },
  ],
}
