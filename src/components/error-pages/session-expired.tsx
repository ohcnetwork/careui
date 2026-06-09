import { LogIn, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SessionExpiredErrorPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
          <div className="border-border/60 flex items-center gap-3 border-b px-6 py-4">
            <ShieldCheck className="text-muted-foreground size-5" />
            <span className="text-sm font-medium">Secure session</span>
          </div>

          <div className="space-y-2 px-6 pt-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              Your session expired
            </h1>
            <p className="text-muted-foreground text-sm leading-6">
              You&rsquo;ve been signed out automatically after a period of
              inactivity. This protects patient data on shared workstations.
              Sign in again to pick up where you left off.
            </p>
          </div>

          <div className="text-muted-foreground bg-muted/40 border-border/60 mt-8 flex items-start gap-3 border-y px-6 py-4 text-xs leading-5">
            <span className="bg-foreground/70 mt-1.5 size-1.5 shrink-0 rounded-full" />
            <p>
              Any unsaved entries on the previous screen were not submitted. You
              may need to re-enter them after signing back in.
            </p>
          </div>

          <div className="flex flex-col gap-2 px-6 py-6">
            <Button size="lg" className="w-full">
              <LogIn data-icon="inline-start" />
              Sign in again
            </Button>
            <Button size="lg" variant="ghost" className="w-full">
              Return to home page
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-xs">
          Sessions time out after 30&nbsp;minutes of inactivity.
        </p>
      </div>
    </div>
  );
}
