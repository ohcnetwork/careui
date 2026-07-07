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
import {
  PageTitle,
  SectionTitle,
  SubsectionTitle,
  GroupTitle,
  DenseTitle,
  EyebrowTitle,
} from "@/components/ui/typography";
import {
  DocumentationHeader,
  DocumentationInlineCode as InlineCode,
  DocumentationPage,
  DocumentationParagraph,
  DocumentationSectionHeading as SectionHeading,
  documentationLinkClassName,
} from "@/components/documentation-primitives";

/**
 * Typography documentation page for the Care design system.
 *
 * Values mirror Tailwind v4 defaults (the same scale shadcn/ui composes on top
 * of) and the heading/spacing rhythm used across shadcn docs. The system uses
 * `Figtree Variable` (`--font-sans` in `src/index.css`) as the base UI font.
 */

const SAMPLE = "Care made clear for everyone.";

type ScaleRow = {
  token: string;
  className: string;
  size: string;
  px: string;
  lineHeight: string;
  lineHeightPx: string;
  tracking: string;
};

const TYPE_SCALE: ScaleRow[] = [
  {
    token: "xs",
    className: "text-xs",
    size: "0.75rem",
    px: "12px",
    lineHeight: "1rem",
    lineHeightPx: "16px",
    tracking: "0em",
  },
  {
    token: "sm",
    className: "text-sm",
    size: "0.875rem",
    px: "14px",
    lineHeight: "1.25rem",
    lineHeightPx: "20px",
    tracking: "0em",
  },
  {
    token: "base",
    className: "text-base",
    size: "1rem",
    px: "16px",
    lineHeight: "1.5rem",
    lineHeightPx: "24px",
    tracking: "0em",
  },
  {
    token: "lg",
    className: "text-lg",
    size: "1.125rem",
    px: "18px",
    lineHeight: "1.75rem",
    lineHeightPx: "28px",
    tracking: "0em",
  },
  {
    token: "xl",
    className: "text-xl",
    size: "1.25rem",
    px: "20px",
    lineHeight: "1.75rem",
    lineHeightPx: "28px",
    tracking: "0em",
  },
  {
    token: "2xl",
    className: "text-2xl",
    size: "1.5rem",
    px: "24px",
    lineHeight: "2rem",
    lineHeightPx: "32px",
    tracking: "0em",
  },
  {
    token: "3xl",
    className: "text-3xl",
    size: "1.875rem",
    px: "30px",
    lineHeight: "2.25rem",
    lineHeightPx: "36px",
    tracking: "0em",
  },
  {
    token: "4xl",
    className: "text-4xl",
    size: "2.25rem",
    px: "36px",
    lineHeight: "2.5rem",
    lineHeightPx: "40px",
    tracking: "0em",
  },
  {
    token: "5xl",
    className: "text-5xl",
    size: "3rem",
    px: "48px",
    lineHeight: "1",
    lineHeightPx: "48px",
    tracking: "0em",
  },
  {
    token: "6xl",
    className: "text-6xl",
    size: "3.75rem",
    px: "60px",
    lineHeight: "1",
    lineHeightPx: "60px",
    tracking: "0em",
  },
];

type HeadingRow = {
  tag: string;
  classes: string;
  size: string;
  lineHeight: string;
  tracking: string;
  topMargin: string;
  usage: string;
};

const HEADINGS: HeadingRow[] = [
  {
    tag: "h1",
    classes: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    size: "36px → 48px (lg)",
    lineHeight: "40px → 48px",
    tracking: "-0.025em",
    topMargin: "—",
    usage: "Page title. One per page.",
  },
  {
    tag: "h2",
    classes: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
    size: "30px",
    lineHeight: "36px",
    tracking: "-0.025em",
    topMargin: "mt-10 (40px) — none if first",
    usage: "Major section heading.",
  },
  {
    tag: "h3",
    classes: "scroll-m-20 text-2xl font-semibold tracking-tight",
    size: "24px",
    lineHeight: "32px",
    tracking: "-0.025em",
    topMargin: "mt-8 (32px)",
    usage: "Subsection inside an h2 block.",
  },
  {
    tag: "h4",
    classes: "scroll-m-20 text-xl font-semibold tracking-tight",
    size: "20px",
    lineHeight: "28px",
    tracking: "-0.025em",
    topMargin: "mt-6 (24px)",
    usage: "Grouping inside an h3 block.",
  },
  {
    tag: "h5",
    classes: "scroll-m-20 text-lg font-semibold tracking-tight",
    size: "18px",
    lineHeight: "28px",
    tracking: "-0.025em",
    topMargin: "mt-6 (24px)",
    usage: "Inline group label.",
  },
  {
    tag: "h6",
    classes: "scroll-m-20 text-base font-semibold tracking-tight",
    size: "16px",
    lineHeight: "24px",
    tracking: "-0.025em",
    topMargin: "mt-4 (16px)",
    usage: "Smallest heading. Use sparingly.",
  },
];

type WeightRow = {
  token: string;
  weight: number;
  className: string;
  usage: string;
};

type AppHeadingRow = {
  token: string;
  component: string;
  size: string;
  lineHeight: string;
  weight: string;
  tracking: string;
  spacing: string;
  usage: string;
};

