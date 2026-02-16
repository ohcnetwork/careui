import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Copy,
  Download,
  Mail,
  Share2,
  Trash,
  UserRoundX,
  VolumeOff,
} from "lucide-react";

export const buttonGroupDoc: ComponentDoc = {
  id: "button-group",
  name: "Button Group",
  description: "A set of related buttons grouped together.",
  installation: {
    cli: "npx shadcn@latest add button-group",
    manual:
      "Copy and paste the button group component source code into your project.",
  },
  usage: `import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  )
}`,
  preview: {
    code: `<ButtonGroup>
  <Button>Left</Button>
  <Button>Middle</Button>
  <Button>Right</Button>
</ButtonGroup>`,
    component: React.createElement(
      ButtonGroup,
      {},
      React.createElement(Button, {}, "Left"),
      React.createElement(Button, {}, "Middle"),
      React.createElement(Button, {}, "Right")
    ),
  },
  examples: [
    {
      name: "Orientation",
      description: "Button group can be horizontal or vertical.",
      code: `<div className="flex gap-4 items-start">
  <ButtonGroup>
    <Button variant="outline">Left</Button>
    <Button variant="outline">Middle</Button>
    <Button variant="outline">Right</Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical">
    <Button variant="outline">Top</Button>
    <Button variant="outline">Middle</Button>
    <Button variant="outline">Bottom</Button>
  </ButtonGroup>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex gap-4 items-start" },
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { variant: "outline" }, "Left"),
          React.createElement(Button, { variant: "outline" }, "Middle"),
          React.createElement(Button, { variant: "outline" }, "Right")
        ),
        React.createElement(
          ButtonGroup,
          { orientation: "vertical" },
          React.createElement(Button, { variant: "outline" }, "Top"),
          React.createElement(Button, { variant: "outline" }, "Middle"),
          React.createElement(Button, { variant: "outline" }, "Bottom")
        )
      ),
    },
    {
      name: "Size",
      description: "Control the size of buttons using the size prop.",
      code: `<div className="flex flex-col gap-4">
  <ButtonGroup>
    <Button size="xs" variant="outline">Extra Small</Button>
    <Button size="xs" variant="outline">Extra Small</Button>
  </ButtonGroup>

  <ButtonGroup>
    <Button size="sm" variant="outline">Small</Button>
    <Button size="sm" variant="outline">Small</Button>
  </ButtonGroup>

  <ButtonGroup>
    <Button variant="outline">Default</Button>
    <Button variant="outline">Default</Button>
  </ButtonGroup>

  <ButtonGroup>
    <Button size="lg" variant="outline">Large</Button>
    <Button size="lg" variant="outline">Large</Button>
  </ButtonGroup>
</div>`,
      preview: React.createElement(
        "div",
        { className: "flex flex-col gap-4" },
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { size: "xs", variant: "outline" }, "Extra Small"),
          React.createElement(Button, { size: "xs", variant: "outline" }, "Extra Small")
        ),
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { size: "sm", variant: "outline" }, "Small"),
          React.createElement(Button, { size: "sm", variant: "outline" }, "Small")
        ),
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { variant: "outline" }, "Default"),
          React.createElement(Button, { variant: "outline" }, "Default")
        ),
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { size: "lg", variant: "outline" }, "Large"),
          React.createElement(Button, { size: "lg", variant: "outline" }, "Large")
        )
      ),
    },
    {
      name: "Nested",
      description: "Nest ButtonGroup components to create groups with spacing.",
      code: `<ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">Copy</Button>
    <Button variant="outline">Cut</Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">Paste</Button>
    <Button variant="outline">Delete</Button>
  </ButtonGroup>
</ButtonGroup>`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { variant: "outline" }, "Copy"),
          React.createElement(Button, { variant: "outline" }, "Cut")
        ),
        React.createElement(
          ButtonGroup,
          {},
          React.createElement(Button, { variant: "outline" }, "Paste"),
          React.createElement(Button, { variant: "outline" }, "Delete")
        )
      ),
    },
    {
      name: "Separator",
      description: "Use ButtonGroupSeparator to visually divide buttons.",
      code: `<ButtonGroup>
  <Button variant="outline">
    <Copy data-icon="inline-start" />
    Copy
  </Button>
  <ButtonGroupSeparator />
  <Button variant="outline">
    <Download data-icon="inline-start" />
    Download
  </Button>
  <ButtonGroupSeparator />
  <Button variant="outline">
    <Share2 data-icon="inline-start" />
    Share
  </Button>
</ButtonGroup>`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(
          Button,
          { variant: "outline" },
          React.createElement(Copy, { ["data-icon"]: "inline-start" } as any),
          "Copy"
        ),
        React.createElement(ButtonGroupSeparator),
        React.createElement(
          Button,
          { variant: "outline" },
          React.createElement(Download, { ["data-icon"]: "inline-start" } as any),
          "Download"
        ),
        React.createElement(ButtonGroupSeparator),
        React.createElement(
          Button,
          { variant: "outline" },
          React.createElement(Share2, { ["data-icon"]: "inline-start" } as any),
          "Share"
        )
      ),
    },
    {
      name: "Icon Only",
      description: "Button group with icon-only buttons.",
      code: `<ButtonGroup>
  <Button variant="outline" size="icon" aria-label="Copy">
    <Copy />
  </Button>
  <Button variant="outline" size="icon" aria-label="Download">
    <Download />
  </Button>
  <Button variant="outline" size="icon" aria-label="Share">
    <Share2 />
  </Button>
</ButtonGroup>`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(
          Button,
          { variant: "outline", size: "icon", "aria-label": "Copy" },
          React.createElement(Copy)
        ),
        React.createElement(
          Button,
          { variant: "outline", size: "icon", "aria-label": "Download" },
          React.createElement(Download)
        ),
        React.createElement(
          Button,
          { variant: "outline", size: "icon", "aria-label": "Share" },
          React.createElement(Share2)
        )
      ),
    },

    {
      name: "Split",
      description: "Create a split button group with a separator.",
      code: `<ButtonGroup>
  <Button size="default">Save</Button>
  <ButtonGroupSeparator />
  <Button size="icon" aria-label="More options">
    <ChevronDown />
  </Button>
</ButtonGroup>`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(Button, { size: "default" }, "Save"),
        React.createElement(ButtonGroupSeparator),
        React.createElement(
          Button,
          { size: "icon", "aria-label": "More options" },
          React.createElement(ChevronDown)
        )
      ),
    },
    {
      name: "Dropdown Menu",
      description: "Create a split button with a dropdown menu.",
      code: `<ButtonGroup>
  <Button variant="outline">Follow</Button>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="!pl-2">
        <ChevronDown />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-44">
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <VolumeOff data-icon="inline-start" />
          Mute Conversation
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Check data-icon="inline-start" />
          Mark as Read
        </DropdownMenuItem>
        <DropdownMenuItem>
          <AlertTriangle data-icon="inline-start" />
          Report Conversation
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserRoundX data-icon="inline-start" />
          Block User
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2 data-icon="inline-start" />
          Share Conversation
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy data-icon="inline-start" />
          Copy Conversation
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem variant="destructive">
          <Trash data-icon="inline-start" />
          Delete Conversation
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</ButtonGroup>`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(Button, { variant: "outline" }, "Follow"),
        React.createElement(
          DropdownMenu,
          {},
          React.createElement(
            DropdownMenuTrigger,
            { asChild: true },
            React.createElement(
              Button,
              { variant: "outline", className: "!pl-2" },
              React.createElement(ChevronDown)
            )
          ),
          React.createElement(
            DropdownMenuContent,
            { align: "end", className: "w-44" },
            React.createElement(
              DropdownMenuGroup,
              {},
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(VolumeOff, { ["data-icon"]: "inline-start" } as any),
                "Mute Conversation"
              ),
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(Check, { ["data-icon"]: "inline-start" } as any),
                "Mark as Read"
              ),
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(AlertTriangle, { ["data-icon"]: "inline-start" } as any),
                "Report Conversation"
              ),
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(UserRoundX, { ["data-icon"]: "inline-start" } as any),
                "Block User"
              ),
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(Share2, { ["data-icon"]: "inline-start" } as any),
                "Share Conversation"
              ),
              React.createElement(
                DropdownMenuItem,
                {},
                React.createElement(Copy, { ["data-icon"]: "inline-start" } as any),
                "Copy Conversation"
              )
            ),
            React.createElement(DropdownMenuSeparator),
            React.createElement(
              DropdownMenuGroup,
              {},
              React.createElement(
                DropdownMenuItem,
                { variant: "destructive" },
                React.createElement(Trash, { ["data-icon"]: "inline-start" } as any),
                "Delete Conversation"
              )
            )
          )
        )
      ),
    },

    {
      name: "Popover",
      description: "Use with a Popover component.",
      code: `<ButtonGroup>
  <Button variant="outline" size="default">
    <Mail data-icon="inline-start" />
    Contact
  </Button>
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" size="icon" aria-label="More options">
        <ChevronDown />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-80">
      <div className="space-y-2">
        <h4 className="font-medium">Contact Options</h4>
        <p className="text-sm text-muted-foreground">
          Choose how you want to get in touch.
        </p>
      </div>
    </PopoverContent>
  </Popover>
</ButtonGroup>`,
      preview: React.createElement(
        ButtonGroup,
        {},
        React.createElement(
          Button,
          { variant: "outline", size: "default" },
          React.createElement(Mail, { ["data-icon"]: "inline-start" } as any),
          "Contact"
        ),
        React.createElement(
          Popover,
          {},
          React.createElement(
            PopoverTrigger,
            { asChild: true },
            React.createElement(
              Button,
              { variant: "outline", size: "icon", "aria-label": "More options" },
              React.createElement(ChevronDown)
            )
          ),
          React.createElement(
            PopoverContent,
            { className: "w-80" },
            React.createElement(
              "div",
              { className: "space-y-2" },
              React.createElement("h4", { className: "font-medium" }, "Contact Options"),
              React.createElement(
                "p",
                { className: "text-sm text-muted-foreground" },
                "Choose how you want to get in touch."
              )
            )
          )
        )
      ),
    },
  ],
};
