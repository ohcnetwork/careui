import React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bell,
  Box,
  CalendarDays,
  Check,
  ChevronsUpDown,
  CreditCard,
  House,
  LogOut,
  MapPin,
  MoreHorizontal,
  Package,
  Search,
  Settings2,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { usePinnableSidebar, SidebarToggleButton } from "./sidebar-shared";

// ─── Navigation data ──────────────────────────────────────────────────────────

type CareNavItem = {
  title: string;
  icon: React.ElementType;
  isActive?: boolean;
};
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

const encounterTypes = [
  "All Encounters",
  "Inpatient",
  "Ambulatory",
  "Emergency",
  "Observation",
  "Virtual",
  "Outpatient",
  "Home Health",
] as const;

type EncounterType = (typeof encounterTypes)[number];

const encounterStorageKey = "careui-main-dashboard-default-encounter";

function readDefaultEncounter(): EncounterType {
  if (typeof window === "undefined") return encounterTypes[0];

  const stored = window.localStorage.getItem(encounterStorageKey);
  return encounterTypes.includes(stored as EncounterType)
    ? (stored as EncounterType)
    : encounterTypes[0];
}

const careUser = { name: "Prabha Narendran", role: "Nurse", initials: "PN" };

// ─── CareFacilitySelector ─────────────────────────────────────────────────────

