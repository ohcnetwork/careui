import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";

export const menubarDoc: ComponentDoc = {
  id: "menubar",
  name: "Menubar",
  description: "A visually persistent menu common in desktop applications.",
  installation: {
    cli: "npx shadcn@latest add menubar",
    manual:
      "Copy and paste the menubar component source code into your project.",
  },
  usage: `import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"`,
  preview: {
    code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Open</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    component: React.createElement(
      Menubar,
      {},
      React.createElement(
        MenubarMenu,
        {},
        React.createElement(MenubarTrigger, {}, "File"),
        React.createElement(
          MenubarContent,
          {},
          React.createElement(MenubarItem, {}, "New Tab"),
          React.createElement(MenubarItem, {}, "New Window"),
          React.createElement(MenubarItem, {}, "Exit")
        )
      ),
      React.createElement(
        MenubarMenu,
        {},
        React.createElement(MenubarTrigger, {}, "Edit"),
        React.createElement(
          MenubarContent,
          {},
          React.createElement(MenubarItem, {}, "Undo"),
          React.createElement(MenubarItem, {}, "Redo")
        )
      )
    ),
  },
};
