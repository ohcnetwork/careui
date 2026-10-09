import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PixelCanvas } from "@/components/blocks/pixel-canvas";

export function StaffSignInDemo({ fullPage = false }: { fullPage?: boolean }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("password");
  const [status, setStatus] = React.useState("");

  return (
    <div
      className="bg-primary flex flex-col rounded-t-2xl px-0.5 pt-0.5 pb-6"
      style={{ height: fullPage ? "100dvh" : "480px" }}
    >
      <main className="border-primary bg-background relative isolate flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border-2 p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,var(--color-primary)_1px,transparent_1px)] [background-size:16px_16px] opacity-10"
        />
        <PixelCanvas className="absolute inset-0 z-0 opacity-35" />
        <section
          aria-labelledby="staff-sign-in-title"
          className="border-border bg-card ring-foreground/5 relative z-10 w-full max-w-xs rounded-2xl border p-4 shadow-lg ring-1"
        >
          <header className="space-y-1.5">
            <h1 id="staff-sign-in-title" className="text-base font-semibold">
              Staff sign-in
            </h1>
            <p className="text-muted-foreground text-xs leading-4">
              For doctors, nurses and hospital staff. Use the username and
              password from your facility.
            </p>
          </header>

          <form
            className="mt-3 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              setStatus("Sign-in preview only.");
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="staff-username" className="text-xs font-semibold">
                Username
              </Label>
              <Input
                id="staff-username"
                name="username"
                type="text"
                autoComplete="username"
                autoFocus={fullPage}
                placeholder="Enter username"
                className="h-8 text-xs"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <Label
                  htmlFor="staff-password"
                  className="text-xs font-semibold"
                >
                  Password
                </Label>
                <button
                  type="button"
                  className="focus-visible:outline-ring text-xs font-medium underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={() =>
                    setStatus(
                      "Contact your facility administrator to reset your password."
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="staff-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-8 pr-10 text-xs"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute end-0.5 top-1/2 size-7 -translate-y-1/2"
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" />
                  ) : (
                    <Eye aria-hidden="true" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="h-8 w-full text-xs">
              Sign In
            </Button>
          </form>

          <p
            className={
              status ? "text-muted-foreground mt-3 text-xs" : "sr-only"
            }
            role="status"
            aria-live="polite"
          >
            {status}
          </p>
        </section>
      </main>
    </div>
  );
}