const APP_HEADINGS: AppHeadingRow[] = [
  {
    token: "H1",
    component: "<PageTitle>",
    size: "30px (text-3xl)",
    lineHeight: "36px (leading-9)",
    weight: "700 (font-bold)",
    tracking: "tracking-tight",
    spacing: "— / body mt-2",
    usage: "Page titles — e.g. “Patients”, “Encounter #4421”.",
  },
  {
    token: "H2",
    component: "<SectionTitle>",
    size: "24px (text-2xl)",
    lineHeight: "32px (leading-8)",
    weight: "600 (font-semibold)",
    tracking: "tracking-tight",
    spacing: "mt-8 / body mt-3",
    usage: "Section titles — major panels under the page title.",
  },
  {
    token: "H3",
    component: "<SubsectionTitle>",
    size: "20px (text-xl)",
    lineHeight: "28px (leading-7)",
    weight: "600 (font-semibold)",
    tracking: "tracking-tight",
    spacing: "mt-6 / body mt-2",
    usage: "Major groups, card titles, dialog titles.",
  },
  {
    token: "H4",
    component: "<GroupTitle>",
    size: "18px (text-lg)",
    lineHeight: "28px (leading-7)",
    weight: "500 (font-medium)",
    tracking: "normal",
    spacing: "mt-5 / body mt-1",
    usage: "Subsections inside a card or form.",
  },
  {
    token: "H5",
    component: "<DenseTitle>",
    size: "16px (text-base)",
    lineHeight: "24px (leading-6)",
    weight: "500 (font-medium)",
    tracking: "normal",
    spacing: "mt-4 / body mt-1",
    usage: "Dense headings — list-item titles, inline group labels.",
  },
  {
    token: "H6",
    component: "<EyebrowTitle>",
    size: "14px (text-sm)",
    lineHeight: "20px (leading-5)",
    weight: "500 (font-medium)",
    tracking: "normal",
    spacing: "mt-4 / body mt-1",
    usage: "Table / card column headers, row-group labels.",
  },
];

const WEIGHTS: WeightRow[] = [
  {
    token: "light",
    weight: 300,
    className: "font-light",
    usage: "Decorative display copy only.",
  },
  {
    token: "normal",
    weight: 400,
    className: "font-normal",
    usage: "Body text default.",
  },
  {
    token: "medium",
    weight: 500,
    className: "font-medium",
    usage: "Labels, buttons, table headers.",
  },
  {
    token: "semibold",
    weight: 600,
    className: "font-semibold",
    usage: "Headings h2–h6, emphasis.",
  },
  {
    token: "bold",
    weight: 700,
    className: "font-bold",
    usage: "Strong emphasis inline.",
  },
  {
    token: "extrabold",
    weight: 800,
    className: "font-extrabold",
    usage: "Page title (h1) only.",
  },
];

type SpacingRow = {
  pair: string;
  className: string;
  rem: string;
  px: string;
  note: string;
};

type RoleRow = {
  role: string;
  classes: string;
  size: string;
  case: string;
  usage: string;
};

const ROLES: RoleRow[] = [
  {
    role: "Display",
    classes: "text-4xl lg:text-5xl font-extrabold tracking-tight",
    size: "36 → 48px",
    case: "Sentence case",
    usage: "Page title (one per page). Marketing heroes.",
  },
  {
    role: "Section heading",
    classes: "text-3xl font-semibold tracking-tight",
    size: "30px",
    case: "Sentence case",
    usage: "Major section under h1.",
  },
  {
    role: "Subheading",
    classes: "text-2xl font-semibold tracking-tight",
    size: "24px",
    case: "Sentence case",
    usage: "Card titles, dialog titles, subsection breaks.",
  },
  {
    role: "Lead",
    classes: "text-xl text-muted-foreground leading-7",
    size: "20px",
    case: "Sentence case",
    usage: "Intro paragraph under a page title.",
  },
  {
    role: "Body",
    classes: "text-base leading-7",
    size: "16px",
    case: "Sentence case",
    usage: "Default long-form prose. Most multi-line text.",
  },
  {
    role: "UI label",
    classes: "text-sm font-medium",
    size: "14px",
    case: "Sentence case",
    usage: "Form labels, buttons, table headers, menu items.",
  },
  {
    role: "Helper / caption",
    classes: "text-sm text-muted-foreground",
    size: "14px",
    case: "Sentence case",
    usage: "Field help text, secondary info under a label.",
  },
  {
    role: "Meta",
    classes: "text-xs text-muted-foreground",
    size: "12px",
    case: "Sentence case",
    usage: "Timestamps, footnotes, low-priority metadata.",
  },
  {
    role: "Eyebrow / overline",
    classes: "text-xs font-medium tracking-widest uppercase",
    size: "12px",
    case: "UPPERCASE",
    usage: "Tiny categorical label above a heading or card.",
  },
  {
    role: "Mono",
    classes: "font-mono text-sm",
    size: "14px",
    case: "As-typed",
    usage: "IDs, codes, file paths, inline code, MRNs.",
  },
];

type CaseRow = {
  style: string;
  example: string;
  tracking: string;
  classes: string;
  use: string;
};

