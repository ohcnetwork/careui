import { ToggleGroup, ToggleGroupItem } from "careui";

export function Default() {
  return (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}

export function OutlineVariant() {
  return (
    <ToggleGroup type="single" variant="outline" defaultValue="bold">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  );
}

export function OutlineConnected() {
  return (
    <ToggleGroup type="single" variant="outline" spacing={0} defaultValue="week">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year">Year</ToggleGroupItem>
    </ToggleGroup>
  );
}

export function MultipleSelection() {
  return (
    <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
      <ToggleGroupItem value="strikethrough">Strike</ToggleGroupItem>
    </ToggleGroup>
  );
}

export function Vertical() {
  return (
    <ToggleGroup type="single" orientation="vertical" variant="outline" spacing={0} defaultValue="option1">
      <ToggleGroupItem value="option1">Option A</ToggleGroupItem>
      <ToggleGroupItem value="option2">Option B</ToggleGroupItem>
      <ToggleGroupItem value="option3">Option C</ToggleGroupItem>
    </ToggleGroup>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      <ToggleGroup type="single" size="sm" defaultValue="a">
        <ToggleGroupItem value="a">Small</ToggleGroupItem>
        <ToggleGroupItem value="b">Size</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="default" defaultValue="a">
        <ToggleGroupItem value="a">Default</ToggleGroupItem>
        <ToggleGroupItem value="b">Size</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg" defaultValue="a">
        <ToggleGroupItem value="a">Large</ToggleGroupItem>
        <ToggleGroupItem value="b">Size</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
