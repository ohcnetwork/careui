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
