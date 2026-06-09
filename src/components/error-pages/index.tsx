import { ArrowUpRight } from "lucide-react";

import { useNavigation } from "@/contexts/navigation-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lead, Muted, PageTitle } from "@/components/ui/typography";

import { ERROR_PAGES, getErrorPageById, type ErrorPageDef } from "./registry";

/**
 * Error Pages overview — rendered inside the regular sidebar shell.
 *
 * Each card is a thumbnail of the live page, scaled down. Clicking the card
 * navigates to the full-screen preview so the page can be experienced exactly
 * as it would render in production.
 */
export function ErrorPagesPage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-5xl space-y-8 p-4 md:p-8">
        <header>
          <PageTitle>Error Pages</PageTitle>
          <Lead className="mt-2">
            Full-screen error and edge-case states for Care apps. These pages
            are not installable components — copy the file directly into your
            project and adapt the copy and actions to your context.
          </Lead>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ERROR_PAGES.map((page) => (
            <ErrorPageCard key={page.id} page={page} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ErrorPageCard({ page }: { page: ErrorPageDef }) {
  const { setActiveComponent } = useNavigation();
  const Preview = page.component;
  const scale = 0.32;
  const containerHeight = 220;

  return (
    <div className="border-border bg-card group flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
      <div
        role="button"
        tabIndex={0}
        className="bg-muted/20 focus-visible:ring-ring relative w-full cursor-pointer overflow-hidden focus-visible:ring-2 focus-visible:outline-none"
        style={{ height: containerHeight }}
        onClick={() => setActiveComponent(page.id)}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && setActiveComponent(page.id)
        }
        aria-label={`Open ${page.title} preview`}
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
          <Preview />
        </div>
      </div>
      <div className="border-border/60 flex items-start gap-3 border-t px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium">{page.title}</p>
            {page.status && (
              <Badge variant="neutral" size="xs" className="font-mono">
                {page.status}
              </Badge>
            )}
          </div>
          <Muted className="mt-0.5 line-clamp-2 text-xs">
            {page.description}
          </Muted>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="shrink-0 gap-1.5 text-xs"
          onClick={() => setActiveComponent(page.id)}
        >
          Open
          <ArrowUpRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

/**
 * Full-screen preview of a single error page. Renders without the docs sidebar
 * so the page is shown exactly as it would appear in production.
 */
export function ErrorPagePreview({ id }: { id: string }) {
  const { setActiveComponent } = useNavigation();
  const page = getErrorPageById(id);

  if (
    typeof window !== "undefined" &&
    typeof window.__removeLoadingScreen === "function"
  ) {
    window.__removeLoadingScreen();
  }

  if (!page) {
    return (
      <div className="bg-background text-muted-foreground flex h-screen items-center justify-center">
        <p>Error page not found: {id}</p>
      </div>
    );
  }

  const Page = page.component;

  return (
    <div className="bg-background relative">
      <div className="bg-background/80 fixed bottom-3 right-3 z-50 flex items-center gap-2 rounded-lg border px-3 py-1.5 shadow-md backdrop-blur-sm">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 gap-1.5 px-2 text-xs"
          onClick={() => setActiveComponent("error-pages")}
          aria-label="Back to error pages"
        >
          <span aria-hidden>←</span>
          Error pages
        </Button>
        <span className="text-muted-foreground text-xs font-medium">
          {page.title}
        </span>
      </div>
      <Page />
    </div>
  );
}
