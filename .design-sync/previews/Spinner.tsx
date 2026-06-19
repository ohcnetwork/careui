import { Spinner, RadialSpinner } from "careui";

export function Default() {
  return <Spinner />;
}

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
      <Spinner className="size-10" />
    </div>
  );
}

export function WithLabel() {
  return (
    <div className="flex items-center gap-2">
      <Spinner className="size-4" />
      <span className="text-sm text-muted-foreground">Loading patient records…</span>
    </div>
  );
}

export function Radial() {
  return (
    <div className="flex items-center gap-4">
      <RadialSpinner className="size-4" />
      <RadialSpinner className="size-6" />
      <RadialSpinner className="size-8" />
    </div>
  );
}

export function RadialWithLabel() {
  return (
    <div className="flex items-center gap-2">
      <RadialSpinner className="size-5" />
      <span className="text-sm text-muted-foreground">Processing…</span>
    </div>
  );
}

export function OnButton() {
  return (
    <div className="flex gap-3 items-center">
      <button
        className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
        disabled
      >
        <Spinner className="size-4 text-primary-foreground" />
        Saving…
      </button>
      <button
        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium"
        disabled
      >
        <RadialSpinner className="size-4" />
        Loading
      </button>
    </div>
  );
}
