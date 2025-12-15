#!/usr/bin/env tsx
/**
 * Auto-add JSDoc metadata to all components that don't have it
 */

import fs from "fs/promises";
import path from "path";
import { glob } from "glob";

const componentMetadata = {
  accordion: {
    description:
      "A vertically stacked set of interactive headings that each reveal a section of content.",
    dependencies: "@radix-ui/react-accordion lucide-react",
  },
  alert: {
    description: "Displays a callout for user attention.",
    dependencies: "class-variance-authority",
  },
  "alert-dialog": {
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    dependencies: "radix-ui",
  },
  "aspect-ratio": {
    description: "Displays content within a desired ratio.",
    dependencies: "@radix-ui/react-aspect-ratio",
  },
  avatar: {
    description: "An image element with a fallback for representing the user.",
    dependencies: "@radix-ui/react-avatar",
  },
  badge: {
    description:
      "A badge component for displaying small bits of information like status, labels, or notifications.",
    dependencies: "@radix-ui/react-slot class-variance-authority lucide-react",
  },
  breadcrumb: {
    description:
      "Displays the path to the current resource using a hierarchy of links.",
    dependencies: "@radix-ui/react-slot lucide-react",
  },
  button: {
    description: "Displays a button or a component that looks like a button.",
    dependencies: "@radix-ui/react-slot class-variance-authority",
  },
  "button-group": {
    description: "A set of related buttons grouped together.",
    dependencies: "class-variance-authority",
  },
  calendar: {
    description:
      "A date field component that allows users to enter and edit date.",
    dependencies: "react-day-picker date-fns lucide-react",
  },
  card: {
    description:
      "A card component for displaying content in a contained, elevated surface.",
    dependencies: "none",
  },
  carousel: {
    description: "A carousel component for cycling through elements.",
    dependencies: "embla-carousel-react lucide-react",
  },
  chart: {
    description: "A collection of chart components built with Recharts.",
    dependencies: "recharts lucide-react",
  },
  checkbox: {
    description:
      "A control that allows the user to toggle between checked and not checked.",
    dependencies: "@radix-ui/react-checkbox lucide-react",
  },
  collapsible: {
    description: "An interactive component which expands/collapses a panel.",
    dependencies: "@radix-ui/react-collapsible",
  },
  command: {
    description: "Fast, composable, unstyled command menu for React.",
    dependencies: "cmdk lucide-react",
  },
  "context-menu": {
    description: "Displays a menu to the user triggered by right-click.",
    dependencies: "@radix-ui/react-context-menu lucide-react",
  },
  dialog: {
    description:
      "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
    dependencies: "@radix-ui/react-dialog lucide-react",
  },
  drawer: {
    description: "A drawer component for React, built on top of Vaul.",
    dependencies: "vaul lucide-react",
  },
  "dropdown-menu": {
    description:
      "Displays a menu to the user—such as a set of actions or functions—triggered by a button.",
    dependencies: "@radix-ui/react-dropdown-menu lucide-react",
  },
  empty: {
    description: "Displays an empty state when no data is available.",
    dependencies: "lucide-react",
  },
  field: {
    description:
      "A form field component with label, description, and error message support.",
    dependencies: "@radix-ui/react-label",
  },
  "hover-card": {
    description:
      "For sighted users to preview content available behind a link.",
    dependencies: "@radix-ui/react-hover-card",
  },
  input: {
    description:
      "Displays a form input field or a component that looks like an input field.",
    dependencies: "none",
  },
  "input-group": {
    description: "A wrapper for input fields with prefix and suffix elements.",
    dependencies: "none",
  },
  "input-otp": {
    description:
      "Accessible one-time password component with copy paste functionality.",
    dependencies: "input-otp",
  },
  item: {
    description: "A generic item component used within lists or menus.",
    dependencies: "none",
  },
  kbd: {
    description: "Displays keyboard input or keyboard shortcuts.",
    dependencies: "none",
  },
  label: {
    description: "Renders an accessible label associated with controls.",
    dependencies: "@radix-ui/react-label class-variance-authority",
  },
  menubar: {
    description: "A visually persistent menu common in desktop applications.",
    dependencies: "@radix-ui/react-menubar lucide-react",
  },
  "navigation-menu": {
    description: "A collection of links for navigating websites.",
    dependencies: "@radix-ui/react-navigation-menu lucide-react",
  },
  pagination: {
    description: "Pagination with page navigation, next and previous links.",
    dependencies: "lucide-react",
  },
  popover: {
    description: "Displays rich content in a portal, triggered by a button.",
    dependencies: "@radix-ui/react-popover",
  },
  progress: {
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    dependencies: "@radix-ui/react-progress",
  },
  "radio-group": {
    description:
      "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
    dependencies: "@radix-ui/react-radio-group lucide-react",
  },
  resizable: {
    description:
      "Accessible resizable panel groups and layouts with keyboard support.",
    dependencies: "react-resizable-panels",
  },
  "scroll-area": {
    description:
      "Augments native scroll functionality for custom, cross-browser styling.",
    dependencies: "@radix-ui/react-scroll-area",
  },
  select: {
    description:
      "Displays a list of options for the user to pick from—triggered by a button.",
    dependencies: "@radix-ui/react-select lucide-react",
  },
  separator: {
    description: "Visually or semantically separates content.",
    dependencies: "@radix-ui/react-separator",
  },
  sheet: {
    description:
      "Extends the Dialog component to display content that complements the main content of the screen.",
    dependencies:
      "@radix-ui/react-dialog class-variance-authority lucide-react",
  },
  sidebar: {
    description: "A composable, themeable and customizable sidebar component.",
    dependencies: "@radix-ui/react-slot class-variance-authority lucide-react",
  },
  skeleton: {
    description: "Use to show a placeholder while content is loading.",
    dependencies: "none",
  },
  slider: {
    description:
      "An input where the user selects a value from within a given range.",
    dependencies: "@radix-ui/react-slider",
  },
  sonner: {
    description: "An opinionated toast component for React.",
    dependencies: "sonner next-themes",
  },
  spinner: {
    description: "A loading spinner component to indicate activity.",
    dependencies: "class-variance-authority",
  },
  switch: {
    description:
      "A control that allows the user to toggle between checked and not checked.",
    dependencies: "@radix-ui/react-switch",
  },
  "syntax-highlighted-code": {
    description:
      "Displays syntax highlighted code blocks with copy functionality.",
    dependencies: "lucide-react",
  },
  table: {
    description: "A responsive table component.",
    dependencies: "none",
  },
  tabs: {
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    dependencies: "@radix-ui/react-tabs",
  },
  textarea: {
    description:
      "Displays a form textarea or a component that looks like a textarea.",
    dependencies: "none",
  },
  toggle: {
    description: "A two-state button that can be either on or off.",
    dependencies: "@radix-ui/react-toggle class-variance-authority",
  },
  "toggle-group": {
    description: "A set of two-state buttons that can be toggled on or off.",
    dependencies: "@radix-ui/react-toggle-group class-variance-authority",
  },
  tooltip: {
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    dependencies: "@radix-ui/react-tooltip",
  },
} as const;

