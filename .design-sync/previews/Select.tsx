import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "careui";

export function Default() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="editor">Editor</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function WithDefaultValue() {
  return (
    <Select defaultValue="editor">
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="editor">Editor</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function Disabled() {
  return (
    <Select disabled>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Not available" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function WithGroups() {
  return (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select department" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Clinical</SelectLabel>
          <SelectItem value="icu">ICU</SelectItem>
          <SelectItem value="emergency">Emergency</SelectItem>
          <SelectItem value="surgery">Surgery</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Administrative</SelectLabel>
          <SelectItem value="billing">Billing</SelectItem>
          <SelectItem value="hr">Human Resources</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SmallSize() {
  return (
    <div className="flex gap-3 items-center">
      <Select>
        <SelectTrigger size="sm" className="w-40">
          <SelectValue placeholder="Small trigger" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="opt1">Option 1</SelectItem>
          <SelectItem value="opt2">Option 2</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Default trigger" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="opt1">Option 1</SelectItem>
          <SelectItem value="opt2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
