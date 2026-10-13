import * as React from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Paintbrush,
  Search,
  Trash2,
  TriangleAlert,
  Undo2,
  Redo2,
  X,
  ZoomIn,
} from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DEMO_CLINICIAN,
  DEMO_PATIENTS,
  DEMO_TODAY,
} from "@/lib/dental-chart/dental-chart-demo-data";
import {
  type DentalFinding,
  type DentalSelection,
  type Dentition,
  type DentitionConfig,
  type FindingDraft,
  type FindingStatus,
  type Slot,
  type SlotState,
  type Surface,
  type ToothId,
  type ToothRenderModel,
  STATUS_HELP,
  STATUS_LABEL,
  STATUS_ORDER,
  CATALOGUE_BY_KEY,
  applyFinding,
  buildToothModel,
  countByStatus,
  countUnsaved,
  defaultStatusFor,
  diffVisits,
  displayOrder,
  findingLine,
  findingTitle,
  groupByTooth,
  isPresent,
  neighbour,
  normaliseSurfaces,
  positionOf,
  primaryPredecessor,
  quickSelect,
  removeFinding,
  searchCatalogue,
  selectTooth,
  sortByChart,
  slotsFor,
  surfaceName,
  surgeryWarnings,
  toggleSurface,
  toothInfo,
  toothLabel,
  updateFinding,
} from "@/lib/dental-chart/dental-chart-model";
import { TOOTH_GEOMETRY } from "@/lib/dental-chart/dental-chart-geometry";

type VisitView = "today" | "previous";
type ChartFilter = "all" | FindingStatus;
type ChartSize = "small" | "medium" | "large";
type PickerDraft = Omit<FindingDraft, "key"> & {
  key: string | null;
  query: string;
};
type Snapshot = {
  findings: DentalFinding[];
  mixedSlots: Record<ToothId, SlotState>;
};

const SIZE_SCALE: Record<ChartSize, string> = {
  small: "[--tooth-scale:0.82]",
  medium: "[--tooth-scale:1]",
  large: "[--tooth-scale:1.16]",
};

const STATUS_VARIANT: Record<
  FindingStatus,
  "destructive" | "neutral" | "info" | "success"
> = {
  condition: "destructive",
  existing: "neutral",
  planned: "info",
  completed: "success",
};

function StatusBadge({ status }: { status: FindingStatus }) {
  return (
    <Badge variant={STATUS_VARIANT[status]} size="sm">
      {STATUS_LABEL[status]}
    </Badge>
  );
}

function Segmented<T extends string>({
  value,
  options,
  label,
  onChange,
  disabled,
  className,
}: {
  value: T;
  options: { value: T; label: React.ReactNode; title?: string }[];
  label: string;
  onChange: (value: T) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <ToggleGroup
      aria-label={label}
      variant="outline"
      size="sm"
      value={[value]}
      disabled={disabled}
      onValueChange={(next) => {
        if (next.length) onChange(next[next.length - 1] as T);
      }}
      className={className}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          title={option.title}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

function SideDrawing({
  model,
  className,
}: {
  model: ToothRenderModel;
  className?: string;
}) {
  const side = model.side;
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox={side.viewBox.join(" ")}
      focusable="false"
    >
      <g transform={side.transform}>
        <path
          className="dc-outline"
          d={side.outline}
          strokeDasharray={model.missing ? "2 1.4" : undefined}
        />
        {side.pulp && <path className="dc-pulp" d={side.pulp} />}
        {side.detail && <path className="dc-detail" d={side.detail} />}
        {side.fills.existing && (
          <path className="dc-fill-existing" d={side.fills.existing} />
        )}
        {side.fills.completed && (
          <path className="dc-fill-completed" d={side.fills.completed} />
        )}
        {side.fills.planned && (
          <path className="dc-fill-planned" d={side.fills.planned} />
        )}
        {side.fills.condition && (
          <path className="dc-fill-condition" d={side.fills.condition} />
        )}
        {side.implantThreads && (
          <path className="dc-implant-threads" d={side.implantThreads} />
        )}
        {side.fracture && <path className="dc-fracture" d={side.fracture} />}
        {side.cross && (
          <path
            className={`dc-cross dc-cross-${side.crossStatus ?? "missing"}`}
            d={side.cross}
          />
        )}
      </g>
    </svg>
  );
}

function OcclusalDrawing({
  model,
  selected,
  interactive,
  large = false,
  onSurface,
}: {
  model: ToothRenderModel;
  selected: Surface[];
  interactive: boolean;
  large?: boolean;
  onSurface?: (
    surface: Surface,
    event:
      | React.MouseEvent<SVGPathElement>
      | React.KeyboardEvent<SVGPathElement>
  ) => void;
}) {
  const occlusal = model.occlusal;
  const fontSize = Math.max(2.2, occlusal.labelSize);
  return (
    <svg
      viewBox={occlusal.viewBox.join(" ")}
      className={large ? "dc-large-occlusal" : "dc-small-occlusal"}
      role="group"
      aria-label={`Surfaces of tooth ${model.id}`}
      focusable="false"
    >
      <g transform={occlusal.transform}>
        <path
          className="dc-outline"
          d={occlusal.outline}
          strokeDasharray={model.missing ? "2 1.4" : undefined}
        />
        {occlusal.detail && <path className="dc-detail" d={occlusal.detail} />}
        {occlusal.surfaces.map(({ surface, path, status }) => {
          if (!path) return null;
          const active = selected.includes(surface);
          return (
            <path
              key={surface}
              d={path}
              strokeDasharray={model.missing ? "2 1.4" : undefined}
              role={interactive ? "checkbox" : undefined}
              aria-checked={interactive ? active : undefined}
              aria-label={`${surfaceName(surface, model.info)} surface${status ? `, ${STATUS_LABEL[status]}` : ""}`}
              tabIndex={interactive ? 0 : -1}
              className={[
                "dc-surface",
                status ? `dc-fill-${status}` : "",
                active ? "dc-selected" : "",
                interactive ? "" : "dc-readonly",
              ].join(" ")}
              onClick={
                interactive && onSurface
                  ? (event) => {
                      event.stopPropagation();
                      onSurface(surface, event);
                    }
                  : undefined
              }
              onKeyDown={
                interactive && onSurface
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        onSurface(surface, event);
                      }
                    }
                  : undefined
              }
            >
              {!large && <title>{surfaceName(surface, model.info)}</title>}
            </path>
          );
        })}
        {occlusal.crownRing && (
          <path
            className={`dc-crown-ring dc-fill-${occlusal.crownStatus ?? "existing"}`}
            d={occlusal.crownRing}
          />
        )}
      </g>
      {large &&
        !model.missing &&
        occlusal.surfaces.map(({ surface }) => {
          const point = occlusal.labels[surface];
          if (!point) return null;
          return (
            <text
              key={surface}
              x={point[0]}
              y={point[1] + fontSize * 0.36}
              fontSize={fontSize}
              textAnchor="middle"
              className="dc-surface-label"
            >
              {surface}
            </text>
          );
        })}
    </svg>
  );
}

