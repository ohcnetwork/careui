import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export const switchDoc: ComponentDoc = {
  id: "switch",
  name: "Switch",
  description:
    "A control that allows the user to toggle between checked and not checked.",
  installation: {
    cli: "npx shadcn@latest add switch",
    manual: "Install radix-ui and copy the switch component source code.",
  },
  usage: `import { Switch } from "@/components/ui/switch"

<Switch />`,
  preview: {
    code: `import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return (
    <Field orientation="horizontal">
      <Switch id="airplane-mode" />
      <FieldLabel htmlFor="airplane-mode">Airplane Mode</FieldLabel>
    </Field>
  )
}`,
    component: React.createElement(
      Field,
      { orientation: "horizontal" },
      React.createElement(Switch, { id: "switch-demo" }),
      React.createElement(FieldLabel, { htmlFor: "switch-demo" }, "Airplane Mode")
    ),
  },
  examples: [
    // ── Description ───────────────────────────────────────────────────────
    {
      name: "Description",
      description:
        "Pair a `Switch` with `FieldContent`, `FieldLabel`, and `FieldDescription` inside a horizontal `Field` to provide context.",
      code: `import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchDescription() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="switch-share-devices">Share across devices</FieldLabel>
        <FieldDescription>
          Focus is shared across devices, and turns off when you leave the app.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-share-devices" />
    </Field>
  )
}`,
      preview: React.createElement(
        Field,
        { orientation: "horizontal", className: "max-w-sm" },
        React.createElement(
          FieldLabel,
          { htmlFor: "switch-share-devices" },
        React.createElement(
          FieldContent,
          {},
          React.createElement(FieldLabel, { htmlFor: "switch-share-devices" }, "Share across devices"),
          React.createElement(FieldDescription, {}, "Focus is shared across devices, and turns off when you leave the app.")
        )
        ),
        React.createElement(Switch, { id: "switch-share-devices" })
      ),
    },

    // ── Choice Card ───────────────────────────────────────────────────────
    {
      name: "Choice Card",
      description:
        "Card-style selection where `FieldLabel` wraps the entire `Field` for a fully clickable row.",
      code: `import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchChoiceCard() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <FieldLabel htmlFor="switch-choice-share">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>
              Focus is shared across devices, and turns off when you leave the app.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-choice-share" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="switch-choice-notifications">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              Receive notifications when focus mode is enabled or disabled.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-choice-notifications" defaultChecked />
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}`,
      preview: React.createElement(
        FieldGroup,
        { className: "w-full max-w-sm" },
        React.createElement(
          FieldLabel,
          { htmlFor: "switch-choice-share" },
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(
              FieldContent,
              {},
              React.createElement(FieldTitle, {}, "Share across devices"),
              React.createElement(FieldDescription, {}, "Focus is shared across devices, and turns off when you leave the app.")
            ),
            React.createElement(Switch, { id: "switch-choice-share" })
          )
        ),
        React.createElement(
          FieldLabel,
          { htmlFor: "switch-choice-notifications" },
          React.createElement(
            Field,
            { orientation: "horizontal" },
            React.createElement(
              FieldContent,
              {},
              React.createElement(FieldTitle, {}, "Enable notifications"),
              React.createElement(FieldDescription, {}, "Receive notifications when focus mode is enabled or disabled.")
            ),
            React.createElement(Switch, { id: "switch-choice-notifications", defaultChecked: true })
          )
        )
      ),
    },

    // ── Disabled ──────────────────────────────────────────────────────────
    {
      name: "Disabled",
      description:
        "Add the `disabled` prop to the `Switch` and `data-disabled` to the wrapping `Field` to apply disabled styling.",
      code: `import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchDisabled() {
  return (
    <Field orientation="horizontal" data-disabled className="w-fit">
      <Switch id="switch-disabled" disabled />
      <FieldLabel htmlFor="switch-disabled">Disabled</FieldLabel>
    </Field>
  )
}`,
      preview: React.createElement(
        Field,
        Object.assign({ orientation: "horizontal", className: "w-fit" }, { "data-disabled": "" }) as React.ComponentPropsWithoutRef<typeof Field>,
        React.createElement(Switch, { id: "switch-disabled", disabled: true }),
        React.createElement(FieldLabel, { htmlFor: "switch-disabled" }, "Disabled")
      ),
    },

    // ── Invalid ───────────────────────────────────────────────────────────
    {
      name: "Invalid",
      description:
        "Add `aria-invalid` to the `Switch` and `data-invalid` to the wrapping `Field` to indicate a validation error.",
      code: `import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchInvalid() {
  return (
    <Field orientation="horizontal" className="max-w-sm" data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-terms">Accept terms and conditions</FieldLabel>
        <FieldDescription>
          You must accept the terms and conditions to continue.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-terms" aria-invalid />
    </Field>
  )
}`,
      preview: React.createElement(
        Field,
        Object.assign({ orientation: "horizontal", className: "max-w-sm" }, { "data-invalid": "" }) as React.ComponentPropsWithoutRef<typeof Field>,
        React.createElement(
          FieldLabel,
          { htmlFor: "switch-terms" },
        React.createElement(
          FieldContent,
          {},
          React.createElement(FieldLabel, { htmlFor: "switch-terms" }, "Accept terms and conditions"),
          React.createElement(FieldDescription, {}, "You must accept the terms and conditions to continue.")
        ),
        React.createElement(Switch, { id: "switch-terms", "aria-invalid": true })
      )
      ),
    },

    // ── Size ──────────────────────────────────────────────────────────────
    {
      name: "Size",
      description:
        "Use the `size` prop to change the size of the switch. Available values: `sm`, `default`.",
      code: `import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchSizes() {
  return (
    <FieldGroup className="w-full max-w-40">
      <Field orientation="horizontal">
        <Switch id="switch-size-sm" size="sm" />
        <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="switch-size-default" size="default" />
        <FieldLabel htmlFor="switch-size-default">Default</FieldLabel>
      </Field>
    </FieldGroup>
  )
}`,
      preview: React.createElement(
        FieldGroup,
        { className: "w-full max-w-40" },
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(Switch, { id: "switch-size-sm", size: "sm" }),
          React.createElement(FieldLabel, { htmlFor: "switch-size-sm" }, "Small")
        ),
        React.createElement(
          Field,
          { orientation: "horizontal" },
          React.createElement(Switch, { id: "switch-size-default", size: "default" }),
          React.createElement(FieldLabel, { htmlFor: "switch-size-default" }, "Default")
        )
      ),
    },
  ],
};
