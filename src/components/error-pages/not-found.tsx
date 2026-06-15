import { ArrowLeft, LifeBuoy } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFoundErrorPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col">
      <header className="flex shrink-0 items-center justify-center p-4">
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
        <div className="w-full max-w-xl text-center">
          <img
            src="/error-pages/404.webp"
            alt=""
            aria-hidden="true"
            className="mx-auto mb-8 w-full max-w-xl rounded-2xl"
          />
          <div className="text-muted-foreground/70 font-mono text-sm tracking-widest uppercase">
            Error 404
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            We couldn&rsquo;t find that page!
          </h1>
          <p className="text-muted-foreground mt-2 text-base leading-7 text-balance">
            We searched every vein, but couldn't find the page you're looking for.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button className="w-full sm:w-auto">
              <ArrowLeft data-icon="inline-start" />
              Back to Home
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
