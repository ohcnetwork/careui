import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type FontSize = "small" | "default" | "large" | "larger";

const FONT_SIZE_SCALE: Record<FontSize, number> = {
  small: 0.875,     // 0.875× → 14px at default
  default: 1,       // 1×     → 16px at default
  large: 1.125,     // 1.125× → 18px at default
  larger: 1.25,     // 1.25×  → 20px at default
};

const STORAGE_KEY = "careui-font-size";

type FontSizeContextType = {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
};

const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: "default",
  setFontSize: () => null,
});

const VALID_SIZES = new Set<FontSize>(["small", "default", "large", "larger"]);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as FontSize;
    return VALID_SIZES.has(stored) ? stored : "default";
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-size-scale",
      String(FONT_SIZE_SCALE[fontSize])
    );
  }, [fontSize]);

  const value = useMemo(
    () => ({
      fontSize,
      setFontSize: (size: FontSize) => {
        localStorage.setItem(STORAGE_KEY, size);
        setFontSizeState(size);
      },
    }),
    [fontSize]
  );

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
}

export const useFontSize = () => useContext(FontSizeContext);
