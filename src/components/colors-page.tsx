import * as React from "react";
import { Check, Copy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  DocumentationHeader,
  DocumentationInlineCode as InlineCode,
  DocumentationPage,
  DocumentationParagraph,
  DocumentationSectionHeading as SectionHeading,
} from "@/components/documentation-primitives";

/**
 * Colors documentation page for the Care design system.
 *
 * Everything below is derived from the tokens declared in `src/index.css`.
 * Care UI follows a strict semantic-token model on top of the Tailwind v4
 * `--color-*` palette: components never reach for raw color scales —
 * they consume `background`, `foreground`, `border`, `primary`, etc. so
 * theming, dark mode, high-contrast and color-blind variants stay free.
 */

type Swatch = {
  token: string;
  className: string;
  light: string;
  dark: string;
  usage: string;
  /** Optional text color used to render the label on top of the swatch. */
  onClass?: string;
  /** Adds a visible border around very-light swatches that would melt into the page. */
  needsBorder?: boolean;
};

type SwatchCopyMode = "hex-only" | "class-and-hex";

let colorContext: CanvasRenderingContext2D | null = null;

function getColorContext() {
  if (typeof document === "undefined") {
    return null;
  }

  if (!colorContext) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    colorContext = canvas.getContext("2d");
  }

  return colorContext;
}

function toHex(color: string) {
  const ctx = getColorContext();
  if (!ctx) {
    return "";
  }

  try {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    if (a < 255) {
      return `#${[r, g, b, a]
        .map((n) => n.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()}`;
    }
    return `#${[r, g, b]
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()}`;
  } catch {
    return "";
  }
}

function resolveNodeHex(node: HTMLElement | null) {
  if (!node) {
    return "";
  }

  return toHex(getComputedStyle(node).color);
}

