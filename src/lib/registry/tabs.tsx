import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppWindowIcon, CodeIcon } from "lucide-react";

// ─── stateful preview helpers ────────────────────────────────────────────────

function TabsDemoPreview() {
  return React.createElement(
    Tabs,
    { defaultValue: "overview", className: "w-[400px]" },
    React.createElement(
      TabsList,
      {},
      React.createElement(TabsTrigger, { value: "overview" }, "Overview"),
      React.createElement(TabsTrigger, { value: "analytics" }, "Analytics"),
      React.createElement(TabsTrigger, { value: "reports" }, "Reports"),
      React.createElement(TabsTrigger, { value: "settings" }, "Settings")
    ),
    React.createElement(
      TabsContent,
      { value: "overview" },
      React.createElement(
        Card,
        {},
        React.createElement(
          CardHeader,
          {},
          React.createElement(CardTitle, {}, "Overview"),
          React.createElement(
            CardDescription,
            {},
            "View your key metrics and recent project activity. Track progress across all your active projects."
          )
        ),
        React.createElement(
          CardContent,
          { className: "text-sm text-muted-foreground" },
          "You have 12 active projects and 3 pending tasks."
        )
      )
    ),
    React.createElement(
      TabsContent,
      { value: "analytics" },
      React.createElement(
        Card,
        {},
        React.createElement(
          CardHeader,
          {},
          React.createElement(CardTitle, {}, "Analytics"),
          React.createElement(
            CardDescription,
            {},
            "Track performance and user engagement metrics. Monitor trends and identify growth opportunities."
          )
        ),
        React.createElement(
          CardContent,
          { className: "text-sm text-muted-foreground" },
          "Page views are up 25% compared to last month."
        )
      )
    ),
    React.createElement(
      TabsContent,
      { value: "reports" },
      React.createElement(
        Card,
        {},
        React.createElement(
          CardHeader,
          {},
          React.createElement(CardTitle, {}, "Reports"),
          React.createElement(
            CardDescription,
            {},
            "Generate and download your detailed reports. Export data in multiple formats for analysis."
          )
        ),
        React.createElement(
          CardContent,
          { className: "text-sm text-muted-foreground" },
          "You have 5 reports ready and available to export."
        )
      )
    ),
    React.createElement(
      TabsContent,
      { value: "settings" },
      React.createElement(
        Card,
        {},
        React.createElement(
          CardHeader,
          {},
          React.createElement(CardTitle, {}, "Settings"),
          React.createElement(
            CardDescription,
            {},
            "Manage your account preferences and options. Customize your experience to fit your needs."
          )
        ),
        React.createElement(
          CardContent,
          { className: "text-sm text-muted-foreground" },
          "Configure notifications, security, and themes."
        )
      )
    )
  );
}

function TabsBrowserPreview() {
  return React.createElement(
    Tabs,
    { defaultValue: "medication" },
    React.createElement(
      TabsList,
      { variant: "browser" },
      React.createElement(
        TabsTrigger,
        { value: "medication" },
        "Medication Request"
      ),
      React.createElement(
        TabsTrigger,
        { value: "history" },
        "Patient Clinical History"
      )
    ),
    React.createElement(
      TabsContent,
      { value: "medication", className: "border border-border rounded-b-lg p-4 mt-0" },
      React.createElement("p", { className: "text-sm text-muted-foreground" }, "Medication request details go here.")
    ),
    React.createElement(
      TabsContent,
      { value: "history", className: "border border-border rounded-b-lg p-4 mt-0" },
      React.createElement("p", { className: "text-sm text-muted-foreground" }, "Patient clinical history goes here.")
    )
  );
}

function TabsLinePreview() {
  return React.createElement(
    Tabs,
    { defaultValue: "overview" },
    React.createElement(
      TabsList,
      { variant: "line" },
      React.createElement(TabsTrigger, { value: "overview" }, "Overview"),
      React.createElement(TabsTrigger, { value: "analytics" }, "Analytics"),
      React.createElement(TabsTrigger, { value: "reports" }, "Reports")
    )
  );
}

