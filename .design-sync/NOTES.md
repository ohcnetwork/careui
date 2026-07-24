# Design Sync Notes

## Source locations

**Typography sub-components** — `DenseTitle`, `EyebrowTitle`, `GroupTitle`, `InlineCode`, `Large`, `Lead`, `Muted`, `PageTitle`, `SectionTitle`, `Small`, `SubsectionTitle` are NOT individual files. They all live in `src/components/ui/typography.tsx`. They are barrel-exported from `careui` normally.

## Preview authoring patterns

### Portal components (show trigger only)
These components render content via `document.body` portals — content is never visible in static capture, only the trigger:
- Combobox, ContextMenu, DatePicker, Drawer, DropdownMenu, Menubar, Select, Toaster, Tooltip (without `open={true}`)
- Grade the trigger element and note portal behavior. Do NOT mark as `needs-work` for this — it's expected.

**Exceptions where content IS visible:**
- `Dialog` with `defaultOpen` — dialog content renders in-page (not portalled)
- `AlertDialog` with `open={true}` — same
- `Popover` with `defaultOpen` — PopoverContent portals but the capture harness picks it up
- `Tooltip` with `open={true}` on the `Tooltip` element — tooltip escapes DOM but harness captures full document
- `HoverCard` with `open={true}` on the `HoverCard` element — same

### Forced-visible state tricks
- **Dialogs/AlertDialogs**: `open={true}` on the root element
- **Collapsible open**: `defaultOpen` prop
- **Pre-selected values**: `defaultValue="..."` on Select, RadioGroup, Tabs, etc.
- **Toggle pressed**: `defaultPressed` on Toggle
- **Forced Tooltip**: `open={true}` on Tooltip

### NavigationMenu in static previews
Must use `viewport={false}`. Default `viewport={true}` injects `NavigationMenuViewport` which depends on ResizeObserver and collapses to zero height in static render.

### Recharts in static previews
`ResponsiveContainer` collapses to 0×0 — no ResizeObserver in headless. Fix: pass `width={400} height={192}` directly on `<BarChart>`, `<LineChart>`, `<AreaChart>` etc., and set a fixed `w-[400px]` on the ChartContainer wrapper. Also: SVG `stroke` defaults to `none` when a CSS variable doesn't resolve — hardcode stroke colors in preview (e.g. `stroke="#3b82f6"`) rather than relying on `var(--color-*)`.

### Carousel vertical orientation
Use `basis-full` on `CarouselItem` and pass explicit `style={{ height: "192px" }}` on both `Carousel` and `CarouselContent`. The `h-*` Tailwind classes alone don't constrain vertical embla layout reliably in static render.

### ScrollArea horizontal scrollbar
`ScrollBar orientation="horizontal"` is invisible in static screenshots unless content actually overflows AND the scrollbar `type="always"` is set. Add `type="always"` to `ScrollArea` in horizontal-scroll previews.

### Sidebar
Requires `SidebarProvider` wrapper. Use `collapsible="none"` for static previews — avoids position:fixed layout that escapes the capture frame.

### Sheet (modal variant)
Use `overlay={false}` and `modal={false}` in previews — the overlay blocks the capture frame otherwise.

### External images
Unsplash and other external image URLs are blocked in the headless capture environment. Use colored divs, CSS gradients via inline `style={{ background: "..." }}` (not Tailwind gradient utilities, which may not be in the build), or data URIs.

### Tailwind gradient utilities in previews
`bg-gradient-to-*`, `from-*`, `to-*` utility classes may not appear in the Tailwind build output if they're only used in preview files (not scanned by content). Use inline `style={{ background: "..." }}` for gradient backgrounds in preview files.

## Sub-component imports

All sub-components from shadcn/ui primitives (even those excluded from standalone cards via `componentSrcMap: null`) are importable from `'careui'` in preview files. This includes: AccordionItem, AlertDialogContent, DrawerContent, SheetContent, SidebarProvider, etc.

**Exception**: `ColumnDef` for DataTable must come from `@tanstack/react-table` directly, not from `careui`.

## Component-specific API notes

- **InputGroup**: `InputGroupAddon` has `align` prop: `"inline-start" | "inline-end" | "block-start" | "block-end"`. `block-*` flips to column layout.
- **InputOTP**: `maxLength` must equal total `InputOTPSlot` count.
- **Item layout**: `ItemHeader` and `ItemFooter` use `basis-full` and must be direct children of `Item`.
- **NativeSelectOptGroup**: uses `label` prop (not children) for the group label.
- **ToggleGroup**: `spacing` prop (number) controls gap via `--gap` CSS variable. `spacing=0` + `variant="outline"` creates a connected segmented control.
- **TVDisplay**: `TVDisplayToken` `next` array is capped at 2 items internally. `density` prop: `"default"` | `"compact"`. `aspectRatio`: `"16/9"` | `"21/9"` | `"4/3"` | `"9/16"`.
- **Spinner sizes**: Controlled via `className` (e.g. `className="size-6"`), not a `size` prop.
- **Textarea error state**: Uses `aria-invalid="true"` attribute (not an `error` prop) to trigger destructive styling.
- **Switch sizes**: Controlled via `data-size` attribute, not `className`.

