/**
 * Component Registry Template
 *
 * Copy this file to create a new component documentation file.
 * Replace COMPONENT_NAME with your component name.
 *
 * Example: For "alert-dialog", replace:
 * - COMPONENT_NAME -> alert-dialog
 * - ComponentName -> AlertDialog
 * - componentName -> alertDialog
 */

import React from "react";
// Import your component here
// import { ComponentName } from '@/components/ui/component-name'
import { type ComponentDoc } from "@/lib/types";

export const componentNameDoc: ComponentDoc = {
  id: "component-name",
  name: "Component Name",
  description: "Brief description of what this component does.",
  installation: {
    cli: "npx shadcn@latest add component-name",
    manual: "Copy and paste the component source code into your project.",
  },
  usage: `import { ComponentName } from "@/components/ui/component-name"

export function ComponentNameDemo() {
  return <ComponentName>Content</ComponentName>
}`,
  // Main preview shown at the top
  preview: {
    code: `<ComponentName>
  Content goes here
</ComponentName>`,
    component: React.createElement(
      "div",
      { className: "text-sm text-muted-foreground" },
      "Component preview - replace with actual component"
    ),
    // Uncomment when component is imported:
    // component: React.createElement(ComponentName, {}, 'Content')
  },
  // Optional: Additional examples showing variants/states
  examples: [
    {
      name: "Variants",
      description: "Different variants of the component.",
      code: `<div className="flex gap-2">
  <ComponentName variant="default">Default</ComponentName>
  <ComponentName variant="secondary">Secondary</ComponentName>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex gap-2" },
        React.createElement(
          "div",
          { className: "text-sm text-muted-foreground" },
          "Variants preview - replace with actual components"
        )
      ),
    },
  ],
  props: [
    {
      name: "variant",
      type: '"default" | "secondary"',
      description: "The visual style variant.",
      default: '"default"',
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      description: "The size of the component.",
      default: '"md"',
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the component is disabled.",
      default: "false",
    },
  ],
};