function TabsVerticalPreview() {
  return React.createElement(
    Tabs,
    { defaultValue: "account", orientation: "vertical" },
    React.createElement(
      TabsList,
      {},
      React.createElement(TabsTrigger, { value: "account" }, "Account"),
      React.createElement(TabsTrigger, { value: "password" }, "Password"),
      React.createElement(
        TabsTrigger,
        { value: "notifications" },
        "Notifications"
      )
    )
  );
}

function TabsDisabledPreview() {
  return React.createElement(
    Tabs,
    { defaultValue: "home" },
    React.createElement(
      TabsList,
      {},
      React.createElement(TabsTrigger, { value: "home" }, "Home"),
      React.createElement(
        TabsTrigger,
        { value: "settings", disabled: true },
        "Disabled"
      )
    )
  );
}

function TabsIconsPreview() {
  return React.createElement(
    Tabs,
    { defaultValue: "preview" },
    React.createElement(
      TabsList,
      {},
      React.createElement(
        TabsTrigger,
        { value: "preview" },
        React.createElement(AppWindowIcon),
        "Preview"
      ),
      React.createElement(
        TabsTrigger,
        { value: "code" },
        React.createElement(CodeIcon),
        "Code"
      )
    )
  );
}

export const tabsDoc: ComponentDoc = {
  id: "tabs",
  name: "Tabs",
  description:
    "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  installation: {
    cli: "npx shadcn@latest add tabs",
    manual: "Copy and paste the tabs component source code into your project.",
  },
  usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="account" className="w-100">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>`,
  preview: {
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-100">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              View your key metrics and recent project activity. Track progress
              across all your active projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have 12 active projects and 3 pending tasks.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Track performance and user engagement metrics. Monitor trends and
              identify growth opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Page views are up 25% compared to last month.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Generate and download your detailed reports. Export data in
              multiple formats for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have 5 reports ready and available to export.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and options. Customize your
              experience to fit your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Configure notifications, security, and themes.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}`,
    component: React.createElement(TabsDemoPreview),
  },
  examples: [
    {
      name: "Browser",
      description:
        'Use the variant="browser" prop on TabsList for a browser-tab style that connects to content below.',
      code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function TabsBrowser() {
  return (
    <Tabs defaultValue="medication">
      <TabsList variant="browser">
        <TabsTrigger value="medication">Medication Request</TabsTrigger>
        <TabsTrigger value="history">Patient Clinical History</TabsTrigger>
      </TabsList>
      <TabsContent value="medication" className="border border-border rounded-b-lg p-4 mt-0">
        Medication request details go here.
      </TabsContent>
      <TabsContent value="history" className="border border-border rounded-b-lg p-4 mt-0">
        Patient clinical history goes here.
      </TabsContent>
    </Tabs>
  )
}`,
      preview: React.createElement(TabsBrowserPreview),
    },
    {
      name: "Line",
      description:
        'Use the variant="line" prop on TabsList for a line style.',
      code: `import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsLine() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}`,
      preview: React.createElement(TabsLinePreview),
    },
    {
      name: "Vertical",
      description: 'Use orientation="vertical" for vertical tabs.',
      code: `import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsVertical() {
  return (
    <Tabs defaultValue="account" orientation="vertical">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}`,
      preview: React.createElement(TabsVerticalPreview),
    },
    {
      name: "Disabled",
      description: "Disable individual tabs using the disabled prop.",
      code: `import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDisabled() {
  return (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}`,
      preview: React.createElement(TabsDisabledPreview),
    },
    {
      name: "Icons",
      description: "Add icons to tab triggers.",
      code: `import { AppWindowIcon, CodeIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}`,
      preview: React.createElement(TabsIconsPreview),
    },
  ],
};
