import React from "react";
import {
  AlertCircleIcon,
  AtSignIcon,
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  GlobeIcon,
  LinkIcon,
  ListFilterIcon,
  MailIcon,
  PhoneIcon,
  SlidersVerticalIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import { type ComponentDoc } from "@/lib/types";
import { Indicator } from "@/components/ui/indicator";
import {
  createFilter,
  FilterPanel,
  Filters,
  type Filter,
  type FilterFieldConfig,
  type FilterI18nConfig,
  type SavedFilter,
} from "@/components/ui/filters";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ─── Shared field configs ────────────────────────────────────────────────────

const statusOptions = [
  {
    value: "in_progress",
    label: "In Progress",
    icon: React.createElement(Indicator, { tone: "blue", size: "md" }),
  },
  {
    value: "completed",
    label: "Completed",
    icon: React.createElement(Indicator, { tone: "green", size: "md" }),
  },
  {
    value: "blocked",
    label: "Blocked",
    icon: React.createElement(Indicator, { tone: "red", size: "md" }),
  },
];

const tagOptions = [
  {
    value: "design",
    label: "Design",
    icon: React.createElement(Indicator, { tone: "pink", size: "md" }),
  },
  {
    value: "engineering",
    label: "Engineering",
    icon: React.createElement(Indicator, { tone: "blue", size: "md" }),
  },
  {
    value: "research",
    label: "Research",
    icon: React.createElement(Indicator, { tone: "amber", size: "md" }),
  },
];

const priorityOptions = [
  {
    value: "low",
    label: "Low",
    icon: React.createElement(Indicator, { tone: "green", size: "md" }),
  },
  {
    value: "medium",
    label: "Medium",
    icon: React.createElement(Indicator, { tone: "yellow", size: "md" }),
  },
  {
    value: "high",
    label: "High",
    icon: React.createElement(Indicator, { tone: "orange", size: "md" }),
  },
  {
    value: "urgent",
    label: "Urgent",
    icon: React.createElement(Indicator, { tone: "red", size: "md" }),
  },
];

// ─── Preview: All field types (matches c-filters-1) ──────────────────────────

const previewFields: FilterFieldConfig[] = [
  {
    key: "text",
    label: "Text",
    type: "text",
    icon: React.createElement(MailIcon, { className: "size-4" }),
    placeholder: "Search text...",
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    icon: React.createElement(CircleDashedIcon, { className: "size-4" }),
    defaultOperator: "is",
    options: statusOptions,
    customValueRenderer: (values, options) => {
      const selected = options.find((o) => o.value === values[0]);
      if (!selected) return "Select";
      const pillClass =
        selected.value === "completed"
          ? "rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-emerald-700 dark:text-emerald-400"
          : selected.value === "blocked"
            ? "rounded-md bg-red-500/15 px-1.5 py-0.5 text-red-700 dark:text-red-400"
            : "rounded-md bg-blue-500/15 px-1.5 py-0.5 text-blue-700 dark:text-blue-400";
      return React.createElement(
        "span",
        { className: pillClass },
        selected.label
      );
    },
  },
  {
    key: "priority",
    label: "Priority",
    type: "multiselect",
    icon: React.createElement(AlertCircleIcon, { className: "size-4" }),
    defaultOperator: "is_any_of",
    options: priorityOptions,
  },
  {
    key: "startDate",
    label: "Start Date",
    type: "select",
    icon: React.createElement(CalendarIcon, { className: "size-4" }),
    defaultOperator: "after",
    operators: [
      { value: "after", label: "since" },
      { value: "before", label: "before" },
      { value: "between", label: "between" },
    ],
    options: [
      { value: "2025-07-01", label: "1 Jul 2025" },
      { value: "2025-08-01", label: "1 Aug 2025" },
      { value: "2025-09-01", label: "1 Sep 2025" },
    ],
  },
  {
    key: "tag",
    label: "Tag",
    type: "multiselect",
    icon: React.createElement(TagIcon, { className: "size-4" }),
    defaultOperator: "includes_all",
    operators: [
      { value: "includes_all", label: "Has all of" },
      { value: "is_any_of", label: "Has any of" },
      { value: "is_not_any_of", label: "Excludes" },
    ],
    options: tagOptions,
    customValueRenderer: (values, options) => {
      const selected = options.filter((o) => values.includes(o.value));
      if (selected.length === 0) return "Select";
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          {
            className: "flex items-center",
            "aria-hidden": true,
          },
          selected
            .slice(0, 3)
            .map((o) =>
              React.createElement(
                "span",
                { key: String(o.value), className: "inline-flex items-center" },
                o.icon
              )
            )
        ),
        React.createElement(
          "span",
          { className: "underline underline-offset-4" },
          selected.length === 1 ? selected[0].label : `${selected.length} tags`
        )
      );
    },
  },
];

