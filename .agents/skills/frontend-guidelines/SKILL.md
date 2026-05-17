---
name: frontend-guidelines
description: Core frontend coding standards for HTML, CSS, and JavaScript/TypeScript. Use when writing, reviewing, or refactoring any HTML markup, CSS styles, or JS/TS code in this repo. Triggers on phrases like "follow our frontend guidelines", "review this component", "check my markup", "audit this CSS", "is this idiomatic", or whenever editing files under `src/**`, `public/**`, or any `.html`, `.css`, `.ts`, `.tsx`, `.js`, `.jsx` file. Apply automatically when authoring new components, fixing styles, or refactoring JS logic.
metadata:
  version: "1.0.0"
  source: "Frontend Guidelines (internal)"
---

# Frontend Guidelines

Authoritative coding standards for HTML, CSS, and JavaScript/TypeScript in this repository.

## When to apply

Apply these rules automatically when:
- Writing or editing any `.html`, `.css`, `.ts`, `.tsx`, `.js`, `.jsx` file
- Creating new UI components in [src/components/](src/components/)
- Reviewing PRs or auditing code for quality
- Refactoring existing markup, styles, or logic

## Precedence

If a rule here conflicts with [.github/copilot-instructions.md](.github/copilot-instructions.md) or a more specific repo skill (e.g. shadcn, web-design-guidelines), the **repo-specific instruction wins**. These are baseline craft standards.

## Self-check before finishing any task

Before declaring work complete, verify:

- [ ] HTML uses semantic elements (`<main>`, `<article>`, `<header>`, `<time>`, `<button>`, `<label>`) — no `<div>` soup
- [ ] All `<img>` have meaningful `alt`, `loading="lazy"` (below the fold), and explicit `width`/`height`
- [ ] Form controls have explicit `<label>`; interactive elements have a visible `:focus-visible` ring
- [ ] No inline styles or `!important` added; specificity kept low
- [ ] CSS prefers Flexbox/Grid; avoids `position: absolute` unless required
- [ ] Animations primarily on `opacity` / `transform`; respect `prefers-reduced-motion`
- [ ] Colors use design tokens / CSS variables, not raw hex literals
- [ ] TypeScript: no `any`, strict equality (`===`), prefer `unknown` + narrowing
- [ ] JS uses `const` (or `let`), never `var`
- [ ] Array methods (`map`/`filter`/`reduce`) or `for...of` over C-style index loops
- [ ] Functions are pure where reasonable; no needless mutation
- [ ] No new third-party dependency added for what a 1–3 line helper can do

---

## HTML

### Hard rules
1. **Use semantic elements** — `<main>`, `<article>`, `<header>`, `<nav>`, `<section>`, `<time>`, `<button>`, `<label>`. Never use `<div class="button">`.
2. **Don't misuse semantics** — wrong semantic is worse than neutral. Only wrap content in an element if it matches that element's meaning.
3. **Be terse** — omit `type="text/css"`, `type="text/javascript"`, XHTML self-closing slashes, and redundant `Content-Type` meta when `<meta charset>` exists.
4. **Always declare** `<html lang>` and `<meta charset=utf-8>`.
5. **Accessibility is not optional** — meaningful `alt`, real `<button>` / `<a>` (never `<div role="button">`), never rely on color alone, label every form control, ensure visible focus (`:focus-visible`), and meet WCAG 2.2 AA contrast.
6. **Don't block rendering** — use `defer` (or `type="module"`) for scripts; `async` only for independent ones. Put non-critical scripts at the end of `<body>`.
7. **Image performance** — always set `width`/`height` (prevents CLS), use `loading="lazy"` below the fold, `decoding="async"`, and `fetchpriority="high"` for the LCP image.
8. **Quote attributes consistently.** HTML5 allows unquoted values, but quoting (`<input type="email">`) is the team default and is required in JSX.

### Examples

```html
<!-- ❌ bad -->
<div id="main">
  <div class="article">
    <div class="header"><h1>Post</h1><p>Published: <span>21 Feb 2015</span></p></div>
  </div>
</div>

<!-- ✅ good -->
<main>
  <article>
    <header>
      <h1>Post</h1>
      <p>Published: <time datetime="2015-02-21">21 Feb 2015</time></p>
    </header>
  </article>
</main>
```

```html
<!-- ❌ render-blocking -->
<script src="analytics.js"></script>
<title>Hello</title>
<p>...</p>

<!-- ✅ deferred -->
<title>Hello</title>
<p>...</p>
<script src="analytics.js"></script>
```

