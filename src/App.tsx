import { AppSidebar } from "@/components/app-sidebar";
import { DynamicMainContent } from "@/components/dynamic-main-content";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavigationProvider } from "@/contexts/navigation-context";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <NavigationProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-16"
              />
              <DynamicBreadcrumb />
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </header>
            <div
              id="main-content-scroll"
              className="flex flex-1 flex-col gap-4 overflow-y-auto p-4"
            >
              <DynamicMainContent />
            </div>
          </SidebarInset>
          <Toaster />
        </SidebarProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}
