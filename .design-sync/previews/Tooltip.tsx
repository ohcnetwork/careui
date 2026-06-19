import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Button,
} from "careui";

export function Default() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>This is a tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function WithOpenState() {
  return (
    <TooltipProvider>
      <Tooltip open>
        <TooltipTrigger asChild>
          <Button variant="secondary">Always visible</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip forced open for preview</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Placement() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center justify-center gap-4 p-8">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side} open>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                {side}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

export function WithDelay() {
  return (
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>500ms delay</Button>
        </TooltipTrigger>
        <TooltipContent>Appears after 500ms hover</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