---

## CSS

### Hard rules
1. **Terminate every declaration** with a semicolon.
2. **Set box-sizing globally** (`* { box-sizing: border-box }`); don't toggle per-element.
3. **Stay in normal flow** — avoid `position: absolute` and `display: block` overrides when alignment/spacing utilities work.
4. **Prefer Flexbox / Grid** for layout.
5. **Keep selectors shallow** — if you need >3 combinators or pseudo-classes, add a class instead.
6. **Minimize specificity** — no `!important`, avoid IDs as style hooks. Compose classes (`.foo.bar`) over overriding.
7. **Don't override styles you just set** — write the targeted rule directly (`li + li` vs `li {}` then `li:first-child {}`).
8. **Use inheritance** — declare on the parent, not every child.
9. **Use shorthand** (`padding: 5px 10px 20px`, `transition: 1s`).
10. **Unitless when possible** (`line-height: 1.5`, `margin: 0`); prefer `rem` for relative units; use `clamp()` for fluid type. Seconds over ms.
11. **Animations**: transitions over keyframes; primarily animate `opacity` and `transform` (compositor-friendly). Always honor `@media (prefers-reduced-motion: reduce)`.
12. **Vendor prefixes**: don't hand-write them. Modern targets (last 2 Chrome/Firefox/Safari/Edge) need almost none — Autoprefixer / Lightning CSS handles the rest.
13. **Colors**: use design tokens / CSS variables (`var(--color-primary)`). For new color literals prefer `oklch()` (perceptually uniform, what Tailwind v4 uses) or `hsl()` over hex. `color-mix()` for tints/shades. Reserve raw hex for one-off legacy values.
14. **Use modern layout tools** — `gap` for Flex/Grid spacing (not margins between siblings), logical properties (`margin-inline`, `padding-block`) for i18n, container queries (`@container`) over media queries when scoping to a component.
15. **Don't ship hacks** — no commented-out rules left behind, no `transform: translateZ(0)` GPU hacks; use `will-change` only on elements about to animate, and remove it after.

### Examples

```css
/* ❌ */ .bar { color: green !important; } .foo { color: red; }
/* ✅ */ .foo.bar { color: green; } .foo { color: red; }

/* ❌ */ li { visibility: hidden; } li:first-child { visibility: visible; }
/* ✅ */ li + li { visibility: hidden; }

/* ❌ */ div:hover { animation: move 1s forwards; } @keyframes move { 100% { margin-left: 100px; } }
/* ✅ */ div:hover { transition: 1s; transform: translateX(100px); }

/* ❌ */ div { margin: 0px; font-size: .9em; line-height: 22px; transition: 500ms; }
/* ✅ */ div { margin: 0; font-size: .9rem; line-height: 1.5; transition: .5s; }
```

---

## JavaScript / TypeScript

### Hard rules
1. **Readability > micro-perf.** JS is rarely the bottleneck. Optimize images, network, DOM reflows, and bundle size — not loop counters.
2. **Pure functions by default** — no hidden side effects, return new objects rather than mutating inputs. Use `structuredClone(x)` for deep copies.
3. **Use natives** (`Array.from`, `Object.assign`, `Object.hasOwn`, `Object.groupBy`, `structuredClone`, `Map`, `Set`, `URL`, `URLSearchParams`, `AbortController`) before reaching for libraries. Don't feature-detect ES2015+ — it's universal.
4. **`const` > `let` > `var`.** Never use `var` in new code.
5. **Strict equality** (`===` / `!==`). The only acceptable loose comparison is `x == null` to check for null-or-undefined, and even that is optional.
6. **Prefer array methods** (`map` / `filter` / `reduce` / `flatMap`) when they express intent. `for...of` is fine when you need early `break`, `await` in the loop, or side effects. Avoid C-style `for (let i = 0; i < ...)` and `forEach` with side effects.
7. **Rest/spread** instead of `arguments` and `apply()`.
8. **Arrow functions** for lexical `this` instead of `.bind(this)`.
9. **Avoid nesting** — pass functions by reference (`.map(String)` not `.map(x => String(x))`).
10. **Optional chaining + nullish coalescing** (`a?.b ?? fallback`) over `&&` chains and `||` defaults (which mishandle `0` / `""`).
11. **`Object.hasOwn(obj, key)`** instead of `Object.prototype.hasOwnProperty.call(obj, key)` or `obj.hasOwnProperty(key)`.
12. **Plain objects are fine** for static records. Use `Map` when keys are dynamic, non-string, or you need ordered iteration / `.size`.
13. **Async**: prefer `async`/`await` over `.then()` chains. Always handle rejection. Use `Promise.all` for independent work, `Promise.allSettled` when partial failure is OK. Pass `AbortSignal` for cancellable work.
14. **Don't over-curry / over-compose.** `(a, b) => a + b` beats `a => b => a + b` unless partial application is genuinely needed.
15. **No clever tricks** — no `~~n` for floor, no `void function(){}()`, no `foo || doSomething()` as control flow. Write what you mean.
16. **Small composable helpers** over copy-pasted one-liners; don't pull in a library for what 3 lines of native code do.

