import React from "react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";
import { ChevronLeft, PanelLeft } from "lucide-react";

// ─── usePinnableSidebar ───────────────────────────────────────────────────────
//
// Encapsulates the pinned/overlay state machine shared by all sidebar block
// demos. Handles hover-to-peek, pin/unpin toggling, and the settle delay that
// prevents the overlay container from snapping while the slide-out animation
// is still in progress.

interface UsePinnableSidebarReturn {
  pinned: boolean;
  overlayOpen: boolean;
  overlayReady: boolean;
  pinningTransition: boolean;
  isOverlay: boolean;
  menuOpenRef: React.MutableRefObject<boolean>;
  cancelClose: () => void;
  scheduleClose: () => void;
  handleToggleMouseEnter: () => void;
  handleMenuOpenChange: (open: boolean) => void;
  handleSidebarProviderOpenChange: (open: boolean) => void;
  toggleSidebar: () => void;
}

export function usePinnableSidebar(): UsePinnableSidebarReturn {
  const [pinned, setPinned] = React.useState(true);
  const [overlayOpen, setOverlayOpen] = React.useState(false);
  // overlayReady becomes true only AFTER the close animation finishes (~210ms).
  // This prevents top/height from snapping while the sidebar is still visible.
  const [overlayReady, setOverlayReady] = React.useState(false);
  const [pinningTransition, setPinningTransition] = React.useState(false);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuOpenRef = React.useRef(false);

  const cancelClose = React.useCallback(() => {
    clearTimeout(closeTimerRef.current ?? undefined);
    clearTimeout(settleTimerRef.current ?? undefined);
    closeTimerRef.current = null;
    settleTimerRef.current = null;
  }, []);

  const startSettle = React.useCallback(() => {
    clearTimeout(settleTimerRef.current ?? undefined);
    settleTimerRef.current = setTimeout(() => setOverlayReady(true), 210);
  }, []);

  const scheduleClose = React.useCallback(() => {
    if (!pinned && !menuOpenRef.current) {
      cancelClose();
      closeTimerRef.current = setTimeout(() => {
        setOverlayOpen(false);
        startSettle();
      }, 300);
    }
  }, [pinned, cancelClose, startSettle]);

  const isOverlay = overlayOpen && !pinned;

  const handleToggleMouseEnter = React.useCallback(() => {
    cancelClose();
    if (!pinned) {
      setOverlayReady(true);
      setOverlayOpen(true);
    }
  }, [pinned, cancelClose]);

  const toggleSidebar = React.useCallback(() => {
    cancelClose();
    if (isOverlay) {
      setPinningTransition(true);
      setOverlayReady(false);
      setPinned(true);
      setOverlayOpen(false);
      setTimeout(() => setPinningTransition(false), 200);
    } else if (pinned) {
      setOverlayReady(false);
      setPinned(false);
      setOverlayOpen(false);
      startSettle();
    } else {
      setPinned(true);
      setOverlayOpen(false);
    }
  }, [isOverlay, pinned, cancelClose, startSettle]);

  const handleMenuOpenChange = React.useCallback(
    (open: boolean) => {
      menuOpenRef.current = open;
      if (open) cancelClose();
      else scheduleClose();
    },
    [cancelClose, scheduleClose],
  );

  const handleSidebarProviderOpenChange = React.useCallback(
    (open: boolean) => {
      if (open) {
        setOverlayReady(false);
        setPinned(true);
        setOverlayOpen(false);
      } else {
        setOverlayReady(false);
        setPinned(false);
        setOverlayOpen(false);
        startSettle();
      }
    },
    [startSettle],
  );

  // Clean up pending timers on unmount to avoid state updates on a dead component.
  React.useEffect(() => {
    return () => {
      clearTimeout(closeTimerRef.current ?? undefined);
      clearTimeout(settleTimerRef.current ?? undefined);
    };
  }, []);

  return {
    pinned,
    overlayOpen,
    overlayReady,
    pinningTransition,
    isOverlay,
    menuOpenRef,
    cancelClose,
    scheduleClose,
    handleToggleMouseEnter,
    handleMenuOpenChange,
    handleSidebarProviderOpenChange,
    toggleSidebar,
  };
}

// ─── SidebarToggleButton ──────────────────────────────────────────────────────

export function SidebarToggleButton({
  onDesktopToggle,
  onMouseEnter,
  onMouseLeave,
}: {
  onDesktopToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const { isMobile, setOpenMobile } = useSidebar();

  const button = (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-7 w-7 -ml-1 after:absolute after:-inset-3 after:content-['']"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        if (isMobile) {
          setOpenMobile(true);
        } else {
          onDesktopToggle();
        }
      }}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );

  if (isMobile) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="left" className="flex items-center gap-1.5">
        Toggle sidebar
        <Kbd>⌘B</Kbd>
      </TooltipContent>
    </Tooltip>
  );
}

// ─── InnerPageBackButton ──────────────────────────────────────────────────────

export function InnerPageBackButton({ pinned }: { pinned: boolean }) {
  const { isMobile } = useSidebar();
  if (pinned && !isMobile) return null;
  return (
    <>
      <Separator orientation="vertical" />
      <Button
        variant="tertiary"
        size="sm"
        className="gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>
    </>
  );
}
