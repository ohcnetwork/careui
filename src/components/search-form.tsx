import * as React from "react";
import { Search } from "lucide-react";

import { componentNames } from "@/lib/component-names";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/studio-sidebar";
import { useNavigation } from "@/contexts/navigation-context";
import { getComponentIds } from "@/lib/component-registry";
import { documentationPages } from "@/lib/documentation";

const navSections = [
  {
    title: "Tools",
    items: [
      { id: "playground", title: "Playground" },
      { id: "blocks", title: "Blocks" },
    ],
  },
  {
    title: "Documentation",
    items: Object.values(documentationPages).map((page) => ({
      id: page.id,
      title: page.title,
    })),
  },
  {
    title: "Components",
    items: getComponentIds().map((id) => ({
      id,
      title: componentNames[id] || id,
    })),
  },
];

export function SearchForm(props: React.ComponentProps<"form">) {
  const [open, setOpen] = React.useState(false);
  const { setActiveComponent } = useNavigation();
  const { isMobile, setOpenMobile } = useSidebar();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <form {...props} onSubmit={(e) => e.preventDefault()}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent>
          <InputGroup
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <InputGroupInput
              placeholder="Search..."
              readOnly
              className="cursor-pointer"
            />
            <InputGroupAddon>
              <Search className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </SidebarGroupContent>
      </SidebarGroup>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search components and docs..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {navSections.map((section) => (
              <CommandGroup key={section.title} heading={section.title}>
                {section.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.title}
                    onSelect={() => {
                      setActiveComponent(item.id);
                      setOpen(false);
                      if (isMobile) setOpenMobile(false);
                    }}
                  >
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </form>
  );
}
