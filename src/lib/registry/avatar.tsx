import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";

export const avatarDoc: ComponentDoc = {
  id: "avatar",
  name: "Avatar",
  description: "An image element with a fallback for representing the user.",
  installation: {
    cli: "npx shadcn@latest add avatar",
    manual:
      "Copy and paste the avatar component source code into your project.",
  },
  usage: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`,
  preview: {
    code: `import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

<div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
  <Avatar>
    <AvatarImage
      src="https://github.com/shadcn.png"
      alt="@shadcn"
      className="grayscale"
    />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage
      src="https://github.com/evilrabbit.png"
      alt="@evilrabbit"
    />
    <AvatarFallback>ER</AvatarFallback>
    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
  </Avatar>
  <AvatarGroup className="grayscale">
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage
        src="https://github.com/maxleiter.png"
        alt="@maxleiter"
      />
      <AvatarFallback>LR</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage
        src="https://github.com/evilrabbit.png"
        alt="@evilrabbit"
      />
      <AvatarFallback>ER</AvatarFallback>
    </Avatar>
    <AvatarGroupCount>+3</AvatarGroupCount>
  </AvatarGroup>
</div>`,
    component: React.createElement(
      "div",
      { className: "flex flex-row flex-wrap items-center gap-6 md:gap-12" },
      React.createElement(
        Avatar,
        {},
        React.createElement(AvatarImage, {
          src: "https://github.com/shadcn.png",
          alt: "@shadcn",
          className: "grayscale",
        }),
        React.createElement(AvatarFallback, {}, "CN")
      ),
      React.createElement(
        Avatar,
        {},
        React.createElement(AvatarImage, {
          src: "https://github.com/evilrabbit.png",
          alt: "@evilrabbit",
        }),
        React.createElement(AvatarFallback, {}, "ER"),
        React.createElement(AvatarBadge, {
          className: "bg-green-600 dark:bg-green-800",
        })
      ),
      React.createElement(
        AvatarGroup,
        { className: "grayscale" },
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/shadcn.png",
            alt: "@shadcn",
          }),
          React.createElement(AvatarFallback, {}, "CN")
        ),
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/maxleiter.png",
            alt: "@maxleiter",
          }),
          React.createElement(AvatarFallback, {}, "LR")
        ),
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/evilrabbit.png",
            alt: "@evilrabbit",
          }),
          React.createElement(AvatarFallback, {}, "ER")
        ),
        React.createElement(AvatarGroupCount, {}, "+3")
      )
    ),
  },

  examples: [
    // ── Basic ──────────────────────────────────────────────────────────────
    {
      name: "Basic",
      description: "A basic avatar component with an image and a fallback.",
      code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`,
      preview: React.createElement(
        Avatar,
        {},
        React.createElement(AvatarImage, {
          src: "https://github.com/shadcn.png",
          alt: "@shadcn",
          className: "grayscale",
        }),
        React.createElement(AvatarFallback, {}, "CN")
      ),
    },

    // ── Badge ──────────────────────────────────────────────────────────────
    {
      name: "Badge",
      description:
        "Use the AvatarBadge component to add a badge to the avatar. The badge is positioned at the bottom right of the avatar.",
      code: `import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarWithBadge() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  )
}`,
      preview: React.createElement(
        Avatar,
        {},
        React.createElement(AvatarImage, {
          src: "https://github.com/shadcn.png",
          alt: "@shadcn",
        }),
        React.createElement(AvatarFallback, {}, "CN"),
        React.createElement(AvatarBadge, {
          className: "bg-green-600 dark:bg-green-800",
        })
      ),
    },

    // ── Badge with Icon ────────────────────────────────────────────────────
    {
      name: "Badge with Icon",
      description: "You can also use an icon inside AvatarBadge.",
      code: `import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { PlusIcon } from "lucide-react"

export function AvatarBadgeIconExample() {
  return (
    <Avatar className="grayscale">
      <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <PlusIcon />
      </AvatarBadge>
    </Avatar>
  )
}`,
      preview: React.createElement(
        Avatar,
        { className: "grayscale" },
        React.createElement(AvatarImage, {
          src: "https://github.com/pranathip.png",
          alt: "@pranathip",
        }),
        React.createElement(AvatarFallback, {}, "PP"),
        React.createElement(AvatarBadge, {}, React.createElement(PlusIcon))
      ),
    },

    // ── Avatar Group ───────────────────────────────────────────────────────
    {
      name: "Avatar Group",
      description:
        "Use the AvatarGroup component to add a group of avatars.",
      code: `import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarGroupExample() {
  return (
    <AvatarGroup className="grayscale">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}`,
      preview: React.createElement(
        AvatarGroup,
        { className: "grayscale" },
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/shadcn.png",
            alt: "@shadcn",
          }),
          React.createElement(AvatarFallback, {}, "CN")
        ),
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/maxleiter.png",
            alt: "@maxleiter",
          }),
          React.createElement(AvatarFallback, {}, "LR")
        ),
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/evilrabbit.png",
            alt: "@evilrabbit",
          }),
          React.createElement(AvatarFallback, {}, "ER")
        )
      ),
    },

    // ── Avatar Group Count ─────────────────────────────────────────────────
    {
      name: "Avatar Group Count",
      description:
        "Use AvatarGroupCount to add a count to the group.",
      code: `import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarGroupCountExample() {
  return (
    <AvatarGroup className="grayscale">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  )
}`,
      preview: React.createElement(
        AvatarGroup,
        { className: "grayscale" },
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/shadcn.png",
            alt: "@shadcn",
          }),
          React.createElement(AvatarFallback, {}, "CN")
        ),
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/maxleiter.png",
            alt: "@maxleiter",
          }),
          React.createElement(AvatarFallback, {}, "LR")
        ),
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/evilrabbit.png",
            alt: "@evilrabbit",
          }),
          React.createElement(AvatarFallback, {}, "ER")
        ),
        React.createElement(AvatarGroupCount, {}, "+3")
      ),
    },

    // ── Avatar Group with Icon ─────────────────────────────────────────────
    {
      name: "Avatar Group with Icon",
      description:
        "You can also use an icon inside AvatarGroupCount.",
      code: `import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { PlusIcon } from "lucide-react"

export function AvatarGroupCountIconExample() {
  return (
    <AvatarGroup className="grayscale">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>
        <PlusIcon />
      </AvatarGroupCount>
    </AvatarGroup>
  )
}`,
      preview: React.createElement(
        AvatarGroup,
        { className: "grayscale" },
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/shadcn.png",
            alt: "@shadcn",
          }),
          React.createElement(AvatarFallback, {}, "CN")
        ),
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/maxleiter.png",
            alt: "@maxleiter",
          }),
          React.createElement(AvatarFallback, {}, "LR")
        ),
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/evilrabbit.png",
            alt: "@evilrabbit",
          }),
          React.createElement(AvatarFallback, {}, "ER")
        ),
        React.createElement(AvatarGroupCount, {}, React.createElement(PlusIcon))
      ),
    },

    // ── Sizes ──────────────────────────────────────────────────────────────
    {
      name: "Sizes",
      description:
        "Use the size prop to change the size of the avatar.",
      code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarSizeExample() {
  return (
    <div className="flex flex-wrap items-center gap-2 grayscale">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex flex-wrap items-center gap-2 grayscale" },
        React.createElement(
          Avatar,
          { size: "sm" },
          React.createElement(AvatarImage, {
            src: "https://github.com/shadcn.png",
            alt: "@shadcn",
          }),
          React.createElement(AvatarFallback, {}, "CN")
        ),
        React.createElement(
          Avatar,
          {},
          React.createElement(AvatarImage, {
            src: "https://github.com/shadcn.png",
            alt: "@shadcn",
          }),
          React.createElement(AvatarFallback, {}, "CN")
        ),
        React.createElement(
          Avatar,
          { size: "lg" },
          React.createElement(AvatarImage, {
            src: "https://github.com/shadcn.png",
            alt: "@shadcn",
          }),
          React.createElement(AvatarFallback, {}, "CN")
        )
      ),
    },

    // ── Dropdown ───────────────────────────────────────────────────────────
    {
      name: "Dropdown",
      description:
        "You can use the Avatar component as a trigger for a dropdown menu.",
      code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
      preview: React.createElement(
        DropdownMenu,
        {},
        React.createElement(
          DropdownMenuTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "ghost", size: "icon", className: "rounded-full" },
            React.createElement(
              Avatar,
              {},
              React.createElement(AvatarImage, {
                src: "https://github.com/shadcn.png",
                alt: "shadcn",
              }),
              React.createElement(AvatarFallback, {}, "CN")
            )
          )
        ),
        React.createElement(
          DropdownMenuContent,
          { className: "w-32" },
          React.createElement(
            DropdownMenuGroup,
            {},
            React.createElement(DropdownMenuItem, {}, "Profile"),
            React.createElement(DropdownMenuItem, {}, "Billing"),
            React.createElement(DropdownMenuItem, {}, "Settings")
          ),
          React.createElement(DropdownMenuSeparator),
          React.createElement(
            DropdownMenuGroup,
            {},
            React.createElement(
              DropdownMenuItem,
              { variant: "destructive" },
              "Log out"
            )
          )
        )
      ),
    },
  ],
};
