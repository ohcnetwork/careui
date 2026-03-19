import React from "react";
import { type ComponentDoc } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  Activity,
  BadgeCheck,
  Bell,
  Box,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronsUpDown,
  CreditCard,
  House,
  LogOut,
  MapPin,
  Package,
  PanelLeft,
  Search,
  Settings2,
  UserCog,
  Users,
  X,
} from "lucide-react";

// ─── Care Navigation Data ─────────────────────────────────────────────────────

type CareNavItem = { title: string; icon: React.ElementType; isActive?: boolean };
type CareNavGroup = { label: string | null; items: CareNavItem[] };

const careNavGroups: CareNavGroup[] = [
  {
    label: null,
    items: [{ title: "Home", icon: House, isActive: true }],
  },
  {
    label: "Patient Management",
    items: [
      { title: "Search Patient", icon: Search },
      { title: "Appointments", icon: CalendarDays },
      { title: "Queues", icon: Users },
    ],
  },
  {
    label: "Encounters & Locations",
    items: [
      { title: "All Encounters", icon: Activity },
      { title: "Search by Location", icon: MapPin },
    ],
  },
  {
    label: "Services",
    items: [
      { title: "Services", icon: Package },
      { title: "Resource", icon: Box },
    ],
  },
  {
    label: "Administration",
    items: [
      { title: "Users", icon: UserCog },
      { title: "Billing", icon: CreditCard },
      { title: "Settings", icon: Settings2 },
    ],
  },
];

const careFacilities = ["Care Facility", "City Hospital", "Rural Clinic"];

const careUser = { name: "Prabha Narendran", role: "Nurse", initials: "PN" };

// ─── CareFacilitySelector ─────────────────────────────────────────────────────

