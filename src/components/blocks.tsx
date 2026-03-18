import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Copy, Check, ChevronLeft, Code } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { AppSidebarDemo, InnerPageLayoutDemo } from "@/lib/registry/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigation } from "@/contexts/navigation-context";




// ─── Block definitions ────────────────────────────────────────────────────────

type BlockCategory = "All" | "Sidebar" | "Authentication" | "Dashboard";

interface BlockDef {
  id: string;
  name: string;
  description: string;
  category: Exclude<BlockCategory, "All">;
  preview: (fullPage?: boolean) => React.ReactNode;
  scale?: number;
  code: string;
}

const SIDEBAR_01_CODE = `import React, { useCallback, useEffect, useRef, useState } from "react"
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Activity, BadgeCheck, Bell, Box, CalendarDays,
  Check, ChevronsUpDown, CreditCard, House, LogOut,
  MapPin, Package, PanelLeft, Search, Settings2, UserCog, Users,
} from "lucide-react"

// ─── Navigation data ──────────────────────────────────────────────────────────

const navGroups = [
  { label: null,               items: [{ title: "Home",              icon: House,      isActive: true }] },
  { label: "Patient Management", items: [{ title: "Search Patient",  icon: Search },
                                          { title: "Appointments",   icon: CalendarDays },
                                          { title: "Queues",         icon: Users }] },
  { label: "Encounters & Locations", items: [{ title: "All Encounters", icon: Activity },
                                              { title: "Search by Location", icon: MapPin }] },
  { label: "Services",         items: [{ title: "Services",          icon: Package },
                                        { title: "Resource",         icon: Box }] },
  { label: "Administration",   items: [{ title: "Users",             icon: UserCog },
                                        { title: "Billing",          icon: CreditCard },
                                        { title: "Settings",         icon: Settings2 }] },
]

const facilities = ["Care Facility", "City Hospital", "Rural Clinic"]
const user = { name: "Prabha Narendran", role: "Nurse", initials: "PN" }

// ─── Sidebar inner ────────────────────────────────────────────────────────────

function AppSidebarInner({ pinned }: { pinned: boolean }) {
  const { isMobile, setOpenMobile } = useSidebar()
  const showHeader = pinned || isMobile
  return (
    <>
      <SidebarHeader className={\`overflow-hidden border-b \${showHeader ? "py-2 border-border min-h-14" : "max-h-0 py-0 border-transparent"}\`}>
        <div className={\`flex items-center gap-2 px-2 transition-[opacity,transform] duration-150 ease-linear \${showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}\`}>
          <span className="text-base font-bold tracking-tight">CareUI</span>
          {isMobile && (
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpenMobile(false)}>✕</Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group, i) => (
          <SidebarGroup key={i}>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
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
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-green-100 text-green-800 text-xs font-semibold">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.role}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 opacity-60" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="min-w-56">
                <DropdownMenuLabel className="font-normal">{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><BadgeCheck className="mr-2 h-4 w-4" />Account</DropdownMenuItem>
                <DropdownMenuItem><Bell className="mr-2 h-4 w-4" />Notifications</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" />Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export function AppSidebarLayout() {
  const [pinned, setPinned] = useState(true)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [overlayReady, setOverlayReady] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current ?? undefined)
    clearTimeout(settleTimer.current ?? undefined)
    closeTimer.current = null
    settleTimer.current = null
  }, [])

  const startSettle = useCallback(() => {
    clearTimeout(settleTimer.current ?? undefined)
    settleTimer.current = setTimeout(() => setOverlayReady(true), 210)
  }, [])

  const scheduleClose = useCallback(() => {
    if (!pinned) {
      cancelClose()
      closeTimer.current = setTimeout(() => { setOverlayOpen(false); startSettle() }, 300)
    }
  }, [pinned, cancelClose, startSettle])

  const isOverlay = overlayOpen && !pinned

  const toggleSidebar = useCallback(() => {
    cancelClose()
    if (isOverlay) {
      setOverlayReady(false); setPinned(true); setOverlayOpen(false)
    } else if (pinned) {
      setOverlayReady(false); setPinned(false); setOverlayOpen(false); startSettle()
    } else {
      setPinned(true); setOverlayOpen(false)
    }
  }, [isOverlay, pinned, cancelClose, startSettle])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") { e.preventDefault(); toggleSidebar() }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [toggleSidebar])

  const [facility, setFacility] = useState(facilities[0])

  return (
    <div
      className={[
        "h-screen overflow-hidden",
        isOverlay && "**:data-[slot=sidebar-inset]:ml-2! **:data-[slot=sidebar-gap]:w-0!",
        overlayReady && !pinned && "**:data-[slot=sidebar-container]:top-14! **:data-[slot=sidebar-container]:h-[calc(100%-3.5rem)]!",
        isOverlay && "**:data-[slot=sidebar-container]:bg-sidebar **:data-[slot=sidebar-container]:border-t **:data-[slot=sidebar-container]:rounded-r-md **:data-[slot=sidebar-container]:shadow-xl",
      ].filter(Boolean).join(" ")}
    >
      <SidebarProvider
        open={pinned || overlayOpen}
        onOpenChange={(o) => {
          if (o) { setOverlayReady(false); setPinned(true); setOverlayOpen(false) }
          else { setOverlayReady(false); setPinned(false); setOverlayOpen(false); startSettle() }
        }}
        className="h-full min-h-0!"
        style={{ "--sidebar-width": "15rem" } as React.CSSProperties}
      >
        <Sidebar
          variant="inset"
          collapsible="offcanvas"
          className={isOverlay ? "border-r!" : undefined}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <AppSidebarInner pinned={pinned} />
        </Sidebar>

        <SidebarInset className="overflow-hidden">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onMouseEnter={() => { if (!pinned) { setOverlayReady(true); setOverlayOpen(true) } }}
              onMouseLeave={scheduleClose}
              onClick={toggleSidebar}
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 font-normal shadow-sm">
                  {facility}<ChevronsUpDown className="h-3.5 w-3.5 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-44">
                {facilities.map((f) => (
                  <DropdownMenuItem key={f} onClick={() => setFacility(f)} className="gap-2">
                    {f === facility ? <Check className="h-4 w-4 text-primary" /> : <span className="h-4 w-4 inline-block" />}
                    {f}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            <div className="flex items-center justify-between rounded-xl border border-sky-100 bg-gradient-to-r from-sky-50 to-blue-100 p-5 dark:border-sky-900/20 dark:from-sky-950/20 dark:to-blue-950/20">
              <div>
                <h1 className="text-xl font-normal">
                  Good Morning, <span className="font-semibold">Prabha Narendran</span> 👋
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
  )
}`;

