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
  // Split by grapheme clusters (not UTF-16 code units) so complex scripts
  // like Malayalam, Devanagari, or emoji stay intact. `String#split("")`
  // breaks combining vowel signs and renders them as dotted-circle glyphs.
  const graphemes = React.useMemo(() => {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
      const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
      return Array.from(seg.segment(value), (s) => s.segment);
    }
    return Array.from(value);
  }, [value]);
  return (
    <span
      className="relative inline-block overflow-hidden align-baseline"
      style={{ height: "1em", lineHeight: 1 }}
      aria-label={value}
    >
      <span key={value} className="inline-flex" style={{ lineHeight: 1 }}>
        {graphemes.map((ch, i) => (
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
      <style
        href="tv-rotating-text-in"
        precedence="tv-display"
      >{`@keyframes tv-rotating-text-in {
        0% { transform: translateY(100%); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }`}</style>
    </span>
  );
}

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
  nextLabel,
  roomLabel,
}: {
  doctor: string;
  specialty: string;
  room: string;
  sequence: string[];
  intervalMs: number;
  nextLabel?: string;
  roomLabel?: string;
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
      <TVDisplayRoom label={roomLabel}>{room}</TVDisplayRoom>
      <TVDisplayToken
        current={<RotatingText value={current} />}
        next={next}
        nextLabel={nextLabel}
        nextRestartKey={idx}
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
      <style
        href="tv-display-glare"
        precedence="tv-display"
      >{`@keyframes tv-display-glare {
        0% { transform: translateX(0); opacity: 0; }
        25% { opacity: 1; }
        75% { opacity: 1; }
        100% { transform: translateX(300%); opacity: 0; }
      }`}</style>
    </TVDisplayRow>
  );
}

interface QueueRow {
  doctor: string;
  specialty: string;
  room: string;
  current: string;
  next: string[];
}

interface PharmacyRow {
  counter: string;
  current: string;
  next: string[];
}

function AnimatedPharmacyRow({
  counter,
  sequence,
  intervalMs,
  counterLabel = "Counter",
}: {
  counter: string;
  sequence: string[];
  intervalMs: number;
  counterLabel?: string;
}) {
  const idx = useRotatingIndex(sequence.length, intervalMs);
  const current = sequence[idx];
  const next = [
    sequence[(idx + 1) % sequence.length],
    sequence[(idx + 2) % sequence.length],
    sequence[(idx + 3) % sequence.length],
  ];
  return (
    <TVDisplayRow className="relative overflow-hidden">
      <TVDisplayRoom label={counterLabel}>{counter}</TVDisplayRoom>
      <TVDisplayToken
        current={<RotatingText value={current} />}
        next={next}
        nextRestartKey={idx}
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
    </TVDisplayRow>
  );
}

// Room codes follow a service-point convention so patients can quickly
// identify where to go: C = Consultation, V = Vitals, I = Injection,
// E = ECG, B = Billing, P = Pharmacy, S = Sample Collection, PR = Procedure.
const SAMPLE_QUEUE: QueueRow[] = [
  {
    doctor: "Dr. Arjun Radhakrishnan",
    specialty: "General",
    room: "C 01",
    current: "OP-025",
    next: ["OP-026", "OP-027", "OP-024"],
  },
  {
    doctor: "Dr. Meera Das",
    specialty: "Pediatrics",
    room: "C 02",
    current: "OP-009",
    next: ["OP-010", "OP-011", "OP-012"],
  },
  {
    doctor: "Dr. Rahul Sen",
    specialty: "Orthopedics",
    room: "PR 01",
    current: "OP-134",
    next: ["OP-135"],
  },
  {
    doctor: "Dr. Neha Roy",
    specialty: "ENT",
    room: "E 01",
    current: "OP-012",
    next: ["OP-013", "OP-014"],
  },
];

function renderQueueRows(
  rows: QueueRow[],
  nextLabel?: string,
  roomLabel?: string
) {
  return rows.map((row, i) => {
    // Build a rotation sequence per row from current + upcoming tokens. Dedup
    // and require at least 2 entries so the animation has something to swap
    // between.
    const seq = Array.from(new Set([row.current, ...row.next])).filter(Boolean);
    const sequence = seq.length > 1 ? seq : [row.current];
    return React.createElement(AnimatedTokenRow, {
      key: row.doctor,
      doctor: row.doctor,
      specialty: row.specialty,
      room: row.room,
      sequence,
      intervalMs: ANIMATED_INTERVALS[i % ANIMATED_INTERVALS.length],
      nextLabel,
      roomLabel,
    });
  });
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
        ...renderQueueRows(rows, labels.next, labels.room)
      )
    )
  );
}

