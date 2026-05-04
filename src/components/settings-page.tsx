import { Monitor, Moon, Sun, Eye, Contrast } from "lucide-react";
import { useTheme, type Theme } from "@/components/theme-provider";
import { useFontSize, type FontSize } from "@/components/font-size-provider";
import { useContrast } from "@/components/contrast-provider";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

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

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();
  const { highContrast, setHighContrast } = useContrast();

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl space-y-10 p-4 md:p-8">
        {/* Page header */}
        <div>
          <h1 className="text-foreground text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2 text-base">
            Manage your display preferences.
          </p>
        </div>

        {/* Appearance section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-foreground text-xl font-semibold">Appearance</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Customize how the app looks and feels.
            </p>
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
                      "flex cursor-pointer flex-col gap-2 rounded-lg border p-3 text-left transition-all",
                      isActive
                        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
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
                      "flex cursor-pointer flex-col gap-2 rounded-lg border p-3 text-left transition-all",
                      isActive
                        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
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
                      <p className="text-xs font-medium text-foreground">
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

          <Separator />

          {/* High contrast */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Contrast className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Increase contrast</p>
                <p className="text-sm text-muted-foreground">
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
                      "flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 transition-all",
                      isActive
                        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                        : "border-border hover:border-strong-border hover:bg-muted/50"
                    )}
                  >
                    <span
                      className={cn(
                        "font-semibold leading-none",
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
