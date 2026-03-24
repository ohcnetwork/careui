import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return React.createElement(
    "li",
    props,
    React.createElement(
      NavigationMenuLink,
      { asChild: true },
      React.createElement(
        "a",
        { href },
        React.createElement(
          "div",
          { className: "flex flex-col gap-1 text-sm" },
          React.createElement(
            "div",
            { className: "leading-none font-medium" },
            title
          ),
          React.createElement(
            "div",
            { className: "line-clamp-2 text-muted-foreground" },
            children
          )
        )
      )
    )
  );
}

export const navigationMenuDoc: ComponentDoc = {
  id: "navigation-menu",
  name: "Navigation Menu",
  description: "A collection of links for navigating websites.",
  installation: {
    cli: "npx shadcn@latest add navigation-menu",
    manual:
      "Copy and paste the navigation menu component source code into your project.",
  },
  usage: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"`,
  preview: {
    code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="w-96">
          <ListItem href="/docs" title="Introduction">
            Re-usable components built with Tailwind CSS.
          </ListItem>
          <ListItem href="/docs/installation" title="Installation">
            How to install dependencies and structure your app.
          </ListItem>
          <ListItem href="/docs/primitives/typography" title="Typography">
            Styles for headings, paragraphs, lists...etc
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem className="hidden md:flex">
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
          {components.map((component) => (
            <ListItem key={component.title} title={component.title} href={component.href}>
              {component.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <a href="/docs">Docs</a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    component: React.createElement(
      NavigationMenu,
      {},
      React.createElement(
        NavigationMenuList,
        {},
        // Getting started
        React.createElement(
          NavigationMenuItem,
          {},
          React.createElement(NavigationMenuTrigger, {}, "Getting started"),
          React.createElement(
            NavigationMenuContent,
            {},
            React.createElement(
              "ul",
              { className: "w-96" },
              React.createElement(ListItem, { href: "/docs", title: "Introduction" },
                "Re-usable components built with Tailwind CSS."
              ),
              React.createElement(ListItem, { href: "/docs/installation", title: "Installation" },
                "How to install dependencies and structure your app."
              ),
              React.createElement(ListItem, { href: "/docs/primitives/typography", title: "Typography" },
                "Styles for headings, paragraphs, lists...etc"
              )
            )
          )
        ),
        // Components
        React.createElement(
          NavigationMenuItem,
          { className: "hidden md:flex" },
          React.createElement(NavigationMenuTrigger, {}, "Components"),
          React.createElement(
            NavigationMenuContent,
            {},
            React.createElement(
              "ul",
              {
                className:
                  "grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150",
              },
              ...components.map((component) =>
                React.createElement(
                  ListItem,
                  {
                    key: component.title,
                    title: component.title,
                    href: component.href,
                  },
                  component.description
                )
              )
            )
          )
        ),
        // Docs link
        React.createElement(
          NavigationMenuItem,
          {},
          React.createElement(
            NavigationMenuLink,
            { asChild: true, className: navigationMenuTriggerStyle() },
            React.createElement("a", { href: "/docs" }, "Docs")
          )
        )
      )
    ),
  },
};
