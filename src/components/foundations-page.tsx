import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

/**
 * Foundations documentation page for the Care design system.
 *
 * Spacing, Elevation, Borders & Radius, and Layout — every value here is
 * sourced directly from `src/index.css`, `src/components/ui/sidebar.tsx`,
 * `src/App.tsx`, and the live UI primitives under `src/components/ui/`.
 * Nothing is invented; this page is a faithful audit of the tokens and
 * conventions Care UI already ships.
 */

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-muted text-foreground relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight"
    >
      {children}
    </h2>
  );
}

/* ── Spacing scale (Tailwind v4 default --spacing: 0.25rem, not overridden) ── */

type SpacingRow = {
  step: string;
  rem: string;
  px: string;
  classes: string;
  usage: string;
};

const SPACING: SpacingRow[] = [
  { step: "0", rem: "0",       px: "0",   classes: "p-0 / m-0 / gap-0",   usage: "Reset." },
  { step: "0.5", rem: "0.125", px: "2",   classes: "p-0.5 / gap-0.5",     usage: "Hairline insets, dense icon padding." },
  { step: "1",   rem: "0.25",  px: "4",   classes: "p-1 / gap-1",         usage: "Menu padding, tight icon gaps (dropdown, popover)." },
  { step: "1.5", rem: "0.375", px: "6",   classes: "p-1.5 / gap-1.5",     usage: "Compact control gaps, tooltip padding." },
  { step: "2",   rem: "0.5",   px: "8",   classes: "p-2 / gap-2",         usage: "Header toolbars, small chip padding, list-item gaps." },
  { step: "2.5", rem: "0.625", px: "10",  classes: "px-2.5",              usage: "Default horizontal padding for buttons, select trigger." },
  { step: "3",   rem: "0.75",  px: "12",  classes: "px-3 / gap-3",        usage: "Input horizontal padding, form-field gaps." },
  { step: "4",   rem: "1",     px: "16",  classes: "p-4 / gap-4 / mt-4",  usage: "Card body padding (compact), section internals." },
  { step: "6",   rem: "1.5",   px: "24",  classes: "p-6 / mt-6 / my-6",   usage: "Card / popover / dialog body padding, body prose rhythm." },
  { step: "8",   rem: "2",     px: "32",  classes: "p-8 / mt-8 / md:p-8", usage: "Page padding (desktop), h3 top margin." },
  { step: "10",  rem: "2.5",   px: "40",  classes: "mt-10",               usage: "h2 top margin (major section break)." },
  { step: "12",  rem: "3",     px: "48",  classes: "h-12",                usage: "Default control height on mobile (--header-height in shell)." },
  { step: "16",  rem: "4",     px: "64",  classes: "h-16 / space-y-16",   usage: "Top app-bar height, between-section spacing on docs pages." },
];

/* ── Radius (declared in :root via --radius and ladder in @theme inline) ── */

type RadiusRow = {
  token: string;
  className: string;
  value: string;
  px: string;
  usage: string;
};

const RADIUS: RadiusRow[] = [
  { token: "sm",  className: "rounded-sm",  value: "calc(0.625rem − 4px)", px: "6px",  usage: "Menu items, dropdown items, small chips." },
  { token: "md",  className: "rounded-md",  value: "calc(0.625rem − 2px)", px: "8px",  usage: "Default for buttons, inputs, selects, dropdowns, popovers." },
  { token: "lg",  className: "rounded-lg",  value: "0.625rem",              px: "10px", usage: "Tabs list, hover-card, large surfaces." },
  { token: "xl",  className: "rounded-xl",  value: "calc(0.625rem + 4px)", px: "14px", usage: "Card, alert-dialog, frame default (--frame-radius)." },
  { token: "2xl", className: "rounded-2xl", value: "calc(0.625rem + 8px)", px: "18px", usage: "Hero cards, marketing surfaces." },
  { token: "3xl", className: "rounded-3xl", value: "calc(0.625rem + 12px)", px: "22px", usage: "Showcase / decorative containers." },
  { token: "4xl", className: "rounded-4xl", value: "calc(0.625rem + 16px)", px: "26px", usage: "Reserved — currently unused at component level." },
  { token: "full", className: "rounded-full", value: "9999px",              px: "—",    usage: "Avatars, indicators, progress bar, pill badges." },
];

