export const INNER_PAGE_01_CODE = `import React, { useCallback, useEffect, useRef, useState } from "react"
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
  useSidebar,
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
  House, LogOut, PanelLeft, Settings2, Users, X,
} from "lucide-react"

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

// ─── Inner sidebar ────────────────────────────────────────────────────────────

function InnerSidebarContent({ pinned }: { pinned: boolean }) {
  const { isMobile, setOpenMobile } = useSidebar()
  const showHeader = pinned || isMobile
  return (
    <>
      <SidebarHeader className={\`overflow-hidden border-b \${showHeader ? "border-border min-h-12" : "max-h-0 py-0 border-transparent"}\`}>
        <div className={\`flex items-center gap-2 px-2 transition-[opacity,transform] duration-150 ease-linear \${showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}\`}>
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground -ml-1 h-7 px-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          {isMobile && (
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpenMobile(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          )}
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
        <NavUserCard />
      </SidebarFooter>
    </>
  )
}

// ─── Inner page header ────────────────────────────────────────────────────────

function InnerPageHeader({ pinned, cancelClose, scheduleClose, setOverlayReady, setOverlayOpen, toggleSidebar }: {
  pinned: boolean
  cancelClose: () => void
  scheduleClose: () => void
  setOverlayReady: (v: boolean) => void
  setOverlayOpen: (v: boolean) => void
  toggleSidebar: () => void
}) {
  const { isMobile, setOpenMobile } = useSidebar()
  const showBackInHeader = !pinned && !isMobile
  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b bg-background px-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onMouseEnter={() => { cancelClose(); if (!pinned) { setOverlayReady(true); setOverlayOpen(true) } }}
            onMouseLeave={scheduleClose}
            onClick={() => isMobile ? setOpenMobile(true) : toggleSidebar()}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Toggle sidebar</TooltipContent>
      </Tooltip>
      {showBackInHeader && (
        <>
          <Separator orientation="vertical" />
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground h-7 px-2">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </>
      )}
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
          <span className="hidden sm:inline">Alerts</span>
        </Button>
      </div>
    </header>
  )
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export function InnerPageLayout() {
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
            <InnerSidebarContent pinned={pinned} />
          </Sidebar>

          <SidebarInset className="overflow-hidden">
            <InnerPageHeader
              pinned={pinned}
              cancelClose={cancelClose}
              scheduleClose={scheduleClose}
              setOverlayReady={setOverlayReady}
              setOverlayOpen={setOverlayOpen}
              toggleSidebar={toggleSidebar}
            />

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