const CASES: CaseRow[] = [
  {
    style: "Sentence case",
    example: "Save patient record",
    tracking: "normal (0em)",
    classes: "(default)",
    use: "Default for everything — headings, body, buttons, labels, menu items, toasts, tooltips. Capitalise only the first word and proper nouns.",
  },
  {
    style: "Title Case",
    example: "Care UI · Patient Dashboard",
    tracking: "normal (0em)",
    classes: "(no utility — write the string in title case)",
    use: "Reserve for product / page names where the team has decided the name itself is title-cased. Never apply blanket Title Case to UI labels or buttons.",
  },
  {
    style: "UPPERCASE — tiny",
    example: "OVERVIEW",
    tracking: "tracking-widest (0.1em)",
    classes: "text-xs font-medium tracking-widest uppercase",
    use: "Eyebrow above a heading, section dividers in dense lists, badges ≤ 12px. Tracking compensates for the loss of x-height differentiation in all-caps.",
  },
  {
    style: "UPPERCASE — small",
    example: "ACTIVE",
    tracking: "tracking-wide (0.025em)",
    classes: "text-[11px] font-semibold tracking-wide uppercase",
    use: "Status badges, table column headers in admin views.",
  },
  {
    style: "lowercase",
    example: "id · mrn · sku",
    tracking: "normal (0em)",
    classes: "lowercase font-mono",
    use: "Identifiers and tokens the system treats as case-insensitive. Always paired with the mono family.",
  },
  {
    style: "As-typed",
    example: "MRN-00231 · pH 7.4",
    tracking: "normal (0em)",
    classes: "font-mono",
    use: "Codes, units, identifiers, and clinical values where case carries meaning — never transform.",
  },
];

type FeatureRow = {
  feature: string;
  className: string;
  use: string;
};

const FEATURES: FeatureRow[] = [
  {
    feature: "Tabular numerals",
    className: "tabular-nums",
    use: "Any column of numbers, comparisons, totals, vitals, dosages. Keeps digit widths uniform so values line up.",
  },
  {
    feature: "Proportional numerals",
    className: "proportional-nums",
    use: "Prose containing numbers (default). Reads more naturally inside a sentence.",
  },
  {
    feature: "Slashed zero",
    className: "slashed-zero",
    use: "IDs, MRNs, codes — disambiguates the digit 0 from letter O. Pair with font-mono.",
  },
  {
    feature: "Lining figures",
    className: "lining-nums",
    use: "Default for UI numbers — all digits sit on the baseline.",
  },
  {
    feature: "Old-style figures",
    className: "oldstyle-nums",
    use: "Decorative long-form copy only; never for clinical data.",
  },
];

const SPACING: SpacingRow[] = [
  {
    pair: "h1 → following block",
    className: "mt-0 (header) / content mt-6",
    rem: "1.5rem",
    px: "24px",
    note: "Lead/intro paragraph follows h1.",
  },
  {
    pair: "block → h2",
    className: "mt-10",
    rem: "2.5rem",
    px: "40px",
    note: "Major section break.",
  },
  {
    pair: "h2 → following content",
    className: "mt-3",
    rem: "0.75rem",
    px: "12px",
    note: "Default body copy under a documentation section heading.",
  },
  {
    pair: "block → h3",
    className: "mt-8",
    rem: "2rem",
    px: "32px",
    note: "Subsection break.",
  },
  {
    pair: "h3 → following content",
    className: "mt-2",
    rem: "0.5rem",
    px: "8px",
    note: "Subsection copy stays tighter than section-intro prose.",
  },
  {
    pair: "block → h4 / h5",
    className: "mt-6",
    rem: "1.5rem",
    px: "24px",
    note: "Local grouping.",
  },
  {
    pair: "p → p",
    className: "[&:not(:first-child)]:mt-3",
    rem: "0.75rem",
    px: "12px",
    note: "Default documentation prose stack.",
  },
  {
    pair: "p → ul / ol",
    className: "my-6",
    rem: "1.5rem",
    px: "24px",
    note: "Lists breathe top & bottom.",
  },
  {
    pair: "li → li",
    className: "[&>li]:mt-2",
    rem: "0.5rem",
    px: "8px",
    note: "Compact list rhythm.",
  },
  {
    pair: "block → blockquote",
    className: "mt-6",
    rem: "1.5rem",
    px: "24px",
    note: "Border-left, italic.",
  },
  {
    pair: "block → code block",
    className: "my-6",
    rem: "1.5rem",
    px: "24px",
    note: "Symmetric spacing around code.",
  },
];

function SpecRow({
  label,
  className,
  meta,
  children,
}: {
  label: string;
  className: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border grid grid-cols-1 gap-4 border-b px-5 py-6 last:border-b-0 md:grid-cols-[200px_1fr] md:items-start md:gap-8">
      <div className="space-y-1.5">
        <div className="text-foreground text-sm font-medium">{label}</div>
        <code className="text-muted-foreground block font-mono text-xs break-all">
          {className}
        </code>
        <div className="text-muted-foreground text-xs">{meta}</div>
      </div>
      <div className="min-w-0 overflow-x-auto">{children}</div>
    </div>
  );
}

