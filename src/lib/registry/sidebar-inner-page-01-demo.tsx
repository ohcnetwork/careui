import React from "react";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronLeft,
  House,
  Settings2,
  Users,
  X,
} from "lucide-react";
import {
  usePinnableSidebar,
  SidebarToggleButton,
  InnerPageBackButton,
} from "./sidebar-shared";

// ─── Navigation data ──────────────────────────────────────────────────────────

const innerNavItems = [
  { title: "Overview", icon: House },
  { title: "Patients", icon: Users },
  { title: "Appointments", icon: CalendarDays },
  { title: "Encounters", icon: Activity },
  { title: "Settings", icon: Settings2 },
];

// ─── InnerSidebarContent ──────────────────────────────────────────────────────

function InnerSidebarContent({ pinned }: { pinned: boolean }) {
  const { isMobile, setOpenMobile } = useSidebar();
  const showHeader = pinned || isMobile;
  return (
    <>
      <SidebarHeader
        className={cn(
          "overflow-hidden border-b",
          showHeader ? "border-border min-h-12" : "max-h-0 py-0 border-transparent",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 px-2 transition-[opacity,transform] duration-150 ease-linear",
            showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground -ml-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setOpenMobile(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {innerNavItems.map((item, i) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={i === 0}
                  tooltip={item.title}
                  className="data-active:bg-strong-background data-active:text-foreground data-active:hover:bg-strong-background data-active:ring-stronger-border data-active:dark:ring-neutral-100/50 data-active:hover:text-foreground data-active:after:bg-neutral-500 data-active:dark:after:bg-neutral-300 data-[active=true]:font-medium"
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
}

// ─── InnerPageLayoutDemo ──────────────────────────────────────────────────────

export function InnerPageLayoutDemo({ fullPage = false }: { fullPage?: boolean }) {
  const {
    pinned,
    overlayOpen,
    overlayReady,
    pinningTransition,
    isOverlay,
    cancelClose,
    scheduleClose,
    handleToggleMouseEnter,
    handleSidebarProviderOpenChange,
    toggleSidebar,
  } = usePinnableSidebar();

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleSidebar]);

  return (
    <TooltipProvider>
      <div
        style={{
          height: fullPage ? "100vh" : "400px",
          transform: fullPage ? undefined : "translateZ(0)",
          overflow: "hidden",
        }}
        className={cn(
          !fullPage && "rounded-lg border",
          "**:data-[slot=sidebar-container]:h-full!",
          pinningTransition
            ? "**:data-[slot=sidebar-container]:transition-[left,right,width,top,height,box-shadow,background-color,border-radius]!"
            : "**:data-[slot=sidebar-container]:transition-[left,right,width]!",
          "**:data-[slot=sidebar-container]:duration-100!",
          "**:data-[slot=sidebar-gap]:duration-100!",
          isOverlay && "**:data-[slot=sidebar-gap]:w-0!",
          overlayReady && !pinned && [
            "**:data-[slot=sidebar-container]:top-12!",
            "**:data-[slot=sidebar-container]:h-[calc(100%-3rem)]!",
          ],
          isOverlay && [
            "**:data-[slot=sidebar-container]:bg-sidebar",
            "**:data-[slot=sidebar-container]:border-t",
            "**:data-[slot=sidebar-container]:rounded-r-md",
            "**:data-[slot=sidebar-container]:shadow-xl",
          ],
        )}
      >
        <SidebarProvider
          open={pinned || overlayOpen}
          onOpenChange={handleSidebarProviderOpenChange}
          className="min-h-0! h-full"
          style={{ "--sidebar-width": "14rem", height: "100%" } as React.CSSProperties}
        >
          <Sidebar
            variant="sidebar"
            collapsible="offcanvas"
            className={isOverlay ? "border-r!" : undefined}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <InnerSidebarContent pinned={pinned} />
          </Sidebar>

          <SidebarInset className="overflow-hidden">
            <header className="flex h-12 shrink-0 items-center gap-3 border-b bg-background px-4">
              <SidebarToggleButton
                onDesktopToggle={toggleSidebar}
                onMouseEnter={handleToggleMouseEnter}
                onMouseLeave={scheduleClose}
              />
              <InnerPageBackButton pinned={pinned} />
              <Separator orientation="vertical" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="sm:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon-sm" variant="ghost">
                          <BreadcrumbEllipsis />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>Encounters</DropdownMenuItem>
                        <DropdownMenuItem>Patients</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="sm:hidden" />
                  <BreadcrumbItem className="hidden sm:flex">
                    <BreadcrumbLink>Encounters</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden sm:flex" />
                  <BreadcrumbItem className="hidden sm:flex">
                    <BreadcrumbLink>Patients</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden sm:flex" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>John Doe</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="icon-sm">
                  <Bell className="h-3.5 w-3.5" />
                  <span className="sr-only">Alerts</span>
                </Button>
              </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              {/* Patient summary card */}
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-24 rounded-xl bg-muted/50" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  );
}
