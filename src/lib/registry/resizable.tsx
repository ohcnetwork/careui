import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

export const resizableDoc: ComponentDoc = {
  id: "resizable",
  name: "Resizable",
  description:
    "Accessible resizable panel groups and layouts with keyboard support.",
  installation: {
    cli: "npx shadcn@latest add resizable",
    manual:
      "Copy and paste the resizable component source code into your project.",
  },
  usage: `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"`,
  preview: {
    code: `<ResizablePanelGroup orientation="horizontal" className="max-w-md rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-[200px] items-center justify-center p-6">
      <span className="font-semibold">Left</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-[200px] items-center justify-center p-6">
      <span className="font-semibold">Right</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    component: React.createElement(
      ResizablePanelGroup,
      { orientation: "horizontal", className: "max-w-md rounded-lg border" },
      React.createElement(
        ResizablePanel,
        { defaultSize: 50 },
        React.createElement(
          "div",
          { className: "flex h-[200px] items-center justify-center p-6" },
          React.createElement("span", { className: "font-semibold" }, "Left")
        )
      ),
      React.createElement(ResizableHandle, {}),
      React.createElement(
        ResizablePanel,
        { defaultSize: 50 },
        React.createElement(
          "div",
          { className: "flex h-[200px] items-center justify-center p-6" },
          React.createElement("span", { className: "font-semibold" }, "Right")
        )
      )
    ),
  },
};
