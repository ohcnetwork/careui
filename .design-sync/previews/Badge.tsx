import { Badge } from "careui";

export function SemanticVariants() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  );
}

export function ColorVariants() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="red">Red</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="amber">Amber</Badge>
      <Badge variant="yellow">Yellow</Badge>
      <Badge variant="lime">Lime</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="teal">Teal</Badge>
      <Badge variant="cyan">Cyan</Badge>
      <Badge variant="sky">Sky</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="indigo">Indigo</Badge>
      <Badge variant="violet">Violet</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="fuchsia">Fuchsia</Badge>
      <Badge variant="pink">Pink</Badge>
      <Badge variant="rose">Rose</Badge>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-wrap gap-2 items-end">
      <Badge size="xs">XS label</Badge>
      <Badge size="sm">SM label</Badge>
      <Badge size="md">MD label</Badge>
      <Badge size="lg">LG label</Badge>
    </div>
  );
}

export function WithDot() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="destructive" dot>Error</Badge>
      <Badge variant="neutral" dot>Inactive</Badge>
    </div>
  );
}

export function Solid() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="primary" solid>Primary</Badge>
      <Badge variant="success" solid>Success</Badge>
      <Badge variant="warning" solid>Warning</Badge>
      <Badge variant="info" solid>Info</Badge>
      <Badge variant="destructive" solid>Error</Badge>
    </div>
  );
}

export function Counter() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge counter size="sm">3</Badge>
      <Badge counter size="md">12</Badge>
      <Badge counter size="lg" variant="destructive">99+</Badge>
    </div>
  );
}
