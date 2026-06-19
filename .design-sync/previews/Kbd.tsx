import { Kbd, KbdGroup } from "careui";

export function SingleKeys() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Kbd>⌘</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌃</Kbd>
      <Kbd>↵</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Tab</Kbd>
    </div>
  );
}

export function Combinations() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="w-40">Open command palette</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="w-40">Save changes</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="w-40">Search patients</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>F</Kbd>
        </KbdGroup>
      </div>
    </div>
  );
}

export function Variants() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <KbdGroup>
        <Kbd variant="default">⌘</Kbd>
        <Kbd variant="default">K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd variant="primary">⌘</Kbd>
        <Kbd variant="primary">↵</Kbd>
      </KbdGroup>
    </div>
  );
}