function FiltersDemo() {
  const [filters, setFilters] = React.useState<Filter[]>([
    createFilter("priority", "is_any_of", ["low", "medium"]),
  ]);
  return React.createElement(
    "div",
    { className: "flex grow items-start gap-2.5" },
    React.createElement(
      "div",
      { className: "flex-1" },
      React.createElement(Filters, {
        filters,
        fields: previewFields,
        onChange: setFilters,
        enableShortcut: true,
        shortcutKey: "f",
        shortcutLabel: "F",
        trigger: React.createElement(
          Button,
          { variant: "outline" },
          React.createElement(ListFilterIcon, { className: "size-4" }),
          "Add Filter"
        ),
      })
    ),
    filters.length > 0 &&
      React.createElement(
        Button,
        { variant: "outline", onClick: () => setFilters([]) },
        "Clear"
      )
  );
}

// ─── Validation (matches c-filters-2) ────────────────────────────────────────

const validationFields: FilterFieldConfig[] = [
  {
    key: "email",
    label: "Email",
    icon: React.createElement(AtSignIcon, { className: "size-3.5" }),
    type: "text",
    placeholder: "user@example.com",
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    validation: (value) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(value as string)) {
        return { valid: false, message: "Please enter a valid email address" };
      }
      return { valid: true };
    },
  },
  {
    key: "website",
    label: "Website",
    icon: React.createElement(GlobeIcon, { className: "size-3.5" }),
    type: "text",
    placeholder: "https://example.com",
    validation: (value) => {
      const pattern = /^https?:\/\/.+\..+/;
      if (!pattern.test(value as string)) {
        return {
          valid: false,
          message: "URL must start with http:// or https://",
        };
      }
      return { valid: true };
    },
  },
  {
    key: "phone",
    label: "Phone",
    icon: React.createElement(PhoneIcon, { className: "size-3.5" }),
    type: "text",
    placeholder: "+1234567890",
    validation: (value) => {
      const pattern = /^\+?[1-9]\d{1,14}$/;
      if (!pattern.test(value as string)) {
        return { valid: false, message: "Please enter a valid phone number" };
      }
      return { valid: true };
    },
  },
  {
    key: "username",
    label: "Username",
    icon: React.createElement(UserIcon, { className: "size-3.5" }),
    type: "text",
    className: "w-44",
    placeholder: "john_doe",
    validation: (value) => {
      const str = value as string;
      if (str.length < 3)
        return { valid: false, message: "At least 3 characters" };
      if (str.length > 20)
        return { valid: false, message: "At most 20 characters" };
      if (!/^[a-zA-Z0-9_]+$/.test(str))
        return {
          valid: false,
          message: "Only letters, numbers, and underscores",
        };
      return { valid: true };
    },
  },
  {
    key: "customUrl",
    label: "Custom URL",
    icon: React.createElement(LinkIcon, { className: "size-3.5" }),
    type: "text",
    placeholder: "https://...",
    validation: (value) => {
      const urlPattern = /^https?:\/\/.+\..+/;
      if (!urlPattern.test(value as string)) {
        return {
          valid: false,
          message: "URL must start with http:// or https://",
        };
      }
      return { valid: true };
    },
  },
];

function FiltersValidationDemo() {
  const [filters, setFilters] = React.useState<Filter[]>([
    createFilter("email", "contains", [""]),
  ]);
  return React.createElement(Filters, {
    filters,
    fields: validationFields,
    onChange: setFilters,
    trigger: React.createElement(
      Button,
      { variant: "outline", size: "icon" },
      React.createElement(ListFilterIcon, { className: "size-4" })
    ),
  });
}

// ─── Trigger Button (matches c-filters-3) ────────────────────────────────────

