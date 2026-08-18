import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageTitle, Muted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type FillyState = "idle" | "curious" | "celebrate" | "sleep";

function fillyToneClass(state: FillyState): string {
  switch (state) {
    case "idle":
      return "text-amber-500";
    case "curious":
      return "text-sky-500";
    case "celebrate":
      return "text-rose-500";
    case "sleep":
      return "text-indigo-400";
    default:
      return "text-primary";
  }
}

function fillyBadgeVariant(state: FillyState):
  | "amber"
  | "sky"
  | "rose"
  | "indigo" {
  switch (state) {
    case "idle":
      return "amber";
    case "curious":
      return "sky";
    case "celebrate":
      return "rose";
    case "sleep":
      return "indigo";
    default:
      return "amber";
  }
}

function fillyStateSummary(state: FillyState): string {
  switch (state) {
    case "idle":
      return "Baseline breathing loop for neutral waiting moments.";
    case "curious":
      return "Head tilt and alert eyes for hover and discovery moments.";
    case "celebrate":
      return "Confetti sparkle loop for success and completion moments.";
    case "sleep":
      return "Slow drift with eyes closed for quiet idle states.";
    default:
      return "";
  }
}

function FillyMascot({
  state,
  scale,
  reducedMotion,
}: {
  state: FillyState;
  scale: number;
  reducedMotion: boolean;
}) {
  const motionClass = reducedMotion
    ? ""
    : state === "idle"
      ? "motion-safe:animate-[filly-bob_2.8s_ease-in-out_infinite]"
      : state === "curious"
        ? "motion-safe:animate-[filly-curious_1.8s_ease-in-out_infinite]"
        : state === "celebrate"
          ? "motion-safe:animate-[filly-celebrate_0.8s_ease-in-out_infinite]"
          : "motion-safe:animate-[filly-sleep_3.6s_ease-in-out_infinite]";

    const scaleClass =
      scale <= 80
        ? "scale-80"
        : scale <= 95
          ? "scale-95"
          : scale <= 110
            ? "scale-100"
            : "scale-110";

  return (
      <div className={cn("relative transition-transform", scaleClass)} aria-label={`Filly mascot in ${state} state`}>
      <svg
        viewBox="0 0 180 180"
        role="img"
        aria-hidden="true"
        className="size-52 drop-shadow-sm"
      >
        <g className={motionClass}>
          <ellipse cx="92" cy="158" rx="44" ry="8" className="fill-muted" />

          <path
            d="M60 44 L76 24 L80 56 Z"
            className="fill-amber-300 stroke-amber-500"
            strokeWidth="2"
          />
          <path
            d="M120 44 L104 24 L100 56 Z"
            className="fill-amber-300 stroke-amber-500"
            strokeWidth="2"
          />

          <circle cx="90" cy="88" r="44" className="fill-amber-200 stroke-amber-500" strokeWidth="2" />

          <path
            d="M56 84 C42 92 38 110 48 122"
            className="fill-none stroke-amber-500/80"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <g className={reducedMotion ? "" : "motion-safe:animate-[filly-blink_4s_ease-in-out_infinite]"}>
            {state === "sleep" ? (
              <>
                <path d="M72 86 Q80 90 88 86" className="fill-none stroke-foreground" strokeWidth="3" strokeLinecap="round" />
                <path d="M92 86 Q100 90 108 86" className="fill-none stroke-foreground" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="78" cy="84" r="5" className="fill-foreground" />
                <circle cx="102" cy="84" r="5" className="fill-foreground" />
              </>
            )}
          </g>

          {state === "curious" ? (
            <path d="M72 70 Q80 64 88 70" className="fill-none stroke-foreground" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <path d="M92 70 Q100 64 108 70" className="fill-none stroke-foreground" strokeWidth="3" strokeLinecap="round" />
          )}

          {state === "celebrate" ? (
            <path d="M72 108 Q90 126 108 108" className="fill-none stroke-rose-500" strokeWidth="4" strokeLinecap="round" />
          ) : state === "sleep" ? (
            <path d="M80 112 Q90 116 100 112" className="fill-none stroke-muted-foreground" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <path d="M78 110 Q90 118 102 110" className="fill-none stroke-amber-700" strokeWidth="3" strokeLinecap="round" />
          )}

          <path
            d="M122 120 C136 126 142 138 132 150"
            className={state === "celebrate" ? "fill-none stroke-rose-500" : "fill-none stroke-amber-500"}
            strokeWidth="8"
            strokeLinecap="round"
          />

          {state === "celebrate" && (
            <g className={reducedMotion ? "" : "motion-safe:animate-[filly-sparkle_0.9s_ease-in-out_infinite]"}>
              <circle cx="52" cy="58" r="4" className="fill-rose-400" />
              <circle cx="126" cy="52" r="4" className="fill-sky-400" />
              <circle cx="138" cy="92" r="3" className="fill-emerald-400" />
            </g>
          )}
        </g>

        {state === "sleep" && (
          <text x="124" y="44" className="fill-muted-foreground text-[20px] font-semibold">
            z z
          </text>
        )}
      </svg>
    </div>
  );
}

export function FillyMascotPlayground() {
  const [state, setState] = useState<FillyState>("idle");
  const [scale, setScale] = useState([100]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const mood = fillyStateSummary(state);

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-4 md:p-8">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <PageTitle>Animated Filly Mascot State Playground</PageTitle>
          <Badge variant="info" solid>
            Tools
          </Badge>
        </div>
        <Muted>
          Explore interaction states for Filly and preview motion behavior before
          wiring into product flows.
        </Muted>
      </header>

      <Separator />

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/30 border-border flex min-h-96 items-center justify-center rounded-xl border">
              <FillyMascot
                state={state}
                scale={scale[0]}
                reducedMotion={reduceMotion}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={fillyToneClass(state)}
                variant={fillyBadgeVariant(state)}
              >
                {state}
              </Badge>
              <Muted>{mood}</Muted>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>State Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Mode</Label>
              <Tabs
                value={state}
                onValueChange={(value) => setState(value as FillyState)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="idle">Idle</TabsTrigger>
                  <TabsTrigger value="curious">Curious</TabsTrigger>
                  <TabsTrigger value="celebrate">Celebrate</TabsTrigger>
                  <TabsTrigger value="sleep">Sleep</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="filly-scale">Scale</Label>
                <span className="text-muted-foreground text-sm tabular-nums">
                  {scale[0]}%
                </span>
              </div>
              <Slider
                id="filly-scale"
                min={70}
                max={130}
                step={5}
                value={scale}
                onValueChange={(value) => {
                  setScale(Array.isArray(value) ? [...value] : [value]);
                }}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Label htmlFor="filly-reduce-motion">Reduce motion</Label>
                <Muted className="text-xs">
                  Useful while testing accessibility fallbacks.
                </Muted>
              </div>
              <Switch
                id="filly-reduce-motion"
                checked={reduceMotion}
                onCheckedChange={setReduceMotion}
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
