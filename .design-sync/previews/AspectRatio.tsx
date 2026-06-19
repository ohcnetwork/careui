import { AspectRatio } from "careui";

export function Widescreen() {
  return (
    <div className="w-80">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-blue-100 text-blue-700 text-sm font-medium">
          16 / 9 — Widescreen
        </div>
      </AspectRatio>
    </div>
  );
}

export function Square() {
  return (
    <div className="w-48">
      <AspectRatio ratio={1}>
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-sm font-medium">
          1 / 1 — Square
        </div>
      </AspectRatio>
    </div>
  );
}

export function Portrait() {
  return (
    <div className="w-48">
      <AspectRatio ratio={3 / 4}>
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-violet-100 text-violet-700 text-sm font-medium">
          3 / 4 — Portrait
        </div>
      </AspectRatio>
    </div>
  );
}

export function Cinematic() {
  return (
    <div className="w-80">
      <AspectRatio ratio={21 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-lg text-sm font-medium text-white" style={{ background: "#1e293b" }}>
          21 / 9 — Cinematic
        </div>
      </AspectRatio>
    </div>
  );
}
