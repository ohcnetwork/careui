import { EyebrowTitle } from "careui";

export function Default() {
  return <EyebrowTitle>Category</EyebrowTitle>;
}

export function TableHeading() {
  return <EyebrowTitle>Patient Records</EyebrowTitle>;
}

export function CardLabel() {
  return <EyebrowTitle>Recent Activity</EyebrowTitle>;
}

export function WithMutedStyle() {
  return (
    <EyebrowTitle className="text-muted-foreground tracking-wider uppercase">
      Overview
    </EyebrowTitle>
  );
}
