import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, RotateCw, WifiOff } from "lucide-react";

import { Button } from "@/components/ui/button";

const SNELLEN_LINES = [
  "C",
  "O U",
  "L D N",
  "T L O A D",
  "T H E P A G E",
  "R I G H T N O W",
  "R E T U R N T O C A R E",
];

const BLUR_RADIUS_PX = 180;
const TOUCH_UNBLUR_DURATION = 6000;
const BASE_FONT_SIZE = 56;
const FONT_SIZE_DECREMENT = 7;
const BLUR_INTENSITY = "2px";
const SCALE_DESKTOP = 1;
const SCALE_MOBILE = 0.75;
const MOUSE_THROTTLE_MS = 16; // ~60fps

// Memoized Snellen lines component to prevent unnecessary re-renders
const SnellenLines = ({ isUnblurred }: { isUnblurred: boolean }) => (
  <div className="relative z-10 flex flex-col items-center px-6 pt-6 pb-8 font-extrabold text-center leading-none">
    {SNELLEN_LINES.map((line, index) => {
      const fontSize = BASE_FONT_SIZE - index * FONT_SIZE_DECREMENT;
      return (
        <p
          key={`snellen-${index}`}
          className="text-black select-none pb-3 transition-all duration-300 will-change-[filter]"
          style={{
            fontSize: `${fontSize}px`,
            filter: isUnblurred ? "blur(0px)" : `blur(${BLUR_INTENSITY})`,
          }}
        >
          {line}
        </p>
      );
    })}
  </div>
);

export default function LoadFailedErrorPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isUnblurred, setIsUnblurred] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseMoveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouchDeviceRef = useRef(false);

  // Detect touch device once on mount
  useEffect(() => {
    isTouchDeviceRef.current =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
      if (mouseMoveTimeoutRef.current) clearTimeout(mouseMoveTimeoutRef.current);
    };
  }, []);

  // Throttled mouse tracking for blur mask effect (desktop only)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (mouseMoveTimeoutRef.current || isTouchDeviceRef.current) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      mouseMoveTimeoutRef.current = setTimeout(() => {
        mouseMoveTimeoutRef.current = null;
      }, MOUSE_THROTTLE_MS);
    }
  }, []);

  const handlePointerEnter = useCallback(() => {
    if (!isTouchDeviceRef.current) {
      setIsUnblurred(true);
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (!isTouchDeviceRef.current && !touchTimeoutRef.current) {
      setIsUnblurred(false);
    }
  }, []);

  // Touch handler for mobile (trigger unblur with touch position)
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }

    // Get touch coordinates relative to container
    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && touch) {
      setMousePos({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }

    setIsUnblurred(true);
    touchTimeoutRef.current = setTimeout(() => {
      setIsUnblurred(false);
      touchTimeoutRef.current = null;
    }, TOUCH_UNBLUR_DURATION);
  }, []);

  // Clean up touch on touchend
  const handleTouchEnd = useCallback(() => {
    // Timeout continues to manage the blur
  }, []);

  // Setup event listeners with passive flag for better scroll performance
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseMove, handleTouchStart, handleTouchEnd]);

  // Memoize mask image to prevent recalculation on every render
  const maskImage = useMemo(
    () =>
      `radial-gradient(circle ${BLUR_RADIUS_PX}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 70%)`,
    [mousePos.x, mousePos.y]
  );

  return (
    <main className="bg-background text-foreground flex min-h-dvh md:min-h-screen w-full flex-col items-center justify-center px-4 py-1 md:py-16">
      {/* Snellen Chart */}
      <div
        className="relative scale-[var(--scale-mobile)] rounded-xl border-6 border-yellow-950 transition-all duration-300 will-change-transform md:scale-[var(--scale-desktop)] md:justify-center"
        ref={containerRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          "--scale-mobile": SCALE_MOBILE,
          "--scale-desktop": SCALE_DESKTOP,
          boxShadow: `
            hsl(57, 19%, 35%, 0.73) 0px 1px 0.8px,
            hsl(57, 19%, 35%, 0.67) 0px 2.3px 1.9px -0.5px,
            hsl(57, 19%, 35%, 0.6) 0px 4.6px 3.8px -1px,
            hsl(57, 19%, 35%, 0.54) 0.1px 9px 7.4px -1.5px,
            hsl(57, 19%, 35%, 0.47) 0.1px 16.8px 13.9px -2px,
            hsl(57, 19%, 35%, 0.41) 0.2px 29.3px 24.2px -2.5px,
            hsl(57, 19%, 35%, 0.34) 0.3px 47.6px 39.3px -3px,
            hsl(57, 19%, 35%, 0.28) 0.5px 73px 60.2px -3.5px,
            hsl(57, 19%, 35%, 0.21) 0.7px 106.8px 88.1px -4px,
            hsl(57, 19%, 35%, 0.15) 0.9px 150px 123.8px -4.5px
          `,
        } as React.CSSProperties}
      >
        {/* Background glow animation */}
        <div
          className={`absolute inset-0 z-0 rounded-xl bg-yellow-100 blur-3xl pointer-events-none transition-all duration-700 will-change-opacity ${
            !isUnblurred ? "opacity-0 scale-90" : "opacity-50 scale-100"
          }`}
          aria-hidden="true"
        />

        {/* Chart Container */}
        <div className="relative max-w-fit w-full bg-white rounded-xl ring-1 ring-white/60 backdrop-blur-md transition-all duration-300 hover:shadow-[inset_0_0_40px_rgba(255,255,150,0.5)] will-change-shadow">
          {/* Radial cursor blur (desktop only) */}
          <div
            className="absolute inset-0 z-20 pointer-events-none rounded-xl will-change-[mask-image,webkit-mask-image]"
            style={{
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
              WebkitBackdropFilter: `blur(${BLUR_INTENSITY})`,
              backdropFilter: `blur(${BLUR_INTENSITY})`,
            }}
            aria-hidden="true"
          />

          {/* Snellen Lines */}
          <SnellenLines isUnblurred={isUnblurred} />
        </div>
      </div>

      {/* Error Content */}
      <div className="w-full max-w-xl text-center mt-2 md:mt-16">
        <div className="text-muted-foreground/70 font-mono text-sm tracking-widest uppercase">
          Error 503
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          We couldn&rsquo;t load this page
        </h1>
        <p className="text-muted-foreground mt-2 text-base leading-7 text-balance">
          Something went wrong while reaching our servers. This is usually a
          temporary network issue. Please try again, or come back in a minute.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button className="w-full sm:w-auto">
            <RotateCw data-icon="inline-start" />
            Try again
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <ArrowLeft data-icon="inline-start" />
            Go back
          </Button>
        </div>

        <p className="text-muted-foreground mt-10 inline-flex items-center gap-1.5 text-sm">
          <WifiOff className="size-4" />
          Still having issues?{" "}
          <a
            href="#"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Contact support
          </a>
        </p>
      </div>
    </main>
  );
}
