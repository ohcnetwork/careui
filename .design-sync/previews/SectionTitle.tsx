import { SectionTitle } from "careui";

export function Default() {
  return <SectionTitle>Account Settings</SectionTitle>;
}

export function Clinical() {
  return (
    <div className="space-y-6">
      <SectionTitle>Patient Overview</SectionTitle>
      <SectionTitle>Active Encounters</SectionTitle>
      <SectionTitle>Medication Orders</SectionTitle>
    </div>
  );
}

export function WithSubtext() {
  return (
    <div>
      <SectionTitle>User Management</SectionTitle>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage team members, roles, and access permissions across your organization.
      </p>
    </div>
  );
}
