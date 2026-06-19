import { DottedDivider } from "careui";

export function Default() {
  return (
    <div className="w-full flex flex-col gap-4 py-2">
      <p className="text-sm text-muted-foreground">Section A</p>
      <DottedDivider />
      <p className="text-sm text-muted-foreground">Section B</p>
      <DottedDivider />
      <p className="text-sm text-muted-foreground">Section C</p>
    </div>
  );
}

export function Standalone() {
  return (
    <div className="w-full py-4">
      <DottedDivider className="h-4" />
    </div>
  );
}
