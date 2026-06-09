import { ArrowLeft, RotateCw, WifiOff } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function LoadFailedErrorPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <div className="bg-muted text-muted-foreground mx-auto flex size-14 items-center justify-center rounded-full">
          <WifiOff className="size-6" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          We couldn&rsquo;t load this page
        </h1>
        <p className="text-muted-foreground mt-3 text-sm leading-6 text-balance">
          Something went wrong while reaching our servers. This is usually a
          temporary network issue. Please try again, or come back in a minute.
        </p>

        <div className="border-border/60 bg-card text-muted-foreground mt-8 rounded-lg border px-4 py-3 text-left font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-foreground/80">Request ID</span>
            <span>req_8f3c2d1a</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-foreground/80">Status</span>
            <span>Network error</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto">
            <RotateCw data-icon="inline-start" />
            Try again
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            <ArrowLeft data-icon="inline-start" />
            Go back
          </Button>
        </div>

        <p className="text-muted-foreground mt-8 text-xs">
          If this keeps happening, share the request ID with{" "}
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
