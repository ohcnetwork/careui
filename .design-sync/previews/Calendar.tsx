import { Calendar } from "careui";

export function Default() {
  return <Calendar mode="single" className="rounded-md border p-2" />;
}

export function SingleMode() {
  return <Calendar mode="single" />;
}

export function WithDropdown() {
  return (
    <Calendar
      captionLayout="dropdown"
      fromYear={2000}
      toYear={2030}
    />
  );
}

export function RangeMode() {
  return <Calendar mode="range" />;
}
