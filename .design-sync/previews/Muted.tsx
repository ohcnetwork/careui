import { Muted } from "careui";

export function Default() {
  return <Muted>Supporting text for context or secondary information.</Muted>;
}

export function InContext() {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium">Last updated</p>
      <Muted>June 19, 2026 at 10:34 AM by Dr. Ananya Krishnan</Muted>
    </div>
  );
}

export function HelperText() {
  return (
    <div className="space-y-3 max-w-sm">
      <div>
        <label className="text-sm font-medium">Date of Birth</label>
        <Muted>Enter the patient's date of birth in DD/MM/YYYY format.</Muted>
      </div>
      <div>
        <label className="text-sm font-medium">Allergy Notes</label>
        <Muted>List all known allergies, including medications and food.</Muted>
      </div>
    </div>
  );
}
