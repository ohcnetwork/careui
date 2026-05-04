import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";

export const nativeSelectDoc: ComponentDoc = {
  id: "native-select",
  name: "Native Select",
  description:
    "A styled native HTML select element with consistent design system integration.",
  installation: {
    cli: "npx shadcn@latest add native-select",
    manual:
      "Copy and paste the native-select component source code into your project.",
  },
  usage: `import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"`,
  preview: {
    code: `import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectDemo() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select status</NativeSelectOption>
      <NativeSelectOption value="todo">Todo</NativeSelectOption>
      <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
      <NativeSelectOption value="done">Done</NativeSelectOption>
      <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
    </NativeSelect>
  )
}`,
    component: React.createElement(
      NativeSelect,
      null,
      React.createElement(NativeSelectOption, { value: "" }, "Select status"),
      React.createElement(NativeSelectOption, { value: "todo" }, "Todo"),
      React.createElement(
        NativeSelectOption,
        { value: "in-progress" },
        "In Progress"
      ),
      React.createElement(NativeSelectOption, { value: "done" }, "Done"),
      React.createElement(
        NativeSelectOption,
        { value: "cancelled" },
        "Cancelled"
      )
    ),
  },
  examples: [
    {
      name: "Groups",
      description:
        "Use NativeSelectOptGroup to organize options into categories.",
      code: `import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectGroups() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select department</NativeSelectOption>
      <NativeSelectOptGroup label="Engineering">
        <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
        <NativeSelectOption value="backend">Backend</NativeSelectOption>
        <NativeSelectOption value="devops">DevOps</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Sales">
        <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
        <NativeSelectOption value="account-manager">
          Account Manager
        </NativeSelectOption>
        <NativeSelectOption value="sales-director">
          Sales Director
        </NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Operations">
        <NativeSelectOption value="support">
          Customer Support
        </NativeSelectOption>
        <NativeSelectOption value="product-manager">
          Product Manager
        </NativeSelectOption>
        <NativeSelectOption value="ops-manager">
          Operations Manager
        </NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}`,
      preview: React.createElement(
        NativeSelect,
        null,
        React.createElement(
          NativeSelectOption,
          { value: "" },
          "Select department"
        ),
        React.createElement(
          NativeSelectOptGroup,
          { label: "Engineering" },
          React.createElement(
            NativeSelectOption,
            { value: "frontend" },
            "Frontend"
          ),
          React.createElement(
            NativeSelectOption,
            { value: "backend" },
            "Backend"
          ),
          React.createElement(
            NativeSelectOption,
            { value: "devops" },
            "DevOps"
          )
        ),
        React.createElement(
          NativeSelectOptGroup,
          { label: "Sales" },
          React.createElement(
            NativeSelectOption,
            { value: "sales-rep" },
            "Sales Rep"
          ),
          React.createElement(
            NativeSelectOption,
            { value: "account-manager" },
            "Account Manager"
          ),
          React.createElement(
            NativeSelectOption,
            { value: "sales-director" },
            "Sales Director"
          )
        ),
        React.createElement(
          NativeSelectOptGroup,
          { label: "Operations" },
          React.createElement(
            NativeSelectOption,
            { value: "support" },
            "Customer Support"
          ),
          React.createElement(
            NativeSelectOption,
            { value: "product-manager" },
            "Product Manager"
          ),
          React.createElement(
            NativeSelectOption,
            { value: "ops-manager" },
            "Operations Manager"
          )
        )
      ),
    },
    {
      name: "Disabled",
      description:
        "Add the disabled prop to the NativeSelect component to disable the select.",
      code: `import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectDisabled() {
  return (
    <NativeSelect disabled>
      <NativeSelectOption value="">Disabled</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  )
}`,
      preview: React.createElement(
        NativeSelect,
        { disabled: true },
        React.createElement(NativeSelectOption, { value: "" }, "Disabled"),
        React.createElement(NativeSelectOption, { value: "apple" }, "Apple"),
        React.createElement(NativeSelectOption, { value: "banana" }, "Banana"),
        React.createElement(
          NativeSelectOption,
          { value: "blueberry" },
          "Blueberry"
        )
      ),
    },
    {
      name: "Invalid",
      description:
        "Use aria-invalid to show validation errors.",
      code: `import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectInvalid() {
  return (
    <NativeSelect aria-invalid="true">
      <NativeSelectOption value="">Error state</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  )
}`,
      preview: React.createElement(
        NativeSelect,
        { "aria-invalid": "true" },
        React.createElement(NativeSelectOption, { value: "" }, "Error state"),
        React.createElement(NativeSelectOption, { value: "apple" }, "Apple"),
        React.createElement(NativeSelectOption, { value: "banana" }, "Banana"),
        React.createElement(
          NativeSelectOption,
          { value: "blueberry" },
          "Blueberry"
        )
      ),
    },
  ],
};
