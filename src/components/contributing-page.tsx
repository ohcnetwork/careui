import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * Contributing documentation page for Care UI.
 *
 * Sourced from:
 *  - CONTRIBUTING.md (top-level)
 *  - .github/copilot-instructions.md (project conventions)
 *  - package.json scripts
 *  - scripts/generate-registry.ts (CONFIG.dependencyMap)
 *
 * Every command, path, and rule on this page exists in the repo today —
 * nothing aspirational.
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
      className="border-border scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
    >
      {children}
    </h2>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-muted my-4 overflow-x-auto rounded-lg p-4">
      <code className="font-mono text-sm">{children}</code>
    </pre>
  );
}

/* ── Prerequisites ── */

const PREREQS: { tool: string; version: string; source: string }[] = [
  { tool: "Node.js", version: "22.16.0", source: ".nvmrc" },
  { tool: "pnpm", version: "10.11.1", source: "package.json · packageManager" },
  { tool: "Git", version: "any modern version", source: "—" },
];

/* ── pnpm scripts (read from package.json) ── */

const SCRIPTS: { script: string; description: string; when: string }[] = [
  {
    script: "pnpm install",
    description: "Install dependencies.",
    when: "First clone, after pulling new dependencies.",
  },
  {
    script: "pnpm dev",
    description: "Start the Vite docs SPA on http://localhost:5173.",
    when: "Day-to-day development — live reload on every save.",
  },
  {
    script: "pnpm build",
    description: "Type-check (tsc -b) and build the production docs SPA.",
    when: "Before opening a PR; CI runs the same command.",
  },
  {
    script: "pnpm build:registry",
    description:
      "Run scripts/generate-registry.ts — generates the shadcn-compatible JSON under public/registry/care-ui/.",
    when: "After adding or modifying any UI component.",
  },
  {
    script: "pnpm registry:watch",
    description: "Re-run the registry generator on every file change.",
    when: "While iterating on multiple components in one session.",
  },
  {
    script: "pnpm registry:add-jsdoc",
    description:
      "Bulk-add the required JSDoc metadata header to UI files that are missing it.",
    when: "Onboarding a batch of components; rarely needed otherwise.",
  },
  {
    script: "pnpm lint",
    description: "Run ESLint across the repository.",
    when: "Before every commit. Also runs in CI.",
  },
  {
    script: "pnpm format:check / pnpm format",
    description:
      "Check or rewrite Prettier formatting (with prettier-plugin-tailwindcss).",
    when: "Before every commit. Use format to auto-fix.",
  },
  {
    script: "pnpm preview",
    description: "Serve the production build locally for a final smoke test.",
    when: "Verifying a build before publish.",
  },
];

/* ── Component quality checklist ── */

const QUALITY: { area: string; rules: string[] }[] = [
  {
    area: "API surface",
    rules: [
      "Component is a function component with named export.",
      'Props extend the native HTML element type (React.ComponentProps<"div">).',
      "className is merged with cn() — never overwritten.",
      "data-slot is set on the root, and any subcomponents preserve their data-slot.",
      "Variants use class-variance-authority (CVA) with VariantProps<typeof …>.",
    ],
  },
  {
    area: "Styling",
    rules: [
      "All colors come from semantic tokens (bg-card, text-foreground, border-input). No raw hex / OKLCH literals.",
      "Use Care UI's radius, spacing, and elevation tokens — see the Foundations page.",
      "Pair floating shadows with ring-1 ring-foreground/10 (E3+ elevation contract).",
      "No arbitrary [px] / [color] values for properties the token system already exposes.",
    ],
  },
  {
    area: "Accessibility",
    rules: [
      "Use the semantic HTML element first; reach for ARIA only if no native fits.",
      "Every interactive element has a visible focus-visible ring (the Care default is focus-visible:ring-ring/50 focus-visible:ring-[3px]).",
      'Icon-only buttons include aria-label or a <span className="sr-only">.',
      "State changes wire to ARIA — aria-pressed, aria-expanded, aria-invalid, data-state.",
      "Any animation honours prefers-reduced-motion.",
      "Touch target meets 24×24 (WCAG 2.5.8). Use hit-area-* on smaller icon controls.",
    ],
  },
  {
    area: "Copy",
    rules: [
      "Sentence case everywhere — headings, buttons, labels, toasts.",
      "Specific verb + noun on buttons (Save patient record, not Save or OK).",
      "Async / loading states end with an ellipsis (Saving…, Loading…).",
      "Use non-breaking space between value and unit (10&nbsp;mg, 37.1&nbsp;°C).",
    ],
  },
  {
    area: "Quality gates",
    rules: [
      "pnpm lint passes with zero warnings.",
      "pnpm format:check passes — run pnpm format if it doesn't.",
      "pnpm build:registry succeeds and the generated JSON renders in the docs SPA.",
      "Component is tested in light, dark, high-contrast, and at the 17px and 18px+ font scales.",
    ],
  },
];

