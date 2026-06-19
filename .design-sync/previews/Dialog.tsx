import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  Button,
} from "careui";

export function Default() {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Discharge</DialogTitle>
          <DialogDescription>
            Are you sure you want to discharge this patient? This action will update their status in the system.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button>Confirm Discharge</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function WithTrigger() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Patient Info</DialogTitle>
          <DialogDescription>
            Update the patient&apos;s contact and insurance details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="text-sm text-muted-foreground">Form fields would appear here.</div>
        </div>
        <DialogFooter>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
