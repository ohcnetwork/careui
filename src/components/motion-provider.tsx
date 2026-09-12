import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { MotionConfig } from "motion/react";

export type MotionPreference = "system" | "reduce" | "allow";

const STORAGE_KEY = "careui-motion-preference";

type MotionContextType = {
  motionPreference: MotionPreference;
  setMotionPreference: (preference: MotionPreference) => void;
  reducedMotion: boolean;
  systemPrefersReduced: boolean;
};

const MotionContext = createContext<MotionContextType>({
  motionPreference: "system",
  setMotionPreference: () => null,
  reducedMotion: false,
  systemPrefersReduced: false,
});

const VALID_PREFERENCES = new Set<MotionPreference>([
  "system",
  "reduce",
  "allow",
]);

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [motionPreference, setMotionPreferenceState] =
    useState<MotionPreference>(() => {
      if (typeof window === "undefined") return "system";
      const stored = localStorage.getItem(STORAGE_KEY) as MotionPreference;
      return VALID_PREFERENCES.has(stored) ? stored : "system";
    });

  const systemPrefersReduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const reducedMotion = useMemo(() => {
    if (motionPreference === "reduce") return true;
    if (motionPreference === "allow") return false;
    return systemPrefersReduced;
  }, [motionPreference, systemPrefersReduced]);

  // Sync with document element attributes and classes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-motion", motionPreference);
    root.setAttribute("data-reduced-motion", reducedMotion ? "true" : "false");

    if (reducedMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
  }, [motionPreference, reducedMotion]);

  const value = useMemo(
    () => ({
      motionPreference,
      setMotionPreference: (preference: MotionPreference) => {
        localStorage.setItem(STORAGE_KEY, preference);
        setMotionPreferenceState(preference);
      },
      reducedMotion,
      systemPrefersReduced,
    }),
    [motionPreference, reducedMotion, systemPrefersReduced]
  );

  return (
    <MotionContext.Provider value={value}>
      <MotionConfig
        reducedMotion={
          motionPreference === "reduce"
            ? "always"
            : motionPreference === "allow"
              ? "never"
              : "user"
        }
      >
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export const useMotion = () => {
  const context = useContext(MotionContext);
  if (context === undefined) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
};
