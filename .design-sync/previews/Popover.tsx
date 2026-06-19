import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  Button,
} from "careui";

export function Default() {
  return (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="outline">View Details</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Patient Notes</PopoverTitle>
          <PopoverDescription>
            Additional context for this patient encounter.
          </PopoverDescription>
        </PopoverHeader>
        <p className="text-sm">
          Patient reports intermittent chest pain for the past 3 days. No
          shortness of breath or palpitations noted.
        </p>
      </PopoverContent>
    </Popover>
  );
}

export function WithAction() {
  return (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="secondary">Filter Results</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Filter by Status</PopoverTitle>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded" />
            Active
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded" />
            Discharged
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded" />
            Pending Review
          </label>
        </div>
        <Button size="sm" className="w-full mt-2">
          Apply Filters
        </Button>
      </PopoverContent>
    </Popover>
  );
}
