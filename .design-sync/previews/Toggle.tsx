import { Toggle } from "careui";

export function Default() {
  return (
    <div className="flex flex-wrap gap-2">
      <Toggle>Bold</Toggle>
      <Toggle pressed>Italic</Toggle>
      <Toggle defaultPressed>Underline</Toggle>
    </div>
  );
}

export function Variants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Toggle variant="default">Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="default" pressed>Default Pressed</Toggle>
      <Toggle variant="outline" pressed>Outline Pressed</Toggle>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  );
}

export function Disabled() {
  return (
    <div className="flex flex-wrap gap-2">
      <Toggle disabled>Disabled</Toggle>
      <Toggle disabled pressed>Disabled Pressed</Toggle>
      <Toggle disabled variant="outline">Disabled Outline</Toggle>
    </div>
  );
}
