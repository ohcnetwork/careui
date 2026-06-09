import { ArrowLeft, Compass, LifeBuoy } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFoundErrorPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col">
      <header className="border-border/60 flex h-14 shrink-0 items-center justify-center border-b px-6">
        <img
          src="/Care-logo-in-light.svg"
          alt="Care"
          className="block h-12 w-auto dark:hidden"
        />
        <img
          src="/Care-logo-in-dark.svg"
          alt="Care"
          className="hidden h-12 w-auto dark:block"
        />
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md text-center">
          <div className="text-muted-foreground/70 font-mono text-sm tracking-widest uppercase">
            Error 404
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            We couldn&rsquo;t find that page
          </h1>
          <p className="text-muted-foreground mt-4 text-base leading-7 text-balance">
            The link you followed may be broken, or the page may have moved.
            Check the URL, or head back to your dashboard.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto">
              <ArrowLeft data-icon="inline-start" />
              Back to dashboard
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Compass data-icon="inline-start" />
              Search patients
            </Button>
          </div>

          <p className="text-muted-foreground mt-10 inline-flex items-center gap-1.5 text-sm">
            <LifeBuoy className="size-4" />
            Still stuck?{" "}
            <a
              href="#"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
