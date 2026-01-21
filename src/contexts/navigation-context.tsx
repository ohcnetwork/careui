"use client";

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

function getInitialComponent(): string {
  // Try to get from URL hash first
  if (typeof window !== "undefined") {
    const hash = window.location.hash.slice(1); // Remove the #
    if (hash) {
      return hash;
    }

    // Fallback to localStorage
    const stored = localStorage.getItem("activeComponent");
    if (stored) {
      return stored;
    }
  }

  // Default fallback
  return "get-started";
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeComponent, setActiveComponent] = useState(getInitialComponent);

  // Reset scroll position when component changes
  useScrollRestoration([activeComponent]);

  // Update URL hash and localStorage when component changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.hash = activeComponent;
      localStorage.setItem("activeComponent", activeComponent);
    }
  }, [activeComponent]);

  // Listen for hash changes (back/forward navigation)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        const hash = window.location.hash.slice(1);
        if (hash && hash !== activeComponent) {
          setActiveComponent(hash);
        }
      };

      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, [activeComponent]);

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
