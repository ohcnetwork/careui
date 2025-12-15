import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export const selectDoc: ComponentDoc = {

    id: 'select',
    name: 'Select',
    description: 'Displays a list of options for the user to pick from—triggered by a button.',
    installation: {
      cli: 'npx shadcn@latest add select',
      manual: 'Copy and paste the select component source code into your project.'
    },
    usage: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`,
    preview: {
      code: `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>`,
      component: React.createElement(Select, {},
        React.createElement(SelectTrigger, { className: "w-[180px]" },
          React.createElement(SelectValue, { placeholder: "Theme" })
        ),
        React.createElement(SelectContent, {},
          React.createElement(SelectItem, { value: "light" }, "Light"),
          React.createElement(SelectItem, { value: "dark" }, "Dark"),
          React.createElement(SelectItem, { value: "system" }, "System")
        )
      )
    },
    examples: [
      {
        name: 'Scrollable',
        description: 'A select component with a scrollable list of options.',
        code: `<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Select a timezone..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
      <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
      <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
      <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
      <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europe & Africa</SelectLabel>
      <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
      <SelectItem value="cet">Central European Time (CET)</SelectItem>
      <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
      <SelectItem value="west">Western European Summer Time (WEST)</SelectItem>
      <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
      <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
        preview: React.createElement(Select, {},
          React.createElement(SelectTrigger, { className: "w-[280px]" },
            React.createElement(SelectValue, { placeholder: "Select a timezone..." })
          ),
          React.createElement(SelectContent, {},
            React.createElement(SelectGroup, {},
              React.createElement(SelectLabel, {}, "North America"),
              React.createElement(SelectItem, { value: "est" }, "Eastern Standard Time (EST)"),
              React.createElement(SelectItem, { value: "cst" }, "Central Standard Time (CST)"),
              React.createElement(SelectItem, { value: "pst" }, "Pacific Standard Time (PST)")
            ),
            React.createElement(SelectSeparator),
            React.createElement(SelectGroup, {},
              React.createElement(SelectLabel, {}, "Europe & Africa"),
              React.createElement(SelectItem, { value: "gmt" }, "Greenwich Mean Time (GMT)"),
              React.createElement(SelectItem, { value: "cet" }, "Central European Time (CET)"),
              React.createElement(SelectItem, { value: "eet" }, "Eastern European Time (EET)")
            )
          )
        )
      },
      {
        name: 'With Form',
        description: 'A select component integrated with form controls.',
        code: `<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="framework">Framework</Label>
  <Select>
    <SelectTrigger id="framework">
      <SelectValue placeholder="Select a framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="next">Next.js</SelectItem>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="astro">Astro</SelectItem>
      <SelectItem value="nuxt">Nuxt.js</SelectItem>
    </SelectContent>
  </Select>
</div>`,
        preview: React.createElement("div", { className: "grid w-full max-w-sm items-center gap-1.5" },
          React.createElement(Label, { htmlFor: "framework" }, "Framework"),
          React.createElement(Select, {},
            React.createElement(SelectTrigger, { id: "framework" },
              React.createElement(SelectValue, { placeholder: "Select a framework" })
            ),
            React.createElement(SelectContent, {},
              React.createElement(SelectItem, { value: "next" }, "Next.js"),
              React.createElement(SelectItem, { value: "react" }, "React"),
              React.createElement(SelectItem, { value: "astro" }, "Astro"),
              React.createElement(SelectItem, { value: "nuxt" }, "Nuxt.js")
            )
          )
        )
      }
    ],
    props: [
      {
        name: 'value',
        type: 'string',
        description: 'The controlled value of the select.',
      },
      {
        name: 'defaultValue',
        type: 'string',
        description: 'The default value of the select when initially rendered.',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        description: 'Event handler called when the value changes.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'When true, prevents the user from interacting with the select.',
        default: 'false'
      },
      {
        name: 'required',
        type: 'boolean',
        description: 'When true, indicates that the user must select a value before submitting the owning form.',
        default: 'false'
      },
      {
        name: 'name',
        type: 'string',
        description: 'The name of the select, submitted with its owning form as part of a name/value pair.',
      }
    ]
}
