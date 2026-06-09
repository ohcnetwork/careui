import { Compass, Globe, MonitorX } from "lucide-react";

import { Button } from "@/components/ui/button";

const SUPPORTED = [
  { name: "Chrome", version: "118+", icon: Globe },
  { name: "Edge", version: "118+", icon: Compass },
  { name: "Firefox", version: "115+", icon: Compass },
  { name: "Safari", version: "16+", icon: Compass },
];

export default function InvalidBrowserErrorPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg">
        <div className="bg-muted text-muted-foreground mx-auto flex size-14 items-center justify-center rounded-full">
          <MonitorX className="size-6" />
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            This browser isn&rsquo;t supported
          </h1>
          <p className="text-muted-foreground mt-3 text-sm leading-6 text-balance">
            Care relies on modern web standards to keep patient data fast and
            secure. Please switch to one of the browsers below to continue.
          </p>
        </div>

        <ul
          role="list"
          className="border-border bg-card bg-border mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border sm:grid-cols-4"
        >
          {SUPPORTED.map((b) => (
            <li
              key={b.name}
              className="bg-card flex flex-col items-center gap-2 px-4 py-5"
            >
              <b.icon className="text-muted-foreground size-6" />
              <div className="text-center">
                <div className="text-sm font-medium">{b.name}</div>
                <div className="text-muted-foreground text-xs">{b.version}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <a
              href="https://www.google.com/chrome/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Chrome
            </a>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Continue anyway
          </Button>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-xs leading-5">
          Continuing on an unsupported browser may cause some screens to render
          incorrectly or lose data.
        </p>
      </div>
    </div>
  );
}
