import { Tabs, TabsContent, TabsList, TabsTrigger } from "careui";

export function Default() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="p-4">
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent value="security" className="p-4">
          <p className="text-sm text-muted-foreground">
            Update your password and two-factor authentication.
          </p>
        </TabsContent>
        <TabsContent value="billing" className="p-4">
          <p className="text-sm text-muted-foreground">
            View billing history and manage your subscription.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function LineVariant() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="overview">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="pt-4">
          <p className="text-sm text-muted-foreground">Dashboard overview</p>
        </TabsContent>
        <TabsContent value="analytics" className="pt-4">
          <p className="text-sm text-muted-foreground">Analytics data</p>
        </TabsContent>
        <TabsContent value="reports" className="pt-4">
          <p className="text-sm text-muted-foreground">Generated reports</p>
        </TabsContent>
        <TabsContent value="settings" className="pt-4">
          <p className="text-sm text-muted-foreground">Settings panel</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function BrowserVariant() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="tab1">
        <TabsList variant="browser">
          <TabsTrigger value="tab1">Patient Info</TabsTrigger>
          <TabsTrigger value="tab2">Vitals</TabsTrigger>
          <TabsTrigger value="tab3">Medications</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="rounded-b-lg border border-t-0 p-4">
          <p className="text-sm text-muted-foreground">Patient demographic information</p>
        </TabsContent>
        <TabsContent value="tab2" className="rounded-b-lg border border-t-0 p-4">
          <p className="text-sm text-muted-foreground">Latest vital signs</p>
        </TabsContent>
        <TabsContent value="tab3" className="rounded-b-lg border border-t-0 p-4">
          <p className="text-sm text-muted-foreground">Current medications list</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function VerticalOrientation() {
  return (
    <div className="w-full max-w-sm">
      <Tabs defaultValue="profile" orientation="vertical">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="p-4">
          <p className="text-sm text-muted-foreground">Edit your profile details.</p>
        </TabsContent>
        <TabsContent value="notifications" className="p-4">
          <p className="text-sm text-muted-foreground">Notification preferences.</p>
        </TabsContent>
        <TabsContent value="privacy" className="p-4">
          <p className="text-sm text-muted-foreground">Privacy controls.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
