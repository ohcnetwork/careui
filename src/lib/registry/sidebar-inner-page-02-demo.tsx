import React from "react";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronsUpDown,
  ClipboardList,
  Clock,
  Package,
  Syringe,
  Users,
  X,
} from "lucide-react";
import {
  usePinnableSidebar,
  SidebarToggleButton,
  InnerPageBackButton,
} from "./sidebar-shared";
import { prepareWithSegments, measureNaturalWidth } from "@chenglou/pretext";

// ─── truncateMiddle ───────────────────────────────────────────────────────────

function truncateMiddle(text: string, font: string, maxWidth: number): string {
  const measure = (t: string) =>
    t ? measureNaturalWidth(prepareWithSegments(t, font)) : 0;
  if (measure(text) <= maxWidth) return text;
  const ELLIPSIS = "\u2026";
  const ellipsisW = measure(ELLIPSIS);
  const available = maxWidth - ellipsisW;
  if (available <= 0) return ELLIPSIS;
  let lo = 0;
  let hi = Math.floor(text.length / 2);
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (measure(text.slice(0, mid) + text.slice(text.length - mid)) <= available) {
      lo = mid;
    } else {
      hi = mid - 1;
    }
  }
  return text.slice(0, lo) + ELLIPSIS + text.slice(text.length - lo);
}

// ─── Navigation data ──────────────────────────────────────────────────────────

const innerPage02Locations = [
  "Pharmacy - Ground Floor",
  "ICU - Floor 2",
  "OPD - Block A",
  "Ward B",
];

const innerPage02PharmacyItems: { title: string; icon: React.ElementType; isActive?: boolean }[] = [
  { title: "Prescription Queue", icon: ClipboardList, isActive: true },
  { title: "Dispense Medicine", icon: Syringe },
  { title: "Inventory", icon: Package },
] as { title: string; icon: React.ElementType; isActive?: boolean }[];

const innerPage02PatientItems: { title: string; icon: React.ElementType }[] = [
  { title: "Schedule", icon: Clock },
  { title: "Appointments", icon: CalendarDays },
  { title: "Queues", icon: Users },
] as const;

// ─── InnerPage02LocationSelector ─────────────────────────────────────────────

function InnerPage02LocationSelector({
  onOpenChange,
}: {
  onOpenChange?: (open: boolean) => void;
}) {
  const [selected, setSelected] = React.useState(innerPage02Locations[0]);
  const labelRef = React.useRef<HTMLParagraphElement>(null);
  const [displayName, setDisplayName] = React.useState(selected);

  React.useEffect(() => {
    const el = labelRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (w === 0) return;
      setDisplayName(truncateMiddle(selected, getComputedStyle(el).font, w));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [selected]);

  const isTruncated = displayName !== selected;

  return (
    <Tooltip>
      <DropdownMenu onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center justify-between rounded-lg border border-strong-border bg-background px-3 py-2.5 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Chosen Location
                </p>
                <p
                  ref={labelRef}
                  className="text-sm font-semibold overflow-hidden whitespace-nowrap"
                >
                  {displayName}
                </p>
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        {isTruncated && (
          <TooltipContent side="bottom">{selected}</TooltipContent>
        )}
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
            {innerPage02Locations.map((loc) => (
              <DropdownMenuRadioItem key={loc} value={loc}>
                {loc}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
  );
}

// ─── InnerPage02SidebarContent ────────────────────────────────────────────────

function InnerPage02SidebarContent({
  pinned,
  onMenuOpenChange,
}: {
  pinned: boolean;
  onMenuOpenChange?: (open: boolean) => void;
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const showBackRow = pinned || isMobile;
  return (
    <>
      <SidebarHeader className="border-b">
        <div className="space-y-2 px-2 py-2">
          <div
            className={cn(
              "flex items-center overflow-hidden transition-opacity duration-150 ease-linear",
              showBackRow ? "h-8 opacity-100" : "hidden",
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
          <InnerPage02LocationSelector onOpenChange={onMenuOpenChange} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pharmacy</SidebarGroupLabel>
          <SidebarMenu>
            {innerPage02PharmacyItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton isActive={item.isActive} tooltip={item.title}>
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <Separator variant="inset" className="mx-3 w-auto" />
        <SidebarGroup>
          <SidebarGroupLabel>Patient Management</SidebarGroupLabel>
          <SidebarMenu>
            {innerPage02PatientItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title}>
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

// ─── InnerPageLayout02Demo ────────────────────────────────────────────────────

export function InnerPageLayout02Demo({ fullPage = false }: { fullPage?: boolean }) {
  const {
    pinned,
    overlayOpen,
    overlayReady,
    pinningTransition,
    isOverlay,
    cancelClose,
    scheduleClose,
    handleToggleMouseEnter,
    handleMenuOpenChange,
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
          "**:data-[slot=sidebar-container]:duration-150!",
          "**:data-[slot=sidebar-gap]:duration-150!",
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
            <InnerPage02SidebarContent
              pinned={pinned}
              onMenuOpenChange={handleMenuOpenChange}
            />
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
                  <BreadcrumbItem>
                    <BreadcrumbLink>Patients</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
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
              <div className="rounded-xl bg-muted/50 h-20" />
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-muted/50 aspect-video" />
                <div className="rounded-xl bg-muted/50 aspect-video" />
                <div className="rounded-xl bg-muted/50 aspect-video" />
              </div>
              <div className="min-h-16 rounded-xl bg-muted/40" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  );
}
