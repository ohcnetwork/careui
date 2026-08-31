/**
 * Atomic Design categorisation for the Components section of the docs.
 *
 * Follows Brad Frost's Atomic Design methodology
 * (https://atomicdesign.bradfrost.com/chapter-2/):
 *   - Atoms: the smallest functional units, used standalone or as building
 *     blocks for everything else (Button, Input, Badge, Spinner variants...).
 *   - Molecules: a small group of atoms combined for one specific job
 *     (Card, Field, Pagination, Tabs...).
 *   - Organisms: complex, mostly standalone sections composed of molecules
 *     and atoms (Dialog, DataTable, Sidebar, Command...).
 *
 * "Quarks" (design tokens) live under the Documentation nav (Typography,
 * Colors, Foundations) rather than here, since they aren't components.
 * "Templates"/"Pages" (full-page compositions) live under Tools > Blocks.
 *
 * This map only governs docs organisation (sidebar grouping, overview page
 * sections, prev/next order) — it does not change any component's source,
 * public API, or customisation.
 */

export type AtomicLevel = "atom" | "molecule" | "organism";

export const ATOMIC_LEVEL_ORDER: AtomicLevel[] = [
  "atom",
  "molecule",
  "organism",
];

export const ATOMIC_LEVEL_LABELS: Record<AtomicLevel, string> = {
  atom: "Atoms",
  molecule: "Molecules",
  organism: "Organisms",
};

export const ATOMIC_LEVEL_DESCRIPTIONS: Record<AtomicLevel, string> = {
  atom: "The smallest, standalone building blocks — used on their own or combined into everything below.",
  molecule:
    "A small group of atoms combined to do one job, reused across contexts.",
  organism:
    "Complex, largely standalone sections composed of molecules and atoms.",
};

/**
 * Component id -> atomic design level. Ids not listed here (e.g.
 * "components-overview", "animated-character") are excluded from the
 * Components nav/grid deliberately and don't need a level.
 */
export const componentCategories: Record<string, AtomicLevel> = {
  // Atoms
  "aspect-ratio": "atom",
  avatar: "atom",
  badge: "atom",
  button: "atom",
  checkbox: "atom",
  "dotted-divider": "atom",
  indicator: "atom",
  input: "atom",
  kbd: "atom",
  label: "atom",
  "loading-animation-svg": "atom",
  marker: "atom",
  "matrix-spinner": "atom",
  "native-select": "atom",
  "pixel-spinner": "atom",
  progress: "atom",
  "radio-group": "atom",
  separator: "atom",
  shimmer: "atom",
  skeleton: "atom",
  slider: "atom",
  spinner: "atom",
  switch: "atom",
  textarea: "atom",
  toggle: "atom",
  typography: "atom",
  "unicode-spinner": "atom",

  // Molecules
  alert: "molecule",
  attachment: "molecule",
  breadcrumb: "molecule",
  bubble: "molecule",
  "button-group": "molecule",
  card: "molecule",
  collapsible: "molecule",
  empty: "molecule",
  field: "molecule",
  frame: "molecule",
  "hover-card": "molecule",
  "input-group": "molecule",
  "input-otp": "molecule",
  item: "molecule",
  pagination: "molecule",
  popover: "molecule",
  "scroll-area": "molecule",
  table: "molecule",
  tabs: "molecule",
  "toggle-group": "molecule",
  tooltip: "molecule",

  // Organisms
  accordion: "organism",
  "alert-dialog": "organism",
  calendar: "organism",
  carousel: "organism",
  chart: "organism",
  combobox: "organism",
  command: "organism",
  "context-menu": "organism",
  "data-table": "organism",
  "date-picker": "organism",
  dialog: "organism",
  drawer: "organism",
  "dropdown-menu": "organism",
  filters: "organism",
  menubar: "organism",
  message: "organism",
  "navigation-menu": "organism",
  questionnaire: "organism",
  resizable: "organism",
  select: "organism",
  sheet: "organism",
  sidebar: "organism",
  sonner: "organism",
  toast: "organism",
  "tv-display": "organism",
};

/**
 * Groups the given component ids by atomic level, in ATOMIC_LEVEL_ORDER.
 * Ids with no known level are dropped.
 */
export function groupComponentIdsByLevel(
  ids: string[]
): Record<AtomicLevel, string[]> {
  const groups: Record<AtomicLevel, string[]> = {
    atom: [],
    molecule: [],
    organism: [],
  };
  for (const id of ids) {
    const level = componentCategories[id];
    if (level) groups[level].push(id);
  }
  return groups;
}
