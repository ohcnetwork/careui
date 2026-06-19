import { Slider } from "careui";

export function Default() {
  return (
    <div className="w-full max-w-sm px-2">
      <Slider defaultValue={[50]} />
    </div>
  );
}

export function States() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm px-2">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Volume: 25%</span>
        <Slider defaultValue={[25]} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Brightness: 70%</span>
        <Slider defaultValue={[70]} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Price range: $20–$80</span>
        <Slider defaultValue={[20, 80]} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">Disabled</span>
        <Slider defaultValue={[50]} disabled />
      </div>
    </div>
  );
}
