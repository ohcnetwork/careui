import { ButtonGroup, Button } from "careui";

export function Default() {
  return (
    <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Current</Button>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  );
}

export function Vertical() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
      <Button variant="outline">Year</Button>
    </ButtonGroup>
  );
}

export function MixedActions() {
  return (
    <ButtonGroup>
      <Button variant="outline">Export CSV</Button>
      <Button variant="outline">Export PDF</Button>
      <Button variant="outline">Print</Button>
    </ButtonGroup>
  );
}

export function WithPrimary() {
  return (
    <ButtonGroup>
      <Button>Save</Button>
      <Button variant="outline">Save &amp; Close</Button>
      <Button variant="outline">Discard</Button>
    </ButtonGroup>
  );
}
