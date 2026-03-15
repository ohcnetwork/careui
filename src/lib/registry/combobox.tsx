import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxValue,
  ComboboxTrigger,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

/** Cast render-prop children to ReactNode for React.createElement compatibility */
const rc = <T,>(fn: T): React.ReactNode => fn as unknown as React.ReactNode;

function comboboxBasicPreview() {
  return React.createElement(
    "div",
    { className: "w-full max-w-xs" },
    React.createElement(
      Combobox,
      { items: frameworks } as any,
      React.createElement(ComboboxInput, { placeholder: "Select a framework" }),
      React.createElement(
        ComboboxContent,
        {},
        React.createElement(ComboboxEmpty, {}, "No items found."),
        React.createElement(
          ComboboxList,
          {},
          rc((item: string) =>
            React.createElement(ComboboxItem, { key: item, value: item }, item)
          )
        )
      )
    )
  );
}

function ComboboxMultiplePreview() {
  const [value, setValue] = React.useState<string[]>([frameworks[0]]);
  const anchor = useComboboxAnchor();

  return React.createElement(
    "div",
    { className: "w-full max-w-xs" },
    React.createElement(
      Combobox,
      { items: frameworks, multiple: true, autoHighlight: true, value, onValueChange: setValue } as any,
      React.createElement(
        ComboboxChips,
        { ref: anchor } as any,
        React.createElement(
          ComboboxValue,
          {},
          rc((values: string[]) =>
            React.createElement(
              React.Fragment,
              null,
              ...values.map((v: string) =>
                React.createElement(ComboboxChip, { key: v }, v)
              ),
              React.createElement(ComboboxChipsInput, {})
            )
          )
        )
      ),
      React.createElement(
        ComboboxContent,
        { anchor } as any,
        React.createElement(ComboboxEmpty, {}, "No items found."),
        React.createElement(
          ComboboxList,
          {},
          rc((item: string) =>
            React.createElement(ComboboxItem, { key: item, value: item }, item)
          )
        )
      )
    )
  );
}

const timezones = [
  {
    value: "Americas",
    items: ["(GMT-5) New York", "(GMT-8) Los Angeles", "(GMT-6) Chicago"],
  },
  {
    value: "Europe",
    items: ["(GMT+0) London", "(GMT+1) Paris", "(GMT+1) Berlin"],
  },
  {
    value: "Asia/Pacific",
    items: ["(GMT+9) Tokyo", "(GMT+8) Shanghai", "(GMT+8) Singapore"],
  },
] as const;

function comboboxGroupsPreview() {
  return React.createElement(
    "div",
    { className: "w-full max-w-xs" },
    React.createElement(
      Combobox,
      { items: timezones } as any,
      React.createElement(ComboboxInput, { placeholder: "Select a timezone" }),
      React.createElement(
        ComboboxContent,
        {},
        React.createElement(ComboboxEmpty, {}, "No timezones found."),
        React.createElement(
          ComboboxList,
          {},
          rc((group: (typeof timezones)[number], index: number) =>
            React.createElement(
              ComboboxGroup,
              { key: group.value, items: group.items } as any,
              React.createElement(ComboboxLabel, {}, group.value),
              React.createElement(
                ComboboxCollection,
                { children: rc((item: string) => React.createElement(ComboboxItem, { key: item, value: item }, item)) } as any
              ),
              index < timezones.length - 1
                ? React.createElement(ComboboxSeparator, {})
                : null
            )
          )
        )
      )
    )
  );
}

