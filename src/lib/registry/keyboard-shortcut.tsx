import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { KeyboardShortcut } from "@/components/ui/keyboard-shortcut";

export const keyboardShortcutDoc: ComponentDoc = {
  id: "keyboard-shortcut",
  name: "Keyboard Shortcut",
  description:
    "Shows a key combination as keycaps joined by plus signs, with symbols for modifier and arrow keys.",
  installation: {
    cli: "npx shadcn@latest add keyboard-shortcut",
    manual:
      "Copy and paste the keyboard-shortcut component source code into your project. It depends on the kbd component.",
  },
  usage: `import { KeyboardShortcut } from "@/components/ui/keyboard-shortcut"

<KeyboardShortcut shortcut={["Meta", "K"]} />`,
  preview: {
    code: `<KeyboardShortcut shortcut={["Meta", "Shift", "K"]} />`,
    component: React.createElement(KeyboardShortcut, {
      shortcut: ["Meta", "Shift", "K"],
    }),
  },
  examples: [
    {
      name: "Short symbols",
      description: "Use compact modifier symbols.",
      code: `<KeyboardShortcut short shortcut={["Control", "Shift", "M"]} />`,
      preview: React.createElement(KeyboardShortcut, {
        short: true,
        shortcut: ["Control", "Shift", "M"],
      }),
    },
    {
      name: "Single keys",
      description: "Arrow, Escape and Space keys get friendly labels.",
      code: `<KeyboardShortcut shortcut={["Escape"]} />
<KeyboardShortcut shortcut={[" "]} />
<KeyboardShortcut shortcut={["ArrowUp"]} />`,
      preview: React.createElement(
        "div",
        { className: "flex items-center gap-4" },
        React.createElement(KeyboardShortcut, { shortcut: ["Escape"] }),
        React.createElement(KeyboardShortcut, { shortcut: [" "] }),
        React.createElement(KeyboardShortcut, { shortcut: ["ArrowUp"] })
      ),
    },
  ],
  props: [
    {
      name: "shortcut",
      type: "string[]",
      description: "Keys in order, using KeyboardEvent.key names.",
    },
    {
      name: "short",
      type: "boolean",
      default: "false",
      description: "Use compact symbols for modifier keys.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
};
