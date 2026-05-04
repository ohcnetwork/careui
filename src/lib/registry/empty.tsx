import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  BellIcon,
  CloudIcon,
  FolderCodeIcon,
  PlusIcon,
  RefreshCcwIcon,
  SearchIcon,
} from "lucide-react";

export const emptyDoc: ComponentDoc = {
  id: "empty",
  name: "Empty",
  description: "Use the Empty component to display an empty state.",
  installation: {
    cli: "npx shadcn@latest add empty",
    manual: "Copy and paste the empty component source code into your project.",
  },
  usage: `import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon />
    </EmptyMedia>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add data</Button>
  </EmptyContent>
</Empty>`,
  preview: {
    code: `import { FolderCodeIcon, ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderCodeIcon />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven't created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button>Create Project</Button>
        <Button variant="outline">Import Project</Button>
      </EmptyContent>
      <Button variant="link" asChild className="text-muted-foreground" size="sm">
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  )
}`,
    component: React.createElement(() =>
      React.createElement(
        Empty,
        {},
        React.createElement(
          EmptyHeader,
          {},
          React.createElement(
            EmptyMedia,
            { variant: "icon" },
            React.createElement(FolderCodeIcon, {})
          ),
          React.createElement(EmptyTitle, {}, "No Projects Yet"),
          React.createElement(
            EmptyDescription,
            {},
            "You haven't created any projects yet. Get started by creating your first project."
          )
        ),
        React.createElement(
          EmptyContent,
          { className: "flex-row justify-center gap-4" },
          React.createElement(Button, {}, "Create Project"),
          React.createElement(Button, { variant: "outline" }, "Import Project")
        ),
        React.createElement(
          Button,
          { variant: "link", asChild: true, className: "text-muted-foreground", size: "sm" },
          React.createElement(
            "a",
            { href: "#" },
            "Learn More ",
            React.createElement(ArrowUpRightIcon, {})
          )
        )
      )
    ),
  },
  examples: [
    {
      name: "Outline",
      description: "Use the border utility class to create an outline empty state.",
      code: `import { CloudIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyOutline() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudIcon />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">Upload Files</Button>
      </EmptyContent>
    </Empty>
  )
}`,
      preview: React.createElement(() =>
        React.createElement(
          Empty,
          { className: "border border-dashed" },
          React.createElement(
            EmptyHeader,
            {},
            React.createElement(
              EmptyMedia,
              { variant: "icon" },
              React.createElement(CloudIcon, {})
            ),
            React.createElement(EmptyTitle, {}, "Cloud Storage Empty"),
            React.createElement(
              EmptyDescription,
              {},
              "Upload files to your cloud storage to access them anywhere."
            )
          ),
          React.createElement(
            EmptyContent,
            {},
            React.createElement(Button, { variant: "outline", size: "sm" }, "Upload Files")
          )
        )
      ),
    },
    {
      name: "Background",
      description: "Use the bg-* and bg-gradient-* utilities to add a background to the empty state.",
      code: `import { BellIcon, RefreshCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyMuted() {
  return (
    <Empty className="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BellIcon />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          You're all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <RefreshCcwIcon />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}`,
      preview: React.createElement(() =>
        React.createElement(
          Empty,
          { className: "h-full bg-muted/30" },
          React.createElement(
            EmptyHeader,
            {},
            React.createElement(
              EmptyMedia,
              { variant: "icon" },
              React.createElement(BellIcon, {})
            ),
            React.createElement(EmptyTitle, {}, "No Notifications"),
            React.createElement(
              EmptyDescription,
              { className: "max-w-xs text-pretty" },
              "You're all caught up. New notifications will appear here."
            )
          ),
          React.createElement(
            EmptyContent,
            {},
            React.createElement(
              Button,
              { variant: "outline" },
              React.createElement(RefreshCcwIcon, {}),
              "Refresh"
            )
          )
        )
      ),
    },
    {
      name: "Avatar",
      description: "Use the EmptyMedia component to display an avatar in the empty state.",
      code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyAvatar() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" className="grayscale" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>User Offline</EmptyTitle>
        <EmptyDescription>
          This user is currently offline. You can leave a message to notify
          them or try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Leave Message</Button>
      </EmptyContent>
    </Empty>
  )
}`,
      preview: React.createElement(() =>
        React.createElement(
          Empty,
          {},
          React.createElement(
            EmptyHeader,
            {},
            React.createElement(
              EmptyMedia,
              { variant: "default" },
              React.createElement(
                Avatar,
                { className: "size-12" },
                React.createElement(AvatarImage, {
                  src: "https://github.com/shadcn.png",
                  className: "grayscale",
                }),
                React.createElement(AvatarFallback, {}, "LR")
              )
            ),
            React.createElement(EmptyTitle, {}, "User Offline"),
            React.createElement(
              EmptyDescription,
              {},
              "This user is currently offline. You can leave a message to notify them or try again later."
            )
          ),
          React.createElement(
            EmptyContent,
            {},
            React.createElement(Button, { size: "sm" }, "Leave Message")
          )
        )
      ),
    },
    {
      name: "Avatar Group",
      description: "Use the EmptyMedia component to display an avatar group in the empty state.",
      code: `import { PlusIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyAvatarGroup() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <div className="flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </EmptyMedia>
        <EmptyTitle>No Team Members</EmptyTitle>
        <EmptyDescription>
          Invite your team to collaborate on this project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <PlusIcon />
          Invite Members
        </Button>
      </EmptyContent>
    </Empty>
  )
}`,
      preview: React.createElement(() =>
        React.createElement(
          Empty,
          {},
          React.createElement(
            EmptyHeader,
            {},
            React.createElement(
              EmptyMedia,
              {},
              React.createElement(
                "div",
                {
                  className:
                    "flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale",
                },
                React.createElement(
                  Avatar,
                  {},
                  React.createElement(AvatarImage, { src: "https://github.com/shadcn.png", alt: "@shadcn" }),
                  React.createElement(AvatarFallback, {}, "CN")
                ),
                React.createElement(
                  Avatar,
                  {},
                  React.createElement(AvatarImage, { src: "https://github.com/maxleiter.png", alt: "@maxleiter" }),
                  React.createElement(AvatarFallback, {}, "LR")
                ),
                React.createElement(
                  Avatar,
                  {},
                  React.createElement(AvatarImage, { src: "https://github.com/evilrabbit.png", alt: "@evilrabbit" }),
                  React.createElement(AvatarFallback, {}, "ER")
                )
              )
            ),
            React.createElement(EmptyTitle, {}, "No Team Members"),
            React.createElement(
              EmptyDescription,
              {},
              "Invite your team to collaborate on this project."
            )
          ),
          React.createElement(
            EmptyContent,
            {},
            React.createElement(
              Button,
              { size: "sm" },
              React.createElement(PlusIcon, {}),
              "Invite Members"
            )
          )
        )
      ),
    },
    {
      name: "InputGroup",
      description: "You can add an InputGroup component to the EmptyContent component.",
      code: `import { SearchIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export function EmptyInputGroup() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you're looking for doesn't exist. Try searching for
          what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup className="sm:w-3/4">
          <InputGroupInput placeholder="Try searching for pages..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <EmptyDescription>
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}`,
      preview: React.createElement(() =>
        React.createElement(
          Empty,
          {},
          React.createElement(
            EmptyHeader,
            {},
            React.createElement(EmptyTitle, {}, "404 - Not Found"),
            React.createElement(
              EmptyDescription,
              {},
              "The page you're looking for doesn't exist. Try searching for what you need below."
            )
          ),
          React.createElement(
            EmptyContent,
            {},
            React.createElement(
              InputGroup,
              { className: "sm:w-3/4" },
              React.createElement(InputGroupInput, { placeholder: "Try searching for pages..." }),
              React.createElement(InputGroupAddon, {}, React.createElement(SearchIcon, {})),
              React.createElement(
                InputGroupAddon,
                { align: "inline-end" },
                React.createElement(Kbd, {}, "/")
              )
            ),
            React.createElement(
              EmptyDescription,
              {},
              "Need help? ",
              React.createElement("a", { href: "#" }, "Contact support")
            )
          )
        )
      ),
    },
  ],
};
