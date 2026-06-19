import { Switch } from "careui";

export function Default() {
  return <Switch />;
}

export function States() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Switch defaultChecked={false} />
        <span className="text-sm">Off (unchecked)</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch defaultChecked={true} />
        <span className="text-sm">On (checked)</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch disabled />
        <span className="text-sm text-muted-foreground">Disabled off</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch disabled defaultChecked={true} />
        <span className="text-sm text-muted-foreground">Disabled on</span>
      </div>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Switch size="default" defaultChecked />
        <span className="text-sm">Default size</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch size="sm" defaultChecked />
        <span className="text-sm">Small size</span>
      </div>
    </div>
  );
}

export function WithLabels() {
  return (
    <div className="space-y-4 w-72">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Email notifications</p>
          <p className="text-xs text-muted-foreground">Receive updates via email</p>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">SMS alerts</p>
          <p className="text-xs text-muted-foreground">Urgent patient alerts</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Two-factor auth</p>
          <p className="text-xs text-muted-foreground">Enhanced security</p>
        </div>
        <Switch disabled defaultChecked />
      </div>
    </div>
  );
}
