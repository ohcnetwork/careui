import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from "careui";

export function Default() {
  return (
    <NativeSelect defaultValue="">
      <NativeSelectOption value="" disabled>
        Select department
      </NativeSelectOption>
      <NativeSelectOption value="cardiology">Cardiology</NativeSelectOption>
      <NativeSelectOption value="neurology">Neurology</NativeSelectOption>
      <NativeSelectOption value="orthopedics">Orthopedics</NativeSelectOption>
      <NativeSelectOption value="pediatrics">Pediatrics</NativeSelectOption>
    </NativeSelect>
  );
}

export function WithOptGroups() {
  return (
    <NativeSelect defaultValue="general">
      <NativeSelectOptGroup label="Medical">
        <NativeSelectOption value="general">General Medicine</NativeSelectOption>
        <NativeSelectOption value="cardiology">Cardiology</NativeSelectOption>
        <NativeSelectOption value="neurology">Neurology</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Surgical">
        <NativeSelectOption value="orthopedics">Orthopedics</NativeSelectOption>
        <NativeSelectOption value="ent">ENT</NativeSelectOption>
        <NativeSelectOption value="ophthalmology">Ophthalmology</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      <NativeSelect size="sm">
        <NativeSelectOption value="morning">Morning Shift</NativeSelectOption>
        <NativeSelectOption value="evening">Evening Shift</NativeSelectOption>
        <NativeSelectOption value="night">Night Shift</NativeSelectOption>
      </NativeSelect>
      <NativeSelect size="default">
        <NativeSelectOption value="morning">Morning Shift</NativeSelectOption>
        <NativeSelectOption value="evening">Evening Shift</NativeSelectOption>
        <NativeSelectOption value="night">Night Shift</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}

export function Disabled() {
  return (
    <NativeSelect disabled defaultValue="icu">
      <NativeSelectOption value="icu">ICU</NativeSelectOption>
      <NativeSelectOption value="ward">General Ward</NativeSelectOption>
    </NativeSelect>
  );
}
