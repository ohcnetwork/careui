import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from "careui";

export function Default() {
  return (
    <Collapsible className="w-80 space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">Patient Notes</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">Toggle</Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">
          Patient presents with mild hypertension. BP 138/88.
        </div>
        <div className="rounded-md border px-4 py-2 text-sm">
          Prescribed lisinopril 10mg once daily.
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function DefaultOpen() {
  return (
    <Collapsible defaultOpen className="w-80 space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">Recent Visits</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">Toggle</Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">
          2024-01-15 — General check-up
        </div>
        <div className="rounded-md border px-4 py-2 text-sm">
          2024-01-03 — Blood test results review
        </div>
        <div className="rounded-md border px-4 py-2 text-sm">
          2023-12-10 — Annual physical
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Disabled() {
  return (
    <Collapsible disabled className="w-80 space-y-2 opacity-60">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">Locked Section</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" disabled>Toggle</Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="rounded-md border px-4 py-2 text-sm">
          This content is not accessible.
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