function CareFacilitySelector() {
  const [selected, setSelected] = React.useState(careFacilities[0]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 font-normal shadow-sm"
        >
          {selected}
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-44">
        {careFacilities.map((f) => (
          <DropdownMenuItem
            key={f}
            onClick={() => setSelected(f)}
            className="gap-2"
          >
            {f === selected ? (
              <Check className="text-primary h-4 w-4" />
            ) : (
              <span className="inline-block h-4 w-4" />
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
  const { isMobile, setOpenMobile } = useSidebar();
  const [activeSection, setActiveSection] = React.useState<
    "home" | "encounters"
  >("home");
  const [defaultEncounter, setDefaultEncounter] =
    React.useState(readDefaultEncounter);
  const [activeEncounter, setActiveEncounter] =
    React.useState<EncounterType>(defaultEncounter);
  const [draftDefaultEncounter, setDraftDefaultEncounter] =
    React.useState<EncounterType>(defaultEncounter);
  const [isSettingDefault, setIsSettingDefault] = React.useState(false);
  const [encounterMenuOpen, setEncounterMenuOpen] = React.useState(false);
  const [mobileEncounterOpen, setMobileEncounterOpen] = React.useState(false);

  const handleEncounterMenuOpenChange = (open: boolean) => {
    setEncounterMenuOpen(open);
    setMobileEncounterOpen(open);
  };

  const closeMobileSidebar = () => {
    if (!isMobile) return;
    window.setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      setOpenMobile(false);
      document
        .querySelector<HTMLButtonElement>('[aria-label="Close sidebar"]')
        ?.click();
    }, 300);
  };

  const navigateToEncounter = (encounterType: EncounterType) => {
    setActiveEncounter(encounterType);
    setActiveSection("encounters");
    setEncounterMenuOpen(false);
    setMobileEncounterOpen(false);
    closeMobileSidebar();
  };

  const openDefaultSettings = () => {
    setDraftDefaultEncounter(defaultEncounter);
    setIsSettingDefault(true);
  };

  const selectEncounterDefault = (encounterType: EncounterType) => {
    setDraftDefaultEncounter(encounterType);
    setDefaultEncounter(encounterType);
    setActiveEncounter(encounterType);
    setActiveSection("encounters");
    window.localStorage.setItem(encounterStorageKey, encounterType);
    setEncounterMenuOpen(false);
    setMobileEncounterOpen(false);
    closeMobileSidebar();
  };

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
            onValueChange={(value) =>
              selectEncounterDefault(value as EncounterType)
            }
          >
            {encounterTypes.map((encounterType) => {
              const radioId = `default-${encounterType.toLowerCase().replaceAll(" ", "-")}`;
              return (
                <label
                  key={encounterType}
                  htmlFor={radioId}
                  className="hover:bg-accent flex min-h-10 cursor-pointer items-center gap-2 rounded-sm px-2 text-sm"
                >
                  <RadioGroupItem id={radioId} value={encounterType} />
                  {encounterType}
                </label>
              );
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
                <Button
                  key={encounterType}
                  variant="ghost"
                  className="focus:bg-accent focus:text-accent-foreground flex min-h-11 w-full justify-start rounded-sm px-2.5 py-1.5 text-sm font-normal no-underline"
                  onClick={() => navigateToEncounter(encounterType)}
                >
                  {encounterType}
                </Button>
              ))}
            </div>
          ) : (
            encounterTypes.map((encounterType) => (
              <DropdownMenuItem
                key={encounterType}
                onClick={() => navigateToEncounter(encounterType)}
              >
                {encounterType}
              </DropdownMenuItem>
            ))
          )}
          {mobile ? (
            <Button
              variant="ghost"
              className="focus:bg-accent focus:text-accent-foreground border-border mt-2 flex min-h-11 w-full justify-between rounded-sm border-t px-2.5 py-1.5 text-sm font-normal no-underline"
              onClick={openDefaultSettings}
            >
              Set Default
              <ArrowRight />
            </Button>
          ) : (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                closeOnClick={false}
                onClick={openDefaultSettings}
              >
                Set Default
                <ArrowRight className="ml-auto" />
              </DropdownMenuItem>
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <>
      {careNavGroups.map((group, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Separator variant="inset" className="mx-3 w-auto" />}
          <SidebarGroup className={i > 0 ? "pt-0" : undefined}>
            {group.label && (
              <SidebarGroupLabel className="text-[10px] font-semibold tracking-wider uppercase">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarMenu>
              {group.items.map((item) => {
                const isEncounterItem =
                  group.label === "Encounters & Locations" &&
                  item.title === "All Encounters";

                if (!isEncounterItem) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={!!item.isActive && activeSection === "home"}
                        tooltip={item.title}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className="group/encounter flex items-center gap-1"
                  >
                    <SidebarMenuButton
                      isActive={activeSection === "encounters"}
                      tooltip={activeEncounter}
                      className="min-w-0 flex-1"
                    >
                      <item.icon />
                      <span className="truncate">{activeEncounter}</span>
                    </SidebarMenuButton>
                    {isMobile ? (
                      <Drawer
                        showSwipeHandle
                        open={mobileEncounterOpen}
                        onOpenChange={handleEncounterMenuOpenChange}
                      >
                        {mobileEncounterOpen &&
                          createPortal(
                            <div
                              aria-hidden="true"
                              className="pointer-events-none fixed inset-0 z-60 h-dvh w-dvw bg-black/25 backdrop-blur-sm"
                            />,
                            document.body
                          )}
                        <DrawerTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground size-8 shrink-0"
                            aria-label="Choose default encounter type"
                            onPointerDown={() => setIsSettingDefault(false)}
                            onClick={() => setIsSettingDefault(false)}
                          >
                            <MoreHorizontal />
                          </Button>
                        </DrawerTrigger>
                        <DrawerOverlay />
                        <DrawerContent className="h-auto w-dvw max-w-none">
                          <DrawerHeader>
                            <DrawerTitle>
                              {isSettingDefault
                                ? "Set default encounter"
                                : "Encounter Types"}
                            </DrawerTitle>
                            <DrawerDescription>
                              {isSettingDefault
                                ? "Choose the encounter type to show as your default."
                                : "Choose an encounter type to view."}
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerBody className="px-2">
                            {encounterMenuContent(true)}
                          </DrawerBody>
                        </DrawerContent>
                      </Drawer>
                    ) : (
                      <DropdownMenu
                        open={encounterMenuOpen}
                        onOpenChange={handleEncounterMenuOpenChange}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground size-8 shrink-0"
                            aria-label="Choose default encounter type"
                            onPointerDown={() => setIsSettingDefault(false)}
                            onClick={() => setIsSettingDefault(false)}
                          >
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="right"
                          align="start"
                          className="min-w-56"
                        >
                          {encounterMenuContent(false)}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </React.Fragment>
      ))}
    </>
  );
}

// ─── CareNavUserCard ──────────────────────────────────────────────────────────

function CareNavUserCard({
  onMenuOpenChange,
}: {
  onMenuOpenChange?: (open: boolean) => void;
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu onOpenChange={onMenuOpenChange}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent bg-strong-background/60 data-[state=open]:text-sidebar-accent-foreground shadow-sm"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-green-100 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-200">
                  {careUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{careUser.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {careUser.role}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 opacity-60" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--anchor-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                {careUser.name}
              </DropdownMenuLabel>
            </DropdownMenuGroup>
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
          showHeader
            ? "border-border min-h-14 py-2"
            : "max-h-0 border-transparent py-0"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 px-2 transition-[opacity,transform] duration-150 ease-linear",
            showHeader
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0"
          )}
        >
          <img
            src="/Care-logo-in-light.svg"
            alt="Care"
            className="h-9 w-auto dark:hidden"
          />
          <img
            src="/Care-logo-in-dark.svg"
            alt="Care"
            className="hidden h-9 w-auto dark:block"
          />
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

// ─── CareSearchBar ────────────────────────────────────────────────────────────

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
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
      <InputGroup
        className="hidden w-52 cursor-pointer text-sm md:flex md:h-9"
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

// ─── AppSidebarDemo ───────────────────────────────────────────────────────────

export function AppSidebarDemo({ fullPage = false }: { fullPage?: boolean }) {
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
          pinningTransition
            ? "**:data-[slot=sidebar-container]:transition-[left,right,width,top,height,box-shadow,background-color,border-radius]!"
            : "**:data-[slot=sidebar-container]:transition-[left,right,width]!",
          "**:data-[slot=sidebar-container]:duration-100!",
          "**:data-[slot=sidebar-gap]:duration-100!",
          pinningTransition &&
            "**:data-[slot=sidebar-inset]:transition-[margin]!",
          pinningTransition && "**:data-[slot=sidebar-inset]:duration-100!",
          isOverlay && "**:data-[slot=sidebar-inset]:ml-2!",
          isOverlay && "**:data-[slot=sidebar-gap]:w-0!",
          overlayReady &&
            !pinned && [
              "**:data-[slot=sidebar-container]:top-14!",
              "**:data-[slot=sidebar-container]:h-[calc(100%-3.5rem)]!",
            ],
          isOverlay && [
            "**:data-[slot=sidebar-container]:bg-sidebar",
            "**:data-[slot=sidebar-container]:border-t",
            "**:data-[slot=sidebar-container]:rounded-r-md",
            "**:data-[slot=sidebar-container]:shadow-xl",
          ]
        )}
      >
        <SidebarProvider
          open={pinned || overlayOpen}
          onOpenChange={handleSidebarProviderOpenChange}
          className="h-full min-h-0!"
          style={
            {
              "--sidebar-width": "15rem",
              height: "100%",
            } as React.CSSProperties
          }
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
              onMenuOpenChange={handleMenuOpenChange}
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
              <div className="ml-auto flex items-center md:gap-2">
                <CareSearchBar />
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              {/* Good Morning banner */}
              <div className="to-primary-100 dark:to-primary-950/20 flex items-center justify-between rounded-xl border border-sky-100 bg-linear-to-r from-sky-50 p-5 dark:border-sky-900/20 dark:from-sky-950/20">
                <div className="space-y-0.5">
                  <h1 className="text-soft-foreground text-base font-normal md:text-xl">
                    Good Morning,{" "}
                    <span className="text-foreground font-semibold">
                      Prabha Narendran
                    </span>{" "}
                    👋
                  </h1>
                  <p className="text-muted-foreground text-sm">Welcome back!</p>
                </div>
              </div>
              <Tabs defaultValue="overview">
                <TabsList
                  variant="line"
                  className="border-border w-full border-b"
                >
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="flex flex-col gap-4">
                  <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                  </div>
                  <div className="bg-muted/50 min-h-24 rounded-xl" />
                </TabsContent>
                <TabsContent value="analytics">
                  <div className="bg-muted/50 min-h-24 rounded-xl" />
                </TabsContent>
                <TabsContent value="reports">
                  <div className="bg-muted/50 min-h-24 rounded-xl" />
                </TabsContent>
              </Tabs>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  );
}
