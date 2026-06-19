import { LoadingAnimation } from "careui";

export function Default() {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingAnimation />
    </div>
  );
}

export function InCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 border rounded-lg w-72">
      <LoadingAnimation />
      <p className="text-sm text-muted-foreground">Fetching patient records…</p>
    </div>
  );
}

export function Centered() {
  return (
    <div className="grid place-items-center min-h-32">
      <LoadingAnimation className="scale-125" />
    </div>
  );
}
