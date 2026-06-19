import { Textarea } from "careui";

export function Default() {
  return (
    <div className="w-full max-w-sm">
      <Textarea placeholder="Enter your message..." />
    </div>
  );
}

export function WithValue() {
  return (
    <div className="w-full max-w-sm">
      <Textarea defaultValue="This is a pre-filled textarea with some content that demonstrates how the component looks when it has existing text inside it." />
    </div>
  );
}

export function Disabled() {
  return (
    <div className="w-full max-w-sm">
      <Textarea
        disabled
        defaultValue="This field is disabled and cannot be edited."
      />
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="w-full max-w-sm">
      <Textarea
        aria-invalid="true"
        placeholder="Enter clinical notes..."
        defaultValue="Incomplete entry"
      />
    </div>
  );
}

export function WithRows() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Textarea rows={2} placeholder="Short note (2 rows)..." />
      <Textarea rows={6} placeholder="Detailed notes (6 rows)..." />
    </div>
  );
}
