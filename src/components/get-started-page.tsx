import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { SubsectionTitle } from "@/components/ui/typography";
import {
  DocumentationHeader,
  DocumentationInlineCode as InlineCode,
  DocumentationPage,
  DocumentationParagraph,
  DocumentationSectionHeading as SectionHeading,
  documentationLinkClassName,
} from "@/components/documentation-primitives";

/**
 * Get Started documentation page for Care UI.
 *
 * Guides developers through installing Care UI in a React + Tailwind v4 project,
 * adding components via shadcn CLI, and setting up the design tokens and typography system.
 */

function CodeBlock({ code, id }: { code: string; id: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div className="relative mt-4 rounded-lg bg-slate-900 p-4">
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 p-0 text-slate-400 hover:text-slate-200"
        onClick={() => copyToClipboard(code, id)}
      >
        {isCopied(id) ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <pre className="overflow-x-auto">
        <code className="font-mono text-sm text-slate-100">{code}</code>
      </pre>
    </div>
  );
}

export function GetStartedPage() {
  return (
    <DocumentationPage>
      {/* Header */}
      <DocumentationHeader title="Get Started">
        Install Care UI in a React + Tailwind v4 project. Components are added
        on demand through the shadcn CLI — you own the source, nothing is
        published as a runtime dependency.
      </DocumentationHeader>

      {/* Prerequisites Section */}
      <section className="space-y-4">
        <SectionHeading id="prerequisites">Prerequisites</SectionHeading>
        <div className="space-y-3">
          <DocumentationParagraph spacing="none">
            Care UI targets React 19, TypeScript, and Tailwind CSS v4.
            Initialise shadcn once in your project — this writes{" "}
            <InlineCode>components.json</InlineCode>, sets up the{" "}
            <InlineCode>@/</InlineCode> import alias, and wires Tailwind's CSS
            variables. Pick the neutral base colour to match the Care UI
            palette.
          </DocumentationParagraph>
          <CodeBlock
            code={`# In your React + Tailwind v4 project
npx shadcn@latest init`}
            id="setup-init"
          />
        </div>
      </section>

      {/* Add Components Section */}
      <section className="space-y-4">
        <SectionHeading id="add-component">Add a component</SectionHeading>
        <div className="space-y-3">
          <DocumentationParagraph spacing="none">
            Every Care UI component is published as a shadcn-compatible registry
            entry at{" "}
            <InlineCode>
              https://careui.ohc.network/r/&lt;name&gt;.json
            </InlineCode>
            . Pass the URL directly to the CLI — files land in{" "}
            <InlineCode>@/components/ui/</InlineCode> and any required
            dependencies are installed automatically.
          </DocumentationParagraph>
          <CodeBlock
            code={`# Add a single component
npx shadcn@latest add https://careui.ohc.network/r/button.json

# Add several at once
npx shadcn@latest add \\
  https://careui.ohc.network/r/button.json \\
  https://careui.ohc.network/r/input.json \\
  https://careui.ohc.network/r/card.json

# pnpm / yarn / bun work too
pnpm dlx shadcn@latest add https://careui.ohc.network/r/button.json
bunx shadcn@latest add https://careui.ohc.network/r/button.json`}
            id="add-component"
          />
        </div>
      </section>

      {/* Tailwind v4 Setup Section */}
      <section className="space-y-4">
        <SectionHeading id="tailwind-v4-setup">
          Tailwind v4 setup
        </SectionHeading>
        <div className="space-y-3">
          <DocumentationParagraph spacing="none">
            Care UI uses Tailwind v4's CSS-first configuration — there is no{" "}
            <InlineCode>tailwind.config.js</InlineCode>. Import Tailwind from
            your root stylesheet and the design tokens shadcn writes will be
            picked up automatically.
          </DocumentationParagraph>
          <CodeBlock
            code={`/* src/index.css */
@import "tailwindcss";

/* shadcn init writes the @theme block and CSS variables
   for colors, radius, and typography here. */`}
            id="tailwind-setup"
          />
        </div>
      </section>

      {/* Use in App Section */}
      <section className="space-y-4">
        <SectionHeading id="use-it-in-your-app">
          Use it in your app
        </SectionHeading>
        <div className="space-y-3">
          <DocumentationParagraph spacing="none">
            Components are imported from the{" "}
            <InlineCode>@/components/ui/</InlineCode> alias and composed with
            regular Tailwind classes. They are fully typed, support dark mode
            out of the box, and follow the Care UI heading and spacing rhythm
            documented under{" "}
            <a href="#docs-typography" className={documentationLinkClassName}>
              Typography
            </a>
            .
          </DocumentationParagraph>
          <CodeBlock
            code={`import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignInForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@hospital.org" />
      </div>
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  )
}`}
            id="use-in-app"
          />
        </div>
      </section>

      {/* What You Get Section */}
      <section className="space-y-4">
        <SectionHeading id="what-you-get">What you get</SectionHeading>
        <div className="space-y-4">
          <DocumentationParagraph spacing="none">
            Source you own (no runtime dependency on Care UI), full TypeScript
            types and Radix accessibility primitives, the Care UI theme tokens
            (light, dark, protanopia, tritanopia, high-contrast), and the
            typography + spacing system tuned for clinical density.
          </DocumentationParagraph>
          <div>
            <SubsectionTitle>Features included</SubsectionTitle>
            <ul className="mt-3 space-y-2">
              <li className="text-muted-foreground flex gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>
                  Source code ownership — components are installed, never
                  bundled
                </span>
              </li>
              <li className="text-muted-foreground flex gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Full TypeScript types and Radix UI primitives</span>
              </li>
              <li className="text-muted-foreground flex gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>
                  Semantic colour tokens and 5 theme modes (light, dark,
                  high-contrast, protanopia, tritanopia)
                </span>
              </li>
              <li className="text-muted-foreground flex gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>
                  Typography and spacing system tuned for clinical density
                </span>
              </li>
              <li className="text-muted-foreground flex gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Full dark mode support out of the box</span>
              </li>
              <li className="text-muted-foreground flex gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>
                  Accessibility-first components with WCAG 2.2 AA compliance
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="space-y-4">
        <SectionHeading id="next-steps">Next steps</SectionHeading>
        <div className="space-y-3">
          <DocumentationParagraph spacing="none">
            Browse the rest of the docs to learn more about the design system:
          </DocumentationParagraph>
          <ul className="space-y-2">
            <li className="text-muted-foreground flex gap-2">
              <span>→</span>
              <a href="#docs-typography" className={documentationLinkClassName}>
                Typography
              </a>
              {" — Sizes, line heights, letter spacing, and vertical rhythm"}
            </li>
            <li className="text-muted-foreground flex gap-2">
              <span>→</span>
              <a href="#colors" className={documentationLinkClassName}>
                Colors
              </a>
              {" — Semantic tokens, theme modes, and contrast pairings"}
            </li>
            <li className="text-muted-foreground flex gap-2">
              <span>→</span>
              <a href="#foundations" className={documentationLinkClassName}>
                Foundations
              </a>
              {" — Spacing, elevation, borders, and layout shells"}
            </li>
            <li className="text-muted-foreground flex gap-2">
              <span>→</span>
              <a href="#accessibility" className={documentationLinkClassName}>
                Accessibility
              </a>
              {" — WCAG compliance and component checklist"}
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t pt-8">
        <p className="text-muted-foreground text-sm leading-6">
          Need help? Check out our{" "}
          <a href="#components-overview" className={documentationLinkClassName}>
            component examples
          </a>
          {" or browse the "}
          <a
            href="https://github.com/ohcnetwork/careui"
            className={documentationLinkClassName}
          >
            source code
          </a>
          .
        </p>
      </div>
    </DocumentationPage>
  );
}
