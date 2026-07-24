# careui — conventions for building with this design system

careui is a healthcare-oriented React component library built on **Tailwind CSS v4** and shadcn-style primitives (Base UI under the hood). Components are imported from the `careui` package and styled with Tailwind utility classes backed by semantic CSS-variable tokens. The brand accent is **emerald green**.

## Setup & wrapping

- **No provider is required.** Every component renders standalone — just import and use it. There is no `ThemeProvider`, context root, or CSS-in-JS runtime to wrap the app in.
- **Light/dark theming is class-based.** Dark mode is `@custom-variant dark (&:is(.dark *))` — put `class="dark"` on a root ancestor (`<html>` or `<body>`) to switch the whole tree. All semantic tokens re-resolve automatically; never hardcode dark-mode colors on components.
- **Fonts ship with the system**: `--font-sans` is Figtree (the default UI font) and `--font-mono` is Geist Mono. Use `font-sans` / `font-mono` — do not import other fonts.
- A few components take extra care: `Toaster` (sonner) reads the theme if `next-themes` is present but works without it; `Sidebar` needs its own `SidebarProvider` wrapper (see `Sidebar.prompt.md`); `TVDisplay` forces a dark canvas internally.

## Styling idiom — Tailwind utilities + semantic tokens

Style **layout** with normal Tailwind utilities (`flex`, `grid`, `gap-4`, `p-6`, `max-w-3xl`, `rounded-lg`). Style **intent/color** with the semantic token utilities below — **never raw hex or `bg-emerald-600`**; the tokens are what make light/dark and the brand swap work.

Core semantic families (each has matching `bg-*`, `text-*`, `border-*` where sensible):

| Token utility | Use |
|---|---|
| `bg-background` / `text-foreground` | page surface + primary text |
| `bg-card` / `text-card-foreground` | card surfaces |
| `bg-popover` / `text-popover-foreground` | menus, popovers |
| `bg-primary` / `text-primary-foreground` | primary actions (emerald green) |
| `bg-secondary` / `bg-accent` / `bg-muted` | subtle surfaces |
| `text-muted-foreground` | secondary / helper text |
| `bg-destructive` / `text-destructive` | dangerous actions, errors |
| `border-border` / `border-input` / `ring-ring` | borders, field outlines, focus rings |
| `bg-sidebar*`, `--chart-1..5` | sidebar surfaces; chart series colors |

Radius scale: `rounded-sm | md | lg | xl | 2xl | 3xl | 4xl` (driven by `--radius`). Extended surface/text ramps also exist as CSS vars (`--soft-background`, `--muted-background`, `--strong-border`, `--soft-foreground`, …) when the semantic utilities aren't enough.

## Where the truth lives

- **Styling source**: read `styles.css` and its `@import` closure (it pulls in `_ds_bundle.css`, the token definitions, and fonts) before styling — it holds the real token names and values.
- **Per component**: `<Name>.d.ts` is the exact prop contract; `<Name>.prompt.md` shows how to compose it (props, sub-components, examples). Read these before using a component rather than guessing its API — compound components (Card, Field, Item, Sidebar, Select, TVDisplay) expose named sub-parts.

## Idiomatic snippet

```tsx
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from "careui";

<Card className="max-w-sm">
  <CardHeader>
    <CardTitle>Patient Summary</CardTitle>
    <Badge variant="success">Admitted</Badge>
  </CardHeader>
  <CardContent className="flex flex-col gap-3">
    <p className="text-sm text-muted-foreground">
      John Doe · 34y · Ward 4A · Bed 12
    </p>
    <div className="flex gap-2">
      <Button>View record</Button>
      <Button variant="outline">Discharge</Button>
    </div>
  </CardContent>
</Card>
```

Compose real careui components for controls; use semantic-token utilities for your own layout glue. Realistic clinical content (patient names, wards, vitals, MRNs) fits this system's intent.
