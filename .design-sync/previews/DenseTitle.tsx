import { DenseTitle } from "careui";

export function Default() {
  return <DenseTitle>Dense title text</DenseTitle>;
}

export function InContext() {
  return (
    <div className="space-y-1">
      <DenseTitle>Vital Signs</DenseTitle>
      <p className="text-sm text-muted-foreground">
        Last recorded: 2024-06-15 at 09:30 AM
      </p>
    </div>
  );
}

export function Hierarchy() {
  return (
    <div className="space-y-4">
      <DenseTitle>Patient Overview</DenseTitle>
      <DenseTitle className="text-muted-foreground">Current Medications</DenseTitle>
      <DenseTitle className="mt-4">Allergies</DenseTitle>
    </div>
  );
}
