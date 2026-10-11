/**
 * @name phone-input
 * @description An international phone number input with country selection and E.164 formatting.
 * @dependencies react-phone-number-input
 * @registryDependencies button command input input-group popover
 * @type registry:ui
 */
"use client";

import * as React from "react";
import PhoneNumberInput, {
  getCountryCallingCode,
  type Country,
} from "react-phone-number-input";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export type PhoneInputVariant = "sm" | "default" | "lg";

export type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  | "aria-invalid"
  | "className"
  | "defaultValue"
  | "disabled"
  | "onBlur"
  | "onChange"
  | "onFocus"
  | "readOnly"
  | "size"
  | "type"
  | "value"
> & {
  value?: string;
  onChange: (value?: string) => void;
  defaultCountry?: Country;
  variant?: PhoneInputVariant;
  disabled?: boolean;
  readOnly?: boolean;
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  className?: string;
  inputClassName?: string;
  popupClassName?: string;
};

const variantClasses: Record<PhoneInputVariant, string> = {
  sm: "h-10 md:h-9",
  default: "h-12 md:h-10",
  lg: "h-14 md:h-12",
};

interface CountryOption {
  value: string;
  label: string;
}

interface CountrySelectProps {
  value?: string;
  onChange: (value?: string) => void;
  options: CountryOption[];
  disabled?: boolean;
  readOnly?: boolean;
  "aria-label"?: string;
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  defaultCountry?: Country;
  popupClassName?: string;
  variant?: PhoneInputVariant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getFlag(countryCode: string) {
  return Array.from(countryCode.toUpperCase())
    .map((character) => String.fromCodePoint(127397 + character.charCodeAt(0)))
    .join("");
}

function CountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  "aria-label": ariaLabel = "Country calling code",
  "aria-invalid": ariaInvalid,
  defaultCountry = "IN",
  popupClassName,
  variant = "default",
  open,
  onOpenChange,
}: CountrySelectProps) {
  const countryCode = value && value !== "ZZ" ? value : defaultCountry;
  const countryOptions = options
    .filter((option) => option.value !== "ZZ" && option.value.length === 2)
    .map((option) => ({
      ...option,
      searchValue: `${option.label} +${getCountryCallingCode(option.value as Country)}`,
    }));
  const selectedOption = countryOptions.find(
    (option) => option.value === countryCode
  );
  const dialCode = `+${getCountryCallingCode(countryCode as Country)}`;

  if (readOnly) {
    return (
      <span
        role="img"
        aria-label={`${selectedOption?.label ?? countryCode} calling code ${dialCode}`}
        className="inline-flex shrink-0 items-center gap-1.5 px-2 text-sm"
      >
        <span aria-hidden="true">{getFlag(countryCode)}</span>
        <span>{dialCode}</span>
      </span>
    );
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="default"
          aria-label={`${ariaLabel}: ${selectedOption?.label ?? countryCode} ${dialCode}`}
          aria-invalid={ariaInvalid}
          disabled={disabled}
          className={cn(
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive flex shrink-0 items-center gap-1.5 rounded-none! border-0 border-r px-2 text-sm no-underline shadow-none not-in-data-[slot=button-group]:rounded-none! focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
            variantClasses[variant]
          )}
        >
          <span aria-hidden="true">{getFlag(countryCode)}</span>
          <span>+{dialCode.replace(/^\+/, "")}</span>
          <ChevronDownIcon data-icon="inline-end" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "w-72 max-w-[calc(100vw-2rem)] gap-0 overflow-hidden p-0",
          popupClassName
        )}
      >
        <Command
          key={open ? "open" : "closed"}
          className="h-auto rounded-none!"
        >
          <CommandInput
            autoFocus
            placeholder="e.g. United States"
            aria-label="Search countries"
          />
          <CommandList className="max-h-80 overflow-y-auto">
            <CommandEmpty>No countries found.</CommandEmpty>
            <CommandGroup>
              {countryOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.searchValue}
                  onSelect={() => {
                    onChange(option.value);
                    onOpenChange(false);
                  }}
                >
                  <span aria-hidden="true">{getFlag(option.value)}</span>
                  <span className="min-w-0 flex-1 truncate">
                    {option.label}
                  </span>
                  <span className="text-muted-foreground">
                    +{getCountryCallingCode(option.value as Country)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const PhoneNumberField = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(function PhoneNumberField({ className, type, ...props }, ref) {
  return (
    <Input
      {...props}
      ref={ref}
      type={type ?? "tel"}
      data-slot="input-group-control"
      className={cn(
        "PhoneInputInput h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-2 shadow-none focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent",
        className
      )}
    />
  );
});

function PhoneInput({
  value,
  onChange,
  defaultCountry = "IN",
  variant = "default",
  disabled = false,
  readOnly = false,
  "aria-invalid": ariaInvalid,
  autoComplete = "tel",
  className,
  inputClassName,
  popupClassName,
  ...inputProps
}: PhoneInputProps) {
  const [countryMenuOpen, setCountryMenuOpen] = React.useState(false);

  return (
    <PhoneNumberInput
      value={value}
      onChange={onChange}
      defaultCountry={defaultCountry}
      initialValueFormat="national"
      disabled={disabled}
      readOnly={readOnly}
      autoComplete={autoComplete}
      inputComponent={PhoneNumberField}
      containerComponent={InputGroup}
      countrySelectComponent={CountrySelect}
      className={cn("PhoneInput", variantClasses[variant], className)}
      countrySelectProps={{
        "aria-label": "Country calling code",
        "aria-invalid": ariaInvalid,
        defaultCountry,
        open: countryMenuOpen,
        onOpenChange: (nextOpen: boolean) => {
          setCountryMenuOpen(nextOpen);
        },
        popupClassName,
        variant,
      }}
      numberInputProps={{
        ...inputProps,
        "aria-invalid": ariaInvalid,
        className: cn(variantClasses[variant], inputClassName),
      }}
      addInternationalOption={false}
    />
  );
}

export { PhoneInput };