/* ── Squircle utilities (custom Care UI, requires corner-shape support) ── */

const SQUIRCLE: { className: string; based_on: string; note: string }[] = [
  { className: "rounded-squircle-sm",   based_on: "rounded-sm",   note: "superellipse(1.6) corner shape." },
  { className: "rounded-squircle-md",   based_on: "rounded-lg",   note: "superellipse(1.6) corner shape." },
  { className: "rounded-squircle-lg",   based_on: "rounded-lg",   note: "superellipse(1.6) corner shape." },
  { className: "rounded-squircle-xl",   based_on: "rounded-xl",   note: "superellipse(1.6) corner shape." },
  { className: "rounded-squircle-2xl",  based_on: "rounded-xl",   note: "superellipse(1.6) corner shape." },
  { className: "rounded-squircle-3xl",  based_on: "rounded-3xl",  note: "superellipse(1.6) corner shape." },
  { className: "rounded-squircle-full", based_on: "rounded-full", note: "superellipse(1) — perfect rounding." },
];

/* ── Borders (recap from Colors page, here grouped by use) ── */

type BorderRow = {
  className: string;
  token: string;
  usage: string;
};

const BORDERS: BorderRow[] = [
  { className: "border",                    token: "border-border",         usage: "Default 1px border (applied globally via `* { @apply border-border }`)." },
  { className: "border-input",              token: "input",                 usage: "All form controls — input, select, textarea, checkbox, OTP slot." },
  { className: "border-soft-border",        token: "soft-border",           usage: "Ghost dividers inside a card." },
  { className: "border-strong-border",      token: "strong-border",         usage: "Outlined button, hover state on default border." },
  { className: "border-stronger-border",    token: "stronger-border",       usage: "Emphasised outlines (some button outline variants)." },
  { className: "border-border/50 or /60",   token: "border (with alpha)",   usage: "Subtle dividers — chart tooltip, browser tabs." },
  { className: "ring-1 ring-foreground/10", token: "foreground/10",         usage: "Hairline ring paired with elevation on floating surfaces." },
];

/* ── Elevation ladder, derived from actual component usage ──
   Patterns observed across input, card, button, menubar, dropdown-menu,
   popover, sheet, alert-dialog, chart tooltip.
*/

type ElevationRow = {
  level: string;
  className: string;
  pairing: string;
  components: string;
};

const ELEVATION: ElevationRow[] = [
  {
    level: "E0 — Flat",
    className: "(no shadow)",
    pairing: "border / divider only",
    components: "Table rows, accordion items, list items, sidebar.",
  },
  {
    level: "E1 — Inset",
    className: "shadow-2xs",
    pairing: "border-input",
    components: "Input.",
  },
  {
    level: "E2 — Raised",
    className: "shadow-xs",
    pairing: "border + ring-1 ring-foreground/10",
    components: "Card, button-group, menubar, frame, checkbox, OTP slot, toggle (outline), input-group, select trigger.",
  },
  {
    level: "E3 — Floating menu",
    className: "shadow-md",
    pairing: "ring-1 ring-foreground/10 + bg-popover",
    components: "Dropdown menu, context menu, menubar content, select content, hover-card.",
  },
  {
    level: "E4 — Floating panel",
    className: "shadow-lg",
    pairing: "ring-1 ring-foreground/10 + bg-clip-padding",
    components: "Sheet, sub-dropdown menu, sub-context-menu.",
  },
  {
    level: "E5 — Modal / overlay",
    className: "shadow-xl",
    pairing: "ring-1 ring-foreground/10 + bg-popover",
    components: "Popover, chart tooltip, alert-dialog (xl via grid pattern).",
  },
];

const BUTTON_DEPTH: { state: string; className: string; note: string }[] = [
  {
    state: "Rest",
    className: "shadow-md shadow-primary/50 + not-disabled:inset-shadow-2xs inset-shadow-primary-200/30",
    note: "Colored drop shadow (brand-tinted) + subtle inner highlight along the top edge.",
  },
  {
    state: "Pressed",
    className: "[:active,[data-pressed]]:inset-shadow-sm inset-shadow-primary-800",
    note: "Inner shadow deepens to give a physical 'press' feedback.",
  },
  {
    state: "Disabled",
    className: "[:disabled,…]:shadow-none",
    note: "All shadows flatten when disabled.",
  },
];

