import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  FileIcon,
  FolderIcon,
  HelpCircleIcon,
  SaveIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

function MenubarRadioExample() {
  const [user, setUser] = React.useState("benoit");
  const [theme, setTheme] = React.useState("system");
  return React.createElement(
    Menubar,
    { className: "w-72" },
    React.createElement(
      MenubarMenu,
      null,
      React.createElement(MenubarTrigger, null, "Profiles"),
      React.createElement(
        MenubarContent,
        null,
        React.createElement(
          MenubarRadioGroup,
          { value: user, onValueChange: setUser },
          React.createElement(MenubarRadioItem, { value: "andy" }, "Andy"),
          React.createElement(MenubarRadioItem, { value: "benoit" }, "Benoit"),
          React.createElement(MenubarRadioItem, { value: "luis" }, "Luis")
        ),
        React.createElement(MenubarSeparator, null),
        React.createElement(MenubarItem, { inset: true }, "Edit..."),
        React.createElement(MenubarItem, { inset: true }, "Add Profile...")
      )
    ),
    React.createElement(
      MenubarMenu,
      null,
      React.createElement(MenubarTrigger, null, "Theme"),
      React.createElement(
        MenubarContent,
        null,
        React.createElement(
          MenubarRadioGroup,
          { value: theme, onValueChange: setTheme },
          React.createElement(MenubarRadioItem, { value: "light" }, "Light"),
          React.createElement(MenubarRadioItem, { value: "dark" }, "Dark"),
          React.createElement(MenubarRadioItem, { value: "system" }, "System")
        )
      )
    )
  );
}

