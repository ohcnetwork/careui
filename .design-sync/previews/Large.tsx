import { Large } from "careui";

export function Default() {
  return <Large>Patient Overview</Large>;
}

export function ContextualUse() {
  return (
    <div className="flex flex-col gap-2">
      <Large>Active Medications</Large>
      <p className="text-sm text-muted-foreground">
        Reviewing 4 current prescriptions for this encounter.
      </p>
    </div>
  );
}

export function CardHeadings() {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md w-80">
      <Large>Vital Signs</Large>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-muted-foreground">BP</span>
          <p className="font-medium">120/80 mmHg</p>
        </div>
        <div>
          <span className="text-muted-foreground">Pulse</span>
          <p className="font-medium">72 bpm</p>
        </div>
        <div>
          <span className="text-muted-foreground">SpO₂</span>
          <p className="font-medium">98%</p>
        </div>
        <div>
          <span className="text-muted-foreground">Temp</span>
          <p className="font-medium">37.2 °C</p>
        </div>
      </div>
    </div>
  );
}
