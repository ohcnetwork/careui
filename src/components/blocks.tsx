import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Copy, Check, ChevronLeft } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { AppSidebarDemo } from "@/lib/registry/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigation } from "@/contexts/navigation-context";




// ─── Block definitions ────────────────────────────────────────────────────────

type BlockCategory = "All" | "Sidebar" | "Authentication" | "Dashboard";

interface BlockDef {
  id: string;
  name: string;
  description: string;
  category: Exclude<BlockCategory, "All">;
  preview: (fullPage?: boolean) => React.ReactNode;
  scale?: number;
  code: string;
}

const SIDEBAR_01_CODE = `// See the main-sidebar component in the registry
// pnpm dlx shadcn@latest add https://careui.vercel.app/registry/care-ui/main-sidebar/main-sidebar.json`;

const BLOCKS: BlockDef[] = [
  {
    id: "sidebar-01",
    name: "sidebar-01",
    description: "A dashboard with collapsible sidebar navigation and team switcher.",
    category: "Sidebar",
    preview: (fullPage) => <AppSidebarDemo fullPage={fullPage} />,
    scale: 0.68,
    code: SIDEBAR_01_CODE,
  },
];

// ─── BlockThumbnail ───────────────────────────────────────────────────────────

function BlockThumbnail({ block }: { block: BlockDef }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const scale = block.scale ?? 0.5;
  const containerHeight = Math.round(480 * scale + 10);

  function openPreview() {
    const base = window.location.pathname + window.location.search;
    window.open(base + "#block-preview-" + block.id, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
      <button
        className="relative overflow-hidden bg-muted/20 w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ height: containerHeight }}
        onClick={openPreview}
        aria-label={`Open ${block.name} preview`}
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
          {block.preview()}
        </div>
      </button>
      <div className="flex items-center gap-3 border-t px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{block.name}</p>
          <p className="truncate text-xs text-muted-foreground">{block.description}</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="shrink-0 gap-1.5 text-xs"
          onClick={() => copyToClipboard(block.code, block.id)}
        >
          {isCopied(block.id) ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          {isCopied(block.id) ? "Copied!" : "Copy code"}
        </Button>
      </div>
    </div>
  );
}

// ─── BlockPreviewPage (rendered in new tab at #block-preview-{id}) ────────────

export function BlockPreviewPage({ id }: { id: string }) {
  const block = BLOCKS.find((b) => b.id === id);

  if (!block) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Block not found: {id}</p>
      </div>
    );
  }

  return (
    <div className="relative bg-background">
      {/* Floating toolbar */}
      <div className="fixed bottom-3 right-4 z-50 flex items-center gap-2 rounded-lg border bg-background/80 px-3 py-1.5 shadow-md backdrop-blur-sm">
        <span className="text-xs font-medium text-muted-foreground">{block.name}</span>
        <Separator orientation="vertical" />
        <ThemeToggle />
      </div>
      {/* Full preview */}
      {block.preview(true)}
    </div>
  );
}

// ─── BlocksPage ───────────────────────────────────────────────────────────────

const CATEGORIES: BlockCategory[] = ["All", "Sidebar", "Authentication", "Dashboard"];

export function BlocksPage() {
  const { setActiveComponent } = useNavigation();
  const [activeCategory, setActiveCategory] = useState<BlockCategory>("All");

  const filtered =
    activeCategory === "All"
      ? BLOCKS
      : BLOCKS.filter((b) => b.category === activeCategory);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top navbar */}
      <header className="flex h-14 shrink-0 items-center gap-4 border-b px-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="inline-flex cursor-pointer items-center gap-1"
                onClick={() => setActiveComponent("get-started")}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Care UI
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Blocks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

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
              <BlockThumbnail key={block.id} block={block} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