function ToothTile({
  slot,
  numbering,
  model,
  summary,
  selected,
  selectedSurfaces,
  changed,
  sizeClass,
  readOnly,
  onSelect,
  onSurface,
}: {
  slot: Slot;
  numbering: "fdi" | "universal";
  model: ToothRenderModel | null;
  summary: string;
  selected: boolean;
  selectedSurfaces: Surface[];
  changed: boolean;
  sizeClass: string;
  readOnly: boolean;
  onSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSurface: (
    surface: Surface,
    event:
      | React.MouseEvent<SVGPathElement>
      | React.KeyboardEvent<SVGPathElement>
  ) => void;
}) {
  const id = slot.tooth ?? slot.pos;
  const info = toothInfo(id);
  const label = toothLabel(id, numbering);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`dc-tooth-tile ${sizeClass} ${selected ? "dc-tooth-selected" : ""} ${model?.missing ? "dc-tooth-missing" : ""}`}
          data-tooth={id}
        >
          <Button
            type="button"
            variant="ghost"
            aria-pressed={selected}
            aria-label={`Tooth ${label}, ${info.name}${slot.tooth ? `, ${summary}` : ", not erupted"}${changed ? ", changed since last visit" : ""}`}
            className="dc-tooth-select h-auto rounded-none p-0 no-underline shadow-none hover:bg-transparent md:h-auto md:p-0"
            onClick={onSelect}
          >
            <span className="dc-tooth-number">
              {label}
              {model?.completedToday && (
                <Check
                  className="size-3 text-emerald-700"
                  strokeWidth={3}
                  aria-label="Completed today"
                />
              )}
            </span>
            <span className="dc-tooth-badges" aria-hidden="true">
              {model?.badges.map((badge) => (
                <span key={badge} className="dc-mini-badge">
                  {badge}
                </span>
              ))}
            </span>
            {model ? (
              <SideDrawing
                model={model}
                className="dc-side-drawing size-auto"
              />
            ) : (
              <span className="dc-empty-tooth" aria-hidden="true" />
            )}
          </Button>
          {model ? (
            <OcclusalDrawing
              model={model}
              selected={selectedSurfaces}
              interactive={!readOnly}
              onSurface={onSurface}
            />
          ) : (
            <span className="dc-empty-occlusal" aria-hidden="true" />
          )}
          {changed && <span className="dc-change-dot" aria-label="Changed" />}
        </div>
      </TooltipTrigger>
      <TooltipContent side={info.upper ? "top" : "bottom"}>
        <span className="font-semibold">
          {label} · {info.name}
        </span>
        <span className="block">{slot.tooth ? summary : "Not erupted"}</span>
      </TooltipContent>
    </Tooltip>
  );
}

function StatusSwatch({ status }: { status: FindingStatus }) {
  return (
    <span aria-hidden="true" className={`dc-status-swatch dc-fill-${status}`} />
  );
}

