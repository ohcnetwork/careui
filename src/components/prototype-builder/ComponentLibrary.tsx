import * as React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { catalogItems, type CatalogItem } from "./catalog";
import { usePrototypeStore, useCurrentPage } from "./store";

export function ComponentLibrary() {
  const [query, setQuery] = React.useState("");
  const page = useCurrentPage();
  const { dispatch } = usePrototypeStore();

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogItems.filter(
      (i) =>
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = React.useMemo(() => {
    const map = new Map<string, CatalogItem[]>();
    for (const item of filtered) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-3">
        <div className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          Components
        </div>
        <div className="relative mt-2">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
          <Input
            className="h-8 pl-8 text-sm"
            placeholder="Search components…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {grouped.map(([category, items]) => (
          <div key={category} className="mb-4">
            <div className="text-muted-foreground mb-1.5 px-1 text-[11px] font-semibold tracking-wide uppercase">
              {category}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {items.map((item) => (
                <PaletteItem
                  key={item.id}
                  item={item}
                  onAdd={() =>
                    dispatch({
                      t: "addElement",
                      pageId: page.id,
                      catalogId: item.id,
                    })
                  }
                />
              ))}
            </div>
          </div>
        ))}
        {grouped.length === 0 && (
          <p className="text-muted-foreground p-3 text-center text-sm">
            No components match “{query}”.
          </p>
        )}
      </div>
    </div>
  );
}

function PaletteItem({
  item,
  onAdd,
}: {
  item: CatalogItem;
  onAdd: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette:${item.id}`,
  });
  const Icon = item.icon;
  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onAdd}
      title={`Add ${item.name}`}
      className={cn(
        "hover:border-primary/50 hover:bg-accent bg-card flex cursor-grab flex-col items-center gap-1.5 rounded-md border p-2.5 text-center transition-colors active:cursor-grabbing",
        isDragging && "opacity-40"
      )}
    >
      <Icon className="text-muted-foreground size-4" />
      <span className="text-[11px] leading-tight font-medium">{item.name}</span>
    </button>
  );
}
