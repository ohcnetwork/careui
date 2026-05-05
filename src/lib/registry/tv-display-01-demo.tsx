import * as React from "react";
import {
  TVDisplay,
  TVDisplayBody,
  TVDisplayDoctor,
  TVDisplayHeader,
  TVDisplayRoom,
  TVDisplayRow,
  TVDisplayToken,
} from "@/components/ui/tv-display";
import { cn } from "@/lib/utils";

/**
 * Slide-up + fade swap for the active token. Splits by grapheme so complex
 * scripts (Malayalam, emoji, etc.) stay intact.
 */
function RotatingText({
  value,
  stagger = 0.025,
  duration = 0.5,
}: {
  value: string;
  stagger?: number;
  duration?: number;
}) {
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
      <style href="tv-rotating-text-in" precedence="tv-display">{`@keyframes tv-rotating-text-in {
        0% { transform: translateY(100%); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }`}</style>
    </span>
  );
}

function useRotatingIndex(length: number, intervalMs: number) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);
  return idx;
}

// Per-row tick interval (ms) — staggered so rows never advance in lockstep.
const ANIMATED_INTERVALS = [9000, 7500, 11000, 6500];

interface QueueRow {
  doctor: string;
  specialty: string;
  room: string;
  current: string;
  next: string[];
}

function AnimatedRow({
  row,
  intervalMs,
}: {
  row: QueueRow;
  intervalMs: number;
}) {
  const sequence = React.useMemo(() => {
    const seq = Array.from(new Set([row.current, ...row.next])).filter(Boolean);
    return seq.length > 1 ? seq : [row.current];
  }, [row.current, row.next]);
  const idx = useRotatingIndex(sequence.length, intervalMs);
  const current = sequence[idx];
  const next = [
    sequence[(idx + 1) % sequence.length],
    sequence[(idx + 2) % sequence.length],
    sequence[(idx + 3) % sequence.length],
  ];
  return (
    <TVDisplayRow className="relative overflow-hidden">
      <TVDisplayDoctor name={row.doctor} specialty={row.specialty} />
      <TVDisplayRoom>{row.room}</TVDisplayRoom>
      <TVDisplayToken
        current={<RotatingText value={current} />}
        next={next}
      />
      {/* Glare sweep replays each tick via key={idx}. */}
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

const QUEUE: QueueRow[] = [
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

export function TVDisplay01Demo({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-neutral-950",
        fullPage ? "min-h-screen" : ""
      )}
      style={{
        height: fullPage ? "100vh" : "480px",
      }}
    >
      <div className="w-full max-w-400">
        <TVDisplay aspectRatio="16/9">
          <TVDisplayHeader>
            <span>Doctor</span>
            <span>Room</span>
            <span>Token</span>
          </TVDisplayHeader>
          <TVDisplayBody>
            {QUEUE.map((row, i) => (
              <AnimatedRow
                key={row.doctor}
                row={row}
                intervalMs={ANIMATED_INTERVALS[i % ANIMATED_INTERVALS.length]}
              />
            ))}
          </TVDisplayBody>
        </TVDisplay>
      </div>
    </div>
  );
}
