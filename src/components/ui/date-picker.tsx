/**
 * @name date-picker
 * @description A date picker composed from Popover + Calendar. Ships ready-to-use single, range, and input variants.
 * @dependencies date-fns react-day-picker
 * @type registry:ui
 */
"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, SegmentedDateInput } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

type DatePickerProps = {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  /** date-fns format string for the trigger label. */
  formatStr?: string;
  /** Calendar `captionLayout` — e.g. `"dropdown"` for month/year selectors. */
  captionLayout?: React.ComponentProps<typeof Calendar>["captionLayout"];
  /** Close the popover after selecting a date. Defaults to `true`. */
  closeOnSelect?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
};

function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  formatStr = "PPP",
  captionLayout,
  closeOnSelect = true,
  disabled,
  className,
  id,
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const isControlled = value !== undefined || onValueChange !== undefined;
  const [internal, setInternal] = React.useState<Date | undefined>(value);
  const selected = isControlled ? value : internal;

  const handleSelect = (next: Date | undefined) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
    if (closeOnSelect) setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id={id}
          aria-label={ariaLabel ?? placeholder}
          data-slot="date-picker-trigger"
          data-empty={!selected}
          disabled={disabled}
          className={cn(
            "data-[empty=true]:text-muted-foreground w-full justify-between font-normal",
            className
          )}
        >
          <span className="inline-flex items-center gap-2">
            <CalendarIcon className="size-4" />
            {selected ? format(selected, formatStr) : placeholder}
          </span>
          <ChevronDownIcon className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto overflow-hidden p-0"
        data-slot="date-picker-content"
      >
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={selected}
          captionLayout={captionLayout}
        />
      </PopoverContent>
    </Popover>
  );
}

type DatePickerRangeProps = {
  value?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  numberOfMonths?: number;
  formatStr?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
};

function DatePickerRange({
  value,
  onValueChange,
  placeholder = "Pick a date range",
  numberOfMonths = 2,
  formatStr = "LLL dd, y",
  disabled,
  className,
  id,
}: DatePickerRangeProps) {
  const isControlled = value !== undefined || onValueChange !== undefined;
  const [internal, setInternal] = React.useState<DateRange | undefined>(value);
  const selected = isControlled ? value : internal;

  const handleSelect = (next: DateRange | undefined) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const label = selected?.from
    ? selected.to
      ? `${format(selected.from, formatStr)} – ${format(selected.to, formatStr)}`
      : format(selected.from, formatStr)
    : placeholder;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id={id}
          data-slot="date-picker-range-trigger"
          data-empty={!selected?.from}
          disabled={disabled}
          className={cn(
            "data-[empty=true]:text-muted-foreground w-full justify-start gap-2 px-2.5 font-normal",
            className
          )}
        >
          <CalendarIcon className="size-4" />
          <span className="truncate">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto overflow-hidden p-0"
        data-slot="date-picker-range-content"
      >
        <Calendar
          mode="range"
          defaultMonth={selected?.from}
          selected={selected}
          onSelect={handleSelect}
          numberOfMonths={numberOfMonths}
        />
      </PopoverContent>
    </Popover>
  );
}

function formatInputDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined): date is Date {
  return !!date && !isNaN(date.getTime());
}

type DatePickerWithInputProps = {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
};

function DatePickerWithInput({
  value,
  onValueChange,
  placeholder = "Select a date",
  disabled,
  className,
  id,
}: DatePickerWithInputProps) {
  const [open, setOpen] = React.useState(false);
  const isControlled = value !== undefined || onValueChange !== undefined;
  const [internal, setInternal] = React.useState<Date | undefined>(value);
  const selected = isControlled ? value : internal;
  const [month, setMonth] = React.useState<Date | undefined>(selected);
  const [text, setText] = React.useState(formatInputDate(selected));
  const controlledText = formatInputDate(value);

  if (isControlled && value !== undefined && text !== controlledText) {
    setText(controlledText);
  }

  const setSelected = (next: Date | undefined) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <InputGroup className={className}>
      <InputGroupInput
        id={id}
        value={text}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          const raw = e.target.value;
          setText(raw);
          const parsed = new Date(raw);
          if (isValidDate(parsed)) {
            setSelected(parsed);
            setMonth(parsed);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <InputGroupAddon align="inline-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              aria-label="Open calendar"
              disabled={disabled}
            >
              <CalendarIcon className="size-4" />
            </InputGroupButton>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            alignOffset={-8}
            sideOffset={10}
            className="w-auto overflow-hidden p-0"
          >
            <Calendar
              mode="single"
              selected={selected}
              month={month}
              onMonthChange={setMonth}
              onSelect={(next) => {
                setSelected(next);
                setText(formatInputDate(next));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  );
}

type DatePickerSegmentedInputProps = {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Inclusive lower bound for the year segment. Defaults to 1900. */
  fromYear?: number;
  /** Inclusive upper bound for the year segment. Defaults to current year + 25. */
  toYear?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
};

function DatePickerSegmentedInput({
  value,
  onValueChange,
  fromYear,
  toYear,
  disabled,
  className,
  id,
  "aria-label": ariaLabel,
}: DatePickerSegmentedInputProps) {
  const [open, setOpen] = React.useState(false);
  const isControlled = value !== undefined || onValueChange !== undefined;
  const [internal, setInternal] = React.useState<Date | undefined>(value);
  const selected = isControlled ? value : internal;
  const [month, setMonth] = React.useState<Date | undefined>(selected);

  const setSelected = (next: Date | undefined) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
    if (next) setMonth(next);
  };

  return (
    <div
      data-slot="date-picker-segmented-input"
      aria-disabled={disabled || undefined}
      className={cn(
        "group/date-input border-input focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 relative flex h-12 w-full min-w-0 items-center rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-3 aria-disabled:opacity-50 md:h-10",
        className
      )}
    >
      <SegmentedDateInput
        value={selected}
        onChange={setSelected}
        fromYear={fromYear}
        toYear={toYear}
        className={cn(
          "h-full flex-1 rounded-none border-0 bg-transparent pr-1.5 shadow-none focus-visible:ring-0 dark:bg-transparent"
        )}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            id={id}
            disabled={disabled}
            aria-label={ariaLabel ?? "Open calendar"}
            className="mr-1 size-10 shrink-0 rounded-[calc(var(--radius)-5px)] md:size-8"
          >
            <CalendarIcon className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          alignOffset={-8}
          sideOffset={10}
          className="w-auto overflow-hidden p-0"
          data-slot="date-picker-segmented-input-content"
        >
          <Calendar
            mode="single"
            selected={selected}
            month={month}
            onMonthChange={setMonth}
            onSelect={(next) => {
              setSelected(next);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export {
  DatePicker,
  DatePickerRange,
  DatePickerWithInput,
  DatePickerSegmentedInput,
};
export type {
  DatePickerProps,
  DatePickerRangeProps,
  DatePickerWithInputProps,
  DatePickerSegmentedInputProps,
};
