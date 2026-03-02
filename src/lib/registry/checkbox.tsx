import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ── Interactive Table preview ─────────────────────────────────────────────────
const tableData = [
  { id: "1", name: "Sarah Chen", email: "sarah.chen@example.com", role: "Admin" },
  { id: "2", name: "Marcus Rodriguez", email: "marcus.rodriguez@example.com", role: "User" },
  { id: "3", name: "Priya Patel", email: "priya.patel@example.com", role: "User" },
  { id: "4", name: "David Kim", email: "david.kim@example.com", role: "Editor" },
];

function CheckboxInTablePreview() {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set(["1"])
  );
  const selectAll = selectedRows.size === tableData.length;

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? new Set(tableData.map((r) => r.id)) : new Set());
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const next = new Set(selectedRows);
    if (checked) { next.add(id); } else { next.delete(id); }
    setSelectedRows(next);
  };

  return React.createElement(
    Table,
    {},
    React.createElement(
      TableHeader,
      {},
      React.createElement(
        TableRow,
        {},
        React.createElement(
          TableHead,
          { className: "w-8" },
          React.createElement(Checkbox, {
            id: "select-all-checkbox",
            name: "select-all-checkbox",
            checked: selectAll,
            onCheckedChange: handleSelectAll,
          })
        ),
        React.createElement(TableHead, {}, "Name"),
        React.createElement(TableHead, {}, "Email"),
        React.createElement(TableHead, {}, "Role")
      )
    ),
    React.createElement(
      TableBody,
      {},
      ...tableData.map((row) =>
        React.createElement(
          TableRow,
          Object.assign({ key: row.id }, selectedRows.has(row.id) ? { "data-state": "selected" } : {}) as React.ComponentPropsWithoutRef<typeof TableRow>,
          React.createElement(
            TableCell,
            {},
            React.createElement(Checkbox, {
              id: `row-${row.id}-checkbox`,
              name: `row-${row.id}-checkbox`,
              checked: selectedRows.has(row.id),
              onCheckedChange: (checked: boolean | "indeterminate") =>
                handleSelectRow(row.id, checked === true),
            })
          ),
          React.createElement(TableCell, { className: "font-medium" }, row.name),
          React.createElement(TableCell, {}, row.email),
          React.createElement(TableCell, {}, row.role)
        )
      )
    )
  );
}