export function ContributingPage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl space-y-16 p-4 md:p-8">
        {/* Header */}
        <header>
          <div className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
            Documentation
          </div>
          <h1 className="mt-3 scroll-m-20 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl">
            Contributing
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-xl leading-7">
            A short, opinionated workflow for adding and modifying Care UI
            components — one source of truth, three files to touch, and the
            quality bar every change is held to.
          </p>
        </header>

        {/* Prerequisites */}
        <section>
          <SectionHeading id="prerequisites">Prerequisites</SectionHeading>
          <p className="text-foreground mt-6 leading-7">
            Care UI pins its toolchain so every contributor and the Cloudflare
            Pages build run on the same versions.
          </p>

          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Tool</TableHead>
                  <TableHead className="w-44">Version</TableHead>
                  <TableHead>Pinned in</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PREREQS.map((p) => (
                  <TableRow key={p.tool}>
                    <TableCell className="text-sm font-medium">
                      {p.tool}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {p.version}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">
                      {p.source}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <CodeBlock>{`# Clone, install, run
git clone https://github.com/ohcnetwork/careui.git
cd careui
pnpm install
pnpm dev`}</CodeBlock>
        </section>

        {/* Three-file workflow */}
        <section>
          <SectionHeading id="workflow">The three-file workflow</SectionHeading>
          <p className="text-foreground mt-6 leading-7">
            Every component touches exactly three hand-written files. The JSON
            under <InlineCode>public/registry/care-ui/</InlineCode> is generated
            — never edit it.
          </p>

          <ol className="text-foreground mt-6 ml-5 list-decimal space-y-2 leading-7">
            <li>
              <strong>Implementation</strong> —{" "}
              <InlineCode>src/components/ui/&lt;name&gt;.tsx</InlineCode>
            </li>
            <li>
              <strong>Documentation</strong> —{" "}
              <InlineCode>src/lib/registry/&lt;name&gt;.tsx</InlineCode>
            </li>
            <li>
              <strong>Registration</strong> —{" "}
              <InlineCode>src/lib/registry/index.ts</InlineCode>
            </li>
          </ol>

          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            1. Implementation
          </h3>
          <p className="text-foreground mt-4 leading-7">
            Place the component at{" "}
            <InlineCode>src/components/ui/&lt;name&gt;.tsx</InlineCode>. The
            JSDoc header is required — the registry generator parses it.
          </p>
          <CodeBlock>{`// src/components/ui/my-component.tsx
/**
 * @name my-component
 * @description A brief description of what it does
 * @dependencies package-name-if-any
 * @type registry:ui
 */
import { cn } from "@/lib/utils";

export function MyComponent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="my-component"
      className={cn("base-styles", className)}
      {...props}
    />
  );
}`}</CodeBlock>

          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            2. Documentation
          </h3>
          <p className="text-foreground mt-4 leading-7">
            Authoring docs use <InlineCode>React.createElement</InlineCode> (not
            JSX) so the file can be evaluated in non-JSX contexts when
            generating the registry payload.
          </p>
          <CodeBlock>{`// src/lib/registry/my-component.tsx
import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { MyComponent } from "@/components/ui/my-component";

export const myComponentDoc: ComponentDoc = {
  id: "my-component",
  name: "MyComponent",
  description: "Description of your component.",
  preview: {
    component: React.createElement(MyComponent, {}, "Preview"),
    code: \`<MyComponent>Preview</MyComponent>\`,
  },
  examples: [
    {
      name: "Basic usage",
      description: "Simple example.",
      preview: React.createElement(MyComponent),
      code: \`<MyComponent />\`,
    },
  ],
  props: [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
};`}</CodeBlock>

          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            3. Registration
          </h3>
          <p className="text-foreground mt-4 leading-7">
            Register the component in the lazy-loader map so the docs SPA and
            the sidebar pick it up automatically.
          </p>
          <CodeBlock>{`// src/lib/registry/index.ts
const componentLoaders = {
  // …existing entries
  "my-component": () =>
    import("./my-component").then((m) => ({ default: m.myComponentDoc })),
};`}</CodeBlock>

          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            4. Generate &amp; verify
          </h3>
          <CodeBlock>{`pnpm build:registry   # writes public/registry/care-ui/<name>/<name>.json
pnpm dev              # http://localhost:5173 → component appears in the sidebar`}</CodeBlock>
        </section>

        {/* Commands */}
        <section>
          <SectionHeading id="commands">Commands</SectionHeading>
          <p className="text-foreground mt-6 leading-7">
            Every script is defined in <InlineCode>package.json</InlineCode>.
            Prefer the named scripts over invoking <InlineCode>tsx</InlineCode>{" "}
            or <InlineCode>vite</InlineCode> directly.
          </p>

          <div className="border-border mt-6 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-56">Script</TableHead>
                  <TableHead>What it does</TableHead>
                  <TableHead className="w-72">When to use it</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SCRIPTS.map((s) => (
                  <TableRow key={s.script}>
                    <TableCell className="font-mono text-xs">
                      {s.script}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm leading-6">
                      {s.description}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm leading-6">
                      {s.when}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Files you'll touch */}
        <section>
          <SectionHeading id="files">Files you&apos;ll touch</SectionHeading>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border-border bg-card space-y-3 rounded-lg border p-6">
              <div className="text-foreground text-sm font-semibold tracking-tight">
                Always edit
              </div>
              <ul className="text-muted-foreground ml-5 list-disc space-y-2 text-sm leading-6">
                <li>
                  <code className="font-mono">
                    src/components/ui/&lt;name&gt;.tsx
                  </code>
                </li>
                <li>
                  <code className="font-mono">
                    src/lib/registry/&lt;name&gt;.tsx
                  </code>
                </li>
                <li>
                  <code className="font-mono">src/lib/registry/index.ts</code>
                </li>
                <li>
                  <code className="font-mono">src/index.css</code> — only for
                  new design tokens or global utilities.
                </li>
                <li>
                  <code className="font-mono">
                    scripts/generate-registry.ts
                  </code>{" "}
                  — when a new external dependency lands (update{" "}
                  <code className="font-mono">CONFIG.dependencyMap</code>).
                </li>
              </ul>
            </div>
            <div className="border-border bg-card space-y-3 rounded-lg border p-6">
              <div className="text-foreground text-sm font-semibold tracking-tight">
                Never hand-edit
              </div>
              <ul className="text-muted-foreground ml-5 list-disc space-y-2 text-sm leading-6">
                <li>
                  <code className="font-mono">
                    public/registry/care-ui/**/*.json
                  </code>{" "}
                  — regenerated by{" "}
                  <code className="font-mono">pnpm build:registry</code>.
                </li>
                <li>
                  <code className="font-mono">public/registry.json</code> and{" "}
                  <code className="font-mono">public/index.json</code> — also
                  generated.
                </li>
                <li>
                  <code className="font-mono">pnpm-lock.yaml</code> — let pnpm
                  manage it; commit only after{" "}
                  <code className="font-mono">pnpm install</code>.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quality checklist */}
        <section>
          <SectionHeading id="quality">Quality checklist</SectionHeading>
          <p className="text-foreground mt-6 leading-7">
            Before opening a pull request, walk every component change through
            this list. Each group cross-references the foundations documented
            elsewhere in this site.
          </p>

          <div className="mt-8 space-y-8">
            {QUALITY.map((group) => (
              <div key={group.area}>
                <h3
                  id={group.area.toLowerCase().replace(/\s+/g, "-")}
                  className="scroll-m-20 text-2xl font-semibold tracking-tight"
                >
                  {group.area}
                </h3>
                <ul className="text-foreground mt-4 ml-5 list-disc space-y-2 leading-7">
                  {group.rules.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Dependencies */}
        <section>
          <SectionHeading id="dependencies">
            Adding a new dependency
          </SectionHeading>
          <p className="text-foreground mt-6 leading-7">
            Adding an external package to a UI component requires two steps:
            install it, then teach the registry generator about it so downstream{" "}
            <InlineCode>shadcn</InlineCode> consumers get the right install
            command.
          </p>

          <CodeBlock>{`# 1. Install
pnpm add <package>

# 2. Update scripts/generate-registry.ts → CONFIG.dependencyMap
#    Map any imported module path to the npm package name(s).
#
# 3. Reference the package in your component's JSDoc header
#    @dependencies <package-name>
#
# 4. Regenerate
pnpm build:registry`}</CodeBlock>
        </section>

        {/* Modifying existing */}
        <section>
          <SectionHeading id="modifying">
            Modifying an existing component
          </SectionHeading>
          <ol className="text-foreground mt-6 ml-5 list-decimal space-y-2 leading-7">
            <li>
              Edit <InlineCode>src/components/ui/&lt;name&gt;.tsx</InlineCode>.
            </li>
            <li>
              Update <InlineCode>src/lib/registry/&lt;name&gt;.tsx</InlineCode>{" "}
              if the public API, examples, or props changed.
            </li>
            <li>
              Run <InlineCode>pnpm build:registry</InlineCode> to refresh the
              JSON.
            </li>
            <li>
              Run <InlineCode>pnpm lint</InlineCode> and{" "}
              <InlineCode>pnpm format:check</InlineCode>.
            </li>
            <li>
              Verify the component in the docs SPA — light, dark, high-contrast,
              and at the 18px+ font scale.
            </li>
          </ol>

          <CodeBlock>{`# Quick all-in-one for a doc-only tweak
pnpm build:registry && pnpm lint && pnpm format:check`}</CodeBlock>
        </section>

        {/* PR conventions */}
        <section>
          <SectionHeading id="pr">Pull request conventions</SectionHeading>
          <ul className="text-foreground mt-6 ml-5 list-disc space-y-2 leading-7">
            <li>
              One logical change per PR — a new component, a single fix, or one
              cross-cutting refactor.
            </li>
            <li>
              Commit messages: short imperative summary (
              <em>Add empty component</em>, <em>Fix focus ring on switch</em>
              ).
            </li>
            <li>
              Include before/after screenshots for any visual change. Capture
              both light and dark.
            </li>
            <li>
              Note any new design tokens or utilities introduced in{" "}
              <InlineCode>src/index.css</InlineCode> in the PR description.
            </li>
            <li>
              CI runs <InlineCode>pnpm build</InlineCode> +{" "}
              <InlineCode>pnpm build:registry</InlineCode> — both must pass.
            </li>
          </ul>
        </section>

        {/* Do / Don't */}
        <section>
          <SectionHeading id="guidelines">Guidelines</SectionHeading>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border-border bg-card space-y-3 rounded-lg border p-6">
              <div className="text-foreground text-sm font-semibold tracking-tight">
                Do
              </div>
              <ul className="text-muted-foreground ml-5 list-disc space-y-2 text-sm leading-6">
                <li>
                  Run the named pnpm scripts — don&apos;t invoke tools directly.
                </li>
                <li>
                  Keep the JSDoc header on every UI file — the generator depends
                  on it.
                </li>
                <li>
                  Use Care UI semantic tokens for color, spacing, radius, and
                  elevation.
                </li>
                <li>
                  Cross-reference the Typography, Foundations, and Accessibility
                  pages when designing the API.
                </li>
                <li>
                  Regenerate the registry before pushing anything that touches a
                  UI file.
                </li>
              </ul>
            </div>
            <div className="border-border bg-card space-y-3 rounded-lg border p-6">
              <div className="text-foreground text-sm font-semibold tracking-tight">
                Don&apos;t
              </div>
              <ul className="text-muted-foreground ml-5 list-disc space-y-2 text-sm leading-6">
                <li>
                  Hand-edit anything under{" "}
                  <code className="font-mono">public/registry/care-ui/</code>.
                </li>
                <li>
                  Use JSX inside{" "}
                  <code className="font-mono">src/lib/registry/*.tsx</code> —
                  use <code className="font-mono">React.createElement</code>.
                </li>
                <li>
                  Ship a new dependency without updating{" "}
                  <code className="font-mono">CONFIG.dependencyMap</code>.
                </li>
                <li>
                  Bypass <code className="font-mono">cn()</code> or skip{" "}
                  <code className="font-mono">data-slot</code> on the root.
                </li>
                <li>
                  Skip the quality gates —{" "}
                  <code className="font-mono">pnpm lint</code> and{" "}
                  <code className="font-mono">pnpm format:check</code> must
                  pass.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
