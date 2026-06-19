import { Label } from "careui";
import { Input } from "careui";

export function Default() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  );
}

export function Required() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="patient-name">
        Patient name
        <span className="text-destructive ml-0.5">*</span>
      </Label>
      <Input id="patient-name" placeholder="Full name" />
    </div>
  );
}

export function FormLabels() {
  return (
    <div className="flex flex-col gap-4 w-72">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dob">Date of birth</Label>
        <Input id="dob" type="date" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">Phone number</Label>
        <Input id="phone" type="tel" placeholder="+91 98765 43210" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="aadhaar" className="text-muted-foreground">
          Aadhaar number (optional)
        </Label>
        <Input id="aadhaar" placeholder="XXXX XXXX XXXX" />
      </div>
    </div>
  );
}