const triggerFields: FilterFieldConfig[] = [
  {
    key: "text",
    label: "Text",
    icon: React.createElement(TagIcon, { className: "size-3.5" }),
    type: "text",
    className: "w-36",
    placeholder: "Search text...",
  },
  {
    key: "email",
    label: "Email",
    icon: React.createElement(MailIcon, { className: "size-3.5" }),
    type: "text",
    className: "w-40",
    placeholder: "user@example.com",
  },
  {
    key: "priority",
    label: "Priority",
    icon: React.createElement(AlertCircleIcon, { className: "size-3.5" }),
    type: "multiselect",
    options: priorityOptions,
  },
];

function FiltersTriggerDemo() {
  const [filters, setFilters] = React.useState<Filter[]>([
    createFilter("priority", "is_any_of", ["high", "urgent"]),
  ]);
  return React.createElement(
    "div",
    { className: "flex grow items-start gap-2.5" },
    React.createElement(
      "div",
      { className: "flex-1" },
      React.createElement(Filters, {
        filters,
        fields: triggerFields,
        onChange: setFilters,
        trigger: React.createElement(
          Button,
          { variant: "outline", size: "icon" },
          React.createElement(ListFilterIcon, { className: "size-4" })
        ),
      })
    ),
    filters.length > 0 &&
      React.createElement(
        Button,
        { variant: "outline", onClick: () => setFilters([]) },
        "Clear"
      )
  );
}

// ─── Size variants (matches c-filters-4 / c-filters-5) ──────────────────────

const sizeFields: FilterFieldConfig[] = [
  {
    key: "text",
    label: "Text",
    icon: React.createElement(TagIcon, { className: "size-3.5" }),
    type: "text",
    className: "w-36",
    placeholder: "Search text...",
  },
  {
    key: "email",
    label: "Email",
    icon: React.createElement(MailIcon, { className: "size-3.5" }),
    type: "text",
    className: "w-48",
    placeholder: "user@example.com",
  },
  {
    key: "status",
    label: "Status",
    icon: React.createElement(ClockIcon, { className: "size-3.5" }),
    type: "select",
    options: [
      { value: "todo", label: "To Do" },
      { value: "in-progress", label: "In Progress" },
      { value: "done", label: "Done" },
      { value: "cancelled", label: "Cancelled" },
    ],
  },
  {
    key: "priority",
    label: "Priority",
    icon: React.createElement(AlertCircleIcon, { className: "size-3.5" }),
    type: "multiselect",
    options: priorityOptions,
  },
];

function FiltersLargeDemo() {
  const [filters, setFilters] = React.useState<Filter[]>([
    createFilter("priority", "is_any_of", ["high", "urgent"]),
  ]);
  return React.createElement(Filters, {
    filters,
    fields: sizeFields,
    onChange: setFilters,
    size: "lg",
    trigger: React.createElement(
      Button,
      { variant: "outline", size: "icon-lg" },
      React.createElement(ListFilterIcon, { className: "size-4" })
    ),
  });
}

// ─── Custom Controls (matches c-filters-6) ───────────────────────────────────

function CustomSliderRangeInput({
  values,
  onChange,
}: {
  values: unknown[];
  onChange: (values: unknown[]) => void;
}) {
  const initial =
    values?.[0] &&
    typeof values[0] === "object" &&
    values[0] !== null &&
    "min" in values[0] &&
    "max" in values[0]
      ? [
          (values[0] as { min: number; max: number }).min,
          (values[0] as { min: number; max: number }).max,
        ]
      : [20, 80];

  const [range, setRange] = React.useState<number[]>(initial);
  const [isOpen, setIsOpen] = React.useState(false);

  return React.createElement(
    Popover,
    { open: isOpen, onOpenChange: setIsOpen },
    React.createElement(
      PopoverTrigger,
      { asChild: true },
      React.createElement(
        Button,
        {
          variant: "outline",
          className: "font-normal tabular-nums",
        },
        `${range[0]} – ${range[1]}`
      )
    ),
    React.createElement(
      PopoverContent,
      { className: "w-auto p-4", align: "start", sideOffset: 8 },
      React.createElement(
        "div",
        { className: "space-y-2.5" },
        React.createElement(
          "div",
          { className: "space-y-4 pt-2.5" },
          React.createElement(Slider, {
            value: range,
            onValueChange: (v) => setRange(Array.isArray(v) ? v : [v]),
            max: 100,
            min: 0,
            step: 1,
            className: "w-50",
          }),
          React.createElement(
            "div",
            {
              className:
                "text-muted-foreground flex justify-between ps-1.5 text-xs",
            },
            React.createElement("span", null, "0"),
            React.createElement("span", null, "100")
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-end gap-1.5" },
          React.createElement(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setIsOpen(false),
            },
            "Cancel"
          ),
          React.createElement(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => {
                onChange([{ min: range[0], max: range[1] }]);
                setIsOpen(false);
              },
            },
            "Apply"
          )
        )
      )
    )
  );
}

