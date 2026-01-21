import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";

export const contextMenuDoc: ComponentDoc = {
  id: "context-menu",
  name: "Context Menu",
  description: "Displays a menu to the user triggered by right-click.",
  installation: {
    cli: "npx shadcn@latest add context-menu",
    manual:
      "Copy and paste the context menu component source code into your project.",
  },
  usage: `import { ContextMenu, ContextMenuTrigger, ContextMenuContent } from "@/components/ui/context-menu"`,
  preview: {
    code: `<ContextMenu>
  <ContextMenuTrigger>Right click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Item 1</ContextMenuItem>
    <ContextMenuItem>Item 2</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    component: React.createElement(
      ContextMenu,
      {},
      React.createElement(
        ContextMenuTrigger,
        {
          className:
            "flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm",
        },
        "Right click here"
      ),
      React.createElement(
        ContextMenuContent,
        { className: "w-64" },
        React.createElement(ContextMenuItem, {}, "Back"),
        React.createElement(ContextMenuItem, {}, "Forward"),
        React.createElement(ContextMenuItem, {}, "Reload")
      )
    ),
  },
};
