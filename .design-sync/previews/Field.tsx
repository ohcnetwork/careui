import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldTitle,
  Input,
} from "careui";

export function Default() {
  return (
    <Field>
      <FieldLabel htmlFor="name">Full name</FieldLabel>
      <Input id="name" placeholder="Jane Doe" />
      <FieldDescription>Enter your legal full name.</FieldDescription>
    </Field>
  );
}

export function WithError() {
  return (
    <Field data-invalid="true">
      <FieldLabel htmlFor="email">Email address</FieldLabel>
      <Input id="email" type="email" placeholder="jane@example.com" defaultValue="not-an-email" aria-invalid />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  );
}

export function HorizontalOrientation() {
  return (
    <FieldGroup>
      <Field orientation="horizontal">
        <FieldTitle>Username</FieldTitle>
        <Input placeholder="johndoe" />
      </Field>
      <Field orientation="horizontal">
        <FieldTitle>Department</FieldTitle>
        <Input placeholder="Cardiology" />
      </Field>
    </FieldGroup>
  );
}

export function FormFieldSet() {
  return (
    <FieldSet>
      <Field>
        <FieldLabel htmlFor="first">First name</FieldLabel>
        <Input id="first" placeholder="Jane" />
      </Field>
      <Field>
        <FieldLabel htmlFor="last">Last name</FieldLabel>
        <Input id="last" placeholder="Doe" />
        <FieldDescription>As it appears on your ID.</FieldDescription>
      </Field>
    </FieldSet>
  );
}
