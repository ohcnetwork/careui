import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  ClipboardPasteIcon,
  CopyIcon,
  PencilIcon,
  ScissorsIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react";

const TriggerArea = () =>
  React.createElement(
    ContextMenuTrigger,
    {
      className:
        "flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm",
    },
    React.createElement("span", { className: "hidden pointer-fine:inline-block" }, "Right click here"),
    React.createElement("span", { className: "hidden pointer-coarse:inline-block" }, "Long press here")
  );

export const contextMenuDoc: ComponentDoc = {
  id: "context-menu",
  name: "Context Menu",
  description: "Displays a menu of actions triggered by a right click.",
  installation: {
    cli: "npx shadcn@latest add context-menu",
    manual: `Install the following dependencies:

\`\`\`bash
npm install radix-ui
\`\`\`

Copy and paste the following code into your project:
components/ui/context-menu.tsx

Update the import paths to match your project setup.`,
  },
  usage: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  preview: {
    code: `import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">Right click here</span>
        <span className="hidden pointer-coarse:inline-block">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuGroup>
          <ContextMenuItem>Back<ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem disabled>Forward<ContextMenuShortcut>⌘]</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem>Reload<ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuGroup>
                <ContextMenuItem>Save Page...</ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                <ContextMenuItem>Name Window...</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem>Developer Tools</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuCheckboxItem checked>Show Bookmarks</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel>People</ContextMenuLabel>
            <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
    component: React.createElement(
      ContextMenu,
      {},
      React.createElement(TriggerArea, {}),
      React.createElement(
        ContextMenuContent,
        { className: "w-48" },
        React.createElement(
          ContextMenuGroup,
          {},
          React.createElement(ContextMenuItem, {}, "Back", React.createElement(ContextMenuShortcut, {}, "⌘[")),
          React.createElement(ContextMenuItem, { disabled: true }, "Forward", React.createElement(ContextMenuShortcut, {}, "⌘]")),
          React.createElement(ContextMenuItem, {}, "Reload", React.createElement(ContextMenuShortcut, {}, "⌘R")),
          React.createElement(
            ContextMenuSub,
            {},
            React.createElement(ContextMenuSubTrigger, {}, "More Tools"),
            React.createElement(
              ContextMenuSubContent,
              { className: "w-44" },
              React.createElement(ContextMenuGroup, {},
                React.createElement(ContextMenuItem, {}, "Save Page..."),
                React.createElement(ContextMenuItem, {}, "Create Shortcut..."),
                React.createElement(ContextMenuItem, {}, "Name Window...")
              ),
              React.createElement(ContextMenuSeparator),
              React.createElement(ContextMenuGroup, {}, React.createElement(ContextMenuItem, {}, "Developer Tools")),
              React.createElement(ContextMenuSeparator),
              React.createElement(ContextMenuGroup, {}, React.createElement(ContextMenuItem, { variant: "destructive" }, "Delete"))
            )
          )
        ),
        React.createElement(ContextMenuSeparator),
        React.createElement(
          ContextMenuGroup,
          {},
          React.createElement(ContextMenuCheckboxItem, { checked: true }, "Show Bookmarks"),
          React.createElement(ContextMenuCheckboxItem, {}, "Show Full URLs")
        ),
        React.createElement(ContextMenuSeparator),
        React.createElement(
          ContextMenuGroup,
          {},
          React.createElement(
            ContextMenuRadioGroup,
            { value: "pedro" },
            React.createElement(ContextMenuLabel, {}, "People"),
            React.createElement(ContextMenuRadioItem, { value: "pedro" }, "Pedro Duarte"),
            React.createElement(ContextMenuRadioItem, { value: "colm" }, "Colm Tuite")
          )
        )
      )
    ),
  },
  examples: [
    {
      name: "Basic",
      description: "A simple context menu with a few actions.",
      code: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuBasic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">Right click here</span>
        <span className="hidden pointer-coarse:inline-block">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem disabled>Forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
      preview: React.createElement(
        ContextMenu,
        {},
        React.createElement(TriggerArea, {}),
        React.createElement(
          ContextMenuContent,
          {},
          React.createElement(
            ContextMenuGroup,
            {},
            React.createElement(ContextMenuItem, {}, "Back"),
            React.createElement(ContextMenuItem, { disabled: true }, "Forward"),
            React.createElement(ContextMenuItem, {}, "Reload")
          )
        )
      ),
    },
    {
      name: "Submenu",
      description: "Use ContextMenuSub to nest secondary actions.",
      code: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuSubmenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">Right click here</span>
        <span className="hidden pointer-coarse:inline-block">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Copy<ContextMenuShortcut>⌘C</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem>Cut<ContextMenuShortcut>⌘X</ContextMenuShortcut></ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuGroup>
              <ContextMenuItem>Save Page...</ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
      preview: React.createElement(
        ContextMenu,
        {},
        React.createElement(TriggerArea, {}),
        React.createElement(
          ContextMenuContent,
          {},
          React.createElement(
            ContextMenuGroup,
            {},
            React.createElement(ContextMenuItem, {}, "Copy", React.createElement(ContextMenuShortcut, {}, "⌘C")),
            React.createElement(ContextMenuItem, {}, "Cut", React.createElement(ContextMenuShortcut, {}, "⌘X"))
          ),
          React.createElement(
            ContextMenuSub,
            {},
            React.createElement(ContextMenuSubTrigger, {}, "More Tools"),
            React.createElement(
              ContextMenuSubContent,
              {},
              React.createElement(ContextMenuGroup, {},
                React.createElement(ContextMenuItem, {}, "Save Page..."),
                React.createElement(ContextMenuItem, {}, "Create Shortcut..."),
                React.createElement(ContextMenuItem, {}, "Name Window...")
              ),
              React.createElement(ContextMenuSeparator),
              React.createElement(ContextMenuGroup, {}, React.createElement(ContextMenuItem, {}, "Developer Tools")),
              React.createElement(ContextMenuSeparator),
              React.createElement(ContextMenuGroup, {}, React.createElement(ContextMenuItem, { variant: "destructive" }, "Delete"))
            )
          )
        )
      ),
    },
    {
      name: "Shortcuts",
      description: "Add ContextMenuShortcut to show keyboard hints.",
      code: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuShortcuts() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">Right click here</span>
        <span className="hidden pointer-coarse:inline-block">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Back<ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem disabled>Forward<ContextMenuShortcut>⌘]</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem>Reload<ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>Save<ContextMenuShortcut>⌘S</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem>Save As...<ContextMenuShortcut>⇧⌘S</ContextMenuShortcut></ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
      preview: React.createElement(
        ContextMenu,
        {},
        React.createElement(TriggerArea, {}),
        React.createElement(
          ContextMenuContent,
          {},
          React.createElement(
            ContextMenuGroup,
            {},
            React.createElement(ContextMenuItem, {}, "Back", React.createElement(ContextMenuShortcut, {}, "⌘[")),
            React.createElement(ContextMenuItem, { disabled: true }, "Forward", React.createElement(ContextMenuShortcut, {}, "⌘]")),
            React.createElement(ContextMenuItem, {}, "Reload", React.createElement(ContextMenuShortcut, {}, "⌘R"))
          ),
          React.createElement(ContextMenuSeparator),
          React.createElement(
            ContextMenuGroup,
            {},
            React.createElement(ContextMenuItem, {}, "Save", React.createElement(ContextMenuShortcut, {}, "⌘S")),
            React.createElement(ContextMenuItem, {}, "Save As...", React.createElement(ContextMenuShortcut, {}, "⇧⌘S"))
          )
        )
      ),
    },
    {
      name: "Groups",
      description: "Group related actions and separate them with dividers.",
      code: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuGroups() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">Right click here</span>
        <span className="hidden pointer-coarse:inline-block">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>File</ContextMenuLabel>
          <ContextMenuItem>New File<ContextMenuShortcut>⌘N</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem>Open File<ContextMenuShortcut>⌘O</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem>Save<ContextMenuShortcut>⌘S</ContextMenuShortcut></ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Edit</ContextMenuLabel>
          <ContextMenuItem>Undo<ContextMenuShortcut>⌘Z</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem>Redo<ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut></ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>Cut<ContextMenuShortcut>⌘X</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem>Copy<ContextMenuShortcut>⌘C</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem>Paste<ContextMenuShortcut>⌘V</ContextMenuShortcut></ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">Delete<ContextMenuShortcut>⌫</ContextMenuShortcut></ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
      preview: React.createElement(
        ContextMenu,
        {},
        React.createElement(TriggerArea, {}),
        React.createElement(
          ContextMenuContent,
          {},
          React.createElement(ContextMenuGroup, {},
            React.createElement(ContextMenuLabel, {}, "File"),
            React.createElement(ContextMenuItem, {}, "New File", React.createElement(ContextMenuShortcut, {}, "⌘N")),
            React.createElement(ContextMenuItem, {}, "Open File", React.createElement(ContextMenuShortcut, {}, "⌘O")),
            React.createElement(ContextMenuItem, {}, "Save", React.createElement(ContextMenuShortcut, {}, "⌘S"))
          ),
          React.createElement(ContextMenuSeparator),
          React.createElement(ContextMenuGroup, {},
            React.createElement(ContextMenuLabel, {}, "Edit"),
            React.createElement(ContextMenuItem, {}, "Undo", React.createElement(ContextMenuShortcut, {}, "⌘Z")),
            React.createElement(ContextMenuItem, {}, "Redo", React.createElement(ContextMenuShortcut, {}, "⇧⌘Z"))
          ),
          React.createElement(ContextMenuSeparator),
          React.createElement(ContextMenuGroup, {},
            React.createElement(ContextMenuItem, {}, "Cut", React.createElement(ContextMenuShortcut, {}, "⌘X")),
            React.createElement(ContextMenuItem, {}, "Copy", React.createElement(ContextMenuShortcut, {}, "⌘C")),
            React.createElement(ContextMenuItem, {}, "Paste", React.createElement(ContextMenuShortcut, {}, "⌘V"))
          ),
          React.createElement(ContextMenuSeparator),
          React.createElement(ContextMenuGroup, {},
            React.createElement(ContextMenuItem, { variant: "destructive" }, "Delete", React.createElement(ContextMenuShortcut, {}, "⌫"))
          )
        )
      ),
    },
    {
      name: "Icons",
      description: "Combine icons with labels for quick scanning.",
      code: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ClipboardPasteIcon, CopyIcon, ScissorsIcon, TrashIcon } from "lucide-react"

export function ContextMenuIcons() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">Right click here</span>
        <span className="hidden pointer-coarse:inline-block">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem><CopyIcon />Copy</ContextMenuItem>
          <ContextMenuItem><ScissorsIcon />Cut</ContextMenuItem>
          <ContextMenuItem><ClipboardPasteIcon />Paste</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive"><TrashIcon />Delete</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
      preview: React.createElement(
        ContextMenu,
        {},
        React.createElement(TriggerArea, {}),
        React.createElement(
          ContextMenuContent,
          {},
          React.createElement(ContextMenuGroup, {},
            React.createElement(ContextMenuItem, {}, React.createElement(CopyIcon, {}), "Copy"),
            React.createElement(ContextMenuItem, {}, React.createElement(ScissorsIcon, {}), "Cut"),
            React.createElement(ContextMenuItem, {}, React.createElement(ClipboardPasteIcon, {}), "Paste")
          ),
          React.createElement(ContextMenuSeparator),
          React.createElement(ContextMenuGroup, {},
            React.createElement(ContextMenuItem, { variant: "destructive" }, React.createElement(TrashIcon, {}), "Delete")
          )
        )
      ),
    },
    {
      name: "Checkboxes",
      description: "Use ContextMenuCheckboxItem for toggles.",
      code: `import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuCheckboxes() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">Right click here</span>
        <span className="hidden pointer-coarse:inline-block">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuCheckboxItem defaultChecked>Show Bookmarks Bar</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem defaultChecked>Show Developer Tools</ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
      preview: React.createElement(
        ContextMenu,
        {},
        React.createElement(TriggerArea, {}),
        React.createElement(
          ContextMenuContent,
          {},
          React.createElement(ContextMenuGroup, {},
            React.createElement(ContextMenuCheckboxItem, { defaultChecked: true }, "Show Bookmarks Bar"),
            React.createElement(ContextMenuCheckboxItem, {}, "Show Full URLs"),
            React.createElement(ContextMenuCheckboxItem, { defaultChecked: true }, "Show Developer Tools")
          )
        )
      ),
    },
    {
      name: "Radio",
      description: "Use ContextMenuRadioItem for exclusive choices.",
      code: `"use client"

import * as React from "react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuRadio() {
  const [user, setUser] = React.useState("pedro")
  const [theme, setTheme] = React.useState("light")

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">Right click here</span>
        <span className="hidden pointer-coarse:inline-block">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuRadioGroup value={user} onValueChange={setUser}>
            <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Theme</ContextMenuLabel>
          <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
            <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
            <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
            <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
      preview: React.createElement(() => {
        const [user, setUser] = React.useState("pedro");
        const [theme, setTheme] = React.useState("light");
        return React.createElement(
          ContextMenu,
          {},
          React.createElement(TriggerArea, {}),
          React.createElement(
            ContextMenuContent,
            {},
            React.createElement(ContextMenuGroup, {},
              React.createElement(ContextMenuLabel, {}, "People"),
              React.createElement(
                ContextMenuRadioGroup,
                { value: user, onValueChange: setUser },
                React.createElement(ContextMenuRadioItem, { value: "pedro" }, "Pedro Duarte"),
                React.createElement(ContextMenuRadioItem, { value: "colm" }, "Colm Tuite")
              )
            ),
            React.createElement(ContextMenuSeparator),
            React.createElement(ContextMenuGroup, {},
              React.createElement(ContextMenuLabel, {}, "Theme"),
              React.createElement(
                ContextMenuRadioGroup,
                { value: theme, onValueChange: setTheme },
                React.createElement(ContextMenuRadioItem, { value: "light" }, "Light"),
                React.createElement(ContextMenuRadioItem, { value: "dark" }, "Dark"),
                React.createElement(ContextMenuRadioItem, { value: "system" }, "System")
              )
            )
          )
        );
      }),
    },
    {
      name: "Destructive",
      description: 'Use variant="destructive" to style the menu item as destructive.',
      code: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"

export function ContextMenuDestructive() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">Right click here</span>
        <span className="hidden pointer-coarse:inline-block">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem><PencilIcon />Edit</ContextMenuItem>
          <ContextMenuItem><ShareIcon />Share</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive"><TrashIcon />Delete</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
      preview: React.createElement(
        ContextMenu,
        {},
        React.createElement(TriggerArea, {}),
        React.createElement(
          ContextMenuContent,
          {},
          React.createElement(ContextMenuGroup, {},
            React.createElement(ContextMenuItem, {}, React.createElement(PencilIcon, {}), "Edit"),
            React.createElement(ContextMenuItem, {}, React.createElement(ShareIcon, {}), "Share")
          ),
          React.createElement(ContextMenuSeparator),
          React.createElement(ContextMenuGroup, {},
            React.createElement(ContextMenuItem, { variant: "destructive" }, React.createElement(TrashIcon, {}), "Delete")
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the component.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "When true, prevents the user from interacting with the item.",
      default: "false",
    },
    {
      name: "variant",
      type: '"default" | "destructive"',
      description: "Visual variant for the menu item.",
      default: '"default"',
    },
    {
      name: "inset",
      type: "boolean",
      description: "When true, adds left padding to align with items that have an icon or indicator.",
      default: "false",
    },
  ],
};
