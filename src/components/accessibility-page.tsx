import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DocumentationHeader,
  DocumentationInlineCode as InlineCode,
  DocumentationPage,
  DocumentationParagraph,
  DocumentationSectionHeading as SectionHeading,
} from "@/components/documentation-primitives";

/**
 * Accessibility documentation page for Care UI.
 *
 * Two halves:
 *  1. What Care UI gives you for free (built-in tokens, primitives,
 *     themes, font-size scaling, reduced-motion handling).
 *  2. The author checklist — the WCAG 2.2 AA + WAI-ARIA rules every
 *     contributor must apply when adding or composing a component.
 *
 * Standards are condensed from:
 *  - WCAG 2.2 AA
 *  - WAI-ARIA Authoring Practices
 *  - .agents/skills/web-design-guidelines/SKILL.md (Vercel WIG)
 *  - .agents/skills/frontend-guidelines/SKILL.md
 *
 * Nothing here is aspirational — every "built-in" claim is wired up in
 * src/index.css, src/App.tsx, or the live primitives in
 * src/components/ui/.
 */

/* ── What Care UI ships for accessibility ── */

type BuiltInRow = {
  feature: string;
  source: string;
  detail: string;
};

const BUILT_IN: BuiltInRow[] = [
  {
    feature: "Global focus ring",
    source: "src/index.css · @layer base",
    detail:
      "Every element gets * { @apply border-border outline-ring/50; }. Components opt into a stronger ring with focus-visible:ring-ring/50 focus-visible:ring-[3px].",
  },
  {
    feature: "High-contrast theme",
    source: "ContrastProvider · src/components/contrast-provider.tsx",
    detail:
      "Toggles a body class that strengthens border tokens (neutral-400/600/700 and white α 25/40/55%) for users who need higher delineation between surfaces.",
  },
  {
    feature: "Color-blind themes",
    source: "src/index.css · [data-vision='protanopia' | 'tritanopia']",
    detail:
      "Re-tints brand and chart colors so the system stays distinguishable for the two most common forms of color-vision deficiency.",
  },
  {
    feature: "Font-size scaling",
    source: "FontSizeProvider · src/components/font-size-provider.tsx",
    detail:
      "Lets the user pick a base font-size (16 / 17 / 18+ px). Because the whole type ramp is declared in rem, every component scales proportionally.",
  },
  {
    feature: "Reduced-motion handling",
    source: "src/index.css · @media (prefers-reduced-motion: reduce)",
    detail:
      "Spinner rotation and other decorative animations stop automatically. Authors must extend this for any custom keyframe they add.",
  },
  {
    feature: "Accessible color tokens",
    source: "src/index.css",
    detail:
      "All foreground/background pairings ship at WCAG AA 4.5:1 or better in light, dark, and high-contrast modes (see Colors page).",
  },
  {
    feature: "ARIA-state styling baked in",
    source: "Button, Input, Select, Checkbox CVA recipes",
    detail:
      "data-state, aria-invalid, aria-pressed, data-disabled all drive visual changes — authors get the right look just by setting the right ARIA attribute.",
  },
  {
    feature: "Touch-target utilities",
    source: "src/index.css · hit-area-* utilities",
    detail:
      "Expands the click target of small icon-only controls via a positioned ::before, so the visual size stays compact while the hit zone meets WCAG 2.5.5 (24×24 AA) / 44×44 (AAA).",
  },
  {
    feature: "Radix primitives",
    source: "radix-ui",
    detail:
      "Dialog, Popover, Dropdown, Tabs, etc. provide focus trapping, roving tabindex, escape-to-close, and screen-reader announcements out of the box.",
  },
];

/* ── Author checklist, grouped ── */

type ChecklistGroup = {
  id: string;
  title: string;
  items: { rule: string; example?: string }[];
};

