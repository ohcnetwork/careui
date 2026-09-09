export const SIDEBAR_01_CODE = `import React, { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Activity, ArrowRight, BadgeCheck, Bell, Box, CalendarDays,
  Check, ChevronsUpDown, CreditCard, House, LogOut,
  MapPin, MoreHorizontal, Package, PanelLeft, Search, Settings2, UserCog, Users,
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

const encounterTypes = [
  "All Encounters",
  "Inpatient", "Ambulatory", "Emergency", "Observation",
  "Virtual", "Outpatient", "Home Health",
] as const

type EncounterType = (typeof encounterTypes)[number]
const encounterStorageKey = "careui-main-dashboard-default-encounter"

function readDefaultEncounter(): EncounterType {
  if (typeof window === "undefined") return encounterTypes[0]
  const stored = window.localStorage.getItem(encounterStorageKey)
  return encounterTypes.includes(stored as EncounterType)
    ? (stored as EncounterType)
    : encounterTypes[0]
}

const user = { name: "Prabha Narendran", role: "Nurse", initials: "PN" }

// ─── Sidebar inner ────────────────────────────────────────────────────────────

function AppSidebarInner({ pinned, onMenuOpenChange }: { pinned: boolean; onMenuOpenChange?: (open: boolean) => void }) {
  const { isMobile, setOpenMobile } = useSidebar()
  const showHeader = pinned || isMobile
  const [activeSection, setActiveSection] = useState<"home" | "encounters">("home")
  const [defaultEncounter, setDefaultEncounter] = useState(readDefaultEncounter)
  const [activeEncounter, setActiveEncounter] = useState<EncounterType>(defaultEncounter)
  const [draftDefaultEncounter, setDraftDefaultEncounter] = useState<EncounterType>(defaultEncounter)
  const [isSettingDefault, setIsSettingDefault] = useState(false)
  const [encounterMenuOpen, setEncounterMenuOpen] = useState(false)
  const [mobileEncounterOpen, setMobileEncounterOpen] = useState(false)

  const handleEncounterMenuOpenChange = (open: boolean) => {
    if (!open) setIsSettingDefault(false)
    setEncounterMenuOpen(open)
    setMobileEncounterOpen(open)
  }

  const closeMobileSidebar = () => {
    if (!isMobile) return
    window.setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
      setOpenMobile(false)
      document.querySelector<HTMLButtonElement>('[aria-label="Close sidebar"]')?.click()
    }, 300)
  }

  const navigateToEncounter = (encounterType: EncounterType) => {
    setActiveEncounter(encounterType)
    setActiveSection("encounters")
    setEncounterMenuOpen(false)
    setMobileEncounterOpen(false)
    closeMobileSidebar()
  }

  const openDefaultSettings = () => {
    setDraftDefaultEncounter(defaultEncounter)
    setIsSettingDefault(true)
  }

  const selectEncounterDefault = (encounterType: EncounterType) => {
    setDraftDefaultEncounter(encounterType)
    setDefaultEncounter(encounterType)
    setActiveEncounter(encounterType)
    setActiveSection("encounters")
    window.localStorage.setItem(encounterStorageKey, encounterType)
    setIsSettingDefault(false)
    setEncounterMenuOpen(false)
    setMobileEncounterOpen(false)
    closeMobileSidebar()
  }

  const encounterMenuContent = (mobile: boolean) => (
    <>
      {isSettingDefault ? (
        <>
          {!mobile && (
            <DropdownMenuGroup>
              <DropdownMenuLabel>Set default encounter</DropdownMenuLabel>
            </DropdownMenuGroup>
          )}
          <RadioGroup
            value={draftDefaultEncounter}
            className="gap-0"
            onValueChange={(value) => selectEncounterDefault(value as EncounterType)}
          >
            {encounterTypes.map((encounterType) => {
              const radioId = \`default-\${encounterType.toLowerCase().replaceAll(" ", "-")}\`
              return (
                <label key={encounterType} htmlFor={radioId} className="hover:bg-accent flex min-h-10 cursor-pointer items-center gap-2 rounded-sm px-2 text-sm">
                  <RadioGroupItem id={radioId} value={encounterType} />
                  {encounterType}
                </label>
              )
            })}
          </RadioGroup>
        </>
      ) : (
        <>
          {!mobile && (
            <DropdownMenuGroup>
              <DropdownMenuLabel>Encounter Types</DropdownMenuLabel>
            </DropdownMenuGroup>
          )}
          {mobile ? (
            <div>
              {encounterTypes.map((encounterType) => (
                <Button key={encounterType} variant="ghost" className="focus:bg-accent focus:text-accent-foreground flex min-h-11 w-full justify-start rounded-sm px-2.5 py-1.5 text-sm font-normal no-underline" onClick={() => navigateToEncounter(encounterType)}>
                  {encounterType}
                </Button>
              ))}
            </div>
          ) : (
            encounterTypes.map((encounterType) => (
              <DropdownMenuItem key={encounterType} onClick={() => navigateToEncounter(encounterType)}>
                {encounterType}
              </DropdownMenuItem>
            ))
          )}
          {mobile ? (
            <Button variant="ghost" className="focus:bg-accent focus:text-accent-foreground mt-2 flex min-h-11 w-full justify-between rounded-sm border-t border-border px-2.5 py-1.5 text-sm font-normal no-underline" onClick={openDefaultSettings}>
              Set Default
              <ArrowRight />
            </Button>
          ) : (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem closeOnClick={false} onClick={openDefaultSettings}>
                Set Default
                <ArrowRight className="ml-auto" />
              </DropdownMenuItem>
            </>
          )}
        </>
      )}
    </>
  )

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
              {group.items.map((item) => {
                const isEncounterItem = group.label === "Encounters & Locations" && item.title === "All Encounters"

                if (!isEncounterItem) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={!!item.isActive && activeSection === "home"} tooltip={item.title}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }

                return (
                  <SidebarMenuItem key={item.title} className="group/encounter flex items-center gap-1">
                    <SidebarMenuButton isActive={activeSection === "encounters"} tooltip={activeEncounter} className="min-w-0 flex-1">
                      <item.icon />
                      <span className="truncate">{activeEncounter}</span>
                    </SidebarMenuButton>
                    {isMobile ? (
                      <Drawer showSwipeHandle open={mobileEncounterOpen} onOpenChange={handleEncounterMenuOpenChange}>
                        {mobileEncounterOpen && createPortal(<div aria-hidden="true" className="pointer-events-none fixed inset-0 z-60 h-dvh w-dvw bg-black/25 backdrop-blur-sm" />, document.body)}
                        <DrawerTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground size-8 shrink-0"
                            aria-label="Choose default encounter type"
                          >
                            <MoreHorizontal />
                          </Button>
                        </DrawerTrigger>
                        <DrawerOverlay />
                        <DrawerContent className="h-auto w-dvw max-w-none">
                          <DrawerHeader>
                            <DrawerTitle>{isSettingDefault ? "Set default encounter" : "Encounter Types"}</DrawerTitle>
                            <DrawerDescription>{isSettingDefault ? "Choose the encounter type to show as your default." : "Choose an encounter type to view."}</DrawerDescription>
                          </DrawerHeader>
                          <DrawerBody className="px-2">{encounterMenuContent(true)}</DrawerBody>
                        </DrawerContent>
                      </Drawer>
                    ) : (
                      <DropdownMenu open={encounterMenuOpen} onOpenChange={handleEncounterMenuOpenChange}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground size-8 shrink-0"
                            aria-label="Choose default encounter type"
                          >
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start" className="min-w-56">
                          {encounterMenuContent(false)}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
              <DropdownMenu onOpenChange={onMenuOpenChange}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="shadow-sm">
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
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">{user.name}</DropdownMenuLabel>
                </DropdownMenuGroup>
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
  const menuOpenRef = useRef(false)

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
    if (!pinned && !menuOpenRef.current) {
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
          <AppSidebarInner
            pinned={pinned}
            onMenuOpenChange={(open) => {
              menuOpenRef.current = open
              if (open) cancelClose()
              else scheduleClose()
            }}
          />
        </Sidebar>

        <SidebarInset className="overflow-hidden">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
            <Button
              variant="ghost"
              size="icon"
              className="group relative h-9 w-9"
              onMouseEnter={() => { if (!pinned) { setOverlayReady(true); setOverlayOpen(true) } }}
              onMouseLeave={scheduleClose}
              onClick={toggleSidebar}
            >
              {pinned ? (
                <PanelLeft className="h-4 w-4" />
              ) : (
                <>
                  <img
                    src="/brand-assets/uploads/Care-Logos/SVG/Care-Icon-on-light.svg"
                    alt=""
                    aria-hidden="true"
                    className="size-8 object-contain transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0 dark:hidden"
                  />
                  <img
                    src="/brand-assets/uploads/Care-Logos/SVG/Care-Icon-on-dark.svg"
                    alt=""
                    aria-hidden="true"
                    className="hidden size-8 object-contain transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0 dark:block"
                  />
                  <PanelLeft className="absolute size-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                </>
              )}
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
            <Tabs defaultValue="overview">
              <TabsList variant="line" className="w-full border-b border-border">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="flex flex-col gap-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="aspect-video rounded-xl bg-muted/50" />
                  <div className="aspect-video rounded-xl bg-muted/50" />
                  <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-24 rounded-xl bg-muted/50" />
                <div className="min-h-24 rounded-xl bg-muted/50" />
              </TabsContent>
              <TabsContent value="analytics">
                <div className="min-h-24 rounded-xl bg-muted/50" />
              </TabsContent>
              <TabsContent value="reports">
                <div className="min-h-24 rounded-xl bg-muted/50" />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}`;
