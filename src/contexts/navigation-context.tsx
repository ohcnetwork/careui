import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useScrollRestoration } from "@/hooks/use-scroll-restoration";

interface NavigationContextType {
  activeComponent: string;
  setActiveComponent: (componentId: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}

const DEFAULT_COMPONENT = "get-started";

function getInitialComponent(): string {
  // The URL hash is the single source of truth. No hash means the default
  // page, so clearing the hash (and reloading) always returns home instead
  // of restoring a previously visited page.
  if (typeof window !== "undefined") {
    const hash = window.location.hash.slice(1); // Remove the #
    if (hash) {
      return hash;
    }
  }

  return DEFAULT_COMPONENT;
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeComponent, setActiveComponent] = useState(getInitialComponent);

  // Reset scroll position when component changes
  useScrollRestoration([activeComponent]);

  // Update URL hash when component changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.hash = activeComponent;
    }
  }, [activeComponent]);

  // Listen for hash changes (back/forward navigation, manual edits)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      // An empty hash means the user cleared it; fall back to the default.
      setActiveComponent(hash || DEFAULT_COMPONENT);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        activeComponent,
        setActiveComponent,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
