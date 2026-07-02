import { useState, useEffect } from "react";
import { Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { componentNames } from "@/lib/component-names";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigation } from "@/contexts/navigation-context";
import { loadComponentDoc, getComponentIds } from "@/lib/component-registry";
import { documentationPages } from "@/lib/documentation";
import { ComponentsOverview } from "@/components/components-overview";
import { Playground } from "@/components/playground";
import { BlocksPage } from "@/components/blocks";
import { SettingsPage } from "@/components/settings-page";
import { GetStartedPage } from "@/components/get-started-page";
import { TypographyPage } from "@/components/typography-page";
import { ColorsPage } from "@/components/colors-page";
import { BrandsPage } from "@/components/brands-page";
import { FoundationsPage } from "@/components/foundations-page";
import { AccessibilityPage } from "@/components/accessibility-page";
import { ContributingPage } from "@/components/contributing-page";
import { ErrorPagesPage } from "@/components/error-pages";
import {
  DocumentationDisplay,
  NotFoundDocumentation,
} from "@/components/documentation-display";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { type ComponentDoc, type ComponentExample } from "@/lib/types";
import { LoadingAnimationSvg } from "@/components/ui/loading-animation-svg";
import {
  PageTitle,
  SectionTitle,
  SubsectionTitle,
  Lead,
  Muted,
} from "@/components/ui/typography";

interface ComponentDocDisplayProps {
  doc: ComponentDoc;
}

interface CliCommandProps {
  command: string;
}

function CliCommand({ command }: CliCommandProps) {
  return (
    <SyntaxHighlighter
      language="bash"
      style={oneDark}
      customStyle={{
        margin: 0,
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
      }}
    >
      {command}
    </SyntaxHighlighter>
  );
}

const componentNavOrder = Object.keys(componentNames).filter(
  (id) => id !== "components-overview"
);