// Pharmacy / billing counters need a 2-column layout (token + counter).
// Override the default 3-column track via `className` so the underlying
// `grid-cols-subgrid` in header/rows collapses to the same 2 tracks.
function renderPharmacyBoard(
  aspectRatio: "16/9" | "21/9" | "4/3" | "9/16",
  rows: PharmacyRow[],
  wrapperClass: string,
  labels: { token: string; counter: string } = {
    token: "Token",
    counter: "Counter",
  }
) {
  return React.createElement(
    "div",
    { className: wrapperClass },
    React.createElement(
      TVDisplay,
      {
        aspectRatio,
        ...({ "data-layout": "pharmacy" } as Record<string, string>),
        // Both columns hug their content (`auto` tracks) so the token cell
        // doesn't stretch across the full row. Leftover space sits on the
        // right of the row, keeping counter + token visually grouped.
        // The room/counter box gets a `w-fit` override (see className below)
        // so it doesn't stretch to the full track width — without it the box
        // inherits `w-full` from the component and grows wider than its
        // square footprint demands.
        className:
          "grid-cols-[auto_auto] @max-md:grid-cols-[minmax(0,1fr)] [&_[data-slot=tv-display-room]>div]:w-fit",
      },
      React.createElement(
        TVDisplayHeader,
        null,
        React.createElement("span", null, labels.counter),
        React.createElement("span", null, labels.token)
      ),
      React.createElement(
        TVDisplayBody,
        null,
        ...rows.map((row, i) => {
          const seq = Array.from(new Set([row.current, ...row.next])).filter(
            Boolean
          );
          const sequence = seq.length > 1 ? seq : [row.current];
          return React.createElement(AnimatedPharmacyRow, {
            key: row.counter,
            counter: row.counter,
            sequence,
            intervalMs: ANIMATED_INTERVALS[i % ANIMATED_INTERVALS.length],
            counterLabel: labels.counter,
          });
        })
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
            <TVDisplayRoom>C 01</TVDisplayRoom>
            <TVDisplayToken current="OP-025" next={["OP-026", "OP-027", "OP-024"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Meera Das" specialty="Pediatrics" />
            <TVDisplayRoom>C 02</TVDisplayRoom>
            <TVDisplayToken current="OP-009" next={["OP-010", "OP-011", "OP-012"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Rahul Sen" specialty="Orthopedics" />
            <TVDisplayRoom>PR 01</TVDisplayRoom>
            <TVDisplayToken current="OP-134" next={["OP-135"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Neha Roy" specialty="ENT" />
            <TVDisplayRoom>E 01</TVDisplayRoom>
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
      <TVDisplayRoom>C 01</TVDisplayRoom>
      <TVDisplayToken current="OP-025" next={["OP-026", "OP-027"]} />
    </TVDisplayRow>
  </TVDisplayBody>
</TVDisplay>`,
  preview: {
    code: PREVIEW_CODE,
    component: renderQueueBoard(
      "16/9",
      SAMPLE_QUEUE.slice(0, 3),
      "w-full max-w-4xl"
    ),
  },
  examples: [
    {
      name: "Two doctors",
      description:
        "Minimal board for small clinics with only two active doctors. Demonstrates how the layout absorbs longer token IDs (e.g. OP-20913) without breaking the row.",
      code: `<TVDisplay aspectRatio="16/9">
  <TVDisplayHeader>
    <span>Doctor</span>
    <span>Room</span>
    <span>Token</span>
  </TVDisplayHeader>
  <TVDisplayBody>
    <TVDisplayRow>
      <TVDisplayDoctor name="Dr. Arjun Radhakrishnan" specialty="General" />
      <TVDisplayRoom>C 01</TVDisplayRoom>
      <TVDisplayToken current="OP-20913" next={["OP-20914", "OP-20915"]} />
    </TVDisplayRow>
    <TVDisplayRow>
      <TVDisplayDoctor name="Dr. Meera Das" specialty="Pediatrics" />
      <TVDisplayRoom>C 02</TVDisplayRoom>
      <TVDisplayToken current="OP-20908" next={["OP-20909", "OP-20910"]} />
    </TVDisplayRow>
  </TVDisplayBody>
</TVDisplay>`,
      preview: renderQueueBoard(
        "16/9",
        [
          {
            doctor: "Dr. Arjun Radhakrishnan",
            specialty: "General",
            room: "C 01",
            current: "OP-20913",
            next: ["OP-20914", "OP-20915", "OP-20916"],
          },
          {
            doctor: "Dr. Meera Das",
            specialty: "Pediatrics",
            room: "C 02",
            current: "OP-20908",
            next: ["OP-20909", "OP-20910", "OP-20911"],
          },
        ],
        "w-full max-w-4xl"
      ),
    },
    {
      name: "Compact density",
      description:
        'Use density="compact" to fit more rows on the same canvas — ideal for busy clinics with many concurrent doctors.',
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
            ...renderQueueRows(SAMPLE_QUEUE)
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
      preview: renderQueueBoard(
        "21/9",
        SAMPLE_QUEUE.slice(0, 3),
        "w-full max-w-5xl"
      ),
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
            ...renderQueueRows(SAMPLE_QUEUE.slice(0, 3))
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
      <TVDisplayRoom>C 01</TVDisplayRoom>
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
            room: "C 01",
            current: "ഒപി-025",
            next: ["ഒപി-026", "ഒപി-027", "ഒപി-024"],
          },
          {
            doctor: "ഡോ. മീര ദാസ്",
            specialty: "ശിശുരോഗം",
            room: "C 02",
            current: "ഒപി-009",
            next: ["ഒപി-010", "ഒപി-011", "ഒപി-012"],
          },
          {
            doctor: "ഡോ. രാഹുൽ സെൻ",
            specialty: "അസ്ഥിരോഗം",
            room: "PR 01",
            current: "ഒപി-134",
            next: ["ഒപി-135"],
          },
          {
            doctor: "ഡോ. നേഹ റോയ്",
            specialty: "ചെവി-മൂക്ക്-തൊണ്ട",
            room: "E 01",
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
    {
      name: "Pharmacy / billing counter",
      description:
        "Two-column layout for pharmacy or billing counters: counter code on the left, token on the right. Drops the doctor column entirely by overriding the grid tracks via `className` — the underlying subgrid in header and rows automatically follows.",
      code: `<TVDisplay
  aspectRatio="16/9"
  data-layout="pharmacy"
  className="grid-cols-[auto_auto]"
>
  <TVDisplayHeader>
    <span>Counter</span>
    <span>Token</span>
  </TVDisplayHeader>
  <TVDisplayBody>
    <TVDisplayRow>
      <TVDisplayRoom label="Counter">P 01</TVDisplayRoom>
      <TVDisplayToken current="RX-128" next={["RX-129", "RX-130", "RX-131"]} />
    </TVDisplayRow>
    <TVDisplayRow>
      <TVDisplayRoom label="Counter">P 02</TVDisplayRoom>
      <TVDisplayToken current="RX-045" next={["RX-046", "RX-047"]} />
    </TVDisplayRow>
    <TVDisplayRow>
      <TVDisplayRoom label="Counter">B 01</TVDisplayRoom>
      <TVDisplayToken current="BL-018" next={["BL-019", "BL-020"]} />
    </TVDisplayRow>
  </TVDisplayBody>
</TVDisplay>`,
      preview: renderPharmacyBoard(
        "16/9",
        [
          {
            counter: "P 01",
            current: "RX-128",
            next: ["RX-129", "RX-130", "RX-131"],
          },
          {
            counter: "P 02",
            current: "RX-045",
            next: ["RX-046", "RX-047"],
          },
          {
            counter: "P 03",
            current: "RX-211",
            next: ["RX-212"],
          },
          {
            counter: "B 01",
            current: "BL-018",
            next: ["BL-019", "BL-020"],
          },
        ],
        "w-full max-w-4xl"
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
      name: "TVDisplayRoom.label",
      type: "ReactNode",
      description:
        "Label rendered above the room number on narrow (portrait) layouts. Hidden on wide layouts where the column header already covers it.",
      default: '"Room"',
    },
    {
      name: "TVDisplayToken.current",
      type: "ReactNode",
      description: "Token currently being served.",
    },
    {
      name: "TVDisplayToken.next",
      type: "ReactNode[]",
      description:
        "Optional list of upcoming tokens shown after the current one.",
    },
    {
      name: "TVDisplayToken.nextLabel",
      type: "ReactNode",
      description:
        "Label shown before the upcoming tokens. Override for localization.",
      default: '"Next:"',
    },
    {
      name: "TVDisplayToken.nextRestartKey",
      type: "string | number",
      description:
        "When this value changes, the upcoming-tokens marquee remounts and restarts from its initial hold. Pass the same key you use to drive the current-token rotation so the next-strip never overlaps the rotation transition.",
    },
  ],
};
