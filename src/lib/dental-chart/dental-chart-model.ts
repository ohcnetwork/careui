/**
 * @name dental-chart-model
 * @description Framework-free model for the Dental Chart: types, FDI/Universal numbering, finding catalogue,
 * dentition layout, selection helpers, finding operations, visit diff and the per-tooth render model.
 * @type registry:lib
 *
 * Pure TypeScript. No React, no DOM. Everything the Dental Chart component and the Dental Chart
 * template need to decide WHAT to draw and HOW findings change lives here, so it can be unit-tested
 * and reused by CARE (care_fe) without the UI.
 *
 * Conventions
 * - FDI (ISO 3950) is the internal key for every tooth: "11"–"48" permanent, "51"–"85" primary.
 *   Universal is display-only.
 * - Surfaces are single letters: M (mesial), D (distal), O (occlusal, posterior), I (incisal, anterior),
 *   B (buccal/labial), L (lingual/palatal). Combinations ("MOD") are derived for display only.
 * - Every finding carries a status: condition | existing | planned | completed.
 * - Viewer orientation: patient's right on the viewer's left, upper arch on top.
 */

import type { ToothGeometry, ToothGeometryMap } from "./dental-chart-geometry";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ToothId = string;
export type Surface = "M" | "D" | "O" | "I" | "B" | "L";
export type FindingStatus = "condition" | "existing" | "planned" | "completed";
export type Dentition = "permanent" | "mixed" | "primary";
/** What occupies a permanent position in mixed dentition. */
export type SlotState = "perm" | "prim" | "none";
export type Numbering = "fdi" | "universal";
export type Arch = "upper" | "lower";

export interface DentalFinding {
  id: string;
  tooth: ToothId;
  /** Catalogue key, e.g. "caries". */
  key: string;
  status: FindingStatus;
  /** Empty for whole-tooth findings. */
  surfaces: Surface[];
  material: string | null;
  grade: string | null;
  note: string;
  /** Display date of the visit that last touched this finding. */
  visit: string;
  /** Display name of who recorded it. */
  by: string;
}

export interface CatalogueItem {
  key: string;
  label: string;
  /** Short label for chips, e.g. "RCT". */
  short?: string;
  /** Extra search words. */
  synonyms: string;
  statuses: FindingStatus[];
  /** True when the finding is recorded per surface (caries, filling). */
  needsSurfaces?: boolean;
  materials?: string[];
  grades?: string[];
}

export interface DentitionConfig {
  dentition: Dentition;
  hideThirdMolars: boolean;
  /** Keyed by the permanent position id ("11"–"48"). Missing keys mean "perm". */
  mixedSlots: Record<ToothId, SlotState>;
}

export interface Slot {
  /** Permanent position id (or the primary id itself in primary dentition). */
  pos: ToothId;
  /** The tooth drawn here, or null when not erupted. */
  tooth: ToothId | null;
}

export interface ToothInfo {
  id: ToothId;
  quadrant: number; // 1–8 (FDI)
  position: number; // 1–8
  primary: boolean;
  upper: boolean;
  /** True when the tooth is drawn left of the midline (patient's right). */
  viewerLeft: boolean;
  anterior: boolean;
  /** Geometry template id (right-side template; left side is mirrored). */
  template: string;
  /** "Lower left first molar" */
  name: string;
  /** "first molar" */
  shortName: string;
  /** Clinical quadrant 1–4 for quick select. */
  quad: 1 | 2 | 3 | 4;
}

/* ------------------------------------------------------------------ */
/* Status and catalogue                                                */
/* ------------------------------------------------------------------ */

export const STATUS_ORDER: FindingStatus[] = ["condition", "existing", "planned", "completed"];

export const STATUS_LABEL: Record<FindingStatus, string> = {
  condition: "Condition",
  existing: "Existing",
  planned: "Planned",
  completed: "Completed",
};

