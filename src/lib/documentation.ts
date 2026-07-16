import { type DocumentationPage } from "@/lib/types";

export const documentationPages: Record<string, DocumentationPage> = {
  "get-started": {
    id: "get-started",
    title: "Get Started",
    description:
      "Install Care UI in a React + Tailwind v4 project. Components are added on demand through the shadcn CLI — you own the source, nothing is published as a runtime dependency.",
    content: {
      sections: [
        {
          title: "Prerequisites",
          content:
            "Care UI targets React 19, TypeScript, and Tailwind CSS v4. Initialise shadcn once in your project — this writes components.json, sets up the @/ import alias, and wires Tailwind's CSS variables. Pick the neutral base colour to match the Care UI palette.",
          code: `# In your React + Tailwind v4 project
npx shadcn@latest init`,
        },
        {
          title: "Add a component",
          content:
            "Every Care UI component is published as a shadcn-compatible registry entry at https://careui.ohc.network/r/<name>.json. Pass the URL directly to the CLI — files land in @/components/ui/ and any required dependencies are installed automatically.",
          code: `# Add a single component
npx shadcn@latest add https://careui.ohc.network/r/button.json

# Add several at once
npx shadcn@latest add \\
  https://careui.ohc.network/r/button.json \\
  https://careui.ohc.network/r/input.json \\
  https://careui.ohc.network/r/card.json

# pnpm / yarn / bun work too
pnpm dlx shadcn@latest add https://careui.ohc.network/r/button.json
bunx shadcn@latest add https://careui.ohc.network/r/button.json`,
        },
        {
          title: "Tailwind v4 setup",
          content:
            "Care UI uses Tailwind v4's CSS-first configuration — there is no tailwind.config.js. Import Tailwind from your root stylesheet and the design tokens shadcn writes will be picked up automatically.",
          code: `/* src/index.css */
@import "tailwindcss";

/* shadcn init writes the @theme block and CSS variables
   for colors, radius, and typography here. */`,
        },
        {
          title: "Use it in your app",
          content:
            "Components are imported from the @/components/ui/ alias and composed with regular Tailwind classes. They are fully typed, support dark mode out of the box, and follow the Care UI heading and spacing rhythm documented under Typography.",
          code: `import { Button } from "@/components/ui/button"
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
}`,
        },
        {
          title: "What you get",
          content:
            "Source you own (no runtime dependency on Care UI), full TypeScript types and Base UI accessibility primitives, the Care UI theme tokens (light, dark, protanopia, tritanopia, high-contrast), and the typography + spacing system tuned for clinical density. Browse the rest of the docs — Typography, Colors, Foundations, Accessibility — for the design conventions every component is built against.",
        },
      ],
    },
  },
  "docs-typography": {
    id: "docs-typography",
    title: "Typography",
    description:
      "The Care UI type system — sizes, line heights, letter spacing, and vertical rhythm aligned to Tailwind v4 and shadcn/ui conventions.",
    content: { sections: [] },
  },
  colors: {
    id: "colors",
    title: "Colors",
    description:
      "The Care UI color system — semantic tokens, theme modes (light, dark, protanopia, tritanopia, high-contrast), contrast pairings and usage rules.",
    content: { sections: [] },
  },
  brands: {
    id: "brands",
    title: "Brands",
    description:
      "Brand assets and logo guidance for Care, OHCNF, and OHC, with direct downloads and light/dark preview variants.",
    content: { sections: [] },
  },
  foundations: {
    id: "foundations",
    title: "Foundations",
    description:
      "Spacing, elevation, borders & radius, and the layout shell — every value sourced from src/index.css and the live components.",
    content: { sections: [] },
  },
  accessibility: {
    id: "accessibility",
    title: "Accessibility",
    description:
      "Care UI targets WCAG 2.2 AA across every theme — what the system gives you for free, and the author checklist for everything else.",
    content: { sections: [] },
  },
  contributing: {
    id: "contributing",
    title: "Contributing",
    description:
      "How to add or modify a Care UI component — the three-file workflow, pnpm scripts, and the quality bar every change is held to.",
    content: { sections: [] },
  },
};
