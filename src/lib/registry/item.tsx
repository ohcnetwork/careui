import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Item } from "@/components/ui/item";

export const itemDoc: ComponentDoc = {
  id: "item",
  name: "Item",
  description: "A generic item component used within lists or menus.",
  installation: {
    cli: "npx shadcn@latest add item",
    manual: "Copy and paste the item component source code into your project.",
  },
  usage: `import { Item } from "@/components/ui/item"`,
  preview: {
    code: `<Item>Item content</Item>`,
    component: React.createElement(Item, {}, "Item content"),
  },
};
