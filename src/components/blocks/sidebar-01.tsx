export const SIDEBAR_01_CODE = `import React, { useCallback, useEffect, useRef, useState } from "react"
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
            <div className="flex items-center justify-between rounded-xl border border-sky-100 bg-linear-to-r from-sky-50 to-blue-100 p-5 dark:border-sky-900/20 dark:from-sky-950/20 dark:to-blue-950/20">
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
