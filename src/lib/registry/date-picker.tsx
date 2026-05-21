import React from "react";
import type { DateRange } from "react-day-picker";
import { type ComponentDoc } from "@/lib/types";
import {
  DatePicker,
  DatePickerRange,
  DatePickerWithInput,
  DatePickerSegmentedInput,
} from "@/components/ui/date-picker";
import { Field, FieldLabel } from "@/components/ui/field";

function DatePickerBasicPreview() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  return React.createElement(
    Field,
    { className: "mx-auto w-56" },
    React.createElement(FieldLabel, { htmlFor: "date-picker-basic" }, "Date"),
    React.createElement(DatePicker, {
      id: "date-picker-basic",
      value: date,
      onValueChange: setDate,
    })
  );
}

function DatePickerRangePreview() {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined);
  return React.createElement(
    Field,
    { className: "mx-auto w-72" },
    React.createElement(
      FieldLabel,
      { htmlFor: "date-picker-range" },
      "Date range"
    ),
    React.createElement(DatePickerRange, {
      id: "date-picker-range",
      value: range,
      onValueChange: setRange,
    })
  );
}

function DatePickerDobPreview() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  return React.createElement(
    Field,
    { className: "mx-auto w-56" },
    React.createElement(
      FieldLabel,
      { htmlFor: "date-picker-dob" },
      "Date of birth"
    ),
    React.createElement(DatePicker, {
      id: "date-picker-dob",
      value: date,
      onValueChange: setDate,
      placeholder: "Select date",
      captionLayout: "dropdown",
    })
  );
}

function DatePickerInputPreview() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  );
  return React.createElement(
    Field,
    { className: "mx-auto w-60" },
    React.createElement(
      FieldLabel,
      { htmlFor: "date-picker-input" },
      "Subscription date"
    ),
    React.createElement(DatePickerWithInput, {
      id: "date-picker-input",
      value: date,
      onValueChange: setDate,
      placeholder: "June 01, 2025",
    })
  );
}

function DatePickerSegmentedInputPreview() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  );
  return React.createElement(
    Field,
    { className: "mx-auto w-60" },
    React.createElement(
      FieldLabel,
      { htmlFor: "date-picker-segmented" },
      "Appointment date"
    ),
    React.createElement(DatePickerSegmentedInput, {
      id: "date-picker-segmented",
      value: date,
      onValueChange: setDate,
    })
  );
}

export const datePickerDoc: ComponentDoc = {
  id: "date-picker",
  name: "Date Picker",
  description:
    "A date picker composed from Popover + Calendar. Ships ready-to-use single, range, and input variants.",
  installation: {
    cli: "npx shadcn@latest add date-picker",
    manual: `Copy and paste the following code into your project:
components/ui/date-picker.tsx

This component depends on Button, Calendar, Popover, and InputGroup. Install them first if missing.`,
  },
  usage: `import { DatePicker, DatePickerRange, DatePickerWithInput } from "@/components/ui/date-picker"

// Uncontrolled
<DatePicker />

// Controlled
const [date, setDate] = React.useState<Date>()
<DatePicker value={date} onValueChange={setDate} />`,
  preview: {
    code: `<DatePicker
  value={date}
  onValueChange={setDate}
/>`,
    component: React.createElement(DatePickerBasicPreview),
  },
  examples: [
    {
      name: "Range Picker",
      description: "Select a date range across two months.",
      code: `<DatePickerRange value={range} onValueChange={setRange} />`,
      preview: React.createElement(DatePickerRangePreview),
    },
    {
      name: "Date of Birth",
      description:
        "Use the dropdown caption layout for fast month and year navigation.",
      code: `<DatePicker
  value={date}
  onValueChange={setDate}
  captionLayout="dropdown"
  placeholder="Select date"
/>`,
      preview: React.createElement(DatePickerDobPreview),
    },
    {
      name: "Input + Calendar",
      description:
        "Combine a free-text input with a calendar popover. Press ArrowDown in the input to open the calendar.",
      code: `<DatePickerWithInput value={date} onValueChange={setDate} />`,
      preview: React.createElement(DatePickerInputPreview),
    },
    {
      name: "Segmented Input + Calendar",
      description:
        "A DD/MM/YYYY segmented input with arrow-key segment editing and an embedded calendar popover button. Press T for today, Esc to clear.",
      code: `<DatePickerSegmentedInput value={date} onValueChange={setDate} />`,
      preview: React.createElement(DatePickerSegmentedInputPreview),
    },
  ],
  props: [
    {
      name: "value",
      type: "Date | undefined",
      description: "Controlled selected date.",
    },
    {
      name: "onValueChange",
      type: "(date: Date | undefined) => void",
      description: "Called when the selection changes.",
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Pick a date"',
      description: "Trigger label when no date is selected.",
    },
    {
      name: "formatStr",
      type: "string",
      default: '"PPP"',
      description: "`date-fns` format token used for the trigger label.",
    },
    {
      name: "captionLayout",
      type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
      description:
        "Forwarded to Calendar. Use `dropdown` for month/year selectors (good for date-of-birth pickers).",
    },
    {
      name: "closeOnSelect",
      type: "boolean",
      default: "true",
      description: "Close the popover after a date is picked.",
    },
    {
      name: "DatePickerRange › numberOfMonths",
      type: "number",
      default: "2",
      description: "How many month grids the range calendar shows.",
    },
  ],
};
