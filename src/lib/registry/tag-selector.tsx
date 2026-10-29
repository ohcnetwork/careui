import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  TagSelector,
  type TagSelectorOption,
} from "@/components/ui/tag-selector";

const options: TagSelectorOption[] = [
  { value: "urgent", label: "Urgent" },
  { value: "follow-up", label: "Follow-up" },
  { value: "review", label: "Review" },
];

function TagSelectorPreview() {
  const [value, setValue] = React.useState<string[]>([]);
  return React.createElement(TagSelector, {
    options,
    value,
    onValueChange: setValue,
  });
}

export const tagSelectorDoc: ComponentDoc = {
  id: "tag-selector",
  name: "Tag Selector",
  description:
    "A button-triggered multi-select that displays selected tags as badges.",
  installation: {
    cli: "npx shadcn@latest add tag-selector",
    manual:
      "Copy and paste the tag selector component source code into your project.",
  },
  usage: `import { TagSelector } from "@/components/ui/tag-selector"

<TagSelector
  options={[
    { value: "urgent", label: "Urgent" },
    { value: "follow-up", label: "Follow-up" },
  ]}
  value={selectedTags}
  onValueChange={setSelectedTags}
/>`,
  preview: {
    code: `<TagSelector
  options={options}
  value={selectedTags}
  onValueChange={setSelectedTags}
/>`,
    component: React.createElement(TagSelectorPreview),
  },
  examples: [],
};