const CHECKLIST: ChecklistGroup[] = [
  {
    id: "semantic-html",
    title: "Semantic HTML",
    items: [
      {
        rule: "Use the right element. <button> for actions, <a> / <Link> for navigation. Never a <div> with onClick.",
      },
      {
        rule: "Headings are hierarchical (<h1> → <h6>). Don't skip levels for styling — change the class instead.",
      },
      { rule: "Wrap related controls in <fieldset> with a <legend>." },
      { rule: 'Tables use <th scope="col"|"row">, lists use <ul>/<ol>/<dl>.' },
      { rule: "Reach for ARIA only when no native element fits." },
    ],
  },
  {
    id: "labels-names",
    title: "Labels & accessible names",
    items: [
      {
        rule: "Every form control needs a visible <Label htmlFor>, an aria-label, or aria-labelledby.",
      },
      {
        rule: 'Icon-only buttons need aria-label or a <span className="sr-only">.',
      },
      {
        rule: "Example: icon-only theme toggle (theme-toggle.tsx)",
        example: `<Button size="icon" variant="ghost" onClick={toggle}>
  <SunIcon className="size-4" />
  <span className="sr-only">Toggle theme</span>
</Button>`,
      },
      {
        rule: 'Decorative icons get aria-hidden="true" (the sibling text is the name).',
      },
      {
        rule: "Group label + control share a single hit target — wrap or use htmlFor; never leave dead zones.",
      },
    ],
  },
  {
    id: "keyboard",
    title: "Keyboard support",
    items: [
      { rule: "Every interactive element reachable with Tab, in DOM order." },
      {
        rule: "Tab / Shift+Tab to move, Enter / Space to activate, Escape to dismiss overlays, arrow keys inside composite widgets (menu, tabs, listbox, slider).",
      },
      {
        rule: "Trap focus inside dialogs and sheets; restore focus to the trigger on close (Radix handles this — don't disable it).",
      },
      {
        rule: "Never set tabIndex={-1} on something a user needs to reach. Never use positive tabIndex.",
      },
      {
        rule: "Custom keyboard shortcuts must not collide with browser/assistive-tech shortcuts; document them in <Kbd>.",
      },
    ],
  },
  {
    id: "focus",
    title: "Focus states",
    items: [
      {
        rule: "Every interactive element has a visible :focus-visible ring. The Care UI default is focus-visible:ring-ring/50 focus-visible:ring-[3px].",
      },
      {
        rule: "Never outline-none / outline: none without a focus-visible replacement.",
      },
      {
        rule: "Use :focus-visible (not :focus) so the ring doesn't appear on mouse click.",
      },
      {
        rule: "Compound controls (input + adornment) use :focus-within on the wrapper.",
      },
    ],
  },
  {
    id: "aria-state",
    title: "ARIA & state",
    items: [
      {
        rule: "Use aria-invalid on form fields with errors — Care UI inputs and buttons style this automatically.",
      },
      {
        rule: "Use aria-pressed on toggle buttons, aria-expanded on disclosure triggers, aria-current on the active nav item.",
      },
      {
        rule: 'Async updates (toasts, validation, save status) live in a region with aria-live="polite" — Sonner does this for you.',
      },
      {
        rule: 'role="status" for non-urgent updates, role="alert" for errors that demand attention.',
      },
      {
        rule: "Don't duplicate the accessible name (aria-label + same visible text = repeats in a screen reader).",
      },
    ],
  },
  {
    id: "color-contrast",
    title: "Color & contrast",
    items: [
      {
        rule: "Use semantic color tokens only (text-foreground, text-muted-foreground, bg-card …). They guarantee AA in every theme.",
      },
      {
        rule: "Body text ≥ 4.5:1. Large text (18.66px+ bold or 24px+) ≥ 3:1. UI components and graphical objects ≥ 3:1 (WCAG 2.2 SC 1.4.11).",
      },
      {
        rule: "Never communicate state by color alone — pair with an icon, label, or shape (status badges, chart series).",
      },
      {
        rule: "Test under the high-contrast and color-blind themes before shipping any new color combination.",
      },
    ],
  },
  {
    id: "motion",
    title: "Motion",
    items: [
      {
        rule: "Honor prefers-reduced-motion. Either disable the animation or provide a reduced variant.",
      },
      {
        rule: "Animate transform and opacity only (compositor-friendly). Never transition: all.",
      },
      {
        rule: "Animations must be interruptible — respond to user input mid-animation.",
      },
      {
        rule: "Avoid parallax, autoplay, or anything that flashes more than 3 times per second (WCAG 2.3.1).",
      },
    ],
  },
  {
    id: "touch",
    title: "Touch & pointer",
    items: [
      {
        rule: "Minimum 24×24 hit target (WCAG 2.5.8 AA), prefer 44×44. Use the hit-area-* utility on small icon buttons.",
      },
      {
        rule: "Default form controls are h-12 md:h-10 — touch-friendly on mobile, dense on desktop.",
      },
      {
        rule: "Add touch-action: manipulation on tappable elements to remove the 300ms double-tap delay.",
      },
      {
        rule: "Never block paste (onPaste + preventDefault) — assistive tech relies on it.",
      },
    ],
  },
  {
    id: "media",
    title: "Images, video, icons",
    items: [
      {
        rule: '<img> needs meaningful alt — or alt="" if purely decorative. Never omit the attribute.',
      },
      { rule: "Set explicit width and height to prevent layout shift." },
      {
        rule: 'Decorative SVGs: aria-hidden="true" + focusable="false". Meaningful SVGs: <title> as the accessible name.',
      },
      {
        rule: "Video / audio needs captions (WCAG 1.2.2) and a transcript for long content.",
      },
    ],
  },
  {
    id: "language-i18n",
    title: "Language & internationalisation",
    items: [
      {
        rule: 'Set <html lang="…"> and update it when the user switches language.',
      },
      {
        rule: "Use Intl.DateTimeFormat and Intl.NumberFormat — never hardcode date or number formats.",
      },
      {
        rule: 'Wrap brand names, identifiers, and code tokens with translate="no" so auto-translate doesn\'t mangle them.',
      },
      {
        rule: "Prefer logical CSS properties (margin-inline, padding-block) so layouts mirror under RTL.",
      },
    ],
  },
];

