import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "careui";

export function Default() {
  return (
    <div className="w-80 rounded-xl border shadow-md overflow-hidden">
      <Command>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Patients">
            <CommandItem value="new-patient">New Patient</CommandItem>
            <CommandItem value="search-patient">Search Patient</CommandItem>
            <CommandItem value="recent-patients">Recent Patients</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem value="profile">
              Profile
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem value="preferences">
              Preferences
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export function WithShortcuts() {
  return (
    <div className="w-80 rounded-xl border shadow-md overflow-hidden">
      <Command>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem value="dashboard">
              Dashboard
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem value="appointments">
              Appointments
              <CommandShortcut>⌘A</CommandShortcut>
            </CommandItem>
            <CommandItem value="reports">
              Reports
              <CommandShortcut>⌘R</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="create-note">Create Note</CommandItem>
            <CommandItem value="log-vitals">Log Vitals</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
