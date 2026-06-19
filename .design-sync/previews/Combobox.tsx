import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
} from "careui";

export function Default() {
  return (
    <Combobox>
      <ComboboxInput placeholder="Select a department..." showTrigger showClear={false} />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxCollection>
            <ComboboxGroup>
              <ComboboxLabel>Departments</ComboboxLabel>
              <ComboboxItem value="cardiology">Cardiology</ComboboxItem>
              <ComboboxItem value="neurology">Neurology</ComboboxItem>
              <ComboboxItem value="oncology">Oncology</ComboboxItem>
              <ComboboxItem value="pediatrics">Pediatrics</ComboboxItem>
              <ComboboxItem value="radiology">Radiology</ComboboxItem>
            </ComboboxGroup>
          </ComboboxCollection>
          <ComboboxEmpty>No department found.</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function WithGroups() {
  return (
    <Combobox>
      <ComboboxInput placeholder="Search staff..." showTrigger showClear />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxCollection>
            <ComboboxGroup>
              <ComboboxLabel>Physicians</ComboboxLabel>
              <ComboboxItem value="dr-smith">Dr. Sarah Smith</ComboboxItem>
              <ComboboxItem value="dr-patel">Dr. Raj Patel</ComboboxItem>
            </ComboboxGroup>
            <ComboboxGroup>
              <ComboboxLabel>Nurses</ComboboxLabel>
              <ComboboxItem value="nurse-jones">Maria Jones, RN</ComboboxItem>
              <ComboboxItem value="nurse-chen">Lisa Chen, RN</ComboboxItem>
            </ComboboxGroup>
          </ComboboxCollection>
          <ComboboxEmpty>No staff found.</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
