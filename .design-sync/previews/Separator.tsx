import { Separator } from "careui";

export function Horizontal() {
  return (
    <div className="w-64 space-y-4">
      <p className="text-sm">Above the separator</p>
      <Separator />
      <p className="text-sm">Below the separator</p>
    </div>
  );
}

export function Vertical() {
  return (
    <div className="flex items-center gap-3 h-8">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" className="h-8" />
      <span className="text-sm">Right</span>
    </div>
  );
}

export function Variants() {
  return (
    <div className="w-64 space-y-6">
      <div>
        <p className="text-xs text-muted-foreground mb-2">Solid</p>
        <Separator variant="solid" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Dashed</p>
        <Separator variant="dashed" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Inset</p>
        <Separator variant="inset" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Dotted</p>
        <Separator variant="dotted" />
      </div>
    </div>
  );
}