async function addJSDocToComponent(filePath: string): Promise<void> {
  const componentName = path.basename(filePath, ".tsx");
  const metadata =
    componentMetadata[componentName as keyof typeof componentMetadata];

  if (!metadata) {
    console.log(`⚠️  No metadata defined for ${componentName}`);
    return;
  }

  const content = await fs.readFile(filePath, "utf-8");

  // Check if JSDoc already exists
  if (content.includes("@name")) {
    console.log(`✅ ${componentName} already has JSDoc metadata`);
    return;
  }

  // Create JSDoc header
  const jsdocHeader = `/**
 * @name ${componentName}
 * @description ${metadata.description}
 * @dependencies ${metadata.dependencies}
 * @type registry:ui
 */
`;

  // Add JSDoc before the first import or "use client"
  const newContent = jsdocHeader + content;

  await fs.writeFile(filePath, newContent);
  console.log(`✓ Added JSDoc to ${componentName}`);
}

async function main(): Promise<void> {
  console.log("🚀 Adding JSDoc metadata to all components...");

  const componentFiles = await glob("src/components/ui/*.tsx");

  if (componentFiles.length === 0) {
    console.log("⚠️  No component files found in src/components/ui/");
    return;
  }

  for (const filePath of componentFiles) {
    try {
      await addJSDocToComponent(filePath);
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
    }
  }

  console.log("\n✅ JSDoc metadata addition complete!");
  console.log("💡 Run `npm run registry:generate` to update the registry");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as addJSDocToAll };
