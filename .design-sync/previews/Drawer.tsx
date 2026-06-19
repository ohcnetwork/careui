import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerTrigger,
  Button,
} from "careui";

export function Default() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Patient Details</DrawerTitle>
          <DrawerDescription>
            Review and update the patient&apos;s information below.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-3">
            <div className="rounded-md border p-3 text-sm">
              <p className="font-medium">Alice Johnson</p>
              <p className="text-muted-foreground">MRN: 001234 · DOB: April 12, 1980</p>
            </div>
            <div className="rounded-md border p-3 text-sm">
              <p className="font-medium">Current Ward</p>
              <p className="text-muted-foreground">Cardiology — Bed 4B</p>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <Button variant="outline">Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function RightSide() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Open Side Panel</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Refine your patient list view.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Ward</p>
            <p>Status</p>
            <p>Attending Physician</p>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button>Apply Filters</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
