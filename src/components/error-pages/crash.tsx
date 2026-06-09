import { ArrowLeft, Bug, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CrashErrorPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg">
        <div className="text-destructive bg-destructive/10 mx-auto flex size-14 items-center justify-center rounded-full">
          <Bug className="size-6" />
        </div>

        <div className="mt-6 text-center">
          <div className="text-muted-foreground/70 font-mono text-xs tracking-widest uppercase">
            Unexpected error
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Something went wrong on our end
          </h1>
          <p className="text-muted-foreground mt-3 text-sm leading-6 text-balance">
            The page hit an error it couldn&rsquo;t recover from. Our team has
            been notified automatically. You can retry, or head back and try a
            different action.
          </p>
        </div>

        <details className="border-border bg-muted/30 group mt-8 rounded-lg border text-sm">
          <summary className="text-muted-foreground hover:text-foreground flex cursor-pointer list-none items-center justify-between px-4 py-3 font-medium select-none">
            <span>Technical details</span>
            <span className="text-muted-foreground text-xs group-open:hidden">
              Show
            </span>
            <span className="text-muted-foreground hidden text-xs group-open:inline">
              Hide
            </span>
          </summary>
          <div className="border-border/60 text-muted-foreground border-t px-4 py-3 font-mono text-xs leading-5">
            <div>TypeError: Cannot read properties of undefined</div>
            <div className="mt-1">at PatientChart.render (chart.tsx:142)</div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-foreground/80">Trace ID</span>
              <span>tr_4d09a1b6e2</span>
            </div>
          </div>
        </details>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto">
            <RotateCw data-icon="inline-start" />
            Reload page
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            <ArrowLeft data-icon="inline-start" />
            Go back
          </Button>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-xs">
          If this keeps happening, share the trace ID with{" "}
          <a
            href="#"
            className="text-foreground underline-offset-4 hover:underline"
          >
            support
          </a>
          .
        </p>
      </div>
    </div>
  );
}