/* ── Layout primitives, sourced from App.tsx + sidebar.tsx ── */

type LayoutRow = {
  area: string;
  value: string;
  source: string;
};

const LAYOUT: LayoutRow[] = [
  {
    area: "App shell",
    value: "SidebarProvider · h-svh · overflow-hidden",
    source: "src/App.tsx",
  },
  {
    area: "Sidebar width (desktop)",
    value: "16rem (256px) — overridden to 18rem (288px) on docs shell via --sidebar-width",
    source: "src/components/ui/sidebar.tsx · src/App.tsx",
  },
  {
    area: "Sidebar width (mobile sheet)",
    value: "18rem (288px)",
    source: "SIDEBAR_WIDTH_MOBILE in sidebar.tsx",
  },
  {
    area: "Sidebar width (icon collapsed)",
    value: "3rem (48px)",
    source: "SIDEBAR_WIDTH_ICON in sidebar.tsx",
  },
  {
    area: "Top app bar",
    value: "h-16 (64px) — flex items-center · border-b · px-4",
    source: "SidebarInset header in App.tsx",
  },
  {
    area: "Docs page container",
    value: "mx-auto max-w-4xl space-y-16 p-4 md:p-8",
    source: "typography-page.tsx · colors-page.tsx · this page",
  },
  {
    area: "Lead paragraph width",
    value: "max-w-2xl · text-xl · leading-7",
    source: "all docs page headers",
  },
  {
    area: "Card body padding",
    value: "p-6 (default) · p-8 (large variants)",
    source: "card / alert-dialog / popover / hover-card / colors-page swatch cards",
  },
];

const CONTROL_HEIGHTS: { tier: string; mobile: string; desktop: string; components: string }[] = [
  {
    tier: "Default form control",
    mobile: "h-12 (48px)",
    desktop: "md:h-10 (40px)",
    components: "Input, Input group, Select trigger (size=default).",
  },
  {
    tier: "Compact control",
    mobile: "h-12 (48px)",
    desktop: "md:h-9 (36px)",
    components: "Select trigger (size=sm), small button groups.",
  },
  {
    tier: "Dense / nested",
    mobile: "h-9 (36px)",
    desktop: "h-9 (36px)",
    components: "Menubar trigger, tabs trigger, small chips.",
  },
  {
    tier: "Tight inline",
    mobile: "h-8 (32px)",
    desktop: "h-8 (32px)",
    components: "Filters chips, segmented inline editors.",
  },
];

