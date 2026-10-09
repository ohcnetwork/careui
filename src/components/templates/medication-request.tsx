import * as React from "react";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  ArrowLeftRight,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleDot,
  CircleMinus,
  ClipboardList,
  Folder,
  History,
  ListFilter,
  Package,
  Pill,
  PillBottle,
  Plus,
  Search,
  Salad,
  ShieldPlus,
  Settings2,
  Star,
  Syringe,
  SquarePen,
  Trash2,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxCollection,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { DataTable, DataTableRowActions } from "@/components/ui/data-table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface DoseLine {
  id: string;
  dosage: string;
  schedule: string | null;
  duration: string | null;
  instructions: string[];
  route: string;
  site: string | null;
  method: string | null;
  asNeeded: boolean;
  prnReasons: string[];
}

interface MedicationRequest {
  id: string;
  medicine: string;
  doses: DoseLine[];
  note: string;
  intent: string;
  authoredOn: string;
  requester: string | null;
}

interface MedicationOptionsTarget {
  medicationId: string;
  doseId: string;
}

interface VaccinationRequest {
  id: string;
  vaccine: string;
  dose: string;
  doseAmount: string;
  route: string;
  site: string;
  plannedDate: string;
  indication: string;
}

const SCHEDULES = [
  { value: "1-0-1", description: "Twice a day" },
  { value: "1-1-1", description: "Thrice a day" },
  { value: "1-0-0", description: "Morning only" },
  { value: "0-0-1", description: "Night only" },
  { value: "0-1-0", description: "Noon only" },
  { value: "1-1-0", description: "Morning & Noon" },
  { value: "0-1-1", description: "Noon & Night" },
  { value: "1-1-1-1", description: "Four times a day" },
  { value: "SOS", description: "As needed" },
  { value: "STAT", description: "Immediately" },
  { value: "QD", description: "Once a day" },
  { value: "QOD", description: "Alternate days" },
  { value: "Q6H", description: "Every 6 hours" },
  { value: "Q8H", description: "Every 8 hours" },
  { value: "Q12H", description: "Every 12 hours" },
  { value: "BED", description: "0-0-1" },
  { value: "WK", description: "Weekly" },
];

const SCHEDULE_VALUES = SCHEDULES.map((schedule) => schedule.value);
const SCHEDULE_DESCRIPTIONS = new Map(
  SCHEDULES.map((schedule) => [schedule.value, schedule.description])
);

const PRN_SCHEDULE = "SOS";

function getPrimaryShortcutModifier(): "Meta" | "Control" {
  if (typeof navigator === "undefined") return "Control";
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform) ? "Meta" : "Control";
}

const PRN_REASONS = [
  "Chronic nontraumatic intracranial subdural haematoma",
  "Adenosine deaminase 2 deficiency",
  "Malignant melanoma of skin of left wrist",
  "Small bowel enteroscopy normal",
  "Renal scarring due to vesicoureteral reflux",
  "Venous ulcer of toe of left foot",
  "Acquired arteriovenous malformation of vascular structure of gastrointestinal tract",
  "Chronic respiratory failure due to obstructive sleep apnoea",
  "Venous ulcer of left ankle",
  "Pain",
  "Fever",
  "Nausea and vomiting",
  "Breathlessness",
  "Anxiety",
  "Insomnia",
];

const DEFAULT_FAVORITE_PRN_REASONS = ["Pain", "Fever", "Nausea and vomiting"];

const DURATIONS = [
  "3 days",
  "5 days",
  "7 days",
  "10 days",
  "14 days",
  "1 month",
];

const DURATION_UNITS = ["hour", "day", "week", "month", "year"];

const DAY_RANGE_PATTERN = /^Day (\d+)–(\d+)$/;

const DOSE_UNITS = [
  "tablets",
  "gram",
  "milligram",
  "microgram",
  "milliliter",
  "drop",
  "international unit",
  "count",
];

const INSTRUCTIONS = [
  "Before food",
  "After food",
  "With food",
  "At bedtime",
  "Until symptoms improve",
  "Until next appointment",
  "Take on an empty stomach",
  "Use with caution",
  "Then stop",
  "Until finished",
  "Follow directions",
  "Then discontinue",
  "Until gone",
  "To be spread thinly",
  "Avoid alcohol",
];

const DEFAULT_FAVORITE_INSTRUCTIONS = [
  "After food",
  "Before food",
  "At bedtime",
];

const ROUTES = [
  "Oral",
  "Intravenous",
  "Intramuscular",
  "Subcutaneous",
  "Sublingual",
];

const MEDICATION_SITES = [
  "Left arm",
  "Right arm",
  "Left deltoid",
  "Right deltoid",
  "Left thigh",
  "Right thigh",
];

const ADMINISTRATION_METHODS = [
  "Swallow",
  "Dissolve under the tongue",
  "IV push over 30 seconds",
  "IV infusion",
  "Injection",
];

const MEDICATION_INTENTS = ["Order", "Plan", "Proposal", "Original order"];

const MEDICINE_CATALOG = [
  "Morphine sulfate 15 mg oral tablet",
  "Paracetamol 500 mg oral tablet",
  "Amoxicillin 500 mg oral capsule",
  "Pantoprazole 40 mg oral tablet",
  "Ondansetron 4 mg oral tablet",
  "Metformin 500 mg oral tablet",
  "Atorvastatin 10 mg oral tablet",
  "Cetirizine 10 mg oral tablet",
];

type MedicationSource = "Personal" | "Formulary" | "Org" | "Catalog";
type MedicationProductType =
  | "Medication"
  | "Nutritional Product"
  | "Consumable";
type MedicationForm =
  | "tablet"
  | "capsule"
  | "sachet"
  | "powder"
  | "medicalDevice"
  | "protectiveEquipment";

const MEDICATION_FORM_ICONS = {
  tablet: CircleDot,
  capsule: Pill,
  sachet: Package,
  powder: Salad,
  medicalDevice: Syringe,
  protectiveEquipment: ShieldPlus,
} satisfies Record<MedicationForm, typeof CircleDot>;

const MEDICATION_PRODUCT_TYPE_ICONS = {
  Medication: PillBottle,
  "Nutritional Product": Salad,
  Consumable: Package,
} satisfies Record<MedicationProductType, typeof CircleDot>;

const MEDICATION_PRODUCT_TYPES: MedicationProductType[] = [
  "Medication",
  "Nutritional Product",
  "Consumable",
];

interface MedicationCatalogItem {
  medicine: string;
  title: string;
  detail?: string;
  source: MedicationSource;
  productType: MedicationProductType;
  form: MedicationForm;
  category: string;
  starred?: boolean;
  frequent?: boolean;
}

const MEDICATION_PICKER_ITEMS: MedicationCatalogItem[] = [
  {
    medicine: MEDICINE_CATALOG[0],
    title: "Morphine sulfate 15 mg tablet",
    detail: "Morphine sulfate 15 mg tablet",
    source: "Personal",
    productType: "Medication",
    form: "tablet",
    category: "Analgesics",
    starred: true,
  },
  {
    medicine: MEDICINE_CATALOG[1],
    title: "Dolo 500",
    detail: "Paracetamol 500 mg",
    source: "Formulary",
    productType: "Medication",
    form: "tablet",
    category: "Analgesics",
    starred: true,
  },
  {
    medicine: "ORS sachet",
    title: "ORS sachet",
    source: "Catalog",
    productType: "Nutritional Product",
    form: "sachet",
    category: "Oral rehydration",
    starred: true,
  },
  {
    medicine: "IV cannula 18G",
    title: "IV cannula 18G",
    source: "Catalog",
    productType: "Consumable",
    form: "medicalDevice",
    category: "Medical devices",
    starred: true,
  },
  {
    medicine: "Nitrile gloves (M)",
    title: "Nitrile gloves (M)",
    source: "Org",
    productType: "Consumable",
    form: "protectiveEquipment",
    category: "Protective equipment",
    frequent: true,
  },
  {
    medicine: MEDICINE_CATALOG[2],
    title: "Mox 500",
    detail: "Amoxicillin 500 mg",
    source: "Formulary",
    productType: "Medication",
    form: "capsule",
    category: "Antibiotics",
    frequent: true,
  },
  {
    medicine: "Ensure powder",
    title: "Ensure powder",
    source: "Personal",
    productType: "Nutritional Product",
    form: "powder",
    category: "Nutritional supplements",
    frequent: true,
  },
  {
    medicine: "Surgical mask",
    title: "Surgical mask",
    source: "Formulary",
    productType: "Consumable",
    form: "protectiveEquipment",
    category: "Protective equipment",
    frequent: true,
  },
  {
    medicine: "Calpol 500 mg tablet",
    title: "Calpol 500",
    detail: "Paracetamol 500 mg",
    source: "Formulary",
    productType: "Medication",
    form: "tablet",
    category: "Analgesics",
    frequent: true,
  },
  {
    medicine: MEDICINE_CATALOG[3],
    title: "Pantoprazole 40 mg tablet",
    detail: "Pantoprazole 40 mg",
    source: "Personal",
    productType: "Medication",
    form: "tablet",
    category: "Gastro",
  },
  {
    medicine: MEDICINE_CATALOG[4],
    title: "Ondansetron 4 mg tablet",
    detail: "Ondansetron 4 mg",
    source: "Formulary",
    productType: "Medication",
    form: "tablet",
    category: "Gastro",
  },
  {
    medicine: MEDICINE_CATALOG[5],
    title: "Metformin 500 mg tablet",
    detail: "Metformin 500 mg",
    source: "Formulary",
    productType: "Medication",
    form: "tablet",
    category: "Diabetes",
  },
  {
    medicine: MEDICINE_CATALOG[6],
    title: "Atorvastatin 10 mg tablet",
    detail: "Atorvastatin 10 mg",
    source: "Personal",
    productType: "Medication",
    form: "tablet",
    category: "Cardiovascular",
  },
  {
    medicine: MEDICINE_CATALOG[7],
    title: "Cetirizine 10 mg tablet",
    detail: "Cetirizine 10 mg",
    source: "Catalog",
    productType: "Medication",
    form: "tablet",
    category: "Allergy",
  },
];

interface MedicationProductCategory {
  productType: MedicationProductType;
  category: string;
}

const MEDICATION_PRODUCT_CATEGORIES: MedicationProductCategory[] =
  MEDICATION_PRODUCT_TYPES.flatMap((productType) =>
    Array.from(
      new Set(
        MEDICATION_PICKER_ITEMS.filter(
          (item) => item.productType === productType
        ).map((item) => item.category)
      ),
      (category) => ({ productType, category })
    )
  );

function productCategoryKey(
  productType: MedicationProductType,
  category: string
) {
  return `${productType}::${category}`;
}

const PRODUCT_TYPE_FILTER_GROUP = "__product_type_filters__";
const PRODUCT_CATEGORY_FILTER_GROUP = "__product_category_filters__";
const FILTER_TYPE_PREFIX = "filter-type::";
const FILTER_CATEGORY_PREFIX = "filter-category::";

const PICKER_ITEM_BY_MEDICINE = new Map(
  MEDICATION_PICKER_ITEMS.map((item) => [item.medicine, item])
);

const MEDICATION_SOURCES = [
  "All",
  "Personal",
  "Formulary",
  "Org",
  "Catalog",
] as const;

const MEDICATION_TEMPLATES = [
  {
    name: "Post-operative pain",
    medicines: [MEDICINE_CATALOG[0], MEDICINE_CATALOG[4], MEDICINE_CATALOG[3]],
  },
  {
    name: "Fever and cold",
    medicines: [MEDICINE_CATALOG[1], MEDICINE_CATALOG[7]],
  },
  {
    name: "Type 2 diabetes follow-up",
    medicines: [MEDICINE_CATALOG[5], MEDICINE_CATALOG[6]],
  },
];

const VACCINES = [
  "Influenza vaccine (inactivated)",
  "COVID-19 vaccine",
  "Tdap vaccine",
  "Hepatitis B vaccine",
  "HPV vaccine (9-valent)",
  "MMR vaccine",
  "Varicella vaccine",
  "Pneumococcal conjugate vaccine",
];

const VACCINE_DOSES = [
  "Dose 1 of 1",
  "Dose 1 of 2",
  "Dose 1 of 3",
  "Dose 2 of 2",
  "Dose 2 of 3",
  "Dose 3 of 3",
  "Booster",
];
const VACCINE_ROUTES = ["Intramuscular", "Subcutaneous", "Oral", "Intranasal"];
const VACCINE_SITES = [
  "Left deltoid",
  "Right deltoid",
  "Left thigh",
  "Right thigh",
  "Oral",
  "Intranasal",
];

