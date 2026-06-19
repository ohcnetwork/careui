import { PixelSpinner } from "careui";

export function Presets() {
  return (
    <div className="flex flex-wrap gap-6 items-center p-4">
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="braille" size="24" />
        <span className="text-xs text-muted-foreground">braille</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="orbit" size="24" />
        <span className="text-xs text-muted-foreground">orbit</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="breathe" size="24" />
        <span className="text-xs text-muted-foreground">breathe</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="heartpulse" size="24" />
        <span className="text-xs text-muted-foreground">heartpulse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="columns" size="24" />
        <span className="text-xs text-muted-foreground">columns</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="snake" size="24" />
        <span className="text-xs text-muted-foreground">snake</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="rain" size="24" />
        <span className="text-xs text-muted-foreground">rain</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="sparkle" size="24" />
        <span className="text-xs text-muted-foreground">sparkle</span>
      </div>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-wrap gap-6 items-end p-4">
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="braille" size="14" />
        <span className="text-xs text-muted-foreground">14px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="braille" size="19" />
        <span className="text-xs text-muted-foreground">19px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="braille" size="24" />
        <span className="text-xs text-muted-foreground">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PixelSpinner name="braille" size="29" />
        <span className="text-xs text-muted-foreground">29px</span>
      </div>
    </div>
  );
}