export const checkboxDoc: ComponentDoc = {
  id: "checkbox",
  name: "Checkbox",
  description:
    "A control that allows the user to toggle between checked and not checked.",
  installation: {
    cli: "npx shadcn@latest add checkbox",
    manual:
      "Install radix-ui, then copy and paste the checkbox component source code into your project.",
  },
  usage: `import { Checkbox } from "@/components/ui/checkbox"

<Checkbox />`,
  preview: {
    code: `import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"

export function CheckboxDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <Label htmlFor="terms-checkbox">Accept terms and conditions</Label>
      </Field>
      <Field orientation="horizontal">
        <Checkbox
          id="terms-checkbox-2"
          name="terms-checkbox-2"
          defaultChecked
        />
        <FieldContent>
          <FieldLabel htmlFor="terms-checkbox-2">
            Accept terms and conditions
          </FieldLabel>
          <FieldDescription>
            By clicking this checkbox, you agree to the terms.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="toggle-checkbox" name="toggle-checkbox" disabled />
        <FieldLabel htmlFor="toggle-checkbox">Enable notifications</FieldLabel>
      </Field>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}`,
    component: React.createElement(
      FieldGroup,
      { className: "max-w-sm" },
      // Row 1: simple label
      React.createElement(
        Field,
        { orientation: "horizontal" },
        React.createElement(Checkbox, { id: "terms-checkbox", name: "terms-checkbox" }),
        React.createElement(Label, { htmlFor: "terms-checkbox" }, "Accept terms and conditions")
      ),
      // Row 2: checked + description
      React.createElement(
        Field,
        { orientation: "horizontal" },
        React.createElement(Checkbox, {
          id: "terms-checkbox-2",
          name: "terms-checkbox-2",
          defaultChecked: true,
        }),
        React.createElement(
          FieldContent,
          {},
          React.createElement(
            FieldLabel,
            { htmlFor: "terms-checkbox-2" },
            "Accept terms and conditions"
          ),
          React.createElement(
            FieldDescription,
            {},
            "By clicking this checkbox, you agree to the terms."
          )
        )
      ),
      // Row 3: disabled
      React.createElement(
        Field,
        Object.assign({ orientation: "horizontal" }, { "data-disabled": "" }) as React.ComponentPropsWithoutRef<typeof Field>,
        React.createElement(Checkbox, {
          id: "toggle-checkbox",
          name: "toggle-checkbox",
          disabled: true,
        }),
        React.createElement(
          FieldLabel,
          { htmlFor: "toggle-checkbox" },
          "Enable notifications"
        )
      ),
      // Row 4: label wrapping field + title/description
      React.createElement(
        FieldLabel,
        {},
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(Checkbox, {
            id: "toggle-checkbox-2",
            name: "toggle-checkbox-2",
          }),
          React.createElement(
            FieldContent,
            {},
            React.createElement(FieldTitle, {}, "Enable notifications"),
            React.createElement(
              FieldDescription,
              {},
              "You can enable or disable notifications at any time."
            )
          )
        )
      )
    ),
  },
  examples: [
    // ── Basic ──────────────────────────────────────────────────────────────
    {
      name: "Basic",
      description:
        "Pair the checkbox with `Field` and `FieldLabel` for proper layout and labeling.",
      code: `import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function CheckboxBasic() {
  return (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
        <FieldLabel htmlFor="terms-checkbox-basic">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}`,
      preview: React.createElement(
        FieldGroup,
        { className: "mx-auto w-56" },
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(Checkbox, {
            id: "terms-checkbox-basic",
            name: "terms-checkbox-basic",
          }),
          React.createElement(
            FieldLabel,
            { htmlFor: "terms-checkbox-basic" },
            "Accept terms and conditions"
          )
        )
      ),
    },

    // ── Description ────────────────────────────────────────────────────────
    {
      name: "Description",
      description: "Use `FieldContent` and `FieldDescription` for helper text.",
      code: `import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

export function CheckboxDescription() {
  return (
    <FieldGroup className="mx-auto w-72">
      <Field orientation="horizontal">
        <Checkbox
          id="terms-checkbox-desc"
          name="terms-checkbox-desc"
          defaultChecked
        />
        <FieldContent>
          <FieldLabel htmlFor="terms-checkbox-desc">
            Accept terms and conditions
          </FieldLabel>
          <FieldDescription>
            By clicking this checkbox, you agree to the terms and conditions.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}`,
      preview: React.createElement(
        FieldGroup,
        { className: "mx-auto w-72" },
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(Checkbox, {
            id: "terms-checkbox-desc",
            name: "terms-checkbox-desc",
            defaultChecked: true,
          }),
          React.createElement(
            FieldContent,
            {},
            React.createElement(
              FieldLabel,
              { htmlFor: "terms-checkbox-desc" },
              "Accept terms and conditions"
            ),
            React.createElement(
              FieldDescription,
              {},
              "By clicking this checkbox, you agree to the terms and conditions."
            )
          )
        )
      ),
    },

    // ── Disabled ───────────────────────────────────────────────────────────
    {
      name: "Disabled",
      description:
        "Use the `disabled` prop and `data-disabled` on `<Field>` for disabled styles.",
      code: `import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function CheckboxDisabled() {
  return (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal" data-disabled>
        <Checkbox
          id="toggle-checkbox-disabled"
          name="toggle-checkbox-disabled"
          disabled
        />
        <FieldLabel htmlFor="toggle-checkbox-disabled">
          Enable notifications
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}`,
      preview: React.createElement(
        FieldGroup,
        { className: "mx-auto w-56" },
        React.createElement(
          Field,
          Object.assign({ orientation: "horizontal" }, { "data-disabled": "" }) as React.ComponentPropsWithoutRef<typeof Field>,
          React.createElement(Checkbox, {
            id: "toggle-checkbox-disabled",
            name: "toggle-checkbox-disabled",
            disabled: true,
          }),
          React.createElement(
            FieldLabel,
            { htmlFor: "toggle-checkbox-disabled" },
            "Enable notifications"
          )
        )
      ),
    },

    // ── Invalid ────────────────────────────────────────────────────────────
    {
      name: "Invalid",
      description:
        "Set `aria-invalid` on the checkbox and `data-invalid` on the field wrapper to show invalid styles.",
      code: `import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function CheckboxInvalid() {
  return (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal" data-invalid>
        <Checkbox
          id="terms-checkbox-invalid"
          name="terms-checkbox-invalid"
          aria-invalid
        />
        <FieldLabel htmlFor="terms-checkbox-invalid">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}`,
      preview: React.createElement(
        FieldGroup,
        { className: "mx-auto w-56" },
        React.createElement(
          Field,
          Object.assign({ orientation: "horizontal" }, { "data-invalid": "" }) as React.ComponentPropsWithoutRef<typeof Field>,
          React.createElement(Checkbox, {
            id: "terms-checkbox-invalid",
            name: "terms-checkbox-invalid",
            "aria-invalid": true,
          }),
          React.createElement(
            FieldLabel,
            { htmlFor: "terms-checkbox-invalid" },
            "Accept terms and conditions"
          )
        )
      ),
    },

    // ── Group ──────────────────────────────────────────────────────────────
    {
      name: "Group",
      description: "Use multiple fields to create a checkbox list.",
      code: `import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

const items = [
  { id: "hard-disks", label: "Hard disks", defaultChecked: true },
  { id: "external-disks", label: "External disks", defaultChecked: true },
  { id: "cds-dvds", label: "CDs, DVDs, and iPods" },
  { id: "connected-servers", label: "Connected servers" },
]

export function CheckboxGroup() {
  return (
    <FieldSet>
      <FieldLegend variant="label">
        Show these items on the desktop:
      </FieldLegend>
      <FieldDescription>
        Select the items you want to show on the desktop.
      </FieldDescription>
      <FieldGroup className="gap-3">
        {items.map((item) => (
          <Field key={item.id} orientation="horizontal">
            <Checkbox
              id={\`checkbox-\${item.id}\`}
              name={\`checkbox-\${item.id}\`}
              defaultChecked={item.defaultChecked}
            />
            <FieldLabel htmlFor={\`checkbox-\${item.id}\`} className="font-normal">
              {item.label}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}`,
      preview: React.createElement(
        FieldSet,
        {},
        React.createElement(
          FieldLegend,
          { variant: "label" },
          "Show these items on the desktop:"
        ),
        React.createElement(
          FieldDescription,
          {},
          "Select the items you want to show on the desktop."
        ),
        React.createElement(
          FieldGroup,
          { className: "gap-3" },
          ...[
            { id: "hard-disks", label: "Hard disks", defaultChecked: true },
            { id: "external-disks", label: "External disks", defaultChecked: true },
            { id: "cds-dvds", label: "CDs, DVDs, and iPods" },
            { id: "connected-servers", label: "Connected servers" },
          ].map((item) =>
            React.createElement(
              Field,
              { key: item.id, orientation: "horizontal" },
              React.createElement(Checkbox, {
                id: `checkbox-${item.id}`,
                name: `checkbox-${item.id}`,
                defaultChecked: item.defaultChecked,
              }),
              React.createElement(
                FieldLabel,
                { htmlFor: `checkbox-${item.id}`, className: "font-normal" },
                item.label
              )
            )
          )
        )
      ),
    },

    // ── Table ──────────────────────────────────────────────────────────────
    {
      name: "Table",
      description: "Use checkboxes inside a table for row selection.",
      code: `"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const tableData = [
  { id: "1", name: "Sarah Chen", email: "sarah.chen@example.com", role: "Admin" },
  { id: "2", name: "Marcus Rodriguez", email: "marcus.rodriguez@example.com", role: "User" },
  { id: "3", name: "Priya Patel", email: "priya.patel@example.com", role: "User" },
  { id: "4", name: "David Kim", email: "david.kim@example.com", role: "Editor" },
]

export function CheckboxInTable() {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set(["1"])
  )

  const selectAll = selectedRows.size === tableData.length

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? new Set(tableData.map((r) => r.id)) : new Set())
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const next = new Set(selectedRows)
    checked ? next.add(id) : next.delete(id)
    setSelectedRows(next)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8">
            <Checkbox
              id="select-all-checkbox"
              name="select-all-checkbox"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row) => (
          <TableRow
            key={row.id}
            data-state={selectedRows.has(row.id) ? "selected" : undefined}
          >
            <TableCell>
              <Checkbox
                id={\`row-\${row.id}-checkbox\`}
                name={\`row-\${row.id}-checkbox\`}
                checked={selectedRows.has(row.id)}
                onCheckedChange={(checked) =>
                  handleSelectRow(row.id, checked === true)
                }
              />
            </TableCell>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}`,
      preview: React.createElement(CheckboxInTablePreview, {}),
    },
  ],
  props: [
    {
      name: "size",
      type: '"default" | "md"',
      description: 'Controls the size of the checkbox. `"default"` is 20 px; `"md"` is 16 px.',
      default: '"default"',
    },
    {
      name: "checked",
      type: 'boolean | "indeterminate"',
      description: "The controlled checked state of the checkbox.",
    },
    {
      name: "defaultChecked",
      type: "boolean",
      description: "The default checked state when initially rendered.",
    },
    {
      name: "onCheckedChange",
      type: '(checked: boolean | "indeterminate") => void',
      description: "Event handler called when the checked state changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      description:
        "When true, prevents the user from interacting with the checkbox.",
    },
    {
      name: "required",
      type: "boolean",
      description:
        "When true, indicates that the user must check the checkbox before the form is submitted.",
    },
  ],
};