export const menubarDoc: ComponentDoc = {
  id: "menubar",
  name: "Menubar",
  description:
    "A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.",
  installation: {
    cli: "npx shadcn@latest add menubar",
    manual:
      "Copy and paste the menubar component source code into your project.",
  },
  usage: `import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"`,
  preview: {
    code: `import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function MenubarDemo() {
  return (
    <Menubar className="w-72">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarGroup>
                  <MenubarItem>Email link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </MenubarGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarGroup>
                  <MenubarItem>Search the web</MenubarItem>
                </MenubarGroup>
                <MenubarSeparator />
                <MenubarGroup>
                  <MenubarItem>Find...</MenubarItem>
                  <MenubarItem>Find Next</MenubarItem>
                  <MenubarItem>Find Previous</MenubarItem>
                </MenubarGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent className="w-44">
          <MenubarGroup>
            <MenubarCheckboxItem>Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Full URLs</MenubarCheckboxItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>Hide Sidebar</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>Edit...</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>Add Profile...</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
    component: React.createElement(
      Menubar,
      { className: "w-72" },
      React.createElement(
        MenubarMenu,
        null,
        React.createElement(MenubarTrigger, null, "File"),
        React.createElement(
          MenubarContent,
          null,
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(
              MenubarItem,
              null,
              "New Tab",
              React.createElement(MenubarShortcut, null, "⌘T")
            ),
            React.createElement(
              MenubarItem,
              null,
              "New Window",
              React.createElement(MenubarShortcut, null, "⌘N")
            ),
            React.createElement(
              MenubarItem,
              { disabled: true },
              "New Incognito Window"
            )
          ),
          React.createElement(MenubarSeparator, null),
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(
              MenubarSub,
              null,
              React.createElement(MenubarSubTrigger, null, "Share"),
              React.createElement(
                MenubarSubContent,
                null,
                React.createElement(
                  MenubarGroup,
                  null,
                  React.createElement(MenubarItem, null, "Email link"),
                  React.createElement(MenubarItem, null, "Messages"),
                  React.createElement(MenubarItem, null, "Notes")
                )
              )
            )
          ),
          React.createElement(MenubarSeparator, null),
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(
              MenubarItem,
              null,
              "Print...",
              React.createElement(MenubarShortcut, null, "⌘P")
            )
          )
        )
      ),
      React.createElement(
        MenubarMenu,
        null,
        React.createElement(MenubarTrigger, null, "Edit"),
        React.createElement(
          MenubarContent,
          null,
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(
              MenubarItem,
              null,
              "Undo",
              React.createElement(MenubarShortcut, null, "⌘Z")
            ),
            React.createElement(
              MenubarItem,
              null,
              "Redo",
              React.createElement(MenubarShortcut, null, "⇧⌘Z")
            )
          ),
          React.createElement(MenubarSeparator, null),
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(
              MenubarSub,
              null,
              React.createElement(MenubarSubTrigger, null, "Find"),
              React.createElement(
                MenubarSubContent,
                null,
                React.createElement(
                  MenubarGroup,
                  null,
                  React.createElement(MenubarItem, null, "Search the web")
                ),
                React.createElement(MenubarSeparator, null),
                React.createElement(
                  MenubarGroup,
                  null,
                  React.createElement(MenubarItem, null, "Find..."),
                  React.createElement(MenubarItem, null, "Find Next"),
                  React.createElement(MenubarItem, null, "Find Previous")
                )
              )
            )
          ),
          React.createElement(MenubarSeparator, null),
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(MenubarItem, null, "Cut"),
            React.createElement(MenubarItem, null, "Copy"),
            React.createElement(MenubarItem, null, "Paste")
          )
        )
      ),
      React.createElement(
        MenubarMenu,
        null,
        React.createElement(MenubarTrigger, null, "View"),
        React.createElement(
          MenubarContent,
          { className: "w-44" },
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(MenubarCheckboxItem, null, "Bookmarks Bar"),
            React.createElement(
              MenubarCheckboxItem,
              { checked: true },
              "Full URLs"
            )
          ),
          React.createElement(MenubarSeparator, null),
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(
              MenubarItem,
              { inset: true },
              "Reload",
              React.createElement(MenubarShortcut, null, "⌘R")
            ),
            React.createElement(
              MenubarItem,
              { disabled: true, inset: true },
              "Force Reload",
              React.createElement(MenubarShortcut, null, "⇧⌘R")
            )
          ),
          React.createElement(MenubarSeparator, null),
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(
              MenubarItem,
              { inset: true },
              "Toggle Fullscreen"
            )
          ),
          React.createElement(MenubarSeparator, null),
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(MenubarItem, { inset: true }, "Hide Sidebar")
          )
        )
      ),
      React.createElement(
        MenubarMenu,
        null,
        React.createElement(MenubarTrigger, null, "Profiles"),
        React.createElement(
          MenubarContent,
          null,
          React.createElement(
            MenubarRadioGroup,
            { value: "benoit" },
            React.createElement(MenubarRadioItem, { value: "andy" }, "Andy"),
            React.createElement(
              MenubarRadioItem,
              { value: "benoit" },
              "Benoit"
            ),
            React.createElement(MenubarRadioItem, { value: "luis" }, "Luis")
          ),
          React.createElement(MenubarSeparator, null),
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(MenubarItem, { inset: true }, "Edit...")
          ),
          React.createElement(MenubarSeparator, null),
          React.createElement(
            MenubarGroup,
            null,
            React.createElement(MenubarItem, { inset: true }, "Add Profile...")
          )
        )
      )
    ),
  },
  examples: [
    {
      name: "Checkbox",
      description: "Use MenubarCheckboxItem for toggleable options.",
      code: `import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function MenubarCheckbox() {
  return (
    <Menubar className="w-72">
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent className="w-64">
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Format</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Strikethrough</MenubarCheckboxItem>
          <MenubarCheckboxItem>Code</MenubarCheckboxItem>
          <MenubarCheckboxItem>Superscript</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
      preview: React.createElement(
        Menubar,
        { className: "w-72" },
        React.createElement(
          MenubarMenu,
          null,
          React.createElement(MenubarTrigger, null, "View"),
          React.createElement(
            MenubarContent,
            { className: "w-64" },
            React.createElement(
              MenubarCheckboxItem,
              null,
              "Always Show Bookmarks Bar"
            ),
            React.createElement(
              MenubarCheckboxItem,
              { checked: true },
              "Always Show Full URLs"
            ),
            React.createElement(MenubarSeparator, null),
            React.createElement(
              MenubarItem,
              { inset: true },
              "Reload",
              React.createElement(MenubarShortcut, null, "⌘R")
            ),
            React.createElement(
              MenubarItem,
              { disabled: true, inset: true },
              "Force Reload",
              React.createElement(MenubarShortcut, null, "⇧⌘R")
            )
          )
        ),
        React.createElement(
          MenubarMenu,
          null,
          React.createElement(MenubarTrigger, null, "Format"),
          React.createElement(
            MenubarContent,
            null,
            React.createElement(
              MenubarCheckboxItem,
              { checked: true },
              "Strikethrough"
            ),
            React.createElement(MenubarCheckboxItem, null, "Code"),
            React.createElement(MenubarCheckboxItem, null, "Superscript")
          )
        )
      ),
    },
    {
      name: "Radio",
      description:
        "Use MenubarRadioGroup and MenubarRadioItem for single-select options.",
      code: `"use client"

import * as React from "react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function MenubarRadio() {
  const [user, setUser] = React.useState("benoit")
  const [theme, setTheme] = React.useState("system")

  return (
    <Menubar className="w-72">
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={user} onValueChange={setUser}>
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Theme</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={theme} onValueChange={setTheme}>
            <MenubarRadioItem value="light">Light</MenubarRadioItem>
            <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
            <MenubarRadioItem value="system">System</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
      preview: React.createElement(MenubarRadioExample, null),
    },
    {
      name: "Submenu",
      description:
        "Use MenubarSub, MenubarSubTrigger, and MenubarSubContent for nested menus.",
      code: `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function MenubarSubmenu() {
  return (
    <Menubar className="w-72">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
      preview: React.createElement(
        Menubar,
        { className: "w-72" },
        React.createElement(
          MenubarMenu,
          null,
          React.createElement(MenubarTrigger, null, "File"),
          React.createElement(
            MenubarContent,
            null,
            React.createElement(
              MenubarSub,
              null,
              React.createElement(MenubarSubTrigger, null, "Share"),
              React.createElement(
                MenubarSubContent,
                null,
                React.createElement(MenubarItem, null, "Email link"),
                React.createElement(MenubarItem, null, "Messages"),
                React.createElement(MenubarItem, null, "Notes")
              )
            ),
            React.createElement(MenubarSeparator, null),
            React.createElement(
              MenubarItem,
              null,
              "Print...",
              React.createElement(MenubarShortcut, null, "⌘P")
            )
          )
        ),
        React.createElement(
          MenubarMenu,
          null,
          React.createElement(MenubarTrigger, null, "Edit"),
          React.createElement(
            MenubarContent,
            null,
            React.createElement(
              MenubarItem,
              null,
              "Undo",
              React.createElement(MenubarShortcut, null, "⌘Z")
            ),
            React.createElement(
              MenubarItem,
              null,
              "Redo",
              React.createElement(MenubarShortcut, null, "⇧⌘Z")
            ),
            React.createElement(MenubarSeparator, null),
            React.createElement(
              MenubarSub,
              null,
              React.createElement(MenubarSubTrigger, null, "Find"),
              React.createElement(
                MenubarSubContent,
                null,
                React.createElement(MenubarItem, null, "Find..."),
                React.createElement(MenubarItem, null, "Find Next"),
                React.createElement(MenubarItem, null, "Find Previous")
              )
            ),
            React.createElement(MenubarSeparator, null),
            React.createElement(MenubarItem, null, "Cut"),
            React.createElement(MenubarItem, null, "Copy"),
            React.createElement(MenubarItem, null, "Paste")
          )
        )
      ),
    },
    {
      name: "With Icons",
      description: "Menubar items with icons for visual clarity.",
      code: `import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  FileIcon,
  FolderIcon,
  HelpCircleIcon,
  SaveIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react"

export function MenubarIcons() {
  return (
    <Menubar className="w-72">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <FileIcon />
            New File <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <FolderIcon />
            Open Folder
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <SaveIcon />
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>More</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              <SettingsIcon />
              Settings
            </MenubarItem>
            <MenubarItem>
              <HelpCircleIcon />
              Help
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">
              <TrashIcon />
              Delete
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
      preview: React.createElement(
        Menubar,
        { className: "w-72" },
        React.createElement(
          MenubarMenu,
          null,
          React.createElement(MenubarTrigger, null, "File"),
          React.createElement(
            MenubarContent,
            null,
            React.createElement(
              MenubarItem,
              null,
              React.createElement(FileIcon, null),
              "New File",
              React.createElement(MenubarShortcut, null, "⌘N")
            ),
            React.createElement(
              MenubarItem,
              null,
              React.createElement(FolderIcon, null),
              "Open Folder"
            ),
            React.createElement(MenubarSeparator, null),
            React.createElement(
              MenubarItem,
              null,
              React.createElement(SaveIcon, null),
              "Save",
              React.createElement(MenubarShortcut, null, "⌘S")
            )
          )
        ),
        React.createElement(
          MenubarMenu,
          null,
          React.createElement(MenubarTrigger, null, "More"),
          React.createElement(
            MenubarContent,
            null,
            React.createElement(
              MenubarGroup,
              null,
              React.createElement(
                MenubarItem,
                null,
                React.createElement(SettingsIcon, null),
                "Settings"
              ),
              React.createElement(
                MenubarItem,
                null,
                React.createElement(HelpCircleIcon, null),
                "Help"
              ),
              React.createElement(MenubarSeparator, null),
              React.createElement(
                MenubarItem,
                { variant: "destructive" },
                React.createElement(TrashIcon, null),
                "Delete"
              )
            )
          )
        )
      ),
    },
  ],
};
