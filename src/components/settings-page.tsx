import React, { useState } from "react";
import {
  Monitor,
  Moon,
  Sun,
  Eye,
  Contrast,
  Zap,
  Sparkles,
  Layers,
  Sliders,
} from "lucide-react";
import { useTheme, type Theme } from "@/components/theme-provider";
import { useFontSize, type FontSize } from "@/components/font-size-provider";
import { useContrast } from "@/components/contrast-provider";
import { useMotion, type MotionPreference } from "@/components/motion-provider";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import {
  PageTitle,
  SubsectionTitle,
  Lead,
  Muted,
} from "@/components/ui/typography";

const themeOptions: {
  value: Theme;
  label: string;
  description: string;
  icon: React.ElementType;
  preview: React.ReactNode;
}[] = [
  {
    value: "light",
    label: "Light",
    description: "Clean white background",
    icon: Sun,
    preview: (
      <div className="h-10 w-full rounded-md border border-neutral-200 bg-white shadow-sm">
        <div className="flex h-full items-start gap-1.5 p-1.5">
          <div className="h-full w-2/5 rounded bg-neutral-100" />
          <div className="flex h-full flex-1 flex-col gap-1">
            <div className="h-1.5 w-full rounded bg-neutral-200" />
            <div className="h-1.5 w-4/5 rounded bg-neutral-200" />
            <div className="mt-auto h-2 w-1/2 rounded bg-emerald-400" />
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    description: "Easy on the eyes",
    icon: Moon,
    preview: (
      <div className="h-10 w-full rounded-md border border-neutral-700 bg-neutral-900 shadow-sm">
        <div className="flex h-full items-start gap-1.5 p-1.5">
          <div className="h-full w-2/5 rounded bg-neutral-800" />
          <div className="flex h-full flex-1 flex-col gap-1">
            <div className="h-1.5 w-full rounded bg-neutral-700" />
            <div className="h-1.5 w-4/5 rounded bg-neutral-700" />
            <div className="mt-auto h-2 w-1/2 rounded bg-emerald-600" />
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "system",
    label: "System",
    description: "Follows your OS preference",
    icon: Monitor,
    preview: (
      <div className="h-10 w-full overflow-hidden rounded-md border border-neutral-300 shadow-sm">
        <div className="flex h-full">
          <div className="flex w-1/2 items-start gap-1 bg-white p-1.5">
            <div className="h-full w-2/5 rounded bg-neutral-100" />
            <div className="flex h-full flex-1 flex-col gap-1">
              <div className="h-1.5 w-full rounded bg-neutral-200" />
              <div className="mt-auto h-2 w-1/2 rounded bg-emerald-400" />
            </div>
          </div>
          <div className="flex w-1/2 items-start gap-1 bg-neutral-900 p-1.5">
            <div className="h-full w-2/5 rounded bg-neutral-800" />
            <div className="flex h-full flex-1 flex-col gap-1">
              <div className="h-1.5 w-full rounded bg-neutral-700" />
              <div className="mt-auto h-2 w-1/2 rounded bg-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const a11yThemeOptions: {
  value: Theme;
  label: string;
  description: string;
  subtext: string;
  icon: React.ElementType;
  preview: React.ReactNode;
}[] = [
  {
    value: "light-protanopia",
    label: "Light",
    description: "Protanopia & Deuteranopia",
    subtext: "Difficulty distinguishing reds & greens",
    icon: Eye,
    preview: (
      <div className="h-10 w-full rounded-md border border-neutral-200 bg-white shadow-sm">
        <div className="flex h-full items-start gap-1.5 p-1.5">
          <div className="h-full w-2/5 rounded bg-neutral-100" />
          <div className="flex h-full flex-1 flex-col gap-1">
            <div className="h-1.5 w-full rounded bg-neutral-200" />
            <div className="h-1.5 w-4/5 rounded bg-neutral-200" />
            <div className="mt-auto h-2 w-1/2 rounded bg-blue-500" />
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "dark-protanopia",
    label: "Dark",
    description: "Protanopia & Deuteranopia",
    subtext: "Difficulty distinguishing reds & greens",
    icon: Eye,
    preview: (
      <div className="h-10 w-full rounded-md border border-neutral-700 bg-neutral-900 shadow-sm">
        <div className="flex h-full items-start gap-1.5 p-1.5">
          <div className="h-full w-2/5 rounded bg-neutral-800" />
          <div className="flex h-full flex-1 flex-col gap-1">
            <div className="h-1.5 w-full rounded bg-neutral-700" />
            <div className="h-1.5 w-4/5 rounded bg-neutral-700" />
            <div className="mt-auto h-2 w-1/2 rounded bg-blue-400" />
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "light-tritanopia",
    label: "Light",
    description: "Tritanopia",
    subtext: "Difficulty distinguishing blues & greens",
    icon: Eye,
    preview: (
      <div className="h-10 w-full rounded-md border border-neutral-200 bg-white shadow-sm">
        <div className="flex h-full items-start gap-1.5 p-1.5">
          <div className="h-full w-2/5 rounded bg-neutral-100" />
          <div className="flex h-full flex-1 flex-col gap-1">
            <div className="h-1.5 w-full rounded bg-neutral-200" />
            <div className="h-1.5 w-4/5 rounded bg-neutral-200" />
            <div className="mt-auto h-2 w-1/2 rounded bg-rose-600" />
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "dark-tritanopia",
    label: "Dark",
    description: "Tritanopia",
    subtext: "Difficulty distinguishing blues & greens",
    icon: Eye,
    preview: (
      <div className="h-10 w-full rounded-md border border-neutral-700 bg-neutral-900 shadow-sm">
        <div className="flex h-full items-start gap-1.5 p-1.5">
          <div className="h-full w-2/5 rounded bg-neutral-800" />
          <div className="flex h-full flex-1 flex-col gap-1">
            <div className="h-1.5 w-full rounded bg-neutral-700" />
            <div className="h-1.5 w-4/5 rounded bg-neutral-700" />
            <div className="mt-auto h-2 w-1/2 rounded bg-rose-400" />
          </div>
        </div>
      </div>
    ),
  },
];

const motionOptions: {
  value: MotionPreference;
  label: string;
  badge?: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    value: "system",
    label: "Use system preference",
    badge: "Recommended",
    description: "Follows your device setting automatically",
    icon: Monitor,
  },
  {
    value: "reduce",
    label: "Reduce motion",
    description: "Subtle fades, no movement or scaling",
    icon: Sparkles,
  },
  {
    value: "allow",
    label: "Allow motion",
    description: "Full animation & transition experience",
    icon: Zap,
  },
];

const fontSizeOptions: {
  value: FontSize;
  label: string;
  description: string;
  sampleSize: string;
}[] = [
  {
    value: "small",
    label: "Small",
    description: "14px",
    sampleSize: "text-sm",
  },
  {
    value: "default",
    label: "Default",
    description: "16px",
    sampleSize: "text-base",
  },
  {
    value: "large",
    label: "Large",
    description: "18px",
    sampleSize: "text-lg",
  },
  {
    value: "larger",
    label: "Larger",
    description: "20px",
    sampleSize: "text-xl",
  },
];

function MotionPreviewSection({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="border-border bg-soft-background rounded-lg border p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-foreground text-xs font-semibold tracking-wider uppercase">
            Live Component Previews
          </span>
          <p className="text-muted-foreground text-xs">
            {reducedMotion
              ? "All surfaces open with in-place opacity fades (no movement, zoom, or parallax)."
              : "All surfaces open with spring-modeled entry and subtle scaling."}
          </p>
        </div>
      </div>

      <div className="border-border/80 bg-background/60 mt-4 flex flex-wrap items-center justify-center gap-3 rounded-md border border-dashed p-6">
        {/* Real Dialog component */}
        <Dialog>
          <DialogTrigger
            render={
              <Button
                variant="secondary"
                size="sm"
                className="cursor-pointer transition-transform duration-150 active:scale-[0.97]"
              >
                <Layers className="size-4" />
                Open sample dialog
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Accessible Dialog</DialogTitle>
              <DialogDescription>
                {reducedMotion
                  ? "This dialog entered with an in-place opacity fade, eliminating spatial motion and zoom scaling."
                  : "This dialog entered with standard scaling (zoom-in-95) and physics easing."}
              </DialogDescription>
            </DialogHeader>
            <div className="bg-muted/40 text-muted-foreground border-border rounded-md border p-3 text-xs leading-relaxed">
              <strong>Active Motion State:</strong>{" "}
              {reducedMotion
                ? "Reduced motion active — zero spatial displacement."
                : "Full motion active — natural scale and transform enabled."}
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="primary">Got it</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Real Popover component */}
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer transition-transform duration-150 active:scale-[0.97]"
              >
                <Sliders className="size-4" />
                Open sample popover
              </Button>
            }
          />
          <PopoverContent side="top" align="center">
            <PopoverHeader>
              <PopoverTitle>Origin-Aware Popover</PopoverTitle>
              <PopoverDescription>
                {reducedMotion
                  ? "Appears in-place with zero translation offset."
                  : "Scales gracefully from its anchor trigger button."}
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();
  const { highContrast, setHighContrast } = useContrast();
  const {
    motionPreference,
    setMotionPreference,
    reducedMotion,
    systemPrefersReduced,
  } = useMotion();

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl space-y-10 p-4 md:p-8">
        {/* Page header */}
        <div>
          <PageTitle>Settings</PageTitle>
          <Lead className="mt-2">
            Manage your display and accessibility preferences.
          </Lead>
        </div>

        {/* Appearance section */}
        <section className="space-y-6">
          <div>
            <SubsectionTitle>Appearance</SubsectionTitle>
            <Muted className="mt-1">
              Customize color schemes and visual aesthetics.
            </Muted>
          </div>

          <Separator />

          {/* Theme */}
          <div className="space-y-3">
            <div>
              <h3 className="text-foreground text-sm font-medium">Theme</h3>
              <p className="text-muted-foreground text-sm">
                Choose your preferred color scheme.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      "flex cursor-pointer flex-col gap-2 rounded-lg border p-3 text-left transition-all duration-150 active:scale-[0.98]",
                      isActive
                        ? "border-primary bg-primary/5 ring-primary/30 ring-2"
                        : "border-border hover:border-strong-border hover:bg-muted/50"
                    )}
                  >
                    {option.preview}
                    <div className="flex items-center gap-1.5">
                      <Icon
                        className={cn(
                          "size-3.5 shrink-0",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isActive ? "text-primary" : "text-foreground"
                        )}
                      >
                        {option.label}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Color-blind friendly themes */}
          <div className="space-y-3">
            <div>
              <h3 className="text-foreground text-sm font-medium">
                Color-blind Friendly
              </h3>
              <p className="text-muted-foreground text-sm">
                For people who find it difficult to distinguish between reds and
                greens (Protanopia &amp; Deuteranopia), or blues and greens
                (Tritanopia).
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {a11yThemeOptions.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      "flex cursor-pointer flex-col gap-2 rounded-lg border p-3 text-left transition-all duration-150 active:scale-[0.98]",
                      isActive
                        ? "border-primary bg-primary/5 ring-primary/30 ring-2"
                        : "border-border hover:border-strong-border hover:bg-muted/50"
                    )}
                  >
                    {option.preview}
                    <div className="flex items-center gap-1.5">
                      <Icon
                        className={cn(
                          "size-3.5 shrink-0",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isActive ? "text-primary" : "text-foreground"
                        )}
                      >
                        {option.label}
                      </span>
                    </div>
                    <div>
                      <p className="text-foreground text-xs font-medium">
                        {option.description}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {option.subtext}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Accessibility & Motion section */}
        <section className="space-y-6">
          <div>
            <SubsectionTitle>Accessibility &amp; Motion</SubsectionTitle>
            <Muted className="mt-1">
              Fine-tune contrast, font sizing, and motion behavior to suit your
              needs.
            </Muted>
          </div>

          <Separator />

          {/* Reduce Motion setting */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-foreground text-sm font-medium">
                  Reduce Motion
                </h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Reduce motion and animation that may cause discomfort or
                distraction. Your system preference is used by default.
              </p>
            </div>

            {/* Tri-state segmented control */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {motionOptions.map((option) => {
                const Icon = option.icon;
                const isActive = motionPreference === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMotionPreference(option.value)}
                    className={cn(
                      "flex cursor-pointer flex-col justify-between gap-3 rounded-lg border p-3.5 text-left transition-all duration-150 active:scale-[0.98]",
                      isActive
                        ? "border-primary bg-primary/5 ring-primary/30 ring-2"
                        : "border-border hover:border-strong-border hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={cn(
                          "flex size-7 items-center justify-center rounded-md transition-colors",
                          isActive
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                      </div>
                      {option.badge && (
                        <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px] font-medium">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isActive ? "text-primary" : "text-foreground"
                        )}
                      >
                        {option.label}
                      </p>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span
                className={cn(
                  "size-2 rounded-full",
                  reducedMotion ? "bg-amber-500" : "bg-emerald-500"
                )}
              />
              <span className="text-muted-foreground font-medium">
                {motionPreference === "system" ? (
                  <>
                    Following system preference —{" "}
                    <span className="text-foreground font-semibold">
                      {systemPrefersReduced
                        ? "Reduced motion enabled by OS"
                        : "Standard motion enabled by OS"}
                    </span>
                  </>
                ) : motionPreference === "reduce" ? (
                  <span className="text-foreground font-semibold">
                    Reduced motion enabled
                  </span>
                ) : (
                  <span className="text-foreground font-semibold">
                    Motion enabled
                  </span>
                )}
              </span>
            </div>

            {/* Interactive Preview */}
            <MotionPreviewSection reducedMotion={reducedMotion} />
          </div>

          <Separator />

          {/* High contrast */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Contrast className="text-muted-foreground mt-0.5 size-4 shrink-0" />
              <div>
                <p className="text-foreground text-sm font-medium">
                  Increase contrast
                </p>
                <p className="text-muted-foreground text-sm">
                  Enable high contrast for light or dark mode based on your
                  current theme.
                </p>
              </div>
            </div>
            <Switch
              checked={highContrast}
              onCheckedChange={setHighContrast}
              aria-label="Toggle high contrast"
            />
          </div>

          <Separator />

          {/* Font size */}
          <div className="space-y-3">
            <div>
              <h3 className="text-foreground text-sm font-medium">Font Size</h3>
              <p className="text-muted-foreground text-sm">
                Adjust the base font size across the entire app.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {fontSizeOptions.map((option) => {
                const isActive = fontSize === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFontSize(option.value)}
                    className={cn(
                      "flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 transition-all duration-150 active:scale-[0.98]",
                      isActive
                        ? "border-primary bg-primary/5 ring-primary/30 ring-2"
                        : "border-border hover:border-strong-border hover:bg-muted/50"
                    )}
                  >
                    <span
                      className={cn(
                        "leading-none font-semibold",
                        option.sampleSize,
                        isActive ? "text-primary" : "text-foreground"
                      )}
                    >
                      Aa
                    </span>
                    <div className="text-center">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isActive ? "text-primary" : "text-foreground"
                        )}
                      >
                        {option.label}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {option.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