function comboboxPopupPreview() {
  const countries = [
    { code: "", value: "", continent: "", label: "Select country" },
    { code: "ar", value: "argentina", label: "Argentina", continent: "South America" },
    { code: "au", value: "australia", label: "Australia", continent: "Oceania" },
    { code: "br", value: "brazil", label: "Brazil", continent: "South America" },
    { code: "ca", value: "canada", label: "Canada", continent: "North America" },
    { code: "fr", value: "france", label: "France", continent: "Europe" },
    { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
    { code: "us", value: "united-states", label: "United States", continent: "North America" },
  ];

  return React.createElement(
    Combobox,
    { items: countries, defaultValue: countries[0] } as any,
    React.createElement(
      ComboboxTrigger,
      {
        render: React.createElement(Button, {
          variant: "outline",
          className: "w-64 justify-between font-normal",
        }),
      } as any,
      React.createElement(ComboboxValue, {})
    ),
    React.createElement(
      ComboboxContent,
      {},
      React.createElement(ComboboxInput, { showTrigger: false, placeholder: "Search" } as any),
      React.createElement(ComboboxEmpty, {}, "No items found."),
      React.createElement(
        ComboboxList,
        {},
        rc((item: { code: string; value: string; continent: string; label: string }) =>
          React.createElement(
            ComboboxItem,
            { key: item.code, value: item },
            item.label
          )
        )
      )
    )
  );
}

export const comboboxDoc: ComponentDoc = {
  id: "combobox",
  name: "Combobox",
  description:
    "Autocomplete input with a list of suggestions, supporting single and multiple selection, grouping, chips, and custom items.",
  installation: {
    cli: "npx shadcn@latest add combobox",
    manual:
      "Install @base-ui/react, then copy and paste the combobox component source code into your project.",
  },
  usage: `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ComboboxDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
  preview: {
    code: `<Combobox items={frameworks}>
  <ComboboxInput placeholder="Select a framework" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
    component: React.createElement(comboboxBasicPreview),
  },
  examples: [
    {
      name: "With Clear Button",
      description: "Use the showClear prop to show a clear button inside the input.",
      code: `<Combobox items={frameworks} defaultValue={frameworks[0]}>
  <ComboboxInput placeholder="Select a framework" showClear />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
      preview: React.createElement(
        "div",
        { className: "w-full max-w-xs" },
        React.createElement(
          Combobox,
          { items: frameworks, defaultValue: frameworks[0] } as any,
          React.createElement(ComboboxInput, { placeholder: "Select a framework", showClear: true } as any),
          React.createElement(
            ComboboxContent,
            {},
            React.createElement(ComboboxEmpty, {}, "No items found."),
            React.createElement(
              ComboboxList,
              {},
              rc((item: string) =>
                React.createElement(ComboboxItem, { key: item, value: item }, item)
              )
            )
          )
        )
      ),
    },
    {
      name: "Multiple Selection",
      description:
        "Use multiple with ComboboxChips for multi-select behavior.",
      code: `import * as React from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ComboboxMultiple() {
  const anchor = useComboboxAnchor()

  return (
    <Combobox
      multiple
      autoHighlight
      items={frameworks}
      defaultValue={[frameworks[0]]}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values) => (
            <>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
      preview: React.createElement(ComboboxMultiplePreview),
    },
    {
      name: "Groups",
      description:
        "Use ComboboxGroup and ComboboxSeparator to group items under labeled sections.",
      code: `import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@/components/ui/combobox"

const timezones = [
  { value: "Americas", items: ["(GMT-5) New York", "(GMT-8) Los Angeles"] },
  { value: "Europe", items: ["(GMT+0) London", "(GMT+1) Paris"] },
  { value: "Asia/Pacific", items: ["(GMT+9) Tokyo", "(GMT+8) Shanghai"] },
]

export function ComboboxWithGroups() {
  return (
    <Combobox items={timezones}>
      <ComboboxInput placeholder="Select a timezone" />
      <ComboboxContent>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {(group, index) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              {index < timezones.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
      preview: React.createElement(comboboxGroupsPreview),
    },
    {
      name: "Popup / Trigger",
      description:
        "Trigger the combobox from a button using ComboboxTrigger. Place ComboboxInput inside ComboboxContent.",
      code: `import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"

export function ComboboxPopup() {
  return (
    <Combobox items={countries} defaultValue={countries[0]}>
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            className="w-64 justify-between font-normal"
          />
        }
      >
        <ComboboxValue />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
      preview: React.createElement(comboboxPopupPreview),
    },
    {
      name: "Custom Items",
      description:
        "Use itemToStringValue when your items are objects to control filtering and display.",
      code: `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

type Framework = { label: string; value: string }

const frameworks: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
]

export function ComboboxCustomItems() {
  return (
    <Combobox
      items={frameworks}
      itemToStringValue={(framework) => framework.label}
    >
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(framework) => (
            <ComboboxItem key={framework.value} value={framework}>
              {framework.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
      preview: (() => {
        const objectFrameworks = [
          { label: "Next.js", value: "next" },
          { label: "SvelteKit", value: "sveltekit" },
          { label: "Nuxt", value: "nuxt" },
          { label: "Remix", value: "remix" },
          { label: "Astro", value: "astro" },
        ];
        return React.createElement(
          Combobox,
          {
            items: objectFrameworks,
            itemToStringValue: (f: { label: string }) => f.label,
            className: "w-full max-w-xs",
          } as any,
          React.createElement(ComboboxInput, { placeholder: "Select a framework" }),
          React.createElement(
            ComboboxContent,
            {},
            React.createElement(ComboboxEmpty, {}, "No items found."),
            React.createElement(
              ComboboxList,
              {},
              rc((f: { label: string; value: string }) =>
                React.createElement(ComboboxItem, { key: f.value, value: f }, f.label)
              )
            )
          )
        );
      })(),
    },
    {
      name: "Disabled",
      description: "Use the disabled prop to disable the combobox.",
      code: `<Combobox items={frameworks}>
  <ComboboxInput placeholder="Select a framework" disabled />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
      preview: React.createElement(
        "div",
        { className: "w-full max-w-xs" },
        React.createElement(
          Combobox,
          { items: frameworks } as any,
          React.createElement(ComboboxInput, { placeholder: "Select a framework", disabled: true }),
          React.createElement(
            ComboboxContent,
            {},
            React.createElement(ComboboxEmpty, {}, "No items found."),
            React.createElement(
              ComboboxList,
              {},
              rc((item: string) =>
                React.createElement(ComboboxItem, { key: item, value: item }, item)
              )
            )
          )
        )
      ),
    },
    {
      name: "Auto Highlight",
      description:
        "Use the autoHighlight prop to automatically highlight the first item on filter.",
      code: `<Combobox items={frameworks} autoHighlight>
  <ComboboxInput placeholder="Select a framework" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
      preview: React.createElement(
        "div",
        { className: "w-full max-w-xs" },
        React.createElement(
          Combobox,
          { items: frameworks, autoHighlight: true } as any,
          React.createElement(ComboboxInput, { placeholder: "Select a framework" }),
          React.createElement(
            ComboboxContent,
            {},
            React.createElement(ComboboxEmpty, {}, "No items found."),
            React.createElement(
              ComboboxList,
              {},
              rc((item: string) =>
                React.createElement(ComboboxItem, { key: item, value: item }, item)
              )
            )
          )
        )
      ),
    },
  ],
};