const MEDICATION_HISTORY = [
  {
    medicine: "Paracetamol 500 mg oral tablet",
    schedule: "1-1-1",
    duration: "5 days",
    date: "12 Aug 2026",
  },
  {
    medicine: "Amoxicillin 500 mg oral capsule",
    schedule: "1-0-1",
    duration: "7 days",
    date: "03 Jun 2026",
  },
  {
    medicine: "Pantoprazole 40 mg oral tablet",
    schedule: "1-0-0",
    duration: "14 days",
    date: "21 Mar 2026",
  },
];

const REQUESTERS = [
  { value: "lakshmi-mohan", name: "Dr. Lakshmi Mohan", initials: "LM" },
  { value: "arjun-nair", name: "Dr. Arjun Nair", initials: "AN" },
  { value: "fatima-begum", name: "Dr. Fatima Begum", initials: "FB" },
];

let nextId = 0;
const uid = () => `med-${++nextId}`;

function parseDosage(dosage: string) {
  const match = dosage.trim().match(/^(\d+(?:\.\d+)?|\.\d+)?\s*(.*)$/);
  const amount = match?.[1] ?? "";
  const rawUnit = match?.[2]?.toLowerCase() ?? "";
  const unit =
    DOSE_UNITS.find(
      (option) => option === rawUnit || option.replace(/s$/, "") === rawUnit
    ) ?? rawUnit;
  return { amount, unit };
}

function formatDosage(amount: string, unit: string) {
  return [amount.trim(), unit].filter(Boolean).join(" ");
}

function createDose(overrides: Partial<DoseLine> = {}): DoseLine {
  return {
    id: uid(),
    dosage: "1 Tablet",
    schedule: null,
    duration: null,
    instructions: [],
    route: "Oral",
    site: null,
    method: null,
    asNeeded: false,
    prnReasons: [],
    ...overrides,
  };
}

function createMedication(
  medicine: string,
  overrides: Partial<Omit<MedicationRequest, "id" | "medicine">> = {}
): MedicationRequest {
  return {
    id: uid(),
    medicine,
    doses: [createDose()],
    note: "",
    intent: "Order",
    authoredOn: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    requester: null,
    ...overrides,
  };
}

const INITIAL_NOTE =
  "Medication initiated after discussing benefits and risks with the patient.";

function createInitialData(): MedicationRequest[] {
  const morphine = MEDICINE_CATALOG[0];
  return [
    createMedication(morphine, { note: INITIAL_NOTE }),
    createMedication(morphine, {
      doses: [
        createDose({ instructions: ["Until symptoms improve", "Then stop"] }),
      ],
    }),
    createMedication(morphine, { note: INITIAL_NOTE }),
    createMedication(morphine, {
      doses: [
        createDose({ schedule: "1-0-1", duration: "3 days" }),
        createDose({ schedule: "0-0-1" }),
        createDose({ dosage: "" }),
      ],
    }),
  ];
}

// ─── Grid actions ─────────────────────────────────────────────────────────────

/** Starred and recently picked options shared by every cell of one picker type. */
interface FavoritePicks {
  favorites: string[];
  toggleFavorite: (item: string) => void;
  recents: string[];
  recordRecents: (items: string[]) => void;
}

function useFavoritePicks(
  initialFavorites: string[],
  initialRecents: string[] = []
): FavoritePicks {
  const [favorites, setFavorites] = React.useState(initialFavorites);
  const [recents, setRecents] = React.useState(initialRecents);
  return React.useMemo(
    () => ({
      favorites,
      toggleFavorite: (item) =>
        setFavorites((current) =>
          current.includes(item)
            ? current.filter((entry) => entry !== item)
            : [...current, item]
        ),
      recents,
      recordRecents: (items) => {
        if (!items.length) return;
        setRecents((current) => [
          ...items,
          ...current.filter((entry) => !items.includes(entry)),
        ]);
      },
    }),
    [favorites, recents]
  );
}

interface MedicationGridActions {
  openOptions: (
    medicationId: string,
    doseId: string,
    trigger: HTMLButtonElement
  ) => void;
  updateDose: (medId: string, doseId: string, patch: Partial<DoseLine>) => void;
  doseRowHeights: Record<string, number>;
  setDoseRowHeight: (doseId: string, height: number | null) => void;
  addDose: (medId: string) => void;
  removeDose: (medId: string, doseId: string) => void;
  removeMedication: (medId: string) => void;
  updateNote: (medId: string, note: string) => void;
  activeId: string | null;
  setActiveId: (medId: string | null) => void;
  instructionPicks: FavoritePicks;
  prnReasonPicks: FavoritePicks;
  durationFocusDoseId: string | null;
  focusDuration: (doseId: string | null) => void;
}

const MedicationGridContext = React.createContext<MedicationGridActions | null>(
  null
);

function useMedicationGrid() {
  const ctx = React.useContext(MedicationGridContext);
  if (!ctx) {
    throw new Error("useMedicationGrid must be used within MedicationRequest");
  }
  return ctx;
}

interface DoseCellProps {
  row: Row<MedicationRequest>;
}

function DoseStack({
  row,
  children,
  markActive = false,
}: DoseCellProps & {
  children: (dose: DoseLine, index: number) => React.ReactNode;
  markActive?: boolean;
}) {
  const { activeId, doseRowHeights } = useMedicationGrid();
  return (
    <div
      className="divide-border flex flex-col divide-y divide-dashed"
      data-row-active={
        markActive && activeId === row.original.id ? true : undefined
      }
      data-medication-row-id={row.original.id}
    >
      {row.original.doses.map((dose, index) => (
        <div
          key={dose.id}
          data-dose-row-id={dose.id}
          className="flex min-h-14 items-center gap-1 py-2"
          style={
            doseRowHeights[dose.id]
              ? { minHeight: doseRowHeights[dose.id] }
              : undefined
          }
        >
          {children(dose, index)}
        </div>
      ))}
    </div>
  );
}

function doseLabel(row: Row<MedicationRequest>, index: number) {
  const suffix = row.original.doses.length > 1 ? `, dose ${index + 1}` : "";
  return `${row.original.medicine}${suffix}`;
}