function ExampleItem({ example }: { example: ComponentExample }) {
  const [tab, setTab] = useState("preview");
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div>
      <SubsectionTitle>{example.name}</SubsectionTitle>
      <Muted className="mt-1">{example.description}</Muted>
      {example.items && example.items.length > 0 && (
        <ul className="mt-4 space-y-3">
          {example.items.map((item, i) => (
            <li key={i}>
              <p className="text-foreground text-sm font-semibold">
                {item.title}
              </p>
              <Muted className="mt-0.5">{item.description}</Muted>
            </li>
          ))}
        </ul>
      )}
      {(example.preview || example.code) && (
        <Tabs value={tab} onValueChange={setTab} className="mt-4 w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            {tab === "code" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        copyToClipboard(example.code ?? "", "code")
                      }
                    >
                      {isCopied("code") ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy Code</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <TabsContent value="preview">
            <div className="border-border bg-card min-h-50 rounded-lg border p-4 md:p-8">
              <div className="flex min-h-40 items-center justify-center gap-4 [&:has([data-slot=chart])]:block [&:has([data-slot=chart])]:min-h-0">
                {example.preview}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="code">
            <SyntaxHighlighter
              language="tsx"
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              {example.code ?? ""}
            </SyntaxHighlighter>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function ComponentDocDisplay({ doc }: ComponentDocDisplayProps) {
  const [activeTab, setActiveTab] = useState("preview");
  const [activeInstallTab, setActiveInstallTab] = useState("pnpm");
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const { setActiveComponent } = useNavigation();

  const currentIndex = componentNavOrder.indexOf(doc.id);
  const prevId = currentIndex > 0 ? componentNavOrder[currentIndex - 1] : null;
  const nextId =
    currentIndex < componentNavOrder.length - 1
      ? componentNavOrder[currentIndex + 1]
      : null;

  const registryUrl = `https://careui.ohc.network/registry/care-ui/${doc.id}/${doc.id}.json`;
  const installCommands = {
    pnpm: `pnpm dlx shadcn@latest add ${registryUrl}`,
    npm: `npx shadcn@latest add ${registryUrl}`,
    yarn: `yarn dlx shadcn@latest add ${registryUrl}`,
    bun: `bunx shadcn@latest add ${registryUrl}`,
  };

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl space-y-8 p-4 md:p-8">
        {/* Component Header */}
        <div>
          <PageTitle>{doc.name}</PageTitle>
          <Lead className="mt-2">{doc.description}</Lead>
        </div>
        {/* Preview and Code Tabs */}
        <div className="space-y-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              {activeTab === "code" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          copyToClipboard(
                            doc.preview?.code || "<Component />",
                            "main-code"
                          )
                        }
                      >
                        {isCopied("main-code") ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy Code</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <TabsContent value="preview">
              <div className="border-border bg-card min-h-75 rounded-lg border p-4 md:p-8 [&:has(.recharts-responsive-container)]:flex-none [&:has([data-slot=sidebar-wrapper])]:h-full [&:has([data-slot=sidebar-wrapper])]:min-h-0 [&:has([data-slot=sidebar-wrapper])]:translate-x-0 [&:has([data-slot=sidebar-wrapper])]:overflow-hidden [&:has([data-slot=sidebar-wrapper])]:p-0">
                <div className="flex min-h-40 items-center justify-center [&:has([data-slot=chart])]:block [&:has([data-slot=chart])]:min-h-0 [&:has([data-slot=sidebar-wrapper])]:block [&:has([data-slot=sidebar-wrapper])]:min-h-0">
                  {doc.preview?.component || <div>No preview available</div>}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <SyntaxHighlighter
                language="tsx"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                {doc.preview?.code || "<Component />"}
              </SyntaxHighlighter>
            </TabsContent>
          </Tabs>
        </div>
        {/* Installation */}
        <section className="space-y-4">
          <SectionTitle>Installation</SectionTitle>
          <Tabs
            value={activeInstallTab}
            onValueChange={setActiveInstallTab}
            className="w-full"
          >
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="yarn">yarn</TabsTrigger>
                <TabsTrigger value="bun">bun</TabsTrigger>
              </TabsList>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        copyToClipboard(
                          installCommands[
                            activeInstallTab as keyof typeof installCommands
                          ],
                          `cli-${activeInstallTab}`
                        )
                      }
                    >
                      {isCopied(`cli-${activeInstallTab}`) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy Code</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <TabsContent value="pnpm">
              <CliCommand command={installCommands.pnpm} />
            </TabsContent>
            <TabsContent value="npm">
              <CliCommand command={installCommands.npm} />
            </TabsContent>
            <TabsContent value="yarn">
              <CliCommand command={installCommands.yarn} />
            </TabsContent>
            <TabsContent value="bun">
              <CliCommand command={installCommands.bun} />
            </TabsContent>
          </Tabs>
        </section>
        {/* Usage */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <SectionTitle>Usage</SectionTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(
                        doc.usage ||
                          `import { ${doc.name} } from "@/components/careui/${doc.id}";`,
                        "usage-code"
                      )
                    }
                  >
                    {isCopied("usage-code") ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy Code</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <SyntaxHighlighter
            language="tsx"
            style={oneDark}
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            {doc.usage ||
              `import { ${doc.name} } from "@/components/careui/${doc.id}";`}
          </SyntaxHighlighter>
        </section>{" "}
        {/* Examples */}
        {doc.examples && doc.examples.length > 0 && (
          <section className="space-y-4">
            <SectionTitle>Examples</SectionTitle>

            <div className="space-y-6">
              {doc.examples.map((example, index) => (
                <ExampleItem key={index} example={example} />
              ))}
            </div>
          </section>
        )}
        {/* Props */}
        {doc.props && doc.props.length > 0 && (
          <section className="space-y-4">
            <SectionTitle>Props</SectionTitle>
            <div className="border-border rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-border bg-muted/50 border-b">
                    <th className="text-foreground px-4 py-3 text-left text-sm font-medium">
                      Prop
                    </th>
                    <th className="text-foreground px-4 py-3 text-left text-sm font-medium">
                      Type
                    </th>
                    <th className="text-foreground px-4 py-3 text-left text-sm font-medium">
                      Default
                    </th>
                    <th className="text-foreground px-4 py-3 text-left text-sm font-medium">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {doc.props.map((prop, index) => (
                    <tr
                      key={prop.name}
                      className={
                        index !== doc.props!.length - 1
                          ? "border-border border-b"
                          : ""
                      }
                    >
                      <td className="text-foreground px-4 py-3 font-mono text-sm">
                        {prop.name}
                      </td>
                      <td className="text-muted-foreground px-4 py-3 font-mono text-sm">
                        {prop.type}
                      </td>
                      <td className="text-muted-foreground px-4 py-3 font-mono text-sm">
                        {prop.default || "—"}
                      </td>
                      <td className="text-muted-foreground px-4 py-3 text-sm">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between border-t pt-8">
          <div>
            {prevId && (
              <Button
                variant="tertiary"
                size="lg"
                onClick={() => setActiveComponent(prevId)}
              >
                <ChevronLeft data-icon="inline-start" />
                {componentNames[prevId]}
              </Button>
            )}
          </div>
          <div>
            {nextId && (
              <Button
                variant="tertiary"
                size="lg"
                onClick={() => setActiveComponent(nextId)}
              >
                {componentNames[nextId]}
                <ChevronRight data-icon="inline-end" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function NotFoundDisplay({ componentId }: { componentId: string }) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-2xl space-y-8 p-4 md:p-8">
        <div>
          <PageTitle>Component Not Found</PageTitle>
          <Lead className="mt-2">
            The component "{componentId}" could not be found. Please check the
            navigation or select a different component.
          </Lead>
        </div>
      </div>
    </main>
  );
}

const knownComponentIds = new Set(getComponentIds());

// Track whether the pre-React HTML loading screen has been dismissed yet.
// The first time DynamicMainContent renders real content it calls
// __removeLoadingScreen() so there is never a gap (or overlap) between
// the two loading animations.
let htmlScreenDismissed = false;
function dismissHtmlScreen() {
  if (!htmlScreenDismissed) {
    htmlScreenDismissed = true;
    if (typeof window.__removeLoadingScreen === "function") {
      window.__removeLoadingScreen();
    }
  }
}

export function DynamicMainContent() {
  const { activeComponent } = useNavigation();
  const [componentDoc, setComponentDoc] = useState<ComponentDoc | null>(null);
  const [loading, setLoading] = useState(() =>
    knownComponentIds.has(activeComponent)
  );

  // Load component documentation dynamically
  useEffect(() => {
    const loadDoc = async () => {
      // Skip loading for special cases
      if (
        documentationPages[activeComponent] ||
        activeComponent === "components-overview" ||
        activeComponent === "blocks" ||
        activeComponent === "error-pages" ||
        activeComponent.startsWith("error-page-")
      ) {
        setComponentDoc(null);
        return;
      }

      setLoading(true);
      try {
        const doc = await loadComponentDoc(activeComponent);
        setComponentDoc(doc);
      } catch (error) {
        console.error("Failed to load component doc:", error);
        setComponentDoc(null);
      } finally {
        setLoading(false);
      }
    };

    loadDoc();
  }, [activeComponent]);

  // Check if it's a documentation page
  const docPage = documentationPages[activeComponent];
  if (docPage) {
    dismissHtmlScreen();
    if (activeComponent === "get-started") {
      return <GetStartedPage />;
    }
    if (activeComponent === "docs-typography") {
      return <TypographyPage />;
    }
    if (activeComponent === "colors") {
      return <ColorsPage />;
    }
    if (activeComponent === "brands") {
      return <BrandsPage />;
    }
    if (activeComponent === "foundations") {
      return <FoundationsPage />;
    }
    if (activeComponent === "accessibility") {
      return <AccessibilityPage />;
    }
    if (activeComponent === "contributing") {
      return <ContributingPage />;
    }
    return <DocumentationDisplay doc={docPage} />;
  }

  // Handle components overview
  if (activeComponent === "components-overview") {
    dismissHtmlScreen();
    return <ComponentsOverview />;
  }

  // Handle playground
  if (activeComponent === "playground") {
    dismissHtmlScreen();
    return <Playground />;
  }

  // Handle blocks overview
  if (activeComponent === "blocks") {
    dismissHtmlScreen();
    return <BlocksPage />;
  }

  // Handle settings
  if (activeComponent === "settings") {
    dismissHtmlScreen();
    return <SettingsPage />;
  }

  // Handle error pages overview
  if (activeComponent === "error-pages") {
    dismissHtmlScreen();
    return <ErrorPagesPage />;
  }

  // Show loading state — also covers the gap between navigation and effect firing.
  // If the HTML loading screen is still up, suppress the React spinner to avoid
  // showing two animations simultaneously.
  if (loading || (knownComponentIds.has(activeComponent) && !componentDoc)) {
    if (!htmlScreenDismissed) {
      // HTML screen is still visible — render nothing inside root
      return null;
    }
    return (
      <main className="flex-1 overflow-y-auto">
        <div className="flex min-h-100 items-center justify-center">
          <LoadingAnimationSvg />
        </div>
      </main>
    );
  }

  // Handle component documentation
  if (componentDoc) {
    dismissHtmlScreen();
    return <ComponentDocDisplay key={componentDoc.id} doc={componentDoc} />;
  }

  // Handle not found - could be documentation or component
  const isLikelyDocumentation = [
    "get-started",
    "accessibility",
    "a11y",
  ].includes(activeComponent);
  if (isLikelyDocumentation) {
    return <NotFoundDocumentation pageId={activeComponent} />;
  }

  return <NotFoundDisplay componentId={activeComponent} />;
}
