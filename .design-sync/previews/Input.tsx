import { Input } from "careui";

export function Default() {
  return <Input type="text" placeholder="Enter your name" />;
}

export function EmailInput() {
  return <Input type="email" placeholder="jane@example.com" />;
}

export function PasswordInput() {
  return <Input type="password" placeholder="Enter password" />;
}

export function Disabled() {
  return <Input type="text" placeholder="Disabled input" disabled />;
}

export function InvalidState() {
  return (
    <Input
      type="text"
      placeholder="Enter value"
      defaultValue="invalid@"
      aria-invalid
    />
  );
}
