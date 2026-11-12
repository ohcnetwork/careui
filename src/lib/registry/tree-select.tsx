import React from "react";
import {
  TreeSelect,
  type TreeSelectNode,
  type TreeSelectPresentation,
} from "@/components/ui/tree-select";
import { Field, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type ComponentDoc } from "@/lib/types";

export const departmentTree: TreeSelectNode[] = [
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

export const assignedDepartmentIds = [
  "cardiology",
  "invasive-cardiology",
  "non-invasive-cardiology",
  "sleep-lab",
  "emergency",
];
export const linkedIds = ["sleep-lab"];
const departmentLabel = { singular: "department", plural: "departments" };

function TreeSelectPreview() {
  const [singlePreferred, setSinglePreferred] = React.useState<string[]>([]);
  const [single, setSingle] = React.useState<string | null>(null);
  const [multiPreferred, setMultiPreferred] = React.useState<string[]>([]);
  const [multi, setMulti] = React.useState<string[]>([]);
  return React.createElement(
    "div",
    {
      "data-slot": "tree-select-preview",
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
      React.createElement(TreeSelect, {
        mode: "single",
        tree: departmentTree,
        itemLabel: departmentLabel,
        assignedIds: assignedDepartmentIds,
        linkedIds,
        value: single,
        onChange: setSingle,
        preferredIds: singlePreferred,
        onPreferredIdsChange: setSinglePreferred,
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
      React.createElement(TreeSelect, {
        mode: "multi",
        tree: departmentTree,
        itemLabel: departmentLabel,
        assignedIds: assignedDepartmentIds,
        linkedIds,
        value: multi,
        onChange: setMulti,
        preferredIds: multiPreferred,
        onPreferredIdsChange: setMultiPreferred,
        name: "departments",
      })
    )
  );
}

interface Choice<T extends string> {
  value: T;
  label: string;
}

function ChoiceGroup<T extends string>({
  label,
  value,
  choices,
  onValueChange,
}: {
  label: string;
  value: T;
  choices: readonly Choice<T>[];
  onValueChange: (value: T) => void;
}) {
  const id = React.useId();
  return React.createElement(
    "div",
    { className: "flex flex-col gap-2" },
    React.createElement(
      "span",
      {
        id: `${id}-label`,
        className: "text-soft-foreground text-xs font-medium",
      },
      label
    ),
    React.createElement(
      RadioGroup,
      {
        "aria-labelledby": `${id}-label`,
        value,
        className: "flex flex-wrap gap-x-6 gap-y-3",
        onValueChange: (next) => {
          const choice = choices.find((item) => item.value === next);
          if (choice) onValueChange(choice.value);
        },
      },
      ...choices.map((choice) =>
        React.createElement(
          Field,
          {
            key: choice.value,
            orientation: "horizontal",
            className: "w-auto",
          },
          React.createElement(RadioGroupItem, {
            id: `${id}-${choice.value}`,
            value: choice.value,
          }),
          React.createElement(
            FieldLabel,
            { htmlFor: `${id}-${choice.value}` },
            choice.label
          )
        )
      )
    )
  );
}

const modeChoices: readonly Choice<"single" | "multi">[] = [
  { value: "single", label: "Single" },
  { value: "multi", label: "Multiple" },
];

const presentationChoices: readonly Choice<TreeSelectPresentation>[] = [
  { value: "auto", label: "Automatic" },
  { value: "popover", label: "Popover" },
  { value: "drawer", label: "Drawer" },
];

function TreeSelectModePlayground({
  initialPresentation,
}: {
  // Shows the "Opens in" switch when set.
  initialPresentation?: TreeSelectPresentation;
}) {
  const [mode, setMode] = React.useState<"single" | "multi">("multi");
  const [presentation, setPresentation] = React.useState(
    initialPresentation ?? "auto"
  );
  const [singlePreferred, setSinglePreferred] = React.useState<string[]>([]);
  const [single, setSingle] = React.useState<string | null>(null);
  const [multiPreferred, setMultiPreferred] = React.useState<string[]>([]);
  const [multi, setMulti] = React.useState<string[]>([]);
  const shared = {
    tree: departmentTree,
    itemLabel: departmentLabel,
    assignedIds: assignedDepartmentIds,
    linkedIds,
    presentation,
  };
  return React.createElement(
    "div",
    {
      "data-slot": "tree-select-mode-playground",
      className: "flex w-full min-w-0 flex-col gap-6",
    },
    React.createElement(
      "div",
      { className: "flex flex-wrap gap-x-10 gap-y-4" },
      React.createElement(ChoiceGroup<"single" | "multi">, {
        label: "Selection",
        value: mode,
        choices: modeChoices,
        onValueChange: setMode,
      }),
      initialPresentation &&
        React.createElement(ChoiceGroup<TreeSelectPresentation>, {
          label: "Opens in",
          value: presentation,
          choices: presentationChoices,
          onValueChange: setPresentation,
        })
    ),
    mode === "single"
      ? React.createElement(TreeSelect, {
          ...shared,
          mode: "single",
          value: single,
          onChange: setSingle,
          preferredIds: singlePreferred,
          onPreferredIdsChange: setSinglePreferred,
        })
      : React.createElement(TreeSelect, {
          ...shared,
          mode: "multi",
          value: multi,
          onChange: setMulti,
          preferredIds: multiPreferred,
          onPreferredIdsChange: setMultiPreferred,
        })
  );
}

function PresentationExample() {
  return React.createElement(TreeSelectModePlayground, {
    initialPresentation: "drawer",
  });
}

function StandalonePlayground() {
  return React.createElement(TreeSelectModePlayground, {
    initialPresentation: "auto",
  });
}

const locationTree: TreeSelectNode[] = [
  {
    id: "main-block",
    name: "Main Block",
    children: [
      {
        id: "main-floor-1",
        name: "Floor 1",
        children: [
          { id: "ward-a", name: "Ward A" },
          { id: "ward-b", name: "Ward B" },
        ],
      },
      {
        id: "main-floor-2",
        name: "Floor 2",
        children: [{ id: "icu", name: "ICU" }],
      },
    ],
  },
  {
    id: "outpatient-block",
    name: "Outpatient Block",
    children: [
      { id: "opd-1", name: "OPD Room 1" },
      { id: "opd-2", name: "OPD Room 2" },
    ],
  },
];

function LocationExample() {
  const [location, setLocation] = React.useState<string | null>(null);
  return React.createElement(
    "div",
    { className: "w-full max-w-xl min-w-0" },
    React.createElement(TreeSelect, {
      mode: "single",
      tree: locationTree,
      itemLabel: { singular: "location", plural: "locations" },
      value: location,
      onChange: setLocation,
      name: "location",
    })
  );
}

export function TreeSelectPlayground() {
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
          "Tree Select"
        )
      ),
      React.createElement(
        "div",
        { className: "max-w-xl" },
        React.createElement(StandalonePlayground)
      ),
      React.createElement(
        "div",
        { className: "hidden border-t border-border pt-8 sm:block" },
        React.createElement(TreeSelectPreview)
      )
    )
  );
}