async function copyText(value: string) {
  if (!value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

function SwatchCard({
  swatch,
  copyMode,
}: {
  swatch: Swatch;
  copyMode: SwatchCopyMode;
}) {
  const [lightHex, setLightHex] = React.useState("");
  const [darkHex, setDarkHex] = React.useState("");
  const [copied, setCopied] = React.useState<"light" | "dark" | "class" | "">(
    ""
  );
  const lightProbeRef = React.useCallback((node: HTMLSpanElement | null) => {
    const nextHex = resolveNodeHex(node);
    setLightHex((currentHex) =>
      currentHex === nextHex ? currentHex : nextHex
    );
  }, []);
  const darkProbeRef = React.useCallback((node: HTMLSpanElement | null) => {
    const nextHex = resolveNodeHex(node);
    setDarkHex((currentHex) => (currentHex === nextHex ? currentHex : nextHex));
  }, []);

  React.useEffect(() => {
    if (!copied) {
      return;
    }

    const id = window.setTimeout(() => setCopied(""), 1200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const onCopyLightHex = async () => {
    await copyText(lightHex);
    setCopied("light");
  };

  const onCopyDarkHex = async () => {
    await copyText(darkHex);
    setCopied("dark");
  };

  const onCopyClass = async () => {
    await copyText(swatch.className);
    setCopied("class");
  };

  return (
    <div className="border-border bg-card flex flex-col overflow-hidden rounded-lg border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute size-0 overflow-hidden opacity-0"
      >
        <span ref={lightProbeRef} style={{ color: `var(--${swatch.token})` }} />
        <div className="dark">
          <span
            ref={darkProbeRef}
            style={{ color: `var(--${swatch.token})` }}
          />
        </div>
      </div>
      <div
        className={`${swatch.className} ${swatch.onClass ?? "text-foreground"} ${
          swatch.needsBorder ? "border-border border-b" : ""
        } flex h-20 items-end p-3 font-mono text-xs`}
      >
        Aa
      </div>
      <div className="space-y-2 p-4">
        <div className="text-foreground text-sm leading-none font-semibold">
          {swatch.token}
        </div>
        {copyMode === "class-and-hex" ? (
          <button
            type="button"
            onClick={onCopyClass}
            aria-label="Copy class name"
            title={`Copy ${swatch.className}`}
            className="border-border text-muted-foreground hover:bg-muted focus-visible:ring-ring/50 inline-flex h-7 items-center gap-1.5 self-start rounded-md border px-2 font-mono text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <span className="tabular-nums">{swatch.className}</span>
            {copied === "class" ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        ) : (
          <code className="text-muted-foreground block font-mono text-xs">
            {swatch.className}
          </code>
        )}
        {lightHex || darkHex ? (
          <div className="font-mono text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onCopyLightHex}
                aria-label="Copy light hex"
                title={`Copy light ${lightHex || "—"}`}
                className="border-border text-muted-foreground hover:bg-muted focus-visible:ring-ring/50 inline-flex h-7 items-center gap-1.5 rounded-md border px-2 tabular-nums transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <span className="font-mono">L</span>
                <span>{lightHex || "—"}</span>
                {copied === "light" ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
              <button
                type="button"
                onClick={onCopyDarkHex}
                aria-label="Copy dark hex"
                title={`Copy dark ${darkHex || "—"}`}
                className="border-border text-muted-foreground hover:bg-muted focus-visible:ring-ring/50 inline-flex h-7 items-center gap-1.5 rounded-md border px-2 tabular-nums transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <span className="font-mono">D</span>
                <span>{darkHex || "—"}</span>
                {copied === "dark" ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>
        ) : null}
        <div className="text-muted-foreground text-xs">
          <span className="font-mono">L</span> {swatch.light}{" "}
          <span className="text-foreground/30">·</span>{" "}
          <span className="font-mono">D</span> {swatch.dark}
        </div>
        <div className="text-muted-foreground text-xs">{swatch.usage}</div>
      </div>
    </div>
  );
}

function SwatchGrid({
  items,
  copyMode = "class-and-hex",
}: {
  items: Swatch[];
  copyMode?: SwatchCopyMode;
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <SwatchCard key={s.token} swatch={s} copyMode={copyMode} />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Token data — mirrors :root and .dark in src/index.css
   ────────────────────────────────────────────────────────────────────── */

const SURFACES: Swatch[] = [
  {
    token: "background",
    className: "bg-background",
    light: "white",
    dark: "neutral-950",
    usage: "App canvas. Sits below every surface.",
    needsBorder: true,
  },
  {
    token: "soft-background",
    className: "bg-soft-background",
    light: "neutral-50",
    dark: "neutral-900",
    usage: "Subtle zone shift — page header strip, empty states.",
    needsBorder: true,
  },
  {
    token: "muted-background",
    className: "bg-muted-background",
    light: "neutral-100",
    dark: "neutral-800",
    usage: "Inset panels, sidebars, table stripes.",
  },
  {
    token: "strong-background",
    className: "bg-strong-background",
    light: "neutral-200",
    dark: "neutral-700",
    usage: "Hover / pressed state for muted surfaces.",
  },
  {
    token: "muted",
    className: "bg-muted",
    light: "neutral-100",
    dark: "neutral-800",
    usage: "Inline chips, skeletons, code background.",
  },
  {
    token: "card",
    className: "bg-card",
    light: "white",
    dark: "neutral-900",
    usage: "Card, dialog body, popover surface.",
    needsBorder: true,
  },
  {
    token: "popover",
    className: "bg-popover",
    light: "white",
    dark: "neutral-950",
    usage: "Floating menus, dropdowns, tooltips.",
    needsBorder: true,
  },
  {
    token: "sidebar",
    className: "bg-sidebar",
    light: "neutral-100",
    dark: "neutral-900",
    usage: "App shell sidebar surface.",
  },
];

const FOREGROUNDS: Swatch[] = [
  {
    token: "foreground",
    className: "bg-foreground",
    onClass: "text-background",
    light: "neutral-950",
    dark: "neutral-50",
    usage: "Primary body and heading text.",
  },
  {
    token: "muted-foreground",
    className: "bg-muted-foreground",
    onClass: "text-background",
    light: "neutral-700",
    dark: "neutral-200",
    usage: "Secondary text, descriptions, captions.",
  },
  {
    token: "soft-foreground",
    className: "bg-soft-foreground",
    onClass: "text-background",
    light: "neutral-600",
    dark: "neutral-300",
    usage: "Tertiary text — metadata, helper hints.",
  },
  {
    token: "placeholder-foreground",
    className: "bg-placeholder-foreground",
    onClass: "text-background",
    light: "neutral-500",
    dark: "neutral-600",
    usage: "Input placeholders only.",
  },
  {
    token: "disabled-foreground",
    className: "bg-disabled-foreground",
    onClass: "text-background",
    light: "neutral-300",
    dark: "neutral-700",
    usage: "Disabled control text. Never use for live copy.",
  },
  {
    token: "inverse-foreground",
    className: "bg-inverse-foreground",
    onClass: "text-foreground",
    light: "white",
    dark: "black",
    usage: "Text on a foreground-colored surface.",
    needsBorder: true,
  },
];

const BORDERS: Swatch[] = [
  {
    token: "soft-border",
    className: "bg-soft-border",
    light: "neutral-100",
    dark: "white / 5%",
    usage: "Ghost dividers inside a card.",
    needsBorder: true,
  },
  {
    token: "border",
    className: "bg-border",
    light: "neutral-200",
    dark: "white / 9%",
    usage: "Default border for cards, inputs, dividers.",
  },
  {
    token: "strong-border",
    className: "bg-strong-border",
    light: "neutral-300",
    dark: "white / 15%",
    usage: "Hover state, outlined buttons.",
  },
  {
    token: "stronger-border",
    className: "bg-stronger-border",
    light: "neutral-400",
    dark: "white / 22%",
    usage: "Focus outlines, emphasised outlines.",
  },
  {
    token: "input",
    className: "bg-input",
    light: "neutral-300",
    dark: "white / 15%",
    usage: "Form control borders.",
  },
  {
    token: "ring",
    className: "bg-ring",
    light: "indigo-500 / 75%",
    dark: "indigo-500 / 75%",
    usage: "Focus ring. Reserved — never repurpose.",
  },
];

const BRAND: Swatch[] = [
  {
    token: "primary",
    className: "bg-primary",
    onClass: "text-primary-foreground",
    light: "emerald-800",
    dark: "emerald-400",
    usage: "Primary action — buttons, links, key controls.",
  },
  {
    token: "primary-foreground",
    className: "bg-primary-foreground",
    onClass: "text-primary",
    light: "emerald-50",
    dark: "emerald-950",
    usage: "Text/icons rendered on a primary surface.",
    needsBorder: true,
  },
  {
    token: "secondary",
    className: "bg-secondary",
    onClass: "text-secondary-foreground",
    light: "neutral-100",
    dark: "neutral-800",
    usage: "Secondary action — quieter than primary.",
  },
  {
    token: "secondary-foreground",
    className: "bg-secondary-foreground",
    onClass: "text-secondary",
    light: "neutral-900",
    dark: "neutral-50",
    usage: "Text on a secondary surface.",
  },
  {
    token: "accent",
    className: "bg-accent",
    onClass: "text-accent-foreground",
    light: "neutral-100",
    dark: "neutral-700",
    usage: "Hover / selected state in menus and nav.",
  },
  {
    token: "destructive",
    className: "bg-destructive",
    onClass: "text-destructive-foreground",
    light: "red-600",
    dark: "red-400",
    usage: "Destructive action, error state, delete.",
  },
];

const CHARTS: Swatch[] = [
  {
    token: "chart-1",
    className: "bg-chart-1",
    onClass: "text-inverse-foreground",
    light: "orange-600",
    dark: "blue-700",
    usage: "Series 1 — first/most-prominent dataset.",
  },
  {
    token: "chart-2",
    className: "bg-chart-2",
    onClass: "text-inverse-foreground",
    light: "primary-600",
    dark: "green-500",
    usage: "Series 2.",
  },
  {
    token: "chart-3",
    className: "bg-chart-3",
    onClass: "text-inverse-foreground",
    light: "cyan-900",
    dark: "amber-500",
    usage: "Series 3.",
  },
  {
    token: "chart-4",
    className: "bg-chart-4",
    onClass: "text-foreground",
    light: "amber-400",
    dark: "purple-500",
    usage: "Series 4.",
  },
  {
    token: "chart-5",
    className: "bg-chart-5",
    onClass: "text-foreground",
    light: "yellow-500",
    dark: "rose-500",
    usage: "Series 5 — least-prominent.",
  },
];

const PRIMARY_SCALE: { step: string; className: string; onClass: string }[] = [
  { step: "50", className: "bg-primary-50", onClass: "text-primary-950" },
  { step: "100", className: "bg-primary-100", onClass: "text-primary-950" },
  { step: "200", className: "bg-primary-200", onClass: "text-primary-950" },
  { step: "300", className: "bg-primary-300", onClass: "text-primary-950" },
  { step: "400", className: "bg-primary-400", onClass: "text-primary-950" },
  { step: "500", className: "bg-primary-500", onClass: "text-primary-50" },
  { step: "600", className: "bg-primary-600", onClass: "text-primary-50" },
  { step: "700", className: "bg-primary-700", onClass: "text-primary-50" },
  { step: "800", className: "bg-primary-800", onClass: "text-primary-50" },
  { step: "900", className: "bg-primary-900", onClass: "text-primary-50" },
  { step: "950", className: "bg-primary-950", onClass: "text-primary-50" },
];

/* ──────────────────────────────────────────────────────────────────────
   Base palette — every Tailwind v4 ramp the system actually consumes,
   either directly (charts, ring) or through a theme swap.
   ────────────────────────────────────────────────────────────────────── */

type RampDef = {
  name: string;
  role: string;
  /** All 11 bg classes 50→950, kept as static literals so Tailwind picks them up. */
  bg: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
};

const RAMPS: RampDef[] = [
  {
    name: "neutral",
    role: "Surfaces, foregrounds, borders, inputs — the entire grayscale.",
    bg: [
      "bg-neutral-50",
      "bg-neutral-100",
      "bg-neutral-200",
      "bg-neutral-300",
      "bg-neutral-400",
      "bg-neutral-500",
      "bg-neutral-600",
      "bg-neutral-700",
      "bg-neutral-800",
      "bg-neutral-900",
      "bg-neutral-950",
    ],
  },
  {
    name: "emerald",
    role: "Default primary brand. Drives the primary-* ramp in light & dark.",
    bg: [
      "bg-emerald-50",
      "bg-emerald-100",
      "bg-emerald-200",
      "bg-emerald-300",
      "bg-emerald-400",
      "bg-emerald-500",
      "bg-emerald-600",
      "bg-emerald-700",
      "bg-emerald-800",
      "bg-emerald-900",
      "bg-emerald-950",
    ],
  },
  {
    name: "blue",
    role: "Primary swap under protanopia theme. Also chart-1 in dark.",
    bg: [
      "bg-blue-50",
      "bg-blue-100",
      "bg-blue-200",
      "bg-blue-300",
      "bg-blue-400",
      "bg-blue-500",
      "bg-blue-600",
      "bg-blue-700",
      "bg-blue-800",
      "bg-blue-900",
      "bg-blue-950",
    ],
  },
  {
    name: "rose",
    role: "Primary swap under tritanopia theme. Also chart-5 in dark.",
    bg: [
      "bg-rose-50",
      "bg-rose-100",
      "bg-rose-200",
      "bg-rose-300",
      "bg-rose-400",
      "bg-rose-500",
      "bg-rose-600",
      "bg-rose-700",
      "bg-rose-800",
      "bg-rose-900",
      "bg-rose-950",
    ],
  },
  {
    name: "red",
    role: "Default destructive. Kept under tritanopia (distinguishable).",
    bg: [
      "bg-red-50",
      "bg-red-100",
      "bg-red-200",
      "bg-red-300",
      "bg-red-400",
      "bg-red-500",
      "bg-red-600",
      "bg-red-700",
      "bg-red-800",
      "bg-red-900",
      "bg-red-950",
    ],
  },
  {
    name: "yellow",
    role: "Destructive swap under protanopia. Also chart-5 in light.",
    bg: [
      "bg-yellow-50",
      "bg-yellow-100",
      "bg-yellow-200",
      "bg-yellow-300",
      "bg-yellow-400",
      "bg-yellow-500",
      "bg-yellow-600",
      "bg-yellow-700",
      "bg-yellow-800",
      "bg-yellow-900",
      "bg-yellow-950",
    ],
  },
  {
    name: "teal",
    role: "Green swap under protanopia (red/green → yellow/teal pair).",
    bg: [
      "bg-teal-50",
      "bg-teal-100",
      "bg-teal-200",
      "bg-teal-300",
      "bg-teal-400",
      "bg-teal-500",
      "bg-teal-600",
      "bg-teal-700",
      "bg-teal-800",
      "bg-teal-900",
      "bg-teal-950",
    ],
  },
  {
    name: "cyan",
    role: "Emerald swap under protanopia. Also chart-3 in light.",
    bg: [
      "bg-cyan-50",
      "bg-cyan-100",
      "bg-cyan-200",
      "bg-cyan-300",
      "bg-cyan-400",
      "bg-cyan-500",
      "bg-cyan-600",
      "bg-cyan-700",
      "bg-cyan-800",
      "bg-cyan-900",
      "bg-cyan-950",
    ],
  },
  {
    name: "amber",
    role: "Green swap under tritanopia. Also chart-3/4 across themes.",
    bg: [
      "bg-amber-50",
      "bg-amber-100",
      "bg-amber-200",
      "bg-amber-300",
      "bg-amber-400",
      "bg-amber-500",
      "bg-amber-600",
      "bg-amber-700",
      "bg-amber-800",
      "bg-amber-900",
      "bg-amber-950",
    ],
  },
  {
    name: "orange",
    role: "Emerald swap under tritanopia. Also chart-1 in light.",
    bg: [
      "bg-orange-50",
      "bg-orange-100",
      "bg-orange-200",
      "bg-orange-300",
      "bg-orange-400",
      "bg-orange-500",
      "bg-orange-600",
      "bg-orange-700",
      "bg-orange-800",
      "bg-orange-900",
      "bg-orange-950",
    ],
  },
  {
    name: "green",
    role: "Chart-2 in dark. Re-mapped to teal/amber under color-blind themes.",
    bg: [
      "bg-green-50",
      "bg-green-100",
      "bg-green-200",
      "bg-green-300",
      "bg-green-400",
      "bg-green-500",
      "bg-green-600",
      "bg-green-700",
      "bg-green-800",
      "bg-green-900",
      "bg-green-950",
    ],
  },
  {
    name: "purple",
    role: "Chart-4 in dark. Pure categorical accent, not theme-swapped.",
    bg: [
      "bg-purple-50",
      "bg-purple-100",
      "bg-purple-200",
      "bg-purple-300",
      "bg-purple-400",
      "bg-purple-500",
      "bg-purple-600",
      "bg-purple-700",
      "bg-purple-800",
      "bg-purple-900",
      "bg-purple-950",
    ],
  },
  {
    name: "indigo",
    role: "Focus ring (ring token). Not theme-swapped — universal focus color.",
    bg: [
      "bg-indigo-50",
      "bg-indigo-100",
      "bg-indigo-200",
      "bg-indigo-300",
      "bg-indigo-400",
      "bg-indigo-500",
      "bg-indigo-600",
      "bg-indigo-700",
      "bg-indigo-800",
      "bg-indigo-900",
      "bg-indigo-950",
    ],
  },
];

const RAMP_STEPS = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
];

function PaletteBox({
  className,
  label,
  textClassName,
  heightClassName = "h-14",
}: {
  className: string;
  label: string;
  textClassName: string;
  heightClassName?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) {
      return;
    }

    const id = window.setTimeout(() => setCopied(false), 1000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const onCopyClass = async () => {
    await copyText(className);
    setCopied(true);
  };

  return (
    <button
      type="button"
      onClick={onCopyClass}
      title={`Copy ${className}`}
      className={`${className} ${textClassName} ${heightClassName} focus-visible:ring-ring/50 flex flex-1 cursor-copy items-end justify-center pb-1 font-mono text-[10px] focus-visible:ring-2 focus-visible:outline-none`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}

function ColorRamp({ ramp }: { ramp: RampDef }) {
  return (
    <div className="border-border overflow-hidden rounded-lg border">
      <div className="bg-card flex items-baseline justify-between gap-3 px-4 py-3">
        <div className="text-foreground text-sm font-semibold">{ramp.name}</div>
        <div className="text-muted-foreground text-right text-xs">
          {ramp.role}
        </div>
      </div>
      <div className="flex">
        {ramp.bg.map((cls, i) => (
          <PaletteBox
            key={cls}
            className={cls}
            textClassName={i >= 5 ? "text-white" : "text-neutral-950"}
            label={RAMP_STEPS[i]}
          />
        ))}
      </div>
    </div>
  );
}

type ThemeRow = {
  name: string;
  selector: string;
  primary: string;
  destructive: string;
  notes: string;
};

const THEMES: ThemeRow[] = [
  {
    name: "Light (default)",
    selector: ":root",
    primary: "emerald-800",
    destructive: "red-600",
    notes: "Base palette. White canvas, neutral-950 text.",
  },
  {
    name: "Dark",
    selector: ".dark",
    primary: "emerald-400",
    destructive: "red-400",
    notes:
      "Borders shift to white-alpha so surfaces compose without harsh edges.",
  },
  {
    name: "Protanopia",
    selector: '[data-theme="protanopia"]',
    primary: "blue-800 / blue-400",
    destructive: "yellow-800 / yellow-300",
    notes:
      "Red→yellow, green→teal, emerald→cyan. Safe for protan & deutan vision.",
  },
  {
    name: "Tritanopia",
    selector: '[data-theme="tritanopia"]',
    primary: "rose-700 / rose-400",
    destructive: "red-600 / red-400",
    notes:
      "Green→amber, emerald→orange. Red kept (distinguishable for tritans).",
  },
  {
    name: "High Contrast",
    selector: ".high-contrast",
    primary: "(unchanged)",
    destructive: "(unchanged)",
    notes:
      "Modifier — pushes foreground, border, muted-foreground tokens toward maximum legibility.",
  },
];

type PairingRow = {
  surface: string;
  text: string;
  use: string;
  ratio: string;
};

const PAIRINGS: PairingRow[] = [
  {
    surface: "background",
    text: "foreground",
    use: "Body copy on the canvas.",
    ratio: "≥ 16:1",
  },
  {
    surface: "background",
    text: "muted-foreground",
    use: "Secondary copy on the canvas.",
    ratio: "≥ 7:1",
  },
  {
    surface: "background",
    text: "soft-foreground",
    use: "Tertiary copy. Body text only at ≥ 14px.",
    ratio: "≥ 5:1",
  },
  {
    surface: "card",
    text: "card-foreground",
    use: "Card body. Same contrast as canvas pair.",
    ratio: "≥ 16:1",
  },
  {
    surface: "muted",
    text: "foreground",
    use: "Inline chips, code, table stripes.",
    ratio: "≥ 14:1",
  },
  {
    surface: "primary",
    text: "primary-foreground",
    use: "Primary buttons, badges.",
    ratio: "≥ 8:1",
  },
  {
    surface: "destructive",
    text: "destructive-foreground",
    use: "Destructive buttons, error banners.",
    ratio: "≥ 7:1",
  },
  {
    surface: "accent",
    text: "accent-foreground",
    use: "Active nav item, menu highlight.",
    ratio: "≥ 14:1",
  },
];

export function ColorsPage() {
  return (
    <DocumentationPage>
      {/* Header */}
      <DocumentationHeader title="Colors">
        One semantic palette. Five themes. Care UI never paints with raw color
        scales — every surface, text and border resolves through a token so dark
        mode, high-contrast and color-blind safe variants all stay free.
      </DocumentationHeader>

      {/* Foundations */}
      <section>
        <SectionHeading id="foundations">Foundations</SectionHeading>
        <DocumentationParagraph spacing="stack">
          Tokens live in <InlineCode>src/index.css</InlineCode>. Each semantic
          name (e.g. <InlineCode>--background</InlineCode>) points at a Tailwind
          v4 palette value (e.g. <InlineCode>--color-neutral-950</InlineCode>)
          and is re-exported through the <InlineCode>@theme inline</InlineCode>{" "}
          block as a utility (<InlineCode>bg-background</InlineCode>,{" "}
          <InlineCode>text-foreground</InlineCode>,{" "}
          <InlineCode>border-border</InlineCode>). That single indirection is
          what makes the system themeable.
        </DocumentationParagraph>

        <div className="border-border bg-card mt-6 grid grid-cols-1 gap-4 rounded-lg border p-6 md:grid-cols-3">
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Base palette
            </div>
            <div className="text-foreground text-base font-semibold">
              Neutral + Emerald
            </div>
            <code className="text-muted-foreground font-mono text-xs">
              tailwindcss v4
            </code>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Theme modes
            </div>
            <div className="text-foreground text-base font-semibold">5</div>
            <code className="text-muted-foreground font-mono text-xs">
              light · dark · protanopia · tritanopia · high-contrast
            </code>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Contrast floor
            </div>
            <div className="text-foreground text-base font-semibold">
              WCAG AA
            </div>
            <code className="text-muted-foreground font-mono text-xs">
              4.5:1 body · 3:1 large/UI
            </code>
          </div>
        </div>

        <div className="bg-muted text-foreground mt-6 rounded-lg p-6">
          <div className="font-semibold">The one rule</div>
          <p className="mt-2 leading-7">
            Always reach for the <em>semantic</em> token, never a raw scale. Use{" "}
            <InlineCode>bg-card</InlineCode> not{" "}
            <InlineCode>bg-white</InlineCode>. Use{" "}
            <InlineCode>text-muted-foreground</InlineCode> not{" "}
            <InlineCode>text-neutral-500</InlineCode>. Raw scales only belong
            inside the <InlineCode>primary-*</InlineCode> ramp where the system
            itself swaps the palette per theme.
          </p>
        </div>
      </section>

      {/* Theme modes */}
      <section>
        <SectionHeading id="themes">Themes</SectionHeading>
        <DocumentationParagraph>
          Themes are layered. <InlineCode>.dark</InlineCode> toggles the color
          scheme. <InlineCode>[data-theme]</InlineCode> swaps the brand palette
          for color-blind safe scales (the swap is at the
          <em> palette</em> level — every component that uses{" "}
          <InlineCode>primary</InlineCode>, <InlineCode>destructive</InlineCode>
          , or any chart token updates with no extra work).{" "}
          <InlineCode>.high-contrast</InlineCode> is a modifier that only
          strengthens foreground and border tokens.
        </DocumentationParagraph>

        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Theme</TableHead>
                <TableHead>Root selector</TableHead>
                <TableHead>Primary</TableHead>
                <TableHead>Destructive</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {THEMES.map((t) => (
                <TableRow key={t.name}>
                  <TableCell className="text-sm font-medium">
                    {t.name}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {t.selector}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {t.primary}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {t.destructive}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {t.notes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Surfaces */}
      <section>
        <SectionHeading id="surfaces">Surface Tokens</SectionHeading>
        <DocumentationParagraph>
          Backgrounds stack from <strong>background</strong> (canvas) up to{" "}
          <strong>strong-background</strong> (deepest fill). Pair every surface
          with the matching <em>-foreground</em> token, or with a calibrated{" "}
          <InlineCode>foreground / muted-foreground</InlineCode> from the
          foregrounds section below.
        </DocumentationParagraph>
        <SwatchGrid items={SURFACES} />
      </section>

      {/* Foregrounds */}
      <section>
        <SectionHeading id="foregrounds">Foreground Tokens</SectionHeading>
        <DocumentationParagraph>
          Six steps of intent, not six steps of opacity. Pick by{" "}
          <em>meaning</em>: body, secondary, tertiary, placeholder, disabled,
          inverse. Never compose text contrast with{" "}
          <InlineCode>opacity</InlineCode> or{" "}
          <InlineCode>text-foreground/60</InlineCode> — it breaks under
          high-contrast mode.
        </DocumentationParagraph>
        <SwatchGrid items={FOREGROUNDS} />
      </section>

      {/* Borders */}
      <section>
        <SectionHeading id="borders">Borders, Inputs &amp; Ring</SectionHeading>
        <DocumentationParagraph>
          Borders mirror the surface stack — softer for inside-card dividers,
          stronger for outlined controls. In dark mode they are authored as{" "}
          <InlineCode>white / α</InlineCode> so they sit on any surface without
          banding.
        </DocumentationParagraph>
        <SwatchGrid items={BORDERS} />

        <div className="border-border bg-card mt-6 rounded-lg border p-6">
          <div className="text-foreground text-sm font-semibold">
            Focus ring policy
          </div>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            The <InlineCode>ring</InlineCode> token (indigo-500 @ 75%) is
            reserved for keyboard focus. It is intentionally <em>not</em>{" "}
            brand-colored so it stays visible across every palette swap. Apply
            via{" "}
            <InlineCode>
              focus-visible:ring-2 focus-visible:ring-ring/50
            </InlineCode>
            .
          </p>
        </div>
      </section>

      {/* Brand & state */}
      <section>
        <SectionHeading id="brand">Brand &amp; State</SectionHeading>
        <DocumentationParagraph>
          Use <strong>primary</strong> for the single most important action on a
          surface. Use <strong>secondary</strong> for everything else.{" "}
          <strong>Destructive</strong> is reserved for irreversible actions and
          error state — never for warnings.
        </DocumentationParagraph>
        <SwatchGrid items={BRAND} />
      </section>

      {/* Primary scale */}
      <section>
        <SectionHeading id="primary-scale">Primary Scale</SectionHeading>
        <DocumentationParagraph>
          The <InlineCode>primary-50 → primary-950</InlineCode> ramp tracks
          whichever palette the active theme has installed (emerald, blue, or
          rose). Compose nuanced primary states from this ramp — but still keep
          semantic intent: <InlineCode>primary-100</InlineCode> for a tinted
          background, <InlineCode>primary-700</InlineCode> for a hover, etc.
        </DocumentationParagraph>

        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <div className="flex">
            {PRIMARY_SCALE.map((s) => (
              <PaletteBox
                key={s.step}
                className={s.className}
                textClassName={s.onClass}
                label={s.step}
                heightClassName="h-20"
              />
            ))}
          </div>
          <div className="bg-card border-border border-t p-4">
            <code className="text-muted-foreground font-mono text-xs">
              bg-primary-50 · bg-primary-100 · … · bg-primary-950
            </code>
          </div>
        </div>
      </section>

      {/* Base palette */}
      <section>
        <SectionHeading id="base-palette">Base Palette</SectionHeading>
        <DocumentationParagraph>
          Every Care UI token ultimately resolves to one of the Tailwind v4
          ramps below. <strong>neutral</strong> powers the surface and
          foreground stacks. <strong>emerald · blue · rose</strong> are the
          three primary palettes the system swaps between as the theme changes.{" "}
          <strong>red · yellow</strong> drive destructive across those swaps.
          The remaining ramps feed the chart palette and the color-blind safe
          substitutions.
        </DocumentationParagraph>

        <div className="mt-6 space-y-4">
          {RAMPS.map((r) => (
            <ColorRamp key={r.name} ramp={r} />
          ))}
        </div>

        <div className="border-border bg-card mt-6 rounded-lg border p-6">
          <div className="text-foreground text-sm font-semibold">
            How the swap works
          </div>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            Under <InlineCode>[data-theme=&quot;protanopia&quot;]</InlineCode>{" "}
            the system redefines <InlineCode>--color-red-*</InlineCode> →{" "}
            <InlineCode>--color-yellow-*</InlineCode>,{" "}
            <InlineCode>--color-green-*</InlineCode> →{" "}
            <InlineCode>--color-teal-*</InlineCode>, and{" "}
            <InlineCode>--color-emerald-*</InlineCode> →{" "}
            <InlineCode>--color-cyan-*</InlineCode>. Under{" "}
            <InlineCode>[data-theme=&quot;tritanopia&quot;]</InlineCode>{" "}
            green→amber and emerald→orange. That means any component using{" "}
            <InlineCode>bg-emerald-500</InlineCode> would still get re-tinted
            correctly — but you should still consume the{" "}
            <InlineCode>primary</InlineCode> /{" "}
            <InlineCode>destructive</InlineCode> tokens, never the raw ramp.
          </p>
        </div>
      </section>

      {/* Charts */}
      <section>
        <SectionHeading id="charts">Chart Palette</SectionHeading>
        <DocumentationParagraph>
          Five categorical hues, ordered by visual prominence. Always use them
          in numeric order so the most important series gets the strongest hue.
          Each theme provides its own chart palette tuned for the underlying
          color scheme.
        </DocumentationParagraph>
        <SwatchGrid items={CHARTS} />

        <div className="border-border bg-card mt-6 rounded-lg border p-6">
          <div className="text-foreground text-sm font-semibold">
            Using chart tokens with Recharts (v3)
          </div>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            Reference tokens directly as <InlineCode>var(--chart-1)</InlineCode>{" "}
            — never wrap them in <InlineCode>hsl(...)</InlineCode>. The{" "}
            <InlineCode>ChartContainer</InlineCode> takes your config and emits
            a scoped <InlineCode>--color-&lt;key&gt;</InlineCode> variable for
            each series, which you then consume with{" "}
            <InlineCode>fill=&quot;var(--color-desktop)&quot;</InlineCode>.
          </p>
          <pre className="bg-muted mt-4 overflow-x-auto rounded-lg p-4">
            <code className="font-mono text-sm">{`const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile:  { label: "Mobile",  color: "var(--chart-2)" },
} satisfies ChartConfig;

<ChartContainer config={chartConfig} className="min-h-50 w-full">
  <BarChart data={data}>
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile"  fill="var(--color-mobile)"  radius={4} />
  </BarChart>
</ChartContainer>`}</code>
          </pre>
          <p className="text-muted-foreground mt-3 text-xs leading-5">
            Because Care UI&apos;s chart tokens are aliased to Tailwind color
            variables (e.g.{" "}
            <InlineCode>--chart-1: var(--color-orange-600)</InlineCode>), they
            automatically re-tint under{" "}
            <InlineCode>[data-theme=&quot;protanopia&quot;]</InlineCode> and{" "}
            <InlineCode>[data-theme=&quot;tritanopia&quot;]</InlineCode> with no
            chart-level changes.
          </p>
        </div>
      </section>

      {/* Contrast & readability */}
      <section>
        <SectionHeading id="contrast">
          Contrast &amp; Readability
        </SectionHeading>
        <DocumentationParagraph>
          Care UI ships with paired tokens so contrast is correct by default.
          The table below documents the contract — if a pairing you need
          isn&apos;t listed, you&apos;re likely composing wrong tokens.
        </DocumentationParagraph>

        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Surface</TableHead>
                <TableHead>Text</TableHead>
                <TableHead>Use</TableHead>
                <TableHead className="w-24">Light ratio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PAIRINGS.map((p) => (
                <TableRow key={`${p.surface}-${p.text}`}>
                  <TableCell className="font-mono text-xs">
                    {p.surface}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{p.text}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {p.use}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{p.ratio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-background border-border space-y-2 rounded-lg border p-6">
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              bg-background
            </div>
            <p className="text-foreground leading-7">
              Primary text on the canvas reads as crisp as possible.
            </p>
            <p className="text-muted-foreground leading-6">
              Secondary text drops one step of contrast for hierarchy.
            </p>
            <p className="text-soft-foreground text-sm leading-6">
              Tertiary text — metadata, timestamps, helper hints.
            </p>
          </div>
          <div className="bg-card border-border space-y-2 rounded-lg border p-6">
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              bg-card
            </div>
            <p className="text-card-foreground leading-7">
              Card surfaces use the same contrast contract as canvas.
            </p>
            <p className="text-muted-foreground leading-6">
              Description text remains <InlineCode>muted-foreground</InlineCode>
              .
            </p>
            <div className="pt-2">
              <span className="bg-primary text-primary-foreground inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium">
                Primary action
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Usage patterns */}
      <section>
        <SectionHeading id="usage">Usage Patterns</SectionHeading>

        <div className="border-border bg-card mt-6 space-y-6 rounded-lg border p-6 md:p-8">
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
              Text on surface
            </p>
            <pre className="bg-muted my-2 overflow-x-auto rounded-lg p-4">
              <code className="font-mono text-sm">{`<div className="bg-card text-card-foreground">
  <p>Primary copy</p>
  <p className="text-muted-foreground">Secondary copy</p>
</div>`}</code>
            </pre>
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
              Buttons
            </p>
            <pre className="bg-muted my-2 overflow-x-auto rounded-lg p-4">
              <code className="font-mono text-sm">{`// Primary
className="bg-primary text-primary-foreground hover:bg-primary/90"

// Secondary
className="bg-secondary text-secondary-foreground hover:bg-secondary/80"

// Destructive
className="bg-destructive text-destructive-foreground hover:bg-destructive/90"`}</code>
            </pre>
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
              Borders &amp; focus
            </p>
            <pre className="bg-muted my-2 overflow-x-auto rounded-lg p-4">
              <code className="font-mono text-sm">{`<input
  className="
    bg-background text-foreground placeholder:text-placeholder-foreground
    border border-input rounded-md
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-ring/50
  "
/>`}</code>
            </pre>
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
              Shadows
            </p>
            <p className="text-foreground leading-7">
              Shadows in Care UI are colored. They borrow from the surface they
              cast onto — <InlineCode>shadow-primary/50</InlineCode> under a
              primary button, <InlineCode>shadow-background</InlineCode> under a
              popover in dark mode. Never use raw{" "}
              <InlineCode>shadow-black</InlineCode>.
            </p>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section>
        <SectionHeading id="guidelines">Guidelines</SectionHeading>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="border-border bg-card space-y-3 rounded-lg border p-6">
            <div className="text-foreground text-sm font-semibold tracking-tight">
              Do
            </div>
            <ul className="text-muted-foreground ml-5 list-disc space-y-2 text-sm leading-6">
              <li>
                Reach for the semantic token —{" "}
                <code className="font-mono">bg-card</code>,{" "}
                <code className="font-mono">text-muted-foreground</code>,{" "}
                <code className="font-mono">border-border</code>.
              </li>
              <li>
                Pair surfaces with their matching{" "}
                <code className="font-mono">-foreground</code> token.
              </li>
              <li>
                Express disabled state with{" "}
                <code className="font-mono">disabled-foreground</code> /{" "}
                <code className="font-mono">muted-background</code>, not
                opacity.
              </li>
              <li>
                Test every page in all 5 themes before shipping — they are one
                CSS class away.
              </li>
              <li>
                Reserve <code className="font-mono">destructive</code> for
                irreversible actions.
              </li>
            </ul>
          </div>
          <div className="border-border bg-card space-y-3 rounded-lg border p-6">
            <div className="text-foreground text-sm font-semibold tracking-tight">
              Don&apos;t
            </div>
            <ul className="text-muted-foreground ml-5 list-disc space-y-2 text-sm leading-6">
              <li>
                Use raw scales (<code className="font-mono">bg-white</code>,{" "}
                <code className="font-mono">text-neutral-500</code>) in
                application code.
              </li>
              <li>
                Lower text contrast with{" "}
                <code className="font-mono">opacity</code> or{" "}
                <code className="font-mono">/40</code> on a foreground token.
              </li>
              <li>
                Use brand color (<code className="font-mono">primary</code>) for
                a focus ring — it disappears under a palette swap.
              </li>
              <li>
                Encode meaning with color alone. Always pair with text or
                iconography for color-blind users.
              </li>
              <li>
                Introduce new top-level color tokens without extending all
                themes in <code className="font-mono">src/index.css</code>.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </DocumentationPage>
  );
}
