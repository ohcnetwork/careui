import * as React from "react";

import { cn } from "@/lib/utils";

interface PixelCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  speed?: number;
  colors?: string[];
  noFocus?: boolean;
  variant?: "default" | "trail" | "glow";
}

interface Pixel {
  x: number;
  y: number;
  size: number;
  intensity: number;
  targetIntensity: number;
  colorPhase: number;
}

const EMERALD_COLORS = ["#065f46", "#10b981", "#a7f3d0"];

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16),
  };
}

function lerpColor(color1: string, color2: string, amount: number) {
  const from = hexToRgb(color1);
  const to = hexToRgb(color2);
  if (!from || !to) return color1;
  const channel = (start: number, end: number) =>
    Math.round(start + (end - start) * amount);
  return `rgb(${channel(from.r, to.r)}, ${channel(from.g, to.g)}, ${channel(from.b, to.b)})`;
}

function supportsPixelCanvas() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const browser = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const reducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const coarsePointer =
    window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const mobile =
    navigator.maxTouchPoints > 0 || coarsePointer || window.innerWidth <= 767;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = browser.deviceMemory ?? 4;
  let context: CanvasRenderingContext2D | null;

  try {
    context = document.createElement("canvas").getContext("2d");
  } catch {
    return false;
  }

  return Boolean(
    context &&
    typeof context.setTransform === "function" &&
    typeof window.requestAnimationFrame === "function" &&
    typeof window.PointerEvent === "function" &&
    !reducedMotion &&
    !mobile &&
    cores > 2 &&
    memory > 2 &&
    !browser.connection?.saveData
  );
}

export function PixelCanvas({
  className,
  gap = 12,
  speed = 0.045,
  colors = EMERALD_COLORS,
  noFocus = false,
  variant = "trail",
  ...props
}: PixelCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pixelsRef = React.useRef<Pixel[][]>([]);
  const pointerRef = React.useRef({ x: -1000, y: -1000 });
  const animationRef = React.useRef(0);
  const scheduleDrawRef = React.useRef<() => void>(() => {});
  const colorForPixel = React.useCallback(
    (intensity: number, phase: number) => {
      if (colors.length === 0) return "#ffffff";
      if (colors.length === 1) return colors[0]!;

      const position = ((phase + intensity) % 1) * (colors.length - 1);
      const index = Math.floor(position);
      const first = colors[index];
      const second = colors[Math.min(index + 1, colors.length - 1)];
      if (!first) return "#ffffff";
      if (!second) return first;
      return lerpColor(first, second, position - index);
    },
    [colors]
  );

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !supportsPixelCanvas()) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const pixelSize = Math.max(gap, 4);
    let columns = 0;
    let rows = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(rect.width * dpr);
      canvas.height = Math.ceil(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(rect.width / pixelSize);
      rows = Math.ceil(rect.height / pixelSize);

      pixelsRef.current = Array.from({ length: columns }, (_, columnIndex) =>
        Array.from({ length: rows }, (_, rowIndex) => {
          const previous = pixelsRef.current[columnIndex]?.[rowIndex];
          return {
            x: columnIndex * pixelSize,
            y: rowIndex * pixelSize,
            size: pixelSize - 1,
            intensity: previous?.intensity ?? 0,
            targetIntensity: 0,
            colorPhase: previous?.colorPhase ?? Math.random(),
          };
        })
      );
    };

    const draw = () => {
      animationRef.current = 0;
      context.clearRect(0, 0, width, height);
      const { x: pointerX, y: pointerY } = pointerRef.current;
      const radius = variant === "glow" ? 120 : 80;
      const radiusSquared = radius * radius;
      const glowPasses = variant === "glow" ? 2 : 1;
      let needsAnotherFrame = false;

      for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
        const column = pixelsRef.current[columnIndex];
        if (!column) continue;

        for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
          const pixel = column[rowIndex];
          if (!pixel) continue;

          const centerX = pixel.x + pixel.size / 2;
          const centerY = pixel.y + pixel.size / 2;
          const dx = pointerX - centerX;
          const dy = pointerY - centerY;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < radiusSquared) {
            pixel.targetIntensity = Math.pow(
              1 - Math.sqrt(distanceSquared) / radius,
              1.5
            );
          } else {
            pixel.targetIntensity = 0;
          }

          const fadeSpeed =
            pixel.targetIntensity > pixel.intensity ? 0.3 : speed;
          pixel.intensity +=
            (pixel.targetIntensity - pixel.intensity) * fadeSpeed;
          if (Math.abs(pixel.targetIntensity - pixel.intensity) > 0.005) {
            needsAnotherFrame = true;
          }
          if (pixel.intensity <= 0.01) continue;

          const color = colorForPixel(pixel.intensity, pixel.colorPhase);
          if (variant === "glow" && pixel.intensity > 0.2) {
            for (let pass = glowPasses; pass > 0; pass -= 1) {
              const glowSize = pixel.size + pass * 4;
              const offset = (glowSize - pixel.size) / 2;
              context.globalAlpha = (pixel.intensity * 0.15) / pass;
              context.fillStyle = color;
              context.fillRect(
                pixel.x - offset,
                pixel.y - offset,
                glowSize,
                glowSize
              );
            }
          }

          context.globalAlpha = pixel.intensity * 0.75;
          context.fillStyle = color;
          if (variant === "trail" && typeof context.roundRect === "function") {
            context.beginPath();
            context.roundRect(
              pixel.x,
              pixel.y,
              pixel.size,
              pixel.size,
              pixel.size * 0.3
            );
            context.fill();
          } else {
            context.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
          }
        }
      }

      context.globalAlpha = 1;
      if (needsAnotherFrame) {
        animationRef.current = window.requestAnimationFrame(draw);
      }
    };

    const scheduleDraw = () => {
      if (document.visibilityState === "hidden" || animationRef.current) return;
      animationRef.current = window.requestAnimationFrame(draw);
    };
    scheduleDrawRef.current = scheduleDraw;

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      scheduleDraw();
    };
    const onMouseMove = (event: MouseEvent) =>
      updatePointer(event.clientX, event.clientY);
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };
    const onPointerLeave = () => {
      pointerRef.current = { x: -1000, y: -1000 };
      scheduleDraw();
    };

    const pauseDraw = () => {
      pointerRef.current = { x: -1000, y: -1000 };
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      }
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") pauseDraw();
      else scheduleDraw();
    };

    resize();
    scheduleDraw();
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            resize();
            scheduleDraw();
          });
    observer?.observe(container);
    if (!observer) window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", pauseDraw);
    window.addEventListener("focus", scheduleDraw);
    window.addEventListener("pageshow", scheduleDraw);
    if (!noFocus) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onPointerLeave);
      container.addEventListener("touchmove", onTouchMove, { passive: true });
      container.addEventListener("touchend", onPointerLeave);
    }

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      }
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", pauseDraw);
      window.removeEventListener("focus", scheduleDraw);
      window.removeEventListener("pageshow", scheduleDraw);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onPointerLeave);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onPointerLeave);
      scheduleDrawRef.current = () => {};
    };
  }, [colorForPixel, gap, noFocus, speed, variant]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none block h-full w-full"
      />
    </div>
  );
}
