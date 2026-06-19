import { Progress } from "careui";

export function Default() {
  return (
    <div className="w-full max-w-sm">
      <Progress value={60} />
    </div>
  );
}

export function States() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-sm">
          <span>Uploading files…</span>
          <span className="text-muted-foreground">25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-sm">
          <span>Processing</span>
          <span className="text-muted-foreground">50%</span>
        </div>
        <Progress value={50} />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-sm">
          <span>Almost done</span>
          <span className="text-muted-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-sm">
          <span>Complete</span>
          <span className="text-muted-foreground">100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  );
}
