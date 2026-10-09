export const STAFF_SIGN_IN_01_CODE = `import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PixelCanvas } from "@/components/blocks/pixel-canvas"

export function StaffSignInPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [status, setStatus] = React.useState("")

  return (
    <div className="flex min-h-screen flex-col bg-primary px-0.5 pt-0.5 pb-2">
      <main className="relative isolate flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border-2 border-primary bg-background p-4">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle,var(--color-primary)_1px,transparent_1px)] [background-size:16px_16px]" />
      <PixelCanvas className="absolute inset-0 z-0 opacity-35" />
      <section aria-labelledby="staff-sign-in-title" className="relative z-10 w-full max-w-xs rounded-2xl border border-border bg-card p-4 shadow-lg ring-1 ring-foreground/5">
        <header className="space-y-1.5">
          <h1 id="staff-sign-in-title" className="text-base font-semibold">Staff sign-in</h1>
          <p className="text-muted-foreground text-xs leading-4">
            For doctors, nurses and hospital staff. Use the username and
            password from your facility.
          </p>
        </header>

        <form
          className="mt-3 space-y-3"
          onSubmit={(event) => {
            event.preventDefault()
            setStatus("Sign-in preview only.")
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="username" className="text-xs font-semibold">
              Username
            </Label>
            <Input id="username" name="username" type="text" autoComplete="username" autoFocus placeholder="Enter username" className="h-8 text-xs" required />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="password" className="text-xs font-semibold">
                Password
              </Label>
              <button type="button" className="text-xs font-medium underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" onClick={() => setStatus("Contact your facility administrator to reset your password.")}>
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                defaultValue="password"
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
                {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="h-8 w-full text-xs">
            Sign In
          </Button>
        </form>
        <p className={status ? "text-muted-foreground mt-3 text-xs" : "sr-only"} role="status" aria-live="polite">
          {status}
        </p>
      </section>
      </main>
    </div>
  )
}`;
