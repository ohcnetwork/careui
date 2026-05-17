import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { type DocumentationPage } from "@/lib/types";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PageTitle,
  SectionTitle,
  Lead,
  Muted,
} from "@/components/ui/typography";

interface DocumentationDisplayProps {
  doc: DocumentationPage;
}

export function DocumentationDisplay({ doc }: DocumentationDisplayProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div className="max-w-4xl space-y-8 p-4 md:p-8">
      {/* Page Header */}
      <div>
        <PageTitle>{doc.title}</PageTitle>
        <Lead className="mt-2">{doc.description}</Lead>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        {doc.content.sections.map((section, index) => (
          <section key={index} className="space-y-4">
            <SectionTitle>{section.title}</SectionTitle>

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
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() =>
                    copyToClipboard(section.code!, `${doc.id}-${index}`)
                  }
                >
                  {isCopied(`${doc.id}-${index}`) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="bg-muted overflow-x-auto rounded-lg p-4">
                  <code className="text-sm">{section.code}</code>
                </pre>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Related Links or Additional Info */}
      <div className="border-t pt-8">
        <p className="text-muted-foreground text-sm">
          Need help? Check out our{" "}
          <a
            href="#components-overview"
            className="text-primary hover:underline"
          >
            component examples
          </a>{" "}
          or browse the{" "}
          <a
            href="https://github.com/ohcnetwork/careui"
            className="text-primary hover:underline"
          >
            source code
          </a>
          .
        </p>
      </div>
    </div>
  );
}

interface NotFoundDocumentationProps {
  pageId: string;
}

export function NotFoundDocumentation({ pageId }: NotFoundDocumentationProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-4 text-center">
        <PageTitle>Documentation Not Found</PageTitle>
        <Muted>
          The documentation page "{pageId}" could not be found. Please check the
          navigation or select a different page.
        </Muted>
      </div>
    </div>
  );
}
