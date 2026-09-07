/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
// The Component Library catalog.
//
// Each catalog item wraps one or more real Care Design System components with
// sensible defaults, an editable prop schema (rendered in the interaction
// panel), and optional "smart suggestions" for interactions. The same render
// function is used both on the design canvas and inside the live player.

import * as React from "react";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Bell,
  CalendarDays,
  CheckSquare,
  CreditCard,
  Heading as HeadingIcon,
  LayoutList,
  ListChecks,
  type LucideIcon,
  MousePointerClick,
  Pill,
  Search as SearchIcon,
  SquareStack,
  Stethoscope,
  Table as TableIcon,
  TextCursorInput,
  Type,
  User,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import type { PrototypeAction, PrototypeElement, TriggerType } from "./types";
import {
  fakeAppointments,
  fakeLabReports,
  fakeMedications,
  fakeNotifications,
  fakePatients,
  fakeQueue,
  fakeVitals,
} from "./fake-data";

export interface RenderContext {
  mode: "editor" | "player";
  element: PrototypeElement;
  /** Fire a trigger — only wired up in player mode. */
  emit: (trigger: TriggerType, payload?: string) => void;
  getVar: (name: string) => string;
  setVar: (name: string, value: string) => void;
}

export type FieldType = "text" | "textarea" | "boolean" | "select" | "variable";

export interface FieldSchema {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
}

export interface SmartSuggestion {
  label: string;
  action: Partial<PrototypeAction>;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: string;
  icon: LucideIcon;
  defaultProps: Record<string, unknown>;
  fields: FieldSchema[];
  suggestions?: SmartSuggestion[];
  /** Elements that are input-like can bind their value to a variable. */
  bindable?: boolean;
  render: (props: any, ctx: RenderContext) => React.ReactNode;
}

// Helper — resolve `{{Variable Name}}` tokens in text against the current
// variable set so prototypes can echo captured values.
function interpolate(text: string, ctx: RenderContext): string {
  if (typeof text !== "string") return text as unknown as string;
  return text.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, name) => {
    const v = ctx.getVar(String(name).trim());
    return v || `{{${name}}}`;
  });
}

const statusTone: Record<string, string> = {
  Waiting: "warning",
  "In Consultation": "info",
  Admitted: "primary",
  Discharged: "neutral",
  Confirmed: "success",
  "Checked In": "success",
  Cancelled: "destructive",
  Normal: "success",
  High: "destructive",
  Low: "warning",
};

// ---------------------------------------------------------------------------
// Catalog definition
// ---------------------------------------------------------------------------