export const STATUS_HELP: Record<FindingStatus, string> = {
  condition: "What is wrong now",
  existing: "Work done before this visit",
  planned: "Advised in this visit",
  completed: "Done in this visit",
};

const RESTORATIVE: FindingStatus[] = ["existing", "planned", "completed"];

/** Starter catalogue. Replace keys with SNOMED-bound codes when wiring to CARE. */
export const FINDING_CATALOGUE: CatalogueItem[] = [
  { key: "caries", label: "Caries", synonyms: "decay cavity carious", statuses: ["condition"], needsSurfaces: true },
  { key: "filling", label: "Filling", synonyms: "restoration composite gic amalgam", statuses: RESTORATIVE, needsSurfaces: true, materials: ["Composite", "GIC", "Amalgam", "Temporary"] },
  { key: "crown", label: "Crown", synonyms: "cap pfm zirconia", statuses: RESTORATIVE, materials: ["PFM", "Zirconia", "Metal", "E-max"] },
  { key: "rct", label: "Root canal treatment", short: "RCT", synonyms: "rct endo root canal", statuses: RESTORATIVE },
  { key: "missing", label: "Missing", synonyms: "absent edentulous", statuses: ["condition"] },
  { key: "extraction", label: "Extraction", synonyms: "extract exo removal", statuses: ["planned", "completed"] },
  { key: "mobility", label: "Mobility", synonyms: "mobile loose", statuses: ["condition"], grades: ["I", "II", "III"] },
  { key: "fracture", label: "Fracture", synonyms: "broken crack", statuses: ["condition"] },
  { key: "periapical", label: "Periapical lesion", synonyms: "abscess granuloma cyst pa", statuses: ["condition"] },
  { key: "implant", label: "Implant", synonyms: "fixture", statuses: RESTORATIVE },
  { key: "post", label: "Post and core", synonyms: "post core pin", statuses: RESTORATIVE },
  { key: "veneer", label: "Veneer", synonyms: "laminate", statuses: RESTORATIVE },
  { key: "impacted", label: "Impacted", synonyms: "unerupted embedded", statuses: ["condition"] },
];

export const CATALOGUE_BY_KEY: Record<string, CatalogueItem> = Object.fromEntries(
  FINDING_CATALOGUE.map((c) => [c.key, c]),
);

/** Shown as one-tap chips in the finding picker. */
export const FREQUENT_FINDINGS = ["caries", "filling", "crown", "rct", "missing", "extraction", "mobility", "fracture"];

export function defaultStatusFor(item: CatalogueItem): FindingStatus {
  return item.statuses.includes("existing") ? "existing" : item.statuses[0];
}

export function searchCatalogue(query: string, catalogue = FINDING_CATALOGUE): CatalogueItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return catalogue.filter((c) => `${c.label} ${c.short ?? ""} ${c.synonyms}`.toLowerCase().includes(q));
}

/* ------------------------------------------------------------------ */
/* Teeth, numbering and names                                          */
/* ------------------------------------------------------------------ */

export const UPPER_PERMANENT: ToothId[] = ["18", "17", "16", "15", "14", "13", "12", "11", "21", "22", "23", "24", "25", "26", "27", "28"];
export const LOWER_PERMANENT: ToothId[] = ["48", "47", "46", "45", "44", "43", "42", "41", "31", "32", "33", "34", "35", "36", "37", "38"];
export const UPPER_PRIMARY: ToothId[] = ["55", "54", "53", "52", "51", "61", "62", "63", "64", "65"];
export const LOWER_PRIMARY: ToothId[] = ["85", "84", "83", "82", "81", "71", "72", "73", "74", "75"];

const PERMANENT_NAMES = ["", "central incisor", "lateral incisor", "canine", "first premolar", "second premolar", "first molar", "second molar", "third molar"];
const PRIMARY_NAMES = ["", "central incisor", "lateral incisor", "canine", "first molar", "second molar"];
const QUADRANT_NAMES: Record<number, string> = {
  1: "Upper right", 2: "Upper left", 3: "Lower left", 4: "Lower right",
  5: "Upper right", 6: "Upper left", 7: "Lower left", 8: "Lower right",
};

