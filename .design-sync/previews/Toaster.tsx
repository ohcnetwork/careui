import { Toaster } from "careui";

export function Default() {
  return (
    <div className="relative flex min-h-32 w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 p-8">
      <Toaster position="bottom-right" />
      <p className="text-sm text-muted-foreground text-center">
        <span className="font-medium text-foreground">Toaster</span> — toast container rendered at the bottom-right.
        <br />
        Trigger toasts via the <code className="text-xs bg-muted px-1 py-0.5 rounded">toast()</code> function from <code className="text-xs bg-muted px-1 py-0.5 rounded">sonner</code>.
      </p>
    </div>
  );
}

export function Positions() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map(
        (position) => (
          <div
            key={position}
            className="flex items-center justify-center rounded-lg border border-border bg-muted/20 p-4"
          >
            <p className="text-xs text-muted-foreground font-medium">{position}</p>
          </div>
        )
      )}
      <p className="col-span-2 text-xs text-muted-foreground text-center mt-1">
        Toaster positions — pass <code className="bg-muted px-1 rounded">position</code> prop to change placement
      </p>
    </div>
  );
}
