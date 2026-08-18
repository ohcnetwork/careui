import { useRef, useState } from "react"

import { type ComponentDoc } from "@/lib/types"
import {
  AnimatedCharacter,
  CHARACTER_STATES,
  type AnimatedCharacterHandle,
  type CharacterState,
} from "@/components/ui/animated-character"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

function AnimatedCharacterPlayground() {
  const characterRef = useRef<AnimatedCharacterHandle>(null)
  const [state, setState] = useState<CharacterState>("idle")
  const [mouseTracking, setMouseTracking] = useState(false)

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className="bg-muted rounded-xl px-14 py-10">
          <AnimatedCharacter
            ref={characterRef}
            state={state}
            mouseTracking={mouseTracking}
            className="mx-auto max-w-xs"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {CHARACTER_STATES.map((s) => (
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
            id="character-mouse-tracking"
            checked={mouseTracking}
            onCheckedChange={setMouseTracking}
          />
          <Label htmlFor="character-mouse-tracking">Mouse tracking</Label>
        </div>
      </CardContent>
    </Card>
  )
}

export const animatedCharacterDoc: ComponentDoc = {
  id: "animated-character",
  name: "AnimatedCharacter",
  description:
    "A spring-driven animated AI character. State presets compose independent gaze, blink, mouth and head layers into one continuously animated SVG frame — transitions blend from the current pose with no snapping or drift.",
  installation: {
    cli: "pnpm dlx shadcn@latest add https://careui.ohc.network/registry/care-ui/animated-character/animated-character.json",
    manual:
      "Copy the animated character implementation and ensure it is exported from your local UI index if you keep one.",
  },
  usage: `import { AnimatedCharacter } from "@/components/ui/animated-character"

<AnimatedCharacter state="idle" />`,
  preview: {
    component: <AnimatedCharacterPlayground />,
    code: `<AnimatedCharacter state="idle" />`,
  },
  examples: [
    {
      name: "State playground",
      description:
        "All eleven behavioral states with a mouse-tracking toggle. When tracking is on the eyes smoothly follow the pointer; when off they return to the state's normal gaze.",
      preview: <AnimatedCharacterPlayground />,
      code: `const characterRef = useRef<AnimatedCharacterHandle>(null)
const [state, setState] = useState<CharacterState>("idle")
const [mouseTracking, setMouseTracking] = useState(false)

<AnimatedCharacter
  ref={characterRef}
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
      type: `"idle" | "listening" | "talking" | "thinking" | "loading" | "happy" | "sad" | "surprised" | "confused" | "excited" | "sleepy"`,
      description: "Behavioral state preset. Transitions blend from the current pose.",
    },
    {
      name: "mouseTracking",
      type: "boolean",
      description: "Eyes smoothly follow the pointer when true; return to the state gaze when false.",
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