export function isValidToothId(id: string): boolean {
  if (!/^[1-8][1-8]$/.test(id)) return false;
  const q = +id[0];
  const p = +id[1];
  return q <= 4 ? p <= 8 : p <= 5;
}

export function toothInfo(id: ToothId): ToothInfo {
  const q = +id[0];
  const p = +id[1];
  const primary = q >= 5;
  const upper = q === 1 || q === 2 || q === 5 || q === 6;
  const viewerLeft = q === 1 || q === 4 || q === 5 || q === 8;
  const template = (primary ? (upper ? "5" : "7") : upper ? "1" : "3") + p;
  const shortName = (primary ? "primary " : "") + (primary ? PRIMARY_NAMES[p] : PERMANENT_NAMES[p]);
  return {
    id, quadrant: q, position: p, primary, upper, viewerLeft, anterior: p <= 3, template,
    name: `${QUADRANT_NAMES[q]} ${shortName}`, shortName,
    quad: (((q - 1) % 4) + 1) as 1 | 2 | 3 | 4,
  };
}

/** Universal (ADA) number: 1–32 permanent, A–T primary. */
export function toUniversal(id: ToothId): string {
  const q = +id[0];
  const p = +id[1];
  if (q === 1) return String(9 - p);
  if (q === 2) return String(8 + p);
  if (q === 3) return String(25 - p);
  if (q === 4) return String(24 + p);
  const L = "ABCDEFGHIJKLMNOPQRST";
  if (q === 5) return L[5 - p];
  if (q === 6) return L[4 + p];
  if (q === 7) return L[15 - p];
  return L[14 + p];
}

export function toothLabel(id: ToothId, numbering: Numbering): string {
  return numbering === "universal" ? toUniversal(id) : id;
}

/** "Buccal" for posterior, "Labial" for anterior; "Palatal" upper, "Lingual" lower. */
export function surfaceName(s: Surface, t: ToothInfo): string {
  switch (s) {
    case "M": return "Mesial";
    case "D": return "Distal";
    case "O": return "Occlusal";
    case "I": return "Incisal";
    case "B": return t.anterior ? "Labial" : "Buccal";
    case "L": return t.upper ? "Palatal" : "Lingual";
  }
}

/** Surfaces offered for a tooth, in display order. */
export function surfacesFor(t: ToothInfo): Surface[] {
  return ["M", t.anterior ? "I" : "O", "D", "B", "L"];
}

const SURFACE_ORDER: Surface[] = ["M", "O", "I", "D", "B", "L"];

/** Dedupe, map O<->I for the tooth type, and sort M O/I D B L. */
export function normaliseSurfaces(list: readonly string[], anterior: boolean): Surface[] {
  const out: Surface[] = [];
  for (const raw of list) {
    let s = raw as Surface;
    if (anterior && s === "O") s = "I";
    if (!anterior && s === "I") s = "O";
    if (!out.includes(s)) out.push(s);
  }
  return out.sort((a, b) => SURFACE_ORDER.indexOf(a) - SURFACE_ORDER.indexOf(b));
}

/** Permanent position -> primary predecessor ("15" -> "55"); null for molars 6–8. */
export function primaryPredecessor(pos: ToothId): ToothId | null {
  const q = +pos[0];
  const p = +pos[1];
  return q <= 4 && p <= 5 ? `${q + 4}${p}` : null;
}
/** Any tooth -> its permanent position ("55" -> "15"). */
export function positionOf(id: ToothId): ToothId {
  const q = +id[0];
  return q >= 5 ? `${q - 4}${id[1]}` : id;
}