const multiCode = `// Load the user's saved defaults, then preselect them.
const [preferredIds, setPreferredIds] = React.useState<string[]>(savedDefaults)
const [value, onChange] = React.useState<string[]>(savedDefaults)

<TreeSelect
  mode="multi"
  tree={tree}
  itemLabel={{ singular: "department", plural: "departments" }}
  assignedIds={assignedDepartmentIds}
  linkedIds={linkedIds}
  value={value}
  onChange={onChange}
  preferredIds={preferredIds}
  onPreferredIdsChange={setPreferredIds}
/>`;

export const treeSelectDoc: ComponentDoc = {
  id: "tree-select",
  name: "Tree Select",
  description:
    "Live, independent selection at any level of a hierarchy such as departments, locations, or categories. Assigned shortcuts and the full tree share one selection. The same field opens a Popover on wider screens and a bottom Drawer on phones that keeps its actions above the on-screen keyboard.",
  installation: {
    cli: "pnpm dlx shadcn@latest add https://careui.ohc.network/r/tree-select.json",
    manual:
      "Add the Care UI badge, button, checkbox, drawer, field, input-group, popover, radio-group, separator, switch, and use-media-query components, then copy the tree select source.",
  },
  usage: `import { TreeSelect, type TreeSelectNode } from "@/components/ui/tree-select"

const tree: TreeSelectNode[] = [
  { id: "medicine", name: "Medicine Department", children: [
    { id: "cardiology", name: "Cardiology", children: [
      { id: "invasive-cardiology", name: "Invasive Cardiology" },
    ] },
    { id: "general-medicine", name: "General Medicine" },
  ] },
]

// One field for every screen size: a Popover from 640px, a bottom Drawer below.
// The phone layout relies on the standard viewport meta tag in your HTML:
// <meta name="viewport" content="width=device-width, initial-scale=1" />
${multiCode}`,
  preview: {
    code: multiCode,
    component: React.createElement(TreeSelectPreview),
  },
  examples: [
    {
      name: "Interactive mode",
      description:
        "Switch between single and multiple selection. Selecting a parent never selects its children. The sample hospital tree is illustrative; supply your facility's actual departments through tree.",
      code: `<TreeSelect
  mode="single"
  tree={tree}
  itemLabel={{ singular: "department", plural: "departments" }}
  assignedIds={assignedDepartmentIds}
  linkedIds={linkedIds}
  value={departmentId}
  onChange={setDepartmentId}
  preferredIds={preferredIds}
  onPreferredIdsChange={setPreferredIds}
/>`,
      preview: React.createElement(TreeSelectModePlayground),
    },
    {
      name: "Popover or drawer",
      description:
        "Automatic opens a Popover from 640px and a bottom Drawer on narrower screens. Pick Drawer to preview the phone layout at any width. The drawer opens without raising the keyboard, closes with a downward swipe, and fits the visible screen, so its footer actions stay above the keyboard during search.",
      code: `// Automatic (default): Popover from 640px, Drawer on phones.
<TreeSelect
  mode="multi"
  tree={tree}
  itemLabel={{ singular: "department", plural: "departments" }}
  value={departmentIds}
  onChange={setDepartmentIds}
/>

// Drawer at every width, for example on touch-first tablet screens.
<TreeSelect
  mode="multi"
  presentation="drawer"
  tree={tree}
  itemLabel={{ singular: "department", plural: "departments" }}
  value={departmentIds}
  onChange={setDepartmentIds}
/>`,
      preview: React.createElement(PresentationExample),
    },
    {
      name: "Other hierarchies",
      description:
        "Pass any nested tree and name its items. Omit assignedIds to hide the My group.",
      code: `const locations: TreeSelectNode[] = [
  { id: "main-block", name: "Main Block", children: [
    { id: "floor-1", name: "Floor 1", children: [
      { id: "ward-a", name: "Ward A" },
    ] },
  ] },
]

<TreeSelect
  mode="single"
  tree={locations}
  itemLabel={{ singular: "location", plural: "locations" }}
  value={locationId}
  onChange={setLocationId}
/>`,
      preview: React.createElement(LocationExample),
    },
  ],
  props: [
    {
      name: "mode",
      type: '"single" | "multi"',
      description:
        "Single commits immediately and closes. Multi applies each change live and stays open until Done, Escape, an outside click, or a downward swipe on the drawer. Both modes show the selection as cards above the field that refresh after the selector closes, so the trigger never moves while picking. Single adds Clear selection to the panel footer.",
    },
    {
      name: "tree",
      type: "readonly TreeSelectNode[]",
      description:
        "Nested { id, name, children? } records with globally unique IDs. Every level is independently selectable.",
    },
    {
      name: "presentation",
      type: '"auto" | "popover" | "drawer"',
      default: '"auto"',
      description:
        "Where the options open. Automatic uses a Popover from 640px and a bottom Drawer below; Drawer forces it at every width, centered from 640px. The drawer focuses its close button first, so the keyboard opens only when search is tapped, and fits the visible viewport, so its footer stays above the keyboard. Phone detection needs the viewport meta tag.",
    },
    {
      name: "itemLabel",
      type: "{ singular: string; plural: string }",
      default: '{ singular: "item", plural: "items" }',
      description:
        'Lowercase nouns for the options, used in the field label, panel title, search, empty states, and screen reader status. For example, "department" and "departments".',
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Select {Item}"',
      description: "Trigger text. Defaults to the singular noun in title case.",
    },
    {
      name: "assignedIds",
      type: "readonly string[]",
      description:
        'The user\'s own option IDs, shown as flat rows with their parent paths in a "My {items}" group. Omit to hide the group.',
    },
    {
      name: "linkedIds",
      type: "readonly string[]",
      default: "[]",
      description:
        "Already-linked options are disabled before selection and carry an amber badge. Their children remain independent.",
    },
    {
      name: "preferredIds",
      type: "readonly string[]",
      default: "[]",
      description:
        'Options the user wants preselected next time. They carry a "Default" badge on their card and tree row. Initialize value from these to preselect them; single mode keeps at most one.',
    },
    {
      name: "onPreferredIdsChange",
      type: "(ids: string[]) => void",
      description:
        'Adds a "Select by default" switch to each selected card. Turning it off only stops future preselection; removing a card never changes defaults.',
    },
    {
      name: "value",
      type: "string | null | string[]",
      description:
        "An option ID or null in single mode; option IDs in multi mode.",
    },
    {
      name: "onChange",
      type: "((value: string | null) => void) | ((value: string[]) => void)",
      description:
        "Called immediately on selection, removal, Clear selection, or Clear all. Closing never rolls back a change.",
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
