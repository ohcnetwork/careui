import { Indicator } from "careui";

export function Tones() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-1.5 text-sm">
        <Indicator tone="success" variant="filled" size="md" />
        Online
      </span>
      <span className="flex items-center gap-1.5 text-sm">
        <Indicator tone="warning" variant="filled" size="md" />
        Away
      </span>
      <span className="flex items-center gap-1.5 text-sm">
        <Indicator tone="destructive" variant="filled" size="md" />
        Offline
      </span>
      <span className="flex items-center gap-1.5 text-sm">
        <Indicator tone="neutral" variant="filled" size="md" />
        Unknown
      </span>
      <span className="flex items-center gap-1.5 text-sm">
        <Indicator tone="primary" variant="filled" size="md" />
        Active
      </span>
    </div>
  );
}

export function Variants() {
  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-1.5 text-sm">
        <Indicator tone="success" variant="filled" size="md" />
        Filled
      </span>
      <span className="flex items-center gap-1.5 text-sm">
        <Indicator tone="success" variant="outlined" size="md" />
        Outlined
      </span>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex items-center gap-3">
      <Indicator tone="info" variant="filled" size="xs" />
      <Indicator tone="info" variant="filled" size="sm" />
      <Indicator tone="info" variant="filled" size="md" />
      <Indicator tone="info" variant="filled" size="lg" />
      <Indicator tone="info" variant="filled" size="xl" />
    </div>
  );
}

export function StatusList() {
  const beds = [
    { id: "A1", status: "available", tone: "success" },
    { id: "A2", status: "occupied", tone: "destructive" },
    { id: "A3", status: "cleaning", tone: "warning" },
    { id: "A4", status: "reserved", tone: "info" },
  ] as const;

  return (
    <ul className="space-y-2">
      {beds.map((bed) => (
        <li key={bed.id} className="flex items-center gap-2 text-sm">
          <Indicator tone={bed.tone} variant="filled" size="sm" />
          <span className="font-medium">Bed {bed.id}</span>
          <span className="text-muted-foreground capitalize">{bed.status}</span>
        </li>
      ))}
    </ul>
  );
}
