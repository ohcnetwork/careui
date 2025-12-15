import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { useNavigation } from "@/contexts/navigation-context"
import { componentDocs } from "@/lib/component-registry"
import { documentationPages } from "@/lib/documentation"
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
} from "@/components/ui/sidebar"

// Navigation data
const data = {
  navMain: [
    {
      title: "Documentation",
      items: [
        ...Object.values(documentationPages).map(page => ({
          id: page.id,
          title: page.title
        }))
      ],
    },
    {
      title: "Components",
      items: [
        { id: "components-overview", title: "Overview" },
        ...Object.values(componentDocs)
          .filter(doc => doc.id !== 'components-overview')
          .map(doc => ({
            id: doc.id,
            title: doc.name
          })),
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { activeComponent, setActiveComponent } = useNavigation()
  const [contextMenu, setContextMenu] = React.useState<{
    show: boolean;
    x: number;
    y: number;
  }>({ show: false, x: 0, y: 0 })

  // Close context menu when clicking elsewhere
  React.useEffect(() => {
    const handleClick = () => setContextMenu(prev => ({ ...prev, show: false }))
    if (contextMenu.show) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [contextMenu.show])

  const handleLogoClick = () => {
    setActiveComponent('components-overview') // Navigate to home/overview
  }

  const handleLogoRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY
    })
  }

  const downloadAsset = (assetName: string, url: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = assetName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setContextMenu(prev => ({ ...prev, show: false }))
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 pl-1 pr-2 py-2">
          <div className="relative h-14">
            <img
              src="/care-ui-logo.svg"
              alt="Care UI"
              className="h-14 w-auto cursor-pointer hover:opacity-80 transition-opacity block dark:hidden"
              onClick={handleLogoClick}
              onContextMenu={handleLogoRightClick}
            />
            <img
              src="/care-ui-logo-dark.svg"
              alt="Care UI"
              className="h-14 w-auto cursor-pointer hover:opacity-80 transition-opacity hidden dark:block"
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
          className="fixed z-50 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-40"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
        >
          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
            onClick={() => downloadAsset('care-ui-logo.svg', '/care-ui-logo.svg')}
          >
            Download Logo (SVG)
          </button>
          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
            onClick={() => downloadAsset('care-ui-logo.png', '/care-ui-logo.png')}
          >
            Download Logo (PNG)
          </button>
          <div className="border-t border-gray-200 my-1" />
          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText('Care UI')
              setContextMenu(prev => ({ ...prev, show: false }))
            }}
          >
            Copy Brand Name
          </button>
        </div>
      )}
    </Sidebar>
  )
}