function DosageInput({
  dose,
  label,
  onChange,
}: {
  dose: DoseLine;
  label: string;
  onChange: (dosage: string) => void;
}) {
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const { amount, unit } = parseDosage(dose.dosage);
  const hasAmount = amount.length > 0;
  const options = hasAmount
    ? DOSE_UNITS.map((option) => `${amount} ${option}`)
    : DOSE_UNITS;
  const selectedDosage = unit ? formatDosage(amount, unit) : null;

  return (
    <Combobox
      items={options}
      value={selectedDosage}
      inputValue={amount}
      onInputValueChange={(nextAmount) => {
        const selectedUnit = DOSE_UNITS.find(
          (option) => nextAmount === option || nextAmount.endsWith(` ${option}`)
        );
        onChange(
          selectedUnit
            ? formatDosage(parseDosage(nextAmount).amount, selectedUnit)
            : formatDosage(nextAmount, unit)
        );
      }}
      onValueChange={(value) => {
        if (value === null) return;
        onChange(value);
        requestAnimationFrame(() =>
          fieldRef.current?.querySelector("input")?.focus()
        );
      }}
    >
      <div ref={fieldRef} className="relative w-full min-w-0">
        <ComboboxInput
          id={`${dose.id}-dosage`}
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          aria-label={label}
          placeholder={unit ? undefined : "Enter a number..."}
          className="bg-background w-full min-w-0"
          inputClassName={cn(
            "tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            unit && "pr-36"
          )}
          showTrigger={false}
        >
          {unit && (
            <ComboboxTrigger
              className="text-muted-foreground absolute top-1/2 right-2 z-10 -translate-y-1/2 border-0 bg-transparent px-1 text-sm font-normal whitespace-nowrap shadow-none hover:bg-transparent"
              aria-label={`Change dose unit from ${unit}`}
              showChevron={false}
            >
              {unit === "international unit" ? "IU" : unit}
            </ComboboxTrigger>
          )}
        </ComboboxInput>
      </div>
      <ComboboxContent
        side="bottom"
        anchor={fieldRef}
        className="w-max min-w-0"
      >
        <ComboboxEmpty>No dose units found.</ComboboxEmpty>
        <ComboboxList className="max-h-none">
          {(option: string) => (
            <ComboboxItem
              key={option}
              value={option}
              className="min-h-10 whitespace-nowrap"
            >
              {option}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function DosageCell({ row }: DoseCellProps) {
  const { updateDose, addDose } = useMedicationGrid();
  return (
    <DoseStack row={row} markActive>
      {(dose, index) => (
        <>
          <DosageInput
            dose={dose}
            label={`Dosage amount for ${doseLabel(row, index)}`}
            onChange={(dosage) =>
              updateDose(row.original.id, dose.id, { dosage })
            }
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Add another dose to ${row.original.medicine}`}
                onPointerDown={(event) => {
                  if (event.button === 0) event.preventDefault();
                }}
                onClick={() => addDose(row.original.id)}
              >
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add another dose</TooltipContent>
          </Tooltip>
        </>
      )}
    </DoseStack>
  );
}

/** Typed numbers suggest every unit; otherwise the common presets are offered. */
function durationOptions(input: string) {
  const match = input.trim().match(/^(\d+(?:\.\d+)?)\s*([a-z]*)$/i);
  if (!match) {
    const query = input.trim().toLowerCase();
    return DURATIONS.filter((option) => option.includes(query));
  }
  const [, amount, unit] = match;
  const suffix = Number(amount) === 1 ? "" : "s";
  return DURATION_UNITS.filter((option) =>
    option.startsWith(unit.toLowerCase().replace(/s$/, ""))
  ).map((option) => `${amount} ${option}${suffix}`);
}

type DurationPanel = "list" | "range" | "dates";

function DurationInput({
  value,
  previousDuration,
  label,
  onChange,
  autoOpen = false,
  onAutoOpened,
}: {
  value: string | null;
  /** The prior dose's duration; a day range there makes this dose continue it. */
  previousDuration?: string | null;
  label: string;
  onChange: (duration: string | null) => void;
  autoOpen?: boolean;
  onAutoOpened?: () => void;
}) {
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const idPrefix = React.useId();
  const [open, setOpen] = React.useState(false);
  const [typed, setTyped] = React.useState(false);
  const [panel, setPanel] = React.useState<DurationPanel>("list");
  const [rangeStart, setRangeStart] = React.useState("");
  const [rangeEnd, setRangeEnd] = React.useState("");
  const [dates, setDates] = React.useState<DateRange | undefined>();
  const options = typed ? durationOptions(value ?? "") : DURATIONS;

  const commit = (duration: string) => {
    onChange(duration);
    setOpen(false);
    setTyped(false);
    requestAnimationFrame(() =>
      fieldRef.current?.querySelector("input")?.focus()
    );
  };

  const openPanel = (next: DurationPanel) => {
    if (next === "range") {
      const [, start = "", end = ""] = value?.match(DAY_RANGE_PATTERN) ?? [];
      const previousEnd = previousDuration?.match(DAY_RANGE_PATTERN)?.[2];
      setRangeStart(
        start || (previousEnd ? String(Number(previousEnd) + 1) : "")
      );
      setRangeEnd(end);
    }
    setPanel(next);
  };

  const openPopup = () => {
    setOpen(true);
    setTyped(false);
    const continuesRange =
      DAY_RANGE_PATTERN.test(value ?? "") ||
      (!value && DAY_RANGE_PATTERN.test(previousDuration ?? ""));
    openPanel(continuesRange ? "range" : "list");
  };

  const autoOpenPopup = React.useEffectEvent(() => {
    openPopup();
    fieldRef.current?.querySelector("input")?.focus();
    onAutoOpened?.();
  });

  React.useEffect(() => {
    if (!autoOpen) return;
    const timer = setTimeout(autoOpenPopup);
    return () => clearTimeout(timer);
  }, [autoOpen]);

  const start = Number(rangeStart);
  const end = Number(rangeEnd);
  const rangeValid =
    Number.isInteger(start) &&
    Number.isInteger(end) &&
    start >= 1 &&
    end >= start;

  return (
    <Combobox
      items={options}
      filter={null}
      autoHighlight={typed}
      openOnInputClick
      open={open}
      onOpenChange={(nextOpen, details) => {
        if (nextOpen) {
          // Typing opens to matching suggestions; any other open respects the range flow.
          if (details.reason === "input-change") setOpen(true);
          else openPopup();
          return;
        }
        setOpen(false);
        setTyped(false);
      }}
      value={value && options.includes(value) ? value : null}
      inputValue={value ?? ""}
      onInputValueChange={(next, details) => {
        if (details.reason !== "input-change") return;
        setTyped(true);
        setPanel("list");
        onChange(next || null);
      }}
      onValueChange={(next) => {
        if (next) commit(next);
      }}
    >
      <div ref={fieldRef} className="w-full min-w-0">
        <ComboboxInput
          aria-label={label}
          placeholder="e.g. 5 days"
          className="bg-background w-full min-w-0"
          showTrigger={false}
          onClick={() => {
            if (!open) openPopup();
          }}
          onKeyDown={(event) => {
            // Space opens the presets when the list is closed; while typing it stays a space.
            if (event.key === " " && !open) {
              event.preventDefault();
              openPopup();
            }
          }}
        />
      </div>
      <ComboboxContent anchor={fieldRef} className="w-auto min-w-64">
        {panel === "list" && (
          <>
            <ComboboxEmpty>Type a number, e.g. 5</ComboboxEmpty>
            <ComboboxList>
              {(option: string) => (
                <ComboboxItem key={option} value={option} className="min-h-10">
                  {option}
                </ComboboxItem>
              )}
            </ComboboxList>
            <div className="border-t p-1">
              {(
                [
                  {
                    panel: "range",
                    label: "Set a range of days",
                    icon: ArrowLeftRight,
                  },
                  {
                    panel: "dates",
                    label: "Set fixed start & end dates",
                    icon: CalendarDays,
                  },
                ] as const
              ).map(({ panel: target, label: text, icon: Icon }) => (
                <button
                  key={target}
                  type="button"
                  className="hover:bg-accent focus-visible:bg-accent flex min-h-10 w-full items-center gap-2 rounded-sm px-2 text-left text-sm outline-none"
                  onClick={() => openPanel(target)}
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  <span className="flex-1">{text}</span>
                  <ChevronRight
                    aria-hidden="true"
                    className="text-muted-foreground size-4 shrink-0"
                  />
                </button>
              ))}
            </div>
          </>
        )}
        {panel !== "list" && (
          <div className="flex flex-col gap-3 p-2">
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Back to durations"
                onClick={() => setPanel("list")}
              >
                <ChevronLeft />
              </Button>
              <span className="text-sm font-medium">
                {panel === "range"
                  ? "Set a range of days"
                  : "Set fixed start & end dates"}
              </span>
            </div>
            {panel === "range" ? (
              <div className="grid grid-cols-2 gap-2">
                <Field>
                  <FieldLabel htmlFor={`${idPrefix}-from`}>From day</FieldLabel>
                  <Input
                    id={`${idPrefix}-from`}
                    type="number"
                    min="1"
                    inputMode="numeric"
                    autoFocus={!rangeStart}
                    value={rangeStart}
                    placeholder="e.g. 1"
                    onChange={(event) => setRangeStart(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`${idPrefix}-to`}>To day</FieldLabel>
                  <Input
                    id={`${idPrefix}-to`}
                    type="number"
                    min={rangeStart || "1"}
                    inputMode="numeric"
                    autoFocus={!!rangeStart}
                    value={rangeEnd}
                    placeholder="e.g. 3"
                    onChange={(event) => setRangeEnd(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && rangeValid) {
                        event.preventDefault();
                        commit(`Day ${start}–${end}`);
                      }
                    }}
                  />
                </Field>
              </div>
            ) : (
              <Calendar
                mode="range"
                selected={dates}
                onSelect={setDates}
                className="bg-transparent p-0"
              />
            )}
            <Button
              type="button"
              disabled={
                panel === "range" ? !rangeValid : !dates?.from || !dates?.to
              }
              onClick={() => {
                if (panel === "range") {
                  commit(`Day ${start}–${end}`);
                } else if (dates?.from && dates.to) {
                  commit(
                    `${format(dates.from, "d MMM")} – ${format(dates.to, "d MMM")}`
                  );
                }
              }}
            >
              {panel === "range" && rangeValid
                ? `Set Day ${start}–${end}`
                : panel === "dates" && dates?.from && dates.to
                  ? `Set ${format(dates.from, "d MMM")} – ${format(dates.to, "d MMM")}`
                  : "Set duration"}
            </Button>
          </div>
        )}
      </ComboboxContent>
    </Combobox>
  );
}

function DurationCell({ row }: DoseCellProps) {
  const { updateDose, durationFocusDoseId, focusDuration } =
    useMedicationGrid();
  return (
    <DoseStack row={row}>
      {(dose, index) => (
        <DurationInput
          value={dose.duration}
          previousDuration={row.original.doses[index - 1]?.duration}
          label={`Duration for ${doseLabel(row, index)}`}
          onChange={(duration) =>
            updateDose(row.original.id, dose.id, { duration })
          }
          autoOpen={durationFocusDoseId === dose.id}
          onAutoOpened={() => focusDuration(null)}
        />
      )}
    </DoseStack>
  );
}

function ScheduleCombobox({
  value,
  label,
  onChange,
}: {
  value: string | null;
  label: string;
  onChange: (schedule: string | null) => void;
}) {
  const [query, setQuery] = React.useState("");
  // A pick hands focus to the duration field, so closing must not pull it back.
  const pickedRef = React.useRef(false);
  const search = query.trim().toLowerCase();
  const items = search
    ? SCHEDULE_VALUES.filter((item) =>
        `${item} ${SCHEDULE_DESCRIPTIONS.get(item) ?? ""}`
          .toLowerCase()
          .includes(search)
      )
    : SCHEDULE_VALUES;
  return (
    <Combobox
      items={items}
      filter={null}
      autoHighlight
      value={value}
      onValueChange={(next) => {
        pickedRef.current = next !== null;
        onChange(next);
      }}
      inputValue={query}
      onInputValueChange={setQuery}
      onOpenChange={(open, details) => {
        if (open) pickedRef.current = false;
        else {
          pickedRef.current = details.reason !== "escape-key";
          setQuery("");
        }
      }}
    >
      <ComboboxTrigger
        className="border-input focus-visible:border-ring focus-visible:ring-ring/50 bg-background dark:bg-input/30 dark:hover:bg-input/50 flex h-12 w-full min-w-0 items-center justify-between gap-1.5 rounded-md border py-2 pr-2.5 pl-3 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 md:h-10 md:pr-2 md:pl-2.5"
        aria-label={label}
      >
        <span
          className={cn("truncate", !value && "text-placeholder-foreground")}
        >
          {value ?? "e.g. 1-0-1"}
        </span>
      </ComboboxTrigger>
      <ComboboxContent
        className="w-72 data-closed:animate-none data-closed:duration-0"
        finalFocus={() => !pickedRef.current}
      >
        <ComboboxInput
          showTrigger={false}
          className="h-12! rounded-sm bg-transparent! md:h-10!"
          aria-label="Search schedules"
          placeholder="Type eg. 1-0-1, SOS, Q6H"
        />
        <ComboboxEmpty>No schedules found.</ComboboxEmpty>
        <ComboboxList showScrollbar>
          {(item: string) => (
            <ComboboxItem key={item} value={item} className="min-h-10">
              {item} ({SCHEDULE_DESCRIPTIONS.get(item)})
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function ScheduleCell({ row }: DoseCellProps) {
  const { updateDose, focusDuration } = useMedicationGrid();
  return (
    <DoseStack row={row}>
      {(dose, index) => (
        <ScheduleCombobox
          value={dose.schedule}
          label={`Schedule for ${doseLabel(row, index)}`}
          onChange={(schedule) => {
            updateDose(row.original.id, dose.id, {
              schedule,
              ...(schedule !== PRN_SCHEDULE && { prnReasons: [] }),
            });
            if (schedule) focusDuration(dose.id);
          }}
        />
      )}
    </DoseStack>
  );
}

/** Searchable multi-select grouped as favorites, recently used, then the rest. */
function FavoritesMultiCombobox({
  value,
  label,
  expanded,
  onChange,
  options,
  picks,
  placeholder,
  searchLabel,
  searchPlaceholder,
  emptyText,
  allLabel,
}: {
  value: string[];
  label: string;
  expanded: boolean;
  onChange: (next: string[]) => void;
  options: string[];
  picks: FavoritePicks;
  placeholder: string;
  searchLabel: string;
  searchPlaceholder: string;
  emptyText: string;
  allLabel: string;
}) {
  const { favorites, toggleFavorite, recents, recordRecents } = picks;
  const [query, setQuery] = React.useState("");
  const search = query.trim().toLowerCase();

  const groups = React.useMemo(() => {
    const matches = (item: string) => item.toLowerCase().includes(search);
    const favoriteItems = favorites.filter(matches);
    const recentItems = recents.filter(
      (item) => !favorites.includes(item) && matches(item)
    );
    const listed = new Set([...favoriteItems, ...recentItems]);
    const rest = options.filter((item) => !listed.has(item) && matches(item));
    return [
      { value: "Favorites", items: favoriteItems },
      { value: "Recently used", items: recentItems },
      { value: allLabel, items: rest },
    ].filter((group) => group.items.length > 0);
  }, [favorites, recents, options, allLabel, search]);

  return (
    <Combobox
      multiple
      items={groups}
      filter={null}
      autoHighlight={!!search}
      value={value}
      onValueChange={(next: string[]) => {
        recordRecents(next.filter((item) => !value.includes(item)));
        onChange(next);
      }}
      inputValue={query}
      onInputValueChange={setQuery}
      onOpenChange={(open) => {
        if (!open) setQuery("");
      }}
    >
      <ComboboxTrigger
        className={cn(
          "border-input focus-visible:border-ring focus-visible:ring-ring/50 bg-background dark:bg-input/30 dark:hover:bg-input/50 flex h-12 w-full min-w-0 items-center justify-between gap-1.5 rounded-md border py-2 pr-2.5 pl-3 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 md:h-10 md:pr-2 md:pl-2.5",
          expanded && "h-auto min-h-12 py-1.5 md:h-auto md:min-h-10"
        )}
        aria-label={label}
      >
        <span
          className={cn(
            "flex min-w-0 flex-1 items-center gap-1.5",
            expanded && "flex-wrap gap-1",
            !value.length && "text-placeholder-foreground"
          )}
        >
          {value.length === 0 ? (
            <span className="min-w-0 truncate">{placeholder}</span>
          ) : (
            (expanded ? value : value.slice(0, 1)).map((item) => (
              <Badge
                key={item}
                variant="pink"
                size="sm"
                className="max-w-full min-w-0 shrink"
              >
                <span className="truncate">{item}</span>
              </Badge>
            ))
          )}
          {!expanded && value.length > 1 && (
            <Badge variant="neutral" size="sm" className="shrink-0">
              +{value.length - 1}
            </Badge>
          )}
        </span>
      </ComboboxTrigger>
      <ComboboxContent className="w-(--anchor-width) min-w-80">
        <ComboboxInput
          showTrigger={false}
          className="h-12! rounded-sm bg-transparent! md:h-10!"
          aria-label={searchLabel}
          placeholder={searchPlaceholder}
        />
        {value.length > 0 && (
          <div className="flex items-center justify-between gap-2 border-b px-3 py-1">
            <span
              className="text-muted-foreground text-xs tabular-nums"
              role="status"
            >
              {value.length} selected
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive -me-2"
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => onChange([])}
            >
              Clear all
            </Button>
          </div>
        )}
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
        <ComboboxList showScrollbar>
          {(group: { value: string; items: string[] }, groupIndex: number) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel className="px-2 py-2 text-xs font-medium">
                {group.value}
              </ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => {
                  const isFavorite = favorites.includes(item);
                  return (
                    <div key={item} className="relative flex items-center">
                      {/* Move the selected check to the start; the star owns the end. */}
                      <ComboboxItem
                        value={item}
                        className="min-h-10 flex-1 pr-12 pl-8 [&>span:last-child]:right-auto [&>span:last-child]:left-2"
                      >
                        {item}
                      </ComboboxItem>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`${isFavorite ? "Remove" : "Add"} ${item} ${isFavorite ? "from" : "to"} favorites`}
                        aria-pressed={isFavorite}
                        className="absolute end-1"
                        onPointerDown={(event) => event.preventDefault()}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          toggleFavorite(item);
                        }}
                      >
                        <Star
                          aria-hidden="true"
                          className={cn(
                            "size-4",
                            isFavorite && "fill-current text-amber-500"
                          )}
                        />
                      </Button>
                    </div>
                  );
                }}
              </ComboboxCollection>
              {groupIndex < groups.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function InstructionsCell({ row }: DoseCellProps) {
  const { updateDose, activeId, setDoseRowHeight, instructionPicks } =
    useMedicationGrid();
  const expanded = activeId === row.original.id;
  const stackRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const doseRows =
      stackRef.current?.querySelectorAll<HTMLElement>("[data-dose-row-id]");
    if (!expanded || !doseRows) {
      row.original.doses.forEach((dose) => setDoseRowHeight(dose.id, null));
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const doseId = (entry.target as HTMLElement).dataset.doseRowId;
        if (doseId) {
          setDoseRowHeight(
            doseId,
            Math.ceil(entry.target.getBoundingClientRect().height)
          );
        }
      });
    });
    doseRows.forEach((doseRow) => {
      const doseId = doseRow.dataset.doseRowId;
      if (doseId) {
        setDoseRowHeight(
          doseId,
          Math.ceil(doseRow.getBoundingClientRect().height)
        );
      }
      resizeObserver.observe(doseRow);
    });

    return () => resizeObserver.disconnect();
  }, [expanded, row.original.doses, setDoseRowHeight]);

  return (
    <div ref={stackRef}>
      <DoseStack row={row}>
        {(dose, index) => (
          <FavoritesMultiCombobox
            value={dose.instructions}
            label={`Instructions for ${doseLabel(row, index)}`}
            expanded={expanded}
            onChange={(instructions) =>
              updateDose(row.original.id, dose.id, { instructions })
            }
            options={INSTRUCTIONS}
            picks={instructionPicks}
            placeholder="Select instructions…"
            searchLabel="Search instructions"
            searchPlaceholder="Select additional instructions"
            emptyText="No instructions found."
            allLabel="All instructions"
          />
        )}
      </DoseStack>
    </div>
  );
}

function scrollMedicationDoseIntoView(doseId: string) {
  const input = document.getElementById(`${doseId}-dosage`);
  const row = input?.closest("tr");
  if (!row) return;

  const pickerFooter = document.querySelector<HTMLElement>(
    '[data-slot="medication-picker-sticky"]'
  );
  let scrollContainer: HTMLElement | null = row.parentElement;
  while (scrollContainer) {
    const style = getComputedStyle(scrollContainer);
    if (
      /(auto|scroll)/.test(style.overflowY) &&
      scrollContainer.scrollHeight > scrollContainer.clientHeight
    ) {
      break;
    }
    scrollContainer = scrollContainer.parentElement;
  }

  if (!scrollContainer) {
    row.scrollIntoView({ block: "nearest" });
    return;
  }

  const containerRect = scrollContainer.getBoundingClientRect();
  const rowRect = row.getBoundingClientRect();
  const visibleTop = Math.max(containerRect.top, 0) + 12;
  const visibleBottom =
    Math.min(
      containerRect.bottom,
      window.innerHeight,
      pickerFooter?.getBoundingClientRect().top ?? window.innerHeight
    ) - 12;
  const topOverflow = visibleTop - rowRect.top;
  const bottomOverflow = rowRect.bottom - visibleBottom;

  if (topOverflow > 0 || rowRect.height > visibleBottom - visibleTop) {
    scrollContainer.scrollTop -= topOverflow;
  } else if (bottomOverflow > 0) {
    scrollContainer.scrollTop += bottomOverflow;
  }
}

function focusableIn(root: Element) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'input, button, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter(
    (el) =>
      el.tabIndex >= 0 &&
      !el.hasAttribute("disabled") &&
      el.getAttribute("aria-hidden") !== "true" &&
      (el as HTMLInputElement).type !== "hidden" &&
      el.getClientRects().length > 0
  );
}

/** Tab walks each dose line across its columns before moving to the next dose. */
function gridTabOrder(grid: Element) {
  return Array.from(grid.querySelectorAll("tbody")).flatMap((tbody) =>
    focusableIn(tbody)
      .map((el, domIndex) => {
        const doseRow = el.closest<HTMLElement>("[data-dose-row-id]");
        const doseIndex = doseRow
          ? Array.prototype.indexOf.call(
              doseRow.parentElement?.children,
              doseRow
            )
          : Number.POSITIVE_INFINITY;
        const column = el.closest("td")?.cellIndex ?? 0;
        return { el, doseIndex, column, domIndex };
      })
      .sort(
        (a, b) =>
          a.doseIndex - b.doseIndex ||
          a.column - b.column ||
          a.domIndex - b.domIndex
      )
      .map(({ el }) => el)
  );
}

function DoseOptionsCell({ row }: DoseCellProps) {
  const { openOptions } = useMedicationGrid();
  return (
    <DoseStack row={row}>
      {(dose, index) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mx-auto"
              data-options-dose-id={dose.id}
              aria-label={`More options for ${doseLabel(row, index)}`}
              aria-haspopup="dialog"
              // Focusing on press re-activates the row and shifts layout before the click lands.
              onPointerDown={(event) => {
                if (event.button === 0) event.preventDefault();
              }}
              onClick={(event) =>
                openOptions(row.original.id, dose.id, event.currentTarget)
              }
            >
              <ArrowRight aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>More options</TooltipContent>
        </Tooltip>
      )}
    </DoseStack>
  );
}

function MedicationOptionsSheet({
  medications,
  target,
  onTargetChange,
  defaultRequester,
  onUpdate,
  returnFocusRef,
}: {
  medications: MedicationRequest[];
  target: MedicationOptionsTarget | null;
  onTargetChange: (target: MedicationOptionsTarget | null) => void;
  defaultRequester: string;
  onUpdate: (medicationId: string, patch: Partial<MedicationRequest>) => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const { updateDose, setActiveId } = useMedicationGrid();
  const routeRef = React.useRef<HTMLButtonElement>(null);
  const restoreFocusRef = React.useRef(true);
  const idPrefix = React.useId();
  const index = medications.findIndex(
    (medication) => medication.id === target?.medicationId
  );
  const medication = medications[index];
  const dose = medication?.doses.find((entry) => entry.id === target?.doseId);
  const selectedDoseId = dose?.id;

  React.useLayoutEffect(() => {
    if (!selectedDoseId) return;
    scrollMedicationDoseIntoView(selectedDoseId);
    // Closing returns focus to the dose currently shown, not the one first opened.
    const trigger = document.querySelector<HTMLButtonElement>(
      `[data-options-dose-id="${selectedDoseId}"]`
    );
    if (trigger) returnFocusRef.current = trigger;
  }, [selectedDoseId, returnFocusRef]);

  const navigate = (offset: number) => {
    const next = medications[index + offset];
    if (!next) return;
    onTargetChange({ medicationId: next.id, doseId: next.doses[0].id });
    setActiveId(next.id);
  };

  return (
    <Sheet
      modal={false}
      open={!!medication && !!dose}
      onOpenChange={(open, eventDetails) => {
        if (!open) {
          restoreFocusRef.current =
            eventDetails.reason !== "outside-press" &&
            eventDetails.reason !== "focus-out";
          onTargetChange(null);
        }
      }}
    >
      <SheetContent
        side="right"
        size="md"
        overlay={false}
        dismissible
        className="motion-reduce:animate-none"
        initialFocus={routeRef}
        finalFocus={() =>
          restoreFocusRef.current ? returnFocusRef.current : false
        }
      >
        <SheetHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-lg"
                  aria-label="Previous medicine"
                  disabled={index <= 0}
                  onClick={() => navigate(-1)}
                >
                  <ChevronUp aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous medicine</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-lg"
                  aria-label="Next medicine"
                  disabled={index >= medications.length - 1}
                  onClick={() => navigate(1)}
                >
                  <ChevronDown aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next medicine</TooltipContent>
            </Tooltip>
            <span
              className="text-muted-foreground text-sm whitespace-nowrap tabular-nums"
              role="status"
            >
              Medicine {index + 1} of {medications.length}
            </span>
          </div>
        </SheetHeader>
        {medication && dose && (
          <>
            <SheetBody>
              <div
                className="mb-5 flex min-w-0 flex-col gap-1"
                aria-live="polite"
                aria-atomic="true"
              >
                <SheetDescription>More options for</SheetDescription>
                <SheetTitle className="leading-snug wrap-break-word">
                  {medication.medicine}
                </SheetTitle>
              </div>
              <FieldGroup className="gap-5 px-1 pb-1">
                {medication.doses.length > 1 && (
                  <Field>
                    <FieldLabel htmlFor={`${idPrefix}-dose`}>Dose</FieldLabel>
                    <Select
                      items={medication.doses.map((entry, doseIndex) => ({
                        value: entry.id,
                        label: `Dose ${doseIndex + 1}${entry.dosage ? ` - ${entry.dosage}` : ""}`,
                      }))}
                      value={dose.id}
                      onValueChange={(doseId) => {
                        if (doseId)
                          onTargetChange({
                            medicationId: medication.id,
                            doseId,
                          });
                      }}
                    >
                      <SelectTrigger id={`${idPrefix}-dose`} className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent alignItemWithTrigger={false}>
                        <SelectGroup>
                          {medication.doses.map((entry, doseIndex) => (
                            <SelectItem key={entry.id} value={entry.id}>
                              Dose {doseIndex + 1}
                              {entry.dosage ? ` - ${entry.dosage}` : ""}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
                {(
                  [
                    { field: "route", label: "Route", options: ROUTES },
                    { field: "site", label: "Site", options: MEDICATION_SITES },
                    {
                      field: "method",
                      label: "Method",
                      options: ADMINISTRATION_METHODS,
                    },
                  ] as const
                ).map(({ field, label, options }) => (
                  <Field key={field}>
                    <FieldLabel htmlFor={`${idPrefix}-${field}`}>
                      {label}
                    </FieldLabel>
                    <Select
                      value={dose[field]}
                      onValueChange={(value) => {
                        if (field === "route" && !value) return;
                        updateDose(medication.id, dose.id, { [field]: value });
                      }}
                    >
                      <SelectTrigger
                        ref={field === "route" ? routeRef : undefined}
                        id={`${idPrefix}-${field}`}
                        className="w-full min-w-0"
                      >
                        <SelectValue
                          placeholder={`Select ${label.toLowerCase()}`}
                        />
                      </SelectTrigger>
                      <SelectContent alignItemWithTrigger={false}>
                        <SelectGroup>
                          {field !== "route" && (
                            <SelectItem value={null}>Not specified</SelectItem>
                          )}
                          {options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                ))}
                <Field>
                  <FieldLabel htmlFor={`${idPrefix}-intent`}>Intent</FieldLabel>
                  <Select
                    value={medication.intent}
                    onValueChange={(intent) => {
                      if (intent) onUpdate(medication.id, { intent });
                    }}
                  >
                    <SelectTrigger id={`${idPrefix}-intent`} className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        {MEDICATION_INTENTS.map((intent) => (
                          <SelectItem key={intent} value={intent}>
                            {intent}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor={`${idPrefix}-authored-on`}>
                    Authored on
                  </FieldLabel>
                  <Input
                    id={`${idPrefix}-authored-on`}
                    type="datetime-local"
                    className="min-w-0"
                    value={medication.authoredOn}
                    onChange={(event) =>
                      onUpdate(medication.id, {
                        authoredOn: event.target.value,
                      })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`${idPrefix}-requester`}>
                    Requester
                  </FieldLabel>
                  <Select
                    value={medication.requester}
                    onValueChange={(requester) =>
                      onUpdate(medication.id, { requester })
                    }
                  >
                    <SelectTrigger
                      id={`${idPrefix}-requester`}
                      className="w-full min-w-0"
                    >
                      <SelectValue className="min-w-0 truncate">
                        {
                          REQUESTERS.find(
                            (person) =>
                              person.value ===
                              (medication.requester ?? defaultRequester)
                          )?.name
                        }
                        {!medication.requester && " (all entries)"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        <SelectItem value={null}>
                          Use requester for all entries
                        </SelectItem>
                        {REQUESTERS.map((person) => (
                          <SelectItem key={person.value} value={person.value}>
                            <Avatar size="sm">
                              <AvatarFallback>{person.initials}</AvatarFallback>
                            </Avatar>
                            {person.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor={`${idPrefix}-note`}>Note</FieldLabel>
                  <Textarea
                    id={`${idPrefix}-note`}
                    rows={2}
                    placeholder="Enter additional note"
                    value={medication.note}
                    onChange={(event) =>
                      onUpdate(medication.id, { note: event.target.value })
                    }
                  />
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel htmlFor={`${idPrefix}-prn`}>
                    As needed (PRN)
                  </FieldLabel>
                  <Switch
                    id={`${idPrefix}-prn`}
                    className="me-3"
                    checked={dose.asNeeded}
                    onCheckedChange={(asNeeded) =>
                      updateDose(medication.id, dose.id, { asNeeded })
                    }
                  />
                </Field>
              </FieldGroup>
            </SheetBody>
            <SheetFooter>
              <SheetClose render={<Button variant="default">Done</Button>} />
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function RowActionsCell({ row }: DoseCellProps) {
  const { addDose, removeDose, removeMedication } = useMedicationGrid();
  const medication = row.original;
  return (
    <DoseStack row={row}>
      {(dose) => (
        <DataTableRowActions triggerClassName="shadow-none">
          <DropdownMenuItem onClick={() => addDose(medication.id)}>
            <Plus aria-hidden="true" />
            Add tapering dose
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {medication.doses.length > 1 && (
            <DropdownMenuItem
              variant="destructive"
              onClick={() => removeDose(medication.id, dose.id)}
            >
              <CircleMinus aria-hidden="true" />
              Remove this dose
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            variant="destructive"
            onClick={() => removeMedication(medication.id)}
          >
            <Trash2 aria-hidden="true" />
            Remove medicine
          </DropdownMenuItem>
        </DataTableRowActions>
      )}
    </DoseStack>
  );
}

/** Saved notes stay readable until activated; SOS reasons remain directly editable. */
function NoteRow({ medication }: { medication: MedicationRequest }) {
  const { updateNote, updateDose, activeId, setActiveId, prnReasonPicks } =
    useMedicationGrid();
  const [focusOnMount, setFocusOnMount] = React.useState(false);
  const isActive = activeId === medication.id;
  const prnDoses = medication.doses
    .map((dose, index) => ({ dose, index }))
    .filter(({ dose }) => dose.schedule === PRN_SCHEDULE);

  const focusAtEnd = React.useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);

  const prnReasons = prnDoses.length > 0 && (
    <div className="flex flex-col gap-2 px-2 pt-2">
      {prnDoses.map(({ dose, index }) => (
        <div key={dose.id} className="w-full">
          <FavoritesMultiCombobox
            value={dose.prnReasons}
            label={`Select reason for SOS, ${medication.medicine}${
              medication.doses.length > 1 ? `, dose ${index + 1}` : ""
            }`}
            expanded={isActive}
            onChange={(prnReasons) =>
              updateDose(medication.id, dose.id, { prnReasons })
            }
            options={PRN_REASONS}
            picks={prnReasonPicks}
            placeholder="Select reason for SOS"
            searchLabel="Search reasons for SOS"
            searchPlaceholder="Select reason for SOS"
            emptyText="No reasons found."
            allLabel="All reasons"
          />
        </div>
      ))}
    </div>
  );

  if (medication.note && !isActive) {
    return (
      <>
        {prnReasons}
        <div className="px-2 py-1.5">
          <button
            type="button"
            data-medication-note-preview
            className="focus-visible:ring-ring/50 flex w-full cursor-text items-center gap-2 rounded-sm text-left text-sm whitespace-normal outline-none focus-visible:ring-3"
            onClick={() => {
              setFocusOnMount(true);
              setActiveId(medication.id);
            }}
          >
            <span className="flex-1">
              <span className="font-medium">Note:</span> {medication.note}
            </span>
            <span className="sr-only">(edit note)</span>
            <SquarePen
              aria-hidden="true"
              className="text-muted-foreground size-4 shrink-0"
            />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {prnReasons}
      <div className="px-2 py-2">
        <Textarea
          rows={1}
          className="bg-background min-h-10 resize-none"
          aria-label={`Note for ${medication.medicine}`}
          placeholder="Add note"
          value={medication.note}
          ref={focusOnMount ? focusAtEnd : undefined}
          onFocus={() => setActiveId(medication.id)}
          onBlur={() => setFocusOnMount(false)}
          onChange={(e) => updateNote(medication.id, e.target.value)}
        />
      </div>
    </>
  );
}

const columns: ColumnDef<MedicationRequest>[] = [
  {
    id: "sl",
    header: "Sl.",
    cell: ({ row }) => `${row.index + 1}.`,
    meta: {
      className: "w-12 text-center cursor-pointer",
      spanExpandedRow: true,
    },
  },
  {
    id: "medicine",
    accessorKey: "medicine",
    header: "Medicine",
    meta: {
      className:
        "w-[20%] cursor-pointer whitespace-normal font-medium @max-2xl:flex-1",
      spanExpandedRow: true,
    },
  },
  {
    id: "dosage",
    header: "Dose",
    cell: ({ row }) => <DosageCell row={row} />,
    meta: { className: "w-[20%] @max-2xl:basis-full" },
  },
  {
    id: "schedule",
    header: "Schedule",
    cell: ({ row }) => <ScheduleCell row={row} />,
    meta: {
      className: "w-[14%] whitespace-nowrap @max-2xl:w-fit @max-2xl:basis-auto",
    },
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => <DurationCell row={row} />,
    meta: {
      className: "w-[14%] whitespace-nowrap @max-2xl:w-48 @max-2xl:basis-auto",
    },
  },
  {
    id: "instructions",
    header: "Instructions",
    cell: ({ row }) => <InstructionsCell row={row} />,
    meta: { className: "@max-2xl:flex-1" },
  },
  {
    id: "options",
    header: "Options",
    cell: ({ row }) => <DoseOptionsCell row={row} />,
    meta: { className: "w-20" },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActionsCell row={row} />,
    meta: { className: "w-14" },
  },
];

const gridClassName = cn(
  "@container [&_table]:table-fixed",
  // Active record: tint and outline the row together with its note.
  "[&_tbody:has([data-row-active])]:bg-primary-50 dark:[&_tbody:has([data-row-active])]:bg-primary-950/40",
  "[&_tbody:has([data-row-active])]:outline-primary [&_tbody:has([data-row-active])]:outline-2 [&_tbody:has([data-row-active])]:-outline-offset-3",
  "[&_tbody:has([data-row-active])_tr:hover]:bg-transparent",
  // Narrow containers stack cells instead of scrolling horizontally.
  "@max-2xl:[&_thead]:hidden @max-2xl:[&_table]:block @max-2xl:[&_tbody]:block",
  "@max-2xl:[&_tr]:flex @max-2xl:[&_tr]:flex-wrap @max-2xl:[&_tr]:items-center",
  "@max-2xl:[&_td]:block @max-2xl:[&_td:not(:last-child)]:border-r-0 @max-2xl:[&_td[colspan]]:w-full"
);

const SOURCE_BADGE_VARIANTS: Record<
  MedicationSource,
  "success" | "info" | "warning" | "neutral"
> = {
  Personal: "success",
  Formulary: "info",
  Org: "warning",
  Catalog: "neutral",
};

function MedicationPicker({
  onSelect,
  defaultOpen = false,
}: {
  onSelect: (medicine: string) => void;
  defaultOpen?: boolean;
}) {
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const sourceFiltersRef = React.useRef<HTMLDivElement>(null);
  const typeFiltersId = React.useId();
  const primaryModifier = getPrimaryShortcutModifier();
  const preservePopupForFilterActionRef = React.useRef(false);
  const [open, setOpen] = React.useState(defaultOpen);
  const [inputFocused, setInputFocused] = React.useState(false);
  const [typeFiltersOpen, setTypeFiltersOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedProductTypes, setSelectedProductTypes] = React.useState<
    Set<MedicationProductType>
  >(() => new Set());
  const [selectedProductCategories, setSelectedProductCategories] =
    React.useState<Set<string>>(() => new Set());
  const [categoryProductType, setCategoryProductType] =
    React.useState<MedicationProductType | null>(null);
  const [selectedSources, setSelectedSources] = React.useState<
    Set<(typeof MEDICATION_SOURCES)[number]>
  >(() => new Set(["All"]));
  const [starred, setStarred] = React.useState(
    () =>
      new Set(
        MEDICATION_PICKER_ITEMS.filter((item) => item.starred).map(
          (item) => item.medicine
        )
      )
  );
  const [favoriteAnnouncement, setFavoriteAnnouncement] = React.useState("");

  const focusFirstTypeFilterOption = () => {
    requestAnimationFrame(() => {
      const input = fieldRef.current?.querySelector<HTMLInputElement>("input");
      if (!input) return;

      input.focus();
      input.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowDown",
          bubbles: true,
          cancelable: true,
        })
      );
    });
  };

  const showTypeFilters = () => {
    if (typeFiltersOpen) return;
    if (!open) setOpen(true);
    const activeProductType =
      categoryProductType && selectedProductTypes.has(categoryProductType)
        ? categoryProductType
        : (MEDICATION_PRODUCT_TYPES.find((productType) =>
            selectedProductTypes.has(productType)
          ) ?? null);
    setCategoryProductType(activeProductType);
    setTypeFiltersOpen(true);
    focusFirstTypeFilterOption();
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        !(primaryModifier === "Meta" ? event.metaKey : event.ctrlKey) ||
        !event.shiftKey ||
        event.altKey ||
        event.key.toLowerCase() !== "m"
      ) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || target.closest("input, textarea, select"))
      ) {
        return;
      }

      event.preventDefault();
      fieldRef.current?.querySelector<HTMLInputElement>("input")?.focus();
      setOpen(true);
      setCategoryProductType(null);
      setTypeFiltersOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [primaryModifier]);

  const matching = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    return MEDICATION_PICKER_ITEMS.filter(
      (item) =>
        (selectedSources.has("All") || selectedSources.has(item.source)) &&
        (!selectedProductTypes.size ||
          selectedProductTypes.has(item.productType)) &&
        (!selectedProductCategories.size ||
          selectedProductCategories.has(
            productCategoryKey(item.productType, item.category)
          )) &&
        (!query ||
          `${item.title} ${item.detail ?? ""} ${item.medicine}`
            .toLowerCase()
            .includes(query))
    );
  }, [
    search,
    selectedProductCategories,
    selectedProductTypes,
    selectedSources,
  ]);

  const openProductCategories = (productType: MedicationProductType) => {
    setSelectedProductTypes((current) => {
      const next = new Set(current);
      next.add(productType);
      return next;
    });
    setCategoryProductType(productType);
  };

  const toggleProductCategory = (
    productType: MedicationProductType,
    category: string
  ) => {
    const key = productCategoryKey(productType, category);
    setSelectedProductCategories((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setTypeFiltersOpen(false);
  };

  const removeLatestProductCategory = (productType: MedicationProductType) => {
    setSelectedProductCategories((current) => {
      const prefix = `${productType}::`;
      const latestCategory = [...current]
        .filter((key) => key.startsWith(prefix))
        .at(-1);
      if (!latestCategory) return current;

      const next = new Set(current);
      next.delete(latestCategory);
      return next;
    });
  };

  const removeProductTypeFilter = (productType: MedicationProductType) => {
    setSelectedProductTypes((current) => {
      const next = new Set(current);
      next.delete(productType);
      return next;
    });
    setSelectedProductCategories(
      (current) =>
        new Set(
          [...current].filter((key) => !key.startsWith(`${productType}::`))
        )
    );
    setCategoryProductType((current) =>
      current === productType ? null : current
    );
  };

  const removeProductCategoryFilter = (
    productType: MedicationProductType,
    category: string
  ) => {
    setSelectedProductCategories((current) => {
      const next = new Set(current);
      next.delete(productCategoryKey(productType, category));
      return next;
    });
    setOpen(true);
    setCategoryProductType(productType);
    setTypeFiltersOpen(true);
  };

  const handleBadgeDeleteKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>
  ) => {
    if (
      (event.key !== "Backspace" && event.key !== "Delete") ||
      !(event.target instanceof HTMLButtonElement)
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget
      .querySelector<HTMLButtonElement>('button[aria-label="Remove"]')
      ?.click();
  };

  const backToProductTypes = () => {
    preservePopupForFilterActionRef.current = true;
    setOpen(true);
    if (categoryProductType) {
      removeLatestProductCategory(categoryProductType);
    }
    setCategoryProductType(null);
    setTypeFiltersOpen(true);
  };

  const productGroups = React.useMemo(() => {
    if (!selectedSources.has("All")) {
      return [...selectedSources].map((source) => ({
        value: source,
        items: matching
          .filter((item) => item.source === source)
          .map((item) => item.medicine),
      }));
    }

    if (selectedProductTypes.size || selectedProductCategories.size) {
      return [
        {
          value: "Products",
          items: matching.map((item) => item.medicine),
        },
      ];
    }

    const featured = matching.filter((item) => starred.has(item.medicine));
    const featuredIds = new Set(featured.map((item) => item.medicine));
    const frequent = matching.filter(
      (item) => item.frequent && !featuredIds.has(item.medicine)
    );
    const includedIds = new Set([
      ...featuredIds,
      ...frequent.map((item) => item.medicine),
    ]);
    const remaining = search.trim()
      ? matching.filter((item) => !includedIds.has(item.medicine))
      : [];

    return [
      featured.length && {
        value: "Personal + your starred list",
        items: featured.map((item) => item.medicine),
      },
      frequent.length && {
        value: "Frequently used",
        items: frequent.map((item) => item.medicine),
      },
      remaining.length && {
        value: "All medications",
        items: remaining.map((item) => item.medicine),
      },
    ].filter((group): group is { value: string; items: string[] } => !!group);
  }, [
    matching,
    search,
    selectedProductCategories,
    selectedProductTypes,
    selectedSources,
    starred,
  ]);

  const groups = React.useMemo(() => {
    if (typeFiltersOpen && !categoryProductType) {
      return [
        {
          value: PRODUCT_TYPE_FILTER_GROUP,
          items: MEDICATION_PRODUCT_TYPES.map(
            (productType) => `${FILTER_TYPE_PREFIX}${productType}`
          ),
        },
      ];
    }

    const filterGroups: { value: string; items: string[] }[] = [];
    if (typeFiltersOpen && categoryProductType) {
      filterGroups.push({
        value: PRODUCT_CATEGORY_FILTER_GROUP,
        items: [
          ...MEDICATION_PRODUCT_CATEGORIES.filter(
            (entry) => entry.productType === categoryProductType
          ).map(
            ({ productType, category }) =>
              `${FILTER_CATEGORY_PREFIX}${productCategoryKey(productType, category)}`
          ),
        ],
      });
    }
    return [...filterGroups, ...productGroups];
  }, [categoryProductType, productGroups, typeFiltersOpen]);

  const toggleSource = (source: (typeof MEDICATION_SOURCES)[number]) => {
    setSelectedSources((current) => {
      if (source === "All") return new Set(["All"]);
      if (current.has("All")) return new Set([source]);

      const next = new Set(current);
      if (next.has(source)) next.delete(source);
      else next.add(source);
      return next.size ? next : new Set(["All"]);
    });
  };

  const focusSourceFilters = () => {
    setOpen(true);
    requestAnimationFrame(() =>
      sourceFiltersRef.current
        ?.querySelector<HTMLButtonElement>("button")
        ?.focus()
    );
  };

  const focusFirstProductOption = () => {
    const productGroupIndex = groups.findIndex(
      (group) =>
        group.value !== PRODUCT_TYPE_FILTER_GROUP &&
        group.value !== PRODUCT_CATEGORY_FILTER_GROUP
    );
    if (productGroupIndex < 0 || !groups[productGroupIndex]?.items.length)
      return;

    const precedingOptionCount = groups
      .slice(0, productGroupIndex)
      .reduce((count, group) => count + group.items.length, 0);
    const input = fieldRef.current?.querySelector<HTMLInputElement>("input");
    if (!input) return;

    input.focus();
    Array.from({ length: precedingOptionCount + 1 }).forEach(() => {
      input.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowDown",
          bubbles: true,
          cancelable: true,
        })
      );
    });
  };

  const handlePickerSelection = (value: string | null) => {
    if (!value) return;

    if (
      value.startsWith(FILTER_TYPE_PREFIX) ||
      value.startsWith(FILTER_CATEGORY_PREFIX)
    ) {
      setSearch("");
    }

    const productType = MEDICATION_PRODUCT_TYPES.find(
      (option) => value === `${FILTER_TYPE_PREFIX}${option}`
    );
    if (productType) {
      preservePopupForFilterActionRef.current = true;
      setOpen(true);
      setTypeFiltersOpen(true);
      openProductCategories(productType);
      return;
    }

    if (value.startsWith(FILTER_CATEGORY_PREFIX)) {
      const key = value.slice(FILTER_CATEGORY_PREFIX.length);
      const category = MEDICATION_PRODUCT_CATEGORIES.find(
        (entry) => productCategoryKey(entry.productType, entry.category) === key
      );
      if (category) {
        preservePopupForFilterActionRef.current = true;
        setOpen(true);
        toggleProductCategory(category.productType, category.category);
      }
      return;
    }

    if (!PICKER_ITEM_BY_MEDICINE.has(value)) return;
    onSelect(value);
    setSearch("");
  };

  const hasActiveFilters =
    search.length > 0 ||
    selectedProductTypes.size > 0 ||
    selectedProductCategories.size > 0 ||
    !selectedSources.has("All");

  const clearAllFilters = () => {
    setSearch("");
    setSelectedProductTypes(new Set());
    setSelectedProductCategories(new Set());
    setSelectedSources(new Set(["All"]));
    setCategoryProductType(null);
    setTypeFiltersOpen(false);
  };

  const toggleStar = (medicine: string) => {
    const item = PICKER_ITEM_BY_MEDICINE.get(medicine);
    if (!item) return;
    const willBeStarred = !starred.has(medicine);
    setStarred((current) => {
      const next = new Set(current);
      if (next.has(medicine)) next.delete(medicine);
      else next.add(medicine);
      return next;
    });
    setFavoriteAnnouncement(
      `${willBeStarred ? "Added" : "Removed"} ${item.title} ${willBeStarred ? "to" : "from"} favorites.`
    );
  };

  const renderPickerOption = (group: { value: string }, option: string) => {
    if (group.value === PRODUCT_TYPE_FILTER_GROUP) {
      const productType = MEDICATION_PRODUCT_TYPES.find(
        (entry) => option === `${FILTER_TYPE_PREFIX}${entry}`
      );
      if (!productType) return null;
      const selected = selectedProductTypes.has(productType);
      const ProductTypeIcon = MEDICATION_PRODUCT_TYPE_ICONS[productType];
      return (
        <ComboboxItem
          key={option}
          value={option}
          aria-label={`${productType}${selected ? ", selected" : ""}`}
          className="h-11 gap-3 px-3 py-2 md:h-10"
        >
          <ProductTypeIcon
            aria-hidden="true"
            className="text-muted-foreground"
          />
          <span className="min-w-0 flex-1 truncate">{productType}</span>
          {selected && <Check aria-hidden="true" />}
          <ChevronRight aria-hidden="true" className="text-muted-foreground" />
        </ComboboxItem>
      );
    }

    if (group.value === PRODUCT_CATEGORY_FILTER_GROUP) {
      const key = option.slice(FILTER_CATEGORY_PREFIX.length);
      const category = MEDICATION_PRODUCT_CATEGORIES.find(
        (entry) => productCategoryKey(entry.productType, entry.category) === key
      );
      if (!category) return null;
      const selected = selectedProductCategories.has(key);
      return (
        <ComboboxItem
          key={option}
          value={option}
          aria-label={`${category.category}${selected ? ", selected" : ""}`}
          className="h-11 gap-3 px-3 py-2 md:h-10"
        >
          <Folder aria-hidden="true" className="text-muted-foreground" />
          <span className="min-w-0 flex-1 truncate">{category.category}</span>
          {selected && <Check aria-hidden="true" />}
        </ComboboxItem>
      );
    }

    const item = PICKER_ITEM_BY_MEDICINE.get(option);
    if (!item) return null;
    const isStarred = starred.has(item.medicine);
    const ProductIcon = MEDICATION_FORM_ICONS[item.form];
    return (
      <div key={item.medicine} className="relative flex items-center">
        <ComboboxItem
          value={item.medicine}
          data-medicine={item.medicine}
          className="min-h-12 flex-1 gap-3 py-1.5 pr-30 pl-3 sm:pr-36"
        >
          <ProductIcon
            aria-hidden="true"
            className="text-muted-foreground size-4 shrink-0"
          />
          <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <span className="w-full truncate text-sm font-medium">
              {item.title}
            </span>
            {item.detail && (
              <span className="text-muted-foreground w-full truncate text-xs">
                {item.detail}
              </span>
            )}
          </span>
        </ComboboxItem>
        <Badge
          variant={SOURCE_BADGE_VARIANTS[item.source]}
          size="sm"
          className="pointer-events-none absolute end-10 sm:end-14"
        >
          {item.source}
        </Badge>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`${isStarred ? "Remove" : "Add"} ${item.title} ${isStarred ? "from" : "to"} favorites`}
          aria-pressed={isStarred}
          className="absolute end-1"
          onPointerDown={(event) => event.preventDefault()}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleStar(item.medicine);
          }}
        >
          <Star
            aria-hidden="true"
            className={cn("size-4", isStarred && "fill-current text-amber-500")}
          />
        </Button>
      </div>
    );
  };

  return (
    <Combobox
      items={groups}
      openOnInputClick
      open={open}
      onOpenChange={(nextOpen, details) => {
        if (!nextOpen && details.reason === "focus-out") {
          const target = document.activeElement;
          const popup = sourceFiltersRef.current?.closest(
            '[data-slot="combobox-content"]'
          );
          if (
            target &&
            (fieldRef.current?.contains(target) || popup?.contains(target))
          ) {
            return;
          }
        }
        if (!nextOpen && preservePopupForFilterActionRef.current) {
          preservePopupForFilterActionRef.current = false;
          return;
        }
        setOpen(nextOpen);
        if (!nextOpen) setTypeFiltersOpen(false);
      }}
      value={null}
      inputValue={search}
      filter={null}
      autoHighlight
      onInputValueChange={(value) => {
        if (
          value.startsWith(FILTER_TYPE_PREFIX) ||
          value.startsWith(FILTER_CATEGORY_PREFIX)
        ) {
          return;
        }
        setSearch(value);
      }}
      onValueChange={handlePickerSelection}
    >
      <div
        ref={fieldRef}
        className="w-full"
        onFocusCapture={(event) => {
          setInputFocused(true);
          if (!(event.target instanceof HTMLInputElement)) return;
          setOpen(true);
        }}
        onBlurCapture={(event) => {
          const nextTarget = event.relatedTarget;
          if (
            !(nextTarget instanceof Node) ||
            !event.currentTarget.contains(nextTarget)
          ) {
            setInputFocused(false);
          }
        }}
        onClickCapture={(event) => {
          if (!(event.target instanceof HTMLInputElement)) return;
          setOpen(true);
          if (typeFiltersOpen) setTypeFiltersOpen(false);
        }}
      >
        <ComboboxInput
          aria-label="Search medications to add"
          aria-keyshortcuts={`${primaryModifier}+Shift+M Shift+Enter`}
          placeholder={
            !open
              ? "Add Medication"
              : selectedProductTypes.size
                ? "Type product name"
                : "Search medication or type / to filter by product type"
          }
          className={cn(
            "bg-muted-background/20 border-primary has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-primary/30 w-full shadow-sm",
            selectedProductTypes.size > 0 && "max-sm:h-auto max-sm:flex-wrap"
          )}
          inputClassName="placeholder:text-muted-foreground"
          showTrigger={false}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              event.shiftKey &&
              !event.altKey &&
              !event.ctrlKey &&
              !event.metaKey
            ) {
              const activeOptionId = event.currentTarget.getAttribute(
                "aria-activedescendant"
              );
              const medicine = activeOptionId
                ? document.getElementById(activeOptionId)?.dataset.medicine
                : undefined;
              if (medicine) {
                event.preventDefault();
                event.stopPropagation();
                toggleStar(medicine);
                return;
              }
            }
            if (event.key === "Tab" && !event.shiftKey && hasActiveFilters) {
              const clearButton =
                fieldRef.current?.querySelector<HTMLButtonElement>(
                  'button[aria-label="Clear all filters"]'
                );
              if (clearButton) {
                event.preventDefault();
                setTimeout(() => clearButton.focus());
                return;
              }
            }
            if (event.key === "Tab" && event.shiftKey && open) {
              event.preventDefault();
              fieldRef.current
                ?.querySelector<HTMLButtonElement>(
                  'button[aria-label="Filter by type"]'
                )
                ?.focus();
              return;
            }
            if (
              event.key === "Escape" &&
              typeFiltersOpen &&
              categoryProductType
            ) {
              event.preventDefault();
              event.stopPropagation();
              backToProductTypes();
              return;
            }
            if (
              (event.key === "Backspace" || event.key === "Delete") &&
              event.currentTarget.value === ""
            ) {
              const lastCategory = MEDICATION_PRODUCT_CATEGORIES.filter(
                ({ productType, category }) =>
                  selectedProductCategories.has(
                    productCategoryKey(productType, category)
                  )
              ).at(-1);
              if (lastCategory) {
                event.preventDefault();
                event.stopPropagation();
                removeProductCategoryFilter(
                  lastCategory.productType,
                  lastCategory.category
                );
                return;
              }

              const lastProductType = MEDICATION_PRODUCT_TYPES.filter(
                (productType) => selectedProductTypes.has(productType)
              ).at(-1);
              if (lastProductType) {
                event.preventDefault();
                event.stopPropagation();
                removeProductTypeFilter(lastProductType);
                return;
              }
            }
            if (
              event.key === "/" &&
              !event.metaKey &&
              !event.ctrlKey &&
              !event.altKey
            ) {
              event.preventDefault();
              setSearch("");
              showTypeFilters();
            }
          }}
        >
          <InputGroupAddon
            align="inline-start"
            className={cn(
              "text-primary gap-1.5",
              selectedProductTypes.size > 0 && "max-sm:basis-full"
            )}
          >
            {selectedProductTypes.size ? (
              <Search aria-hidden="true" />
            ) : (
              <Plus aria-hidden="true" />
            )}
            {MEDICATION_PRODUCT_TYPES.filter((productType) =>
              selectedProductTypes.has(productType)
            ).map((productType) => (
              <Badge
                key={productType}
                variant="purple"
                onKeyDown={handleBadgeDeleteKeyDown}
                onClose={(event) => {
                  event.stopPropagation();
                  removeProductTypeFilter(productType);
                }}
                className="max-w-full"
              >
                <span className="truncate">{productType}</span>
              </Badge>
            ))}
            {MEDICATION_PRODUCT_CATEGORIES.filter(({ productType, category }) =>
              selectedProductCategories.has(
                productCategoryKey(productType, category)
              )
            ).map(({ productType, category }) => (
              <Badge
                key={productCategoryKey(productType, category)}
                variant="success"
                onKeyDown={handleBadgeDeleteKeyDown}
                onClose={(event) => {
                  event.stopPropagation();
                  removeProductCategoryFilter(productType, category);
                }}
                className="max-w-full"
              >
                <span className="truncate">{category}</span>
              </Badge>
            ))}
          </InputGroupAddon>
          <InputGroupAddon
            align="inline-end"
            className="gap-1 pr-0.5 has-[>button]:mr-0 has-[>kbd]:mr-0"
          >
            <KbdGroup
              aria-hidden="true"
              className={cn((open || inputFocused) && "invisible")}
            >
              <Kbd>{primaryModifier === "Meta" ? "⌘" : "Ctrl"}</Kbd>
              <Kbd>Shift</Kbd>
              <Kbd>M</Kbd>
            </KbdGroup>
            {hasActiveFilters && (
              <InputGroupButton
                variant="ghost"
                size="xs"
                aria-label="Clear all filters"
                className="gap-1"
                onPointerDown={(event) => event.preventDefault()}
                onClick={(event) => {
                  event.stopPropagation();
                  clearAllFilters();
                  fieldRef.current
                    ?.querySelector<HTMLInputElement>("input")
                    ?.focus();
                }}
              >
                <X aria-hidden="true" />
                Clear
              </InputGroupButton>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Filter by type"
                  aria-expanded={typeFiltersOpen}
                  aria-controls={typeFiltersId}
                  onKeyDown={(event) => {
                    if (event.key !== "Tab" || event.shiftKey) {
                      return;
                    }
                    event.preventDefault();
                    if (typeFiltersOpen) focusFirstTypeFilterOption();
                    else focusSourceFilters();
                  }}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={(event) => {
                    event.stopPropagation();
                    showTypeFilters();
                  }}
                >
                  <ListFilter aria-hidden="true" />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Filter by type</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </ComboboxInput>
      </div>
      <ComboboxContent
        anchor={fieldRef}
        data-chips={false}
        collisionAvoidance={{
          side: "flip",
          align: "shift",
          fallbackAxisSide: "end",
        }}
        collisionBoundary={
          typeof document === "undefined" ? undefined : document.documentElement
        }
        className="max-h-[min(34rem,calc(100dvh-5rem))] w-(--anchor-width) max-w-3xl min-w-0 overflow-y-auto shadow-lg data-closed:animate-none data-closed:duration-0 data-open:animate-none data-open:duration-0"
      >
        {!typeFiltersOpen && (
          <div
            ref={sourceFiltersRef}
            role="group"
            aria-label="Filter medicines by source"
            className="flex flex-wrap gap-2 border-b p-2"
          >
            {MEDICATION_SOURCES.map((source) => {
              const selected = selectedSources.has(source);
              return (
                <Toggle
                  key={source}
                  type="button"
                  variant="outline"
                  pressed={selected}
                  aria-label={source}
                  onPressedChange={() => toggleSource(source)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Tab" &&
                      event.shiftKey &&
                      source === MEDICATION_SOURCES[0]
                    ) {
                      event.preventDefault();
                      fieldRef.current
                        ?.querySelector<HTMLButtonElement>(
                          'button[aria-label="Filter by type"]'
                        )
                        ?.focus();
                      return;
                    }
                    if (event.key !== "ArrowDown") return;
                    event.preventDefault();
                    focusFirstProductOption();
                  }}
                  className="gap-2 px-4"
                >
                  {selected && <Check aria-hidden="true" />}
                  {source}
                </Toggle>
              );
            })}
          </div>
        )}
        {typeFiltersOpen && categoryProductType && (
          <div className="bg-popover sticky top-0 z-10 flex items-center gap-1.5 border-b px-2 py-2 text-xs font-medium">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Back to product types"
              onPointerDown={(event) => event.preventDefault()}
              onClick={(event) => {
                event.stopPropagation();
                backToProductTypes();
              }}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <span>Filter {categoryProductType} by category</span>
          </div>
        )}
        <ComboboxList
          showScrollbar
          className="max-h-[min(28rem,calc(100dvh-12rem))] overflow-y-auto p-2"
        >
          {(group, groupIndex) => (
            <ComboboxGroup
              key={group.value}
              id={
                group.value === PRODUCT_TYPE_FILTER_GROUP ||
                group.value === PRODUCT_CATEGORY_FILTER_GROUP
                  ? typeFiltersId
                  : undefined
              }
              items={group.items}
            >
              {group.value !== PRODUCT_CATEGORY_FILTER_GROUP && (
                <ComboboxLabel className="px-2 py-2 text-xs font-medium">
                  {group.value === PRODUCT_TYPE_FILTER_GROUP
                    ? "Filter by product type"
                    : group.value}
                </ComboboxLabel>
              )}
              <ComboboxCollection>
                {(option: string) => renderPickerOption(group, option)}
              </ComboboxCollection>
              {groupIndex < groups.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
        {matching.length === 0 && (
          <div
            className="text-muted-foreground border-t px-3 py-3 text-sm"
            role="status"
          >
            No medicines match your search.
          </div>
        )}
        <div className="sr-only" role="status" aria-live="polite">
          {favoriteAnnouncement}
        </div>
      </ComboboxContent>
    </Combobox>
  );
}

function VaccinationRequestExample() {
  const [vaccinations, setVaccinations] = React.useState<VaccinationRequest[]>(
    () => [
      {
        id: uid(),
        vaccine: "Influenza vaccine (inactivated)",
        dose: "Dose 1 of 1",
        doseAmount: "0.5 mL",
        route: "Intramuscular",
        site: "Left deltoid",
        plannedDate: "",
        indication: "Seasonal influenza prevention",
      },
    ]
  );

  const updateVaccination = (
    vaccinationId: string,
    patch: Partial<VaccinationRequest>
  ) =>
    setVaccinations((current) =>
      current.map((vaccination) =>
        vaccination.id === vaccinationId
          ? { ...vaccination, ...patch }
          : vaccination
      )
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vaccination / immunisation request</CardTitle>
        <CardDescription>
          Specify the vaccine, dose series, amount, route, site, and planned
          date.
        </CardDescription>
        <CardAction>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setVaccinations((current) => [
                ...current,
                {
                  id: uid(),
                  vaccine: "",
                  dose: "Dose 1 of 1",
                  doseAmount: "",
                  route: "Intramuscular",
                  site: "",
                  plannedDate: "",
                  indication: "",
                },
              ])
            }
          >
            <Plus data-icon="inline-start" />
            Add vaccine
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="divide-border divide-y border-y">
          {vaccinations.map((vaccination, index) => {
            const idPrefix = `vaccination-${vaccination.id}`;
            return (
              <div
                key={vaccination.id}
                className="grid min-w-0 gap-3 py-4 sm:grid-cols-2 xl:grid-cols-4"
              >
                <Field className="min-w-0">
                  <FieldLabel htmlFor={`${idPrefix}-vaccine`}>
                    Vaccine
                  </FieldLabel>
                  <Select
                    value={vaccination.vaccine}
                    onValueChange={(value) =>
                      value &&
                      updateVaccination(vaccination.id, { vaccine: value })
                    }
                  >
                    <SelectTrigger
                      id={`${idPrefix}-vaccine`}
                      className="bg-background w-full min-w-0"
                      aria-label={`Vaccine for request ${index + 1}`}
                    >
                      <SelectValue
                        className="min-w-0 truncate"
                        placeholder="Select vaccine"
                      />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      {VACCINES.map((vaccine) => (
                        <SelectItem key={vaccine} value={vaccine}>
                          {vaccine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field className="min-w-0">
                  <FieldLabel htmlFor={`${idPrefix}-dose`}>
                    Dose / series
                  </FieldLabel>
                  <Select
                    value={vaccination.dose}
                    onValueChange={(value) =>
                      value &&
                      updateVaccination(vaccination.id, { dose: value })
                    }
                  >
                    <SelectTrigger
                      id={`${idPrefix}-dose`}
                      className="bg-background w-full"
                      aria-label={`Dose series for request ${index + 1}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      {VACCINE_DOSES.map((dose) => (
                        <SelectItem key={dose} value={dose}>
                          {dose}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field className="min-w-0">
                  <FieldLabel htmlFor={`${idPrefix}-amount`}>
                    Dose amount
                  </FieldLabel>
                  <Input
                    id={`${idPrefix}-amount`}
                    value={vaccination.doseAmount}
                    placeholder="e.g. 0.5 mL"
                    aria-label={`Vaccine dose amount for request ${index + 1}`}
                    onChange={(event) =>
                      updateVaccination(vaccination.id, {
                        doseAmount: event.target.value,
                      })
                    }
                  />
                </Field>
                <Field className="min-w-0">
                  <FieldLabel htmlFor={`${idPrefix}-route`}>Route</FieldLabel>
                  <Select
                    value={vaccination.route}
                    onValueChange={(value) =>
                      value &&
                      updateVaccination(vaccination.id, { route: value })
                    }
                  >
                    <SelectTrigger
                      id={`${idPrefix}-route`}
                      className="bg-background w-full"
                      aria-label={`Administration route for request ${index + 1}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      {VACCINE_ROUTES.map((route) => (
                        <SelectItem key={route} value={route}>
                          {route}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field className="min-w-0">
                  <FieldLabel htmlFor={`${idPrefix}-site`}>
                    Administration site
                  </FieldLabel>
                  <Select
                    value={vaccination.site}
                    onValueChange={(value) =>
                      updateVaccination(vaccination.id, { site: value ?? "" })
                    }
                  >
                    <SelectTrigger
                      id={`${idPrefix}-site`}
                      className="bg-background w-full"
                      aria-label={`Administration site for request ${index + 1}`}
                    >
                      <SelectValue placeholder="Select site" />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      {VACCINE_SITES.map((site) => (
                        <SelectItem key={site} value={site}>
                          {site}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field className="min-w-0">
                  <FieldLabel htmlFor={`${idPrefix}-date`}>
                    Planned date
                  </FieldLabel>
                  <Input
                    id={`${idPrefix}-date`}
                    type="date"
                    value={vaccination.plannedDate}
                    aria-label={`Planned vaccination date for request ${index + 1}`}
                    onChange={(event) =>
                      updateVaccination(vaccination.id, {
                        plannedDate: event.target.value,
                      })
                    }
                  />
                </Field>
                <Field className="min-w-0">
                  <FieldLabel htmlFor={`${idPrefix}-indication`}>
                    Indication
                  </FieldLabel>
                  <Input
                    id={`${idPrefix}-indication`}
                    value={vaccination.indication}
                    placeholder="Reason for vaccination"
                    aria-label={`Vaccination indication for request ${index + 1}`}
                    onChange={(event) =>
                      updateVaccination(vaccination.id, {
                        indication: event.target.value,
                      })
                    }
                  />
                </Field>
                <div className="flex items-end justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remove vaccine request ${index + 1}`}
                    disabled={vaccinations.length === 1}
                    onClick={() =>
                      setVaccinations((current) =>
                        current.filter((item) => item.id !== vaccination.id)
                      )
                    }
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Template ─────────────────────────────────────────────────────────────────

export function MedicationRequestTemplate() {
  const [medications, setMedications] = React.useState(createInitialData);
  const [requester, setRequester] = React.useState(REQUESTERS[0].value);
  const [requestNote, setRequestNote] = React.useState("");
  const [dense, setDense] = React.useState(false);
  const [cellBorder, setCellBorder] = React.useState(true);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [doseRowHeights, setDoseRowHeights] = React.useState<
    Record<string, number>
  >({});
  const [focusDoseId, setFocusDoseId] = React.useState<string | null>(null);
  const [durationFocusDoseId, focusDuration] = React.useState<string | null>(
    null
  );
  const instructionPicks = useFavoritePicks(DEFAULT_FAVORITE_INSTRUCTIONS, [
    "Until symptoms improve",
    "Then stop",
  ]);
  const prnReasonPicks = useFavoritePicks(DEFAULT_FAVORITE_PRN_REASONS);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const [optionsTarget, setOptionsTarget] =
    React.useState<MedicationOptionsTarget | null>(null);
  const optionsTriggerRef = React.useRef<HTMLButtonElement>(null);

  const updateMedication = React.useCallback(
    (medId: string, update: (m: MedicationRequest) => MedicationRequest) =>
      setMedications((prev) =>
        prev.map((m) => (m.id === medId ? update(m) : m))
      ),
    []
  );

  const setDoseRowHeight = React.useCallback(
    (doseId: string, height: number | null) => {
      setDoseRowHeights((previous) => {
        if (height === null) {
          if (!(doseId in previous)) return previous;
          const next = { ...previous };
          delete next[doseId];
          return next;
        }
        if (previous[doseId] === height) return previous;
        return { ...previous, [doseId]: height };
      });
    },
    []
  );

  const actions = React.useMemo<MedicationGridActions>(
    () => ({
      openOptions: (medicationId, doseId, trigger) => {
        optionsTriggerRef.current = trigger;
        setOptionsTarget({ medicationId, doseId });
        setActiveId(medicationId);
      },
      doseRowHeights,
      setDoseRowHeight,
      updateDose: (medId, doseId, patch) =>
        updateMedication(medId, (m) => ({
          ...m,
          doses: m.doses.map((d) => (d.id === doseId ? { ...d, ...patch } : d)),
        })),
      addDose: (medId) => {
        const dose = createDose({ dosage: "" });
        setFocusDoseId(dose.id);
        updateMedication(medId, (m) => ({
          ...m,
          doses: [
            ...m.doses,
            {
              ...dose,
              dosage: parseDosage(m.doses.at(-1)?.dosage ?? "").unit,
            },
          ],
        }));
      },
      removeDose: (medId, doseId) =>
        updateMedication(medId, (m) => ({
          ...m,
          doses: m.doses.filter((d) => d.id !== doseId),
        })),
      removeMedication: (medId) =>
        setMedications((prev) => prev.filter((m) => m.id !== medId)),
      updateNote: (medId, note) =>
        updateMedication(medId, (m) => ({ ...m, note })),
      activeId,
      setActiveId,
      instructionPicks,
      prnReasonPicks,
      durationFocusDoseId,
      focusDuration,
    }),
    [
      updateMedication,
      activeId,
      doseRowHeights,
      setDoseRowHeight,
      instructionPicks,
      prnReasonPicks,
      durationFocusDoseId,
    ]
  );

  // Clear the active row when focus or a click lands outside the grid and its popups.
  React.useEffect(() => {
    const handleOutside = (event: Event) => {
      const target = event.target as Element | null;
      if (
        !target ||
        gridRef.current?.contains(target) ||
        target.closest('[data-slot$="-content"]')
      ) {
        return;
      }
      // An outside press that only dismisses a grid popup returns focus to its trigger.
      if (
        event.type === "pointerdown" &&
        gridRef.current?.querySelector('[aria-haspopup][aria-expanded="true"]')
      ) {
        return;
      }
      setActiveId(null);
    };
    // Capture on window so this runs before popups react to the outside press.
    window.addEventListener("pointerdown", handleOutside, true);
    document.addEventListener("focusin", handleOutside);
    return () => {
      window.removeEventListener("pointerdown", handleOutside, true);
      document.removeEventListener("focusin", handleOutside);
    };
  }, []);

  const addMedicines = (
    entries: { medicine: string; dose?: Partial<DoseLine> }[]
  ) => {
    const created = entries.map(({ medicine, dose }) =>
      createMedication(medicine, { doses: [createDose(dose)] })
    );
    setMedications((prev) => [...prev, ...created]);
    setActiveId(created[0].id);
    setFocusDoseId(created[0].doses[0].id);
  };

  // Wait a frame so closing menus/comboboxes don't steal focus back.
  React.useEffect(() => {
    if (!focusDoseId) return;
    let settleFrame = 0;
    const frame = requestAnimationFrame(() => {
      settleFrame = requestAnimationFrame(() => {
        const input = document.getElementById(`${focusDoseId}-dosage`);
        if (!input) return;
        input.focus();
        scrollMedicationDoseIntoView(focusDoseId);
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(settleFrame);
    };
  }, [focusDoseId]);

  const activeRequester = REQUESTERS.find((r) => r.value === requester);

  return (
    <MedicationGridContext.Provider value={actions}>
      <TooltipProvider delay={150}>
        <Card className="overflow-visible">
          <CardHeader>
            <CardTitle>
              Advice medicine{" "}
              <span className="text-destructive" aria-hidden="true">
                *
              </span>
            </CardTitle>
            <CardDescription>
              {medications.length}{" "}
              {medications.length === 1 ? "medicine" : "medicines"} in this
              request
            </CardDescription>
            <CardAction className="flex flex-wrap justify-end gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label="Medication history"
                  >
                    <History />
                    <span className="hidden sm:inline">Medication history</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Previously prescribed</DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  {MEDICATION_HISTORY.map((entry) => (
                    <DropdownMenuItem
                      key={entry.medicine}
                      className="flex-col items-start gap-0.5"
                      onClick={() =>
                        addMedicines([
                          {
                            medicine: entry.medicine,
                            dose: {
                              schedule: entry.schedule,
                              duration: entry.duration,
                            },
                          },
                        ])
                      }
                    >
                      <span>{entry.medicine}</span>
                      <span className="text-muted-foreground text-xs">
                        {entry.schedule} · {entry.duration} · {entry.date}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" aria-label="Template">
                    <ClipboardList />
                    <span className="hidden sm:inline">Template</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Apply a template</DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  {MEDICATION_TEMPLATES.map((template) => (
                    <DropdownMenuItem
                      key={template.name}
                      className="flex-col items-start gap-0.5"
                      onClick={() =>
                        addMedicines(
                          template.medicines.map((medicine) => ({ medicine }))
                        )
                      }
                    >
                      <span>{template.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {template.medicines.length} medicines
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Table settings"
                  >
                    <Settings2 />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Table settings</DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={dense}
                    onCheckedChange={(value) => setDense(!!value)}
                  >
                    Compact rows
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={cellBorder}
                    onCheckedChange={(value) => setCellBorder(!!value)}
                  >
                    Cell borders
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            {medications.length === 0 ? (
              <Empty className="border p-8">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Pill aria-hidden="true" />
                  </EmptyMedia>
                  <EmptyTitle>No medicines added</EmptyTitle>
                  <EmptyDescription>
                    Search below to add a medicine, or start from a template or
                    medication history.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <>
                {/* Clicks on the spanned Sl./Medicine cells focus that row's first dosage input. */}
                <div
                  ref={gridRef}
                  onFocusCapture={(event) => {
                    if (!(event.target instanceof Element)) return;
                    if (
                      event.target.closest("[data-medication-note-preview]")
                    ) {
                      return;
                    }
                    const medicationId = event.target.closest<HTMLElement>(
                      "[data-medication-row-id]"
                    )?.dataset.medicationRowId;
                    if (medicationId) setActiveId(medicationId);
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key !== "Tab" ||
                      event.altKey ||
                      event.ctrlKey ||
                      event.metaKey ||
                      !gridRef.current?.contains(event.target as Node)
                    ) {
                      return;
                    }
                    const order = gridTabOrder(gridRef.current);
                    const index = order.indexOf(event.target as HTMLElement);
                    if (index === -1) return;
                    const next = order[index + (event.shiftKey ? -1 : 1)];
                    if (next) {
                      event.preventDefault();
                      next.focus();
                      return;
                    }
                    // At either end, hand off from the DOM edge so the browser leaves the grid naturally.
                    const domOrder = focusableIn(gridRef.current);
                    domOrder[event.shiftKey ? 0 : domOrder.length - 1]?.focus();
                  }}
                  onClick={(event) =>
                    (event.target as Element)
                      .closest("td[rowspan]")
                      ?.closest("tbody")
                      ?.querySelector<HTMLInputElement>("input")
                      ?.focus()
                  }
                >
                  <DataTable
                    columns={columns}
                    data={medications}
                    hideToolbar
                    cellBorder={cellBorder}
                    dense={dense}
                    defaultExpanded={true}
                    className={gridClassName}
                    renderExpandedRow={(row) => (
                      <div data-medication-row-id={row.original.id}>
                        <NoteRow
                          key={row.original.id}
                          medication={row.original}
                        />
                      </div>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-[minmax(0,18rem)_1fr]">
                  <Field>
                    <FieldLabel htmlFor="medication-requester">
                      Requester for all entries
                    </FieldLabel>
                    <Select
                      value={requester}
                      onValueChange={(value) => value && setRequester(value)}
                    >
                      <SelectTrigger
                        id="medication-requester"
                        className="w-full"
                      >
                        <SelectValue>
                          {activeRequester && (
                            <>
                              <Avatar size="sm">
                                <AvatarFallback>
                                  {activeRequester.initials}
                                </AvatarFallback>
                              </Avatar>
                              {activeRequester.name}
                            </>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent alignItemWithTrigger={false}>
                        {REQUESTERS.map((person) => (
                          <SelectItem key={person.value} value={person.value}>
                            <Avatar size="sm">
                              <AvatarFallback>{person.initials}</AvatarFallback>
                            </Avatar>
                            {person.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="medication-request-note">
                      Note
                    </FieldLabel>
                    <Input
                      id="medication-request-note"
                      placeholder="Add a note for the whole request"
                      value={requestNote}
                      onChange={(e) => setRequestNote(e.target.value)}
                    />
                  </Field>
                </div>
              </>
            )}
            <div
              data-slot="medication-picker-sticky"
              className="bg-card/95 sticky bottom-0 z-30 -mx-6 mt-auto border-t px-6 py-3 backdrop-blur"
            >
              {/* Remount when the list empties so the suggestions open again. */}
              <MedicationPicker
                key={medications.length === 0 ? "empty" : "filled"}
                defaultOpen={medications.length === 0}
                onSelect={(medicine) => addMedicines([{ medicine }])}
              />
            </div>
          </CardContent>
        </Card>
        <MedicationOptionsSheet
          medications={medications}
          target={optionsTarget}
          onTargetChange={setOptionsTarget}
          defaultRequester={requester}
          onUpdate={(medicationId, patch) =>
            updateMedication(medicationId, (medication) => ({
              ...medication,
              ...patch,
            }))
          }
          returnFocusRef={optionsTriggerRef}
        />
        <VaccinationRequestExample />
      </TooltipProvider>
    </MedicationGridContext.Provider>
  );
}