const INNER_PAGE_01_CODE = `import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Activity, BadgeCheck, Bell, CalendarDays, ChevronLeft, ChevronsUpDown,
  House, LogOut, PanelLeft, Settings2, Users,
} from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

// ─── Navigation data ──────────────────────────────────────────────────────────

const navItems = [
  { title: "Overview",     icon: House,        isActive: true },
  { title: "Patients",     icon: Users },
  { title: "Appointments", icon: CalendarDays },
  { title: "Encounters",   icon: Activity },
  { title: "Settings",     icon: Settings2 },
]

const tabs = ["Overview", "Encounters", "Prescriptions", "Lab Results"]

const stats = [
  { label: "BP",           value: "128/82", unit: "mmHg"  },
  { label: "Blood Sugar",  value: "142",    unit: "mg/dL" },
  { label: "Encounters",   value: "14",     unit: "total" },
]

// ─── NavUserCard ──────────────────────────────────────────────────────────────

const user = { name: "Prabha Narendran", role: "Nurse", initials: "PN" }

function NavUserCard() {
  const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-green-100 text-green-800 text-xs font-semibold dark:bg-green-900 dark:text-green-200">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.role}</span>
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
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.role}</span>
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
  )
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export function InnerPageLayout() {
  const [pinned, setPinned] = useState(true)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [overlayReady, setOverlayReady] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuOpen = useRef(false)

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current ?? undefined)
    clearTimeout(settleTimer.current ?? undefined)
    closeTimer.current = null
    settleTimer.current = null
  }, [])

  const startSettle = useCallback(() => {
    clearTimeout(settleTimer.current ?? undefined)
    settleTimer.current = setTimeout(() => setOverlayReady(true), 210)
  }, [])

  const scheduleClose = useCallback(() => {
    if (!pinned && !menuOpen.current) {
      cancelClose()
      closeTimer.current = setTimeout(() => { setOverlayOpen(false); startSettle() }, 300)
    }
  }, [pinned, cancelClose, startSettle])

  const isOverlay = overlayOpen && !pinned

  const toggleSidebar = useCallback(() => {
    cancelClose()
    if (isOverlay) {
      setOverlayReady(false); setPinned(true); setOverlayOpen(false)
    } else if (pinned) {
      setOverlayReady(false); setPinned(false); setOverlayOpen(false); startSettle()
    } else {
      setPinned(true); setOverlayOpen(false)
    }
  }, [isOverlay, pinned, cancelClose, startSettle])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") { e.preventDefault(); toggleSidebar() }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [toggleSidebar])

  return (
    <TooltipProvider>
      <div
        className={[
          "h-screen overflow-hidden",
          "**:data-[slot=sidebar-container]:h-full!",
          "**:data-[slot=sidebar-container]:transition-[left,right,width]!",
          "**:data-[slot=sidebar-container]:duration-150!",
          "**:data-[slot=sidebar-gap]:duration-150!",
          isOverlay && "**:data-[slot=sidebar-gap]:w-0!",
          overlayReady && !pinned && "**:data-[slot=sidebar-container]:top-12! **:data-[slot=sidebar-container]:h-[calc(100%-3rem)]!",
          isOverlay && "**:data-[slot=sidebar-container]:bg-sidebar **:data-[slot=sidebar-container]:border-t **:data-[slot=sidebar-container]:rounded-r-md **:data-[slot=sidebar-container]:shadow-xl",
        ].filter(Boolean).join(" ")}
      >
        <SidebarProvider
          open={pinned || overlayOpen}
          onOpenChange={(o) => {
            if (o) { setOverlayReady(false); setPinned(true); setOverlayOpen(false) }
            else { setOverlayReady(false); setPinned(false); setOverlayOpen(false); startSettle() }
          }}
          className="h-full min-h-0!"
          style={{ "--sidebar-width": "14rem" } as React.CSSProperties}
        >
          <Sidebar
            variant="sidebar"
            collapsible="offcanvas"
            className={isOverlay ? "border-r!" : undefined}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <SidebarHeader
              className={\`overflow-hidden border-b \${pinned ? "py-2 border-border min-h-12" : "max-h-0 py-0 border-transparent"}\`}
            >
              <div className={\`flex items-center gap-2 px-2 transition-[opacity,transform] duration-150 ease-linear \${pinned ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}\`}>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground -ml-1 h-7 px-2">
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  {navItems.map((item, i) => (
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

            <SidebarFooter className="border-t">
              <NavUserCard onMenuOpenChange={(open) => {
                menuOpen.current = open
                if (open) cancelClose()
                else scheduleClose()
              }} />
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="overflow-hidden">
            <header className="flex h-12 shrink-0 items-center gap-3 border-b bg-background px-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onMouseEnter={() => { cancelClose(); if (!pinned) { setOverlayReady(true); setOverlayOpen(true) } }}
                    onMouseLeave={scheduleClose}
                    onClick={toggleSidebar}
                  >
                    <PanelLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Toggle sidebar</TooltipContent>
              </Tooltip>
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
              <div className="ml-auto">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Bell className="h-3.5 w-3.5" />
                  Alerts
                </Button>
              </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              {/* Patient summary */}
              <div className="flex items-start gap-4 rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">JD</div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <h2 className="text-base font-semibold">John Doe</h2>
                  <p className="text-xs text-muted-foreground">42 yrs · Male · ID #20540</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Hypertension", "Type 2 Diabetes"].map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab row */}
              <div className="flex gap-1 border-b">
                {tabs.map((tab, i) => (
                  <button key={tab} className={\`px-3 pb-2 text-xs font-medium transition-colors \${
                    i === 0 ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
                  }\`}>{tab}</button>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border bg-card p-3 shadow-sm">
                    <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-semibold leading-tight">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground">{stat.unit}</p>
                  </div>
                ))}
              </div>

              <div className="min-h-16 rounded-xl bg-muted/40" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  )
}`;

