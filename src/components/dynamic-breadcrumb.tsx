import { useNavigation } from "@/contexts/navigation-context";
import { getComponentIds } from "@/lib/component-registry";
import { componentNames } from "@/lib/component-names";
import { documentationPages } from "@/lib/documentation";
import { getErrorPageById } from "@/components/error-pages/registry";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const componentIds = new Set(getComponentIds());

type BreadcrumbPath = {
  section: string;
  sectionTarget: string | null;
  page: string;
};

function getBreadcrumbPath(activeComponent: string): BreadcrumbPath {
  if (activeComponent === "animated-character") {
    return {
      section: "Tools",
      sectionTarget: null,
      page: "Care Filly",
    };
  }

  if (componentIds.has(activeComponent)) {
    return {
      section: "Components",
      sectionTarget: "components-overview",
      page: componentNames[activeComponent] || activeComponent,
    };
  }

  const docPage = documentationPages[activeComponent];
  if (docPage) {
    return {
      section: "Documentation",
      sectionTarget: "get-started",
      page: docPage.title,
    };
  }

  if (activeComponent === "error-pages") {
    return {
      section: "Error Pages",
      sectionTarget: null,
      page: "Examples",
    };
  }

  const errorPage = getErrorPageById(activeComponent);
  if (errorPage) {
    return {
      section: "Error Pages",
      sectionTarget: "error-pages",
      page: errorPage.title,
    };
  }

  switch (activeComponent) {
    case "components-overview":
      return { section: "Components", sectionTarget: null, page: "Overview" };
    case "playground":
      return { section: "Tools", sectionTarget: null, page: "Playground" };
    case "blocks":
      return { section: "Tools", sectionTarget: null, page: "Blocks" };
    default:
      return { section: "Care UI", sectionTarget: null, page: activeComponent };
  }
}

export function DynamicBreadcrumb() {
  const { activeComponent, setActiveComponent } = useNavigation();
  const { section, sectionTarget, page } = getBreadcrumbPath(activeComponent);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveComponent("get-started");
            }}
          >
            Care UI
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          {sectionTarget ? (
            <BreadcrumbLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveComponent(sectionTarget);
              }}
            >
              {section}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{section}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {sectionTarget && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{page}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
