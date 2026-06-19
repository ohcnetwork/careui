import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
  Button,
} from "careui";

export function RightSheet() {
  return (
    <Sheet open={true} modal={false}>
      <SheetContent side="right" size="sm" overlay={false}>
        <SheetHeader>
          <SheetTitle>Edit Patient Record</SheetTitle>
          <SheetDescription>
            Update patient details and contact information.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <p className="text-sm text-muted-foreground mt-1">John Doe</p>
            </div>
            <div>
              <label className="text-sm font-medium">Date of Birth</label>
              <p className="text-sm text-muted-foreground mt-1">March 14, 1985</p>
            </div>
            <div>
              <label className="text-sm font-medium">Contact</label>
              <p className="text-sm text-muted-foreground mt-1">+1 (555) 012-3456</p>
            </div>
            <div>
              <label className="text-sm font-medium">Ward</label>
              <p className="text-sm text-muted-foreground mt-1">ICU — Room 4B</p>
            </div>
          </div>
        </SheetBody>
        <SheetFooter>
          <Button>Save Changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function BottomSheet() {
  return (
    <Sheet open={true} modal={false}>
      <SheetContent side="bottom" overlay={false}>
        <SheetHeader>
          <SheetTitle>Confirm Discharge</SheetTitle>
          <SheetDescription>
            Are you sure you want to discharge this patient?
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p className="text-sm text-muted-foreground">
            This action will mark the patient as discharged and notify the billing department.
          </p>
        </SheetBody>
        <SheetFooter>
          <Button variant="destructive">Discharge Patient</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