const customControlFields: FilterFieldConfig[] = [
  {
    key: "dateRange",
    label: "Date Range",
    icon: React.createElement(CalendarIcon, { className: "size-3.5" }),
    type: "select",
    operators: [
      { value: "between", label: "between" },
      { value: "not_between", label: "not between" },
    ],
    options: [
      { value: "2025-01-01", label: "1 Jan 2025" },
      { value: "2025-06-01", label: "1 Jun 2025" },
      { value: "2025-12-31", label: "31 Dec 2025" },
    ],
  },
  {
    key: "sliderRange",
    label: "Slider Range",
    icon: React.createElement(SlidersVerticalIcon, { className: "size-3.5" }),
    type: "custom",
    operators: [
      { value: "between", label: "between" },
      { value: "not_between", label: "not between" },
    ],
    customRenderer: ({ values, onChange }) =>
      React.createElement(CustomSliderRangeInput, { values, onChange }),
  },
];

function FiltersCustomControlsDemo() {
  const [filters, setFilters] = React.useState<Filter[]>([
    createFilter("sliderRange", "between", [{ min: 20, max: 80 }]),
  ]);
  return React.createElement(
    "div",
    { className: "flex grow items-start gap-2.5" },
    React.createElement(
      "div",
      { className: "flex-1" },
      React.createElement(Filters, {
        filters,
        fields: customControlFields,
        onChange: setFilters,
        trigger: React.createElement(
          Button,
          { variant: "outline", size: "icon" },
          React.createElement(ListFilterIcon, { className: "size-4" })
        ),
      })
    ),
    filters.length > 0 &&
      React.createElement(
        Button,
        { variant: "outline", onClick: () => setFilters([]) },
        "Clear"
      )
  );
}

// ─── Filter Panel (popover variant) ──────────────────────────────────────────

const panelFields: FilterFieldConfig[] = [
  {
    key: "status",
    label: "Status",
    icon: React.createElement(CircleDashedIcon, { className: "size-3.5" }),
    type: "select",
    options: statusOptions,
  },
  {
    key: "priority",
    label: "Priority",
    icon: React.createElement(AlertCircleIcon, { className: "size-3.5" }),
    type: "multiselect",
    options: priorityOptions,
  },
  {
    key: "tag",
    label: "Tags",
    icon: React.createElement(TagIcon, { className: "size-3.5" }),
    type: "multiselect",
    options: tagOptions,
  },
  {
    key: "assignee",
    label: "Assignee",
    icon: React.createElement(UserIcon, { className: "size-3.5" }),
    type: "text",
    placeholder: "Name...",
  },
  {
    key: "dueDate",
    label: "Due date",
    icon: React.createElement(CalendarIcon, { className: "size-3.5" }),
    type: "select",
    options: [
      { value: "2025-07-01", label: "1 Jul 2025" },
      { value: "2025-08-01", label: "1 Aug 2025" },
      { value: "2025-09-01", label: "1 Sep 2025" },
    ],
  },
];

function FilterPanelDemo() {
  const [filters, setFilters] = React.useState<Filter[]>([]);
  const [conjunction, setConjunction] = React.useState<"and" | "or">("and");
  const [savedFilters, setSavedFilters] = React.useState<SavedFilter[]>([
    {
      id: "saved-1",
      name: "High priority blocked",
      filters: [
        createFilter("priority", "is_any_of", ["high", "urgent"]),
        createFilter("status", "is", ["blocked"]),
      ],
      conjunction: "and",
    },
  ]);
  return React.createElement(FilterPanel, {
    filters,
    fields: panelFields,
    onChange: setFilters,
    conjunction,
    onConjunctionChange: setConjunction,
    savedFilters,
    onLoadSavedFilter: (saved: SavedFilter) => {
      setFilters(saved.filters);
      setConjunction(saved.conjunction);
    },
    onDeleteSavedFilter: (id: string) => {
      setSavedFilters((prev) => prev.filter((s) => s.id !== id));
    },
    onRenameSavedFilter: (id: string, name: string) => {
      setSavedFilters((prev) =>
        prev.map((s) => (s.id === id ? { ...s, name } : s))
      );
    },
    onSave: (
      name: string,
      currentFilters: Filter[],
      currentConjunction: "and" | "or"
    ) => {
      setSavedFilters((prev) => [
        ...prev,
        {
          id: `saved-${Date.now()}`,
          name,
          filters: currentFilters,
          conjunction: currentConjunction,
        },
      ]);
    },
  });
}