function CareFacilitySelector() {
  const [selected, setSelected] = React.useState(careFacilities[0]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 font-normal shadow-sm">
          {selected}
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-44">
        {careFacilities.map((f) => (
          <DropdownMenuItem key={f} onClick={() => setSelected(f)} className="gap-2">
            {f === selected ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <span className="h-4 w-4 inline-block" />
            )}
            {f}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── CareNavGroups ────────────────────────────────────────────────────────────

function CareNavGroups() {
  return (
    <>
      {careNavGroups.map((group, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Separator className="mx-3 w-auto" />}
          <SidebarGroup className={i > 0 ? "pt-0" : undefined}>
            {group.label && (
              <SidebarGroupLabel className="text-[10px] font-semibold tracking-wider uppercase">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={!!item.isActive} tooltip={item.title}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </React.Fragment>
      ))}
    </>
  );
}

// ─── CareNavUserCard ──────────────────────────────────────────────────────────

function CareNavUserCard({ onMenuOpenChange }: { onMenuOpenChange?: (open: boolean) => void }) {
  const { isMobile } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu onOpenChange={onMenuOpenChange}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent bg-strong-background/60 data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-green-100 text-green-800 text-xs font-semibold dark:bg-green-900 dark:text-green-200">
                  {careUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{careUser.name}</span>
                <span className="truncate text-xs text-muted-foreground">{careUser.role}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 opacity-60" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-green-100 text-green-800 text-xs font-semibold dark:bg-green-900 dark:text-green-200">
                    {careUser.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{careUser.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{careUser.role}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <BadgeCheck className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// ─── CareSidebarInner ─────────────────────────────────────────────────────────

function CareSidebarInner({
  pinned,
  onMenuOpenChange,
}: {
  pinned: boolean;
  onMenuOpenChange: (open: boolean) => void;
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const showHeader = pinned || isMobile;
  return (
    <>
      <SidebarHeader
        className={cn(
          "overflow-hidden border-b",
          showHeader ? "py-2 border-border min-h-14" : "max-h-0 py-0 border-transparent"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 px-2 transition-[opacity,transform] duration-150 ease-linear",
            showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
        >

          <img src="/Care-logo-in-light.svg" alt="Care" className="h-9 w-auto dark:hidden" />
          <img src="/Care-logo-in-dark.svg" alt="Care" className="h-9 w-auto hidden dark:block" />
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
        <CareNavGroups />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <CareNavUserCard onMenuOpenChange={onMenuOpenChange} />
      </SidebarFooter>
    </>
  );
}

// ─── CareSearchBar ───────────────────────────────────────────────────────────

function CareSearchBar() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <InputGroup
        className="md:h-9 w-52 cursor-pointer text-sm"
        onClick={() => setOpen(true)}
      >
        <InputGroupInput
          placeholder="Search"
          readOnly
          className="cursor-pointer text-sm"
        />
        <InputGroupAddon>
          <Search className="text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {careNavGroups.map((group, i) => (
              <CommandGroup key={i} heading={group.label ?? "Quick Access"}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.title}
                    value={item.title}
                    onSelect={() => setOpen(false)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

// ─── SidebarToggleButton ──────────────────────────────────────────────────────

function SidebarToggleButton({
  onDesktopToggle,
  onMouseEnter,
  onMouseLeave,
}: {
  onDesktopToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const { isMobile, setOpenMobile } = useSidebar();

  const button = (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-7 w-7 -ml-1 after:absolute after:-inset-3 after:content-['']"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        if (isMobile) {
          setOpenMobile(true);
        } else {
          onDesktopToggle();
        }
      }}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );

  if (isMobile) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="left" className="flex items-center gap-1.5">
        Toggle sidebar
        <Kbd>⌘B</Kbd>
      </TooltipContent>
    </Tooltip>
  );
}

// ─── AppSidebarDemo ───────────────────────────────────────────────────────────

export function AppSidebarDemo({ fullPage = false }: { fullPage?: boolean }) {
  const [pinned, setPinned] = React.useState(true);
  const [overlayOpen, setOverlayOpen] = React.useState(false);
  // overlayReady becomes true only AFTER the close animation finishes (~210ms).
  // This prevents top/height from snapping while the sidebar is still visible and sliding.
  const [overlayReady, setOverlayReady] = React.useState(false);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuOpenRef = React.useRef(false);

  const cancelClose = React.useCallback(() => {
    clearTimeout(closeTimerRef.current ?? undefined);
    clearTimeout(settleTimerRef.current ?? undefined);
    closeTimerRef.current = null;
    settleTimerRef.current = null;
  }, []);

  // Waits for the slide-out transition to finish, then snaps the container
  // into overlay-ready position while it's off-screen.
  const startSettle = React.useCallback(() => {
    clearTimeout(settleTimerRef.current ?? undefined);
    settleTimerRef.current = setTimeout(() => setOverlayReady(true), 210);
  }, []);

  const scheduleClose = React.useCallback(() => {
    if (!pinned && !menuOpenRef.current) {
      cancelClose();
      closeTimerRef.current = setTimeout(() => {
        setOverlayOpen(false);
        startSettle();
      }, 300);
    }
  }, [pinned, cancelClose, startSettle]);

  const isOverlay = overlayOpen && !pinned;

  const handleToggleMouseEnter = React.useCallback(() => {
    cancelClose();
    if (!pinned) {
      setOverlayReady(true);
      setOverlayOpen(true);
    }
  }, [pinned, cancelClose]);

  const toggleSidebar = React.useCallback(() => {
    cancelClose();
    if (isOverlay) {
      setOverlayReady(false);
      setPinned(true);
      setOverlayOpen(false);
    } else if (pinned) {
      setOverlayReady(false);
      setPinned(false);
      setOverlayOpen(false);
      startSettle();
    } else {
      setPinned(true);
      setOverlayOpen(false);
    }
  }, [isOverlay, pinned, cancelClose, startSettle]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
          // Speed up the slide-in/out so hover feels snappy.
          "**:data-[slot=sidebar-container]:transition-[left,right,width]!",
          "**:data-[slot=sidebar-container]:duration-150!",
          "**:data-[slot=sidebar-gap]:duration-150!",
          // Overlay: zero the gap so it doesn't push content, and restore inset margin.
          isOverlay && "**:data-[slot=sidebar-inset]:ml-2!",
          isOverlay && "**:data-[slot=sidebar-gap]:w-0!",
          // top/height: only applied once off-screen (after settle timer), so the
          // close slide-out happens from top:0 full-height with no visible snap.
          overlayReady && !pinned && [
            "**:data-[slot=sidebar-container]:top-14!",
            "**:data-[slot=sidebar-container]:h-[calc(100%-3.5rem)]!",
          ],
          // Overlay appearance: elevation + rounded corner.
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
          onOpenChange={(o) => {
            if (o) {
              setOverlayReady(false);
              setPinned(true);
              setOverlayOpen(false);
            } else {
              setOverlayReady(false);
              setPinned(false);
              setOverlayOpen(false);
              startSettle();
            }
          }}
          className="min-h-0! h-full"
          style={{ "--sidebar-width": "15rem", height: "100%" } as React.CSSProperties}
        >
          <Sidebar
            variant="inset"
            collapsible="offcanvas"
            className={isOverlay ? "border-r!" : undefined}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <CareSidebarInner
              pinned={pinned}
              onMenuOpenChange={(open) => {
                menuOpenRef.current = open;
                if (open) cancelClose();
                else scheduleClose();
              }}
            />
          </Sidebar>

          <SidebarInset className="overflow-hidden">
            <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
              <SidebarToggleButton
                onDesktopToggle={toggleSidebar}
                onMouseEnter={handleToggleMouseEnter}
                onMouseLeave={scheduleClose}
              />
              <Separator orientation="vertical" />
              <CareFacilitySelector />
              <div className="ml-auto flex items-center gap-2">
                <CareSearchBar />
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </header>

            {/* Main content */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              {/* Good Morning banner */}
              <div className="flex items-center justify-between border border-sky-100 dark:border-sky-900/20 rounded-xl bg-linear-to-r from-sky-50 to-primary-100 p-5 dark:from-sky-950/20 dark:to-primary-950/20">
                <div className="space-y-0.5">
                  <h1 className="text-base md:text-xl font-normal text-soft-foreground">
                    Good Morning,{" "}
                    <span className="font-semibold text-foreground">Prabha Narendran</span> 👋
                  </h1>
                  <p className="text-sm text-muted-foreground">Welcome back!</p>
                </div>
              </div>
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

// ─── InnerPageLayoutDemo ─────────────────────────────────────────────────────

const innerNavItems = [
  { title: "Overview", icon: House },
  { title: "Patients", icon: Users },
  { title: "Appointments", icon: CalendarDays },
  { title: "Encounters", icon: Activity },
  { title: "Settings", icon: Settings2 },
];

function InnerSidebarContent({ pinned }: { pinned: boolean }) {
  const { isMobile, setOpenMobile } = useSidebar();
  const showHeader = pinned || isMobile;
  return (
    <>
      <SidebarHeader
        className={cn(
          "overflow-hidden border-b",
          showHeader ? "border-border min-h-12" : "max-h-0 py-0 border-transparent"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 px-2 transition-[opacity,transform] duration-150 ease-linear",
            showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
        >
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground -ml-1">
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
                <SidebarMenuButton isActive={i === 0} tooltip={item.title}>
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

function InnerPageBackButton({ pinned }: { pinned: boolean }) {
  const { isMobile } = useSidebar();
  if (pinned && !isMobile) return null;
  return (
    <>
      <Separator orientation="vertical" />
      <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground h-7 px-2">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>
    </>
  );
}

export function InnerPageLayoutDemo({ fullPage = false }: { fullPage?: boolean }) {
  const [pinned, setPinned] = React.useState(true);
  const [overlayOpen, setOverlayOpen] = React.useState(false);
  const [overlayReady, setOverlayReady] = React.useState(false);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuOpenRef = React.useRef(false);

  const cancelClose = React.useCallback(() => {
    clearTimeout(closeTimerRef.current ?? undefined);
    clearTimeout(settleTimerRef.current ?? undefined);
    closeTimerRef.current = null;
    settleTimerRef.current = null;
  }, []);

  const startSettle = React.useCallback(() => {
    clearTimeout(settleTimerRef.current ?? undefined);
    settleTimerRef.current = setTimeout(() => setOverlayReady(true), 210);
  }, []);

  const scheduleClose = React.useCallback(() => {
    if (!pinned && !menuOpenRef.current) {
      cancelClose();
      closeTimerRef.current = setTimeout(() => {
        setOverlayOpen(false);
        startSettle();
      }, 300);
    }
  }, [pinned, cancelClose, startSettle]);

  const isOverlay = overlayOpen && !pinned;

  const toggleSidebar = React.useCallback(() => {
    cancelClose();
    if (isOverlay) {
      setOverlayReady(false); setPinned(true); setOverlayOpen(false);
    } else if (pinned) {
      setOverlayReady(false); setPinned(false); setOverlayOpen(false); startSettle();
    } else {
      setPinned(true); setOverlayOpen(false);
    }
  }, [isOverlay, pinned, cancelClose, startSettle]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") { e.preventDefault(); toggleSidebar(); }
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
          "**:data-[slot=sidebar-container]:transition-[left,right,width]!",
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
          onOpenChange={(o) => {
            if (o) { setOverlayReady(false); setPinned(true); setOverlayOpen(false); }
            else { setOverlayReady(false); setPinned(false); setOverlayOpen(false); startSettle(); }
          }}
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
                onMouseEnter={() => {
                  cancelClose();
                  if (!pinned) { setOverlayReady(true); setOverlayOpen(true); }
                }}
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
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Bell className="h-3 w-3" />
                  <span className="hidden md:inline">Alerts</span>
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

// ─── ComponentDoc ─────────────────────────────────────────────────────────────

export const sidebarDoc: ComponentDoc = {
  id: "sidebar",
  name: "Sidebar",
  description:
    "A composable, themeable and customizable sidebar component.",
  installation: {
    cli: "npx shadcn@latest add sidebar",
    manual:
      "Install radix-ui and copy the sidebar component source code into your project.",
  },
  usage: `import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}`,
  preview: {
    code: `"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
} from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Teams
              </DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <team.logo className="size-3.5 shrink-0" />
                  </div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add team
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ElementType
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: React.ElementType
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}`,
    component: React.createElement(AppSidebarDemo),
  },
  examples: [

  ],
  props: [
    // SidebarProvider
    {
      name: "defaultOpen",
      type: "boolean",
      description: "Default open state of the sidebar (SidebarProvider).",
    },
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state of the sidebar (SidebarProvider).",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Callback when open state changes (SidebarProvider).",
    },
    // Sidebar
    {
      name: "side",
      type: '"left" | "right"',
      description: "The side of the sidebar.",
      default: '"left"',
    },
    {
      name: "variant",
      type: '"sidebar" | "floating" | "inset"',
      description: "The visual variant of the sidebar.",
      default: '"sidebar"',
    },
    {
      name: "collapsible",
      type: '"offcanvas" | "icon" | "none"',
      description:
        'Collapsible behaviour: offcanvas slides in/out, icon collapses to icons, none is always visible.',
      default: '"offcanvas"',
    },
    // useSidebar
    {
      name: "state",
      type: '"expanded" | "collapsed"',
      description: "The current state of the sidebar (useSidebar).",
    },
    {
      name: "setOpen",
      type: "(open: boolean) => void",
      description: "Sets the open state of the sidebar (useSidebar).",
    },
    {
      name: "openMobile",
      type: "boolean",
      description: "Whether the sidebar is open on mobile (useSidebar).",
    },
    {
      name: "setOpenMobile",
      type: "(open: boolean) => void",
      description: "Sets the open state of the sidebar on mobile (useSidebar).",
    },
    {
      name: "isMobile",
      type: "boolean",
      description: "Whether the sidebar is in mobile mode (useSidebar).",
    },
    {
      name: "toggleSidebar",
      type: "() => void",
      description: "Toggles the sidebar open/closed on desktop and mobile (useSidebar).",
    },
  ],
};
