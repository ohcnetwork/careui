import { LoadingAnimationSvg } from "careui";

export function Default() {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingAnimationSvg />
    </div>
  );
}

export function InCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 border rounded-lg w-72">
      <LoadingAnimationSvg />
      <p className="text-sm text-muted-foreground">Syncing health records…</p>
    </div>
  );
}

export function Scaled() {
  return (
    <div className="grid place-items-center min-h-32">
      <LoadingAnimationSvg className="scale-150" />
    </div>
  );
}
