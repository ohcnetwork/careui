import React from "react";
import {
  DepartmentSelector,
  type DepartmentNode,
} from "@/components/ui/department-selector";
import { Field, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type ComponentDoc } from "@/lib/types";

export const departmentTree: DepartmentNode[] = [
  {
    id: "medicine",
    name: "Medicine Department",
    children: [
      {
        id: "cardiology",
        name: "Cardiology",
        children: [
          { id: "invasive-cardiology", name: "Invasive Cardiology" },
          { id: "non-invasive-cardiology", name: "Non-Invasive Cardiology" },
        ],
      },
      {
        id: "pulmonology",
        name: "Pulmonology",
        children: [
          { id: "sleep-lab", name: "Sleep Study Lab" },
          { id: "bronchoscopy", name: "Bronchoscopy Suite" },
        ],
      },
      { id: "general-medicine", name: "General Medicine" },
      {
        id: "nephrology",
        name: "Nephrology",
        children: [{ id: "dialysis", name: "Dialysis Unit" }],
      },
    ],
  },
  {
    id: "surgery",
    name: "Surgery Department",
    children: [
      { id: "general-surgery", name: "General Surgery" },
      {
        id: "orthopaedics",
        name: "Orthopaedics",
        children: [
          { id: "joint-replacement", name: "Joint Replacement Unit" },
          { id: "trauma", name: "Trauma Care" },
        ],
      },
      { id: "neurosurgery", name: "Neurosurgery" },
    ],
  },
  {
    id: "obstetrics",
    name: "Obstetrics & Gynecology",
    children: [
      { id: "labour", name: "Labour Room" },
      { id: "antenatal", name: "Antenatal Clinic" },
    ],
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    children: [
      { id: "neonatal", name: "Neonatal ICU" },
      { id: "pediatric-opd", name: "Pediatric OPD" },
    ],
  },
  { id: "emergency", name: "Emergency & Casualty" },
  { id: "billing", name: "Billing Department" },
  { id: "human-resources", name: "Human Resources (HR)" },
];

export const myDepartmentIds = [
  "cardiology",
  "invasive-cardiology",
  "non-invasive-cardiology",
  "sleep-lab",
  "emergency",
];
export const linkedIds = ["sleep-lab"];
const initialMulti = ["invasive-cardiology", "general-medicine"];

function DesktopDepartmentPlayground() {
  const [single, setSingle] = React.useState<string | null>(null);
  const [multi, setMulti] = React.useState<string[]>(initialMulti);
  return React.createElement(
    "div",
    {
      "data-slot": "department-desktop-playground",
      className: "grid w-full min-w-0 items-start gap-8 sm:grid-cols-2",
    },
    React.createElement(
      "section",
      {
        className: "flex min-w-0 flex-col gap-4",
        "aria-label": "Single selection",
      },
      React.createElement(
        "h2",
        { className: "text-base font-semibold" },
        "Single selection"
      ),
      React.createElement(DepartmentSelector, {
        mode: "single",
        tree: departmentTree,
        myDepartmentIds,
        linkedIds,
        value: single,
        onChange: setSingle,
        name: "single-department",
      })
    ),
    React.createElement(
      "section",
      {
        className: "flex min-w-0 flex-col gap-4",
        "aria-label": "Multiple selection",
      },
      React.createElement(
        "h2",
        { className: "text-base font-semibold" },
        "Multiple selection"
      ),
      React.createElement(DepartmentSelector, {
        mode: "multi",
        tree: departmentTree,
        myDepartmentIds,
        linkedIds,
        value: multi,
        onChange: setMulti,
        name: "departments",
      })
    )
  );
}

function DepartmentModePlayground() {
  const [mode, setMode] = React.useState<"single" | "multi">("multi");
  const [single, setSingle] = React.useState<string | null>(null);
  const [multi, setMulti] = React.useState<string[]>(initialMulti);
  const modeId = React.useId();
  return React.createElement(
    "div",
    {
      "data-slot": "department-mode-playground",
      className: "flex w-full min-w-0 flex-col gap-6",
    },
    React.createElement(
      RadioGroup,
      {
        "aria-label": "Selection mode",
        value: mode,
        className: "flex flex-wrap gap-6",
        onValueChange: (value) => {
          if (value === "single" || value === "multi") setMode(value);
        },
      },
      React.createElement(
        Field,
        { orientation: "horizontal", className: "w-auto" },
        React.createElement(RadioGroupItem, {
          id: `${modeId}-single`,
          value: "single",
        }),
        React.createElement(
          FieldLabel,
          { htmlFor: `${modeId}-single` },
          "Single"
        )
      ),
      React.createElement(
        Field,
        { orientation: "horizontal", className: "w-auto" },
        React.createElement(RadioGroupItem, {
          id: `${modeId}-multi`,
          value: "multi",
        }),
        React.createElement(
          FieldLabel,
          { htmlFor: `${modeId}-multi` },
          "Multiple"
        )
      )
    ),
    mode === "single"
      ? React.createElement(DepartmentSelector, {
          mode: "single",
          tree: departmentTree,
          myDepartmentIds,
          linkedIds,
          value: single,
          onChange: setSingle,
        })
      : React.createElement(DepartmentSelector, {
          mode: "multi",
          tree: departmentTree,
          myDepartmentIds,
          linkedIds,
          value: multi,
          onChange: setMulti,
        })
  );
}

