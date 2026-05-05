import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  TVDisplay,
  TVDisplayBody,
  TVDisplayDoctor,
  TVDisplayHeader,
  TVDisplayRoom,
  TVDisplayRow,
  TVDisplayToken,
} from "@/components/ui/tv-display";

/**
 * Rotating text — swap the entire string with a vertical slide + fade
 * transition (reactbits rotating-text style). The current word slides up and
 * fades out while the next word slides up into place from below. Letters can
 * stagger in via per-character `transition-delay`.
 */
function RotatingText({
  value,
  /** Per-character delay step in seconds for the staggered enter. */
  stagger = 0.025,
  /** Slide+fade duration in seconds. */
  duration = 0.5,
}: {
  value: string;
  stagger?: number;
  duration?: number;
}) {
  return (
    <span
      className="relative inline-block overflow-hidden align-baseline"
      style={{ height: "1em", lineHeight: 1 }}
      aria-label={value}
    >
      <span key={value} className="inline-flex" style={{ lineHeight: 1 }}>
        {value.split("").map((ch, i) => (
          <span
            key={`${value}-${i}`}
            className="inline-block tabular-nums"
            style={{
              animation: `tv-rotating-text-in ${duration}s cubic-bezier(0.22, 1, 0.36, 1) both`,
              animationDelay: `${i * stagger}s`,
              lineHeight: 1,
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
      <style href="tv-rotating-text-in" precedence="tv-display">{`@keyframes tv-rotating-text-in {
        0% { transform: translateY(100%); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }`}</style>
    </span>
  );
}

const ANIMATED_SEQUENCES: string[][] = [
  ["OP-025", "OP-026", "OP-027", "OP-028", "OP-029", "OP-030", "OP-031"],
  ["OP-009", "OP-010", "OP-011", "OP-012", "OP-013"],
  ["OP-134", "OP-135", "OP-136", "OP-137"],
  ["OP-012", "OP-013", "OP-014", "OP-015", "OP-016", "OP-017"],
];

// Per-row tick interval (ms). Different intervals so each row's token rotates
// at its own cadence — staggered, never in lockstep.
const ANIMATED_INTERVALS = [9000, 7500, 11000, 6500];

function useRotatingIndex(length: number, intervalMs: number) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);
  return idx;
}

function AnimatedTokenRow({
  doctor,
  specialty,
  room,
  sequence,
  intervalMs,
}: {
  doctor: string;
  specialty: string;
  room: string;
  sequence: string[];
  intervalMs: number;
}) {
  const idx = useRotatingIndex(sequence.length, intervalMs);
  const current = sequence[idx];
  const next = [
    sequence[(idx + 1) % sequence.length],
    sequence[(idx + 2) % sequence.length],
    sequence[(idx + 3) % sequence.length],
  ];
  // Glare sweep — diagonal highlight that crosses the row whenever the token
  // changes. Re-mount via `key={idx}` so the keyframe animation replays each
  // tick. `pointer-events-none` keeps it purely decorative.
  return (
    <TVDisplayRow className="relative overflow-hidden">
      <TVDisplayDoctor name={doctor} specialty={specialty} />
      <TVDisplayRoom>{room}</TVDisplayRoom>
      <TVDisplayToken
        current={<RotatingText value={current} />}
        next={next}
      />
      <span
        key={idx}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 animate-[tv-display-glare_1.25s_ease-in-out_both]"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
        }}
      />
      <style href="tv-display-glare" precedence="tv-display">{`@keyframes tv-display-glare {
        0% { transform: translateX(0); opacity: 0; }
        25% { opacity: 1; }
        75% { opacity: 1; }
        100% { transform: translateX(300%); opacity: 0; }
      }`}</style>
    </TVDisplayRow>
  );
}

function AnimatedTokenExample() {
  const rows = [
    {
      doctor: "Dr. Arjun Radhakrishnan",
      specialty: "General",
      room: "1",
    },
    {
      doctor: "Dr. Meera Das",
      specialty: "Pediatrics",
      room: "2",
    },
    {
      doctor: "Dr. Rahul Sen",
      specialty: "Orthopedics",
      room: "3",
    },
    {
      doctor: "Dr. Neha Roy",
      specialty: "ENT",
      room: "12",
    },
  ];
  return (
    <div className="w-full max-w-4xl">
      <TVDisplay aspectRatio="16/9">
        <TVDisplayHeader>
          <span>Doctor</span>
          <span>Room</span>
          <span>Token</span>
        </TVDisplayHeader>
        <TVDisplayBody>
          {rows.map((row, i) => (
            <AnimatedTokenRow
              key={row.doctor}
              doctor={row.doctor}
              specialty={row.specialty}
              room={row.room}
              sequence={ANIMATED_SEQUENCES[i]}
              intervalMs={ANIMATED_INTERVALS[i]}
            />
          ))}
        </TVDisplayBody>
      </TVDisplay>
    </div>
  );
}

interface QueueRow {
  doctor: string;
  specialty: string;
  room: string;
  current: string;
  next: string[];
}

const SAMPLE_QUEUE: QueueRow[] = [
  {
    doctor: "Dr. Arjun Radhakrishnan",
    specialty: "General",
    room: "1",
    current: "OP-025",
    next: ["OP-026", "OP-027", "OP-024"],
  },
  {
    doctor: "Dr. Meera Das",
    specialty: "Pediatrics",
    room: "2",
    current: "OP-009",
    next: ["OP-010", "OP-011", "OP-012"],
  },
  {
    doctor: "Dr. Rahul Sen",
    specialty: "Orthopedics",
    room: "3",
    current: "OP-134",
    next: ["OP-135"],
  },
  {
    doctor: "Dr. Neha Roy",
    specialty: "ENT",
    room: "12",
    current: "OP-012",
    next: ["OP-013", "OP-014"],
  },
];

function renderQueueRows(rows: QueueRow[], nextLabel?: string) {
  return rows.map((row) =>
    React.createElement(
      TVDisplayRow,
      { key: row.doctor },
      React.createElement(TVDisplayDoctor, {
        name: row.doctor,
        specialty: row.specialty,
      }),
      React.createElement(TVDisplayRoom, null, row.room),
      React.createElement(TVDisplayToken, {
        current: row.current,
        next: row.next,
        nextLabel,
      })
    )
  );
}

function renderQueueBoard(
  aspectRatio: "16/9" | "21/9" | "4/3" | "9/16",
  rows: QueueRow[],
  wrapperClass: string,
  labels: {
    doctor: string;
    room: string;
    token: string;
    next?: string;
  } = {
    doctor: "Doctor",
    room: "Room",
    token: "Token",
  }
) {
  return React.createElement(
    "div",
    { className: wrapperClass },
    React.createElement(
      TVDisplay,
      { aspectRatio },
      React.createElement(
        TVDisplayHeader,
        null,
        React.createElement("span", null, labels.doctor),
        React.createElement("span", null, labels.room),
        React.createElement("span", null, labels.token)
      ),
      React.createElement(
        TVDisplayBody,
        null,
        ...renderQueueRows(rows, labels.next)
      )
    )
  );
}

const PREVIEW_CODE = `import {
  TVDisplay,
  TVDisplayBody,
  TVDisplayDoctor,
  TVDisplayHeader,
  TVDisplayRoom,
  TVDisplayRow,
  TVDisplayToken,
} from "@/components/ui/tv-display"

export function TVDisplayDemo() {
  return (
    <div className="w-full max-w-4xl">
      <TVDisplay aspectRatio="16/9">
        <TVDisplayHeader>
          <span>Doctor</span>
          <span>Room</span>
          <span>Token</span>
        </TVDisplayHeader>
        <TVDisplayBody>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Arjun Radhakrishnan" specialty="General" />
            <TVDisplayRoom>1</TVDisplayRoom>
            <TVDisplayToken current="OP-025" next={["OP-026", "OP-027", "OP-024"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Meera Das" specialty="Pediatrics" />
            <TVDisplayRoom>2</TVDisplayRoom>
            <TVDisplayToken current="OP-009" next={["OP-010", "OP-011", "OP-012"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Rahul Sen" specialty="Orthopedics" />
            <TVDisplayRoom>3</TVDisplayRoom>
            <TVDisplayToken current="OP-134" next={["OP-135"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Neha Roy" specialty="ENT" />
            <TVDisplayRoom>12</TVDisplayRoom>
            <TVDisplayToken current="OP-012" next={["OP-013", "OP-014"]} />
          </TVDisplayRow>
        </TVDisplayBody>
      </TVDisplay>
    </div>
  )
}`;

export const tvDisplayDoc: ComponentDoc = {
  id: "tv-display",
  name: "TV Display",
  description:
    "Composable digital signage layout for TVs (queue boards, room rosters) with built-in aspect ratios.",
  installation: {
    cli: "npx shadcn@latest add https://careui.ohc.network/registry/care-ui/tv-display/tv-display.json",
    manual:
      "Copy the tv-display component source code into your project. Requires the aspect-ratio primitive.",
  },
  usage: `import {
  TVDisplay,
  TVDisplayBody,
  TVDisplayDoctor,
  TVDisplayHeader,
  TVDisplayRoom,
  TVDisplayRow,
  TVDisplayToken,
} from "@/components/ui/tv-display"

<TVDisplay aspectRatio="16/9">
  <TVDisplayHeader>
    <span>Doctor</span>
    <span>Room</span>
    <span>Token</span>
  </TVDisplayHeader>
  <TVDisplayBody>
    <TVDisplayRow>
      <TVDisplayDoctor name="Dr. Arjun Radhakrishnan" specialty="General" />
      <TVDisplayRoom>1</TVDisplayRoom>
      <TVDisplayToken current="OP-025" next={["OP-026", "OP-027"]} />
    </TVDisplayRow>
  </TVDisplayBody>
</TVDisplay>`,
  preview: {
    code: PREVIEW_CODE,
    component: renderQueueBoard("16/9", SAMPLE_QUEUE, "w-full max-w-4xl"),
  },
  examples: [
    {
      name: "Rotating text token",
      description:
        "When the queue advances, the whole token slides up and fades in (reactbits rotating-text style) with a per-character stagger so each digit lands a beat apart. Each row in this example rotates on its own cadence (6.5s–11s) so they never tick in lockstep — in production you'd swap the value when the next patient is called.",
      code: `function RotatingText({ value, stagger = 0.025, duration = 0.5 }: {
  value: string
  stagger?: number
  duration?: number
}) {
  return (
    <span
      className="relative inline-block overflow-hidden align-baseline"
      style={{ height: "1em", lineHeight: 1 }}
      aria-label={value}
    >
      <span key={value} className="inline-flex" style={{ lineHeight: 1 }}>
        {value.split("").map((ch, i) => (
          <span
            key={\`\${value}-\${i}\`}
            className="inline-block tabular-nums"
            style={{
              animation: \`tv-rotating-text-in \${duration}s cubic-bezier(0.22,1,0.36,1) both\`,
              animationDelay: \`\${i * stagger}s\`,
              lineHeight: 1,
            }}
          >
            {ch === " " ? "\\u00A0" : ch}
          </span>
        ))}
      </span>
      <style>{\`@keyframes tv-rotating-text-in {
        0% { transform: translateY(100%); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }\`}</style>
    </span>
  )
}

// Pass the rotating value as the \`current\` prop on TVDisplayToken.
<TVDisplayToken
  current={<RotatingText value={currentToken} />}
  next={["OP-026", "OP-027", "OP-028"]}
/>`,
      preview: React.createElement(AnimatedTokenExample),
    },
    {
      name: "Compact density",
      description:
        "Use density=\"compact\" to fit more rows on the same canvas — ideal for busy clinics with many concurrent doctors.",
      code: `<TVDisplay aspectRatio="16/9" density="compact">
  <TVDisplayHeader>
    <span>Doctor</span>
    <span>Room</span>
    <span>Token</span>
  </TVDisplayHeader>
  <TVDisplayBody>{/* many rows */}</TVDisplayBody>
</TVDisplay>`,
      preview: React.createElement(
        "div",
        { className: "w-full max-w-4xl" },
        React.createElement(
          TVDisplay,
          { aspectRatio: "16/9", density: "compact" },
          React.createElement(
            TVDisplayHeader,
            null,
            React.createElement("span", null, "Doctor"),
            React.createElement("span", null, "Room"),
            React.createElement("span", null, "Token")
          ),
          React.createElement(
            TVDisplayBody,
            null,
            ...renderQueueRows([
              ...SAMPLE_QUEUE,
              {
                doctor: "Dr. Priya Menon",
                specialty: "Dermatology",
                room: "5",
                current: "OP-042",
                next: ["OP-043", "OP-044"],
              },
            ])
          )
        )
      ),
    },
    {
      name: "Ultrawide (21:9)",
      description:
        "Use the ultrawide aspect ratio for cinematic signage displays mounted in lobbies.",
      code: `<TVDisplay aspectRatio="21/9">
  <TVDisplayHeader>
    <span>Doctor</span>
    <span>Room</span>
    <span>Token</span>
  </TVDisplayHeader>
  <TVDisplayBody>{/* rows */}</TVDisplayBody>
</TVDisplay>`,
      preview: renderQueueBoard("21/9", SAMPLE_QUEUE.slice(0, 3), "w-full max-w-5xl"),
    },
    {
      name: "Legacy (4:3)",
      description: "A 4:3 layout for older displays still used in clinics.",
      code: `<TVDisplay aspectRatio="4/3">{/* ... */}</TVDisplay>`,
      preview: renderQueueBoard(
        "4/3",
        SAMPLE_QUEUE.slice(0, 3),
        "w-full max-w-2xl"
      ),
    },
    {
      name: "Portrait (9:16)",
      description:
        "Vertical signage for narrow corridor or counter-mounted displays.",
      code: `<TVDisplay aspectRatio="9/16" density="compact">{/* ... */}</TVDisplay>`,
      preview: React.createElement(
        "div",
        { className: "w-full max-w-xs" },
        React.createElement(
          TVDisplay,
          { aspectRatio: "9/16", density: "compact" },
          React.createElement(
            TVDisplayHeader,
            null,
            React.createElement("span", null, "Doctor"),
            React.createElement("span", null, "Room"),
            React.createElement("span", null, "Token")
          ),
          React.createElement(
            TVDisplayBody,
            null,
            ...renderQueueRows(SAMPLE_QUEUE)
          )
        )
      ),
    },
    {
      name: "Malayalam (മലയാളം)",
      description:
        "Localized signage with Malayalam labels and doctor names — the fluid columns adapt to the wider script.",
      code: `<TVDisplay aspectRatio="16/9">
  <TVDisplayHeader>
    <span>ഡോക്ടർ</span>
    <span>മുറി</span>
    <span>ടോക്കൺ</span>
  </TVDisplayHeader>
  <TVDisplayBody>
    <TVDisplayRow>
      <TVDisplayDoctor name="ഡോ. അർജുൻ രാധാകൃഷ്ണൻ" specialty="ജനറൽ" />
      <TVDisplayRoom>1</TVDisplayRoom>
      <TVDisplayToken current="ഒപി-025" next={["ഒപി-026", "ഒപി-027"]} />
    </TVDisplayRow>
    {/* ... */}
  </TVDisplayBody>
</TVDisplay>`,
      preview: renderQueueBoard(
        "16/9",
        [
          {
            doctor: "ഡോ. അർജുൻ രാധാകൃഷ്ണൻ മേലേപ്പറമ്പിൽ",
            specialty: "ജനറൽ",
            room: "1",
            current: "ഒപി-025",
            next: ["ഒപി-026", "ഒപി-027", "ഒപി-024"],
          },
          {
            doctor: "ഡോ. മീര ദാസ്",
            specialty: "ശിശുരോഗം",
            room: "2",
            current: "ഒപി-009",
            next: ["ഒപി-010", "ഒപി-011", "ഒപി-012"],
          },
          {
            doctor: "ഡോ. രാഹുൽ സെൻ",
            specialty: "അസ്ഥിരോഗം",
            room: "3",
            current: "ഒപി-134",
            next: ["ഒപി-135"],
          },
          {
            doctor: "ഡോ. നേഹ റോയ്",
            specialty: "ചെവി-മൂക്ക്-തൊണ്ട",
            room: "12",
            current: "ഒപി-012",
            next: ["ഒപി-013", "ഒപി-014"],
          },
        ],
        "w-full max-w-4xl",
        {
          doctor: "ഡോക്ടർ",
          room: "മുറി",
          token: "ടോക്കൺ",
          next: "അടുത്തത്:",
        }
      ),
    },
  ],
  props: [
    {
      name: "aspectRatio",
      type: '"16/9" | "21/9" | "4/3" | "9/16"',
      description: "Aspect ratio of the TV canvas.",
      default: '"16/9"',
    },
    {
      name: "density",
      type: '"default" | "compact"',
      description: "Controls row and header padding.",
      default: '"default"',
    },
    {
      name: "TVDisplayDoctor.name",
      type: "ReactNode",
      description: "Primary doctor name shown on the left of each row.",
    },
    {
      name: "TVDisplayDoctor.specialty",
      type: "ReactNode",
      description: "Optional specialty / department label below the name.",
    },
    {
      name: "TVDisplayToken.current",
      type: "ReactNode",
      description: "Token currently being served.",
    },
    {
      name: "TVDisplayToken.next",
      type: "ReactNode[]",
      description: "Optional list of upcoming tokens shown after the current one.",
    },
  ],
};
