import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
  Button,
} from "careui";

export function Default() {
  return (
    <Frame>
      <FrameHeader>
        <FrameTitle>Patient Summary</FrameTitle>
        <FrameDescription>Last updated 2 hours ago</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <p className="text-sm text-muted-foreground">
          John Doe, 45 years old. Admitted for post-operative monitoring.
          Vitals stable, pain managed.
        </p>
      </FramePanel>
    </Frame>
  );
}

export function WithFooter() {
  return (
    <Frame>
      <FrameHeader>
        <FrameTitle>Discharge Checklist</FrameTitle>
        <FrameDescription>Complete all items before discharge</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <ul className="text-sm space-y-1">
          <li>Medication instructions provided</li>
          <li>Follow-up appointment scheduled</li>
          <li>Lab results reviewed</li>
        </ul>
      </FramePanel>
      <FrameFooter>
        <Button size="sm">Mark as complete</Button>
      </FrameFooter>
    </Frame>
  );
}

export function Stacked() {
  return (
    <Frame stacked>
      <FramePanel>
        <FrameTitle>Demographics</FrameTitle>
        <p className="text-sm text-muted-foreground mt-1">Name: Jane Smith · DOB: 1979-03-14</p>
      </FramePanel>
      <FramePanel>
        <FrameTitle>Diagnosis</FrameTitle>
        <p className="text-sm text-muted-foreground mt-1">Hypertensive crisis, managed</p>
      </FramePanel>
    </Frame>
  );
}

export function Ghost() {
  return (
    <Frame variant="ghost" spacing="lg">
      <FrameHeader>
        <FrameTitle>Encounter Notes</FrameTitle>
      </FrameHeader>
      <FramePanel>
        <p className="text-sm text-muted-foreground">
          Patient presented with chest discomfort. ECG normal. Referred to
          cardiology.
        </p>
      </FramePanel>
    </Frame>
  );
}
