import { GroupTitle } from "careui";

export function Default() {
  return <GroupTitle>Settings</GroupTitle>;
}

export function SectionHeading() {
  return <GroupTitle>Patient Information</GroupTitle>;
}

export function CardGroupTitle() {
  return <GroupTitle>Active Orders</GroupTitle>;
}

export function WithMutedText() {
  return (
    <div>
      <GroupTitle>Vital Signs</GroupTitle>
      <p className="text-sm text-muted-foreground mt-1">Last recorded 30 minutes ago</p>
    </div>
  );
}
