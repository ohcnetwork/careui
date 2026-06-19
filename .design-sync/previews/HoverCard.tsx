import { HoverCard, HoverCardContent, HoverCardTrigger, Avatar, AvatarFallback, AvatarImage } from "careui";

export function Default() {
  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <button className="text-primary underline underline-offset-4 text-sm">
          Dr. Sarah Johnson
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium">Dr. Sarah Johnson</p>
            <p className="text-xs text-muted-foreground">Cardiologist · ICU Ward</p>
            <p className="text-xs text-muted-foreground">Available until 6:00 PM</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function OpenByDefault() {
  return (
    <HoverCard open>
      <HoverCardTrigger asChild>
        <button className="text-primary underline underline-offset-4 text-sm">
          @careui
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <p className="text-sm font-semibold">Care UI</p>
          <p className="text-xs text-muted-foreground">
            Design system for clinical software — built with Radix + Tailwind.
          </p>
          <p className="text-xs text-muted-foreground">Joined January 2024</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function MedicationInfo() {
  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <button className="text-sm font-medium underline underline-offset-4">
          Metformin 500mg
        </button>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <div className="space-y-1.5">
          <p className="text-sm font-semibold">Metformin HCl 500 mg</p>
          <p className="text-xs text-muted-foreground">Class: Biguanide antidiabetic</p>
          <p className="text-xs text-muted-foreground">Frequency: Twice daily with meals</p>
          <p className="text-xs text-muted-foreground">Last dispensed: 3 days ago</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
