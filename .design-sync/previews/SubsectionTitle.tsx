import { SubsectionTitle } from "careui";

export function Default() {
  return <SubsectionTitle>Email Preferences</SubsectionTitle>;
}

export function Clinical() {
  return (
    <div className="space-y-5">
      <SubsectionTitle>Vital Signs</SubsectionTitle>
      <SubsectionTitle>Medication History</SubsectionTitle>
      <SubsectionTitle>Lab Results</SubsectionTitle>
    </div>
  );
}

export function WithSubtext() {
  return (
    <div>
      <SubsectionTitle>Notification Settings</SubsectionTitle>
      <p className="mt-1 text-sm text-muted-foreground">
        Configure how and when you receive alerts for patient events.
      </p>
    </div>
  );
}
