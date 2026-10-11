import * as React from "react";
import { ArrowRight, Check, Eye, EyeOff, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PixelCanvas } from "@/components/blocks/pixel-canvas";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { value: "en", label: "English", languageLabel: "Language" },
  { value: "ta", label: "தமிழ்", languageLabel: "மொழி" },
  { value: "ml", label: "മലയാളം", languageLabel: "ഭാഷ" },
  { value: "mr", label: "मराठी", languageLabel: "भाषा" },
  { value: "kn", label: "ಕನ್ನಡ", languageLabel: "ಭಾಷೆ" },
  { value: "hi", label: "हिन्दी", languageLabel: "भाषा" },
] as const;

export function StaffSignInDemo({ fullPage = false }: { fullPage?: boolean }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("password");
  const [status, setStatus] = React.useState("");
  const [language, setLanguage] = React.useState("en");
  const selectedLanguage =
    LANGUAGES.find((option) => option.value === language) ?? LANGUAGES[0];

  return (
    <div
      className={cn(
        "bg-primary flex flex-col rounded-t-2xl px-0.5 pt-0.5 pb-6",
        fullPage ? "min-h-dvh" : "min-h-180"
      )}
    >
      <main className="border-primary bg-background relative isolate flex flex-1 flex-col items-center overflow-hidden rounded-2xl border-2 px-4 pt-8 pb-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--color-primary)_1px,transparent_1px)] bg-size-[16px_16px] opacity-10"
        />
        <PixelCanvas variant="care" className="absolute inset-0 z-0" />
        <div className="relative z-10 flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-4">
          <section
            aria-labelledby="staff-sign-in-title"
            className="border-border bg-card ring-foreground/5 relative isolate w-full overflow-hidden rounded-2xl border shadow-lg ring-1"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 144 96"
              preserveAspectRatio="none"
              className="pointer-events-none absolute top-0 right-0 z-0 h-24 w-36 mask-[radial-gradient(ellipse_at_top_right,black_15%,transparent_85%)]"
            >
              <g fill="#a7f3d0" opacity="0.2">
                <rect x="12" y="0" width="11" height="11" rx="1.25" />
                <rect x="72" y="0" width="11" height="11" rx="1.25" />
                <rect x="120" y="12" width="11" height="11" rx="1.25" />
                <rect x="36" y="24" width="11" height="11" rx="1.25" />
                <rect x="84" y="24" width="11" height="11" rx="1.25" />
                <rect x="0" y="36" width="11" height="11" rx="1.25" />
                <rect x="60" y="36" width="11" height="11" rx="1.25" />
                <rect x="108" y="48" width="11" height="11" rx="1.25" />
                <rect x="24" y="60" width="11" height="11" rx="1.25" />
                <rect x="84" y="60" width="11" height="11" rx="1.25" />
                <rect x="132" y="72" width="11" height="11" rx="1.25" />
                <rect x="48" y="84" width="11" height="11" rx="1.25" />
              </g>
              <g fill="#10b981" opacity="0.1">
                <rect x="108" y="0" width="11" height="11" rx="1.25" />
                <rect x="24" y="12" width="11" height="11" rx="1.25" />
                <rect x="132" y="24" width="11" height="11" rx="1.25" />
                <rect x="96" y="36" width="11" height="11" rx="1.25" />
                <rect x="48" y="48" width="11" height="11" rx="1.25" />
                <rect x="120" y="60" width="11" height="11" rx="1.25" />
              </g>
              <g fill="#065f46" opacity="0.15">
                <rect x="132" y="0" width="11" height="11" rx="1.25" />
                <rect x="72" y="24" width="11" height="11" rx="1.25" />
                <rect x="108" y="72" width="11" height="11" rx="1.25" />
              </g>
            </svg>
            <div className="relative z-10 p-6">
              <img
                src="/brand-assets/uploads/Care-Logos/SVG/Care-logotype-on-light.svg"
                alt="Care"
                width={2000}
                height={520}
                className="h-auto w-28 dark:hidden"
              />
              <img
                src="/brand-assets/uploads/Care-Logos/SVG/Care-logotype-color-icon-on-dark.svg"
                alt=""
                aria-hidden="true"
                width={2000}
                height={520}
                className="hidden h-auto w-28 dark:block"
              />
              <header className="space-y-0.5 pt-6">
                <h1 id="staff-sign-in-title" className="text-xl font-semibold">
                  Staff sign-in
                </h1>
                <p className="text-muted-foreground text-sm leading-4">
                  Use the username and password from your facility.
                </p>
              </header>

              <form
                className="mt-4 grid gap-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  setStatus("Sign-in preview only.");
                }}
              >
                <Field>
                  <FieldLabel htmlFor="staff-username">Username</FieldLabel>
                  <Input
                    id="staff-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    autoFocus={fullPage}
                    placeholder="Enter username"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="staff-password">Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="staff-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        size="icon-xs"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword((visible) => !visible)}
                      >
                        {showPassword ? (
                          <EyeOff aria-hidden="true" />
                        ) : (
                          <Eye aria-hidden="true" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <div className="flex flex-col gap-4">
                  <Button type="submit">Sign In</Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      setStatus(
                        "Contact your facility administrator to reset your password."
                      )
                    }
                  >
                    Forgot password?
                  </Button>
                </div>
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
            </div>
            <Button
              type="button"
              variant="ghost"
              className="border-border bg-muted text-foreground hover:bg-strong-background hover:text-foreground dark:hover:bg-strong-background relative z-10 flex h-auto w-full justify-between gap-4 rounded-none rounded-t-none! border-0 border-t px-4 py-4 text-start whitespace-normal no-underline shadow-none inset-shadow-none not-in-data-[slot=button-group]:rounded-t-none! md:h-auto"
              onClick={() => setStatus("Patient sign-in preview only.")}
            >
              <span className="flex min-w-0 flex-col">
                <span className="text-base font-semibold">Patient sign in</span>
                <span className="text-sm font-normal">
                  Sign in with your mobile number
                </span>
              </span>
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </section>
        </div>
        <section
          aria-labelledby="sign-in-language-label"
          className="bg-muted-background/50 relative z-10 mt-5 flex w-auto max-w-xl flex-col flex-wrap items-center justify-center gap-2 rounded-sm p-4"
        >
          <div className="flex shrink-0 items-center gap-3">
            <h2
              id="sign-in-language-label"
              lang={selectedLanguage.value}
              className="flex items-center gap-1.5 text-sm font-normal"
            >
              <Globe
                aria-hidden="true"
                className="size-4 shrink-0"
                strokeWidth={1.5}
              />
              {selectedLanguage.languageLabel}
            </h2>
          </div>
          <div className="min-w-36 md:hidden">
            <Select
              value={language}
              onValueChange={(value) => {
                if (typeof value === "string") setLanguage(value);
              }}
            >
              <SelectTrigger
                aria-labelledby="sign-in-language-label"
                className="w-full"
              >
                <SelectValue lang={selectedLanguage.value}>
                  {selectedLanguage.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {LANGUAGES.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      lang={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <ToggleGroup
            aria-labelledby="sign-in-language-label"
            value={[language]}
            onValueChange={(values) => {
              const selected = values[0];
              if (typeof selected === "string") setLanguage(selected);
            }}
            spacing={1}
            size="default"
            className="hidden max-w-full flex-wrap justify-center md:flex"
          >
            {LANGUAGES.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                lang={option.value}
                className="aria-pressed:border-input border border-transparent underline underline-offset-4 aria-pressed:no-underline"
              >
                {language === option.value && <Check aria-hidden="true" />}
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </section>
        <footer className="text-muted-foreground relative z-10 mt-auto flex w-full max-w-xl flex-col items-center gap-5 pt-16 text-center text-sm leading-6">
          <p>
            <a
              href="https://ohc.network"
              className="focus-visible:outline-ring font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Open Healthcare Network (OHC)
            </a>{" "}
            is an open-source public utility built by a multidisciplinary
            community of innovators and volunteers.
            <br />
            OHC CARE is a{" "}
            <a
              href="https://www.digitalpublicgoods.net"
              className="focus-visible:outline-ring font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              United Nations-recognised Digital Public Good.
            </a>
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://ohc.network"
              className="focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <img
                src="/brand-assets/uploads/OHC-Logo/SVG/OHC-logotype-on-light-dualtone-gray.svg"
                alt="Open Healthcare Network"
                width={2000}
                height={620}
                loading="lazy"
                className="h-auto w-32 grayscale dark:invert"
              />
            </a>
            <Separator
              orientation="vertical"
              aria-hidden="true"
              className="h-10 data-vertical:self-center"
            />
            <a
              href="https://www.digitalpublicgoods.net"
              className="focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <img
                src="/DPG_logo.svg"
                alt="Digital Public Goods"
                width={90.9}
                height={69.1}
                loading="lazy"
                className="h-12 w-auto grayscale dark:brightness-0 dark:invert"
              />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
