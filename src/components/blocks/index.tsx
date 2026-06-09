import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronLeft, Code } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigation } from "@/contexts/navigation-context";
import { BLOCKS, type BlockCategory, type BlockDef } from "./registry";

// ─── BlockThumbnail ───────────────────────────────────────────────────────────

function BlockThumbnail({ block }: { block: BlockDef }) {
  const scale = block.scale ?? 0.5;
  const containerHeight = Math.round(480 * scale + 10);
  const { setActiveComponent } = useNavigation();

  function openPreview() {
    setActiveComponent("block-preview-" + block.id);
  }

  function openCode() {
    const base = window.location.pathname + window.location.search;
    window.open(
      base + "#block-code-" + block.id,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="group bg-card flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
      <div
        role="button"
        tabIndex={0}
        className="bg-muted/20 focus-visible:ring-ring relative w-full cursor-pointer overflow-hidden focus-visible:ring-2 focus-visible:outline-none"
        style={{ height: containerHeight }}
        onClick={openPreview}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openPreview()}
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
      </div>
      <div className="flex items-center gap-3 border-t px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{block.name}</p>
          <p className="text-muted-foreground truncate text-xs">
            {block.description}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="shrink-0 gap-1.5 text-xs"
          onClick={openCode}
        >
          <Code className="h-3 w-3" />
          See code
        </Button>
      </div>
    </div>
  );
}

// ─── BlockCodePage (rendered in new tab at #block-code-{id}) ─────────────────

export function BlockCodePage({ id }: { id: string }) {
  const block = BLOCKS.find((b) => b.id === id);
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  if (typeof window.__removeLoadingScreen === "function") {
    window.__removeLoadingScreen();
  }

  if (!block) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Block not found: {id}</p>
      </div>
    );
  }

  return (
    <div className="bg-background flex h-screen flex-col">
      <header className="flex h-12 shrink-0 items-center gap-3 border-b px-4">
        <span className="text-sm font-medium">{block.name}</span>
        <span className="text-muted-foreground text-xs">
          {block.description}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs"
            onClick={() => copyToClipboard(block.code, block.id)}
          >
            {isCopied(block.id) ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {isCopied(block.id) ? "Copied!" : "Copy"}
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-auto">
        <pre className="bg-muted/30 min-h-full p-6 text-sm leading-relaxed">
          <code>{block.code}</code>
        </pre>
      </div>
    </div>
  );
}

// ─── BlockPreviewPage (rendered in new tab at #block-preview-{id}) ────────────

export function BlockPreviewPage({ id }: { id: string }) {
  const block = BLOCKS.find((b) => b.id === id);
  const { setActiveComponent } = useNavigation();

  if (typeof window.__removeLoadingScreen === "function") {
    window.__removeLoadingScreen();
  }

  if (!block) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Block not found: {id}</p>
      </div>
    );
  }

  return (
    <div className="bg-background relative">
      {/* Floating toolbar */}
      <div className="bg-background/80 fixed right-4 bottom-3 z-50 flex items-center gap-2 rounded-lg border px-3 py-1.5 shadow-md backdrop-blur-sm">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 gap-1.5 px-2 text-xs"
          onClick={() => setActiveComponent("blocks")}
          aria-label="Back to blocks"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Blocks
        </Button>
        <Separator orientation="vertical" />
        <span className="text-muted-foreground text-xs font-medium">
          {block.name}
        </span>
        <Separator orientation="vertical" />
        <ThemeToggle />
      </div>
      {/* Full preview */}
      {block.preview(true)}
    </div>
  );
}

// ─── BlocksPage ───────────────────────────────────────────────────────────────

const CATEGORIES: BlockCategory[] = [
  "All",
  "Sidebar",
  "Authentication",
  "Dashboard",
  "Display",
];

export function BlocksPage() {
  const [activeCategory, setActiveCategory] = useState<BlockCategory>("All");

  const filtered =
    activeCategory === "All"
      ? BLOCKS
      : BLOCKS.filter((b) => b.category === activeCategory);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl space-y-8 p-4 md:p-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Building Blocks for the Web
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Clean, modern building blocks. Copy and paste into your apps. Works
            with all React frameworks. Open Source. Free forever.
          </p>
        </header>
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
          <span className="text-muted-foreground ml-auto text-xs">
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
  );
}
