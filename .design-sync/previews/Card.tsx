import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "careui";

export function Default() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Patient Summary</CardTitle>
        <CardDescription>Last updated 2 hours ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          John Smith, 54 years old. Admitted for post-operative care following knee replacement surgery. Vitals stable.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">View record</Button>
        <Button size="sm" variant="outline">Discharge</Button>
      </CardFooter>
    </Card>
  );
}

export function Small() {
  return (
    <Card size="sm" className="w-72">
      <CardHeader>
        <CardTitle>Appointment</CardTitle>
        <CardDescription>Today at 2:30 PM</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Dr. Patel — General Consultation</p>
      </CardContent>
    </Card>
  );
}

export function WithImage() {
  return (
    <Card className="w-72 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80"
        alt="Medical scan"
        className="w-full h-36 object-cover"
      />
      <CardHeader>
        <CardTitle>MRI Scan — Brain</CardTitle>
        <CardDescription>Reviewed by Dr. Nguyen</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">No abnormalities detected. Follow-up in 12 months.</p>
      </CardContent>
    </Card>
  );
}

export function StatCard() {
  return (
    <div className="flex gap-4">
      <Card className="w-40">
        <CardHeader>
          <CardDescription>Patients today</CardDescription>
          <CardTitle className="text-3xl font-bold">48</CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-40">
        <CardHeader>
          <CardDescription>Pending reviews</CardDescription>
          <CardTitle className="text-3xl font-bold">12</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