export function TypographyPage() {
  return (
    <DocumentationPage>
      {/* Header */}
      <DocumentationHeader title="Typography">
        The Care UI type system for healthcare interfaces. Sizes, line heights,
        letter spacing, and vertical rhythm — tuned for the clarity clinicians
        need at the bedside and aligned to Tailwind&nbsp;v4 and shadcn/ui
        conventions.
      </DocumentationHeader>

      {/* Foundations */}
      <section>
        <SectionHeading id="foundations">Foundations</SectionHeading>
        <DocumentationParagraph spacing="stack">
          All UI text is rendered in <strong>Figtree Variable</strong>, exposed
          via the <InlineCode>--font-sans</InlineCode> token and applied to{" "}
          <InlineCode>html</InlineCode> and <InlineCode>body</InlineCode> in{" "}
          <InlineCode>src/index.css</InlineCode>. The root font size scales with{" "}
          <InlineCode>--font-size-scale</InlineCode>, so every{" "}
          <InlineCode>rem</InlineCode> below respects user preferences set in
          the Settings page.
        </DocumentationParagraph>

        <div className="border-border bg-card mt-6 grid grid-cols-1 gap-4 rounded-lg border p-6 md:grid-cols-3">
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Font family
            </div>
            <div className="text-foreground text-base font-semibold">
              Figtree Variable
            </div>
            <code className="text-muted-foreground font-mono text-xs">
              --font-sans
            </code>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Base size
            </div>
            <div className="text-foreground text-base font-semibold">
              16px / 1rem
            </div>
            <code className="text-muted-foreground font-mono text-xs">
              text-base
            </code>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Base line-height
            </div>
            <div className="text-foreground text-base font-semibold">
              24px (1.5)
            </div>
            <code className="text-muted-foreground font-mono text-xs">
              leading-7 for prose
            </code>
          </div>
        </div>
      </section>

      {/* Type scale */}
      <section>
        <SectionHeading id="type-scale">Type Scale</SectionHeading>
        <DocumentationParagraph>
          The full Tailwind type scale. Every size uses{" "}
          <InlineCode>letter-spacing: 0</InlineCode> by default. Apply{" "}
          <InlineCode>tracking-tight</InlineCode> (−0.025em) to anything{" "}
          <InlineCode>text-2xl</InlineCode> and larger.
        </DocumentationParagraph>

        <div className="border-border mt-6 rounded-lg border">
          {TYPE_SCALE.map((row) => (
            <SpecRow
              key={row.token}
              label={`text-${row.token}`}
              className={row.className}
              meta={`${row.size} / line ${row.lineHeight}`}
            >
              <p
                className={`${row.className} text-foreground whitespace-nowrap`}
                style={{ letterSpacing: row.tracking }}
              >
                {SAMPLE}
              </p>
              <div className="text-muted-foreground mt-3 font-mono text-xs">
                {row.px} · line-height {row.lineHeightPx} · tracking{" "}
                {row.tracking}
              </div>
            </SpecRow>
          ))}
        </div>
      </section>

      {/* App heading scale */}
      <section>
        <SectionHeading id="app-headings">App heading scale</SectionHeading>
        <DocumentationParagraph>
          The scale used inside the Care product surfaces — patient records,
          encounter forms, dashboards, dialogs. It is intentionally compressed
          so clinical data stays above the fold and hierarchy is carried by{" "}
          <strong>weight and rhythm</strong>, not visual drama. Use the
          components from <InlineCode>@/components/ui/typography</InlineCode> in
          product code; the larger docs scale below is for this documentation
          site, marketing pages, and empty / sign-in screens.
        </DocumentationParagraph>

        {/* Live preview */}
        <article className="border-border bg-card mt-6 rounded-lg border p-6 md:p-8">
          <EyebrowTitle className="text-muted-foreground">
            Patient · MRN-00231
          </EyebrowTitle>
          <PageTitle className="mt-1">Rao, Anitha — admitted 16 May</PageTitle>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            Female · 47 yrs · Ward 4B · Bed 12 · Dr.&nbsp;Mehta
          </p>

          <SectionTitle className="mt-6 sm:mt-8">Active orders</SectionTitle>
          <p className="text-foreground mt-1 text-sm leading-6">
            Three medications and two investigations are active. No interactions
            flagged by pharmacy.
          </p>

          <SubsectionTitle className="mt-4 sm:mt-6">
            Medications
          </SubsectionTitle>
          <p className="text-foreground mt-1 text-sm leading-6">
            Atorvastatin 20&nbsp;mg, Metoprolol 25&nbsp;mg, Aspirin 75&nbsp;mg.
          </p>

          <GroupTitle className="mt-3 sm:mt-5">Dosage notes</GroupTitle>
          <p className="text-foreground mt-1 text-sm leading-6">
            Hold metoprolol if heart rate falls below 55&nbsp;bpm.
          </p>

          <DenseTitle className="mt-3 sm:mt-4">Allergies</DenseTitle>
          <p className="text-foreground mt-1 text-sm leading-6">
            Penicillin (rash, 2019).
          </p>

          <EyebrowTitle className="mt-3 sm:mt-4">Last reviewed</EyebrowTitle>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Dr.&nbsp;Mehta · 14&nbsp;minutes ago.
          </p>
        </article>

        {/* Spec table */}
        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Token</TableHead>
                <TableHead>Component</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Line height</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead>Recommended spacing</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {APP_HEADINGS.map((h) => (
                <TableRow key={h.token}>
                  <TableCell className="font-mono text-xs font-semibold">
                    {h.token}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {h.component}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{h.size}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {h.lineHeight}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {h.weight}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {h.tracking}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {h.spacing}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {h.usage}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="border-border bg-muted/40 mt-6 rounded-lg border p-5">
          <p className="text-foreground text-sm leading-6">
            <strong>Why these numbers.</strong> Anchored to the 16&nbsp;px body
            in a ~1.125 (minor third) ratio so steps stay distinct without
            shouting. H1 caps at 30&nbsp;px (1.5× body) so dense clinical
            surfaces still put data above the fold. H1 is{" "}
            <InlineCode>font-bold</InlineCode>, H2/H3 are{" "}
            <InlineCode>font-semibold</InlineCode>, and H4–H6 are{" "}
            <InlineCode>font-medium</InlineCode> so weight steps down with size,
            and the smallest titles never compete with the body they label.
          </p>
          <p className="text-foreground mt-3 text-sm leading-6">
            <strong>Spacing is intentionally not baked in</strong> so the same
            heading works flush inside a dialog, generous on a page, and tight
            in a side panel. The recommended rhythm above is tuned for HMIS
            density — one notch tighter than shadcn’s docs defaults so stacked
            dashboard panels and encounter forms keep data above the fold.
          </p>
          <p className="text-foreground mt-3 text-sm leading-6">
            <strong>Mobile.</strong> Use the mobile-first pattern{" "}
            <InlineCode>mt-N sm:mt-M</InlineCode> where <em>N</em> is one notch
            tighter than <em>M</em> (e.g. <InlineCode>mt-6 sm:mt-8</InlineCode>{" "}
            on a SectionTitle). Cards, dialogs, popovers, and side panels stay
            on the tight values at every breakpoint. Heading <em>sizes</em> do
            not need to change on mobile — the scale tops out at 30&nbsp;px and
            is mobile-safe.
          </p>
        </div>
      </section>

      {/* Headings */}
      <section>
        <SectionHeading id="headings">
          Documentation heading scale
        </SectionHeading>
        <DocumentationParagraph spacing="subsection">
          The larger shadcn-aligned scale used by this docs site, marketing
          pages, sign-in, and empty states. Use one <InlineCode>h1</InlineCode>{" "}
          per page. Headings cascade down and never skip levels. All headings
          use <InlineCode>tracking-tight</InlineCode> and{" "}
          <InlineCode>text-balance</InlineCode> (configured globally in{" "}
          <InlineCode>src/index.css</InlineCode>).
        </DocumentationParagraph>

        {/* Live preview */}
        <article className="border-border bg-card mt-6 rounded-lg border p-6 md:p-8">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Patient Consultation Notes
          </h1>
          <p className="text-muted-foreground mt-4 text-xl leading-7">
            A complete record of the patient&apos;s visit, including vitals,
            assessments, and the care plan agreed with the clinician.
          </p>

          <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight">
            Presenting Complaint
          </h2>
          <p className="text-foreground mt-3 leading-7">
            The patient reports persistent chest discomfort over the last
            forty-eight hours, worsening on exertion and partially relieved by
            rest.
          </p>

          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Vitals on Arrival
          </h3>
          <p className="text-foreground mt-2 leading-7">
            Blood pressure 138/86&nbsp;mmHg, heart rate 92&nbsp;bpm, SpO₂ 97% on
            room air, temperature 37.1&nbsp;°C.
          </p>

          <h4 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">
            Differential Diagnosis
          </h4>
          <p className="text-foreground mt-1 leading-7">
            Stable angina is the leading consideration. Musculoskeletal pain and
            gastro-oesophageal reflux remain on the differential pending further
            workup.
          </p>

          <h5 className="mt-6 scroll-m-20 text-lg font-semibold tracking-tight">
            Investigations ordered
          </h5>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight">
            Follow-up in 48 hours
          </h6>
        </article>

        {/* Spec table */}
        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Tag</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Line-height</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead>Top margin</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {HEADINGS.map((h) => (
                <TableRow key={h.tag}>
                  <TableCell className="font-mono text-xs font-semibold">
                    {h.tag}
                  </TableCell>
                  <TableCell className="text-sm">{h.size}</TableCell>
                  <TableCell className="text-sm">{h.lineHeight}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {h.tracking}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {h.topMargin}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {h.usage}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Body & support */}
      <section>
        <SectionHeading id="body">Body &amp; Supporting Text</SectionHeading>

        <div className="border-border mt-6 rounded-lg border">
          <SpecRow
            label="Lead"
            className="text-muted-foreground text-xl leading-7"
            meta="20px / 28px · For intros under an h1"
          >
            <p className="text-muted-foreground text-xl leading-7">
              A confirmation dialog that interrupts the clinician before a
              medication order is submitted to the pharmacy.
            </p>
          </SpecRow>

          <SpecRow
            label="Paragraph"
            className="leading-7"
            meta="16px / 28px · Default prose; spacing comes from context"
          >
            <p className="text-foreground leading-7">
              The patient was discharged in a stable condition with a follow-up
              scheduled for the outpatient department next week. Medication
              reconciliation was completed at the bedside.
            </p>
          </SpecRow>

          <SpecRow
            label="Large"
            className="text-lg font-semibold"
            meta="18px / 28px · Inline emphasis block"
          >
            <div className="text-foreground text-lg font-semibold">
              Confirm discharge for this patient?
            </div>
          </SpecRow>

          <SpecRow
            label="Small"
            className="text-sm leading-none font-medium"
            meta="14px / 14px · Captions, helper text"
          >
            <small className="text-foreground text-sm leading-none font-medium">
              Medical record number
            </small>
          </SpecRow>

          <SpecRow
            label="Muted"
            className="text-muted-foreground text-sm"
            meta="14px / 20px · Secondary information"
          >
            <p className="text-muted-foreground text-sm">
              Last updated by Dr.&nbsp;Mehta, 14&nbsp;minutes ago.
            </p>
          </SpecRow>
        </div>
      </section>

      {/* Inline */}
      <section>
        <SectionHeading id="inline">Inline Elements</SectionHeading>
        <div className="border-border bg-card mt-6 space-y-4 rounded-lg border p-6">
          <p className="text-foreground leading-7">
            Use <strong>strong</strong> for strong importance, <em>em</em> for
            stress emphasis, and <InlineCode>inline code</InlineCode> for short
            identifiers. Long-form code belongs in a{" "}
            <InlineCode>&lt;pre&gt;</InlineCode> block.
          </p>
          <p className="text-foreground leading-7">
            Links use the <InlineCode>text-primary</InlineCode> token with{" "}
            <InlineCode>underline-offset-4 hover:underline</InlineCode> — for
            example{" "}
            <a href="#docs-typography" className={documentationLinkClassName}>
              a sample link
            </a>
            .
          </p>
        </div>

        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Element</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-xs">strong</TableCell>
                <TableCell className="font-mono text-xs">font-bold</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  weight 700, inherits size
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs">em</TableCell>
                <TableCell className="font-mono text-xs">italic</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  Stress emphasis only.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs">code</TableCell>
                <TableCell className="font-mono text-xs">
                  relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono
                  text-sm font-semibold
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  14px monospace, neutral background.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs">a</TableCell>
                <TableCell className="font-mono text-xs">
                  text-primary underline-offset-4 hover:underline
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  Underline on hover, primary color.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Lists / blockquote */}
      <section>
        <SectionHeading id="lists">
          Lists, Quote &amp; Code Block
        </SectionHeading>

        <div className="border-border bg-card mt-6 space-y-6 rounded-lg border p-6 md:p-8">
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
              Unordered list —{" "}
              <code className="font-mono">
                my-6 ml-6 list-disc [&amp;&gt;li]:mt-2
              </code>
            </p>
            <ul className="text-foreground my-6 ml-6 list-disc leading-7 [&>li]:mt-2">
              <li>Record vitals every four hours during the first 24 hours.</li>
              <li>
                Continue intravenous fluids until oral intake is established.
              </li>
              <li>Escalate to the on-call physician for any acute changes.</li>
            </ul>
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
              Blockquote —{" "}
              <code className="font-mono">mt-6 border-l-2 pl-6 italic</code>
            </p>
            <blockquote className="text-foreground border-border mt-6 border-l-2 pl-6 italic">
              &ldquo;The patient should remain nil by mouth until reviewed by
              the anaesthetic team in the morning,&rdquo; noted the attending
              physician.
            </blockquote>
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
              Code block —{" "}
              <code className="font-mono">my-6 rounded-lg bg-muted p-4</code>
            </p>
            <pre className="bg-muted my-6 overflow-x-auto rounded-lg p-4">
              <code className="font-mono text-sm">{`function calculateBmi(weightKg, heightM) {
  return weightKg / (heightM * heightM);
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Weights */}
      <section>
        <SectionHeading id="weights">Font Weights</SectionHeading>
        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Token</TableHead>
                <TableHead className="w-24">Weight</TableHead>
                <TableHead className="w-48">Class</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {WEIGHTS.map((w) => (
                <TableRow key={w.token}>
                  <TableCell className="font-mono text-xs">{w.token}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {w.weight}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {w.className}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`${w.className} text-foreground text-base`}
                    >
                      Care UI
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {w.usage}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <SectionHeading id="spacing">Vertical Rhythm</SectionHeading>
        <DocumentationParagraph>
          Margin between content blocks. These mirror the shadcn{" "}
          <InlineCode>prose</InlineCode> rhythm: tighter as headings get
          smaller, looser around major sections. Apply top margins (
          <InlineCode>mt-*</InlineCode>) so the first element of a region never
          needs a reset.
        </DocumentationParagraph>

        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Between</TableHead>
                <TableHead>Class</TableHead>
                <TableHead className="w-24">rem</TableHead>
                <TableHead className="w-24">px</TableHead>
                <TableHead>Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SPACING.map((s) => (
                <TableRow key={s.pair}>
                  <TableCell className="text-sm">{s.pair}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {s.className}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{s.rem}</TableCell>
                  <TableCell className="font-mono text-xs">{s.px}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {s.note}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Visual rhythm */}
        <div className="border-border bg-card relative mt-6 rounded-lg border p-6 md:p-8">
          <div className="border-border relative border-l border-dashed pl-6">
            <RhythmTag offset="0px" label="h1" />
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
              Encounter summary
            </h1>

            <RhythmTag offset="24px" label="mt-3" />
            <p className="text-muted-foreground mt-4 text-xl leading-7">
              An overview of the patient&apos;s admission, ongoing orders, and
              care team.
            </p>

            <RhythmTag offset="40px" label="mt-10" />
            <h2 className="border-border mt-10 scroll-m-20 text-3xl font-semibold tracking-tight">
              Active medications
            </h2>

            <RhythmTag offset="12px" label="mt-3" />
            <p className="text-foreground mt-3 leading-7">
              Three medications are currently active, with no recorded
              interactions or contraindications.
            </p>

            <RhythmTag offset="12px" label="mt-3" />
            <p className="text-foreground mt-3 leading-7">
              Pharmacy has verified each order against the patient&apos;s
              allergy profile.
            </p>

            <RhythmTag offset="32px" label="mt-8" />
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              Pending tasks
            </h3>

            <RhythmTag offset="8px" label="mt-2" />
            <p className="text-foreground mt-2 leading-7">
              Two tasks remain open for the nursing team on the next shift.
            </p>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section>
        <SectionHeading id="roles">Roles — when to use what</SectionHeading>
        <DocumentationParagraph>
          The scale answers <em>how big</em>; this table answers{" "}
          <em>which one</em>. Match the role to the job before reaching for a
          size — most UI text is <InlineCode>text-sm</InlineCode> or{" "}
          <InlineCode>text-base</InlineCode>; the larger sizes are structural.
        </DocumentationParagraph>

        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-40">Role</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead className="w-28">Size</TableHead>
                <TableHead className="w-36">Case</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROLES.map((r) => (
                <TableRow key={r.role}>
                  <TableCell className="text-sm font-medium">
                    {r.role}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {r.classes}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{r.size}</TableCell>
                  <TableCell className="text-sm">{r.case}</TableCell>
                  <TableCell className="text-muted-foreground text-sm leading-6">
                    {r.usage}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Case usage */}
      <section>
        <SectionHeading id="case">Case &amp; tracking</SectionHeading>
        <DocumentationParagraph>
          Care UI uses <strong>sentence case</strong> almost everywhere.
          Sentence case scans faster, translates cleanly, and stays readable
          across the type scale. The exceptions — UPPERCASE eyebrows, badges,
          and identifiers — are small and always tracked out so the letterforms
          breathe.
        </DocumentationParagraph>

        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-44">Style</TableHead>
                <TableHead className="w-48">Example</TableHead>
                <TableHead className="w-40">Tracking</TableHead>
                <TableHead>When to use it</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CASES.map((c) => (
                <TableRow key={c.style}>
                  <TableCell className="text-sm font-medium">
                    {c.style}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {c.example}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {c.tracking}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm leading-6">
                    {c.use}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Live tracking previews for uppercase */}
        <div className="border-border bg-card mt-6 space-y-5 rounded-lg border p-6 md:p-8">
          <div>
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Tracking comparison — same word, different settings
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-baseline justify-between gap-6">
              <span className="text-foreground text-sm font-semibold uppercase">
                Overview
              </span>
              <code className="text-muted-foreground font-mono text-xs">
                uppercase · tracking-normal (avoid)
              </code>
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <span className="text-foreground text-sm font-semibold tracking-wide uppercase">
                Overview
              </span>
              <code className="text-muted-foreground font-mono text-xs">
                uppercase · tracking-wide (0.025em)
              </code>
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <span className="text-foreground text-xs font-medium tracking-widest uppercase">
                Overview
              </span>
              <code className="text-muted-foreground font-mono text-xs">
                uppercase · tracking-widest (0.1em) — default for eyebrows
              </code>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-6">
            All-caps removes the x-height differences that help the eye parse
            words. Tracking out (positive letter-spacing) restores the rhythm.
            The smaller the size, the more tracking you need.
          </p>
        </div>
      </section>

      {/* Numerics & features */}
      <section>
        <SectionHeading id="numerics">
          Numerics &amp; font features
        </SectionHeading>
        <DocumentationParagraph>
          Clinical UIs are full of numbers. Switch on the right OpenType feature
          so columns align, identifiers are unambiguous, and prose still reads
          naturally.
        </DocumentationParagraph>

        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48">Feature</TableHead>
                <TableHead className="w-48">Class</TableHead>
                <TableHead>When to use it</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FEATURES.map((f) => (
                <TableRow key={f.feature}>
                  <TableCell className="text-sm font-medium">
                    {f.feature}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {f.className}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm leading-6">
                    {f.use}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Tabular vs proportional preview — three real use cases */}
        <div className="mt-6 space-y-6">
          {/* Use case 1 — right-aligned column of numbers */}
          <div className="border-border bg-card rounded-lg border p-6 md:p-8">
            <div className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              Use case · right-aligned column of totals
            </div>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Without <InlineCode>tabular-nums</InlineCode> the digit{" "}
              <strong>1</strong> is narrower than <strong>0</strong> or{" "}
              <strong>8</strong>, so the decimal points and right edges drift.
              Tabular figures lock every digit to the same advance width and the
              column locks up.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-8">
              <div>
                <div className="text-muted-foreground mb-2 text-xs font-medium">
                  Proportional (default) — drifts
                </div>
                <ul className="text-foreground space-y-1 text-right text-base">
                  <li>$1,118.10</li>
                  <li>$8,800.88</li>
                  <li>$10,471.00</li>
                  <li>$11,111.11</li>
                </ul>
              </div>
              <div>
                <div className="text-muted-foreground mb-2 text-xs font-medium">
                  <InlineCode>tabular-nums</InlineCode> — aligned
                </div>
                <ul className="text-foreground space-y-1 text-right text-base tabular-nums">
                  <li>$1,118.10</li>
                  <li>$8,800.88</li>
                  <li>$10,471.00</li>
                  <li>$11,111.11</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Use case 2 — ticking timer / live counter */}
          <div className="border-border bg-card rounded-lg border p-6 md:p-8">
            <div className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              Use case · ticking values
            </div>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Timers, countdowns, vitals refresh, and progress percentages must
              not <em>jitter</em> as digits change. Tabular keeps the glyph box
              still while the value updates.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-8">
              <div>
                <div className="text-muted-foreground mb-2 text-xs font-medium">
                  Proportional — jitters between frames
                </div>
                <div className="text-foreground text-3xl font-semibold">
                  00:11:18
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-2 text-xs font-medium">
                  <InlineCode>tabular-nums</InlineCode> — steady
                </div>
                <div className="text-foreground text-3xl font-semibold tabular-nums">
                  00:11:18
                </div>
              </div>
            </div>
          </div>

          {/* Use case 3 — when proportional is actually right */}
          <div className="border-border bg-card rounded-lg border p-6 md:p-8">
            <div className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              Use case · numbers inside a sentence
            </div>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              In running prose, proportional figures (the default) read more
              naturally because the <strong>1</strong> doesn&apos;t sit inside
              its own oversized box. Only switch to tabular when columns or live
              values need alignment.
            </p>
            <div className="mt-5 space-y-3">
              <div>
                <div className="text-muted-foreground mb-1 text-xs font-medium">
                  Proportional — natural rhythm
                </div>
                <p className="text-foreground text-base leading-7">
                  Patient admitted on 11 April 2025, discharged after 18 days
                  with 1,118 units of medication administered.
                </p>
              </div>
              <div>
                <div className="text-muted-foreground mb-1 text-xs font-medium">
                  <InlineCode>tabular-nums</InlineCode> — gappy in prose
                </div>
                <p className="text-foreground text-base leading-7 tabular-nums">
                  Patient admitted on 11 April 2025, discharged after 18 days
                  with 1,118 units of medication administered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Punctuation */}
      <section>
        <SectionHeading id="punctuation">
          Punctuation &amp; characters
        </SectionHeading>
        <DocumentationParagraph>
          Small character choices add up. Use the correct glyph in copy — they
          render better, translate cleanly, and signal care.
        </DocumentationParagraph>
        <ul className="text-foreground mt-6 ml-5 list-disc space-y-2 leading-7">
          <li>
            Use a single ellipsis character (…) — never three dots (
            <InlineCode>...</InlineCode>).
          </li>
          <li>
            Curly quotes (“” ‘’), not straight (<InlineCode>" '</InlineCode>).
          </li>
          <li>
            Non-breaking space (<InlineCode>&amp;nbsp;</InlineCode>) between
            value and unit: <InlineCode>10&nbsp;mg</InlineCode>,{" "}
            <InlineCode>37.1&nbsp;°C</InlineCode>,{" "}
            <InlineCode>⌘&nbsp;K</InlineCode>.
          </li>
          <li>
            Loading and async states end with an ellipsis:{" "}
            <InlineCode>Saving…</InlineCode>, <InlineCode>Loading…</InlineCode>.
          </li>
          <li>
            En dash (–) for ranges (<InlineCode>9–17</InlineCode>), em dash (—)
            for parenthetical breaks.
          </li>
          <li>
            Use <InlineCode>text-wrap: balance</InlineCode> (
            <InlineCode>text-balance</InlineCode>) on headings and{" "}
            <InlineCode>text-pretty</InlineCode> on long paragraphs to prevent
            widows.
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
                Use a single <code className="font-mono">h1</code> per page.
              </li>
              <li>
                Default to <strong>sentence case</strong> for every label,
                button, heading, and toast.
              </li>
              <li>
                Apply <code className="font-mono">tracking-tight</code> on
                headings ≥ <code className="font-mono">text-2xl</code>.
              </li>
              <li>
                Pair UPPERCASE with{" "}
                <code className="font-mono">tracking-widest</code> (0.1em) at
                ≤12px, <code className="font-mono">tracking-wide</code>{" "}
                (0.025em) at 13–14px.
              </li>
              <li>
                Use <code className="font-mono">tabular-nums</code> on any
                column of numbers; add{" "}
                <code className="font-mono">slashed-zero</code> for IDs.
              </li>
              <li>
                Use <code className="font-mono">leading-7</code> for any
                multi-line prose.
              </li>
              <li>
                Use <code className="font-mono">text-muted-foreground</code> for
                secondary text, never opacity.
              </li>
              <li>
                Use semantic tags — <code className="font-mono">h1–h6</code>,{" "}
                <code className="font-mono">p</code>,{" "}
                <code className="font-mono">ul</code>,{" "}
                <code className="font-mono">code</code>.
              </li>
            </ul>
          </div>
          <div className="border-border bg-card space-y-3 rounded-lg border p-6">
            <div className="text-foreground text-sm font-semibold tracking-tight">
              Don&apos;t
            </div>
            <ul className="text-muted-foreground ml-5 list-disc space-y-2 text-sm leading-6">
              <li>
                Skip heading levels (<code className="font-mono">h2 → h4</code>
                ).
              </li>
              <li>
                Set arbitrary <code className="font-mono">font-size</code> or{" "}
                <code className="font-mono">line-height</code> values inline.
              </li>
              <li>
                Use <code className="font-mono">font-light</code> below{" "}
                <code className="font-mono">text-xl</code> — legibility drops.
              </li>
              <li>
                Mix <code className="font-mono">tracking-tight</code> on body
                copy — reserved for headings.
              </li>
              <li>
                Apply Title Case or UPPERCASE to button labels or full sentences
                — it slows reading and breaks translation.
              </li>
              <li>
                Use UPPERCASE without tracking — the word loses its shape.
              </li>
              <li>
                Use three dots (<code className="font-mono">...</code>) or
                straight quotes in copy — use … and curly quotes.
              </li>
              <li>
                Use <code className="font-mono">text-{`{color}`}-500</code>{" "}
                directly — always go through semantic tokens.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </DocumentationPage>
  );
}

function RhythmTag({ offset, label }: { offset: string; label: string }) {
  return (
    <div className="text-muted-foreground absolute -left-px hidden -translate-x-full pr-3 font-mono text-[10px] md:block">
      <span className="bg-muted rounded px-1.5 py-0.5">
        {label} · {offset}
      </span>
    </div>
  );
}
