import { RadioGroup, RadioGroupItem, Label } from "careui";

export function Default() {
  return (
    <RadioGroup defaultValue="outpatient">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="outpatient" id="r-outpatient" />
        <Label htmlFor="r-outpatient">Outpatient</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="inpatient" id="r-inpatient" />
        <Label htmlFor="r-inpatient">Inpatient</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="emergency" id="r-emergency" />
        <Label htmlFor="r-emergency">Emergency</Label>
      </div>
    </RadioGroup>
  );
}

export function Priority() {
  return (
    <RadioGroup defaultValue="high">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="critical" id="p-critical" />
        <Label htmlFor="p-critical">Critical</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="high" id="p-high" />
        <Label htmlFor="p-high">High</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="medium" id="p-medium" />
        <Label htmlFor="p-medium">Medium</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="low" id="p-low" />
        <Label htmlFor="p-low">Low</Label>
      </div>
    </RadioGroup>
  );
}

export function Disabled() {
  return (
    <RadioGroup defaultValue="yes" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="yes" id="d-yes" />
        <Label htmlFor="d-yes">Yes</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="no" id="d-no" />
        <Label htmlFor="d-no">No</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="unknown" id="d-unknown" />
        <Label htmlFor="d-unknown">Unknown</Label>
      </div>
    </RadioGroup>
  );
}