export function DepartmentSelectorPlayground() {
  React.useEffect(() => {
    window.__removeLoadingScreen?.();
  }, []);

  return React.createElement(
    "main",
    { className: "bg-background text-foreground min-h-dvh font-sans text-sm" },
    React.createElement(
      "div",
      {
        className:
          "mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6 sm:px-8 sm:py-10",
      },
      React.createElement(
        "header",
        { className: "flex flex-col gap-1" },
        React.createElement(
          "p",
          { className: "text-soft-foreground text-xs font-semibold" },
          "CARE"
        ),
        React.createElement(
          "h1",
          { className: "text-2xl font-semibold" },
          "Department Selector"
        )
      ),
      React.createElement(
        "div",
        { className: "max-w-xl" },
        React.createElement(DepartmentModePlayground)
      ),
      React.createElement(
        "div",
        { className: "hidden border-t border-border pt-8 sm:block" },
        React.createElement(DesktopDepartmentPlayground)
      )
    )
  );
}

const multiCode = `const [value, onChange] = React.useState<string[]>([
  "invasive-cardiology", "general-medicine",
])

<DepartmentSelector
  mode="multi"
  tree={tree}
  myDepartmentIds={myDepartmentIds}
  linkedIds={linkedIds}
  value={value}
  onChange={onChange}
/>`;

export const departmentSelectorDoc: ComponentDoc = {
  id: "department-selector",
  name: "Department Selector",
  description:
    "Live, independent selection at any level of a department tree. Personal departments and the full tree share one selection, with a Popover on desktop and a Drawer on phones.",
  installation: {
    cli: "pnpm dlx shadcn@latest add https://careui.ohc.network/r/department-selector.json",
    manual:
      "Add the Care UI badge, button, checkbox, drawer, field, input-group, popover, radio-group, separator, and use-media-query components, then copy the department selector source.",
  },
  usage: `import { DepartmentSelector, type DepartmentNode } from "@/components/ui/department-selector"

const tree: DepartmentNode[] = [
  { id: "medicine", name: "Medicine Department", children: [
    { id: "cardiology", name: "Cardiology", children: [
      { id: "invasive-cardiology", name: "Invasive Cardiology" },
    ] },
    { id: "general-medicine", name: "General Medicine" },
  ] },
]

${multiCode}`,
  preview: {
    code: multiCode,
    component: React.createElement(DesktopDepartmentPlayground),
  },
  examples: [
    {
      name: "Interactive mode",
      description:
        "Switch between single and multiple selection. Selecting a parent never selects its children. The sample hospital tree is illustrative; supply your facility's actual departments through tree.",
      code: `<DepartmentSelector
  mode="single"
  tree={tree}
  myDepartmentIds={myDepartmentIds}
  linkedIds={linkedIds}
  value={departmentId}
  onChange={setDepartmentId}
/>`,
      preview: React.createElement(DepartmentModePlayground),
    },
  ],
  props: [
    {
      name: "mode",
      type: '"single" | "multi"',
      description:
        "Single commits immediately and closes. Multi applies each change live and stays open until Done or dismissal.",
    },
    {
      name: "tree",
      type: "readonly DepartmentNode[]",
      description:
        "Nested { id, name, children? } records with globally unique IDs. Every level is independently selectable.",
    },
    {
      name: "myDepartmentIds",
      type: "readonly string[]",
      default: "[]",
      description:
        "The user's own department IDs, shown as flat personal rows with their parent paths.",
    },
    {
      name: "linkedIds",
      type: "readonly string[]",
      default: "[]",
      description:
        "Already-linked departments are disabled before selection and carry an amber badge. Their children remain independent.",
    },
    {
      name: "value",
      type: "string | null | string[]",
      description:
        "A department ID or null in single mode; department IDs in multi mode.",
    },
    {
      name: "onChange",
      type: "((value: string | null) => void) | ((value: string[]) => void)",
      description:
        "Called immediately on selection, removal, or Clear all. Closing never rolls back a change.",
    },
    {
      name: "disabled / required",
      type: "boolean",
      default: "false",
      description:
        "Disable the field or require at least one selection. Native form validation focuses the field trigger.",
    },
    {
      name: "description / error",
      type: "string",
      description: "Help or validation text associated with the trigger.",
    },
    {
      name: "id / name",
      type: "string",
      description:
        "Field identity and native form submission key. Multi selection submits repeated values.",
    },
    {
      name: "className",
      type: "string",
      description: "Layout classes applied to the molecule root.",
    },
  ],
};
