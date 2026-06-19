import { Checkbox } from "careui";

export function Default() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-sm font-medium leading-none">
        Accept terms and conditions
      </label>
    </div>
  );
}

export function States() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="unchecked" />
        <label htmlFor="unchecked" className="text-sm">Unchecked</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checked" defaultChecked />
        <label htmlFor="checked" className="text-sm">Checked</label>
      </div>
      <div className="flex items-center gap-2 opacity-50">
        <Checkbox id="disabled" disabled />
        <label htmlFor="disabled" className="text-sm text-muted-foreground">Disabled</label>
      </div>
      <div className="flex items-center gap-2 opacity-50">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <label htmlFor="disabled-checked" className="text-sm text-muted-foreground">Disabled checked</label>
      </div>
    </div>
  );
}

export function List() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium mb-1">Notification preferences</p>
      <div className="flex items-center gap-2">
        <Checkbox id="email" defaultChecked />
        <label htmlFor="email" className="text-sm">Email notifications</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="sms" />
        <label htmlFor="sms" className="text-sm">SMS alerts</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="push" defaultChecked />
        <label htmlFor="push" className="text-sm">Push notifications</label>
      </div>
    </div>
  );
}