## Card presentation overrides (cfg.overrides)

Applied to fix grid presentation (all render fine solo; these control how they sit in the product's card grid):
- **Single-story cards** (portals/fixed content that escapes a grid cell): `AlertDialog` (Default), `Dialog` (Default), `HoverCard` (OpenByDefault), `Popover` (Default), `Sheet` (RightSheet), `Tooltip` (WithOpenState), `Progress` (States).
- **Column cards** (wider than one grid cell, keep all stories full-width): `Carousel`, `ChartContainer`, `InputGroup`, `Item`, `TVDisplay`.
- **`Progress` is `single`, not `column`**: Base UI's Progress fill bar is absolutely positioned, which the GRID_OVERFLOW detector reads as "escape" (a FALSE POSITIVE — Progress renders fine). `column` can't clear an escape flag; `single` is exempt by construction. Don't "fix" it back to column.
- **`TVDisplay` MUST be `column`**: it's a `@container`/`cqw` signage board with large clamp *minimums* (36px tokens, 48px room boxes). In a narrow grid cell (~340px) the 16/9 aspect box is too short and all rows overlap. Full card width (column) gives proportional height so the fonts fit. Do not remove this override.

## Known render warns (benign — recorded so re-sync doesn't flag them as new)

- `[RENDER_THIN]` on **AlertDialog, Dialog, Sheet**: measure 0–1px because their overlay/fixed content isn't counted in root height. They render perfectly (verified via screenshots). Benign.
- `[GRID_OVERFLOW]` / escape false-positive on **Progress**: see above; handled by `single` mode.
- `[TOKENS_MISSING]` (10 vars): all runtime/theming, none are real missing tokens — `--font-heading` (a theming hook in typeset.css; default resolves via `--font-figtree`), `--scale-mobile` (only in a non-DS error page, set inline), `--drawer-swipe-*` / `--accordion-panel-height` / `--nested-drawers` (set by Base UI at runtime). Benign.

## ChartContainer / Recharts static-capture (IMPORTANT)

Recharts is **v3.8.1**. In headless static capture the enter animation is caught **mid-reveal**, so Area/Line series clip to ~40% width (Bar is unaffected — it animates height, not a horizontal clipPath). Fix already applied in `previews/ChartContainer.tsx`: **`isAnimationActive={false}` on every Bar/Line/Area**, plus explicit `width={400} height={192}` on the chart (required — without it the ResponsiveContainer renders blank in headless) and `className="h-48 w-[400px]"` on ChartContainer. Do not remove `isAnimationActive={false}` or the charts will clip again on re-sync.

## Re-sync risks (watch-list for the next run)

- **Remote project was recreated this run.** The original synced project was deleted on claude.ai/design; a fresh `careui` project was created and its new `projectId` is in config.json. If it's deleted again, the run will re-ask and recreate (all local state is committed, so only verification re-runs).
- **Grades are not in git** (`.cache/` is gitignored). A fresh clone with no uploaded `_ds_sync.json` anchor re-verifies all 76 (what happened here). Normal.
- **6 sub-components excluded this run** (`DrawerSwipeHandle`, `NavigationMenuPositioner`, `ProgressTrack/Indicator/Label/Value`) via `componentSrcMap: null` to keep the curated set at 76. New structural sub-components appearing on a future component upgrade will show as floor cards until similarly excluded or authored.
- **conventions.md authored this run** and wired via `readmeHeader`. It names real tokens/classes/components validated against the build — re-validate it against a fresh build on re-sync (a component/token rename would rot a claim).
- **Build assumes**: Node 22.16.0 pinned (ran on 23.9.0, fine), pnpm (frozen lockfile), Playwright 1.61.0 → chromium-1228, esbuild bundles the JS from `src/ds-index.ts` (source barrel; there is no single dist JS entry — the vite build is a code-split app build). CSS comes from `dist/careui.css` (copied from the vite app-build assets), types from `tsconfig.dts.json`.
- **calendar.tsx** emits a non-fatal TS error during the dts build (react-day-picker `required` type) — `noEmitOnError:false` lets it emit; Calendar renders fine.