const items: CatalogItem[] = [
  // ---- Foundation -------------------------------------------------------
  {
    id: "heading",
    name: "Heading",
    category: "Foundation",
    icon: HeadingIcon,
    defaultProps: { text: "Section heading", size: "lg" },
    fields: [
      { key: "text", label: "Text", type: "text" },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: ["sm", "md", "lg", "xl"],
      },
    ],
    render: (p, ctx) => (
      <h2
        className={cn(
          "text-foreground font-semibold tracking-tight",
          p.size === "xl" && "text-3xl",
          p.size === "lg" && "text-2xl",
          p.size === "md" && "text-xl",
          p.size === "sm" && "text-base"
        )}
      >
        {interpolate(p.text, ctx)}
      </h2>
    ),
  },
  {
    id: "text",
    name: "Text",
    category: "Foundation",
    icon: Type,
    defaultProps: {
      text: "Body text goes here. Use {{Variable}} to echo captured values.",
    },
    fields: [{ key: "text", label: "Text", type: "textarea" }],
    render: (p, ctx) => (
      <p className="text-muted-foreground text-sm leading-relaxed">
        {interpolate(p.text, ctx)}
      </p>
    ),
  },

  // ---- Inputs -----------------------------------------------------------
  {
    id: "text-field",
    name: "Text Field",
    category: "Inputs",
    icon: TextCursorInput,
    bindable: true,
    defaultProps: {
      label: "Full name",
      placeholder: "Enter value",
      bindVariable: "",
    },
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "placeholder", label: "Placeholder", type: "text" },
      { key: "bindVariable", label: "Store as variable", type: "variable" },
    ],
    render: (p, ctx) => (
      <div className="grid gap-1.5">
        {p.label ? <Label>{p.label}</Label> : null}
        <Input
          placeholder={p.placeholder}
          defaultValue={p.bindVariable ? ctx.getVar(p.bindVariable) : undefined}
          readOnly={ctx.mode === "editor"}
          onChange={(e) => {
            if (p.bindVariable) ctx.setVar(p.bindVariable, e.target.value);
            ctx.emit("change", e.target.value);
          }}
        />
      </div>
    ),
  },
  {
    id: "textarea",
    name: "Text Area",
    category: "Inputs",
    icon: TextCursorInput,
    bindable: true,
    defaultProps: {
      label: "Notes",
      placeholder: "Add notes…",
      bindVariable: "",
    },
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "placeholder", label: "Placeholder", type: "text" },
      { key: "bindVariable", label: "Store as variable", type: "variable" },
    ],
    render: (p, ctx) => (
      <div className="grid gap-1.5">
        {p.label ? <Label>{p.label}</Label> : null}
        <Textarea
          placeholder={p.placeholder}
          readOnly={ctx.mode === "editor"}
          onChange={(e) => {
            if (p.bindVariable) ctx.setVar(p.bindVariable, e.target.value);
            ctx.emit("change", e.target.value);
          }}
        />
      </div>
    ),
  },
  {
    id: "select",
    name: "Select",
    category: "Inputs",
    icon: ListChecks,
    bindable: true,
    defaultProps: {
      label: "Visit type",
      options: "Walk-in, Appointment, Emergency",
      bindVariable: "Visit Type",
    },
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "options", label: "Options (comma separated)", type: "text" },
      { key: "bindVariable", label: "Store as variable", type: "variable" },
    ],
    render: (p, ctx) => {
      const opts = String(p.options || "")
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
      return (
        <div className="grid gap-1.5">
          {p.label ? <Label>{p.label}</Label> : null}
          {/* Native select keeps the value predictable inside the player. */}
          <select
            className="border-input bg-background focus-visible:ring-ring/50 h-9 rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
            defaultValue={
              p.bindVariable ? ctx.getVar(p.bindVariable) : undefined
            }
            disabled={ctx.mode === "editor"}
            onChange={(e) => {
              if (p.bindVariable) ctx.setVar(p.bindVariable, e.target.value);
              ctx.emit("change", e.target.value);
            }}
          >
            <option value="">Select…</option>
            {opts.map((o: string) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      );
    },
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Inputs",
    icon: CheckSquare,
    bindable: true,
    defaultProps: {
      label: "I confirm the details are correct",
      bindVariable: "Consent",
    },
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "bindVariable", label: "Store as variable", type: "variable" },
    ],
    render: (p, ctx) => (
      <label className="flex items-center gap-2 text-sm">
        <Checkbox
          disabled={ctx.mode === "editor"}
          defaultChecked={
            p.bindVariable ? ctx.getVar(p.bindVariable) === "true" : false
          }
          onCheckedChange={(v) => {
            if (p.bindVariable)
              ctx.setVar(p.bindVariable, v ? "true" : "false");
            ctx.emit("change", v ? "true" : "false");
          }}
        />
        {p.label}
      </label>
    ),
  },
  {
    id: "search",
    name: "Search",
    category: "Inputs",
    icon: SearchIcon,
    bindable: true,
    defaultProps: { placeholder: "Search patients…", bindVariable: "Search" },
    fields: [
      { key: "placeholder", label: "Placeholder", type: "text" },
      { key: "bindVariable", label: "Store as variable", type: "variable" },
    ],
    render: (p, ctx) => (
      <div className="relative">
        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          className="pl-9"
          placeholder={p.placeholder}
          readOnly={ctx.mode === "editor"}
          onChange={(e) => {
            if (p.bindVariable) ctx.setVar(p.bindVariable, e.target.value);
            ctx.emit("change", e.target.value);
          }}
        />
      </div>
    ),
  },
  {
    id: "date-field",
    name: "Date Picker",
    category: "Inputs",
    icon: CalendarDays,
    bindable: true,
    defaultProps: { label: "Date of birth", bindVariable: "" },
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "bindVariable", label: "Store as variable", type: "variable" },
    ],
    render: (p, ctx) => (
      <div className="grid gap-1.5">
        {p.label ? <Label>{p.label}</Label> : null}
        <Input
          type="date"
          disabled={ctx.mode === "editor"}
          onChange={(e) => {
            if (p.bindVariable) ctx.setVar(p.bindVariable, e.target.value);
            ctx.emit("change", e.target.value);
          }}
        />
      </div>
    ),
  },

  // ---- Actions / Navigation --------------------------------------------
  {
    id: "button",
    name: "Button",
    category: "Actions",
    icon: MousePointerClick,
    defaultProps: { label: "Continue", variant: "default" },
    fields: [
      { key: "label", label: "Label", type: "text" },
      {
        key: "variant",
        label: "Variant",
        type: "select",
        options: ["default", "secondary", "outline", "ghost", "destructive"],
      },
    ],
    suggestions: [
      {
        label: "Navigate to next page",
        action: {
          trigger: "click",
          type: "navigate",
          transition: "slide-left",
        },
      },
    ],
    render: (p, ctx) => (
      <Button variant={p.variant} className="pointer-events-none">
        {interpolate(p.label, ctx)}
      </Button>
    ),
  },
  {
    id: "app-header",
    name: "App Header",
    category: "Navigation",
    icon: LayoutList,
    defaultProps: { title: "Care HMIS", subtitle: "General Hospital" },
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
    ],
    render: (p, ctx) => (
      <div className="bg-card flex items-center gap-3 rounded-lg border px-4 py-3">
        <div className="bg-primary/10 text-primary grid size-9 place-items-center rounded-md">
          <Stethoscope className="size-5" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">
            {interpolate(p.title, ctx)}
          </div>
          <div className="text-muted-foreground text-xs">{p.subtitle}</div>
        </div>
        <Avatar className="ml-auto size-8">
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    icon: SquareStack,
    defaultProps: {
      tabs: "Overview, Vitals, Notes, Billing",
      active: "Overview",
    },
    fields: [
      { key: "tabs", label: "Tabs (comma separated)", type: "text" },
      { key: "active", label: "Active tab", type: "text" },
    ],
    render: (p) => {
      const tabs = String(p.tabs || "")
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
      return (
        <Tabs value={tabs.includes(p.active) ? p.active : tabs[0]}>
          <TabsList>
            {tabs.map((t: string) => (
              <TabsTrigger key={t} value={t} className="pointer-events-none">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      );
    },
  },

  // ---- Data -------------------------------------------------------------
  {
    id: "card",
    name: "Card",
    category: "Data",
    icon: SquareStack,
    defaultProps: {
      title: "Card title",
      description: "Supporting description",
      body: "Card content.",
    },
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "text" },
      { key: "body", label: "Body", type: "textarea" },
    ],
    render: (p, ctx) => (
      <Card>
        <CardHeader>
          <CardTitle>{interpolate(p.title, ctx)}</CardTitle>
          {p.description ? (
            <CardDescription>{interpolate(p.description, ctx)}</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          {interpolate(p.body, ctx)}
        </CardContent>
      </Card>
    ),
  },
  {
    id: "stat",
    name: "Stat Card",
    category: "Data",
    icon: Activity,
    defaultProps: { label: "Patients today", value: "128", delta: "+12%" },
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "value", label: "Value", type: "text" },
      { key: "delta", label: "Delta", type: "text" },
    ],
    render: (p, ctx) => (
      <Card>
        <CardContent className="pt-5">
          <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {p.label}
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold">
              {interpolate(p.value, ctx)}
            </span>
            {p.delta ? (
              <span className="text-xs font-medium text-emerald-600">
                {p.delta}
              </span>
            ) : null}
          </div>
        </CardContent>
      </Card>
    ),
  },
  {
    id: "badge",
    name: "Badge",
    category: "Data",
    icon: BadgeCheck,
    defaultProps: { label: "Active", variant: "primary" },
    fields: [
      { key: "label", label: "Label", type: "text" },
      {
        key: "variant",
        label: "Variant",
        type: "select",
        options: [
          "primary",
          "neutral",
          "success",
          "warning",
          "info",
          "destructive",
        ],
      },
    ],
    render: (p) => <Badge variant={p.variant}>{p.label}</Badge>,
  },
  {
    id: "data-table",
    name: "Data Table",
    category: "Data",
    icon: TableIcon,
    defaultProps: { dataset: "patients" },
    fields: [
      {
        key: "dataset",
        label: "Dataset",
        type: "select",
        options: ["patients", "appointments", "medications", "labs"],
      },
      { key: "filterVariable", label: "Filter by variable", type: "variable" },
    ],
    render: (p, ctx) => (
      <MockTable
        dataset={p.dataset}
        filterVariable={p.filterVariable}
        ctx={ctx}
      />
    ),
  },

  // ---- Healthcare -------------------------------------------------------
  {
    id: "patient-card",
    name: "Patient Card",
    category: "Healthcare",
    icon: User,
    defaultProps: {
      name: "Anita Sharma",
      meta: "34 F · P-10234",
      status: "Waiting",
    },
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "meta", label: "Meta", type: "text" },
      { key: "status", label: "Status", type: "text" },
    ],
    suggestions: [
      {
        label: "Open Patient Profile",
        action: {
          trigger: "click",
          type: "navigate",
          transition: "slide-left",
        },
      },
    ],
    render: (p, ctx) => (
      <Card className="hover:border-primary/40 transition-colors">
        <CardContent className="flex items-center gap-3 py-4">
          <Avatar className="size-11">
            <AvatarFallback>
              {initials(interpolate(p.name, ctx))}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">
              {interpolate(p.name, ctx)}
            </div>
            <div className="text-muted-foreground text-xs">
              {interpolate(p.meta, ctx)}
            </div>
          </div>
          {p.status ? (
            <Badge
              variant={(statusTone[p.status] as any) || "secondary"}
              className="ml-auto"
            >
              {p.status}
            </Badge>
          ) : null}
        </CardContent>
      </Card>
    ),
  },
  {
    id: "encounter-card",
    name: "Encounter Card",
    category: "Healthcare",
    icon: Stethoscope,
    defaultProps: {
      title: "OP Consultation",
      meta: "Dr. Menon · General Medicine",
      date: "Today · 09:30",
    },
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "meta", label: "Meta", type: "text" },
      { key: "date", label: "Date", type: "text" },
    ],
    suggestions: [
      {
        label: "Open Encounter",
        action: {
          trigger: "click",
          type: "navigate",
          transition: "slide-left",
        },
      },
    ],
    render: (p) => (
      <Card className="hover:border-primary/40 transition-colors">
        <CardContent className="flex items-center gap-3 py-4">
          <div className="bg-primary/10 text-primary grid size-10 place-items-center rounded-md">
            <Stethoscope className="size-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">{p.title}</div>
            <div className="text-muted-foreground text-xs">{p.meta}</div>
          </div>
          <div className="text-muted-foreground ml-auto text-xs">{p.date}</div>
        </CardContent>
      </Card>
    ),
  },
  {
    id: "allergy-badge",
    name: "Allergy Badge",
    category: "Healthcare",
    icon: AlertTriangle,
    defaultProps: { label: "Penicillin", severity: "High" },
    fields: [
      { key: "label", label: "Allergen", type: "text" },
      {
        key: "severity",
        label: "Severity",
        type: "select",
        options: ["Low", "Moderate", "High"],
      },
    ],
    render: (p) => (
      <Badge
        variant={p.severity === "High" ? "destructive" : "warning"}
        className="gap-1"
      >
        <AlertTriangle className="size-3.5" />
        {p.label}
      </Badge>
    ),
  },
  {
    id: "vitals-widget",
    name: "Vital Widget",
    category: "Healthcare",
    icon: Activity,
    defaultProps: {},
    fields: [],
    render: () => (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Vitals</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {fakeVitals.map((v) => (
            <div key={v.label} className="rounded-md border p-2.5">
              <div className="text-muted-foreground text-xs">{v.label}</div>
              <div className="text-lg font-semibold">
                {v.value}{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  {v.unit}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    ),
  },
  {
    id: "medication-table",
    name: "Medication Table",
    category: "Healthcare",
    icon: Pill,
    defaultProps: {},
    fields: [],
    render: (_p, ctx) => <MockTable dataset="medications" ctx={ctx} />,
  },
  {
    id: "queue-card",
    name: "Queue Card",
    category: "Healthcare",
    icon: Users,
    defaultProps: { title: "Waiting queue" },
    fields: [{ key: "title", label: "Title", type: "text" }],
    render: (p) => (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{p.title}</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {fakeQueue.map((q) => (
            <div key={q.token} className="flex items-center gap-3 py-2">
              <Badge variant="neutral" className="font-mono">
                {q.token}
              </Badge>
              <span className="text-sm">{q.patient}</span>
              <span className="text-muted-foreground ml-auto text-xs">
                {q.waitMins}m wait
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    ),
  },

  // ---- Blocks -----------------------------------------------------------
  {
    id: "login-block",
    name: "Login",
    category: "Blocks",
    icon: User,
    defaultProps: { title: "Sign in to Care HMIS" },
    fields: [{ key: "title", label: "Title", type: "text" }],
    render: (p, ctx) => (
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>{p.title}</CardTitle>
          <CardDescription>Enter your credentials to continue.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid gap-1.5">
            <Label>Username</Label>
            <Input
              placeholder="you@hospital.org"
              readOnly={ctx.mode === "editor"}
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              readOnly={ctx.mode === "editor"}
            />
          </div>
          <Button className="pointer-events-none mt-1 w-full">Sign in</Button>
        </CardContent>
      </Card>
    ),
  },
  {
    id: "registration-form",
    name: "Patient Registration",
    category: "Blocks",
    icon: User,
    defaultProps: {},
    fields: [],
    render: (_p, ctx) => (
      <Card>
        <CardHeader>
          <CardTitle>Patient Registration</CardTitle>
          <CardDescription>
            Capture demographics to create a record.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label>Full name</Label>
            <Input
              placeholder="e.g. Anita Sharma"
              readOnly={ctx.mode === "editor"}
              onChange={(e) => ctx.setVar("Patient Name", e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Phone</Label>
            <Input
              placeholder="Mobile number"
              readOnly={ctx.mode === "editor"}
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Date of birth</Label>
            <Input type="date" disabled={ctx.mode === "editor"} />
          </div>
          <div className="grid gap-1.5">
            <Label>Gender</Label>
            <select
              className="border-input bg-background h-9 rounded-md border px-3 text-sm"
              disabled={ctx.mode === "editor"}
              onChange={(e) => ctx.setVar("Gender", e.target.value)}
            >
              <option value="">Select…</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <Button className="pointer-events-none w-full sm:w-auto">
              Register patient
            </Button>
          </div>
        </CardContent>
      </Card>
    ),
  },
  {
    id: "patient-search",
    name: "Patient Search",
    category: "Blocks",
    icon: SearchIcon,
    defaultProps: { filterVariable: "Search" },
    fields: [
      { key: "filterVariable", label: "Filter by variable", type: "variable" },
    ],
    render: (p, ctx) => (
      <div className="grid gap-3">
        <div className="relative">
          <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            className="pl-9"
            placeholder="Search by name or ID…"
            readOnly={ctx.mode === "editor"}
            onChange={(e) =>
              ctx.setVar(p.filterVariable || "Search", e.target.value)
            }
          />
        </div>
        <MockTable
          dataset="patients"
          filterVariable={p.filterVariable || "Search"}
          ctx={ctx}
        />
      </div>
    ),
  },
  {
    id: "appointment-card",
    name: "Appointment Card",
    category: "Blocks",
    icon: CalendarDays,
    defaultProps: {
      patient: "Anita Sharma",
      when: "Today · 09:30",
      doctor: "Dr. Menon",
    },
    fields: [
      { key: "patient", label: "Patient", type: "text" },
      { key: "when", label: "When", type: "text" },
      { key: "doctor", label: "Doctor", type: "text" },
    ],
    suggestions: [
      {
        label: "Open Appointment Details",
        action: {
          trigger: "click",
          type: "navigate",
          transition: "slide-left",
        },
      },
    ],
    render: (p) => (
      <Card className="hover:border-primary/40 transition-colors">
        <CardContent className="flex items-center gap-3 py-4">
          <div className="bg-primary/10 text-primary grid size-10 place-items-center rounded-md">
            <CalendarDays className="size-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">{p.patient}</div>
            <div className="text-muted-foreground text-xs">
              {p.when} · {p.doctor}
            </div>
          </div>
          <Badge variant="success" className="ml-auto">
            Confirmed
          </Badge>
        </CardContent>
      </Card>
    ),
  },
  {
    id: "prescription-editor",
    name: "Prescription Editor",
    category: "Blocks",
    icon: Pill,
    defaultProps: {},
    fields: [],
    render: (_p, ctx) => (
      <Card>
        <CardHeader>
          <CardTitle>Prescription</CardTitle>
          <CardDescription>Add medications for this encounter.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <MockTable dataset="medications" ctx={ctx} />
          <Button variant="outline" className="pointer-events-none w-fit">
            <Pill className="size-4" /> Add medication
          </Button>
        </CardContent>
      </Card>
    ),
  },
  {
    id: "lab-report",
    name: "Lab Report",
    category: "Blocks",
    icon: Activity,
    defaultProps: {},
    fields: [],
    render: (_p, ctx) => (
      <Card>
        <CardHeader>
          <CardTitle>Laboratory Results</CardTitle>
        </CardHeader>
        <CardContent>
          <MockTable dataset="labs" ctx={ctx} />
        </CardContent>
      </Card>
    ),
  },
  {
    id: "notification-panel",
    name: "Notification Panel",
    category: "Blocks",
    icon: Bell,
    defaultProps: {},
    fields: [],
    render: () => (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Bell className="size-4" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {fakeNotifications.map((n) => (
            <div key={n.title} className="py-2.5">
              <div className="text-sm font-medium">{n.title}</div>
              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <span>{n.detail}</span>
                <span>{n.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    ),
  },
  {
    id: "billing-summary",
    name: "Billing Summary",
    category: "Blocks",
    icon: CreditCard,
    defaultProps: { total: "₹ 1,240" },
    fields: [{ key: "total", label: "Total", type: "text" }],
    render: (p) => (
      <Card>
        <CardHeader>
          <CardTitle>Billing Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm">
          <Row label="Consultation" value="₹ 500" />
          <Row label="Lab — CBC" value="₹ 440" />
          <Row label="Pharmacy" value="₹ 300" />
          <Separator className="my-1" />
          <div className="flex items-center justify-between font-semibold">
            <span>Total payable</span>
            <span>{p.total}</span>
          </div>
        </CardContent>
      </Card>
    ),
  },
];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-muted-foreground flex items-center justify-between">
      <span>{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

// A generic mock table shared by several catalog items. Supports live text
// filtering off a bound variable so search fields feel real in the player.
function MockTable({
  dataset,
  filterVariable,
  ctx,
}: {
  dataset: string;
  filterVariable?: string;
  ctx: RenderContext;
}) {
  const query = (
    filterVariable ? ctx.getVar(filterVariable) : ""
  ).toLowerCase();

  let headers: string[] = [];
  let rows: (string | number)[][] = [];
  let tones: (string | undefined)[] = [];

  if (dataset === "appointments") {
    headers = ["Time", "Patient", "Doctor", "Status"];
    const data = fakeAppointments.filter((a) =>
      a.patient.toLowerCase().includes(query)
    );
    rows = data.map((a) => [a.time, a.patient, a.doctor, a.status]);
    tones = data.map((a) => a.status);
  } else if (dataset === "medications") {
    headers = ["Drug", "Dose", "Frequency", "Duration"];
    rows = fakeMedications.map((m) => [
      m.drug,
      m.dose,
      m.frequency,
      m.duration,
    ]);
    tones = rows.map(() => undefined);
  } else if (dataset === "labs") {
    headers = ["Test", "Value", "Range", "Flag"];
    rows = fakeLabReports.map((l) => [l.test, l.value, l.range, l.flag]);
    tones = fakeLabReports.map((l) => l.flag);
  } else {
    headers = ["ID", "Name", "Age/Sex", "Status"];
    const data = fakePatients.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query)
    );
    rows = data.map((p) => [p.id, p.name, `${p.age} ${p.gender[0]}`, p.status]);
    tones = data.map((p) => p.status);
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((h) => (
              <TableHead key={h}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-muted-foreground py-8 text-center"
              >
                No results found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((r, i) => (
              <TableRow key={i}>
                {r.map((cell, j) => (
                  <TableCell key={j}>
                    {j === r.length - 1 && tones[i] ? (
                      <Badge
                        variant={
                          (statusTone[String(cell)] as any) || "secondary"
                        }
                      >
                        {cell}
                      </Badge>
                    ) : (
                      cell
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// ---------------------------------------------------------------------------

export const catalogItems = items;

export const catalogById: Record<string, CatalogItem> = Object.fromEntries(
  items.map((it) => [it.id, it])
);

export const catalogCategories: string[] = Array.from(
  new Set(items.map((i) => i.category))
);

export function makeElementFromCatalog(
  catalogId: string,
  idFactory: () => string
): PrototypeElement | null {
  const item = catalogById[catalogId];
  if (!item) return null;
  return {
    id: idFactory(),
    type: catalogId,
    name: item.name,
    props: { ...item.defaultProps },
    actions: [],
  };
}
