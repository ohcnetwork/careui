import { DatePicker } from "careui";

export function Default() {
  return (
    <div className="w-64">
      <DatePicker placeholder="Pick a date" />
    </div>
  );
}

export function WithValue() {
  return (
    <div className="w-64">
      <DatePicker value={new Date("2024-06-15")} placeholder="Pick a date" />
    </div>
  );
}

export function WithDropdownCaption() {
  return (
    <div className="w-64">
      <DatePicker placeholder="Select appointment date" captionLayout="dropdown" />
    </div>
  );
}
