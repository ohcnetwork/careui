import { Small } from "careui";

export function Default() {
  return <Small>Small text</Small>;
}

export function UseCases() {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium block mb-1">Patient ID</label>
        <Small className="text-muted-foreground">PT-2024-00123</Small>
      </div>
      <div>
        <Small>Form label</Small>
      </div>
      <div>
        <Small className="text-muted-foreground">Last updated 2 hours ago</Small>
      </div>
      <div>
        <Small className="text-destructive">Required field</Small>
      </div>
    </div>
  );
}

export function WithContext() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base font-semibold">John Doe</span>
      <Small className="text-muted-foreground">Age 38</Small>
    </div>
  );
}