const ANTI_PATTERNS: string[] = [
  "<div> or <span> with an onClick handler (should be <button>).",
  "Icon-only button without aria-label or sr-only.",
  "outline-none without a focus-visible replacement.",
  "Form control without a <Label> or aria-label.",
  "Custom keydown handler that re-implements what a native <button> already does.",
  "Animation without prefers-reduced-motion handling.",
  "Color-only status indicator (red dot with no icon or label).",
  "Positive tabIndex on any element.",
  "aria-label that duplicates visible text.",
  "user-scalable=no / maximum-scale=1 in the viewport meta — disables pinch-zoom.",
  "autoFocus on mobile or on a non-primary input.",
  "Modal / sheet without overscroll-behavior: contain.",
];

const TOOLS: { name: string; use: string }[] = [
  {
    name: "Keyboard only",
    use: "Unplug the mouse. Tab through every flow. If you can't reach or activate something, it's broken.",
  },
  {
    name: "Screen reader",
    use: "macOS VoiceOver (⌘F5), Windows NVDA, JAWS, or iOS / Android TalkBack — verify the accessible name announces correctly.",
  },
  {
    name: "Axe DevTools",
    use: "Browser extension for automated WCAG checks. Catches 30–40% of issues; the rest still need manual review.",
  },
  {
    name: "High-contrast + color-blind themes",
    use: "Toggle them in the docs settings page to sanity-check every new color combo.",
  },
  {
    name: "Prefers-reduced-motion",
    use: "macOS: System Settings → Accessibility → Display → Reduce motion. Windows: Settings → Accessibility → Visual effects.",
  },
  {
    name: "Zoom to 200%",
    use: "WCAG 1.4.10 — content must reflow without horizontal scroll at 320 CSS px wide.",
  },
];

