import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const loremParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

export const dialogDoc: ComponentDoc = {
  id: "dialog",
  name: "Dialog",
  description:
    "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
  installation: {
    cli: "npx shadcn@latest add dialog",
    manual: "Install @base-ui/react and copy the dialog component source code.",
  },
  usage: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
  preview: {
    code: `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}`,
    component: React.createElement(
      Dialog,
      {},
      React.createElement(
        "form",
        {},
        React.createElement(
          DialogTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Open Dialog")
        ),
        React.createElement(
          DialogContent,
          { className: "sm:max-w-sm" },
          React.createElement(
            DialogHeader,
            {},
            React.createElement(DialogTitle, {}, "Edit profile"),
            React.createElement(
              DialogDescription,
              {},
              "Make changes to your profile here. Click save when you're done."
            )
          ),
          React.createElement(
            FieldGroup,
            {},
            React.createElement(
              Field,
              {},
              React.createElement(Label, { htmlFor: "name-1" }, "Name"),
              React.createElement(Input, {
                id: "name-1",
                name: "name",
                defaultValue: "Pedro Duarte",
              })
            ),
            React.createElement(
              Field,
              {},
              React.createElement(Label, { htmlFor: "username-1" }, "Username"),
              React.createElement(Input, {
                id: "username-1",
                name: "username",
                defaultValue: "@peduarte",
              })
            )
          ),
          React.createElement(
            DialogFooter,
            {},
            React.createElement(
              DialogClose,
              { asChild: true },
              React.createElement(Button, { variant: "outline" }, "Cancel")
            ),
            React.createElement(Button, { type: "submit" }, "Save changes")
          )
        )
      )
    ),
  },
  examples: [
    // ── Sticky Footer ──────────────────────────────────────────────────────
    {
      name: "Sticky Footer",
      description: "Keep actions visible while the content scrolls.",
      code: `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogStickyFooter() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sticky Footer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            This dialog has a sticky footer that stays visible while the content
            scrolls.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
      preview: React.createElement(
        Dialog,
        {},
        React.createElement(
          DialogTrigger,
          { asChild: true },
          React.createElement(Button, { variant: "outline" }, "Sticky Footer")
        ),
        React.createElement(
          DialogContent,
          {},
          React.createElement(
            DialogHeader,
            {},
            React.createElement(DialogTitle, {}, "Sticky Footer"),
            React.createElement(
              DialogDescription,
              {},
              "This dialog has a sticky footer that stays visible while the content scrolls."
            )
          ),
          React.createElement(
            "div",
            {
              className: "-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4",
            },
            ...Array.from({ length: 10 }, (_, i) =>
              React.createElement(
                "p",
                { key: i, className: "mb-4 leading-normal" },
                loremParagraph
              )
            )
          ),
          React.createElement(
            DialogFooter,
            {},
            React.createElement(
              DialogClose,
              { asChild: true },
              React.createElement(Button, { variant: "outline" }, "Close")
            )
          )
        )
      ),
    },

    // ── Scrollable Content ─────────────────────────────────────────────────
    {
      name: "Scrollable Content",
      description: "Long content can scroll while the header stays in view.",
      code: `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogScrollableContent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Scrollable Content</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>
            This is a dialog with scrollable content.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}`,
      preview: React.createElement(
        Dialog,
        {},
        React.createElement(
          DialogTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "outline" },
            "Scrollable Content"
          )
        ),
        React.createElement(
          DialogContent,
          {},
          React.createElement(
            DialogHeader,
            {},
            React.createElement(DialogTitle, {}, "Scrollable Content"),
            React.createElement(
              DialogDescription,
              {},
              "This is a dialog with scrollable content."
            )
          ),
          React.createElement(
            "div",
            {
              className: "-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4",
            },
            ...Array.from({ length: 10 }, (_, i) =>
              React.createElement(
                "p",
                { key: i, className: "mb-4 leading-normal" },
                loremParagraph
              )
            )
          )
        )
      ),
    },

    // ── With Portal Components ─────────────────────────────────────────────
    {
      name: "Scrollable Content with Selects",
      description:
        "Form fields with Select inside a scrollable dialog body. Their overlays open above the scroll container without clipping.",
      code: `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DialogScrollableWithSelects() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Scrollable with Selects</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
          <DialogDescription>
            Fill in the details below. Scroll to see more fields.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-x-clip overflow-y-auto px-4">
          <FieldGroup>
            <Field>
              <Label>Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label>Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label>Ward</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select ward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="icu">ICU</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="outpatient">Outpatient</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label>Shift</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label>Allergies</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select allergies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="penicillin">Penicillin</SelectItem>
                  <SelectItem value="sulfa">Sulfa Drugs</SelectItem>
                  <SelectItem value="nsaid">NSAIDs</SelectItem>
                  <SelectItem value="none">None Known</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label>Insurance Provider</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bc">Blue Cross</SelectItem>
                  <SelectItem value="aetna">Aetna</SelectItem>
                  <SelectItem value="united">United Health</SelectItem>
                  <SelectItem value="cigna">Cigna</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
      preview: React.createElement(
        Dialog,
        {},
        React.createElement(
          DialogTrigger,
          { asChild: true },
          React.createElement(
            Button,
            { variant: "outline" },
            "Scrollable with Selects"
          )
        ),
        React.createElement(
          DialogContent,
          {},
          React.createElement(
            DialogHeader,
            {},
            React.createElement(DialogTitle, {}, "Patient Details"),
            React.createElement(
              DialogDescription,
              {},
              "Fill in the details below. Scroll to see more fields."
            )
          ),
          React.createElement(
            "div",
            {
              className:
                "-mx-4 no-scrollbar max-h-[50vh] overflow-x-clip overflow-y-auto px-4",
            },
            React.createElement(
              FieldGroup,
              {},
              React.createElement(
                Field,
                {},
                React.createElement(Label, {}, "Department"),
                React.createElement(
                  Select,
                  {},
                  React.createElement(
                    SelectTrigger,
                    {},
                    React.createElement(SelectValue, {
                      placeholder: "Select department",
                    })
                  ),
                  React.createElement(
                    SelectContent,
                    {},
                    React.createElement(
                      SelectItem,
                      { value: "cardiology" },
                      "Cardiology"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "neurology" },
                      "Neurology"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "orthopedics" },
                      "Orthopedics"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "pediatrics" },
                      "Pediatrics"
                    )
                  )
                )
              ),
              React.createElement(
                Field,
                {},
                React.createElement(Label, {}, "Priority"),
                React.createElement(
                  Select,
                  {},
                  React.createElement(
                    SelectTrigger,
                    {},
                    React.createElement(SelectValue, {
                      placeholder: "Select priority",
                    })
                  ),
                  React.createElement(
                    SelectContent,
                    {},
                    React.createElement(SelectItem, { value: "low" }, "Low"),
                    React.createElement(
                      SelectItem,
                      { value: "medium" },
                      "Medium"
                    ),
                    React.createElement(SelectItem, { value: "high" }, "High"),
                    React.createElement(
                      SelectItem,
                      { value: "critical" },
                      "Critical"
                    )
                  )
                )
              ),
              React.createElement(
                Field,
                {},
                React.createElement(Label, {}, "Ward"),
                React.createElement(
                  Select,
                  {},
                  React.createElement(
                    SelectTrigger,
                    {},
                    React.createElement(SelectValue, {
                      placeholder: "Select ward",
                    })
                  ),
                  React.createElement(
                    SelectContent,
                    {},
                    React.createElement(SelectItem, { value: "icu" }, "ICU"),
                    React.createElement(
                      SelectItem,
                      { value: "general" },
                      "General"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "emergency" },
                      "Emergency"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "outpatient" },
                      "Outpatient"
                    )
                  )
                )
              ),
              React.createElement(
                Field,
                {},
                React.createElement(Label, {}, "Shift"),
                React.createElement(
                  Select,
                  {},
                  React.createElement(
                    SelectTrigger,
                    {},
                    React.createElement(SelectValue, {
                      placeholder: "Select shift",
                    })
                  ),
                  React.createElement(
                    SelectContent,
                    {},
                    React.createElement(
                      SelectItem,
                      { value: "morning" },
                      "Morning"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "afternoon" },
                      "Afternoon"
                    ),
                    React.createElement(SelectItem, { value: "night" }, "Night")
                  )
                )
              ),
              React.createElement(
                Field,
                {},
                React.createElement(Label, {}, "Allergies"),
                React.createElement(
                  Select,
                  {},
                  React.createElement(
                    SelectTrigger,
                    {},
                    React.createElement(SelectValue, {
                      placeholder: "Select allergies",
                    })
                  ),
                  React.createElement(
                    SelectContent,
                    {},
                    React.createElement(
                      SelectItem,
                      { value: "penicillin" },
                      "Penicillin"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "sulfa" },
                      "Sulfa Drugs"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "nsaid" },
                      "NSAIDs"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "none" },
                      "None Known"
                    )
                  )
                )
              ),
              React.createElement(
                Field,
                {},
                React.createElement(Label, {}, "Insurance Provider"),
                React.createElement(
                  Select,
                  {},
                  React.createElement(
                    SelectTrigger,
                    {},
                    React.createElement(SelectValue, {
                      placeholder: "Select provider",
                    })
                  ),
                  React.createElement(
                    SelectContent,
                    {},
                    React.createElement(
                      SelectItem,
                      { value: "bc" },
                      "Blue Cross"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "aetna" },
                      "Aetna"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "united" },
                      "United Health"
                    ),
                    React.createElement(SelectItem, { value: "cigna" }, "Cigna")
                  )
                )
              ),
              React.createElement(
                Field,
                {},
                React.createElement(Label, {}, "Status"),
                React.createElement(
                  Select,
                  {},
                  React.createElement(
                    SelectTrigger,
                    {},
                    React.createElement(SelectValue, {
                      placeholder: "Select status",
                    })
                  ),
                  React.createElement(
                    SelectContent,
                    {},
                    React.createElement(
                      SelectItem,
                      { value: "active" },
                      "Active"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "inactive" },
                      "Inactive"
                    ),
                    React.createElement(
                      SelectItem,
                      { value: "pending" },
                      "Pending Review"
                    )
                  )
                )
              )
            )
          ),
          React.createElement(
            DialogFooter,
            {},
            React.createElement(
              DialogClose,
              { asChild: true },
              React.createElement(Button, { variant: "outline" }, "Cancel")
            ),
            React.createElement(Button, {}, "Save")
          )
        )
      ),
    },
  ],
  props: [
    {
      name: "open",
      type: "boolean",
      description: "The controlled open state of the dialog.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Event handler called when the open state changes.",
    },
    {
      name: "modal",
      type: "boolean",
      description: "The modality of the dialog.",
      default: "true",
    },
  ],
};
