'use client'

import { useEffect } from "react"
import { useNavigation } from "@/contexts/navigation-context"
import { getComponentIds } from "@/lib/component-registry"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Component metadata for display
const componentMetadata: Record<string, { name: string; description: string; examples?: number }> = {
  'accordion': { name: 'Accordion', description: 'A vertically stacked set of interactive headings that reveal content.', examples: 1 },
  'alert': { name: 'Alert', description: 'Displays a callout for user attention.', examples: 2 },
  'alert-dialog': { name: 'Alert Dialog', description: 'A modal dialog that interrupts the user with important content.', examples: 1 },
  'aspect-ratio': { name: 'Aspect Ratio', description: 'Displays content within a desired ratio.', examples: 1 },
  'avatar': { name: 'Avatar', description: 'An image element with a fallback for representing the user.', examples: 3 },
  'badge': { name: 'Badge', description: 'Displays a badge or a component that looks like a badge.', examples: 4 },
  'breadcrumb': { name: 'Breadcrumb', description: 'Displays the path to the current resource using a hierarchy of links.', examples: 3 },
  'button': { name: 'Button', description: 'Displays a button or a component that looks like a button.', examples: 7 },
  'button-group': { name: 'Button Group', description: 'A set of buttons grouped together.', examples: 2 },
  'calendar': { name: 'Calendar', description: 'A date picker component with a calendar view.', examples: 2 },
  'card': { name: 'Card', description: 'Displays a card with header, content, and footer.', examples: 3 },
  'carousel': { name: 'Carousel', description: 'A carousel with motion and swipe built using Embla.', examples: 4 },
  'chart': { name: 'Chart', description: 'Beautiful and customizable charts built using Recharts.', examples: 1 },
  'checkbox': { name: 'Checkbox', description: 'A control that allows the user to toggle between checked and unchecked.', examples: 2 },
  'collapsible': { name: 'Collapsible', description: 'An interactive component which expands/collapses a panel.', examples: 1 },
  'command': { name: 'Command', description: 'Fast, composable, unstyled command menu for React.', examples: 2 },
  'context-menu': { name: 'Context Menu', description: 'Displays a menu to the user triggered by right-click.', examples: 1 },
  'dialog': { name: 'Dialog', description: 'A window overlaid on either the primary window or another dialog.', examples: 2 },
  'drawer': { name: 'Drawer', description: 'A drawer component for React, built on top of Vaul.', examples: 2 },
  'dropdown-menu': { name: 'Dropdown Menu', description: 'Displays a menu to the user triggered by a button.', examples: 3 },
  'empty': { name: 'Empty', description: 'Displays an empty state when no data is available.', examples: 1 },
  'field': { name: 'Field', description: 'A form field component with label and error handling.', examples: 2 },
  'hover-card': { name: 'Hover Card', description: 'For sighted users to preview content available behind a link.', examples: 1 },
  'input': { name: 'Input', description: 'Displays a form input field or a component that looks like an input field.', examples: 4 },
  'input-group': { name: 'Input Group', description: 'Groups input fields with prefix and suffix elements.', examples: 3 },
  'input-otp': { name: 'Input OTP', description: 'Accessible one-time password component with copy paste functionality.', examples: 5 },
  'item': { name: 'Item', description: 'A reusable item component for lists and menus.', examples: 1 },
  'kbd': { name: 'Kbd', description: 'Displays keyboard shortcuts in a styled format.', examples: 2 },
  'label': { name: 'Label', description: 'Renders an accessible label associated with controls.', examples: 1 },
  'menubar': { name: 'Menubar', description: 'A visually persistent menu common in desktop applications.', examples: 1 },
  'navigation-menu': { name: 'Navigation Menu', description: 'A collection of links for navigating websites.', examples: 1 },
  'pagination': { name: 'Pagination', description: 'Pagination with page navigation, next and previous links.', examples: 1 },
  'popover': { name: 'Popover', description: 'Displays rich content in a portal, triggered by a button.', examples: 1 },
  'progress': { name: 'Progress', description: 'Displays an indicator showing the completion progress of a task.', examples: 1 },
  'radio-group': { name: 'Radio Group', description: 'A set of checkable buttons where only one can be checked.', examples: 2 },
  'resizable': { name: 'Resizable', description: 'Accessible resizable panel groups and layouts with keyboard support.', examples: 1 },
  'scroll-area': { name: 'Scroll Area', description: 'Augments native scroll functionality for custom, cross-browser styling.', examples: 1 },
  'select': { name: 'Select', description: 'Displays a list of options for the user to pick from.', examples: 2 },
  'separator': { name: 'Separator', description: 'Visually or semantically separates content.', examples: 1 },
  'sheet': { name: 'Sheet', description: 'Extends the Dialog component to display content that complements the main content.', examples: 4 },
  'skeleton': { name: 'Skeleton', description: 'Use to show a placeholder while content is loading.', examples: 1 },
  'slider': { name: 'Slider', description: 'An input where the user selects a value from within a given range.', examples: 1 },
  'sonner': { name: 'Sonner', description: 'An opinionated toast component for React.', examples: 1 },
  'spinner': { name: 'Spinner', description: 'A loading indicator component.', examples: 1 },
  'switch': { name: 'Switch', description: 'A control that allows the user to toggle between checked and unchecked.', examples: 2 },
  'table': { name: 'Table', description: 'A responsive table component.', examples: 1 },
  'tabs': { name: 'Tabs', description: 'A set of layered sections of content—known as tab panels.', examples: 1 },
  'textarea': { name: 'Textarea', description: 'Displays a form textarea or a component that looks like a textarea.', examples: 2 },
  'toggle': { name: 'Toggle', description: 'A two-state button that can be either on or off.', examples: 4 },
  'toggle-group': { name: 'Toggle Group', description: 'A set of two-state buttons that can be toggled on or off.', examples: 3 },
  'tooltip': { name: 'Tooltip', description: 'A popup that displays information related to an element.', examples: 1 },
}