export function AccessibilityPage() {
  return (
    <DocumentationPage>
        {/* Header */}
        <DocumentationHeader title="Accessibility">
          Care UI targets <strong>WCAG 2.2 AA</strong> across every theme. Half
          of the work is built into the design tokens and primitives; the other
          half is a short checklist every contributor must apply.
        </DocumentationHeader>

        {/* Standards */}
        <section>
          <SectionHeading id="standards">Standards we follow</SectionHeading>
          <ul className="text-foreground mt-6 ml-5 list-disc space-y-2 leading-7">
            <li>
              <strong>WCAG 2.2 AA</strong> — the legal baseline in most
              jurisdictions and the level every Care UI component is tested
              against.
            </li>
            <li>
              <strong>WAI-ARIA Authoring Practices 1.2</strong> — Care UI
              composes Radix primitives, which follow APG patterns for dialogs,
              menus, listboxes, tabs, and combobox.
            </li>
            <li>
              <strong>EN 301 549</strong> &amp; <strong>Section 508</strong> —
              both reference WCAG 2.x; passing WCAG AA satisfies the technical
              requirements of each.
            </li>
            <li>
              <strong>Vercel Web Interface Guidelines</strong> — the practical
              rule-set this page&apos;s checklist is derived from.
            </li>
          </ul>
        </section>

        {/* Built-in */}
        <section>
          <SectionHeading id="built-in">
            What Care UI gives you for free
          </SectionHeading>
          <DocumentationParagraph>
            Before you write a single attribute, the design tokens and providers
            below are already doing accessibility work on your behalf.
          </DocumentationParagraph>

          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-56">Feature</TableHead>
                  <TableHead>Where it lives</TableHead>
                  <TableHead>What it does</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BUILT_IN.map((b) => (
                  <TableRow key={b.feature}>
                    <TableCell className="text-sm font-medium">
                      {b.feature}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">
                      {b.source}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm leading-6">
                      {b.detail}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Author checklist */}
        <section>
          <SectionHeading id="checklist">Author checklist</SectionHeading>
          <DocumentationParagraph>
            Apply every rule below when authoring a new component or composing
            existing ones. Each group maps to one WCAG outcome and one place
            reviewers will look during code review.
          </DocumentationParagraph>

          <div className="mt-8 space-y-10">
            {CHECKLIST.map((group) => (
              <div key={group.id}>
                <h3
                  id={group.id}
                  className="scroll-m-20 text-2xl font-semibold tracking-tight"
                >
                  {group.title}
                </h3>
                <ul className="text-foreground mt-4 ml-5 list-disc space-y-3 leading-7">
                  {group.items.map((item, i) => (
                    <li key={i}>
                      {item.rule}
                      {item.example && (
                        <pre className="bg-muted mt-3 overflow-x-auto rounded-md p-3">
                          <code className="font-mono text-xs">
                            {item.example}
                          </code>
                        </pre>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Anti-patterns */}
        <section>
          <SectionHeading id="anti-patterns">Anti-patterns</SectionHeading>
          <DocumentationParagraph>
            Reviewers will flag any of these on sight. They are the most common
            ways an otherwise good component becomes inaccessible.
          </DocumentationParagraph>
          <ul className="text-foreground mt-6 ml-5 list-disc space-y-2 leading-7">
            {ANTI_PATTERNS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        {/* Testing */}
        <section>
          <SectionHeading id="testing">Testing &amp; tooling</SectionHeading>
          <DocumentationParagraph>
            Automated tools catch a fraction of accessibility issues. Combine
            them with the manual passes below before any non-trivial change
            ships.
          </DocumentationParagraph>

          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-56">Tool / Pass</TableHead>
                  <TableHead>How to use it</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TOOLS.map((t) => (
                  <TableRow key={t.name}>
                    <TableCell className="text-sm font-medium">
                      {t.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm leading-6">
                      {t.use}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Quick reference */}
        <section>
          <SectionHeading id="quick-reference">Quick reference</SectionHeading>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border-border bg-card space-y-3 rounded-lg border p-6">
              <div className="text-foreground text-sm font-semibold tracking-tight">
                Do
              </div>
              <ul className="text-muted-foreground ml-5 list-disc space-y-2 text-sm leading-6">
                <li>Reach for a semantic HTML element first.</li>
                <li>
                  Give every interactive element an accessible name (
                  <InlineCode>aria-label</InlineCode> or{" "}
                  <InlineCode>sr-only</InlineCode>).
                </li>
                <li>
                  Pair every state change with an ARIA attribute (
                  <InlineCode>aria-invalid</InlineCode>,{" "}
                  <InlineCode>aria-pressed</InlineCode>,{" "}
                  <InlineCode>aria-expanded</InlineCode>).
                </li>
                <li>
                  Use Care UI tokens — they ship the right contrast in every
                  theme.
                </li>
                <li>
                  Guard every animation with{" "}
                  <InlineCode>prefers-reduced-motion</InlineCode>.
                </li>
              </ul>
            </div>
            <div className="border-border bg-card space-y-3 rounded-lg border p-6">
              <div className="text-foreground text-sm font-semibold tracking-tight">
                Don&apos;t
              </div>
              <ul className="text-muted-foreground ml-5 list-disc space-y-2 text-sm leading-6">
                <li>
                  Attach <InlineCode>onClick</InlineCode> to a{" "}
                  <InlineCode>&lt;div&gt;</InlineCode> or{" "}
                  <InlineCode>&lt;span&gt;</InlineCode>.
                </li>
                <li>
                  Strip the focus ring without providing a{" "}
                  <InlineCode>focus-visible</InlineCode> replacement.
                </li>
                <li>Communicate state by color alone.</li>
                <li>
                  Use raw hex / OKLCH values that bypass the theme system.
                </li>
                <li>
                  Set positive <InlineCode>tabIndex</InlineCode> or override
                  Radix focus-trap behavior.
                </li>
              </ul>
            </div>
          </div>
        </section>
    </DocumentationPage>
  );
}
