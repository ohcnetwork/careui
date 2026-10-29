/**
 * @name tag-selector
 * @description A button-triggered multi-select that displays selected tags as badges.
 * @dependencies lucide-react
 * @registryDependencies badge button checkbox dropdown-menu input
 * @type registry:ui
 */
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

export interface TagSelectorOption {
  value: string;
  label: string;
}

interface TagSelectorProps {
  options: TagSelectorOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
}

function TagSelector({
  options,
  value,
  onValueChange,
  label = "Tags",
  placeholder = "Add Tags",
  searchPlaceholder = "Search tags...",
  emptyText = "No tags found.",
  disabled = false,
}: TagSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const optionsByValue = new Map(
    options.map((option) => [option.value, option])
  );
  const search = query.trim().toLowerCase();
  const visibleOptions = [
    ...options.filter((option) => value.includes(option.value)),
    ...options.filter(
      (option) =>
        !value.includes(option.value) &&
        option.label.toLowerCase().includes(search)
    ),
  ];

  React.useEffect(() => {
    if (open) searchInputRef.current?.focus();
  }, [open]);

  const toggleOption = (optionValue: string) => {
    onValueChange(
      value.includes(optionValue)
        ? value.filter((selected) => selected !== optionValue)
        : [...value, optionValue]
    );
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setQuery("");
        setOpen(nextOpen);
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          aria-label={
            value.length === 0
              ? placeholder
              : `${label}: ${value
                  .map((item) => optionsByValue.get(item)?.label ?? item)
                  .join(", ")}`
          }
          className={cn(
            "w-fit max-w-full flex-wrap justify-start gap-1.5 text-start font-normal whitespace-normal shadow-none [:active,[data-pressed]]:inset-shadow-none dark:[:active,[data-pressed]]:inset-shadow-none",
            value.length > 0 && "h-auto min-h-12 py-1 md:min-h-10"
          )}
        >
          {value.length === 0 ? (
            <>
              <PlusIcon aria-hidden="true" data-icon="inline-start" />
              {placeholder}
            </>
          ) : (
            value.map((selectedValue) => {
              const option = optionsByValue.get(selectedValue);
              if (!option) return null;

              return (
                <Badge key={option.value} variant="pink" size="sm">
                  {option.label}
                </Badge>
              );
            })
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-max max-w-(--available-width)"
      >
        <Input
          ref={searchInputRef}
          value={query}
          placeholder={searchPlaceholder}
          aria-label={`Search ${label.toLowerCase()}`}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Escape") event.stopPropagation();
          }}
        />
        {visibleOptions.length > 0 ? (
          visibleOptions.map((option) => {
            const checked = value.includes(option.value);

            return (
              <DropdownMenuItem
                key={option.value}
                role="menuitemcheckbox"
                aria-checked={checked}
                closeOnClick={false}
                onClick={() => toggleOption(option.value)}
              >
                <Checkbox
                  checked={checked}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="bg-background data-checked:bg-primary data-checked:text-primary-foreground! group-focus-visible/dropdown-menu-item:ring-ring/50 pointer-events-none group-focus-visible/dropdown-menu-item:ring-[3px]"
                />
                <span>{option.label}</span>
              </DropdownMenuItem>
            );
          })
        ) : (
          <DropdownMenuItem disabled>{emptyText}</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { TagSelector };
