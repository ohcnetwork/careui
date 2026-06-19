import { Lead } from "careui";

export function Default() {
  return (
    <Lead>
      Comprehensive health records, encounter tracking, and care coordination —
      all in one place.
    </Lead>
  );
}

export function PageIntro() {
  return (
    <div className="max-w-xl flex flex-col gap-2">
      <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
      <Lead>
        View your patient&apos;s complete medical history, active medications,
        and upcoming appointments at a glance.
      </Lead>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <Lead className="text-center">No encounters recorded yet.</Lead>
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        Start by creating a new encounter for this patient.
      </p>
    </div>
  );
}
