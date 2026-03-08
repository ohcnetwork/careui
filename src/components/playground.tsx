import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChevronDown, Info } from "lucide-react";
import { AppSidebarDemo } from "@/lib/registry/sidebar";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export function Playground() {
  const [progress, setProgress] = useState(40);
  const [sliderValue, setSliderValue] = useState([60]);
  const [checked, setChecked] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-8 py-8">
      <div>
        <h1 className="text-2xl font-semibold">Component Playground</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quick visual verification of installed components.
        </p>
      </div>

      <Separator />

      {/* Buttons */}
      <Section title="Buttons">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="destructive-solid">Destructive Solid</Button>
        <Button disabled>Disabled</Button>
      </Section>

      <Separator />

      {/* Badges */}
      <Section title="Badges">
        <Badge>Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="primary" solid>Primary Solid</Badge>
        <Badge variant="success" solid>Success Solid</Badge>
      </Section>

      <Separator />

      {/* Alerts */}
      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Alerts
        </p>
        <div className="space-y-2">
          <Alert>
            <Info className="size-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              This is an informational alert message.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
        </div>
      </div>

      <Separator />

      {/* Inputs */}
      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Inputs
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input autoSpace placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
          <Textarea autoSpace placeholder="Textarea..." rows={3} />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
              <SelectItem value="c">Option C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Controls */}
      <Section title="Controls">
        <div className="flex items-center gap-2">
          <Checkbox
            id="playground-check"
            checked={checked}
            onCheckedChange={(v) => setChecked(!!v)}
          />
          <Label htmlFor="playground-check">Checkbox</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="playground-switch"
            checked={toggled}
            onCheckedChange={setToggled}
          />
          <Label htmlFor="playground-switch">Switch</Label>
        </div>
      </Section>

      <Separator />

      {/* Progress & Slider */}
      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Progress & Slider
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Progress value={progress} className="flex-1" />
            <span className="w-10 text-right text-sm tabular-nums text-muted-foreground">
              {progress}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Slider
              value={sliderValue}
              onValueChange={(v) => {
                setSliderValue(v);
                setProgress(v[0]);
              }}
              min={0}
              max={100}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Overlays */}
      <Section title="Overlays & Feedback">
        {/* Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description. Check that it renders correctly.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Dropdown
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item One</DropdownMenuItem>
            <DropdownMenuItem>Item Two</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Danger
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Toast */}
        <Button
          variant="outline"
          onClick={() =>
            toast("Toast fired", {
              description: "Sonner toast is working.",
            })
          }
        >
          Show Toast
        </Button>
      </Section>

      <Separator />

      {/* Tabs */}
      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Tabs
        </p>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab One</TabsTrigger>
            <TabsTrigger value="tab2">Tab Two</TabsTrigger>
            <TabsTrigger value="tab3">Tab Three</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardHeader>
                <CardTitle>Tab One Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Content for the first tab.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card>
              <CardHeader>
                <CardTitle>Tab Two Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Content for the second tab.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card>
              <CardHeader>
                <CardTitle>Tab Three Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Content for the third tab.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Separator />

      {/* Avatar & Skeleton */}
      <Section title="Avatar & Skeleton">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-32 rounded" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
        </div>
      </Section>

      <Separator />

      {/* Sidebar */}
      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Sidebar
        </p>
        <AppSidebarDemo />
      </div>

    </main>
  );
}
