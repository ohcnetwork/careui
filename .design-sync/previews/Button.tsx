import { Button } from "careui";

export function Variants() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="default">Save changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="outline">Export</Button>
      <Button variant="ghost">Learn more</Button>
      <Button variant="link">View details</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  );
}

export function Destructive() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="destructive">Delete record</Button>
      <Button variant="destructive-solid">Remove account</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra large</Button>
    </div>
  );
}

export function Disabled() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button disabled>Disabled primary</Button>
      <Button variant="secondary" disabled>Disabled secondary</Button>
      <Button variant="outline" disabled>Disabled outline</Button>
    </div>
  );
}
