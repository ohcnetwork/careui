import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

  const subscribe = React.useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = React.useCallback(
    () => window.innerWidth < MOBILE_BREAKPOINT,
    []
  );

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}
