import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  PageTitle,
  SectionTitle,
  SubsectionTitle,
  Lead,
} from "@/components/ui/typography";

/**
 * Get Started documentation page for Care UI.
 *
 * Guides developers through installing Care UI in a React + Tailwind v4 project,
 * adding components via shadcn CLI, and setting up the design tokens and typography system.
 */

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-muted text-foreground relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

function CodeBlock({
  code,
  id,
}: {
  code: string;
  id: string;
}) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div className="relative mt-4 rounded-lg bg-slate-900 p-4">
      <Button
        size="sm"
        variant="ghost"
        className="absolute right-2 top-2 h-8 w-8 p-0 text-slate-400 hover:text-slate-200"
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
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl space-y-8 p-4 md:p-8">
        {/* Page Header */}
        <div>
          <PageTitle>Get Started</PageTitle>
          <Lead className="mt-3">
            Install Care UI in a React + Tailwind v4 project. Components are added
            on demand through the shadcn CLI — you own the source, nothing is
            published as a runtime dependency.
          </Lead>
        </div>

        <Separator />

        {/* Prerequisites Section */}
        <section className="space-y-4">
          <SectionTitle>Prerequisites</SectionTitle>
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              Care UI targets React 19, TypeScript, and Tailwind CSS v4. Initialise
              shadcn once in your project — this writes{" "}
              <InlineCode>components.json</InlineCode>, sets up the{" "}
              <InlineCode>@/</InlineCode> import alias, and wires Tailwind's CSS
              variables. Pick the neutral base colour to match the Care UI palette.
            </p>
            <CodeBlock
              code={`# In your React + Tailwind v4 project
npx shadcn@latest init`}
              id="setup-init"
            />
          </div>
        </section>

        {/* Add Components Section */}
        <section className="space-y-4">
          <SectionTitle>Add a component</SectionTitle>
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              Every Care UI component is published as a shadcn-compatible registry
              entry at{" "}
              <InlineCode>https://careui.ohc.network/r/&lt;name&gt;.json</InlineCode>.
              Pass the URL directly to the CLI — files land in{" "}
              <InlineCode>@/components/ui/</InlineCode> and any required dependencies
              are installed automatically.
            </p>
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
          <SectionTitle>Tailwind v4 setup</SectionTitle>
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              Care UI uses Tailwind v4's CSS-first configuration — there is no{" "}
              <InlineCode>tailwind.config.js</InlineCode>. Import Tailwind from your
              root stylesheet and the design tokens shadcn writes will be picked up
              automatically.
            </p>
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
          <SectionTitle>Use it in your app</SectionTitle>
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              Components are imported from the <InlineCode>@/components/ui/</InlineCode>{" "}
              alias and composed with regular Tailwind classes. They are fully typed,
              support dark mode out of the box, and follow the Care UI heading and
              spacing rhythm documented under{" "}
              <a href="#docs-typography" className="text-primary hover:underline">
                Typography
              </a>
              .
            </p>
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
          <SectionTitle>What you get</SectionTitle>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Source you own (no runtime dependency on Care UI), full TypeScript types
              and Radix accessibility primitives, the Care UI theme tokens (light,
              dark, protanopia, tritanopia, high-contrast), and the typography +
              spacing system tuned for clinical density.
            </p>
            <div>
              <SubsectionTitle>Features included</SubsectionTitle>
              <ul className="mt-3 space-y-2">
                <li className="text-muted-foreground flex gap-3">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Source code ownership — components are installed, never bundled</span>
                </li>
                <li className="text-muted-foreground flex gap-3">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Full TypeScript types and Radix UI primitives</span>
                </li>
                <li className="text-muted-foreground flex gap-3">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Semantic colour tokens and 5 theme modes (light, dark, high-contrast, protanopia, tritanopia)</span>
                </li>
                <li className="text-muted-foreground flex gap-3">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Typography and spacing system tuned for clinical density</span>
                </li>
                <li className="text-muted-foreground flex gap-3">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Full dark mode support out of the box</span>
                </li>
                <li className="text-muted-foreground flex gap-3">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Accessibility-first components with WCAG 2.2 AA compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="space-y-4">
          <SectionTitle>Next steps</SectionTitle>
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              Browse the rest of the docs to learn more about the design system:
            </p>
            <ul className="space-y-2">
              <li className="text-muted-foreground flex gap-2">
                <span>→</span>
                <a href="#docs-typography" className="text-primary hover:underline">
                  Typography
                </a>
                {" — Sizes, line heights, letter spacing, and vertical rhythm"}
              </li>
              <li className="text-muted-foreground flex gap-2">
                <span>→</span>
                <a href="#colors" className="text-primary hover:underline">
                  Colors
                </a>
                {" — Semantic tokens, theme modes, and contrast pairings"}
              </li>
              <li className="text-muted-foreground flex gap-2">
                <span>→</span>
                <a href="#foundations" className="text-primary hover:underline">
                  Foundations
                </a>
                {" — Spacing, elevation, borders, and layout shells"}
              </li>
              <li className="text-muted-foreground flex gap-2">
                <span>→</span>
                <a href="#accessibility" className="text-primary hover:underline">
                  Accessibility
                </a>
                {" — WCAG compliance and component checklist"}
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t pt-8">
          <p className="text-muted-foreground text-sm">
            Need help? Check out our{" "}
            <a
              href="#components-overview"
              className="text-primary hover:underline"
            >
              component examples
            </a>
            {" or browse the "}
            <a
              href="https://github.com/ohcnetwork/careui"
              className="text-primary hover:underline"
            >
              source code
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
