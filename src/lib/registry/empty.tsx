import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { InboxIcon } from "lucide-react";

export const emptyDoc: ComponentDoc = {
  id: "empty",
  name: "Empty",
  description: "Displays an empty state when no data is available.",
  installation: {
    cli: "npx shadcn@latest add empty",
    manual: "Copy and paste the empty component source code into your project.",
  },
  usage: `import { Empty } from "@/components/ui/empty"`,
  preview: {
    code: `import { InboxIcon } from "lucide-react"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"

<Empty>
  <InboxIcon className="mx-auto h-12 w-12 text-muted-foreground" />
  <EmptyTitle>No data</EmptyTitle>
  <EmptyDescription>There is no data to display</EmptyDescription>
</Empty>`,
    component: React.createElement(
      Empty,
      {},
      React.createElement(InboxIcon, {
        className: "mx-auto h-12 w-12 text-muted-foreground",
      }),
      React.createElement(EmptyTitle, {}, "No data"),
      React.createElement(EmptyDescription, {}, "There is no data to display")
    ),
  },
};