export function FoundationsPage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl space-y-16 p-4 md:p-8">
        {/* Header */}
        <header>
          <div className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
            Documentation
          </div>
          <h1 className="scroll-m-20 mt-3 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl">
            Foundations
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-xl leading-7">
            Spacing, elevation, borders &amp; radius, and the layout shell.
            Every value on this page is sourced directly from Care UI&apos;s{" "}
            <InlineCode>src/index.css</InlineCode>, the sidebar primitive,
            and the live components — nothing invented.
          </p>
        </header>

        {/* Spacing */}
        <section>
          <SectionHeading id="spacing">Spacing</SectionHeading>
          <p className="text-foreground mt-6 leading-7">
            Care UI uses Tailwind v4&apos;s default spacing unit:{" "}
            <InlineCode>--spacing: 0.25rem</InlineCode> (4px). It is{" "}
            <em>not</em> overridden. Every <InlineCode>p-*</InlineCode>,{" "}
            <InlineCode>m-*</InlineCode>, <InlineCode>gap-*</InlineCode>,
            and <InlineCode>space-*</InlineCode> utility is a multiple of
            that base. The table below documents the steps actually used
            across the system.
          </p>

          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Step</TableHead>
                  <TableHead className="w-20">rem</TableHead>
                  <TableHead className="w-16">px</TableHead>
                  <TableHead>Common classes</TableHead>
                  <TableHead>Usage in Care UI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SPACING.map((s) => (
                  <TableRow key={s.step}>
                    <TableCell className="font-mono text-xs font-semibold">
                      {s.step}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{s.rem}</TableCell>
                    <TableCell className="font-mono text-xs">{s.px}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {s.classes}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {s.usage}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="border-border bg-card mt-6 rounded-lg border p-6">
            <div className="text-foreground text-sm font-semibold">
              Hit-area utility (Care-specific)
            </div>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Care UI ships custom utilities <InlineCode>hit-area-*</InlineCode>
              {", "}
              <InlineCode>hit-area-x-*</InlineCode>,{" "}
              <InlineCode>hit-area-y-*</InlineCode>, and per-side variants
              (declared in <InlineCode>src/index.css</InlineCode>). They
              extend the click target via a positioned{" "}
              <InlineCode>::before</InlineCode> without affecting layout —
              useful for small icon-only controls where a 44×44 touch target
              is required.
            </p>
          </div>
        </section>

        {/* Elevation */}
        <section>
          <SectionHeading id="elevation">Elevation</SectionHeading>
          <p className="text-foreground mt-6 leading-7">
            Care UI uses Tailwind&apos;s shadow scale, paired with a{" "}
            <strong>hairline ring</strong> (
            <InlineCode>ring-1 ring-foreground/10</InlineCode>) on every
            floating surface to crisp the edge against any background.
            Shadows are <em>colored</em> on brand controls (
            <InlineCode>shadow-primary/50</InlineCode>) and{" "}
            <em>inverted</em> in dark mode (
            <InlineCode>dark:shadow-background</InlineCode>) — never raw
            black.
          </p>

          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Level</TableHead>
                  <TableHead>Shadow class</TableHead>
                  <TableHead>Paired with</TableHead>
                  <TableHead>Components</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ELEVATION.map((e) => (
                  <TableRow key={e.level}>
                    <TableCell className="text-sm font-medium">
                      {e.level}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {e.className}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {e.pairing}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {e.components}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Live elevation samples */}
          <div className="bg-muted/40 mt-6 grid grid-cols-2 gap-6 rounded-lg p-8 md:grid-cols-5">
            <div className="bg-card border-border rounded-md border p-4 text-center text-xs font-mono">
              E0
            </div>
            <div className="bg-card border-border rounded-md border p-4 text-center text-xs font-mono shadow-2xs">
              E1 · 2xs
            </div>
            <div className="bg-card border-border ring-foreground/10 rounded-md border p-4 text-center text-xs font-mono shadow-xs ring-1">
              E2 · xs
            </div>
            <div className="bg-popover ring-foreground/10 rounded-md p-4 text-center text-xs font-mono shadow-md ring-1">
              E3 · md
            </div>
            <div className="bg-popover ring-foreground/10 rounded-md p-4 text-center text-xs font-mono shadow-xl ring-1">
              E5 · xl
            </div>
          </div>

          <h3 className="scroll-m-20 mt-8 text-2xl font-semibold tracking-tight">
            Button depth (Care-specific)
          </h3>
          <p className="text-foreground mt-4 leading-7">
            Primary and outline buttons add an <em>inset shadow</em> on top
            of the drop shadow, giving them a physical pressed-state
            transition. This is unique to Care UI&apos;s button component.
          </p>

          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">State</TableHead>
                  <TableHead>Shadow stack</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BUTTON_DEPTH.map((b) => (
                  <TableRow key={b.state}>
                    <TableCell className="text-sm font-medium">
                      {b.state}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {b.className}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {b.note}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Borders & Radius */}
        <section>
          <SectionHeading id="borders-radius">
            Borders &amp; Radius
          </SectionHeading>
          <p className="text-foreground mt-6 leading-7">
            All radii cascade from <strong>one</strong> token:{" "}
            <InlineCode>--radius: 0.625rem</InlineCode> (10px). The full
            ladder (<InlineCode>sm</InlineCode>…
            <InlineCode>4xl</InlineCode>) is generated by adding or
            subtracting from that base in{" "}
            <InlineCode>@theme inline</InlineCode>, so changing one value
            re-tunes the entire system proportionally.
          </p>

          <h3 className="scroll-m-20 mt-8 text-2xl font-semibold tracking-tight">
            Radius scale
          </h3>
          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Token</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="w-16">px</TableHead>
                  <TableHead>Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RADIUS.map((r) => (
                  <TableRow key={r.token}>
                    <TableCell className="font-mono text-xs font-semibold">
                      {r.token}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {r.className}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {r.value}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{r.px}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {r.usage}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Live radius preview */}
          <div className="bg-muted/40 mt-6 grid grid-cols-4 gap-4 rounded-lg p-6 md:grid-cols-8">
            <div className="bg-card border-border rounded-sm border p-4 text-center text-[10px] font-mono">sm</div>
            <div className="bg-card border-border rounded-md border p-4 text-center text-[10px] font-mono">md</div>
            <div className="bg-card border-border rounded-lg border p-4 text-center text-[10px] font-mono">lg</div>
            <div className="bg-card border-border rounded-xl border p-4 text-center text-[10px] font-mono">xl</div>
            <div className="bg-card border-border rounded-2xl border p-4 text-center text-[10px] font-mono">2xl</div>
            <div className="bg-card border-border rounded-3xl border p-4 text-center text-[10px] font-mono">3xl</div>
            <div className="bg-card border-border rounded-4xl border p-4 text-center text-[10px] font-mono">4xl</div>
            <div className="bg-card border-border rounded-full border p-4 text-center text-[10px] font-mono">full</div>
          </div>

          <h3 className="scroll-m-20 mt-8 text-2xl font-semibold tracking-tight">
            Squircle utilities
          </h3>
          <p className="text-foreground mt-4 leading-7">
            Care UI ships custom <InlineCode>rounded-squircle-*</InlineCode>{" "}
            utilities (declared in <InlineCode>src/index.css</InlineCode>)
            that apply{" "}
            <InlineCode>corner-shape: superellipse(1.6)</InlineCode> on top
            of the standard radius. They progressively enhance — browsers
            without <InlineCode>corner-shape</InlineCode> support fall back
            to the regular rounded corner.
          </p>

          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utility</TableHead>
                  <TableHead>Based on</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SQUIRCLE.map((s) => (
                  <TableRow key={s.className}>
                    <TableCell className="font-mono text-xs">
                      {s.className}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {s.based_on}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {s.note}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator className="my-10" />

          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Border tokens by use
          </h3>
          <p className="text-foreground mt-4 leading-7">
            The border tokens themselves are documented in detail on the{" "}
            <a
              href="#"
              className="text-primary underline-offset-4 hover:underline"
            >
              Colors
            </a>{" "}
            page. The table below is the practical mapping — which token
            shows up where in the live components.
          </p>

          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Where it lives</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BORDERS.map((b) => (
                  <TableRow key={b.className}>
                    <TableCell className="font-mono text-xs">
                      {b.className}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {b.token}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {b.usage}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="border-border bg-card mt-6 rounded-lg border p-6">
            <div className="text-foreground text-sm font-semibold">
              Global border colour
            </div>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              The <InlineCode>@layer base</InlineCode> block in{" "}
              <InlineCode>src/index.css</InlineCode> applies{" "}
              <InlineCode>* {`{`} @apply border-border outline-ring/50; {`}`}</InlineCode>
              {" "}— so any element you give a <InlineCode>border</InlineCode>{" "}
              class inherits the correct semantic colour automatically.
              Override with <InlineCode>border-input</InlineCode> on form
              controls or <InlineCode>border-strong-border</InlineCode> for
              emphasised dividers.
            </p>
          </div>
        </section>

        {/* Layout */}
        <section>
          <SectionHeading id="layout">Layout</SectionHeading>
          <p className="text-foreground mt-6 leading-7">
            The Care UI app shell is a <InlineCode>SidebarProvider</InlineCode>
            {" "}around an <InlineCode>AppSidebar</InlineCode> and{" "}
            <InlineCode>SidebarInset</InlineCode>, with a sticky top app bar
            and a single scroll region for the main content. All measurements
            below are taken from <InlineCode>src/App.tsx</InlineCode> and{" "}
            <InlineCode>src/components/ui/sidebar.tsx</InlineCode>.
          </p>

          <h3 className="scroll-m-20 mt-8 text-2xl font-semibold tracking-tight">
            App shell measurements
          </h3>
          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LAYOUT.map((l) => (
                  <TableRow key={l.area}>
                    <TableCell className="text-sm font-medium">
                      {l.area}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {l.value}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">
                      {l.source}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <h3 className="scroll-m-20 mt-8 text-2xl font-semibold tracking-tight">
            Control heights
          </h3>
          <p className="text-foreground mt-4 leading-7">
            Care UI uses a responsive control height: <strong>taller on
            mobile</strong> for touch, <strong>compact on desktop</strong>{" "}
            for density. The pattern{" "}
            <InlineCode>h-12 md:h-10</InlineCode> appears on every primary
            form control (Input, Input group, Select trigger).
          </p>

          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tier</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Desktop</TableHead>
                  <TableHead>Components</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CONTROL_HEIGHTS.map((c) => (
                  <TableRow key={c.tier}>
                    <TableCell className="text-sm font-medium">
                      {c.tier}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {c.mobile}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {c.desktop}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {c.components}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <h3 className="scroll-m-20 mt-8 text-2xl font-semibold tracking-tight">
            Documentation page layout
          </h3>
          <p className="text-foreground mt-4 leading-7">
            Every long-form documentation page (Typography, Colors, this
            page) shares the same container so reading width and section
            rhythm stay consistent.
          </p>

          <pre className="bg-muted my-6 overflow-x-auto rounded-lg p-4">
            <code className="font-mono text-sm">{`<main className="flex-1 overflow-y-auto">
  <div className="mx-auto max-w-4xl space-y-16 p-4 md:p-8">
    <header>
      <h1 className="scroll-m-20 mt-3 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Page title
      </h1>
      <p className="text-muted-foreground mt-6 max-w-2xl text-xl leading-7">
        Lead paragraph.
      </p>
    </header>

    <section>
      <SectionHeading id="…">Section</SectionHeading>
      {/* … */}
    </section>
  </div>
</main>`}</code>
          </pre>

          <ul className="text-muted-foreground mt-4 ml-5 list-disc space-y-2 text-sm leading-6">
            <li>
              <code className="font-mono">max-w-4xl</code> (56rem / 896px)
              keeps line length under the readable maximum.
            </li>
            <li>
              <code className="font-mono">space-y-16</code> (64px) is the
              between-section rhythm. Sections themselves use{" "}
              <code className="font-mono">mt-6</code> / <code className="font-mono">mt-8</code>{" "}
              / <code className="font-mono">mt-10</code> for internal
              hierarchy (see Typography page).
            </li>
            <li>
              <code className="font-mono">p-4 md:p-8</code> — 16px gutter on
              mobile, 32px on desktop.
            </li>
            <li>
              <code className="font-mono">max-w-2xl</code> on the lead
              paragraph (42rem / 672px) sits comfortably inside the wider
              container.
            </li>
          </ul>
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
                  Use multiples of the 4px spacing unit — go through
                  Tailwind utilities (<code className="font-mono">p-4</code>,{" "}
                  <code className="font-mono">gap-2</code>) only.
                </li>
                <li>
                  Pair every floating shadow with{" "}
                  <code className="font-mono">ring-1 ring-foreground/10</code>
                  {" "}so the edge is crisp on any background.
                </li>
                <li>
                  Pick a radius from the ladder. Need a new size?
                  Re-tune <code className="font-mono">--radius</code>{" "}
                  instead of adding arbitrary values.
                </li>
                <li>
                  Use <code className="font-mono">h-12 md:h-10</code> for
                  any new primary form control.
                </li>
                <li>
                  Use the <code className="font-mono">hit-area-*</code>{" "}
                  utility for icon-only controls smaller than 32×32.
                </li>
              </ul>
            </div>
            <div className="border-border bg-card space-y-3 rounded-lg border p-6">
              <div className="text-foreground text-sm font-semibold tracking-tight">
                Don&apos;t
              </div>
              <ul className="text-muted-foreground ml-5 list-disc space-y-2 text-sm leading-6">
                <li>
                  Hard-code pixel values (
                  <code className="font-mono">p-[13px]</code>,{" "}
                  <code className="font-mono">rounded-[7px]</code>) in
                  application code.
                </li>
                <li>
                  Use raw <code className="font-mono">shadow-black</code> or
                  arbitrary <code className="font-mono">shadow-[…]</code>{" "}
                  values — break the elevation contract.
                </li>
                <li>
                  Add a new shadow level without first checking whether an
                  existing E0–E5 step fits.
                </li>
                <li>
                  Strip the global border colour by setting{" "}
                  <code className="font-mono">border-foo-500</code> — go
                  through a semantic border token.
                </li>
                <li>
                  Set <code className="font-mono">--sidebar-width</code> per
                  page; configure it once on the{" "}
                  <code className="font-mono">SidebarProvider</code>.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