// ─── i18n Support (matches c-filters-9) ──────────────────────────────────────

const i18nConfigs: Record<string, Partial<FilterI18nConfig>> = {
  en: {},
  es: {
    addFilter: "Agregar filtro",
    clearAll: "Limpiar todo",
    removeFilter: "Eliminar filtro",
    changeOperator: "Cambiar operador",
    searchFields: "Buscar campos...",
    noFieldsFound: "No se encontraron campos.",
    noResultsFound: "No se encontraron resultados.",
    select: "Seleccionar...",
    addFilterTitle: "Agregar filtro",
    operators: {
      is: "es",
      isNot: "no es",
      isAnyOf: "es cualquiera de",
      isNotAnyOf: "no es cualquiera de",
      includesAll: "incluye todos",
      excludesAll: "excluye todos",
      before: "antes de",
      after: "después de",
      between: "entre",
      notBetween: "no entre",
      contains: "contiene",
      notContains: "no contiene",
      startsWith: "comienza con",
      endsWith: "termina con",
      isExactly: "es exactamente",
      equals: "igual a",
      notEquals: "no igual a",
      greaterThan: "mayor que",
      lessThan: "menor que",
      overlaps: "se superpone",
      includes: "incluye",
      excludes: "excluye",
      includesAllOf: "incluye todos de",
      includesAnyOf: "incluye cualquiera de",
      empty: "está vacío",
      notEmpty: "no está vacío",
    },
    placeholders: {
      enterField: (fieldType: string) => `Ingrese ${fieldType}...`,
      selectField: "Seleccionar...",
      searchField: (fieldName: string) =>
        `Buscar ${fieldName.toLowerCase()}...`,
      enterKey: "Ingrese clave...",
      enterValue: "Ingrese valor...",
    },
    helpers: {
      formatOperator: (operator: string) => operator.replace(/_/g, " "),
    },
    validation: {
      invalidEmail: "Formato de email inválido",
      invalidUrl: "Formato de URL inválido",
      invalidTel: "Formato de teléfono inválido",
      invalid: "Formato de entrada inválido",
    },
  },
};

const i18nFields: FilterFieldConfig[] = [
  {
    key: "name",
    label: "Name",
    icon: React.createElement(UserIcon, { className: "size-3.5" }),
    type: "text",
    className: "w-40",
    placeholder: "Search names...",
  },
  {
    key: "email",
    label: "Email",
    icon: React.createElement(MailIcon, { className: "size-3.5" }),
    type: "text",
    className: "w-48",
    placeholder: "user@example.com",
  },
  {
    key: "status",
    label: "Status",
    icon: React.createElement(CircleDashedIcon, { className: "size-3.5" }),
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
];

function FiltersI18nDemo() {
  const [lang, setLang] = React.useState<"en" | "es">("es");
  const [filters, setFilters] = React.useState<Filter[]>([
    createFilter("status", "is", ["active"]),
  ]);

  return React.createElement(
    "div",
    { className: "flex w-full items-start justify-between gap-4" },
    React.createElement(Filters, {
      filters,
      fields: i18nFields,
      onChange: setFilters,
      trigger: React.createElement(
        Button,
        { variant: "outline", size: "icon" },
        React.createElement(ListFilterIcon, { className: "size-4" })
      ),
      i18n: i18nConfigs[lang],
    }),
    React.createElement(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => setLang((l) => (l === "en" ? "es" : "en")),
      },
      lang === "en" ? "Switch to Español" : "Switch to English"
    )
  );
}

// ─── Usage snippet ───────────────────────────────────────────────────────────

