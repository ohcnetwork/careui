import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DynamicMainContent } from "@/components/dynamic-main-content";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavigationProvider, useNavigation } from "@/contexts/navigation-context";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/studio-sidebar";
import { BlocksPage, BlockPreviewPage } from "@/components/blocks";

function AppShell() {
  const { activeComponent } = useNavigation();

  if (activeComponent === "blocks") {
    return <BlocksPage />;
  }

  if (activeComponent.startsWith("block-preview-")) {
    const id = activeComponent.slice("block-preview-".length);
    return <BlockPreviewPage id={id} />;
  }

  return (
    <SidebarProvider
      className="h-svh overflow-hidden"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="overflow-hidden">
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
          className="flex flex-1 flex-col gap-4 overflow-y-auto"
        >
          <DynamicMainContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Page() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <NavigationProvider>
        <AppShell />
      </NavigationProvider>
      <Toaster />
    </ThemeProvider>
  );
}
