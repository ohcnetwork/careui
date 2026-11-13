import * as React from "react";
import {
  ChevronUp,
  ChevronDown,
  Copy,
  Flag,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { usePrototypeStore } from "./store";
import type { PrototypePage } from "./types";

export function PagesSidebar() {
  const { state, dispatch } = usePrototypeStore();
  const [renamingId, setRenamingId] = React.useState<string | null>(null);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <div className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          Pages
        </div>
        <Button
          size="icon-sm"
          variant="ghost"
          title="Add page"
          onClick={() => dispatch({ t: "addPage" })}
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <ol className="space-y-0.5">
          {state.pages.map((page, i) => (
            <PageRow
              key={page.id}
              page={page}
              index={i}
              count={state.pages.length}
              active={state.currentPageId === page.id}
              isStart={state.startPageId === page.id}
              renaming={renamingId === page.id}
              onStartRename={() => setRenamingId(page.id)}
              onEndRename={() => setRenamingId(null)}
            />
          ))}
        </ol>
      </div>

      <div className="text-muted-foreground border-t p-3 text-[11px] leading-relaxed">
        {state.pages.length} page{state.pages.length === 1 ? "" : "s"} ·{" "}
        <span className="text-foreground font-medium">{state.name}</span>
      </div>
    </div>
  );
}

interface PageRowProps {
  page: PrototypePage;
  index: number;
  count: number;
  active: boolean;
  isStart: boolean;
  renaming: boolean;
  onStartRename: () => void;
  onEndRename: () => void;
}

function PageRow({
  page,
  index,
  count,
  active,
  isStart,
  renaming,
  onStartRename,
  onEndRename,
}: PageRowProps) {
  const { dispatch } = usePrototypeStore();

  return (
    <li>
      <div
        className={cn(
          "group flex items-center gap-1 rounded-md px-2 py-1.5 text-sm transition-colors",
          active ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
        )}
      >
        {renaming ? (
          <Input
            autoFocus
            defaultValue={page.name}
            className="h-7 text-sm"
            onBlur={(e) => {
              dispatch({
                t: "renamePage",
                id: page.id,
                name: e.target.value || page.name,
              });
              onEndRename();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              if (e.key === "Escape") onEndRename();
            }}
          />
        ) : (
          <button
            className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
            onClick={() => dispatch({ t: "currentPage", id: page.id })}
            onDoubleClick={onStartRename}
          >
            {isStart && (
              <Flag
                className="text-primary size-3 shrink-0"
                aria-label="Start page"
              />
            )}
            <span className="truncate">{page.name}</span>
          </button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="text-muted-foreground hover:text-foreground shrink-0 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
              title="Page options"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={onStartRename}>Rename</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => dispatch({ t: "duplicatePage", id: page.id })}
            >
              <Copy className="size-4" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => dispatch({ t: "setStartPage", id: page.id })}
              disabled={isStart}
            >
              <Flag className="size-4" /> Set as start page
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => dispatch({ t: "movePage", id: page.id, dir: -1 })}
              disabled={index === 0}
            >
              <ChevronUp className="size-4" /> Move up
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => dispatch({ t: "movePage", id: page.id, dir: 1 })}
              disabled={index === count - 1}
            >
              <ChevronDown className="size-4" /> Move down
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => dispatch({ t: "deletePage", id: page.id })}
              disabled={count <= 1}
            >
              <Trash2 className="size-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
