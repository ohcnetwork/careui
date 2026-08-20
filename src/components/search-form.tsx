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
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/studio-sidebar";
import { useNavigation } from "@/contexts/navigation-context";
import { getComponentIds } from "@/lib/component-registry";
import { documentationPages } from "@/lib/documentation";
import { ERROR_PAGES } from "@/components/error-pages/registry";

const TOOL_ONLY_COMPONENT_IDS = new Set([
  "animated-character",
  "animated-character-filly",
]);

const navSections = [
  {
    title: "Tools",
    items: [
      { id: "playground", title: "Playground" },
      { id: "animated-character", title: "Care Filly" },
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
    title: "Error Pages",
    items: [
      { id: "error-pages", title: "Examples" },
      ...ERROR_PAGES.map((page) => ({ id: page.id, title: page.title })),
    ],
  },
  {
    title: "Components",
    items: getComponentIds()
      .filter((id) => !TOOL_ONLY_COMPONENT_IDS.has(id))
      .map((id) => ({
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
      <SidebarGroup className="px-0 py-0">
        <SidebarGroupContent>
          <InputGroup
            className="bg-background cursor-pointer"
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
            <InputGroupAddon align="inline-end">
              <KbdGroup>
                <Kbd>⌘K</Kbd>
              </KbdGroup>
            </InputGroupAddon>
          </InputGroup>
        </SidebarGroupContent>
      </SidebarGroup>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput autoFocus placeholder="Search components and docs..." />
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
