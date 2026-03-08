import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronLeft } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { AppSidebarDemo } from "@/lib/registry/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// ─── Inline block preview components ─────────────────────────────────────────

function LoginPreview() {
  return (
    <div className="flex min-h-120 items-center justify-center bg-background p-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-preview">Email</Label>
            <Input id="email-preview" placeholder="m@example.com" type="email" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password-preview">Password</Label>
              <a href="#" className="text-xs text-muted-foreground underline hover:text-primary">
                Forgot password?
              </a>
            </div>
            <Input id="password-preview" type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full">Sign In</Button>
        </div>
        <Separator />
        <p className="text-center text-sm text-muted-foreground">
          {"Don't have an account? "}
          <a href="#" className="font-medium underline hover:text-primary">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

function LoginSplitPreview() {
  return (
    <div className="flex min-h-120 bg-background">
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-5">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to sign in to your account
            </p>
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full">Continue</Button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="underline">Terms</a> and{" "}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center bg-muted md:flex">
        <div className="space-y-2 text-center">
          <div className="text-3xl font-bold text-foreground">Care UI</div>
          <p className="text-sm text-muted-foreground">
            Beautiful components built with Radix UI and Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  );
}

function SignupPreview() {
  return (
    <div className="flex min-h-120 items-center justify-center bg-background p-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>First name</Label>
              <Input placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label>Last name</Label>
              <Input placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="m@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Create a password" />
          </div>
          <Button className="w-full">Create Account</Button>
        </div>
        <Separator />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="#" className="font-medium underline hover:text-primary">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="min-h-120 bg-background p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Welcome back, John</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Revenue", value: "$45,231.89", change: "+20.1%" },
          { label: "Subscriptions", value: "+2,350", change: "+180.1%" },
          { label: "Active Now", value: "+573", change: "+201" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-3 space-y-1">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-xs text-green-600">{stat.change} from last month</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-card p-3 space-y-2">
          <p className="text-sm font-medium">Recent Sales</p>
          <div className="space-y-2">
            {[
              { name: "Olivia Martin", email: "olivia@example.com", amount: "+$1,999.00" },
              { name: "Jackson Lee", email: "jackson@example.com", amount: "+$39.00" },
              { name: "Isabella Nguyen", email: "isabella@example.com", amount: "+$299.00" },
            ].map((sale) => (
              <div key={sale.email} className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium">{sale.name}</p>
                  <p className="text-muted-foreground">{sale.email}</p>
                </div>
                <p className="font-medium">{sale.amount}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-3 space-y-2">
          <p className="text-sm font-medium">Overview</p>
          <div className="flex h-28 items-end gap-1">
            {[40, 70, 55, 90, 60, 80, 45, 75, 100, 65, 85, 50].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-primary/80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Block definitions ────────────────────────────────────────────────────────

type BlockCategory = "All" | "Sidebar" | "Authentication" | "Dashboard";

interface BlockDef {
  id: string;
  name: string;
  description: string;
  category: Exclude<BlockCategory, "All">;
  preview: React.ReactNode;
  scale?: number;
  code: string;
}

const LOGIN_01_CODE = `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function Login01() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" type="email" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-muted-foreground underline hover:text-primary">
                Forgot password?
              </a>
            </div>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full">Sign In</Button>
        </div>
        <Separator />
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="#" className="font-medium underline hover:text-primary">Sign up</a>
        </p>
      </div>
    </div>
  )
}`;

const LOGIN_02_CODE = `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Login02() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-5">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to sign in to your account
            </p>
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full">Continue</Button>
          </div>
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center bg-muted md:flex">
        <div className="space-y-2 text-center">
          <div className="text-3xl font-bold">Care UI</div>
          <p className="text-sm text-muted-foreground">
            Beautiful components built with Radix UI and Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  )
}`;

const SIGNUP_01_CODE = `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function Signup01() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>First name</Label>
              <Input placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label>Last name</Label>
              <Input placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="m@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Create a password" />
          </div>
          <Button className="w-full">Create Account</Button>
        </div>
        <Separator />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="#" className="font-medium underline hover:text-primary">Sign in</a>
        </p>
      </div>
    </div>
  )
}`;

const DASHBOARD_01_CODE = `export function Dashboard01() {
  const stats = [
    { label: "Total Revenue", value: "$45,231.89", change: "+20.1%" },
    { label: "Subscriptions", value: "+2,350", change: "+180.1%" },
    { label: "Active Now", value: "+573", change: "+201" },
  ]
  const sales = [
    { name: "Olivia Martin", email: "olivia@example.com", amount: "+$1,999.00" },
    { name: "Jackson Lee", email: "jackson@example.com", amount: "+$39.00" },
    { name: "Isabella Nguyen", email: "isabella@example.com", amount: "+$299.00" },
  ]

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-3 space-y-1">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-xs text-green-600">{stat.change}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-card p-3 space-y-2">
          <p className="text-sm font-medium">Recent Sales</p>
          {sales.map((sale) => (
            <div key={sale.email} className="flex items-center justify-between text-xs">
              <div>
                <p className="font-medium">{sale.name}</p>
                <p className="text-muted-foreground">{sale.email}</p>
              </div>
              <p className="font-medium">{sale.amount}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border bg-card p-3 space-y-2">
          <p className="text-sm font-medium">Overview</p>
          <div className="flex h-28 items-end gap-1">
            {[40,70,55,90,60,80,45,75,100,65,85,50].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-primary/80" style={{ height: h + "%" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}`;

const SIDEBAR_01_CODE = `// See the main-sidebar component in the registry
// pnpm dlx shadcn@latest add https://careui.vercel.app/registry/care-ui/main-sidebar/main-sidebar.json`;

const BLOCKS: BlockDef[] = [
  {
    id: "sidebar-01",
    name: "sidebar-01",
    description: "A dashboard with collapsible sidebar navigation and team switcher.",
    category: "Sidebar",
    preview: <AppSidebarDemo />,
    scale: 0.68,
    code: SIDEBAR_01_CODE,
  },
  {
    id: "login-01",
    name: "login-01",
    description: "A centered login page with email and password inputs.",
    category: "Authentication",
    preview: <LoginPreview />,
    scale: 0.58,
    code: LOGIN_01_CODE,
  },
  {
    id: "login-02",
    name: "login-02",
    description: "A login page with a branded split-panel layout.",
    category: "Authentication",
    preview: <LoginSplitPreview />,
    scale: 0.58,
    code: LOGIN_02_CODE,
  },
  {
    id: "signup-01",
    name: "signup-01",
    description: "A signup page with name, email and password fields.",
    category: "Authentication",
    preview: <SignupPreview />,
    scale: 0.58,
    code: SIGNUP_01_CODE,
  },
  {
    id: "dashboard-01",
    name: "dashboard-01",
    description: "A dashboard overview with stats cards and a bar chart.",
    category: "Dashboard",
    preview: <DashboardPreview />,
    scale: 0.55,
    code: DASHBOARD_01_CODE,
  },
];

// ─── BlockThumbnail ───────────────────────────────────────────────────────────

function BlockThumbnail({
  block,
  onSelect,
}: {
  block: BlockDef;
  onSelect: (id: string) => void;
}) {
  const scale = block.scale ?? 0.5;
  const containerHeight = Math.round(480 * scale + 10);

  return (
    <button
      className="group flex w-full flex-col overflow-hidden rounded-xl border bg-card text-left shadow-sm transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={() => onSelect(block.id)}
    >
      <div
        className="relative overflow-hidden bg-muted/20 w-full"
        style={{ height: containerHeight }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${(100 / scale).toFixed(2)}%`,
            height: `${(100 / scale).toFixed(2)}%`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {block.preview}
        </div>
      </div>
      <div className="border-t px-4 py-3">
        <p className="truncate text-sm font-medium">{block.name}</p>
        <p className="truncate text-xs text-muted-foreground">{block.description}</p>
      </div>
    </button>
  );
}

// ─── BlockDetail ──────────────────────────────────────────────────────────────

function BlockDetail({
  block,
  onBack,
}: {
  block: BlockDef;
  onBack: () => void;
}) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const copied = isCopied(block.id);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b px-6 py-3">
        <Button variant="ghost" size="sm" className="gap-1.5" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" />
          All blocks
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <h2 className="text-sm font-medium">{block.name}</h2>
        <p className="text-sm text-muted-foreground hidden md:block">{block.description}</p>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Tabs defaultValue="preview" className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b px-6 py-2">
            <TabsList className="h-8">
              <TabsTrigger value="preview" className="text-xs">Preview</TabsTrigger>
              <TabsTrigger value="code" className="text-xs">Code</TabsTrigger>
            </TabsList>
            <div className="ml-auto">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => copyToClipboard(block.code, block.id)}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy code"}
              </Button>
            </div>
          </div>
          <TabsContent value="preview" className="flex-1 overflow-auto m-0 border-0">
            <div className="min-h-full bg-muted/20 p-6">
              {block.preview}
            </div>
          </TabsContent>
          <TabsContent value="code" className="flex-1 overflow-auto m-0 border-0">
            <SyntaxHighlighter
              language="tsx"
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: "0.8125rem",
                lineHeight: "1.5",
                minHeight: "100%",
              }}
              showLineNumbers
            >
              {block.code}
            </SyntaxHighlighter>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ─── BlocksPage ───────────────────────────────────────────────────────────────

const CATEGORIES: BlockCategory[] = ["All", "Sidebar", "Authentication", "Dashboard"];

export function BlocksPage() {
  const [activeCategory, setActiveCategory] = useState<BlockCategory>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? BLOCKS
      : BLOCKS.filter((b) => b.category === activeCategory);

  const selectedBlock = selectedId
    ? BLOCKS.find((b) => b.id === selectedId) ?? null
    : null;

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top navbar */}
      <header className="flex h-14 shrink-0 items-center gap-4 border-b px-6">
        <button
          className="text-sm font-semibold tracking-tight hover:text-primary transition-colors"
          onClick={() => setSelectedId(null)}
        >
          Care UI
        </button>
        <Separator orientation="vertical" className="h-4" />
        <span className="text-sm text-muted-foreground">Blocks</span>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      {selectedBlock ? (
        <BlockDetail block={selectedBlock} onBack={() => setSelectedId(null)} />
      ) : (
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl space-y-8 p-6 md:p-8">
            <div className="space-y-2 pt-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Building Blocks for the Web
              </h1>
              <p className="max-w-2xl text-muted-foreground">
                Clean, modern building blocks. Copy and paste into your apps.
                Works with all React frameworks. Open Source. Free forever.
              </p>
            </div>
            <Separator />
            <div className="flex items-center gap-1">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-full px-4"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
              <span className="ml-auto text-xs text-muted-foreground">
                {filtered.length} block{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((block) => (
                <BlockThumbnail key={block.id} block={block} onSelect={setSelectedId} />
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