/** Suggested dentition from age in years. */
export function dentitionForAge(ageYears: number): Dentition {
  if (ageYears < 6) return "primary";
  if (ageYears <= 12) return "mixed";
  return "permanent";
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function slotsFor(arch: Arch, cfg: DentitionConfig): Slot[] {
  if (cfg.dentition === "primary") {
    return (arch === "upper" ? UPPER_PRIMARY : LOWER_PRIMARY).map((t) => ({ pos: t, tooth: t }));
  }
  let list = arch === "upper" ? UPPER_PERMANENT : LOWER_PERMANENT;
  if (cfg.hideThirdMolars) list = list.filter((t) => t[1] !== "8");
  return list.map((pos) => {
    if (cfg.dentition === "permanent") return { pos, tooth: pos };
    const state = cfg.mixedSlots[pos] ?? "perm";
    const prim = primaryPredecessor(pos);
    if (state === "prim" && prim) return { pos, tooth: prim };
    if (state === "none") return { pos, tooth: null };
    return { pos, tooth: pos };
  });
}

/** Key used for selection: the tooth id, or the position id for an empty slot. */
export const slotKey = (s: Slot): ToothId => s.tooth ?? s.pos;

/** Display order: upper arch left->right, then lower arch left->right. */
export function displayOrder(cfg: DentitionConfig): ToothId[] {
  return [...slotsFor("upper", cfg), ...slotsFor("lower", cfg)].map(slotKey);
}

export function isPresent(key: ToothId, cfg: DentitionConfig): boolean {
  const hit = [...slotsFor("upper", cfg), ...slotsFor("lower", cfg)].find((s) => slotKey(s) === key);
  return hit ? hit.tooth !== null : true;
}

/** Sort tooth ids by where they appear on the chart. */
export function sortByChart(ids: ToothId[], cfg: DentitionConfig): ToothId[] {
  const order = displayOrder(cfg);
  const idx = (t: ToothId) => {
    const i = order.indexOf(t);
    if (i >= 0) return i;
    const j = order.indexOf(positionOf(t));
    return j >= 0 ? j + 0.5 : 999;
  };
  return [...ids].sort((a, b) => idx(a) - idx(b));
}

/* ------------------------------------------------------------------ */
/* Selection                                                           */
/* ------------------------------------------------------------------ */

export interface DentalSelection {
  teeth: ToothId[];
  /** Surfaces picked on specific teeth. */
  surfaces: Record<ToothId, Surface[]>;
  /** Last clicked tooth, for Shift-range. */
  anchor: ToothId | null;
}

export const EMPTY_SELECTION: DentalSelection = { teeth: [], surfaces: {}, anchor: null };

export interface ClickModifiers {
  shift?: boolean;
  toggle?: boolean; // Cmd/Ctrl
}

export function selectTooth(sel: DentalSelection, key: ToothId, order: ToothId[], mod: ClickModifiers = {}): DentalSelection {
  if (mod.shift && sel.anchor && order.includes(sel.anchor)) {
    const a = order.indexOf(sel.anchor);
    const b = order.indexOf(key);
    return { teeth: order.slice(Math.min(a, b), Math.max(a, b) + 1), surfaces: {}, anchor: sel.anchor };
  }
  if (mod.toggle) {
    const surfaces = { ...sel.surfaces };
    delete surfaces[key];
    const teeth = sel.teeth.includes(key) ? sel.teeth.filter((k) => k !== key) : [...sel.teeth, key];
    return { teeth, surfaces, anchor: key };
  }
  return { teeth: [key], surfaces: sel.teeth[0] === key && sel.teeth.length === 1 ? sel.surfaces : {}, anchor: key };
}

export function toggleSurface(sel: DentalSelection, key: ToothId, surface: Surface, mod: ClickModifiers = {}): DentalSelection {
  const t = toothInfo(key);
  const s = normaliseSurfaces([surface], t.anterior)[0];
  const current = sel.teeth.includes(key) ? sel.surfaces[key] ?? [] : [];
  const next = current.includes(s) ? current.filter((x) => x !== s) : normaliseSurfaces([...current, s], t.anterior);
  const keep = mod.shift || mod.toggle;
  const surfaces = keep ? { ...sel.surfaces } : {};
  if (next.length) surfaces[key] = next;
  else delete surfaces[key];
  const teeth = keep ? (sel.teeth.includes(key) ? sel.teeth : [...sel.teeth, key]) : [key];
  return { teeth, surfaces, anchor: key };
}

export function quickSelect(kind: "upper" | "lower" | 1 | 2 | 3 | 4 | "all", cfg: DentitionConfig): ToothId[] {
  return displayOrder(cfg).filter((k) => {
    if (!isPresent(k, cfg)) return false;
    const t = toothInfo(k);
    if (kind === "all") return true;
    if (kind === "upper") return t.upper;
    if (kind === "lower") return !t.upper;
    return t.quad === kind;
  });
}

/** Keyboard navigation inside the chart grid. */
export function neighbour(key: ToothId, dir: "left" | "right" | "up" | "down", cfg: DentitionConfig): ToothId {
  const up = slotsFor("upper", cfg).map(slotKey);
  const lo = slotsFor("lower", cfg).map(slotKey);
  const row = up.includes(key) ? up : lo;
  const i = row.indexOf(key);
  if (dir === "left") return row[Math.max(0, i - 1)];
  if (dir === "right") return row[Math.min(row.length - 1, i + 1)];
  const other = row === up ? lo : up;
  return other[Math.round((i / Math.max(1, row.length - 1)) * (other.length - 1))];
}

/* ------------------------------------------------------------------ */
/* Finding operations (immutable)                                      */
/* ------------------------------------------------------------------ */

export interface FindingDraft {
  key: string;
  status: FindingStatus;
  /** Used for teeth without their own picked surfaces. */
  surfaces: Surface[];
  material: string | null;
  grade: string | null;
}

export interface ApplyContext {
  cfg: DentitionConfig;
  visit: string;
  by: string;
  newId: () => string;
}

export interface ApplyResult {
  findings: DentalFinding[];
  applied: ToothId[];
  skipped: ToothId[];
}

/**
 * Add a finding to each tooth. Teeth with their own picked surfaces use those;
 * others use draft.surfaces. An existing finding with the same tooth, key and status
 * is merged (surfaces unioned) instead of duplicated.
 */
export function applyFinding(
  findings: DentalFinding[],
  teeth: ToothId[],
  perToothSurfaces: Record<ToothId, Surface[]>,
  draft: FindingDraft,
  ctx: ApplyContext,
): ApplyResult {
  const item = CATALOGUE_BY_KEY[draft.key];
  if (!item) throw new Error(`Unknown finding key: ${draft.key}`);
  const out = findings.slice();
  const applied: ToothId[] = [];
  const skipped: ToothId[] = [];
  for (const k of teeth) {
    if (!isPresent(k, ctx.cfg)) { skipped.push(k); continue; }
    const t = toothInfo(k);
    const own = perToothSurfaces[k];
    const surfaces = item.needsSurfaces ? normaliseSurfaces(own?.length ? own : draft.surfaces, t.anterior) : [];
    if (item.needsSurfaces && !surfaces.length) { skipped.push(k); continue; }
    const i = out.findIndex((f) => f.tooth === k && f.key === draft.key && f.status === draft.status);
    if (i >= 0) {
      const f = out[i];
      out[i] = {
        ...f,
        surfaces: normaliseSurfaces([...f.surfaces, ...surfaces], t.anterior),
        material: draft.material ?? f.material,
        grade: draft.grade ?? f.grade,
        visit: ctx.visit,
        by: ctx.by,
      };
    } else {
      out.push({
        id: ctx.newId(), tooth: k, key: draft.key, status: draft.status, surfaces,
        material: draft.material, grade: draft.grade, note: "", visit: ctx.visit, by: ctx.by,
      });
    }
    applied.push(k);
  }
  return { findings: out, applied, skipped };
}

export function updateFinding(findings: DentalFinding[], id: string, patch: Partial<DentalFinding>, stamp?: { visit: string; by: string }): DentalFinding[] {
  return findings.map((f) => (f.id === id ? { ...f, ...patch, ...(stamp ?? {}) } : f));
}

export function removeFinding(findings: DentalFinding[], id: string): DentalFinding[] {
  return findings.filter((f) => f.id !== id);
}

export function groupByTooth(findings: DentalFinding[]): Record<ToothId, DentalFinding[]> {
  const out: Record<ToothId, DentalFinding[]> = {};
  for (const f of findings) (out[f.tooth] ??= []).push(f);
  return out;
}

export function countByStatus(findings: DentalFinding[]): Record<FindingStatus, number> {
  const c: Record<FindingStatus, number> = { condition: 0, existing: 0, planned: 0, completed: 0 };
  for (const f of findings) c[f.status]++;
  return c;
}

export const surfaceText = (f: DentalFinding) => f.surfaces.join("");

export function findingTitle(f: DentalFinding): string {
  let t = CATALOGUE_BY_KEY[f.key]?.label ?? f.key;
  if (f.material) t += ` · ${f.material}`;
  if (f.grade) t += ` · Grade ${f.grade}`;
  return t;
}

export const findingLine = (f: DentalFinding) => findingTitle(f) + (f.surfaces.length ? ` ${surfaceText(f)}` : "");

/* ------------------------------------------------------------------ */
/* Visits: diff and unsaved changes                                    */
/* ------------------------------------------------------------------ */

export type DiffKind = "new" | "changed";
export interface VisitDiff {
  byId: Record<string, DiffKind>;
  teeth: Record<ToothId, true>;
  removed: DentalFinding[];
}

/** Compare the current chart with the previous visit. Findings are matched by id. */
export function diffVisits(previous: DentalFinding[], current: DentalFinding[]): VisitDiff {
  const res: VisitDiff = { byId: {}, teeth: {}, removed: [] };
  const prev = new Map(previous.map((f) => [f.id, f]));
  const cur = new Set(current.map((f) => f.id));
  for (const f of current) {
    const p = prev.get(f.id);
    if (!p) { res.byId[f.id] = "new"; res.teeth[f.tooth] = true; continue; }
    if (p.status !== f.status || surfaceText(p) !== surfaceText(f) || p.material !== f.material || p.grade !== f.grade || p.tooth !== f.tooth) {
      res.byId[f.id] = "changed";
      res.teeth[f.tooth] = true;
    }
  }
  for (const f of previous) if (!cur.has(f.id)) { res.removed.push(f); res.teeth[f.tooth] = true; }
  return res;
}

export function countUnsaved(
  baseline: DentalFinding[], current: DentalFinding[],
  baseSlots: Record<ToothId, SlotState> = {}, slots: Record<ToothId, SlotState> = {},
): number {
  const base = new Map(baseline.map((f) => [f.id, JSON.stringify(f)]));
  const ids = new Set<string>();
  let n = 0;
  for (const f of current) { ids.add(f.id); if (base.get(f.id) !== JSON.stringify(f)) n++; }
  for (const f of baseline) if (!ids.has(f.id)) n++;
  for (const k of new Set([...Object.keys(slots), ...Object.keys(baseSlots)])) {
    if ((slots[k] ?? "perm") !== (baseSlots[k] ?? "perm")) n++;
  }
  return n;
}

/* ------------------------------------------------------------------ */
/* Clinical warnings                                                   */
/* ------------------------------------------------------------------ */

export type PatientAlertKind = "anticoagulant" | "diabetes" | "allergy" | "other";
export interface PatientAlert { label: string; kind: PatientAlertKind }

/** Soft warnings shown before planned surgery (extraction, implant). */
export function surgeryWarnings(findings: DentalFinding[], alerts: PatientAlert[], where: string): string[] {
  const surgery = findings.some((f) => (f.key === "extraction" || f.key === "implant") && f.status === "planned");
  if (!surgery) return [];
  const out: string[] = [];
  const anticoag = alerts.find((a) => a.kind === "anticoagulant");
  if (anticoag) out.push(`${anticoag.label} on record. Check INR and plan haemostasis before surgery on ${where}.`);
  if (alerts.some((a) => a.kind === "diabetes")) out.push("Diabetes on record. Check blood glucose before surgery.");
  return out;
}

/* ------------------------------------------------------------------ */
/* Render model                                                        */
/* ------------------------------------------------------------------ */

/** SVG path data per status, drawn in this order: existing, completed, planned, condition. */
export type StatusPaths = Record<FindingStatus, string>;

export interface ToothRenderModel {
  id: ToothId;
  info: ToothInfo;
  missing: boolean;
  /** Has at least one finding completed in this visit. */
  completedToday: boolean;
  /** Short text badges such as "M2" or "IMP". */
  badges: string[];
  side: {
    viewBox: [number, number, number, number];
    /** SVG transform that mirrors left-side teeth and flips lower teeth. */
    transform: string;
    outline: string;
    pulp: string;
    detail: string;
    fills: StatusPaths;
    implantThreads: string;
    fracture: string;
    /** X for missing / extraction. */
    cross: string;
    crossStatus: FindingStatus | "missing" | null;
    implant: boolean;
  };
  occlusal: {
    viewBox: [number, number, number, number];
    transform: string;
    outline: string;
    detail: string;
    /** Outline drawn as a ring when the tooth has a crown. */
    crownRing: string;
    crownStatus: FindingStatus | null;
    /** Five clickable surface regions. `status` is the fill to show, if any. */
    surfaces: { surface: Surface; path: string; status: FindingStatus | null }[];
    /** Label anchor per surface, already transformed into viewBox space. */
    labels: Record<Surface, [number, number] | undefined>;
    /** Suggested label font size in viewBox units. */
    labelSize: number;
  };
}

function mirrorFlip(vb: [number, number, number, number], t: ToothInfo): string {
  const parts: string[] = [];
  if (!t.viewerLeft) parts.push(`translate(${2 * vb[0] + vb[2]} 0) scale(-1 1)`);
  if (!t.upper) parts.push(`translate(0 ${2 * vb[1] + vb[3]}) scale(1 -1)`);
  return parts.join(" ");
}

function mapPoint(x: number, y: number, vb: [number, number, number, number], t: ToothInfo): [number, number] {
  return [t.viewerLeft ? x : 2 * vb[0] + vb[2] - x, t.upper ? y : 2 * vb[1] + vb[3] - y];
}

const toVB = (v: readonly (string | number)[]) => v.map(Number) as [number, number, number, number];

/**
 * Turn a tooth's findings into SVG path data. The geometry templates are drawn for the
 * patient's-right side with mesial facing +x and buccal facing -y; this function applies
 * the mirror/flip so every tooth reads correctly in its quadrant.
 */
export function buildToothModel(id: ToothId, findings: DentalFinding[], geometry: ToothGeometryMap): ToothRenderModel {
  const t = toothInfo(id);
  const g: ToothGeometry | undefined = geometry[t.template];
  if (!g) throw new Error(`No geometry for template ${t.template}`);
  const sv = g.side;
  const ov = g.occlusal;
  const has = (k: string, st?: FindingStatus) => findings.some((f) => f.key === k && (!st || f.status === st));
  const missing = has("missing") || has("extraction", "completed");
  const implant = has("implant");
  const rct = has("rct");

  const fills: Record<FindingStatus, string[]> = { condition: [], existing: [], planned: [], completed: [] };
  const threads: string[] = [];
  const fracture: string[] = [];
  let cross = "";
  let crossStatus: ToothRenderModel["side"]["crossStatus"] = null;
  let crownRing = "";
  let crownStatus: FindingStatus | null = null;
  const surfaceFill: Partial<Record<"M" | "D" | "B" | "L" | "C", FindingStatus>> = {};

  // Draw lower-priority statuses first so a condition always ends on top.
  const ordered = findings.slice().sort((a, b) => STATUS_ORDER.indexOf(b.status) - STATUS_ORDER.indexOf(a.status));
  for (const f of ordered) {
    const bucket = fills[f.status];
    switch (f.key) {
      case "caries":
      case "filling": {
        const src = f.key === "caries" ? sv.caries : sv.filling;
        for (const s of f.surfaces) {
          const sideKey = s === "I" ? "O" : s;
          const d = src[sideKey as keyof typeof src];
          if (d) bucket.push(d);
          const occKey = s === "O" || s === "I" ? "C" : (s as "M" | "D" | "B" | "L");
          if (!surfaceFill[occKey] || f.key === "caries") surfaceFill[occKey] = f.status;
        }
        break;
      }
      case "crown":
        if (sv.crown) bucket.push(sv.crown);
        crownRing = ov.outline.join(" ");
        crownStatus = f.status;
        break;
      case "rct": if (sv.rootCanal) bucket.push(sv.rootCanal); break;
      case "post": if (sv.post) bucket.push(sv.post); break;
      case "veneer": if (sv.veneer) bucket.push(sv.veneer); break;
      case "implant": bucket.push(sv.implant); threads.push(sv.implantThreads); break;
      case "periapical": if (sv.periapical) bucket.push(sv.periapical); break;
      case "fracture": fracture.push(sv.fracture.join(" ")); break;
      case "missing": cross = sv.cross; crossStatus = "missing"; break;
      case "extraction": cross = sv.cross; crossStatus = f.status; break;
    }
  }

  const svb = toVB(sv.viewBox);
  const ovb = toVB(ov.viewBox);
  const centre: Surface = ov.anterior ? "I" : "O";
  const [cx, cy, Rx, Ry, ix, iy] = ov.wheel;
  const labels: Record<Surface, [number, number] | undefined> = {
    M: mapPoint(cx + (Rx + ix) / 2, cy, ovb, t),
    D: mapPoint(cx - (Rx + ix) / 2, cy, ovb, t),
    B: mapPoint(cx, cy - (Ry + iy) / 2, ovb, t),
    L: mapPoint(cx, cy + (Ry + iy) / 2, ovb, t),
    O: centre === "O" ? mapPoint(cx, cy, ovb, t) : undefined,
    I: centre === "I" ? mapPoint(cx, cy, ovb, t) : undefined,
  };
  const order: Surface[] = ["B", "L", "M", "D", centre];
  const badges: string[] = [];
  for (const f of findings) {
    if (f.key === "mobility") badges.push(`M${({ I: "1", II: "2", III: "3" } as Record<string, string>)[f.grade ?? "I"] ?? ""}`);
    if (f.key === "impacted") badges.push("IMP");
  }

  return {
    id, info: t, missing, badges,
    completedToday: findings.some((f) => f.status === "completed"),
    side: {
      viewBox: svb,
      transform: mirrorFlip(svb, t),
      outline: sv.outline,
      pulp: rct || implant || missing ? "" : sv.pulp.join(" "),
      detail: missing ? "" : sv.detail.join(" "),
      fills: {
        condition: fills.condition.join(" "),
        existing: fills.existing.join(" "),
        planned: fills.planned.join(" "),
        completed: fills.completed.join(" "),
      },
      implantThreads: threads.join(" "),
      fracture: fracture.join(" "),
      cross, crossStatus, implant: implant && !missing,
    },
    occlusal: {
      viewBox: ovb,
      transform: mirrorFlip(ovb, t),
      outline: ov.outline.join(" "),
      detail: missing ? "" : ov.detail.join(" "),
      crownRing, crownStatus,
      surfaces: missing ? [] : order.map((s) => ({
        surface: s,
        path: ov.surfaces[s] ?? "",
        status: surfaceFill[s === centre ? "C" : (s as "M" | "D" | "B" | "L")] ?? null,
      })),
      labels,
      labelSize: Math.max(2.2, Math.min(Rx, Ry) * 0.3),
    },
  };
}
