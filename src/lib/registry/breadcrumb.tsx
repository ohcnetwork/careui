import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, DotIcon } from "lucide-react";

export const breadcrumbDoc: ComponentDoc = {
  id: "breadcrumb",
  name: "Breadcrumb",
  description:
    "Displays the path to the current resource using a hierarchy of links.",
  installation: {
    cli: "npx shadcn@latest add breadcrumb",
    manual:
      "Copy and paste the breadcrumb component source code into your project.",
  },
  usage: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  preview: {
    code: `import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon-sm" variant="ghost">
            <BreadcrumbEllipsis />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Themes</DropdownMenuItem>
            <DropdownMenuItem>GitHub</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    component: React.createElement(
      Breadcrumb,
      {},
      React.createElement(
        BreadcrumbList,
        {},
        React.createElement(
          BreadcrumbItem,
          {},
          React.createElement(BreadcrumbLink, { href: "#" }, "Home")
        ),
        React.createElement(BreadcrumbSeparator, {}),
        React.createElement(
          BreadcrumbItem,
          {},
          React.createElement(
            DropdownMenu,
            {},
            React.createElement(
              DropdownMenuTrigger,
              { asChild: true },
              React.createElement(
                Button,
                { size: "icon-sm", variant: "ghost" },
                React.createElement(BreadcrumbEllipsis, {}),
                React.createElement("span", { className: "sr-only" }, "Toggle menu")
              )
            ),
            React.createElement(
              DropdownMenuContent,
              { align: "start" },
              React.createElement(
                DropdownMenuGroup,
                {},
                React.createElement(DropdownMenuItem, {}, "Documentation"),
                React.createElement(DropdownMenuItem, {}, "Themes"),
                React.createElement(DropdownMenuItem, {}, "GitHub")
              )
            )
          )
        ),
        React.createElement(BreadcrumbSeparator, {}),
        React.createElement(
          BreadcrumbItem,
          {},
          React.createElement(BreadcrumbLink, { href: "#" }, "Components")
        ),
        React.createElement(BreadcrumbSeparator, {}),
        React.createElement(
          BreadcrumbItem,
          {},
          React.createElement(BreadcrumbPage, {}, "Breadcrumb")
        )
      )
    ),
  },

  examples: [
    // ── Basic ──────────────────────────────────────────────────────────────
    {
      name: "Basic",
      description:
        "A basic breadcrumb with a home link and a components link.",
      code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbBasic() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
      preview: React.createElement(
        Breadcrumb,
        {},
        React.createElement(
          BreadcrumbList,
          {},
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbLink, { href: "#" }, "Home")
          ),
          React.createElement(BreadcrumbSeparator, {}),
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbLink, { href: "#" }, "Components")
          ),
          React.createElement(BreadcrumbSeparator, {}),
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbPage, {}, "Breadcrumb")
          )
        )
      ),
    },

    // ── Custom separator ───────────────────────────────────────────────────
    {
      name: "Custom separator",
      description:
        "Use a custom component as children for <BreadcrumbSeparator /> to create a custom separator.",
      code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DotIcon } from "lucide-react"

export function BreadcrumbSeparatorDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
      preview: React.createElement(
        Breadcrumb,
        {},
        React.createElement(
          BreadcrumbList,
          {},
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbLink, { href: "#" }, "Home")
          ),
          React.createElement(
            BreadcrumbSeparator,
            {},
            React.createElement(DotIcon)
          ),
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbLink, { href: "#" }, "Components")
          ),
          React.createElement(
            BreadcrumbSeparator,
            {},
            React.createElement(DotIcon)
          ),
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbPage, {}, "Breadcrumb")
          )
        )
      ),
    },

    // ── Dropdown ───────────────────────────────────────────────────────────
    {
      name: "Dropdown",
      description:
        "You can compose <BreadcrumbItem /> with a <DropdownMenu /> to create a dropdown in the breadcrumb.",
      code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, DotIcon } from "lucide-react"

export function BreadcrumbDropdown() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1">
                Components
                <ChevronDownIcon className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
      preview: React.createElement(
        Breadcrumb,
        {},
        React.createElement(
          BreadcrumbList,
          {},
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbLink, { href: "#" }, "Home")
          ),
          React.createElement(
            BreadcrumbSeparator,
            {},
            React.createElement(DotIcon)
          ),
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(
              DropdownMenu,
              {},
              React.createElement(
                DropdownMenuTrigger,
                { asChild: true },
                React.createElement(
                  "button",
                  { className: "flex items-center gap-1" },
                  "Components",
                  React.createElement(ChevronDownIcon, { className: "size-3.5" })
                )
              ),
              React.createElement(
                DropdownMenuContent,
                { align: "start" },
                React.createElement(
                  DropdownMenuGroup,
                  {},
                  React.createElement(DropdownMenuItem, {}, "Documentation"),
                  React.createElement(DropdownMenuItem, {}, "Themes"),
                  React.createElement(DropdownMenuItem, {}, "GitHub")
                )
              )
            )
          ),
          React.createElement(
            BreadcrumbSeparator,
            {},
            React.createElement(DotIcon)
          ),
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbPage, {}, "Breadcrumb")
          )
        )
      ),
    },

    // ── Collapsed ──────────────────────────────────────────────────────────
    {
      name: "Collapsed",
      description:
        "We provide a <BreadcrumbEllipsis /> component to show a collapsed state when the breadcrumb is too long.",
      code: `import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbEllipsisDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
      preview: React.createElement(
        Breadcrumb,
        {},
        React.createElement(
          BreadcrumbList,
          {},
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbLink, { href: "#" }, "Home")
          ),
          React.createElement(BreadcrumbSeparator, {}),
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbEllipsis, {})
          ),
          React.createElement(BreadcrumbSeparator, {}),
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbLink, { href: "#" }, "Components")
          ),
          React.createElement(BreadcrumbSeparator, {}),
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbPage, {}, "Breadcrumb")
          )
        )
      ),
    },

    // ── Link component ─────────────────────────────────────────────────────
    {
      name: "Link component",
      description:
        "To use a custom link component from your routing library, you can use the asChild prop on <BreadcrumbLink />.",
      code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbLinkDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
      preview: React.createElement(
        Breadcrumb,
        {},
        React.createElement(
          BreadcrumbList,
          {},
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbLink, { href: "#" }, "Home")
          ),
          React.createElement(BreadcrumbSeparator, {}),
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbLink, { href: "#" }, "Components")
          ),
          React.createElement(BreadcrumbSeparator, {}),
          React.createElement(
            BreadcrumbItem,
            {},
            React.createElement(BreadcrumbPage, {}, "Breadcrumb")
          )
        )
      ),
    },
  ],
};
