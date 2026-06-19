import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "careui";

export function Horizontal() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-48 rounded-md border"
    >
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full flex-col p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            PATIENT LIST
          </p>
          <div className="space-y-1 text-sm">
            <div className="rounded px-2 py-1 bg-muted font-medium">
              Ramesh Kumar
            </div>
            <div className="rounded px-2 py-1">Priya Sharma</div>
            <div className="rounded px-2 py-1">Arun Das</div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full flex-col p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            ENCOUNTER DETAIL
          </p>
          <p className="text-sm">
            Chief complaint: Fever and chills for 2 days. Temperature 38.9°C.
            Recommended CBC and blood cultures.
          </p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function Vertical() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="h-64 rounded-md border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full flex-col p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            VITALS
          </p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">BP</p>
              <p className="font-medium">120/80</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">HR</p>
              <p className="font-medium">72 bpm</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Temp</p>
              <p className="font-medium">98.6°F</p>
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full flex-col p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            NOTES
          </p>
          <p className="text-sm">
            Patient stable. Continue monitoring. Follow-up scheduled for
            48 hours.
          </p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function ThreePanel() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-48 rounded-md border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="p-3 h-full">
          <p className="text-xs font-medium text-muted-foreground">SIDEBAR</p>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="p-3 h-full">
          <p className="text-xs font-medium text-muted-foreground">MAIN</p>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25}>
        <div className="p-3 h-full">
          <p className="text-xs font-medium text-muted-foreground">DETAILS</p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
