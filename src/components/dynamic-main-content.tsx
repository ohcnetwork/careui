'use client'

import { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigation } from '@/contexts/navigation-context'
import { loadComponentDoc } from '@/lib/component-registry'
import { documentationPages } from '@/lib/documentation'
import { ComponentsOverview } from '@/components/components-overview'
import { DocumentationDisplay, NotFoundDocumentation } from '@/components/documentation-display'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useScrollRestoration } from '@/hooks/use-scroll-restoration'
import { type ComponentDoc } from '@/lib/types'
interface ComponentDocDisplayProps {
  doc: ComponentDoc
}

function ComponentDocDisplay({ doc }: ComponentDocDisplayProps) {
  const [activeTab, setActiveTab] = useState('preview')
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8 px-8 py-8">
        {/* Component Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">{doc.name}</h1>
          <p className="mt-2 text-base text-muted-foreground">
            {doc.description}
          </p>
        </div>

        {/* Preview and Code Tabs */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-border bg-card p-8">
                {doc.preview?.component || <div>No preview available</div>}
              </div>
            </TabsContent>
            <TabsContent value="code" className="mt-4">
              <div className="relative">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2 h-8 w-8 p-0 z-10"
                  onClick={() => copyToClipboard(doc.preview?.code || '<Component />', 'main-code')}
                >
                  {isCopied('main-code') ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                  <code className="text-sm">{doc.preview?.code || '<Component />'}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Installation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Installation</h2>
          <Tabs defaultValue="pnpm" className="w-full">
            <TabsList>
              <TabsTrigger value="bun">bun</TabsTrigger>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
            </TabsList>
            <TabsContent value="pnpm" className="mt-4">
              <div className="rounded-lg border border-border bg-muted p-4">
                <div className="flex items-center justify-between gap-4">
                  <code className="font-mono text-sm text-foreground">
                    pnpm dlx shadcn@latest add {doc.id} --registry=https://care-ui.com
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(`pnpm dlx shadcn@latest add ${doc.id} --registry=https://care-ui.com`, 'cli')}
                  >
                    {isCopied('cli') ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="npm" className="mt-4">
              <div className="rounded-lg border border-border bg-muted p-4">
                <div className="flex items-center justify-between gap-4">
                  <code className="font-mono text-sm text-foreground">
                    npx shadcn@latest add {doc.id} --registry=https://care-ui.com
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(`npx shadcn@latest add ${doc.id} --registry=https://care-ui.com`, 'cli')}
                  >
                    {isCopied('cli') ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="yarn" className="mt-4">
              <div className="rounded-lg border border-border bg-muted p-4">
                <div className="flex items-center justify-between gap-4">
                  <code className="font-mono text-sm text-foreground">
                    yarn dlx shadcn@latest add {doc.id} --registry=https://care-ui.com
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(`yarn dlx shadcn@latest add ${doc.id} --registry=https://care-ui.com`, 'cli')}
                  >
                    {isCopied('cli') ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="bun" className="mt-4">
              <div className="rounded-lg border border-border bg-muted p-4">
                <div className="flex items-center justify-between gap-4">
                  <code className="font-mono text-sm text-foreground">
                    bunx shadcn@latest add {doc.id} --registry=https://care-ui.com
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(`bunx shadcn@latest add ${doc.id} --registry=https://care-ui.com`, 'cli')}
                  >
                    {isCopied('cli') ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Usage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Usage</h2>
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-2 h-8 w-8 p-0 z-10"
              onClick={() => copyToClipboard(`import { ${doc.name} } from "@/components/ui/${doc.id}";

export default function Particle() {
  return <${doc.name}>${doc.name}</${doc.name}>;
}`, 'usage-code')}
            >
              {isCopied('usage-code') ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
              <code className="text-sm">{`import { ${doc.name} } from "@/components/ui/${doc.id}";

export default function Particle() {
  return <${doc.name}>${doc.name}</${doc.name}>;
}`}</code>
            </pre>
          </div>
        </section>        {/* Examples */}
        {doc.examples && doc.examples.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Examples</h2>

            <div className="space-y-6">
              {doc.examples.map((example, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-foreground">{example.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
                  <Tabs defaultValue="preview" className="mt-4 w-full">
                    <TabsList>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="code">Code</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="mt-4">
                      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-border bg-card p-8 gap-4">
                        {example.preview}
                      </div>
                    </TabsContent>
                    <TabsContent value="code" className="mt-4">
                      <div className="relative">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-2 top-2 h-8 w-8 p-0 z-10"
                          onClick={() => copyToClipboard(example.code, `example-${index}`)}
                        >
                          {isCopied(`example-${index}`) ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                          <code className="text-sm">{example.code}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Props */}
        {doc.props && doc.props.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Props</h2>
            <div className="rounded-lg border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Prop</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Default</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.props.map((prop, index) => (
                    <tr key={prop.name} className={index !== doc.props!.length - 1 ? "border-b border-border" : ""}>
                      <td className="px-4 py-3 text-sm font-mono text-foreground">{prop.name}</td>
                      <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{prop.type}</td>
                      <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{prop.default || '—'}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function NotFoundDisplay({ componentId }: { componentId: string }) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-2xl space-y-8 px-8 py-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Component Not Found</h1>
          <p className="mt-2 text-base text-muted-foreground">
            The component "{componentId}" could not be found. Please check the navigation or select a different component.
          </p>
        </div>
      </div>
    </main>
  )
}

export function DynamicMainContent() {
  const { activeComponent } = useNavigation()
  const [componentDoc, setComponentDoc] = useState<ComponentDoc | null>(null)
  const [loading, setLoading] = useState(false)

  // Reset scroll position when activeComponent changes
  useScrollRestoration([activeComponent])

  // Load component documentation dynamically
  useEffect(() => {
    const loadDoc = async () => {
      // Skip loading for special cases
      if (documentationPages[activeComponent] || activeComponent === 'components-overview') {
        setComponentDoc(null)
        return
      }

      setLoading(true)
      try {
        const doc = await loadComponentDoc(activeComponent)
        setComponentDoc(doc)
      } catch (error) {
        console.error('Failed to load component doc:', error)
        setComponentDoc(null)
      } finally {
        setLoading(false)
      }
    }

    loadDoc()
  }, [activeComponent])

  // Check if it's a documentation page
  const docPage = documentationPages[activeComponent]
  if (docPage) {
    return <DocumentationDisplay doc={docPage} />
  }

  // Handle components overview
  if (activeComponent === 'components-overview') {
    return <ComponentsOverview />
  }

  // Show loading state
  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8 px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </main>
    )
  }

  // Handle component documentation
  if (componentDoc) {
    return <ComponentDocDisplay key={componentDoc.id} doc={componentDoc} />
  }

  // Handle not found - could be documentation or component
  const isLikelyDocumentation = ['get-started', 'accessibility', 'a11y'].includes(activeComponent)
  if (isLikelyDocumentation) {
    return <NotFoundDocumentation pageId={activeComponent} />
  }

  return <NotFoundDisplay componentId={activeComponent} />
}
