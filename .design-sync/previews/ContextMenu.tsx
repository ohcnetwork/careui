import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuShortcut,
} from "careui";

export function Default() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground select-none cursor-default">
          Right-click to open menu
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuItem>View Details</ContextMenuItem>
        <ContextMenuItem>
          Edit
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function PatientRecord() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex h-20 w-64 items-center gap-3 rounded-md border px-4 cursor-default select-none">
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">MRN: 001234 · DOB: 1985-03-22</span>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Patient</ContextMenuLabel>
        <ContextMenuItem>Open Chart</ContextMenuItem>
        <ContextMenuItem>Schedule Appointment</ContextMenuItem>
        <ContextMenuItem>Send Message</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Print Summary</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Archive</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
