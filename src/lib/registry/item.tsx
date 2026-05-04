import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgeCheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  InboxIcon,
  PlusIcon,
  ShieldAlertIcon,
} from "lucide-react";

const people = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
];

const music = [
  {
    title: "Midnight City Lights",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45",
  },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    album: "Urban Stories",
    duration: "4:05",
  },
  {
    title: "Digital Rain",
    artist: "Cyber Symphony",
    album: "Binary Beats",
    duration: "3:30",
  },
];

const models = [
  {
    name: "v0-1.5-sm",
    description: "Everyday tasks and UI generation.",
    image:
      "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "v0-1.5-lg",
    description: "Advanced thinking or reasoning.",
    image:
      "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "v0-2.0-mini",
    description: "Open Source model for everyone.",
    image:
      "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
  },
];

export const itemDoc: ComponentDoc = {
  id: "item",
  name: "Item",
  description:
    "A versatile component for displaying content with media, title, description, and actions.",
  installation: {
    cli: "npx shadcn@latest add item",
    manual: "Copy and paste the item component source code into your project.",
  },
  usage: `import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

<Item>
  <ItemMedia variant="icon">
    <Icon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Title</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button>Action</Button>
  </ItemActions>
</Item>`,
  preview: {
    code: `import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"

export function ItemDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>
            A simple item with title and description.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" asChild>
        <a href="#">
          <ItemMedia>
            <BadgeCheckIcon className="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Your profile has been verified.</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}`,
    component: React.createElement(
      "div",
      { className: "flex w-full max-w-md flex-col gap-6" },
      React.createElement(
        Item,
        { variant: "outline" },
        React.createElement(
          ItemContent,
          {},
          React.createElement(ItemTitle, {}, "Basic Item"),
          React.createElement(ItemDescription, {}, "A simple item with title and description.")
        ),
        React.createElement(
          ItemActions,
          {},
          React.createElement(Button, { variant: "outline", size: "sm" }, "Action")
        )
      ),
      React.createElement(
        Item,
        { variant: "outline", size: "sm", asChild: true },
        React.createElement(
          "a",
          { href: "#" },
          React.createElement(
            ItemMedia,
            {},
            React.createElement(BadgeCheckIcon, { className: "size-5" })
          ),
          React.createElement(
            ItemContent,
            {},
            React.createElement(ItemTitle, {}, "Your profile has been verified.")
          ),
          React.createElement(
            ItemActions,
            {},
            React.createElement(ChevronRightIcon, { className: "size-4" })
          )
        )
      )
    ),
  },
  examples: [
    {
      name: "Variant",
      description: "Use the variant prop to change the visual style of the item.",
      code: `import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { InboxIcon } from "lucide-react"

export function ItemVariant() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item>
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>
            Transparent background with no border.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>
            Outlined style with a visible border.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>
            Muted background for secondary content.
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex w-full max-w-md flex-col gap-6" },
        React.createElement(
          Item,
          {},
          React.createElement(ItemMedia, { variant: "icon" }, React.createElement(InboxIcon)),
          React.createElement(
            ItemContent,
            {},
            React.createElement(ItemTitle, {}, "Default Variant"),
            React.createElement(ItemDescription, {}, "Transparent background with no border.")
          )
        ),
        React.createElement(
          Item,
          { variant: "outline" },
          React.createElement(ItemMedia, { variant: "icon" }, React.createElement(InboxIcon)),
          React.createElement(
            ItemContent,
            {},
            React.createElement(ItemTitle, {}, "Outline Variant"),
            React.createElement(ItemDescription, {}, "Outlined style with a visible border.")
          )
        ),
        React.createElement(
          Item,
          { variant: "muted" },
          React.createElement(ItemMedia, { variant: "icon" }, React.createElement(InboxIcon)),
          React.createElement(
            ItemContent,
            {},
            React.createElement(ItemTitle, {}, "Muted Variant"),
            React.createElement(ItemDescription, {}, "Muted background for secondary content.")
          )
        )
      ),
    },
    {
      name: "Size",
      description: 'Use the size prop to change the size of the item. Available sizes are "default", "sm", and "xs".',
      code: `import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { InboxIcon } from "lucide-react"

export function ItemSizeDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default Size</ItemTitle>
          <ItemDescription>
            The standard size for most use cases.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Small Size</ItemTitle>
          <ItemDescription>A compact size for dense layouts.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Extra Small Size</ItemTitle>
          <ItemDescription>The most compact size available.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex w-full max-w-md flex-col gap-6" },
        React.createElement(
          Item,
          { variant: "outline" },
          React.createElement(ItemMedia, { variant: "icon" }, React.createElement(InboxIcon)),
          React.createElement(
            ItemContent,
            {},
            React.createElement(ItemTitle, {}, "Default Size"),
            React.createElement(ItemDescription, {}, "The standard size for most use cases.")
          )
        ),
        React.createElement(
          Item,
          { variant: "outline", size: "sm" },
          React.createElement(ItemMedia, { variant: "icon" }, React.createElement(InboxIcon)),
          React.createElement(
            ItemContent,
            {},
            React.createElement(ItemTitle, {}, "Small Size"),
            React.createElement(ItemDescription, {}, "A compact size for dense layouts.")
          )
        ),
        React.createElement(
          Item,
          { variant: "outline", size: "xs" },
          React.createElement(ItemMedia, { variant: "icon" }, React.createElement(InboxIcon)),
          React.createElement(
            ItemContent,
            {},
            React.createElement(ItemTitle, {}, "Extra Small Size"),
            React.createElement(ItemDescription, {}, "The most compact size available.")
          )
        )
      ),
    },
    {
      name: "Icon",
      description: 'Use ItemMedia with variant="icon" to display an icon.',
      code: `import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { ShieldAlertIcon } from "lucide-react"

export function ItemIcon() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <ShieldAlertIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Security Alert</ItemTitle>
          <ItemDescription>
            New login detected from unknown device.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Review
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex w-full max-w-lg flex-col gap-6" },
        React.createElement(
          Item,
          { variant: "outline" },
          React.createElement(ItemMedia, { variant: "icon" }, React.createElement(ShieldAlertIcon)),
          React.createElement(
            ItemContent,
            {},
            React.createElement(ItemTitle, {}, "Security Alert"),
            React.createElement(ItemDescription, {}, "New login detected from unknown device.")
          ),
          React.createElement(
            ItemActions,
            {},
            React.createElement(Button, { size: "sm", variant: "outline" }, "Review")
          )
        )
      ),
    },
    {
      name: "Avatar",
      description: 'Use ItemMedia with variant="avatar" to display an avatar.',
      code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Plus } from "lucide-react"

export function ItemAvatar() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemMedia>
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/evilrabbit.png" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Evil Rabbit</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            aria-label="Invite"
          >
            <Plus />
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex w-full max-w-lg flex-col gap-6" },
        React.createElement(
          Item,
          { variant: "outline" },
          React.createElement(
            ItemMedia,
            {},
            React.createElement(
              Avatar,
              { className: "size-10" },
              React.createElement(AvatarImage, { src: "https://github.com/evilrabbit.png" }),
              React.createElement(AvatarFallback, {}, "ER")
            )
          ),
          React.createElement(
            ItemContent,
            {},
            React.createElement(ItemTitle, {}, "Evil Rabbit"),
            React.createElement(ItemDescription, {}, "Last seen 5 months ago")
          ),
          React.createElement(
            ItemActions,
            {},
            React.createElement(
              Button,
              { size: "icon-sm" as any, variant: "outline", className: "rounded-full", "aria-label": "Invite" },
              React.createElement(PlusIcon)
            )
          )
        ),
        React.createElement(
          Item,
          { variant: "outline" },
          React.createElement(
            ItemMedia,
            {},
            React.createElement(
              "div",
              { className: "flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale" },
              React.createElement(
                Avatar,
                { className: "hidden sm:flex" },
                React.createElement(AvatarImage, { src: "https://github.com/shadcn.png", alt: "@shadcn" }),
                React.createElement(AvatarFallback, {}, "CN")
              ),
              React.createElement(
                Avatar,
                { className: "hidden sm:flex" },
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
          React.createElement(
            ItemContent,
            {},
            React.createElement(ItemTitle, {}, "No Team Members"),
            React.createElement(ItemDescription, {}, "Invite your team to collaborate on this project.")
          ),
          React.createElement(
            ItemActions,
            {},
            React.createElement(Button, { size: "sm", variant: "outline" }, "Invite")
          )
        )
      ),
    },
    {
      name: "Group",
      description: "Use ItemGroup to group related items together.",
      code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { PlusIcon } from "lucide-react"

const people = [
  { username: "shadcn", avatar: "https://github.com/shadcn.png", email: "shadcn@vercel.com" },
  { username: "maxleiter", avatar: "https://github.com/maxleiter.png", email: "maxleiter@vercel.com" },
  { username: "evilrabbit", avatar: "https://github.com/evilrabbit.png", email: "evilrabbit@vercel.com" },
]

export function ItemGroupExample() {
  return (
    <ItemGroup className="max-w-sm">
      {people.map((person) => (
        <Item key={person.username} variant="outline">
          <ItemMedia>
            <Avatar>
              <AvatarImage src={person.avatar} className="grayscale" />
              <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent className="gap-1">
            <ItemTitle>{person.username}</ItemTitle>
            <ItemDescription>{person.email}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon" className="rounded-full">
              <PlusIcon />
            </Button>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}`,
      preview: React.createElement(
        ItemGroup,
        { className: "max-w-sm" },
        ...people.map((person) =>
          React.createElement(
            Item,
            { key: person.username, variant: "outline" },
            React.createElement(
              ItemMedia,
              {},
              React.createElement(
                Avatar,
                {},
                React.createElement(AvatarImage, { src: person.avatar, className: "grayscale" }),
                React.createElement(AvatarFallback, {}, person.username.charAt(0))
              )
            ),
            React.createElement(
              ItemContent,
              { className: "gap-1" },
              React.createElement(ItemTitle, {}, person.username),
              React.createElement(ItemDescription, {}, person.email)
            ),
            React.createElement(
              ItemActions,
              {},
              React.createElement(
                Button,
                { variant: "ghost", size: "icon" as any, className: "rounded-full" },
                React.createElement(PlusIcon)
              )
            )
          )
        )
      ),
    },
    {
      name: "Header",
      description: "Use ItemHeader to add a header above the item content.",
      code: `import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item"

const models = [
  { name: "v0-1.5-sm", description: "Everyday tasks and UI generation.", image: "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop" },
  { name: "v0-1.5-lg", description: "Advanced thinking or reasoning.", image: "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop" },
  { name: "v0-2.0-mini", description: "Open Source model for everyone.", image: "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop" },
]

export function ItemHeaderDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <ItemGroup className="grid grid-cols-3 gap-4">
        {models.map((model) => (
          <Item key={model.name} variant="outline">
            <ItemHeader>
              <img
                src={model.image}
                alt={model.name}
                className="aspect-square w-full rounded-sm object-cover"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{model.name}</ItemTitle>
              <ItemDescription>{model.description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex w-full max-w-xl flex-col gap-6" },
        React.createElement(
          ItemGroup,
          { className: "grid grid-cols-3 gap-4" },
          ...models.map((model) =>
            React.createElement(
              Item,
              { key: model.name, variant: "outline" },
              React.createElement(
                ItemHeader,
                {},
                React.createElement("img", {
                  src: model.image,
                  alt: model.name,
                  className: "aspect-square w-full rounded-sm object-cover",
                })
              ),
              React.createElement(
                ItemContent,
                {},
                React.createElement(ItemTitle, {}, model.name),
                React.createElement(ItemDescription, {}, model.description)
              )
            )
          )
        )
      ),
    },
    {
      name: "Link",
      description: "Use the asChild prop to render the item as a link.",
      code: `import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

export function ItemLink() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item asChild>
        <a href="#">
          <ItemContent>
            <ItemTitle>Visit our documentation</ItemTitle>
            <ItemDescription>
              Learn how to get started with our components.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
      <Item variant="outline" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <ItemContent>
            <ItemTitle>External resource</ItemTitle>
            <ItemDescription>
              Opens in a new tab with security attributes.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ExternalLinkIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex w-full max-w-md flex-col gap-4" },
        React.createElement(
          Item,
          { asChild: true },
          React.createElement(
            "a",
            { href: "#" },
            React.createElement(
              ItemContent,
              {},
              React.createElement(ItemTitle, {}, "Visit our documentation"),
              React.createElement(ItemDescription, {}, "Learn how to get started with our components.")
            ),
            React.createElement(
              ItemActions,
              {},
              React.createElement(ChevronRightIcon, { className: "size-4" })
            )
          )
        ),
        React.createElement(
          Item,
          { variant: "outline", asChild: true },
          React.createElement(
            "a",
            { href: "#", target: "_blank", rel: "noopener noreferrer" },
            React.createElement(
              ItemContent,
              {},
              React.createElement(ItemTitle, {}, "External resource"),
              React.createElement(ItemDescription, {}, "Opens in a new tab with security attributes.")
            ),
            React.createElement(
              ItemActions,
              {},
              React.createElement(ExternalLinkIcon, { className: "size-4" })
            )
          )
        )
      ),
    },
    {
      name: "Dropdown",
      description: "Use Item inside a dropdown menu.",
      code: `"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { ChevronDownIcon } from "lucide-react"

const people = [
  { username: "shadcn", avatar: "https://github.com/shadcn.png", email: "shadcn@vercel.com" },
  { username: "maxleiter", avatar: "https://github.com/maxleiter.png", email: "maxleiter@vercel.com" },
  { username: "evilrabbit", avatar: "https://github.com/evilrabbit.png", email: "evilrabbit@vercel.com" },
]

export function ItemDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Select <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuGroup>
          {people.map((person) => (
            <DropdownMenuItem key={person.username}>
              <Item size="xs" className="w-full p-2">
                <ItemMedia>
                  <Avatar className="size-6.5">
                    <AvatarImage src={person.avatar} className="grayscale" />
                    <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent className="gap-0">
                  <ItemTitle>{person.username}</ItemTitle>
                  <ItemDescription className="leading-none">
                    {person.email}
                  </ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          ))}
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
            { variant: "outline" },
            "Select ",
            React.createElement(ChevronDownIcon)
          )
        ),
        React.createElement(
          DropdownMenuContent,
          { className: "w-48", align: "end" },
          React.createElement(
            DropdownMenuGroup,
            {},
            ...people.map((person) =>
              React.createElement(
                DropdownMenuItem,
                { key: person.username },
                React.createElement(
                  Item,
                  { size: "xs", className: "w-full p-2" },
                  React.createElement(
                    ItemMedia,
                    {},
                    React.createElement(
                      Avatar,
                      { className: "size-6.5" },
                      React.createElement(AvatarImage, { src: person.avatar, className: "grayscale" }),
                      React.createElement(AvatarFallback, {}, person.username.charAt(0))
                    )
                  ),
                  React.createElement(
                    ItemContent,
                    { className: "gap-0" },
                    React.createElement(ItemTitle, {}, person.username),
                    React.createElement(ItemDescription, { className: "leading-none" }, person.email)
                  )
                )
              )
            )
          )
        )
      ),
    },
    {
      name: "Music List",
      description: "Use ItemGroup with ItemMedia variant='image' to build a music list.",
      code: `import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

const music = [
  { title: "Midnight City Lights", artist: "Neon Dreams", album: "Electric Nights", duration: "3:45" },
  { title: "Coffee Shop Conversations", artist: "The Morning Brew", album: "Urban Stories", duration: "4:05" },
  { title: "Digital Rain", artist: "Cyber Symphony", album: "Binary Beats", duration: "3:30" },
]

export function ItemImage() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ItemGroup className="gap-4">
        {music.map((song) => (
          <Item key={song.title} variant="outline" asChild>
            <a href="#">
              <ItemMedia variant="image">
                <img
                  src={\`https://avatar.vercel.sh/\${song.title}\`}
                  alt={song.title}
                  className="object-cover grayscale"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">
                  {song.title} -{" "}
                  <span className="text-muted-foreground">{song.album}</span>
                </ItemTitle>
                <ItemDescription>{song.artist}</ItemDescription>
              </ItemContent>
              <ItemContent className="flex-none text-center">
                <ItemDescription>{song.duration}</ItemDescription>
              </ItemContent>
            </a>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}`,
      preview: React.createElement(
        "div",
        { className: "flex w-full max-w-md flex-col gap-6" },
        React.createElement(
          ItemGroup,
          { className: "gap-4" },
          ...music.map((song) =>
            React.createElement(
              Item,
              { key: song.title, variant: "outline", asChild: true },
              React.createElement(
                "a",
                { href: "#" },
                React.createElement(
                  ItemMedia,
                  { variant: "image" },
                  React.createElement("img", {
                    src: `https://avatar.vercel.sh/${song.title}`,
                    alt: song.title,
                    className: "object-cover grayscale",
                  })
                ),
                React.createElement(
                  ItemContent,
                  {},
                  React.createElement(
                    ItemTitle,
                    { className: "line-clamp-1" },
                    `${song.title} - `,
                    React.createElement("span", { className: "text-muted-foreground" }, song.album)
                  ),
                  React.createElement(ItemDescription, {}, song.artist)
                ),
                React.createElement(
                  ItemContent,
                  { className: "flex-none text-center" },
                  React.createElement(ItemDescription, {}, song.duration)
                )
              )
            )
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "variant",
      type: '"default" | "outline" | "muted"',
      description: "Visual style of the item.",
      default: '"default"',
    },
    {
      name: "size",
      type: '"default" | "sm" | "xs"',
      description: "Size of the item.",
      default: '"default"',
    },
    {
      name: "asChild",
      type: "boolean",
      description: "Render as a child element (e.g. anchor tag).",
      default: "false",
    },
  ],
};
