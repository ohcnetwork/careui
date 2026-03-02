import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Calendar, CalendarWithInput } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { addDays } from "date-fns";
import { type DateRange } from "react-day-picker";
import { Clock2Icon } from "lucide-react";

// ─── stateful preview helpers ────────────────────────────────────────────────

function CalendarSinglePreview() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return React.createElement(Calendar, {
    mode: "single",
    selected: date,
    onSelect: setDate,
    className: "rounded-lg border",
    captionLayout: "dropdown",
  });
}

function CalendarWithInputPreview() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  return React.createElement(CalendarWithInput, {
    selected: date,
    onSelect: setDate,
    className: "rounded-lg border",
  });
}

function CalendarBasicPreview() {
  return React.createElement(Calendar, {
    mode: "single",
    className: "rounded-lg border",
  });
}

function CalendarRangePreview() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });
  return React.createElement(
    Card,
    { className: "mx-auto w-fit p-0" },
    React.createElement(
      CardContent,
      { className: "p-0" },
      React.createElement(Calendar, {
        mode: "range",
        defaultMonth: dateRange?.from,
        selected: dateRange,
        onSelect: setDateRange,
        numberOfMonths: 2,
        disabled: (date: Date) =>
          date > new Date() || date < new Date("1900-01-01"),
      })
    )
  );
}

function CalendarCaptionPreview() {
  return React.createElement(Calendar, {
    mode: "single",
    captionLayout: "dropdown",
    className: "rounded-lg border",
  });
}

function CalendarPresetsPreview() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 12)
  );
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const presets = [
    { label: "Today", value: 0 },
    { label: "Tomorrow", value: 1 },
    { label: "In 3 days", value: 3 },
    { label: "In a week", value: 7 },
    { label: "In 2 weeks", value: 14 },
  ];
  return React.createElement(
    Card,
    { className: "mx-auto w-fit max-w-75", size: "sm" },
    React.createElement(
      CardContent,
      {},
      React.createElement(Calendar, {
        mode: "single",
        selected: date,
        onSelect: setDate,
        month: currentMonth,
        onMonthChange: setCurrentMonth,
        fixedWeeks: true,
        className: "p-0 [--cell-size:--spacing(9.5)]",
      })
    ),
    React.createElement(
      CardFooter,
      { className: "flex flex-wrap gap-2 border-t" },
      ...presets.map((preset) =>
        React.createElement(
          Button,
          {
            key: preset.value,
            variant: "outline",
            size: "sm",
            className: "flex-1",
            onClick: () => {
              const newDate = addDays(new Date(), preset.value);
              setDate(newDate);
              setCurrentMonth(
                new Date(newDate.getFullYear(), newDate.getMonth(), 1)
              );
            },
          },
          preset.label
        )
      )
    )
  );
}

function CalendarWithTimePreview() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  );
  return React.createElement(
    Card,
    { size: "sm", className: "mx-auto w-fit" },
    React.createElement(
      CardContent,
      {},
      React.createElement(Calendar, {
        mode: "single",
        selected: date,
        onSelect: setDate,
        className: "p-0",
      })
    ),
    React.createElement(
      CardFooter,
      { className: "bg-card border-t" },
      React.createElement(
        FieldGroup,
        {},
        React.createElement(
          Field,
          {},
          React.createElement(FieldLabel, { htmlFor: "time-from" }, "Start Time"),
          React.createElement(
            InputGroup,
            {},
            React.createElement(InputGroupInput, {
              id: "time-from",
              type: "time",
              step: "1",
              defaultValue: "10:30:00",
              className:
                "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
            }),
            React.createElement(
              InputGroupAddon,
              {},
              React.createElement(Clock2Icon, {
                className: "text-muted-foreground",
              })
            )
          )
        ),
        React.createElement(
          Field,
          {},
          React.createElement(FieldLabel, { htmlFor: "time-to" }, "End Time"),
          React.createElement(
            InputGroup,
            {},
            React.createElement(InputGroupInput, {
              id: "time-to",
              type: "time",
              step: "1",
              defaultValue: "12:30:00",
              className:
                "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
            }),
            React.createElement(
              InputGroupAddon,
              {},
              React.createElement(Clock2Icon, {
                className: "text-muted-foreground",
              })
            )
          )
        )
      )
    )
  );
}

function CalendarBookedDatesPreview() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  );
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
  );
  return React.createElement(
    Card,
    { className: "mx-auto w-fit p-0" },
    React.createElement(
      CardContent,
      { className: "p-0" },
      React.createElement(Calendar, {
        mode: "single",
        defaultMonth: date,
        selected: date,
        onSelect: setDate,
        disabled: bookedDates,
        modifiers: { booked: bookedDates },
        modifiersClassNames: {
          booked: "[&>button]:line-through opacity-100",
        },
      })
    )
  );
}