const BLOCKS: BlockDef[] = [
  {
    id: "sidebar-01",
    name: "Main Dashboard",
    description: "A dashboard with collapsible sidebar navigation and team switcher.",
    category: "Sidebar",
    preview: (fullPage) => <AppSidebarDemo fullPage={fullPage} />,
    scale: 0.68,
    code: SIDEBAR_01_CODE,
  },
  {
    id: "inner-page-01",
    name: "Inner Page",
    description: "An inner-page patient detail layout with a fixed sidebar and contextual breadcrumb header.",
    category: "Sidebar",
    preview: (fullPage) => <InnerPageLayoutDemo fullPage={fullPage} />,
    scale: 0.68,
    code: INNER_PAGE_01_CODE,
  },
];

// ─── BlockThumbnail ───────────────────────────────────────────────────────────

function BlockThumbnail({ block }: { block: BlockDef }) {
  const scale = block.scale ?? 0.5;
  const containerHeight = Math.round(480 * scale + 10);

  function openPreview() {
    const base = window.location.pathname + window.location.search;
    window.open(base + "#block-preview-" + block.id, "_blank", "noopener,noreferrer");
  }

  function openCode() {
    const base = window.location.pathname + window.location.search;
    window.open(base + "#block-code-" + block.id, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
      <div
        role="button"
        tabIndex={0}
        className="relative overflow-hidden bg-muted/20 w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ height: containerHeight }}
        onClick={openPreview}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openPreview()}
        aria-label={`Open ${block.name} preview`}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${(100 / scale).toFixed(2)}%`,
            height: `${(100 / scale).toFixed(2)}%`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {block.preview()}
        </div>
      </div>
      <div className="flex items-center gap-3 border-t px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{block.name}</p>
          <p className="truncate text-xs text-muted-foreground">{block.description}</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="shrink-0 gap-1.5 text-xs"
          onClick={openCode}
        >
          <Code className="h-3 w-3" />
          See code
        </Button>
      </div>
    </div>
  );
}

// ─── BlockCodePage (rendered in new tab at #block-code-{id}) ─────────────────

export function BlockCodePage({ id }: { id: string }) {
  const block = BLOCKS.find((b) => b.id === id);
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  if (!block) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Block not found: {id}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex h-12 shrink-0 items-center gap-3 border-b px-4">
        <span className="text-sm font-medium">{block.name}</span>
        <span className="text-xs text-muted-foreground">{block.description}</span>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs"
            onClick={() => copyToClipboard(block.code, block.id)}
          >
            {isCopied(block.id) ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {isCopied(block.id) ? "Copied!" : "Copy"}
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-auto">
        <pre className="min-h-full bg-muted/30 p-6 text-sm leading-relaxed">
          <code>{block.code}</code>
        </pre>
      </div>
    </div>
  );
}

// ─── BlockPreviewPage (rendered in new tab at #block-preview-{id}) ────────────

export function BlockPreviewPage({ id }: { id: string }) {
  const block = BLOCKS.find((b) => b.id === id);

  if (!block) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Block not found: {id}</p>
      </div>
    );
  }

  return (
    <div className="relative bg-background">
      {/* Floating toolbar */}
      <div className="fixed bottom-3 right-4 z-50 flex items-center gap-2 rounded-lg border bg-background/80 px-3 py-1.5 shadow-md backdrop-blur-sm">
        <span className="text-xs font-medium text-muted-foreground">{block.name}</span>
        <Separator orientation="vertical" />
        <ThemeToggle />
      </div>
      {/* Full preview */}
      {block.preview(true)}
    </div>
  );
}

// ─── BlocksPage ───────────────────────────────────────────────────────────────

const CATEGORIES: BlockCategory[] = ["All", "Sidebar", "Authentication", "Dashboard"];

export function BlocksPage() {
  const { setActiveComponent } = useNavigation();
  const [activeCategory, setActiveCategory] = useState<BlockCategory>("All");

  const filtered =
    activeCategory === "All"
      ? BLOCKS
      : BLOCKS.filter((b) => b.category === activeCategory);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top navbar */}
      <header className="flex h-14 shrink-0 items-center gap-4 border-b px-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="inline-flex cursor-pointer items-center gap-1"
                onClick={() => setActiveComponent("get-started")}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Care UI
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Blocks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl space-y-8 p-6 md:p-8">
          <div className="space-y-2 pt-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Building Blocks for the Web
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Clean, modern building blocks. Copy and paste into your apps.
              Works with all React frameworks. Open Source. Free forever.
            </p>
          </div>
          <Separator />
          <div className="flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "secondary" : "ghost"}
                size="sm"
                className="rounded-full px-4"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
            <span className="ml-auto text-xs text-muted-foreground">
              {filtered.length} block{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((block) => (
              <BlockThumbnail key={block.id} block={block} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
