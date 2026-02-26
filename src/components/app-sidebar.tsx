import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { useNavigation } from "@/contexts/navigation-context";
import { getComponentIds } from "@/lib/component-registry";
import { documentationPages } from "@/lib/documentation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Component names mapping (for sidebar display)
const componentNames: Record<string, string> = {
  "components-overview": "Overview",
  accordion: "Accordion",
  alert: "Alert",
  "alert-dialog": "Alert Dialog",
  "aspect-ratio": "Aspect Ratio",
  avatar: "Avatar",
  badge: "Badge",
  breadcrumb: "Breadcrumb",
  button: "Button",
  "button-group": "Button Group",
  calendar: "Calendar",
  card: "Card",
  carousel: "Carousel",
  chart: "Chart",
  checkbox: "Checkbox",
  collapsible: "Collapsible",
  command: "Command",
  "context-menu": "Context Menu",
  dialog: "Dialog",
  drawer: "Drawer",
  "dropdown-menu": "Dropdown Menu",
  empty: "Empty",
  field: "Field",
  input: "Input",
  "hover-card": "Hover Card",
  "input-group": "Input Group",
  "input-otp": "Input OTP",
  item: "Item",
  kbd: "Kbd",
  label: "Label",
  menubar: "Menubar",
  "navigation-menu": "Navigation Menu",
  pagination: "Pagination",
  popover: "Popover",
  progress: "Progress",
  "radio-group": "Radio Group",
  resizable: "Resizable",
  "scroll-area": "Scroll Area",
  select: "Select",
  separator: "Separator",
  sheet: "Sheet",
  skeleton: "Skeleton",
  slider: "Slider",
  sonner: "Sonner",
  spinner: "Spinner",
  switch: "Switch",
  table: "Table",
  tabs: "Tabs",
  textarea: "Textarea",
  toggle: "Toggle",
  "toggle-group": "Toggle Group",
  tooltip: "Tooltip",
};

// Navigation data
const data = {
  navMain: [
    {
      title: "Documentation",
      items: [
        ...Object.values(documentationPages).map((page) => ({
          id: page.id,
          title: page.title,
        })),
      ],
    },
    {
      title: "Components",
      items: getComponentIds().map((id) => ({
        id,
        title: componentNames[id] || id,
      })),
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { activeComponent, setActiveComponent } = useNavigation();
  const [contextMenu, setContextMenu] = React.useState<{
    show: boolean;
    x: number;
    y: number;
  }>({ show: false, x: 0, y: 0 });

  // Close context menu when clicking elsewhere
  React.useEffect(() => {
    const handleClick = () =>
      setContextMenu((prev) => ({ ...prev, show: false }));
    if (contextMenu.show) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [contextMenu.show]);

  const handleLogoClick = () => {
    setActiveComponent("components-overview"); // Navigate to home/overview
  };

  const handleLogoRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const downloadAsset = (assetName: string, url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = assetName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setContextMenu((prev) => ({ ...prev, show: false }));
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 py-2 pr-2 pl-1">
          <div className="relative h-14">
            <img
              src="/care-ui-logo.svg"
              alt="Care UI"
              className="block h-14 w-auto cursor-pointer transition-opacity hover:opacity-80 dark:hidden"
              onClick={handleLogoClick}
              onContextMenu={handleLogoRightClick}
            />
            <img
              src="/care-ui-logo-dark.svg"
              alt="Care UI"
              className="hidden h-14 w-auto cursor-pointer transition-opacity hover:opacity-80 dark:block"
              onClick={handleLogoClick}
              onContextMenu={handleLogoRightClick}
            />
          </div>
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={activeComponent === item.id}
                      onClick={() => setActiveComponent(item.id)}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />

      {/* Context Menu */}
      {contextMenu.show && (
        <div
          className="fixed z-50 min-w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
        >
          <button
            className="w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100"
            onClick={() =>
              downloadAsset("care-ui-logo.svg", "/care-ui-logo.svg")
            }
          >
            Download Logo (SVG)
          </button>
          <button
            className="w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100"
            onClick={() =>
              downloadAsset("care-ui-logo.png", "/care-ui-logo.png")
            }
          >
            Download Logo (PNG)
          </button>
          <div className="my-1 border-t border-gray-200" />
          <button
            className="w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100"
            onClick={() => {
              navigator.clipboard.writeText("Care UI");
              setContextMenu((prev) => ({ ...prev, show: false }));
            }}
          >
            Copy Brand Name
          </button>
        </div>
      )}
    </Sidebar>
  );
}
