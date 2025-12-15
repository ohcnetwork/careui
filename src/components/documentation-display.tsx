'use client'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { type DocumentationPage } from '@/lib/types'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DocumentationDisplayProps {
  doc: DocumentationPage
}

export function DocumentationDisplay({ doc }: DocumentationDisplayProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  return (
    <div className="max-w-4xl space-y-8 px-8 py-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">{doc.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {doc.description}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {doc.content.sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {section.title}
              </h2>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>

              {section.code && (
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                    onClick={() => copyToClipboard(section.code!, `${doc.id}-${index}`)}
                  >
                    {isCopied(`${doc.id}-${index}`) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm">{section.code}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Related Links or Additional Info */}
        <div className="border-t pt-8">
          <p className="text-sm text-muted-foreground">
            Need help? Check out our{' '}
            <a href="#components-overview" className="text-primary hover:underline">
              component examples
            </a>{' '}
            or browse the{' '}
            <a href="https://github.com/care-ui/registry" className="text-primary hover:underline">
              source code
            </a>.
          </p>
        </div>
      </div>
  )
}

interface NotFoundDocumentationProps {
  pageId: string
}

export function NotFoundDocumentation({ pageId }: NotFoundDocumentationProps) {
  return (
    <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Documentation Not Found</h1>
          <p className="text-muted-foreground">
            The documentation page "{pageId}" could not be found. Please check the navigation or select a different page.
          </p>
        </div>
      </div>
  )
}