export function DentalChartTemplate() {
  const [patientId, setPatientId] = React.useState(DEMO_PATIENTS[0].id);
  const patient = DEMO_PATIENTS.find((entry) => entry.id === patientId)!;
  const [dentition, setDentition] = React.useState<Dentition>(
    patient.dentition
  );
  const [hideThirdMolars, setHideThirdMolars] = React.useState(
    patient.hideThirdMolars
  );
  const [mixedSlots, setMixedSlots] = React.useState({ ...patient.mixedSlots });
  const [baselineMixedSlots, setBaselineMixedSlots] = React.useState({
    ...patient.mixedSlots,
  });
  const [findings, setFindings] = React.useState([...patient.today]);
  const [baseline, setBaseline] = React.useState([...patient.today]);
  const [selection, setSelection] = React.useState<DentalSelection>({
    teeth: [],
    surfaces: {},
    anchor: null,
  });
  const [lastInspectorSelection, setLastInspectorSelection] =
    React.useState<DentalSelection>(selection);
  const [draft, setDraft] = React.useState<PickerDraft>({
    key: "caries",
    status: "condition",
    surfaces: [],
    material: null,
    grade: null,
    query: "",
  });
  const [paintMode, setPaintMode] = React.useState(false);
  const [visitView, setVisitView] = React.useState<VisitView>("today");
  const [compare, setCompare] = React.useState(false);
  const [numbering, setNumbering] = React.useState<"fdi" | "universal">("fdi");
  const [filter, setFilter] = React.useState<ChartFilter>("all");
  const [chartSize, setChartSize] = React.useState<ChartSize>("small");
  const [activeArch, setActiveArch] = React.useState<"upper" | "lower">(
    "upper"
  );
  const [past, setPast] = React.useState<Snapshot[]>([]);
  const [future, setFuture] = React.useState<Snapshot[]>([]);
  const [confirmation, setConfirmation] = React.useState<
    "discard" | "clear" | null
  >(null);
  const digitBuffer = React.useRef({ value: "", timer: 0 });

  const readOnly = visitView === "previous";
  const config: DentitionConfig = {
    dentition,
    hideThirdMolars,
    mixedSlots,
  };
  const shown = readOnly ? patient.previous : findings;
  const byTooth = groupByTooth(shown);
  const order = displayOrder(config);
  const statusCounts = countByStatus(shown);
  const unsaved = countUnsaved(
    baseline,
    findings,
    baselineMixedSlots,
    mixedSlots
  );
  const diff =
    compare && !readOnly
      ? diffVisits(patient.previous, findings)
      : diffVisits([], []);
  const activeCatalogueItem = draft.key ? CATALOGUE_BY_KEY[draft.key] : null;
  const searchResults = searchCatalogue(draft.query);
  if (selection.teeth.length && selection !== lastInspectorSelection) {
    setLastInspectorSelection(selection);
  }
  const inspectorSelection = selection.teeth.length
    ? selection
    : lastInspectorSelection;
  const inspectorSingleTooth =
    inspectorSelection.teeth.length === 1 ? inspectorSelection.teeth[0] : null;
  const inspectorTooth = inspectorSingleTooth ?? inspectorSelection.anchor;
  const inspectorSide =
    inspectorTooth && toothInfo(inspectorTooth).viewerLeft ? "right" : "left";
  const warnings = surgeryWarnings(shown, patient.alerts, "the planned teeth");

  function commit(
    nextFindings: DentalFinding[] = findings,
    nextMixedSlots: Record<ToothId, SlotState> = mixedSlots,
    message?: string
  ) {
    setPast([...past, { findings, mixedSlots }].slice(-60));
    setFuture([]);
    setFindings(nextFindings);
    setMixedSlots(nextMixedSlots);
    if (message) toast(message, { position: "top-right" });
  }

  function choosePatient(nextId: string) {
    const next = DEMO_PATIENTS.find((entry) => entry.id === nextId);
    if (!next) return;
    setPatientId(next.id);
    setDentition(next.dentition);
    setHideThirdMolars(next.hideThirdMolars);
    setMixedSlots({ ...next.mixedSlots });
    setBaselineMixedSlots({ ...next.mixedSlots });
    setFindings([...next.today]);
    setBaseline([...next.today]);
    setSelection({ teeth: [], surfaces: {}, anchor: null });
    setPaintMode(false);
    setVisitView("today");
    setCompare(false);
    setPast([]);
    setFuture([]);
    setConfirmation(null);
  }

  function undo() {
    if (readOnly || !past.length) return;
    const previous = past[past.length - 1];
    setPast(past.slice(0, -1));
    setFuture([{ findings, mixedSlots }, ...future]);
    setFindings(previous.findings);
    setMixedSlots(previous.mixedSlots);
  }

  function redo() {
    if (readOnly || !future.length) return;
    const next = future[0];
    setFuture(future.slice(1));
    setPast([...past, { findings, mixedSlots }]);
    setFindings(next.findings);
    setMixedSlots(next.mixedSlots);
  }

  function select(key: ToothId, event?: React.MouseEvent<HTMLButtonElement>) {
    if (paintMode && !readOnly) {
      applyTo([key], {});
      return;
    }
    setSelection(
      selectTooth(selection, key, order, {
        shift: event?.shiftKey,
        toggle: event?.metaKey || event?.ctrlKey,
      })
    );
  }

  function selectSurface(
    key: ToothId,
    surface: Surface,
    event?:
      | React.MouseEvent<SVGPathElement>
      | React.KeyboardEvent<SVGPathElement>
  ) {
    if (paintMode && !readOnly) {
      const info = toothInfo(key);
      applyTo([key], { [key]: normaliseSurfaces([surface], info.anterior) });
      return;
    }
    setSelection((current) =>
      toggleSurface(current, key, surface, {
        shift: event?.shiftKey,
        toggle: event?.metaKey || event?.ctrlKey,
      })
    );
  }

  function applyTo(
    teeth: ToothId[],
    perToothSurfaces: Record<ToothId, Surface[]>
  ) {
    if (!draft.key) return;
    const result = applyFinding(
      findings,
      teeth,
      perToothSurfaces,
      { ...draft, key: draft.key },
      {
        cfg: config,
        visit: DEMO_TODAY,
        by: DEMO_CLINICIAN,
        newId: () => crypto.randomUUID(),
      }
    );
    if (!result.applied.length) {
      toast(
        result.skipped.length
          ? "Choose at least one surface for this finding."
          : "No present teeth in this selection.",
        { position: "top-right" }
      );
      return;
    }
    commit(
      result.findings,
      mixedSlots,
      `Added ${activeCatalogueItem?.label.toLowerCase()} to ${result.applied.length} ${result.applied.length === 1 ? "tooth" : "teeth"}`
    );
  }

  function chooseFinding(key: string | null) {
    if (!key) {
      setDraft({ ...draft, key: null, query: "" });
      setPaintMode(false);
      return;
    }
    const item = CATALOGUE_BY_KEY[key];
    if (!item) return;
    setDraft({
      key,
      status: defaultStatusFor(item),
      surfaces: draft.surfaces,
      material: item.materials?.[0] ?? null,
      grade: item.grades?.[0] ?? null,
      query: "",
    });
  }

  function editFinding(
    id: string,
    patch: Partial<DentalFinding>,
    silent = false
  ) {
    const next = updateFinding(findings, id, patch, {
      visit: DEMO_TODAY,
      by: DEMO_CLINICIAN,
    });
    if (silent) setFindings(next);
    else commit(next);
  }

  function changeSlot(position: ToothId, value: SlotState) {
    const next = { ...mixedSlots, [position]: value };
    const tooth = value === "prim" ? primaryPredecessor(position) : position;
    commit(findings, next);
    setSelection(
      selectTooth(
        { teeth: [], surfaces: {}, anchor: null },
        tooth ?? position,
        displayOrder({ ...config, mixedSlots: next })
      )
    );
  }

  function moveSelection(direction: "left" | "right" | "up" | "down") {
    if (!selection.teeth[0]) return;
    const next = neighbour(selection.teeth[0], direction, config);
    setSelection(selectTooth(selection, next, order));
    const tile = document.querySelector<HTMLElement>(
      `[data-tooth="${next}"] button`
    );
    tile?.focus();
    if (direction === "up" || direction === "down") {
      setActiveArch(toothInfo(next).upper ? "upper" : "lower");
    }
  }

  function onChartKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const tag = target.tagName.toLowerCase();
    const typing = tag === "input" || tag === "textarea";
    const modifier = event.metaKey || event.ctrlKey;
    if (event.key === "Escape") {
      if (paintMode) setPaintMode(false);
      else if (selection.teeth.length) {
        setSelection({ teeth: [], surfaces: {}, anchor: null });
      }
      return;
    }
    if (typing) return;
    if (modifier && event.key.toLowerCase() === "z") {
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
      return;
    }
    if (modifier) return;
    if (event.key === "/") {
      event.preventDefault();
      document.getElementById("dental-finding-search")?.focus();
      return;
    }
    if (event.key.toLowerCase() === "p" && draft.key && !readOnly) {
      setPaintMode(!paintMode);
      setSelection({ teeth: [], surfaces: {}, anchor: null });
      return;
    }
    const direction = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down",
    }[event.key] as "left" | "right" | "up" | "down" | undefined;
    if (direction && target.closest("[data-tooth]")) {
      event.preventDefault();
      moveSelection(direction);
      return;
    }
    if (/^[0-9]$/.test(event.key)) {
      window.clearTimeout(digitBuffer.current.timer);
      digitBuffer.current.value += event.key;
      if (digitBuffer.current.value.length === 2) {
        const wanted = digitBuffer.current.value;
        digitBuffer.current.value = "";
        if (order.includes(wanted)) {
          setSelection(
            selectTooth(
              { teeth: [], surfaces: {}, anchor: null },
              wanted,
              order
            )
          );
          document
            .querySelector<HTMLElement>(`[data-tooth="${wanted}"] button`)
            ?.focus();
        }
      } else {
        digitBuffer.current.timer = window.setTimeout(() => {
          digitBuffer.current.value = "";
        }, 1200);
      }
    }
  }

  function save() {
    setBaseline([...findings]);
    setBaselineMixedSlots({ ...mixedSlots });
    setPast([]);
    setFuture([]);
    toast(`Saved ${unsaved} chart ${unsaved === 1 ? "change" : "changes"}`, {
      position: "top-right",
    });
  }

  function quickChoose(kind: "upper" | "lower" | 1 | 2 | 3 | 4 | "all") {
    const teeth = quickSelect(kind, config);
    setSelection({ teeth, surfaces: {}, anchor: teeth[0] ?? null });
  }

  const renderArch = (arch: "upper" | "lower") => {
    const slots = slotsFor(arch, config);
    const split = Math.ceil(slots.length / 2);
    const groups = [slots.slice(0, split), slots.slice(split)];
    const hiddenOnMobile = activeArch !== arch ? "dc-arch-mobile-hidden" : "";
    return (
      <section
        key={arch}
        className={`dc-arch ${hiddenOnMobile}`}
        aria-label={`${arch} arch`}
      >
        <div className="text-muted-foreground flex justify-between px-2 text-xs">
          <span>{arch === "upper" ? "Upper right" : "Lower right"}</span>
          <span>{arch === "upper" ? "Upper left" : "Lower left"}</span>
        </div>
        <div
          className={`dc-arch-row ${arch === "lower" ? "dc-lower-arch" : ""}`}
        >
          {groups[0].map((slot) => renderTooth(slot))}
          <span className="dc-midline" aria-hidden="true" />
          {groups[1].map((slot) => renderTooth(slot))}
        </div>
      </section>
    );
  };

  function renderTooth(slot: Slot) {
    const key = slot.tooth ?? slot.pos;
    const toothFindings = byTooth[key] ?? [];
    const summary = toothFindings.length
      ? toothFindings.map(findingLine).join("; ")
      : "No findings";
    const model = slot.tooth
      ? buildToothModel(slot.tooth, toothFindings, TOOTH_GEOMETRY)
      : null;
    return (
      <ToothTile
        key={key}
        slot={slot}
        numbering={numbering}
        model={model}
        summary={summary}
        selected={selection.teeth.includes(key)}
        selectedSurfaces={selection.surfaces[key] ?? []}
        changed={Boolean(diff.teeth[key])}
        sizeClass={SIZE_SCALE[chartSize]}
        readOnly={readOnly}
        onSelect={(event) => select(key, event)}
        onSurface={(surface, event) => selectSurface(key, surface, event)}
      />
    );
  }

  function renderFindingPicker(selection: DentalSelection) {
    const singleTooth =
      selection.teeth.length === 1 ? selection.teeth[0] : null;
    const item = activeCatalogueItem;
    if (readOnly) return null;
    const needsSurfaces = Boolean(item?.needsSurfaces);
    const hasSelectedSurface = selection.teeth.some(
      (tooth) => selection.surfaces[tooth]?.length
    );
    const canApply =
      Boolean(item) &&
      selection.teeth.length > 0 &&
      (!needsSurfaces || hasSelectedSurface || draft.surfaces.length > 0);
    const offeredSurfaces: Surface[] = ["M", "O", "I", "D", "B", "L"];
    const surfaceChoices = offeredSurfaces.filter((surface) => {
      if (!selection.teeth.length) return true;
      const anterior = selection.teeth.some(
        (tooth) => toothInfo(tooth).anterior
      );
      const posterior = selection.teeth.some(
        (tooth) => !toothInfo(tooth).anterior
      );
      return surface === "O" ? posterior : surface === "I" ? anterior : true;
    });
    return (
      <section aria-label="Add a finding" className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-semibold">Add a finding</h3>
          {singleTooth && needsSurfaces && (
            <span className="text-muted-foreground text-xs">
              {selection.surfaces[singleTooth]?.length
                ? `Surfaces: ${selection.surfaces[singleTooth].join("")}`
                : "Select surfaces on the chart"}
            </span>
          )}
        </div>
        <div className="relative">
          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <label className="sr-only" htmlFor="dental-finding-search">
            Search findings
          </label>
          <Input
            id="dental-finding-search"
            autoComplete="off"
            placeholder="Search findings"
            className="pr-10 pl-8 md:pr-10 md:pl-8"
            value={draft.query}
            onChange={(event) =>
              setDraft({ ...draft, query: event.target.value })
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                if (searchResults.length) chooseFinding(searchResults[0].key);
                else if (canApply) applyTo(selection.teeth, selection.surfaces);
              }
            }}
          />
          <Kbd
            className="absolute top-1/2 right-2 -translate-y-1/2"
            aria-hidden="true"
          >
            /
          </Kbd>
          {draft.query.trim() && (
            <div
              className="bg-popover absolute inset-x-0 top-full z-20 mt-1 rounded-md border p-1 shadow-lg"
              role="listbox"
              aria-label="Matching findings"
            >
              {searchResults.length ? (
                searchResults.map((result, index) => (
                  <Button
                    key={result.key}
                    type="button"
                    variant="tertiary"
                    size="sm"
                    role="option"
                    aria-selected={index === 0}
                    className="w-full justify-start"
                    onClick={() => chooseFinding(result.key)}
                  >
                    {result.label}
                  </Button>
                ))
              ) : (
                <p className="text-muted-foreground px-2.5 py-2 text-sm">
                  No matching finding
                </p>
              )}
            </div>
          )}
        </div>
        <ToggleGroup
          aria-label="Frequent findings"
          variant="outline"
          size="sm"
          value={draft.key ? [draft.key] : []}
          onValueChange={(next) =>
            chooseFinding((next[next.length - 1] as string) ?? null)
          }
          className="w-full flex-wrap"
        >
          {[
            "caries",
            "filling",
            "crown",
            "rct",
            "missing",
            "extraction",
            "mobility",
            "fracture",
          ].map((key) => (
            <ToggleGroupItem
              key={key}
              value={key}
              className="data-pressed:bg-foreground data-pressed:text-background px-3"
            >
              {CATALOGUE_BY_KEY[key].short ?? CATALOGUE_BY_KEY[key].label}
            </ToggleGroupItem>
          ))}
          {item &&
            ![
              "caries",
              "filling",
              "crown",
              "rct",
              "missing",
              "extraction",
              "mobility",
              "fracture",
            ].includes(item.key) && (
              <ToggleGroupItem value={item.key}>{item.label}</ToggleGroupItem>
            )}
        </ToggleGroup>
        {item && (
          <div className="bg-muted/40 flex flex-col gap-3 rounded-md border p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground w-16 text-xs font-semibold">
                Status
              </span>
              <Segmented
                label="Finding status"
                value={draft.status}
                onChange={(status) => setDraft({ ...draft, status })}
                options={item.statuses.map((status) => ({
                  value: status,
                  label: STATUS_LABEL[status],
                  title: STATUS_HELP[status],
                }))}
              />
            </div>
            {needsSurfaces && !singleTooth && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground w-16 text-xs font-semibold">
                  Surfaces
                </span>
                <ToggleGroup
                  aria-label="Surfaces to apply"
                  multiple
                  variant="outline"
                  size="sm"
                  value={draft.surfaces}
                  onValueChange={(next) =>
                    setDraft({
                      ...draft,
                      surfaces: next as Surface[],
                    })
                  }
                  className="flex-wrap"
                >
                  {surfaceChoices.map((surface) => (
                    <ToggleGroupItem key={surface} value={surface}>
                      {surface}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            )}
            {item.materials && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground w-16 text-xs font-semibold">
                  Material
                </span>
                <Segmented
                  label="Material"
                  value={draft.material ?? item.materials[0]}
                  onChange={(material) => setDraft({ ...draft, material })}
                  options={item.materials.map((material) => ({
                    value: material,
                    label: material,
                  }))}
                />
              </div>
            )}
            {item.grades && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground w-16 text-xs font-semibold">
                  Grade
                </span>
                <Segmented
                  label="Mobility grade"
                  value={draft.grade ?? item.grades[0]}
                  onChange={(grade) => setDraft({ ...draft, grade })}
                  options={item.grades.map((grade) => ({
                    value: grade,
                    label: `Grade ${grade}`,
                  }))}
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button
                disabled={!canApply}
                className="flex-1"
                onClick={() => applyTo(selection.teeth, selection.surfaces)}
              >
                {selection.teeth.length > 1
                  ? `Add to ${selection.teeth.length} teeth`
                  : `Add ${item.label.toLowerCase()}`}
              </Button>
              <Button
                variant="outline"
                title="Apply this finding to each tooth you tap (P)"
                onClick={() => {
                  setPaintMode(true);
                  setSelection({ teeth: [], surfaces: {}, anchor: null });
                }}
              >
                <Paintbrush aria-hidden="true" /> Keep applying
              </Button>
            </div>
            {needsSurfaces && !canApply && selection.teeth.length > 0 && (
              <p className="text-muted-foreground text-xs">
                Select at least one surface before adding this finding.
              </p>
            )}
          </div>
        )}
      </section>
    );
  }

  function renderFinding(finding: DentalFinding) {
    const item = CATALOGUE_BY_KEY[finding.key];
    const info = toothInfo(finding.tooth);
    const change = diff.byId[finding.id];
    const options = item?.materials ?? item?.grades;
    const optionKey = item?.materials ? "material" : "grade";
    return (
      <article
        key={finding.id}
        className="flex flex-col gap-2.5 rounded-md border p-3"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold">
              {findingTitle(finding)}
              {finding.surfaces.length > 0 && (
                <span className="ml-1 font-mono text-sm">
                  · {finding.surfaces.join("")}
                </span>
              )}
            </p>
            <p className="text-muted-foreground text-xs">
              {finding.visit} · {finding.by}
              {change === "new"
                ? " · new since last visit"
                : change === "changed"
                  ? " · changed since last visit"
                  : ""}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <StatusBadge status={finding.status} />
            {!readOnly && (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${findingTitle(finding)}`}
                onClick={() => commit(removeFinding(findings, finding.id))}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
        {!readOnly && item && (
          <>
            {item.statuses.length > 1 && (
              <Segmented
                label="Finding status"
                value={finding.status}
                onChange={(status) => editFinding(finding.id, { status })}
                options={item.statuses.map((status) => ({
                  value: status,
                  label: STATUS_LABEL[status],
                  title: STATUS_HELP[status],
                }))}
              />
            )}
            {item.needsSurfaces && (
              <ToggleGroup
                aria-label="Finding surfaces"
                multiple
                variant="outline"
                size="sm"
                value={finding.surfaces}
                onValueChange={(next) => {
                  if (!next.length) {
                    toast("A surface finding needs at least one surface.", {
                      position: "top-right",
                    });
                    return;
                  }
                  editFinding(finding.id, {
                    surfaces: normaliseSurfaces(next, info.anterior),
                  });
                }}
                className="flex-wrap"
              >
                {["M", info.anterior ? "I" : "O", "D", "B", "L"].map(
                  (surface) => (
                    <ToggleGroupItem
                      key={surface}
                      value={surface}
                      title={surfaceName(surface as Surface, info)}
                    >
                      {surface}
                    </ToggleGroupItem>
                  )
                )}
              </ToggleGroup>
            )}
            {options && (
              <Segmented
                label={item.materials ? "Material" : "Grade"}
                value={(finding[optionKey] as string | null) ?? options[0]}
                onChange={(value) =>
                  editFinding(finding.id, { [optionKey]: value })
                }
                options={options.map((option) => ({
                  value: option,
                  label: item.materials ? option : `Grade ${option}`,
                }))}
              />
            )}
            <label className="sr-only" htmlFor={`dental-note-${finding.id}`}>
              Note for {findingTitle(finding)}
            </label>
            <Textarea
              id={`dental-note-${finding.id}`}
              rows={2}
              placeholder="Add a note"
              value={finding.note}
              onChange={(event) =>
                editFinding(finding.id, { note: event.target.value }, true)
              }
            />
          </>
        )}
        {readOnly && finding.note && <p className="text-sm">{finding.note}</p>}
      </article>
    );
  }

  function renderChartSummary() {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-base font-semibold">Chart summary</h2>
          <p className="text-muted-foreground text-sm">
            {shown.length} findings · {patient.name}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {STATUS_ORDER.map((status) => (
            <Button
              key={status}
              type="button"
              variant="outline"
              onClick={() => setFilter(status)}
              className="h-auto flex-col items-start gap-1 p-3 text-left md:h-auto"
            >
              <span className="text-2xl font-semibold tabular-nums">
                {statusCounts[status]}
              </span>
              <StatusBadge status={status} />
            </Button>
          ))}
        </div>
        {warnings.map((warning) => (
          <Alert key={warning} variant="warning">
            <TriangleAlert aria-hidden="true" />
            <AlertDescription>{warning}</AlertDescription>
          </Alert>
        ))}
        <section aria-label="Chart legend" className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-xs font-semibold uppercase">
            Legend
          </h3>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
            {STATUS_ORDER.map((status) => (
              <span key={status} className="flex items-center gap-2">
                <StatusSwatch status={status} />
                {status === "completed"
                  ? "Completed today"
                  : STATUS_LABEL[status]}
              </span>
            ))}
            <span className="flex items-center gap-2">
              <span className="dc-status-swatch dc-cross-swatch" /> Missing
            </span>
            <span className="flex items-center gap-2">
              <span className="dc-mini-badge">M2</span> Mobility grade
            </span>
            <span className="flex items-center gap-2">
              <span className="dc-change-dot" /> Changed since last visit
            </span>
          </div>
        </section>
        <section
          aria-label="Keyboard shortcuts"
          className="flex flex-col gap-2"
        >
          <h3 className="text-muted-foreground text-xs font-semibold uppercase">
            Keyboard
          </h3>
          <dl className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1.5 text-sm">
            <dt>
              <Kbd>←</Kbd> <Kbd>→</Kbd>
            </dt>
            <dd>Move between teeth</dd>
            <dt>
              <Kbd>↑</Kbd> <Kbd>↓</Kbd>
            </dt>
            <dd>Switch arch</dd>
            <dt>
              <Kbd>/</Kbd>
            </dt>
            <dd>Search findings</dd>
            <dt>
              <Kbd>P</Kbd>
            </dt>
            <dd>Keep applying</dd>
            <dt>
              <Kbd>Esc</Kbd>
            </dt>
            <dd>Stop or clear selection</dd>
          </dl>
        </section>
      </div>
    );
  }

  function renderInspector(selection: DentalSelection) {
    if (!selection.teeth.length) return null;
    const singleTooth =
      selection.teeth.length === 1 ? selection.teeth[0] : null;

    if (singleTooth) {
      const info = toothInfo(singleTooth);
      const present = isPresent(singleTooth, config);
      const toothFindings = [...(byTooth[singleTooth] ?? [])].sort(
        (left, right) =>
          STATUS_ORDER.indexOf(left.status) - STATUS_ORDER.indexOf(right.status)
      );
      const model = present
        ? buildToothModel(singleTooth, toothFindings, TOOTH_GEOMETRY)
        : null;
      const index = order.indexOf(singleTooth);
      const currentSlot = mixedSlots[positionOf(singleTooth)] ?? "perm";
      const lastVisit = patient.previous.filter(
        (finding) => finding.tooth === singleTooth
      );
      return (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Previous tooth"
              disabled={index <= 0}
              onClick={() => moveSelection("left")}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <div className="min-w-0 flex-1 text-center">
              <p className="font-mono text-2xl font-semibold tabular-nums">
                {toothLabel(singleTooth, numbering)}
              </p>
              <p className="truncate text-sm">{info.name}</p>
              <p className="text-muted-foreground text-xs">
                {numbering === "universal"
                  ? `FDI ${singleTooth}`
                  : `Universal ${toothLabel(singleTooth, "universal")}`}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Next tooth"
              disabled={index >= order.length - 1}
              onClick={() => moveSelection("right")}
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
          {model ? (
            <div className="bg-muted/30 flex flex-col items-center gap-3 rounded-md border p-3">
              <div className="text-muted-foreground flex w-full items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <ZoomIn className="size-3.5" aria-hidden="true" /> Surface map
                </span>
                <span>{readOnly ? "Read-only" : "Select surfaces"}</span>
              </div>
              <div className="flex w-full flex-wrap items-center justify-center gap-4">
                <OcclusalDrawing
                  model={model}
                  large
                  selected={selection.surfaces[singleTooth] ?? []}
                  interactive={!readOnly}
                  onSurface={(surface, event) =>
                    selectSurface(singleTooth, surface, event)
                  }
                />
                <SideDrawing model={model} className="dc-inspector-side" />
              </div>
              {!readOnly && (
                <ToggleGroup
                  aria-label="Selected tooth surfaces"
                  multiple
                  variant="outline"
                  size="sm"
                  value={selection.surfaces[singleTooth] ?? []}
                  onValueChange={(next) =>
                    setSelection({
                      ...selection,
                      surfaces: next.length
                        ? {
                            ...selection.surfaces,
                            [singleTooth]: normaliseSurfaces(
                              next,
                              info.anterior
                            ),
                          }
                        : Object.fromEntries(
                            Object.entries(selection.surfaces).filter(
                              ([key]) => key !== singleTooth
                            )
                          ),
                    })
                  }
                  className="flex-wrap justify-center"
                >
                  {["M", info.anterior ? "I" : "O", "D", "B", "L"].map(
                    (surface) => (
                      <ToggleGroupItem
                        key={surface}
                        value={surface}
                        aria-label={surfaceName(surface as Surface, info)}
                        className="min-w-11 flex-col gap-0 py-1"
                      >
                        <span className="font-mono text-sm font-semibold">
                          {surface}
                        </span>
                        <span className="text-[10px] font-normal opacity-80">
                          {surfaceName(surface as Surface, info)}
                        </span>
                      </ToggleGroupItem>
                    )
                  )}
                </ToggleGroup>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground rounded-md border border-dashed p-6 text-center text-sm">
              Not erupted. Update the tooth in this position when it emerges.
            </p>
          )}
          {dentition === "mixed" && !info.primary && info.position <= 5 && (
            <section
              className="flex flex-col gap-2"
              aria-label="Tooth in position"
            >
              <h3 className="text-muted-foreground text-xs font-semibold uppercase">
                Tooth in this position
              </h3>
              <Segmented
                label="Tooth in this position"
                disabled={readOnly}
                value={currentSlot}
                onChange={(value) => changeSlot(positionOf(singleTooth), value)}
                options={[
                  ...(primaryPredecessor(positionOf(singleTooth))
                    ? [
                        {
                          value: "prim" as SlotState,
                          label: `Primary ${toothLabel(primaryPredecessor(positionOf(singleTooth))!, numbering)}`,
                        },
                      ]
                    : []),
                  {
                    value: "perm" as SlotState,
                    label: `Permanent ${toothLabel(positionOf(singleTooth), numbering)}`,
                  },
                  { value: "none" as SlotState, label: "Not erupted" },
                ]}
              />
            </section>
          )}
          {surgeryWarnings(
            toothFindings,
            patient.alerts,
            `tooth ${toothLabel(singleTooth, numbering)}`
          ).map((warning) => (
            <Alert key={warning} variant="warning">
              <TriangleAlert aria-hidden="true" />
              <AlertDescription>{warning}</AlertDescription>
            </Alert>
          ))}
          {present && renderFindingPicker(selection)}
          <section
            aria-label="Findings on this tooth"
            className="flex flex-col gap-2"
          >
            <h3 className="text-muted-foreground text-xs font-semibold uppercase">
              Findings on this tooth
            </h3>
            {toothFindings.length ? (
              toothFindings.map(renderFinding)
            ) : (
              <p className="text-muted-foreground text-sm">
                {readOnly ? "No findings at this visit." : "None recorded."}
              </p>
            )}
          </section>
          {lastVisit.length > 0 && !readOnly && (
            <section aria-label="Last visit" className="flex flex-col gap-2">
              <h3 className="text-muted-foreground text-xs font-semibold uppercase">
                Last visit · {patient.previousVisit}
              </h3>
              {lastVisit.map((finding) => (
                <div
                  key={finding.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <StatusBadge status={finding.status} />
                  <span>{findingLine(finding)}</span>
                </div>
              ))}
            </section>
          )}
        </div>
      );
    }

    const selected = selection.teeth;
    const selectedFindings = selected.flatMap((tooth) =>
      (byTooth[tooth] ?? []).map((finding) => ({ tooth, finding }))
    );
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold">
              {selected.length} teeth selected
            </h2>
            <p className="text-muted-foreground text-sm">
              Apply a finding to the selection.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setSelection({ teeth: [], surfaces: {}, anchor: null })
            }
          >
            Clear
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {selected.map((tooth) => (
            <Button
              key={tooth}
              type="button"
              variant="outline"
              size="xs"
              className="font-mono"
              aria-label={`Open tooth ${toothLabel(tooth, numbering)}`}
              onClick={() =>
                setSelection(
                  selectTooth(
                    { teeth: [], surfaces: {}, anchor: null },
                    tooth,
                    order
                  )
                )
              }
            >
              {toothLabel(tooth, numbering)}
            </Button>
          ))}
        </div>
        {renderFindingPicker(selection)}
        <section
          aria-label="Findings on selected teeth"
          className="flex flex-col gap-2"
        >
          <h3 className="text-muted-foreground text-xs font-semibold uppercase">
            Current findings
          </h3>
          {selectedFindings.length ? (
            selectedFindings.map(({ tooth, finding }) => (
              <div key={finding.id} className="flex items-center gap-2 text-sm">
                <span className="w-8 font-mono font-semibold">
                  {toothLabel(tooth, numbering)}
                </span>
                <span className="flex-1">{findingLine(finding)}</span>
                <StatusBadge status={finding.status} />
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              No findings on these teeth.
            </p>
          )}
        </section>
      </div>
    );
  }

  const rows = shown
    .filter((finding) => filter === "all" || finding.status === filter)
    .map((finding) => ({ finding, removed: false }));
  if (compare && !readOnly) {
    diff.removed.forEach((finding) => {
      if (filter === "all" || finding.status === filter) {
        rows.push({ finding, removed: true });
      }
    });
  }
  const rowOrder = new Map(
    sortByChart(
      [...new Set(rows.map(({ finding }) => finding.tooth))],
      config
    ).map((tooth, index) => [tooth, index])
  );
  rows.sort(
    (left, right) =>
      (rowOrder.get(left.finding.tooth) ?? 999) -
        (rowOrder.get(right.finding.tooth) ?? 999) ||
      STATUS_ORDER.indexOf(left.finding.status) -
        STATUS_ORDER.indexOf(right.finding.status)
  );

  return (
    <div
      className="dental-chart bg-background text-foreground flex min-h-full flex-col"
      onKeyDown={onChartKeyDown}
    >
      <style>{`
        .dental-chart {
          --dc-condition: oklch(0.55 0.2 27);
          --dc-existing: oklch(0.43 0 0);
          --dc-planned: oklch(0.54 0.18 252);
          --dc-planned-bg: oklch(0.93 0.04 252);
          --dc-completed: oklch(0.5 0.15 160);
          --dc-tooth: var(--background);
          --dc-tooth-stroke: var(--muted-foreground);
          --dc-detail: var(--border);
          --dc-selection: var(--ring);
          --dc-changed: oklch(0.68 0.16 65);
        }
        .dental-chart svg { display: block; overflow: visible; }
        .dc-outline { fill: var(--dc-tooth); stroke: var(--dc-tooth-stroke); stroke-width: 0.7; }
        .dc-detail { fill: none; stroke: var(--dc-detail); stroke-width: 0.55; }
        .dc-pulp { fill: oklch(0.84 0.06 30); stroke: none; }
        .dc-fill-condition { fill: var(--dc-condition); fill-opacity: 0.92; }
        .dc-fill-existing { fill: var(--dc-existing); fill-opacity: 0.88; }
        .dc-fill-planned { fill: url(#dc-planned-hatch); stroke: var(--dc-planned); stroke-width: 0.9; stroke-dasharray: 2 1.4; }
        .dc-fill-completed { fill: var(--dc-completed); fill-opacity: 0.92; }
        .dc-implant-threads { fill: none; stroke: var(--background); stroke-width: 0.9; }
        .dc-fracture { fill: none; stroke: var(--dc-condition); stroke-width: 1.6; stroke-linecap: round; }
        .dc-cross { fill: none; stroke-width: 2.6; stroke-linecap: round; }
        .dc-cross-missing { stroke: var(--dc-existing); }
        .dc-cross-planned { stroke: var(--dc-planned); stroke-dasharray: 5 3.5; }
        .dc-cross-completed { stroke: var(--dc-completed); }
        .dc-crown-ring { fill: none; stroke-width: 2.4; }
        .dc-surface { fill: transparent; stroke: var(--dc-tooth-stroke); stroke-width: 0.45; cursor: pointer; outline: none; }
        .dc-surface.dc-fill-condition { fill: var(--dc-condition); fill-opacity: 0.9; }
        .dc-surface.dc-fill-existing { fill: var(--dc-existing); fill-opacity: 0.84; }
        .dc-surface.dc-fill-planned { fill: url(#dc-planned-hatch); stroke: var(--dc-planned); stroke-dasharray: 2 1.4; }
        .dc-surface.dc-fill-completed { fill: var(--dc-completed); fill-opacity: 0.9; }
        .dc-surface.dc-selected { stroke: var(--dc-selection); stroke-width: 1.7; }
        .dc-surface.dc-readonly { cursor: default; }
        .dc-surface:focus-visible { stroke: var(--dc-selection); stroke-width: 1.7; }
        .dc-surface-label { fill: var(--foreground); font-family: var(--font-geist-mono), ui-monospace, monospace; font-weight: 600; pointer-events: none; paint-order: stroke; stroke: var(--dc-tooth); stroke-width: 0.9; }
        .dc-arch-row { display: flex; align-items: stretch; justify-content: center; gap: 0.125rem; min-width: max-content; }
        .dc-tooth-tile { position: relative; display: flex; width: calc(3.5rem * var(--tooth-scale)); flex: 0 0 auto; flex-direction: column; align-items: center; gap: 0.15rem; padding: 0.25rem 0; border-radius: 0.375rem; }
        .dc-tooth-selected { background: color-mix(in oklch, var(--primary) 12%, transparent); box-shadow: inset 0 0 0 2px var(--dc-selection); }
        .dc-tooth-select { display: flex; width: 100%; min-height: calc(8.8rem * var(--tooth-scale)); flex-direction: column; align-items: center; gap: 0.15rem; border: 0; background: transparent; color: inherit; cursor: pointer; }
        .dc-tooth-select:focus-visible { outline: 2px solid var(--dc-selection); outline-offset: 2px; }
        .dc-tooth-number { order: 1; display: inline-flex; height: 1.1rem; align-items: center; gap: 0.12rem; font-family: var(--font-geist-mono), ui-monospace, monospace; font-size: 0.75rem; font-variant-numeric: tabular-nums; color: var(--muted-foreground); }
        .dc-tooth-selected .dc-tooth-number { color: var(--foreground); font-weight: 600; }
        .dc-tooth-badges { order: 2; display: flex; min-height: 1rem; gap: 0.12rem; }
        .dc-mini-badge { display: inline-flex; align-items: center; border-radius: 0.2rem; background: var(--muted); padding: 0 0.25rem; font-size: 0.625rem; font-weight: 700; line-height: 1rem; }
        .dc-side-drawing { order: 3; height: calc(6.2rem * var(--tooth-scale)); width: calc(3.5rem * var(--tooth-scale)); object-fit: contain; }
        .dc-small-occlusal { width: calc(3.1rem * var(--tooth-scale)); height: calc(2.3rem * var(--tooth-scale)); }
        .dc-lower-arch .dc-tooth-select { order: 2; flex-direction: column-reverse; }
        .dc-lower-arch .dc-tooth-number { order: 3; }
        .dc-lower-arch .dc-tooth-badges { order: 4; }
        .dc-lower-arch .dc-small-occlusal { order: 1; }
        .dc-midline { width: 2px; margin: 0 0.4rem; background: repeating-linear-gradient(var(--border) 0 4px, transparent 4px 8px); }
        .dc-empty-tooth { width: 2.1rem; height: calc(5rem * var(--tooth-scale)); margin-top: 2rem; border: 1.5px dashed var(--border); border-radius: 0.5rem; }
        .dc-empty-occlusal { width: 1.9rem; height: 1.5rem; border: 1.5px dashed var(--border); border-radius: 50%; }
        .dc-change-dot { position: absolute; top: 0.2rem; right: 0.25rem; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--dc-changed); box-shadow: 0 0 0 2px var(--card); }
        .dc-status-swatch { display: inline-block; width: 1.1rem; height: 1.1rem; flex: 0 0 auto; border: 1px solid var(--border); border-radius: 0.2rem; }
        .dc-status-swatch.dc-fill-condition { background: var(--dc-condition); }
        .dc-status-swatch.dc-fill-existing { background: var(--dc-existing); }
        .dc-status-swatch.dc-fill-planned { background: repeating-linear-gradient(135deg, var(--dc-planned-bg) 0 3px, var(--dc-planned) 3px 4px); border: 1px dashed var(--dc-planned); }
        .dc-status-swatch.dc-fill-completed { background: var(--dc-completed); }
        .dc-cross-swatch { background: linear-gradient(45deg, transparent 45%, var(--dc-existing) 46% 54%, transparent 55%), linear-gradient(-45deg, transparent 45%, var(--dc-existing) 46% 54%, transparent 55%); }
        .dc-inspector-side { width: 4.5rem; height: 9rem; }
        .dc-large-occlusal { width: min(13rem, 60vw); height: auto; }
        @media (max-width: 1023px) { .dc-arch-mobile-hidden { display: none; } }
        @media (prefers-reduced-motion: no-preference) { .dc-tooth-tile { transition: background-color 120ms ease, box-shadow 120ms ease; } }
        @media (forced-colors: active) { .dc-fill-planned { stroke-dasharray: 2 1.4; } .dc-tooth-select:focus-visible, .dc-surface:focus-visible { outline: 2px solid CanvasText; } }
      `}</style>
      <svg className="absolute size-0" aria-hidden="true" focusable="false">
        <defs>
          <pattern
            id="dc-planned-hatch"
            patternUnits="userSpaceOnUse"
            width="3"
            height="3"
            patternTransform="rotate(45)"
          >
            <rect width="3" height="3" fill="var(--dc-planned-bg)" />
            <rect width="1.2" height="3" fill="var(--dc-planned)" />
          </pattern>
        </defs>
      </svg>
      <header className="bg-card flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs font-semibold uppercase">
              Visit
            </span>
            <Tabs
              value={visitView}
              onValueChange={(value) => {
                if (value !== "today" && value !== "previous") return;
                setVisitView(value);
                setSelection({ teeth: [], surfaces: {}, anchor: null });
                setPaintMode(false);
                if (value === "previous") setCompare(false);
              }}
            >
              <TabsList aria-label="Visit">
                <TabsTrigger value="today">Today · 12 Oct 2026</TabsTrigger>
                <TabsTrigger value="previous">
                  {patient.previousVisit}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <Switch
              checked={compare && !readOnly}
              disabled={readOnly}
              onCheckedChange={setCompare}
            />
            Compare visits
          </label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs font-semibold uppercase">
              Demo patient
            </span>
            <Segmented
              label="Demo patient"
              value={patientId}
              onChange={choosePatient}
              options={DEMO_PATIENTS.map((entry) => ({
                value: entry.id,
                label: entry.label,
              }))}
            />
          </div>
        </div>
      </header>

      <section
        aria-label="Dental chart workspace"
        className="flex flex-1 flex-wrap items-start gap-4 px-4 py-4 sm:px-6"
      >
        <div className="flex min-w-0 flex-[999_1_640px] flex-col gap-4">
          {readOnly && (
            <Alert variant="info">
              <AlertDescription className="flex flex-wrap items-center justify-between gap-2">
                <span>
                  Viewing {patient.previousVisit}. This visit is read-only.
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setVisitView("today")}
                >
                  Back to today
                </Button>
              </AlertDescription>
            </Alert>
          )}
          {paintMode && activeCatalogueItem && !readOnly && (
            <Alert variant="info">
              <Paintbrush aria-hidden="true" />
              <AlertDescription className="flex flex-wrap items-center justify-between gap-2">
                <span>
                  Applying {activeCatalogueItem.label.toLowerCase()} ·{" "}
                  {STATUS_LABEL[draft.status]}. Select teeth or surfaces.
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPaintMode(false)}
                >
                  Done
                </Button>
              </AlertDescription>
            </Alert>
          )}
          <Card className="gap-0 py-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs font-semibold uppercase">
                  Dentition
                </span>
                <Tabs
                  value={dentition}
                  onValueChange={(value) => {
                    if (
                      value !== "permanent" &&
                      value !== "mixed" &&
                      value !== "primary"
                    )
                      return;
                    setDentition(value);
                    setSelection({ teeth: [], surfaces: {}, anchor: null });
                  }}
                >
                  <TabsList aria-label="Dentition">
                    <TabsTrigger value="permanent" disabled={readOnly}>
                      Permanent
                    </TabsTrigger>
                    <TabsTrigger value="mixed" disabled={readOnly}>
                      Mixed
                    </TabsTrigger>
                    <TabsTrigger value="primary" disabled={readOnly}>
                      Primary
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div
                className="flex flex-wrap items-center gap-1"
                role="group"
                aria-label="Quick select teeth"
              >
                <span className="text-muted-foreground mr-1 text-xs font-semibold uppercase">
                  Select
                </span>
                {(
                  [
                    ["Upper", "upper"],
                    ["Lower", "lower"],
                    ["Q1", 1],
                    ["Q2", 2],
                    ["Q3", 3],
                    ["Q4", 4],
                    ["All", "all"],
                  ] as const
                ).map(([label, kind]) => (
                  <Button
                    key={label}
                    variant="outline"
                    size="sm"
                    disabled={readOnly}
                    title={
                      label === "All" ? "All present teeth" : `Select ${label}`
                    }
                    onClick={() => quickChoose(kind)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <Switch
                  checked={hideThirdMolars}
                  disabled={readOnly}
                  onCheckedChange={(checked) => {
                    setHideThirdMolars(checked);
                    setSelection({ teeth: [], surfaces: {}, anchor: null });
                  }}
                />
                Hide third molars
              </label>
              <div className="ml-auto flex flex-wrap items-center gap-2">
                <Segmented
                  label="Chart size"
                  value={chartSize}
                  onChange={setChartSize}
                  options={[
                    {
                      value: "small" as ChartSize,
                      label: "S",
                      title: "Small teeth",
                    },
                    {
                      value: "medium" as ChartSize,
                      label: "M",
                      title: "Medium teeth",
                    },
                    {
                      value: "large" as ChartSize,
                      label: "L",
                      title: "Large teeth",
                    },
                  ]}
                />
                <Segmented
                  label="Numbering system"
                  value={numbering}
                  onChange={setNumbering}
                  options={[
                    { value: "fdi" as const, label: "FDI" },
                    { value: "universal" as const, label: "Universal" },
                  ]}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label="Undo"
                      disabled={readOnly || !past.length}
                      onClick={undo}
                    >
                      <Undo2 aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Undo · Ctrl/Cmd Z</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label="Redo"
                      disabled={readOnly || !future.length}
                      onClick={redo}
                    >
                      <Redo2 aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Redo · Shift Ctrl/Cmd Z</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 pt-3 lg:hidden">
              <Segmented
                label="Dental arch"
                value={activeArch}
                onChange={setActiveArch}
                options={[
                  { value: "upper" as const, label: "Upper" },
                  { value: "lower" as const, label: "Lower" },
                ]}
              />
            </div>
            <div className="overflow-x-auto px-4 pt-3 pb-4">
              <div className="flex w-max min-w-full justify-center">
                <div className="flex flex-col gap-1">
                  <div className="text-muted-foreground flex justify-between text-xs font-semibold uppercase">
                    <span>Patient’s right</span>
                    <span>Patient’s left</span>
                  </div>
                  {renderArch("upper")}
                  <div
                    className="my-1 border-t border-dashed max-lg:hidden"
                    aria-hidden="true"
                  />
                  {renderArch("lower")}
                </div>
              </div>
            </div>
          </Card>

          <section aria-label="Chart summary" className="px-4 py-4">
            {renderChartSummary()}
          </section>

          <Card className="gap-0 py-0">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <h2 className="text-base font-semibold">Findings by tooth</h2>
              <Tabs
                value={filter}
                onValueChange={(value) => setFilter(value as ChartFilter)}
              >
                <TabsList>
                  <TabsTrigger value="all">
                    All{" "}
                    <span className="font-mono text-xs opacity-70">
                      {shown.length}
                    </span>
                  </TabsTrigger>
                  {STATUS_ORDER.map((status) => (
                    <TabsTrigger key={status} value={status}>
                      {STATUS_LABEL[status]}{" "}
                      <span className="font-mono text-xs opacity-70">
                        {statusCounts[status]}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">Tooth</TableHead>
                    <TableHead>Finding</TableHead>
                    <TableHead>Surfaces</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-4">Recorded</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map(({ finding, removed }) => {
                    const change = removed ? "removed" : diff.byId[finding.id];
                    const info = toothInfo(finding.tooth);
                    return (
                      <TableRow
                        key={`${finding.id}${removed ? "-removed" : ""}`}
                        tabIndex={0}
                        data-state={
                          selection.teeth.includes(finding.tooth)
                            ? "selected"
                            : undefined
                        }
                        className={
                          removed
                            ? "cursor-pointer opacity-60"
                            : "cursor-pointer"
                        }
                        onClick={() =>
                          setSelection(
                            selectTooth(
                              { teeth: [], surfaces: {}, anchor: null },
                              finding.tooth,
                              order
                            )
                          )
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            setSelection(
                              selectTooth(
                                { teeth: [], surfaces: {}, anchor: null },
                                finding.tooth,
                                order
                              )
                            );
                          }
                        }}
                      >
                        <TableCell className="pl-4">
                          <span className="font-mono font-semibold">
                            {toothLabel(finding.tooth, numbering)}
                          </span>{" "}
                          <span className="text-muted-foreground text-xs">
                            {info.shortName}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-normal">
                          {findingTitle(finding)}
                          {finding.note && (
                            <span className="text-muted-foreground">
                              {" "}
                              · {finding.note}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="font-mono">
                          {finding.surfaces.join("") || "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <StatusBadge status={finding.status} />
                            {change && (
                              <Badge
                                variant={
                                  change === "removed" ? "neutral" : "orange"
                                }
                                size="sm"
                              >
                                {change === "new"
                                  ? "New"
                                  : change === "changed"
                                    ? "Changed"
                                    : "Resolved"}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground pr-4 text-xs">
                          {finding.visit} · {finding.by}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {!rows.length && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-muted-foreground py-6 text-center"
                      >
                        {filter === "all"
                          ? "No findings yet."
                          : `No ${STATUS_LABEL[filter].toLowerCase()} findings.`}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        <Sheet
          modal={false}
          open={selection.teeth.length > 0}
          onOpenChange={(open) => {
            if (!open) setSelection({ teeth: [], surfaces: {}, anchor: null });
          }}
        >
          <SheetContent
            side={inspectorSide}
            overlay={false}
            className="dental-chart max-w-3/4 sm:max-w-sm"
          >
            <SheetHeader>
              <SheetTitle>
                {inspectorSingleTooth
                  ? `Tooth ${toothLabel(inspectorSingleTooth, numbering)}`
                  : `${inspectorSelection.teeth.length} teeth`}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Tooth details and findings
              </SheetDescription>
            </SheetHeader>
            <SheetBody className="overflow-y-auto">
              {renderInspector(inspectorSelection)}
            </SheetBody>
          </SheetContent>
        </Sheet>
      </section>

      <footer className="bg-card sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 sm:px-6">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span
            className={`size-2 rounded-full ${unsaved ? "bg-amber-500" : "bg-muted-foreground/40"}`}
            aria-hidden="true"
          />
          {readOnly
            ? "Read-only visit"
            : unsaved
              ? `${unsaved} unsaved ${unsaved === 1 ? "change" : "changes"}`
              : "All changes saved"}
        </span>
        {confirmation && !readOnly ? (
          <div
            className="flex flex-wrap items-center gap-2"
            role="alertdialog"
            aria-label="Confirm chart action"
          >
            <span className="text-sm font-semibold">
              {confirmation === "clear"
                ? "Remove every finding from this chart?"
                : `Discard ${unsaved} unsaved ${unsaved === 1 ? "change" : "changes"}?`}
            </span>
            <Button variant="outline" onClick={() => setConfirmation(null)}>
              Keep editing
            </Button>
            <Button
              variant="destructive-solid"
              onClick={() => {
                if (confirmation === "clear") {
                  setConfirmation(null);
                  commit([], mixedSlots, "Chart cleared");
                  setSelection({ teeth: [], surfaces: {}, anchor: null });
                } else {
                  setConfirmation(null);
                  setFindings([...baseline]);
                  setMixedSlots({ ...baselineMixedSlots });
                  setPast([]);
                  setFuture([]);
                  setSelection({ teeth: [], surfaces: {}, anchor: null });
                }
              }}
            >
              {confirmation === "clear" ? "Clear chart" : "Discard"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="ghost"
              disabled={readOnly || !findings.length}
              onClick={() => setConfirmation("clear")}
            >
              <X aria-hidden="true" /> Clear chart
            </Button>
            <Button
              variant="outline"
              disabled={readOnly || !unsaved}
              onClick={() => setConfirmation("discard")}
            >
              Discard
            </Button>
            <Button disabled={readOnly || !unsaved} onClick={save}>
              Save
            </Button>
          </div>
        )}
      </footer>
    </div>
  );
}
