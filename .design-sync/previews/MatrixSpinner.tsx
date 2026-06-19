import { MatrixSpinner } from "careui";

export function Default() {
  return (
    <div className="flex items-center gap-4 p-4">
      <MatrixSpinner />
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex items-center gap-6 p-4">
      <MatrixSpinner size="12" />
      <MatrixSpinner size="16" />
      <MatrixSpinner size="20" />
      <MatrixSpinner size="24" />
      <MatrixSpinner size="32" />
      <MatrixSpinner size="48" />
    </div>
  );
}

export function Presets() {
  return (
    <div className="flex flex-wrap gap-8 p-4">
      <div className="flex flex-col items-center gap-2">
        <MatrixSpinner name="heart-pulse" size="32" />
        <span className="text-xs text-muted-foreground">heart-pulse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MatrixSpinner name="spin-cw" size="32" />
        <span className="text-xs text-muted-foreground">spin-cw</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MatrixSpinner name="center-expand" size="32" />
        <span className="text-xs text-muted-foreground">center-expand</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MatrixSpinner name="grid-breathe" size="32" />
        <span className="text-xs text-muted-foreground">grid-breathe</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MatrixSpinner name="diamond-grow" size="32" />
        <span className="text-xs text-muted-foreground">diamond-grow</span>
      </div>
    </div>
  );
}

export function InlineWithText() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground p-4">
      <MatrixSpinner name="soft-shimmer" size="16" />
      <span>Uploading lab results…</span>
    </div>
  );
}
