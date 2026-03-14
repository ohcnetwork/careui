import { useState, useEffect, useRef } from "react";

export function useCopyToClipboard() {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const currentTimers = timers.current;
    return () => {
      Object.values(currentTimers).forEach(clearTimeout);
    };
  }, []);

  const scheduleReset = (key: string) => {
    if (timers.current[key]) clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
      delete timers.current[key];
    }, 2000);
  };

  const copyToClipboard = async (text: string, key: string) => {
    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        setCopiedStates((prev) => ({ ...prev, [key]: true }));
        scheduleReset(key);
        return true;
      } catch (err) {
        console.error("Failed to copy text: ", err);
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [key]: true }));
      scheduleReset(key);
      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false;
    }
  };

  const isCopied = (key: string) => copiedStates[key] || false;

  return { copyToClipboard, isCopied };
}
