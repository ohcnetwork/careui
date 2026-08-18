import * as React from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(
    () => typeof window !== "undefined" && matchMedia(query).matches
  );

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