const usageSnippet = `import * as React from "react"
import {
  createFilter,
  Filters,
  type Filter,
  type FilterFieldConfig,
} from "@/components/ui/filters"

const fields: FilterFieldConfig[] = [
  {
    key: "priority",
    label: "Priority",
    type: "multiselect",
    options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ],
  },
]

export function FiltersDemo() {
  const [filters, setFilters] = React.useState<Filter[]>([
    createFilter("priority", "is_any_of", ["low", "medium"]),
  ])
  return <Filters filters={filters} fields={fields} onChange={setFilters} />
}`;

export const filtersDoc: ComponentDoc = {
  id: "filters",
  name: "Filters",
  description:
    "A comprehensive filtering system with multiple filter types, operators, and visual indicators for data organization.",
  installation: {
    cli: "npx shadcn@latest add filters",
    manual:
      "Copy and paste the filters component source code into your project.",
  },
  usage: usageSnippet,
  preview: {
    code: usageSnippet,
    component: React.createElement(FiltersDemo),
  },
  examples: [
    {
      name: "Validation",
      description:
        "Text fields with custom validation functions for email, URL, phone, and username formats.",
      code: `const fields: FilterFieldConfig[] = [
  {
    key: "email",
    label: "Email",
    type: "text",
    placeholder: "user@example.com",
    validation: (value) => {
      const pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
      if (!pattern.test(value as string)) {
        return { valid: false, message: "Please enter a valid email" }
      }
      return { valid: true }
    },
  },
]`,
      preview: React.createElement(FiltersValidationDemo),
    },
    {
      name: "Trigger Button",
      description:
        "Pass a custom element via the `trigger` prop to replace the default filter button.",
      code: `<Filters
  filters={filters}
  fields={fields}
  onChange={setFilters}
  trigger={
    <Button variant="outline" size="icon">
      <ListFilterIcon className="size-4" />
    </Button>
  }
/>`,
      preview: React.createElement(FiltersTriggerDemo),
    },
    {
      name: "Large Size",
      description: "Larger size variant for prominent filter bars.",
      code: `<Filters filters={filters} fields={fields} onChange={setFilters} size="lg" />`,
      preview: React.createElement(FiltersLargeDemo),
    },
    {
      name: "Custom Controls",
      description:
        'Use `type: "custom"` with `customRenderer` to render entirely custom filter controls like sliders or date pickers.',
      code: `const fields: FilterFieldConfig[] = [
  {
    key: "sliderRange",
    label: "Slider Range",
    type: "custom",
    operators: [{ value: "between", label: "between" }],
    customRenderer: ({ values, onChange }) => (
      <CustomSliderRangeInput values={values} onChange={onChange} />
    ),
  },
]`,
      preview: React.createElement(FiltersCustomControlsDemo),
    },
    {
      name: "Filter Panel (Popover)",
      description:
        "A popover-based filter panel with inline filter chips, AND/OR conjunction, clear, and save. Ideal for ClickUp/Linear-style filter experiences.",
      code: `import { useState } from "react"
import {
  FilterPanel,
  type Filter,
  type FilterFieldConfig,
} from "@/components/ui/filters"

const fields: FilterFieldConfig[] = [
  { key: "status", label: "Status", type: "select", options: [/* ... */] },
  { key: "priority", label: "Priority", type: "multiselect", options: [/* ... */] },
  { key: "assignee", label: "Assignee", type: "text", placeholder: "Name..." },
]

export function FilterPanelExample() {
  const [filters, setFilters] = useState<Filter[]>([])
  const [conjunction, setConjunction] = useState<"and" | "or">("and")

  return (
    <FilterPanel
      filters={filters}
      fields={fields}
      onChange={setFilters}
      conjunction={conjunction}
      onConjunctionChange={setConjunction}
      onSave={() => console.log("Saved!", filters)}
    />
  )
}`,
      preview: React.createElement(FilterPanelDemo),
    },
    {
      name: "i18n Support",
      description:
        "Pass a partial `i18n` config to localize labels, operators, placeholders, and validation messages.",
      code: `<Filters
  filters={filters}
  fields={fields}
  onChange={setFilters}
  i18n={{
    addFilter: "Agregar filtro",
    clearAll: "Limpiar todo",
    operators: {
      is: "es",
      isNot: "no es",
      contains: "contiene",
    },
  }}
/>`,
      preview: React.createElement(FiltersI18nDemo),
    },
  ],
};