### TypeScript rules
1. **No `any`.** Use `unknown` and narrow, or define a proper type. `as` casts only at trust boundaries.
2. **Prefer `type` for unions/aliases**, `interface` for extensible object shapes. Be consistent with file's existing style.
3. **`satisfies`** for literal values that should match a type without widening (e.g. config objects).
4. **`readonly`** on props and config that shouldn't mutate. `as const` for literal tuples/objects.
5. **Discriminated unions** over optional-everywhere shapes for state machines / variant props.
6. **Don't re-export** types with `export *`; be explicit.

### Examples

```js
// ❌ imperative
const result = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) result.push(arr[i] * arr[i]);
}

// ✅ declarative
const result = arr.filter(n => n % 2 === 0).map(n => n * n);
```

```js
// ❌ mutates input
const merge = (target, ...sources) => Object.assign(target, ...sources);

// ✅ pure
const merge = (...sources) => Object.assign({}, ...sources);
```

```js
// ❌ apply
greet.apply(null, person);
// ✅ spread
greet(...person);

// ❌ bind
const full = function () { return `${this.first} ${this.last}`; }.bind(this);
// ✅ arrow
const full = () => `${this.first} ${this.last}`;
```

```js
// ❌ pulls in underscore
import _ from "underscore";
_.unique(arr);

// ✅ native
const unique = arr => [...new Set(arr)];
```

```js
// ❌ obfuscated
const n = ~~3.14;
foo || doSomething();

// ✅ explicit
const n = Math.floor(3.14);
if (!foo) doSomething();
```

```ts
// ❌ any + truthy default that breaks on 0/""
function greet(user: any) {
  const name = user.name || "Guest";
}

// ✅ typed + nullish coalescing + optional chaining
type User = { name?: string };
function greet(user: User) {
  const name = user.name ?? "Guest";
}
```

```ts
// ❌ widens to string
const config = { theme: "dark", direction: "ltr" };

// ✅ keeps literal types
const config = { theme: "dark", direction: "ltr" } as const;
// or, when validating against a type:
const config = { theme: "dark", direction: "ltr" } satisfies AppConfig;
```

### React 19 specifics

1. **No `forwardRef` for new components.** In React 19, `ref` is a regular prop on function components — destructure it directly.
2. **No `React.FC`.** Type props inline or via a `Props` type/interface.
3. **Stable keys** in lists — never array index when items can reorder.
4. **`use()`** for unwrapping promises/contexts in render, when appropriate.
5. **Server Actions / form actions** over manual `onSubmit` + `fetch` when applicable.
6. **Memoize sparingly** — `useMemo` / `useCallback` / `memo` only with a measured reason. The React Compiler (when enabled) handles most cases.
7. **Effects are for synchronizing with external systems**, not for deriving state. Compute derived values during render.
8. **Cleanup every subscription / timer / `AbortController`** in `useEffect` return.

### Repo-specific (CareUI)

This repo is React 19 + TypeScript + Tailwind v4. The JS rules above still apply, with these clarifications:
- Component variants use **CVA** (`class-variance-authority`) — see [src/components/ui/button.tsx](src/components/ui/button.tsx).
- Styling is via **Tailwind utility classes**, not custom CSS files. The CSS rules above govern any hand-written CSS in [src/index.css](src/index.css) and theme tokens (which use `oklch`).
- Use the `cn()` helper from [src/lib/utils.ts](src/lib/utils.ts) for conditional class composition.
- Follow conventions in [.github/copilot-instructions.md](.github/copilot-instructions.md) for component structure, registry workflow, and imports.
