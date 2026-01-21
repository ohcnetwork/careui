"use client";

import { useNavigation } from "@/contexts/navigation-context";
import { componentDocs } from "@/lib/component-registry";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DynamicBreadcrumb() {
  const { activeComponent, setActiveComponent } = useNavigation();

  // Get component info from registry
  const componentDoc = componentDocs[activeComponent];

  // Determine the breadcrumb path based on the active component
  const getBreadcrumbPath = () => {
    if (componentDoc) {
      return {
        section: "Components",
        page: componentDoc.name,
      };
    }

    // Handle non-component navigation items
    switch (activeComponent) {
      case "installation":
        return { section: "Getting Started", page: "Installation" };
      case "project-structure":
        return { section: "Getting Started", page: "Project Structure" };
      case "components-overview":
        return { section: "Components", page: "Overview" };
      default:
        return { section: "Components", page: "Overview" };
    }
  };

  const { section, page } = getBreadcrumbPath();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Could add navigation to home here if needed
            }}
          >
            Care UI
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Navigate to components overview if in Components section
              if (section === "Components") {
                setActiveComponent("components-overview");
              }
            }}
          >
            {section}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