export function ComponentsOverview() {
  const { setActiveComponent } = useNavigation()

  // Reset scroll position when this component mounts
  useEffect(() => {
    // Find the main container for this component and reset scroll
    const mainContainer = document.querySelector('main.flex-1.overflow-y-auto')
    if (mainContainer && 'scrollTop' in mainContainer) {
      (mainContainer as Element & { scrollTop: number }).scrollTop = 0
    }

    // Also reset window scroll
    window.scrollTo(0, 0)
  }, [])

  // Get all component IDs and filter out overview
  const componentIds = getComponentIds().filter(id => id !== 'components-overview')

  const handleComponentClick = (componentId: string) => {
    setActiveComponent(componentId)
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-6xl space-y-8 px-8 py-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Components</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Beautiful UI components built with Tailwind CSS and React.
            An open-source collection of copy-and-paste components for quickly building care application UIs.
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {componentIds.map((id) => {
            const metadata = componentMetadata[id] || {
              name: id,
              description: 'Component description',
              examples: 0
            }

            return (
              <Card
                key={id}
                className="group cursor-pointer transition-all hover:shadow-md hover:shadow-ring/10 hover:border-ring/20"
                onClick={() => handleComponentClick(id)}
              >
                <CardHeader className="pb-4">
                  {/* Placeholder thumbnail banner */}
                  <div className="mb-4 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center border">
                    <div className="text-4xl font-bold text-primary/20">
                      {metadata.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="flex items-center justify-between">
                      {metadata.name}
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {metadata.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{metadata.examples || 0} variant{metadata.examples !== 1 ? 's' : ''}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleComponentClick(id)
                      }}
                    >
                      View docs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer message */}
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            More components coming soon. Follow our development on{" "}
            <a href="#" className="text-primary hover:underline">
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
