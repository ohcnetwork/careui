import { PageTitle } from "careui";

export function Default() {
  return <PageTitle>Patient Dashboard</PageTitle>;
}

export function ClinicalPages() {
  return (
    <div className="space-y-6">
      <PageTitle>Encounter Summary</PageTitle>
      <PageTitle>Medication Orders</PageTitle>
      <PageTitle>Lab Results</PageTitle>
    </div>
  );
}

export function WithSubtext() {
  return (
    <div className="space-y-1">
      <PageTitle>Ramesh Kumar</PageTitle>
      <p className="text-sm text-muted-foreground">
        MRN: 10043291 · DOB: 12 Mar 1978 · Male
      </p>
    </div>
  );
}