function CalendarWeekNumbersPreview() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  );
  return React.createElement(
    Card,
    { className: "mx-auto w-fit p-0" },
    React.createElement(
      CardContent,
      { className: "p-0" },
      React.createElement(Calendar, {
        mode: "single",
        defaultMonth: date,
        selected: date,
        onSelect: setDate,
        showWeekNumber: true,
      })
    )
  );
}

export const calendarDoc: ComponentDoc = {
  id: "calendar",
  name: "Calendar",
  description:
    "A calendar component that allows users to select a date or a range of dates.",
  installation: {
    cli: "npx shadcn@latest add calendar",
    manual:
      "Install react-day-picker and date-fns, then copy and paste the calendar component source code into your project.",
  },
  usage: `import { Calendar } from "@/components/ui/calendar"

const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
  />
)`,
  preview: {
    code: `import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
      captionLayout="dropdown"
    />
  )
}`,
    component: React.createElement(CalendarSinglePreview),
  },

  examples: [
    {
      name: "Basic",
      description:
        'A basic calendar component. We used className="rounded-lg border" to style the calendar.',
      code: `import { Calendar } from "@/components/ui/calendar"

export function CalendarBasic() {
  return <Calendar mode="single" className="rounded-lg border" />
}`,
      preview: React.createElement(CalendarBasicPreview),
    },
    {
      name: "Range Calendar",
      description: 'Use the mode="range" prop to enable range selection.',
      code: `import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { addDays } from "date-fns"
import { type DateRange } from "react-day-picker"

export function CalendarRange() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </CardContent>
    </Card>
  )
}`,
      preview: React.createElement(CalendarRangePreview),
    },
    {
      name: "Month and Year Selector",
      description:
        'Use captionLayout="dropdown" to show month and year dropdowns.',
      code: `import { Calendar } from "@/components/ui/calendar"

export function CalendarCaption() {
  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      className="rounded-lg border"
    />
  )
}`,
      preview: React.createElement(CalendarCaptionPreview),
    },
    {
      name: "Presets",
      description: "A calendar with quick-select date presets.",
      code: `import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { addDays } from "date-fns"

export function CalendarWithPresets() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 12)
  )
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )

  return (
    <Card className="mx-auto w-fit max-w-[300px]" size="sm">
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          fixedWeeks
          className="p-0 [--cell-size:--spacing(9.5)]"
        />
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t">
        {[
          { label: "Today", value: 0 },
          { label: "Tomorrow", value: 1 },
          { label: "In 3 days", value: 3 },
          { label: "In a week", value: 7 },
          { label: "In 2 weeks", value: 14 },
        ].map((preset) => (
          <Button
            key={preset.value}
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              const newDate = addDays(new Date(), preset.value)
              setDate(newDate)
              setCurrentMonth(
                new Date(newDate.getFullYear(), newDate.getMonth(), 1)
              )
            }}
          >
            {preset.label}
          </Button>
        ))}
      </CardFooter>
    </Card>
  )
}`,
      preview: React.createElement(CalendarPresetsPreview),
    },
    {
      name: "Date and Time Picker",
      description: "A calendar combined with time inputs.",
      code: `import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Clock2Icon } from "lucide-react"

export function CalendarWithTime() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )

  return (
    <Card size="sm" className="mx-auto w-fit">
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="p-0"
        />
      </CardContent>
      <CardFooter className="bg-card border-t">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                step="1"
                defaultValue="10:30:00"
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="time-to">End Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-to"
                type="time"
                step="1"
                defaultValue="12:30:00"
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}`,
      preview: React.createElement(CalendarWithTimePreview),
    },
    {
      name: "Booked Dates",
      description:
        "Disable and visually mark booked dates using modifiers.",
      code: `import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

export function CalendarBookedDates() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  )
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
  )

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          disabled={bookedDates}
          modifiers={{ booked: bookedDates }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
        />
      </CardContent>
    </Card>
  )
}`,
      preview: React.createElement(CalendarBookedDatesPreview),
    },
    {
      name: "Week Numbers",
      description: "Use showWeekNumber to show week numbers.",
      code: `import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

export function CalendarWeekNumbers() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  )

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          showWeekNumber
        />
      </CardContent>
    </Card>
  )
}`,
      preview: React.createElement(CalendarWeekNumbersPreview),
    },
    {
      name: "With Date Input",
      description:
        "A calendar combined with a segmented date input. Click a segment (DD, MM, YYYY) or use Tab to cycle between them, type digits to fill, and the calendar navigates and selects automatically.",
      code: `import * as React from "react"
import { CalendarWithInput } from "@/components/ui/calendar"

export function CalendarWithInputExample() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <CalendarWithInput
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
    />
  )
}`,
      preview: React.createElement(CalendarWithInputPreview),
    },
  ],
};
