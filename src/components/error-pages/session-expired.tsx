import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";

const BREATH_CYCLE_MS = 4000;
const UPDATE_INTERVAL_MS = 1000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Digit map for 7-segment display
const SEGMENT_DIGITS = {
  "0": [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  "1": [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  "2": [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ],
  "3": [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  "4": [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  "5": [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  "6": [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  "7": [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  "8": [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  "9": [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  ":": [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
  "-": [
    [0, 0, 0],
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
    [0, 0, 0],
  ],
  "·": [
    [0, 0, 0],
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
} as const;

// Memoized segment digit component
const SegmentDigit = ({ digit }: { digit: string }) => {
  const map =
    SEGMENT_DIGITS[digit as keyof typeof SEGMENT_DIGITS] || SEGMENT_DIGITS["0"];

  return (
    <div className="inline-block">
      {map.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex">
          {row.map((cell, cellIndex) => (
            <div
              key={`cell-${cellIndex}`}
              className={`m-px h-1.5 w-1.5 transition-all duration-300 ease-out will-change-[background-color,opacity] ${
                cell ? "bg-gray-400 opacity-100" : "bg-gray-200 opacity-20"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Memoized time display component
const SegmentedTime = ({
  timeStr,
  scale,
}: {
  timeStr: string;
  scale: number;
}) => (
  <div
    className="flex origin-center transform items-center justify-center gap-1 will-change-transform"
    style={{ transform: `scale(${scale})` }}
  >
    {timeStr.split("").map((char, idx) => (
      <SegmentDigit key={`digit-${idx}`} digit={char} />
    ))}
  </div>
);

export default function SessionExpiredErrorPage() {
  const [seconds, setSeconds] = useState(0);
  const [breathState, setBreathState] = useState<"in" | "out">("in");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(REDUCED_MOTION_QUERY).matches
      : false
  );
  const startTimeRef = useRef<number | null>(null);

  // Format time string with proper padding
  const formatTime = useCallback((totalSeconds: number): string => {
    const absSeconds = Math.abs(totalSeconds);

    if (absSeconds >= 3600) {
      const hours = Math.floor(absSeconds / 3600);
      const minutes = Math.floor((absSeconds % 3600) / 60);
      const secs = absSeconds % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    const minutes = Math.floor(absSeconds / 60);
    const secs = absSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, []);

  // Calculate scale factor based on time string length
  const getScaleFactor = useCallback((timeStr: string): number => {
    const length = timeStr.length;
    if (length <= 5) return 1;
    if (length <= 8) return 0.75;
    return 0.6;
  }, []);

  // Memoize time string and scale factor
  const timeStr = useMemo(() => formatTime(seconds), [seconds, formatTime]);
  const scaleFactor = useMemo(
    () => getScaleFactor(timeStr),
    [timeStr, getScaleFactor]
  );

  // Timer effect
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }

      const elapsedMs = now - startTimeRef.current;
      const elapsedSec = Math.floor(elapsedMs / UPDATE_INTERVAL_MS);
      setSeconds(-elapsedSec);
    };

    const timer = setInterval(tick, UPDATE_INTERVAL_MS);
    tick(); // Initial tick

    return () => clearInterval(timer);
  }, []);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Breathing animation effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    const breathTimer = setInterval(() => {
      setBreathState((prev) => (prev === "in" ? "out" : "in"));
    }, BREATH_CYCLE_MS);

    return () => clearInterval(breathTimer);
  }, [prefersReducedMotion]);

  const shouldShowTime = seconds < 0;

  return (
    <main className="bg-background text-foreground flex min-h-screen w-full flex-col items-center justify-center px-4 py-16">
      {/* Ripple Timer Section */}
      <div className="mb-4 flex w-full flex-col items-center justify-center">
        <div className="relative flex h-64 w-64 items-center justify-center will-change-transform sm:h-72 sm:w-72 md:h-96 md:w-96">
          {/* Ripple Layers */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <div
              className={`bg-primary-500/20 absolute h-72 w-72 rounded-full will-change-transform sm:h-80 sm:w-80 ${
                prefersReducedMotion ? "" : "animate-ripple-slow"
              }`}
            />
            <div
              className={`bg-primary-600/20 absolute h-56 w-56 rounded-full will-change-transform sm:h-64 sm:w-64 ${
                prefersReducedMotion ? "" : "animate-ripple-medium"
              }`}
            />
            <div
              className={`bg-primary-700/20 absolute h-40 w-40 rounded-full will-change-transform sm:h-48 sm:w-48 ${
                prefersReducedMotion ? "" : "animate-ripple-fast"
              }`}
            />
          </div>

          {/* Timer Display */}
          <div className="bg-card rounded-squircle-full border-border absolute z-10 flex h-36 w-36 flex-col items-center justify-center border p-4 shadow-lg sm:h-40 sm:w-40">
            <div className="bg-muted mb-2 flex w-full items-center justify-center rounded-full p-2 shadow-inner">
              <div className="scale-65">
                {seconds === 0 ? (
                  <SegmentedTime timeStr="··:··" scale={scaleFactor} />
                ) : shouldShowTime ? (
                  <SegmentedTime timeStr={timeStr} scale={scaleFactor} />
                ) : null}
              </div>
            </div>

            {/* Breathing Text */}
            <div className="text-muted-foreground h-4 text-center text-xs font-medium uppercase transition-all duration-300">
              Breathe{" "}
              <span
                className={`block ${
                  prefersReducedMotion ? "" : "animate-breath"
                }`}
              >
                {breathState}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Content */}
      <div className="w-full max-w-xl px-4 text-center">
        <div className="text-muted-foreground/70 font-mono text-xs tracking-widest uppercase sm:text-sm">
          Session expired
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Welcome back!
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-6 text-balance sm:text-base sm:leading-7">
          It looks like your session timed out for a moment. Take a quick
          breather, then log in again to continue.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button className="w-full sm:w-auto">
            <LogIn data-icon="inline-start" />
            Sign in again
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Return to home
          </Button>
        </div>
      </div>
    </main>
  );
}
