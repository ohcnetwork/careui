'use client'

import { useEffect } from "react"
import { useNavigation } from "@/contexts/navigation-context"
import { componentDocs } from "@/lib/component-registry"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

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

  // Filter out non-component pages
  const components = Object.values(componentDocs).filter(doc =>
    doc.id !== 'components-overview'
  )

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
          {components.map((component) => (
            <Card
              key={component.id}
              className="group cursor-pointer transition-all hover:shadow-md hover:shadow-ring/10 hover:border-ring/20"
              onClick={() => handleComponentClick(component.id)}
            >
              <CardHeader className="pb-4">
                <div className="mb-4 h-24 bg-linear-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center border overflow-hidden">
                  {/* Preview of the component */}
                  <div className="scale-75">
                    {component.preview?.component || (
                      <div className="w-16 h-8 bg-primary rounded"></div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <CardTitle className="flex items-center justify-between">
                    {component.name}
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {component.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{component.examples?.length || 0} variant{(component.examples?.length || 0) !== 1 ? 's' : ''}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleComponentClick(component.id)
                    }}
                  >
                    View docs
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
